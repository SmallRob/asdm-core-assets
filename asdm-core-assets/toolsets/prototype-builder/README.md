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

## Toolset Structure

The Prototype Builder toolset has the following structure:

```
.asdm/toolsets/prototype-builder/
├── INSTALL.md                                  ## Installation instructions
├── README.md                                   ## Current document
├── actions                                     ## Instructions for Prototype Builder
│   ├── asdm-prototype-create.md                ## Instruction for creating prototypes
│   └── asdm-prototype-scaffold.md              ## Instruction for scaffolding projects
└── specs                                       ## Spec documents for Prototype Builder
    ├── specs4react.md                          ## React prototype specifications
    ├── specs4vue.md                            ## Vue prototype specifications
    ├── specs4html.md                           ## HTML prototype specifications
    └── specs4miniprogram.md                   ## Mini Program specifications
```

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
  - specs/typescript/typescrit.md
  - specs/css/css.md

IMPORTANT: Follow these coding standards when implementing the prototype.
```

## Related Toolsets

- **PRD Builder**: For planning and executing tasks
- **Context Builder**: For building workspace context

## Copyright & License

Copyright (c) 2026 LeansoftX.com & iSoftStone. All rights reserved.

Licensed under the PROPRIETARY SOFTWARE LICENSE. See [LICENSE](LICENSE) in the project root for license information.
