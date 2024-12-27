const Movie = require("../../models/Movie");
const { ApiError } = require("../../utils/ApiError");
const { ApiResponse } = require("../../utils/ApiResponse");

const deleteAllMovies = async (req, res) => {
    try {
        const data = await Movie.deleteMany();
        res.json(data);
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting all movies', error: error.message
        })
    }
};


const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Movie.findByIdAndDelete(id);
        res.status(200).json(
            new ApiResponse(200, 'Movie deleted successfully', data)
        );

        // res.status(200).json({
        //     message: 'Movie deleted successfully',
        //     data: data
        // })
        
    } catch (error) {
    throw new ApiError(500, 'Error deleting movie')
    // return res.status(500).json({
    //     message: 'Error deleting movie', error: error.message
    // })
}
}

module.exports = {
    deleteAllMovies,
    deleteById
}