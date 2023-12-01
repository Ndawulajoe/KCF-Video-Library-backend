
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Route to handle order creation
router.post('/', async (req, res) => {
    const { userId, movieId, quantity } = req.body;
  
    try {
      
      const movie = await prisma.movie.findUnique({
        where: {
          id: parseInt(movieId),
        },
      });
  
      if (!movie) {
        return res.status(404).send('Movie not found.');
      }
  
      const moviePrice = movie.price;
      const totalPrice = moviePrice * quantity;
  
      // Create the order
      const order = await prisma.order.create({
        data: {
          userId: parseInt(userId),
          orderDate: new Date(),
          totalPrice: totalPrice.toString(),
          orderItems: {
            create: [
              {
                movieId: parseInt(movieId),
                quantity: parseInt(quantity),
                subtotal: totalPrice.toString(),
              },
            ],
          },
        },
        include: {
          orderItems: true,
        },
      });
  
      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
// Route to handle retrieving all orders
router.get('/', async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle retrieving a specific order by ID
router.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(orderId),
      },
    });

    if (!order) {
      return res.status(404).send('Order not found.');
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle deleting a specific order by ID

router.delete('/:orderId', async (req, res) => {
    const { orderId } = req.params;
  
    try {
      // Check if the order exists
      const existingOrder = await prisma.order.findUnique({
        where: {
          id: parseInt(orderId),
        },
      });
  
      if (!existingOrder) {
        return res.status(404).send('Order not found.');
      }
  
      // Check if there are associated OrderItems
      const associatedOrderItems = await prisma.orderItem.findMany({
        where: {
          orderId: existingOrder.id,
        },
      });
  
      if (associatedOrderItems.length > 0) {
        // Delete associated OrderItems first
        await prisma.orderItem.deleteMany({
          where: {
            orderId: existingOrder.id,
          },
        });
      }
  
      // Delete the order
      const deletedOrder = await prisma.order.delete({
        where: {
          id: existingOrder.id,
        },
      });
  
      res.json({
        message: 'Order deleted successfully',
        deletedOrder,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  
  
  
  
module.exports = router;
