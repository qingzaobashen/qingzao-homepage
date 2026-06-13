# Google AdSense 过审改进计划

> 文档版本：v1.0
> 创建日期：2026-06-13
> 适用项目：青枣工作室官网（qingzao-homepage）

---

## 一、现状评估

### 1.1 网站概况

| 项目 | 当前状态 |
|------|---------|
| 网站类型 | 单页产品展示站（SPA） |
| 技术栈 | React + Vite + react-router-dom |
| 路由页面 | 3 个（`/`、`/privacy`、`/terms`） |
| 内容形式 | 产品介绍 + 公司介绍 + 联系方式 |
| 原创文章数 | 0 篇 |
| 渲染方式 | 纯客户端渲染（CSR），无预渲染/SSR |

### 1.2 AdSense 合规差距总览

| 评估维度 | 达标状态 | 说明 |
|----------|---------|------|
| 内容质量与数量 | ❌ 严重不足 | 缺少 15-20 篇原创文章 |
| 必需页面 | 🟡 部分达标 | 缺 Disclaimer 页面 |
| 导航与用户体验 | ✅ 基本达标 | 需补博客导航入口 |
| 技术合规 | 🟡 部分达标 | SPA 无预渲染，爬虫无法索引 |
| 政策合规 | ✅ 基本达标 | 无违规内容 |
| 域名与权威性 | 🟡 待确认 | 取决于部署配置与域名年龄 |

---

## 二、AdSense 官方核心要求（2026 版）

### 2.1 内容要求

- **文章数量**：15-30 篇原创内容（推荐 20 篇以上）
- **文章质量**：每篇 800-1500 字，结构清晰，有实际价值
- **内容原创性**：100% 原创，非 AI 生成未修改的文本，非抄袭/转载
- **更新节奏**：自然发布节奏（每周 2-3 篇），避免同一天大量发布
- **主题一致性**：所有内容围绕同一领域/主题

### 2.2 必需页面

| 页面 | 重要性 | 当前状态 |
|------|--------|---------|
| About（关于我们） | 必须 | ✅ 首页锚点 |
| Contact（联系方式） | 必须 | ✅ 首页锚点 |
| Privacy Policy（隐私政策） | 必须 | ✅ `/privacy` 独立页面 |
| Terms of Service（服务条款） | 必须 | ✅ `/terms` 独立页面 |
| Disclaimer（免责声明） | 必须 | ❌ 缺失 |

### 2.3 技术要求

| 要求 | 说明 |
|------|------|
| HTTPS | 全站启用 SSL/TLS |
| 移动端适配 | 响应式设计，移动端体验良好 |
| 页面加载速度 | Core Web Vitals 达标（LCP < 2.5s, CLS < 0.1, INP < 200ms） |
| 可索引性 | 搜索引擎爬虫能抓取页面内容 |
| 无死链 | 所有链接可访问，无 404 |

### 2.4 政策要求

- 无成人内容、暴力内容、仇恨言论
- 无版权侵权内容
- 申请期间不挂其他广告联盟代码
- 隐私政策中需明确提及 Cookie 和第三方（Google/AdSense）数据使用

---

## 三、改进计划

### 阶段一：内容体系建设（P0 — 最高优先级）

> 这是过审最关键的一步。没有足够的内容，其他优化都无意义。

#### 3.1 博客系统开发

**目标**：创建完整的博客内容架构，支持文章列表和详情页

**实施步骤**：

1. **创建博客数据层**
   - 在 `src/data/posts/` 目录下以 Markdown 或 JSON 格式存储文章
   - 每篇文章包含：`slug`、`title`、`date`、`category`、`tags`、`excerpt`、`content`
   - 支持中英文双语内容

2. **创建博客页面组件**
   - `src/pages/BlogListPage.jsx` — 文章列表页（`/blog`）
   - `src/pages/BlogPostPage.jsx` — 文章详情页（`/blog/:slug`）
   - 列表页支持分类筛选和分页

3. **添加路由配置**
   - `/blog` → 博客列表
   - `/blog/:slug` → 文章详情

4. **导航入口**
   - Header 导航栏添加"博客"链接
   - Footer "资源"列中"博客"链接指向 `/blog`

5. **文章样式**
   - 创建 `BlogListPage.css` 和 `BlogPostPage.css`
   - 文章详情页样式：行宽 680px，行高 1.8，段间距合理
   - 代码块、引用、列表等 Markdown 元素样式

