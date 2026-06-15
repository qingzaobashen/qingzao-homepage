import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import SEO from './components/SEO'
import Header from './components/Header'
import AnnouncementBanner from './components/AnnouncementBanner'
import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import BlogListPage from './pages/BlogListPage'
import BlogPostPage from './pages/BlogPostPage'
import DisclaimerPage from './pages/DisclaimerPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProductsPage from './pages/ProductsPage'
import NotFoundPage from './pages/NotFoundPage'
import CookieConsent from './components/CookieConsent'
import './App.css'

/**
 * 首页布局组件
 * 包含 Header、公告横幅、主要内容区、Footer
 */
function HomePage() {
  return (
    <>
      <SEO
        title="青枣工作室 - 创新装修与图片处理工具"
        description="青枣工作室提供装修流程导图、白底抠图等实用工具，让装修和图片处理更简单高效。"
        canonical="/"
      />
      <Header />
      <AnnouncementBanner />
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
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <CookieConsent />
      </div>
    </LanguageProvider>
  )
}

export default App