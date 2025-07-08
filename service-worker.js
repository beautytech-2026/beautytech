self.addEventListener('install', function (e) {
    e.waitUntil(
      caches.open('beautytech-store').then(function (cache) {
        return cache.addAll([
          '/',
          '/index2.html',
          '/manifest.json',
          '/icon-192.png',
          '/icon-512.png'
          // اضافه کن: CSS و JS موردنیازت
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function (e) {
    e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
      })
    );
  });
  