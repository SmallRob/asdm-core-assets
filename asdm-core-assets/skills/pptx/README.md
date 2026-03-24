# PPTX Presentation Skills

Comprehensive capabilities for creating, editing, and analyzing PowerPoint presentations.

## Overview

This skill provides a complete toolkit for working with PowerPoint (.pptx) files, supporting three main workflows:

1. **Creating presentations from scratch** - Using HTML-to-PPTX conversion
2. **Editing existing presentations** - Using Office Open XML manipulation
3. **Working with templates** - Duplicating, reordering, and customizing template slides

## Included Documentation

- **[SKILL.md](SKILL.md)** - Main skill documentation with comprehensive workflows
- **[html2pptx.md](html2pptx.md)** - HTML to PowerPoint conversion guide
- **[ooxml.md](ooxml.md)** - Office Open XML technical reference
- **[LICENSE.txt](LICENSE.txt)** - License terms

## Capabilities

### Creating Presentations

- Design presentations from scratch using HTML
- Convert HTML slides to PowerPoint with accurate positioning
- Support for layouts, charts, tables, and images
- Custom color palettes and typography
- Visual validation with thumbnail generation

### Editing Presentations

- Unpack .pptx files to access raw XML
- Modify slide content, layouts, and styling
- Add comments and speaker notes
- Work with themes and master slides
- Validate and repack presentations

### Working with Templates

- Extract text and visual information from templates
- Create thumbnail grids for visual analysis
- Duplicate and reorder slides
- Replace placeholder text with new content
- Maintain template design consistency

## Scripts

Located in `scripts/` directory:

- **html2pptx.js** - Convert HTML slides to PowerPoint presentations
- **inventory.py** - Extract comprehensive text inventory from presentations
- **rearrange.py** - Duplicate, reorder, and delete slides
- **replace.py** - Replace text in presentations with validation
- **thumbnail.py** - Generate thumbnail grids for visual analysis

## Quick Start

### Create a presentation from scratch

1. Read [SKILL.md](SKILL.md) for complete workflow
2. Read [html2pptx.md](html2pptx.md) for HTML syntax and best practices
3. Create HTML files for each slide
4. Run conversion script with charts/tables

### Edit an existing presentation

1. Read [SKILL.md](SKILL.md) for editing workflow
2. Read [ooxml.md](ooxml.md) for XML structure and editing guidelines
3. Unpack the presentation
4. Edit XML files
5. Validate and repack

### Work with a template

1. Extract template content and create thumbnails
2. Analyze template and create inventory
3. Plan content mapping to template slides
4. Use rearrange.py to duplicate and reorder slides
5. Use inventory.py and replace.py to update content

## Dependencies

Required dependencies (should already be installed):

- **markitdown** - Text extraction from presentations
- **pptxgenjs** - Creating presentations via html2pptx
- **playwright** - HTML rendering in html2pptx
- **react-icons** - Icons for presentations
- **sharp** - SVG rasterization and image processing
- **LibreOffice** - PDF conversion
- **Poppler** - PDF to image conversion
- **defusedxml** - Secure XML parsing

## Usage

This skill is designed to be used by AI coding assistants for:

- Automated presentation creation
- Batch processing of presentations
- Template-based document generation
- Content extraction and analysis
- Visual validation workflows

## License

Proprietary. See [LICENSE.txt](LICENSE.txt) for complete terms.

## Support

For questions about this skill, visit [ASDM Platform](https://platform.asdm.ai).
