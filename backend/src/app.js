const env = require('./config/env');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const teamRoutes = require('./routes/teamRoutes');
const teamUploadRoutes = require('./routes/teamUploadRoutes');

const adminAuthRoutes = require('./routes/adminAuthRoutes');

const serviceRoutes = require('./routes/serviceRoutes');
const serviceUploadRoutes = require('./routes/serviceUploadRoutes');

const conditionRoutes = require('./routes/conditionRoutes');
const conditionUploadRoutes = require('./routes/conditionUploadRoutes');

const galleryRoutes = require('./routes/galleryRoutes');

const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

/*
 * =========================================================
 * CORS
 * =========================================================
 */

app.use(
  cors({
    origin: [
      env.frontendUrl,
      env.adminUrl,
    ].filter(Boolean),
    credentials: true,
  })
);

/*
 * =========================================================
 * SECURITY
 * =========================================================
 */

app.use(helmet());

/*
 * =========================================================
 * LOGGER
 * =========================================================
 */

app.use(morgan('dev'));

/*
 * =========================================================
 * BODY PARSERS
 * =========================================================
 */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/*
 * =========================================================
 * HEALTH CHECK
 * =========================================================
 */

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hospital API is running',
  });
});

/*
 * =========================================================
 * TEAM API
 * =========================================================
 */

/*
 * Public:
 * GET    /api/team
 * GET    /api/team/:id
 *
 * Admin:
 * POST   /api/team
 * PUT    /api/team/:id
 * DELETE /api/team/:id
 */

app.use(
  '/api/team',
  teamRoutes
);

/*
 * Team image upload
 *
 * POST /api/team/upload
 */

app.use(
  '/api/team/upload',
  teamUploadRoutes
);

/*
 * =========================================================
 * ADMIN AUTHENTICATION API
 * =========================================================
 */

app.use(
  '/api/admin-auth',
  adminAuthRoutes
);

/*
 * =========================================================
 * SERVICES API
 * =========================================================
 */

/*
 * Public:
 * GET    /api/services
 * GET    /api/services/category/:category
 * GET    /api/services/:id
 *
 * Admin:
 * POST   /api/services
 * PUT    /api/services/:id
 * DELETE /api/services/:id
 */

app.use(
  '/api/services',
  serviceRoutes
);

/*
 * Service image upload
 *
 * POST /api/services/upload
 */

app.use(
  '/api/services/upload',
  serviceUploadRoutes
);

/*
 * =========================================================
 * CONDITIONS API
 * =========================================================
 */

/*
 * Public:
 * GET    /api/conditions
 * GET    /api/conditions/:id
 *
 * Admin:
 * POST   /api/conditions
 * PUT    /api/conditions/:id
 * DELETE /api/conditions/:id
 */

app.use(
  '/api/conditions',
  conditionRoutes
);

/*
 * Condition image upload
 *
 * POST /api/conditions/upload
 */

app.use(
  '/api/conditions/upload',
  conditionUploadRoutes
);

/*
 * =========================================================
 * GALLERY API
 * =========================================================
 */

app.use(
  '/api/gallery',
  galleryRoutes
);

/*
 * =========================================================
 * APPOINTMENTS API
 * =========================================================
 */

/*
 * Public:
 * POST   /api/appointments
 *
 * Admin:
 * GET    /api/appointments
 * GET    /api/appointments/:id
 * PATCH  /api/appointments/:id/status
 * DELETE /api/appointments/:id
 */

app.use(
  '/api/appointments',
  appointmentRoutes
);

/*
 * =========================================================
 * EXPORT APP
 * =========================================================
 */

module.exports = app;

