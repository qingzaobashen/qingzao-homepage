import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import './Footer.css'

/**
 * 页脚组件
 * Easton 风格：品牌 + 社交 + 三栏导航 + 工具推广条 + 版权与法律链接
 */
function Footer() {
  const { t, localePath } = useLanguage()
  const currentYear = new Date().getFullYear()

  const navGroups = ['navigation', 'resources', 'legal']

  const socialIcons = {
    github: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.26 5.66.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
      </svg>
    ),
    twitter: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z"/>
      </svg>
    ),
    rss: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83C19.56 11.64 12.36 4.44 4 4.44zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9zM4 19.06a2.06 2.06 0 1 0 0-4.12 2.06 2.06 0 0 0 0 4.12z"/>
      </svg>
    ),
  }

  return (
    <footer className="footer">
      <div className="container">
        {/* 工具推广条 */}
        <div className="footer-tools">
          <div className="footer-tools-text">
            <h3 className="footer-tools-title">{t('footer.toolsPromo.title')}</h3>
            <p className="footer-tools-desc">{t('footer.toolsPromo.desc')}</p>
          </div>
          <a href="https://decoration.qingzao.site" target="_blank" rel="noopener noreferrer" className="ed-button ed-button--primary footer-tools-cta">
            {t('footer.toolsPromo.cta')}
          </a>
        </div>

        {/* 品牌 + 导航 */}
        <div className="footer-top">
          <div className="footer-brand">
            <Link to={localePath('/')} className="footer-logo">
              <span className="footer-logo-mark" aria-hidden="true">青</span>
              <span>{t('footer.brand.logo')}</span>
            </Link>
            <p className="footer-desc">
              {t('footer.brand.desc')}
            </p>
            <div className="footer-social">
              {Object.keys(socialIcons).map((key) => (
                <a
                  key={key}
                  href="#"
                  className="footer-social-link"
                  aria-label={t(`footer.social.${key}`)}
                  title={t(`footer.social.${key}`)}
                  onClick={(e) => e.preventDefault()}
                >
                  {socialIcons[key]}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-nav">
            {navGroups.map((group) => (
              <div key={group} className="footer-group">
                <h4 className="footer-group-title">{t(`footer.nav.${group}.title`)}</h4>
                <ul className="footer-group-links">
                  {(t(`footer.nav.${group}.links`, { returnObjects: true }) || []).map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.href.startsWith('/') ? (
                        <Link to={localePath(link.href)}>{link.label}</Link>
                      ) : (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 底部版权 */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="footer-legal">
            <Link to={localePath('/privacy')}>{t('legal.privacy.title')}</Link>
            <Link to={localePath('/terms')}>{t('legal.terms.title')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
