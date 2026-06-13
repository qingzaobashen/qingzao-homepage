import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import Carousel from './Carousel'
import './Products.css'

/**
 * 各产品对应的外部链接（与 Hero 中的 PRODUCT_LINKS 保持一致），
 * 这里独立定义一份，避免循环依赖；如需调整请同步两边
 */
const PRODUCT_LINKS = {
  decoration: 'https://qingzao.site',
  trimmer: 'https://image.qingzao.site'
}

/**
 * 产品展示组件
 * Intercom 风格：大图 + 文字描述交替排列
 * 支持多语言显示；每项产品底部带「前往产品站」跳转按钮
 */
function Products() {
  const { t } = useLanguage()

  const features = [
    {
      id: 1,
      link: PRODUCT_LINKS.decoration,
      label: t('products.items.decoration.label'),
      title: t('products.items.decoration.title'),
      // 改为数组，支持多张图轮播；i18n 里可继续追加路径
      images: t('products.items.decoration.images', { returnObjects: true }) || [],
      description: t('products.items.decoration.description'),
      stats: [
        { value: '50+', label: t('products.items.decoration.stats.nodes') },
        { value: '1000+', label: t('products.items.decoration.stats.users') }
      ],
      button: t('products.items.decoration.button')
    },
    {
      id: 2,
      link: PRODUCT_LINKS.trimmer,
      label: t('products.items.trimmer.label'),
      title: t('products.items.trimmer.title'),
      images: t('products.items.trimmer.images', { returnObjects: true }) || [],
      description: t('products.items.trimmer.description'),
      stats: [
        { value: '4', label: t('products.items.trimmer.stats.modes') },
        { value: 'PNG', label: t('products.items.trimmer.stats.output') }
      ],
      button: t('products.items.trimmer.button')
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
                {/* 产品站跳转按钮 */}
                <a
                  href={feature.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="feature-btn"
                >
                  {feature.button}
                  <span className="feature-btn-arrow" aria-hidden="true">→</span>
                </a>
              </div>
              <div className="feature-image">
                <div className="image-frame">
                  <Carousel
                    images={feature.images}
                    alt={feature.title}
                    className="feature-carousel"
                  />
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
