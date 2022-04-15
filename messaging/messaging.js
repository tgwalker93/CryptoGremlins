const amqp = require('amqplib/callback_api');

const CONN_URL = 'amqps://hsmwnpfw:zb7Vhy7jLaV3KpBgHb4MhCkEoKY96QdW@moose.rmq.cloudamqp.com/hsmwnpfw';
let ch = null;
amqp.connect(CONN_URL, function(err, conn){
    conn.createChannel(function(err, channel){
        ch = channel;
    })
})

const publishToQueue = async (queueName, data) => {
    ch.sendToQueue(queueName, new Buffer.from(data));
}

process.on('exit', (code) =>{
    ch.close();
    console.log('Closing rabbitmq channel');
});

module.exports = {publishToQueue}