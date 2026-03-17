# Scaffold Project

action-id: asdm-prototype-scaffold
action-name: Prototype Scaffold
version: 1.0.0
action-description: Scaffold a new project with a specific technology stack.

## Description

Scaffold a new project with a specific technology stack. This action creates a minimal project structure with basic configuration, without generating feature-specific code.

## Usage

```
/asdm-prototype-scaffold [options]
```

Or in CodeBuddy:

```
Follow instructions in .asdm/toolsets/prototype-builder/actions/asdm-prototype-scaffold.md
```

## Parameters

- `--stack, -s` (required): Target technology stack (react | vue | html | miniprogram)
- `--ui-library, -u` (optional): UI library to use
- `--output, -o` (optional): Output directory path (default: ./project)
- `--name, -n` (optional): Project name (default: my-app)
- `--typescript, -t` (optional): Enable TypeScript (for React/Vue)
- `--css, -c` (optional): CSS solution (css | scss | less | tailwind)
- `--package-manager, -p` (optional): Package manager to use (npm | yarn | pnpm)

## Supported Tech Stacks

| Stack | Description |
|-------|-------------|
| react | React 18 with Vite |
| vue | Vue 3 with Vite |
| html | Vanilla HTML/CSS/JS |
| miniprogram | WeChat Mini Program |

## Examples

### Basic React Project

```
/scaffold-project --stack react --name my-react-app
```

### Vue with TypeScript

```
/scaffold-project --stack vue --typescript --css scss --name my-vue-app
```

### HTML with Tailwind

```
/scaffold-project --stack html --css tailwind --name my-html-site
```

### Mini Program

```
/scaffold-project --stack miniprogram --name my-miniprogram
```

### Full Options

```
/scaffold-project \
  --stack react \
  --typescript \
  --ui-library antd \
  --css tailwind \
  --package-manager yarn \
  --output ./my-project
```

## Output

The command generates:

1. **Project Structure**:
   ```
   my-app/
   ├── src/
   │   ├── App.jsx
   │   ├── main.jsx
   │   └── index.css
   ├── public/
   ├── index.html
   ├── package.json
   ├── vite.config.js
   └── README.md
   ```

2. **Configuration Files**:
   - `package.json`: With all required dependencies
   - `vite.config.js`: Vite configuration
   - `tsconfig.json`: TypeScript configuration (if --typescript)
   - `tailwind.config.js`: Tailwind configuration (if --css tailwind)

3. **Basic Source Files**:
   - Entry point
   - Basic App component
   - Basic styles

## Features

The scaffolded project includes:

- Development server setup
- Hot module replacement (HMR)
- Build configuration
- Basic routing (for React/Vue)
- Linting configuration (ESLint)
- Git initialization (optional)

## Verification

After scaffolding:

1. Dependencies are installed automatically
2. You can run `npm run dev` to start development
3. Project is ready for feature implementation

## Coding Standards

All scaffolded projects MUST follow the coding standards from `asdm-core-assets/specs`:

- **React**: Follow [React Development Specs](../specs/reactjs/README.md)
- **Vue**: Follow [Vue 3 Composition API Specs](../specs/vue3-composition-api/README.md)
- **HTML**: Follow [HTML Specifications](../specs/html/html.md) and [CSS](../specs/css/css.md)

Key conventions:
- 2 spaces indentation (no tabs)
- Max 100 characters per line
- UTF-8 character encoding

## Related Specifications

- [React Specifications](specs/specs4react.md)
- [Vue Specifications](specs/specs4vue.md)
- [HTML Specifications](specs/specs4html.md)
- [Mini Program Specifications](specs/specs4miniprogram.md)

## Comparison: create-prototype vs scaffold-project

| Feature | create-prototype | scaffold-project |
|---------|------------------|-------------------|
| Code generation | Feature-specific | Minimal |
| Requirements analysis | Yes | No |
| Component generation | Yes | No |
| UI library setup | Yes | Optional |
| Configuration | Optimized for features | Default |
| Use case | Quick verification | Starting point |

## Notes

- Use `scaffold-project` when you want full control over implementation
- Use `create-prototype` when you need quick verification of requirements
- After scaffolding, you can use `create-prototype` to add features
