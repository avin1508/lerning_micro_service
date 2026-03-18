const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'task-service',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'task-group' });

const connectConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'user-events', fromBeginning: true})

    await consumer.run({
        eachMessage: async ({ message }) => {
            const data = JSON.parse(message.value.toString())
            console.log(data);
        }
    });
};

module.exports = {
    connectConsumer
}