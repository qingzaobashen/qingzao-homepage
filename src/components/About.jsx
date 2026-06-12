import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import './About.css'

/**
 * 关于/理念组件
 * Intercom 风格：公开信式大段文字 + 右侧装饰插画
 * 支持多语言显示
 */
function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-layout">
          {/* 左侧文字内容 */}
          <div className="about-letter">
            <span className="letter-label">{t('about.label')}</span>
            <h2 className="letter-title">
              {t('about.title')}
            </h2>
            <div className="letter-body">
              <p>
                {t('about.paragraphs.p1')}
              </p>
              <p>
                {t('about.paragraphs.p2')}
              </p>
              <p>
                {t('about.paragraphs.p3')}
              </p>
            </div>
            <div className="letter-signature">
              <div className="signature-avatar">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                  alt={t('about.signature.name')}
                />
              </div>
              <div className="signature-info">
                <span className="signature-name">{t('about.signature.name')}</span>
                <span className="signature-role">{t('about.signature.role')}</span>
              </div>
            </div>
          </div>

          {/* 右侧装饰 */}
          <div className="about-visual">
            <div className="visual-card">
              <div className="visual-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="40" cy="40" r="30" />
                  <path d="M40 20v40M20 40h40" />
                  <circle cx="40" cy="40" r="12" />
                </svg>
              </div>
              <div className="visual-text">
                <span className="visual-number">01</span>
                <span className="visual-desc">{t('about.visuals.discover')}</span>
              </div>
            </div>
            <div className="visual-card visual-card-offset">
              <div className="visual-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="20" y="20" width="40" height="40" rx="4" />
                  <path d="M28 40h24M40 28v24" />
                </svg>
              </div>
              <div className="visual-text">
                <span className="visual-number">02</span>
                <span className="visual-desc">{t('about.visuals.refine')}</span>
              </div>
            </div>
            <div className="visual-card">
              <div className="visual-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 50l10-20 10 10 20-30 10 40H20z" />
                </svg>
              </div>
              <div className="visual-text">
                <span className="visual-number">03</span>
                <span className="visual-desc">{t('about.visuals.iterate')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
