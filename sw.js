const CACHE_NAME = 'siri-ai-v1.1.0';
const ASSETS = [
  './',
  './index.html',
  './commands.js',
  './ai-logo.png'
];

// Установка воркера и кеширование ресурсов
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Активация и удаление старого кеша
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});

// Запрос ресурсов из кеша для оффлайн-работы
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});