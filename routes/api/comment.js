var path = require('path');
var request = require("request");
var express = require("express");
var app = express.Router();

//Database Models 
var Comment = require("../../db/models/comment.js");

//Comments Routes BEGIN ---------------------------------------------------------------

//DELETE A Bug Comment
app.post("/deleteComment/:id", function (req, res) {

    BugComment.findByIdAndRemove(req.params.id, function (error, doc) {
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



    // Create a new bug comment and pass the req.body to the entry
    let resultObj = {
        title: req.body.text,
        text: req.body.text,
        userWhoMadeComment: req.body.userWhoMadeComment,
        timestamp: finalDateFormat
    }

    var entry = new Comment(resultObj);

    // Now, save that entry to the db
    entry.save(function (err, doc) {
        // Log any errors
        if (err) {
            console.log(err);
            res.json(err);
        }
        // Or log the doc
        else {
            resultObj.commentDoc = doc;
            //Now that we saved the bugs, we need to find the Organization and add to it's array the new bug.
            // Use the organization id to find and update its' bugs
            Organization.findOneAndUpdate({ "_id": req.body.commentID }, { $push: { "comments": doc._id } },
                { safe: true, upsert: false })
                // Execute the above query
                .exec(function (err, doc) {


                    // Log any errors
                    if (err) {
                        console.log(err);
                        resultObj.error = true;
                        resultObj.errorObj = err;
                        res.send(resultObj);
                    }
                    else {
                         res.send(resultObj);
                    }
                });
        }
    });

});


//Comments END -----------------------------------------------------------

module.exports = app;