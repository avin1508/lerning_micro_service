const express = require('express');
const dotenv = require('dotenv');
const { connectProducer } = require('./utils/kafka');

// importing routes
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

// ✅ Proper async start
const startServer = async () => {
    try {
        await connectProducer();

        app.listen(3000, () => {
            console.log(`auth service is listening on port 3000`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
    }
};

startServer();