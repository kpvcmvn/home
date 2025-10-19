const CACHE_NAME = 'phung-vu-vinh-son-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Note: We don't cache index.tsx directly as it's processed by Babel. 
  // Caching the external libraries is more important.
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://congregatiomissionis.org/wp-content/uploads/2024/09/Logo-CM-tradicional-sin-fondo.png', // logo
  'https://congregatiomissionis.org/wp-content/uploads/2024/09/Logo-CM-tradicional-sin-fondo.png', // manifest icon
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://aistudiocdn.com/@google/genai@^1.25.0',
  'https://aistudiocdn.com/react@^19.2.0/',
  'https://aistudiocdn.com/react@^19.2.0',
  'https://aistudiocdn.com/react-dom@^19.2.0/'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Force the waiting service worker to become the active service worker.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching URLs');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Failed to cache URLs:', err);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all pages under its scope.
  );
});

self.addEventListener('fetch', event => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        // Return response from cache if found.
        if (response) {
          return response;
        }

        // If not in cache, fetch from network.
        return fetch(event.request).then(networkResponse => {
          // Check for valid response to cache.
          if (networkResponse && networkResponse.status === 200) {
             // Don't cache chrome-extension requests
            if (!event.request.url.startsWith('chrome-extension://')) {
               cache.put(event.request, networkResponse.clone());
            }
          }
          return networkResponse;
        });
      }).catch(error => {
        console.error('Error in fetch handler:', error);
        // You could return a fallback page here if needed.
        // For example: return caches.match('./offline.html');
      });
    })
  );
});