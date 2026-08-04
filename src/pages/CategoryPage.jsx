/**
 * 分类页组件
 * 按主题分组展示所有文章
 * URL: /category
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import SEO from '../components/SEO'
import Header from '../components/Header'
import Footer from '../components/Footer'
import postsZh from '../data/posts/posts-zh.json'
import postsEn from '../data/posts/posts-en.json'
import './CategoryPage.css'

/**
 * 分类页组件
 * @returns {JSX.Element} 分类页
 */
function CategoryPage() {
  const { t, language, localePath } = useLanguage()
  const [groups, setGroups] = useState([])
  const categories = t('home.categories', { returnObjects: true }) || []

  useEffect(() => {
    const postsData = language === 'zh-CN' ? postsZh : postsEn
    const sorted = [...postsData].sort((a, b) => new Date(b.date) - new Date(a.date))

    const built = categories.map((cat) => ({
      ...cat,
      posts: sorted.filter((post) => (cat.postCategories || []).includes(post.category)),
    }))

    const grouped = built.filter((g) => g.posts.length > 0)
    const orphan = sorted.filter(
      (post) => !categories.some((cat) => (cat.postCategories || []).includes(post.category)),
    )
    if (orphan.length > 0) {
      grouped.push({
        key: 'more',
        title: language === 'zh-CN' ? '更多' : 'More',
        desc: '',
        subs: [],
        posts: orphan,
      })
    }
    setGroups(grouped)
  }, [language, categories])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(language === 'zh-CN' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <SEO
        title={language === 'zh-CN' ? '分类' : 'Categories'}
        description={language === 'zh-CN'
          ? '按装修、智能家居、图片处理等主题浏览全部文章。'
          : 'Browse all posts by topic: renovation, smart home, image processing, and more.'
        }
        canonical={localePath('/category')}
      />
      <Header />
      <div className="category-page">
        <section className="category-page-hero">
          <div className="container">
            <h1 className="category-page-title">
              {language === 'zh-CN' ? '分类' : 'Categories'}
            </h1>
            <p className="category-page-subtitle">
              {language === 'zh-CN'
                ? '按主题浏览全部文章，快速找到你关心的内容。'
                : 'Browse all posts by topic and quickly find what you care about.'
              }
            </p>
          </div>
        </section>

        <section className="category-page-content">
          <div className="container">
            {groups.map((group) => (
              <div key={group.key} className="category-group">
                <div className="category-group-header">
                  <div>
                    <h2 className="category-group-title">{group.title}</h2>
                    {group.desc && <p className="category-group-desc">{group.desc}</p>}
                  </div>
                  <span className="category-group-count">
                    {language === 'zh-CN' ? `${group.posts.length} 篇` : `${group.posts.length} posts`}
                  </span>
                </div>
                <div className="category-group-grid">
                  {group.posts.map((post, index) => (
                    <article key={index} className="category-post-card">
                      {post.coverImage && (
                        <Link to={localePath(`/blog/${post.slug}`)} className="category-post-cover-wrapper">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="category-post-cover"
                            loading="lazy"
                            onError={(e) => { e.target.style.display = 'none' }}
                          />
                        </Link>
                      )}
                      <div className="category-post-body">
                        <div className="category-post-meta">
                          <span className="category-post-date">{formatDate(post.date)}</span>
                        </div>
                        <h3 className="category-post-title">
                          <Link to={localePath(`/blog/${post.slug}`)}>{post.title}</Link>
                        </h3>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default CategoryPage
