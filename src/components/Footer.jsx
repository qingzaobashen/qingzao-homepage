import React from 'react'
import './Footer.css'

/**
 * 页脚组件
 * Intercom 风格：深色背景，多列链接，清晰分层
 */
function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: '产品',
      links: [
        { label: '装修导图', href: 'https://decoration.qingzao.site' },
        { label: '功能介绍', href: '#products' },
        { label: '使用指南', href: '#' },
      ]
    },
    {
      title: '公司',
      links: [
        { label: '关于我们', href: '#about' },
        { label: '联系方式', href: '#contact' },
        { label: '加入我们', href: '#' },
      ]
    },
    {
      title: '资源',
      links: [
        { label: '博客', href: '#' },
        { label: 'GitHub', href: 'https://github.com' },
        { label: '更新日志', href: '#' },
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
              <span>青枣</span>
            </a>
            <p className="footer-desc">
              创造实用工具，让工作更简单
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
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
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
            © {currentYear} 青枣. 保留所有权利.
          </p>
          <div className="footer-legal">
            <a href="#">隐私政策</a>
            <a href="#">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
