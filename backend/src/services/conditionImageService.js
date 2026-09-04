const {
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

const {
  getSignedUrl,
} = require('@aws-sdk/s3-request-presigner');

const r2Client = require('../config/r2');

const {
  bucketName,
} = require('../config/r2Config');

const getConditionImageUrl = async (
  imageKey
) => {
  if (!imageKey) {
    return null;
  }

  const command =
    new GetObjectCommand({
      Bucket: bucketName,
      Key: imageKey,
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
 * Delete condition image from
 * Cloudflare R2
 */
const deleteConditionImage = async (
  imageKey
) => {
  if (!imageKey) {
    return;
  }

  const command =
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: imageKey,
    });

  await r2Client.send(command);
};


module.exports = {
  getConditionImageUrl,
  deleteConditionImage,
};