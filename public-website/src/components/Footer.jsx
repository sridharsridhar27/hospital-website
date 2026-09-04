import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EnhancedFooter() {
  const navigate = useNavigate();

  const googleMapsUrl =
    'https://maps.app.goo.gl/ZqK8usHx3Hjf9qm26?g_st=aw';

  const instagramUrl =
    'https://www.instagram.com/ashwin_syam?igsi=MWcwOTM0aXR2cHQ0ag==';

  const linkedinUrl =
    'https://www.linkedin.com/in/dr-ashwin-syam-22129a8a?utm_source=share_via&utm_content=profile&utm_medium=member_android';

  /*
   * =========================================================
   * NAVIGATION + SCROLL TO TOP
   * =========================================================
   */

  const handleNavigation = (path) => {
    navigate(path);

    // Reset scroll position after React Router navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }, 0);
  };

  return (
    <footer className="relative w-full bg-slate-50 pt-6">

      {/* =========================================================
          PRIMARY FOOTER CONTAINER
      ========================================================= */}

      <div className="relative overflow-hidden rounded-tl-[40px] bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#022c22] text-white shadow-xl sm:rounded-tl-[60px] lg:rounded-tl-[80px]">

        {/* =======================================================
            TOPOGRAPHIC BACKGROUND
        ======================================================= */}

        <div className="pointer-events-none absolute inset-0 opacity-10">

          <svg
            className="h-full w-full object-cover"
            viewBox="0 0 1440 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >

            <path
              d="M-100 150 Q 350 400 800 120 T 1700 200"
              stroke="white"
              strokeWidth="2.5"
            />

            <path
              d="M-100 220 Q 380 480 850 180 T 1750 270"
              stroke="white"
              strokeWidth="1.5"
            />

          </svg>

        </div>


        {/* =======================================================
            DECORATIVE GLOW
        ======================================================= */}

        <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-emerald-400/10 blur-2xl" />

        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-teal-400/10 blur-2xl" />


        {/* =======================================================
            MAIN CONTENT
        ======================================================= */}

        <div className="relative mx-auto max-w-7xl px-5 pb-5 pt-8 lg:px-8">

          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">


            {/* =====================================================
                LEFT SECTION
                BRANDING + NAVIGATION
            ===================================================== */}

            <div className="space-y-4 lg:col-span-5">

              {/* BRAND */}

              <div className="space-y-1.5">

                <button
                  type="button"
                  onClick={() => handleNavigation('/')}
                  className="group inline-flex items-center gap-2.5 text-left"
                >

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 p-1.5 text-white shadow-inner backdrop-blur-md transition-transform group-hover:scale-105">

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5 text-emerald-300"
                    >

                      <path
                        d="M16.5 6.5C16.5 4.5 14.5 3 12 3C8.5 3 6 5.5 6 8.5C6 12.5 18 11.5 18 15.5C18 18.5 15.5 21 12 21C9.5 21 7.5 19.5 7.5 17.5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                    </svg>

                  </div>


                  <div className="flex flex-col">

                    <span className="text-xl font-extrabold leading-tight tracking-tight text-white">

                      Swasthik
                      <span className="font-light text-emerald-200">
                        {' '}
                        Healthcare
                      </span>

                    </span>

                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-200/90">
                      Move Better • Live Painless
                    </span>

                  </div>

                </button>


                <p className="max-w-md text-[11px] leading-relaxed text-emerald-100/80">
                  Delivering specialized orthopedic and holistic health
                  care solutions dedicated to improving patient mobility.
                </p>

              </div>


              {/* ===================================================
                  QUICK NAVIGATION
              =================================================== */}

              <div>

                <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-emerald-200/90">
                  Quick Navigation
                </h4>


                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs font-medium text-emerald-50/90">

                  {/* ABOUT */}

                  <button
                    type="button"
                    onClick={() => handleNavigation('/team')}
                    className="flex items-center gap-1 text-left transition-colors hover:text-white"
                  >
                    <span className="text-[10px] text-emerald-300">
                      ›
                    </span>

                    About Us
                  </button>


                  {/* FAQ */}

                  <button
                    type="button"
                    onClick={() => handleNavigation('/faq')}
                    className="flex items-center gap-1 text-left transition-colors hover:text-white"
                  >
                    <span className="text-[10px] text-emerald-300">
                      ›
                    </span>

                    FAQ
                  </button>


                  {/* GENERAL SERVICES */}

                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation('/services/general')
                    }
                    className="flex items-center gap-1 text-left transition-colors hover:text-white"
                  >
                    <span className="text-[10px] text-emerald-300">
                      ›
                    </span>

                    General Services
                  </button>


                  {/* CONDITIONS */}

                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation('/conditions')
                    }
                    className="flex items-center gap-1 text-left transition-colors hover:text-white"
                  >
                    <span className="text-[10px] text-emerald-300">
                      ›
                    </span>

                    Condition
                  </button>


                  {/* ORTHOPAEDIC */}

                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation('/services/orthopaedic')
                    }
                    className="flex items-center gap-1 text-left transition-colors hover:text-white"
                  >
                    <span className="text-[10px] text-emerald-300">
                      ›
                    </span>

                    Orthopedic Care
                  </button>


                  {/* GALLERY */}

                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation('/gallery')
                    }
                    className="flex items-center gap-1 text-left transition-colors hover:text-white"
                  >
                    <span className="text-[10px] text-emerald-300">
                      ›
                    </span>

                    Clinic Gallery
                  </button>


                  {/* GYNAECOLOGY */}

                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation(
                        '/services/obstetrics-gynaecology'
                      )
                    }
                    className="flex items-center gap-1 text-left transition-colors hover:text-white"
                  >
                    <span className="text-[10px] text-emerald-300">
                      ›
                    </span>

                    Obstetrics & Gynaecology Service
                  </button>


                  {/* CONTACT */}

                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation('/contact')
                    }
                    className="flex items-center gap-1 text-left transition-colors hover:text-white"
                  >
                    <span className="text-[10px] text-emerald-300">
                      ›
                    </span>

                    Contact Us
                  </button>

                </div>

              </div>

            </div>


            {/* =====================================================
                MIDDLE SECTION
                LOCATION + CONTACT + HOURS
            ===================================================== */}

            <div className="relative rounded-2xl border border-slate-100 bg-white p-5 text-slate-800 shadow-xl lg:col-span-4">

              {/* MAIN CLINIC BADGE */}

              <div className="absolute left-6 top-0 -translate-y-1/2 rounded-full bg-[#047857] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow">
                Main Clinic
              </div>


              <h3 className="text-base font-extrabold text-[#064e3b]">
                Swasthic Healthcare
              </h3>


              <div className="mt-3 space-y-2.5 text-xs text-slate-600">

                {/* ADDRESS */}

                <div className="flex items-start gap-2.5">

                  <span className="text-emerald-700">
                    📍
                  </span>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leading-tight transition-colors hover:text-[#047857]"
                  >
                    211, 1st Main Road, M.R. Nagar,
                    Kodungaiyur, Opposite A.P.R. Bazar,
                    Chennai – 600118
                  </a>

                </div>


                {/* PHONE + WHATSAPP */}

                <div className="flex items-center gap-2.5">

                  <span className="text-emerald-700">
                    📞
                  </span>

                  <div className="flex flex-wrap items-center gap-2 text-xs">

                    {/* Normal Call */}
                    <a
                      href="tel:9884507412"
                      className="font-semibold text-slate-800 transition-colors hover:text-[#047857]"
                    >
                      9884507412
                    </a>

                    <span className="text-slate-300">
                      |
                    </span>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/919884842776"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-600 transition-colors hover:underline"
                    >
                      WhatsApp
                    </a>

                  </div>

                </div>

                {/* EMAIL */}

                <div className="flex items-center gap-2.5">

                  <span className="text-emerald-700">
                    ✉️
                  </span>

                  <a
                    href="mailto:ashwinsyam95@gmail.com"
                    className="break-all font-medium text-slate-700 hover:text-[#047857]"
                  >
                    ashwinsyam95@gmail.com
                  </a>

                </div>

              </div>


              <hr className="my-3 border-slate-100" />


              {/* CLINIC HOURS */}

              <div>

                <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#064e3b]">
                  Clinic Hours
                </h4>


                <div className="mt-1.5 grid grid-cols-2 gap-2 text-[11px] text-slate-600">

                  {/* DAY */}

                  <div className="rounded-md border border-slate-100 bg-slate-50 p-1.5 text-center">

                    <span className="block text-[10px] font-medium text-slate-500">
                      Mon - Sat
                    </span>

                    <span className="font-semibold text-slate-900">
                      11:00 AM – 1:30 PM
                    </span>

                  </div>


                  {/* EVENING */}

                  <div className="rounded-md border border-slate-100 bg-slate-50 p-1.5 text-center">

                    <span className="block text-[10px] font-medium text-slate-500">
                      Evening
                    </span>

                    <span className="font-semibold text-slate-900">
                      6:30 PM – 9:30 PM
                    </span>

                  </div>

                </div>


                {/* ORTHOPAEDIC */}

                <div className="mt-2 rounded-md border border-emerald-100 bg-emerald-50 p-2 text-center">

                  <span className="block text-[10px] font-medium text-emerald-700">
                    Orthopaedic and Ophthalmology Consultation
                  </span>

                  <span className="font-semibold text-slate-900">
                    Evening only — 6:30 PM – 9:30 PM
                  </span>

                </div>

              </div>

            </div>


            {/* =====================================================
                RIGHT SECTION
                GOOGLE MAP
            ===================================================== */}

            <div className="relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-white/20 bg-slate-100 shadow-xl lg:col-span-3">

              {/* MAP */}

              <iframe
                title="Swasthic Healthcare Map Location"
                src="https://www.google.com/maps?q=Swasthik+Health+Care,+MR+Nagar,+Kodungaiyur,+Chennai,+Tamil+Nadu+600118&z=16&output=embed"
                className="h-full min-h-[220px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />


              {/* MAP BUTTON */}

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/95 px-2 py-2 text-center text-[11px] font-bold text-[#064e3b] shadow backdrop-blur-md transition-all hover:bg-white"
              >
                📍 Open in Google Maps
              </a>

            </div>

          </div>


          {/* =======================================================
              BOTTOM BAR
          ======================================================= */}

          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-4 sm:flex-row">

            {/* COPYRIGHT */}

            <p className="text-center text-[11px] text-emerald-100/70 sm:text-left">
              © {new Date().getFullYear()} Swasthic Healthcare.
              All Rights Reserved.
            </p>


            {/* SOCIAL LINKS */}

            <div className="flex items-center gap-2">

              {/* INSTAGRAM */}

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white transition-all hover:bg-white hover:text-[#064e3b]"
              >

                <svg
                  className="h-3.5 w-3.5 fill-current"
                  viewBox="0 0 24 24"
                >

                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.28-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98-.059-1.28-.073-1.689-.073-4.948 0-3.259.014-3.667.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.79 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />

                </svg>

              </a>


              {/* LINKEDIN */}

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white transition-all hover:bg-white hover:text-[#064e3b]"
              >

                <svg
                  className="h-3.5 w-3.5 fill-current"
                  viewBox="0 0 24 24"
                >

                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />

                </svg>

              </a>

            </div>


            {/* ===================================================
                LEGAL LINKS
            =================================================== */}

            <div className="flex gap-4 text-[11px] text-emerald-100/70">

              <button
                type="button"
                onClick={() => handleNavigation('/privacy')}
                className="transition-colors hover:text-white"
              >
                Privacy Policy
              </button>

              <button
                type="button"
                onClick={() => handleNavigation('/terms')}
                className="transition-colors hover:text-white"
              >
                Terms of Service
              </button>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}