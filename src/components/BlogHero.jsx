import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import './BlogHero.css'

/**
 * 博客首页 Hero 区组件
 * 展示品牌标语和简短描述
 */
function BlogHero() {
  const { t } = useLanguage()

  return (
    <section className="blog-hero">
      <div className="container">
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">{t('hero.blogTitle')}</h1>
          <p className="blog-hero-subtitle">{t('hero.blogSubtitle')}</p>
        </div>
      </div>
    </section>
  )
}

export default BlogHero
