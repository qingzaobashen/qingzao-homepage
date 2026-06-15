import React, { useState } from 'react'
import './AnnouncementBanner.css'

/**
 * 公告横幅组件
 * 在页面顶部显示重要通知，支持关闭
 * 用于展示产品迁移等临时公告信息
 */
function AnnouncementBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="announcement-banner">
      <span className="announcement-text">
        装修思维导图已迁移至
        <a
          href="https://decoration.qingzao.site"
          target="_blank"
          rel="noopener noreferrer"
          className="announcement-link"
        >
          decoration.qingzao.site
        </a>
        ，望惠存
      </span>
      <button
        className="announcement-close"
        onClick={() => setVisible(false)}
        aria-label="关闭公告"
      >
        &times;
      </button>
    </div>
  )
}

export default AnnouncementBanner