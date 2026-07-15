/**
 * 预渲染脚本（构建时静态生成）
 *
 * 目标：解决 AdSense「低价值内容」审核中的「SPA 正文靠 JS 运行时渲染」问题
 * （见 docs/Ads/googleAds政策/低价值内容改进计划0714.md 的 问题4）。
 *
 * 做法：在 `vite build` 之后，为每个博客文章生成一份「首屏即含全文」的静态
 * HTML（dist/blog/<slug>.html 与 dist/en/blog/<slug>.html），并把正确的
 * <title> / description / canonical / hreflang / JSON-LD 注入 <head>。
 *
 * 国际化（方案 A）：中英文拥有各自独立 URL（中文 /blog/<slug>，英文 /en/blog/<slug>），
 * 因此预渲染会分别为两种语言各产出一份静态 HTML，并通过 hreflang 互相声明，
 * 让 Google 能分别索引中英文版本。
 *
 * 复用 `src/data/posts/markdownToHtml.js`（与客户端 BlogPostPage 同一套转换逻辑），
 * 保证预渲染结果与运行时渲染完全一致，避免内容漂移。
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

import { markdownToHtml } from '../src/data/posts/markdownToHtml.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST_DIR = resolve(ROOT, 'dist')
const ARTICLES_DIR = resolve(ROOT, 'src/data/posts/articles')
const SITE_URL = 'https://qingzao.site'

/**
 * HTML 文本转义（用于元素文本节点）
 * @param {string} str - 原始文本
 * @returns {string} 转义后的文本
 */
function esc(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * HTML 属性值转义（用于属性与 JSON-LD 之外的双引号上下文）
 * @param {string} str - 原始文本
 * @returns {string} 转义后的文本
 */
function escAttr(str = '') {
  return esc(str).replace(/"/g, '&quot;')
}

/**
 * 静态路由及其 SEO 元信息（中英文两套）
 * canonical 已按语言写好 /en 前缀；alternates 声明中英文互指。
 */
const staticRoutes = [
  {
    route: '/',
    zh: {
      title: '青枣工作室 - 创新装修与图片处理工具',
      description: '青枣工作室提供装修流程导图、白底抠图等实用工具，让装修和图片处理更简单高效。',
      canonical: '/',
    },
    en: {
      title: 'Qingzao Studio - Innovative Renovation & Image Tools',
      description:
        'Qingzao Studio offers renovation flow maps and white-background image trimming tools, making renovation and image processing simpler and more efficient.',
      canonical: '/en',
    },
    alternates: { 'zh-CN': '/', 'en-US': '/en', 'x-default': '/' },
  },
  {
    route: '/products',
    zh: { title: '产品', description: '青枣工作室的产品：装修流程导图与 AI 白底抠图工具。', canonical: '/products' },
    en: {
      title: 'Products',
      description:
        'Qingzao Studio provides renovation flowchart and white-background image trimming tools, making renovation and image processing simpler and more efficient.',
      canonical: '/en/products',
    },
    alternates: { 'zh-CN': '/products', 'en-US': '/en/products', 'x-default': '/products' },
  },
  {
    route: '/about',
    zh: { title: '关于我们', description: '了解青枣工作室的理念、团队与所提供的工具。', canonical: '/about' },
    en: { title: 'About Us', description: 'Learn about Qingzao Studio’s philosophy, team, and tools.', canonical: '/en/about' },
    alternates: { 'zh-CN': '/about', 'en-US': '/en/about', 'x-default': '/about' },
  },
  {
    route: '/contact',
    zh: { title: '联系我们', description: '通过邮箱或社交媒体联系青枣工作室。', canonical: '/contact' },
    en: { title: 'Contact Us', description: 'Reach Qingzao Studio via email or social media.', canonical: '/en/contact' },
    alternates: { 'zh-CN': '/contact', 'en-US': '/en/contact', 'x-default': '/contact' },
  },
  {
    route: '/blog',
    zh: { title: '博客', description: '装修指南、图片处理技巧和产品更新。', canonical: '/blog' },
    en: { title: 'Blog', description: 'Decoration guides, image processing tips, and product updates.', canonical: '/en/blog' },
    alternates: { 'zh-CN': '/blog', 'en-US': '/en/blog', 'x-default': '/blog' },
  },
  {
    route: '/privacy',
    zh: { title: '隐私政策', description: '青枣工作室隐私政策，说明数据收集与使用方式。', canonical: '/privacy' },
    en: { title: 'Privacy Policy', description: 'Qingzao Studio Privacy Policy — how we collect and use your data.', canonical: '/en/privacy' },
    alternates: { 'zh-CN': '/privacy', 'en-US': '/en/privacy', 'x-default': '/privacy' },
  },
  {
    route: '/terms',
    zh: { title: '服务条款', description: '青枣工作室服务条款。', canonical: '/terms' },
    en: { title: 'Terms of Service', description: 'Qingzao Studio Terms of Service.', canonical: '/en/terms' },
    alternates: { 'zh-CN': '/terms', 'en-US': '/en/terms', 'x-default': '/terms' },
  },
  {
    route: '/disclaimer',
    zh: { title: '免责声明', description: '青枣工作室免责声明。', canonical: '/disclaimer' },
    en: { title: 'Disclaimer', description: 'Qingzao Studio Disclaimer.', canonical: '/en/disclaimer' },
    alternates: { 'zh-CN': '/disclaimer', 'en-US': '/en/disclaimer', 'x-default': '/disclaimer' },
  },
  {
    route: '/404',
    zh: { title: '页面未找到', description: '抱歉，您访问的页面不存在。', canonical: '/404' },
    en: { title: 'Page Not Found', description: 'Sorry, the page you are looking for does not exist.', canonical: '/en/404' },
    alternates: { 'zh-CN': '/404', 'en-US': '/en/404', 'x-default': '/404' },
  },
]

/**
 * 读取博客文章数据（中英文索引）
 * @returns {{zh: object[], en: object[]}} 文章元数据数组
 */
function getPostsData() {
  const read = (file) => JSON.parse(readFileSync(resolve(ROOT, `src/data/posts/${file}`), 'utf8'))
  return { zh: read('posts-zh.json'), en: read('posts-en.json') }
}

/**
 * 在 articles 目录树中按文件名精确查找一个 Markdown 文件
 * @param {string} dir - 起始目录
 * @param {string} name - 目标文件名，如 "house-acceptance-inspection-en.md"
 * @returns {string|null} 文件绝对路径
 */
function findByName(dir, name) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      const found = findByName(full, name)
      if (found) return found
    } else if (entry.name === name) {
      return full
    }
  }
  return null
}

