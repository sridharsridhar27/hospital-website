const prisma = require('../config/prisma');

const getAllTeamMembers = async () => {
  return prisma.teamMember.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
};

const getTeamMemberById = async (id) => {
  return prisma.teamMember.findUnique({
    where: {
      id,
    },
  });
};

const createTeamMember = async ({
  name,
  designation,
  about,
  imageKey,
}) => {
  return prisma.teamMember.create({
    data: {
      name,
      designation,
      about,
      imageKey,
    },
  });
};

const updateTeamMember = async (
  id,
  {
    name,
    designation,
    about,
    imageKey,
  }
) => {
  return prisma.teamMember.update({
    where: {
      id,
    },
    data: {
      name,
      designation,
      about,
      imageKey,
    },
  });
};

const deleteTeamMember = async (id) => {
  return prisma.teamMember.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};