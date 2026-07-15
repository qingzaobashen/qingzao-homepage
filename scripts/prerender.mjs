/**
 * 预渲染脚本（构建时静态生成）
 *
 * 目标：解决 AdSense「低价值内容」审核中的「SPA 正文靠 JS 运行时渲染」问题
 * （见 docs/Ads/googleAds政策/低价值内容改进计划0714.md 的 问题4）。
 *
 * 做法：在 `vite build` 之后，为每个博客文章生成一份「首屏即含全文」的静态
 * HTML（dist/blog/<slug>/index.html），并把正确的 <title> / description /
 * canonical / JSON-LD 注入 <head>。这样 AdSense 爬虫拿到的初始 HTML 就包含
 * 文章正文，无需等待 JS 加载。
 *
 * 复用 `src/data/posts/markdownToHtml.js`（与客户端 BlogPostPage 同一套转换逻辑），
 * 保证预渲染结果与运行时渲染完全一致，避免内容漂移。
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
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
 * 静态路由及其 SEO 元信息
 * 这些页面首屏为 SPA 外壳，这里仅为静态 HTML 补全正确的标题与描述。
 */
const staticRoutes = [
  { route: '/', title: '青枣工作室 - 创新装修与图片处理工具', description: '青枣工作室提供装修流程导图、白底抠图等实用工具，让装修和图片处理更简单高效。', canonical: '/' },
  { route: '/products', title: '产品', description: '青枣工作室的产品：装修流程导图与 AI 白底抠图工具。', canonical: '/products' },
  { route: '/about', title: '关于我们', description: '了解青枣工作室的理念、团队与所提供的工具。', canonical: '/about' },
  { route: '/contact', title: '联系我们', description: '通过邮箱或社交媒体联系青枣工作室。', canonical: '/contact' },
  { route: '/blog', title: '博客', description: '装修指南、图片处理技巧和产品更新。', canonical: '/blog' },
  { route: '/privacy', title: '隐私政策', description: '青枣工作室隐私政策，说明数据收集与使用方式。', canonical: '/privacy' },
  { route: '/terms', title: '服务条款', description: '青枣工作室服务条款。', canonical: '/terms' },
  { route: '/disclaimer', title: '免责声明', description: '青枣工作室免责声明。', canonical: '/disclaimer' },
  { route: '/404', title: '页面未找到', description: '抱歉，您访问的页面不存在。', canonical: '/404' },
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
 * 读取某篇文章的 Markdown 正文（复刻 postContentLoader 的候选逻辑）
 * 默认读取中文版本（站点默认语言）。
 * @param {string} slug - 文章 slug
 * @returns {string} Markdown 正文
 */
function getMarkdown(slug) {
  const candidates = [
    `${slug}-zh.md`,
    `${slug}.md`,
  ]
  for (const name of candidates) {
    const filePath = resolve(ARTICLES_DIR, name)
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, 'utf8')
      if (content.trim()) return content
    }
  }
  return ''
}

/**
 * 格式化日期为中文展示
 * @param {string} dateStr - ISO 日期
 * @returns {string} 格式化日期
 */
function formatDate(dateStr) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

/**
 * 生成单篇博客文章的静态 HTML 片段（含头部、正文、相关文章）
 * 使用与 BlogPostPage 一致的 class 命名，保证静态版本也能正确套用样式。
 * @param {object} post - 文章元数据
 * @param {object[]} related - 相关文章元数据
 * @returns {string} 文章区域 HTML
 */
