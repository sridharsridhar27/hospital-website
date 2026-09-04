const {
  PutObjectCommand,
} = require('@aws-sdk/client-s3');

const crypto = require('crypto');
const path = require('path');

const r2Client = require('../config/r2');

const {
  bucketName,
} = require('../config/r2Config');

const uploadServiceImageController = async (
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

    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({
        success: false,
        message: 'Only image files are allowed.',
      });
    }

    const extension = path.extname(
      req.file.originalname
    );

    const fileName = `${Date.now()}-${crypto
      .randomBytes(6)
      .toString('hex')}${extension}`;

    const imageKey = `services/${fileName}`;

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
        'Service image uploaded successfully',
      data: {
        imageKey,
      },
    });
  } catch (error) {
    console.error(
      'Service image upload error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to upload service image.',
    });
  }
};

module.exports = {
  uploadServiceImageController,
};