/**
 * 读取某篇文章的 Markdown 正文
 * 优先读取对应语言版本（${slug}-zh.md / ${slug}-en.md），回退到 ${slug}.md。
 * @param {string} slug - 文章 slug
 * @param {'zh'|'en'} locale - 目标语言
 * @returns {string} Markdown 正文
 */
function getMarkdown(slug, locale = 'zh') {
  const candidates =
    locale === 'en' ? [`${slug}-en.md`, `${slug}.md`] : [`${slug}-zh.md`, `${slug}.md`]
  for (const name of candidates) {
    const filePath = findByName(ARTICLES_DIR, name)
    if (filePath && existsSync(filePath)) {
      const content = readFileSync(filePath, 'utf8')
      if (content.trim()) return content
    }
  }
  return ''
}

/**
 * 根据语言格式化日期
 * @param {string} dateStr - ISO 日期
 * @param {'zh'|'en'} locale - 目标语言
 * @returns {string} 格式化日期
 */
function formatDate(dateStr, locale = 'zh') {
  const d = new Date(dateStr)
  if (locale === 'en') {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

/**
 * 生成单篇博客文章的静态 HTML 片段（含头部、正文、相关文章）
 * 使用与 BlogPostPage 一致的 class 命名，保证静态版本也能正确套用样式。
 * @param {object} post - 文章元数据
 * @param {object[]} related - 同语言的相关文章元数据
 * @param {'zh'|'en'} locale - 目标语言
 * @returns {string} 文章区域 HTML
 */
function buildPostHtml(post, related, locale = 'zh') {
  const body = markdownToHtml(getMarkdown(post.slug, locale))

  const labels =
    locale === 'en'
      ? { home: 'Home', blog: 'Blog', related: 'Related Posts', back: '← Back to Blog', sep: '/' }
      : { home: '首页', blog: '博客', related: '相关文章', back: '← 返回博客列表', sep: '/' }

  const tagsHtml = (post.tags || [])
    .map((tag) => `<span class="post-tag-badge">#${esc(tag)}</span>`)
    .join('')

  const relatedHtml =
    related.length > 0
      ? `<section class="related-posts">
      <div class="container">
        <h2 class="related-title">${labels.related}</h2>
        <div class="related-grid">
${related
  .map(
    (r) => `          <article class="related-card">
            <div class="related-meta">
              <span class="related-category">${esc(r.category)}</span>
              <span class="related-date">${formatDate(r.date, locale)}</span>
            </div>
            <h3 class="related-title-link"><a href="/blog/${esc(r.slug)}">${esc(r.title)}</a></h3>
            <p class="related-excerpt">${esc(r.excerpt)}</p>
          </article>`,
  )
  .join('\n')}
        </div>
      </div>
    </section>`
      : ''

  return `<div class="blog-post-page">
      <section class="post-header">
        <div class="container">
          <div class="post-breadcrumb">
            <a href="/">${labels.home}</a><span class="breadcrumb-separator">${labels.sep}</span>
            <a href="/blog">${labels.blog}</a><span class="breadcrumb-separator">${labels.sep}</span>
            <span class="breadcrumb-current">${esc(post.title)}</span>
          </div>
          <div class="post-meta-top">
            <span class="post-category-badge">${esc(post.category)}</span>
            <span class="post-date-badge">${formatDate(post.date, locale)}</span>
            <div class="post-tags-top">${tagsHtml}</div>
          </div>
        </div>
      </section>

      <section class="post-body">
        <div class="container">
          <div class="post-content">
${body}
          </div>
        </div>
      </section>

${relatedHtml}
      <section class="post-footer">
        <div class="container">
          <a href="/blog" class="back-to-blog">${labels.back}</a>
        </div>
      </section>
    </div>`
}

/**
 * 生成 JSON-LD 结构化数据字符串（URL 随语言前缀变化）
 * @param {object} post - 文章元数据
 * @param {'zh'|'en'} locale - 目标语言
 * @returns {string} <script> 标签内容
 */
function buildJsonLd(post, locale = 'zh') {
  const postPath = locale === 'en' ? `/en/blog/${post.slug}` : `/blog/${post.slug}`
  const homePath = locale === 'en' ? '/en' : '/'
  const blogPath = locale === 'en' ? '/en/blog' : '/blog'
  const names = locale === 'en' ? { home: 'Home', blog: 'Blog' } : { home: '首页', blog: '博客' }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: { '@type': 'Organization', name: '青枣工作室', url: SITE_URL },
        publisher: { '@type': 'Organization', name: '青枣工作室', url: SITE_URL },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${postPath}` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: names.home, item: `${SITE_URL}${homePath}` },
          { '@type': 'ListItem', position: 2, name: names.blog, item: `${SITE_URL}${blogPath}` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}${postPath}` },
        ],
      },
    ],
  }
  return `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
}

/**
 * 把 SEO 元信息注入到 HTML <head>
 * @param {string} html - 原始模板 HTML
 * @param {object} meta - { title, description, canonical }
 * @param {object} [opts] - { locale, alternates }
 * @returns {string} 注入后的 HTML
 */
function injectHead(html, meta, { locale = 'zh-CN', alternates } = {}) {
  let out = html
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
  out = out.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escAttr(meta.description)}">`)

  const canonicalUrl = `${SITE_URL}${meta.canonical}`

  // 注意：hreflang 备用链接只在客户端由 SEO 组件（react-helmet-async）输出，
  // 这里不再注入，避免与 Helmet 重复生成导致页面中出现两份 <link rel="alternate">。
  // canonical / og / description 仍注入静态 HTML，以满足「无 JS 爬虫」也能读到正确元信息
  // （AdSense 低价值内容整改的关键点）。Google 会执行 JS 渲染，因此同样能拿到 hreflang。
  const headExtra = [
    `<link rel="canonical" href="${canonicalUrl}">`,
    `<meta property="og:title" content="${escAttr(meta.title)}">`,
    `<meta property="og:description" content="${escAttr(meta.description)}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:url" content="${canonicalUrl}">`,
    `<meta property="og:site_name" content="青枣工作室">`,
    `<meta property="og:locale" content="${locale === 'en' ? 'en_US' : 'zh_CN'}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escAttr(meta.title)}">`,
    `<meta name="twitter:description" content="${escAttr(meta.description)}">`,
  ].join('\n    ')

  out = out.replace('</head>', `    ${headExtra}\n  </head>`)
  // 同步 <html lang> 属性
  out = out.replace(/<html lang="[^"]*">/, `<html lang="${locale === 'en' ? 'en' : 'zh-CN'}">`)
  return out
}

