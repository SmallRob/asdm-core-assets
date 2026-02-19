# Context Builder Tools

This directory contains utility tools for the Context Builder toolset.

## Available Tools

### file-analyzer
Analyzes individual files to extract metadata and structure information.

**Usage**:
```bash
python tools/file-analyzer/main.py --file path/to/file --output analysis.json
```

### dependency-mapper
Maps dependencies between files in the workspace.

**Usage**:
```bash
python tools/dependency-mapper/main.py --root . --output dependencies.json
```

### context-validator
Validates extracted context against the specification.

**Usage**:
```bash
python tools/context-validator/main.py --context context.json --report validation.md
```

## Tool Development Guidelines

1. Each tool should be self-contained
2. Provide clear usage documentation
3. Return structured JSON output
4. Support common flags (--help, --version, --verbose)
5. Include test cases

## Testing

Run tool tests:
```bash
pytest tools/*/tests/
```
