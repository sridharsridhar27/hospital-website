import React from 'react';
import hospitalImage from '../assets/Hospital.jpeg';

/**
 * Interface / Structural Data definitions for dynamic metrics rendering
 */
const INSTITUTE_METRICS = [
  {
    value: '200+',
    label: 'Deliveries',
    description: 'Successful deliveries supported',
  },
  {
    value: '500+',
    label: 'Fertility Care',
    description: 'Patients managed with fertility care',
  },
  {
    value: '100+',
    label: 'Regenerative',
    description: 'Advanced pain & regenerative treatments',
  },
];

export default function OurInstitute() {
  return (
    <section 
      aria-labelledby="institute-heading"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-emerald-50/20 px-4 py-12 sm:px-8 sm:py-16 md:py-20 lg:px-16"
    >
      {/* =====================================================
          DECORATIVE BACKGROUND ACCENTS (GPU Accelerated)
      ===================================================== */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -left-20 top-1/4 h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-emerald-100/50 blur-3xl transform-gpu" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute right-0 bottom-10 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-teal-100/40 blur-3xl transform-gpu" 
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">

          {/* =====================================================
              LEFT — HOSPITAL IMAGE & FLOATING METRIC BADGES
          ===================================================== */}
          <div className="relative lg:col-span-6">
            
            {/* Primary Image Wrapper */}
            <div className="group relative overflow-hidden rounded-2xl sm:rounded-[32px] border border-slate-200/80 bg-white p-1.5 sm:p-2 shadow-2xl shadow-emerald-950/5 transition-shadow duration-300 hover:shadow-emerald-950/10">
              <div className="overflow-hidden rounded-xl sm:rounded-[24px] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full">
                <img
                  src={hospitalImage}
                  alt="Swasthik Healthcare Hospital Facility exterior view"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                />
              </div>

              {/* Floating Overlay Badge: Established Year */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 rounded-xl sm:rounded-2xl border border-white/40 bg-white/80 p-2.5 sm:p-3.5 backdrop-blur-md shadow-lg shadow-black/5 transition-transform duration-300 group-hover:translate-y-[-2px]">
                <p className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#0E5C4E]">
                  Established
                </p>
                <time 
                  dateTime="2008" 
                  className="text-base sm:text-xl font-extrabold text-[#16241F]"
                >
                  2008
                </time>
              </div>

              {/* Floating Stat Card: Key Milestones */}
              <div className="absolute -bottom-3 right-4 sm:-bottom-4 sm:right-6 hidden sm:flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-emerald-100/80 bg-white/95 p-3 sm:p-4 shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:translate-y-[-2px]">
                <div 
                  className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#F1F8F5] text-lg sm:text-xl text-[#0E5C4E]"
                  aria-hidden="true"
                >
                  🏥
                </div>
                <div>
                  <p className="text-xs font-bold text-[#16241F]">Trusted Healthcare</p>
                  <p className="text-[10px] sm:text-[11px] text-[#62726C]">15+ Years of Service</p>
                </div>
              </div>
            </div>

            {/* Backdrop Decorative Frame */}
            <div 
              aria-hidden="true" 
              className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 -z-10 h-full w-full rounded-2xl sm:rounded-[36px] bg-emerald-600/10 transition-transform duration-500 group-hover:scale-[1.01]" 
            />
          </div>

          {/* =====================================================
              RIGHT — CONTENT & METRICS HIGHLIGHT
          ===================================================== */}
          <article className="lg:col-span-6">

            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-[#F1F8F5] px-3.5 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-bold tracking-[0.1em] text-[#0E5C4E] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#0E5C4E] animate-pulse" aria-hidden="true" />
              OUR INSTITUTE
            </div>

            {/* Main Section Heading */}
            <h2 
              id="institute-heading"
              className="mt-3 sm:mt-4 text-2xl font-extrabold tracking-tight text-[#16241F] sm:text-4xl lg:text-[42px] lg:leading-[1.2]"
            >
              Our Institute
            </h2>

            {/* Structured Content Paragraphs */}
            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-xs sm:text-base leading-relaxed text-[#62726C]">

              <p className="rounded-xl sm:rounded-2xl border border-transparent p-1 sm:p-1.5 transition-colors duration-200 hover:border-emerald-100 hover:bg-emerald-50/30">
                Established in <strong className="font-bold text-[#16241F]">2008</strong>,
                our hospital has been committed to delivering compassionate,
                patient-centered healthcare for nearly a two decade. Over the
                years, we have successfully supported{' '}
                <strong className="font-semibold text-[#16241F]">
                  more than 200 deliveries
                </strong>{' '}
                and helped{' '}
                <strong className="font-semibold text-[#16241F]">
                  over 500 patients
                </strong>{' '}
                through comprehensive fertility management and care.
              </p>

              <p className="rounded-xl sm:rounded-2xl border border-transparent p-1 sm:p-1.5 transition-colors duration-200 hover:border-emerald-100 hover:bg-emerald-50/30">
                Building on this foundation, we introduced our{' '}
                <strong className="font-bold text-[#16241F]">
                  Orthopaedics, Regenerative Medicine &amp; Pain Management
                </strong>{' '}
                speciality two years ago. Since then,{' '}
                <strong className="font-semibold text-[#16241F]">
                  more than 100 patients
                </strong>{' '}
                have been successfully treated through advanced regenerative
                medicine and personalised pain management approaches.
              </p>

              <p className="rounded-xl sm:rounded-2xl border border-transparent p-1 sm:p-1.5 transition-colors duration-200 hover:border-emerald-100 hover:bg-emerald-50/30">
                Today, our institute continues to evolve by bringing together{' '}
                <strong className="font-bold text-[#16241F]">
                  experience, advanced medical expertise, and patient-focused care
                </strong>{' '}
                to support better health outcomes at every stage of life.
              </p>

            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3 border-t border-slate-200/80 pt-5 sm:pt-6">
              {INSTITUTE_METRICS.map((metric, index) => (
                <div 
                  key={index} 
                  className="rounded-lg sm:rounded-xl bg-white p-2.5 sm:p-3 text-center border border-slate-100 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md"
                >
                  <span className="block text-base sm:text-xl font-black text-[#0E5C4E]">
                    {metric.value}
                  </span>
                  <span className="block text-[10px] sm:text-[11px] font-medium leading-tight text-[#62726C] mt-0.5">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

          </article>

        </div>
      </div>
    </section>
  );
}