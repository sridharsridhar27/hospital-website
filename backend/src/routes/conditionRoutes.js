const express = require('express');

const {
  getAllConditionsController,
  getConditionByIdController,
  getConditionBySlugController,
  createConditionController,
  updateConditionController,
  deleteConditionController,
} = require('../controllers/conditionController');

const {
  getConditionItemsController,
  getConditionItemByIdController,
  createConditionItemController,
  updateConditionItemController,
  deleteConditionItemController,
} = require('../controllers/conditionItemController');

const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

const router = express.Router();


/*
 * =========================================================
 * PUBLIC CONDITION ROUTES
 * =========================================================
 */


/*
 * GET /api/conditions
 * Get all conditions
 */
router.get(
  '/',
  getAllConditionsController
);


/*
 * GET /api/conditions/slug/:slug
 * Get one condition by slug
 *
 * Example:
 * /api/conditions/slug/low-back-pain
 */
router.get(
  '/slug/:slug',
  getConditionBySlugController
);


/*
 * GET /api/conditions/:conditionId/items
 * Get all items belonging to a condition
 *
 * Example:
 * /api/conditions/clxxx123/items
 */
router.get(
  '/:conditionId/items',
  getConditionItemsController
);


/*
 * GET /api/conditions/items/:id
 * Get one condition item
 */
router.get(
  '/items/:id',
  getConditionItemByIdController
);


/*
 * GET /api/conditions/:id
 * Get one condition
 */
router.get(
  '/:id',
  getConditionByIdController
);


/*
 * =========================================================
 * PROTECTED ADMIN CONDITION ROUTES
 * =========================================================
 */


/*
 * POST /api/conditions
 * Create condition
 */
router.post(
  '/',
  adminAuthMiddleware,
  createConditionController
);


/*
 * PUT /api/conditions/:id
 * Update condition
 */
router.put(
  '/:id',
  adminAuthMiddleware,
  updateConditionController
);


/*
 * DELETE /api/conditions/:id
 * Delete condition
 */
router.delete(
  '/:id',
  adminAuthMiddleware,
  deleteConditionController
);


/*
 * =========================================================
 * PROTECTED ADMIN CONDITION ITEM ROUTES
 * =========================================================
 */


/*
 * POST /api/conditions/:conditionId/items
 * Create condition item
 *
 * Example:
 * POST /api/conditions/clxxx123/items
 */
router.post(
  '/:conditionId/items',
  adminAuthMiddleware,
  createConditionItemController
);


/*
 * PUT /api/conditions/items/:id
 * Update condition item
 *
 * Example:
 * PUT /api/conditions/items/clxxx456
 */
router.put(
  '/items/:id',
  adminAuthMiddleware,
  updateConditionItemController
);


/*
 * DELETE /api/conditions/items/:id
 * Delete condition item
 *
 * Example:
 * DELETE /api/conditions/items/clxxx456
 */
router.delete(
  '/items/:id',
  adminAuthMiddleware,
  deleteConditionItemController
);


module.exports = router;