const express = require('express');

const {
  getAllTeamMembers,
  getAdminTeamMemberById,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/teamController');

const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

const router = express.Router();

/*
 * GET /api/team
 *
 * Public API
 * Used by the public hospital website.
 */
router.get(
  '/',
  getAllTeamMembers
);

/*
 * GET /api/team/admin/:id
 *
 * Admin API
 * Protected.
 */
router.get(
  '/admin/:id',
  adminAuthMiddleware,
  getAdminTeamMemberById
);

/*
 * GET /api/team/:id
 *
 * Public API
 */
router.get(
  '/:id',
  getTeamMemberById
);

/*
 * POST /api/team
 *
 * Admin API
 * Create team member.
 */
router.post(
  '/',
  adminAuthMiddleware,
  createTeamMember
);

/*
 * PUT /api/team/:id
 *
 * Admin API
 * Update team member.
 */
router.put(
  '/:id',
  adminAuthMiddleware,
  updateTeamMember
);

/*
 * DELETE /api/team/:id
 *
 * Admin API
 * Delete team member.
 */
router.delete(
  '/:id',
  adminAuthMiddleware,
  deleteTeamMember
);

module.exports = router;