# 2026-08-04 全站风格切换（温暖 / 山水墨画）设计

## 背景与目标

当前站点已复刻 Easton 暖色编辑风（`html[data-theme]` 控制浅色/深色/跟随系统三态主题）。本次新增第二个正交维度——「风格」，使用户可在**温暖风格（warm）**与**山水墨画风格（ink）**之间全站切换。

- 风格与主题是两个独立维度，交叉组合共 4 种状态（warm×light、warm×dark、ink×light、ink×dark）。
- 默认风格：`warm`（保持现状，不改变现有用户视觉）。
- 选择持久化到 localStorage，刷新不丢。

## 架构

### 新增文件

| 文件 | 职责 |
|------|------|
| `src/contexts/StyleContext.jsx` | StyleProvider：管理 `style` 状态（'warm' \| 'ink'），持久化到 `qingzao-style`，应用 `html[data-style]` |
| `src/hooks/useStyle.jsx` | 消费 StyleContext 的 Hook，暴露 `{ style, setStyle, availableStyles, resolvedStyle }` |
| `src/components/StyleSwitcher.jsx` | Header 中的风格切换下拉组件（温暖 🖌 / 水墨 🏔），含移动端内联形态 |

### 修改文件

| 文件 | 变更 |
|------|------|
| `src/index.css` | 新增 `html[data-style="ink"]` 设计令牌组（浅/深两套水墨变体）；为 `.container`、卡片、按钮等提供水墨覆盖；新增水墨背景装饰类 |
| `index.html` | 防 FOUC 内联脚本扩展：读取 `qingzao-style` 并预先设置 `html[data-style]` |
| `src/components/Header.jsx` / `Header.css` | Header 右侧在主题切换旁增加 StyleSwitcher；移动端抽屉内并入 |
| `src/components/BlogHero.jsx` / `BlogHero.css` | ink 风格下显示大幅水墨 Hero 插画（SVG 山峰/云雾/涟漪） |
| `src/App.jsx` | 以 `<StyleProvider>` 包裹应用（置于 ThemeProvider 之外或之内，二者正交） |

### 状态模型

- `style`: `'warm' | 'ink'`，默认 `'warm'`。
- localStorage 键：`qingzao-style`。
- DOM：`html[data-style="ink"]`（仅 ink 时设置；warm 为默认可不设）。
- 与 ThemeContext 完全解耦：切换风格不清空、不依赖主题选择。

## 水墨风格（ink）视觉规范

> **迭代记录（2026-08-04 追加）**：首版仅换色板 + hero 插画，用户反馈「整体仍是温暖风、只有首页 hero 换了画」。为此强化全站水墨氛围：
> - **全站固定山影层**：`html[data-style="ink"] body::after` 叠加 4 层淡墨远山剪影 SVG（浅色 7%-20% 墨黑、深色 5%-15% 淡墨），`position:fixed` 铺满视口，所有页面共享；
> - **宣纸纸纹**：`body` 加 fractalNoise SVG 噪点纹理（浅/深各一），`background-attachment:fixed`；
> - **按钮墨黑化**：ink 下 `.ed-button--primary` / `.btn-nav-primary` 改为墨黑底，朱砂仅作印章小面积点缀，弱化暖红大面积出现；
> - **Header / 筛选栏 / 公告横幅** 毛玻璃底色改为 ink 专用（冷纸 72%-82% 透明）；
> - **色板转冷**：底色由宣纸米白改为冷灰纸 `#f0f1ec`（深色 `#1a1a18`），主色朱砂降饱和为 `#a43c28`，辅助黛青 `#5d6b5e`，营造萧瑟静谧；
> - **Hero 插画扩充**：增加孤舟渔翁、前景松枝、更多云雾层，改 `xMidYMid slice` 铺满 Hero。

### 浅色变体（冷宣纸底）

