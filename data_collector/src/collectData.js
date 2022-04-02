
// import {requestListing} from './services/makeRequests';

var request = require('./services/makeRequests');
var apikey = {
    key: '461f750d-2657-4821-89f9-4b0659d0f35a'
  }

request('GET', 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + apikey.key)
.then((req) => {
    var x = JSON.parse(req.target.responseText);
    console.log(x.data);
}).catch(err => {
    console.log(err);
})

// const schedule = require('node-schedule');
// const job = schedule.scheduleJob('*/1 * * * *', function() {
//   requestListing();
// });

// ReactDOM.render(<App />, document.getElementById("root"));