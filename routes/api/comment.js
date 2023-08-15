const path = require('path');
const request = require("request");
const express = require("express");
const app = express.Router();
const messaging = require('../../messaging/messaging');

// Database Models 
const Comment = require("../../db/models/comment.js");
const Listing = require("../../db/models/listing.js");

// Comments Routes BEGIN ---------------------------------------------------------------

// DELETE A Comment
app.post("/deleteComment/:id", async (req, res) => {
    try {
        const result = await Comment.findByIdAndRemove(req.params.id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

// SAVE A Comment
app.post("/saveComment", async (req, res) => {
    try {
        const now = new Date();
        const finalDateFormat = now.toLocaleDateString() + " at " + now.toLocaleTimeString();
        const newRating = req.body.rating;

        const resultObj = {
            title: req.body.text,
            text: req.body.text,
            userWhoMadeComment: req.body.userWhoMadeComment,
            timestamp: finalDateFormat,
            rating: newRating,
            coinTicker: req.body.ticker
        };
        const entry = new Comment(resultObj);

        const doc = await entry.save();

        const cryptoProjectID = req.body.cryptoProjectID;
        const currentCommentDocID = doc._id;

        const listing = await Listing.findOne({ "_id": cryptoProjectID }).populate("comments").exec();

        const currentComments = listing.comments;
        const sumOfRatings = currentComments.reduce((sum, comment) => sum + (isNaN(comment.rating) ? 0 : comment.rating), 0);
        const numOfComments = currentComments.length || 1;
        const averageRating = sumOfRatings / numOfComments;

        await Listing.findOneAndUpdate(
            { "_id": cryptoProjectID },
            { $push: { "comments": currentCommentDocID }, averageRating: averageRating },
            { safe: true, upsert: true }
        );

        messaging.publishToQueue('spam', 'comment_created');
        res.send(doc);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

// Comments END -----------------------------------------------------------

module.exports = app;
