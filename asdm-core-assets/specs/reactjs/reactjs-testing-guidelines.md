# React.js Testing Guidelines

## Overview
This document provides comprehensive guidelines for testing React.js applications.

## Testing Philosophy

### Testing Trophy
1. **Static Tests** (ESLint, TypeScript): Catch syntax and type errors
2. **Unit Tests**: Test individual components/functions
3. **Integration Tests**: Test component interactions
4. **E2E Tests**: Test complete user flows

### Testing Principles
- Test behavior, not implementation
- Write tests that are easy to understand
- Focus on user interactions
- Keep tests fast and reliable

## Testing Tools

### Core Libraries
- **Jest**: Test runner and assertions
- **React Testing Library**: Component testing
- **Cypress/Playwright**: E2E testing

### Additional Tools
- **MSW** (Mock Service Worker): API mocking
- **Jest DOM**: Custom DOM assertions
- **User Event**: User interaction simulation

## Component Testing

### Basic Test Structure
```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('handles click event', async () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Query Priority
1. **getByRole**: Most accessible queries
2. **getByLabelText**: Form elements
3. **getByPlaceholderText**: Input fields
4. **getByText**: Text content
5. **getByTestId**: Last resort

### Testing Props
```jsx
test('displays user name from props', () => {
  render(<UserCard name="John Doe" />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

### Testing State
```jsx
test('toggles visibility on click', async () => {
  render(<ToggleComponent />);
  
  const button = screen.getByRole('button');
  expect(screen.queryByText('Content')).not.toBeInTheDocument();
  
  await userEvent.click(button);
  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

### Testing Async Behavior
```jsx
test('displays data after loading', async () => {
  render(<DataFetcher />);
  
  // Loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for data
  await screen.findByText('Data loaded');
  expect(screen.getByText('Data content')).toBeInTheDocument();
});
```

## Hook Testing

### Custom Hook Testing
```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter(0));
  
  expect(result.current.count).toBe(0);
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

### Testing useEffect
```jsx
test('fetches data on mount', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useDataFetcher());
  
  expect(result.current.loading).toBe(true);
  
  await waitForNextUpdate();
  
  expect(result.current.loading).toBe(false);
  expect(result.current.data).toBeDefined();
});
```

## Integration Testing

### Testing Component Interaction
```jsx
test('form submission flow', async () => {
  const mockSubmit = jest.fn();
  render(<ContactForm onSubmit={mockSubmit} />);
  
  await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
  await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(mockSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com'
  });
});
```

### Testing Context
```jsx
test('theme context works correctly', () => {
  const { rerender } = render(
    <ThemeProvider initialTheme="light">
      <ThemeDisplay />
    </ThemeProvider>
  );
  
  expect(screen.getByText('Current theme: light')).toBeInTheDocument();
  
  rerender(
    <ThemeProvider initialTheme="dark">
      <ThemeDisplay />
    </ThemeProvider>
  );
  
  expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
});
```

## API Mocking

### Using MSW
```jsx
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: 'John' }]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays users from API', async () => {
  render(<UserList />);
  await screen.findByText('John');
});
```

### Using Jest Mock
```jsx
jest.mock('../api/users', () => ({
  fetchUsers: jest.fn(() => Promise.resolve([{ id: 1, name: 'John' }]))
}));
```

## Snapshot Testing

### Component Snapshots
```jsx
import renderer from 'react-test-renderer';

test('matches snapshot', () => {
  const tree = renderer.create(<Button>Click me</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
```

### Best Practices
- Don't overuse snapshots
- Review snapshot diffs carefully
- Use for stable components
- Combine with other tests

## E2E Testing

### Cypress Example
```jsx
describe('Login flow', () => {
  it('logs in successfully', () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type('user@example.com');
    cy.get('[data-testid="password"]').type('password123');
    cy.get('[data-testid="submit"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome').should('be.visible');
  });
});
```

### Playwright Example
```jsx
test('user can log in', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', 'user@example.com');
  await page.fill('[data-testid="password"]', 'password123');
  await page.click('[data-testid="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('text=Welcome')).toBeVisible();
});
```

## Test Organization

### Directory Structure
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.test.jsx
│   │   └── index.js
├── __tests__/
│   ├── integration/
│   └── e2e/
```

### Naming Conventions
- Test files: `[Component].test.jsx`
- Test descriptions: Clear and specific
- Use `describe` for grouping related tests

## Coverage Guidelines

### Coverage Targets
- **Statements**: 70-80%
- **Branches**: 70-80%
- **Functions**: 70-80%
- **Lines**: 70-80%

### Focus Areas
1. Critical business logic
2. Complex algorithms
3. Error handling
4. User interactions

## Best Practices

### DO
✅ Test user interactions
✅ Use accessible queries
✅ Mock external dependencies
✅ Keep tests isolated
✅ Write clear descriptions

### DON'T
❌ Test implementation details
❌ Use setTimeout without cleanup
❌ Share state between tests
❌ Test third-party libraries
❌ Over-mock dependencies

## Debugging Tests

### Debug Output
```jsx
import { screen } from '@testing-library/react';

// Print DOM
screen.debug();

// Print specific element
screen.debug(screen.getByText('Submit'));
```

### Debug in VS Code
```json
// launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"]
}
```

## Related Specifications
- [Coding Standards](reactjs-coding-standard.md)
- [Performance Guidelines](reactjs-performance-guidelines.md)
