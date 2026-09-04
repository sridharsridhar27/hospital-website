import { useEffect, useState, memo } from 'react';
import { getTeamMembers } from '../api/team';

// Memoized Team Member Card to prevent unneeded re-renders
const TeamMemberCard = memo(({ member }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Doctor Image Container with explicit height to prevent layout shift */}
      <div className="relative h-80 w-full overflow-hidden bg-gray-100">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}
        <img
          src={imageError ? '/placeholder-avatar.png' : member.imageUrl}
          alt={member.name}
          loading="lazy"
          decoding="async"
          width="400"
          height="320"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`h-full w-full object-cover object-top transition duration-500 hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Doctor Details */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {member.name}
        </h3>

        <p className="mt-1 text-sm font-medium text-teal-700">
          {member.designation}
        </p>

        <p className="mt-4 text-sm leading-7 text-gray-600">
          {member.about}
        </p>
      </div>
    </article>
  );
});

TeamMemberCard.displayName = 'TeamMemberCard';

// Skeleton Loading Component
function TeamSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((index) => (
        <div key={index} className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="h-80 w-full rounded-xl bg-gray-200" />
          <div className="mt-6 h-6 w-3/4 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full rounded bg-gray-200" />
            <div className="h-3 w-5/6 rounded bg-gray-200" />
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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadTeamMembers = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getTeamMembers({ signal: controller.signal });

        if (isMounted) {
          setTeamMembers(response.data || []);
        }
      } catch (err) {
        if (err.name !== 'CanceledError' && isMounted) {
          console.error('Failed to load team members:', err);
          setError('Unable to load our team.');
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
    <section id="team" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
            Our Team
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Medical Team
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600">
            Experienced healthcare professionals committed to helping you move better and live pain-free.
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading && <TeamSkeleton />}

        {/* Error State */}
        {!loading && error && (
          <div className="py-10 text-center">
            <p className="text-gray-500">{error}</p>
          </div>
        )}

        {/* Team Members Grid */}
        {!loading && !error && teamMembers.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && teamMembers.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-gray-500">
              Our team information will be available soon.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

export default Team;