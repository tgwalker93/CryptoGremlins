const router = require("express").Router();
const commentRoutes = require("./comment");

var express = require("express");
var app = express.Router();


// Comment Routes
app.use("/comment", commentRoutes);

module.exports = app;