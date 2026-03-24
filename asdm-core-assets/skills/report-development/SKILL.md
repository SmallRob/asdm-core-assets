# Report Development Skill

Generate report templates and implementations for various platforms and formats. Supports data tables, charts, PDF exports, Excel exports, and professional report solutions.

## Quick Start

```bash
# Generate a report
# Usage: bash scripts/generate-report.sh <report-name> [report-type] [framework] [output-dir]
bash scripts/generate-report.sh SalesReport table chartjs ./reports
```

**Parameters**:
- `report-name`: The name of the report (PascalCase, e.g., SalesReport, UserActivityReport)
- `report-type`: Optional report type (table, chart, pdf, excel, dashboard) - default: table
- `framework`: Optional framework (chartjs, echarts, ag-grid, datatables, itext, poi, jasperreports) - default: chartjs
- `output-dir`: Optional output directory (default: current directory)

**AI Agent Notes**:
- Report name should be PascalCase (e.g., SalesReport, ProductInventoryReport)
- Supports multiple report types: table, chart, pdf, excel, dashboard
- Follows framework-specific best practices
- Includes data fetching, formatting, and export capabilities

## Supported Report Types

| Type | Description | Frameworks |
|------|-------------|------------|
| table | Data tables with pagination, sorting, filtering | ag-grid, datatables |
| chart | Visual charts and graphs | chartjs, echarts |
| pdf | PDF document generation | itext, wkhtmltopdf, jasperreports |
| excel | Excel spreadsheet export | poi, exceljs |
| dashboard | Combined dashboard view | chartjs, echarts |

## Supported Frameworks

### Frontend Table
- **AG Grid**: Enterprise-grade JavaScript data grid
- **DataTables**: jQuery plugin for interactive tables

### Frontend Charts
- **Chart.js**: Simple and flexible charting library
- **ECharts**: Powerful charting and visualization library

### Backend PDF Generation
- **iText**: Java/C# PDF library
- **wkhtmltopdf**: Convert HTML to PDF using WebKit
- **JasperReports**: Open source reporting engine

### Backend Excel Generation
- **Apache POI**: Java library for Excel files
- **ExcelJS**: JavaScript library for Excel files

## Generated Report Structure

```
reports/
├── SalesReport/
│   ├── index.html      # Table view
│   ├── chart.html      # Chart view
│   ├── dashboard.html  # Combined dashboard
│   ├── SalesReport.js  # Data and logic
│   └── styles.css     # Custom styles
```

## Coding Standards

This skill follows these ASDM specifications:

### Required Specs

- **JavaScript General**: `.asdm/specs/javascript/` - Follow JavaScript naming conventions, ES6+ features
- **Frontend Framework**: `.asdm/specs/{framework}/` - Follow specific framework guidelines

### Naming Conventions

- **Report Files**: PascalCase (e.g., `SalesReport.js`, `UserActivityReport.html`)
- **Component Names**: PascalCase (e.g., `ReportTable`, `ChartWidget`)
- **CSS Classes**: kebab-case (e.g., `report-container`, `data-table`)
- **Constants**: UPPER_SNAKE_CASE for configuration objects

### Report Patterns

- Separate data layer from presentation layer
- Use proper data fetching and caching
- Implement proper error handling
- Support pagination for large datasets
- Include export functionality (PDF, Excel, CSV)
- Use responsive design for tables and charts

## Customization

- Modify chart types based on data visualization needs
- Adjust table columns and formatting
- Configure pagination options
- Add custom filters and search
- Implement drill-down reports
- Configure export options

## Integration Examples

### With Database Query
```bash
# Generate report with SQL data source
bash scripts/generate-report.sh UserActivityReport table ag-grid --datasource=sql
```

### With API Data
```bash
# Generate report fetching from REST API
bash scripts/generate-report.sh SalesReport chart echarts --datasource=api
```
