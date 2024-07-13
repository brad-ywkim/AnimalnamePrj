self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  // 캐싱할 파일들을 지정합니다.
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/favicon.ico",
        "/logo192.png",
        "/logo512.png",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
