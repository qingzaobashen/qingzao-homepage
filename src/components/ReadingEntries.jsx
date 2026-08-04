import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import './ReadingEntries.css'

/**
 * 首页阅读入口组件
 * Easton 风格：三卡片（最新文章 / 系列 / 分类），带图标
 */
function ReadingEntries() {
  const { t, localePath } = useLanguage()
  const entries = t('home.readingEntries', { returnObjects: true }) || []

  if (!Array.isArray(entries) || entries.length === 0) {
    return null
  }

  const icons = {
    latest: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 8v4l3 3"/>
        <circle cx="12" cy="12" r="9"/>
      </svg>
    ),
    series: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    category: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  }

  return (
    <section className="reading-entries">
      <div className="container">
        <div className="ed-section-header">
          <div>
            <h2 className="ed-section-header-title">{t('home.readingEntriesTitle')}</h2>
            <p className="ed-section-header-desc">{t('home.readingEntriesDesc')}</p>
          </div>
        </div>
        <div className="reading-entries-grid">
          {entries.map((entry) => (
            <Link
              key={entry.key}
              to={localePath(entry.href)}
              className="reading-entry-card"
            >
              <span className="reading-entry-icon">{icons[entry.key] || icons.latest}</span>
              <h3 className="reading-entry-title">{entry.title}</h3>
              <p className="reading-entry-desc">{entry.desc}</p>
              <span className="reading-entry-cta">
                {entry.cta}
                <span className="arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReadingEntries
