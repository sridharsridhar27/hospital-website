import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  HeartPulse,
  Sparkles,
  AlertCircle,
  FileQuestion,
  RefreshCw,
  Activity,
  CheckCircle2,
  X,
  ShieldCheck,
  Stethoscope,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import SEO from '../components/SEO';

import {
  getConditionBySlug,
  getConditionItems,
} from '../api/conditionApi';

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Header section with brand typography and ambient lighting metadata
 */
const ConditionHeader = React.memo(({ condition }) => {
  return (
    <div className="mx-auto mt-6 max-w-3xl text-center sm:mt-8">
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="inline-flex items-center gap-1.5 rounded-full border border-[#0E5C4E]/20 bg-white px-3 py-1 text-[11px] font-semibold tracking-wide text-[#0E5C4E] shadow-sm backdrop-blur-md sm:px-3.5 sm:text-xs"
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
        {condition?.name
          ? `Understanding ${condition.name}`
          : 'Condition Information'}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-2 text-xs leading-relaxed text-slate-600 sm:mt-3 sm:text-sm lg:text-base"
      >
        {condition?.description ||
          'Explore detailed clinical insights, targeted sub-conditions, symptoms, and advanced care options available.'}
      </motion.p>
    </div>
  );
});

ConditionHeader.displayName = 'ConditionHeader';

/**
 * Reusable error alert with retry triggers
 */
const ErrorState = React.memo(({ error, onRetry, isRetrying }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mx-auto mt-8 max-w-lg rounded-2xl border border-red-200 bg-red-50/80 p-5 text-center shadow-sm backdrop-blur-sm sm:mt-12 sm:p-6"
  >
    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
      <AlertCircle className="h-5 w-5" />
    </div>
    <h3 className="mt-3 text-sm font-bold text-red-900">
      Unable to load condition details
    </h3>
    <p className="mt-1 text-xs text-red-700">{error}</p>
    <button
      type="button"
      onClick={onRetry}
      disabled={isRetrying}
      className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
    >
      <RefreshCw
        className={`h-3.5 w-3.5 ${isRetrying ? 'animate-spin' : ''}`}
      />
      {isRetrying ? 'Retrying...' : 'Try Again'}
    </button>
  </motion.div>
));

ErrorState.displayName = 'ErrorState';

/**
 * Skeleton loading placeholder grid
 */
const SkeletonGrid = React.memo(({ count = 6 }) => (
  <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={`skeleton-item-${i}`}
        className="animate-pulse overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm sm:p-4"
      >
        <div className="h-40 w-full rounded-xl bg-slate-200/70 sm:h-48" />
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
));

SkeletonGrid.displayName = 'SkeletonGrid';

/**
 * Empty data state presentation
 */
const EmptyState = React.memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="mx-auto mt-8 max-w-md rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm sm:mt-12 sm:rounded-3xl sm:p-8"
  >
    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#0E5C4E]/10 text-[#0E5C4E] sm:h-12 sm:w-12 sm:rounded-2xl">
      <FileQuestion className="h-5 w-5 sm:h-6 sm:w-6" />
    </div>
    <h3 className="mt-3 text-sm font-bold text-slate-900 sm:mt-4 sm:text-base">
      No detailed items found
    </h3>
    <p className="mt-1 text-xs text-slate-500">
      More information about this condition will be available soon.
    </p>
  </motion.div>
));

EmptyState.displayName = 'EmptyState';

/**
 * Individual Card component representing sub-condition/module items
 */
