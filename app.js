const express = require('express');
const cors = require('cors'); 
const authRoutes = require('./src/rourtes/authRoutes');
const movieRoutes = require('./src/rourtes/movieRoutes');
const users = require('./src/rourtes/users')
const cartRoutes = require("./src/rourtes/cartRoutes")
const orderRoutes=require("./src/rourtes/orderRoutes")
const orderItem=require('./src/rourtes/OrderItem')
// const { authenticateToken } = require('./src/routes/authenticateToken');
const  authenticateToken = require('./src/authenticateToken');

const helmet = require('helmet');
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());
app.use(helmet());


app.use(cors());
app.use(morgan("dev"));
app.use('/', authRoutes);
app.use('/movies', authenticateToken, movieRoutes);
app.use('/orders', authenticateToken, orderRoutes);
app.use('/carts', authenticateToken, cartRoutes);
app.use('/users', authenticateToken, users);
app.use('orderItems',authenticateToken,orderItem)


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

module.exports=app