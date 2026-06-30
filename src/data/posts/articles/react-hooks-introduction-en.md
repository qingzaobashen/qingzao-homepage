# React Hooks: Stop Learning "Syntax," Learn "Thinking"

If you're new to React Hooks, you've probably felt like you learned a bunch of APIs but still can't write good code.

The reason is simple: most tutorials teach you how to call a Hook, not which one to use in a real scenario and why.

This article speaks directly through real-world scenarios.

---

## 1. useState vs useReducer: It's Not About Complexity

You've probably heard: "use useState for simple state, useReducer for complex state."

This advice misleads many people. The real criterion is **not complexity, but logical interdependence.**

### When to use useState

```javascript
const [count, setCount] = useState(0)
const [name, setName] = useState('')
const [isOpen, setIsOpen] = useState(false)
```

These states don't depend on each other — each changes independently. useState is sufficient.

### When to use useReducer

```javascript
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

Simple rule: **if updating one piece of state requires knowing other state values, use useReducer.**

---

## 2. useEffect: 80% of People Get the Dependency Array Wrong

useEffect is the most error-prone Hook.

### Rule 1: Include Everything You Use in the Dependency Array

```javascript
// ❌ Wrong: used `count` but didn't declare in deps
useEffect(() => {
  document.title = `Clicked ${count} times`
}, [])

// ✅ Correct
useEffect(() => {
  document.title = `Clicked ${count} times`
}, [count])
```

### Rule 2: Don't Update What You Depend On (Unless Conditionally)

```javascript
// ❌ Infinite loop
useEffect(() => {
  setCount(count + 1)
}, [count])

// ✅ With condition
useEffect(() => {
  if (count < 10) {
    setCount(count + 1)
  }
}, [count])
```

### Rule 3: Handle Race Conditions in Data Fetching

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
    cancelled = true
  }
}, [userId])
```

---

## 3. Custom Hooks: Extracting Logic from Components

This is the biggest value of Hooks — and the most underused feature.

### Bad: Logic Mixed with UI

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

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  )
}
```

### Good: Logic in a Custom Hook

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

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  )
}
```

### Useful Custom Hook Examples

```javascript
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

---

## 4. useMemo and useCallback: Don't Prematurely Optimize

Most people use these Hooks at the wrong time.

### When to Actually Use Them

```javascript
// ❌ Unnecessary: simple computation
const doubled = useMemo(() => count * 2, [count])

// ✅ Necessary: expensive computation
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => expensiveCompare(a, b))
}, [users])
```

**Golden rule**: Don't add useMemo or useCallback until you measure a real performance issue in React DevTools Profiler.

---

## 5. Common Patterns and Anti-patterns

### Don't Write Bloated useEffects

```javascript
// ❌ Anti-pattern: one useEffect does too much
useEffect(() => {
  fetchUser()
  fetchPosts()
  setupWebSocket()
  trackPageView()
}, [userId])
```

```javascript
// ✅ Split into multiple
useEffect(() => { fetchUser() }, [userId])
useEffect(() => { fetchPosts() }, [userId])
useEffect(() => { setupWebSocket(); return cleanup }, [userId])
useEffect(() => { trackPageView() }, [])
```

One useEffect, one responsibility.

### Don't Store Derived State

```javascript
// ❌ Computable from existing data
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [fullName, setFullName] = useState('')

// ✅ Just compute it
const fullName = firstName + ' ' + lastName
```

---

## 6. Migration: Class to Hooks

If your project still uses Class components, here's a safe migration path:

1. New components use Hooks
2. Don't rush to rewrite old components — do it when you encounter bugs or need new features
3. Prioritize converting "logic-heavy" Class components to Hooks (custom Hooks significantly reduce complexity)

---

## Conclusion

Hooks aren't just a different syntax — they're a more natural approach to separating UI from logic.

The key isn't memorizing APIs. It's learning to ask yourself: "Can I extract this logic into a custom Hook?"

Write more, extract more, reuse more. Proficiency will follow naturally.
