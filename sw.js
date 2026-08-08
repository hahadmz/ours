const CACHE_NAME = 'ours-v1';
const urlsToCache = [
    '/',
    '/ours/',
    '/ours/index.html',
    '/ours/style.css',
    '/ours/script.js',
    '/ours/manifest.json'
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
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});