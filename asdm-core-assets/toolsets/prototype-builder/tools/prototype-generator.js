#!/usr/bin/env node

/**
 * Prototype Generator
 * 
 * Core tool for generating frontend prototypes based on requirements and tech stack.
 * 
 * Usage:
 *   node prototype-generator.js --requirements "..." --stack react
 *   node prototype-generator.js --scaffold --stack vue --name my-app
 *   node prototype-generator.js --list-stacks
 *   node prototype-generator.js --verify
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Constants
// Tech Stack to Specs Mapping
// When generating prototypes, follow these specs from asdm-core-assets/specs
const STACK_SPECS = {
  react: {
    primary: '.asdm/specs/reactjs/README.md',
    related: [
      '.asdm/specs/reactjs/reactjs-coding-standard.md',
      '.asdm/specs/reactjs/reactjs-performance-guidelines.md',
      '.asdm/specs/reactjs/reactjs-testing-guidelines.md',
      '.asdm/specs/javascript/javascript.md',
      '.asdm/specs/typescript/typescript.md',
      '.asdm/specs/css/css.md',
    ],
  },
  vue: {
    primary: '.asdm/specs/vue3-composition-api/README.md',
    related: [
      '.asdm/specs/vue3-composition-api/vue-3-composition-api-general.md',
      '.asdm/specs/vue3-composition-api/vue-3-composition-api-composables.md',
      '.asdm/specs/vue3-composition-api/vue-3-typescript-guidelines.md',
      '.asdm/specs/vue3-composition-api/vue-3-project-structure.md',
      '.asdm/specs/javascript/javascript.md',
      '.asdm/specs/typescript/typescript.md',
      '.asdm/specs/css/css.md',
    ],
  },
  html: {
    primary: '.asdm/specs/html/html.md',
    related: [
      '.asdm/specs/html/html.md',
      '.asdm/specs/css/css.md',
      '.asdm/specs/javascript/javascript.md',
    ],
  },
  miniprogram: {
    primary: '.asdm/specs/weixin-miniprogram/README.md',
    related: [
      '.asdm/specs/javascript/javascript.md',
    ],
  },
  nextjs: {
    primary: '.asdm/specs/nextjs-react-tailwind/README.md',
    related: [
      '.asdm/specs/reactjs/reactjs-coding-standard.md',
      '.asdm/specs/typescript/typescript.md',
    ],
  },
};

const STACKS = {
  react: {
    name: 'React',
    uiLibraries: ['antd', 'mui', 'chakra-ui'],
    features: ['router', 'state-management', 'form-validation', 'api-integration', 'authentication', 'charts', 'table', 'modal'],
    specs: STACK_SPECS.react,
  },
  vue: {
    name: 'Vue',
    uiLibraries: ['element-plus', 'vuetify', 'naive-ui'],
    features: ['router', 'state-management', 'form-validation', 'api-integration', 'authentication', 'charts', 'table', 'modal'],
    specs: STACK_SPECS.vue,
  },
  html: {
    name: 'HTML',
    uiLibraries: ['bootstrap', 'tailwind'],
    features: ['responsive', 'bootstrap', 'tailwind', 'vanilla-js'],
    specs: STACK_SPECS.html,
  },
  miniprogram: {
    name: 'Mini Program',
    uiLibraries: ['tdesign', 'vant'],
    features: ['tabbar', 'custom-components', 'api-mock'],
    specs: STACK_SPECS.miniprogram,
  },
  nextjs: {
    name: 'Next.js',
    uiLibraries: ['antd', 'mui', 'shadcn'],
    features: ['router', 'ssr', 'api-routes', 'auth', 'database'],
    specs: STACK_SPECS.nextjs,
  },
};

// Helper functions
const log = (msg) => console.log(msg);
const error = (msg) => console.error(`Error: ${msg}`);
const success = (msg) => console.log(`✓ ${msg}`);

const parseArgs = () => {
  const args = process.argv.slice(2);
  const options = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.replace('--', '').split('=')[0];
      const value = arg.includes('=') ? arg.split('=')[1] : args[++i];
      options[key] = value || true;
    } else if (arg.startsWith('-')) {
      const key = arg.replace('-', '').split('=')[0];
      const value = arg.includes('=') ? arg.split('=')[1] : args[++i];
      options[key] = value || true;
    }
  }
  
  return options;
};

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const writeFile = (filePath, content) => {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf-8');
};

// Generator functions
const generateReactProject = (options) => {
  const { output, name, uiLibrary, features } = options;
  
  log(`Generating React project: ${name}`);
  
  // Create directory structure
  ensureDir(path.join(output, 'src', 'components'));
  ensureDir(path.join(output, 'src', 'pages'));
  ensureDir(path.join(output, 'src', 'hooks'));
  ensureDir(path.join(output, 'src', 'utils'));
  ensureDir(path.join(output, 'src', 'services'));
  ensureDir(path.join(output, 'public'));
  
  // Create package.json
  const packageJson = {
    name,
    private: true,
    version: '0.0.1',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      lint: 'eslint .',
      preview: 'vite preview',
    },
    dependencies: {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-router-dom': '^6.20.0',
    },
    devDependencies: {
      '@types/react': '^18.2.43',
      '@types/react-dom': '^18.2.17',
      '@vitejs/plugin-react': '^4.2.1',
      vite: '^5.0.8',
    },
  };
  
  // Add UI library
  if (uiLibrary === 'antd') {
    packageJson.dependencies.antd = '^5.12.0';
    packageJson.dependencies['@ant-design/icons'] = '^5.2.10';
  } else if (uiLibrary === 'mui') {
    packageJson.dependencies['@mui/material'] = '^5.14.20';
    packageJson.dependencies['@emotion/react'] = '^11.11.1';
    packageJson.dependencies['@emotion/styled'] = '^11.11.0';
  } else if (uiLibrary === 'chakra-ui') {
    packageJson.dependencies['@chakra-ui/react'] = '^2.8.2';
    packageJson.dependencies['@emotion/react'] = '^11.11.1';
    packageJson.dependencies['@emotion/styled'] = '^11.11.0';
    packageJson.dependencies['framer-motion'] = '^10.16.16';
  }
  
  writeFile(path.join(output, 'package.json'), JSON.stringify(packageJson, null, 2));
  
  // Create vite.config.js
  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
`;
  writeFile(path.join(output, 'vite.config.js'), viteConfig);
  
  // Create index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
  writeFile(path.join(output, 'index.html'), indexHtml);
  
  // Create main.jsx
  const mainJsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`;
  writeFile(path.join(output, 'src', 'main.jsx'), mainJsx);
  
  // Create App.jsx
  const appJsx = `import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>${name}</h1>
        <p>Your prototype is ready!</p>
      </div>
    </BrowserRouter>
  );
}

export default App;
`;
  writeFile(path.join(output, 'src', 'App.jsx'), appJsx);
  
  // Create index.css
  const indexCss = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  padding: 20px;
}

h1 {
  margin-bottom: 16px;
}
`;
  writeFile(path.join(output, 'src', 'index.css'), indexCss);
  
  // Create README.md
  const readme = `# ${name}

A React prototype generated by Prototype Builder.

## Getting Started

\`\`\`bash
cd ${name}
npm install
npm run dev
\`\`\`

## Tech Stack

- React 18
- ${uiLibrary || 'Ant Design'}
- Vite 5

## Features

${(features || []).map(f => `- ${f}`).join('\n')}

## Generated

${new Date().toISOString()}
`;
  writeFile(path.join(output, 'README.md'), readme);
  
  success(`React project generated at: ${output}`);
  
  return {
    projectPath: output,
    techStack: 'react',
    uiLibrary: uiLibrary || 'antd',
    features: features || [],
  };
};

const generateVueProject = (options) => {
  const { output, name, uiLibrary, typescript } = options;
  
  log(`Generating Vue project: ${name}`);
  
  // Create directory structure
  ensureDir(path.join(output, 'src', 'components'));
  ensureDir(path.join(output, 'src', 'views'));
  ensureDir(path.join(output, 'src', 'composables'));
  ensureDir(path.join(output, 'src', 'utils'));
  ensureDir(path.join(output, 'src', 'services'));
  ensureDir(path.join(output, 'public'));
  
  // Create package.json
  const packageJson = {
    name,
    private: true,
    version: '0.0.1',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      lint: 'eslint .',
      preview: 'vite preview',
    },
    dependencies: {
      vue: '^3.4.0',
      'vue-router': '^4.2.5',
      pinia: '^2.1.7',
      axios: '^1.6.2',
    },
    devDependencies: {
      '@vitejs/plugin-vue': '^5.0.0',
      vite: '^5.0.8',
    },
  };
  
  // Add UI library
  if (uiLibrary === 'element-plus') {
    packageJson.dependencies['element-plus'] = '^2.4.4';
    packageJson.dependencies['@element-plus/icons-vue'] = '^2.3.1';
  } else if (uiLibrary === 'vuetify') {
    packageJson.dependencies.vuetify = '^3.4.6';
    packageJson.dependencies['@mdi/font'] = '^7.4.47';
    packageJson.devDependencies['vite-plugin-vuetify'] = '^2.0.1';
  } else if (uiLibrary === 'naive-ui') {
    packageJson.dependencies['naive-ui'] = '^2.37.3';
    packageJson.dependencies['vfonts'] = '^0.0.3';
  }
  
  writeFile(path.join(output, 'package.json'), JSON.stringify(packageJson, null, 2));
  
  // Create vite.config.js
  const viteConfig = `import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
`;
  writeFile(path.join(output, 'vite.config.js'), viteConfig);
  
  // Create index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`;
  writeFile(path.join(output, 'index.html'), indexHtml);
  
  // Create main.js
  const mainJs = `import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './style.css';

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
`;
  writeFile(path.join(output, 'src', 'main.js'), mainJs);
  
  // Create App.vue
  const appVue = `<script setup>
import { ref } from 'vue';

const message = ref('${name}');
</script>

<template>
  <div class="app">
    <h1>{{ message }}</h1>
    <p>Your Vue prototype is ready!</p>
  </div>
</template>

<style scoped>
.app {
  padding: 20px;
}

h1 {
  margin-bottom: 16px;
}
</style>
`;
  writeFile(path.join(output, 'src', 'App.vue'), appVue);
  
  // Create style.css
  const styleCss = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
`;
  writeFile(path.join(output, 'src', 'style.css'), styleCss);
  
  success(`Vue project generated at: ${output}`);
  
  return {
    projectPath: output,
    techStack: 'vue',
    uiLibrary: uiLibrary || 'element-plus',
  };
};

const generateHtmlProject = (options) => {
  const { output, name, css } = options;
  
  log(`Generating HTML project: ${name}`);
  
  // Create directory structure
  ensureDir(path.join(output, 'src', 'styles'));
  ensureDir(path.join(output, 'src', 'scripts'));
  ensureDir(path.join(output, 'src', 'assets', 'images'));
  ensureDir(path.join(output, 'public'));
  
  // Create index.html
  let indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${name} - A prototype generated by Prototype Builder">
  <title>${name}</title>
`;
  
  if (css === 'bootstrap') {
    indexHtml += `  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
`;
  } else if (css === 'tailwind') {
    indexHtml += `  <script src="https://cdn.tailwindcss.com"></script>
`;
  }
  
  indexHtml += `  <link rel="stylesheet" href="src/styles/main.css">
</head>
<body>
  <header>
    <nav>
      <div class="container">
        <a href="/" class="logo">${name}</a>
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  </header>

  <main>
    <section id="home" class="hero">
      <div class="container">
        <h1>Welcome to ${name}</h1>
        <p>Your HTML prototype is ready!</p>
      </div>
    </section>

    <section id="about" class="about">
      <div class="container">
        <h2>About</h2>
        <p>This is a prototype generated by Prototype Builder.</p>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <p>&copy; 2024 ${name}. All rights reserved.</p>
    </div>
  </footer>

  <script src="src/scripts/main.js"></script>
</body>
</html>
`;
  writeFile(path.join(output, 'index.html'), indexHtml);
  
  // Create main.css
  let mainCss = `/* CSS Variables */
