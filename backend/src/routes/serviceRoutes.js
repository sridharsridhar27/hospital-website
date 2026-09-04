const express = require('express');

const {
  getAllServicesController,
  getServicesByCategoryController,
  getServiceByIdController,
  createServiceController,
  updateServiceController,
  deleteServiceController,
} = require('../controllers/serviceController');

const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

const router = express.Router();

/*
 * =========================================================
 * PUBLIC SERVICE ROUTES
 * =========================================================
 */

/*
 * GET /api/services
 * Get all services
 */
router.get(
  '/',
  getAllServicesController
);

/*
 * GET /api/services/category/:category
 * Get services by category
 */
router.get(
  '/category/:category',
  getServicesByCategoryController
);

/*
 * GET /api/services/:id
 * Get one service
 */
router.get(
  '/:id',
  getServiceByIdController
);


/*
 * =========================================================
 * PROTECTED ADMIN SERVICE ROUTES
 * =========================================================
 */

/*
 * POST /api/services
 * Create service
 */
router.post(
  '/',
  adminAuthMiddleware,
  createServiceController
);

/*
 * PUT /api/services/:id
 * Update service
 */
router.put(
  '/:id',
  adminAuthMiddleware,
  updateServiceController
);

/*
 * DELETE /api/services/:id
 * Delete service
 */
router.delete(
  '/:id',
  adminAuthMiddleware,
  deleteServiceController
);

module.exports = router;