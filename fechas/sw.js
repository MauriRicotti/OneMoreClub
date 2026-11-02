const CACHE_NAME = 'one-more-dates-pwa-v1';
const APP_SHELL = [
  '/fechas/',
  '/fechas/manifest.webmanifest',
  '/fechas/qrcode.js',
  '/fechas/icons/app-icon-192.png',
  '/fechas/icons/app-icon-512.png',
  '/events.js',
  '/assets/one-logo.webp',
  '/assets/apple-touch-icon.png',
  '/assets/favicon.ico',
  '/assets/one-more-table-plan.webp',
  '/assets/joyce-23-octubre.webp',
  '/assets/goth-24-octubre.webp',
  '/assets/festa-bros-31-octubre.webp',
  '/assets/yamila-be-06-noviembre.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key.startsWith('one-more-dates-pwa-') && key !== CACHE_NAME).map((key) => caches.delete(key))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Keep the shared schedule current online and serve its last cached copy offline.
  if (url.pathname === '/events.js') {
    event.respondWith(fetch(request, { cache: 'no-store' }).then((response) => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return caches.match(request).then((cached) => cached || response);
      }
      return caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone())).then(() => response).catch(() => response);
    }).catch(() => caches.match(request)));
    return;
  }

  // This worker only serves navigations inside the dedicated dates app.
  if (request.mode === 'navigate' && url.pathname.startsWith('/fechas/')) {
    event.respondWith(fetch(request).then((response) => {
      if (response && response.status === 200 && response.type === 'basic') {
        event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put('/fechas/', response.clone())).catch(() => {}));
      }
      return response;
    }).catch(() => caches.match('/fechas/')));
    return;
  }

  // Cache only resources this mini-app actually requests; do not precache the homepage or hero video.
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => {
    if (!response || response.status !== 200 || response.type !== 'basic') return response;
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone())).catch(() => {}));
    return response;
  })));
});
