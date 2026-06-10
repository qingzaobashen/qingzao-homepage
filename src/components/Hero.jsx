import React from 'react'
import './Hero.css'

/**
 * Intercom 风格 Hero 组件
 * 长图式第一屏：全宽大图背景 + 顶部标题 + 中间过渡文字 + 底部产品界面
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
        {/* 渐变遮罩 - 整体暗化 + 底部加深 */}
        <div className="hero-bg-overlay" />
      </div>

      {/* 顶部内容区 - 标题 + 按钮 */}
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

      {/* 中间过渡文字 */}
      <div className="hero-mid">
        <p className="hero-mid-text">
          轻造是专注于实用工具开发的独立工作室
          <br />
          致力于用技术简化你的工作流程
        </p>
        <div className="hero-mid-tags">
          <span className="mid-tag">装修管理</span>
          <span className="mid-tag">AI 工具</span>
          <span className="mid-tag">效率应用</span>
          <span className="mid-tag">知识库</span>
          <span className="mid-tag">更多</span>
        </div>
      </div>

      {/* 底部产品展示 */}
      <div className="hero-product">
        <div className="product-window">
          <div className="product-window-header">
            <div className="window-dots">
              <div className="window-dot red" />
              <div className="window-dot yellow" />
              <div className="window-dot green" />
            </div>
            <div className="window-title">轻造工具箱</div>
          </div>
          <div className="product-window-body">
            <div className="window-sidebar">
              <div className="sidebar-item active" />
              <div className="sidebar-item" />
              <div className="sidebar-item" />
              <div className="sidebar-item" />
            </div>
            <div className="window-main">
              <div className="window-chat-header">
                <div className="chat-avatar" />
                <div className="chat-info">
                  <div className="chat-name">装修管家</div>
                  <div className="chat-status">运行中</div>
                </div>
              </div>
              <div className="window-chat-content">
                <div className="chat-bubble left">
                  <div className="bubble-line" />
                  <div className="bubble-line short" />
                </div>
                <div className="chat-bubble right">
                  <div className="bubble-line" />
                </div>
                <div className="chat-bubble left">
                  <div className="bubble-line" />
                  <div className="bubble-line medium" />
                </div>
              </div>
              <div className="window-chat-input">
                <div className="chat-input-placeholder" />
                <div className="chat-input-btn" />
              </div>
            </div>
            <div className="window-panel">
              <div className="panel-section">
                <div className="panel-label" />
                <div className="panel-value" />
              </div>
              <div className="panel-section">
                <div className="panel-label" />
                <div className="panel-value" />
              </div>
              <div className="panel-tags">
                <div className="panel-tag" />
                <div className="panel-tag" />
                <div className="panel-tag" />
              </div>
            </div>
          </div>
        </div>
        <p className="hero-product-caption">
          一站式装修全流程管理工具，让你的装修井井有条
        </p>
      </div>
    </section>
  )
}

export default Hero
