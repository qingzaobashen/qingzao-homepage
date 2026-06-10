import React from 'react'
import './Hero.css'

/**
 * Intercom 风格 Hero 组件
 * 全宽大图背景 + 白色标题文字 + 底部产品浮层
 */
function Hero() {
  return (
    <section className="hero">
      {/* 背景大图 */}
      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="山景背景"
          className="hero-bg-img"
        />
        {/* 渐变遮罩 - 底部渐暗以突出文字 */}
        <div className="hero-bg-overlay" />
      </div>

      {/* 中央内容 */}
      <div className="hero-content">
        <h1 className="hero-title">
          创造实用工具
          <br />
          让工作更简单
        </h1>
        <p className="hero-subtitle">
          轻造专注于打造简洁高效的数字产品，帮助用户解决实际问题
        </p>
        <div className="hero-actions">
          <a href="#products" className="hero-btn hero-btn-primary">
            探索产品
          </a>
          <a href="#about" className="hero-btn hero-btn-secondary">
            了解更多
          </a>
        </div>
      </div>

      {/* 底部产品浮层 */}
      <div className="hero-float">
        <div className="float-card">
          <div className="float-card-header">
            <div className="float-dot red" />
            <div className="float-dot yellow" />
            <div className="float-dot green" />
          </div>
          <div className="float-card-body">
            <div className="float-line" />
            <div className="float-line short" />
            <div className="float-grid">
              <div className="float-grid-item" />
              <div className="float-grid-item" />
              <div className="float-grid-item" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
