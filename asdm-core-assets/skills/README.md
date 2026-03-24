# ASDM Skills Repository

This directory contains specialized skills (tools and workflows) for various development tasks. These skills provide comprehensive capabilities for AI-assisted development workflows.

## Overview

Skills in this directory provide:
- Specialized tools and utilities
- Step-by-step workflows and processes
- Technical guidelines and best practices
- Automation scripts and helpers

## Directory Structure

```
skills/
├── skills-registry.json    # Registry file for Admin UI
└── pptx/                    # PowerPoint presentation skills
    ├── README.md
    ├── SKILL.md
    ├── html2pptx.md
    ├── ooxml.md
    ├── LICENSE.txt
    ├── scripts/
    │   ├── html2pptx.js
    │   ├── inventory.py
    │   ├── rearrange.py
    │   ├── replace.py
    │   └── thumbnail.py
    └── ooxml/
        ├── schemas/
        └── scripts/
```

## Available Skills

### PPTX Presentation Skills

- **[PPTX Skill Overview](pptx/README.md)** - Main documentation
- **[SKILL.md](pptx/SKILL.md)** - Comprehensive guide for creating, editing, and analyzing PowerPoint presentations
- **[html2pptx.md](pptx/html2pptx.md)** - HTML to PowerPoint conversion guide
- **[ooxml.md](pptx/ooxml.md)** - Office Open XML technical reference

#### Capabilities

- Create new presentations from scratch
- Edit existing presentations
- Work with templates
- Extract and analyze content
- Convert HTML slides to PowerPoint
- Manipulate Office Open XML directly

#### Scripts

- `html2pptx.js` - Convert HTML to PowerPoint presentations
- `inventory.py` - Extract text inventory from presentations
- `rearrange.py` - Reorder, duplicate, and delete slides
- `replace.py` - Replace text in presentations
- `thumbnail.py` - Generate thumbnail grids for visual analysis

## Adding New Skills

To add a new skill:

1. Create a new directory under `skills/`
2. Add README.md with overview and index
3. Add SKILL.md with comprehensive skill documentation
4. Add supporting documentation files (.md format)
5. Add necessary scripts and tools
6. Update `skills-registry.json` with new entry

Example structure:
```
skills/
├── {skill-name}/
│   ├── README.md
│   ├── SKILL.md
│   ├── {skill-name}-guide-1.md
│   ├── {skill-name}-guide-2.md
│   ├── scripts/
│   └── tools/
```

## Registry

The `skills-registry.json` file tracks all available skills and is used by the Admin UI to display skill details.

## Usage

AI agents can invoke these skills to perform specialized tasks:
- Presentation creation and editing
- PDF processing and form filling
- Document processing
- Code generation workflows
- Data transformation tasks

## Integration

Skills integrate with:
- AI coding assistants: Provide step-by-step workflows and tools
- Admin UI: Display skill information and details
- Development workflows: Automate complex multi-step processes

## Support

For questions about skills, visit [ASDM Platform](https://platform.asdm.ai).
