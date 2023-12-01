const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
