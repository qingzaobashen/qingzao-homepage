
### 一、项目架构规划

```
qingzao.site (主域名 - 工作室主页)
├── 工作室介绍
├── 产品列表
│   ├── 装修导图 → decoration.qingzao.site
│   └── 其他产品...
└── 联系方式

decoration.qingzao.site (子域名 - 装修导图)
└── 装修导图应用
```

#### 创建工作室主页项目

我帮你创建一个简单的工作室主页项目模板。请在 `d:\workT\wx_smallPrograms` 目录下创建新项目：

**1.1 创建项目结构**

```bash
# 在 d:\workT\wx_smallPrograms 目录下创建新项目
mkdir qingzao-homepage
cd qingzao-homepage
```

**1.2 创建 package.json**

```json d:\workT\wx_smallPrograms\qingzao-homepage\package.json
{
  "name": "qingzao-homepage",
  "version": "1.0.0",
  "description": "青枣工作室主页 - 展示产品与工作室介绍",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.9.6"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.4.1"
  }
}
```

**1.3 创建 Vite 配置文件**

```javascript d:\workT\wx_smallPrograms\qingzao-homepage\vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
```

**1.4 创建 HTML 入口文件**

```html d:\workT\wx_smallPrograms\qingzao-homepage\index.html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="青枣 - 工作室主页，展示创新产品与解决方案">
  <meta name="keywords" content="青枣,工作室主页,产品展示,装修导图">
  <title>青枣 - 工作室主页</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

**1.5 创建主应用组件**

```jsx d:\workT\wx_smallPrograms\qingzao-homepage\src\main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

**1.6 创建 App 组件**

```jsx d:\workT\wx_smallPrograms\qingzao-homepage\src\App.jsx
import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

/**
 * 工作室主页主应用组件
 * 展示工作室介绍、产品列表、联系方式等信息
 */
function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
```

**1.7 创建样式文件**

```css d:\workT\wx_smallPrograms\qingzao-homepage\src\index.css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #1890ff;
  --secondary-color: #52c41a;
  --text-primary: #262626;
  --text-secondary: #595959;
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --border-color: #e8e8e8;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  color: var(--text-primary);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  color: #40a9ff;
}

button {
  cursor: pointer;
  border: none;
  outline: none;
  font-family: inherit;
}

img {
  max-width: 100%;
  height: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
```

```css d:\workT\wx_smallPrograms\qingzao-homepage\src\App.css
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
```

**1.8 创建 Header 组件**

```jsx d:\workT\wx_smallPrograms\qingzao-homepage\src\components\Header.jsx
import React from 'react'
import './Header.css'

/**
 * 页面头部导航组件
 * 包含 Logo 和导航链接
 */
function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <a href="/">青枣</a>
        </div>
        <nav className="nav">
          <a href="#products">产品</a>
          <a href="/about">关于</a>
          <a href="#contact">联系</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
```

```css d:\workT\wx_smallPrograms\qingzao-homepage\src\components\Header.css
.header {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.logo a {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 24px;
}

.nav a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.nav a:hover {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 12px;
  }

  .nav {
    gap: 16px;
  }
}
```

**1.9 创建 Hero 组件**

```jsx d:\workT\wx_smallPrograms\qingzao-homepage\src\components\Hero.jsx
import React from 'react'
import './Hero.css'

/**
 * 首页英雄区组件
 * 展示工作室介绍和主要信息
 */
function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <h1 className="hero-title">
          欢迎来到<span className="highlight">青枣</span>
        </h1>
        <p className="hero-subtitle">
          专注于创造实用的数字产品，让生活更简单
        </p>
        <div className="hero-actions">
          <a href="#products" className="btn btn-primary">
            查看产品
          </a>
          <a href="#contact" className="btn btn-secondary">
            联系我
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
```

```css d:\workT\wx_smallPrograms\qingzao-homepage\src\components\Hero.css
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 100px 20px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 700;
}

.highlight {
  color: #ffd700;
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 40px;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 32px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;
  display: inline-block;
}

.btn-primary {
  background: white;
  color: var(--primary-color);
}

.btn-primary:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .hero {
    padding: 60px 20px;
  }

  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }
}
```

**1.10 创建 Products 组件**