/**
 * 写入一个预渲染的 HTML 文件
 * @param {string} template - 未经修改的 dist/index.html 模板内容
 * @param {string} route - 路由路径（如 /en/blog/<slug>）
 * @param {object} options - { meta, bodyHtml?, jsonLd?, alternates?, locale? }
 */
function writeRoute(template, route, { meta, bodyHtml = '', jsonLd = '', alternates, locale = 'zh-CN' }) {
  let html = injectHead(template, meta, { locale, alternates })

  if (jsonLd) {
    html = html.replace('</head>', `    ${jsonLd}\n  </head>`)
  }

  if (bodyHtml) {
    html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`)
  }

  // 关键：生成扁平 .html 文件（如 dist/blog/smart-home-system.html 或 dist/en/blog/<slug>.html），
  // 而非目录式 index.html。原因：Vercel 对目录 index.html 会把「无斜杠」URL 308 重定向到「带斜杠」版本，
  // 导致 (1) GSC 报「网页会自动重定向」、(2) 重定向后 canonical 与收录 URL 不一致报「重复网页/规范冲突」。
  // 扁平 .html 让「无斜杠」URL 直接命中真实静态文件（200、无重定向），与 sitemap / canonical（均为无斜杠）一致。
  const filePath =
    route === '/'
      ? resolve(DIST_DIR, 'index.html')
      : resolve(DIST_DIR, `${route.slice(1)}.html`)

  const dir = dirname(filePath)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(filePath, html, 'utf8')
  console.log(`  ✅ ${route} → ${filePath}`)
}

/**
 * 主函数
 */
function main() {
  console.log('\n🏗️ 开始预渲染...\n')

  // 确保生产构建已存在（构建流 build:full 中 vite build 已先执行，此处跳过）
  if (!existsSync(resolve(DIST_DIR, 'index.html'))) {
    console.log('📦 未检测到 dist/index.html，先执行 vite build...')
    execSync('npx vite build', { stdio: 'inherit' })
  }

  // 读取「纯净」模板（不可被任何路由的写入污染，所有路由都基于它生成）
  const baseTemplate = readFileSync(resolve(DIST_DIR, 'index.html'), 'utf8')

  // 1. 静态路由：中文 + 英文各一份
  console.log('📄 生成静态路由 HTML（中 / 英）...')
  for (const r of staticRoutes) {
    writeRoute(baseTemplate, r.route, { meta: r.zh, alternates: r.alternates, locale: 'zh-CN' })
    const enRoute = r.route === '/' ? '/en' : `/en${r.route}`
    writeRoute(baseTemplate, enRoute, { meta: r.en, alternates: r.alternates, locale: 'en' })
  }

  // 2. 博客文章：中文 /blog/<slug> 与英文 /en/blog/<slug> 各一份（含全文 + JSON-LD + hreflang）
  const { zh: postsZh, en: postsEn } = getPostsData()
  console.log('\n📝 生成博客文章静态 HTML（含全文，中 / 英）...')

  for (const post of postsZh) {
    const related = postsZh.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3)
    const alternates = {
      'zh-CN': `/blog/${post.slug}`,
      'en-US': `/en/blog/${post.slug}`,
      'x-default': `/blog/${post.slug}`,
    }
    writeRoute(baseTemplate, `/blog/${post.slug}`, {
      meta: { title: `${post.title} - 青枣工作室`, description: post.excerpt, canonical: `/blog/${post.slug}` },
      bodyHtml: buildPostHtml(post, related, 'zh'),
      jsonLd: buildJsonLd(post, 'zh'),
      alternates,
      locale: 'zh-CN',
    })
  }

  for (const post of postsEn) {
    const related = postsEn.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3)
    const alternates = {
      'zh-CN': `/blog/${post.slug}`,
      'en-US': `/en/blog/${post.slug}`,
      'x-default': `/blog/${post.slug}`,
    }
    writeRoute(baseTemplate, `/en/blog/${post.slug}`, {
      meta: { title: `${post.title} - Qingzao Studio`, description: post.excerpt, canonical: `/en/blog/${post.slug}` },
      bodyHtml: buildPostHtml(post, related, 'en'),
      jsonLd: buildJsonLd(post, 'en'),
      alternates,
      locale: 'en',
    })
  }

  const total = staticRoutes.length * 2 + postsZh.length + postsEn.length
  console.log(`\n🎉 预渲染完成！共生成 ${total} 个路由文件（静态 ${staticRoutes.length * 2} + 博客 ${postsZh.length + postsEn.length}）。\n`)
}

main()
