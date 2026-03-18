const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnection');
const { connectProducer } = require('./utils/kafka');


const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

const startServer = async () => {
    try {
        await connectDB();

        await connectProducer();

        app.listen(3000, () => {
            console.log(`🚀 auth service is listening on port 3000`);
        });

    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1); 
    }
};

startServer();