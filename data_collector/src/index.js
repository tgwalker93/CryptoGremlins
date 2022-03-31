// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
import {requestListing} from './services/makeRequests';



const schedule = require('node-schedule');
const job = schedule.scheduleJob('*/1 * * * *', function() {
  requestListing();
});

// ReactDOM.render(<App />, document.getElementById("root"));