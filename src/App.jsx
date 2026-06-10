import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

/**
 * 个人主页主应用组件
 * 展示个人介绍、产品列表、联系方式等信息
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