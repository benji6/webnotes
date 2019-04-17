const path = require('path')
const fs = require('fs').promises
const { buildPath } = require('./constants')

const blacklist = ['index.html', 'robots.txt', 'serviceWorker.js']

;(async () => {
  const files = await fs.readdir(buildPath)
  const filteredFiles = files.filter(file => !blacklist.includes(file))
  const cacheList = ['/', ...filteredFiles]
  const serviceWorkerPath = path.join(buildPath, 'serviceWorker.js')
  const serviceWorker = await fs.readFile(serviceWorkerPath, 'utf-8')
  return fs.writeFile(
    serviceWorkerPath,
    serviceWorker.replace('CACHE_LIST', cacheList),
  )
})()
