const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

router.post('/', OrderController.createOrder);

router.get('/:orderId', OrderController.getOrderById);


router.get('/user/:userId', OrderController.getOrdersByUser);

module.exports = router;
