const {
  PutObjectCommand,
} = require('@aws-sdk/client-s3');

const crypto = require('crypto');
const path = require('path');

const r2Client = require('../config/r2');

const {
  bucketName,
} = require('../config/r2Config');

const uploadConditionImageController = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required.',
      });
    }

    /*
     * Only allow image files.
     */
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({
        success: false,
        message: 'Only image files are allowed.',
      });
    }

    /*
     * Generate a unique file name.
     */
    const extension = path.extname(
      req.file.originalname
    );

    const fileName = `${Date.now()}-${crypto
      .randomBytes(6)
      .toString('hex')}${extension}`;

    /*
     * Keep condition images inside
     * the conditions/ folder in R2.
     */
    const imageKey = `conditions/${fileName}`;

    /*
     * Upload image to Cloudflare R2.
     */
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: imageKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });

    await r2Client.send(command);

    return res.status(200).json({
      success: true,
      message:
        'Condition image uploaded successfully',
      data: {
        imageKey,
      },
    });
  } catch (error) {
    console.error(
      'Condition image upload error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to upload condition image.',
    });
  }
};

module.exports = {
  uploadConditionImageController,
};