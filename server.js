const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const session = require('express-session');
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./db'); // loads our connection to the mongo database
require ('newrelic');

var dotenv = require('dotenv');

//loading .env file
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));

// Add routes, both API and view
app.use(routes);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});