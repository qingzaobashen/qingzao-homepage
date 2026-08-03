# 青枣博客改版 —— 实施计划

> 日期：2026-07-30
> 基于设计文档：`2026-07-30-qingzao-blog-redesign-design.md`

---

## 阶段概览

| 阶段 | 内容 | 预计工作量 |
|------|------|-----------|
| P0 | 全局设计 Token + CSS 变量 | 1 次提交 |
| P1 | 首页重构为博客首页 | 2 次提交 |
| P2 | 博客列表页视觉改造 | 1 次提交 |
| P3 | 博客文章详情页改造 | 1 次提交 |
| P4 | 系列专题系统 | 2 次提交 |
| P5 | Header/Footer 改造 | 1 次提交 |
| P6 | 国际化文案更新 | 1 次提交 |
| P7 | 关于页 + 其他页面适配 | 1 次提交 |

---

## P0：全局设计 Token（CSS 变量）

**目标**：替换 `index.css` 中的 CSS 变量为新的东方风格色彩系统，新增字体变量。

**改动文件**：
- `src/index.css` — 替换 `:root` 中的 CSS 变量

**关键变更**：

```css
:root {
  /* 东方风格色彩系统 */
  --color-bg: #F7F4EE;
  --color-ink: #1F1F1F;
  --color-primary: #5B7C6D;
  --color-accent: #8B3A3A;
  --color-border: #D9D2C3;
  --color-muted: #8C8C8C;
  --color-canvas: #FFFFFF;
  --color-hover-bg: #EDE8DE;

  /* 字体家族 */
  --font-logo: "LXGW WenKai", "FZXiaoZhuanTi-S13S", "Source Han Serif SC", serif;
  --font-heading: "Source Han Serif SC", "Noto Serif SC", serif;
  --font-body: "Source Han Serif SC", "Noto Serif SC", serif;
  --font-en: "IBM Plex Sans", sans-serif;
  --font-code: "JetBrains Mono", monospace;
}
```

**注意**：
- 保留旧的 CSS 变量作为 fallback（或一次性全部替换）
- 删除不再需要的旧变量（如 `--color-primary-deep`、`--color-primary-soft`）
- 调整 `body` 的 `font-family` 和 `background` 使用新变量
- 调整 `--color-hairline-*` 等旧变量引用，改为新变量

**验证**：页面加载后背景变为 `#F7F4EE`，字体变为思源宋体。

---

## P1：首页重构为博客首页

**目标**：将当前的 Hero + Products + About + Contact 首页，改造为博客内容主导的首页。

**改动文件**：
- `src/App.jsx` — 修改 `HomePage` 组件，移除旧内容区，引入新组件
- `src/pages/HomePage.jsx`（新建）— 博客首页组件
- `src/pages/HomePage.css`（新建）— 首页样式
- `src/components/HeroBlog.jsx`（新建）— 博客 Hero 区
- `src/components/HeroBlog.css`（新建）
- `src/components/FeaturedSeries.jsx`（新建）— 精选系列区
- `src/components/FeaturedSeries.css`（新建）
- `src/components/LatestPosts.jsx`（新建）— 最新文章区
- `src/components/LatestPosts.css`（新建）

**首页布局**：

```
HomePage
├── HeroBlog       (品牌标语 + 装饰)
├── FeaturedSeries (精选系列 3 列)
└── LatestPosts    (最新文章列表)
```

**注意**：
- 旧首页组件（Hero、Products、About、Contact）保留但不再在首页渲染
- Products 页通过 `/products` 路由访问
- 保留 AnnouncementBanner 逻辑

**验证**：访问 `/` 看到新的博客首页布局，包含标语、系列和文章列表。

---

## P2：博客列表页视觉改造

**目标**：将 BlogListPage 的视觉风格改为东方风格，卡片加入青绿竖线、印章标签。

**改动文件**：
- `src/pages/BlogListPage.jsx` — 调整布局和标签样式
- `src/pages/BlogListPage.css` — 全面重写样式

