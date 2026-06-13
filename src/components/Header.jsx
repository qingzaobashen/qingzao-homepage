import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import LanguageSwitcher from './LanguageSwitcher'
import './Header.css'

/**
 * 页面头部导航组件
 * 首页：fixed + 透明背景，滚动后变白
 * 内页：relative + 白色背景，不跟随滚动
 * 支持多语言切换
 */
function Header() {
  const { t } = useLanguage()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // 仅首页监听滚动事件
    if (!isHome) return
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  const headerClass = `header ${isHome ? 'home' : 'inner'} ${isScrolled ? 'scrolled' : ''}`

  return (
    <header className={headerClass}>
      <div className="header-inner">
        {/* 左侧 Logo */}
        <Link to="/" className="header-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12h8M12 8v8"/>
          </svg>
          <span>{t('header.logo')}</span>
        </Link>

        {/* 中间导航链接 */}
        <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#products" onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.products')}</a>
          {isHome ? (
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.about')}</a>
          ) : (
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.about')}</Link>
          )}
          {isHome ? (
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.contact')}</a>
          ) : (
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.contact')}</Link>
          )}
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.blog')}</Link>
        </nav>

        {/* 右侧按钮 */}
        <div className={`header-right ${isMobileMenuOpen ? 'open' : ''}`}>
          <LanguageSwitcher />
          <a href="#products" className="btn-nav btn-nav-primary">{t('header.cta')}</a>
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
