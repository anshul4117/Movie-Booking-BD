const { ApiError } = require("../../utils/ApiError");
const { ApiResponse } = require("../../utils/ApiResponse");

const bookYourSeat = async (req, res) => {
    try {
        const userId = req.user.id;
        const { seatNumber, noOfSeats } = req.params;
        

    } catch (error) {
        throw new ApiError(500, 'Failed to fetch movies')
        // res.status(500).json({ error: 'Failed to fetch movies' });
    }
}

module.exports = {
    bookYourSeat
}