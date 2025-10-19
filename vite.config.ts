import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Sửa lại đường dẫn base để khớp với tên repository của bạn: 'home'
  base: '/home/', 
})