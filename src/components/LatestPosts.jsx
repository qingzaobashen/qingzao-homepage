import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import postsZh from '../data/posts/posts-zh.json'
import postsEn from '../data/posts/posts-en.json'
import './LatestPosts.css'

/**
 * 首页最新文章列表组件
 * Easton 风格：封面卡片网格 + 查看更多
 */
function LatestPosts() {
  const { t, language, localePath } = useLanguage()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const postsData = language === 'zh-CN' ? postsZh : postsEn
    const sorted = [...postsData].sort((a, b) => new Date(b.date) - new Date(a.date))
    setPosts(sorted.slice(0, 6))
  }, [language])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(language === 'zh-CN' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section className="latest-posts">
      <div className="container">
        <div className="ed-section-header">
          <div>
            <span className="ed-eyebrow">Notes</span>
            <h2 className="ed-section-header-title">{t('home.latestPostsTitle')}</h2>
            <p className="ed-section-header-desc">{t('home.latestPostsDesc')}</p>
          </div>
          <Link to={localePath('/blog')} className="ed-link-more">
            {t('home.viewAllPosts')}
            <span className="arrow">→</span>
          </Link>
        </div>
        <div className="posts-grid">
          {posts.map((post, index) => (
            <article key={index} className="home-post-card">
              <Link to={localePath(`/blog/${post.slug}`)} className="home-post-cover-wrapper">
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="home-post-cover"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                )}
              </Link>
              <div className="home-post-card-body">
                <div className="home-post-meta">
                  <span className="home-post-category">{post.category}</span>
                  <span className="home-post-date">{formatDate(post.date)}</span>
                </div>
                <h3 className="home-post-title">
                  <Link to={localePath(`/blog/${post.slug}`)}>{post.title}</Link>
                </h3>
                <p className="home-post-excerpt">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestPosts
