import { useEffect, useState } from 'react';
import { Image as ImageIcon, Video, Maximize2, X, Play, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import SEO from './SEO';
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
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <>
      <SEO
        title="Gallery | Swasthik Healthcare Chennai"
        description="Explore the Swasthik Healthcare gallery in Kodungaiyur, Chennai, featuring our healthcare facilities and patient care environment."
        path="/gallery"
      />

      <section className="relative overflow-hidden bg-[#FAFDFB] px-6 py-20 text-[#16241F] sm:px-10 lg:px-16">
        {/* Background Glows */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#0E5C4E]/5 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 top-1/2 h-[500px] w-[500px] rounded-full bg-[#FF6B45]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="mx-auto max-w-2xl text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#0E5C4E]/15 bg-white/80 px-4 py-2 text-xs font-bold tracking-widest text-[#0E5C4E] shadow-sm backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#FF6B45]" />
              GALLERY
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 font-[Space_Grotesk] text-3xl font-black tracking-tight text-[#16241F] sm:text-5xl"
            >
              Our Gallery
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-sm leading-relaxed text-[#62726C] sm:text-base"
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
                className="mx-auto mt-10 max-w-2xl rounded-2xl border border-red-200 bg-red-50/80 p-5 text-center text-sm font-semibold text-red-600 backdrop-blur-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SKELETON LOADING STATE */}
          {loading && !error && (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] w-full animate-pulse rounded-[2rem] border border-[#E5E9E5] bg-white/60 p-3 shadow-sm"
                >
                  <div className="h-full w-full rounded-[1.5rem] bg-[#E8F4EF]/60" />
                </div>
              ))}
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && galleryItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-14 rounded-[2.5rem] border border-dashed border-[#0E5C4E]/20 bg-white/50 p-12 text-center backdrop-blur-md"
            >
              <ImageIcon className="mx-auto h-12 w-12 text-[#0E5C4E]/40" />
              <p className="mt-4 text-base font-bold text-[#16241F]">
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
              className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {galleryItems.map((item) => (
                <motion.article
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  onClick={() => setActiveMedia(item)}
                  className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-[#E5E9E5] bg-white/80 p-3 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-[#0E5C4E]/30 hover:shadow-[0_20px_40px_-15px_rgba(14,92,78,0.12)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#F1F8F5]">
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
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/80 text-[#0E5C4E] shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                            <Play className="ml-0.5 h-5 w-5 fill-current" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16241F]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Top Media Type Badge */}
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/40 bg-white/80 px-3 py-1.5 text-xs font-bold text-[#16241F] shadow-sm backdrop-blur-md">
                      {item.mediaType === 'IMAGE' ? (
                        <ImageIcon className="h-3.5 w-3.5 text-[#0E5C4E]" />
                      ) : (
                        <Video className="h-3.5 w-3.5 text-[#FF6B45]" />
                      )}
                      <span>{item.mediaType === 'IMAGE' ? 'Image' : 'Video'}</span>
                    </div>

                    {/* Hover Quick Action */}
                    <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#0E5C4E] opacity-0 shadow-md backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                      <Maximize2 className="h-4 w-4" />
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
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
                className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/20 bg-black/90 p-2 shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => setActiveMedia(null)}
                  className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform hover:scale-110 hover:bg-white/40"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex max-h-[80vh] items-center justify-center overflow-hidden rounded-[2rem]">
                  {activeMedia.mediaType === 'IMAGE' ? (
                    <img
                      src={activeMedia.mediaUrl}
                      alt="Gallery item preview"
                      className="max-h-[80vh] w-auto object-contain"
                    />
                  ) : (
                    <video
                      src={activeMedia.mediaUrl}
                      controls
                      autoPlay
                      className="max-h-[80vh] w-full rounded-[2rem] object-contain"
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