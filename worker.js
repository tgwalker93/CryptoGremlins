const amqp = require('amqplib/callback_api');
var Comment = require("./db/models/comment.js");
var db = require("./db/index.js");

const CONN_URL = 'amqps://hsmwnpfw:zb7Vhy7jLaV3KpBgHb4MhCkEoKY96QdW@moose.rmq.cloudamqp.com/hsmwnpfw';
let counter = 0;
function run() {
    console.log('Worker is running.');
    amqp.connect(CONN_URL, function (err, conn) {
        conn.createChannel(function (err, channel) {
            channel.consume('spam', function (msg) {
                console.log(`Message received: ${msg.content}`);
                if (counter > 15) {
                    checkSpam();
                    counter = 0;
                }
                else {
                    counter++;
                }
            }, { noAck: true });
        });
    });
}

function checkSpam() {
    console.log('Checking for spam messages.');
    Comment.find({}).sort({ timestamp: -1 }).limit(30).exec(function (err, comments) {
        const frequencies = {};
        for (let comment of comments) {
            frequencies[comment.text] = frequencies[comment.text] ? frequencies[comment.text] + 1 : 1;
            if (frequencies[comment.text] > 3) {
                console.log(`Spam detected on commentId: ${comment._id}`);
                Comment.findByIdAndRemove(comment._id, function(err){
                });
            }
        }
    });
}

run();