const ConditionItemCard = React.memo(({ item, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
      className="h-full"
    >
      <article className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md shadow-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-[#0E5C4E]/40 hover:shadow-xl hover:shadow-[#0E5C4E]/5">
        <div>
          {/* Image Banner */}
          <div className="relative h-40 w-full overflow-hidden bg-slate-100 sm:h-48">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name || 'Condition Item Visual'}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200/60 p-4 text-slate-400">
                <Activity className="h-7 w-7 text-[#0E5C4E]/40 sm:h-8 sm:w-8" />
                <span className="mt-1 text-[10px] font-medium text-slate-500 sm:text-[11px]">
                  Clinical Module
                </span>
              </div>
            )}

            {/* Top Badge */}
            <div className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3">
              <span className="inline-flex items-center gap-1 rounded-md border border-white/40 bg-white/80 px-2 py-0.5 text-[9px] font-bold text-[#0E5C4E] shadow-sm backdrop-blur-md sm:px-2.5 sm:py-1 sm:text-[10px]">
                <Sparkles className="h-2.5 w-2.5 text-[#0E5C4E]" />
                Focused Care
              </span>
            </div>
          </div>

          {/* Content Preview */}
          <div className="p-4 sm:p-5">
            <h2 className="text-sm font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#0E5C4E] sm:text-base">
              {item.name}
            </h2>

            {item.description ? (
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-600">
                {item.description}
              </p>
            ) : (
              <p className="mt-2 text-xs italic text-slate-400">
                Detailed treatment and management guidelines are available upon request.
              </p>
            )}
          </div>
        </div>

        {/* Footer Triggering Modal */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 py-3 sm:px-5 sm:py-3.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0E5C4E] sm:text-[11px]">
            <CheckCircle2 className="h-3 w-3" />
            Verified Info
          </span>

          <button
            type="button"
            onClick={() => onSelect(item)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0E5C4E] transition-colors hover:text-[#0B483D] focus:outline-none focus:underline"
          >
            <span>Learn More</span>
            <div className="flex h-5 w-5 items-center justify-center rounded bg-[#0E5C4E]/10 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="h-3 w-3 text-[#0E5C4E]" />
            </div>
          </button>
        </div>
      </article>
    </motion.div>
  );
});

ConditionItemCard.displayName = 'ConditionItemCard';

/**
 * Accessible detail modal overlay for comprehensive view
 */
