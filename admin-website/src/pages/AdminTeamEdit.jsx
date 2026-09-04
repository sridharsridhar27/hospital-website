import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  getAdminTeamMemberById,
  uploadTeamImage,
  updateTeamMember,
} from '../api/adminTeamApi';

function AdminTeamEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [about, setAbout] = useState('');
  const [imageKey, setImageKey] = useState('');

  const [currentImage, setCurrentImage] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Load team member
  useEffect(() => {
    const loadTeamMember = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getAdminTeamMemberById(id);

        const member = response.data;

        setName(member.name);
        setDesignation(member.designation);
        setAbout(member.about);

        // Internal R2 key used when keeping the existing image
        setImageKey(member.imageKey);

        // Signed URL used to display the current image
        setCurrentImage(member.imageUrl);
      } catch (error) {
        console.error(
          'Failed to load team member:',
          error
        );

        setError(
          error.response?.data?.message ||
          'Failed to load team member.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadTeamMember();
  }, [id]);

  // Handle new image selection
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Validate image type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    // 30 MB limit
    if (file.size > 30 * 1024 * 1024) {
      setError('Image size must be 30 MB or less.');
      return;
    }

    setNewImage(file);

    // Preview selected image
    setPreview(URL.createObjectURL(file));

    setError('');
  };

  // Submit changes
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    // Validation
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }

    if (!designation.trim()) {
      setError('Designation is required.');
      return;
    }

    if (!about.trim()) {
      setError('About is required.');
      return;
    }

    try {
      setSaving(true);

      // Keep existing R2 image by default
      let finalImageKey = imageKey;

      /*
       * If admin selected a new image:
       *
       * 1. Upload new image to R2
       * 2. Get new imageKey
       * 3. Save new imageKey in Neon
       */
      if (newImage) {
        const uploadResponse =
          await uploadTeamImage(newImage);

        finalImageKey =
          uploadResponse.data.imageKey;
      }

      // Update database
      await updateTeamMember(id, {
        name: name.trim(),
        designation: designation.trim(),
        about: about.trim(),
        imageKey: finalImageKey,
      });

      // Return to team list
      navigate('/team');

    } catch (error) {
      console.error(
        'Update team member error:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to update team member.'
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-3xl">

          <p className="text-gray-500">
            Loading team member...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">

          <Link
            to="/team"
            className="text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            ← Back to Our Team
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Edit Team Member
          </h1>

          <p className="mt-2 text-gray-600">
            Update doctor or team member information.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
        >

          {/* Name */}
          <div>

            <label
              htmlFor="team-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Name
            </label>

            <input
              id="team-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />

          </div>

          {/* Designation */}
          <div>

            <label
              htmlFor="team-designation"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Designation
            </label>

            <input
              id="team-designation"
              type="text"
              value={designation}
              onChange={(event) =>
                setDesignation(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />

          </div>

          {/* About */}
          <div>

            <label
              htmlFor="team-about"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              About
            </label>

            <textarea
              id="team-about"
              value={about}
              onChange={(event) =>
                setAbout(event.target.value)
              }
              rows={7}
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />

          </div>

          {/* Current Image */}
          <div>

            <p className="mb-2 text-sm font-medium text-gray-700">
              Current Photo
            </p>

            {currentImage && (
              <div className="h-64 w-48 overflow-hidden rounded-xl bg-gray-100">

                <img
                  src={currentImage}
                  alt={name}
                  className="h-full w-full object-cover object-top"
                />

              </div>
            )}

          </div>

          {/* Replace Image */}
          <div>

            <label
              htmlFor="team-image"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Replace Photo
            </label>

            <input
              id="team-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full cursor-pointer rounded-lg border border-gray-300 text-sm text-gray-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-teal-700 file:px-4 file:py-3 file:text-sm file:font-medium file:text-white hover:file:bg-teal-800"
            />

            <p className="mt-2 text-xs text-gray-500">
              Leave empty to keep the current photo.
              Maximum 30 MB.
            </p>

          </div>

          {/* New Image Preview */}
          {preview && (
            <div>

              <p className="mb-2 text-sm font-medium text-gray-700">
                New Photo Preview
              </p>

              <div className="h-64 w-48 overflow-hidden rounded-xl bg-gray-100">

                <img
                  src={preview}
                  alt="New team member"
                  className="h-full w-full object-cover object-top"
                />

              </div>

            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 border-t border-gray-100 pt-5">

            <Link
              to="/team"
              className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
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

export default AdminTeamEdit;