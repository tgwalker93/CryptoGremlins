var path = require('path');
var request = require("request");
var express = require("express");
var app = express.Router();

//Database Models 
var Trending = require("../../db/models/trending.js");

app.get("/list", async (req, res) => {
    console.log("Handling list trending request.");
    const trendings = await Trending.find({}).exec();
    res.json(trendings);
});

module.exports = app;