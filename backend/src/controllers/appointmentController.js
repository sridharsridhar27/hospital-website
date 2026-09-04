
const appointmentService = require('../services/appointmentService');


/*
 * =========================================================
 * PUBLIC
 * CREATE APPOINTMENT
 * =========================================================
 */

const createAppointment = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      appointmentDate,
      speciality,
      timing,
      problem,
    } = req.body;


    if (
      !name ||
      !phoneNumber ||
      !appointmentDate ||
      !speciality ||
      !timing ||
      !problem
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Name, phone number, appointment date, speciality, timing and problem are required',
      });
    }


    /*
     * =========================================================
     * APPOINTMENT DATE VALIDATION
     * =========================================================
     */

    const selectedDate = new Date(
      appointmentDate
    );

    if (
      Number.isNaN(
        selectedDate.getTime()
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid appointment date',
      });
    }


    /*
     * =========================================================
     * PREVENT PAST APPOINTMENT DATES
     * =========================================================
     */

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const appointmentDay =
      new Date(selectedDate);

    appointmentDay.setHours(
      0,
      0,
      0,
      0
    );

    if (appointmentDay < today) {
      return res.status(400).json({
        success: false,
        message:
          'Appointment date cannot be in the past',
      });
    }


    /*
     * =========================================================
     * SPECIALITY AND TIMING VALIDATION
     * =========================================================
     */

    const allowedTimings = {
      ORTHOPAEDICS: [
        '6:30 PM - 9:30 PM',
      ],

      OBSTETRICS_GYNAECOLOGY: [
        '11:00 AM - 1:30 PM',
        '6:30 PM - 9:30 PM',
      ],

      OPHTHALMOLOGY: [
        '6:30 PM - 9:30 PM',
      ],
    };


    if (!allowedTimings[speciality]) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid appointment speciality',
      });
    }


    if (
      !allowedTimings[speciality].includes(
        timing
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Selected timing is not available for the selected speciality',
      });
    }


    /*
     * =========================================================
     * CREATE APPOINTMENT
     * =========================================================
     */

    const appointment =
      await appointmentService.createAppointment({
        name: name.trim(),

        phoneNumber:
          phoneNumber.trim(),

        appointmentDate:
          selectedDate,

        speciality,

        timing: timing.trim(),

        problem: problem.trim(),

        /*
         * Description is ADMIN ONLY.
         * It will be added/updated from the admin panel.
         */
        description: null,
      });


    return res.status(201).json({
      success: true,
      message:
        'Appointment request submitted successfully',
      data: appointment,
    });

  } catch (error) {
    console.error(
      'Create appointment error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to submit appointment request',
    });
  }
};


/*
 * =========================================================
 * ADMIN
 * GET ALL APPOINTMENTS
 * =========================================================
 */

const getAllAppointments = async (
  req,
  res
) => {
  try {
    const appointments =
      await appointmentService.getAllAppointments();

    return res.status(200).json({
      success: true,
      data: appointments,
    });

  } catch (error) {
    console.error(
      'Get appointments error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to fetch appointment requests',
    });
  }
};


/*
 * =========================================================
 * ADMIN
 * GET APPOINTMENT BY ID
 * =========================================================
 */

const getAppointmentById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const appointment =
      await appointmentService.getAppointmentById(
        id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          'Appointment not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: appointment,
    });

  } catch (error) {
    console.error(
      'Get appointment error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to fetch appointment',
    });
  }
};


/*
 * =========================================================
 * ADMIN
 * UPDATE APPOINTMENT DESCRIPTION
 * =========================================================
 */

const updateAppointmentDescription =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const { description } =
        req.body;


      if (
        description === undefined ||
        description === null ||
        !description.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Description is required',
        });
      }


      const existingAppointment =
        await appointmentService.getAppointmentById(
          id
        );


      if (!existingAppointment) {
        return res.status(404).json({
          success: false,
          message:
            'Appointment not found',
        });
      }


      const appointment =
        await appointmentService.updateAppointmentDescription(
          id,
          description.trim()
        );


      return res.status(200).json({
        success: true,
        message:
          'Appointment description updated successfully',
        data: appointment,
      });

    } catch (error) {
      console.error(
        'Update appointment description error:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          'Failed to update appointment description',
      });
    }
  };


/*
 * =========================================================
 * ADMIN
 * UPDATE APPOINTMENT STATUS
 * =========================================================
 */

const updateAppointmentStatus =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const { status } =
        req.body;


      const allowedStatuses = [
        'NEW',
        'CONTACTED',
        'COMPLETED',
        'CANCELLED',
      ];


      if (!status) {
        return res.status(400).json({
          success: false,
          message:
            'Status is required',
        });
      }


      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Invalid appointment status',
        });
      }


      const existingAppointment =
        await appointmentService.getAppointmentById(
          id
        );


      if (!existingAppointment) {
        return res.status(404).json({
          success: false,
          message:
            'Appointment not found',
        });
      }


      const appointment =
        await appointmentService.updateAppointmentStatus(
          id,
          status
        );


      return res.status(200).json({
        success: true,
        message:
          'Appointment status updated successfully',
        data: appointment,
      });

    } catch (error) {
      console.error(
        'Update appointment status error:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          'Failed to update appointment status',
      });
    }
  };


/*
 * =========================================================
 * ADMIN
 * DELETE APPOINTMENT
 * =========================================================
 */

const deleteAppointment =
  async (req, res) => {
    try {
      const { id } =
        req.params;


      const existingAppointment =
        await appointmentService.getAppointmentById(
          id
        );


      if (!existingAppointment) {
        return res.status(404).json({
          success: false,
          message:
            'Appointment not found',
        });
      }


      await appointmentService.deleteAppointment(
        id
      );


      return res.status(200).json({
        success: true,
        message:
          'Appointment deleted successfully',
      });

    } catch (error) {
      console.error(
        'Delete appointment error:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          'Failed to delete appointment',
      });
    }
  };


module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentDescription,
  updateAppointmentStatus,
  deleteAppointment,
};

