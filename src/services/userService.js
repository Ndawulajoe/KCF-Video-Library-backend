const UserModel = require('../models/userModel');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');

const signUp = async ({ username, email, password, first_name, last_name }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.createUser({ username, email, password: hashedPassword, first_name, last_name });
  return user;
};

const login = async ({ email, password }) => {
  const user = await UserModel.findUserByEmail(email);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ userId: user.id });
  return token;
};

module.exports = { signUp, login };

