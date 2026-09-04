
const prisma = require('../config/prisma');


/*
 * =========================================================
 * GET ALL APPOINTMENTS
 * =========================================================
 */

const getAllAppointments = async () => {
  return prisma.appointment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};


/*
 * =========================================================
 * GET APPOINTMENT BY ID
 * =========================================================
 */

const getAppointmentById = async (id) => {
  return prisma.appointment.findUnique({
    where: {
      id,
    },
  });
};


/*
 * =========================================================
 * CREATE APPOINTMENT
 * =========================================================
 */

const createAppointment = async ({
  name,
  phoneNumber,
  appointmentDate,
  speciality,
  timing,
  problem,
  description,
}) => {
  return prisma.appointment.create({
    data: {
      name,
      phoneNumber,
      appointmentDate,
      speciality,
      timing,
      problem,
      description,
    },
  });
};


/*
 * =========================================================
 * UPDATE APPOINTMENT DESCRIPTION
 * =========================================================
 */

const updateAppointmentDescription = async (
  id,
  description
) => {
  return prisma.appointment.update({
    where: {
      id,
    },
    data: {
      description,
    },
  });
};


/*
 * =========================================================
 * UPDATE APPOINTMENT STATUS
 * =========================================================
 */

const updateAppointmentStatus = async (
  id,
  status
) => {
  return prisma.appointment.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};


/*
 * =========================================================
 * DELETE APPOINTMENT
 * =========================================================
 */

const deleteAppointment = async (id) => {
  return prisma.appointment.delete({
    where: {
      id,
    },
  });
};


module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointmentDescription,
  updateAppointmentStatus,
  deleteAppointment,
};

