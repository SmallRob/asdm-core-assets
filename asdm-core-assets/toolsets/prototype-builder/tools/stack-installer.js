#!/usr/bin/env node

/**
 * Stack Installer
 * 
 * Installs required dependencies for different tech stacks.
 * 
 * Usage:
 *   node stack-installer.js --stack react
 *   node stack-installer.js --stack react --ui-library antd
 *   node stack-installer.js --install-all
 *   node stack-installer.js --check
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

// Constants
const UI_LIBRARIES = {
  react: {
    antd: {
      name: 'Ant Design',
      packages: ['antd', '@ant-design/icons'],
    },
    mui: {
      name: 'Material-UI',
      packages: ['@mui/material', '@emotion/react', '@emotion/styled'],
    },
    'chakra-ui': {
      name: 'Chakra UI',
      packages: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
    },
  },
  vue: {
    'element-plus': {
      name: 'Element Plus',
      packages: ['element-plus', '@element-plus/icons-vue'],
    },
    vuetify: {
      name: 'Vuetify',
      packages: ['vuetify', '@mdi/font'],
    },
    'naive-ui': {
      name: 'Naive UI',
      packages: ['naive-ui', 'vfonts'],
    },
  },
  html: {
    bootstrap: {
      name: 'Bootstrap',
      cdn: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    },
    tailwind: {
      name: 'Tailwind CSS',
      cdn: 'https://cdn.tailwindcss.com',
    },
  },
  miniprogram: {
    tdesign: {
      name: 'TDesign',
      packages: ['tdesign-weapp'],
    },
    vant: {
      name: 'Vant Weapp',
      packages: ['vant-weapp'],
    },
  },
};

const STACKS = {
  react: {
    name: 'React',
    packages: ['react', 'react-dom', 'react-router-dom'],
    devPackages: ['vite', '@vitejs/plugin-react'],
  },
  vue: {
      packages: ['vue', 'vue-router', 'pinia', 'axios'],
    devPackages: ['vite', '@vitejs/plugin-vue'],
  },
  html: {
    name: 'HTML',
    packages: [],
    devPackages: [],
  },
  miniprogram: {
    name: 'Mini Program',
    packages: [],
    devPackages: [],
  },
};

// Helper functions
const log = (msg) => console.log(msg);
const error = (msg) => console.error(`Error: ${msg}`);
const success = (msg) => console.log(`✓ ${msg}`);
const warn = (msg) => console.warn(`Warning: ${msg}`);

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

const runCommand = (command, cwd) => {
  try {
    execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (e) {
    error(`Command failed: ${command}`);
    return false;
  }
};

const checkPackageManager = () => {
  const packageManagers = ['npm', 'yarn', 'pnpm'];
  
  for (const pm of packageManagers) {
    try {
      execSync(`${pm} --version`, { stdio: 'ignore' });
      return pm;
    } catch (e) {
      continue;
    }
  }
  
  return null;
};

const getInstallCommand = (pm) => {
  switch (pm) {
    case 'yarn':
      return 'yarn install';
    case 'pnpm':
      return 'pnpm install';
    default:
      return 'npm install';
  }
};

const getAddCommand = (pm, isDev = false) => {
  switch (pm) {
    case 'yarn':
      return isDev ? 'yarn add -D' : 'yarn add';
    case 'pnpm':
      return isDev ? 'pnpm add -D' : 'pnpm add';
    default:
      return isDev ? 'npm install -D' : 'npm install';
  }
};

// Install functions
const installReactStack = (options) => {
  const { uiLibrary, path: projectPath, packageManager } = options;
  
  log('Installing React stack...');
  
  const pm = packageManager || checkPackageManager();
  if (!pm) {
    error('No package manager found. Please install npm, yarn, or pnpm.');
    return false;
  }
  
  const installCmd = getInstallCommand(pm);
  
  // Install base packages
  if (projectPath && fs.existsSync(path.join(projectPath, 'package.json'))) {
    log(`Installing dependencies in ${projectPath}...`);
    runCommand(installCmd, projectPath);
  } else {
    warn('No package.json found. Run prototype-generator first.');
  }
  
  // Install UI library
  if (uiLibrary && UI_LIBRARIES.react[uiLibrary]) {
    const lib = UI_LIBRARIES.react[uiLibrary];
    log(`Installing UI library: ${lib.name}...`);
    
    if (projectPath && fs.existsSync(path.join(projectPath, 'package.json'))) {
      const addCmd = getAddCommand(pm);
      const packages = lib.packages.join(' ');
      runCommand(`${addCmd} ${packages}`, projectPath);
    }
  }
  
  success('React stack installed successfully!');
  return true;
};

const installVueStack = (options) => {
  const { uiLibrary, path: projectPath, packageManager } = options;
  
  log('Installing Vue stack...');
  
  const pm = packageManager || checkPackageManager();
  if (!pm) {
    error('No package manager found. Please install npm, yarn, or pnpm.');
    return false;
  }
  
  const installCmd = getInstallCommand(pm);
  
  // Install base packages
  if (projectPath && fs.existsSync(path.join(projectPath, 'package.json'))) {
    log(`Installing dependencies in ${projectPath}...`);
    runCommand(installCmd, projectPath);
  } else {
    warn('No package.json found. Run prototype-generator first.');
  }
  
  // Install UI library
  if (uiLibrary && UI_LIBRARIES.vue[uiLibrary]) {
    const lib = UI_LIBRARIES.vue[uiLibrary];
    log(`Installing UI library: ${lib.name}...`);
    
    if (projectPath && fs.existsSync(path.join(projectPath, 'package.json'))) {
      const addCmd = getAddCommand(pm);
      const packages = lib.packages.join(' ');
      runCommand(`${addCmd} ${packages}`, projectPath);
    }
  }
  
  success('Vue stack installed successfully!');
  return true;
};

const installHtmlStack = (options) => {
  const { uiLibrary } = options;
  
  log('Installing HTML stack...');
  
  if (uiLibrary && UI_LIBRARIES.html[uiLibrary]) {
    const lib = UI_LIBRARIES.html[uiLibrary];
    log(`Adding ${lib.name} CDN: ${lib.cdn}`);
    success('HTML stack configured successfully!');
    log(`Add this to your HTML file:\n<link rel="stylesheet" href="${lib.cdn}">`);
  } else {
    success('HTML stack is ready (no additional dependencies needed)!');
  }
  
  return true;
};

const installMiniProgramStack = (options) => {
  const { uiLibrary, path: projectPath } = options;
  
  log('Installing Mini Program stack...');
  
  if (uiLibrary === 'tdesign') {
    log('Installing TDesign for Mini Program...');
    log('Run: npm install tdesign-weapp --save');
    
    if (projectPath) {
      try {
        execSync('npm install tdesign-weapp --save', { 
          cwd: projectPath, 
          stdio: 'inherit' 
        });
      } catch (e) {
        warn('Failed to install via npm. Please install manually.');
      }
    }
    
    // Add to project.config.json
    if (projectPath && fs.existsSync(path.join(projectPath, 'project.config.json'))) {
      try {
        const configPath = path.join(projectPath, 'project.config.json');
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        
        if (!config.usingComponents) {
          config.usingComponents = {};
        }
        
        config.usingComponents = {
          ...config.usingComponents,
          't-button': 'tdesign-weapp/button/button',
          't-cell': 'tdesign-weapp/cell/cell',
          't-toast': 'tdesign-weapp/toast/toast',
        };
        
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        success('Added TDesign components to project.config.json');
      } catch (e) {
        warn('Failed to update project.config.json');
      }
    }
  } else if (uiLibrary === 'vant') {
    log('Installing Vant Weapp...');
    log('Follow instructions at: https://youzan.github.io/vant-weapp/#/quickstart');
  }
  
  success('Mini Program stack configured successfully!');
  return true;
};

const installStack = (options) => {
  const { stack, uiLibrary, path: projectPath, packageManager } = options;
  
  switch (stack) {
    case 'react':
      return installReactStack({ uiLibrary, path: projectPath, packageManager });
    case 'vue':
      return installVueStack({ uiLibrary, path: projectPath, packageManager });
    case 'html':
      return installHtmlStack({ uiLibrary });
    case 'miniprogram':
      return installMiniProgramStack({ uiLibrary, path: projectPath });
    default:
      error(`Unknown stack: ${stack}`);
      log(`Available stacks: ${Object.keys(STACKS).join(', ')}`);
      return false;
  }
};

const installAll = (options) => {
  const { path: projectPath, packageManager } = options;
  
  log('Installing all stacks...\n');
  
  Object.keys(STACKS).forEach(stack => {
    log(`--- ${stack} ---`);
    installStack({ ...options, stack });
    log('');
  });
  
  success('All stacks installed!');
};

const checkInstallation = () => {
  log('Checking installation...\n');
  
  // Check Node.js
  try {
    const nodeVersion = process.version;
    success(`Node.js: ${nodeVersion}`);
  } catch (e) {
    error('Node.js: NOT FOUND');
  }
  
  // Check package managers
  const packageManagers = ['npm', 'yarn', 'pnpm'];
  const found = [];
  
  for (const pm of packageManagers) {
    try {
      const version = execSync(`${pm} --version`, { encoding: 'utf-8' }).trim();
      found.push(`${pm} (v${version})`);
    } catch (e) {
      // Ignore
    }
  }
  
  if (found.length > 0) {
    success(`Package managers: ${found.join(', ')}`);
  } else {
    error('No package manager found');
  }
  
  // Check global tools
  const tools = ['vite', 'create-vite'];
  for (const tool of tools) {
    try {
      execSync(`${tool} --version`, { stdio: 'ignore' });
      success(`${tool}: installed`);
    } catch (e) {
      warn(`${tool}: NOT installed`);
    }
  }
  
  log('\n--- Available UI Libraries ---');
  
  Object.entries(UI_LIBRARIES).forEach(([stack, libs]) => {
    log(`\n${stack}:`);
    Object.entries(libs).forEach(([key, lib]) => {
      log(`  - ${key}: ${lib.name}`);
    });
  });
};

const listUIlibraries = (stack) => {
  if (stack && UI_LIBRARIES[stack]) {
    log(`UI libraries for ${stack}:`);
    Object.entries(UI_LIBRARIES[stack]).forEach(([key, lib]) => {
      log(`  - ${key}: ${lib.name}`);
      if (lib.packages) {
        log(`    Packages: ${lib.packages.join(', ')}`);
      }
      if (lib.cdn) {
        log(`    CDN: ${lib.cdn}`);
      }
    });
  } else {
    log('Available UI libraries:');
    Object.entries(UI_LIBRARIES).forEach(([stack, libs]) => {
      log(`\n${stack}:`);
      Object.entries(libs).forEach(([key, lib]) => {
        log(`  - ${key}: ${lib.name}`);
      });
    });
  }
};

// Main
const main = () => {
  const options = parseArgs();
  
  if (options.check) {
    checkInstallation();
    return;
  }
  
  if (options.listUIlibraries || options['list-ui-libraries']) {
    listUIlibraries(options.stack);
    return;
  }
  
  if (options.installAll || options['install-all']) {
    installAll(options);
    return;
  }
  
  if (!options.stack) {
    log('Usage:');
    log('  node stack-installer.js --stack react');
    log('  node stack-installer.js --stack react --ui-library antd');
    log('  node stack-installer.js --stack vue --path ./my-project');
    log('  node stack-installer.js --install-all');
    log('  node stack-installer.js --check');
    log('  node stack-installer.js --list-ui-libraries');
    log('\nOptions:');
    log('  --stack <name>         Tech stack (react|vue|html|miniprogram)');
    log('  --ui-library <name>   UI library to install');
    log('  --path <path>          Project path');
    log('  --package-manager <pm> Package manager (npm|yarn|pnpm)');
    log('  --install-all          Install all stacks');
    log('  --check                Check installation');
    log('  --list-ui-libraries    List available UI libraries');
    return;
  }
  
  const result = installStack(options);
  
  if (result) {
    log('\nInstallation complete!');
  } else {
    error('\nInstallation failed!');
    process.exit(1);
  }
};

main();
