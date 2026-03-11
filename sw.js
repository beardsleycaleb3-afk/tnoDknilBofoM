const CACHE_NAME = 'pge-rpg-v1';
const urlsToCache = [
  '/', 'index.html', 'main.js', 'engine.js', 
  'styles.css', 'modules/ecs.js', 'modules/combat.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
