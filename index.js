const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "ap-south-2",
  credentials: {
    accessKeyId: "AKIAU6GDWFMMFVVGEL7T",
    secretAccessKey: "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",
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "siddhantdev-private",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function init() {
  console.log(
    "URL for dragon-neon.jpg ",
    await getObjectURL("dragon-neon.jpg")
  );
}

init();
