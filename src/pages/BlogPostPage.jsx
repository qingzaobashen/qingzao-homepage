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
import { markdownToHtml } from '../data/posts/markdownToHtml'
import { getClusterPosts } from '../data/posts/clusters'
import './BlogPostPage.css'

/**
 * 博客文章详情页组件
 * @returns {JSX.Element} 博客文章详情页
 */
function BlogPostPage() {
  const { slug } = useParams()
  const { t, language, localePath } = useLanguage()
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

      // 查找相关主题文章（同一主题簇内的其它文章，形成内链簇）
      const related = getClusterPosts(foundPost.slug, postsData, 4)
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

  // 文章未找到
  if (!post) {
    return (
      <>
        <SEO title="文章未找到" description="抱歉，您访问的文章不存在。" canonical={localePath('/blog')} />
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
              <Link to={localePath('/blog')} className="back-to-blog">
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
   * 中英文备用链接映射（hreflang），用于 SEO 互相关联
   */
  const alternates = {
    'zh-CN': `/blog/${post.slug}`,
    'en-US': `/en/blog/${post.slug}`,
    'x-default': `/blog/${post.slug}`,
  }

  /**
   * 生成 JSON-LD 结构化数据（URL 随语言前缀变化）
   * @returns {Object} JSON-LD 对象
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
          '@id': `https://qingzao.site${localePath(`/blog/${post.slug}`)}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: language === 'zh-CN' ? '首页' : 'Home',
            item: `https://qingzao.site${localePath('/')}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: language === 'zh-CN' ? '博客' : 'Blog',
            item: `https://qingzao.site${localePath('/blog')}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://qingzao.site${localePath(`/blog/${post.slug}`)}`,
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
        canonical={localePath(`/blog/${post.slug}`)}
        type="article"
        alternates={alternates}
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
              <Link to={localePath('/')}>{language === 'zh-CN' ? '首页' : 'Home'}</Link>
              <span className="breadcrumb-separator">/</span>
              <Link to={localePath('/blog')}>{language === 'zh-CN' ? '博客' : 'Blog'}</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{post.title}</span>
            </div>
            <div className="post-meta-top">
              <span className="post-author-badge">
                {language === 'zh-CN' ? '青枣工作室' : 'Qingzao Studio'}
              </span>
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
              <div dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
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
                      <Link to={localePath(`/blog/${relatedPost.slug}`)}>{relatedPost.title}</Link>
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
            <Link to={localePath('/blog')} className="back-to-blog">
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
