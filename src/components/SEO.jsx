import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../hooks/useLanguage'

/**
 * SEO 组件
 * 为每个页面动态注入 title、description、canonical URL、hreflang 备用链接与 Open Graph 标签。
 * 配合 react-helmet-async 在客户端均可用。
 *
 * @param {Object} props
 * @param {string} props.title - 页面标题（不含站点名后缀）
 * @param {string} props.description - 页面描述
 * @param {string} [props.canonical] - 规范 URL 路径（如 /blog），应已按当前语言加好 /en 前缀
 * @param {string} [props.type] - OG 类型，默认 website
 * @param {string} [props.image] - OG 图片 URL
 * @param {Object} [props.alternates] - hreflang 备用链接映射，如 { 'zh-CN': '/blog/x', 'en-US': '/en/blog/x', 'x-default': '/blog/x' }
 */
function SEO({ title, description, canonical, type = 'website', image, alternates }) {
  const { language } = useLanguage()
  const siteName = language === 'en-US' ? 'Qingzao Studio' : '青枣工作室'
  const fullTitle = title ? `${title} - ${siteName}` : siteName
  const baseUrl = 'https://qingzao.site'
  const safeDescription =
    description ||
    'Qingzao Studio provides renovation flow guides, white-background image trimming tools, and practical content to help users complete renovation and image processing tasks more efficiently.'
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : baseUrl
  const ogImage = image || `${baseUrl}/og-image.png`
  const ogLocale = language === 'en-US' ? 'en_US' : 'zh_CN'

  // 生成 hreflang 备用链接（中英文互指 + x-default）
  const altLinks = alternates
    ? Object.entries(alternates).map(([hreflang, href]) => (
        <link key={hreflang} rel="alternate" hreflang={hreflang} href={`${baseUrl}${href}`} />
      ))
    : null

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={safeDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {altLinks}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}

export default SEO
