const { Kafka } = require('kafkajs');
const { createUserIfNotExists } = require('../services/userService');
const logger = require('./logger');

const kafka = new Kafka({
    clientId: 'user-service',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'user-service-group' });

const runConsumer = async () => {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: process.env.KAFKA_TOPIC || 'user-events', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ message }) => {
                try {
                    const event = JSON.parse(message.value.toString());
                    logger.info(`Received event: ${event.type}`);

                    if (event.type === 'USER_CREATED') {
                        console.log("this is the event data", event.data)
                        await createUserIfNotExists(event.data);
                        logger.info(`User processed: ${event.data.email}`);
                    }
                } catch (err) {
                    logger.error(`Failed to process message: ${err.message}`);
                }
            }
        });

        logger.info('Kafka consumer is running...');
    } catch (error) {
        logger.error(`Error starting Kafka consumer: ${error.message}`);
        process.exit(1);
    }
};

module.exports = { runConsumer };