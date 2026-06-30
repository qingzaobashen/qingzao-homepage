# Web Design Basics: Learn Web Layout from Scratch

Web design is the foundation of frontend development. This article introduces the basic principles and common techniques of web layout from scratch.

## 1. Basic Concepts of Web Layout

Every HTML element can be considered a box (box model), consisting of content, padding, border, and margin from inside to outside.

## 2. Common Layout Techniques

### 1. Float Layout
Use the `float` property to float elements left or right. Remember to clear floats.

### 2. Flexbox Layout
Use `display: flex` to create a flex container, suitable for one-dimensional layouts.

**Common Properties**:
- `flex-direction`: Arrangement direction
- `justify-content`: Main axis alignment
- `align-items`: Cross axis alignment

### 3. Grid Layout
Use `display: grid` to create a grid container, suitable for two-dimensional layouts.

## 3. Responsive Design

Responsive design means a website automatically adapts to different screen sizes.

**Implementation Methods**:
1. Viewport meta tag
2. Media Queries
3. Fluid layouts
4. Flexible images

## 4. Common Page Structures

### 1. Three-column Layout
Header, navigation, main content, sidebar, footer

### 2. Centered Layout
Horizontal and vertical centering

### 3. Holy Grail Layout
Classic web layout: header, footer, three-column middle section

## 5. Common Layout Issues

### Problem 1: Element Overlap
Check positioning properties, clear floats.

### Problem 2: Collapsed Heights
Clear floats using the clearfix method.

### Problem 3: Margin Collapse
Use padding or borders to separate elements.

## Conclusion

Mastering core technologies like the box model, Flexbox, and Grid will help you handle most layout needs. Happy coding!