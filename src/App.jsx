import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { useLanguage } from './hooks/useLanguage'
import SEO from './components/SEO'
import Header from './components/Header'
import AnnouncementBanner from './components/AnnouncementBanner'
import BlogHero from './components/BlogHero'
import FeaturedSeries from './components/FeaturedSeries'
import LatestPosts from './components/LatestPosts'
import Footer from './components/Footer'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import BlogListPage from './pages/BlogListPage'
import BlogPostPage from './pages/BlogPostPage'
import SeriesListPage from './pages/SeriesListPage'
import SeriesDetailPage from './pages/SeriesDetailPage'
import DisclaimerPage from './pages/DisclaimerPage'
import EditorialPage from './pages/EditorialPage'
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
        title={isEn ? 'Qingzao Notes - AI, Dev & Life' : '青枣笔记 — 装修经验、独立开发与生活思考'}
        description={
          isEn
            ? 'Qingzao Notes shares practical insights on home renovation, independent development, AI tools, and life tips.'
            : '青枣笔记分享装修经验、独立开发心得、AI 工具评测和生活思考。'
        }
        canonical={localePath('/')}
      />
      <Header />
      <main>
        <BlogHero />
        <FeaturedSeries />
        {/* 装饰分割线 */}
        <div className="section-divider">
          <span className="section-divider-dot" />
        </div>
        <LatestPosts />
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
          <Route path="/editorial" element={<EditorialPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/series" element={<SeriesListPage />} />
          <Route path="/series/:seriesSlug" element={<SeriesDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* 英文镜像：/en 前缀，内容与中文版一一对应，便于独立索引 */}
          <Route path="/en" element={<HomePage />} />
          <Route path="/en/products" element={<ProductsPage />} />
          <Route path="/en/privacy" element={<PrivacyPage />} />
          <Route path="/en/terms" element={<TermsPage />} />
          <Route path="/en/disclaimer" element={<DisclaimerPage />} />
          <Route path="/en/editorial" element={<EditorialPage />} />
          <Route path="/en/about" element={<AboutPage />} />
          <Route path="/en/contact" element={<ContactPage />} />
          <Route path="/en/blog" element={<BlogListPage />} />
          <Route path="/en/blog/:slug" element={<BlogPostPage />} />
          <Route path="/en/series" element={<SeriesListPage />} />
          <Route path="/en/series/:seriesSlug" element={<SeriesDetailPage />} />
        </Routes>
        <CookieConsent />
      </div>
    </LanguageProvider>
  )
}

export default App