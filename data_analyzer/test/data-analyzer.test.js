require("regenerator-runtime/runtime");
const analyze = require('../analyzer')
var Comment = require("../../db/models/comment.js");



it('Should not analyze comments of incorrect format', async () => {
    Comment.find = jest.fn().mockReturnValueOnce([
        {title: 'some title',
         text: 'some text',
        coinTicker: 'BTC'},
        {title: 'title 2',
         text: -9,
        coinTicker: 'ETH'}
    ]);

    Comment.prototype.save = jest.fn().mockImplementation(() => {});

    await expect(analyze()).rejects.toThrowError();
    // await expect(analyze()).toBe(0);
})