import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  X,
} from 'lucide-react';

/* =========================================================
   TYPES & DATA CONSTANTS
   ========================================================= */

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Nieshad Khadharsheriff',
    rating: 5,
    review:
      'Good hospital. Dr. Malathi Ma’am, the gynaecologist, treats patients with patience and provides the right medicines. I always prefer to consult her for my health concerns. She takes excellent care of women’s health problems, and I have also seen positive results for my family members. She is kind, friendly, and caring. The entire staff is also very helpful, patient, and supportive.',
  },
  {
    id: 2,
    name: 'Chandrasekaran Sambantham',
    rating: 5,
    review:
      'Very good hospital. The doctors are very kind and caring. Dr. Ashwin Syam, Orthopaedic Surgeon, diagnosed my condition accurately and provided the proper treatment.',
  },
  {
    id: 3,
    name: 'Gayathri Haridas',
    rating: 5,
    review:
      'The eye and gynaecology treatments were very good overall. The doctors and nurses are also kind and well-behaved. I really appreciate the way they treated me and made me feel comfortable throughout my care.',
  },
  {
    id: 4,
    name: 'Sajitha Panneerselvam',
    rating: 5,
    review:
      'Good hospital with efficient doctors and staff. We consulted Dr. Malathi, the gynaecologist, and found her to be very kind-hearted, friendly, and caring towards her patients.',
  },
  {
    id: 5,
    name: 'Panneer Selvam',
    rating: 5,
    review:
      'I had been experiencing eye irritation for more than a month and had consulted several ophthalmologists, but my condition did not improve. Based on a recommendation from someone in my neighbourhood, I consulted Dr. Srinivasan. His service was excellent, and I have now completely recovered. I am very satisfied with the treatment and care I received.',
  },
];

/* =========================================================
   SUB-COMPONENTS: UTILITY & ATOMS
   ========================================================= */

function GoogleIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-label="Google logo"
      role="img"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

GoogleIcon.propTypes = {
  className: PropTypes.string,
};

function StarRating({ count = 5, sizeClass = 'h-[17px] w-[17px]' }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rated ${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Star
          key={index}
          className={`${sizeClass} fill-amber-400 text-amber-400 shrink-0`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

StarRating.propTypes = {
  count: PropTypes.number,
  sizeClass: PropTypes.string,
};

function getInitials(name) {
  if (!name) return '';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

/* =========================================================
   REVIEW CARD ITEM COMPONENT
   ========================================================= */

const ReviewCard = React.memo(({ item, index, onReadMore }) => {
  const isLongReview = item.review.length > 190;

  return (
    <article
      className="
        group
        relative
        flex
        w-[285px]
        shrink-0
        flex-col
        justify-between
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_8px_30px_rgba(15,23,42,0.06)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-teal-200
        hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)]
        sm:w-[340px]
        sm:rounded-[28px]
        sm:p-7
        md:w-[380px]
        transform-gpu
      "
    >
      <Quote
        className="
          pointer-events-none
          absolute
          right-5
          top-5
          h-6
          w-6
          text-teal-100
          transition-colors
          duration-300
          group-hover:text-teal-200
          sm:right-6
          sm:top-6
          sm:h-8
          sm:w-8
        "
        aria-hidden="true"
      />

      <div>
        <StarRating count={item.rating} />

        <p className="mt-4 sm:mt-5 line-clamp-5 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
          “{item.review}”
        </p>

        {isLongReview && (
          <button
            type="button"
            onClick={() => onReadMore(item)}
            className="
              mt-3
              sm:mt-4
              inline-flex
              items-center
              gap-1.5
              text-xs
              sm:text-sm
              font-semibold
              text-teal-700
              transition-colors
              hover:text-teal-900
              focus:outline-none
              focus:underline
            "
          >
            Read more
          </button>
        )}
      </div>

      <div className="mt-5 sm:mt-7 flex items-center justify-between border-t border-slate-100 pt-4 sm:pt-5">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div
            className="
              flex
              h-9
              w-9
              sm:h-10
              sm:w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-teal-50
              text-xs
              font-bold
              text-teal-700
              ring-1
              ring-teal-100
            "
            aria-hidden="true"
          >
            {getInitials(item.name)}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-xs sm:text-sm font-semibold text-slate-900">
              {item.name}
            </h3>
            <p className="mt-0.5 text-[10px] sm:text-xs text-slate-400">
              Google Review
            </p>
          </div>
        </div>

        <div className="ml-2 sm:ml-3 shrink-0">
          <GoogleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
      </div>
    </article>
  );
});

ReviewCard.displayName = 'ReviewCard';
ReviewCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onReadMore: PropTypes.func.isRequired,
};

/* =========================================================
   REVIEW DETAIL MODAL COMPONENT (PORTAL)
   ========================================================= */

const ReviewModal = React.memo(({ selectedReview, onClose }) => {
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

  if (!selectedReview) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-review-author"
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-slate-950/50
        p-3
        sm:p-4
        backdrop-blur-sm
        animate-fadeIn
        overflow-y-auto
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          my-auto
          w-full
          max-w-xl
          max-h-[85dvh]
          overflow-hidden
          rounded-2xl
          sm:rounded-[30px]
          border
          border-slate-200
          bg-white
          shadow-2xl
          flex
          flex-col
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close review detail"
          className="
            absolute
            right-4
            top-4
            sm:right-5
            sm:top-5
            z-10
            flex
            h-8
            w-8
            sm:h-9
            sm:w-9
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-white
            text-slate-500
            transition
            hover:bg-slate-50
            hover:text-slate-900
            focus:outline-none
            focus:ring-2
            focus:ring-teal-500
          "
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Content */}
        <div className="p-5 sm:p-7 md:p-9 flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 sm:gap-4 pr-10 shrink-0">
            <div
              className="
                flex
                h-10
                w-10
                sm:h-12
                sm:w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-teal-50
                text-xs
                sm:text-sm
                font-bold
                text-teal-700
                ring-1
                ring-teal-100
              "
              aria-hidden="true"
            >
              {getInitials(selectedReview.name)}
            </div>

            <div className="min-w-0">
              <h3
                id="modal-review-author"
                className="text-base sm:text-lg font-semibold text-slate-900 truncate"
              >
                {selectedReview.name}
              </h3>

              <div className="mt-1 flex items-center gap-2">
                <StarRating
                  count={selectedReview.rating}
                  sizeClass="h-3.5 w-3.5 sm:h-4 sm:w-4"
                />
                <GoogleIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
            </div>
          </div>

          <div className="my-4 sm:my-6 h-px bg-slate-100 shrink-0" />

          <div className="overflow-y-auto pr-1 text-slate-600">
            <p className="text-sm sm:text-base leading-6 sm:leading-7">
              “{selectedReview.review}”
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
});

