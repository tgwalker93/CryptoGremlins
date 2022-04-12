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
    Listing.find({}, function(err, docs) {
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

module.exports = app;