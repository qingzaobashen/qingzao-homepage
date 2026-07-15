/**
 * 产品展示独立页面组件
 * 独立路由页面，URL: /products
 * 复用首页 Products 组件内容
 */

import React, { useEffect } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import SEO from '../components/SEO'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Products from '../components/Products'
import './ProductsPage.css'

/**
 * 产品展示独立页面
 * @returns {JSX.Element} 产品页面
 */
function ProductsPage() {
  const { t, localePath } = useLanguage()

  /** 页面加载时滚动到顶部 */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title={t('productsPage.title')}
        description={t('productsPage.description')}
        canonical={localePath('/products')}
        alternates={{
          'zh-CN': '/products',
          'en-US': '/en/products',
          'x-default': '/products',
        }}
      />
      <Header />
      <main className="products-page">
        <div className="container">
          {/* 页面头部 */}
          <div className="products-page-header">
            <h1 className="products-page-title">{t('productsPage.title')}</h1>
            <p className="products-page-subtitle">{t('productsPage.subtitle')}</p>
          </div>

          {/* 复用首页 Products 组件的核心内容 */}
          <Products />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ProductsPage