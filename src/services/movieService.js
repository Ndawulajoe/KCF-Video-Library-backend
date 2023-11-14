const MovieModel = require('../models/movieModel');

const getAllMovies = async () => {
  const movies = await MovieModel.getAllMovies();
  return movies;
};

const getMovieById = async (movieId) => {
  const movie = await MovieModel.getMovieById(movieId);
  return movie;
};

const addMovie = async ({ title, description, director, price, rating, genre }) => {
  const movie = await MovieModel.addMovie({ title, description, director, price, rating, genre });
  return movie;
};

const updateMovie = async (movieId, { title, description, director, price, rating, genre }) => {
  const updatedMovie = await MovieModel.updateMovie(movieId, { title, description, director, price, rating, genre });
  return updatedMovie;
};

const deleteMovie = async (movieId) => {
  await MovieModel.deleteMovie(movieId);
};

module.exports = { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie };
