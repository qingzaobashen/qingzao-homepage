/**
 * BabyAI Art Studio 隐私政策页面组件
 * 独立路由页面，URL: /baby-ai-studio/privacy
 * 专门为「BabyAI Art Studio（婴儿照片编辑器）」App 编写的隐私政策，
 * 使用 LegalPage 通用布局渲染应用专属内容，满足 Google Play 审核要求。
 */

import React, { useEffect } from 'react'
import SEO from '../components/SEO'
import LegalPage from './LegalPage'
import { useLanguage } from '../hooks/useLanguage'

/**
 * BabyAI Art Studio 应用隐私政策页面
 * @returns {JSX.Element} 应用专属隐私政策独立页面
 */
function AppPrivacyPage() {
  const { t, localePath } = useLanguage()

  /** 页面加载时滚动到顶部 */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title={t('legal.appPrivacy.title')}
        description={t('legal.appPrivacy.seoDescription')}
        canonical={localePath('/baby-ai-studio/privacy')}
        alternates={{
          'zh-CN': '/baby-ai-studio/privacy',
          'en-US': '/en/baby-ai-studio/privacy',
          'x-default': '/baby-ai-studio/privacy',
        }}
      />
      <LegalPage
        titleKey="legal.appPrivacy.title"
        introKey="legal.appPrivacy.intro"
        sectionsKey="legal.appPrivacy.sections"
      />
    </>
  )
}

export default AppPrivacyPage
