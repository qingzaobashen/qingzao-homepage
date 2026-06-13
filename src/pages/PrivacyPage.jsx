/**
 * 隐私政策页面组件
 * 独立路由页面，URL: /privacy
 * 使用 LegalPage 通用布局渲染隐私政策内容
 */

import React, { useEffect } from 'react'
import LegalPage from './LegalPage'

/**
 * 隐私政策页面
 * @returns {JSX.Element} 隐私政策独立页面
 */
function PrivacyPage() {
  /** 页面加载时滚动到顶部 */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <LegalPage
      titleKey="legal.privacy.title"
      introKey="legal.privacy.intro"
      sectionsKey="legal.privacy.sections"
    />
  )
}

export default PrivacyPage
