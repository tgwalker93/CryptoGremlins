
// import {requestListing} from './services/makeRequests';

var request = require('./services/makeRequests');
var Listing = require('../../db/models/listing.js');
var apikey = {
    key: '461f750d-2657-4821-89f9-4b0659d0f35a'
  }

request('GET', 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + apikey.key)
.then((req) => {
    var x = JSON.parse(req.target.responseText).data;
    // write each element of array to a Listing model and save to DB
    for (var i = 0; i < x.length; i++) {
        console.log(x[i].symbol);
    }
    // console.log(x.data);
}).catch(err => {
    console.log(err);
})
