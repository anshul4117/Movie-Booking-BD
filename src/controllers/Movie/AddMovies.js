const Movie = require('../../models/Movie');
const Screen = require('../../models/Seats')
const generateSeat = require('../../services/Seat/seat');
const { ApiError } = require('../../utils/ApiError');
const { ApiResponse } = require('../../utils/ApiResponse');

const addMovies = async (req, res) => {
    const { title, genre, duration, language, showTimes } = req.body;
    if (["title", "genre", "duration", "language", "showTimes"].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const movieExist = await Movie.findOne({ title });
    if (movieExist) {
        throw new ApiError(400, "Movie already exist");
    }
    const movie = new Movie({
        title,
        genre,
        duration,
        language,
        showTimes
    });
    await movie.save();

    // Generate and save seats for this movie
    const screenData = generateSeat(movie._id);
    const screen = new Screen(screenData);
    await screen.save();

    res.status(201).json(
        new ApiResponse(200, screen, "Movie Added Successfully")
    );
};


module.exports = {
    addMovies
}