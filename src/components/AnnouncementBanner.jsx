import React from 'react'
import './AnnouncementBanner.css'

/**
 * 公告横幅组件
 * 显示顶部公告信息，包含小喇叭图标和可点击链接
 * 用于通知用户产品迁移等重要信息
 */
function AnnouncementBanner() {
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
    </div>
  )
}

export default AnnouncementBanner