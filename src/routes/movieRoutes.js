const express = require('express');
const { addMovies } = require('../controllers/Movie/AddMovies');
const { auth, isAdmin } = require('../middleware/authMiddleware');
const { getAllMovies, getMovieById } = require('../controllers/Movie/getMovie');
const router = express.Router();

// router.get('/',getAllMovies);
router.post('/', auth, isAdmin, addMovies);
router.get('/', getAllMovies);
router.get('/:id', getMovieById);

module.exports = router;