// config/database.js
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/evalapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Success connection to database MongoDB');
  } catch (error) {
    console.error('Error connection to database MongoDB:', error);
    process.exit(1); // exit app 
  }
}

module.exports = connectDB;