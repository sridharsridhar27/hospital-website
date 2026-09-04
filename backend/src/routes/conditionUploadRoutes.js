const express = require('express');
const multer = require('multer');

const {
  uploadConditionImageController,
} = require('../controllers/conditionUploadController');

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
  uploadConditionImageController
);

module.exports = router;