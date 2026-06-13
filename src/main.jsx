import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

/**
 * 应用入口文件
 * 渲染主应用组件到 DOM
 * 使用 BrowserRouter 支持 SPA 路由
 * 使用 HelmetProvider 支持动态 Meta 标签
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)