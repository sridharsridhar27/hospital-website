const prisma = require('../config/prisma');

const getAllServices = async () => {
  return prisma.service.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
};

const getServicesByCategory = async (category) => {
  return prisma.service.findMany({
    where: {
      category,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};

const getServiceById = async (id) => {
  return prisma.service.findUnique({
    where: {
      id,
    },
  });
};

const createService = async ({
  category,
  name,
  description,
  imageKey,
}) => {
  return prisma.service.create({
    data: {
      category,
      name,
      description,
      imageKey,
    },
  });
};

const updateService = async (
  id,
  {
    category,
    name,
    description,
    imageKey,
  }
) => {
  return prisma.service.update({
    where: {
      id,
    },
    data: {
      category,
      name,
      description,
      imageKey,
    },
  });
};

const deleteService = async (id) => {
  return prisma.service.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllServices,
  getServicesByCategory,
  getServiceById,
  createService,
  updateService,
  deleteService,
};