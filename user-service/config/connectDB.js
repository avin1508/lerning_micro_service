const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_CLUSTER_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

        await mongoose.connect(DB_URL);

        console.log(`✅ Connected to MongoDB: ${process.env.DB_NAME}`);
    } catch (error) {
        console.error("❌ DB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;