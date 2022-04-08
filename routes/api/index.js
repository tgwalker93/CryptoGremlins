const router = require("express").Router();
const commentRoutes = require("./comment");
const trendingRoutes = require("./trending");

var express = require("express");
var app = express.Router();

app.use("/comment", commentRoutes);
app.use("/trending", trendingRoutes);

module.exports = app;