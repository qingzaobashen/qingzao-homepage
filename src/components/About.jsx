import React from 'react'
import './About.css'

/**
 * 关于我组件
 * Supabase 风格：深色代码块区域，技能进度条，极简排版
 */
function About() {
  const skills = [
    { name: 'React', level: 95 },
    { name: 'Vue', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Python', level: 80 },
    { name: '小程序开发', level: 90 },
    { name: 'UI/UX 设计', level: 88 }
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">关于我</h2>
          <p className="section-subtitle">独立开发者，专注于创造价值</p>
        </div>

        <div className="about-content">
          <div className="about-intro">
            <div className="intro-block">
              <h3 className="intro-heading">理念</h3>
              <p className="intro-text">
                我相信技术应该让生活变得更简单，而不是更复杂。
                每一个产品都源于真实的需求，经过精心设计和打磨。
              </p>
            </div>

            <div className="intro-block">
              <h3 className="intro-heading">方法</h3>
              <p className="intro-text">
                简洁、高效、实用是设计的核心原则。专注于用户体验，
                让每个功能都能真正解决用户的问题。
              </p>
            </div>
          </div>

          <div className="skills-block">
            <h3 className="skills-heading">技术栈</h3>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="skill-item"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-track">
                    <div
                      className="skill-fill"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About