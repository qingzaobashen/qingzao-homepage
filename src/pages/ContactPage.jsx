/**
 * 联系我们独立页面组件
 * 独立路由页面，URL: /contact
 * 复用首页 Contact 组件内容并扩展
 */

import React, { useEffect } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import SEO from '../components/SEO'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import './ContactPage.css'

/**
 * 联系我们独立页面
 * @returns {JSX.Element} 联系我们页面
 */
function ContactPage() {
  const { t } = useLanguage()

  /** 页面加载时滚动到顶部 */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title={t('contactPage.title')}
        description={t('contactPage.subtitle')}
        canonical="/contact"
      />
      <Header />
      <main className="contact-page">
        <div className="container">
          {/* 页面头部 */}
          <div className="contact-page-header">
            <h1 className="contact-page-title">{t('contactPage.title')}</h1>
            <p className="contact-page-subtitle">{t('contactPage.subtitle')}</p>
          </div>

          {/* 复用首页 Contact 组件的核心内容 */}
          <Contact />

          {/* 扩展内容：常见问题 */}
          <div className="contact-page-faq">
            <h2 className="contact-section-title">{t('contactPage.faq.title')}</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>{t('contactPage.faq.q1.title')}</h3>
                <p>{t('contactPage.faq.q1.answer')}</p>
              </div>
              <div className="faq-item">
                <h3>{t('contactPage.faq.q2.title')}</h3>
                <p>{t('contactPage.faq.q2.answer')}</p>
              </div>
              <div className="faq-item">
                <h3>{t('contactPage.faq.q3.title')}</h3>
                <p>{t('contactPage.faq.q3.answer')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ContactPage
