const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async ({ username, email, password, first_name, last_name }) => {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
      first_name,
      last_name,
    },
  });
  return user;
};

const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

module.exports = { createUser, findUserByEmail };
