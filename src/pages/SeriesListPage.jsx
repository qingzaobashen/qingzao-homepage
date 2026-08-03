/**
 * 系列列表页组件
 * 展示所有系列专题
 * URL: /series
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import SEO from '../components/SEO'
import Header from '../components/Header'
import Footer from '../components/Footer'
import seriesZh from '../data/series/series-zh.json'
import seriesEn from '../data/series/series-en.json'
import './SeriesListPage.css'

/**
 * 系列列表页组件
 * @returns {JSX.Element} 系列列表页
 */
function SeriesListPage() {
  const { language, localePath } = useLanguage()
  const [series, setSeries] = useState([])

  useEffect(() => {
    const seriesData = language === 'zh-CN' ? seriesZh : seriesEn
    setSeries(seriesData)
  }, [language])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title={language === 'zh-CN' ? '系列专题' : 'Series'}
        description={language === 'zh-CN'
          ? '按主题系统阅读系列文章，从第一篇开始深入。'
          : 'Read series of articles by topic, starting from the first.'
        }
        canonical={localePath('/series')}
      />
      <Header />
      <div className="series-list-page">
        {/* 页面头部 */}
        <section className="series-header">
          <div className="container">
            <h1 className="series-title">
              {language === 'zh-CN' ? '系列专题' : 'Series'}
            </h1>
            <p className="series-subtitle">
              {language === 'zh-CN'
                ? '按主题系统阅读，从第一篇开始深入。'
                : 'Read systematically by topic, starting from the first.'
              }
            </p>
          </div>
        </section>

        {/* 系列卡片列表 */}
        <section className="series-content">
          <div className="container">
            <div className="series-list-grid">
              {series.map((item, index) => (
                <Link
                  key={index}
                  to={localePath(`/series/${item.slug}`)}
                  className="series-list-card"
                >
                  <div className="series-list-card-inner">
                    <span className="series-list-category">{item.category}</span>
                    <h2 className="series-list-card-title">{item.title}</h2>
                    <span className="series-list-count">
                      {language === 'zh-CN' ? `共 ${item.order.length} 篇` : `${item.order.length} posts`}
                    </span>
                    <p className="series-list-desc">{item.description}</p>
                    <span className="series-list-cta">
                      {language === 'zh-CN' ? '从第一篇开始 ->' : 'Start from the first ->'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default SeriesListPage
