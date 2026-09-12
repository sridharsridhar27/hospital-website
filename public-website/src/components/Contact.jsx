import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  ExternalLink,
  Navigation,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';

/* ============================================================================
 * CONFIGURATION & DATA CONSTANTS
 * Extracted outside component lifecycle to prevent redundant re-instantiations.
 * ============================================================================ */

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/ZqK8usHx3Hjf9qm26?g_st=aw';
const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps?q=Swasthik%20Health%20Care%2C%20211%2C%201st%20Main%20Road%2C%20M.R.%20Nagar%2C%20Kodungaiyur%2C%20Chennai%20600118&output=embed';

const CONTACT_INFO = {
  address: {
    line1: '211, 1st Main Road, M.R. Nagar,',
    line2: 'Kodungaiyur, Opposite A.P.R. Bazar,',
    city: 'Chennai – 600118',
  },
  phone: {
    display: '+91 9884507412',
    value: '+919884507412',
  },
  whatsapp: {
    display: '+91 9884842776',
    value: '919884842776',
  },
  email: 'ashwinsyam95@gmail.com',
};

const CLINIC_SCHEDULE = {
  regular: {
    days: 'Mon – Sat',
    hours: '11:00 AM – 1:30 PM',
  },
  evening: {
    label: 'Evening',
    hours: '6:30 PM – 9:30 PM',
  },
  specialty: {
    label: 'Orthopaedic & Ophthalmology Consultation',
    hours: 'Evening only — 6:30 PM – 9:30 PM',
  },
};

