const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

const {
  getSignedUrl,
} = require('@aws-sdk/s3-request-presigner');

const crypto = require('crypto');
const path = require('path');

const prisma = require('../config/prisma');
const r2Client = require('../config/r2');

const {
  bucketName,
} = require('../config/r2Config');


/*
 * =========================================================
 * ALLOWED FILE TYPES
 * =========================================================
 */

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
];


/*
 * =========================================================
 * GENERATE GALLERY MEDIA SIGNED URL
 * =========================================================
 *
 * Uses the same R2 signed URL approach as the
 * existing service image implementation.
 */

const getGalleryMediaUrl = async (
  mediaKey
) => {
  if (!mediaKey) {
    return null;
  }

  const command =
    new GetObjectCommand({
      Bucket: bucketName,
      Key: mediaKey,
    });

  const signedUrl =
    await getSignedUrl(
      r2Client,
      command,
      {
        expiresIn: 3600,
      }
    );

  return signedUrl;
};


/*
 * =========================================================
 * UPLOAD GALLERY MEDIA
 * =========================================================
 */

const uploadGalleryMediaController = async (
  req,
  res
) => {
  try {
    /*
     * Check file
     */

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          'Image or video file is required.',
      });
    }

    /*
     * Determine file type
     */

    const mimeType =
      req.file.mimetype;

    const isImage =
      ALLOWED_IMAGE_TYPES.includes(
        mimeType
      );

    const isVideo =
      ALLOWED_VIDEO_TYPES.includes(
        mimeType
      );

    /*
     * Temporary debugging.
     *
     * Remove these logs after
     * everything is confirmed working.
     */

    console.log(
      'Gallery upload original name:',
      req.file.originalname
    );

    console.log(
      'Gallery upload MIME type:',
      mimeType
    );

    console.log(
      'Gallery upload detected:',
      isImage
        ? 'IMAGE'
        : isVideo
        ? 'VIDEO'
        : 'INVALID'
    );

    /*
     * Validate file type
     */

    if (!isImage && !isVideo) {
      return res.status(400).json({
        success: false,
        message:
          'Only JPG, PNG, WEBP, MP4, WEBM and MOV files are allowed.',
      });
    }

    /*
     * Gallery type
     */

    const type = isImage
      ? 'IMAGE'
      : 'VIDEO';

    /*
     * File extension
     */

    const extension =
      path
        .extname(
          req.file.originalname
        )
        .toLowerCase();

    /*
     * Generate unique filename
     */

    const fileName =
      `${Date.now()}-${crypto
        .randomBytes(6)
        .toString('hex')}${extension}`;

    /*
     * R2 object key
     */

    const mediaKey =
      `gallery/${fileName}`;

    /*
     * Upload to Cloudflare R2
     */

    const command =
      new PutObjectCommand({
        Bucket: bucketName,
        Key: mediaKey,
        Body: req.file.buffer,
        ContentType: mimeType,
      });

    await r2Client.send(
      command
    );

    /*
     * Return uploaded media information
     */

    return res.status(200).json({
      success: true,
      message:
        'Gallery media uploaded successfully.',
      data: {
        mediaKey,
        type,
      },
    });
  } catch (error) {
    console.error(
      'Gallery media upload error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to upload gallery media.',
    });
  }
};


/*
 * =========================================================
 * CREATE GALLERY ITEM
 * =========================================================
 */

const createGalleryItemController = async (
  req,
  res
) => {
  try {
    const {
      mediaKey,
      type,
    } = req.body;

    /*
     * Temporary debugging.
     */

    console.log(
      'Create gallery request:',
      {
        mediaKey,
        type,
      }
    );

    /*
     * Validate media key.
     */

    if (!mediaKey) {
      return res.status(400).json({
        success: false,
        message:
          'Media key is required.',
      });
    }

    /*
     * Validate media type.
     */

    if (
      !type ||
      !['IMAGE', 'VIDEO'].includes(type)
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Valid media type is required.',
      });
    }

    /*
     * Make sure the media key
     * belongs to the gallery folder.
     */

    if (
      !mediaKey.startsWith('gallery/')
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid gallery media key.',
      });
    }

    /*
     * Create gallery item.
     *
     * Prisma uses `mediaType`.
     * Frontend sends `type`.
     */

    const galleryItem =
      await prisma.galleryItem.create({
        data: {
          mediaKey,
          mediaType: type,
        },
      });

    return res.status(201).json({
      success: true,
      message:
        'Gallery item created successfully.',
      data: galleryItem,
    });
  } catch (error) {
    console.error(
      'Create gallery item error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to create gallery item.',
    });
  }
};


/*
 * =========================================================
 * GET ALL GALLERY ITEMS
 * =========================================================
 */

const getGalleryItemsController = async (
  req,
  res
) => {
  try {
    /*
     * Get gallery records from PostgreSQL
     */

    const galleryItems =
      await prisma.galleryItem.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

    /*
     * Generate temporary signed URL
     * for every R2 object.
     */

    const itemsWithUrls =
      await Promise.all(
        galleryItems.map(
          async (item) => {
            const mediaUrl =
              await getGalleryMediaUrl(
                item.mediaKey
              );

            return {
              ...item,

              /*
               * Prisma:
               * mediaType
               *
               * Existing frontend:
               * type
               *
               * Keep frontend unchanged
               * by mapping the value here.
               */

              type: item.mediaType,

              mediaUrl,
            };
          }
        )
      );

    /*
     * Return gallery items
     */

    return res.status(200).json({
      success: true,
      message:
        'Gallery items fetched successfully.',
      data: itemsWithUrls,
    });
  } catch (error) {
    console.error(
      'Get gallery items error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to fetch gallery items.',
    });
  }
};


/*
 * =========================================================
 * DELETE GALLERY ITEM
 * =========================================================
 */

const deleteGalleryItemController = async (
  req,
  res
) => {
  try {
    const { id } =
      req.params;

    /*
     * Find gallery item
     */

    const galleryItem =
      await prisma.galleryItem.findUnique({
        where: {
          id,
        },
      });

    /*
     * Check existence
     */

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message:
          'Gallery item not found.',
      });
    }

    /*
     * Delete media from R2
     */

    const deleteCommand =
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: galleryItem.mediaKey,
      });

    await r2Client.send(
      deleteCommand
    );

    /*
     * Delete database record
     */

    await prisma.galleryItem.delete({
      where: {
        id,
      },
    });

    /*
     * Return response
     */

    return res.status(200).json({
      success: true,
      message:
        'Gallery item deleted successfully.',
    });
  } catch (error) {
    console.error(
      'Delete gallery item error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to delete gallery item.',
    });
  }
};


/*
 * =========================================================
 * EXPORTS
 * =========================================================
 */

module.exports = {
  uploadGalleryMediaController,
  createGalleryItemController,
  getGalleryItemsController,
  deleteGalleryItemController,
};