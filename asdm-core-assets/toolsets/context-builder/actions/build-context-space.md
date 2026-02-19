# Build Context Space

## Description
Builds a complete context space from the extracted context, creating a structured repository suitable for sharing and synchronization with the ASDM platform.

## Usage
```
/build-context-space [options]
```

## Parameters
- `--name`: Name of the context space (required)
- `--input`: Input context file (default: context.json)
- `--output-dir`: Output directory (default: contexts/{name})
- `--description`: Description of the context space
- `--tags`: Comma-separated tags for categorization
- `--version`: Version of the context space (default: 1.0.0)

## Examples

### Build with basic options
```
/build-context-space --name my-project --description "My project context"
```

### Build with tags and custom output
```
/build-context-space --name my-project --tags "react,typescript,web" --output-dir ./my-contexts
```

### Build from specific context file
```
/build-context-space --name my-project --input custom-context.json
```

## Output Structure

Creates the following directory structure:

```
contexts/{context-space-guid}/
├── README.md              # Entry point with usage guidance
├── manifest.json          # Structured metadata
└── {resource-guid-1}/     # Resource subdirectory
    └── README.md          # Resource documentation
```

### manifest.json Example

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "my-project",
  "version": "1.0.0",
  "description": "My project context",
  "tags": ["react", "typescript", "web"],
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "data_source": {
    "type": "local",
    "path": "/path/to/workspace"
  },
  "sync_status": "local",
  "file_count": 42,
  "total_size": "1.5 MB"
}
```

## Validation

The action validates:
- Context space name is unique
- Input context file exists and is valid
- Required metadata is provided
- Output directory is writable

## Next Steps

After building the context space:
1. Review the generated README.md
2. Update manifest.json with additional metadata
3. Use `/sync-context` to synchronize with remote storage

## Related Actions
- `/extract-context`: Extract context before building
- `/sync-context`: Synchronize built context space
