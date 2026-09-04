import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import AdminDashboard from './pages/AdminDashboard';

import AdminTeam from './pages/AdminTeam';
import AdminTeamAdd from './pages/AdminTeamAdd';
import AdminTeamEdit from './pages/AdminTeamEdit';

import AdminLogin from './pages/AdminLogin';

import AdminServices from './pages/AdminServices';
import AdminServiceAdd from './pages/AdminServiceAdd';
import AdminServiceEdit from './pages/AdminServiceEdit';

import AdminConditions from './pages/AdminConditions';
import AdminConditionAdd from './pages/AdminConditionAdd';
import AdminConditionEdit from './pages/AdminConditionEdit';
import AdminConditionItems from './pages/AdminConditionItems';
import AdminConditionItemAdd from './pages/AdminConditionItemAdd';
import AdminConditionItemEdit from './pages/AdminConditionItemEdit';
import AdminGallery from './pages/AdminGallery';
import AdminGalleryAdd from './pages/AdminGalleryAdd';
import AdminAppointments from './pages/AdminAppointments';

import AdminProtectedRoute from './components/AdminProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
            PUBLIC ROUTE
            ===================================================== */}

        <Route
          path="/login"
          element={<AdminLogin />}
        />

        {/* =====================================================
            PROTECTED ADMIN ROUTES
            ===================================================== */}

        <Route element={<AdminProtectedRoute />}>

          {/* =================================================
              DASHBOARD
              ================================================= */}

          <Route
            path="/"
            element={<AdminDashboard />}
          />

          {/* =================================================
              TEAM
              ================================================= */}

          <Route
            path="/team"
            element={<AdminTeam />}
          />

          <Route
            path="/team/add"
            element={<AdminTeamAdd />}
          />

          <Route
            path="/team/edit/:id"
            element={<AdminTeamEdit />}
          />

          {/* =================================================
              SERVICES
              ================================================= */}

          <Route
            path="/services"
            element={<AdminServices />}
          />

          <Route
            path="/services/add"
            element={<AdminServiceAdd />}
          />

          <Route
            path="/services/edit/:id"
            element={<AdminServiceEdit />}
          />

          {/* =================================================
              CONDITIONS
              ================================================= */}

          <Route
            path="/conditions"
            element={<AdminConditions />}
          />

          <Route
            path="/conditions/add"
            element={<AdminConditionAdd />}
          />

          <Route
            path="/conditions/edit/:id"
            element={<AdminConditionEdit />}
          />

          {/* =================================================
              CONDITION ITEMS
              ================================================= */}

          {/* Condition Items List */}

          <Route
            path="/conditions/:conditionId/items"
            element={<AdminConditionItems />}
          />

          {/* Add Condition Item */}

          <Route
            path="/conditions/:conditionId/items/add"
            element={<AdminConditionItemAdd />}
          />

          {/* Edit Condition Item */}

          <Route
            path="/conditions/:conditionId/items/edit/:itemId"
            element={<AdminConditionItemEdit />}
          />
          {/* =================================================
    GALLERY
    ================================================= */}

<Route
  path="/gallery"
  element={<AdminGallery />}
/>

<Route
  path="/gallery/add"
  element={<AdminGalleryAdd />}
/>
{/* =================================================
    APPOINTMENTS
    ================================================= */}

<Route
  path="/appointments"
  element={<AdminAppointments />}
/>
        </Route>

        {/* =====================================================
            UNKNOWN ROUTES
            ===================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;