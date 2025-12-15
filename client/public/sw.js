const CACHE_NAME = "toolbox-hub-v2";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/images/hero-swiss-tools.png",
  "/images/category-image-processing.png",
  "/images/category-pdf-tools.png",
  "/images/category-text-tools.png",
  "/images/category-dev-tools.png",
  "/images/category-password-tools.png",
  "/images/category-word-counter.png",
  "/images/category-unit-converter.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting(); // Force new service worker to activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of all clients immediately
});

self.addEventListener("fetch", (event) => {
  // Network-first strategy for HTML, JS, and CSS to ensure fresh content
  if (event.request.mode === 'navigate' || 
      event.request.destination === 'script' || 
      event.request.destination === 'style') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
    // Cache-first strategy for images and other static assets
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
