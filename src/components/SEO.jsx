import React from 'react'
import { Helmet } from 'react-helmet-async'

/**
 * SEO 组件
 * 为每个页面动态注入 title、description、canonical URL 和 Open Graph 标签
 * 配合 react-helmet-async 在客户端和服务端均可用
 *
 * @param {Object} props
 * @param {string} props.title - 页面标题（不含站点名后缀）
 * @param {string} props.description - 页面描述
 * @param {string} [props.canonical] - 规范 URL 路径（如 /blog）
 * @param {string} [props.type] - OG 类型，默认 website
 * @param {string} [props.image] - OG 图片 URL
 */
function SEO({ title, description, canonical, type = 'website', image }) {
  const siteName = '青枣工作室'
  const fullTitle = title ? `${title} - ${siteName}` : siteName
  const baseUrl = 'https://qingzao.site'
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : baseUrl
  const ogImage = image || `${baseUrl}/og-image.png`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="zh_CN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}

export default SEO
