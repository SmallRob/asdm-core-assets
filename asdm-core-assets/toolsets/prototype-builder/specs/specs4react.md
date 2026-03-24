# React Prototype Specifications

## Overview

This document specifies the requirements and standards for generating React-based prototypes.

## Tech Stack

| Component | Version | Notes |
|-----------|---------|-------|
| React | 18.x | Latest stable |
| Vite | 5.x | Build tool |
| Node.js | 18.x+ | Runtime |

## Coding Standards Reference

When generating React prototypes, the following coding standards from `asdm-core-assets/specs` MUST be followed:

- **[React.js Development Specs](.asdm/specs/reactjs/README.md)**: Primary coding standards for React development
  - [React Coding Standard](.asdm/specs/reactjs/reactjs-coding-standard.md): Component structure, naming conventions, hooks best practices
  - [Performance Guidelines](.asdm/specs/reactjs/reactjs-performance-guidelines.md): Optimization patterns
  - [Testing Guidelines](.asdm/specs/reactjs/reactjs-testing-guidelines.md): Testing strategies

- **[JavaScript General](.asdm/specs/javascript/javascript.md)**: JavaScript coding conventions
  - 2 spaces indentation
  - Semicolons required
  - Single quotes for strings
  - Strict equality (`===`/`!==`)
  - `const`/`let` only, no `var`

- **[TypeScript](.asdm/specs/typescript/typescript.md)**: TypeScript type system (if using TypeScript)

- **[CSS](.asdm/specs/css/css.md)**: Styling conventions

## Required Conventions

### Naming Conventions (from specs)

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Files | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase with `use` prefix | `useUserData.ts` |
| Utils | camelCase | `formatDate.ts` |
| Constants | UPPER_SNAKE_CASE | `MAX_COUNT` |
| CSS Modules | PascalCase | `UserProfile.module.css` |

### Code Style (from Alibaba F2E Spec)

- **Indentation**: 2 spaces (no tabs)
- **Line length**: Max 100 characters
- **Character encoding**: UTF-8
- **Semicolons**: Required
- **Commas**: Trailing commas in multi-line structures
- **Braces**: Egyptian Brackets style (opening brace on same line)

## UI Libraries

### Supported UI Libraries

| Library | Version | Use Case |
|---------|---------|----------|
| Ant Design | 5.x | Enterprise applications |
| Material-UI | 5.x | Material Design |
| Chakra UI | 2.x | Simple, accessible |

## Project Structure

```
project/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── ComponentName/
│   │       ├── index.jsx
│   │       └── styles.css
│   ├── pages/
│   │   └── PageName/
│   │       └── index.jsx
│   ├── hooks/
│   │   └── useHookName.js
│   ├── utils/
│   │   └── utilityName.js
│   ├── services/
│   │   └── apiService.js
│   ├── styles/
│   │   ├── variables.css
│   │   └── global.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── .eslintrc.cjs
└── README.md
```

## Component Standards

### Naming Conventions

- Components: PascalCase (e.g., `UserProfile.tsx`)
- Files: PascalCase with extension (e.g., `UserProfile.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useUserData.ts`)
- Utils: camelCase (e.g., `formatDate.ts`)
- Styles: Same name as component with `.css` extension

### Component Template

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  return (
    <div className="component-name">
      <h1>{prop1}</h1>
      <p>{prop2}</p>
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

ComponentName.defaultProps = {
  prop2: 0,
};

export default ComponentName;
```

## State Management

### Recommended Solutions

| Solution | Use Case |
|----------|----------|
| React Context | Simple global state |
| Zustand | Lightweight state management |
| Redux Toolkit | Complex state management |

### Zustand Store Template

```javascript
import { create } from 'zustand';

const useStore = create((set) => ({
  // State
  value: '',
  
  // Actions
  setValue: (value) => set({ value }),
}));

export default useStore;
```

## Routing

### React Router Setup

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};
```

## Form Handling

### Recommended Libraries

| Library | Features |
|---------|----------|
| React Hook Form | Performance, validation |
| Formik | Simple forms |

## API Integration

### Axios Configuration

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

## Styling

### CSS Modules

```css
/* ComponentName.module.css */
.container {
  padding: 16px;
}

.title {
  font-size: 24px;
  color: #333;
}
```

### Tailwind CSS (Optional)

- Use `@tailwindcss/forms` for form elements
- Use `@tailwindcss/typography` for text content

## Build Configuration

### Vite Config

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

## Code Quality

### ESLint Rules

- Enable `react/react-in-jsx-scope`: off
- Enable `react/prop-types`: on
- Enable `jsx-a11y/anchor-is-valid`: on

### Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

## Testing

### Testing Libraries

| Library | Purpose |
|---------|---------|
| Jest | Test runner |
| React Testing Library | Component testing |
| Cypress | E2E testing |

## Performance Optimization

### Best Practices

1. Use `React.memo` for expensive components
2. Implement code splitting with `React.lazy`
3. Use proper key props in lists
4. Avoid unnecessary re-renders
5. Optimize bundle size with dynamic imports

## Dependencies

### Default Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "vite": "^5.x"
  }
}
```

### UI Library Dependencies

**Ant Design:**
```json
{
  "antd": "^5.x",
  "@ant-design/icons": "^5.x"
}
```

**Material-UI:**
```json
{
  "@mui/material": "^5.x",
  "@emotion/react": "^11.x",
  "@emotion/styled": "^11.x"
}
```

## Development Workflow

1. Run `npm install` to install dependencies
2. Run `npm run dev` to start development server
3. Make changes in `src/` directory
4. Run `npm run build` to create production build

## Notes

- Always use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use TypeScript for better type safety (optional)
