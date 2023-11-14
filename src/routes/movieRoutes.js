const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movieController');


router.get('/', MovieController.getAllMovies);


router.get('/:movieId', MovieController.getMovieById);


router.post('/', MovieController.addMovie);


router.put('/:movieId', MovieController.updateMovie);


router.delete('/:movieId', MovieController.deleteMovie);

module.exports = router;