function buildPostHtml(post, related) {
  const body = markdownToHtml(getMarkdown(post.slug))

  const tagsHtml = (post.tags || [])
    .map((tag) => `<span class="post-tag-badge">#${esc(tag)}</span>`)
    .join('')

  const relatedHtml =
    related.length > 0
      ? `<section class="related-posts">
      <div class="container">
        <h2 class="related-title">相关文章</h2>
        <div class="related-grid">
${related
  .map(
    (r) => `          <article class="related-card">
            <div class="related-meta">
              <span class="related-category">${esc(r.category)}</span>
              <span class="related-date">${formatDate(r.date)}</span>
            </div>
            <h3 class="related-title-link"><a href="/blog/${esc(r.slug)}">${esc(r.title)}</a></h3>
            <p class="related-excerpt">${esc(r.excerpt)}</p>
          </article>`
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
            <a href="/">首页</a><span class="breadcrumb-separator">/</span>
            <a href="/blog">博客</a><span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${esc(post.title)}</span>
          </div>
          <div class="post-meta-top">
            <span class="post-category-badge">${esc(post.category)}</span>
            <span class="post-date-badge">${formatDate(post.date)}</span>
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
          <a href="/blog" class="back-to-blog">← 返回博客列表</a>
        </div>
      </section>
    </div>`
}

/**
 * 生成 JSON-LD 结构化数据字符串
 * @param {object} post - 文章元数据
 * @returns {string} <script> 标签内容
 */
function buildJsonLd(post) {
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
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首页', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: '博客', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
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
 * @returns {string} 注入后的 HTML
 */
function injectHead(html, meta) {
  let out = html
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
  out = out.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escAttr(meta.description)}">`)

  const canonicalUrl = `${SITE_URL}${meta.canonical}`
  const headExtra = [
    `<link rel="canonical" href="${canonicalUrl}">`,
    `<meta property="og:title" content="${escAttr(meta.title)}">`,
    `<meta property="og:description" content="${escAttr(meta.description)}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:url" content="${canonicalUrl}">`,
    `<meta property="og:site_name" content="青枣工作室">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escAttr(meta.title)}">`,
    `<meta name="twitter:description" content="${escAttr(meta.description)}">`,
  ].join('\n    ')

  out = out.replace('</head>', `    ${headExtra}\n  </head>`)
  return out
}

/**
 * 写入一个预渲染的 HTML 文件
 * @param {string} template - 未经修改的 dist/index.html 模板内容
 * @param {string} route - 路由路径
 * @param {object} options - { meta, bodyHtml?, jsonLd? }
 */
function writeRoute(template, route, { meta, bodyHtml = '', jsonLd = '' }) {
  let html = injectHead(template, meta)

  if (jsonLd) {
    html = html.replace('</head>', `    ${jsonLd}\n  </head>`)
  }

  if (bodyHtml) {
    html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`)
  }

  const filePath =
    route === '/'
      ? resolve(DIST_DIR, 'index.html')
      : resolve(DIST_DIR, route.slice(1), 'index.html')

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

  // 1. 静态路由：补全标题与描述
  console.log('📄 生成静态路由 HTML...')
  for (const r of staticRoutes) {
    writeRoute(baseTemplate, r.route, { meta: r })
  }

  // 2. 博客文章：注入全文 + JSON-LD
  // 注意：中英文文章共用同一 slug，静态文件只能代表一种语言。
  // 这里预渲染默认语言（中文）版本，英文由 SPA 在客户端切换。
  console.log('\n📝 生成博客文章静态 HTML（含全文，默认中文）...')
  const { zh: postsZh } = getPostsData()
  let count = 0

  for (const post of postsZh) {
    // 同分类的其他文章作为「相关文章」
    const related = postsZh
      .filter((p) => p.category === post.category && p.slug !== post.slug)
      .slice(0, 3)

    const meta = {
      title: `${post.title} - 青枣工作室`,
      description: post.excerpt,
      canonical: `/blog/${post.slug}`,
    }
    writeRoute(baseTemplate, `/blog/${post.slug}`, {
      meta,
      bodyHtml: buildPostHtml(post, related),
      jsonLd: buildJsonLd(post),
    })
    count++
  }

  console.log(`\n🎉 预渲染完成！共生成 ${staticRoutes.length + count} 个路由文件，其中博客文章 ${count} 篇。\n`)
}

main()
