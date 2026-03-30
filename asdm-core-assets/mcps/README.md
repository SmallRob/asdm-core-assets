# ASDM MCPs Repository

This directory contains MCP (Model Context Protocol) server resources collected and curated for the ASDM platform. These MCP servers provide extended capabilities for AI-assisted development workflows.

## Overview

MCP servers in this directory provide:
- External tool integrations
- Data source connectors
- API bridges
- Specialized processing capabilities
- Custom protocol handlers

## Directory Structure

```
mcps/
├── mcps-registry.json    # Registry file for Admin UI
└── {mcp-server-id}/      # Individual MCP server package
    ├── README.md         # Server overview and documentation
    └── config.json       # Default configuration template
```

## Available MCP Servers

Browse the `mcps-registry.json` file for a complete list of available MCP servers. Each entry includes:
- Server ID and name
- Version information
- Description and capabilities
- Installation instructions
- Configuration details

## Adding New MCP Servers

To add a new MCP server:

1. Use the `/asdm-import-mcp` command with the path to the MCP server source
2. Or manually:
   - Create a new directory under `mcps/` with a unique ID
   - Add `README.md` with server overview
   - Add `config.json` with default configuration
   - Update `mcps-registry.json` with new entry

### Manual Structure Example

```
mcps/
└── {mcp-server-id}/
    ├── README.md         # Overview, features, usage
    └── config.json       # Tool definitions and default config
```

## MCP Server Categories

### Data & Storage
- Database connectors (PostgreSQL, MySQL, MongoDB, etc.)
- File system handlers
- Cloud storage bridges

### Development Tools
- Version control integrations
- Build system connectors
- Testing frameworks

### AI & ML
- Model serving connectors
- Embedding providers
- Vector database handlers

### Productivity
- Document processors
- Communication platforms
- Project management tools

## Registry Format

The `mcps-registry.json` follows the same structure as other ASDM registries:

```json
{
  "version": "1.0.0",
  "dateCreated": "2026-03-24T00:00:00Z",
  "dateUpdated": "2026-03-24T00:00:00Z",
  "createdBy": "ASDM Platform",
  "updatedBy": "ASDM Platform",
  "mcps": [
    {
      "id": "unique-server-id",
      "guid": "uuid-v4",
      "name": "Display Name",
      "description": "Server description",
      "version": "1.0.0",
      "downloadUrl": "server-id.zip",
      "path": "server-id",
      "entryPoint": "server-id/README.md",
      "dateCreated": "2026-03-24T00:00:00Z",
      "dateUpdated": "2026-03-24T00:00:00Z",
      "createdBy": "ASDM Platform",
      "updatedBy": "ASDM Platform"
    }
  ]
}
```

## Integration

MCP servers integrate with:
- **ASDM Platform**: Discover and manage MCP servers
- **AI Coding Assistants**: Extend capabilities with external tools
- **Development Workflows**: Connect to data sources and services

## Transport Types

| Transport | Description | Use Case |
|-----------|-------------|----------|
| `stdio` | Standard input/output | Local CLI tools, Python/Node scripts |
| `sse` | Server-Sent Events | Web-based servers, real-time updates |
| `http` | HTTP/WebSocket | REST APIs, web services |

## Usage

1. Browse available servers in `mcps-registry.json`
2. Read the server's `README.md` for capabilities
3. Configure using `config.json` template
4. Integrate with your AI coding assistant

## Contributing

To contribute an MCP server:
1. Ensure the server follows MCP protocol standards
2. Add comprehensive documentation
3. Include configuration templates
4. Update the registry file
5. Submit a pull request

## Resources

- [MCP Specification](https://modelcontextprotocol.io/)
- [MCP GitHub Organization](https://github.com/modelcontextprotocol)
- [ASDM Platform](https://platform.asdm.ai)

## Support

For questions about MCP servers, visit [ASDM Platform](https://platform.asdm.ai).