import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../hooks/useTheme'
import LanguageSwitcher from './LanguageSwitcher'
import './Header.css'

/**
 * 页面头部导航组件
 * Easton 风格：sticky 毛玻璃 + 分类下拉 + 搜索 + 三态主题切换 + 移动端抽屉
 */
function Header() {
  const { t, localePath } = useLanguage()
  const { theme, setTheme, availableThemes, resolvedTheme } = useTheme()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const categoryRef = useRef(null)
  const themeRef = useRef(null)

  const categories = t('home.categories', { returnObjects: true }) || []
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/en'
    return location.pathname === path || location.pathname === `/en${path}` || location.pathname.startsWith(`${path}/`) || location.pathname.startsWith(`/en${path}/`)
  }

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsCategoryOpen(false)
    setIsThemeOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false)
      }
      if (themeRef.current && !themeRef.current.contains(e.target)) {
        setIsThemeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleThemeChange = (next) => {
    setTheme(next)
    setIsThemeOpen(false)
  }

  const getThemeIcon = () => {
    const resolved = theme === 'system' ? resolvedTheme : theme
    if (resolved === 'dark') {
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )
    }
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    )
  }

  const themeOptions = {
    light: {
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      ),
    },
    dark: {
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      ),
    },
    system: {
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
      ),
    },
  }

  return (
    <header className="header">
      <div className="header-inner">
        {/* 左侧 Logo */}
        <Link to={localePath('/')} className="header-logo">
          <span className="header-logo-mark" aria-hidden="true">青</span>
          <span className="header-logo-text">{t('header.logo')}</span>
        </Link>

        {/* 中间导航链接 */}
        <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link
            to={localePath('/')}
            className={isActive('/') ? 'active' : ''}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('header.nav.home')}
          </Link>
          <Link
            to={localePath('/blog')}
            className={isActive('/blog') ? 'active' : ''}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('header.nav.blog')}
          </Link>
          <Link
            to={localePath('/series')}
            className={isActive('/series') ? 'active' : ''}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('header.nav.series')}
          </Link>

          {/* 分类下拉（桌面端） */}
          <div className="header-category" ref={categoryRef}>
            <button
              className={`header-category-btn ${isActive('/category') ? 'active' : ''}`}
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              aria-expanded={isCategoryOpen}
              aria-haspopup="true"
            >
              {t('header.nav.category')}
              <svg
                className={`header-category-arrow ${isCategoryOpen ? 'open' : ''}`}
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
            {isCategoryOpen && (
              <div className="header-mega-menu">
                <div className="mega-menu-grid">
                  {categories.map((cat) => (
                    <div key={cat.key} className="mega-menu-col">
                      <Link
                        to={localePath('/blog')}
                        className="mega-menu-title"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {cat.title}
                      </Link>
                      <ul className="mega-menu-subs">
                        {(cat.subs || []).map((sub, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={localePath(sub.href)}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to={localePath('/about')}
            className={isActive('/about') ? 'active' : ''}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('header.nav.about')}
          </Link>

          {/* 移动端展开面板专属：搜索 + 主题 + 语言 + CTA，桌面端隐藏 */}
          <div className="header-nav-extra">
            <LanguageSwitcher />
            <div className="header-theme-mobile">
              <span className="header-theme-mobile-label">{t('header.themeAriaLabel')}</span>
              <div className="header-theme-mobile-options">
                {availableThemes.map((opt) => (
                  <button
                    key={opt.id}
                    className={`header-theme-mobile-option ${theme === opt.id ? 'active' : ''}`}
                    onClick={() => handleThemeChange(opt.id)}
                  >
                    {themeOptions[opt.id].icon}
                    {t(`header.theme.${opt.id}`)}
                  </button>
                ))}
              </div>
            </div>
            <Link to={localePath('/blog')} className="btn-nav btn-nav-primary" onClick={() => setIsMobileMenuOpen(false)}>
              {t('header.cta')}
            </Link>
          </div>
        </nav>

        {/* 右侧按钮（桌面端使用，移动端隐藏） */}
        <div className={`header-right ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link
            to={localePath('/blog')}
            className="header-icon-btn"
            aria-label={t('header.searchAriaLabel')}
            title={t('header.searchAriaLabel')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </Link>

          <LanguageSwitcher />

          {/* 主题切换下拉 */}
          <div className="header-theme" ref={themeRef}>
            <button
              className="header-icon-btn"
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              aria-label={t('header.themeAriaLabel')}
              aria-expanded={isThemeOpen}
              title={t('header.themeAriaLabel')}
            >
              {getThemeIcon()}
            </button>
            {isThemeOpen && (
              <ul className="header-theme-menu">
                {availableThemes.map((opt) => (
                  <li
                    key={opt.id}
                    className={`header-theme-option ${theme === opt.id ? 'active' : ''}`}
                    onClick={() => handleThemeChange(opt.id)}
                  >
                    {themeOptions[opt.id].icon}
                    <span>{t(`header.theme.${opt.id}`)}</span>
                    {theme === opt.id && (
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

          <Link to={localePath('/blog')} className="btn-nav btn-nav-primary">{t('header.cta')}</Link>
        </div>

        {/* 移动端菜单按钮 */}
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={t('header.menuAriaLabel')}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
