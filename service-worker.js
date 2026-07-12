const CACHE_NAME = 'fun-site-v2';

// 安装时预缓存核心页面（只缓存不变的主文件）
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/categories.js',
        '/version.js'
        // 注意：不预缓存 toolsData.js 文件，因为它们会被动态缓存
      ]);
    })
  );
  self.skipWaiting();
});

// 激活时清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  clients.claim();
});

// 核心策略：对 toolsData.js 和 pages 下的文件采用缓存优先
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 工具配置文件：/tools/*/toolsData.js
  if (/\/tools\/[^\/]+\/toolsData\.js$/.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        // 有缓存直接返回，同时后台更新
        const fetchPromise = fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // 工具页面：/tools/*/pages/*.html
  if (/\/tools\/[^\/]+\/pages\/[^\/]+\.html$/.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // 其他请求（主框架、样式等）使用缓存优先
  event.respondWith(
    caches.match(request).then((cached) => {
      return cached || fetch(request);
    })
  );
});
