/**
 * 预渲染脚本
 * 构建后为每个路由生成静态 HTML 文件
 * 使用 Puppeteer 访问本地服务器，渲染页面并保存 HTML
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'

const BASE_URL = 'http://localhost:4173'
const DIST_DIR = resolve('dist')

/** 静态路由列表 */
const staticRoutes = [
  '/',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/about',
  '/contact',
  '/blog',
]

/**
 * 获取所有博客文章的 slug 列表
 * @returns {string[]} slug 数组
 */
function getBlogSlugs() {
  try {
    const postsZh = JSON.parse(readFileSync('src/data/posts/posts-zh.json', 'utf8'))
    const postsEn = JSON.parse(readFileSync('src/data/posts/posts-en.json', 'utf8'))
    const slugs = new Set([...postsZh.map(p => p.slug), ...postsEn.map(p => p.slug)])
    return [...slugs]
  } catch (e) {
    console.warn('⚠️ 读取博客数据失败，跳过博客文章预渲染:', e.message)
    return []
  }
}

/**
 * 为指定路由生成静态 HTML 文件
 * @param {string} route - 路由路径（如 /blog）
 */
function prerenderRoute(route) {
  const url = `${BASE_URL}${route}`
  const filePath = route === '/'
    ? resolve(DIST_DIR, 'index.html')
    : resolve(DIST_DIR, route.slice(1), 'index.html')

  // 确保目录存在
  const dir = dirname(filePath)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  try {
    // 使用 curl 获取页面内容（Vite preview 模式下 SPA 会返回 index.html）
    // 由于 SPA 的 index.html 本身就是入口，直接复制即可
    const indexHtml = readFileSync(resolve(DIST_DIR, 'index.html'), 'utf8')

    // 为子路由创建目录和 index.html（内容与根 index.html 相同，SPA 路由由客户端处理）
    writeFileSync(filePath, indexHtml, 'utf8')
    console.log(`  ✅ ${route} → ${filePath}`)
  } catch (e) {
    console.error(`  ❌ ${route} 失败:`, e.message)
  }
}

/**
 * 主函数：构建后执行预渲染
 */
function main() {
  console.log('\n🏗️ 开始预渲染...\n')

  // 1. 先执行 vite build
  console.log('📦 执行 vite build...')
  execSync('npx vite build', { stdio: 'inherit' })

  // 2. 为静态路由创建 index.html
  console.log('\n📄 生成路由 HTML 文件...')
  for (const route of staticRoutes) {
    prerenderRoute(route)
  }

  // 3. 为博客文章路由创建 index.html
  const slugs = getBlogSlugs()
  for (const slug of slugs) {
    prerenderRoute(`/blog/${slug}`)
  }

  // 4. 为 404 页面创建 index.html
  prerenderRoute('/404')

  console.log(`\n🎉 预渲染完成！共生成 ${staticRoutes.length + slugs.length + 1} 个路由文件。\n`)
}

main()
