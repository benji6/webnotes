const AWS = require('aws-sdk')
const fs = require('fs')
const mime = require('mime')
const path = require('path')
const { buildPath } = require('./constants')

const Bucket = 'webnotes.link'
const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: 'us-east-1' })

const deleteFromS3 = Key =>
  new Promise((resolve, reject) =>
    s3.deleteObject({ Bucket, Key }, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    }),
  )

const listS3Keys = () =>
  new Promise((resolve, reject) =>
    s3.listObjectsV2({ Bucket }, (err, data) => {
      if (err) return reject(error)
      resolve(data.Contents.map(({ Key }) => Key))
    }),
  )

const uploadToS3 = params =>
  new Promise((resolve, reject) =>
    s3.upload({ Bucket, ...params }, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    }),
  )

const main = async () => {
  const [filenamesToUpload, s3Keys] = await Promise.all([
    fs.promises.readdir(buildPath),
    listS3Keys(),
  ])
  const keysToRemove = s3Keys.filter(key => !filenamesToUpload.includes(key))

  console.log({ filenamesToUpload, s3Keys, keysToRemove })

  await Promise.all(
    filenamesToUpload.map(filename =>
      uploadToS3({
        Body: fs.createReadStream(path.join(buildPath, filename)),
        CacheControl: `public, ${
          filename.endsWith('.html')
            ? 'max-age=0, must-revalidate'
            : 'max-age=31536000, immutable'
        }`,
        ContentType: mime.getType(filename),
        Key: filename,
      }),
    ),
  )

  for (const filename of keysToRemove) deleteFromS3(filename)
}

main()
