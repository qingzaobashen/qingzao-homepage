import React, { useState, useEffect, useCallback, useRef } from 'react'
import './Carousel.css'

/**
 * 通用图片轮播组件
 *
 * 特性：
 * - 上/下一张箭头导航（hover / 键盘聚焦时浮现）
 * - 底部圆点指示器（高亮当前张，支持点击跳转）
 * - 淡入淡出过渡动画
 * - 鼠标悬停暂停（与 autoplay 配合时）
 * - 键盘 ← / → 方向键导航
 * - 触屏滑动切换（移动端）
 * - 当图片不足 2 张时自动隐藏导航与指示器
 * - 角标自适应：active 时由圆点变胶囊
 *
 * Props:
 * @param {string[]} images - 图片 URL 数组，顺序即为轮播顺序
 * @param {string} [alt] - 基础 alt 文本，会与下标拼接形成最终 alt
 * @param {number} [autoplayInterval=0] - 自动播放间隔（毫秒），0 = 不自动播放
 * @param {string} [className=''] - 附加到根容器的 class
 * @param {boolean} [showIndicators=true] - 是否显示底部指示器
 * @param {boolean} [showArrows=true] - 是否显示左右箭头
 * @param {(index: number) => void} [onChange] - 当前下标变化回调
 */
function Carousel({
  images = [],
  alt = '',
  autoplayInterval = 0,
  className = '',
  showIndicators = true,
  showArrows = true,
  onChange
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  // 悬停 / 聚焦时暂停 autoplay
  const [isPaused, setIsPaused] = useState(false)
  // 触屏起点 X 坐标
  const touchStartRef = useRef(null)
  const autoplayTimerRef = useRef(null)

  const hasMultiple = images.length > 1

  /**
   * 跳转到指定下标，越界时循环
   * @param {number} index 目标下标
   */
  const goTo = useCallback((index) => {
    if (!hasMultiple) return
    const nextIndex = (index + images.length) % images.length
    setCurrentIndex(nextIndex)
    if (onChange) onChange(nextIndex)
  }, [hasMultiple, images.length, onChange])

  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])

  // 自动播放：仅在多图、未暂停时才启动；组件卸载或依赖变化时清理定时器
  useEffect(() => {
    if (!autoplayInterval || !hasMultiple || isPaused) {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
        autoplayTimerRef.current = null
      }
      return undefined
    }
    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % images.length
        if (onChange) onChange(next)
        return next
      })
    }, autoplayInterval)
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
        autoplayTimerRef.current = null
      }
    }
  }, [autoplayInterval, hasMultiple, isPaused, images.length, onChange])

  // 键盘 ← / → 切换
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goPrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      goNext()
    }
  }

  // 触屏滑动：横向位移超过阈值则切换
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartRef.current === null) return
    const diff = e.changedTouches[0].clientX - touchStartRef.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) goPrev()
      else goNext()
    }
    touchStartRef.current = null
  }

  // 没有图片时不渲染
  if (images.length === 0) {
    return null
  }

  return (
    <div
      className={`carousel ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={alt ? `${alt} carousel` : 'Image carousel'}
    >
      <div className="carousel-track">
        {images.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={alt ? `${alt} (${index + 1}/${images.length})` : `Image ${index + 1}`}
            className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
            // 首张图 eager 加载，其余懒加载，节省首屏流量
            loading={index === 0 ? 'eager' : 'lazy'}
            draggable={false}
          />
        ))}
      </div>

      {showArrows && hasMultiple && (
        <>
          <button
            type="button"
            className="carousel-arrow carousel-arrow-prev"
            onClick={goPrev}
            aria-label="Previous image"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className="carousel-arrow carousel-arrow-next"
            onClick={goNext}
            aria-label="Next image"
          >
            <span aria-hidden="true">›</span>
          </button>
        </>
      )}

      {showIndicators && hasMultiple && (
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