ReviewModal.displayName = 'ReviewModal';
ReviewModal.propTypes = {
  selectedReview: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    rating: PropTypes.number,
    review: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

/* =========================================================
   MAIN PATIENT REVIEWS COMPONENT
   ========================================================= */

function PatientReviews() {
  const [selectedReview, setSelectedReview] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleReadMore = useCallback((review) => {
    setSelectedReview(review);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedReview(null);
  }, []);

  // Controls functionality
  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -340 : 340;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  // Duplicated reviews array for uninterrupted infinite marquee loop
  const marqueeItems = [...REVIEWS_DATA, ...REVIEWS_DATA];

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative overflow-hidden bg-white py-12 sm:py-20 lg:py-28"
    >
      {/* Background Decorators */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-60 w-60 sm:h-80 sm:w-80 rounded-full bg-teal-100/40 blur-3xl transform-gpu"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-10 h-60 w-60 sm:h-80 sm:w-80 rounded-full bg-emerald-100/30 blur-3xl transform-gpu"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            <GoogleIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Patient Reviews</span>
          </div>

          <h2
            id="reviews-heading"
            className="mt-4 sm:mt-5 text-2xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            What Our Patients Say
          </h2>

          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base lg:text-lg leading-relaxed text-slate-600">
            Hear directly from patients about their experience with our
            doctors, treatments, and compassionate care.
          </p>
        </div>

        {/* Carousel Section */}
        <div
          className="relative mt-10 sm:mt-14"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Edge Vignette Overlays */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 h-full w-8 bg-gradient-to-r from-white to-transparent sm:w-20 md:w-24"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 z-20 h-full w-8 bg-gradient-to-l from-white to-transparent sm:w-20 md:w-24"
          />

          {/* Marquee viewport */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto no-scrollbar py-3 sm:py-5"
          >
            <div
              className={`flex w-max gap-4 sm:gap-6 transform-gpu will-change-transform ${
                isPaused
                  ? '[animation-play-state:paused]'
                  : 'animate-hospital-reviews'
              }`}
            >
              {marqueeItems.map((item, index) => (
                <ReviewCard
                  key={`${item.id}-dup-${index}`}
                  item={item}
                  index={index}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Previous reviews"
            className="
              flex
              h-9
              w-9
              sm:h-10
              sm:w-10
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-600
              shadow-sm
              transition
              hover:border-teal-300
              hover:bg-teal-50
              hover:text-teal-700
              focus:outline-none
              focus:ring-2
              focus:ring-teal-500
              focus:ring-offset-2
            "
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Next reviews"
            className="
              flex
              h-9
              w-9
              sm:h-10
              sm:w-10
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-600
              shadow-sm
              transition
              hover:border-teal-300
              hover:bg-teal-50
              hover:text-teal-700
              focus:outline-none
              focus:ring-2
              focus:ring-teal-500
              focus:ring-offset-2
            "
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Full Review Modal Component */}
      <ReviewModal
        selectedReview={selectedReview}
        onClose={handleCloseModal}
      />

      {/* Dynamic Keyframes & Custom Scrollbar Rules */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes hospitalReviewsMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .animate-hospital-reviews {
          animation: hospitalReviewsMarquee 40s linear infinite;
        }

        @media (max-width: 640px) {
          .animate-hospital-reviews {
            animation-duration: 30s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-hospital-reviews {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

export default React.memo(PatientReviews);