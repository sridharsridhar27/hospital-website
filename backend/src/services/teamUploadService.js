const {
  PutObjectCommand,
} = require('@aws-sdk/client-s3');

const r2Client = require('../config/r2');
const { bucketName } = require('../config/r2Config');

const uploadTeamImage = async (file) => {
  if (!file) {
    throw new Error('Image file is required');
  }

  const fileExtension = file.originalname.includes('.')
    ? file.originalname.substring(
        file.originalname.lastIndexOf('.')
      )
    : '';

  const fileKey = `team/${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 10)}${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await r2Client.send(command);

  return fileKey;
};

module.exports = {
  uploadTeamImage,
};