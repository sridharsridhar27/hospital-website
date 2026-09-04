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
  getConditionItemById,
  uploadConditionImage,
  updateConditionItem,
} from '../api/adminConditionApi';

function AdminConditionItemEdit() {
  const {
    conditionId,
    itemId,
  } = useParams();

  const navigate = useNavigate();

  const [condition, setCondition] =
    useState(null);

  const [item, setItem] =
    useState(null);

  const [name, setName] =
    useState('');

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

  const [success, setSuccess] =
    useState('');

  /*
   * =========================================================
   * LOAD CONDITION + ITEM
   * =========================================================
   */

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError('');

        /*
         * Load parent condition.
         */
        const conditionResponse =
          await getConditionById(
            conditionId
          );

        setCondition(
          conditionResponse.data
        );

        /*
         * Load condition item.
         */
        const itemResponse =
          await getConditionItemById(
            itemId
          );

        const conditionItem =
          itemResponse.data;

        /*
         * Make sure the item actually
         * belongs to this condition.
         */
        if (
          conditionItem.conditionId !==
          conditionId
        ) {
          setError(
            'This item does not belong to the selected condition.'
          );

          return;
        }

        setItem(conditionItem);

        setName(
          conditionItem.name || ''
        );

        setDescription(
          conditionItem.description || ''
        );

        setCurrentImage(
          conditionItem.imageUrl || ''
        );
      } catch (error) {
        console.error(
          'Failed to load condition item:',
          error
        );

        setError(
          error.response?.data?.message ||
            'Failed to load condition item.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [conditionId, itemId]);

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
        'Please select a valid image file.'
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

    setNewImage(file);

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
    setSuccess('');

    /*
     * Validate name.
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

      let imageKey;

      /*
       * =====================================================
       * STEP 1
       * Upload new image only if selected.
       * =====================================================
       */

      if (newImage) {
        const uploadResponse =
          await uploadConditionImage(
            newImage
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
       * Build update payload.
       *
       * If imageKey is undefined,
       * backend keeps existing image.
       * =====================================================
       */

      const itemData = {
        name: name.trim(),

        description:
          description.trim(),
      };

      /*
       * Only send imageKey when a
       * new image was uploaded.
       */

      if (imageKey) {
        itemData.imageKey =
          imageKey;
      }

      /*
       * =====================================================
       * STEP 3
       * Update condition item.
       * =====================================================
       */

      await updateConditionItem(
        itemId,
        itemData
      );

      setSuccess(
        'Condition item updated successfully.'
      );

      /*
       * Navigate back after a short
       * success message.
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
        'Failed to update condition item:',
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          'Failed to update condition item.'
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
            Loading condition item...
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
            Edit Condition Item
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update information belonging to
            this condition.
          </p>

        </div>

        {/* ===================================================
            CONDITION
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

        {!error && item && (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >

            {/* ===============================================
                ITEM NAME
            =============================================== */}

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
                placeholder="Enter condition item name"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                disabled={saving}
              />

            </div>

            {/* ===============================================
                DESCRIPTION
            =============================================== */}

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
                rows={8}
                placeholder="Enter condition item description"
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                disabled={saving}
              />

            </div>

            {/* ===============================================
                CURRENT IMAGE
            =============================================== */}

            <div className="mb-6">

              <p className="mb-2 text-sm font-semibold text-slate-800">
                Current Image
              </p>

              {currentImage ? (
                <div className="h-64 w-full overflow-hidden rounded-xl bg-slate-100 sm:w-80">

                  <img
                    src={currentImage}
                    alt={
                      item.name
                    }
                    className="h-full w-full object-cover"
                  />

                </div>
              ) : (
                <div className="flex h-64 w-full items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-400 sm:w-80">
                  No current image
                </div>
              )}

            </div>

            {/* ===============================================
                REPLACE IMAGE
            =============================================== */}

            <div className="mb-6">

              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Replace Image
              </label>

              <label
                htmlFor="image"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-teal-500 hover:bg-teal-50"
              >

                <Upload className="mb-3 h-8 w-8 text-teal-700" />

                <span className="text-sm font-semibold text-slate-700">
                  Choose a new image
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

              <p className="mt-2 text-xs text-slate-500">
                Leave empty to keep the
                current image.
              </p>

            </div>

            {/* ===============================================
                NEW IMAGE PREVIEW
            =============================================== */}

            {preview && (
              <div className="mb-8">

                <p className="mb-2 text-sm font-semibold text-slate-800">
                  New Image Preview
                </p>

                <div className="h-64 w-full overflow-hidden rounded-xl bg-slate-100 sm:w-80">

                  <img
                    src={preview}
                    alt="New condition item preview"
                    className="h-full w-full object-cover"
                  />

                </div>

                {newImage && (
                  <p className="mt-2 text-xs text-slate-500">
                    Selected:{' '}
                    {newImage.name}
                  </p>
                )}

              </div>
            )}

            {/* ===============================================
                ACTIONS
            =============================================== */}

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
                  ? 'Saving Changes...'
                  : 'Save Changes'}
              </button>

            </div>

          </form>
        )}

      </div>

    </div>
  );
}

export default AdminConditionItemEdit;