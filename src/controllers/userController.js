const UserService = require('../services/userService');

const signUp = async (req, res, next) => {
  try {
    const { username, email, password, first_name, last_name } = req.body;
    const user = await UserService.signUp({ username, email, password, first_name, last_name });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await UserService.login({ email, password });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, login };

