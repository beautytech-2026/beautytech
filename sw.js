self.addEventListener('install', event => {
    // Force this SW to become active immediately
    self.skipWaiting();
  });
  
  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            return caches.delete(cache); // Delete all caches
          })
        );
      }).then(() => {
        return self.clients.claim(); // Take control of all pages immediately
      })
    );
  });

  