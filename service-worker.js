// // 🧹 Service Worker sạch — không cache, luôn tải mới nhất
// self.addEventListener('install', (event) => {
//   console.log('[Service Worker] Installing new version...');
//   // Bỏ qua bước chờ, kích hoạt ngay lập tức
//   self.skipWaiting();
// });

// self.addEventListener('activate', (event) => {
//   console.log('[Service Worker] Activating and cleaning up old cache...');
//   event.waitUntil(
//     (async () => {
//       // Xóa toàn bộ cache cũ
//       const cacheNames = await caches.keys();
//       await Promise.all(cacheNames.map((cache) => caches.delete(cache)));

//       // Hủy đăng ký service worker cũ (nếu có)
//       const registrations = await self.registration.unregister();
//       console.log('[Service Worker] Unregistered old SW:', registrations);

//       // Làm mới tất cả tab đang mở
//       const clientsList = await self.clients.matchAll({ type: 'window' });
//       clientsList.forEach((client) => client.navigate(client.url));
//     })()
//   );
// });

// // ⚡ Mặc định: không cache gì cả, luôn lấy dữ liệu trực tiếp từ mạng
// self.addEventListener('fetch', (event) => {
//   // Chỉ xử lý yêu cầu GET
//   if (event.request.method !== 'GET') return;

//   event.respondWith(
//     fetch(event.request)
//       .then((response) => {
//         return response;
//       })
//       .catch(() => {
//         // Nếu offline, fallback tạm sang index.html (tùy chọn)
//         return caches.match('./index.html');
//       })
//   );
// });


// 🧹 Service Worker sạch
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing new version...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating and cleaning up old cache...');
  event.waitUntil(
    (async () => {
      // Chỉ xóa toàn bộ cache cũ là đủ
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((cache) => caches.delete(cache)));
      console.log('[Service Worker] All old caches cleared.');

      // Tải lại các tab
      const clientsList = await self.clients.matchAll({ type: 'window' });
      clientsList.forEach((client) => client.navigate(client.url));
    })()
  );
});

// ⚡ Luôn lấy dữ liệu từ mạng (network first)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // Luôn thử lấy từ mạng trước
  event.respondWith(fetch(event.request)); 
  
  // Chúng ta thậm chí không cần .catch() 
  // nếu bạn không muốn hỗ trợ offline.
  // Điều này đảm bảo 100% là dữ liệu mới.
});