**成功标准**：
- `/blog` 可访问，展示文章列表
- `/blog/:slug` 可访问，展示完整文章内容
- 每篇文章有独立 URL、title、description

#### 3.2 原创文章撰写

**目标**：撰写 20 篇原创文章，覆盖装修和图片处理两大主题

**文章主题规划**：

| 分类 | 文章主题 | 预估字数 |
|------|---------|---------|
| 装修指南 | 新手装修全流程指南：从毛坯到入住 | 1500 |
| 装修指南 | 装修预算怎么做？5 步搞定预算规划 | 1200 |
| 装修指南 | 装修风格选择：现代简约 vs 北欧 vs 日式 | 1000 |
| 装修指南 | 装修避坑指南：10 个最常见的装修错误 | 1200 |
| 装修指南 | 小户型装修技巧：空间利用最大化 | 1000 |
| 装修指南 | 装修材料选购指南：地板/瓷砖/涂料怎么选 | 1200 |
| 图片处理 | 在线抠图工具对比：哪款最适合你？ | 1000 |
| 图片处理 | 白底商品图拍摄与后期处理完全指南 | 1200 |
| 图片处理 | 电商产品图优化：提升转化率的图片技巧 | 1000 |
| 图片处理 | PNG vs JPG vs WebP：图片格式选择指南 | 1000 |
| 图片处理 | 批量抠图技巧：高效处理商品图片 | 800 |
| 产品教程 | 装修流程导图使用教程：3 步规划你的装修 | 1000 |
| 产品教程 | 白底抠图工具使用指南：一键生成白底图 | 800 |
| 产品教程 | 如何用装修导图管理施工进度 | 800 |
| 设计理念 | 为什么我们做装修工具：解决信息混乱的痛点 | 1000 |
| 设计理念 | 从用户反馈到产品迭代：我们的设计方法 | 1000 |
| 开发日志 | 青枣工作室 2026 年度产品路线图 | 800 |
| 开发日志 | 用 React 构建工作室官网的技术选型思考 | 1000 |
| 行业观察 | 2026 年装修行业数字化趋势 | 1000 |
| 行业观察 | AI 在室内设计中的应用与未来 | 1200 |

**发布节奏**：
- 前 2 周：每周发布 3 篇
- 第 3-6 周：每周发布 2 篇
- 总计约 6 周完成 20 篇

**文章质量标准**：
- 每篇 ≥ 800 字
- 有 H2/H3 标题结构
- 包含具体案例或数据
- 非纯 AI 生成，需人工编辑润色
- 回答读者一个明确的问题

**成功标准**：
- 20 篇文章全部上线，每篇有独立 URL
- 文章总字数 ≥ 20,000 字
- Text-to-HTML 比率 > 15%

---

### 阶段二：必需页面补齐（P0 — 最高优先级）

#### 3.3 Disclaimer 免责声明页面

**实施步骤**：

1. 创建 `src/pages/DisclaimerPage.jsx`
2. 添加 `/disclaimer` 路由
3. 在 i18n 文件中添加免责声明内容
4. Footer 底部法律链接区添加 Disclaimer 链接

**免责声明内容要点**：
- 网站内容仅供参考，不构成专业建议
- 装修相关内容不替代专业设计师/施工方意见
- 外部链接不表示 endorsement
- 产品功能以实际使用为准
- 知识产权声明

**成功标准**：
- `/disclaimer` 可访问
- Footer 法律链接区可见

#### 3.4 About/Contact 独立页面化

**实施步骤**：

1. 创建 `src/pages/AboutPage.jsx`，从首页 About 区域提取内容并扩展
2. 创建 `src/pages/ContactPage.jsx`，从首页 Contact 区域提取内容
3. 添加 `/about` 和 `/contact` 路由
4. Header 导航和 Footer 链接更新为路由跳转
5. 首页保留 About/Contact 的简要版本，添加"了解更多"链接

**成功标准**：
- `/about`、`/contact` 均为独立可访问页面
- 每页有独立 title 和 description

---

### 阶段三：技术合规优化（P1 — 高优先级）

#### 3.5 SPA 预渲染

**问题**：纯 CSR 导致爬虫无法索引页面内容，`/privacy`、`/terms`、`/blog/*` 等页面在爬虫看来可能是空白页。

**方案选择**：

