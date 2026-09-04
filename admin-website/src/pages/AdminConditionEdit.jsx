import { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';

import {
  getConditionById,
  uploadConditionImage,
  updateCondition,
} from '../api/adminConditionApi';

function AdminConditionEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
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
   * Load condition
   */
  useEffect(() => {
    const loadCondition = async () => {
      try {
        setLoading(true);
        setError('');

        const response =
          await getConditionById(id);

        const condition =
          response.data;

        setName(condition.name || '');

        setSlug(condition.slug || '');

        setDescription(
          condition.description || ''
        );

        setCurrentImage(
          condition.imageUrl || ''
        );
      } catch (error) {
        console.error(
          'Failed to load condition:',
          error
        );

        setError(
          error.response?.data?.message ||
            'Failed to load condition.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadCondition();
  }, [id]);

  /*
   * Image change
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
     * Validate image type
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
     * Validate image size
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

    setNewImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

    setError('');
  };

  /*
   * Submit
   */
  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError('');

    /*
     * Validate name
     */
    if (!name.trim()) {
      setError(
        'Condition name is required.'
      );

      return;
    }

    /*
     * Validate slug
     */
    if (!slug.trim()) {
      setError(
        'Condition slug is required.'
      );

      return;
    }

    /*
     * Validate description
     */
    if (!description.trim()) {
      setError(
        'Condition description is required.'
      );

      return;
    }

    try {
      setSaving(true);

      let imageKey;

      /*
       * Upload new image only when
       * admin selects one.
       */
      if (newImage) {
        const uploadResponse =
          await uploadConditionImage(
            newImage
          );

        imageKey =
          uploadResponse.data.imageKey;
      }

      /*
       * Build update payload.
       *
       * If no new image is selected,
       * backend keeps existing image.
       */
      const conditionData = {
        name: name.trim(),

        slug: slug
          .trim()
          .toLowerCase(),

        description:
          description.trim(),
      };

      /*
       * Send new imageKey only when
       * a new image was uploaded.
       */
      if (imageKey) {
        conditionData.imageKey =
          imageKey;
      }

      /*
       * Update condition
       */
      await updateCondition(
        id,
        conditionData
      );

      /*
       * Go back to conditions
       */
      navigate('/conditions', {
        replace: true,
      });
    } catch (error) {
      console.error(
        'Update condition error:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to update condition.'
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-3xl">

          <p className="text-sm text-slate-500">
            Loading condition...
          </p>

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
            to="/conditions"
            className="text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            ← Back to Conditions
          </Link>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
            Edit Condition
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update condition information.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* Name */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Condition Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              placeholder="Enter condition name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />

          </div>

          {/* Slug */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Slug
            </label>

            <input
              type="text"
              value={slug}
              onChange={(event) =>
                setSlug(
                  event.target.value
                )
              }
              placeholder="Enter condition slug"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />

            <p className="mt-2 text-xs text-slate-500">
              Example: low-back-pain
            </p>

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
              rows={8}
              placeholder="Enter condition description"
              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />

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
              Leave empty to keep the current image.
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
                  alt="New condition preview"
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
              to="/conditions"
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

export default AdminConditionEdit;