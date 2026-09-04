import { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';

import {
  getServiceById,
  uploadServiceImage,
  updateService,
} from '../api/adminServiceApi';

const CATEGORY_CONFIG = {
  GENERAL: {
    title: 'General Services',
  },

  ORTHOPAEDIC: {
    title: 'Orthopaedic Services',
  },

  OBSTETRICS_GYNAECOLOGY: {
    title: 'Obstetrics & Gynaecology Services',
  },
};

function AdminServiceEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] =
    useState('');

  const [currentImage, setCurrentImage] =
    useState('');

  const [newImage, setNewImage] =
    useState(null);

  const [preview, setPreview] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState('');

  /*
   * Load existing service.
   */
  useEffect(() => {
    const loadService = async () => {
      try {
        setLoading(true);
        setError('');

        const response =
          await getServiceById(id);

        const service =
          response.data;

        setCategory(
          service.category || ''
        );

        setName(
          service.name || ''
        );

        setDescription(
          service.description || ''
        );

        setCurrentImage(
          service.imageUrl || ''
        );
      } catch (error) {
        console.error(
          'Failed to load service:',
          error
        );

        setError(
          error.response?.data?.message ||
            'Failed to load service.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [id]);

  const config =
    CATEGORY_CONFIG[category];

  /*
   * Handle new image selection.
   */
  const handleImageChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    /*
     * Only allow image files.
     */
    if (
      !file.type.startsWith('image/')
    ) {
      setError(
        'Please select a valid image file.'
      );

      return;
    }

    /*
     * Maximum 30 MB.
     */
    if (
      file.size >
      30 * 1024 * 1024
    ) {
      setError(
        'Image size must be 30 MB or less.'
      );

      return;
    }

    /*
     * Store the new image.
     */
    setNewImage(file);

    /*
     * Show preview.
     */
    setPreview(
      URL.createObjectURL(file)
    );

    setError('');
  };

  /*
   * Submit updated service.
   */
  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError('');

    /*
     * Service name is the only
     * required field.
     */
    if (!name.trim()) {
      setError(
        'Service name is required.'
      );

      return;
    }

    try {
      setSaving(true);

      let imageKey;

      /*
       * Upload a new image only if
       * the admin selected one.
       *
       * If no new image is selected,
       * imageKey remains undefined.
       */
      if (newImage) {
        const uploadResponse =
          await uploadServiceImage(
            newImage
          );

        imageKey =
          uploadResponse.data.imageKey;
      }

      /*
       * Build update payload.
       *
       * Description is optional.
       *
       * If imageKey is not included,
       * backend will keep the existing image.
       */
      const serviceData = {
        category,
        name: name.trim(),
        description:
          description.trim() || null,
      };

      /*
       * Only send imageKey when a
       * completely new image was uploaded.
       */
      if (imageKey) {
        serviceData.imageKey =
          imageKey;
      }

      await updateService(
        id,
        serviceData
      );

      /*
       * Return to services list.
       */
      navigate('/services', {
        replace: true,
      });
    } catch (error) {
      console.error(
        'Update service error:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to update service.'
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * Loading state.
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">

          <p className="text-sm text-slate-500">
            Loading service...
          </p>

        </div>
      </div>
    );
  }

  /*
   * Invalid category.
   */
  if (!config) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">

          <Link
            to="/services"
            className="text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            ← Back to Services
          </Link>

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            Invalid service category.
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10 lg:px-16">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">

          <Link
            to="/services"
            className="text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            ← Back to Services
          </Link>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
            Edit Service
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update {config.title.toLowerCase()} information.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* Category */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Category
            </label>

            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
              {config.title}
            </div>

          </div>

          {/* Name */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              placeholder="Enter service name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />

          </div>

          {/* Description */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Paragraph
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              rows={7}
              placeholder="Enter service description (optional)"
              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />

            <p className="mt-2 text-xs text-slate-500">
              Optional. Leave empty if you do not need a description.
            </p>

          </div>

          {/* Current Image */}
          <div>

            <p className="mb-2 text-sm font-semibold text-slate-700">
              Current Image
            </p>

            {currentImage ? (
              <div className="h-64 w-full overflow-hidden rounded-xl bg-slate-100 sm:w-80">

                <img
                  src={currentImage}
                  alt={name}
                  className="h-full w-full object-cover"
                />

              </div>
            ) : (
              <div className="flex h-64 w-full items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-400 sm:w-80">
                No current image
              </div>
            )}

          </div>

          {/* Replace Image */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Replace Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
              className="block w-full cursor-pointer rounded-lg border border-slate-300 text-sm text-slate-600 file:mr-4 file:border-0 file:bg-teal-700 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-800"
            />

            <p className="mt-2 text-xs text-slate-500">
              Optional. Leave empty to keep the current image.
              Maximum 30 MB.
            </p>

          </div>

          {/* New Image Preview */}
          {preview && (
            <div>

              <p className="mb-2 text-sm font-semibold text-slate-700">
                New Image Preview
              </p>

              <div className="h-64 w-full overflow-hidden rounded-xl bg-slate-100 sm:w-80">

                <img
                  src={preview}
                  alt="New service preview"
                  className="h-full w-full object-cover"
                />

              </div>

            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row">

            <Link
              to="/services"
              className="flex-1 rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? 'Saving Changes...'
                : 'Save Changes'}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AdminServiceEdit;