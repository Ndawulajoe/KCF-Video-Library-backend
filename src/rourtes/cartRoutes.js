const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Route: POST /cart/:movieId
router.post('/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user.id;

  try {
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        userId: userId,
        movieId: parseInt(movieId),
      },
    });

    if (existingCartItem) {
      await prisma.cart.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + 1,
        },
      });
    } else {
        await prisma.cart.create({
            data: {
              userId: userId, 
              movie: {
                connect: { id: parseInt(movieId) },
              },
              quantity: 1,
              dateAdded: new Date(),
              user: {
                connect: { id: userId }, 
              },
            },
          });
    }

    res.status(200).send('Movie added to the cart successfully');
  } catch (error) {
    console.error('Error adding movie to the cart:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route: GET /cart
router.get('/', async (req, res) => {
  const userId = req.user.id;

  try {
    const cartItems = await prisma.cart.findMany({
      where: {
        userId: userId,
      },
      include: {
        movie: true,
      },
    });

    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching user cart:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route: PUT /cart/:cartItemId
router.put('/:cartItemId', async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  try {
    await prisma.cart.update({
      where: {
        id: parseInt(cartItemId),
      },
      data: {
        quantity: parseInt(quantity),
      },
    });

    res.status(200).send('Cart item quantity updated successfully');
  } catch (error) {
    console.error('Error updating cart item quantity:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route: DELETE /cart/:cartItemId
router.delete('/:cartItemId', async (req, res) => {
  const { cartItemId } = req.params;

  try {
    await prisma.cart.delete({
      where: {
        id: parseInt(cartItemId),
      },
    });

    res.status(200).send('Movie removed from the cart successfully');
  } catch (error) {
    console.error('Error removing movie from the cart:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
