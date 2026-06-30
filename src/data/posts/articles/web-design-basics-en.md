# Web Layout: Don't Start with Floats, Start with Flexbox

If you're about to learn web layout, here's a suggestion: **start directly with Flexbox and skip floats.**

Not because floats are useless, but because in 2026, 90% of layout needs can be solved with Flexbox and Grid. Floats are a solution from a bygone era, and their only remaining use is "wrapping text around images."

This article cuts straight to the chase, covering the core skills of modern web layout through real-world scenarios.

---

## 1. First Understand the Box Model

This is the foundation of CSS layout. Without understanding it, everything else is built on sand.

Every HTML element is a box, with four layers from inside to out:

```
┌─────────────────┐ ← margin
│  ┌───────────┐  │ ← border
│  │  ┌─────┐  │  │ ← padding
│  │  │content│  │  │
│  │  └─────┘  │  │
│  └───────────┘  │
└─────────────────┘
```

### Key Formula

An element's actual rendered width = `content + padding + border`

```css
/* If you set width: 300px and add padding: 20px, the actual width is 340px */
.box {
  width: 300px;
  padding: 20px;
  border: 1px solid #000;
}
```

### One Property That Saves Lives

```css
* {
  box-sizing: border-box;
}
```

With this, padding and border are included within the width. 300px means 300px — no more mental math. Make this the first CSS rule in every project.

---

## 2. Flexbox: The Workhorse of 1D Layout

Most Flexbox tutorials just list properties. But in practice, you only need to remember a few patterns.

### Pattern 1: Centering

```css
.parent {
  display: flex;
  justify-content: center;  /* horizontal centering */
  align-items: center;      /* vertical centering */
}
```

This is the most commonly used pattern, bar none. One line of code centers text, buttons, or images.

### Pattern 2: Equal Distribution

```css
.parent {
  display: flex;
}

.child {
  flex: 1;  /* each child gets equal width */
}
```

Use cases: nav menus, card lists, multi-column form layouts.

### Pattern 3: Auto Spacing

```css
.parent {
  display: flex;
  justify-content: space-between;
}
```

Use case: the "logo—nav—avatar" layout in a top bar.

### Pattern 4: Fixed Sidebar + Fluid Content

```css
.container {
  display: flex;
}
.sidebar {
  width: 240px;     /* fixed width */
  flex-shrink: 0;   /* don't compress */
}
.content {
  flex: 1;          /* take remaining space */
}
```

This is the most common layout pattern for admin dashboards.

### Handling Wrapping

```css
.parent {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.child {
  width: calc(33.33% - 11px);
}
```

---

## 3. Grid: The Ultimate 2D Layout Solution

Flexbox handles one row or one column well. But when you need to control rows and columns simultaneously — a "table-like" layout — Grid is the right tool.

### Classic Three-Column Layout

```css
.container {
  display: grid;
  grid-template-columns: 240px 1fr 200px;
  gap: 20px;
}
```

No floats, no width calculations, no clearfix worries. Three lines of CSS, done.

### Auto-Fit Card Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
```

This generates as many columns as possible, each at least 280px wide. A fully responsive card grid with zero media queries.

### Grid vs Flexbox: When to Use Which

| Scenario | Use |
|----------|-----|
| Horizontal alignment in one row | Flexbox |
| Page-level layout (header, sidebar, content, footer) | Grid |
| Unknown number of cards | Grid |
| Vertical centering | Flexbox |
| Tabular data display | Grid |
| Toolbars / nav bars | Flexbox |

---

## 4. The Real Core of Responsive Design

It's not media queries — it's **fluid layout**.

### Use Relative Units, Not Fixed Ones

```css
/* ❌ Don't do this */
.box {
  width: 1200px;
}

/* ✅ Do this */
.box {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
```

### Auto-Fitting Images

```css
img {
  max-width: 100%;
  height: auto;
}
```

### Media Queries for Edge Cases Only

```css
/* Write default styles for mobile-first */

/* Add enhanced styles for tablet+ */
@media (min-width: 768px) {
  .nav {
    display: flex;
  }
  .sidebar {
    display: block;
  }
}
```

---

## 5. Common Layout Debugging

### Element Out of Place

F12 to open DevTools, inspect the element, check the Computed panel:
- Is the width exceeding the parent?
- Is the margin negative?
- Is it clipped by `overflow: hidden`?

### Parent Height Wrong

Add `overflow: hidden` to the parent (triggers BFC), or use Flexbox instead of floats.

### Strange Whitespace Between Elements

This is usually whitespace characters from line breaks in HTML. Set `font-size: 0` on the parent, then restore font size on children.

---

## 6. Recommended Learning Path

1. **Day 1**: Box model + `box-sizing: border-box`
2. **Days 2–3**: Flexbox (just the 4 patterns above)
3. **Days 4–5**: Grid (focus on `grid-template-columns: repeat(auto-fill, minmax())`)
4. **Days 6–7**: Take a real design mockup (e.g., a blog page) and build it with just Flexbox and Grid

---

## Conclusion

Modern CSS layout doesn't need many tricks anymore. Master the content above and you can handle 95% of layout needs.

From now on, forget floats. Unless you genuinely need text wrapping around images.
