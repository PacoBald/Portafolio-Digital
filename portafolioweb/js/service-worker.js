// Nombre de la caché
const CACHE_NAME = 'mi-cache-v1';

// Archivos a almacenar en caché
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/img/yohd4k.jpg',
  '/manifest.json'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Archivos en caché: ', urlsToCache);
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché antigua: ', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Recuperación de recursos
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si hay una respuesta en caché, la devuelve
        if (response) {
          return response;
        }
        // Si no, realiza la solicitud de red
        return fetch(event.request);
      })
  );
});