import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
  Stethoscope,
  Bone,
  HeartPulse,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Layers,
  X,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { getServicesByCategory } from '../api/serviceApi';

// Configuration Registry
const CATEGORY_CONFIG = Object.freeze({
  GENERAL: {
    title: 'General Services',
    subtitle: 'Primary Healthcare',
    description:
      'Comprehensive healthcare services engineered for your everyday medical needs with precision and care.',
    Icon: Stethoscope,
    badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
    accentGradient: 'from-emerald-500 to-teal-600',
  },
  ORTHOPAEDIC: {
    title: 'Orthopaedic Services',
    subtitle: 'Advanced Mobility & Bone Care',
    description:
      'Specialized orthopaedic care focused on restoring joint function, muscle health, and full structural mobility.',
    Icon: Bone,
    badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    accentGradient: 'from-blue-500 to-indigo-600',
  },
  OBSTETRICS_GYNAECOLOGY: {
    title: 'Obstetrics & Gynaecology Services',
    subtitle: 'Women’s Lifetime Wellness',
    description:
      'Dedicated, compassionate healthcare services empowering women through every stage of life and maternity.',
    Icon: HeartPulse,
    badgeColor: 'bg-[#FF6B45]/10 text-[#FF6B45] border-[#FF6B45]/20',
    accentGradient: 'from-[#FF6B45] to-rose-500',
  },
});

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Pure Helper Strategy
const hasRichContent = (service) =>
  Boolean(service?.imageUrl || service?.description?.trim());

