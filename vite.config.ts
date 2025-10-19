
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // !!! QUAN TRỌNG: Thay đổi 'TEN_REPO_CUA_BAN' thành tên repository trên GitHub của bạn.
  // Ví dụ: nếu repo của bạn là https://github.com/username/my-app, bạn sẽ đặt base là '/my-app/'
  base: '/home/', 
})