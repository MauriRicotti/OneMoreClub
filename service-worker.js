const CACHE_NAME = 'one-more-shell-v23';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest?v=3',
  '/assets/favicon.ico?v=3',
  '/assets/apple-touch-icon.png?v=3',
  '/assets/one-logo.webp',
  '/assets/one-more-crowd-hero.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // The video and MapCN assets are on-demand. This preserves a lightweight initial install.
  if (url.pathname.endsWith('.mp4')) return;

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put('/index.html', copy));
      return response;
    }).catch(() => caches.match('/index.html')));
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
      body: 'Nueva fecha: JOYCE · Vie 23 OCT · 23:59 H',
      url: '/?evento=joyce-23-oct'
    }
  }[eventSlug] || {
    body: 'Hay una nueva fecha en ONE MORE ELECTRONIC.',
    url: '/#proxima-experiencia'
  };
  event.waitUntil(self.registration.showNotification('ONE MORE ELECTRONIC', {
    body: details.body,
    icon: '/assets/apple-touch-icon.png?v=3',
    badge: '/assets/favicon.ico?v=3',
    tag: 'one-more-notification-preview',
    renotify: true,
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