/* Animation Variants */
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-[#0E5C4E]/5 px-4 py-10 sm:px-8 sm:py-16 lg:px-12 antialiased text-slate-900"
    >
      {/* ===================================================================
          BACKGROUND AMBIENT DECORATIONS
      =================================================================== */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[300px] w-[300px] rounded-full bg-[#0E5C4E]/10 blur-[80px] sm:h-[400px] sm:w-[400px] sm:blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#0E5C4E]/10 blur-[80px] sm:h-[400px] sm:w-[400px] sm:blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#0E5C4E 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* ===================================================================
            HEADER SECTION
        =================================================================== */}
        <header className="mx-auto max-w-xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#0E5C4E]/20 bg-white px-3.5 py-1 text-xs font-semibold tracking-wide text-[#0E5C4E] shadow-sm backdrop-blur-md"
          >
            <MapPin className="h-3 w-3 text-[#0E5C4E]" aria-hidden="true" />
            <span>Connect With Us</span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-[Space_Grotesk] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl"
          >
            We're Here to Help
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm"
          >
            Reach out to us for instant appointments, consultation bookings,
            directions, or medical enquiries.
          </motion.p>
        </header>

        {/* ===================================================================
            UNIFIED BENTO GRID CONTACT CARDS
        =================================================================== */}
        <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {/* -----------------------------------------------------------------
              CARD 1: LOCATION
          ----------------------------------------------------------------- */}
          <motion.article
            {...fadeInUp}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-md shadow-slate-100 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#0E5C4E]/40 hover:shadow-xl hover:shadow-[#0E5C4E]/5 sm:p-6"
          >
            <div
              className="absolute left-0 top-0 h-1 w-full bg-[#0E5C4E] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0E5C4E]/10 text-[#0E5C4E] transition-transform duration-300 group-hover:scale-105">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Visit Us
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                Location
              </h3>

              <address className="mt-2 text-xs leading-relaxed text-slate-600 not-italic sm:text-sm">
                {CONTACT_INFO.address.line1}
                <br />
                {CONTACT_INFO.address.line2}
                <br />
                <span className="font-semibold text-slate-800">
                  {CONTACT_INFO.address.city}
                </span>
              </address>
            </div>

            <div className="relative z-10 mt-6 border-t border-slate-100 pt-3">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to Swasthik Health Care in Google Maps"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E5C4E] transition-all duration-200 hover:text-[#0B483D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5C4E]"
              >
                <span>Get Directions</span>
                <div className="flex h-5 w-5 items-center justify-center rounded bg-[#0E5C4E]/10 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight
                    className="h-3 w-3 text-[#0E5C4E]"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </div>
          </motion.article>

          {/* -----------------------------------------------------------------
              CARD 2: QUICK CONTACT
          ----------------------------------------------------------------- */}
          <motion.article
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-md shadow-slate-100 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#0E5C4E]/40 hover:shadow-xl hover:shadow-[#0E5C4E]/5 sm:p-6"
          >
            <div
              className="absolute left-0 top-0 h-1 w-full bg-[#0E5C4E] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0E5C4E]/10 text-[#0E5C4E] transition-transform duration-300 group-hover:scale-105">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="flex items-center gap-1.5 rounded-md bg-[#0E5C4E]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0E5C4E]">
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0E5C4E]"
                    aria-hidden="true"
                  />
                  Available Now
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                Quick Contact
              </h3>

              <div className="mt-3 space-y-1.5">
                {/* Phone Link */}
                <a
                  href={`tel:${CONTACT_INFO.phone.value}`}
                  aria-label={`Call us at ${CONTACT_INFO.phone.display}`}
                  className="group/link flex items-center gap-2.5 rounded-lg border border-transparent p-1.5 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0E5C4E]"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#0E5C4E]/10 text-[#0E5C4E] transition-colors group-hover/link:bg-[#0E5C4E] group-hover/link:text-white">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                      Phone
                    </span>
                    <span className="text-xs font-bold text-slate-800 group-hover/link:text-[#0E5C4E] sm:text-sm">
                      {CONTACT_INFO.phone.display}
                    </span>
                  </div>
                </a>

                {/* WhatsApp Link */}
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp.value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Chat on WhatsApp with ${CONTACT_INFO.whatsapp.display}`}
                  className="group/link flex items-center gap-2.5 rounded-lg border border-transparent p-1.5 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0E5C4E]"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#0E5C4E]/10 text-[#0E5C4E] transition-colors group-hover/link:bg-[#0E5C4E] group-hover/link:text-white">
                    <MessageCircle
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                      WhatsApp
                    </span>
                    <span className="text-xs font-bold text-slate-800 group-hover/link:text-[#0E5C4E] sm:text-sm">
                      {CONTACT_INFO.whatsapp.display}
                    </span>
                  </div>
                </a>

                {/* Email Link */}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  aria-label={`Send email to ${CONTACT_INFO.email}`}
                  className="group/link flex items-center gap-2.5 rounded-lg border border-transparent p-1.5 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0E5C4E]"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#0E5C4E]/10 text-[#0E5C4E] transition-colors group-hover/link:bg-[#0E5C4E] group-hover/link:text-white">
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                      Email Desk
                    </span>
                    <span className="truncate text-xs font-bold text-slate-800 group-hover/link:text-[#0E5C4E] sm:text-sm">
                      {CONTACT_INFO.email}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </motion.article>

          {/* -----------------------------------------------------------------
              CARD 3: CLINIC HOURS
          ----------------------------------------------------------------- */}
          <motion.article
            {...fadeInUp}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-md shadow-slate-100 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#0E5C4E]/40 hover:shadow-xl hover:shadow-[#0E5C4E]/5 md:col-span-2 lg:col-span-1 sm:p-6"
          >
            <div
              className="absolute left-0 top-0 h-1 w-full bg-[#0E5C4E] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0E5C4E]/10 text-[#0E5C4E] transition-transform duration-300 group-hover:scale-105">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Schedule
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                Clinic Hours
              </h3>

              <div className="mt-3 space-y-2">
                {/* Morning Slot */}
                <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#0E5C4E]">
                    {CLINIC_SCHEDULE.regular.days}
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-slate-800 sm:text-sm">
                    {CLINIC_SCHEDULE.regular.hours}
                  </p>
                </div>

                {/* Evening OPD Slot */}
                <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#0E5C4E]">
                    {CLINIC_SCHEDULE.evening.label}
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-slate-800 sm:text-sm">
                    {CLINIC_SCHEDULE.evening.hours}
                  </p>
                </div>

                {/* Specialty Badge */}
                <div className="rounded-lg border border-[#0E5C4E]/15 bg-[#0E5C4E]/5 p-2.5">
                  <div className="flex items-center gap-1 text-[#0E5C4E]">
                    <ShieldCheck
                      className="h-3 w-3 shrink-0 text-[#0E5C4E]"
                      aria-hidden="true"
                    />
                    <p className="text-[10px] font-bold leading-tight">
                      {CLINIC_SCHEDULE.specialty.label}
                    </p>
                  </div>
                  <p className="mt-1 text-[10px] font-medium text-slate-600">
                    {CLINIC_SCHEDULE.specialty.hours}
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        </div>

        {/* ===================================================================
            MAP CONTAINER WITH GLASS OVERLAY
        =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative mt-8 sm:mt-10 overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-2 shadow-xl shadow-slate-100"
        >
          {/* FLOATING LOCATION BADGE */}
          <div className="absolute left-4 top-4 z-20 hidden items-center gap-3 rounded-xl border border-white/80 bg-white/90 p-3 shadow-md backdrop-blur-md sm:left-6 sm:top-6 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0E5C4E] text-white">
              <Navigation className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <Sparkles
                  className="h-3 w-3 text-[#0E5C4E]"
                  aria-hidden="true"
                />
                <p className="text-xs font-bold text-slate-900">
                  Swasthik Health Care
                </p>
              </div>
              <p className="text-[10px] font-medium text-slate-500">
                Kodungaiyur, Chennai
              </p>
            </div>
          </div>

          {/* EMBEDDED MAP IFRAME */}
          <div className="relative h-[300px] overflow-hidden rounded-xl sm:h-[420px] sm:rounded-2xl">
            <iframe
              title="Swasthik Health Care Location Map"
              src={GOOGLE_MAPS_EMBED_URL}
              className="h-full w-full border-0 grayscale-[10%] transition-all duration-700 hover:grayscale-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* FLOATING MAP CTA BUTTON */}
          <div className="absolute bottom-5 left-1/2 z-20 flex w-full -translate-x-1/2 items-center justify-center px-4 sm:bottom-6 sm:w-auto sm:px-0">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Swasthik Health Care in Google Maps external app"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#0E5C4E] px-5 py-2.5 text-xs font-bold tracking-wide text-white shadow-lg shadow-[#0E5C4E]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B483D] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0E5C4E] sm:w-auto sm:px-6 sm:py-3"
            >
              <span>Open in Google Maps</span>
              <div className="flex h-5 w-5 items-center justify-center rounded bg-white/15 backdrop-blur-md transition-transform duration-300 group-hover:translate-x-0.5">
                <ExternalLink
                  className="h-3 w-3 text-white"
                  aria-hidden="true"
                />
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}