// Sub-Component: Rich Card
const RichServiceCard = React.memo(({ service, onSelect, Icon }) => (
  <motion.article
    variants={cardVariants}
    whileHover={{ y: -6 }}
    onClick={() => onSelect(service)}
    className="group relative flex h-full min-h-[360px] sm:min-h-[420px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border border-[#E5E9E5] bg-white/90 p-3.5 sm:p-4 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-[#0E5C4E]/30 hover:shadow-[0_25px_50px_-12px_rgba(14,92,78,0.15)]"
  >
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="relative h-40 sm:h-48 w-full shrink-0 overflow-hidden rounded-xl sm:rounded-[2rem] bg-[#F1F8F5]">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt={service.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-[#62726C] p-4 text-center">
            <Icon className="h-8 w-8 sm:h-10 sm:w-10 opacity-30" />
            <span className="mt-2 text-[11px] sm:text-xs font-semibold">
              Image Preview Unavailable
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16241F]/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full border border-white/40 bg-white/70 p-1.5 sm:p-2 text-[#0E5C4E] shadow-sm backdrop-blur-md transition-transform duration-300 group-hover:rotate-12">
          <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-4 pt-3 sm:pt-5">
        <div>
          <h3 className="line-clamp-2 font-[Space_Grotesk] text-base sm:text-xl font-bold text-[#16241F] transition-colors duration-300 group-hover:text-[#0E5C4E]">
            {service.name}
          </h3>
          {service.description && (
            <p className="mt-2 line-clamp-2 sm:line-clamp-3 text-xs leading-relaxed text-[#62726C] sm:text-sm">
              {service.description}
            </p>
          )}
        </div>
      </div>
    </div>

    <div className="px-2.5 sm:px-4 pb-1 sm:pb-2 pt-0">
      <div className="flex items-center justify-between border-t border-[#E5E9E5]/60 pt-3 sm:pt-4 text-xs font-bold text-[#0E5C4E]">
        <span className="inline-flex items-center gap-1.5 transition-transform duration-300 group-hover:translate-x-1 text-[11px] sm:text-xs">
          Clinical Excellence
        </span>
        <button
          type="button"
          aria-label={`View details for ${service.name}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(service);
          }}
          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#F1F8F5] text-[#0E5C4E] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0E5C4E] group-hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0E5C4E] focus:ring-offset-2"
        >
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  </motion.article>
));
RichServiceCard.displayName = 'RichServiceCard';

// Sub-Component: Compact Pill Card
const CompactServiceCard = React.memo(({ service, onSelect }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ scale: 1.01, x: 2 }}
    onClick={() => onSelect(service)}
    className="group relative flex cursor-pointer items-center justify-between rounded-xl sm:rounded-2xl border border-[#E5E9E5] bg-white/90 p-3.5 sm:p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#FF6B45]/40 hover:bg-gradient-to-r hover:from-white hover:to-[#FF6B45]/5 hover:shadow-md"
  >
    <div className="flex items-center gap-3 sm:gap-4 pr-2 min-w-0">
      <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#FF6B45]/10 to-rose-500/10 text-[#FF6B45] transition-colors duration-300 group-hover:bg-[#FF6B45] group-hover:text-white">
        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#FF6B45]">
          Specialized Care
        </span>
        <h3 className="truncate font-[Space_Grotesk] text-sm sm:text-base font-bold text-[#16241F] transition-colors duration-300 group-hover:text-[#FF6B45]">
          {service.name}
        </h3>
      </div>
    </div>

    <button
      type="button"
      aria-label={`Select ${service.name}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(service);
      }}
      className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6B45]/10 text-[#FF6B45] transition-all duration-300 group-hover:bg-[#FF6B45] group-hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B45] focus:ring-offset-2"
    >
      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
    </button>
    <Sparkles className="absolute right-3 top-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF6B45]/20 opacity-0 transition-all duration-300 group-hover:opacity-100 hidden sm:block" />
  </motion.div>
));
CompactServiceCard.displayName = 'CompactServiceCard';

// Sub-Component: Service Detail Modal
const ServiceModal = React.memo(({ selectedService, config, onClose }) => {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!selectedService) return null;

  const Icon = config.Icon;

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-service-title"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#16241F]/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 my-auto max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-2xl sm:rounded-[2.5rem] border border-[#E5E9E5] bg-white shadow-2xl"
        >
          <div className="relative h-44 sm:h-64 lg:h-72 w-full shrink-0 bg-[#F1F8F5]">
            {selectedService.imageUrl ? (
              <img
                src={selectedService.imageUrl}
                alt={selectedService.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-[#62726C] p-4 text-center">
                <Icon className="h-10 w-10 sm:h-16 sm:w-16 opacity-30" />
                <span className="mt-2 text-xs sm:text-sm font-semibold">
                  Service Details
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="group absolute top-3 right-3 sm:top-4 sm:right-4 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 text-[#16241F] shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#0E5C4E]"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-500 ease-in-out group-hover:rotate-180" />
            </button>

            <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 max-w-[80%]">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider ${config.badgeColor} bg-white/90 backdrop-blur-md`}
              >
                <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                <span className="truncate">{config.title}</span>
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <h2
              id="modal-service-title"
              className="font-[Space_Grotesk] text-xl font-extrabold text-[#16241F] sm:text-2xl lg:text-3xl"
            >
              {selectedService.name}
            </h2>
            <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm lg:text-base leading-relaxed text-[#62726C]">
              {selectedService.description ||
                'Detailed clinical description for this medical procedure will be published shortly. Contact our healthcare team directly for additional clinical parameters.'}
            </p>

            <div className="mt-5 sm:mt-6 flex items-center gap-3 rounded-xl sm:rounded-2xl border border-[#E5E9E5] bg-[#FAFDFB] p-3 sm:p-4">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#0E5C4E]/10 text-[#0E5C4E]">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-medium text-[#62726C]">
                  Consultation
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#16241F]">
                  By Appointment
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
});
ServiceModal.displayName = 'ServiceModal';

// Sub-Component: Loading Skeleton
const ServicesSkeleton = () => (
  <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="h-[360px] sm:h-[420px] w-full animate-pulse rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border border-[#E5E9E5] bg-white/60 p-3.5 sm:p-4 shadow-sm"
      >
        <div className="h-40 sm:h-48 w-full rounded-xl sm:rounded-[2rem] bg-[#E8F4EF]/60" />
        <div className="mt-4 sm:mt-6 h-5 sm:h-6 w-3/4 rounded-md bg-gray-200" />
        <div className="mt-3 h-3.5 sm:h-4 w-full rounded-md bg-gray-100" />
        <div className="mt-2 h-3.5 sm:h-4 w-1/2 rounded-md bg-gray-100" />
      </div>
    ))}
  </div>
);

// Main Services Component
function Services({ category, onServiceClick }) {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  const config = CATEGORY_CONFIG[category];

  useEffect(() => {
    if (!category || !config) return;

    const controller = new AbortController();

    const fetchServices = async () => {
      try {
        setStatus('loading');
        setError('');

        const response = await getServicesByCategory(category, {
          signal: controller.signal,
        });

        setServices(response.data || []);
        setStatus('success');
      } catch (err) {
        if (err.name === 'CanceledError' || err.name === 'AbortError') return;

        console.error('Failed to fetch services:', err);
        setError(
          err.response?.data?.message ||
            'Unable to retrieve service records at this time.'
        );
        setServices([]);
        setStatus('error');
      }
    };

    fetchServices();

    return () => {
      controller.abort();
    };
  }, [category, config]);

  const handleServiceSelect = useCallback(
    (service) => {
      setSelectedService(service);
      if (onServiceClick) {
        onServiceClick(service);
      }
    },
    [onServiceClick]
  );

  const closeModal = useCallback(() => {
    setSelectedService(null);
  }, []);

  if (!config) {
    return (
      <div className="min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center bg-[#FAFDFB] px-4 sm:px-6 py-12 sm:py-20">
        <div className="mx-auto max-w-md w-full rounded-2xl sm:rounded-[2.5rem] border border-gray-200/80 bg-white p-6 sm:p-10 text-center shadow-xl backdrop-blur-md">
          <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-red-50 text-red-500">
            <Layers className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <h1 className="mt-4 sm:mt-6 font-[Space_Grotesk] text-xl sm:text-2xl font-extrabold text-[#16241F]">
            Category Not Found
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#62726C]">
            The requested medical service department could not be retrieved.
          </p>
        </div>
      </div>
    );
  }

  const Icon = config.Icon;
  const isLoading = status === 'loading';
  const isError = status === 'error';

  return (
    <div className="relative overflow-hidden bg-[#FAFDFB] text-[#16241F] antialiased">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-[#0E5C4E]/5 blur-[80px] sm:blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-[#FF6B45]/5 blur-[80px] sm:blur-[120px]" />

      <section className="relative px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl">
          <header className="relative mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#0E5C4E]/15 bg-white/80 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0E5C4E] shadow-sm backdrop-blur-md"
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF6B45]" />
              <span>{config.subtitle}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 sm:mt-6 font-[Space_Grotesk] text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#16241F]"
            >
              {config.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 sm:mt-4 text-xs sm:text-base lg:text-lg leading-relaxed text-[#62726C]"
            >
              {config.description}
            </motion.p>
          </header>

          <AnimatePresence>
            {isError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mx-auto mt-6 sm:mt-10 max-w-xl rounded-xl sm:rounded-2xl border border-red-200 bg-red-50/80 p-4 sm:p-5 text-center shadow-sm backdrop-blur-sm"
              >
                <p className="text-xs sm:text-sm font-semibold text-red-600">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {isLoading && <ServicesSkeleton />}

          {!isLoading && !isError && (
            <div className="mt-8 sm:mt-12 md:mt-16">
              {services.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mx-auto max-w-lg rounded-2xl sm:rounded-[2.5rem] border border-dashed border-[#0E5C4E]/20 bg-white/50 p-6 sm:p-12 text-center shadow-sm backdrop-blur-md"
                >
                  <Activity className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-[#0E5C4E]/40" />
                  <h3 className="mt-3 sm:mt-4 font-[Space_Grotesk] text-lg sm:text-xl font-bold text-[#16241F]">
                    No Services Found
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#62726C]">
                    We are currently expanding our offerings. Check back soon for updated medical services in this category.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
                >
                  {services.map((service) =>
                    hasRichContent(service) ? (
                      <RichServiceCard
                        key={service.id}
                        service={service}
                        onSelect={handleServiceSelect}
                        Icon={Icon}
                      />
                    ) : (
                      <CompactServiceCard
                        key={service.id}
                        service={service}
                        onSelect={handleServiceSelect}
                      />
                    )
                  )}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      <ServiceModal
        selectedService={selectedService}
        config={config}
        onClose={closeModal}
      />
    </div>
  );
}

Services.propTypes = {
  category: PropTypes.string.isRequired,
  onServiceClick: PropTypes.func,
};

export default React.memo(Services);