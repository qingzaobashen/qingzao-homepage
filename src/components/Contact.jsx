import React from 'react'
import './Contact.css'

/**
 * 联系方式组件
 * Intercom 风格：简洁卡片，清晰层级
 */
function Contact() {
  const contacts = [
    {
      label: '邮箱',
      value: 'contact@qingzao.site',
      href: 'mailto:contact@qingzao.site',
      type: 'email',
      desc: '一般咨询与合作'
    },
    {
      label: 'GitHub',
      value: 'github.com/qingzao',
      href: 'https://github.com',
      type: 'link',
      desc: '开源项目与代码'
    }
  ]

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-layout">
          <div className="contact-intro">
            <span className="contact-label">联系我们</span>
            <h2 className="contact-title">
              期待与你的交流
            </h2>
            <p className="contact-desc">
              无论是产品反馈、合作意向，还是单纯想聊聊，
              我们都欢迎你的来信。
            </p>
          </div>

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
                  <span className="contact-type">{item.label}</span>
                  <span className="contact-value">{item.value}</span>
                  <span className="contact-note">{item.desc}</span>
                </div>
                <div className="contact-arrow">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 15L13 10L7 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
