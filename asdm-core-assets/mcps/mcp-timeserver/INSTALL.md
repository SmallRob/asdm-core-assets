# Installation Guide - MCP Timeserver

This guide provides detailed installation instructions for the MCP Timeserver.

## Prerequisites

- Python 3.12 or higher
- `uv` package manager (recommended) or `pip`

## Installation Methods

### Method 1: Using uvx (Recommended)

The easiest way to install and run MCP Timeserver is using `uvx`:

```bash
uvx mcp-timeserver
```

This will automatically install and run the server.

### Method 2: Using pip

Install the package globally:

```bash
pip install mcp-timeserver
```

Then run:
```bash
mcp-timeserver
```

### Method 3: From Source

1. Clone or download the MCP Timeserver files
2. Navigate to the `mcp-timeserver` directory
3. Install dependencies:

```bash
pip install -e .
```

Or using `uv`:
```bash
uv pip install -e .
```

## Transport Methods

MCP Timeserver supports the **stdio** transport method.

### Stdio Transport (Default)

The server communicates via standard input/output streams. This is the default and most common method for MCP servers.

## Configuration for AI Assistants

### Claude Desktop

Add the following to your Claude Desktop configuration file:

**Location:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Configuration:**
```json
{
  "mcpServers": {
    "mcp-timeserver": {
      "command": "uvx",
      "args": ["mcp-timeserver"]
    }
  }
}
```

### VS Code (Copilot)

Add to your VS Code MCP settings:

**Using uvx:**
```json
{
  "mcp.servers": {
    "mcp-timeserver": {
      "command": "uvx",
      "args": ["mcp-timeserver"],
      "type": "stdio"
    }
  }
}
```

**Using pip installation:**
```json
{
  "mcp.servers": {
    "mcp-timeserver": {
      "command": "mcp-timeserver",
      "type": "stdio"
    }
  }
}
```

### Cursor

Add to your Cursor MCP configuration:

```json
{
  "mcpServers": {
    "mcp-timeserver": {
      "command": "uvx",
      "args": ["mcp-timeserver"]
    }
  }
}
```

## Verification

To verify the installation is working:

1. Restart your AI assistant after configuration
2. Ask the assistant to "get the current time"
3. The assistant should use the `get-current-time` tool

## Troubleshooting

### Error: Command not found

If you get "command not found" errors:
- Ensure `uvx` is installed and in your PATH
- Try using the full path: `python -m mcp_timeserver`

### Error: Module not found

If Python cannot find the module:
- Verify Python 3.12+ is installed: `python --version`
- Install using pip: `pip install mcp-timeserver`

### Timezone Issues

If timezone resources are not working:
- Ensure `tzdata` package is installed: `pip install tzdata`
- On some systems, you may need to install system timezone data

## Dependencies

The server requires the following packages (automatically installed):
- `mcp >= 1.1.2` - Model Context Protocol SDK
- `tzdata >= 2024.2` - Timezone data

## Additional Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Python zoneinfo documentation](https://docs.python.org/3/library/zoneinfo.html)