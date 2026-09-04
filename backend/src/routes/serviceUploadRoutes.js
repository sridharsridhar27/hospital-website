const express = require('express');

const multer = require('multer');

const {
  uploadServiceImageController,
} = require('../controllers/serviceUploadController');

const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 30 * 1024 * 1024,
  },
});

router.post(
  '/',
  adminAuthMiddleware,
  upload.single('image'),
  uploadServiceImageController
);

module.exports = router;