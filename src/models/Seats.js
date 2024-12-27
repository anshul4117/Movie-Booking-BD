const mongoose = require('mongoose');

// Seat Schema for individual seats
const seatSchema = new mongoose.Schema({
    seatNumber: {
        type: String,
        required: true,
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        required: true,
    },
});

// Row Schema for rows like A, B, C, etc.
const rowSchema = new mongoose.Schema({
    rowName: {
        type: String,
        required: true,
    },
    seats: [seatSchema], // Array of seats within this row
});

// Screen Schema that holds multiple rows
const screenSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    screenName: {
        type: String,
        required: true,
    },
    rows: [rowSchema], // Array of rows for this screen
});

// Model for Screen
const Screen = mongoose.model('Screen', screenSchema);

// Export the Screen model
module.exports = Screen;