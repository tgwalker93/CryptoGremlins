var path = require('path');
var request = require("request");
var express = require("express");
var app = express.Router();
const messaging = require('../../messaging/messaging');

//Database Models 
var Comment = require("../../db/models/comment.js");
var Listing = require("../../db/models/listing.js");

//Comments Routes BEGIN ---------------------------------------------------------------

//DELETE A Comment
app.post("/deleteComment/:id", function (req, res) {

    Comment.findByIdAndRemove(req.params.id, function (error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
            res.json(error);
        }
        else {
            // Or send the document to the browser
            res.send(doc);
        }
    });

});

//SAVE A Comment
app.post("/saveComment", function (req, res) {

    //Formatting current time to mm/dd/yyyy at hh:mm:ss PM
    var now = new Date();
    now = now.toUTCString();
    var parsedNow = new Date(Date.parse(now));
    var finalDateFormat = parsedNow.toLocaleDateString() + " at " + parsedNow.toLocaleTimeString();
    var newRating = req.body.rating;
    var currentCommentDocID = 0;

    // Create a new comment and pass the req.body to the entry
    let resultObj = {
        title: req.body.text,
        text: req.body.text,
        userWhoMadeComment: req.body.userWhoMadeComment,
        timestamp: finalDateFormat,
        rating: newRating,
        coinTicker: req.body.ticker
    }
    var entry = new Comment(resultObj);

    // Now, save that entry to the db
    entry.save(function (err, doc) {
        // Log any errors
        if (err) {
            console.log(err);
            res.send("An error occured while saving to database.");
        }
        // Or log the doc
        else {
            currentCommentDocID = doc._id
            //Use the org id param to find the organization and its associated bugs
            Listing.findOne({ "_id": req.body.cryptoProjectID })
                // // ..and populate all of the bug comments associated with it
                .populate("comments")
                // now, execute our query
                .exec(function (error, doc) {
                    // Log any errors
                    if (error) {
                        //Error 
                        console.log(error);
                        resultObj.error = true;
                        resultObj.errorObj = error;
                        res.json(resultObj);
                    }
                    // Otherwise, send the doc to the browser as a json object
                    else {
                        //Get the average rating of all the comments before we push comment to the listing database object
                        var currentComments = doc.comments;
                        var sumOfRatings = 0;
                        var numOfComments = currentComments.length;
                        for(var i=0; i<currentComments.length; i++){
                            if(!isNaN(currentComments[i].rating)) { 
                                sumOfRatings += currentComments[i].rating
                            }
                        }
                        if(numOfComments == 0) {
                            numOfComments = 1;
                        }
                        var averageRating = sumOfRatings/numOfComments;     
                        Listing.findOneAndUpdate({ "_id": req.body.cryptoProjectID }, { $push: { "comments": currentCommentDocID }, averageRating: averageRating },
                        { safe: true, upsert: true })            
                        // Execute the above query
                        .exec(function (err, doc) {
                            // Send any errors back to client
                            if (err) {
                                res.json(err);
                            }
                            else {       
                                messaging.publishToQueue('spam', 'comment_created');                   
                                res.send(doc);

                            }
                        });
                    }
                });

                }
            });


});


//Comments END -----------------------------------------------------------

module.exports = app;