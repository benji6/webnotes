const AWS = require('aws-sdk')
const fs = require('fs')
const mime = require('mime')
const path = require('path')
const { buildPath } = require('./constants')

const Bucket = 'webnotes.link'
const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: 'us-east-1' })

const fileExtensionsToCache = ['css', 'ico', 'js', 'png', 'svg']

const shouldCacheFile = filename => {
  if (filename === 'serviceWorker.js') return false
  return fileExtensionsToCache.some(extension =>
    filename.endsWith(`.${extension}`),
  )
}

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
  const [filenamesInBuildDir, s3Keys] = await Promise.all([
    fs.promises.readdir(buildPath),
    listS3Keys(),
  ])
  const keysToRemove = s3Keys.filter(key => !filenamesInBuildDir.includes(key))
  const s3Args = filenamesInBuildDir
    .filter(filename => {
      if (s3Keys.includes(filename) && shouldCacheFile(filename)) return false
      return true
    })
    .map(filename => ({
      Body: fs.createReadStream(path.join(buildPath, filename)),
      CacheControl: `public, ${
        shouldCacheFile(filename)
          ? 'max-age=31536000, immutable'
          : 'max-age=0, must-revalidate'
      }`,
      ContentType: mime.getType(filename),
      Key: filename,
    }))

  console.log({
    'Current keys': s3Keys,
    'Keys to remove': keysToRemove,
    'Files to upload': s3Args.map(({ CacheControl, Key }) => ({
      Key,
      CacheControl,
    })),
  })

  await Promise.all(s3Args.map(uploadToS3))

  for (const filename of keysToRemove) deleteFromS3(filename)
}

main()
