/**
 * 语言上下文模块
 * 提供多语言支持的 React Context
 *
 * 国际化策略（方案 A）：以 URL 路径前缀为语言「真源」。
 *   - 以 /en 开头的路径 → 英文（en-US）
 *   - 其余路径 → 默认中文（zh-CN）
 * 切换语言 = 在同一内容的「带/不带 /en 前缀」路径间导航，
 * 从而让中英文拥有各自独立、可被 Google 索引的 URL，并通过 hreflang 互相关联。
 */

import React, { createContext, useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import zhCN from '../locales/zh-CN.json'
import enUS from '../locales/en-US.json'

/**
 * 语言资源映射
 */
const languageResources = {
  'zh-CN': zhCN,
  'en-US': enUS,
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
 * 根据 URL 路径推断语言：以 /en 开头 → 英文，否则默认中文
 * @param {string} pathname - 当前路径（含前导 /）
 * @returns {'zh-CN' | 'en-US'} 推断出的语言代码
 */
const detectLangFromPath = (pathname) => (pathname.startsWith('/en') ? 'en-US' : 'zh-CN')

/**
 * 持久化语言偏好（仅用于记忆，不作为 URL 语言的真源）
 * @param {string} language - 语言代码
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
  const location = useLocation()
  const navigate = useNavigate()

  // 初始语言：以 URL 前缀为准（URL 是语言真源，保证 SEO canonical 一致）
  const [language, setLanguageState] = useState(() => detectLangFromPath(window.location.pathname))

  /**
   * URL 前缀变化（前进 / 后退 / 直接访问）时同步语言状态
   */
  useEffect(() => {
    const fromPath = detectLangFromPath(location.pathname)
    if (fromPath !== language) setLanguageState(fromPath)
    // 仅依赖路径前缀；language 用于对比，避免重复触发
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  /**
   * 切换语言：导航到「带 / 不带 /en 前缀」的等价路径
   * @param {string} lang - 目标语言代码（'zh-CN' | 'en-US'）
   */
  const setLanguage = useCallback(
    (lang) => {
      const isEn = lang === 'en-US'
      const cur = location.pathname
      let newPath
      if (isEn) {
        // 当前无 /en 前缀则加上；首页 / 映射到 /en
        newPath = cur.startsWith('/en') ? cur : cur === '/' ? '/en' : `/en${cur}`
      } else {
        // 去掉 /en 前缀；根 /en 还原为 /
        newPath = cur.startsWith('/en') ? cur.replace(/^\/en/, '') || '/' : cur
      }
      storeLanguage(lang)
      setLanguageState(lang)
      navigate(newPath + location.search, { replace: false })
    },
    [location.pathname, location.search, navigate],
  )

  /**
   * 根据当前语言为路径加 /en 前缀（用于站内链接与 canonical）
   * @param {string} path - 默认（中文）路径，如 /blog/foo 或 /
   * @returns {string} 当前语言对应的路径
   */
  const localePath = useCallback(
    (path) => {
      if (!path) return path
      if (language === 'en-US') {
        return path === '/' ? '/en' : `/en${path.startsWith('/') ? path : `/${path}`}`
      }
      return path
    },
    [language],
  )

  /**
   * 获取翻译文本
   * 支持嵌套键名、参数替换、数组 / 对象直返
   *
   * @param {string} key - 翻译键名（支持点分隔的嵌套键，如 'header.nav.products'）
   * @param {Object} [params] - 可选参数
   * @returns {string|Array|Object} 翻译后的文本 / 数组 / 对象
   */
  const t = useCallback(
    (key, params) => {
      const keys = key.split('.')
      let value = languageResources[language]

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          console.warn(`Translation key not found: ${key}`)
          return key
        }
      }

      if (params && params.returnObjects) {
        return value
      }

      if (typeof value !== 'string') {
        console.warn(`Translation value is not a string for key: ${key}`)
        return key
      }

      if (params) {
        return value.replace(/\{(\w+)\}/g, (match, paramKey) =>
          params[paramKey] !== undefined ? String(params[paramKey]) : match,
        )
      }

      return value
    },
    [language],
  )

  // 可用语言列表
  const availableLanguages = [
    { code: 'zh-CN', name: '中文' },
    { code: 'en-US', name: 'English' },
  ]

  // 同步 HTML lang 属性
  useEffect(() => {
    document.documentElement.lang = language === 'zh-CN' ? 'zh-CN' : 'en'
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages, localePath }}>
      {children}
    </LanguageContext.Provider>
  )
}
