import React, { useState, useEffect } from 'react'
import './Header.css'

/**
 * 页面头部导航组件
 * Intercom 风格：白色背景，简洁导航栏，滚动后添加阴影
 */
function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        {/* 左侧 Logo */}
        <a href="/" className="header-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12h8M12 8v8"/>
          </svg>
          <span>青枣</span>
        </a>

        {/* 中间导航链接 */}
        <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#products" onClick={() => setIsMobileMenuOpen(false)}>产品</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>关于</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>联系</a>
        </nav>

        {/* 右侧按钮 */}
        <div className={`header-right ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#contact" className="btn-nav btn-nav-primary">开始使用</a>
        </div>

        {/* 移动端菜单按钮 */}
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="切换菜单"
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
