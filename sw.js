const CACHE_NAME = 'beautytec-cache-v3'; // هر Deploy یه عدد جدید بذار
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/logo.png',
  // هر فایل اصلی دیگه‌ای که داری اینجا اضافه کن
];

self.addEventListener('install', (event) => {
  // کش جدید بساز و فایل‌ها رو اضافه کن
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // فوراً Service Worker جدید فعال بشه
});

self.addEventListener('activate', (event) => {
  // تمام کش‌های قدیمی رو حذف کن
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // کنترل تمام تب‌های باز رو بگیره
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // فایل از کش برگردون یا از شبکه بگیر
        return response || fetch(event.request);
      })
  );
});
