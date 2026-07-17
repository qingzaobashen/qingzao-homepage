# 长期记忆（MEMORY.md）

## 博客文章集成约定（qingzao-homepage）
- 文章源文件位于 `src/data/posts/articles/`，**支持子目录**（如 `Decoration_articles/`）。`postContentLoader.js` 与 `scripts/prerender.mjs` 均为递归扫描。
- 文件命名：`<slug>-zh.md` / `<slug>-en.md`（或 `<slug>.md` 兜底）。**slug 必须为 ASCII**，用于生成干净 URL `/blog/<slug>`（与 canonical/sitemap 一致，均为无斜杠）。
- 元数据在 `src/data/posts/posts-zh.json`（中文）与 `posts-en.json`（英文）。某语言要展示某文章，必须在该语言的 JSON 中有对应条目。
- 预设渲染产物为**扁平 .html**（`dist/blog/<slug>.html`），避免 Vercel 对目录 index.html 的 308 重定向（GSC「未编入索引」根因，已于 2026-07-15 修复）。
- **约定**：仅有中文内容的文章只写入 `posts-zh.json`，不要因为没有英文正文就写进 `posts-en.json`（否则英文列表会显示空正文，不利 AdSense 质量）。
- 新增文章步骤：① 在 `articles/`（或子目录）放 `<slug>-zh.md`（及 `<slug>-en.md` 若中英都有）；② 在对应语言 JSON 加 `{slug,title,date,category,tags,excerpt}`；③ `npm run build:full` 会自动预渲染 + 重新生成 sitemap。

## 国际化架构（URL 级 / 方案 A，qingzao-homepage）
- 语言真源 = **URL 路径前缀**：中文默认无前缀（`/blog/<slug>`、`/about`…），英文加 `/en`（`/en/blog/<slug>`、`/en/about`…）。互不重定向，各自独立可索引。
- 实现要点：
  - `LanguageContext` 据 `location.pathname` 是否以 `/en` 开头决定语言；`setLanguage` 在「同内容的中/英路径」间 `navigate`；`localePath(path)` 给路径加 /en 前缀。
  - `SEO` 组件支持 `alternates`（hreflang）prop；`siteName`/`og:locale` 随语言。hreflang 由 Helmet 客户端输出。
  - 所有站内链接（Header/Footer/Hero/页内）经 `localePath` 处理，避免中英文互跳错语言。
  - `prerender.mjs` 为每路由生成中/英两份扁平 `.html`（`dist/blog/<slug>.html` 与 `dist/en/blog/<slug>.html`）；英文读 `-en.md`。**预渲染不注入 hreflang**（避免与 Helmet 重复），但注入 canonical/og/html lang（供无 JS 爬虫，AdSense 整改关键）。
  - `sitemap.xml` 每个 `<url>` 带 `xhtml:link` hreflang（zh-CN/en-US/x-default），x-default 指向中文 URL。
- 关键决策：中英文拥有各自独立 URL 后，Google 可分别索引；这是把英文翻译真正转化为 SEO 流量的前提。

## AdSense 自动广告（Auto Ads，2026-07-17）
- 全站自动广告脚本（client `ca-pub-3359350154774191`）必须出现在**每一个**页面的 `<head>`，Google 才会在所有最佳位置自动投放。
- 两个注入点，缺一不可：
  1. `index.html` 的 `<head>`（源文件已含，SPA 首屏 + 作为预渲染模板）。
  2. `scripts/prerender.mjs`：新增 `ADSENSE_SCRIPT` 常量 + `ensureAdSenseScript(html)`（幂等，已存在则跳过），在 `writeRoute` 写入前对最终 HTML 强制注入。覆盖所有构建期生成的静态/博客 HTML（中文 + 英文）。
- 注意：`public/google<id>.html` 是 AdSense **站点验证文件**，只含验证 meta，**不应**注入广告脚本（已确认不注入）。
- `npm run build:full` 链：`generate-sitemap` → `vite build` → `prerender`。任一步失败会导致 dist 残留旧文件；如改动 prerender 后验证，建议单独跑 `node scripts/prerender.mjs` 再 grep 确认。

## 验证方式
- 本地预览：`Start-Process npx vite preview --port 4173`，用 `curl.exe -s -o NUL -w "%{http_code} REDIRECT=%{redirect_url}"` 检查状态码/重定向；`Select-String` 查 prerendered HTML 的 body 与 canonical。
- 网页类改动用 Chrome DevTools MCP 验证渲染与 console。
