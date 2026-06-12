import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import './Products.css'

/**
 * 产品展示组件
 * Intercom 风格：大图 + 文字描述交替排列
 * 支持多语言显示
 */
function Products() {
  const { t } = useLanguage()

  const features = [
    {
      id: 1,
      label: t('products.items.decoration.label'),
      title: t('products.items.decoration.title'),
      description: t('products.items.decoration.description'),
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      stats: [
        { value: '50+', label: t('products.items.decoration.stats.nodes') },
        { value: '1000+', label: t('products.items.decoration.stats.users') }
      ]
    },
    {
      id: 2,
      label: t('products.items.comingSoon.label'),
      title: t('products.items.comingSoon.title'),
      description: t('products.items.comingSoon.description'),
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      stats: [
        { value: '3+', label: t('products.items.comingSoon.stats.products') },
        { value: '∞', label: t('products.items.comingSoon.stats.iteration') }
      ]
    }
  ]

  return (
    <section id="products" className="products">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t('products.label')}</span>
          <h2 className="section-title">{t('products.title')}</h2>
          <p className="section-subtitle">
            {t('products.subtitle')}
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