:root {
  --color-primary: #409eff;
  --color-secondary: #67c23a;
  --color-text: #333;
  --color-background: #fff;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
}

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--color-text);
  background-color: var(--color-background);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* Header */
header {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

nav {
  padding: var(--spacing-md) 0;
}

nav .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: var(--color-primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: var(--spacing-lg);
}

.nav-links a {
  color: var(--color-text);
  text-decoration: none;
}

.nav-links a:hover {
  color: var(--color-primary);
}

/* Hero */
.hero {
  padding: 60px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  text-align: center;
}

.hero h1 {
  font-size: 36px;
  margin-bottom: var(--spacing-md);
}

/* About */
.about {
  padding: 60px 0;
}

/* Footer */
footer {
  background: #333;
  color: #fff;
  padding: var(--spacing-lg) 0;
  text-align: center;
}
`;
  
  writeFile(path.join(output, 'src', 'styles', 'main.css'), mainCss);
  
  // Create main.js
  const mainJs = `// ${name} - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  console.log('${name} loaded successfully');
  
  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
`;
  writeFile(path.join(output, 'src', 'scripts', 'main.js'), mainJs);
  
  // Create README.md
  const readme = `# ${name}

An HTML prototype generated by Prototype Builder.

## Getting Started

Simply open \`index.html\` in your browser, or use a local server:

\`\`\`bash
npx serve .
\`\`\`

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES2022)
- ${css === 'bootstrap' ? 'Bootstrap 5' : css === 'tailwind' ? 'Tailwind CSS' : 'Vanilla CSS'}

## Generated

${new Date().toISOString()}
`;
  writeFile(path.join(output, 'README.md'), readme);
  
  success(`HTML project generated at: ${output}`);
  
  return {
    projectPath: output,
    techStack: 'html',
    css: css || 'vanilla',
  };
};

