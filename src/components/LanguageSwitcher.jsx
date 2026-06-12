/**
 * 语言切换组件
 * 提供用户界面语言切换功能
 */

import React, { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import './LanguageSwitcher.css'

/**
 * 语言切换组件
 * 显示当前语言并提供切换选项
 *
 * @returns 语言切换组件
 */
function LanguageSwitcher() {
  const { language, setLanguage, availableLanguages, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  /**
   * 处理语言切换
   * @param langCode - 语言代码
   */
  const handleLanguageChange = (langCode) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  /**
   * 获取当前语言的显示名称
   */
  const getCurrentLanguageName = () => {
    const currentLang = availableLanguages.find(lang => lang.code === language)
    return currentLang ? currentLang.name : language
  }

  return (
    <div className="language-switcher">
      <button
        className="language-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('common.language.zh')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <svg
          className="language-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="language-text">{getCurrentLanguageName()}</span>
        <svg
          className="language-arrow"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="language-dropdown"
          role="listbox"
          aria-label="选择语言"
        >
          {availableLanguages.map((lang) => (
            <li
              key={lang.code}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              role="option"
              aria-selected={language === lang.code}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="option-name">{lang.name}</span>
              {language === lang.code && (
                <svg
                  className="option-check"
                  width="16"
                  height="16"
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

export default LanguageSwitcher