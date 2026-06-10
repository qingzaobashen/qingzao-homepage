import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite 配置文件
 * 配置 React 插件和构建输出目录
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})