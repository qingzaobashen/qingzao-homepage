/**
 * 编辑方针页面组件
 * 独立路由页面，URL: /editorial
 * 使用 LegalPage 通用布局渲染编辑方针内容，证明站点是真实、有主体的站点。
 */

import React, { useEffect } from 'react'
import SEO from '../components/SEO'
import LegalPage from './LegalPage'
import { useLanguage } from '../hooks/useLanguage'

/**
 * 编辑方针页面
 * @returns {JSX.Element} 编辑方针独立页面
 */
function EditorialPage() {
  const { localePath } = useLanguage()

  /** 页面加载时滚动到顶部 */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title="编辑方针"
        description="了解青枣工作室如何选题、创作与维护博客内容：全部原创、基于真实经验、与产品主线强相关。"
        canonical={localePath('/editorial')}
        alternates={{
          'zh-CN': '/editorial',
          'en-US': '/en/editorial',
          'x-default': '/editorial',
        }}
      />
      <LegalPage
        titleKey="legal.editorial.title"
        introKey="legal.editorial.intro"
        sectionsKey="legal.editorial.sections"
      />
    </>
  )
}

export default EditorialPage
