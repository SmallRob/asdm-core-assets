# Filesystem MCP Server

A Node.js server implementing Model Context Protocol (MCP) for filesystem operations. This is the official `@modelcontextprotocol/server-filesystem` package.

## Overview

This MCP server provides comprehensive filesystem operations for AI assistants, enabling secure file and directory manipulation with configurable access controls.

## Features

- **Read/Write Files**: Read text and media files, write new files or edit existing ones
- **Directory Operations**: Create, list, delete, and move directories
- **File Search**: Recursive search with pattern matching
- **Metadata Access**: Get detailed file information including size, timestamps, permissions
- **Dynamic Access Control**: Configure allowed directories via command-line or MCP Roots protocol

## Available Tools

| Tool | Description | Read-Only | Idempotent | Destructive |
|------|-------------|-----------|------------|-------------|
| `read_text_file` | Read file content as text | ✓ | - | - |
| `read_media_file` | Read image/audio files (base64) | ✓ | - | - |
| `read_multiple_files` | Read multiple files at once | ✓ | - | - |
| `write_file` | Create or overwrite a file | - | ✓ | ✓ |
| `edit_file` | Pattern-based selective editing | - | - | ✓ |
| `create_directory` | Create directory (idempotent) | - | ✓ | - |
| `list_directory` | List directory contents | ✓ | - | - |
| `list_directory_with_sizes` | List with file sizes | ✓ | - | - |
| `move_file` | Move/rename files or directories | - | - | - |
| `search_files` | Recursive file search | ✓ | - | - |
| `directory_tree` | Get JSON tree structure | ✓ | - | - |
| `get_file_info` | Get detailed file metadata | ✓ | - | - |
| `list_allowed_directories` | List accessible directories | ✓ | - | - |

## Tool Details

### read_text_file
Read the complete contents of a file as text.
```
Parameters:
- path: File path (string)
- head: Read only first N lines (optional)
- tail: Read only last N lines (optional)
```

### read_media_file
Read an image or audio file and return base64-encoded data.
```
Parameters:
- path: File path (string)
```

### read_multiple_files
Read multiple files simultaneously.
```
Parameters:
- paths: Array of file paths (string[])
```

### write_file
Create a new file or overwrite an existing file.
```
Parameters:
- path: File path (string)
- content: File content (string)
```

### edit_file
Make selective edits using pattern matching.
```
Parameters:
- path: File path (string)
- edits: Array of { oldText, newText } objects
- dryRun: Preview changes without applying (boolean, optional)
```

### create_directory
Create a new directory or ensure it exists.
```
Parameters:
- path: Directory path (string)
```

### list_directory
List directory contents with [FILE]/[DIR] prefixes.
```
Parameters:
- path: Directory path (string)
```

### list_directory_with_sizes
List directory contents with file sizes.
```
Parameters:
- path: Directory path (string)
- sortBy: Sort by "name" or "size" (optional)
```

### move_file
Move or rename a file or directory.
```
Parameters:
- source: Source path (string)
- destination: Destination path (string)
```

### search_files
Recursively search for files matching a pattern.
```
Parameters:
- path: Search root directory (string)
- pattern: Glob pattern to match (string)
- excludePatterns: Patterns to exclude (string[], optional)
```

### directory_tree
Get a recursive JSON tree structure of a directory.
```
Parameters:
- path: Directory path (string)
- excludePatterns: Patterns to exclude (string[], optional)
```

### get_file_info
Get detailed metadata for a file or directory.
```
Parameters:
- path: File or directory path (string)
```

### list_allowed_directories
List all directories the server is allowed to access.
```
Parameters: None
```

## Directory Structure

```
filesystem-mcp-server/
├── README.md           # This file - overview and tool documentation
├── INSTALL.md          # Installation and configuration guide
└── config.json         # Default configuration template
```

## Security Notes

- The server requires at least one allowed directory to operate
- All operations are restricted to configured directories
- Use `ro` (read-only) flag to prevent modifications
- Directory access can be dynamically updated via Roots protocol

## Source

This is a curated package based on:
- **Package**: `@modelcontextprotocol/server-filesystem`
- **Repository**: https://github.com/modelcontextprotocol/servers
- **License**: MIT

## Support

For issues and feature requests, visit the [ASDM Platform](https://platform.asdm.ai).