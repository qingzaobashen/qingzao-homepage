import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import './Contact.css'

/**
 * 联系方式组件
 * Intercom 风格：简洁卡片，清晰层级
 * 支持多语言显示
 */
function Contact() {
  const { t } = useLanguage()

  const contacts = [
    {
      label: t('contact.items.email.label'),
      value: t('contact.items.email.value'),
      href: 'mailto:xiayiye580@gmail.com',
      type: 'email',
      desc: t('contact.items.email.desc')
    },
    {
      label: t('contact.items.Twitter.label'),
      value: t('contact.items.Twitter.value'),
      href: 'https://Twitter.com',
      type: 'link',
      desc: t('contact.items.Twitter.desc')
    }
  ]

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-layout">
          <div className="contact-intro">
            <span className="contact-label">{t('contact.label')}</span>
            <h2 className="contact-title">
              {t('contact.title')}
            </h2>
            <p className="contact-desc">
              {t('contact.description')}
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
