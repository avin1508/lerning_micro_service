const { Kafka } = require('kafkajs');
const { createTask } = require('../model/task');

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
            console.log(data)

        const task = {
            title: "welcome task",
            userId: data.data.userId  
        }

            createTask(task)
        }
    });
};

module.exports = {
    connectConsumer
}