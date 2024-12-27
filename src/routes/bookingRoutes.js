const express = require('express');
const router = express.Router();
const { bookYourSeat } = require('../controllers/Booking/booking')
const { auth } = require('../middleware/authMiddleware')

router.post('/', auth, bookYourSeat)

module.exports = router;