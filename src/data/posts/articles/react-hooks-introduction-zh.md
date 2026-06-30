# React Hooks 入门：现代React开发的核心概念

React Hooks 彻底改变了React组件的编写方式。本文介绍Hooks的核心概念和常用API。

## 一、什么是 React Hooks？

Hooks 是 React 16.8 引入的新特性，允许在函数组件中使用状态和其他 React 特性。

## 二、常用的 Hooks

### 1. useState
用于在函数组件中添加状态。

```javascript
const [count, setCount] = useState(0);
```

### 2. useEffect
用于处理副作用（数据获取、订阅、定时器等）。

```javascript
useEffect(() => {
  document.title = `点击了 ${count} 次`;
}, [count]);
```

### 3. useContext
用于访问上下文。

### 4. useReducer
用于复杂状态逻辑。

### 5. useMemo 和 useCallback
用于性能优化。

## 三、Hooks 的规则

1. 只在顶层调用 Hooks
2. 只在 React 函数中调用 Hooks

## 四、自定义 Hooks

可以创建自己的 Hooks，提取组件逻辑。

```javascript
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  // ...
  return width;
}
```

## 五、Hooks 的优势

1. 复用状态逻辑更容易
2. 组件更容易理解
3. 更小的代码体积

## 结语

React Hooks 是现代 React 开发的核心。掌握 Hooks，能让你写出更简洁、更易维护的代码。