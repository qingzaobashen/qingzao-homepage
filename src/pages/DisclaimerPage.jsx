/**
 * 免责声明页面组件
 * 独立路由页面，URL: /disclaimer
 * 使用 LegalPage 通用布局渲染免责声明内容
 */

import React, { useEffect } from 'react'
import SEO from '../components/SEO'
import LegalPage from './LegalPage'

/**
 * 免责声明页面
 * @returns {JSX.Element} 免责声明独立页面
 */
function DisclaimerPage() {
  /** 页面加载时滚动到顶部 */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title="免责声明"
        description="青枣工作室免责声明，了解网站内容的使用范围和责任限制。"
        canonical="/disclaimer"
      />
      <LegalPage
        titleKey="legal.disclaimer.title"
        introKey="legal.disclaimer.intro"
        sectionsKey="legal.disclaimer.sections"
      />
    </>
  )
}

export default DisclaimerPage
