import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import postsZh from '../data/posts/posts-zh.json'
import postsEn from '../data/posts/posts-en.json'
import './LatestPosts.css'

/**
 * 首页最新文章列表组件
 * 展示最新的 6 篇文章
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
        <h2 className="section-title">{t('home.latestPostsTitle')}</h2>
        <div className="posts-list">
          {posts.map((post, index) => (
            <article key={index} className="home-post-card">
              <div className="home-post-card-line" />
              <div className="home-post-card-body">
                <div className="home-post-meta">
                  <span className="home-post-category">{post.category}</span>
                  <span className="home-post-date">{formatDate(post.date)}</span>
                </div>
                <h3 className="home-post-title">
                  <Link to={localePath(`/blog/${post.slug}`)}>{post.title}</Link>
                </h3>
                <p className="home-post-excerpt">{post.excerpt}</p>
                <div className="home-post-tags">
                  {post.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="home-post-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="home-posts-cta">
          <Link to={localePath('/blog')} className="home-view-all">
            {t('home.viewAllPosts')} →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LatestPosts
