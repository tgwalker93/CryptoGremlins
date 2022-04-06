var Comment = require("../db/models/comment.js");
var Trending = require("../db/models/trending.js");
var db = require("../db/index.js");

async function run() {
    console.log("Data analyzer is running....");
    const comments = await Comment.find({}).sort({ timestamp: -1 }).limit(30).exec();
    const frequencies = {};
    let max = comments[0].coinTicker;
    for (let comment of comments) {
        frequencies[comment.coinTicker] = frequencies[comment.coinTicker] ? frequencies[comment.coinTicker] + 1 : 1;
        if(frequencies[comment.coinTicker] > frequencies[max]){
            max = comment.coinTicker;
        }
    }

    await Trending.deleteMany({});
    const trending = {
        coinTicker: max,
        numComments: frequencies[max]
    }

    let dbTrending = new Trending(trending);
    await dbTrending.save();

    console.log("Data analyzer completed.");
    process.exit();
}

run();