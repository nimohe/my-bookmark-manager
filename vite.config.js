import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 添加这一行：使用相对路径或指定仓库名
  base: '/my-bookmark-manager/', 
})
