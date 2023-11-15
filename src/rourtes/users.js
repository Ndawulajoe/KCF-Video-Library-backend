
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Route to get all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get a user by name
router.get('/name/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', async (req, res) => {
    const userId = parseInt(req.params.id, 10);
  
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: userId,
        },
      });
  
      res.json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;

