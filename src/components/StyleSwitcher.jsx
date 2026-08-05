import React, { useState, useRef, useEffect } from 'react'
import { useStyle } from '../hooks/useStyle'
import { useLanguage } from '../hooks/useLanguage'
import './StyleSwitcher.css'

/**
 * 风格切换组件
 * 温暖风格 / 山水墨画风格
 */
function StyleSwitcher({ variant = 'dropdown' }) {
  const { t } = useLanguage()
  const { style, setStyle, availableStyles } = useStyle()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getStyleIcon = (id) =>
    id === 'ink' ? (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13.5 3.5 20.5 10.5" />
        <path d="M19 9.5 5.5 23 1 18.5 14.5 5" />
        <path d="m15 8 1 1M18 11l1 1" />
      </svg>
    ) : (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="2.5" />
        <path d="M20 3 4 19" />
        <path d="M12 20 4 12" />
      </svg>
    )

  if (variant === 'inline') {
    return (
      <div className={`style-switcher-inline ${availableStyles[0] ? '' : ''}`}>
        <span className="style-switcher-inline-label">{t('header.styleAriaLabel')}</span>
        <div className="style-switcher-inline-options">
          {availableStyles.map((opt) => (
            <button
              key={opt.id}
              className={`style-switcher-inline-option ${style === opt.id ? 'active' : ''}`}
              onClick={() => setStyle(opt.id)}
            >
              {getStyleIcon(opt.id)}
              {t(`header.style.${opt.id}`)}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="style-switcher" ref={ref}>
      <button
        className="header-icon-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('header.styleAriaLabel')}
        aria-expanded={isOpen}
        title={t('header.styleAriaLabel')}
      >
        {getStyleIcon(style)}
      </button>
      {isOpen && (
        <ul className="style-switcher-menu">
          {availableStyles.map((opt) => (
            <li
              key={opt.id}
              className={`style-switcher-option ${style === opt.id ? 'active' : ''}`}
              onClick={() => {
                setStyle(opt.id)
                setIsOpen(false)
              }}
            >
              {getStyleIcon(opt.id)}
              <span>{t(`header.style.${opt.id}`)}</span>
              {style === opt.id && (
                <svg
                  className="option-check"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StyleSwitcher
