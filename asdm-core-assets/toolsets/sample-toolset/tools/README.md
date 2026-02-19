# Tools Directory

This directory contains utility tools that support the toolset functionality. These tools are designed to be called by agents in CLI environments.

## Structure

Each tool should have its own subdirectory with:
- `README.md`: Tool documentation
- `main.py` or `main.js`: Entry point
- `config.json`: Configuration (optional)
- `tests/`: Test suite (recommended)

## Guidelines

1. Tools should be self-contained
2. Each tool should have a single responsibility
3. Configuration should be externalized
4. Error handling should be robust
5. Logging should be configurable

## Example Tool Structure

```
{tool-name}/
├── README.md
├── main.py
├── config.json
└── tests/
    └── test_main.py
```
