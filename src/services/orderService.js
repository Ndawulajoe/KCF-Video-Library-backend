const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (userId, cartItems) => {
  // Ensure that the user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Calculate total price from cart items
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.quantity * item.movie.price;
  }, 0);

  // Create order
  const order = await prisma.order.create({
    data: {
      userId,
      orderDate: new Date(),
      totalPrice,
      orderItems: {
        createMany: {
          data: cartItems.map((item) => ({
            movieId: item.movieId,
            quantity: item.quantity,
            subtotal: item.quantity * item.movie.price,
          })),
        },
      },
    },
    include: {
      orderItems: {
        include: {
          movie: true,
        },
      },
    },
  });

  // Clear the user's cart after creating the order
  await prisma.cart.deleteMany({
    where: {
      userId,
    },
  });

  return order;
};

const getOrderById = async (orderId) => {
  const order = await prisma.order.findUnique({
    where: { id: parseInt(orderId) },
    include: {
      orderItems: {
        include: {
          movie: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error('Order not found');
  }

  return order;
};

const getOrdersByUser = async (userId) => {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      orderItems: {
        include: {
          movie: true,
        },
      },
    },
  });

  return orders;
};

module.exports = { createOrder, getOrderById, getOrdersByUser };
