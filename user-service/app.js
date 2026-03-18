require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connectDB');
const { runConsumer } = require('./utils/kafka');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Use user routes
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3002;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 User service is listening on port ${PORT}`);
        });

        // Start Kafka consumer after DB is ready
        runConsumer();
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();