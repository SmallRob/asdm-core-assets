# Create Prototype

action-id: asdm-prototype-create
action-name: Prototype Create
version: 1.0.0
action-description: Generate a complete, verifiable prototype based on user requirements and technology stack specifications.

## Description

Generate a complete, verifiable prototype based on user requirements and technology stack specifications. This action analyzes requirements, selects appropriate tech stack, scaffolds the project, and generates runnable code.

## Usage

```
/asdm-prototype-create [options]
```

Or in CodeBuddy:

```
Follow instructions in .asdm/toolsets/prototype-builder/actions/asdm-prototype-create.md
```

## Parameters

- `--requirements, -r` (required): User requirements description in natural language
- `--stack, -s` (required): Target technology stack (react | vue | html | miniprogram)
- `--ui-library, -u` (optional): UI library to use (default: antd for react, element-plus for vue)
- `--features, -f` (optional): Comma-separated list of features to include
- `--output, -o` (optional): Output directory path (default: ./prototype)
- `--template, -t` (optional): Use a predefined template
- `--name, -n` (optional): Project name (default: prototype-{timestamp})

## Supported Tech Stacks

| Stack | Default UI | Alternative UI |
|-------|------------|----------------|
| react | Ant Design | Material-UI, Chakra UI |
| vue | Element Plus | Vuetify, Naive UI |
| html | None | Bootstrap, Tailwind CSS |
| miniprogram | TDesign | None |

## Features

Available features per tech stack:

### React/Vue
- router (routing)
- state-management (state management)
- form-validation (form validation)
- api-integration (API integration)
- authentication (authentication)
- charts (charts/graphs)
- table (data table)
- modal (modal/dialog)

### HTML
- responsive (responsive design)
- bootstrap (Bootstrap integration)
- tailwind (Tailwind CSS)
- vanilla-js (Vanilla JS components)

### Mini Program
- tabbar (tab bar navigation)
- custom-components (custom components)
- api-mock (API mocking)

## Examples

### Basic React Prototype

```
/create-prototype --requirements "A todo list app with add, delete, and complete functionality" --stack react
```

### Vue with Element Plus

```
/create-prototype --requirements "User login form with email and password validation" --stack vue --ui-library element-plus
```

### HTML with Bootstrap

```
/create-prototype --requirements "A landing page with hero section, features, and contact form" --stack html --features "bootstrap,responsive"
```

### Mini Program

```
/create-prototype --requirements "A simple counter app" --stack miniprogram
```

### Advanced Usage

```
/create-prototype \
  --requirements "An e-commerce product listing page with search, filter, and add to cart" \
  --stack react \
  --ui-library antd \
  --features "router,state-management,table,api-integration" \
  --output ./my-prototype \
  --name ecommerce-demo
```

## Output

The command generates:

1. **Project Structure**: Complete folder structure based on tech stack
2. **Configuration Files**:
   - `package.json` (for React/Vue)
   - `vite.config.js` (for React/Vue)
   - `project.config.json` (for Mini Program)
3. **Source Files**:
   - Entry point (index.js/app.js)
   - Components
   - Styles
   - Utilities
4. **README.md**: Usage instructions
5. **.prototype-builder.json**: Configuration for regeneration

## Verification

After generation, the tool automatically:

1. Installs dependencies
2. Runs build command
3. Starts development server (if applicable)
4. Reports success/failure status

## Coding Standards

All generated prototypes MUST follow the coding standards from `asdm-core-assets/specs`:

- **React**: Follow [React Development Specs](../specs/reactjs/README.md)
- **Vue**: Follow [Vue 3 Composition API Specs](../specs/vue3-composition-api/README.md)
- **HTML**: Follow [HTML Specifications](../specs/html/html.md) and [CSS](../specs/css/css.md)

Key conventions:
- 2 spaces indentation (no tabs)
- Max 100 characters per line
- UTF-8 character encoding
- Use ES6 Modules (`import`/`export`)
- Strict equality (`===`/`!==`)

The tool outputs which specs are being used during generation.

## Related Specifications

- [React Specifications](specs/specs4react.md)
- [Vue Specifications](specs/specs4vue.md)
- [HTML Specifications](specs/specs4html.md)
- [Mini Program Specifications](specs/specs4miniprogram.md)

## Output Format

```
{
  "status": "success",
  "projectPath": "/path/to/prototype",
  "techStack": "react",
  "uiLibrary": "antd",
  "features": ["router", "state-management"],
  "files": ["src/App.jsx", "src/main.jsx", ...],
  "dependencies": ["react", "react-dom", ...],
  "devServer": "http://localhost:5173",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Error Handling

If generation fails, the tool provides:

- Detailed error message
- Suggestions for fixing
- Debug information (with --debug flag)

## Notes

- For large projects, consider using --output to specify a dedicated directory
- Dependencies are installed automatically; ensure internet connectivity
- For Mini Program, WeChat DevTools is required for preview
