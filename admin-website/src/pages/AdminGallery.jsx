
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Video,
} from 'lucide-react';

import {
  getGalleryItems,
  deleteGalleryItem,
} from '../api/adminGalleryApi';

function AdminGallery() {
  const [galleryItems, setGalleryItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [deletingId, setDeletingId] = useState(null);

  /*
   * =========================================================
   * FETCH GALLERY
   * =========================================================
   */

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getGalleryItems();

      setGalleryItems(response.data || []);
    } catch (error) {
      console.error(
        'Failed to fetch gallery:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to load gallery.'
      );

      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  /*
   * =========================================================
   * DELETE GALLERY ITEM
   * =========================================================
   */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this gallery item?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError('');

      await deleteGalleryItem(id);

      setGalleryItems((currentItems) =>
        currentItems.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      console.error(
        'Failed to delete gallery item:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to delete gallery item.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading gallery...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <Link
              to="/"
              className="text-sm font-medium text-teal-700 transition hover:text-teal-800"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Gallery
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage images and videos displayed
              in the public gallery.
            </p>
          </div>

          <Link
            to="/gallery/add"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            <Plus className="h-4 w-4" />
            Add Media
          </Link>

        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {galleryItems.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <ImageIcon className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-800">
              No gallery media yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Upload your first image or video
              to display it on the website.
            </p>

            <Link
              to="/gallery/add"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              <Plus className="h-4 w-4" />
              Add Media
            </Link>

          </div>
        )}

        {/* =====================================================
            GALLERY GRID
        ===================================================== */}

        {galleryItems.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >

                {/* =================================================
                    MEDIA
                ================================================= */}

                <div className="relative h-64 bg-slate-100">

                  {item.type === 'IMAGE' ? (
                    item.mediaUrl ? (
                      <img
                        src={item.mediaUrl}
                        alt="Gallery"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-400">
                        Image unavailable
                      </div>
                    )
                  ) : (
                    item.mediaUrl ? (
                      <video
                        src={item.mediaUrl}
                        controls
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-400">
                        Video unavailable
                      </div>
                    )
                  )}

                  {/* =================================================
                      TYPE BADGE
                  ================================================= */}

                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">

                    {item.type === 'IMAGE' ? (
                      <ImageIcon className="h-3.5 w-3.5" />
                    ) : (
                      <Video className="h-3.5 w-3.5" />
                    )}

                    {item.type === 'IMAGE'
                      ? 'Image'
                      : 'Video'}

                  </div>

                </div>

                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="p-4">

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    disabled={
                      deletingId === item.id
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    <Trash2 className="h-4 w-4" />

                    {deletingId === item.id
                      ? 'Deleting...'
                      : 'Delete'}

                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default AdminGallery;

