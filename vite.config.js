import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite 配置文件
 * 配置 React 插件、开发服务器端口和构建输出目录
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 22333,
    strictPort: false // 如果端口被占用，尝试其他端口
  },
  build: {
    outDir: 'dist'
  }
})