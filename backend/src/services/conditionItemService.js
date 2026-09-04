const prisma = require('../config/prisma');


/*
 * =========================================================
 * GET ALL ITEMS FOR A CONDITION
 * =========================================================
 */
const getConditionItems = async (
  conditionId
) => {
  return prisma.conditionItem.findMany({
    where: {
      conditionId,
    },

    orderBy: {
      createdAt: 'asc',
    },
  });
};


/*
 * =========================================================
 * GET ONE CONDITION ITEM BY ID
 * =========================================================
 */
const getConditionItemById = async (
  id
) => {
  return prisma.conditionItem.findUnique({
    where: {
      id,
    },
  });
};


/*
 * =========================================================
 * CREATE CONDITION ITEM
 * =========================================================
 */
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


/*
 * =========================================================
 * UPDATE CONDITION ITEM
 * =========================================================
 */
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


/*
 * =========================================================
 * DELETE CONDITION ITEM
 * =========================================================
 */
const deleteConditionItem = async (
  id
) => {
  return prisma.conditionItem.delete({
    where: {
      id,
    },
  });
};


module.exports = {
  getConditionItems,
  getConditionItemById,
  createConditionItem,
  updateConditionItem,
  deleteConditionItem,
};