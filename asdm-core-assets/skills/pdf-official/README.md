# PDF Processing Official Skills

Comprehensive PDF manipulation toolkit for extracting text and tables, creating new PDFs, merging/splitting documents, and handling forms.

## Overview

This skill provides complete PDF processing capabilities, including:
- **Text and table extraction** from PDF documents
- **PDF creation and editing** with various libraries
- **Form handling** for both fillable and non-fillable PDF forms
- **Advanced operations** like merging, splitting, and optimization
- **Visual analysis** for complex form processing workflows

## Directory Structure

```
pdf-official/
├── [README.md](README.md)                        # This file - overview and index
├── [SKILL.md](SKILL.md)                          # Main skill documentation with comprehensive workflows
├── [reference.md](reference.md)                  # Advanced features and detailed examples
├── [forms.md](forms.md)                          # Form filling instructions and workflows
├── [LICENSE.txt](LICENSE.txt)                    # License terms
└── scripts/                                       # Automation scripts and tools
    ├── [check_fillable_fields.py](scripts/check_fillable_fields.py)              # Check if PDF has fillable fields
    ├── [extract_form_field_info.py](scripts/extract_form_field_info.py)          # Extract form field information
    ├── [convert_pdf_to_images.py](scripts/convert_pdf_to_images.py)              # Convert PDF to images for visual analysis
    ├── [create_validation_image.py](scripts/create_validation_image.py)          # Create validation images with bounding boxes
    ├── [check_bounding_boxes.py](scripts/check_bounding_boxes.py)                # Validate bounding box intersections
    ├── [fill_fillable_fields.py](scripts/fill_fillable_fields.py)                # Fill PDF forms with fillable fields
    ├── [fill_pdf_form_with_annotations.py](scripts/fill_pdf_form_with_annotations.py)  # Fill non-fillable PDFs with annotations
    └── [check_bounding_boxes_test.py](scripts/check_bounding_boxes_test.py)      # Test script for bounding box validation
```

## Available Documentation

- **[SKILL.md](SKILL.md)** - Main skill documentation with comprehensive workflows
- **[reference.md](reference.md)** - Advanced features, JavaScript libraries, and detailed examples
- **[forms.md](forms.md)** - Complete form filling workflows and instructions

## Capabilities

### Text and Content Processing
- Extract text with layout preservation
- Extract tables with structured data
- Convert PDFs to images for OCR processing
- Extract embedded images and metadata

### PDF Creation and Editing
- Create new PDFs from scratch using reportlab
- Merge multiple PDF documents
- Split PDFs into individual pages or sections
- Rotate, crop, and modify pages
- Add watermarks and annotations

### Form Handling
- **Fillable forms**: Automatically detect and fill form fields
- **Non-fillable forms**: Visual analysis and annotation-based filling
- Complex form workflows with validation
- Support for text fields, checkboxes, radio buttons, and choice fields

### Advanced Operations
- Password protection and encryption
- PDF optimization and compression
- Corrupted PDF repair
- High-resolution image generation
- Batch processing capabilities

## Scripts

Located in `scripts/` directory:

- **check_fillable_fields.py** - Determine if PDF has fillable form fields
- **extract_form_field_info.py** - Extract detailed form field information
- **convert_pdf_to_images.py** - Convert PDF to PNG images for visual analysis
- **create_validation_image.py** - Create validation images with bounding boxes
- **check_bounding_boxes.py** - Validate bounding box intersections and positions
- **fill_fillable_fields.py** - Fill PDF forms with fillable fields
- **fill_pdf_form_with_annotations.py** - Fill non-fillable PDFs using annotations

## Quick Start

### Basic Text Extraction

```python
from pypdf import PdfReader

reader = PdfReader("document.pdf")
for page in reader.pages:
    text = page.extract_text()
    print(text)
```

### Form Processing Workflow

1. **Check for fillable fields**:
   ```bash
   python scripts/check_fillable_fields.py document.pdf
   ```

2. **For fillable forms**:
   ```bash
   python scripts/extract_form_field_info.py document.pdf field_info.json
   python scripts/fill_fillable_fields.py document.pdf field_values.json output.pdf
   ```

3. **For non-fillable forms**:
   ```bash
   python scripts/convert_pdf_to_images.py document.pdf images/
   # Create fields.json with bounding boxes
   python scripts/fill_pdf_form_with_annotations.py document.pdf fields.json output.pdf
   ```

## Dependencies

Required Python libraries:
- **pypdf** - Basic PDF operations
- **pdfplumber** - Advanced text and table extraction
- **pypdfium2** - High-performance PDF rendering
- **reportlab** - PDF creation and editing
- **PIL** - Image processing

Optional dependencies:
- **pytesseract** - OCR for scanned PDFs
- **pdf2image** - PDF to image conversion
- **qpdf** - Command-line PDF manipulation
- **poppler-utils** - Command-line PDF utilities

## Usage

This skill is designed for AI coding assistants to:
- Process PDF documents programmatically
- Automate form filling workflows
- Extract structured data from PDFs
- Create and modify PDF documents
- Handle complex PDF processing tasks

## Support

For questions about this skill, visit [ASDM Platform](https://platform.asdm.ai).

## License

Proprietary. See [LICENSE.txt](LICENSE.txt) for complete terms.