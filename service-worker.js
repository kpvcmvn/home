// 🧹 Service Worker sạch — không cache, luôn tải mới nhất
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing new version...');
  // Bỏ qua bước chờ, kích hoạt ngay lập tức
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating and cleaning up old cache...');
  event.waitUntil(
    (async () => {
      // Xóa toàn bộ cache cũ
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((cache) => caches.delete(cache)));

      // Hủy đăng ký service worker cũ (nếu có)
      const registrations = await self.registration.unregister();
      console.log('[Service Worker] Unregistered old SW:', registrations);

      // Làm mới tất cả tab đang mở
      const clientsList = await self.clients.matchAll({ type: 'window' });
      clientsList.forEach((client) => client.navigate(client.url));
    })()
  );
});

// ⚡ Mặc định: không cache gì cả, luôn lấy dữ liệu trực tiếp từ mạng
self.addEventListener('fetch', (event) => {
  // Chỉ xử lý yêu cầu GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        // Nếu offline, fallback tạm sang index.html (tùy chọn)
        return caches.match('./index.html');
      })
  );
});
