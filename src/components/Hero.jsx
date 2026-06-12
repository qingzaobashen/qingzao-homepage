import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import './Hero.css'

/**
 * Intercom 风格 Hero 组件
 * 长图式第一屏：全宽大图背景 + 顶部标题 + 中间过渡文字 + 底部产品界面
 * 支持多语言显示
 */
function Hero() {
  const { t } = useLanguage()

  return (
    <section className="hero">
      {/* 背景大图 */}
      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt={t('hero.title')}
          className="hero-bg-img"
        />
        {/* 渐变遮罩 - 整体暗化 + 底部加深 */}
        <div className="hero-bg-overlay" />
      </div>

      {/* 顶部内容区 - 标题 + 按钮 */}
      <div className="hero-content">
        <h1 className="hero-title">
          {t('hero.title')}
          <br />
          {t('hero.titleLine2')}
        </h1>
        <p className="hero-subtitle">
          {t('hero.subtitle')}
        </p>
        <div className="hero-actions">
          <a href="#products" className="hero-btn hero-btn-primary">
            {t('hero.actions.explore')}
          </a>
          <a href="#about" className="hero-btn hero-btn-secondary">
            {t('hero.actions.learnMore')}
          </a>
        </div>
      </div>

      {/* 中间过渡文字 */}
      <div className="hero-mid">
        <p className="hero-mid-text">
          {t('hero.midText')}
          <br />
          {t('hero.midTextLine2')}
        </p>
        <div className="hero-mid-tags">
          <span className="mid-tag">{t('hero.tags.decoration')}</span>
          <span className="mid-tag">{t('hero.tags.ai')}</span>
          <span className="mid-tag">{t('hero.tags.efficiency')}</span>
          <span className="mid-tag">{t('hero.tags.knowledge')}</span>
          <span className="mid-tag">{t('hero.tags.more')}</span>
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
            <div className="window-title">{t('hero.productWindow.title')}</div>
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
                  <div className="chat-name">{t('hero.productWindow.chatName')}</div>
                  <div className="chat-status">{t('hero.productWindow.chatStatus')}</div>
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
          {t('hero.productCaption')}
        </p>
      </div>
    </section>
  )
}

export default Hero
