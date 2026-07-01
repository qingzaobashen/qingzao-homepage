# React进阶：React Hooks的使命是分离规整，不是杂糅

如果你刚接触React Hooks，你可能会觉得学了很多useXxx() API但还是写不出好代码。

原因很简单：网上大多数教程都在教你怎么调用一个Hook，而不是教你在真实场景中应该用哪个、为什么用它。

本文直接用真实场景说话。

***

## 一、useState vs useReducer：不是复杂度的区别

你可能看过这种说法："简单状态用useState，复杂状态用useReducer"。

这个建议害了很多人。实际上，**判断标准不是"复杂度"，而是"逻辑关联性"**。

### 什么时候用useState

```javascript
const [count, setCount] = useState(0)
const [name, setName] = useState('')
const [isOpen, setIsOpen] = useState(false)
```

这些状态之间**互不依赖**，每个独立变化。用useState足够。

### 什么时候用useReducer

```javascript
// 表单状态：多个字段需要同时更新
const [form, dispatch] = useReducer(formReducer, {
  name: '',
  email: '',
  phone: '',
  address: '',
  errors: {}
})

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors }
    case 'RESET':
      return initialState
    default:
      return state
  }
}
```

判断标准很简单：**如果更新一个状态时需要同时知道其他状态的值，就用useReducer。**

***

## 二、useEffect：80%的人用错了依赖数组

useEffect是React Hooks里最容易出错的地方。

### 规则1：依赖数组应该包含所有你用到的东西

```javascript
// ❌ 错误：用了count但没在依赖里声明
useEffect(() => {
  document.title = `点击了 ${count} 次`
}, [])

// ✅ 正确
useEffect(() => {
  document.title = `点击了 ${count} 次`
}, [count])
```

### 规则2：不要在useEffect里更新它依赖的值（除非有条件）

```javascript
// ❌ 无限循环
useEffect(() => {
  setCount(count + 1)
}, [count])

// ✅ 有条件
useEffect(() => {
  if (count < 10) {
    setCount(count + 1)
  }
}, [count])
```

### 规则3：数据请求应该在useEffect里做，但要避免竞态

```javascript
useEffect(() => {
  let cancelled = false

  fetch(`/api/user/${userId}`)
    .then(res => res.json())
    .then(data => {
      if (!cancelled) {
        setUser(data)
      }
    })

  return () => {
    cancelled = true  // 组件卸载或userId变化时取消旧请求
  }
}, [userId])
```

***

## 三、自定义Hook：把逻辑从组件中抽出来

这是Hooks最大的价值所在，也是大多数人没有充分利用的功能。

### 不好的写法：逻辑和UI混在一起

```javascript
function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误：{error}</div>
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  )
}
```

### 好的写法：逻辑抽成自定义Hook

```javascript
function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { users, loading, error }
}

function UserList() {
  const { users, loading, error } = useUsers()

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误：{error}</div>
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  )
}
```

抽出来之后，`useUsers` 可以在任何组件中复用，测试也更方便。

### 常用自定义Hook示例

```javascript
// 监听窗口大小
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handle = () => setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  return size
}

// 本地存储
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
```

***

## 四、useMemo和useCallback：不要过早优化

大部分人用这两个Hook的时机是错的。

### 什么时候真的需要用

```javascript
// ❌ 不需要：计算很简单
const doubled = useMemo(() => count * 2, [count])

// ✅ 需要：计算代价很大
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => expensiveCompare(a, b))
}, [users])
```

**黄金法则**：先不用useMemo和useCallback，等真的出现性能问题（在React DevTools Profiler里能测出来）再添加。

***

## 五、常见模式和反模式

### 不要写复杂的useEffect

```javascript
// ❌ 反模式：一个useEffect做太多事
useEffect(() => {
  fetchUser()
  fetchPosts()
  setupWebSocket()
  trackPageView()
}, [userId])
```

```javascript
// ✅ 拆成多个
useEffect(() => { fetchUser() }, [userId])
useEffect(() => { fetchPosts() }, [userId])
useEffect(() => { setupWebSocket(); return cleanup }, [userId])
useEffect(() => { trackPageView() }, [])
```

每个useEffect只做一件事。

### 不要滥用状态

```javascript
// ❌ 可以从已有数据计算出来的就不要存
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [fullName, setFullName] = useState('')

// ✅ 直接用
const fullName = firstName + ' ' + lastName
```

***

## 六、迁移建议：从Class到Hooks

如果你的项目还在用Class组件，这是一个安全的迁移路径：

1. 新组件全部用Hooks
2. 旧组件不急着改，遇到bug或新需求时再改
3. 优先把"逻辑密集型"的Class组件改成Hooks（因为自定义Hook可以显著降低复杂度）

***

## 结语

Hooks不仅仅是另一种写法，它是一种更自然的"把UI和逻辑分离开"的思路。

掌握Hooks的关键不是背API，而是学会在工作中识别："这段逻辑能抽出来用自定义Hook吗？"

多写、多拆、多复用，自然就熟练了。
