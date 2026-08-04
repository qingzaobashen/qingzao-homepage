/**
 * 主题 Hook
 * 消费 ThemeContext，提供主题模式与切换函数
 */
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

/**
 * 使用主题上下文
 * @returns {{ theme: 'light'|'dark'|'system', setTheme: Function, availableThemes: Array, resolvedTheme: 'light'|'dark' }}
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
