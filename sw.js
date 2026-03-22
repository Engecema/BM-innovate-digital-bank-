self.addEventListener('install', (e) => {
  self.skipWaiting(); // Força a atualização imediata do Service Worker
  e.waitUntil(
    caches.open('engecema-private-v2').then((cache) => cache.addAll([
      'index.html',
      'logo.png',
      'private-engine.js',
      'produtos.html'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  // Tenta buscar na rede primeiro para garantir que a Aba de Senha apareça
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
