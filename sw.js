self.addEventListener('install', (event) => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.open('no-cache').then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    );
  });
  