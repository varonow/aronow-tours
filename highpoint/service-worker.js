const CACHE = 'highpoint-v3';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('highpoint-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
// Always ask the server for the newest copy; the saved copy is only for when there is no signal.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req, { cache: 'no-cache' }).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c).catch(()=>{})); return res; })
              .catch(() => caches.match(req))
  );
});
