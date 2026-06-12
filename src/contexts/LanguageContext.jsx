/**
 * 语言上下文模块
 * 提供多语言支持的 React Context
 * 支持语言切换、语言偏好记忆等功能
 */

import React, { createContext, useState, useEffect, useCallback } from 'react'
import zhCN from '../locales/zh-CN.json'
import enUS from '../locales/en-US.json'

/**
 * 语言资源映射
 */
const languageResources = {
  'zh-CN': zhCN,
  'en-US': enUS
}

/**
 * 语言上下文
 */
export const LanguageContext = createContext(undefined)

/**
 * localStorage 存储键名
 */
const LANGUAGE_STORAGE_KEY = 'qingzao-language-preference'

/**
 * 获取浏览器默认语言
 * @returns {string} 浏览器语言对应的语言代码
 */
const getBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage

  // 根据浏览器语言返回对应的支持语言
  if (browserLang && browserLang.startsWith('zh')) {
    return 'zh-CN'
  }
  return 'en-US'
}

/**
 * 获取存储的语言偏好
 * @returns {string|null} 存储的语言代码或 null
 */
const getStoredLanguage = () => {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (stored && (stored === 'zh-CN' || stored === 'en-US')) {
      return stored
    }
  } catch (error) {
    console.warn('Failed to read language preference from localStorage:', error)
  }
  return null
}

/**
 * 存储语言偏好
 * @param {string} language 语言代码
 */
const storeLanguage = (language) => {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch (error) {
    console.warn('Failed to save language preference to localStorage:', error)
  }
}

/**
 * 语言提供者组件
 * 提供语言上下文，管理语言状态和切换
 *
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @returns {React.ReactElement} 语言提供者组件
 */
export const LanguageProvider = ({ children }) => {
  // 初始化语言状态：优先使用存储的偏好，其次使用浏览器语言
  const [language, setLanguageState] = useState(() => {
    const storedLang = getStoredLanguage()
    return storedLang || getBrowserLanguage()
  })

  /**
   * 切换语言
   * @param {string} lang - 目标语言代码
   */
  const setLanguage = useCallback((lang) => {
    setLanguageState(lang)
    storeLanguage(lang)
    // 更新 HTML lang 属性
    document.documentElement.lang = lang === 'zh-CN' ? 'zh-CN' : 'en'
  }, [])

  /**
   * 获取翻译文本
   * 支持嵌套键名和参数替换
   *
   * @param {string} key - 翻译键名（支持点分隔的嵌套键，如 'header.nav.products'）
   * @param {Object} params - 可选的参数对象，用于替换文本中的占位符
   * @returns {string} 翻译后的文本
   */
  const t = useCallback((key, params) => {
    const keys = key.split('.')
    let value = languageResources[language]

    // 遍历键名获取对应的值
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    // 如果值不是字符串，返回键名
    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string for key: ${key}`)
      return key
    }

    // 如果有参数，进行替换
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? String(params[paramKey]) : match
      })
    }

    return value
  }, [language])

  // 可用语言列表
  const availableLanguages = [
    { code: 'zh-CN', name: '中文' },
    { code: 'en-US', name: 'English' }
  ]

  // 初始化时设置 HTML lang 属性
  useEffect(() => {
    document.documentElement.lang = language === 'zh-CN' ? 'zh-CN' : 'en'
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  )
}