# Installation Guide - Filesystem MCP Server

This guide covers installation and configuration for the Filesystem MCP Server (`@modelcontextprotocol/server-filesystem`).

## Prerequisites

- Node.js 18.0.0 or higher
- npm or npx
- For Docker installation: Docker Desktop

## Installation Methods

### Method 1: NPX (Recommended)

The simplest way to use this MCP server is via npx, which downloads and runs the package on demand.

#### Claude Desktop Configuration

Edit your `claude_desktop_config.json`:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Desktop",
        "/path/to/other/allowed/dir"
      ]
    }
  }
}
```

#### VS Code Configuration

Add to your VS Code MCP settings:

```json
{
  "servers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "${workspaceFolder}"
      ]
    }
  }
}
```

#### Cursor/Windsurf Configuration

Add to your MCP configuration file:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/your/project"
      ]
    }
  }
}
```

### Method 2: Docker

For isolated and reproducible environments.

#### Build Docker Image

```bash
docker build -t mcp/filesystem -f src/filesystem/Dockerfile .
```

Or pull from registry (if available).

#### Claude Desktop Configuration (Docker)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--mount", "type=bind,src=/Users/username/Desktop,dst=/projects/Desktop",
        "--mount", "type=bind,src=/path/to/other/dir,dst=/projects/other,ro",
        "mcp/filesystem",
        "/projects"
      ]
    }
  }
}
```

#### VS Code Configuration (Docker)

```json
{
  "servers": {
    "filesystem": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--mount", "type=bind,src=${workspaceFolder},dst=/projects/workspace",
        "mcp/filesystem",
        "/projects"
      ]
    }
  }
}
```

### Method 3: Global Installation

Install the package globally:

```bash
npm install -g @modelcontextprotocol/server-filesystem
```

Then configure:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "mcp-server-filesystem",
      "args": [
        "/path/to/allowed/dir1",
        "/path/to/allowed/dir2"
      ]
    }
  }
}
```

## Directory Access Control

### Static Configuration (Command-line)

Specify allowed directories as command-line arguments:

```json
{
  "args": [
    "-y",
    "@modelcontextprotocol/server-filesystem",
    "/Users/username/projects",
    "/Users/username/documents"
  ]
}
```

### Dynamic Configuration (Roots Protocol)

For clients supporting MCP Roots protocol, directories can be updated dynamically without restarting the server.

### Read-Only Access

Use Docker `ro` flag or configure at the filesystem level:

```json
{
  "args": [
    "run", "-i", "--rm",
    "--mount", "type=bind,src=/path/to/readonly,dst=/projects/readonly,ro",
    "mcp/filesystem",
    "/projects"
  ]
}
```

## Transport Type

This server uses **stdio** transport:
- Communication via standard input/output
- Best for local CLI tools and Node.js scripts
- No network configuration required

## Environment Variables

No environment variables are required for basic usage.

## Verification

After configuration, verify the server is working:

1. Restart your AI coding assistant
2. Ask it to list files in a configured directory
3. Try reading a file: "Read the contents of README.md"

Example prompt:
```
List all files in my project directory and read the package.json file.
```

## Troubleshooting

### Server fails to start

- Ensure Node.js 18+ is installed
- Check that specified directories exist
- Verify directory paths are absolute (not relative)

### Permission denied errors

- Check file system permissions
- Ensure the user running the AI assistant has access to the directories
- On macOS, grant Full Disk Access if needed

### Paths not accessible

- Verify the paths in your configuration match the actual directories
- Use forward slashes `/` even on Windows
- Ensure no trailing slashes in paths

## Quick Install Links

- [VS Code Stable](https://insiders.vscode.dev/redirect/mcp/install?name=filesystem&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40modelcontextprotocol%2Fserver-filesystem%22%2C%22%24%7BworkspaceFolder%7D%22%5D%7D)
- [VS Code Insiders](https://insiders.vscode.dev/redirect/mcp/install?name=filesystem&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40modelcontextprotocol%2Fserver-filesystem%22%2C%22%24%7BworkspaceFolder%7D%22%5D%7D&quality=insiders)

## Additional Resources

- [MCP Specification](https://modelcontextprotocol.io/)
- [Official Repository](https://github.com/modelcontextprotocol/servers)
- [ASDM Platform](https://platform.asdm.ai)