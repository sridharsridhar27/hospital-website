import React, { useEffect, useState } from 'react';
import {
  Image as ImageIcon,
  Video,
  Maximize2,
  X,
  Play,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { getGalleryItems } from '../api/galleryApi';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeMedia, setActiveMedia] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await getGalleryItems();
        setGalleryItems(response.data || []);
      } catch (err) {
        console.error('Failed to fetch gallery:', err);
        setError(
          err.response?.data?.message || 'Failed to load gallery items.'
        );
      } font-medium ;{
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Lock scroll when lightbox modal is open
  useEffect(() => {
    if (activeMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeMedia]);

  return (
    <>
      <SEO
        title="Gallery | Swasthik Healthcare Chennai"
        description="Explore the Swasthik Healthcare gallery in Kodungaiyur, Chennai, featuring our healthcare facilities and patient care environment."
        path="/gallery"
      />

      <section className="relative overflow-hidden bg-[#FAFDFB] px-4 py-10 text-[#16241F] sm:px-8 sm:py-16 lg:px-16 antialiased">
        {/* Background Glows */}
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[300px] w-[300px] rounded-full bg-[#0E5C4E]/5 blur-[80px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-40 top-1/2 h-[300px] w-[300px] rounded-full bg-[#FF6B45]/5 blur-[80px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="mx-auto max-w-2xl text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#0E5C4E]/15 bg-white/80 px-3.5 py-1.5 text-[11px] font-bold tracking-widest text-[#0E5C4E] shadow-sm backdrop-blur-md sm:px-4 sm:py-2 sm:text-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#FF6B45]" />
              GALLERY
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3 font-[Space_Grotesk] text-2xl font-black tracking-tight text-[#16241F] sm:mt-4 sm:text-4xl lg:text-5xl"
            >
              Our Gallery
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-xs leading-relaxed text-[#62726C] sm:mt-4 sm:text-base"
            >
              A visual journey inside Swasthic Healthcare, showcasing our facilities and patient care.
            </motion.p>
          </div>

          {/* ERROR STATE */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mx-auto mt-8 max-w-2xl rounded-2xl border border-red-200 bg-red-50/80 p-4 text-center text-xs font-semibold text-red-600 backdrop-blur-sm sm:mt-10 sm:p-5 sm:text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SKELETON LOADING STATE */}
          {loading && !error && (
            <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] w-full animate-pulse rounded-2xl border border-[#E5E9E5] bg-white/60 p-2.5 shadow-sm sm:rounded-[2rem] sm:p-3"
                >
                  <div className="h-full w-full rounded-xl bg-[#E8F4EF]/60 sm:rounded-[1.5rem]" />
                </div>
              ))}
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && galleryItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 rounded-2xl border border-dashed border-[#0E5C4E]/20 bg-white/50 p-8 text-center backdrop-blur-md sm:mt-14 sm:rounded-[2.5rem] sm:p-12"
            >
              <ImageIcon className="mx-auto h-10 w-10 text-[#0E5C4E]/40 sm:h-12 sm:w-12" />
              <p className="mt-3 text-sm font-bold text-[#16241F] sm:mt-4 sm:text-base">
                No gallery media available yet.
              </p>
              <p className="mt-1 text-xs text-[#62726C]">
                Check back soon for photos and videos of our medical center.
              </p>
            </motion.div>
          )}

          {/* GALLERY GRID */}
          {!loading && !error && galleryItems.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-8 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
            >
              {galleryItems.map((item) => (
                <motion.article
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  onClick={() => setActiveMedia(item)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#E5E9E5] bg-white/80 p-2.5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-[#0E5C4E]/30 hover:shadow-[0_20px_40px_-15px_rgba(14,92,78,0.12)] sm:rounded-[2rem] sm:p-3"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#F1F8F5] sm:rounded-[1.5rem]">
                    {item.mediaType === 'IMAGE' ? (
                      <img
                        src={item.mediaUrl}
                        alt="Swasthic Healthcare"
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    ) : (
                      <div className="relative h-full w-full">
                        <video
                          src={item.mediaUrl}
                          preload="metadata"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/80 text-[#0E5C4E] shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                            <Play className="ml-0.5 h-4 w-4 fill-current sm:h-5 sm:w-5" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16241F]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Top Media Type Badge */}
                    <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full border border-white/40 bg-white/80 px-2.5 py-1 text-[10px] font-bold text-[#16241F] shadow-sm backdrop-blur-md sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-xs">
                      {item.mediaType === 'IMAGE' ? (
                        <ImageIcon className="h-3 w-3 text-[#0E5C4E] sm:h-3.5 sm:w-3.5" />
                      ) : (
                        <Video className="h-3 w-3 text-[#FF6B45] sm:h-3.5 sm:w-3.5" />
                      )}
                      <span>{item.mediaType === 'IMAGE' ? 'Image' : 'Video'}</span>
                    </div>

                    {/* Hover Quick Action */}
                    <div className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#0E5C4E] opacity-0 shadow-md backdrop-blur-md transition-all duration-300 group-hover:opacity-100 sm:bottom-3 sm:right-3 sm:h-9 sm:w-9">
                      <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>

        {/* FULLSCREEN LIGHTBOX MODAL */}
        <AnimatePresence>
          {activeMedia && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveMedia(null)}
                className="fixed inset-0 bg-[#16241F]/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-black/90 p-1.5 shadow-2xl sm:rounded-[2.5rem] sm:p-2"
              >
                <button
                  type="button"
                  onClick={() => setActiveMedia(null)}
                  aria-label="Close preview"
                  className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform hover:scale-110 hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:top-4 sm:h-10 sm:w-10"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                <div className="flex max-h-[80vh] items-center justify-center overflow-hidden rounded-xl sm:rounded-[2rem]">
                  {activeMedia.mediaType === 'IMAGE' ? (
                    <img
                      src={activeMedia.mediaUrl}
                      alt="Gallery item preview"
                      className="max-h-[80vh] w-auto max-w-full object-contain"
                    />
                  ) : (
                    <video
                      src={activeMedia.mediaUrl}
                      controls
                      autoPlay
                      className="max-h-[80vh] w-full rounded-xl object-contain sm:rounded-[2rem]"
                    />
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

export default Gallery;