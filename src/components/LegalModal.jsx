/**
 * 法律文档模态窗口组件
 * 用于展示隐私政策和服务条款内容
 * 支持多语言显示，响应式设计
 */

import React, { useEffect, useCallback } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import './LegalModal.css'

/**
 * 法律文档模态窗口组件
 *
 * @param {Object} props - 组件属性
 * @param {'privacy'|'terms'|null} props.type - 文档类型，privacy 为隐私政策，terms 为服务条款
 * @param {Function} props.onClose - 关闭模态窗口的回调函数
 * @returns {JSX.Element|null} 模态窗口组件
 */
function LegalModal({ type, onClose }) {
  const { t } = useLanguage()

  /**
   * 处理 ESC 键关闭模态窗口
   */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  /**
   * 处理遮罩层点击关闭
   */
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  /**
   * 注册/移除键盘事件监听，锁定页面滚动
   */
  useEffect(() => {
    if (type) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [type, handleKeyDown])

  if (!type) return null

  const isPrivacy = type === 'privacy'
  const titleKey = isPrivacy ? 'legal.privacy.title' : 'legal.terms.title'
  const contentKey = isPrivacy ? 'legal.privacy' : 'legal.terms'

  return (
    <div className="legal-modal-overlay" onClick={handleOverlayClick}>
      <div className="legal-modal" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">
        {/* 顶部栏 */}
        <div className="legal-modal-header">
          <h2 id="legal-modal-title" className="legal-modal-title">
            {t(titleKey)}
          </h2>
          <button
            className="legal-modal-close"
            onClick={onClose}
            aria-label={t('legal.close')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>
        </div>

        {/* 内容区 */}
        <div className="legal-modal-body">
          {isPrivacy ? <PrivacyContent t={t} /> : <TermsContent t={t} />}
        </div>
      </div>
    </div>
  )
}

/**
 * 隐私政策内容组件
 *
 * @param {Object} props - 组件属性
 * @param {Function} props.t - 翻译函数
 * @returns {JSX.Element} 隐私政策内容
 */
function PrivacyContent({ t }) {
  const sections = t('legal.privacy.sections')
  if (!Array.isArray(sections)) return null

  return (
    <>
      <p className="legal-modal-intro">{t('legal.privacy.intro')}</p>
      {sections.map((section, index) => (
        <div key={index} className="legal-section">
          <h3 className="legal-section-title">{section.title}</h3>
          {Array.isArray(section.content) ? (
            section.content.map((paragraph, pIndex) => (
              <p key={pIndex} className="legal-section-text">{paragraph}</p>
            ))
          ) : (
            <p className="legal-section-text">{section.content}</p>
          )}
        </div>
      ))}
    </>
  )
}

/**
 * 服务条款内容组件
 *
 * @param {Object} props - 组件属性
 * @param {Function} props.t - 翻译函数
 * @returns {JSX.Element} 服务条款内容
 */
function TermsContent({ t }) {
  const sections = t('legal.terms.sections')
  if (!Array.isArray(sections)) return null

  return (
    <>
      <p className="legal-modal-intro">{t('legal.terms.intro')}</p>
      {sections.map((section, index) => (
        <div key={index} className="legal-section">
          <h3 className="legal-section-title">{section.title}</h3>
          {Array.isArray(section.content) ? (
            section.content.map((paragraph, pIndex) => (
              <p key={pIndex} className="legal-section-text">{paragraph}</p>
            ))
          ) : (
            <p className="legal-section-text">{section.content}</p>
          )}
        </div>
      ))}
    </>
  )
}

export default LegalModal
