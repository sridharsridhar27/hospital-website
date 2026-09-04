
import api from './axios';

/*
 * =========================================================
 * GET ALL APPOINTMENTS
 * =========================================================
 */

export const getAppointments = async () => {
  const response = await api.get('/appointments');

  return response.data;
};

/*
 * =========================================================
 * GET APPOINTMENT BY ID
 * =========================================================
 */

export const getAppointmentById = async (id) => {
  const response = await api.get(
    `/appointments/${id}`
  );

  return response.data;
};

/*
 * =========================================================
 * UPDATE APPOINTMENT DESCRIPTION
 * =========================================================
 */

export const updateAppointmentDescription = async (
  id,
  description
) => {
  const response = await api.patch(
    `/appointments/${id}/description`,
    {
      description,
    }
  );

  return response.data;
};

/*
 * =========================================================
 * UPDATE APPOINTMENT STATUS
 * =========================================================
 */

export const updateAppointmentStatus = async (
  id,
  status
) => {
  const response = await api.patch(
    `/appointments/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};

/*
 * =========================================================
 * DELETE APPOINTMENT
 * =========================================================
 */

export const deleteAppointment = async (id) => {
  const response = await api.delete(
    `/appointments/${id}`
  );

  return response.data;
};

