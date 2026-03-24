# ASDM Toolset - Prototype Builder

toolset-id: prototype-builder
toolset-name: Prototype Builder
version: 1.0.0
updated-date: 2026-3-17
toolset-description: A toolset for rapidly generating verifiable prototypes based on user requirements and technology stack specifications.

## Overview

Prototype Builder (toolset-id `prototype-builder`) is an ASDM toolset for rapidly generating frontend prototypes based on user requirements and technology stack specifications. It accepts user requirements and tech stack preferences, then generates a runnable prototype that can be immediately verified.

User can install this `toolset` into a workspace and run `INSTALL.md` document using `AI Guided Installation` to initialize the toolset for the workspace. Just simply copy and paste the following prompt into your `AI Coding` tool's chat window and hit enter:

```shell
Follow instructions in .asdm/toolsets/prototype-builder/INSTALL.md
```

## Features

Main features of Prototype Builder:

- **Quick Prototype Generation**: Generate complete, verifiable prototypes from user requirements
- **Multiple Tech Stacks**: Support React, Vue, HTML, WeChat Mini Program
- **UI Library Integration**: Support Ant Design, Material-UI, Element Plus, Vuetify, Bootstrap, Tailwind CSS
- **Coding Standards Compliance**: Automatically apply coding standards from `asdm-core-assets/specs`
- **Project Scaffolding**: Create minimal project structure with basic configuration

### Supported Tech Stacks

| Tech Stack | Framework | UI Library | Build Tool |
|------------|-----------|------------|------------|
| React | React 18 | Ant Design / Material-UI / Chakra UI | Vite |
| Vue | Vue 3 | Element Plus / Vuetify / Naive UI | Vite |
| HTML | Vanilla | Bootstrap / Tailwind CSS | None |
| Mini Program | WeChat | TDesign / Vant | Native |

## Coding Standards

When generating prototypes, the tool automatically applies coding standards from `asdm-core-assets/specs` based on the selected technology stack:

### ⚠️ Mandatory Spec Reading Process

**IMPORTANT: All commands MUST read complete spec files before generating any code to ensure coding standard compliance.**

#### Spec Reading Checklist

| Tech Stack | Required Spec Files (ALL mandatory) |
|------------|-----------------------------------|
| **React** | 1. `.asdm/specs/reactjs/reactjs-coding-standard.md`<br>2. `.asdm/specs/reactjs/reactjs-performance-guidelines.md`<br>3. `.asdm/specs/javascript/javascript.md`<br>4. `.asdm/specs/css/css.md`<br>5. `.asdm/toolsets/prototype-builder/specs/specs4react.md`<br>6. `.asdm/specs/typescript/typescript.md` (if TypeScript enabled) |
| **Vue** | 1. `.asdm/specs/vue3-composition-api/` (all files)<br>2. `.asdm/specs/javascript/javascript.md`<br>3. `.asdm/specs/css/css.md`<br>4. `.asdm/toolsets/prototype-builder/specs/specs4vue.md`<br>5. `.asdm/specs/typescript/typescript.md` (if TypeScript enabled) |
| **HTML** | 1. `.asdm/specs/html/html.md`<br>2. `.asdm/specs/css/css.md`<br>3. `.asdm/specs/javascript/javascript.md`<br>4. `.asdm/toolsets/prototype-builder/specs/specs4html.md` |
| **Mini Program** | 1. `.asdm/toolsets/prototype-builder/specs/specs4miniprogram.md` |

### Tech Stack to Specs Mapping

| Tech Stack | Primary Spec | Related Specs |
|------------|--------------|---------------|
| React | `specs/reactjs/README.md` | JavaScript, TypeScript, CSS |
| Vue | `specs/vue3-composition-api/README.md` | JavaScript, TypeScript, CSS |
| HTML | `specs/html/html.md` | CSS, JavaScript |
| Mini Program | Native WeChat specs | JavaScript |

### Required Conventions

All generated prototypes MUST follow these conventions:

