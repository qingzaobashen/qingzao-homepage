import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import './FeaturedSeries.css'

/**
 * 首页精选系列组件
 * Easton 风格：大图卡片 + 标签 + 描述 + 查看全部
 */
function FeaturedSeries() {
  const { t, localePath } = useLanguage()
  const seriesList = t('home.featuredSeries', { returnObjects: true }) || []

  if (!Array.isArray(seriesList) || seriesList.length === 0) {
    return null
  }

  return (
    <section className="featured-series">
      <div className="container">
        <div className="ed-section-header">
          <div>
            <span className="ed-eyebrow">Series</span>
            <h2 className="ed-section-header-title">{t('home.featuredSeriesTitle')}</h2>
            <p className="ed-section-header-desc">{t('home.featuredSeriesDesc')}</p>
          </div>
          <Link to={localePath('/series')} className="ed-link-more">
            {t('home.viewAllSeries')}
            <span className="arrow">→</span>
          </Link>
        </div>
        <div className="series-grid">
          {seriesList.slice(0, 3).map((series, index) => (
            <Link
              key={index}
              to={localePath(`/series/${series.slug}`)}
              className="series-card"
            >
              <div className="series-card-cover">
                {series.image ? (
                  <img
                    src={series.image}
                    alt={series.title}
                    className="series-card-image"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                ) : (
                  <div className="series-card-cover-placeholder" aria-hidden="true" />
                )}
              </div>
              <div className="series-card-inner">
                <div className="series-card-tags">
                  {(series.tags || []).slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="series-card-tag">{tag}</span>
                  ))}
                </div>
                <h3 className="series-card-title">{series.title}</h3>
                <p className="series-card-desc">{series.description}</p>
                <span className="series-card-cta">
                  {t('home.startFromFirst')}
                  <span className="arrow">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSeries
