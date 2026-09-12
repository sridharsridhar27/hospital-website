import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import doctorImage from '../assets/Ashwin.jpg';

// ============================================================================
// DATA CONFIGURATIONS & CONSTANTS
// ============================================================================

const STATS_DATA = [
  {
    value: '5k+',
    label: 'Patients Treated',
  },
  {
    value: '5+ Yrs',
    label: 'Expert Experience',
  },
  {
    value: '98%',
    label: 'Success Rate',
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Animated Trust Badge Component
 */
const TrustBadge = React.memo(({ label }) => (
  <motion.div
    variants={itemVariants}
    className="inline-flex items-center gap-2.5 rounded-full border border-swasthic-primary/20 bg-gradient-to-r from-swasthic-primary/10 to-emerald-500/10 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-swasthic-primary shadow-sm backdrop-blur-md"
  >
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-swasthic-primary opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-swasthic-primary" />
    </span>
    {label}
  </motion.div>
));

TrustBadge.displayName = 'TrustBadge';

/**
 * Enterprise Stat Card Component
 */
const StatCard = React.memo(({ value, label }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -4 }}
    className="group rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white/60 p-2.5 sm:p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-swasthic-primary/30 hover:bg-white hover:shadow-md text-center sm:text-left"
  >
    <p className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-swasthic-text transition-colors group-hover:text-swasthic-primary">
      {value}
    </p>
    <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs font-medium leading-tight text-swasthic-muted">{label}</p>
  </motion.div>
));

StatCard.displayName = 'StatCard';

/**
 * Doctor Profile Interactive Showcase Card
 */
const DoctorCard = React.memo(({ image, name, title, specialty }) => (
  <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
    <div className="relative w-full max-w-md lg:max-w-none">
      {/* Multi-layered Ambient Glow */}
      <div
        className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-tr from-swasthic-primary/30 via-emerald-400/20 to-teal-300/30 blur-xl sm:blur-2xl"
        aria-hidden="true"
      />

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="group relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/80 bg-white/80 p-2 sm:p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-swasthic-primary/10"
      >
        {/* Main Image Wrapper */}
        <div className="relative h-[340px] xs:h-[380px] sm:h-[450px] lg:h-[480px] w-full overflow-hidden rounded-xl sm:rounded-[1.5rem]">
          <img
            src={image}
            alt={name}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Contrast Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-75" />

          {/* Top Specialty Tag */}
          <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-slate-900/40 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-white shadow-md backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {title}
            </span>
          </div>

          {/* Integrated Doctor Info Overlay */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 rounded-xl sm:rounded-2xl border border-white/30 bg-white/15 p-3 sm:p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:bg-white/20">
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-white drop-shadow-sm">
              {name}
            </h3>
            <p className="mt-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
              {specialty}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
));

DoctorCard.displayName = 'DoctorCard';

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================

function Hero() {
  return (
    <section
      aria-label="Hero Section"
      className="relative overflow-hidden bg-gradient-to-b from-swasthic-background via-white to-swasthic-background py-8 sm:py-12 lg:py-20"
    >
      {/* Background Ambient Blur Glows */}
      <div
        className="pointer-events-none absolute -left-32 top-10 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-swasthic-primary/10 blur-[80px] sm:blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-10 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-emerald-500/10 blur-[80px] sm:blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Hero Content */}
          <motion.div
            className="lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Trust Badge */}
            <TrustBadge label="Advanced Non-Surgical Care" />

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-4 sm:mt-5 text-3xl font-extrabold tracking-tight text-swasthic-text sm:text-5xl lg:text-6xl lg:leading-[1.12]"
            >
              Swasthik Healthcare <br />
              <span className="bg-gradient-to-r from-swasthic-primary via-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Live Pain-Free. Move Better.
              </span>
            </motion.h1>

            {/* Subtext Paragraph */}
            <motion.p
              variants={itemVariants}
              className="mt-3 sm:mt-5 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-swasthic-muted"
            >
              Swasthik Healthcare in Kodungaiyur, Chennai provides specialist
              healthcare services in Orthopaedics, Ophthalmology, Obstetrics &
              Gynaecology, and pain management, with patient-focused care for
              individuals and families.
            </motion.p>

            {/* Premium Stat Cards Grid */}
            <motion.div
              variants={itemVariants}
              className="mt-6 sm:mt-10 grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 border-t border-slate-200/60 pt-6 sm:pt-8"
            >
              {STATS_DATA.map((stat, idx) => (
                <StatCard key={idx} value={stat.value} label={stat.label} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Doctor Image + Glassmorphism Card */}
          <DoctorCard
            image={doctorImage}
            name="Dr. Ashwin Syam MBBS,DNB Orthopaedics"
            title="Senior Consultant"
            specialty="Orthopedic Surgeon & Regenerative Medicine"
          />
        </div>
      </div>
    </section>
  );
}

export default React.memo(Hero);