const DetailModal = React.memo(({ selectedItem, onClose }) => {
  // ESC Key listener & Lock scroll for accessibility
  useEffect(() => {
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

  if (!selectedItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop Blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/20 bg-white shadow-2xl sm:rounded-3xl"
      >
        {/* Close Button (Icon) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details modal"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-md backdrop-blur-md transition-transform hover:scale-110 hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E5C4E] sm:right-4 sm:top-4 sm:h-9 sm:w-9"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-48 w-full bg-slate-100 sm:h-64 lg:h-72">
          {selectedItem.imageUrl ? (
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.name || 'Medical Visual'}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0E5C4E]/10 to-slate-200/80 p-6 text-[#0E5C4E]">
              <Activity className="h-10 w-10 sm:h-12 sm:w-12" />
              <span className="mt-2 text-[11px] font-semibold uppercase tracking-wider sm:text-xs">
                Medical Overview
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-md sm:px-3 sm:py-1 sm:text-[11px]">
              <Sparkles className="h-3 w-3 text-emerald-300" />
              Specialist Care Module
            </span>
            <h2
              id="modal-title"
              className="mt-1.5 text-xl font-bold tracking-tight text-white sm:mt-2 sm:text-2xl lg:text-3xl"
            >
              {selectedItem.name}
            </h2>
          </div>
        </div>

        {/* Modal Detailed Body */}
        <div className="space-y-4 p-5 sm:space-y-6 sm:p-8">
          <div>
            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#0E5C4E] sm:text-xs">
              <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Description &amp; Clinical Context
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm lg:text-base">
              {selectedItem.description ||
                'Detailed symptoms, treatment steps, and long-term care management information are carefully structured for clinical review.'}
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 sm:rounded-2xl sm:p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Stethoscope className="h-4 w-4 text-[#0E5C4E]" />
                Standard Treatment
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Evaluated using advanced clinic protocols and specialized care plans.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 sm:rounded-2xl sm:p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <ShieldCheck className="h-4 w-4 text-[#0E5C4E]" />
                Verified Standard
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                All medical procedures follow evidence-based health directory standards.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

DetailModal.displayName = 'DetailModal';

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

function ConditionDetailsPage() {
  const { slug } = useParams();

  const [condition, setCondition] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Selected item state for modal overlay
  const [selectedItem, setSelectedItem] = useState(null);

  /**
   * Data fetching with AbortController to handle race conditions and unmount cleanups
   */
  const fetchConditionDetails = useCallback(
    async (signal) => {
      try {
        setLoading(true);
        setError('');

        const conditionResponse = await getConditionBySlug(slug, { signal });
        const conditionData = conditionResponse?.data;

        if (!conditionData) {
          throw new Error('Condition metadata could not be found.');
        }

        setCondition(conditionData);

        if (conditionData.id) {
          const itemsResponse = await getConditionItems(conditionData.id, {
            signal,
          });
          setItems(itemsResponse?.data || []);
        } else {
          setItems([]);
        }
      } catch (err) {
        // Ignore abort errors caused by rapid route switches
        if (err.name === 'CanceledError' || err.name === 'AbortError') {
          return;
        }

        console.error('Failed to fetch condition details:', err);
        setError(
          err.response?.data?.message ||
            err.message ||
            'Failed to load condition details.'
        );
      } finally {
        setLoading(false);
      }
    },
    [slug]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchConditionDetails(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchConditionDetails]);

  const handleSelectItem = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const conditionName = condition?.name?.trim();

  const seoTitle = conditionName
    ? `${conditionName} Treatment & Care | Swasthik Healthcare Chennai`
    : 'Condition Information | Swasthik Healthcare Chennai';

  const seoDescription = conditionName
    ? `Learn about ${conditionName.toLowerCase()}, symptoms, treatment information, and specialist care available at Swasthik Healthcare in Kodungaiyur, Chennai.`
    : 'Explore condition information, symptoms, treatment details, and specialist care at Swasthik Healthcare in Kodungaiyur, Chennai.';

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/conditions/${slug}`}
      />

      <section className="relative min-h-screen overflow-hidden bg-slate-50/50 px-4 py-8 antialiased sm:px-8 sm:py-16 lg:px-12">
        {/* Background Ambient Lighting */}
        <div className="pointer-events-none absolute -left-40 top-1/6 h-[300px] w-[300px] rounded-full bg-[#0E5C4E]/10 blur-[80px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#0E5C4E]/10 blur-[80px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]" />

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
              BACK BUTTON
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to="/conditions"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0E5C4E] shadow-sm backdrop-blur-md transition-all hover:border-[#0E5C4E]/40 hover:bg-[#0E5C4E]/5 focus:outline-none focus:ring-2 focus:ring-[#0E5C4E]/20 sm:gap-2 sm:px-4 sm:py-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Directory
            </Link>
          </motion.div>

          {/* =====================================================
              HEADER SECTION
          ===================================================== */}
          <ConditionHeader condition={condition} />

          {/* =====================================================
              ERROR STATE
          ===================================================== */}
          {error && (
            <ErrorState
              error={error}
              onRetry={() => fetchConditionDetails()}
              isRetrying={loading}
            />
          )}

          {/* =====================================================
              LOADING SKELETON GRID
          ===================================================== */}
          {loading && !error && <SkeletonGrid count={6} />}

          {/* =====================================================
              EMPTY STATE
          ===================================================== */}
          {!loading && !error && items.length === 0 && <EmptyState />}

          {/* =====================================================
              CONDITION ITEMS GRID
          ===================================================== */}
          {!loading && !error && items.length > 0 && (
            <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              <AnimatePresence>
                {items.map((item, index) => (
                  <ConditionItemCard
                    key={item.id || index}
                    item={item}
                    index={index}
                    onSelect={handleSelectItem}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* =====================================================
              FULL DETAILS OVERLAY / PREMIUM MODAL CARD
          ===================================================== */}
          <AnimatePresence>
            {selectedItem && (
              <DetailModal
                selectedItem={selectedItem}
                onClose={handleCloseModal}
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

export default ConditionDetailsPage;