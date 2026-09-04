import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Phone,
  MessageSquare,
  FileText,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { createAppointment } from '../api/appointmentApi';

/*
 * =========================================================
 * APPOINTMENT TIMINGS
 * =========================================================
 */

const specialityTimings = {
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

/*
 * =========================================================
 * SPECIALITIES
 * =========================================================
 */

const specialities = [
  {
    value: 'ORTHOPAEDICS',
    label: 'Orthopaedics',
  },

  {
    value: 'OBSTETRICS_GYNAECOLOGY',
    label: 'Obstetrics & Gynaecology',
  },

  {
    value: 'OPHTHALMOLOGY',
    label: 'Ophthalmology',
  },
];

function Appointment({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [timing, setTiming] = useState('');
  const [problem, setProblem] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  /*
   * =========================================================
   * GET TODAY'S DATE
   * =========================================================
   */

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  /*
   * =========================================================
   * CLOSE APPOINTMENT
   * =========================================================
   */

  const handleClose = () => {
    if (loading) {
      return;
    }

    setError('');
    setSuccess(false);
    onClose();
  };

  /*
   * =========================================================
   * SPECIALITY CHANGE
   * =========================================================
   */

  const handleSpecialityChange = (event) => {
    const selectedSpeciality = event.target.value;
    setSpeciality(selectedSpeciality);

    /*
     * Reset timing whenever speciality changes.
     * This prevents an invalid timing from remaining selected.
     */
    setTiming('');
  };

  /*
   * =========================================================
   * APPOINTMENT DATE CHANGE
   * =========================================================
   */

  const handleAppointmentDateChange = (event) => {
    setAppointmentDate(event.target.value);
  };

  /*
   * =========================================================
   * SUBMIT APPOINTMENT
   * =========================================================
   */

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name is required.');
      return;
    }

    if (!phoneNumber.trim()) {
      setError('Phone number is required.');
      return;
    }

    if (!speciality) {
      setError('Please select a speciality.');
      return;
    }

    if (!appointmentDate) {
      setError('Please select an appointment date.');
      return;
    }

    if (!timing) {
      setError('Please select an appointment timing.');
      return;
    }

    if (!problem.trim()) {
      setError('Please describe your problem.');
      return;
    }

    try {
      setLoading(true);

      const response = await createAppointment({
        name: name.trim(),
        phoneNumber: phoneNumber.trim(),
        appointmentDate,
        speciality,
        timing: timing.trim(),
        problem: problem.trim(),
      });

      console.log('Appointment created successfully:', response);

      setSuccess(true);

      setName('');
      setPhoneNumber('');
      setAppointmentDate('');
      setSpeciality('');
      setTiming('');
      setProblem('');
    } catch (error) {
      console.error('Failed to submit appointment:', error);

      setError(
        error.response?.data?.message ||
          'Unable to submit your appointment request. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* BACKDROP */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
      />

      {/* CONTAINER FOR CENTERING & PADDING */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* MODAL CARD */}
        <div className="relative z-10 my-8 flex max-h-[calc(100vh-4rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/5 transition-all">
          
          {/* HEADER (Sticky Top) */}
          <div className="shrink-0 border-b border-slate-100 bg-gradient-to-r from-teal-50/50 via-white to-emerald-50/30 px-6 py-5 sm:px-8">
            <div className="pr-8">
              <span className="inline-flex items-center rounded-full bg-teal-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-800">
                Appointment
              </span>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                Book an Appointment
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Tell us how we can help you with your health needs.
              </p>
            </div>

            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* SCROLLABLE BODY AREA */}
          <div className="overflow-y-auto">
            {success ? (
              /* SUCCESS STATE */
              <div className="space-y-6 px-6 py-8 sm:px-8">
                <div className="space-y-2 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    Appointment Request Received
                  </h3>

                  <p className="text-sm text-slate-600">
                    We have received your appointment request.
                  </p>
                </div>

                {/* ACTION & CONTACT BOX */}
                <div className="space-y-3 rounded-2xl border border-teal-100/80 bg-teal-50/60 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                    To Confirm Your Appointment
                  </p>

                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <a
                      href="https://wa.me/919884842776"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                    >
                      <MessageSquare className="h-4 w-4 shrink-0" />
                      <span>WhatsApp 9884842776</span>
                    </a>

                    <a
                      href="tel:9884507412"
                      className="flex items-center gap-2.5 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-800"
                    >
                      <Phone className="h-4 w-4 shrink-0" />
                      <span>Call 9884507412</span>
                    </a>
                  </div>
                </div>

                {/* IMPORTANT NOTE */}
                <div className="flex gap-3.5 rounded-2xl border border-amber-200/60 bg-amber-50/70 p-4 text-xs leading-relaxed text-amber-900">
                  <FileText className="h-5 w-5 shrink-0 text-amber-600" />
                  <div>
                    <span className="font-bold">Important:</span> Please bring
                    all your previous medical reports, prescriptions, scans, and
                    relevant medical records with you when you visit the clinic.
                    This will help our doctors better understand your medical
                    history and provide appropriate care.
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-teal-700/20 transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                >
                  Done & Close
                </button>
              </div>
            ) : (
              /* APPOINTMENT FORM */
              <form
                onSubmit={handleSubmit}
                className="space-y-5 px-6 py-6 sm:px-8"
              >
                {/* NAME */}
                <div>
                  <label
                    htmlFor="appointment-name"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="appointment-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-500/10 disabled:bg-slate-100"
                  />
                </div>

                {/* PHONE NUMBER */}
                <div>
                  <label
                    htmlFor="appointment-phone"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="appointment-phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-500/10 disabled:bg-slate-100"
                  />
                </div>

                {/* SPECIALITY */}
                <div>
                  <label
                    htmlFor="appointment-speciality"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                  >
                    Speciality
                  </label>
                  <select
                    id="appointment-speciality"
                    value={speciality}
                    onChange={handleSpecialityChange}
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-500/10 disabled:bg-slate-100"
                  >
                    <option value="">Select Speciality</option>
                    {specialities.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* APPOINTMENT DATE */}
                <div>
                  <label
                    htmlFor="appointment-date"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                  >
                    Appointment Date
                  </label>
                  <input
                    id="appointment-date"
                    type="date"
                    value={appointmentDate}
                    min={getTodayDate()}
                    onChange={handleAppointmentDateChange}
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-500/10 disabled:bg-slate-100"
                  />
                  <p className="mt-1.5 text-xs text-slate-400">
                    Please select a future appointment date.
                  </p>
                </div>

                {/* TIMING */}
                {speciality && (
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Appointment Timing
                    </label>
                    <div className="space-y-2">
                      {specialityTimings[speciality]?.map((availableTiming) => (
                        <label
                          key={availableTiming}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition hover:border-teal-500 hover:bg-teal-50/50"
                        >
                          <input
                            type="radio"
                            name="appointment-timing"
                            value={availableTiming}
                            checked={timing === availableTiming}
                            onChange={(e) => setTiming(e.target.value)}
                            disabled={loading}
                            className="h-4 w-4 accent-teal-700"
                          />
                          <span>{availableTiming}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* PROBLEM DESCRIPTION */}
                <div>
                  <label
                    htmlFor="appointment-problem"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                  >
                    Describe Your Problem
                  </label>
                  <textarea
                    id="appointment-problem"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    rows={4}
                    placeholder="Briefly describe your symptoms or reason for consultation..."
                    disabled={loading}
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition duration-200 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-500/10 disabled:bg-slate-100"
                  />
                </div>

                {/* ERROR DISPLAY */}
                {error && (
                  <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm text-rose-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    'Submit Appointment Request'
                  )}
                </button>

                <p className="text-center text-xs text-slate-400">
                  Our team will contact you to confirm your appointment.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;