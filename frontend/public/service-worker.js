const CACHE_NAME = 'feastify-cache-v99'; // 🔁 Change this every time you deploy!

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/favicon.ico',
];

// Force install and cache files
self.addEventListener('install', (event) => {
  console.log('[SW] Installing and caching');
  self.skipWaiting(); // 🔥 Force install immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Force activate and delete old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating new service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim(); // 🔥 Force control of all clients
});

// Always fetch from network first, then cache
self.addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('manifest.json')) {
    console.log('[SW] Fetching manifest fresh from network');
    event.respondWith(
      fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
