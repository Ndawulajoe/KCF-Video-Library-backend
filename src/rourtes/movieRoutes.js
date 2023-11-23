// movieRoutes.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
// const fs = require('fs/promises');

const router = express.Router();
const prisma = new PrismaClient();
// const uploadDir = path.join(__dirname, '../uploads');

// Route to handle movie creation with image link
router.post('/movies', async (req, res) => {
  const { title, description, director, price, rating, genre, cover_image } = req.body;

  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        director,
        price,
        rating,
        genre,
        cover_image, 
      },
    });

    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Route to handle retrieving all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle retrieving a specific movie by ID
router.get('/movies/:movieId', async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: parseInt(movieId),
      },
    });

    if (!movie) {
      return res.status(404).send('Movie not found.');
    }

    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Route to handle retrieving a specific movie by name
router.get('/movies/name/:movieName', async (req, res) => {
  const movieName = req.params.movieName; 

  try {
    const movie = await prisma.movie.findFirst({
      where: {
        title: movieName, 
      },
    });

    if (!movie) {
      return res.status(404).send('Movie not found.');
    }

    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Route to handle editing a specific movie by ID
router.put('/movies/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const { title, description, director, price, rating, genre } = req.body;

  try {
    const updatedMovie = await prisma.movie.update({
      where: {
        id: parseInt(movieId),
      },
      data: {
        title,
        description,
        director,
        price,
        rating,
        genre,
      },
    });

    res.json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle retrieving a specific movie by name
router.get('/movies/name/:movieName', async (req, res) => {
  const { movieName } = req.params;

  try {
    const movie = await prisma.movie.findFirst({
      where: {
        title: movieName,
      },
    });

    if (!movie) {
      return res.status(404).send('Movie not found.');
    }

    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});





// Route to handle deleting a specific movie by ID
router.delete('/movies/:movieId', async (req, res) => {
  const { movieId } = req.params;

  try {
    const deletedMovie = await prisma.movie.delete({
      where: {
        id: parseInt(movieId),
      },
    });

    res.json({
      message: "Deleted successfully",
      deletedMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
