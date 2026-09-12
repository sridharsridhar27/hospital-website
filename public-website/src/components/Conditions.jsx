import { useEffect, useState, useCallback } from 'react';
import {
  HeartPulse,
  ArrowUpRight,
  Sparkles,
  AlertCircle,
  FileQuestion,
  RefreshCw,
  Activity,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { getConditions } from '../api/conditionApi';

// ============================================================================
// CONSTANTS & ANIMATION VARIANTS
// ============================================================================
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
function LoadingSkeleton() {
  return (
    <div
      className="mt-8 sm:mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
      role="status"
      aria-label="Loading health conditions"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
        >
          <div className="aspect-video w-full rounded-xl bg-slate-200/70 sm:h-48" />
          <div className="mt-4 space-y-2.5">
            <div className="h-5 w-2/3 rounded-md bg-slate-200/80" />
            <div className="h-3.5 w-full rounded bg-slate-200/50" />
            <div className="h-3.5 w-4/5 rounded bg-slate-200/50" />
            <div className="pt-2">
              <div className="h-4 w-1/3 rounded bg-slate-200/70" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ConditionCard({ condition }) {
  const [imgError, setImgError] = useState(false);

  const hasValidImage = condition?.imageUrl && !imgError;

  return (
    <motion.div variants={ITEM_VARIANTS} layout className="h-full">
      <Link
        to={`/conditions/${condition.slug}`}
        className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md shadow-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-[#0E5C4E]/40 hover:shadow-xl hover:shadow-[#0E5C4E]/5 focus:outline-none focus:ring-2 focus:ring-[#0E5C4E] focus:ring-offset-2"
      >
        <div>
          {/* Top Banner Image Container */}
          <div className="relative aspect-video w-full overflow-hidden bg-slate-100 sm:h-48 md:h-52">
            {hasValidImage ? (
              <img
                src={condition.imageUrl}
                alt={condition.name || 'Medical Condition'}
                onError={() => setImgError(true)}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200/60 p-4 text-slate-400">
                <Activity className="h-8 w-8 text-[#0E5C4E]/40" />
                <span className="mt-1 text-[11px] font-medium text-slate-500">
                  Medical Condition
                </span>
              </div>
            )}

            {/* Top Badge Overlay */}
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center gap-1 rounded-md border border-white/40 bg-white/80 px-2 py-0.5 text-[10px] font-bold text-[#0E5C4E] shadow-sm backdrop-blur-md sm:px-2.5 sm:py-1">
                <Sparkles className="h-2.5 w-2.5 text-[#0E5C4E]" />
                Specialty Care
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-4 sm:p-5">
            <h2 className="text-base font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#0E5C4E] sm:text-lg">
              {condition.name}
            </h2>

            {condition.description ? (
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                {condition.description}
              </p>
            ) : (
              <p className="mt-2 text-xs italic text-slate-400 sm:text-sm">
                Detailed medical treatment information available upon viewing.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="flex items-center justify-end border-t border-slate-100 bg-slate-50/50 px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-[#0E5C4E] group-hover:text-[#0B483D] sm:text-sm">
            <span>View Details</span>
            <div className="flex h-5 w-5 items-center justify-center rounded bg-[#0E5C4E]/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <ArrowUpRight className="h-3 w-3 text-[#0E5C4E]" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Conditions() {
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchConditions = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getConditions();
      
      // Standardize response payload safely
      const data = response?.data?.data || response?.data || [];
      if (Array.isArray(data)) {
        setConditions(data);
      } else {
        setConditions([]);
      }
    } catch (err) {
      console.error('Failed to fetch conditions:', err);
      setError(
        err.response?.data?.message ||
          'Failed to load health conditions. Please check your connection.'
      );
      setConditions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConditions();
  }, [fetchConditions]);

  return (
    <section className="relative overflow-hidden bg-slate-50/50 px-4 py-10 sm:px-6 sm:py-16 md:px-8 lg:px-12">
      {/* Background Ambient Lighting */}
      <div className="pointer-events-none absolute -left-40 top-1/6 h-[300px] w-[300px] rounded-full bg-[#0E5C4E]/10 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#0E5C4E]/10 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]" />

      {/* Background Subtle Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#0E5C4E 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            HEADER SECTION
        ===================================================== */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#0E5C4E]/20 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-[#0E5C4E] shadow-sm backdrop-blur-md sm:px-3.5"
          >
            <HeartPulse className="h-3.5 w-3.5 text-[#0E5C4E]" />
            Specialized Care Directory
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-[Space_Grotesk] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Health Conditions We Treat
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm lg:text-base"
          >
            Explore our comprehensive medical directory to learn more about key health
            conditions, symptoms, and advanced treatment options available at our clinic.
          </motion.p>
        </div>

        {/* =====================================================
            ERROR STATE
        ===================================================== */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-8 max-w-lg rounded-2xl border border-red-200 bg-red-50/80 p-5 text-center backdrop-blur-sm sm:mt-12 sm:p-6"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <AlertCircle className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-red-900 sm:text-base">
              Unable to load conditions
            </h3>
            <p className="mt-1 text-xs text-red-700 sm:text-sm">{error}</p>
            <button
              onClick={fetchConditions}
              type="button"
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Try Again
            </button>
          </motion.div>
        )}

        {/* =====================================================
            LOADING STATE (SKELETON GRID)
        ===================================================== */}
        {loading && !error && <LoadingSkeleton />}

        {/* =====================================================
            EMPTY / NO RESULTS STATE
        ===================================================== */}
        {!loading && !error && conditions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto mt-8 max-w-md rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm sm:mt-12 sm:p-8"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0E5C4E]/10 text-[#0E5C4E]">
              <FileQuestion className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">
              No conditions added
            </h3>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              There are currently no health conditions available in the directory.
            </p>
          </motion.div>
        )}

        {/* =====================================================
            CONDITIONS GRID
        ===================================================== */}
        {!loading && !error && conditions.length > 0 && (
          <motion.div
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
            className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          >
            <AnimatePresence>
              {conditions.map((condition, index) => (
                <ConditionCard
                  key={condition.id || condition._id || condition.slug || index}
                  condition={condition}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}