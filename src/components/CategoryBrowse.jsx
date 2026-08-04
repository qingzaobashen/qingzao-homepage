import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import './CategoryBrowse.css'

/**
 * 首页按分类浏览组件
 * Easton 风格：分类卡片 + 子分类链接 + 查看全部
 */
function CategoryBrowse() {
  const { t, localePath } = useLanguage()
  const categories = t('home.categories', { returnObjects: true }) || []

  if (!Array.isArray(categories) || categories.length === 0) {
    return null
  }

  const icons = {
    renovation: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
        <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>
      </svg>
    ),
    'smart-home': (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 11l9-8 9 8"/>
        <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>
        <circle cx="12" cy="15" r="2.5"/>
      </svg>
    ),
    'image-tools': (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
    ),
  }

  return (
    <section className="category-browse">
      <div className="container">
        <div className="ed-section-header">
          <div>
            <span className="ed-eyebrow">Topics</span>
            <h2 className="ed-section-header-title">{t('home.categoriesTitle')}</h2>
            <p className="ed-section-header-desc">{t('home.categoriesDesc')}</p>
          </div>
          <Link to={localePath('/category')} className="ed-link-more">
            {t('home.viewCategory')}
            <span className="arrow">→</span>
          </Link>
        </div>
        <div className="category-browse-grid">
          {categories.map((cat) => (
            <div key={cat.key} className="category-card">
              <div className="category-card-head">
                <span className="category-card-icon">{icons[cat.key] || icons.renovation}</span>
                <div>
                  <h3 className="category-card-title">{cat.title}</h3>
                  <span className="category-card-count">
                    {cat.postCategories && cat.postCategories.length > 0 ? cat.postCategories.join(' · ') : ''}
                  </span>
                </div>
              </div>
              <p className="category-card-desc">{cat.desc}</p>
              <ul className="category-card-subs">
                {(cat.subs || []).map((sub, subIndex) => (
                  <li key={subIndex}>
                    <Link to={localePath(sub.href)}>{sub.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryBrowse
