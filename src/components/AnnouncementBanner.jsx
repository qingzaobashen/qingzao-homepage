import React, { useState, useEffect } from 'react'
import './AnnouncementBanner.css'

/**
 * 公告横幅组件
 * 显示顶部公告信息，包含小喇叭图标和可点击链接
 * 用户点击关闭按钮后会隐藏，并通过 localStorage 记忆关闭状态
 * 用于通知用户产品迁移等重要信息
 */
function AnnouncementBanner() {
  // 关闭状态：读取 localStorage，关闭后本次会话不再显示
  const [isVisible, setIsVisible] = useState(() => {
    try {
      return localStorage.getItem('announcement-dismissed') !== 'true'
    } catch {
      return true
    }
  })

  const handleClose = () => {
    setIsVisible(false)
    try {
      //localStorage.setItem('announcement-dismissed', 'true')
    } catch {
      // 忽略存储失败（隐私模式等）
    }
  }

  if (!isVisible) return null

  return (
    <div className="announcement-banner" role="alert">
      <span className="horn-icon" aria-hidden="true">&#x1F4E2;</span>
      <span className="announcement-text">
        装修思维导图已迁移至&nbsp;
        <a
          className="announcement-link"
          href="https://decoration.qingzao.site"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://decoration.qingzao.site
        </a>
        ，望惠存
      </span>
      <button
        className="announcement-close"
        onClick={handleClose}
        aria-label="关闭公告"
        type="button"
      >
        &#x2715;
      </button>
    </div>
  )
}

export default AnnouncementBanner