import { join as pathJoin } from 'path'

const cacheName = 'v1'
const sw: any = self

const cacheList = (process.env.CACHE_LIST as string).split(',')
const cacheListWithHost = cacheList.map(resource =>
  pathJoin(location.host, resource),
)

sw.oninstall = (event: any) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName)
      return cache.addAll(cacheList)
    })(),
  )
}

sw.onfetch = (event: any) => {
  if (!cacheListWithHost.some(item => event.request.url.endsWith(item))) return
  event.respondWith(
    (async () => {
      const cache = await caches.open(cacheName)
      try {
        const networkResponse = await fetch(event.request)
        const { status } = networkResponse
        if (status >= 500 && status < 600) throw Error(String(status))
        event.waitUntil(cache.put(event.request, networkResponse.clone()))
        return networkResponse
      } catch (e) {
        const cachedResponse = await cache.match(event.request)
        if (!cachedResponse) throw e
        return cachedResponse
      }
    })(),
  )
}
