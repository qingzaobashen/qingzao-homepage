import React from 'react'
import './Hero.css'

/**
 * COSMOS 风格 Hero 组件
 * 深色背景 + 中央大标题 + 3D 环绕照片墙 + 底部 UI
 */
function Hero() {
  // 照片墙数据 - 使用渐变色块模拟不同照片
  const photos = [
    { id: 1,  w: 80,  h: 100, x: -42, y: -38, rotate: -25, color: 'linear-gradient(135deg, #2a1a3e 0%, #1a0f2e 100%)', z: 1 },
    { id: 2,  w: 70,  h: 90,  x: 38,  y: -42, rotate: 18,  color: 'linear-gradient(135deg, #1e3a2f 0%, #0f2a1e 100%)', z: 2 },
    { id: 3,  w: 90,  h: 70,  x: -48, y: 25,  rotate: -12, color: 'linear-gradient(135deg, #3a1e1e 0%, #2a0f0f 100%)', z: 1 },
    { id: 4,  w: 75,  h: 95,  x: 42,  y: 30,  rotate: 22,  color: 'linear-gradient(135deg, #1e2a3a 0%, #0f1a2a 100%)', z: 2 },
    { id: 5,  w: 65,  h: 85,  x: -30, y: -50, rotate: -8,  color: 'linear-gradient(135deg, #2a2a1e 0%, #1a1a0f 100%)', z: 0 },
    { id: 6,  w: 85,  h: 65,  x: 35,  y: -30, rotate: 15,  color: 'linear-gradient(135deg, #3e2a1a 0%, #2e1a0f 100%)', z: 1 },
    { id: 7,  w: 70,  h: 80,  x: -45, y: 5,   rotate: -20, color: 'linear-gradient(135deg, #1a3a2a 0%, #0f2a1a 100%)', z: 2 },
    { id: 8,  w: 80,  h: 75,  x: 40,  y: 8,   rotate: 10,  color: 'linear-gradient(135deg, #2a1a2a 0%, #1a0f1a 100%)', z: 0 },
    { id: 9,  w: 60,  h: 70,  x: 10,  y: -48, rotate: 5,   color: 'linear-gradient(135deg, #1a1a3a 0%, #0f0f2a 100%)', z: 1 },
    { id: 10, w: 75,  h: 60,  x: -20, y: 40,  rotate: -15, color: 'linear-gradient(135deg, #3a2a1a 0%, #2a1a0f 100%)', z: 2 },
    { id: 11, w: 65,  h: 55,  x: 48,  y: -15, rotate: 28,  color: 'linear-gradient(135deg, #1e1e2e 0%, #0f0f1e 100%)', z: 0 },
    { id: 12, w: 55,  h: 70,  x: -15, y: -25, rotate: -5,  color: 'linear-gradient(135deg, #2e1e1e 0%, #1e0f0f 100%)', z: 1 },
    { id: 13, w: 70,  h: 50,  x: 25,  y: 42,  rotate: 12,  color: 'linear-gradient(135deg, #1e2e2e 0%, #0f1e1e 100%)', z: 2 },
    { id: 14, w: 50,  h: 65,  x: -38, y: -10, rotate: -30, color: 'linear-gradient(135deg, #2e2e1e 0%, #1e1e0f 100%)', z: 0 },
    { id: 15, w: 60,  h: 45,  x: 30,  y: -48, rotate: 20,  color: 'linear-gradient(135deg, #2a1a3e 0%, #1a0f2e 100%)', z: 1 },
    { id: 16, w: 45,  h: 60,  x: -10, y: 48,  rotate: -10, color: 'linear-gradient(135deg, #1e3e2a 0%, #0f2e1a 100%)', z: 2 },
  ]

  return (
    <section className="hero">
      {/* 3D 照片墙背景 */}
      <div className="photo-wall">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="photo-card"
            style={{
              width: `${photo.w}px`,
              height: `${photo.h}px`,
              left: `calc(50% + ${photo.x}vw)`,
              top: `calc(50% + ${photo.y}vh)`,
              transform: `translate(-50%, -50%) rotate(${photo.rotate}deg)`,
              background: photo.color,
              zIndex: photo.z,
              animationDelay: `${photo.id * 0.1}s`,
              '--rotate': `${photo.rotate}deg`,
            }}
          >
            {/* 照片内部装饰 - 模拟图片内容 */}
            <div className="photo-inner" style={{
              background: `radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            }} />
          </div>
        ))}
        {/* 中央暗化遮罩，让标题更突出 */}
        <div className="photo-wall-vignette" />
      </div>

      {/* 中央内容 */}
      <div className="hero-center">
        <h1 className="hero-title">
          轻造
          <span className="hero-title-mark">©</span>
        </h1>
        <p className="hero-subtitle">
          专注于创造
          <span className="hero-subtitle-highlight">实用工具</span>
        </p>
      </div>

      {/* 底部 UI */}
      <div className="hero-bottom">
        <div className="bottom-left">
          <span className="theme-label active">Dark</span>
          <span className="theme-divider">/</span>
          <span className="theme-label">Light</span>
        </div>
        <div className="bottom-right">
          <span className="scroll-text">向下滚动</span>
          <a href="#products" className="scroll-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero