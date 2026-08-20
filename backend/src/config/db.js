const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart_food_donation', {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('⚠️ Make sure your MongoDB daemon is running locally or provide a valid MONGODB_URI in backend/.env');
    // Do not crash immediately in dev mode, allows server to provide helpful error responses
    return null;
  }
};

module.exports = connectDB;
