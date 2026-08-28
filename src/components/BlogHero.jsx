import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import InkScene from './InkScene'
import WarmScene from './WarmScene'
import './BlogHero.css'

/**
 * 博客首页 Hero 区组件
 * Easton 风格：eyebrow + 大标题 + 副标题 + 动作按钮（搜索/系列）
 */
function BlogHero() {
  const { t, localePath } = useLanguage()
  const heroActions = t('home.heroActions', { returnObjects: true }) || {}

  return (
    <section className="blog-hero">
      <WarmScene />
      <InkScene />
      <div className="container">
        <div className="blog-hero-content">
          <span className="ed-eyebrow blog-hero-eyebrow">{t('home.heroEyebrow')}</span>
          <h1 className="blog-hero-title">{t('hero.blogTitle')}</h1>
          <p className="blog-hero-subtitle">{t('hero.blogSubtitle')}</p>
          <div className="blog-hero-actions">
            <Link to={localePath('/blog')} className="ed-button ed-button--primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              {heroActions.search}
            </Link>
            <Link to={localePath('/series')} className="ed-button ed-button--outline">
              {heroActions.series}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogHero
