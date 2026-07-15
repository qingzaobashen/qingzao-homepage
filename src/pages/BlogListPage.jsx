/**
 * 博客列表页组件
 * 展示所有博客文章的列表，支持分类筛选
 * URL: /blog
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import SEO from '../components/SEO'
import Header from '../components/Header'
import Footer from '../components/Footer'
import postsZh from '../data/posts/posts-zh.json'
import postsEn from '../data/posts/posts-en.json'
import './BlogListPage.css'

/**
 * 博客列表页组件
 * @returns {JSX.Element} 博客列表页
 */
function BlogListPage() {
  const { t, language, localePath } = useLanguage()
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [categories, setCategories] = useState([])

  /**
   * 初始化文章数据和分类
   */
  useEffect(() => {
    // 根据当前语言选择对应的文章数据
    const postsData = language === 'zh-CN' ? postsZh : postsEn

    // 按日期降序排序
    const sortedPosts = [...postsData].sort((a, b) => new Date(b.date) - new Date(a.date))
    setPosts(sortedPosts)
    setFilteredPosts(sortedPosts)

    // 提取所有分类
    const allCategories = [...new Set(sortedPosts.map(post => post.category))]
    setCategories(allCategories)
  }, [language])

  /**
   * 处理分类筛选
   * @param {string} category - 选中的分类
   */
  const handleCategoryFilter = (category) => {
    setActiveCategory(category)
    if (category === 'all') {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts.filter(post => post.category === category))
    }
  }

  /**
   * 格式化日期显示
   * @param {string} dateStr - 日期字符串
   * @returns {string} 格式化后的日期
   */
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(language === 'zh-CN' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  /**
   * 页面加载时滚动到顶部
   */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title={language === 'zh-CN' ? '博客' : 'Blog'}
        description={language === 'zh-CN'
          ? '装修指南、图片处理技巧和产品更新'
          : 'Decoration guides, image processing tips, and product updates'
        }
        canonical={localePath('/blog')}
        alternates={{
          'zh-CN': '/blog',
          'en-US': '/en/blog',
          'x-default': '/blog',
        }}
      />
      <Header />
      <div className="blog-list-page">
        {/* 页面头部 */}
        <section className="blog-header">
          <div className="container">
            <h1 className="blog-title">
              {language === 'zh-CN' ? '博客' : 'Blog'}
            </h1>
            <p className="blog-subtitle">
              {language === 'zh-CN'
                ? '装修指南、图片处理技巧和产品更新'
                : 'Decoration guides, image processing tips, and product updates'
              }
            </p>
          </div>
        </section>

        {/* 分类筛选 */}
        <section className="blog-filter">
          <div className="container">
            <div className="filter-buttons">
              <button
                className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryFilter('all')}
              >
                {language === 'zh-CN' ? '全部' : 'All'}
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 文章列表 */}
        <section className="blog-content">
          <div className="container">
            {filteredPosts.length > 0 ? (
              <div className="posts-grid">
                {filteredPosts.map((post, index) => (
                  <article key={index} className="post-card">
                    <div className="post-meta">
                      <span className="post-category">{post.category}</span>
                      <span className="post-date">{formatDate(post.date)}</span>
                    </div>
                    <h2 className="post-title">
                      <Link to={localePath(`/blog/${post.slug}`)}>{post.title}</Link>
                    </h2>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <div className="post-tags">
                      {post.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="post-tag">#{tag}</span>
                      ))}
                    </div>
                    <Link to={localePath(`/blog/${post.slug}`)} className="post-read-more">
                      {language === 'zh-CN' ? '阅读全文 →' : 'Read More →'}
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="no-posts">
                <p>{language === 'zh-CN' ? '暂无文章' : 'No posts yet.'}</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default BlogListPage
