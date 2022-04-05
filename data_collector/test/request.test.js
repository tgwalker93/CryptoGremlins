
const request = require('../src/services/request')


var apikey = {
    key: '461f750d-2657-4821-89f9-4b0659d0f35a'
  }

test('request successful', () => {
    return expect(request('GET', 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + apikey.key))
    .resolves.toBe('Success');
});