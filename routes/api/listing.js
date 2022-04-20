var path = require('path');
var request = require("request");
var express = require("express");
var app = express.Router();

//Database Models 
var Listing = require("../../db/models/listing.js");

//listing Routes BEGIN ---------------------------------------------------------------

//Get all crypto projects
app.get("/getAllCryptoProjects", function(req, res) { 
    resultObj = {

    }
    Listing.find({})
        // ..and populate all of the bug comments associated with it
        .populate("comments")
        .exec(function (err, docs) {
        if (!err) { 
            console.log(docs);
            resultObj.docs = docs;
            resultObj.error = null;
            res.json(resultObj);
        }
        else {
            resultObj.error = err;
            result.json(resultObj);
        }
    });
});

//Getting Crypto Project and comments from the Database!
app.get("/getAllCommentsOfCryptoProject/:cryptoProjectID", function (req, res) {

    var resultObj = {
        
    }
    //Use the org id param to find the organization and its associated bugs
    Listing.findOne({ "_id": req.params.cryptoProjectID })
        // ..and populate all of the bug comments associated with it
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
                resultObj.doc = doc;
                res.json(resultObj);
            }
        });

})

module.exports = app;