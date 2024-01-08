const cacheName = "firstVersion";
const cacheList = ["/", "/index.html", "static/js/bundle.js"];

self.addEventListener("install", (ev) => {
  ev.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheList).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", (ev) => {
  ev.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (e) => {
  if (navigator.onLine) {
    console.log(0);
    let fetchRequest = e.request;
    return fetch(fetchRequest).then((response) => {
      if (!response || response.status !== 200 || response.type !== "basic") {
        return response;
      }
      let responseToCache = response.clone();
      caches.open(cacheName).then((cache) => {
        cache.put(e.request, responseToCache);
      });
      return response;
    });
  } else {
    console.log(1);
    e.respondWith(
      caches.match(e.request).then((response) => {
        if (response) {
          return response;
        }
      })
    );
  }
});
