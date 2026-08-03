import React, { useState, useEffect } from 'react'
import './ReadingProgress.css'

/**
 * 阅读进度条组件
 * 固定在页面顶部，随滚动填充青绿色细线
 */
function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        setProgress((scrollTop / scrollHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="reading-progress">
      <div className="reading-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  )
}

export default ReadingProgress
