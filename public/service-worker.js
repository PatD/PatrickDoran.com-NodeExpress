
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v5').then(function(cache) {
      return cache.addAll([
        '/',
        '/patrick_doran_web_developer.jpg',
        '/patrick_doran_work_history.jpg',
        '/new.css',
        '/patrickdoran_svelte_bundle.js',
        '/patrickdoran_react_timeline.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open('v4').then(function (cache) {
         // cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return console.log('Error setting service worker')
      });
    }
  }));
});