// 递归扫描 articles 目录（含子目录，如 Decoration_articles/），
// 这样把文章按主题放进子文件夹也能被正确加载。
const markdownModules = import.meta.glob('./articles/**/*.{md,txt}', {
  eager: true,
  import: 'default',
  query: '?raw'
})

function normalizeLanguage(language) {
  if (language === 'zh-CN') return 'zh'
  if (language === 'en-US') return 'en'
  return language
}

/**
 * 按文件名（basename）在已加载模块中查找内容
 * @param {string} basename - 目标文件名，如 "house-acceptance-inspection-zh.md"
 * @returns {string|undefined} 文件文本内容
 */
function findByBasename(basename) {
  for (const key of Object.keys(markdownModules)) {
    if (key.split('/').pop() === basename) return markdownModules[key]
  }
  return undefined
}

export function getPostContent(slug, language, fallbackContent = '') {
  const locale = normalizeLanguage(language)
  const candidates = [
    `${slug}-${locale}.md`,
    `${slug}-${locale}.txt`,
    `${slug}.md`,
    `${slug}.txt`
  ]

  for (const candidate of candidates) {
    const content = findByBasename(candidate)
    if (typeof content === 'string' && content.trim()) {
      return content
    }
  }

  return fallbackContent || ''
}
