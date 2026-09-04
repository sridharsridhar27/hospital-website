const {
  ListBucketsCommand,
} = require('@aws-sdk/client-s3');

const r2Client = require('../config/r2');

const testR2Connection = async () => {
  try {
    const command = new ListBucketsCommand({});

    const response = await r2Client.send(command);

    console.log('Cloudflare R2 connected successfully');

    console.log(
      'Available buckets:',
      response.Buckets?.map((bucket) => bucket.Name)
    );
  } catch (error) {
    console.error('Cloudflare R2 connection failed:', error.message);
  }
};

module.exports = testR2Connection;