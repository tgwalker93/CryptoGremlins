
var request = require('./services/request');
var Listing = require('../../db/models/listing.js');
var db = require('../../db/index.js');

var apikey = {
    key: '461f750d-2657-4821-89f9-4b0659d0f35a'
  }

async function get_data() {

    const data = request('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + apikey.key)
    .then(async function (response) {
        var listingsAll = response.data;
        for (var i = 0; i < listingsAll.length; i++){
            const dateTime = new Date(listingsAll[i].last_updated);
            const listing = {
                name: listingsAll[i].name,
                ticker: listingsAll[i].symbol,
                price: listingsAll[i].quote.USD.price,
                marketCap: listingsAll[i].quote.USD.market_cap,
                volume24h: listingsAll[i].quote.USD.volume_24h,
                circulatingSupply: listingsAll[i].circulating_supply,
                timeStamp: dateTime.toDateString().concat(', @ ', dateTime.toLocaleTimeString('en-US')) 
            }

            //await Listing.save();

            var query = {'name': listingsAll[i].name};

            await Listing.findOneAndUpdate({query},listing, {upsert: true});
        }
        console.log('finished writing listings to DB...');
    }).catch(error => {
        console.log(error);
    });


}

get_data();



// function make_request() {
//     request('GET', 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + apikey.key)
//     .then((req) => {
//         var x = JSON.parse(req.target.responseText).data;
//         // write each element of array to a Listing model and save to DB
//         for (var i = 0; i < x.length; i++) {
//             // console.log(x[i].symbol)
//             const listing = {
//                 name: x[i].name,
//                 ticker: x[i].symbol,
//                 price: x[i].quote.USD.price,
//                 marketCap: x[i].quote.USD.market_cap,
//                 volume24h: x[i].quote.USD.volume_24h,
//                 circulatingSupply: x[i].circulating_supply,
//                 timeStamp: x[i].last_updated
//             }
//             // console.log(listing.name);
//             // console.log(listing.ticker);
//             // console.log(listing.price);
//             // console.log(listing.marketCap);
//             // console.log(listing.volume24h);
//             // console.log(listing.circulatingSupply);
//             // console.log(listing.timeStamp);
//             break;
//         }
//     }).catch(err => {
//         console.log(err);
//     })
//     return 0;
// }

// make_request();

// module.exports = make_request;
