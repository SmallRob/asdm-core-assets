# Extract Context

## Description
Extracts meaningful context from specified files or directories in the workspace, generating structured output suitable for AI consumption.

## Usage
```
/extract-context [options]
```

## Parameters
- `--input`: Files or directories to extract context from (default: analyzed workspace)
- `--output`: Output file path (default: context.json)
- `--format`: Output format (json, yaml, markdown) (default: json)
- `--include-metadata`: Include file metadata in output (default: true)
- `--compress`: Compress output file (default: false)

## Examples

### Extract from analyzed workspace
```
/extract-context --output my-context.json
```

### Extract from specific files
```
/extract-context --input "src/**/*.ts" --output typescript-context.json
```

### Generate markdown documentation
```
/extract-context --format markdown --output context.md
```

## Output

The extracted context includes:

```json
{
  "metadata": {
    "extracted_at": "2024-01-01T00:00:00Z",
    "tool_version": "0.0.1",
    "workspace_root": "/path/to/workspace"
  },
  "files": [
    {
      "path": "src/index.ts",
      "language": "typescript",
      "size": 1024,
      "last_modified": "2024-01-01T00:00:00Z",
      "summary": "Main entry point of the application",
      "exports": ["main", "initialize"],
      "imports": ["express", "dotenv"]
    }
  ],
  "symbols": [
    {
      "name": "initialize",
      "type": "function",
      "file": "src/index.ts",
      "line": 15,
      "description": "Initialize the application",
      "parameters": [
        {"name": "config", "type": "Config"}
      ]
    }
  ],
  "relationships": [
    {
      "from": "src/index.ts",
      "to": "src/utils/logger.ts",
      "type": "import"
    }
  ]
}
```

## Best Practices

1. Run `/analyze-workspace` first to understand the workspace structure
2. Use exclusion patterns to avoid extracting context from generated files
3. Review the output to ensure relevant information is captured
4. Use `--format markdown` for human-readable documentation

## Related Actions
- `/analyze-workspace`: Analyze workspace before extraction
- `/build-context-space`: Create a complete context space from extracted context
