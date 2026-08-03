import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import './FeaturedSeries.css'

/**
 * 首页精选系列组件
 * 展示 3 个精选系列专题卡片
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
        <h2 className="section-title">{t('home.featuredSeriesTitle')}</h2>
        <div className="series-grid">
          {seriesList.slice(0, 3).map((series, index) => (
            <Link
              key={index}
              to={localePath(`/series/${series.slug}`)}
              className="series-card"
            >
              <div className="series-card-inner">
                <h3 className="series-card-title">{series.title}</h3>
                <span className="series-card-count">{series.count}</span>
                <p className="series-card-desc">{series.description}</p>
                <span className="series-card-cta">{t('home.startFromFirst')} →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSeries
