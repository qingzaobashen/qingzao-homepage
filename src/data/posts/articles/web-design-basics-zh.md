# 网页布局：别从浮动学起，从Flexbox开始

如果你正准备学网页布局，有个建议：**直接从Flexbox开始，跳过浮动。**

不是说浮动没用，而是2026年的前端开发，90%的布局需求用Flexbox和Grid就能解决。浮动已经是上个时代的解决方案，它的主要用途只剩"文字环绕图片"了。

本文带你从实际场景出发，掌握现代网页布局的核心技能。

---

## 一、先理解盒模型

这是CSS布局的地基。不搞清楚这个，后面的所有东西都是空中楼阁。

每个HTML元素就是一个盒子，从内到外四层：

```
┌─────────────────┐ ← margin
│  ┌───────────┐  │ ← border
│  │  ┌─────┐  │  │ ← padding
│  │  │content│  │  │
│  │  └─────┘  │  │
│  └───────────┘  │
└─────────────────┘
```

### 关键公式

一个元素在页面上实际占用的宽度 = `content + padding + border`

```css
/* 如果你设置宽度300px，再加padding: 20px，实际宽度是340px */
.box {
  width: 300px;
  padding: 20px;
  border: 1px solid #000;
}
```

### 能救命的一个属性

```css
* {
  box-sizing: border-box;
}
```

加上这个之后，padding和border被包含在width内部。300px就是实际的300px，不用再算来算去。建议每个项目的CSS第一行就加上。

---

## 二、Flexbox：一维布局的主力

网上讲Flexbox的文章都在列属性列表，但实际场景中你只需要记住几个模式。

### 模式1：水平居中

```css
.parent {
  display: flex;
  justify-content: center;  /* 水平居中 */
  align-items: center;      /* 垂直居中 */
}
```

这是最常用的模式，没有之一。不管里面是文字、按钮还是图片，一行代码居中。

### 模式2：等分排列

```css
.parent {
  display: flex;
}

.child {
  flex: 1;  /* 每个子元素平分父容器宽度 */
}
```

适用场景：导航栏的菜单项、卡片列表、表单的多列布局。

### 模式3：间距自动分配

```css
.parent {
  display: flex;
  justify-content: space-between; /* 两端对齐，中间间距自动分配 */
}
```

适用场景：顶栏的"logo-导航-用户头像"布局。

### 模式4：侧边栏固定 + 内容自适应

```css
.container {
  display: flex;
}
.sidebar {
  width: 240px;        /* 固定宽度 */
  flex-shrink: 0;      /* 不被压缩 */
}
.content {
  flex: 1;             /* 占据剩余所有空间 */
}
```

这是后台管理系统最常见的布局模式。

### 换行处理

子元素太多挤在一起时：

```css
.parent {
  display: flex;
  flex-wrap: wrap;    /* 允许换行 */
  gap: 16px;          /* 间距（现代浏览器都支持了） */
}

.child {
  width: calc(33.33% - 11px);  /* 减去gap的偏移 */
}
```

---

## 三、Grid：二维布局的终极方案

Flexbox擅长"一行"或"一列"，但遇到"一张表"式的布局（行和列同时控制），Grid才是正确的工具。

### 经典的三栏布局

```css
.container {
  display: grid;
  grid-template-columns: 240px 1fr 200px;
  /*             侧边栏  主内容  右侧栏 */
  gap: 20px;
}
```

不需要浮动、不需要计算宽度、不需要担心清除浮动。三行CSS搞定。

### 自适应卡片网格

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
```

这行代码的意思是：自动生成尽可能多的列，每列最少280px、最多等分剩余空间。配合`gap`属性，一个响应式卡片网格就完成了，不需要任何媒体查询。

### Grid vs Flexbox：什么时候用谁

| 场景 | 用谁 |
|------|------|
| 一行内水平排列几个东西 | Flexbox |
| 页面整体布局（头部、侧栏、内容、底部） | Grid |
| 不确定数量的卡片网格 | Grid |
| 需要垂直居中 | Flexbox |
| 表格状的数据展示 | Grid |
| 工具栏/导航栏 | Flexbox |

---

## 四、响应式设计的真正核心

不是媒体查询，而是**流动布局**。

### 用相对单位代替固定单位

```css
/* ❌ 不要这样 */
.box {
  width: 1200px;
}

/* ✅ 应该这样 */
.box {
  width: 100%;
  max-width: 1200px;  /* 可以宽但不能超过1200px */
  margin: 0 auto;     /* 水平居中 */
}
```

### 图片自动适应

```css
img {
  max-width: 100%;    /* 图片不超过父容器宽度 */
  height: auto;       /* 高度按比例缩放 */
}
```

### 媒体查询只需要处理特殊情况

```css
/* 默认样式写通用的（移动端优先） */

/* 平板及以上添加增强样式 */
@media (min-width: 768px) {
  .nav {
    display: flex;           /* 导航栏横排 */
  }
  .sidebar {
    display: block;          /* 显示侧边栏 */
  }
}
```

---

## 五、常见布局问题的排查方法

### 元素跑位了

在浏览器按F12打开开发者工具，选中该元素，看Computed面板：

- 检查宽度是不是超出了父容器
- 检查margin是不是负值
- 检查有没有被`overflow: hidden`裁掉

### 父容器高度不对

给父容器加 `overflow: hidden`（触发BFC），或者用Flexbox代替浮动。

### 两个元素中间有奇怪的空白

这通常是HTML中换行造成的空白字符。父容器设 `font-size: 0`，子元素单独设回字体大小即可。

---

## 六、推荐的学习顺序

1. **第1天**：盒模型 + `box-sizing: border-box`
2. **第2-3天**：Flexbox（只学上面那4个模式就够了）
3. **第4-5天**：Grid（重点在 `grid-template-columns: repeat(auto-fill, minmax())`）
4. **第6-7天**：拿一个真实的设计稿（比如一个博客页面），完全用Flexbox和Grid实现

---

## 结语

现代CSS布局已经不需要多少奇技淫巧了。把上面的内容吃透，你能搞定95%的布局需求。

从现在开始，忘掉浮动。除非你确实需要"文字环绕图片"。
