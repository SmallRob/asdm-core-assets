# Vue Prototype Specifications

## Overview

This document specifies the requirements and standards for generating Vue.js-based prototypes.

## Tech Stack

| Component | Version | Notes |
|-----------|---------|-------|
| Vue | 3.x | Composition API |
| Vite | 5.x | Build tool |
| Node.js | 18.x+ | Runtime |

## Coding Standards Reference

When generating Vue prototypes, the following coding standards from `asdm-core-assets/specs` MUST be followed:

- **[Vue 3 Composition API Specs](.asdm/specs/vue3-composition-api/README.md)**: Primary coding standards for Vue 3
  - [General Guidelines](.asdm/specs/vue3-composition-api/vue-3-composition-api-general.md): Core Composition API patterns
  - [Composables](.asdm/specs/vue3-composition-api/vue-3-composition-api-composables.md): Reusable logic patterns
  - [TypeScript Guidelines](.asdm/specs/vue3-composition-api/vue-3-typescript-guidelines.md): Type safety requirements
  - [Project Structure](.asdm/specs/vue3-composition-api/vue-3-project-structure.md): Folder organization
  - [Accessibility Guidelines](.asdm/specs/vue3-composition-api/accessibility-guidelines.md): WCAG compliance
  - [Performance Optimization](.asdm/specs/vue3-composition-api/performance-optimization.md): Performance best practices

- **[TypeScript Vite Vue Tailwind DaisyUI](.asdm/specs/typescript-vite-vue-tailwind-daisyui/README.md)**: For projects using Tailwind CSS

- **[JavaScript General](.asdm/specs/javascript/javascript.md)**: JavaScript coding conventions

- **[TypeScript](.asdm/specs/typescript/typescript.md)**: TypeScript type system

- **[CSS](.asdm/specs/css/css.md)**: Styling conventions

## Required Conventions

### Naming Conventions (from specs)

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.vue` |
| Composables | camelCase with `use` prefix | `useUserData.ts` |
| Utils | camelCase | `formatDate.ts` |
| Stores (Pinia) | camelCase | `userStore.ts` |
| Constants | UPPER_SNAKE_CASE | `MAX_COUNT` |

### Code Style (from Alibaba F2E Spec)

- **Indentation**: 2 spaces (no tabs)
- **Line length**: Max 100 characters
- **Character encoding**: UTF-8
- **Script setup**: Use `<script setup>` syntax
- **Template**: Use concise single-file component structure

## UI Libraries

### Supported UI Libraries

| Library | Version | Use Case |
|---------|---------|----------|
| Element Plus | 2.x | Enterprise applications |
| Vuetify | 3.x | Material Design |
| Naive UI | 2.x | Lightweight, TypeScript |

## Project Structure

```
project/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── variables.scss
│   │       └── main.scss
│   ├── components/
│   │   └── ComponentName.vue
│   ├── views/
│   │   └── ViewName.vue
│   ├── composables/
│   │   └── useComposable.ts
│   ├── utils/
│   │   └── utilityName.ts
│   ├── services/
│   │   └── apiService.ts
│   ├── router/
│   │   └── index.ts
│   ├── stores/
│   │   └── storeName.ts
│   ├── App.vue
│   └── main.ts
├── index.html
├── package.json
├── vite.config.ts
├── .eslintrc.cjs
└── README.md
```

## Component Standards

### Naming Conventions

- Components: PascalCase (e.g., `UserProfile.vue`)
- Single File Components: `.vue` extension
- Composables: camelCase with `use` prefix (e.g., `useUserData.ts`)
- Utils: camelCase (e.g., `formatDate.ts`)
- Stores: camelCase (e.g., `userStore.ts`)

### Component Template (Composition API)

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { PropType } from 'vue';

// Props
interface Props {
  title?: string;
  data: string[];
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Default Title',
});

// Emits
const emit = defineEmits<{
  (e: 'update', value: string): void;
  (e: 'delete', id: number): void;
}>();

// Reactive state
const isLoading = ref(false);
const searchQuery = ref('');

// Computed
const filteredData = computed(() => {
  return props.data.filter(item => 
    item.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Methods
const handleClick = (id: number) => {
  emit('delete', id);
};

// Lifecycle
onMounted(() => {
  console.log('Component mounted');
});
</script>

<template>
  <div class="component-name">
    <h1>{{ title }}</h1>
    <input v-model="searchQuery" placeholder="Search..." />
    <ul>
      <li v-for="item in filteredData" :key="item">
        {{ item }}
        <button @click="handleClick(item.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.component-name {
  padding: 16px;
}

h1 {
  font-size: 24px;
  color: #333;
}
</style>
```

## State Management

### Pinia Store Template

```typescript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null);
  const isLoading = ref(false);

  // Getters
  const isLoggedIn = computed(() => user.value !== null);
  const userName = computed(() => user.value?.name ?? '');

  // Actions
  const fetchUser = async (id: number) => {
    isLoading.value = true;
    try {
      const response = await fetch(`/api/users/${id}`);
      user.value = await response.json();
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
  };

  return {
    user,
    isLoading,
    isLoggedIn,
    userName,
    fetchUser,
    logout,
  };
});
```

## Routing

### Vue Router Setup

```typescript
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
```

## Form Handling

### Recommended Solutions

| Library | Features |
|---------|----------|
| VeeValidate | Validation, form handling |
| @formkit/vue | Modern forms |

### Simple Form Example

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';

const form = ref({
  email: '',
  password: '',
});

const rules = {
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Invalid email', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
  ],
};

const handleSubmit = () => {
  console.log('Form submitted:', form.value);
};
</script>

<template>
  <el-form :model="form" :rules="rules" label-width="120px">
    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="form.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">Submit</el-button>
    </el-form-item>
  </el-form>
</template>
```

## API Integration

### Axios Configuration

```typescript
import axios from 'axios';
import type { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## Styling

### SCSS Setup

```scss
// variables.scss
$primary-color: #409eff;
$text-color: #333;
$border-color: #dcdfe6;

// main.scss
@import './variables.scss';

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: $text-color;
}
```

### CSS Modules

```vue
<style module>
.container {
  padding: 16px;
}

.title {
  font-size: 24px;
}
</style>
```

## Build Configuration

### Vite Config

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
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

## TypeScript

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Code Quality

### ESLint Configuration

```javascript
module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
};
```

## Dependencies

### Default Dependencies

```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.x",
    "pinia": "^2.x",
    "axios": "^1.x"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.x",
    "vite": "^5.x",
    "typescript": "^5.x",
    "vue-tsc": "^1.x"
  }
}
```

### UI Library Dependencies

**Element Plus:**
```json
{
  "element-plus": "^2.x",
  "@element-plus/icons-vue": "^2.x"
}
```

**Vuetify:**
```json
{
  "vuetify": "^3.x",
  "@mdi/font": "^7.x"
}
```

## Development Workflow

1. Run `npm install` to install dependencies
2. Run `npm run dev` to start development server
3. Make changes in `src/` directory
4. Run `npm run build` to create production build
5. Run `npm run preview` to preview production build

## Notes

- Use Composition API with `<script setup>` syntax
- Keep components small and focused
- Extract reusable logic into composables
- Use TypeScript for better type safety
- Follow Vue 3 best practices for performance
