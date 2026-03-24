# Excel MCP Server

A Model Context Protocol (MCP) server for comprehensive Excel file manipulation without requiring Microsoft Excel installation.

## Overview

This MCP server enables AI agents to create, read, and modify Excel workbooks with full support for data operations, formatting, charts, pivot tables, and more. It supports multiple transport protocols (stdio, SSE, and streamable HTTP) for flexible deployment scenarios.

## Version

- **Version**: 0.1.7
- **License**: MIT
- **Python**: >=3.10

## Features

- **📊 Excel Operations**: Create, read, update workbooks and worksheets
- **📈 Data Manipulation**: Formulas, formatting, charts, pivot tables, and Excel tables
- **🔍 Data Validation**: Built-in validation for ranges, formulas, and data integrity
- **🎨 Formatting**: Font styling, colors, borders, alignment, and conditional formatting
- **📋 Table Operations**: Create and manage Excel tables with custom styling
- **📊 Chart Creation**: Generate various chart types (line, bar, pie, scatter, area)
- **🔄 Pivot Tables**: Create dynamic pivot tables for data analysis
- **🔧 Sheet Management**: Copy, rename, delete worksheets with ease
- **🔌 Triple Transport Support**: stdio, SSE (deprecated), and streamable HTTP
- **🌐 Remote & Local**: Works both locally and as a remote service

## File Structure

```
excel-mcp-server/
├── src/
│   └── excel_mcp/
│       ├── __init__.py           # Package initialization
│       ├── __main__.py           # CLI entry point with transport modes
│       ├── server.py             # Main MCP server implementation
│       ├── workbook.py           # Workbook operations (create, metadata)
│       ├── sheet.py              # Worksheet operations (copy, delete, merge)
│       ├── data.py               # Data read/write operations
│       ├── formatting.py         # Cell formatting operations
│       ├── chart.py              # Chart creation operations
│       ├── pivot.py              # Pivot table operations
│       ├── tables.py             # Excel table operations
│       ├── calculations.py       # Formula operations
│       ├── validation.py         # Formula and range validation
│       ├── cell_utils.py         # Cell reference utilities
│       ├── cell_validation.py    # Data validation metadata extraction
│       └── exceptions.py         # Custom exception classes
├── pyproject.toml                # Python project configuration
├── manifest.json                 # MCP server manifest
├── LICENSE                       # MIT License
├── README.md                     # This file
├── INSTALL.md                    # Installation guide
├── TOOLS.md                      # Complete tools documentation
└── config.json                   # Tool definitions for AI assistants
```

## Available Tools (24 Tools)

### Workbook Operations
- `create_workbook` - Create a new Excel workbook
- `create_worksheet` - Create a new worksheet in a workbook
- `get_workbook_metadata` - Get workbook metadata and structure

### Data Operations
- `read_data_from_excel` - Read data from Excel range with validation metadata
- `write_data_to_excel` - Write data to Excel cells

### Formatting Operations
- `format_range` - Apply formatting to cell range
- `merge_cells` - Merge cells in a range
- `unmerge_cells` - Unmerge previously merged cells
- `get_merged_cells` - Get list of merged cell ranges

### Formula Operations
- `apply_formula` - Apply Excel formula to cell
- `validate_formula_syntax` - Validate Excel formula syntax

### Chart Operations
- `create_chart` - Create chart (line, bar, pie, scatter, area)

### Pivot Table Operations
- `create_pivot_table` - Create pivot table from data

### Table Operations
- `create_table` - Create Excel table with styling

### Worksheet Operations
- `copy_worksheet` - Copy worksheet within workbook
- `delete_worksheet` - Delete worksheet from workbook
- `rename_worksheet` - Rename a worksheet

### Range Operations
- `copy_range` - Copy cell range to another location
- `delete_range` - Delete cell range contents
- `validate_excel_range` - Validate Excel range format
- `get_data_validation_info` - Get data validation rules for cell

### Row and Column Operations
- `insert_rows` - Insert rows into worksheet
- `insert_columns` - Insert columns into worksheet
- `delete_sheet_rows` - Delete rows from worksheet
- `delete_sheet_columns` - Delete columns from worksheet

For detailed tool documentation, see [TOOLS.md](TOOLS.md).

## Quick Start

### Stdio Transport (Recommended for local use)

```bash
uvx excel-mcp-server stdio
```

### Configuration for AI Assistants

```json
{
  "mcpServers": {
    "excel": {
      "command": "uvx",
      "args": ["excel-mcp-server", "stdio"]
    }
  }
}
```

## Installation

See [INSTALL.md](INSTALL.md) for detailed installation instructions for all transport methods.

## Dependencies

- `mcp[cli]>=1.10.1` - Model Context Protocol SDK
- `fastmcp>=2.0.0,<3.0.0` - FastMCP framework
- `openpyxl>=3.1.5` - Excel file manipulation library
- `typer>=0.16.0` - CLI framework

## Source

Originally from: https://github.com/haris-musa/excel-mcp-server

## License

MIT License - see [LICENSE](LICENSE) for details.