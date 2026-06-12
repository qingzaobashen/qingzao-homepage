import React from 'react'
import './About.css'

/**
 * 关于/理念组件
 * Intercom 风格：公开信式大段文字 + 右侧装饰插画
 */
function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-layout">
          {/* 左侧文字内容 */}
          <div className="about-letter">
            <span className="letter-label">我们的理念</span>
            <h2 className="letter-title">
              技术应该让生活更简单，而不是更复杂
            </h2>
            <div className="letter-body">
              <p>
                在这个信息过载的时代，我们发现太多工具设计得过于复杂，反而增加了用户的认知负担。
                青枣的诞生源于一个简单的信念：好的产品应该像空气一样自然——你几乎感觉不到它的存在，
                但它却无时无刻不在帮助你。
              </p>
              <p>
                每一个产品都从真实的需求出发。我们不追逐热点，不堆砌功能，只专注于解决一个具体的问题，
                并把它做到最好。装修导图就是这样诞生的——我们发现装修过程中信息分散、流程混乱，
                于是做了一张清晰的思维导图，帮助用户建立系统化的认知框架。
              </p>
              <p>
                未来，我们会继续秉持这个理念，打造更多简洁实用的工具。
                如果你也有类似的想法，欢迎与我们交流。
              </p>
            </div>
            <div className="letter-signature">
              <div className="signature-avatar">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                  alt="创始人头像"
                />
              </div>
              <div className="signature-info">
                <span className="signature-name">青枣团队</span>
                <span className="signature-role">专注于实用工具开发</span>
              </div>
            </div>
          </div>

          {/* 右侧装饰 */}
          <div className="about-visual">
            <div className="visual-card">
              <div className="visual-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="40" cy="40" r="30" />
                  <path d="M40 20v40M20 40h40" />
                  <circle cx="40" cy="40" r="12" />
                </svg>
              </div>
              <div className="visual-text">
                <span className="visual-number">01</span>
                <span className="visual-desc">发现问题</span>
              </div>
            </div>
            <div className="visual-card visual-card-offset">
              <div className="visual-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="20" y="20" width="40" height="40" rx="4" />
                  <path d="M28 40h24M40 28v24" />
                </svg>
              </div>
              <div className="visual-text">
                <span className="visual-number">02</span>
                <span className="visual-desc">打磨方案</span>
              </div>
            </div>
            <div className="visual-card">
              <div className="visual-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 50l10-20 10 10 20-30 10 40H20z" />
                </svg>
              </div>
              <div className="visual-text">
                <span className="visual-number">03</span>
                <span className="visual-desc">持续迭代</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
