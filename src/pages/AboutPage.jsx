/**
 * 关于我们独立页面组件
 * 独立路由页面，URL: /about
 * 复用首页 About 组件内容并扩展
 */

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import SEO from '../components/SEO'
import Header from '../components/Header'
import Footer from '../components/Footer'
import About from '../components/About'
import './AboutPage.css'

/**
 * 关于我们独立页面
 * @returns {JSX.Element} 关于我们页面
 */
function AboutPage() {
  const { t } = useLanguage()

  /** 页面加载时滚动到顶部 */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title={t('aboutPage.title')}
        description={t('aboutPage.subtitle')}
        canonical="/about"
      />
      <Header />
      <main className="about-page">
        <div className="container">
          {/* 页面头部 */}
          <div className="about-page-header">
            <h1 className="about-page-title">{t('aboutPage.title')}</h1>
            <p className="about-page-subtitle">{t('aboutPage.subtitle')}</p>
          </div>

          {/* 复用首页 About 组件的核心内容 */}
          <About />

          {/* 扩展内容：团队价值观 */}
          <div className="about-page-values">
            <h2 className="about-section-title">{t('aboutPage.values.title')}</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🎯</div>
                <h3>{t('aboutPage.values.userFirst.title')}</h3>
                <p>{t('aboutPage.values.userFirst.desc')}</p>
              </div>
              <div className="value-card">
                <div className="value-icon">💡</div>
                <h3>{t('aboutPage.values.simpleDesign.title')}</h3>
                <p>{t('aboutPage.values.simpleDesign.desc')}</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🔄</div>
                <h3>{t('aboutPage.values.continuousIteration.title')}</h3>
                <p>{t('aboutPage.values.continuousIteration.desc')}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="about-page-cta">
            <p>{t('aboutPage.cta.text')}</p>
            <Link to="/blog" className="about-page-cta-btn">{t('aboutPage.cta.btn')}</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default AboutPage
