const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
require("dotenv").config()

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY
  }
})

async function putObject(filename, contentType) {
  const command = new PutObjectCommand({
    Bucket: "bucket.edemy",
    Key: `uploads/user-uploads/${filename}`,
    ContentType: contentType
  })
  const url = await getSignedUrl(s3Client, command)
  return url
}




async function getObjectUrl(key) {
  const command = new GetObjectCommand({
    Bucket: "bucket.edemy",
    Key: key
  })

  const url = await getSignedUrl(s3Client, command) 
  return url
}

// async function init() {
//   console.log(await getObjectUrl("uploads/user-uploads/video-1707209432311.jpeg"))

// }

// init()

module.exports = { putObject,getObjectUrl }