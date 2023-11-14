const express = require('express');
// const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoutes = require('./src/routes/userRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 3002;

// app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes


app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found!......");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});




module.exports = app;