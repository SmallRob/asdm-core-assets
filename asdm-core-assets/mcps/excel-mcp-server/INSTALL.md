# Installation Guide

This guide covers installation and configuration for all supported transport methods.

## Prerequisites

- Python 3.10 or higher
- `uv` or `pip` package manager

## Installation Methods

### Option 1: Using uvx (Recommended)

The easiest way to run the Excel MCP Server is using `uvx`:

```bash
uvx excel-mcp-server stdio
```

### Option 2: Using pip

```bash
pip install excel-mcp-server
excel-mcp-server stdio
```

## Transport Methods

The server supports three transport methods for different use cases:

---

## 1. Stdio Transport (Recommended for Local Use)

**Best for**: Local AI assistant integration (Claude Desktop, Cursor, etc.)

### Running the Server

```bash
uvx excel-mcp-server stdio
```

### Configuration for AI Assistants

#### Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "excel": {
      "command": "uvx",
      "args": ["excel-mcp-server", "stdio"]
    }
  }
}
```

#### VS Code

Add to your VS Code settings.json:

```json
{
  "mcp": {
    "servers": {
      "excel": {
        "command": "uvx",
        "args": ["excel-mcp-server", "stdio"]
      }
    }
  }
}
```

#### Cursor

Add to your Cursor MCP configuration:

```json
{
  "mcpServers": {
    "excel": {
      "command": "uvx",
      "args": ["excel-mcp-server", "stdio"]
    }
  }
}
```

### File Path Handling (Stdio)

When using stdio transport, provide absolute file paths with each tool call. The server will use the path sent by the client for each operation.

**Example**:
```
filepath: "C:\\Users\\Documents\\data.xlsx"
filepath: "/home/user/documents/data.xlsx"
```

---

## 2. SSE Transport (Server-Sent Events - Deprecated)

**Note**: SSE transport is deprecated. Use streamable HTTP for remote connections.

### Running the Server

```bash
uvx excel-mcp-server sse
```

### Environment Variables

Set the following environment variables:

**Windows PowerShell**:
```powershell
$env:EXCEL_FILES_PATH="E:\MyExcelFiles"
$env:FASTMCP_PORT="8000"
uvx excel-mcp-server sse
```

**Linux/macOS**:
```bash
EXCEL_FILES_PATH=/path/to/excel_files FASTMCP_PORT=8000 uvx excel-mcp-server sse
```

### Configuration for AI Assistants

```json
{
  "mcpServers": {
    "excel": {
      "url": "http://localhost:8000/sse"
    }
  }
}
```

---

## 3. Streamable HTTP Transport (Recommended for Remote)

**Best for**: Remote server deployment, cloud hosting

### Running the Server

```bash
uvx excel-mcp-server streamable-http
```

### Environment Variables

**Windows PowerShell**:
```powershell
$env:EXCEL_FILES_PATH="E:\MyExcelFiles"
$env:FASTMCP_PORT="8000"
$env:FASTMCP_HOST="0.0.0.0"
uvx excel-mcp-server streamable-http
```

**Linux/macOS**:
```bash
EXCEL_FILES_PATH=/path/to/excel_files FASTMCP_PORT=8000 FASTMCP_HOST=0.0.0.0 uvx excel-mcp-server streamable-http
```

### Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `EXCEL_FILES_PATH` | Directory for Excel files (SSE/HTTP only) | `./excel_files` |
| `FASTMCP_PORT` | Server port | `8017` |
| `FASTMCP_HOST` | Server host binding | `0.0.0.0` |

### Configuration for AI Assistants

```json
{
  "mcpServers": {
    "excel": {
      "url": "http://localhost:8000/mcp"
    }
  }
}
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

RUN pip install excel-mcp-server

ENV EXCEL_FILES_PATH=/data
ENV FASTMCP_PORT=8000
ENV FASTMCP_HOST=0.0.0.0

EXPOSE 8000

CMD ["excel-mcp-server", "streamable-http"]
```

Build and run:

```bash
docker build -t excel-mcp-server .
docker run -p 8000:8000 -v /path/to/excel_files:/data excel-mcp-server
```

---

## Configuration Summary

| Transport | Use Case | File Path | Connection Type |
|-----------|----------|-----------|-----------------|
| stdio | Local AI assistants | Absolute path per call | Process communication |
| sse | Remote (deprecated) | Set `EXCEL_FILES_PATH` | HTTP/SSE |
| streamable-http | Remote servers | Set `EXCEL_FILES_PATH` | HTTP/MCP |

## Troubleshooting

### "Invalid filename" Error

**Problem**: When using stdio transport, you must provide absolute paths.

**Solution**: Use full paths like:
- Windows: `C:\Users\Documents\data.xlsx`
- Linux/macOS: `/home/user/documents/data.xlsx`

### "Permission denied" Error

**Problem**: Server cannot access the file directory.

**Solution**: 
- Check file permissions
- Ensure `EXCEL_FILES_PATH` is set correctly (SSE/HTTP only)
- On Windows, run terminal as administrator if needed

### Port Already in Use

**Problem**: Default port 8017 is already in use.

**Solution**: Set a different port:
```bash
FASTMCP_PORT=8007 uvx excel-mcp-server streamable-http
```

## Next Steps

After installation, see [TOOLS.md](TOOLS.md) for complete documentation of all available tools and their parameters.