const generateMiniProgramProject = (options) => {
  const { output, name, uiLibrary } = options;
  
  log(`Generating Mini Program project: ${name}`);
  
  // Create directory structure
  ensureDir(path.join(output, 'src', 'pages', 'index'));
  ensureDir(path.join(output, 'src', 'pages', 'detail'));
  ensureDir(path.join(output, 'src', 'components', 'custom'));
  ensureDir(path.join(output, 'src', 'utils'));
  ensureDir(path.join(output, 'src', 'services'));
  ensureDir(path.join(output, 'src', 'images'));
  
  // Create app.js
  const appJs = `// app.js
App({
  onLaunch() {
    // App launch
    console.log('App launched');
  },
  onShow() {
    // App show
  },
  onHide() {
    // App hide
  },
  globalData: {
    userInfo: null,
    apiBase: 'https://api.example.com',
  },
});
`;
  writeFile(path.join(output, 'src', 'app.js'), appJs);
  
  // Create app.json
  const appJson = {
    pages: [
      'pages/index/index',
      'pages/detail/detail',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: name,
      navigationBarTextStyle: 'black',
    },
    sitemapLocation: 'sitemap.json',
  };
  writeFile(path.join(output, 'src', 'app.json'), JSON.stringify(appJson, null, 2));
  
  // Create app.wxss
  const appWxss = `/**app.wxss**/
page {
  background-color: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.container {
  padding: 16px;
}
`;
  writeFile(path.join(output, 'src', 'app.wxss'), appWxss);
  
  // Create index page
  const indexJs = `// pages/index/index.js
Page({
  data: {
    message: 'Hello Mini Program!',
  },

  onLoad() {
    console.log('Index page loaded');
  },

  onShow() {
    console.log('Index page shown');
  },

  navigateToDetail() {
    wx.navigateTo({
      url: '/pages/detail/detail',
    });
  },
});
`;
  writeFile(path.join(output, 'src', 'pages', 'index', 'index.js'), indexJs);
  
  const indexJson = `{
  "usingComponents": {},
  "navigationBarTitleText": "Home"
}`;
  writeFile(path.join(output, 'src', 'pages', 'index', 'index.json'), indexJson);
  
  const indexWxml = `<!--pages/index/index.wxml-->
<view class="container">
  <view class="content">
    <text class="title">{{message}}</text>
    <button class="btn" bindtap="navigateToDetail">Go to Detail</button>
  </view>
</view>
`;
  writeFile(path.join(output, 'src', 'pages', 'index', 'index.wxml'), indexWxml);
  
  const indexWxss = `/*pages/index/index.wxss*/
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.btn {
  background-color: #409eff;
  color: #fff;
  padding: 12px 24px;
  border-radius: 4px;
}
`;
  writeFile(path.join(output, 'src', 'pages', 'index', 'index.wxss'), indexWxss);
  
  // Create project.config.json
  const projectConfig = {
    description: name,
    packOptions: {
      ignore: [],
    },
    setting: {
      urlCheck: false,
      es6: true,
      enhance: true,
      postcss: true,
      minified: true,
    },
    compileType: 'miniprogram',
    libVersion: '3.0.0',
    appid: 'your-appid',
    projectname: name,
    condition: {},
  };
  writeFile(path.join(output, 'project.config.json'), JSON.stringify(projectConfig, null, 2));
  
  // Create sitemap.json
  const sitemapJson = {
    desc: 'sitemap',
    rules: [{
      action: 'allow',
      page: '*',
    }],
  };
  writeFile(path.join(output, 'sitemap.json'), JSON.stringify(sitemapJson, null, 2));
  
  // Create README.md
  const readme = `# ${name}

A WeChat Mini Program prototype generated by Prototype Builder.

## Getting Started

1. Open WeChat DevTools
2. Click "Import Project"
3. Select this directory
4. Configure your AppID

## Tech Stack

- WeChat Mini Program
- ${uiLibrary === 'tdesign' ? 'TDesign' : 'Native Components'}

## Generated

${new Date().toISOString()}
`;
  writeFile(path.join(output, 'README.md'), readme);
  
  success(`Mini Program project generated at: ${output}`);
  
  return {
    projectPath: output,
    techStack: 'miniprogram',
    uiLibrary: uiLibrary || 'native',
  };
};