- **Indentation**: 2 spaces (no tabs)
- **Line length**: Max 100 characters
- **Character encoding**: UTF-8
- **Semicolons**: Required (JavaScript)
- **Naming**: Follow tech stack specific conventions
- **Modules**: Use ES6 Modules (`import`/`export`)

## Toolset Installation Process

`INSTALL.md` will setup the toolset with the following steps:

- Create `.asdm/toolsets/prototype-builder` directory for Prototype Builder
- Create `.asdm/prototypes` directory for generated prototypes
- Detect the current `Agentic Engine` provider, e.g. Claude Code, GitHub Copilot, Tencent CodeBuddy
- Create shortcuts commands for `Prototype Builder` in provider's entry point

## Toolset Workflow

Once `Prototype Builder` is installed, user can use the following commands to generate prototypes:

- `/asdm-prototype-create`: Generate a complete prototype from requirements
- `/asdm-prototype-scaffold`: Scaffold a new project with specific tech stack

### Mandatory Workflow (MUST FOLLOW)

All prototype building commands follow this mandatory workflow to ensure generated code meets coding standards:

#### 1. Parse Parameters
- Extract command line parameters (tech stack, UI library, features, etc.)

#### 2. Load and Read ALL Applicable Specs
- Read corresponding spec files based on tech stack
- **DO NOT generate any code before completing spec reading**
- Output spec constraints summary

#### 3. Generate Code
- Generate project code strictly following read specs
- Apply coding standards, directory structure, naming conventions, etc.

#### 4. Self-Check and Validation
- Check generated code against specs
- Validate: PropTypes, directory structure, naming conventions, performance optimization, code style

**Key Constraints:**
- React projects MUST include PropTypes validation
- Use React.memo, useMemo, useCallback for performance optimization
- Follow `components/ComponentName/index.jsx` directory pattern
- API layer in `services/` not `api/`
- Extract reusable logic to `hooks/useXxx.js`
- Include `.eslintrc.cjs` and `.prettierrc` config files

## Toolset Structure

The Prototype Builder toolset has the following structure:

```
.asdm/toolsets/prototype-builder/
├── INSTALL.md                                  ## Installation instructions
├── README.md                                   ## English documentation
├── README.zh.md                               ## Chinese documentation
├── actions                                     ## Instructions for Prototype Builder
│   ├── asdm-prototype-create.md                ## Instruction for creating prototypes (includes mandatory workflow)
│   └── asdm-prototype-scaffold.md              ## Instruction for scaffolding projects (includes mandatory workflow)
├── specs                                       ## Spec documents for Prototype Builder
│   ├── specs4react.md                          ## React prototype specifications
│   ├── specs4vue.md                            ## Vue prototype specifications
│   ├── specs4html.md                           ## HTML prototype specifications
│   └── specs4miniprogram.md                   ## Mini Program specifications
└── tools                                       ## Generator tools
    └── prototype-generator.js                  ## Core prototype generation tool
```

**NOTE**: All action files include `Execution Workflow (MUST FOLLOW)` section that enforces complete spec reading before code generation.

## Usage Examples

### Create Prototype

```
/asdm-prototype-create --requirements "A todo list app with add, delete, and complete functionality" --stack react
```

### Scaffold Project

```
/asdm-prototype-scaffold --stack vue --ui-library element-plus --name my-app
```

### Output

When generating a project, the tool outputs which specs are being used:

```
--- Coding Standards (from asdm-core-assets/specs) ---
Primary spec: specs/reactjs/README.md
Related specs:
  - specs/reactjs/reactjs-coding-standard.md
  - specs/javascript/javascript.md
  - specs/typescript/typescript.md
  - specs/css/css.md

IMPORTANT: Follow these coding standards when implementing the prototype.
```

## Related Toolsets

- **PRD Builder**: For planning and executing tasks
- **Context Builder**: For building workspace context

## Copyright & License

Copyright (c) 2026 LeansoftX.com & iSoftStone. All rights reserved.

Licensed under the PROPRIETARY SOFTWARE LICENSE. See [LICENSE](LICENSE) in the project root for license information.
