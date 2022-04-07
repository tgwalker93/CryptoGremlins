require("regenerator-runtime/runtime");
const request = require('../src/services/request');
// const make_request = require('../src/collectData')

var url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=';
var apikey = {
  key: '461f750d-2657-4821-89f9-4b0659d0f35a'
}

test('request successful', async () => {
    const btc = await request(url+apikey.key);
    expect(btc.data[0].symbol).toEqual('BTC');
});

// test('request successful', () => {
//   return expect(make_request()).toBe(0);
// });

// test('request successful', () => {
//   return expect(make_request()).resolves.toBe('Success');
// });