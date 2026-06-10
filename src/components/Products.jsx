import React from 'react'
import './Products.css'

/**
 * 产品展示组件
 * Supabase 风格：12px圆角卡片，1px边框，翡翠绿标签
 */
function Products() {
  const products = [
    {
      id: 1,
      name: '装修导图',
      description: '装修知识思维导图工具，帮助用户系统化学习装修知识，规划装修流程。从水电到软装，全流程覆盖。',
      url: 'https://decoration.qingzao.site',
      icon: '🏠',
      tags: ['React', 'Vite', '思维导图']
    },
    {
      id: 2,
      name: '更多产品',
      description: '正在开发中，敬请期待更多实用工具...',
      url: '#',
      icon: '🚀',
      tags: ['即将上线']
    }
  ]

  return (
    <section id="products" className="products">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">产品列表</h2>
          <p className="section-subtitle">精心打造，解决实际问题</p>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="product-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="card-top">
                <div className="product-icon">{product.icon}</div>
                <h3 className="product-name">{product.name}</h3>
              </div>

              <p className="product-description">{product.description}</p>

              <div className="product-tags">
                {product.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>

              {product.url !== '#' && (
                <a
                  href={product.url}
                  className="product-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>访问产品</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products