| 方案 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| react-snap | 零配置，构建时预渲染 | 不支持动态路由（/blog/:slug） | ⭐⭐ |
| vite-plugin-ssr | 支持动态路由，SSR/SSG 灵活 | 配置复杂 | ⭐⭐⭐ |
| react-helmet + 静态预渲染 | 轻量，meta 标签动态注入 | 仍需爬虫执行 JS | ⭐⭐ |

**推荐方案**：使用 `react-snap` 对静态页面预渲染 + 为博客动态路由生成独立 HTML

**实施步骤**：

1. 安装 `react-snap`
2. 在 `vite.config.js` 中配置预渲染
3. 配置预渲染路由列表：`/`、`/privacy`、`/terms`、`/disclaimer`、`/about`、`/contact`、`/blog` 及所有博客文章页
4. 构建后验证：查看 `dist/` 目录下每个路由对应的 `index.html` 包含完整内容

**成功标准**：
- `dist/privacy/index.html` 查看源码包含隐私政策完整文字
- 所有路由页面预渲染成功

#### 3.6 动态 Meta 标签

**实施步骤**：

1. 安装 `react-helmet-async`
2. 创建 `src/components/SEO.jsx` 通用组件
3. 每个页面组件中设置独立 title、description、canonical URL
4. 博客文章页添加 Open Graph 和结构化数据

**各页面 Meta 规划**：

| 页面 | Title | Description |
|------|-------|-------------|
| `/` | 青枣工作室 - 创新装修与图片处理工具 | 青枣工作室提供装修流程导图、白底抠图等实用工具，让装修和图片处理更简单高效 |
| `/about` | 关于青枣工作室 | 了解青枣工作室的团队、理念和使命 |
| `/contact` | 联系我们 - 青枣工作室 | 通过邮件或社交媒体联系青枣工作室 |
| `/privacy` | 隐私政策 - 青枣工作室 | 青枣工作室隐私政策，了解我们如何保护您的个人信息 |
| `/terms` | 服务条款 - 青枣工作室 | 青枣工作室服务条款，了解使用我们产品和服务的权利与义务 |
| `/disclaimer` | 免责声明 - 青枣工作室 | 青枣工作室免责声明 |
| `/blog` | 博客 - 青枣工作室 | 装修指南、图片处理技巧和产品更新 |
| `/blog/:slug` | {文章标题} - 青枣工作室 | {文章摘要} |

**成功标准**：
- 每个页面查看源码可见独立 title 和 description
- Facebook/LinkedIn 分享时显示正确的 OG 信息

#### 3.7 404 页面

**实施步骤**：

1. 创建 `src/pages/NotFoundPage.jsx`
2. 在 App.jsx 路由中添加 catch-all `*` 路由
3. 404 页面包含：提示文字、返回首页链接、搜索建议

**成功标准**：
- 访问不存在的路径显示 404 页面
- 404 页面有返回首页的链接

#### 3.8 robots.txt 与 sitemap.xml

**实施步骤**：

1. 在 `public/` 目录创建 `robots.txt`
2. 创建构建脚本，在每次 build 后自动生成 `sitemap.xml`
3. sitemap 包含所有预渲染路由的 URL

**robots.txt 内容**：

```
User-agent: *
Allow: /
Sitemap: https://qingzao.site/sitemap.xml
```

**成功标准**：
- `https://qingzao.site/robots.txt` 可访问
- `https://qingzao.site/sitemap.xml` 包含所有页面 URL

#### 3.9 图片优化

**实施步骤**：

1. 将 Unsplash 外链图片下载到 `public/images/`
2. 转换为 WebP 格式（保留原图作为 fallback）
3. 添加图片懒加载（`loading="lazy"`）
4. 设置图片宽高属性避免 CLS

**成功标准**：
- 无外部图片请求（除字体 CDN）
- LCP < 2.5s
- CLS < 0.1

---

### 阶段四：用户体验与权威性提升（P2 — 中优先级）

#### 3.10 Cookie 同意横幅

**实施步骤**：

1. 创建 `src/components/CookieConsent.jsx`
2. 底部固定横幅，包含"接受"和"了解更多"按钮
3. "了解更多"链接到隐私政策 Cookie 章节
4. 用户接受后 localStorage 记录，不再显示

**成功标准**：
- 首次访问显示 Cookie 同意横幅
- 点击接受后不再显示

#### 3.11 面包屑导航与结构化数据

**实施步骤**：

1. 博客文章页添加面包屑导航
2. 添加 JSON-LD 结构化数据（Article、BreadcrumbList）
3. 使用 Google Rich Results Test 验证

