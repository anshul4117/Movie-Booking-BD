const express = require('express');
const { addMovies } = require('../controllers/Movie/AddMovies');
const { auth, isAdmin } = require('../middleware/authMiddleware');
const { getAllMovies, getMovieById } = require('../controllers/Movie/getMovie');
const { deleteAllMovies, deleteById } = require('../controllers/Movie/deleteMovie');
const router = express.Router();


// router.get('/',getAllMovies);
router.post('/', auth, isAdmin, addMovies);
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.delete('/', auth, isAdmin, deleteAllMovies);
router.delete('/:id', auth, isAdmin, deleteById);

module.exports = router;