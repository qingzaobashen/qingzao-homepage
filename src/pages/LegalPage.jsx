/**
 * 法律文档通用页面布局组件
 * 用于展示隐私政策、服务条款等法律文档的统一页面框架
 * 包含标题、引言、章节内容的结构化渲染
 */

import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import './LegalPage.css'

/**
 * 法律文档通用页面布局组件
 *
 * @param {Object} props - 组件属性
 * @param {string} props.titleKey - 标题的翻译键
 * @param {string} props.introKey - 引言的翻译键
 * @param {string} props.sectionsKey - 章节数组的翻译键
 * @returns {JSX.Element} 法律文档页面
 */
function LegalPage({ titleKey, introKey, sectionsKey }) {
  const { t } = useLanguage()

  const sections = t(sectionsKey, { returnObjects: true })
  const isValidSections = Array.isArray(sections)

  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-page-content">
          {/* 页面标题 */}
          <h1 className="legal-page-title">{t(titleKey)}</h1>

          {/* 引言 */}
          <p className="legal-page-intro">{t(introKey)}</p>

          {/* 章节列表 */}
          {isValidSections && sections.map((section, index) => (
            <section key={index} className="legal-section">
              <h2 className="legal-section-title">{section.title}</h2>
              {Array.isArray(section.content) ? (
                section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="legal-section-text">{paragraph}</p>
                ))
              ) : (
                <p className="legal-section-text">{section.content}</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LegalPage
