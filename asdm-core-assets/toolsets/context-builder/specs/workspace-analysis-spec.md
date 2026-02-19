# Workspace Analysis Specifications

## Purpose
Defines the specifications for workspace analysis functionality within the Context Builder toolset.

## Scope
This specification covers the analysis of workspace structure, file types, dependencies, and code organization.

## Analysis Components

### File System Analysis

#### File Statistics
- Total file count
- File type distribution
- File size statistics
- Last modified timestamps

#### Directory Structure
- Directory hierarchy
- Directory depth metrics
- Empty directories detection
- Symbolic link handling

#### Exclusion Patterns
Default exclusions:
- `node_modules/**`
- `dist/**`
- `build/**`
- `.git/**`
- `*.log`
- `*.lock`

### Code Analysis

#### Language Detection
- File extension mapping
- Shebang detection for scripts
- Configuration file recognition

#### Symbol Extraction
- Function definitions
- Class definitions
- Variable declarations
- Import/Export statements

#### Dependency Analysis
- Package dependencies (package.json, requirements.txt)
- Import relationships
- Module structure

### Metadata Collection

#### File Metadata
```json
{
  "path": "string",
  "size": "number",
  "created_at": "ISO 8601 datetime",
  "modified_at": "ISO 8601 datetime",
  "language": "string",
  "encoding": "string"
}
```

#### Project Metadata
```json
{
  "name": "string",
  "version": "string",
  "description": "string",
  "authors": ["array of strings"],
  "license": "string",
  "repository": "string"
}
```

## Performance Requirements

- **Small workspaces** (< 100 files): Complete in < 2 seconds
- **Medium workspaces** (100-1000 files): Complete in < 10 seconds
- **Large workspaces** (> 1000 files): Complete in < 60 seconds

## Output Format

### Analysis Report
```json
{
  "timestamp": "ISO 8601 datetime",
  "workspace_root": "string",
  "statistics": {
    "files": "number",
    "directories": "number",
    "total_size": "number in bytes"
  },
  "languages": {
    "language_name": "file_count"
  },
  "structure": {
    "directories": ["array of directory objects"],
    "file_tree": "nested object structure"
  },
  "dependencies": {
    "production": ["array"],
    "development": ["array"]
  },
  "recommendations": ["array of strings"]
}
```

## Error Handling

### File Access Errors
- Log inaccessible files
- Continue analysis of accessible files
- Report skipped files in output

### Encoding Errors
- Attempt UTF-8 decoding
- Fallback to binary detection
- Skip binary files with notification

### Memory Constraints
- Implement streaming for large files
- Limit concurrent file processing
- Provide progress updates

## Configuration

```json
{
  "max_file_size": 10485760,
  "max_files": 10000,
  "max_depth": 20,
  "follow_symlinks": false,
  "exclude_patterns": ["array of glob patterns"],
  "include_patterns": ["array of glob patterns"]
}
```

## Validation Rules

1. Workspace root must be a valid directory
2. User must have read permissions
3. Output path must be writable
4. Configuration must be valid JSON

## Extension Points

### Custom Analyzers
- Plugin interface for custom analysis
- Configuration-driven analyzer selection
- Priority-based execution

### Report Formats
- JSON (default)
- YAML
- Markdown
- Custom templates
