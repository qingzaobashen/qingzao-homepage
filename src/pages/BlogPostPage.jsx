/**
 * 博客文章详情页组件
 * 展示单篇博客文章的完整内容
 * URL: /blog/:slug
 */

import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import SEO from '../components/SEO'
import Header from '../components/Header'
import Footer from '../components/Footer'
import postsZh from '../data/posts/posts-zh.json'
import postsEn from '../data/posts/posts-en.json'
import './BlogPostPage.css'

/**
 * 博客文章详情页组件
 * @returns {JSX.Element} 博客文章详情页
 */
function BlogPostPage() {
  const { slug } = useParams()
  const { t, language } = useLanguage()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])

  /**
   * 根据 slug 查找文章
   */
  useEffect(() => {
    const postsData = language === 'zh-CN' ? postsZh : postsEn
    const foundPost = postsData.find(p => p.slug === slug)
    setPost(foundPost || null)

    // 查找相关文章（同分类的其他文章）
    if (foundPost) {
      const related = postsData
        .filter(p => p.category === foundPost.category && p.slug !== slug)
        .slice(0, 3)
      setRelatedPosts(related)
    }
  }, [slug, language])

  /**
   * 页面加载时滚动到顶部
   */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

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
   * 将 Markdown 格式的内容转换为 HTML
   * @param {string} content - Markdown 内容
   * @returns {JSX.Element} 转换后的 HTML 内容
   */
  const renderContent = (content) => {
    if (!content) return null

    // 简单的 Markdown 渲染
    const lines = content.split('\n')
    const elements = []
    let inList = false
    let listItems = []

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="content-list">
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        )
        listItems = []
        inList = false
      }
    }

    lines.forEach((line, index) => {
      // 空行
      if (line.trim() === '') {
        flushList()
        return
      }

      // 标题 H1
      if (line.startsWith('# ')) {
        flushList()
        elements.push(
          <h1 key={index} className="content-h1">
            {line.substring(2)}
          </h1>
        )
      }
      // 标题 H2
      else if (line.startsWith('## ')) {
        flushList()
        elements.push(
          <h2 key={index} className="content-h2">
            {line.substring(3)}
          </h2>
        )
      }
      // 标题 H3
      else if (line.startsWith('### ')) {
        flushList()
        elements.push(
          <h3 key={index} className="content-h3">
            {line.substring(4)}
          </h3>
        )
      }
      // 无序列表
      else if (line.match(/^[\d]+\.\s/) || line.match(/^[-*]\s/)) {
        const content = line.replace(/^[\d]+\.\s/, '').replace(/^[-*]\s/, '')
        listItems.push(content)
        inList = true
      }
      // 代码块（简单处理）
      else if (line.startsWith('```')) {
        flushList()
        // 简化处理，跳过代码块标记
      }
      // 表格行
      else if (line.includes('|')) {
        flushList()
        // 表格简化处理
        elements.push(
          <p key={index} className="content-table-row">
            {line}
          </p>
        )
      }
      // 普通段落
      else {
        flushList()
        // 处理加粗 **text**
        let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // 处理链接 [text](url)
        processedLine = processedLine.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

        elements.push(
          <p key={index} className="content-paragraph" dangerouslySetInnerHTML={{ __html: processedLine }} />
        )
      }
    })

    flushList()
    return elements
  }

  // 文章未找到
  if (!post) {
    return (
      <>
        <SEO title="文章未找到" description="抱歉，您访问的文章不存在。" canonical="/blog" />
        <Header />
        <div className="blog-post-page">
          <div className="container">
            <div className="post-not-found">
              <h1>{language === 'zh-CN' ? '文章未找到' : 'Post Not Found'}</h1>
              <p>
                {language === 'zh-CN'
                  ? '抱歉，您访问的文章不存在。'
                  : 'Sorry, the post you are looking for does not exist.'
                }
              </p>
              <Link to="/blog" className="back-to-blog">
                {language === 'zh-CN' ? '← 返回博客列表' : '← Back to Blog'}
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  /**
   * 生成 JSON-LD 结构化数据
   * @returns {string} JSON-LD script 标签
   */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
          '@type': 'Organization',
          name: '青枣工作室',
          url: 'https://qingzao.site',
        },
        publisher: {
          '@type': 'Organization',
          name: '青枣工作室',
          url: 'https://qingzao.site',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://qingzao.site/blog/${post.slug}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: language === 'zh-CN' ? '首页' : 'Home',
            item: 'https://qingzao.site/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: language === 'zh-CN' ? '博客' : 'Blog',
            item: 'https://qingzao.site/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://qingzao.site/blog/${post.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        type="article"
      />
      <Header />
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="blog-post-page">
        {/* 文章头部 */}
        <section className="post-header">
          <div className="container">
            <div className="post-breadcrumb">
              <Link to="/">{language === 'zh-CN' ? '首页' : 'Home'}</Link>
              <span className="breadcrumb-separator">/</span>
              <Link to="/blog">{language === 'zh-CN' ? '博客' : 'Blog'}</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{post.title}</span>
            </div>
            <div className="post-meta-top">
              <span className="post-category-badge">{post.category}</span>
              <span className="post-date-badge">{formatDate(post.date)}</span>
            </div>
            <h1 className="post-title-main">{post.title}</h1>
            <p className="post-excerpt-main">{post.excerpt}</p>
            <div className="post-tags-top">
              {post.tags.map((tag, index) => (
                <span key={index} className="post-tag-badge">#{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* 文章正文 */}
        <section className="post-body">
          <div className="container">
            <div className="post-content">
              {renderContent(post.content)}
            </div>
          </div>
        </section>

        {/* 相关文章 */}
        {relatedPosts.length > 0 && (
          <section className="related-posts">
            <div className="container">
              <h2 className="related-title">
                {language === 'zh-CN' ? '相关文章' : 'Related Posts'}
              </h2>
              <div className="related-grid">
                {relatedPosts.map((relatedPost, index) => (
                  <article key={index} className="related-card">
                    <div className="related-meta">
                      <span className="related-category">{relatedPost.category}</span>
                      <span className="related-date">{formatDate(relatedPost.date)}</span>
                    </div>
                    <h3 className="related-title-link">
                      <Link to={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                    </h3>
                    <p className="related-excerpt">{relatedPost.excerpt}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 返回链接 */}
        <section className="post-footer">
          <div className="container">
            <Link to="/blog" className="back-to-blog">
              {language === 'zh-CN' ? '← 返回博客列表' : '← Back to Blog'}
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default BlogPostPage
