import { useEffect, useState, memo, useCallback } from 'react';
import {
  ArrowLeft,
  Phone,
  X,
  UserCheck,
  Sparkles,
  ChevronRight,
  Award,
  Stethoscope,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTeamMembers } from '../api/team';
import SEO from '../components/SEO';

// Optimized Progressive Image Component
const ProgressiveImage = memo(
  ({
    src,
    alt,
    className,
    width,
    height,
    fallbackSrc = '/placeholder-avatar.png',
  }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
      <div className="relative h-full w-full overflow-hidden bg-[#F1F8F5]">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-[#E8F4EF]" />
        )}

        <img
          src={imageError ? fallbackSrc : src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`${className} transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    );
  }
);

ProgressiveImage.displayName = 'ProgressiveImage';

// Memoized Team Member Card
const TeamMemberCard = memo(({ member, index, onSelect }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-[#E5E9E5] bg-white p-3 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#0E5C4E]/30 hover:shadow-[0_20px_40px_-15px_rgba(14,92,78,0.12)]"
    >
      <div>
        {/* Image Container with Gradient Overlay */}
        <div className="relative h-[330px] w-full overflow-hidden rounded-[2rem] bg-[#F1F8F5]">
          <ProgressiveImage
            src={member.imageUrl}
            alt={member.name}
            width="400"
            height="330"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Dark Gradient Overlay for Text Clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#16241F]/80 via-[#16241F]/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90 pointer-events-none" />

          {/* Image Bottom Detail Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
            <span className="inline-block rounded-lg bg-[#FF6B45] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
              {member.designation}
            </span>

            <h2 className="mt-1.5 font-[Space_Grotesk] text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              {member.name}
            </h2>
          </div>
        </div>

        {/* Member Brief Description */}
        <div className="px-3 pt-5 pb-2">
          <p className="line-clamp-3 text-xs sm:text-sm leading-relaxed text-[#62726C]">
            {member.about}
          </p>
        </div>
      </div>

      {/* Enhanced Interactive Action Button */}
      <div className="p-3 pt-2">
        <button
          onClick={() => onSelect(member)}
          className="group/btn relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-[#F1F8F5] px-5 py-3.5 text-xs font-bold text-[#0E5C4E] transition-all duration-300 hover:bg-[#0E5C4E] hover:text-white hover:shadow-md active:scale-[0.98]"
        >
          <span className="z-10 transition-colors duration-300">
            View Full Bio & Details
          </span>

          <div className="z-10 flex h-7 w-7 items-center justify-center rounded-xl bg-white/80 text-[#0E5C4E] shadow-sm transition-all duration-300 group-hover/btn:bg-white/20 group-hover/btn:text-white">
            <ChevronRight
              size={15}
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
            />
          </div>
        </button>
      </div>
    </motion.article>
  );
});

TeamMemberCard.displayName = 'TeamMemberCard';

// Modal Component
const TeamMemberModal = memo(({ selectedMember, onClose }) => {
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

  if (!selectedMember) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Glassmorphism Backdrop Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0B1512]/70 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Curved Square Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/95 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:rounded-[3rem]"
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E9E5] bg-white/80 text-[#16241F] shadow-md backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:bg-[#FF6B45] hover:text-white hover:border-transparent"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Split Responsive Grid Layout */}
        <div className="grid md:grid-cols-12">
          {/* Left Profile Image Section */}
          <div className="relative h-72 w-full bg-[#E8F4EF] md:col-span-5 md:h-auto min-h-[320px]">
            <ProgressiveImage
              src={selectedMember.imageUrl}
              alt={selectedMember.name}
              width="320"
              height="400"
              className="h-full w-full object-cover object-top"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#16241F]/60 via-transparent to-transparent md:hidden" />

            <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-3 py-1.5 backdrop-blur-md md:hidden">
              <p className="text-xs font-bold text-[#0E5C4E]">
                {selectedMember.designation}
              </p>
            </div>
          </div>

          {/* Right Content & Bio */}
          <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7">
            <div>
              {/* Category Pill Tag */}
              <div className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[#0E5C4E]/15 bg-[#F1F8F5] px-3.5 py-1 text-xs font-bold text-[#0E5C4E]">
                <Stethoscope size={13} />
                {selectedMember.designation}
              </div>

              {/* Name */}
              <h3 className="mt-3 font-[Space_Grotesk] text-2xl font-extrabold text-[#16241F] sm:text-3xl">
                {selectedMember.name}
              </h3>

              <div className="my-4 h-px bg-gradient-to-r from-[#E5E9E5] via-[#E5E9E5]/50 to-transparent" />

              {/* Detailed Bio Container */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#16241F]">
                  <Award size={14} className="text-[#FF6B45]" />
                  <span>About & Specialization</span>
                </div>

                {/* Custom Scrollable Area */}
                <div className="max-h-52 overflow-y-auto pr-3 text-xs sm:text-sm leading-relaxed text-[#62726C] [scrollbar-width:thin] [scrollbar-color:#0E5C4E/20_transparent]">
                  <p className="whitespace-pre-line">
                    {selectedMember.about}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 pt-4 border-t border-[#E5E9E5]/80">
              <a
                href="tel:+919884507412"
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#0E5C4E] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0E5C4E]/25 transition-all duration-300 hover:bg-[#0A4A3F] hover:shadow-xl hover:shadow-[#0E5C4E]/35 active:scale-[0.98]"
              >
                <Phone
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

TeamMemberModal.displayName = 'TeamMemberModal';

// Skeleton Component for Zero-CLS Loading
function TeamSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="animate-pulse rounded-[2.5rem] border border-[#E5E9E5] bg-white p-3 shadow-sm"
        >
          <div className="h-[330px] w-full rounded-[2rem] bg-[#E8F4EF]" />

          <div className="p-3 pt-5 space-y-3">
            <div className="h-4 w-3/4 rounded bg-[#E8F4EF]" />
            <div className="h-3 w-full rounded bg-[#E8F4EF]" />
            <div className="h-3 w-5/6 rounded bg-[#E8F4EF]" />
          </div>

          <div className="p-3 pt-2">
            <div className="h-12 w-full rounded-2xl bg-[#E8F4EF]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  const handleSelectMember = useCallback((member) => {
    setSelectedMember(member);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMember(null);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadTeamMembers = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getTeamMembers({
          signal: controller.signal,
        });

        if (isMounted) {
          setTeamMembers(response.data || []);
        }
      } catch (err) {
        if (err.name !== 'CanceledError' && isMounted) {
          console.error('Failed to load team members:', err);
          setError(
            'Unable to load our team members at this moment.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTeamMembers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <SEO
        title="Our Medical Team | Swasthik Healthcare Chennai"
        description="Meet the medical team at Swasthik Healthcare in Kodungaiyur, Chennai. Our healthcare professionals are committed to providing patient-focused specialist care."
        path="/team"
      />

      <div className="min-h-screen bg-[#FAFDFB] text-[#16241F]">

        {/* Page Header (Shifted Upwards) */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#E8F4EF] via-[#F1F8F5] to-[#FAFDFB] px-6 pt-8 pb-4 sm:pt-12 sm:pb-6">
          <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#0E5C4E]/10 blur-3xl" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#FF6B45]/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <a
              href="/"
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0E5C4E]/15 bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#0E5C4E] shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-[#0E5C4E] hover:text-white hover:shadow-md"
            >
              <ArrowLeft size={14} />
              Back to Home
            </a>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6B45]/20 bg-[#FF6B45]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6B45] shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Our Dedicated Team
              </span>

              <h1 className="mt-2 font-[Space_Grotesk] text-3xl font-extrabold tracking-tight text-[#16241F] sm:text-4xl lg:text-5xl">
                Meet Our Medical Team
              </h1>
            </div>
          </div>
        </section>

        {/* Team Grid Section */}
        <section className="px-6 pt-2 pb-16 sm:pt-4 sm:pb-20">
          <div className="mx-auto max-w-7xl">

            {/* Loading Skeleton */}
            {loading && <TeamSkeleton />}

            {/* Error State */}
            {!loading && error && (
              <div className="mx-auto max-w-md rounded-3xl border border-red-100 bg-red-50/50 px-6 py-12 text-center">
                <p className="text-sm font-medium text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Grid Layout with Premium Executive Cards */}
            {!loading && !error && teamMembers.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member, index) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    index={index}
                    onSelect={handleSelectMember}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading &&
              !error &&
              teamMembers.length === 0 && (
                <div className="mx-auto max-w-lg rounded-3xl border border-[#E5E9E5] bg-[#F1F8F5] px-6 py-16 text-center shadow-sm">
                  <UserCheck className="mx-auto h-10 w-10 text-[#0E5C4E]" />

                  <h2 className="mt-4 font-[Space_Grotesk] text-xl font-bold text-[#16241F]">
                    Our Team
                  </h2>

                  <p className="mt-2 text-sm text-[#62726C]">
                    Our medical team profile information will be updated soon.
                  </p>
                </div>
              )}
          </div>
        </section>

        {/* Centered Modal Card */}
        <AnimatePresence>
          {selectedMember && (
            <TeamMemberModal
              selectedMember={selectedMember}
              onClose={handleCloseModal}
            />
          )}
        </AnimatePresence>

      </div>
    </>
  );
}

export default Team;