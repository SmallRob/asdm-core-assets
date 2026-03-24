based on the absolute path of the folder by user
refer to the following sample MCP server folder structure
asdm-core-assets/mcps/{mcp-server-id}/

copy all files and directories from the given folder to asdm-core-assets/mcps/{mcp-server-id}/
create or update README.md in asdm-core-assets/mcps/{mcp-server-id}/
create INSTALL.md in asdm-core-assets/mcps/{mcp-server-id}/ (if not exists)
create config.json in asdm-core-assets/mcps/{mcp-server-id}/ (if not exists)
update asdm-core-assets/mcps/mcps-registry.json

make sure you follow the following rules:
- make sure you read and analyze all files in the given path
- copy ALL files (including source code, documentation, configuration files, etc.) from the source folder to the target MCP directory
- determine a best mcpId and description based on comprehensive analysis from the given folder path
- preserve the original directory structure
- generate README.md with tree-view format showing all files in the MCP folder
- generate INSTALL.md with installation instructions for different transport methods (stdio, sse, http)
- generate config.json with tool definitions extracted from the source code

MCP registry entry must include the following fields (same structure as specs-registry.json):
- id: unique identifier (use folder name as id)
- guid: UUID v4 format
- name: display name
- description: comprehensive description
- version: version number (extract from package.json or pyproject.toml if available)
- downloadUrl: {mcp-id}.zip
- path: directory path (relative to mcps/)
- entryPoint: main documentation file (usually {mcp-id}/README.md)
- dateCreated: ISO 8601 date format (e.g., "2026-03-24T00:00:00Z")
- dateUpdated: ISO 8601 date format (e.g., "2026-03-24T00:00:00Z")
- createdBy: "ASDM Platform"
- updatedBy: "ASDM Platform"

Example registry entry:
{
  "id": "filesystem-mcp-server",
  "guid": "f1a2b3c4-d5e6-7890-abcd-ef1234567890",
  "name": "Filesystem MCP Server",
  "description": "Node.js MCP server for comprehensive filesystem operations - read/write files, manage directories, search files, and get file metadata with configurable access control",
  "version": "2026.1.14",
  "downloadUrl": "filesystem-mcp-server.zip",
  "path": "filesystem-mcp-server",
  "entryPoint": "filesystem-mcp-server/README.md",
  "dateCreated": "2026-03-24T00:00:00Z",
  "dateUpdated": "2026-03-24T00:00:00Z",
  "createdBy": "ASDM Platform",
  "updatedBy": "ASDM Platform"  
}

For config.json, include:
- name: MCP server name
- description: brief description
- version: version number
- transport: transport type (stdio, sse, or http)
- package: npm package name or pip package name
- tools: array of tool definitions with name, description, inputSchema, and annotations
- configTemplates: configuration templates for different AI assistants (claude_desktop, vscode, cursor, docker)