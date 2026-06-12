/**
 * 语言切换 Hook
 * 提供便捷的语言上下文访问接口
 */

import { useContext } from 'react'
import { LanguageContext } from '../contexts/LanguageContext'

/**
 * 使用语言 Hook
 * 提供访问语言上下文的便捷方法
 *
 * @returns {Object} 语言上下文对象
 * @returns {string} language - 当前语言
 * @returns {Function} setLanguage - 切换语言函数
 * @returns {Function} t - 获取翻译文本函数
 * @returns {Array} availableLanguages - 可用语言列表
 * @throws {Error} 如果在 LanguageProvider 外部使用，会抛出错误
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}