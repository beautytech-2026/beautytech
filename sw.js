const CACHE_NAME = 'beautytec-v4'; // هر بار Deploy ورژن رو تغییر بده
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/logo.png',
  // فایل‌های اصلی دیگه رو اینجا لیست کن
];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing new SW and caching files');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // فوراً فعال شه
  );
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating and cleaning old caches');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[ServiceWorker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // کنترل تب‌های باز رو بگیره
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
