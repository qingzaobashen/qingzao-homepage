/**
 * 文章主题簇定义模块
 *
 * 将博客文章按主题归类，用于在文章详情页生成「相关主题」内链，
 * 让同主题文章互相链接、形成 topical authority 簇（装修类互链、抠图类互链）。
 *
 * 注意：本模块只描述「主题归属」，不修改任何文章正文内容。
 * 新增/调整文章时，只需在此处更新对应簇的 slug 列表即可。
 */

// 装修全流程簇：装修指南全部 + 智能家居 + 产品教程 + 家居收纳/小户型（均与装修强相关）
const renovationCluster = [
  'house-acceptance-inspection',
  'planning-stage',
  'renovation-method-choice',
  'budget-planning',
  'decoration-company-checklist',
  'studio-checklist',
  'individual-foreman-checklist',
  'individual-designer-checklist',
  'design-style-selection',
  'design-details-reference',
  'design-drawings-render-final',
  'main-auxiliary-materials-selection',
  'hard-decoration-knowledge',
  'soft-decoration-knowledge',
  'contract-signing-notes',
  'self-renovation-pitfalls',
  'decoration-guide-beginners',
  'decoration-budget-guide',
  'decoration-style-comparison',
  'decoration-mistakes',
  'small-apartment-decoration',
  'smart-home-system',
  'decoration-flowchart-tutorial',
  'home-storage-solutions',
]

// 图片处理簇：抠图 / 白底图 / 图片格式相关
const imageCluster = [
  'batch-background-removal',
  'online-background-removal-tools',
  'product-photo-guide',
  'image-format-guide',
]

// 工具评测簇
const toolsCluster = [
  'choose-right-tools',
]

// slug -> 簇名 的反查表，便于 O(1) 定位文章归属
const clusterMap = {}
;[...renovationCluster].forEach((s) => { clusterMap[s] = 'renovation' })
;[...imageCluster].forEach((s) => { clusterMap[s] = 'image' })
;[...toolsCluster].forEach((s) => { clusterMap[s] = 'tools' })

/**
 * 获取指定文章所在主题簇的其它文章（用于文章页「相关主题」内链）
 * @param {string} slug - 当前文章 slug
 * @param {object[]} postsData - 同语言文章元数据数组
 * @param {number} [limit=4] - 返回数量上限
 * @returns {object[]} 同簇其它文章（排除自身），按元数据顺序返回
 */
function getClusterPosts(slug, postsData, limit = 4) {
  const cluster = clusterMap[slug]
  if (!cluster) return []

  const slugs =
    cluster === 'renovation' ? renovationCluster
      : cluster === 'image' ? imageCluster
        : toolsCluster

  return slugs
    .filter((s) => s !== slug)
    .map((s) => postsData.find((p) => p.slug === s))
    .filter(Boolean)
    .slice(0, limit)
}

export { getClusterPosts }
