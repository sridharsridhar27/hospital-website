const prisma = require('../config/prisma');

const getAllConditions = async () => {
  return prisma.condition.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
};

const getConditionById = async (id) => {
  return prisma.condition.findUnique({
    where: {
      id,
    },
  });
};

const getConditionBySlug = async (slug) => {
  return prisma.condition.findUnique({
    where: {
      slug,
    },
  });
};

const createCondition = async ({
  name,
  slug,
  description,
  imageKey,
}) => {
  return prisma.condition.create({
    data: {
      name,
      slug,
      description,
      imageKey,
    },
  });
};

const updateCondition = async (
  id,
  {
    name,
    slug,
    description,
    imageKey,
  }
) => {
  return prisma.condition.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
      description,
      imageKey,
    },
  });
};

const deleteCondition = async (id) => {
  return prisma.condition.delete({
    where: {
      id,
    },
  });
};

const getConditionItems = async (conditionId) => {
  return prisma.conditionItem.findMany({
    where: {
      conditionId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};

const getConditionItemById = async (id) => {
  return prisma.conditionItem.findUnique({
    where: {
      id,
    },
  });
};

const createConditionItem = async ({
  conditionId,
  name,
  description,
  imageKey,
}) => {
  return prisma.conditionItem.create({
    data: {
      conditionId,
      name,
      description,
      imageKey,
    },
  });
};

const updateConditionItem = async (
  id,
  {
    name,
    description,
    imageKey,
  }
) => {
  return prisma.conditionItem.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      imageKey,
    },
  });
};

const deleteConditionItem = async (id) => {
  return prisma.conditionItem.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllConditions,
  getConditionById,
  getConditionBySlug,
  createCondition,
  updateCondition,
  deleteCondition,
  getConditionItems,
  getConditionItemById,
  createConditionItem,
  updateConditionItem,
  deleteConditionItem,
};