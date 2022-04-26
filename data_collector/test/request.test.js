// require("regenerator-runtime/runtime");
const request = require('../src/services/request');
const axios = require('axios');

jest.mock('axios');

it('first coin from request listing is Bitcoin', async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        name: 'Bitcoin',
        ticker: 'BTC'
      },
      {
        name: 'Ethereum',
        ticker: 'ETH'
      }
    ]
  });
  const listing = await request('some_url');
  expect(listing[0].ticker).toEqual('BTC');
  expect(listing[1].ticker).toEqual('ETH');
});



// test('request successful', () => {
//   return expect(make_request()).toBe(0);
// });

// test('request successful', () => {
//   return expect(make_request()).resolves.toBe('Success');
// });