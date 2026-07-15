# 长期记忆（MEMORY.md）

## 博客文章集成约定（qingzao-homepage）
- 文章源文件位于 `src/data/posts/articles/`，**支持子目录**（如 `Decoration_articles/`）。`postContentLoader.js` 与 `scripts/prerender.mjs` 均为递归扫描。
- 文件命名：`<slug>-zh.md` / `<slug>-en.md`（或 `<slug>.md` 兜底）。**slug 必须为 ASCII**，用于生成干净 URL `/blog/<slug>`（与 canonical/sitemap 一致，均为无斜杠）。
- 元数据在 `src/data/posts/posts-zh.json`（中文）与 `posts-en.json`（英文）。某语言要展示某文章，必须在该语言的 JSON 中有对应条目。
- 预设渲染产物为**扁平 .html**（`dist/blog/<slug>.html`），避免 Vercel 对目录 index.html 的 308 重定向（GSC「未编入索引」根因，已于 2026-07-15 修复）。
- **约定**：仅有中文内容的文章只写入 `posts-zh.json`，不要因为没有英文正文就写进 `posts-en.json`（否则英文列表会显示空正文，不利 AdSense 质量）。
- 新增文章步骤：① 在 `articles/`（或子目录）放 `<slug>-zh.md`；② 在对应语言 JSON 加 `{slug,title,date,category,tags,excerpt}`；③ `npm run build:full` 会自动预渲染 + 重新生成 sitemap。

## 验证方式
- 本地预览：`Start-Process npx vite preview --port 4173`，用 `curl.exe -s -o NUL -w "%{http_code} REDIRECT=%{redirect_url}"` 检查状态码/重定向；`Select-String` 查 prerendered HTML 的 body 与 canonical。
- 网页类改动用 Chrome DevTools MCP 验证渲染与 console。
