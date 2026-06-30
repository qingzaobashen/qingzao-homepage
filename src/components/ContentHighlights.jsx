import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import postsZh from '../data/posts/posts-zh.json'
import postsEn from '../data/posts/posts-en.json'
import './ContentHighlights.css'

function ContentHighlights() {
  const { t, language } = useLanguage()

  const posts = useMemo(() => {
    const sourcePosts = language === 'zh-CN' ? postsZh : postsEn

    return [...sourcePosts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3)
  }, [language])

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(language === 'zh-CN' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <section id="insights" className="content-highlights">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('highlights.label')}</span>
          <h2 className="section-title">{t('highlights.title')}</h2>
          <p className="section-subtitle">{t('highlights.subtitle')}</p>
        </div>

        <div className="highlights-grid">
          {posts.map((post) => (
            <article key={post.slug} className="highlight-card">
              <div className="highlight-meta">
                <span className="highlight-category">{post.category}</span>
                <span className="highlight-date">{formatDate(post.date)}</span>
              </div>
              <h3 className="highlight-title">{post.title}</h3>
              <p className="highlight-excerpt">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="highlight-link">
                {t('highlights.readMore')}
              </Link>
            </article>
          ))}
        </div>

        <div className="highlights-cta">
          <Link to="/blog" className="btn-nav btn-nav-primary">
            {t('highlights.cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ContentHighlights
