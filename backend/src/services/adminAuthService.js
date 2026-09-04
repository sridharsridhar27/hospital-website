const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = require('../config/prisma');

const createAdminUser = async (email, password) => {
  const existingAdmin = await prisma.adminUser.findUnique({
    where: {
      email,
    },
  });

  if (existingAdmin) {
    throw new Error('Admin user already exists');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
    },
  });

  return {
    id: admin.id,
    email: admin.email,
  };
};

const loginAdmin = async (email, password) => {
  const admin = await prisma.adminUser.findUnique({
    where: {
      email,
    },
  });

  if (!admin) {
    throw new Error('Invalid email or password');
  }

  const passwordValid = await bcrypt.compare(
    password,
    admin.passwordHash
  );

  if (!passwordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    {
      adminId: admin.id,
      email: admin.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    }
  );

  return {
    token,
    admin: {
      id: admin.id,
      email: admin.email,
    },
  };
};

module.exports = {
  createAdminUser,
  loginAdmin,
};