import React from 'react'
import './Footer.css'

/**
 * 页脚组件
 * Supabase 风格：白底灰字，简洁链接分组
 */
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-dot"></span>
            轻造
          </div>
          <p className="footer-desc">创造实用的数字产品</p>
        </div>

        <div className="footer-nav">
          <div className="nav-group">
            <h4 className="nav-title">产品</h4>
            <a
              href="https://decoration.qingzao.site"
              target="_blank"
              rel="noopener noreferrer"
            >
              装修导图
            </a>
          </div>

          <div className="nav-group">
            <h4 className="nav-title">导航</h4>
            <a href="#products">产品列表</a>
            <a href="#about">关于我</a>
            <a href="#contact">联系方式</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© {currentYear} qingzao.site 版权所有</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer