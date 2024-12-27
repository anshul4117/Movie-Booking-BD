const Movie = require('../../models/Movie');
const redis = require('../../config/redis');

// Get all movies
const getAllMovies = async (req, res) => {
    try {
        const cacheKey = 'movies_all';

        // Check Redis connectivity using the ping method (async/await)
        const pingResult = await redis.ping();
        if (pingResult !== 'PONG') {
            return res.status(500).json({ error: 'Redis is not connected' });
        }
        // Check if data exists in the cache
        const data = await redis.get(cacheKey); // Use await for async call

        if (data) {
            console.log('Cache hit: Returning movies from Redis');
            return res.status(200).json(JSON.parse(data)); // Return cached data
        } else {
            console.log('Cache miss: Fetching movies from DB');
            const movies = await Movie.find(); // Fetch movies from the database

            // Cache the movies data for 1 hour
            await redis.setEx(cacheKey, 60, JSON.stringify(movies)); // Cache for 1 hour
            return res.status(200).json(movies); // Return the movies from DB
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

// Get a specific movie by ID
const getMovieById = async (req, res) => {
    try {
        const movieId = req.params.id;
        console.log(movieId)
        const cacheKey = `movie:${movieId}`; // Cache key for the specific movie

        // Check if the movie is in the cache
        const cachedMovie = await redis.get(cacheKey);

        if (cachedMovie) {
            console.log('Cache hit: Returning movie from Redis');
            return res.status(200).json(JSON.parse(cachedMovie)); // Return cached movie
        } else {
            console.log('Cache miss: Fetching movie from DB');
            // Fetch the movie from the database if not in cache
            const movie = await Movie.findById(movieId);
            if (!movie) {
                return res.status(404).json({ error: 'Movie not found' });
            }
            // Cache the movie data for 1 hour
            await redis.setEx(cacheKey,  60, JSON.stringify(movie)); // Cache for 1 hour
            return res.status(200).json(movie); // Return the movie from DB
        }
    } catch (err) {
        console.error('Error fetching movie by ID:', err);
        return res.status(500).json({ error: 'Failed to fetch movie' });
    }
};

module.exports = { getAllMovies, getMovieById };
