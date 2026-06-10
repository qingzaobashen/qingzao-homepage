import React from 'react'
import './Products.css'

/**
 * 产品展示组件
 * Intercom 风格：大图 + 文字描述交替排列
 */
function Products() {
  const features = [
    {
      id: 1,
      label: '装修导图',
      title: '系统化装修知识，一张图理清全流程',
      description: '从水电到软装，装修导图覆盖装修全流程的关键节点。通过可视化的思维导图形式，帮助用户建立系统的装修知识框架，避免遗漏重要环节。',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      stats: [
        { value: '50+', label: '节点覆盖' },
        { value: '1000+', label: '用户使用' }
      ]
    },
    {
      id: 2,
      label: '即将推出',
      title: '更多实用工具正在开发中',
      description: '我们持续探索生活中的痛点，致力于打造简洁高效的数字产品。每一个工具都经过精心设计和打磨，确保能够真正解决用户的问题。',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      stats: [
        { value: '3+', label: '在研产品' },
        { value: '∞', label: '持续迭代' }
      ]
    }
  ]

  return (
    <section id="products" className="products">
      <div className="container">
        <div className="section-header">
          <span className="section-label">产品</span>
          <h2 className="section-title">精心打造，解决实际问题</h2>
          <p className="section-subtitle">
            每一个产品都源于真实的需求，经过反复打磨和验证
          </p>
        </div>

        <div className="features-list">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`feature-item ${index % 2 === 1 ? 'reverse' : ''}`}
            >
              <div className="feature-content">
                <span className="feature-label">{feature.label}</span>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-stats">
                  {feature.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="stat-item">
                      <span className="stat-value">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="feature-image">
                <div className="image-frame">
                  <img src={feature.image} alt={feature.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
