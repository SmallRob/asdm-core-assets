# Context Extraction Specifications

## Purpose
Defines specifications for extracting structured context from workspace files suitable for AI consumption.

## Extraction Philosophy

Context extraction follows these principles:
1. **Relevance**: Extract information meaningful to development tasks
2. **Completeness**: Capture enough detail for understanding
3. **Brevity**: Avoid unnecessary verbosity
4. **Structure**: Maintain clear organization

## Extraction Targets

### Code Files

#### JavaScript/TypeScript
Extract:
- Function signatures with JSDoc comments
- Class definitions and methods
- Interface/type definitions
- Export statements
- Import relationships
- Configuration objects

Example output:
```json
{
  "file": "src/utils/parser.ts",
  "type": "typescript",
  "exports": [
    {
      "name": "parseConfig",
      "type": "function",
      "signature": "(configPath: string) => Config",
      "description": "Parses configuration file and returns config object",
      "parameters": [
        {"name": "configPath", "type": "string", "description": "Path to config file"}
      ],
      "returns": {"type": "Config", "description": "Parsed configuration object"}
    }
  ]
}
```

#### Python
Extract:
- Function definitions with docstrings
- Class definitions and methods
- Module-level variables
- Import statements
- Decorator usage

#### Other Languages
Similar extraction patterns for:
- Java (classes, methods, annotations)
- Go (functions, structs, interfaces)
- Rust (functions, structs, traits)
- Ruby (classes, modules, methods)

### Configuration Files

#### JSON Files
- Full content for small files (< 1KB)
- Schema detection for larger files
- Key-value extraction

#### YAML Files
- Structure preservation
- Anchor and alias resolution
- Multi-document support

#### Environment Files
- Variable names (values redacted by default)
- Type inference from values
- Grouping by prefix

### Documentation Files

#### Markdown Files
- Header hierarchy
- Code blocks with language tags
- Link extraction
- Image references

#### README Files
- Project description
- Installation instructions
- Usage examples
- API documentation sections

## Extraction Rules

### Size Limits
- Single file limit: 100KB (configurable)
- Total context limit: 10MB
- Symbol limit per file: 500

### Content Filtering

#### Exclude by Default
- Minified files
- Generated files
- Lock files
- Binary files

#### Include by Pattern
- Source files (*.ts, *.js, *.py, etc.)
- Configuration files (*.json, *.yaml)
- Documentation (*.md)

### Deduplication
- Remove duplicate symbol definitions
- Merge similar documentation
- Consolidate import statements

## Output Schema

### File Context
```json
{
  "file": {
    "path": "string",
    "language": "string",
    "size": "number",
    "hash": "string (SHA-256)"
  },
  "content": {
    "summary": "string (AI-generated summary)",
    "symbols": ["array of symbol objects"],
    "imports": ["array of import objects"],
    "exports": ["array of export objects"],
    "dependencies": ["array of dependency strings"]
  },
  "metadata": {
    "extracted_at": "ISO 8601 datetime",
    "extraction_version": "string"
  }
}
```

### Complete Context
```json
{
  "metadata": {
    "workspace_root": "string",
    "extracted_at": "ISO 8601 datetime",
    "tool_version": "string",
    "total_files": "number",
    "total_size": "number"
  },
  "files": ["array of file contexts"],
  "symbols_index": {
    "symbol_name": {
      "file": "string",
      "line": "number",
      "type": "string"
    }
  },
  "dependency_graph": {
    "nodes": ["array of file paths"],
    "edges": [
      {
        "from": "string",
        "to": "string",
        "type": "import|reference"
      }
    ]
  }
}
```

## Quality Metrics

### Completeness Score
- Files processed: ratio
- Symbols extracted: ratio
- Documentation coverage: ratio

### Relevance Score
- Useful symbols: ratio
- Referenced symbols: ratio

## Performance Requirements

- Process 100 files/second minimum
- Memory usage < 500MB for large workspaces
- Progress reporting every 50 files

## Error Handling

### Parsing Errors
- Continue with partial extraction
- Log errors with file and line number
- Include error summary in output

### Encoding Errors
- Attempt multiple encodings (UTF-8, Latin-1)
- Skip files with undetectable encoding
- Report skipped files

## Configuration

```json
{
  "extraction": {
    "max_file_size": 102400,
    "max_total_size": 10485760,
    "include_patterns": ["**/*.ts", "**/*.js", "**/*.py"],
    "exclude_patterns": ["**/*.min.js", "**/dist/**"],
    "summarize_large_files": true,
    "include_comments": true,
    "include_private_symbols": false
  }
}
```
