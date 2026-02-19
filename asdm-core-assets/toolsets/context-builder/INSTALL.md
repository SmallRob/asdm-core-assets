# Installation Guide for Context Builder

## Prerequisites

- ASDM Bootstrapper v1.0.0 or higher
- Python 3.8+ or Node.js 16+
- Git (for version control features)

## Installation Steps

### Using ASDM Bootstrapper

1. **Install the toolset**
   ```bash
   asdm-bootstrapper install context-builder
   ```

2. **Verify installation**
   ```bash
   asdm-toolset list | grep context-builder
   ```

3. **Initialize configuration**
   ```bash
   asdm-toolset init context-builder --workspace .
   ```

### Manual Installation

1. **Download the package**
   ```bash
   wget https://asdm.ai/repo/toolsets-repo/context-builder.zip
   ```

2. **Extract to toolsets directory**
   ```bash
   unzip context-builder.zip -d ~/.asdm/toolsets/
   ```

3. **Register with ASDM**
   ```bash
   asdm-toolset register context-builder
   ```

## Configuration

Create or edit the configuration file:

```bash
vim ~/.asdm/toolsets/context-builder/config.json
```

Example configuration:
```json
{
  "workspace": {
    "root": ".",
    "exclude_patterns": [
      "node_modules/**",
      "dist/**",
      ".git/**"
    ]
  },
  "analysis": {
    "max_depth": 10,
    "include_tests": false
  },
  "output": {
    "format": "json",
    "pretty_print": true
  }
}
```

## Environment Variables

- `ASDM_CONTEXT_BUILDER_DEBUG`: Enable debug logging (true/false)
- `ASDM_CONTEXT_BUILDER_MAX_FILES`: Maximum files to analyze (default: 1000)
- `ASDM_CONTEXT_BUILDER_TIMEOUT`: Timeout in seconds (default: 300)

## Verify Installation

Run a test analysis:

```bash
asdm-toolset exec context-builder --action analyze-workspace --path .
```

Expected output:
```
Context Builder v0.0.1
Analyzing workspace: /path/to/workspace
Found: 42 files
Analysis complete: context-analysis.json
```

## Troubleshooting

### Installation fails
- Ensure you have write permissions to `~/.asdm/toolsets/`
- Check that all prerequisites are installed
- Verify network connectivity for download

### Configuration errors
- Validate JSON syntax in config.json
- Check file paths are absolute or relative to workspace root
- Ensure exclude patterns use valid glob syntax

## Next Steps

- Review available actions in the `actions/` directory
- Customize configuration for your project
- Run your first context analysis
