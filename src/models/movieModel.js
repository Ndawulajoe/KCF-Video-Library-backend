const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllMovies = async () => {
  const movies = await prisma.movie.findMany();
  return movies;
};

const getMovieById = async (movieId) => {
  const movie = await prisma.movie.findUnique({
    where: { id: parseInt(movieId) },
  });
  return movie;
};

const addMovie = async ({ title, description, director, price, rating, genre }) => {
  const movie = await prisma.movie.create({
    data: { title, description, director, price, rating, genre },
  });
  return movie;
};

const updateMovie = async (movieId, { title, description, director, price, rating, genre }) => {
  const updatedMovie = await prisma.movie.update({
    where: { id: parseInt(movieId) },
    data: { title, description, director, price, rating, genre },
  });
  return updatedMovie;
};

const deleteMovie = async (movieId) => {
  await prisma.movie.delete({
    where: { id: parseInt(movieId) },
  });
};

module.exports = { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie };
