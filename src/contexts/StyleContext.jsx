/**
 * 风格上下文模块
 * 第二个正交维度：温暖风格（warm）/ 山水墨画风格（ink）
 *  - 持久化到 localStorage（qingzao-style）
 *  - 通过 html[data-style="ink"] 应用到全局
 *  - 与 ThemeContext（浅/深/跟随系统）完全解耦
 */

import React, { createContext, useState, useEffect, useCallback } from 'react'

/**
 * 风格上下文
 */
export const StyleContext = createContext(undefined)

/**
 * localStorage 存储键名
 */
const STYLE_STORAGE_KEY = 'qingzao-style'

/**
 * 可用的风格
 */
const availableStyles = [
  { id: 'warm', label: 'warm' },
  { id: 'ink', label: 'ink' },
]

/**
 * 读取已保存的风格偏好
 * @returns {'warm' | 'ink'}
 */
const getStoredStyle = () => {
  try {
    const stored = localStorage.getItem(STYLE_STORAGE_KEY)
    if (stored === 'warm' || stored === 'ink') return stored
  } catch {
    // 忽略隐私模式等存储失败
  }
  return 'warm'
}

/**
 * 应用风格到 <html>
 * @param {'warm' | 'ink'} style - 风格
 */
const applyStyle = (style) => {
  const root = document.documentElement
  if (style === 'ink') {
    root.setAttribute('data-style', 'ink')
  } else {
    root.removeAttribute('data-style')
  }
}

/**
 * 风格提供者组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @returns {React.ReactElement} 风格提供者组件
 */
export const StyleProvider = ({ children }) => {
  const [style, setStyleState] = useState(() => {
    if (typeof window !== 'undefined') return getStoredStyle()
    return 'warm'
  })

  /**
   * 切换风格并持久化
   * @param {'warm' | 'ink'} next - 目标风格
   */
  const setStyle = useCallback((next) => {
    setStyleState(next)
    try {
      localStorage.setItem(STYLE_STORAGE_KEY, next)
    } catch {
      // 忽略存储失败
    }
  }, [])

  // 风格变化时应用到 <html>
  useEffect(() => {
    applyStyle(style)
  }, [style])

  return (
    <StyleContext.Provider value={{ style, setStyle, availableStyles }}>
      {children}
    </StyleContext.Provider>
  )
}
