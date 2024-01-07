const cacheName = "firstVersion";
const cacheList = ["./", "./index.html", "./main.css", "./main.js"];

self.addEventListener("install", (ev) => {
  ev.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(cacheList);
    })
  );
});
