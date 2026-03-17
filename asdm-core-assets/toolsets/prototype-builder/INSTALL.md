# Prototype Builder Toolset Installation

**Toolset ID:** `prototype-builder`

## Overview

This document provides instructions for installing and setting up the Prototype Builder toolset in a workspace. Prototype Builder helps rapidly generate frontend prototypes based on user requirements and technology stack specifications.

## AI Guided Installation

To install this toolset using AI Guided Installation, copy and paste the following prompt into your AI Coding tool's chat window:

```shell
Follow instructions in .asdm/toolsets/prototype-builder/INSTALL.md
```

## Installation Steps

### 1. Create `.asdm/prototypes` directory for Prototype Builder's workspace

Create the directory structure for storing generated prototypes:

```bash
mkdir -p .asdm/prototypes
```

### 2. Detect the current `Agentic Engine` provider

Detect the current AI coding assistant provider (e.g., Claude Code, GitHub Copilot, Tencent CodeBuddy). Using the following guidelines to detect the provider:

- If `.claude` directory exists, use `Claude Code`
- If `.github` directory exists, use `GitHub Copilot`
- If `.codebuddy` directory exists, use `Tencent CodeBuddy`
- If no such folder is found in the current workspace, give user a prompt to select a provider manually

### 3. Create shortcuts commands for Prototype Builder (toolset ID: `prototype-builder`) in provider's entry point

Create shortcut commands in the appropriate location based on the detected provider.

#### For Claude Code (`.claude/commands/`):

Claude Code uses Markdown files with Frontmatter metadata for slash commands.

```bash
mkdir -p .claude/commands/

# Prototype Create command
cat > .claude/commands/asdm-prototype-create.md << 'EOF'
---
description: "Generate a complete prototype from requirements"
argument-hint: "[requirements description]"
---

EOF
cat .asdm/toolsets/prototype-builder/actions/asdm-prototype-create.md >> .claude/commands/asdm-prototype-create.md

# Prototype Scaffold command
cat > .claude/commands/asdm-prototype-scaffold.md << 'EOF'
---
description: "Scaffold a new project with specific tech stack"
argument-hint: "[project name]"
---

EOF
cat .asdm/toolsets/prototype-builder/actions/asdm-prototype-scaffold.md >> .claude/commands/asdm-prototype-scaffold.md
```

#### For GitHub Copilot (`.github/prompts/`):

GitHub Copilot uses `.prompt.md` files with YAML frontmatter.

```bash
mkdir -p .github/prompts/

# Prototype Create prompt
cat > .github/prompts/asdm-prototype-create.md << 'EOF'
---
name: asdm-prototype-create
description: Generate a complete prototype from requirements
arguments:
  - name: requirements
    description: User requirements description
---

EOF
cat .asdm/toolsets/prototype-builder/actions/asdm-prototype-create.md >> .github/prompts/asdm-prototype-create.md

# Prototype Scaffold prompt
cat > .github/prompts/asdm-prototype-scaffold.md << 'EOF'
---
name: asdm-prototype-scaffold
description: Scaffold a new project with specific tech stack
arguments:
  - name: name
    description: Project name
---

EOF
cat .asdm/toolsets/prototype-builder/actions/asdm-prototype-scaffold.md >> .github/prompts/asdm-prototype-scaffold.md
```

#### For Tencent CodeBuddy (`.codebuddy/commands/`):

CodeBuddy uses Markdown files directly as commands.

```bash
mkdir -p .codebuddy/commands/

# Prototype Create command
cp .asdm/toolsets/prototype-builder/actions/asdm-prototype-create.md .codebuddy/commands/asdm-prototype-create.md

# Prototype Scaffold command
cp .asdm/toolsets/prototype-builder/actions/asdm-prototype-scaffold.md .codebuddy/commands/asdm-prototype-scaffold.md
```

### 4. Copy toolset files to workspace

Copy the Prototype Builder toolset to the workspace:

```bash
mkdir -p .asdm/toolsets/
cp -r /path/to/asdm-core-assets/toolsets/prototype-builder .asdm/toolsets/
```

Or create a symlink:

```bash
mkdir -p .asdm/toolsets/
ln -s /path/to/asdm-core-assets/toolsets/prototype-builder .asdm/toolsets/prototype-builder
```

## Verification

After installation, verify the toolset is properly installed:

1. Check that `.asdm/toolsets/prototype-builder` directory exists
2. Check that command shortcuts are created in the appropriate location
3. Try running `/asdm-prototype-create` or `/asdm-prototype-scaffold`

## Usage

After installation, you can use the following commands:

- `/asdm-prototype-create`: Generate a complete prototype from requirements
- `/asdm-prototype-scaffold`: Scaffold a new project with specific tech stack

Example:

```
/asdm-prototype-create --requirements "A todo list app" --stack react
```

## Uninstallation

To uninstall the Prototype Builder toolset:

```bash
# Remove toolset directory
rm -rf .asdm/toolsets/prototype-builder

# Remove command shortcuts
rm -f .claude/commands/asdm-prototype-create.md
rm -f .claude/commands/asdm-prototype-scaffold.md
# (similar for .github/prompts/ or .codebuddy/commands/)
```
