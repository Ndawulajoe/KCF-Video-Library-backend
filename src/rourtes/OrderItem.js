const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { orderId, movieId, quantity, subtotal } = req.body;
  
  try {
    const createdOrderItem = await prisma.orderItem.create({
      data: {
        orderId,
        movieId,
        quantity,
        subtotal,
      },
    });
    
    res.status(201).json(createdOrderItem);
  } catch (error) {
    console.error('Error creating order item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.get('/', async (req, res) => {
    const orderId = parseInt(req.query.orderId);
    
    try {
      const itemsForOrder = await prisma.orderItem.findMany({
        where: {
          orderId: orderId,
        },
      });
      
      res.json(itemsForOrder);
    } catch (error) {
      console.error('Error fetching order items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  router.put('/:orderItemId', async (req, res) => {
    const orderItemId = parseInt(req.params.orderItemId);
    const { quantity, subtotal } = req.body;
    
    try {
      const updatedOrderItem = await prisma.orderItem.update({
        where: {
          id: orderItemId,
        },
        data: {
          quantity,
          subtotal,
        },
      });
      
      res.json(updatedOrderItem);
    } catch (error) {
      console.error('Error updating order item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/:orderItemId', async (req, res) => {
    const orderItemId = parseInt(req.params.orderItemId);
    
    try {
      const deletedOrderItem = await prisma.orderItem.delete({
        where: {
          id: orderItemId,
        },
      });
      
      res.json(deletedOrderItem);
    } catch (error) {
      console.error('Error deleting order item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  
  module.exports = router;
  
  
  
