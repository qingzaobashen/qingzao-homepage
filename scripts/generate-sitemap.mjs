/**
 * Sitemap 生成脚本
 * 读取所有路由和博客文章数据，生成 sitemap.xml
 * 在构建后自动执行
 */

import { writeFileSync } from 'fs'
import { readFileSync } from 'fs'

const BASE_URL = 'https://qingzao.site'

/** 静态路由及其优先级和更新频率 */
const staticPages = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'weekly', priority: '0.9' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/disclaimer', changefreq: 'yearly', priority: '0.3' },
  { path: '/editorial', changefreq: 'yearly', priority: '0.4' },
]

/**
 * 获取所有博客文章 URL
 * @returns {Array} 文章页面信息数组
 */
function getBlogPages() {
  try {
    const postsZh = JSON.parse(readFileSync('src/data/posts/posts-zh.json', 'utf8'))
    return postsZh.map(post => ({
      path: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: post.date,
    }))
  } catch (e) {
    console.warn('⚠️ 读取博客数据失败:', e.message)
    return []
  }
}

/**
 * 生成 sitemap.xml 内容
 * @param {Array} pages - 页面信息数组
 * @returns {string} XML 内容
 */
function generateSitemap(pages) {
  const urls = pages.map(page => `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

/**
 * 主函数
 */
function main() {
  const blogPages = getBlogPages()
  const allPages = [...staticPages, ...blogPages]

  const sitemap = generateSitemap(allPages)
  writeFileSync('public/sitemap.xml', sitemap, 'utf8')

  console.log(`✅ sitemap.xml 已生成，共 ${allPages.length} 个 URL`)
}

main()
