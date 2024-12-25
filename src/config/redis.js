const { createClient } = require('redis');
const dotenv = require('dotenv');
dotenv.config();

const client = createClient({
    url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err.message);
});

client.connect();  // Make sure to call connect() for the client to establish a connection

module.exports = client;
