/**
 * 系列详情页组件
 * 展示系列内的所有文章列表
 * URL: /series/:seriesSlug
 */

import React, { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import SEO from '../components/SEO'
import Header from '../components/Header'
import Footer from '../components/Footer'
import seriesZh from '../data/series/series-zh.json'
import seriesEn from '../data/series/series-en.json'
import postsZh from '../data/posts/posts-zh.json'
import postsEn from '../data/posts/posts-en.json'
import './SeriesDetailPage.css'

/**
 * 旧系列 slug -> 新系列 slug
 * 三个旧系列（验收标准、主材选购、机制生活、图片处理）合并为三大核心系列后，
 * 保留旧链接可跳转，避免已收录/已分享的地址变成 404。
 */
const LEGACY_SERIES_SLUGS = {
  'renovation-acceptance': 'decoration-full-process',
  'main-materials-guide': 'decoration-full-process',
  'smart-home': 'life-and-mind',
  'image-processing': 'tools-and-tech',
}

/**
 * 系列详情页组件
 * @returns {JSX.Element} 系列详情页
 */
function SeriesDetailPage() {
  const { seriesSlug } = useParams()
  const { language, localePath } = useLanguage()
  const [series, setSeries] = useState(null)
  const [articles, setArticles] = useState([])

  // 旧系列地址统一重定向到合并后的新系列
  const targetSlug = LEGACY_SERIES_SLUGS[seriesSlug] || seriesSlug

  useEffect(() => {
    const seriesData = language === 'zh-CN' ? seriesZh : seriesEn
    const postsData = language === 'zh-CN' ? postsZh : postsEn

    const foundSeries = seriesData.find(s => s.slug === targetSlug)
    setSeries(foundSeries || null)

    if (foundSeries) {
      // 按 series.order 顺序查找文章
      const orderedArticles = foundSeries.order
        .map(slug => postsData.find(p => p.slug === slug))
        .filter(Boolean)
      setArticles(orderedArticles)
    } else {
      setArticles([])
    }
  }, [targetSlug, language])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [targetSlug])

  // 旧系列地址：直接跳转对应的新系列
  if (LEGACY_SERIES_SLUGS[seriesSlug]) {
    return <Navigate to={localePath(`/series/${targetSlug}`)} replace />
  }

  // 系列未找到
  if (!series) {
    return (
      <>
        <SEO title={language === 'zh-CN' ? '系列未找到' : 'Series Not Found'} canonical={localePath('/series')} />
        <Header />
        <div className="series-detail-page">
          <div className="container">
            <div className="series-not-found">
              <h1>{language === 'zh-CN' ? '系列未找到' : 'Series Not Found'}</h1>
              <p>
                {language === 'zh-CN'
                  ? '抱歉，您访问的系列不存在。'
                  : 'Sorry, the series you are looking for does not exist.'
                }
              </p>
              <Link to={localePath('/series')} className="back-to-series">
                {language === 'zh-CN' ? '← 返回系列列表' : '← Back to Series'}
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(language === 'zh-CN' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <SEO
        title={series.title}
        description={series.description}
        canonical={localePath(`/series/${series.slug}`)}
      />
      <Header />
      <div className="series-detail-page">
        {/* 面包屑 */}
        <section className="series-detail-breadcrumb">
          <div className="container">
            <Link to={localePath('/')}>{language === 'zh-CN' ? '首页' : 'Home'}</Link>
            <span className="breadcrumb-separator">/</span>
            <Link to={localePath('/series')}>{language === 'zh-CN' ? '系列' : 'Series'}</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{series.title}</span>
          </div>
        </section>

        {/* 系列头部 */}
        <section className="series-detail-header">
          <div className="container">
            <span className="series-detail-category">{series.category}</span>
            <h1 className="series-detail-title">{series.title}</h1>
            <p className="series-detail-desc">{series.description}</p>
            <span className="series-detail-count">
              {language === 'zh-CN' ? `共 ${articles.length} 篇文章` : `${articles.length} articles`}
            </span>
          </div>
        </section>

        {/* 文章列表 */}
        <section className="series-detail-content">
          <div className="container">
            <div className="series-articles-list">
              {articles.map((article, index) => (
                <article key={index} className="series-article-item">
                  <div className="series-article-number">{String(index + 1).padStart(2, '0')}</div>
                  <div className="series-article-body">
                    <div className="series-article-meta">
                      <span className="series-article-date">{formatDate(article.date)}</span>
                    </div>
                    <h2 className="series-article-title">
                      <Link to={localePath(`/blog/${article.slug}`)}>{article.title}</Link>
                    </h2>
                    <p className="series-article-excerpt">{article.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 返回链接 */}
        <section className="series-detail-footer">
          <div className="container">
            <Link to={localePath('/series')} className="back-to-series">
              {language === 'zh-CN' ? '← 返回系列列表' : '← Back to Series'}
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default SeriesDetailPage
