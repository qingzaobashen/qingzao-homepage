const markdownModules = import.meta.glob('./articles/*.{md,txt}', {
  eager: true,
  import: 'default',
  query: '?raw'
})

function normalizeLanguage(language) {
  if (language === 'zh-CN') return 'zh'
  if (language === 'en-US') return 'en'
  return language
}

export function getPostContent(slug, language, fallbackContent = '') {
  const locale = normalizeLanguage(language)
  const candidates = [
    `./articles/${slug}-${locale}.md`,
    `./articles/${slug}-${locale}.txt`,
    `./articles/${slug}.md`,
    `./articles/${slug}.txt`
  ]

  for (const candidate of candidates) {
    const content = markdownModules[candidate]
    if (typeof content === 'string' && content.trim()) {
      return content
    }
  }

  return fallbackContent || ''
}
