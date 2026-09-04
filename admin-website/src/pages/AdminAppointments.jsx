import { useEffect, useState, useMemo } from 'react';
import {
  getAppointments,
  updateAppointmentDescription,
  updateAppointmentStatus,
  deleteAppointment,
} from '../api/adminAppointmentApi';

const APPOINTMENT_STATUSES = [
  'NEW',
  'CONTACTED',
  'COMPLETED',
  'CANCELLED',
];

const SPECIALITY_LABELS = {
  ORTHOPAEDICS: 'Orthopaedics',
  OBSTETRICS_GYNAECOLOGY: 'Obstetrics & Gynaecology',
  OPHTHALMOLOGY: 'Ophthalmology',
};

const STATUS_CONFIG = {
  NEW: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },

  CONTACTED: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
  },

  COMPLETED: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
  },

  CANCELLED: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-700',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
  },
};

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [updatingId, setUpdatingId] = useState(null);

  const [deletingId, setDeletingId] = useState(null);

  const [descriptionEditingId, setDescriptionEditingId] =
    useState(null);

  const [descriptionValue, setDescriptionValue] =
    useState('');

  const [savingDescriptionId, setSavingDescriptionId] =
    useState(null);

  // Search & Filter State

  const [searchTerm, setSearchTerm] = useState('');

  const [statusFilter, setStatusFilter] = useState('ALL');

  const [specialityFilter, setSpecialityFilter] =
    useState('ALL');

  const [dateFilter, setDateFilter] = useState('');

  // Read More Modal State

  const [expandedContent, setExpandedContent] =
    useState(null);

  /*
   * =========================================================
   * FETCH APPOINTMENTS
   * =========================================================
   */

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      setError('');

      const response = await getAppointments();

      setAppointments(response.data || []);
    } catch (error) {
      console.error(
        'Failed to fetch appointments:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to load appointments.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  /*
   * =========================================================
   * UPDATE STATUS
   * =========================================================
   */

  const handleStatusChange = async (
    appointment,
    status
  ) => {
    if (appointment.status === status) {
      return;
    }

    try {
      setUpdatingId(appointment.id);

      setError('');

      const response =
        await updateAppointmentStatus(
          appointment.id,
          status
        );

      const updatedAppointment =
        response.data;

      setAppointments(
        (currentAppointments) =>
          currentAppointments.map(
            (item) =>
              item.id === appointment.id
                ? updatedAppointment
                : item
          )
      );
    } catch (error) {
      console.error(
        'Failed to update appointment status:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to update appointment status.'
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /*
   * =========================================================
   * START DESCRIPTION EDIT
   * =========================================================
   */

  const handleEditDescription = (
    appointment
  ) => {
    setDescriptionEditingId(
      appointment.id
    );

    setDescriptionValue(
      appointment.description || ''
    );

    setError('');
  };

  /*
   * =========================================================
   * CANCEL DESCRIPTION EDIT
   * =========================================================
   */

  const handleCancelDescription = () => {
    setDescriptionEditingId(null);

    setDescriptionValue('');
  };

  /*
   * =========================================================
   * SAVE DESCRIPTION
   * =========================================================
   */

  const handleSaveDescription = async (
    appointment
  ) => {
    const trimmedDescription =
      descriptionValue.trim();

    if (!trimmedDescription) {
      setError(
        'Description cannot be empty.'
      );

      return;
    }

    try {
      setSavingDescriptionId(
        appointment.id
      );

      setError('');

      const response =
        await updateAppointmentDescription(
          appointment.id,
          trimmedDescription
        );

      const updatedAppointment =
        response.data;

      setAppointments(
        (currentAppointments) =>
          currentAppointments.map(
            (item) =>
              item.id === appointment.id
                ? updatedAppointment
                : item
          )
      );

      setDescriptionEditingId(null);

      setDescriptionValue('');
    } catch (error) {
      console.error(
        'Failed to update appointment description:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to update appointment description.'
      );
    } finally {
      setSavingDescriptionId(null);
    }
  };

  /*
   * =========================================================
   * DELETE APPOINTMENT
   * =========================================================
   */

  const handleDelete = async (
    appointment
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the appointment request from ${appointment.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(appointment.id);

      setError('');

      await deleteAppointment(
        appointment.id
      );

      setAppointments(
        (currentAppointments) =>
          currentAppointments.filter(
            (item) =>
              item.id !== appointment.id
          )
      );
    } catch (error) {
      console.error(
        'Failed to delete appointment:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to delete appointment.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  /*
   * =========================================================
   * OPEN FULL CONTENT
   * =========================================================
   */

  const handleReadMore = (
    title,
    content
  ) => {
    if (!content) {
      return;
    }

    setExpandedContent({
      title,
      content,
    });
  };

  /*
   * =========================================================
   * CLOSE FULL CONTENT
   * =========================================================
   */

  const handleCloseExpandedContent = () => {
    setExpandedContent(null);
  };

  /*
   * =========================================================
   * FORMAT APPOINTMENT DATE
   * =========================================================
   */

  const formatAppointmentDate = (
    date
  ) => {
    if (!date) {
      return 'N/A';
    }

    return new Date(date).toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    );
  };

  /*
   * =========================================================
   * FORMAT DATE FOR FILTER COMPARISON
   * =========================================================
   */

  const getAppointmentDateValue = (
    date
  ) => {
    if (!date) {
      return '';
    }

    const appointmentDate =
      new Date(date);

    const year =
      appointmentDate.getFullYear();

    const month =
      String(
        appointmentDate.getMonth() + 1
      ).padStart(2, '0');

    const day =
      String(
        appointmentDate.getDate()
      ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  /*
   * =========================================================
   * GET SPECIALITY LABEL
   * =========================================================
   */

  const getSpecialityLabel = (
    speciality
  ) => {
    return (
      SPECIALITY_LABELS[speciality] ||
      speciality ||
      'N/A'
    );
  };

  /*
   * =========================================================
   * COMPUTED METRICS & FILTERING
   * =========================================================
   */

  const stats = useMemo(() => {
    return {
      total: appointments.length,

      new: appointments.filter(
        (a) => a.status === 'NEW'
      ).length,

      contacted: appointments.filter(
        (a) => a.status === 'CONTACTED'
      ).length,

      completed: appointments.filter(
        (a) => a.status === 'COMPLETED'
      ).length,
    };
  }, [appointments]);

  const filteredAppointments =
    useMemo(() => {
      const normalizedSearch =
        searchTerm
          .trim()
          .toLowerCase();

      return appointments.filter(
        (item) => {
          const speciality =
            getSpecialityLabel(
              item.speciality
            );

          const appointmentDate =
            item.appointmentDate
              ? formatAppointmentDate(
                  item.appointmentDate
                ).toLowerCase()
              : '';

          const appointmentDateValue =
            getAppointmentDateValue(
              item.appointmentDate
            );

          const matchesSearch =
            item.name
              ?.toLowerCase()
              .includes(
                normalizedSearch
              ) ||

            item.phoneNumber?.includes(
              normalizedSearch
            ) ||

            speciality
              .toLowerCase()
              .includes(
                normalizedSearch
              ) ||

            item.timing
              ?.toLowerCase()
              .includes(
                normalizedSearch
              ) ||

            item.problem
              ?.toLowerCase()
              .includes(
                normalizedSearch
              ) ||

            item.description
              ?.toLowerCase()
              .includes(
                normalizedSearch
              ) ||

            appointmentDate.includes(
              normalizedSearch
            );

          const matchesStatus =
            statusFilter === 'ALL' ||
            item.status === statusFilter;

          const matchesSpeciality =
            specialityFilter === 'ALL' ||
            item.speciality ===
              specialityFilter;

          const matchesDate =
            !dateFilter ||
            appointmentDateValue ===
              dateFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesSpeciality &&
            matchesDate
          );
        }
      );
    }, [
      appointments,
      searchTerm,
      statusFilter,
      specialityFilter,
      dateFilter,
    ]);

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header Section */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Appointments Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Review, manage, and track patient appointment requests in real-time.
            </p>

          </div>

          <button
            onClick={fetchAppointments}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-xs ring-1 ring-slate-200 transition hover:bg-slate-50 active:scale-95 disabled:opacity-50"
          >

            <svg
              className={`h-4 w-4 text-slate-500 ${
                loading
                  ? 'animate-spin'
                  : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />

            </svg>

            Refresh

          </button>

        </div>

        {/* Stats Section */}

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-slate-300">

            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Requests
            </span>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stats.total}
            </p>

          </div>

          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/30 p-5 shadow-xs transition hover:border-amber-300">

            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              New Pending
            </span>

            <p className="mt-2 text-3xl font-bold text-amber-800">
              {stats.new}
            </p>

          </div>

          <div className="rounded-2xl border border-blue-200/80 bg-blue-50/30 p-5 shadow-xs transition hover:border-blue-300">

            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
              Contacted
            </span>

            <p className="mt-2 text-3xl font-bold text-blue-800">
              {stats.contacted}
            </p>

          </div>

          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/30 p-5 shadow-xs transition hover:border-emerald-300">

            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Completed
            </span>

            <p className="mt-2 text-3xl font-bold text-emerald-800">
              {stats.completed}
            </p>

          </div>

        </div>

        {/* Error Alert */}

        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-800 shadow-xs">

            <svg
              className="h-5 w-5 shrink-0 text-rose-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >

              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />

            </svg>

            <p className="font-medium">
              {error}
            </p>

          </div>
        )}

        {/* Search & Filter Bar */}

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            {/* Search */}

            <div className="relative flex-1">

              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />

              </svg>

              <input
                type="text"
                placeholder="Search patient, phone, speciality, timing, problem..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder-slate-400 focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
              />

            </div>

            {/* Date Filter */}

            <div className="flex items-center gap-2">

              <span className="whitespace-nowrap text-xs font-medium text-slate-500">
                Date:
              </span>

              <input
                type="date"
                value={dateFilter}
                onChange={(e) =>
                  setDateFilter(
                    e.target.value
                  )
                }
                className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
              />

            </div>

            {/* Speciality Filter */}

            <div className="flex items-center gap-2">

              <span className="whitespace-nowrap text-xs font-medium text-slate-500">
                Speciality:
              </span>

              <select
                value={specialityFilter}
                onChange={(e) =>
                  setSpecialityFilter(
                    e.target.value
                  )
                }
                className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
              >

                <option value="ALL">
                  All Specialities
                </option>

                <option value="ORTHOPAEDICS">
                  Orthopaedics
                </option>

                <option value="OBSTETRICS_GYNAECOLOGY">
                  Obstetrics & Gynaecology
                </option>

                <option value="OPHTHALMOLOGY">
                  Ophthalmology
                </option>

              </select>

            </div>

            {/* Status Filter */}

            <div className="flex items-center gap-2">

              <span className="whitespace-nowrap text-xs font-medium text-slate-500">
                Status:
              </span>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
              >

                <option value="ALL">
                  All Statuses
                </option>

                {APPOINTMENT_STATUSES.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* Clear Filters */}

            {(dateFilter ||
              specialityFilter !==
                'ALL' ||
              statusFilter !==
                'ALL' ||
              searchTerm) && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setDateFilter('');
                  setSpecialityFilter('ALL');
                  setStatusFilter('ALL');
                }}
                className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200 active:scale-95"
              >
                Clear
              </button>
            )}

          </div>

        </div>

        {/* Skeleton Loading State */}

        {loading && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">

            <div className="animate-pulse space-y-4">

              <div className="h-8 w-1/4 rounded-lg bg-slate-100" />

              <div className="h-12 w-full rounded-xl bg-slate-100" />

              <div className="h-12 w-full rounded-xl bg-slate-100" />

              <div className="h-12 w-full rounded-xl bg-slate-100" />

            </div>

          </div>
        )}

        {/* Empty State */}

        {!loading &&
          filteredAppointments.length ===
            0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">

                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />

                </svg>

              </div>

              <h2 className="mt-4 text-base font-semibold text-slate-900">

                {appointments.length ===
                0
                  ? 'No Appointment Requests'
                  : 'No matching appointments'}

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                {appointments.length ===
                0
                  ? 'New patient appointment requests will appear here dynamically.'
                  : 'Try adjusting your search criteria or filter options.'}

              </p>

            </div>
          )}

        {/* Main Data Table */}

        {!loading &&
          filteredAppointments.length >
            0 && (
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">

              <div className="overflow-x-auto">

                <table className="min-w-full divide-y divide-slate-100">

                  <thead className="bg-slate-50/80">

                    <tr>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Patient
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Phone Number
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Speciality
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Timing
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Problem Details
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Description
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Appointment Date
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100 bg-white">

                    {filteredAppointments.map(
                      (appointment) => {

                        const isUpdating =
                          updatingId ===
                          appointment.id;

                        const isDeleting =
                          deletingId ===
                          appointment.id;

                        const isEditingDescription =
                          descriptionEditingId ===
                          appointment.id;

                        const isSavingDescription =
                          savingDescriptionId ===
                          appointment.id;

                        const statusStyle =
                          STATUS_CONFIG[
                            appointment.status
                          ] ||
                          STATUS_CONFIG.NEW;

                        return (
                          <tr
                            key={
                              appointment.id
                            }
                            className="transition hover:bg-slate-50/60"
                          >

                            {/* Patient */}

                            <td className="whitespace-nowrap px-6 py-4">

                              <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700 ring-1 ring-teal-600/20">

                                  {appointment.name
                                    ? appointment.name
                                        .charAt(
                                          0
                                        )
                                        .toUpperCase()
                                    : 'P'}

                                </div>

                                <p className="text-sm font-semibold text-slate-900">
                                  {appointment.name}
                                </p>

                              </div>

                            </td>

                            {/* Phone */}

                            <td className="whitespace-nowrap px-6 py-4">

                              <a
                                href={`tel:${appointment.phoneNumber}`}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-800 hover:underline"
                              >

                                <svg
                                  className="h-3.5 w-3.5 text-teal-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >

                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                  />

                                </svg>

                                {appointment.phoneNumber}

                              </a>

                            </td>

                            {/* Speciality */}

                            <td className="whitespace-nowrap px-6 py-4">

                              <span className="inline-flex rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-600/10">

                                {getSpecialityLabel(
                                  appointment.speciality
                                )}

                              </span>

                            </td>

                            {/* Timing */}

                            <td className="whitespace-nowrap px-6 py-4">

                              <span className="text-sm font-medium text-slate-600">

                                {appointment.timing ||
                                  'N/A'}

                              </span>

                            </td>

                            {/* Problem - WIDENED: min-w-[260px] max-w-md (was max-w-xs) */}

                            <td className="min-w-[260px] max-w-md px-6 py-4">

                              <div className="space-y-2">

                                <p
                                  className="line-clamp-2 text-sm leading-relaxed text-slate-600"
                                  title={
                                    appointment.problem
                                  }
                                >
                                  {appointment.problem ||
                                    'No problem provided.'}
                                </p>

                                {appointment.problem &&
                                  appointment.problem.length >
                                    120 && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleReadMore(
                                          'Problem Details',
                                          appointment.problem
                                        )
                                      }
                                      className="text-xs font-semibold text-teal-700 transition hover:text-teal-800 hover:underline"
                                    >
                                      Read More
                                    </button>
                                  )}

                              </div>

                            </td>

                            {/* Description - WIDENED: min-w-[360px] max-w-lg (was min-w-[280px] max-w-sm) */}

                            <td className="min-w-[360px] max-w-lg px-6 py-4">

                              {isEditingDescription ? (

                                <div className="space-y-2">

                                  <textarea
                                    value={
                                      descriptionValue
                                    }
                                    onChange={(
                                      event
                                    ) =>
                                      setDescriptionValue(
                                        event
                                          .target
                                          .value
                                      )
                                    }
                                    rows={3}
                                    autoFocus
                                    placeholder="Enter admin description..."
                                    disabled={
                                      isSavingDescription
                                    }
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-50"
                                  />

                                  <div className="flex items-center gap-2">

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleSaveDescription(
                                          appointment
                                        )
                                      }
                                      disabled={
                                        isSavingDescription
                                      }
                                      className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                    >

                                      {isSavingDescription ? (
                                        <>
                                          <svg
                                            className="h-3.5 w-3.5 animate-spin"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                          >

                                            <circle
                                              className="opacity-25"
                                              cx="12"
                                              cy="12"
                                              r="10"
                                              stroke="currentColor"
                                              strokeWidth="4"
                                            />

                                            <path
                                              className="opacity-75"
                                              fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />

                                          </svg>

                                          Saving...
                                        </>
                                      ) : (
                                        'Save'
                                      )}

                                    </button>

                                    <button
                                      type="button"
                                      onClick={
                                        handleCancelDescription
                                      }
                                      disabled={
                                        isSavingDescription
                                      }
                                      className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                      Cancel
                                    </button>

                                  </div>

                                </div>

                              ) : (

                                <div className="space-y-2">

                                  <p
                                    className="line-clamp-3 text-sm leading-relaxed text-slate-600"
                                    title={
                                      appointment.description ||
                                      ''
                                    }
                                  >
                                    {appointment.description ||
                                      'No description added yet.'}
                                  </p>

                                  {appointment.description &&
                                    appointment.description.length >
                                      120 && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleReadMore(
                                          'Description',
                                          appointment.description
                                        )
                                      }
                                      className="text-xs font-semibold text-teal-700 transition hover:text-teal-800 hover:underline"
                                    >
                                      Read More
                                    </button>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleEditDescription(
                                        appointment
                                      )
                                    }
                                    disabled={
                                      isDeleting ||
                                      isUpdating
                                    }
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 px-2.5 py-1.5 text-xs font-semibold text-teal-700 ring-1 ring-teal-600/10 transition hover:bg-teal-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                  >

                                    <svg
                                      className="h-3.5 w-3.5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >

                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-9-4l8-8 3 3-8 8-4 1 1-4z"
                                      />

                                    </svg>

                                    {appointment.description
                                      ? 'Edit Description'
                                      : 'Add Description'}

                                  </button>

                                </div>

                              )}

                            </td>

                            {/* Status */}

                            <td className="whitespace-nowrap px-6 py-4">

                              <div className="relative inline-block">

                                <span
                                  className={`pointer-events-none absolute left-2.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${statusStyle.dot}`}
                                />

                                <select
                                  value={
                                    appointment.status
                                  }
                                  disabled={
                                    isUpdating ||
                                    isDeleting ||
                                    isEditingDescription ||
                                    isSavingDescription
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    handleStatusChange(
                                      appointment,
                                      event
                                        .target
                                        .value
                                    )
                                  }
                                  className={`appearance-none rounded-xl border py-1.5 pl-6 pr-8 text-xs font-semibold outline-none transition focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-50 ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                                >

                                  {APPOINTMENT_STATUSES.map(
                                    (status) => (
                                      <option
                                        key={
                                          status
                                        }
                                        value={
                                          status
                                        }
                                        className="bg-white font-medium text-slate-800"
                                      >
                                        {status}
                                      </option>
                                    )
                                  )}

                                </select>

                                <svg
                                  className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >

                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />

                                </svg>

                              </div>

                            </td>

                            {/* Appointment Date */}

                            <td className="whitespace-nowrap px-6 py-4">

                              <span className="text-sm font-semibold text-slate-700">
                                {formatAppointmentDate(
                                  appointment.appointmentDate
                                )}
                              </span>

                            </td>

                            {/* Delete Action */}

                            <td className="whitespace-nowrap px-6 py-4 text-right">

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    appointment
                                  )
                                }
                                disabled={
                                  isDeleting ||
                                  isUpdating ||
                                  isEditingDescription ||
                                  isSavingDescription
                                }
                                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 ring-1 ring-rose-200/60 transition hover:bg-rose-100/80 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                              >

                                {isDeleting ? (
                                  <>
                                    <svg
                                      className="h-3.5 w-3.5 animate-spin"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >

                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      />

                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                      />

                                    </svg>

                                    Deleting...
                                  </>
                                ) : (
                                  <>
                                    <svg
                                      className="h-3.5 w-3.5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >

                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 01-1 1v3M4 7h16"
                                      />

                                    </svg>

                                    Delete
                                  </>
                                )}

                              </button>

                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            </div>
          )}

      </div>

      {/* =====================================================
          FULL CONTENT MODAL
          ===================================================== */}

      {expandedContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={
            handleCloseExpandedContent
          }
        >

          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  {expandedContent.title}
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Full details
                </p>

              </div>

              <button
                type="button"
                onClick={
                  handleCloseExpandedContent
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 active:scale-95"
                aria-label="Close"
              >

                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />

                </svg>

              </button>

            </div>

            {/* Modal Content */}

            <div className="max-h-[65vh] overflow-y-auto px-5 py-5">

              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">

                <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
                  {expandedContent.content}
                </p>

              </div>

            </div>

            {/* Modal Footer */}

            <div className="flex justify-end border-t border-slate-100 px-5 py-4">

              <button
                type="button"
                onClick={
                  handleCloseExpandedContent
                }
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminAppointments;