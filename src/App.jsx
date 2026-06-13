import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import './App.css'

/**
 * 首页布局组件
 * 包含 Header、主要内容区、Footer
 */
function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

/**
 * 工作室主页主应用组件
 * 展示工作室介绍、产品列表、联系方式等信息
 * 集成多语言支持与 SPA 路由
 */
function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </div>
    </LanguageProvider>
  )
}

export default App