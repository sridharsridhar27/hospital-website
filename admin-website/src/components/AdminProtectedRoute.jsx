import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { isAdminAuthenticated } from '../utils/adminAuth';

function AdminProtectedRoute() {
  const location = useLocation();

  if (!isAdminAuthenticated()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}

export default AdminProtectedRoute;