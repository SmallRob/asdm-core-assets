# Context Builder Toolset

A toolset for building context for a workspace.

## Overview

Context Builder helps developers create and manage context spaces within their ASDM workspaces. It provides tools for analyzing codebases, extracting relevant information, and generating structured context for AI-assisted development.

## Features

- **Codebase Analysis**: Analyzes code structure and dependencies
- **Context Extraction**: Extracts meaningful context from source code
- **Workspace Integration**: Seamlessly integrates with ASDM workspaces
- **AI-Ready Output**: Generates context optimized for AI consumption

## Components

### Actions
- `analyze-workspace`: Analyze the current workspace structure
- `extract-context`: Extract context from specified files or directories
- `build-context-space`: Build a complete context space
- `sync-context`: Synchronize context with remote storage

### Specifications
See the `specs/` directory for detailed specifications.

### Tools
See the `tools/` directory for utility tools.

## Installation

See [INSTALL.md](INSTALL.md) for installation instructions.

## Quick Start

1. Analyze your workspace:
   ```
   /analyze-workspace --path .
   ```

2. Extract context:
   ```
   /extract-context --output context.json
   ```

3. Build context space:
   ```
   /build-context-space --name my-project
   ```

## Version
Current version: 0.0.1

## Support
For issues and feature requests, please visit the [ASDM Platform](https://platform.asdm.ai).
