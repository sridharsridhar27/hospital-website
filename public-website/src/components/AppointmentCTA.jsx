import React from "react";
import PropTypes from "prop-types";

function AppointmentCTA({ onBookAppointment }) {
  return (
    <section
      id="appointment"
      className="relative px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-7xl">

        <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-swasthic-primary via-swasthic-primary to-emerald-900 px-5 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16 shadow-2xl">

          {/* Subtle Ambient Background Lighting */}
          <div 
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-white/10 blur-3xl transform-gpu" 
            aria-hidden="true"
          />

          <div 
            className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-emerald-400/20 blur-3xl transform-gpu" 
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-6 sm:gap-8 lg:flex-row lg:items-center">

            {/* Content */}
            <div className="max-w-2xl">

              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
                Get Pain Relief Without Surgery Today.
              </h2>

              <p className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-white/85">
                Schedule your appointment now and take the first step toward
                moving better and living pain-free.
              </p>

            </div>

            {/* Buttons */}
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:shrink-0">

              {/* Book Appointment */}
              <button
                type="button"
                onClick={onBookAppointment}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-white px-6 py-3.5 sm:px-7 sm:py-3.5 text-center text-sm font-bold text-swasthic-primary shadow-lg shadow-black/10 transition-all duration-200 hover:bg-slate-50 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-swasthic-primary"
              >
                Book an Appointment
              </button>

              {/* Call */}
              <a
                href="tel:+919884507412"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 sm:px-7 sm:py-3.5 text-center text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:border-white/50 hover:bg-white/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-swasthic-primary"
              >
                Call Us
              </a>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

AppointmentCTA.propTypes = {
  onBookAppointment: PropTypes.func,
};

export default AppointmentCTA;