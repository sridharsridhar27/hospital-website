import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';

import {
  uploadConditionImage,
  createCondition,
} from '../api/adminConditionApi';

function AdminConditionAdd() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] =
    useState('');

  const [imageFile, setImageFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const [success, setSuccess] =
    useState('');

  /*
   * Generate slug from condition name.
   */
  const handleNameChange = (value) => {
    setName(value);

    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    setSlug(generatedSlug);
  };

  /*
   * Handle image selection.
   */
  const handleImageChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError(
        'Only image files are allowed.'
      );

      return;
    }

    setError('');

    setImageFile(file);

    setImagePreview(
      URL.createObjectURL(file)
    );
  };

  /*
   * Submit condition.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError(
        'Condition name is required.'
      );

      return;
    }

    if (!slug.trim()) {
      setError(
        'Condition slug is required.'
      );

      return;
    }

    if (!description.trim()) {
      setError(
        'Condition description is required.'
      );

      return;
    }

    if (!imageFile) {
      setError(
        'Condition image is required.'
      );

      return;
    }

    try {
      setLoading(true);

      /*
       * Step 1:
       * Upload image to Cloudflare R2.
       */
      const uploadResponse =
        await uploadConditionImage(
          imageFile
        );

      const imageKey =
        uploadResponse?.data?.imageKey;

      if (!imageKey) {
        throw new Error(
          'Image upload failed.'
        );
      }

      /*
       * Step 2:
       * Create database record using
       * the returned imageKey.
       */
      await createCondition({
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        description:
          description.trim(),
        imageKey,
      });

      setSuccess(
        'Condition created successfully.'
      );

      /*
       * Give the success message a moment
       * before returning to the list.
       */
      setTimeout(() => {
        navigate('/conditions');
      }, 700);
    } catch (error) {
      console.error(
        'Failed to create condition:',
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          'Failed to create condition.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10 lg:px-16">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">

          <Link
            to="/conditions"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Conditions
          </Link>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Add Condition
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Add a condition that will be displayed
            on the hospital website.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* Condition Name */}
          <div className="mb-6">

            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Condition Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                handleNameChange(
                  event.target.value
                )
              }
              placeholder="e.g. Low Back Pain"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              disabled={loading}
            />

          </div>

          {/* Slug */}
          <div className="mb-6">

            <label
              htmlFor="slug"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Slug
            </label>

            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(event) =>
                setSlug(
                  event.target.value
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                )
              }
              placeholder="low-back-pain"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              disabled={loading}
            />

            <p className="mt-2 text-xs text-slate-400">
              Used for the public condition URL.
            </p>

          </div>

          {/* Description */}
          <div className="mb-6">

            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="Enter information about this condition..."
              rows={7}
              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              disabled={loading}
            />

          </div>

          {/* Image */}
          <div className="mb-8">

            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Condition Image
            </label>

            <label
              htmlFor="image"
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-teal-500 hover:bg-teal-50"
            >

              <Upload className="mb-3 h-8 w-8 text-teal-700" />

              <span className="text-sm font-semibold text-slate-700">
                Choose an image
              </span>

              <span className="mt-1 text-xs text-slate-400">
                JPG, PNG, WEBP or other image format
              </span>

              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={loading}
              />

            </label>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">

                <img
                  src={imagePreview}
                  alt="Condition preview"
                  className="h-64 w-full object-cover"
                />

              </div>
            )}

            {imageFile && (
              <p className="mt-2 text-xs text-slate-500">
                Selected: {imageFile.name}
              </p>
            )}

          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

            <Link
              to="/conditions"
              className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? 'Creating...'
                : 'Create Condition'}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AdminConditionAdd;