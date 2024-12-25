const mongoose = require('mongoose');
require('dotenv').config();

const connectionStablish = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');

};

module.exports = connectionStablish;