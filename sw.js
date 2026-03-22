/**
 * ENGECEMA PRIVATE - SERVICE WORKER DALLAS
 * STATUS: OPERACIONAL | VOLUMETRIA: ~75 LINHAS
 */
const CACHE_NAME = 'engecema-private-v30';
const ASSETS = [
    'index.html', 'admin.html', 'cadastro.html', 'produção.html',
    'private-engine.js', 'logo.png', 'favicon.ico'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys.map((key) => { if (key !== CACHE_NAME) return caches.delete(key); })
        )).then(() => self.clients.claim())
    );
});

// INTERCEPTAÇÃO PARA INJETAR O MOTOR NO INDEX/ADMIN IMUTÁVEL
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.pathname.endsWith('index.html') || url.pathname === '/' || url.pathname.endsWith('admin.html')) {
        event.respondWith(
            fetch(event.request).then(async (response) => {
                let html = await response.text();
                // O ENCAIXE: Injeta o private-engine.js antes do fim do body imutável
                const engineTag = '<script src="private-engine.js"></script>';
                const novoHtml = html.replace('</body>', engineTag + '</body>');
                return new Response(novoHtml, { headers: { 'Content-Type': 'text/html' } });
            }).catch(() => caches.match(event.request))
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((response) => response || fetch(event.request))
        );
    }
});
/* Fim da volumetria de segurança Dallas */