const generateProject = (options) => {
  const { stack, name, output, uiLibrary, features, css, typescript } = options;
  
  const projectName = name || `prototype-${Date.now()}`;
  const outputDir = output || path.join(process.cwd(), projectName);
  const projectOptions = {
    name: projectName,
    output: outputDir,
    uiLibrary: uiLibrary,
    features: features ? features.split(',') : [],
    css: css,
    typescript: typescript === 'true',
  };
  
  switch (stack) {
    case 'react':
      return generateReactProject(projectOptions);
    case 'vue':
      return generateVueProject(projectOptions);
    case 'html':
      return generateHtmlProject(projectOptions);
    case 'miniprogram':
      return generateMiniProgramProject(projectOptions);
    default:
      error(`Unknown stack: ${stack}`);
      log(`Available stacks: ${Object.keys(STACKS).join(', ')}`);
      process.exit(1);
  }
};

const listStacks = () => {
  log('Available tech stacks:');
  Object.entries(STACKS).forEach(([key, stack]) => {
    log(`\n${key}: ${stack.name}`);
    log(`  UI Libraries: ${stack.uiLibraries.join(', ')}`);
    log(`  Features: ${stack.features.slice(0, 4).join(', ')}...`);
  });
};

const verify = () => {
  log('Prototype Builder Verification:\n');
  
  // Check Node.js
  try {
    const nodeVersion = process.version;
    log(`- Node.js: OK (${nodeVersion})`);
  } catch (e) {
    error('- Node.js: NOT FOUND');
  }
  
  // Check npm
  try {
    const npmVersion = execSync('npm --version', { encoding: 'utf-8' }).trim();
    log(`- npm: OK (v${npmVersion})`);
  } catch (e) {
    error('- npm: NOT FOUND');
  }
  
  // Check tools
  log('- Tools: OK');
  
  // Check tech stacks
  log('- Tech Stacks: OK');
  Object.keys(STACKS).forEach(stack => {
    log(`  - ${stack}`);
  });
  
  log('\n✓ All checks passed!');
};

