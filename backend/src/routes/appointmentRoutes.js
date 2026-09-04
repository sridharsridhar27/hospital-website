
const express = require('express');

const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentDescription,
  updateAppointmentStatus,
  deleteAppointment,
} = require('../controllers/appointmentController');

const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

const router = express.Router();


/*
 * =========================================================
 * POST /api/appointments
 *
 * Public API
 * Used by the public hospital website.
 *
 * Allows visitors to submit an appointment request.
 *
 * Request body:
 * name
 * phoneNumber
 * appointmentDate
 * speciality
 * timing
 * problem
 *
 * NOTE:
 * Description is ADMIN ONLY.
 * Public users do not submit description.
 * =========================================================
 */

router.post(
  '/',
  createAppointment
);


/*
 * =========================================================
 * GET /api/appointments
 *
 * Admin API
 * Protected.
 *
 * Used by the admin panel to view all appointment requests.
 *
 * Response includes:
 * appointmentDate
 * speciality
 * timing
 * problem
 * description
 * =========================================================
 */

router.get(
  '/',
  adminAuthMiddleware,
  getAllAppointments
);


/*
 * =========================================================
 * GET /api/appointments/:id
 *
 * Admin API
 * Protected.
 *
 * Used by the admin panel to view one appointment request.
 *
 * Response includes:
 * appointmentDate
 * speciality
 * timing
 * problem
 * description
 * =========================================================
 */

router.get(
  '/:id',
  adminAuthMiddleware,
  getAppointmentById
);


/*
 * =========================================================
 * PATCH /api/appointments/:id/description
 *
 * Admin API
 * Protected.
 *
 * Used by the admin panel to add or update the appointment
 * description.
 *
 * Description is managed only from the admin panel.
 * =========================================================
 */

router.patch(
  '/:id/description',
  adminAuthMiddleware,
  updateAppointmentDescription
);


/*
 * =========================================================
 * PATCH /api/appointments/:id/status
 *
 * Admin API
 * Protected.
 *
 * Used by the admin panel to update appointment status.
 *
 * Allowed statuses:
 * NEW
 * CONTACTED
 * COMPLETED
 * CANCELLED
 * =========================================================
 */

router.patch(
  '/:id/status',
  adminAuthMiddleware,
  updateAppointmentStatus
);


/*
 * =========================================================
 * DELETE /api/appointments/:id
 *
 * Admin API
 * Protected.
 *
 * Used by the admin panel to delete an appointment request.
 * =========================================================
 */

router.delete(
  '/:id',
  adminAuthMiddleware,
  deleteAppointment
);


module.exports = router;

