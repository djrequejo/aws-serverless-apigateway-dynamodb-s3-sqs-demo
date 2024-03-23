const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const util = require('util');
const sharp = require('sharp');

const REGION = process.env.REGION;
const client = new S3Client({ REGION });

const thumbnailGenerator = async (event, context) => {
  console.log("Reading options from event:\n", util.inspect(event, { depth: 5 }));
  const srcBucket = event.Records[0].s3.bucket.name;
  console.log(event.Records[0].s3.object)
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  console.log(`srcKey: ${srcKey}`);

  const typeMatch = srcKey.match(/\.([^.]*)$/);
  if (!typeMatch) {
    console.log("Could not determine the image type.");
    return;
  }
  console.log(`typeMatch: ${typeMatch}`);

  const imageType = typeMatch[1].toLowerCase();
  if (imageType != "jpg" && imageType != "png") {
    console.log(`Unsupported image type: ${imageType}`);
    return;
  }
  console.log(`imageType: ${imageType}`);

  let imageBuffer = null
  try {
    const command = new GetObjectCommand({
      Bucket: srcBucket,
      Key: srcKey
    });

    console.log(`GetObjectCommand: ${GetObjectCommand}`);

    const { Body } = await client.send(command);

    imageBuffer = await streamToBuffer(Body);

    console.log("imageBuffer:\n", util.inspect(imageBuffer, { depth: 5 }));

  } catch (error) {
    console.log(`GetObjectCommand error: ${error}`);
    return;
  }

  const widths = [50, 100, 200];

  for (const w of widths) {
    await resizer(imageBuffer, w, srcBucket, srcKey)
  }
};

const streamToBuffer = async (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });

const resizer = async (imgBody, newSize, dstBucket, fileKey) => {

  const nameFile = fileKey.split('/')[1]
  const dstKey = `resized/${newSize}-${nameFile}`;
  let buffer = null
  try {
    buffer = await sharp(imgBody)
      .resize(newSize)
      .toBuffer();

  } catch (error) {
    console.log(`sharp error: ${error}`);
    return;
  }

  try {
    const command = new PutObjectCommand({
      Bucket: dstBucket,
      Key: dstKey,
      Body: buffer,
      ContentType: "image"
    });

    console.log(`PutObjectCommand: ${PutObjectCommand}`);

    await client.send(command);
  } catch (error) {
    console.log(`PutObjectCommand error: ${error}`);
    return;
  }

  console.log('Successfully resized ' + dstBucket + '/' + fileKey +
    ' and uploaded to ' + dstBucket + '/' + dstKey);
}

module.exports = {
  thumbnailGenerator
}