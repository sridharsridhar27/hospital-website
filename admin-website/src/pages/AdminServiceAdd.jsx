
import { useState } from 'react';
import {
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import {
  createService,
  uploadServiceImage,
} from '../api/adminServiceApi';

const CATEGORY_CONFIG = {
  GENERAL: {
    title: 'General Services',
    description:
      'Add a general healthcare service. Image and description are optional.',
  },

  ORTHOPAEDIC: {
    title: 'Orthopaedic Services',
    description:
      'Add an orthopaedic service. Image and description are optional.',
  },

  OBSTETRICS_GYNAECOLOGY: {
    title: 'Obstetrics & Gynaecology Services',
    description:
      'Add a women’s health service. Image and description are optional.',
  },
};

function AdminServiceAdd() {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const requestedCategory =
    searchParams.get('category');

  const initialCategory =
    CATEGORY_CONFIG[requestedCategory]
      ? requestedCategory
      : 'GENERAL';

  const [category, setCategory] =
    useState(initialCategory);

  const [name, setName] =
    useState('');

  const [description, setDescription] =
    useState('');

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState('');

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState('');

  const config =
    CATEGORY_CONFIG[category];

  /*
   * =========================================================
   * CATEGORY CHANGE
   * =========================================================
   */

  const handleCategoryChange = (
    event
  ) => {
    const newCategory =
      event.target.value;

    setCategory(newCategory);

    setName('');
    setDescription('');
    setImage(null);
    setPreview('');
    setError('');
  };

  /*
   * =========================================================
   * IMAGE CHANGE
   * =========================================================
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
     * Maximum image size:
     * 30 MB
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
     * Create local preview.
     */

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

    setError('');
  };

  /*
   * =========================================================
   * SUBMIT
   * =========================================================
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

      /*
       * imageKey remains null when
       * the user does not select an image.
       */

      let imageKey = null;

      /*
       * Upload image only when
       * the user has selected one.
       */

      if (image) {
        const uploadResponse =
          await uploadServiceImage(
            image
          );

        imageKey =
          uploadResponse?.data?.imageKey ||
          null;

        /*
         * Make sure upload actually
         * returned an image key.
         */

        if (!imageKey) {
          throw new Error(
            'Image upload failed.'
          );
        }
      }

      /*
       * Create service record.
       *
       * Description:
       * - text when provided
       * - null when empty
       *
       * Image:
       * - imageKey when uploaded
       * - null when not uploaded
       */

      await createService({
        category,
        name: name.trim(),
        description:
          description.trim() || null,
        imageKey,
      });

      /*
       * Return to services page
       * after successful creation.
       */

      navigate('/services', {
        replace: true,
      });
    } catch (error) {
      console.error(
        'Create service error:',
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          'Failed to create service.'
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * =========================================================
   * UI
   * =========================================================
   */

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
            Add Service
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Add a new hospital service.
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

            <select
              value={category}
              onChange={
                handleCategoryChange
              }
              disabled={saving}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-50"
            >

              <option value="GENERAL">
                General Services
              </option>

              <option value="ORTHOPAEDIC">
                Orthopaedic Services
              </option>

              <option value="OBSTETRICS_GYNAECOLOGY">
                Obstetrics & Gynaecology Services
              </option>

            </select>

            <p className="mt-2 text-xs text-slate-500">
              {config.description}
            </p>

          </div>

          {/* Name */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Name
              <span className="ml-1 text-red-500">
                *
              </span>
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
              disabled={saving}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-50"
            />

          </div>

          {/* Description */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
              <span className="ml-1 text-xs font-normal text-slate-400">
                (Optional)
              </span>
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
              disabled={saving}
              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-50"
            />

          </div>

          {/* Image */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Image
              <span className="ml-1 text-xs font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
              disabled={saving}
              className="block w-full cursor-pointer rounded-lg border border-slate-300 text-sm text-slate-600 file:mr-4 file:border-0 file:bg-teal-700 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <p className="mt-2 text-xs text-slate-500">
              Optional. Maximum file size:
              {' '}
              30 MB.
            </p>

          </div>

          {/* Image Preview */}
          {preview && (
            <div>

              <div className="mb-2 flex items-center justify-between">

                <p className="text-sm font-semibold text-slate-700">
                  Image Preview
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setPreview('');
                  }}
                  disabled={saving}
                  className="text-xs font-medium text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remove Image
                </button>

              </div>

              <div className="h-64 w-full overflow-hidden rounded-xl bg-slate-100 sm:w-80">

                <img
                  src={preview}
                  alt="Service preview"
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
              className={`flex-1 rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50 ${
                saving
                  ? 'pointer-events-none opacity-60'
                  : ''
              }`}
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? 'Creating Service...'
                : 'Create Service'}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AdminServiceAdd;

