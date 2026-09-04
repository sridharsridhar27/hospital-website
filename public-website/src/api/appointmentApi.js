
import api from './axios';


/*
 * =========================================================
 * CREATE APPOINTMENT
 * =========================================================
 */

export const createAppointment = async ({
  name,
  phoneNumber,
  appointmentDate,
  speciality,
  timing,
  problem,
}) => {
  const response = await api.post(
    '/appointments',
    {
      name,
      phoneNumber,
      appointmentDate,
      speciality,
      timing,
      problem,
    }
  );

  return response.data;
};