**成功标准**：
- Rich Results Test 验证通过
- 搜索结果可能显示面包屑

#### 3.12 Google Search Console 注册

**实施步骤**：

1. 使用 Google 账号登录 Search Console
2. 添加网站属性 `https://qingzao.site`
3. 验证域名所有权（DNS 验证推荐）
4. 提交 sitemap.xml
5. 等待 Google 爬取和索引

**成功标准**：
- Search Console 显示索引页面数 ≥ 20
- 无爬取错误

---

## 四、实施时间线

```
第 1-2 周：博客系统开发 + Disclaimer 页面 + About/Contact 独立化
第 2-3 周：开始发布文章（3 篇/周）+ SPA 预渲染 + 动态 Meta
第 3-4 周：继续发布文章 + 404 页面 + robots.txt/sitemap
第 4-5 周：继续发布文章 + 图片优化 + Cookie 横幅
第 5-6 周：完成 20 篇文章 + Search Console 提交 + 全面测试
第 7 周  ：等待 Google 索引稳定后提交 AdSense 申请
```

---

## 五、关键指标与验收标准

### 5.1 内容指标

| 指标 | 目标值 | 验收方式 |
|------|--------|---------|
| 独立内容页面数 | ≥ 25（20 篇文章 + 5 个必需页面） | 路由列表检查 |
| 原创文章数 | ≥ 20 | `/blog` 页面统计 |
| 每篇文章字数 | ≥ 800 字 | 人工检查 |
| Text-to-HTML 比率 | > 15% | 浏览器开发者工具估算 |
| 内容原创性 | 无抄袭 | Copyscape 检测 |

### 5.2 技术指标

| 指标 | 目标值 | 验收方式 |
|------|--------|---------|
| HTTPS | 全页启用 | 浏览器地址栏检查 |
| LCP | < 2.5s | PageSpeed Insights |
| CLS | < 0.1 | PageSpeed Insights |
| INP | < 200ms | PageSpeed Insights |
| 移动端可用性 | 100% 通过 | Google Mobile-Friendly Test |
| 预渲染 | 所有页面源码可见完整内容 | 查看源码 |
| 404 页面 | 存在且友好 | 访问不存在路径 |

### 5.3 SEO 指标

| 指标 | 目标值 | 验收方式 |
|------|--------|---------|
| 独立 title/description | 每页不同 | 查看源码 |
| sitemap.xml | 包含所有页面 | 直接访问 |
| robots.txt | 正确配置 | 直接访问 |
| Search Console 索引 | ≥ 20 页 | Search Console 后台 |

---

## 六、AdSense 申请前最终检查清单

```
□ 域名使用顶级域名（.site/.com 等），非免费子域名
□ 域名年龄 ≥ 1 个月（推荐 3 个月以上）
□ 全站 HTTPS 启用
□ 原创文章 ≥ 15 篇，每篇 ≥ 800 字
□ About 页面可访问，内容真实
□ Contact 页面可访问，邮箱可用
□ Privacy Policy 页面可访问，提及 Cookie 和 Google 数据使用
□ Terms of Service 页面可访问
□ Disclaimer 页面可访问
□ Footer 底部可见法律链接
□ 移动端体验良好
□ 页面加载速度达标
□ 无死链/404
□ 无其他广告联盟代码
□ Search Console 已提交 sitemap
□ Google 已索引主要页面
□ 内容发布节奏自然（非同一天大量发布）
□ Cookie 同意横幅已部署
```

---

## 七、常见拒审原因与对策

| 拒审原因 | 可能原因 | 对策 |
|----------|---------|------|
| Low Value Content（低价值内容） | 文章数量不足、质量差、模板化 | 增加原创深度文章 |
| Insufficient Content（内容不足） | 页面文字太少 | 每页至少 300 字可读内容 |
| Difficult Site Navigation（导航困难） | 链接不可达、层级过深 | 确保所有页面 3 次点击内可达 |
| Policy Violation（政策违规） | 禁止内容、版权问题 | 审查并移除违规内容 |
| Site Not Available（网站不可用） | 服务器问题、HTTPS 故障 | 确保网站稳定可访问 |
| Duplicate Content（重复内容） | 抄袭、模板同质化 | 确保内容原创 |

---

## 八、参考资源

- [Google AdSense 官方资格要求](https://support.google.com/adsense/answer/9712)
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [TermsFeed 隐私政策生成器](https://www.termsfeed.com/)
