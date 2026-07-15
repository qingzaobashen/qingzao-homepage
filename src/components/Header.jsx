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
  const { t, localePath } = useLanguage()
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
        <Link to={localePath('/')} className="header-logo">
          <img src="/favicon.svg" alt="Qingzao Logo" className="header-logo-img" />
          <span>{t('header.logo')}</span>
        </Link>

        {/* 中间导航链接 */}
        <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          {isHome ? (
            <a href="#products" onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.products')}</a>
          ) : (
            <Link to={localePath('/products')} onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.products')}</Link>
          )}
          {isHome ? (
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.about')}</a>
          ) : (
            <Link to={localePath('/about')} onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.about')}</Link>
          )}
          {isHome ? (
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.contact')}</a>
          ) : (
            <Link to={localePath('/contact')} onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.contact')}</Link>
          )}
          <Link to={localePath('/blog')} onClick={() => setIsMobileMenuOpen(false)}>{t('header.nav.blog')}</Link>

          {/* 移动端展开面板专属：语言切换 + CTA 按钮，桌面端隐藏 */}
          <div className="header-nav-extra">
            <LanguageSwitcher />
            {isHome ? (
              <a href="#products" className="btn-nav btn-nav-primary" onClick={() => setIsMobileMenuOpen(false)}>{t('header.cta')}</a>
            ) : (
              <Link to={localePath('/products')} className="btn-nav btn-nav-primary" onClick={() => setIsMobileMenuOpen(false)}>{t('header.cta')}</Link>
            )}
          </div>
        </nav>

        {/* 右侧按钮（桌面端使用，移动端隐藏） */}
        <div className={`header-right ${isMobileMenuOpen ? 'open' : ''}`}>
          <LanguageSwitcher />
          {isHome ? (
            <a href="#products" className="btn-nav btn-nav-primary">{t('header.cta')}</a>
          ) : (
            <Link to={localePath('/products')} className="btn-nav btn-nav-primary">{t('header.cta')}</Link>
          )}
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