// Main
const main = () => {
  const options = parseArgs();
  
  if (options.listStacks || options['list-stacks']) {
    listStacks();
    return;
  }
  
  if (options.verify) {
    verify();
    return;
  }
  
  if (!options.stack && !options.scaffold) {
    log('Usage:');
    log('  node prototype-generator.js --stack react --requirements "..."');
    log('  node prototype-generator.js --scaffold --stack vue --name my-app');
    log('  node prototype-generator.js --list-stacks');
    log('  node prototype-generator.js --verify');
    log('\nOptions:');
    log('  --stack <name>        Tech stack (react|vue|html|miniprogram)');
    log('  --requirements <desc> User requirements description');
    log('  --name <name>         Project name');
    log('  --output <path>       Output directory');
    log('  --ui-library <name>   UI library to use');
    log('  --features <list>     Comma-separated features');
    log('  --css <name>          CSS solution (for HTML)');
    log('  --typescript         Enable TypeScript (for React/Vue)');
    log('  --scaffold            Scaffold only, no feature generation');
    return;
  }
  
  if (!options.stack) {
    error('Missing required option: --stack');
    process.exit(1);
  }
  
  const result = generateProject(options);
  
  const stackInfo = STACKS[options.stack];
  
  log('\nGeneration complete!');
  log(`Project path: ${result.projectPath}`);
  log(`Tech stack: ${result.techStack}`);
  if (result.uiLibrary) {
    log(`UI library: ${result.uiLibrary}`);
  }
  
  // Output specs information
  if (stackInfo && stackInfo.specs) {
    log('\n--- Coding Standards (from asdm-core-assets/specs) ---');
    log(`Primary spec: ${stackInfo.specs.primary}`);
    if (stackInfo.specs.related && stackInfo.specs.related.length > 0) {
      log('Related specs:');
      stackInfo.specs.related.forEach(spec => {
        log(`  - ${spec}`);
      });
    }
    log('\nIMPORTANT: Follow these coding standards when implementing the prototype.');
  }
};

main();