```jsx d:\workT\wx_smallPrograms\qingzao-homepage\src\components\Products.jsx
import React from 'react'
import './Products.css'

/**
 * 产品展示组件
 * 展示所有开发的产品列表
 */
function Products() {
  const products = [
    {
      id: 1,
      name: '装修导图',
      description: '装修知识思维导图工具，帮助用户系统化学习装修知识，规划装修流程',
      url: 'https://decoration.qingzao.site',
      icon: '🏠',
      tags: ['React', 'Vite', '思维导图']
    },
    {
      id: 2,
      name: '更多产品',
      description: '正在开发中，敬请期待...',
      url: '#',
      icon: '🚀',
      tags: ['即将上线']
    }
  ]

  return (
    <section id="products" className="products">
      <div className="container">
        <h2 className="section-title">产品列表</h2>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-icon">{product.icon}</div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-tags">
                {product.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              {product.url !== '#' && (
                <a href={product.url} className="product-link" target="_blank" rel="noopener noreferrer">
                  访问产品 →
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
```

```css d:\workT\wx_smallPrograms\qingzao-homepage\src\components\Products.css
.products {
  padding: 80px 20px;
  background: var(--bg-secondary);
}

.section-title {
  text-align: center;
  font-size: 36px;
  margin-bottom: 50px;
  color: var(--text-primary);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.product-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.product-name {
  font-size: 24px;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.product-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  background: #e6f7ff;
  color: var(--primary-color);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
}

.product-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  transition: all 0.3s;
}

.product-link:hover {
  color: #40a9ff;
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .products {
    padding: 60px 20px;
  }

  .section-title {
    font-size: 28px;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
```

**1.11 创建 About 组件**

```jsx d:\workT\wx_smallPrograms\qingzao-homepage\src\components\About.jsx
import React from 'react'
import './About.css'

/**
 * 关于我组件
 * 展示工作室介绍和技能
 */
function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">关于我</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              我是一名独立开发者，专注于创造实用的数字产品。
              我相信技术应该让生活变得更简单，而不是更复杂。
            </p>
            <p>
              每一个产品都源于真实的需求，经过精心设计和打磨，
              旨在为用户提供最佳的使用体验。
            </p>
          </div>
          <div className="skills">
            <h3>技术栈</h3>
            <div className="skill-tags">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Vue</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">小程序开发</span>
              <span className="skill-tag">UI/UX 设计</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
```

```css d:\workT\wx_smallPrograms\qingzao-homepage\src\components\About.css
.about {
  padding: 80px 20px;
  background: var(--bg-primary);
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
}

.about-text {
  margin-bottom: 40px;
}

.about-text p {
  font-size: 18px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.skills h3 {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--text-primary);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .about {
    padding: 60px 20px;
  }

  .about-text p {
    font-size: 16px;
  }
}
```

**1.12 创建 Contact 组件**

```jsx d:\workT\wx_smallPrograms\qingzao-homepage\src\components\Contact.jsx
import React from 'react'
import './Contact.css'

/**
 * 联系方式组件
 * 展示联系方式和社交媒体链接
 */
function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">联系我</h2>
        <div className="contact-content">
          <p className="contact-text">
            如果你有任何问题或建议，欢迎通过以下方式联系我
          </p>
          <div className="contact-methods">
            <div className="contact-method">
              <span className="contact-icon">📧</span>
              <span>xiayiye580@gmail.com</span>
            </div>
            <div className="contact-method">
              <span className="contact-icon">🌐</span>
              <a href="https://Twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
```

```css d:\workT\wx_smallPrograms\qingzao-homepage\src\components\Contact.css
.contact {
  padding: 80px 20px;
  background: var(--bg-secondary);
}

.contact-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.contact-text {
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 40px;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  color: var(--text-primary);
}

.contact-icon {
  font-size: 24px;
}

.contact-method a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.contact-method a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .contact {
    padding: 60px 20px;
  }

  .contact-text {
    font-size: 16px;
  }
}
```

**1.13 创建 Footer 组件**

```jsx d:\workT\wx_smallPrograms\qingzao-homepage\src\components\Footer.jsx
import React from 'react'
import './Footer.css'

/**
 * 页脚组件
 * 展示版权信息和法律链接
 */
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="copyright">
            © {currentYear} qingzao.site 版权所有
          </p>
          <div className="footer-links">
            <a href="https://decoration.qingzao.site" target="_blank" rel="noopener noreferrer">
              装修导图
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
```

```css d:\workT\wx_smallPrograms\qingzao-homepage\src\components\Footer.css
.footer {
  background: var(--text-primary);
  color: white;
  padding: 30px 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: white;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}
```

**1.14 创建 Vercel 配置文件**

```json d:\workT\wx_smallPrograms\qingzao-homepage\vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---