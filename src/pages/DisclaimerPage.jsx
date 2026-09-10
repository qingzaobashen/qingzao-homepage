/**
 * 免责声明页面组件
 * 独立路由页面，URL: /disclaimer
 * 使用 LegalPage 通用布局渲染免责声明内容
 */

import React, { useEffect } from 'react'
import SEO from '../components/SEO'
import LegalPage from './LegalPage'
import { useLanguage } from '../hooks/useLanguage'

/**
 * 免责声明页面
 * @returns {JSX.Element} 免责声明独立页面
 */
function DisclaimerPage() {
  const { t, localePath } = useLanguage()

  /** 页面加载时滚动到顶部 */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title={t('legal.disclaimer.title')}
        description={t('legal.disclaimer.seoDescription')}
        canonical={localePath('/disclaimer')}
        alternates={{
          'zh-CN': '/disclaimer',
          'en-US': '/en/disclaimer',
          'x-default': '/disclaimer',
        }}
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
