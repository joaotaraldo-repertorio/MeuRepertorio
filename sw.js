const CACHE_NAME = 'repertorio-joao-v20';
const urlsToCache = [
  './',
  './index.html',
  './dados.js'
];

// O Segurança guardando as músicas no bolso na primeira vez
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// O Segurança entregando as músicas quando você estiver sem internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se achou no bolso (cache), entrega. Se não, tenta buscar na internet.
        return response || fetch(event.request);
      })
  );
});