import React, { useState, useEffect } from 'react'
import './Header.css'

/**
 * 页面头部导航组件
 * COSMOS 风格：深色背景，居中浮动导航栏
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
        {/* 左侧 Logo + 链接 */}
        <div className="header-left">
          <a href="/" className="header-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
          </a>
          <nav className="header-nav">
            <a href="#products">产品</a>
            <a href="#about">关于</a>
          </nav>
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

        {/* 右侧按钮 */}
        <div className={`header-right ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#contact" className="btn-nav btn-nav-dark">联系</a>
          <a href="#products" className="btn-nav btn-nav-light">查看产品</a>
        </div>
      </div>
    </header>
  )
}

export default Header