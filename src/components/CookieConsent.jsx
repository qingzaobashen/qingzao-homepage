/**
 * Cookie 同意横幅组件
 * 首次访问时在底部固定显示，用户接受后存储到 localStorage 不再显示
 */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import './CookieConsent.css'

const STORAGE_KEY = 'qingzao_cookie_consent'

/**
 * Cookie 同意横幅组件
 * @returns {JSX.Element|null} Cookie 同意横幅或 null
 */
function CookieConsent() {
  const { t, localePath } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consented = localStorage.getItem(STORAGE_KEY)
    if (!consented) {
      // 延迟一点显示，避免页面加载瞬间弹出
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  /**
   * 用户点击"接受"按钮
   */
  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-consent" role="alert">
      <div className="cookie-consent-content">
        <p className="cookie-consent-text">
          {t('cookieConsent.text') || '本网站使用 Cookie 以提升用户体验。继续使用本网站即表示您同意我们的 Cookie 使用。'}
        </p>
        <div className="cookie-consent-actions">
          <Link to={localePath('/privacy')} className="cookie-consent-learn-more">
            {t('cookieConsent.learnMore') || '了解更多'}
          </Link>
          <button className="cookie-consent-accept" onClick={handleAccept}>
            {t('cookieConsent.accept') || '接受'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
