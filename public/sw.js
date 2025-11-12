const CACHE_NAME = 'first-look-v1.1.0';
const RUNTIME_CACHE = 'runtime-cache-v1';
const IMAGE_CACHE = 'image-cache-v1';

const urlsToCache = [
  '/',
  '/manifest.json',
  '/offline.html'
];

// Cache strategies
const CACHE_FIRST = [
  /\.(png|jpg|jpeg|svg|gif|webp|ico)$/,
  /\.(woff|woff2|ttf|eot)$/,
];

const NETWORK_FIRST = [
  /\/api\//,
  /supabase\.co/,
];

// Install event
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).catch(err => {
          console.error('Cache installation failed:', err);
        });
      })
  );
});

// Fetch event with intelligent caching
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Cache-first strategy for static assets
  if (CACHE_FIRST.some(pattern => pattern.test(url.pathname))) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache => {
        return cache.match(request).then(response => {
          return response || fetch(request).then(networkResponse => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Network-first strategy for API calls
  if (NETWORK_FIRST.some(pattern => pattern.test(url.href))) {
    event.respondWith(
      fetch(request)
        .then(response => {
          return caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(request, response.clone());
            return response;
          });
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Default: Cache-first with network fallback
  event.respondWith(
    caches.match(request)
      .then(response => {
        return response || fetch(request).then(networkResponse => {
          return caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
      .catch(() => {
        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  const validCaches = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!validCaches.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Sync any pending offline actions
  console.log('Background sync triggered');
}