# React.js Coding Standards

## Overview
This document defines the coding standards and best practices for React.js development within the ASDM ecosystem.

## Code Style

### Component Structure
```jsx
// Component name: PascalCase
// File name: PascalCase.jsx or kebab-case.jsx

import React from 'react';
import PropTypes from 'prop-types';

// Component definition
const MyComponent = ({ title, children }) => {
  return (
    <div className="my-component">
      <h1>{title}</h1>
      {children}
    </div>
  );
};

// PropTypes
MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

// Default props
MyComponent.defaultProps = {
  children: null,
};

export default MyComponent;
```

### Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile`, `NavigationBar`)
- **Props**: camelCase (e.g., `userName`, `isActive`)
- **State variables**: camelCase with descriptive names
- **Event handlers**: `handle` prefix (e.g., `handleClick`, `handleSubmit`)
- **Boolean props**: `is`, `has`, `should` prefixes (e.g., `isVisible`, `hasError`)

## Hooks Best Practices

### useState
```jsx
// ✅ Good: Descriptive state names
const [isLoading, setIsLoading] = useState(false);
const [userData, setUserData] = useState(null);

// ❌ Bad: Vague names
const [state, setState] = useState({});
const [data, setData] = useState(null);
```

### useEffect
```jsx
// ✅ Good: Proper dependency array
useEffect(() => {
  fetchData(userId);
}, [userId]);

// ❌ Bad: Missing dependencies
useEffect(() => {
  fetchData(userId);
}, []);
```

### Custom Hooks
```jsx
// Prefix with 'use'
const useUserData = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(setData).finally(() => setLoading(false));
  }, [userId]);

  return { data, loading };
};
```

## State Management

### Local State
Use for component-specific data:
```jsx
const [isOpen, setIsOpen] = useState(false);
```

### Context
Use for shared state across components:
```jsx
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### External State Management
Consider Redux, Zustand, or similar for complex applications.

## Performance Optimization

### Memoization
```jsx
// useMemo for expensive calculations
const sortedList = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// useCallback for function references
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// React.memo for component memoization
const MemoizedComponent = React.memo(MyComponent);
```

### Code Splitting
```jsx
// Lazy loading
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// Usage with Suspense
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

## Error Handling

### Error Boundaries
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## Testing

### Component Testing
```jsx
import { render, screen, fireEvent } from '@testing-library/react';

test('renders button and handles click', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  const button = screen.getByRole('button', { name: /click me/i });
  fireEvent.click(button);
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Hook Testing
```jsx
import { renderHook, act } from '@testing-library/react-hooks';

test('useCounter increments correctly', () => {
  const { result } = renderHook(() => useCounter(0));
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

## Accessibility

### ARIA Attributes
```jsx
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  onClick={handleClose}
>
  <XIcon />
</button>
```

### Focus Management
```jsx
const inputRef = useRef(null);

useEffect(() => {
  if (isOpen) {
    inputRef.current?.focus();
  }
}, [isOpen]);
```

## Security

### XSS Prevention
```jsx
// ❌ Bad: dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Good: Sanitize input
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

### Sensitive Data
- Never store sensitive data in localStorage
- Use environment variables for secrets
- Validate all user input

## File Organization

```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.test.jsx
│   │   │   ├── Button.styles.js
│   │   │   └── index.js
│   ├── layout/
│   └── features/
├── hooks/
│   ├── useAuth.js
│   └── useApi.js
├── context/
├── utils/
├── services/
└── constants/
```

## Best Practices Summary

1. **Keep components small and focused** (< 200 lines)
2. **Use functional components** with hooks
3. **Propagate prop-types** for all components
4. **Handle loading and error states**
5. **Optimize re-renders** with memoization
6. **Write tests** for critical functionality
7. **Follow accessibility guidelines**
8. **Keep business logic separate** from UI

## Related Specifications
- [Performance Guidelines](reactjs-performance-guidelines.md)
- [Testing Guidelines](reactjs-testing-guidelines.md)