**关键变更**：
- 头部背景从渐变紫色改为宣纸白 + 青绿文字
- 文章卡片添加左侧青绿竖线装饰
- 分类标签改为印章风格（枣红边框 + 透明背景）
- 卡片 hover 效果微调

**验证**：访问 `/blog`，卡片呈现东方风格设计。

---

## P3：博客文章详情页改造

**目标**：文章详情页增加阅读进度条，正文排版优化为思源宋体 + 东方风格。

**改动文件**：
- `src/pages/BlogPostPage.jsx` — 增加阅读进度条
- `src/pages/BlogPostPage.css` — 重写正文排版样式
- `src/components/ReadingProgress.jsx`（新建）— 阅读进度条组件
- `src/components/ReadingProgress.css`（新建）

**关键变更**：
- 阅读进度条：固定在 Header 下方，青绿细线
- 正文排版：思源宋体，行高 1.8，窄栏居中
- 引用块：青绿竖线
- 代码块：JetBrains Mono
- 表格样式更新
- 上一篇/下一篇导航
- 相关文章卡片样式更新

**验证**：访问任意文章页面，滚动时顶部进度条跟随，正文呈现新排版。

---

## P4：系列专题系统

**目标**：新增系列专题数据结构、系列列表页和系列详情页。

**新增文件**：
- `src/data/series/series-zh.json`
- `src/data/series/series-en.json`
- `src/pages/SeriesListPage.jsx`
- `src/pages/SeriesListPage.css`
- `src/pages/SeriesDetailPage.jsx`
- `src/pages/SeriesDetailPage.css`

**改动文件**：
- `src/App.jsx` — 添加 `/series` 和 `/series/:seriesSlug` 路由

**系列数据结构**：

```json
{
  "slug": "decoration-full-process",
  "title": "装修全流程系列",
  "description": "从收房验房到软装搭配，覆盖装修每个环节。",
  "category": "生活笔记",
  "articleCount": 25,
  "coverImage": "",
  "order": ["house-acceptance-inspection", "planning-stage", ...]
}
```

**验证**：访问 `/series` 看到系列列表，点击进入系列详情页看到文章列表。

---

## P5：Header/Footer 改造

**目标**：Header 改为东方风格，导航项更新；Footer 精简。

**改动文件**：
- `src/components/Header.jsx` — 更新导航链接
- `src/components/Header.css` — 重写样式
- `src/components/Footer.jsx` — 精简链接
- `src/components/Footer.css` — 调整样式

**Header 导航**：
```
青枣（Logo） |  笔记  系列  关于  |  🔍  EN
```

**Footer**：简化，保留品牌 + 版权 + 法律链接 + 产品链接

**验证**：Header 显示新导航，Footer 显示精简链接。

---

## P6：国际化文案更新

**目标**：更新中英文语言包，适配新的博客定位。

**改动文件**：
- `src/locales/zh-CN.json`
- `src/locales/en-US.json`

**关键变更**：
- Hero 标语改为 "青枣笔记 —— 装修经验、独立开发与生活思考"
- 导航文案更新
- Footer 文案更新
- 保留旧的产品相关文案（产品页仍需使用）

**验证**：切换语言，所有文案正确显示。

---

## P7：关于页 + 其他页面适配

**目标**：关于页改为博客导向，其他页面适配新风格。

**改动文件**：
- `src/pages/AboutPage.jsx` — 改写文案
- `src/pages/AboutPage.css` — 适配新风格
- `src/pages/ContactPage.jsx` — 可选调整
- `src/pages/NotFoundPage.jsx` — 可选调整

**验证**：访问 `/about` 看到博客导向的内容。

---

## 执行顺序建议

```
P0 (CSS 变量) → P5 (Header/Footer) → P1 (首页)
→ P2 (列表页) → P3 (文章页) → P4 (系列) → P6 (文案) → P7 (其他)
```

每个阶段独立可验证，建议按顺序逐个完成。
