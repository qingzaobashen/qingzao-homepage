import React, { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import Carousel from './Carousel'
import './Hero.css'

/**
 * 各产品对应的外部链接（点击对应入口跳转）
 * 0 - 装修思维导图 -> qingzao.site
 * 1 - 白底抠图工具 -> image.qingzao.site
 */
const PRODUCT_LINKS = {
  decoration: 'https://qingzao.site',
  trimmer: 'https://image.qingzao.site'
}

/**
 * Intercom 风格 Hero 组件
 * 长图式第一屏：全宽大图背景 + 顶部标题 + 中间过渡文字 + 底部产品界面
 * 支持多语言显示；底部产品窗支持侧边栏切换不同产品预览
 * 多处入口（mid 标签 / 聊天助手名 / 介绍面板标题）均会跳转到对应产品站
 */
function Hero() {
  const { t } = useLanguage()

  /**
   * 当前底部产品窗激活的侧边栏 Tab 下标
   * 0 - 装修流程导图
   * 1 - 白底抠图工具
   */
  const [activeTab, setActiveTab] = useState(0)

  /**
   * 侧边栏可点击菜单项配置
   * 每个 item 包含唯一 key、用于 tooltip / 无障碍标签的 title，
   * 用于渲染的图标 emoji 与文字 label，以及 data-tab 标识对应产品页
   * 文字内容统一从 i18n 字典读取，避免硬编码
   */
  const sidebarItems = [
    { key: 'decoration', title: t('hero.sidebar.decoration'), label: t('hero.sidebar.decoration'), icon: '🏠', tab: 0 },
    { key: 'trimer', title: t('hero.sidebar.trimmer'), label: t('hero.sidebar.trimmer'), icon: '✂️', tab: 1 }
  ]

  /**
   * 根据当前激活 Tab 获取对应的产品信息（用于聊天区头部）
   * 包含助手名称、状态文本、头像背景色与跳转链接
   * 助手名 / 状态从 i18n 字典读取，与各语言版本同步
   * @param {number} tab - 当前激活的 Tab 下标
   * @returns {{name: string, status: string, avatarClass: string, link: string}}
   */
  const getChatInfo = (tab) => {
    if (tab === 0) {
      return {
        name: t('hero.chat.decoration.name'),
        status: t('hero.chat.decoration.status'),
        avatarClass: 'chat-avatar-decoration',
        link: PRODUCT_LINKS.decoration
      }
    }
    return {
      name: t('hero.chat.trimmer.name'),
      status: t('hero.chat.trimmer.status'),
      avatarClass: 'chat-avatar-trimer',
      link: PRODUCT_LINKS.trimmer
    }
  }

  /**
   * 根据当前激活 Tab 获取输入框占位文案
   * 文字内容统一从 i18n 字典读取
   * @param {number} tab - 当前激活的 Tab 下标
   * @returns {string} 输入框 placeholder 文案
   */
  const getInputPlaceholder = (tab) => {
    if (tab === 0) {
      return t('hero.inputPlaceholder.decoration')
    }
    return t('hero.inputPlaceholder.trimmer')
  }

  /**
   * 根据当前激活 Tab 渲染对应的聊天内容区预览图
   * 使用通用 Carousel 组件，支持多张图片轮播；
   * 图片数组、alt 文本均走 i18n，便于各语言版本独立配置
   * @returns {JSX.Element} 预览图节点（Carousel）
   */
  const renderPreviewImage = () => {
    if (activeTab === 0) {
      return (
        <Carousel
          images={t('hero.panel.decoration.images', { returnObjects: true }) || []}
          alt={t('hero.panel.decoration.title')}
          className="hero-preview-carousel"
        />
      )
    }
    return (
      <Carousel
        images={t('hero.panel.trimmer.images', { returnObjects: true }) || []}
        alt={t('hero.panel.trimmer.title')}
        className="hero-preview-carousel"
      />
    )
  }

  /**
   * 根据当前激活 Tab 渲染对应的右侧介绍面板
   * 标题作为可点击链接跳到对应产品站；描述 / 功能列表 / 标签全部走 i18n
   * @returns {JSX.Element} 介绍面板节点
   */
  const renderIntroPanel = () => {
    if (activeTab === 0) {
      return (
        <>
          {/* 标题为可点击链接，跳转 qingzao.site */}
          <a
            href={PRODUCT_LINKS.decoration}
            target="_blank"
            rel="noopener noreferrer"
            className="panel-title panel-title-link"
          >
            {t('hero.panel.decoration.title')}
          </a>
          <p className="panel-desc">
            {t('hero.panel.decoration.description')}
          </p>
          <ul className="panel-feature-list">
            {t('hero.panel.decoration.features', { returnObjects: true }).map((feature, idx) => (
              <li key={idx} className="panel-feature-item">{feature}</li>
            ))}
          </ul>
          <div className="panel-tags">
            {t('hero.panel.decoration.tags', { returnObjects: true }).map((tag, idx) => (
              <span key={idx} className="panel-tag-text">{tag}</span>
            ))}
          </div>
        </>
      )
    }
    return (
      <>
        {/* 标题为可点击链接，跳转 image.qingzao.site */}
        <a
          href={PRODUCT_LINKS.trimmer}
          target="_blank"
          rel="noopener noreferrer"
          className="panel-title panel-title-link"
        >
          {t('hero.panel.trimmer.title')}
        </a>
        <p className="panel-desc">
          {t('hero.panel.trimmer.description')}
        </p>
        <ul className="panel-feature-list">
          {t('hero.panel.trimmer.features', { returnObjects: true }).map((feature, idx) => (
            <li key={idx} className="panel-feature-item">{feature}</li>
          ))}
        </ul>
        <div className="panel-tags">
          {t('hero.panel.trimmer.tags', { returnObjects: true }).map((tag, idx) => (
            <span key={idx} className="panel-tag-text">{tag}</span>
          ))}
        </div>
      </>
    )
  }

  return (
    <section className="hero">
      {/* 背景大图 */}
      <div className="hero-bg">
        <img
          src="/images/hero-bg.jpg"
          alt={t('hero.title')}
          className="hero-bg-img"
          loading="eager"
          width="1920"
          height="1080"
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
        {/* <p className="hero-mid-text">
          {t('hero.midText')}
          <br />
          {t('hero.midTextLine2')}
        </p> */}
        <div className="hero-mid-tags">
          {/* 装修思维导图入口：跳转 qingzao.site */}
          <a
            href={PRODUCT_LINKS.decoration}
            target="_blank"
            rel="noopener noreferrer"
            className="mid-tag mid-tag-link"
          >
            {t('hero.tags.decoration')}
          </a>
          {/* 白底抠图工具入口：跳转 image.qingzao.site */}
          <a
            href={PRODUCT_LINKS.trimmer}
            target="_blank"
            rel="noopener noreferrer"
            className="mid-tag mid-tag-link"
          >
            {t('hero.tags.imageTrimer')}
          </a>
          {/* 更多入口：占位链接，暂跳主页 */}
          <a
            href="#products"
            className="mid-tag mid-tag-link"
          >
            {t('hero.tags.more')}
          </a>
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
            {/* 侧边栏 - 可点击切换产品页（带图标 + 文字 + 过渡动画） */}
            <div className="window-sidebar">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`sidebar-item ${activeTab === item.tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.tab)}
                  title={item.title}
                  aria-label={item.title}
                  aria-pressed={activeTab === item.tab}
                >
                  <span className="sidebar-item-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="sidebar-item-label">{item.label}</span>
                </button>
              ))}
            </div>
            <div className="window-main">
              {/* 聊天区头部：根据 activeTab 切换助手名 / 状态 / 头像配色，并随 key 变化触发过渡动画 */}
              {(() => {
                const info = getChatInfo(activeTab)
                return (
                  <div className="window-chat-header" key={`header-${activeTab}`}>
                    <div className={`chat-avatar ${info.avatarClass}`} />
                    <div className="chat-info">
                      {/* 助手名为可点击链接，跳转对应产品站 */}
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chat-name chat-name-link"
                      >
                        {info.name}
                      </a>
                      <div className="chat-status">{info.status}</div>
                    </div>
                  </div>
                )
              })()}
              {/* 产品预览图区：根据 activeTab 切换 + key 触发过渡动画 */}
              <div className="window-chat-content" key={`preview-${activeTab}`}>
                {renderPreviewImage()}
              </div>
              {/* 聊天输入区：placeholder 文案根据 activeTab 切换，并随 key 触发过渡动画 */}
              <div className="window-chat-input" key={`input-${activeTab}`}>
                <div className="chat-input-placeholder">
                  {getInputPlaceholder(activeTab)}
                </div>
                <div className="chat-input-btn" />
              </div>
            </div>
            {/* 装修导图 / 白底抠图介绍侧栏：根据 activeTab 切换 + key 触发过渡动画 */}
            <div className="window-panel" key={`panel-${activeTab}`}>
              {renderIntroPanel()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
