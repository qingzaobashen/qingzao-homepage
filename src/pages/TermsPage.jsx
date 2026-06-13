/**
 * 服务条款页面组件
 * 独立路由页面，URL: /terms
 * 使用 LegalPage 通用布局渲染服务条款内容
 */

import React, { useEffect } from 'react'
import SEO from '../components/SEO'
import LegalPage from './LegalPage'

/**
 * 服务条款页面
 * @returns {JSX.Element} 服务条款独立页面
 */
function TermsPage() {
  /** 页面加载时滚动到顶部 */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title="服务条款"
        description="青枣工作室服务条款，了解使用我们产品和服务的权利与义务。"
        canonical="/terms"
      />
      <LegalPage
        titleKey="legal.terms.title"
        introKey="legal.terms.intro"
        sectionsKey="legal.terms.sections"
      />
    </>
  )
}

export default TermsPage
