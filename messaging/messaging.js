const amqp = require('amqplib');

const CONN_URL = process.env.CLOUDAMQP_URL;

(async () => {
    try {
        const connection = await amqp.connect(CONN_URL);
        const channel = await connection.createChannel();

        const publishToQueue = (queueName, data) => {
            const message = Buffer.from(data);
            channel.sendToQueue(queueName, message);
        };

        process.on('beforeExit', async (code) => {
            await channel.close();
            console.log('Closing RabbitMQ channel');
        });

        module.exports = { publishToQueue };
    } catch (error) {
        console.error('Error:', error);
    }
})();