# Analyze Workspace

## Description
Analyzes the structure and content of the current workspace to understand its composition and prepare for context extraction.

## Usage
```
/analyze-workspace [options]
```

## Parameters
- `--path`: Path to the workspace root (default: current directory)
- `--exclude`: Comma-separated list of patterns to exclude
- `--include-hidden`: Include hidden files and directories (default: false)
- `--max-depth`: Maximum directory traversal depth (default: 10)

## Examples

### Analyze current directory
```
/analyze-workspace
```

### Analyze specific path with exclusions
```
/analyze-workspace --path /path/to/project --exclude "node_modules,dist,.git"
```

### Deep analysis including hidden files
```
/analyze-workspace --include-hidden --max-depth 20
```

## Output

The action produces a JSON report with the following structure:

```json
{
  "summary": {
    "total_files": 150,
    "total_directories": 25,
    "total_size": "2.5 MB",
    "file_types": {
      ".js": 45,
      ".ts": 30,
      ".json": 20,
      ".md": 15
    }
  },
  "structure": {
    "directories": [
      {
        "path": "src",
        "file_count": 80,
        "description": "Source code directory"
      }
    ]
  },
  "dependencies": {
    "production": 15,
    "development": 8
  },
  "recommendations": [
    "Consider adding a README.md to the utils directory",
    "Large file detected: assets/large-image.png (5 MB)"
  ]
}
```

## Next Steps
After analysis, use `/extract-context` to extract meaningful context from the workspace.
