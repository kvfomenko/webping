var cacheName = 'web-ping-pwa';
var filesToCache = [
  '/web_battery/',
  '/web_battery/index.html',
  '/web_battery/images/icon-128.png',
  '/web_battery/images/icon-144.png',
  '/web_battery/images/icon-152.png',
  '/web_battery/images/icon-192.png',
  '/web_battery/images/icon-256.png',
  '/web_battery/images/icon-512.png'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  
  if (e.request.method !== 'GET'
      || e.request.url.indexOf('.json') >= 0
      || e.request.url.indexOf('kvfomenko') === -1) { return; }
  
  e.respondWith(
    caches.match(e.request).then(function(response) {
      console.log('request ' + e.request.url + ' matched')
      return response || fetch(e.request);
    }).catch(
        console.log('request ' + e.request.url + ' not matched!!!')
    )
  );
});

