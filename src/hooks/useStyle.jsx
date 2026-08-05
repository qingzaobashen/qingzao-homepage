/**
 * 风格 Hook
 * 消费 StyleContext，提供风格模式与切换函数
 */
import { useContext } from 'react'
import { StyleContext } from '../contexts/StyleContext'

/**
 * 使用风格上下文
 * @returns {{ style: 'warm'|'ink', setStyle: Function, availableStyles: Array }}
 */
export function useStyle() {
  const context = useContext(StyleContext)
  if (context === undefined) {
    throw new Error('useStyle must be used within a StyleProvider')
  }
  return context
}
