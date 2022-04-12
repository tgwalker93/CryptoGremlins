const router = require("express").Router();
const commentRoutes = require("./comment");
const trendingRoutes = require("./trending");
const listingRoutes = require("./listing");

var express = require("express");
var app = express.Router();

app.use("/comment", commentRoutes);
app.use("/trending", trendingRoutes);
app.use("/listing", listingRoutes);

module.exports = app;