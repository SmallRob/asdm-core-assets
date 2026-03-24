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

## Execution Workflow (MUST FOLLOW)

> **WARNING: This workflow is MANDATORY. Do NOT start scaffolding until ALL specs have been read.**

### Step 1: Parse Parameters

Extract all command parameters (--stack, --ui-library, --output, --name, --typescript, --css, --package-manager).

### Step 2: Load and Read ALL Applicable Specs

Based on `--stack`, **you MUST read EVERY spec file listed below** before scaffolding any code:

| Stack | Specs to Read (ALL mandatory) |
|-------|-------------------------------|
| react | 1. `.asdm/specs/reactjs/reactjs-coding-standard.md`<br>2. `.asdm/specs/reactjs/reactjs-performance-guidelines.md`<br>3. `.asdm/specs/javascript/javascript.md`<br>4. `.asdm/specs/css/css.md`<br>5. `.asdm/toolsets/prototype-builder/specs/specs4react.md`<br>6. `.asdm/specs/typescript/typescript.md` (if --typescript) |
| vue | 1. `.asdm/specs/vue3-composition-api/` (all files)<br>2. `.asdm/specs/javascript/javascript.md`<br>3. `.asdm/specs/css/css.md`<br>4. `.asdm/toolsets/prototype-builder/specs/specs4vue.md`<br>5. `.asdm/specs/typescript/typescript.md` (if --typescript) |
| html | 1. `.asdm/specs/html/html.md`<br>2. `.asdm/specs/css/css.md`<br>3. `.asdm/specs/javascript/javascript.md`<br>4. `.asdm/toolsets/prototype-builder/specs/specs4html.md` |
| miniprogram | 1. `.asdm/toolsets/prototype-builder/specs/specs4miniprogram.md` |

**CRITICAL:**
- Read the spec files using `read_file` tool **before** any scaffolding.
- After reading, output a brief summary of the key constraints from the specs.
- If any spec file is missing, warn the user and proceed with available specs.

### Step 3: Generate Code

Scaffold project files strictly following the specs read in Step 2.

Key constraints derived from specs (not exhaustive - read the actual files):
- **React**: Components follow `components/ComponentName/index.jsx` directory pattern
- **Performance**: Use `React.memo`, `useMemo`, `useCallback` patterns
- **API Layer**: Place in `services/`, not `api/`
- **Hooks**: Extract reusable logic into `hooks/useXxx.js`
- **Code Style**: Single quotes, semicolons required, 2 spaces indentation
- **Constants**: Use `UPPER_SNAKE_CASE`
- **CSS**: CSS Modules preferred (`ComponentName.module.css`)
- **Config**: Include `.eslintrc.cjs` and `.prettierrc` config files
- **TypeScript**: Strict mode enabled, proper type definitions

### Step 4: Self-Check Against Specs

After scaffolding all code, verify compliance:
- [ ] Directory structure matches spec requirements
- [ ] Naming conventions followed (PascalCase components, camelCase hooks, UPPER_SNAKE_CASE constants)
- [ ] Code style matches (single quotes, semicolons, 2 spaces, max 100 chars)
- [ ] ESLint and Prettier configs included
- [ ] TypeScript configuration is correct (if --typescript)
- [ ] Build configuration matches chosen tech stack

## Coding Standards

All scaffolded projects MUST follow the coding standards from `asdm-core-assets/specs`:

- **React**: Follow [React Development Specs](.asdm/specs/reactjs/README.md)
- **Vue**: Follow [Vue 3 Composition API Specs](.asdm/specs/vue3-composition-api/README.md)
- **HTML**: Follow [HTML Specifications](.asdm/specs/html/html.md) and [CSS](.asdm/specs/css/css.md)

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
