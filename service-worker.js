const CACHE_NAME = 'pwa-demo-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/images/icon-192x192.png',
    '/images/icon-512x512.png',
    '/manifest.json' 
];

// Hàm kiểm tra phiên bản trong manifest.json
async function checkVersionAndUpdateCache() {
    const response = await fetch('/manifest.json');
    const manifest = await response.json();
    const currentVersion = manifest.version;

    const storedVersion = await caches.match('/manifest.json').then(res => {
        return res ? res.json().then(data => data.version) : null;
    });

    if (storedVersion !== currentVersion) {
        console.log(`Version changed: ${storedVersion} -> ${currentVersion}`);
        await caches.delete(CACHE_NAME); // Xóa cache cũ
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(urlsToCache); // Tải lại toàn bộ file mới
    }
}

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(checkVersionAndUpdateCache());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
