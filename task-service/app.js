const express = require('express');
const dotenv = require('dotenv');
const { connectConsumer } = require('./utils/kafka');

// importing the routes here
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

app.use(express.json());



// ✅ Call AFTER server starts
const startServer = async () => {
    try {
        await connectConsumer();

        app.use('/api/tasks', taskRoutes);

        app.listen(3001, () => {
            console.log(`🚀 Task service running on port 3001`);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
    }
};

startServer();