const express = require('express');
const { app } = require('./app')
const server = require('http').createServer(app);
const connectionStablish = require('./config/db');
const PORT = process.env.PORT || 5555;

app.use(express.json());

connectionStablish()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`server starting at ${PORT}`);
        })
    })
    .catch((err) => {
        console.log('Error connecting to database : ' + err.message);
    })