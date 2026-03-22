/* INJEÇÃO DE SEGURANÇA ENGECEMA - FOCO: BOTÃO AZUL (OK) */
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // Intercepta a chamada do admin.html (feita pelo botão azul imutável)
    if (url.pathname.endsWith('admin.html')) {
        event.respondWith(
            fetch('produção.html').catch(() => caches.match('produção.html'))
        );
    }
});

// Força a atualização do Service Worker para aplicar a mudança imediatamente
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });
