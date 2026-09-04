import { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
} from 'lucide-react';

import {
  getConditionById,
  uploadConditionImage,
  createConditionItem,
} from '../api/adminConditionApi';

function AdminConditionItemAdd() {
  const { conditionId } = useParams();
  const navigate = useNavigate();

  const [condition, setCondition] =
    useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] =
    useState('');

  const [imageFile, setImageFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState('');

  const [success, setSuccess] =
    useState('');

  /*
   * =========================================================
   * LOAD PARENT CONDITION
   * =========================================================
   */

  useEffect(() => {
    const loadCondition = async () => {
      try {
        setLoading(true);
        setError('');

        const response =
          await getConditionById(
            conditionId
          );

        setCondition(response.data);
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
  }, [conditionId]);

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
     * Validate image type.
     */
    if (
      !file.type.startsWith('image/')
    ) {
      setError(
        'Only image files are allowed.'
      );

      return;
    }

    /*
     * Validate image size.
     *
     * Maximum: 30 MB
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

    setImageFile(file);

    setImagePreview(
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
    setSuccess('');

    /*
     * Validate item name.
     */
    if (!name.trim()) {
      setError(
        'Condition item name is required.'
      );

      return;
    }

    /*
     * Validate description.
     */
    if (!description.trim()) {
      setError(
        'Condition item description is required.'
      );

      return;
    }

    try {
      setSaving(true);

      let imageKey = null;

      /*
       * =====================================================
       * STEP 1
       * Upload image when selected.
       * =====================================================
       */

      if (imageFile) {
        const uploadResponse =
          await uploadConditionImage(
            imageFile
          );

        imageKey =
          uploadResponse?.data?.imageKey;

        if (!imageKey) {
          throw new Error(
            'Image upload failed.'
          );
        }
      }

      /*
       * =====================================================
       * STEP 2
       * Create condition item.
       * =====================================================
       */

      await createConditionItem(
        conditionId,
        {
          name: name.trim(),
          description:
            description.trim(),
          imageKey,
        }
      );

      setSuccess(
        'Condition item created successfully.'
      );

      /*
       * Give the success message a
       * short moment before navigating.
       */

      setTimeout(() => {
        navigate(
          `/conditions/${conditionId}/items`,
          {
            replace: true,
          }
        );
      }, 700);
    } catch (error) {
      console.error(
        'Failed to create condition item:',
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          'Failed to create condition item.'
      );
    } finally {
      setSaving(false);
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

        <div className="mx-auto max-w-3xl">

          <p className="text-sm text-slate-500">
            Loading condition...
          </p>

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

      <div className="mx-auto max-w-3xl">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mb-8">

          <Link
            to={`/conditions/${conditionId}/items`}
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Condition Items
          </Link>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Add Condition Item
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Add information belonging to this
            condition.
          </p>

        </div>

        {/* ===================================================
            PARENT CONDITION
        =================================================== */}

        {condition && (
          <div className="mb-6 rounded-xl border border-teal-100 bg-teal-50 px-5 py-4">

            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              Condition
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {condition.name}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              /{condition.slug}
            </p>

          </div>
        )}

        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ===================================================
            SUCCESS
        =================================================== */}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* ===================================================
            FORM
        =================================================== */}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* =================================================
              ITEM NAME
          ================================================= */}

          <div className="mb-6">

            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Item Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              placeholder="e.g. Symptoms"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              disabled={saving}
            />

          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

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
              placeholder="Enter information about this condition item..."
              rows={8}
              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              disabled={saving}
            />

          </div>

          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="mb-8">

            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Item Image
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

              <span className="mt-1 text-xs text-slate-400">
                Maximum 30 MB
              </span>

              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="hidden"
                disabled={saving}
              />

            </label>

            {/* =================================================
                IMAGE PREVIEW
            ================================================= */}

            {imagePreview && (
              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">

                <img
                  src={imagePreview}
                  alt="Condition item preview"
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

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

            <Link
              to={`/conditions/${conditionId}/items`}
              className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? 'Creating...'
                : 'Create Item'}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AdminConditionItemAdd;