import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import './Footer.css'

/**
 * 页脚组件
 * Intercom 风格：深色背景，多列链接，清晰分层
 * 支持多语言显示，隐私政策和服务条款使用路由跳转
 */
function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: t('footer.nav.products.title'),
      links: [
        { label: t('footer.nav.products.links.decoration'), href: 'https://decoration.qingzao.site' },
        { label: t('footer.nav.products.links.features'), href: '#products' },
        { label: t('footer.nav.products.links.guide'), href: '#' },
      ]
    },
    {
      title: t('footer.nav.company.title'),
      links: [
        { label: t('footer.nav.company.links.about'), href: '/about', isRoute: true },
        { label: t('footer.nav.company.links.contact'), href: '/contact', isRoute: true },
        { label: t('footer.nav.company.links.join'), href: '#' },
      ]
    },
    {
      title: t('footer.nav.resources.title'),
      links: [
        { label: t('footer.nav.resources.links.blog'), href: '/blog', isRoute: true },
        { label: t('footer.nav.resources.links.Twitter'), href: 'https://Twitter.com' },
        { label: t('footer.nav.resources.links.changelog'), href: '#' },
      ]
    }
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* 品牌区 */}
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12h8M12 8v8"/>
              </svg>
              <span>{t('footer.brand.logo')}</span>
            </a>
            <p className="footer-desc">
              {t('footer.brand.desc')}
            </p>
          </div>

          {/* 链接区 */}
          <div className="footer-nav">
            {footerLinks.map((group, index) => (
              <div key={index} className="footer-group">
                <h4 className="footer-group-title">{group.title}</h4>
                <ul className="footer-group-links">
                  {group.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.isRoute ? (
                        <Link to={link.href}>{link.label}</Link>
                      ) : (
                        <a
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
            <Link to="/privacy">{t('footer.legal.privacy')}</Link>
            <Link to="/terms">{t('footer.legal.terms')}</Link>
            <Link to="/disclaimer">{t('footer.legal.disclaimer')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
