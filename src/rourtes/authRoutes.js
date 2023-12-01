const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
// const { authenticateToken } = require('./src/routes/authenticateToken');
const router = express.Router();
const prisma = new PrismaClient();
const saltRounds = 10;
const jwtSecretKey = process.env.JWT_SECRET;
const expiresIn = '12h'; 


// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Route to handle user signup
router.post(
  '/signup',
  body('username').isString(),
  body('password').isString(),
  body('email').isEmail(),
  body('first_Name').isString(),
  body('last_Name').isString(),
  // body('role').isIn(['ADMIN', 'USER']),
  validate,
  async (req, res) => {
    const { username, password, email, first_name, last_name} = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          email,
          first_name,
          last_name,
          
        },
      });

      res.status(201).json(user);
    } catch (error) {
      console.error(error);

      if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
        return res.status(400).json({ message: 'Username is already taken.' });
      }

      res.status(500).send('Internal Server Error');
    }
  }
);

// Route to handle user login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(401).send('Invalid username or password.');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send('Invalid username or password.');
    }

    
    const accessToken = jwt.sign({ username: user.username }, jwtSecretKey, { expiresIn });
    // const accessToken = jwt.sign({ username: user.username  }, jwtSecretKey);

    res.json({ accessToken ,userId: user.id});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

