import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { useLanguage } from './hooks/useLanguage'
import SEO from './components/SEO'
import Header from './components/Header'
import AnnouncementBanner from './components/AnnouncementBanner'
import Hero from './components/Hero'
import Products from './components/Products'
import ContentHighlights from './components/ContentHighlights'
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
  const { language, localePath } = useLanguage()
  const isEn = language === 'en-US'
  return (
    <>
      <SEO
        title={isEn ? 'Qingzao Studio - Innovative Renovation & Image Tools' : '青枣工作室 - 创新装修与图片处理工具'}
        description={
          isEn
            ? 'Qingzao Studio offers renovation flow maps and white-background image trimming tools, making renovation and image processing simpler and more efficient.'
            : '青枣工作室提供装修流程导图、白底抠图等实用工具，让装修和图片处理更简单高效。'
        }
        canonical={localePath('/')}
      />
      <Header />
      <main>
        <Hero />
        <Products />
        <ContentHighlights />
        <About />
        <Contact />
      </main>
      <Footer />
      <AnnouncementBanner />
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

          {/* 英文镜像：/en 前缀，内容与中文版一一对应，便于独立索引 */}
          <Route path="/en" element={<HomePage />} />
          <Route path="/en/products" element={<ProductsPage />} />
          <Route path="/en/privacy" element={<PrivacyPage />} />
          <Route path="/en/terms" element={<TermsPage />} />
          <Route path="/en/disclaimer" element={<DisclaimerPage />} />
          <Route path="/en/about" element={<AboutPage />} />
          <Route path="/en/contact" element={<ContactPage />} />
          <Route path="/en/blog" element={<BlogListPage />} />
          <Route path="/en/blog/:slug" element={<BlogPostPage />} />
        </Routes>
        <CookieConsent />
      </div>
    </LanguageProvider>
  )
}

export default App