const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// the user's credentials is of one time and is deleted from aws after use
const s3Client = new S3Client({
  region: "ap-south-2",
  credentials: {
    accessKeyId: "AKIAU6GDWFMMFVVGEL7T",
    secretAccessKey: "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",
  },
});

// To read the data of a private bucket
async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "siddhantdev-private",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

// To update/modify the data in a private bucket
// NOT POST : as bucket is already created by the root user
// POST for bucked creation
async function putObjectURL(fileName, contentType) {
  const command = new PutObjectCommand({
    Bucket: "siddhantdev-private",
    Key: `uploads/user-uploads/${fileName}`,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

// List all objects in the bucket
async function listObjects() {
  const command = new ListObjectsV2Command({
    Bucket: "siddhantdev-private",
    Key: "/",
  });
  const result = await s3Client.send(command);
  console.log(result);
}

const deleteObject = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: "siddhantdev-private",
    Key: key,
  });
  await s3Client.send(command);
};

async function init() {
  //   listObjects();
  deleteObject("dragon-neon.jpg");
}

init();
