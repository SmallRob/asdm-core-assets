# React.js Performance Guidelines

## Overview
This document provides guidelines for optimizing React.js application performance.

## Key Metrics

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Custom Metrics
- Time to Interactive (TTI)
- Total Blocking Time (TBT)
- First Contentful Paint (FCP)

## Optimization Techniques

### 1. Component Optimization

#### React.memo
```jsx
// Prevent unnecessary re-renders
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* complex rendering */}</div>;
});

// With custom comparison
const MemoizedComponent = React.memo(
  MyComponent,
  (prevProps, nextProps) => {
    return prevProps.id === nextProps.id;
  }
);
```

#### useMemo
```jsx
// Memoize expensive calculations
const filteredData = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);

// Memoize complex transformations
const chartData = useMemo(() => {
  return transformDataForChart(rawData);
}, [rawData]);
```

#### useCallback
```jsx
// Memoize callback functions
const handleSubmit = useCallback((data) => {
  submitForm(data);
}, [dependency]);

// Pass to child components
<Form onSubmit={handleSubmit} />
```

### 2. List Optimization

#### Virtualization
```jsx
import { FixedSizeList } from 'react-window';

const VirtualizedList = ({ items }) => (
  <FixedSizeList
    height={600}
    itemCount={items.length}
    itemSize={35}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>{items[index].name}</div>
    )}
  </FixedSizeList>
);
```

#### Keys
```jsx
// ✅ Good: Stable, unique keys
{items.map(item => (
  <Item key={item.id} {...item} />
))}

// ❌ Bad: Using index as key
{items.map((item, index) => (
  <Item key={index} {...item} />
))}
```

### 3. Bundle Optimization

#### Code Splitting
```jsx
// Route-based splitting
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

// Component-based splitting
const HeavyChart = lazy(() => import('./HeavyChart'));
```

#### Tree Shaking
```jsx
// ✅ Good: Named imports
import { Button, Modal } from 'ui-library';

// ❌ Bad: Default import of entire library
import UI from 'ui-library';
```

### 4. State Management Optimization

#### Local vs Global State
```jsx
// Local state for component-specific data
const [isOpen, setIsOpen] = useState(false);

// Global state for shared data
const userData = useSelector(state => state.user);
```

#### Selector Optimization
```jsx
// ✅ Good: Memoized selectors
import { createSelector } from 'reselect';

const selectUserItems = createSelector(
  state => state.users,
  state => state.items,
  (users, items) => users.map(u => items[u.id])
);

// ❌ Bad: Inline selector (recreates every render)
const items = useSelector(state => state.users.map(u => state.items[u.id]));
```

### 5. Rendering Optimization

#### Avoid Re-renders
```jsx
// ❌ Bad: Inline object/function creation
<Child style={{ margin: 10 }} onClick={() => doSomething()} />

// ✅ Good: Stable references
const style = { margin: 10 };
const handleClick = useCallback(() => doSomething(), []);

<Child style={style} onClick={handleClick} />
```

#### Conditional Rendering
```jsx
// ✅ Good: Early return
const MyComponent = ({ data }) => {
  if (!data) return <Loading />;
  
  return <Content data={data} />;
};
```

### 6. Image Optimization

#### Lazy Loading
```jsx
<img
  src="image.jpg"
  alt="Description"
  loading="lazy"
  decoding="async"
/>
```

#### Responsive Images
```jsx
<img
  srcSet="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 600px) 480px, 800px"
  src="medium.jpg"
  alt="Description"
/>
```

### 7. Network Optimization

#### Data Fetching
```jsx
// Parallel fetching
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);

// Debounced search
import { useDebouncedCallback } from 'use-debounce';

const handleSearch = useDebouncedCallback(
  (query) => searchAPI(query),
  300
);
```

#### Caching
```jsx
// Using React Query
const { data } = useQuery(['user', userId], fetchUser, {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});
```

## Performance Profiling

### React DevTools Profiler
```jsx
// Wrap components to profile
<React.Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</React.Profiler>

// Callback
const onRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  console.log(`${id} ${phase} took ${actualDuration}ms`);
};
```

### Performance Monitoring
```jsx
// Report Web Vitals
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

## Checklist

### Before Production
- [ ] Code splitting implemented
- [ ] Images optimized
- [ ] Unnecessary re-renders eliminated
- [ ] Bundle size analyzed
- [ ] Performance budgets set
- [ ] Core Web Vitals measured

### Regular Review
- [ ] Profiler runs without issues
- [ ] No memory leaks detected
- [ ] Load time within budget
- [ ] Interaction latency acceptable

## Tools

### Analysis Tools
- React DevTools Profiler
- Chrome DevTools Performance
- Lighthouse
- Webpack Bundle Analyzer
- Source Map Explorer

### Monitoring Tools
- Google Analytics
- Sentry Performance
- DataDog RUM
- New Relic Browser

## Related Specifications
- [Coding Standards](reactjs-coding-standard.md)
- [Testing Guidelines](reactjs-testing-guidelines.md)
