const MovieService = require('../services/movieService');

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await MovieService.getAllMovies();
    res.json({ movies });
  } catch (error) {
    next(error);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await MovieService.getMovieById(movieId);
    res.json({ movie });
  } catch (error) {
    next(error);
  }
};

const addMovie = async (req, res, next) => {
  try {
    const { title, description, director, price, rating, genre } = req.body;
    const movie = await MovieService.addMovie({ title, description, director, price, rating, genre });
    res.status(201).json({ movie });
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { title, description, director, price, rating, genre } = req.body;
    const updatedMovie = await MovieService.updateMovie(movieId, { title, description, director, price, rating, genre });
    res.json({ updatedMovie });
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    await MovieService.deleteMovie(movieId);
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie };
