import { Link, useNavigate } from 'react-router-dom';
import AdminTeamForm from '../components/AdminTeamForm';

function AdminTeamAdd() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/team');
  };

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
            Add Team Member
          </h1>

          <p className="mt-2 text-gray-600">
            Add a new doctor or team member.
          </p>
        </div>

        <AdminTeamForm
          onSuccess={handleSuccess}
        />

      </div>
    </div>
  );
}

export default AdminTeamAdd;