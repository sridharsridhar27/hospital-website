import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getTeamMembers,
  deleteTeamMember,
} from '../api/adminTeamApi';

function AdminTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [deletingId, setDeletingId] = useState(null);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getTeamMembers();

      setTeamMembers(response.data || []);
    } catch (error) {
      console.error(
        'Failed to fetch team members:',
        error
      );

      setError('Failed to load team members.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleDelete = async (member) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${member.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(member.id);
      setError('');

      await deleteTeamMember(member.id);

      // Remove deleted member from current UI
      setTeamMembers((currentMembers) =>
        currentMembers.filter(
          (item) => item.id !== member.id
        )
      );
    } catch (error) {
      console.error(
        'Failed to delete team member:',
        error
      );

      setError(
        error.response?.data?.message ||
        'Failed to delete team member.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Our Team
            </h1>

            <p className="mt-2 text-gray-600">
              Manage doctors and team members.
            </p>
          </div>

          {/* Add */}
          <Link
            to="/team/add"
            className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            + Add Team Member
          </Link>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              Loading team members...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          teamMembers.length === 0 && (
            <div className="rounded-xl bg-white p-10 text-center shadow-sm">

              <h2 className="text-lg font-semibold text-gray-900">
                No Team Members
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Add your first doctor or team member.
              </p>

              <Link
                to="/team/add"
                className="mt-5 inline-flex rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
              >
                Add Team Member
              </Link>

            </div>
          )}

        {/* Team Cards */}
        {!loading &&
          teamMembers.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {teamMembers.map((member) => {

                const isDeleting =
                  deletingId === member.id;

                return (
                  <div
                    key={member.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                  >

                    {/* Image */}
                    <div className="h-72 bg-gray-100">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>

                    {/* Details */}
                    <div className="p-5">

                      <h2 className="text-lg font-semibold text-gray-900">
                        {member.name}
                      </h2>

                      <p className="mt-1 text-sm font-medium text-teal-700">
                        {member.designation}
                      </p>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                        {member.about}
                      </p>

                      {/* Actions */}
                      <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">

                        {/* Edit */}
                        <Link
                          to={`/team/edit/${member.id}`}
                          className="flex-1 rounded-lg bg-teal-50 px-4 py-2.5 text-center text-sm font-medium text-teal-700 transition hover:bg-teal-100"
                        >
                          Edit
                        </Link>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(member)
                          }
                          disabled={isDeleting}
                          className="flex-1 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isDeleting
                            ? 'Deleting...'
                            : 'Delete'}
                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

      </div>
    </div>
  );
}

export default AdminTeam;