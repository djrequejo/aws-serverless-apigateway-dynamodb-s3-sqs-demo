const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const REGION = process.env.REGION;
const BUCKET_NAME = process.env.BUCKET_NAME;
const client = new S3Client({ REGION });

const signedS3URL = async (event, context) => {
  const filename = event.queryStringParameters.filename;
  const key = `upload/${filename}`;

  console.log(`REGION: ${REGION}`);
  console.log(`BUCKET_NAME: ${BUCKET_NAME}`);
  console.log(`key: ${key}`);

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  try {
    const signedUrl = await getSignedUrl(
      client,
      command, { expiresIn: 3600 }
    );
    console.log(signedUrl);

    return {
      "statusCode": 200,
      "body": JSON.stringify({
        signedUrl
      })
    };
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  signedS3URL
}