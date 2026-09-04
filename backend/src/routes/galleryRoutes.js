const express = require('express');
const multer = require('multer');

const {
  uploadGalleryMediaController,
  createGalleryItemController,
  getGalleryItemsController,
  deleteGalleryItemController,
} = require('../controllers/galleryController');

const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

const router = express.Router();


/*
 * =========================================================
 * MULTER
 * =========================================================
 *
 * Files are kept in memory and then
 * uploaded directly to Cloudflare R2.
 */

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    /*
     * Maximum file size:
     * 50 MB
     */
    fileSize: 50 * 1024 * 1024,
  },
});


/*
 * =========================================================
 * PUBLIC GALLERY ROUTES
 * =========================================================
 */


/*
 * GET /api/gallery
 *
 * Public:
 * Get all gallery items.
 *
 * The controller generates temporary
 * signed URLs for the media.
 */

router.get(
  '/',
  getGalleryItemsController
);


/*
 * =========================================================
 * PROTECTED ADMIN GALLERY ROUTES
 * =========================================================
 */


/*
 * POST /api/gallery/upload
 *
 * Admin only:
 * Upload image/video to R2.
 *
 * Frontend must send:
 *
 * FormData:
 * file -> selected image/video
 */

router.post(
  '/upload',
  adminAuthMiddleware,
  upload.single('file'),
  uploadGalleryMediaController
);


/*
 * POST /api/gallery
 *
 * Admin only:
 * Create the gallery database record
 * after the R2 upload succeeds.
 */

router.post(
  '/',
  adminAuthMiddleware,
  createGalleryItemController
);


/*
 * DELETE /api/gallery/:id
 *
 * Admin only:
 * Delete the R2 object and then
 * delete its database record.
 */

router.delete(
  '/:id',
  adminAuthMiddleware,
  deleteGalleryItemController
);


module.exports = router;