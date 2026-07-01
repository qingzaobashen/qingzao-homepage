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
import { getPostContent } from '../data/posts/postContentLoader'
import './BlogPostPage.css'

/**
 * 博客文章详情页组件
 * @returns {JSX.Element} 博客文章详情页
 */
function BlogPostPage() {
  const { slug } = useParams()
  const { t, language } = useLanguage()
  const [post, setPost] = useState(null)
  const [content, setContent] = useState('')
  const [relatedPosts, setRelatedPosts] = useState([])

  /**
   * 根据 slug 查找文章
   */
  useEffect(() => {
    const postsData = language === 'zh-CN' ? postsZh : postsEn
    const foundPost = postsData.find(p => p.slug === slug)
    setPost(foundPost || null)

    // 从 .md 文件加载正文内容
    if (foundPost) {
      const loadedContent = getPostContent(foundPost.slug, language, foundPost.content || '')
      setContent(loadedContent)

      // 查找相关文章（同分类的其他文章）
      const related = postsData
        .filter(p => p.category === foundPost.category && p.slug !== slug)
        .slice(0, 3)
      setRelatedPosts(related)
    } else {
      setContent('')
      setRelatedPosts([])
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
   * 处理行内格式：粗体、链接、行内代码、删除线
   */
  const renderInline = (text) => {
    let result = text
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    result = result.replace(/~~(.*?)~~/g, '<del>$1</del>')
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>')
    result = result.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    return result
  }

  /**
 * 将 Markdown 格式的内容转换为 HTML
 * @param {string} content - Markdown 内容
 * @returns {JSX.Element} 转换后的 HTML 内容
 */
  const renderContent = (content) => {
    if (!content) return null

    const lines = content.split('\n')
    const elements = []
    let inList = false
    let listItems = []
    let inTable = false
    let tableRows = []
    let tableHeaders = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = ''

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

    const flushTable = () => {
      if (tableRows.length === 0) return
      const bodyRows = tableHeaders.length > 0 ? tableRows.slice(1) : tableRows
      const headers = tableHeaders.length > 0 ? tableHeaders : tableRows[0]

      elements.push(
        <table key={`table-${elements.length}`} className="content-table">
          {tableHeaders.length > 0 && (
            <thead>
              <tr>
                {headers.map((cell, i) => (
                  <th key={i} dangerouslySetInnerHTML={{ __html: renderInline(cell.trim()) }} />
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {bodyRows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} dangerouslySetInnerHTML={{ __html: renderInline(cell.trim()) }} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
      tableRows = []
      tableHeaders = []
      inTable = false
    }

    const flushCodeBlock = () => {
      if (codeLines.length > 0) {
        const codeContent = codeLines.join('\n')
        elements.push(
          <pre key={`code-${elements.length}`} className="content-pre">
            <code className={`content-code language-${codeLanguage}`}>{codeContent}</code>
          </pre>
        )
        codeLines = []
        codeLanguage = ''
        inCodeBlock = false
      }
    }

    const isTableSeparator = (line) => /^\|[\s:-]+\|[\s:-]*\|/.test(line)

    lines.forEach((line, index) => {
      const trimmed = line.trim()

      // 代码块标记
      if (trimmed.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock()
        } else {
          flushList()
          flushTable()
          inCodeBlock = true
          codeLanguage = trimmed.slice(3).trim()
        }
        return
      }

      // 代码块内部内容
      if (inCodeBlock) {
        codeLines.push(line)
        return
      }

      // 空行
      if (trimmed === '') {
        flushList()
        flushTable()
        return
      }

      // 分割线
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
        flushList()
        flushTable()
        elements.push(<hr key={`hr-${index}`} className="content-hr" />)
        return
      }

      // 标题 H1-H6
      const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/)
      if (headingMatch) {
        flushList()
        flushTable()
        const level = headingMatch[1].length
        const text = headingMatch[2]
        const Tag = `h${level}`
        elements.push(
          <Tag key={index} className={`content-h${level}`}>
            {text}
          </Tag>
        )
        return
      }

      // 表格行
      if (line.includes('|')) {
        flushList()
        if (isTableSeparator(line)) return
        const cells = line.split('|').filter(c => c !== '')
        if (!inTable) {
          inTable = true
          tableRows = []
          tableHeaders = []
        }
        if (tableRows.length === 0) {
          tableHeaders = cells
        }
        tableRows.push(cells)
        return
      }

      // 有序列表
      if (trimmed.match(/^\d+\.\s/)) {
        flushTable()
        const liContent = renderInline(trimmed.replace(/^\d+\.\s/, ''))
        listItems.push(liContent)
        inList = true
        return
      }

      // 无序列表
      if (trimmed.match(/^[-*]\s/)) {
        flushTable()
        const liContent = renderInline(trimmed.replace(/^[-*]\s/, ''))
        listItems.push(liContent)
        inList = true
        return
      }

      // 普通段落
      flushList()
      flushTable()

      const processedLine = renderInline(line)
      elements.push(
        <p key={index} className="content-paragraph" dangerouslySetInnerHTML={{ __html: processedLine }} />
      )
    })

    flushList()
    flushTable()
    flushCodeBlock()
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
              <div className="post-tags-top">
                {post.tags.map((tag, index) => (
                  <span key={index} className="post-tag-badge">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 文章正文 */}
        <section className="post-body">
          <div className="container">
            <div className="post-content">
              {renderContent(content)}
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
