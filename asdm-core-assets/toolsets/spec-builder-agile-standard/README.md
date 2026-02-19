# Spec Builder for Agile Team (Standard version)

Spec Builder for Agile Team (Standard version) is a toolset for building specification documents for a Software Development team who is using Agile methodology.

## Overview

This toolset provides comprehensive support for Agile development teams to create, manage, and maintain specification documents. It integrates with common Agile practices and helps teams maintain consistent documentation throughout the development lifecycle.

## Features

- **User Story Generation**: Create well-structured user stories with acceptance criteria
- **Sprint Planning Specs**: Generate sprint planning documents
- **Definition of Done**: Manage and apply Definition of Done checklists
- **Retrospective Templates**: Create retrospective documents
- **Backlog Management**: Organize and prioritize product backlog items

## Components

### Actions
- `create-user-story`: Generate a new user story with standard format
- `plan-sprint`: Create sprint planning documentation
- `generate-dod`: Generate Definition of Done checklist
- `create-retrospective`: Create retrospective document from team input
- `prioritize-backlog`: Analyze and prioritize backlog items

### Specifications
See the `specs/` directory for detailed specifications on Agile documentation standards.

### Tools
See the `tools/` directory for utility tools supporting Agile workflows.

## Installation

See [INSTALL.md](INSTALL.md) for installation instructions.

## Quick Start

1. Create a user story:
   ```
   /create-user-story --title "User Login" --epic "Authentication"
   ```

2. Plan a sprint:
   ```
   /plan-sprint --sprint "Sprint 5" --duration 14
   ```

3. Generate Definition of Done:
   ```
   /generate-dod --type feature
   ```

## Agile Methodology Support

### Scrum
- Sprint planning
- Daily standup templates
- Sprint review documentation
- Sprint retrospective formats

### Kanban
- Work-in-progress limits
- Flow metrics
- Continuous delivery specs

### Hybrid
- Combined approach documentation
- Flexible sprint cycles
- Adaptive planning templates

## Best Practices

1. Use consistent naming conventions
2. Update specs after each sprint
3. Include all team members in retrospective input
4. Link user stories to epics and themes
5. Maintain traceability from requirements to implementation

## Version
Current version: 0.0.1

## Support
For issues and feature requests, please visit the [ASDM Platform](https://platform.asdm.ai).
