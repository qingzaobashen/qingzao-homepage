/**
 * 主题上下文模块
 * 复刻 Easton 的三态主题切换：浅色 / 深色 / 跟随系统
 *  - 持久化到 localStorage（qingzao-theme）
 *  - 通过 html[data-theme] 应用到全局
 *  - "system" 模式监听系统主题变化并实时跟随
 */

import React, { createContext, useState, useEffect, useCallback } from 'react'

/**
 * 主题上下文
 */
export const ThemeContext = createContext(undefined)

/**
 * localStorage 存储键名
 */
const THEME_STORAGE_KEY = 'qingzao-theme'

/**
 * 可用的主题模式
 */
const availableThemes = [
  { id: 'light', label: 'light' },
  { id: 'dark', label: 'dark' },
  { id: 'system', label: 'system' },
]

/**
 * 读取系统主题偏好
 * @returns {'light' | 'dark'}
 */
const getSystemTheme = () =>
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

/**
 * 读取已保存的主题偏好
 * @returns {'light' | 'dark' | 'system'}
 */
const getStoredTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  } catch {
    // 忽略隐私模式等存储失败
  }
  return 'system'
}

/**
 * 应用主题到 <html>
 * @param {'light' | 'dark' | 'system'} theme - 主题模式
 */
const applyTheme = (theme) => {
  const resolved = theme === 'system' ? getSystemTheme() : theme
  const root = document.documentElement
  if (resolved === 'dark') {
    root.setAttribute('data-theme', 'dark')
    root.classList.add('dark')
  } else {
    root.setAttribute('data-theme', 'light')
    root.classList.remove('dark')
  }
}

/**
 * 主题提供者组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @returns {React.ReactElement} 主题提供者组件
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') return getStoredTheme()
    return 'system'
  })

  /**
   * 切换主题模式并持久化
   * @param {'light' | 'dark' | 'system'} next - 目标主题
   */
  const setTheme = useCallback((next) => {
    setThemeState(next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // 忽略存储失败
    }
  }, [])

  // 主题变化时应用到 <html>
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // "system" 模式监听系统主题变化
  useEffect(() => {
    if (theme !== 'system') return undefined
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => applyTheme('system')
    media.addEventListener?.('change', handleChange)
    return () => media.removeEventListener?.('change', handleChange)
  }, [theme])

  const resolvedTheme = typeof window !== 'undefined'
    ? (theme === 'system' ? getSystemTheme() : theme)
    : 'light'

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
