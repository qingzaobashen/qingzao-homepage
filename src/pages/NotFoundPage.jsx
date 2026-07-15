import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import SEO from '../components/SEO'
import './NotFoundPage.css'

/**
 * 404 页面组件
 * 当用户访问不存在的路由时显示
 * 包含提示文字、返回首页链接和搜索建议
 */
function NotFoundPage() {
  const { t, localePath } = useLanguage()

  return (
    <>
      <SEO
        title="页面未找到"
        description="您访问的页面不存在，请返回首页或浏览博客内容。"
        canonical="/404"
      />
      <div className="not-found-page">
        <div className="not-found-container">
          <div className="not-found-code">404</div>
          <h1 className="not-found-title">{t('notFound.title') || '页面未找到'}</h1>
          <p className="not-found-desc">
            {t('notFound.desc') || '抱歉，您访问的页面不存在或已被移动。'}
          </p>
          <div className="not-found-actions">
            <Link to={localePath('/')} className="not-found-btn-primary">
              {t('notFound.goHome') || '返回首页'}
            </Link>
            <Link to={localePath('/blog')} className="not-found-btn-secondary">
              {t('notFound.goBlog') || '浏览博客'}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
