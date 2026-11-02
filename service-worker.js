const CACHE_NAME = 'one-more-shell-v117';
const APP_SHELL = [
  '/',
  '/index.html',
  '/events.js',
  '/login/',
  '/manifest.webmanifest?v=3',
  '/assets/favicon.ico?v=3',
  '/assets/apple-touch-icon.png?v=3',
  '/assets/one-logo.webp',
  '/assets/notification-icon.png?v=1',
  '/assets/notification-badge.png?v=1',
  '/assets/one-more-crowd-hero.webp',
  '/assets/gallery-dancefloor.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('one-more-shell-') && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // The hero video is not precached; MapCN assets load on demand, while its poster and login image stay cached.
  if (url.pathname.endsWith('.mp4')) return;

  // Revalidate the shared event schedule on every page load; fall back to its
  // precached copy when offline so both the home page and login keep working.
  if (url.pathname === '/events.js') {
    event.respondWith(fetch(request, { cache: 'no-store' }).then((response) => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return caches.match(request).then((cached) => cached || response);
      }
      const copy = response.clone();
      return caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).then(() => response).catch(() => response);
    }).catch(() => caches.match(request)));
    return;
  }

  if (request.mode === 'navigate') {
    const isHomeDocument = url.pathname === '/' || url.pathname === '/index.html';
    event.respondWith(fetch(request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(isHomeDocument ? '/index.html' : request, copy));
      return response;
    }).catch(() => caches.match(isHomeDocument ? '/index.html' : request).then((cached) => cached || caches.match('/index.html'))));
    return;
  }

  event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => {
    if (!response || response.status !== 200 || response.type !== 'basic') return response;
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
    return response;
  })));
});

// Local visual test only: a click in the app asks the active service worker to
// display a notification. No subscription, Firebase token, VAPID key, or server
// push endpoint is involved.
self.addEventListener('message', (event) => {
  if (event.data?.type !== 'ONE_MORE_NOTIFICATION_PREVIEW') return;
  const eventSlug = event.data.eventSlug || 'joyce-23-oct';
  const details = {
    'joyce-23-oct': {
      body: '23:59 H · ONE MORE CLUB · DEVOTO',
      title: 'JOYCE · VIE 23 OCT',
      url: '/?evento=joyce-23-oct'
    }
  }[eventSlug] || {
    body: 'Hay una nueva fecha en ONE MORE ELECTRONIC.',
    url: '/#proxima-experiencia'
  };
  event.waitUntil(self.registration.showNotification(details.title || 'ONE MORE ELECTRONIC', {
    body: details.body,
    icon: '/assets/notification-icon.png?v=1',
    badge: '/assets/notification-badge.png?v=1',
    tag: 'one-more-notification-preview',
    renotify: true,
    requireInteraction: false,
    actions: [{ action:'open-event', title:'Ver fecha' }],
    data: { url: details.url }
  }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || '/', self.location.origin).href;
  event.waitUntil(self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(async (windows) => {
    for (const client of windows) {
      if ('navigate' in client) await client.navigate(target);
      return client.focus();
    }
    return self.clients.openWindow(target);
  }));
});
