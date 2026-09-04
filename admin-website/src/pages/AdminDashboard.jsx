import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Stethoscope,
  HeartPulse,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  ChevronRight,
  LogOut,
  Images,
  CalendarCheck,
} from 'lucide-react';

import { removeAdminToken } from '../utils/adminAuth';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAdminToken();

    navigate('/login', {
      replace: true,
    });
  };

  return (
    <div className="relative min-h-screen bg-slate-50/60 font-sans text-slate-800 antialiased selection:bg-teal-500 selection:text-white">

      {/* Dynamic Background Gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'radial-gradient(#0f172a 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">

        {/* Header */}
        <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/60 bg-teal-50/80 px-3 py-1 text-xs font-semibold text-teal-700 backdrop-blur-md">

              <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />

              <span>
                Healthcare Workspace
              </span>

            </div>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Hospital Admin
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage website content, clinical staff, and operational modules.
            </p>

          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">

            {/* System Status */}
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 shadow-sm">

              <Activity className="h-4 w-4 animate-pulse text-emerald-500" />

              <span className="text-xs font-bold text-slate-700">
                System Online
              </span>

            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="group flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >

              <LogOut
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              />

              <span>
                Logout
              </span>

            </button>

          </div>

        </header>

        {/* Management Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* =====================================================
              OUR TEAM CARD
              ===================================================== */}

          <Link
            to="/team"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-300 hover:shadow-[0_20px_40px_rgba(20,184,166,0.12)]"
          >

            {/* Soft Floating Radial Accent */}
            <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-teal-50/80 transition-transform duration-500 ease-out group-hover:scale-150" />

            {/* Card Content Top */}
            <div className="relative z-10">

              <div className="mb-6 flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-100/60 bg-teal-50 text-teal-700 shadow-sm transition-transform duration-300 group-hover:scale-105">

                  <Users className="h-6 w-6" />

                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-teal-600 group-hover:text-white">

                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />

                </div>

              </div>

              <h2 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-teal-700">
                Our Team
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Manage doctor profiles, medical staff directories, and department assignments.
              </p>

            </div>

            {/* Card Content Footer */}
            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-teal-700">

              <span>
                Manage Members
              </span>

              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300 group-hover:w-full" />

          </Link>


          {/* =====================================================
              SERVICES CARD
              ===================================================== */}

          <Link
            to="/services"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-300 hover:shadow-[0_20px_40px_rgba(20,184,166,0.12)]"
          >

            {/* Soft Floating Radial Accent */}
            <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-teal-50/80 transition-transform duration-500 ease-out group-hover:scale-150" />

            {/* Card Content Top */}
            <div className="relative z-10">

              <div className="mb-6 flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-100/60 bg-teal-50 text-teal-700 shadow-sm transition-transform duration-300 group-hover:scale-105">

                  <Stethoscope className="h-6 w-6" />

                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-teal-600 group-hover:text-white">

                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />

                </div>

              </div>

              <h2 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-teal-700">
                Services
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Manage general, orthopaedic, obstetrics, and gynaecology services.
              </p>

            </div>

            {/* Card Content Footer */}
            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-teal-700">

              <span>
                Manage Services
              </span>

              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300 group-hover:w-full" />

          </Link>


          {/* =====================================================
              CONDITIONS CARD
              ===================================================== */}

          <Link
            to="/conditions"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-300 hover:shadow-[0_20px_40px_rgba(20,184,166,0.12)]"
          >

            {/* Soft Floating Radial Accent */}
            <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-teal-50/80 transition-transform duration-500 ease-out group-hover:scale-150" />

            {/* Card Content Top */}
            <div className="relative z-10">

              <div className="mb-6 flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-100/60 bg-teal-50 text-teal-700 shadow-sm transition-transform duration-300 group-hover:scale-105">

                  <HeartPulse className="h-6 w-6" />

                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-teal-600 group-hover:text-white">

                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />

                </div>

              </div>

              <h2 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-teal-700">
                Conditions
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Manage patient conditions, healthcare information, and condition images.
              </p>

            </div>

            {/* Card Content Footer */}
            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-teal-700">

              <span>
                Manage Conditions
              </span>

              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300 group-hover:w-full" />

          </Link>


          {/* =====================================================
              GALLERY CARD
              ===================================================== */}

          <Link
            to="/gallery"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-300 hover:shadow-[0_20px_40px_rgba(20,184,166,0.12)]"
          >

            {/* Soft Floating Radial Accent */}
            <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-teal-50/80 transition-transform duration-500 ease-out group-hover:scale-150" />

            {/* Card Content Top */}
            <div className="relative z-10">

              <div className="mb-6 flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-100/60 bg-teal-50 text-teal-700 shadow-sm transition-transform duration-300 group-hover:scale-105">

                  <Images className="h-6 w-6" />

                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-teal-600 group-hover:text-white">

                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />

                </div>

              </div>

              <h2 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-teal-700">
                Gallery
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Manage hospital images and videos displayed in the public gallery.
              </p>

            </div>

            {/* Card Content Footer */}
            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-teal-700">

              <span>
                Manage Gallery
              </span>

              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300 group-hover:w-full" />

          </Link>


          {/* =====================================================
              APPOINTMENTS CARD
              ===================================================== */}

          <Link
            to="/appointments"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-300 hover:shadow-[0_20px_40px_rgba(20,184,166,0.12)]"
          >

            {/* Soft Floating Radial Accent */}
            <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-teal-50/80 transition-transform duration-500 ease-out group-hover:scale-150" />

            {/* Card Content Top */}
            <div className="relative z-10">

              <div className="mb-6 flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-100/60 bg-teal-50 text-teal-700 shadow-sm transition-transform duration-300 group-hover:scale-105">

                  <CalendarCheck className="h-6 w-6" />

                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-teal-600 group-hover:text-white">

                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />

                </div>

              </div>

              <h2 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-teal-700">
                Appointments
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                View appointment requests, manage patient enquiries, and update appointment status.
              </p>

            </div>

            {/* Card Content Footer */}
            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-teal-700">

              <span>
                Manage Appointments
              </span>

              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300 group-hover:w-full" />

          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;