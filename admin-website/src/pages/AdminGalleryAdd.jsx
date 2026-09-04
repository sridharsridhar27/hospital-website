import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Video,
  X,
} from 'lucide-react';

import {
  uploadGalleryMedia,
  createGalleryItem,
} from '../api/adminGalleryApi';

function AdminGalleryAdd() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);

  const [previewUrl, setPreviewUrl] =
    useState('');

  const [mediaType, setMediaType] =
    useState('');

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState('');

  /*
   * =========================================================
   * CLEANUP PREVIEW URL
   * =========================================================
   *
   * Every object URL created by
   * URL.createObjectURL() must be revoked
   * when it is no longer needed.
   */

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  /*
   * =========================================================
   * SELECT FILE
   * =========================================================
   */

  const handleFileChange = (event) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setError('');

    /*
     * Check file type.
     */

    const isImage =
      selectedFile.type.startsWith(
        'image/'
      );

    const isVideo =
      selectedFile.type.startsWith(
        'video/'
      );

    /*
     * Only images and videos
     * are allowed.
     */

    if (!isImage && !isVideo) {
      setError(
        'Please select an image or video file.'
      );

      event.target.value = '';

      return;
    }

    /*
     * If an old preview exists,
     * revoke it before creating
     * the new preview.
     */

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    /*
     * Create browser-local preview.
     *
     * This URL is NOT an R2 URL.
     * It is only used before upload.
     */

    const objectUrl =
      URL.createObjectURL(
        selectedFile
      );

    setFile(selectedFile);

    setPreviewUrl(objectUrl);

    setMediaType(
      isImage
        ? 'IMAGE'
        : 'VIDEO'
    );
  };

  /*
   * =========================================================
   * REMOVE SELECTED FILE
   * =========================================================
   */

  const handleRemoveFile = () => {
    /*
     * The useEffect cleanup will also
     * revoke the current preview URL.
     */

    setFile(null);

    setPreviewUrl('');

    setMediaType('');

    setError('');

    /*
     * Reset file input so the same file
     * can be selected again.
     */

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /*
   * =========================================================
   * UPLOAD MEDIA
   * =========================================================
   */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    /*
     * File validation.
     */

    if (!file) {
      setError(
        'Please select an image or video.'
      );

      return;
    }

    try {
      setUploading(true);

      setError('');

      /*
       * =====================================================
       * STEP 1
       * =====================================================
       *
       * Upload the actual file to the backend.
       *
       * adminGalleryApi.js:
       *
       * uploadGalleryMedia(file)
       *
       * Backend:
       *   multer
       *      ↓
       *   Cloudflare R2
       *      ↓
       *   returns mediaKey + type
       */

      const uploadResponse =
        await uploadGalleryMedia(
          file
        );

      const mediaKey =
        uploadResponse
          ?.data
          ?.mediaKey;

      const uploadedType =
        uploadResponse
          ?.data
          ?.type ||
        mediaType;

      /*
       * Make sure the backend
       * successfully returned a key.
       */

      if (!mediaKey) {
        throw new Error(
          'Media upload did not return a media key.'
        );
      }

      /*
       * =====================================================
       * STEP 2
       * =====================================================
       *
       * Save the R2 media key and type
       * into PostgreSQL.
       *
       * This creates the GalleryItem record.
       */

      await createGalleryItem({
        mediaKey,
        type: uploadedType,
      });

      /*
       * =====================================================
       * STEP 3
       * =====================================================
       *
       * Upload completed successfully.
       * Return to gallery management page.
       */

      navigate('/gallery');

    } catch (error) {
      console.error(
        'Failed to upload gallery media:',
        error
      );

      setError(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to upload gallery media.'
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10 lg:px-16">

      <div className="mx-auto max-w-3xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 transition hover:text-teal-800"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to Gallery
        </Link>

        <div className="mt-6">

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Add Gallery Media
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Upload an image or video to display
            in the public gallery.
          </p>

        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* =====================================================
            FORM
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* ===================================================
              FILE UPLOAD AREA
          =================================================== */}

          {!file && (
            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              disabled={uploading}
              className="flex min-h-72 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-teal-500 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <Upload className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-lg font-bold text-slate-800">
                Upload image or video
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Click to select a file
              </p>

              <p className="mt-2 text-xs text-slate-400">
                JPG, PNG, WEBP, MP4, WEBM or MOV
              </p>

            </button>
          )}

          {/* ===================================================
              HIDDEN FILE INPUT
          =================================================== */}

          <input
            ref={fileInputRef}
            type="file"
            accept="
              image/jpeg,
              image/jpg,
              image/png,
              image/webp,
              video/mp4,
              video/webm,
              video/quicktime
            "
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />

          {/* ===================================================
              PREVIEW
          =================================================== */}

          {file && previewUrl && (
            <div>

              {/* =================================================
                  PREVIEW HEADER
              ================================================= */}

              <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  {mediaType === 'IMAGE' ? (
                    <ImageIcon className="h-5 w-5 text-teal-700" />
                  ) : (
                    <Video className="h-5 w-5 text-teal-700" />
                  )}

                  <span className="text-sm font-semibold text-slate-800">
                    {mediaType === 'IMAGE'
                      ? 'Image Preview'
                      : 'Video Preview'}
                  </span>

                </div>

                <button
                  type="button"
                  onClick={
                    handleRemoveFile
                  }
                  disabled={uploading}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  <X className="h-4 w-4" />

                  Remove

                </button>

              </div>

              {/* =================================================
                  MEDIA PREVIEW
              ================================================= */}

              <div className="overflow-hidden rounded-2xl bg-slate-100">

                {mediaType === 'IMAGE' ? (
                  <img
                    src={previewUrl}
                    alt="Selected gallery media"
                    className="max-h-[500px] w-full object-contain"
                  />
                ) : (
                  <video
                    src={previewUrl}
                    controls
                    preload="metadata"
                    className="max-h-[500px] w-full"
                  />
                )}

              </div>

              {/* =================================================
                  FILE INFORMATION
              ================================================= */}

              <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3">

                <p className="truncate text-sm font-medium text-slate-700">
                  {file.name}
                </p>

                <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">

                  <span>
                    {(
                      file.size /
                      (1024 * 1024)
                    ).toFixed(2)}{' '}
                    MB
                  </span>

                  <span>•</span>

                  <span>
                    {mediaType === 'IMAGE'
                      ? 'Image'
                      : 'Video'}
                  </span>

                </div>

              </div>

            </div>
          )}

          {/* ===================================================
              ACTIONS
          =================================================== */}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

            <Link
              to="/gallery"
              className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={!file || uploading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {uploading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />

                  Upload Media
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AdminGalleryAdd;