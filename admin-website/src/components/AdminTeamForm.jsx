import { useState } from 'react';
import {
  createTeamMember,
  uploadTeamImage,
} from '../api/adminTeamApi';

function AdminTeamForm({ onSuccess }) {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    if (file.size > 30 * 1024 * 1024) {
      setError('Image size must be 30 MB or less.');
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');

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

    if (!image) {
      setError('Doctor image is required.');
      return;
    }

    try {
      setLoading(true);

      // Step 1: Upload image to R2
      const uploadResponse = await uploadTeamImage(image);

      const imageKey = uploadResponse.data.imageKey;

      // Step 2: Save team member in database
      await createTeamMember({
        name: name.trim(),
        designation: designation.trim(),
        about: about.trim(),
        imageKey,
      });

      setSuccess('Team member added successfully.');

      // Clear form
      setName('');
      setDesignation('');
      setAbout('');
      setImage(null);
      setPreview('');

      // Refresh parent list
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Add team member error:', error);

      setError(
        error.response?.data?.message ||
        'Failed to add team member.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Add Team Member
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add a doctor or team member.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
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
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
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
            onChange={(event) => setDesignation(event.target.value)}
            placeholder="Enter designation"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
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
            onChange={(event) => setAbout(event.target.value)}
            placeholder="Enter about information"
            rows={6}
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        {/* Image */}
        <div>
          <label
            htmlFor="team-image"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Doctor Photo
          </label>

          <input
            id="team-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full cursor-pointer rounded-lg border border-gray-300 text-sm text-gray-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-teal-700 file:px-4 file:py-3 file:text-sm file:font-medium file:text-white hover:file:bg-teal-800"
          />

          <p className="mt-2 text-xs text-gray-500">
            Maximum image size: 30 MB
          </p>
        </div>

        {/* Preview */}
        {preview && (
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              Preview
            </p>

            <div className="h-64 w-48 overflow-hidden rounded-xl bg-gray-100">
              <img
                src={preview}
                alt="Selected doctor"
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

        {/* Success */}
        {success && (
          <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Adding Team Member...' : 'Add Team Member'}
        </button>

      </form>
    </div>
  );
}

export default AdminTeamForm;