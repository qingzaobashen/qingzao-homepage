/**
 * Markdown 转 HTML 共享模块
 *
 * 该模块提供纯函数 `markdownToHtml`，将博客文章的 Markdown 正文转换为 HTML 字符串。
 * 它被两处复用，以保证「运行时渲染」与「构建时预渲染」输出完全一致：
 *   1. 客户端组件 `BlogPostPage.jsx`（通过 dangerouslySetInnerHTML 注入）
 *   2. 构建脚本 `scripts/prerender.mjs`（生成静态 HTML，供 AdSense 爬虫直接抓取）
 *
 * 设计为纯 JS（不依赖 React / JSX），因此既能被 Vite 在浏览器环境加载，
 * 也能被 Node 构建脚本直接 import。
 */

/**
 * 行内格式转换：粗体、删除线、行内代码、链接
 * 顺序很重要：先处理代码（避免其内部字符被其它规则误伤），再处理链接与强调。
 * @param {string} text - 原始行内文本
 * @returns {string} 转换后的 HTML 片段
 */
function renderInline(text) {
  let result = text
  // 行内代码（最高优先级，内部内容不再参与其它替换）
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>')
  // 粗体
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // 删除线
  result = result.replace(/~~(.*?)~~/g, '<del>$1</del>')
  // 链接 [文本](地址)
  result = result.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  )
  return result
}

/**
 * 将多行 Markdown 内容转换为 HTML 字符串
 * 支持：标题(h1-h6)、段落、有序/无序列表、表格、代码块、引用、分割线、行内格式。
 * @param {string} content - Markdown 正文
 * @returns {string} HTML 字符串（块级元素按行拼接）
 */
export function markdownToHtml(content) {
  if (!content) return ''

  const lines = content.split('\n')
  const blocks = []

  let inList = false
  let listItems = []
  let inTable = false
  let tableRows = []
  let tableHeaders = []
  let inCodeBlock = false
  let codeLines = []
  let codeLanguage = ''
  let inQuote = false
  let quoteLines = []

  /**
   * 冲刷当前累积的列表，生成 <ul>
   */
  const flushList = () => {
    if (listItems.length === 0) {
      inList = false
      return
    }
    const lis = listItems.map((item) => `      <li>${item}</li>`).join('\n')
    blocks.push(`    <ul class="content-list">\n${lis}\n    </ul>`)
    listItems = []
    inList = false
  }

  /**
   * 冲刷当前累积的表格，生成 <table>
   * 约定：首行作为表头，其余作为表体（与组件逻辑一致）
   */
  const flushTable = () => {
    if (tableRows.length === 0) return
    const bodyRows = tableHeaders.length > 0 ? tableRows.slice(1) : tableRows
    const headers = tableHeaders.length > 0 ? tableHeaders : tableRows[0]

    const thead = tableHeaders.length > 0
      ? `      <thead>\n        <tr>\n${headers
          .map((cell) => `          <th>${renderInline(cell.trim())}</th>`)
          .join('\n')}\n        </tr>\n      </thead>\n`
      : ''

    const tbody = `      <tbody>\n${bodyRows
      .map(
        (row) =>
          `        <tr>\n${row
            .map((cell) => `          <td>${renderInline(cell.trim())}</td>`)
            .join('\n')}\n        </tr>`
      )
      .join('\n')}\n      </tbody>`

    blocks.push(`    <table class="content-table">\n${thead}${tbody}\n    </table>`)
    tableRows = []
    tableHeaders = []
    inTable = false
  }

  /**
   * 冲刷当前累积的代码块，生成 <pre><code>
   */
  const flushCodeBlock = () => {
    if (codeLines.length === 0) {
      inCodeBlock = false
      return
    }
    const codeContent = codeLines.join('\n')
    blocks.push(
      `    <pre class="content-pre"><code class="content-code language-${codeLanguage}">${codeContent}</code></pre>`
    )
    codeLines = []
    codeLanguage = ''
    inCodeBlock = false
  }

  /**
   * 冲刷当前累积的引用块，生成 <blockquote>
   */
  const flushQuote = () => {
    if (quoteLines.length === 0) {
      inQuote = false
      return
    }
    const inner = quoteLines.map((line) => `      <p>${renderInline(line)}</p>`).join('\n')
    blocks.push(`    <blockquote>\n${inner}\n    </blockquote>`)
    quoteLines = []
    inQuote = false
  }

  const isTableSeparator = (line) => /^\|[\s:-]+\|[\s:-]*\|/.test(line)

  for (const line of lines) {
    const trimmed = line.trim()

    // 代码块边界
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock()
      } else {
        flushList()
        flushTable()
        flushQuote()
        inCodeBlock = true
        codeLanguage = trimmed.slice(3).trim()
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    // 空行：冲刷所有待定块
    if (trimmed === '') {
      flushList()
      flushTable()
      flushQuote()
      continue
    }

    // 引用块（以 > 开头）
    if (trimmed.startsWith('>')) {
      flushList()
      flushTable()
      inQuote = true
      quoteLines.push(trimmed.replace(/^>\s?/, ''))
      continue
    } else if (inQuote) {
      flushQuote()
    }

    // 分割线
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushList()
      flushTable()
      blocks.push('    <hr class="content-hr" />')
      continue
    }

    // 标题 H1-H6
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      flushList()
      flushTable()
      const level = headingMatch[1].length
      const text = headingMatch[2]
      blocks.push(`    <h${level} class="content-h${level}">${text}</h${level}>`)
      continue
    }

    // 表格行
    if (line.includes('|')) {
      flushList()
      flushQuote()
      if (isTableSeparator(line)) continue
      const cells = line.split('|').filter((c) => c !== '')
      if (!inTable) {
        inTable = true
        tableRows = []
        tableHeaders = []
      }
      if (tableRows.length === 0) {
        tableHeaders = cells
      }
      tableRows.push(cells)
      continue
    }

    // 有序列表
    if (trimmed.match(/^\d+\.\s/)) {
      flushTable()
      flushQuote()
      listItems.push(renderInline(trimmed.replace(/^\d+\.\s/, '')))
      inList = true
      continue
    }

    // 无序列表
    if (trimmed.match(/^[-*]\s/)) {
      flushTable()
      flushQuote()
      listItems.push(renderInline(trimmed.replace(/^[-*]\s/, '')))
      inList = true
      continue
    }

    // 普通段落
    flushList()
    flushTable()
    flushQuote()
    blocks.push(`    <p class="content-paragraph">${renderInline(line)}</p>`)
  }

  flushList()
  flushTable()
  flushQuote()
  flushCodeBlock()

  return blocks.join('\n')
}

export default markdownToHtml
