# MCP Timeserver

A simple MCP server that exposes datetime information to agentic systems and chat REPLs.

## Overview

**MCP Timeserver** is a Python-based Model Context Protocol (MCP) server that provides date and time information to LLM-powered applications. It implements both resources and tools for accessing current time in various timezones.

## Features

- **Timezone Resources**: Access current time for any timezone via `datetime://` URI scheme
- **Tool Integration**: Get current local time through a simple tool call
- **Multiple Timezones**: Supports all available system timezones
- **Lightweight**: Minimal dependencies with Python 3.12+

## Directory Structure

```
mcp-timeserver/
├── src/
│   └── mcp_timeserver/
│       ├── __init__.py          # Package entry point
│       └── server.py            # Main server implementation
├── LICENSE                      # MIT License
├── pyproject.toml              # Project configuration
├── README.md                   # This file
├── INSTALL.md                  # Installation guide
└── config.json                 # Tool configurations
```

## Components

### Resources

The server implements a `datetime://` URI scheme for accessing the current date/time in a given timezone:

```
datetime://Africa/Freetown/now
datetime://Europe/London/now
datetime://America/New_York/now
datetime://Asia/Shanghai/now
```

### Tools

The server exposes one tool:

#### `get-current-time`

Get the current time in the configured local timezone.

**Example:**
```python
>>> get_current_time()
"The current time is 2024-12-18 19:59:36"
```

**Parameters:** None

**Returns:** Current date/time string in `YYYY-MM-DD HH:MM:SS` format

## Requirements

- Python 3.12 or higher
- `mcp` >= 1.1.2
- `tzdata` >= 2024.2

## Installation

See [INSTALL.md](./INSTALL.md) for detailed installation instructions.

## Configuration

See [config.json](./config.json) for tool definitions and configuration templates for various AI assistants.

## License

MIT License - See [LICENSE](./LICENSE) for details.

## Author

TerminalMan (84923604+SecretiveShell@users.noreply.github.com)

## Links

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Glama.ai MCP Server Directory](https://glama.ai/mcp/servers/tth5eto5n7)