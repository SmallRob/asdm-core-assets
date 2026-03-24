# HTML Prototype Specifications

## Overview

This document specifies the requirements and standards for generating vanilla HTML/CSS/JS prototypes.

## Tech Stack

| Component | Version | Notes |
|-----------|---------|-------|
| HTML | 5 | Semantic HTML |
| CSS | 3 | Modern CSS features |
| JavaScript | ES2022 | Vanilla JS |

## Coding Standards Reference

When generating HTML prototypes, the following coding standards from `asdm-core-assets/specs` MUST be followed:

- **[HTML Specifications](.asdm/specs/html/html.md)**: HTML semantic elements and accessibility
  - Semantic HTML5 elements
  - Accessibility requirements (ARIA attributes)
  - SEO best practices

- **[CSS Specifications](.asdm/specs/css/css.md)**: CSS styling conventions
  - CSS Variables usage
  - BEM naming convention
  - Responsive design patterns

- **[JavaScript General](.asdm/specs/javascript/javascript.md)**: JavaScript coding conventions
  - ES Modules usage
  - Modern JavaScript patterns

## Required Conventions

### HTML (from specs)

- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Proper heading hierarchy (h1 → h6)
- ARIA attributes for accessibility
- Alt text for images

### CSS (from specs)

- **Indentation**: 2 spaces
- **Line length**: Max 100 characters
- **Naming**: BEM convention
- Use CSS Variables for theming

### JavaScript (from Alibaba F2E Spec)

- Use `const`/`let`, not `var`
- Use strict equality (`===`/`!==`)
- Use ES Modules (`import`/`export`)
- Trailing commas in multi-line structures

## CSS Frameworks (Optional)

### Supported Frameworks

| Framework | Version | CDN |
|-----------|---------|-----|
| Bootstrap | 5.x | Yes |
| Tailwind CSS | 3.x | Yes (Play CDN) |
| Foundation | 6.x | Yes |

## Project Structure

```
project/
├── public/
│   └── favicon.ico
├── src/
│   ├── styles/
│   │   ├── main.css
│   │   ├── variables.css
│   │   └── components.css
│   ├── scripts/
│   │   ├── main.js
│   │   ├── utils.js
│   │   └── components/
│   │       └── componentName.js
│   └── assets/
│       └── images/
├── index.html
└── README.md
```

## HTML Standards

### Semantic HTML5 Elements

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Page description">
  <title>Page Title</title>
  <link rel="stylesheet" href="src/styles/main.css">
</head>
<body>
  <header>
    <nav role="navigation" aria-label="Main navigation">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="home">
      <h1>Welcome</h1>
    </section>
    
    <section id="about">
      <h2>About Us</h2>
      <article>
        <p>Content here...</p>
      </article>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 Company Name</p>
  </footer>

  <script type="module" src="src/scripts/main.js"></script>
</body>
</html>
```

### Accessibility Requirements

- Use semantic HTML elements
- Include ARIA attributes where needed
- Ensure keyboard navigation
- Add alt text for images
- Use proper heading hierarchy (h1 -> h6)

## CSS Standards

### CSS Variables

```css
:root {
  /* Colors */
  --color-primary: #409eff;
  --color-secondary: #67c23a;
  --color-text: #333;
  --color-background: #fff;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.5;
  
  /* Border */
  --border-radius: 4px;
  --border-color: #dcdfe6;
}

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

### BEM Naming Convention

```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__body { }
.card__footer { }

/* Modifier */
.card--featured { }
.card--disabled { }
```

### Responsive Design

```css
/* Mobile-first approach */
.container {
  width: 100%;
  padding: 0 var(--spacing-md);
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}
```

### Flexbox Layout

```css
.flex {
  display: flex;
}

.flex--center {
  justify-content: center;
  align-items: center;
}

.flex--between {
  justify-content: space-between;
}

.flex--column {
  flex-direction: column;
}
```

### CSS Grid

```css
.grid {
  display: grid;
  gap: var(--spacing-md);
}

.grid--2cols {
  grid-template-columns: repeat(2, 1fr);
}

.grid--3cols {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
  .grid--2cols,
  .grid--3cols {
    grid-template-columns: 1fr;
  }
}
```

## JavaScript Standards

### ES Modules

```javascript
// src/scripts/utils.js
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
```

### DOM Manipulation

```javascript
// Create element
const element = document.createElement('div');
element.className = 'card';
element.innerHTML = `
  <h2 class="card__title">${title}</h2>
  <p class="card__content">${content}</p>
`;

// Event delegation
document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.matches('.list__item')) {
    handleItemClick(e.target);
  }
});
```

### State Management

```javascript
// Simple state management
const createStore = (initialState) => {
  let state = initialState;
  const listeners = new Set();

  const getState = () => state;

  const setState = (partial) => {
    state = { ...state, ...partial };
    listeners.forEach(listener => listener(state));
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getState, setState, subscribe };
};

// Usage
const store = createStore({ count: 0 });
store.subscribe((state) => console.log('State changed:', state));
store.setState({ count: 1 });
```

### Form Handling

```javascript
const handleFormSubmit = (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  // Validation
  if (!data.email || !data.password) {
    showError('Please fill in all fields');
    return;
  }
  
  // Submit
  console.log('Form data:', data);
};

// Event listener
document.querySelector('form').addEventListener('submit', handleFormSubmit);
```

### Fetch API

```javascript
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// Usage
const data = await fetchData('/api/data', {
  method: 'POST',
  body: JSON.stringify({ name: 'John' }),
});
```

## Tailwind CSS Setup

### Via CDN (Development)

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '#409eff',
        },
      },
    },
  }
</script>
```

### Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#409eff',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

## Bootstrap Integration

### Via CDN

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### Bootstrap Example

```html
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Card Title</h5>
          <p class="card-text">Card content</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Browser Compatibility

### Supported Browsers

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### Polyfills

```html
<script src="https://polyfill.io/v3/polyfill.min.js"></script>
```

## Development Workflow

1. Open `index.html` in browser
2. Use live server (VS Code extension or npm package)
3. Make changes in `src/` directory
4. No build step required for basic prototypes

## Performance Tips

1. Minimize CSS/JS files for production
2. Use lazy loading for images
3. Optimize images (WebP format)
4. Use CDN for libraries
5. Enable browser caching

## Notes

- Keep JavaScript simple and readable
- Use semantic HTML for accessibility
- Mobile-first responsive design
- Consider using CSS preprocessors (Sass/Less) for larger projects
- Use ES modules for better code organization
