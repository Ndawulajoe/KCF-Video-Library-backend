const OrderService = require('../services/orderService');

const createOrder = async (req, res, next) => {
  try {
    const { userId, cartItems } = req.body;
    const order = await OrderService.createOrder(userId, cartItems);
    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await OrderService.getOrderById(orderId);
    res.json({ order });
  } catch (error) {
    next(error);
  }
};

const getOrdersByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orders = await OrderService.getOrdersByUser(userId);
    res.json({ orders });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrderById, getOrdersByUser };