| 令牌 | 值 | 说明 |
|------|-----|------|
| `--color-bg` | `#f0f1ec` | 冷宣纸底 |
| `--color-canvas` | `#f4efe4` | 淡墨卡片面 |
| `--color-canvas-soft` | `#ece5d6` | 柔和表面 |
| `--color-canvas-raised` | `#f8f3ea` | 浮起表面 |
| `--color-ink` | `#2b2a26` | 墨黑标题 |
| `--color-ink-secondary` / body | `#4a483f` | 次级墨灰 |
| `--color-ink-mute` | `#7a7669` | 淡墨弱化文字 |
| `--color-ink-mute-2` / faint | `#a29c8c` | 更弱 |
| `--color-primary` | `#a43c28` | 朱砂印章红（降饱和） |
| `--color-primary-deep` | `#86301f` | 朱砂深 |
| `--color-primary-soft` | `#ecdbcc` | 朱砂浅底 |
| `--color-accent` | `#a43c28` | |
| `--color-accent-green` | `#5d6b5e` | 黛青（辅助） |
| `--color-border` | `#d4d8cb` | 淡墨边框 |
| `--color-hairline-strong` | `#bfc5b4` | |
| `--color-hover-bg` | `#e1e3d9` | |
| `--color-tag-bg` | `#e1e3d9` | |
| `--shadow-*` | 淡墨灰调阴影 | |
| `--color-on-primary` | `#fff` | |

### 深色变体（墨色底）

| 令牌 | 值 |
|------|-----|
| `--color-bg` | `#1a1a18` |
| `--color-canvas` | `#232220` |
| `--color-canvas-soft` | `#2c2a27` |
| `--color-canvas-raised` | `#35322e` |
| `--color-ink` | `#e6e2d8` |
| `--color-ink-secondary` / body | `#c6c2b6` |
| `--color-ink-mute` | `#9a9488` |
| `--color-primary` | `#cf5b42` |
| `--color-primary-deep` | `#e07a5f` |
| `--color-primary-soft` | `#4a2a22` |
| `--color-border` | `rgba(214, 208, 195, 0.16)` |

### 装饰与插画

- **全站山影层**：`body::after` 固定 4 层淡墨远山剪影（SVG data-URI），铺满视口、所有页面共享，营造萧瑟静谧底色。
- **宣纸纸纹**：`body` 挂 fractalNoise 噪点纹理（浅色墨黑 4.5%、深色淡墨 5%），`background-attachment: fixed`。
- **Hero（大幅水墨插画）**：`BlogHero` 在 ink 风格下渲染 SVG 插画——层叠远山（淡墨渐变）、云雾（柔和椭圆）、孤舟渔翁、前景松枝、水面涟漪与朱砂印章，`xMidYMid slice` 铺满 Hero。
- **按钮墨黑化**：ink 下主按钮改为墨黑底（`--color-ink`），朱砂红只作印章/小面积点缀，避免大面积暖红。
- **Header / 筛选栏 / 公告横幅**：毛玻璃底色改为 ink 专用冷纸透明色。
- **印章 Logo**：Header 的「青」字标在 ink 下呈现为朱砂印章造型（红底白字、方印圆角）；Footer 徽标同理。
- **字体**：沿用现有 `--font-heading`（Noto Serif SC 宋体），天然契合水墨气质，不新增字体加载。

### 克制原则

- 卡片、分类标签、文章正文、代码块等在 ink 下仅换令牌色，不加重装饰。
- 大幅插画仅出现在 Hero；正文/内页靠全站山影层 + 纸纹营造氛围，避免干扰阅读。
- 深色变体插画/山影同步调暗（墨色山体 + 低亮云雾）。

## 切换器 UI

- **Header 右侧**：在主题切换按钮旁新增「风格切换下拉」，按钮为画刷图标（🖌/🏔 SVG），下拉列出「温暖风格」「水墨风格」，当前项打勾。
- **移动端**：Header 抽屉内的主题选择区旁追加风格选择（两个选项按钮内联排列），与现有 `header-theme-mobile` 结构对齐。
- **文案**：新增 locale 键（`header.style.warm`、`header.style.ink`、`header.styleAriaLabel`），中英双语。

## 交互细节

- 点击切换立即生效：设置 `localStorage` + 更新 `html[data-style]`。
- 首次访问无存储值 → 默认 `warm`，不写 DOM 属性。
- 风格与主题独立：切风格不改变深浅选择；切深浅不改变风格。
- 平滑过渡：为背景/文字色添加 `transition`（沿用现有 0.25s）。

## 测试与验收

- `npm run build` 通过。
- 手动验证 4 种组合（warm/ink × light/dark）在首页、文章页、分类页、系列页、内页均正常。
- 刷新后风格保持（localStorage 持久化）。
- 移动端抽屉内风格切换可用。
- 无硬编码字符串（全部走 `t()`）。

## 后续（非本次范围）

- 第三方主题定制（用户自定义配色）。
- 水墨纹理细化（纸张纹理 SVG 贴图）。
