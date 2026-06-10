import React from 'react'
import './Contact.css'

/**
 * 联系方式组件
 * Supabase 风格：极简卡片，清晰层级
 */
function Contact() {
  const contacts = [
    {
      label: '邮箱',
      value: 'contact@qingzao.site',
      href: 'mailto:contact@qingzao.site',
      type: 'email'
    },
    {
      label: 'GitHub',
      value: 'github.com',
      href: 'https://github.com',
      type: 'link'
    }
  ]

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">联系我</h2>
          <p className="section-subtitle">期待与您的交流与合作</p>
        </div>

        <div className="contact-content">
          <p className="contact-lead">
            如果你有任何问题、建议或合作意向，欢迎通过以下方式联系我。
          </p>

          <div className="contact-list">
            {contacts.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="contact-card"
                target={item.type === 'link' ? '_blank' : undefined}
                rel={item.type === 'link' ? 'noopener noreferrer' : undefined}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="contact-info">
                  <span className="contact-label">{item.label}</span>
                  <span className="contact-value">{item.value}</span>
                </div>
                <div className="contact-arrow">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact