based on the absolute path of the folder by user
refer to the following sample MCP server folder structure
asdm-core-assets/mcps/{mcp-server-id}/

Copy the specified files from the given folder to asdm-core-assets/mcps/{mcp-server-id}/
create or update README.md in asdm-core-assets/mcps/{mcp-server-id}/
create config.json in asdm-core-assets/mcps/{mcp-server-id}/ (if not exists)
update asdm-core-assets/mcps/mcps-registry.json

make sure you follow the following rules:
- make sure you read and analyze all files in the given path
- determine a best mcpId and description based on comprehensive analysis from the given folder path
- generate README.md with tree-view format showing all files in the MCP folder
- generate config.json with tool definitions extracted from the source code
- Do not create any other unnecessary files.

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
- githubUrl: GitHub repository URL of the MCP project
- description: brief description
- version: version number
- author: MCP contributors
- logoUrl: mcp logo url
- tags: MCP tags - keywords for categorization and search, array type
- category: MCP category
- configTemplates: configuration templates for different AI assistants (claude_desktop, vscode, cursor, docker)
- requiresApiKey: Indicates whether the MCP server requires an API key for authentication (true or false)
- isRecommended: Indicates whether this MCP server is recommended by the platform (true or false)
- githubStars: Number of stars on the GitHub repository - indicates popularity
- downloadCount: Total number of downloads for the MCP server package
- createdAt: Timestamp when the MCP server was first created/published (ISO 8601 format)
- updatedAt: Timestamp when the MCP server was last updated (ISO 8601 format)
- hubId: Unique identifier in the MCP Hub registry - UUID format
- isOfficialIntegration: Indicates whether this is an official integration maintained by the MCP team (true or false)
- isReferenceServer: Indicates whether this is a reference implementation for MCP best practices (true or false)
- isCommunityServer: Indicates whether this is a community-contributed MCP server (true or false)
- githubLatestCommit:SHA hash of the latest commit on the GitHub repository
- githubForks: Number of forks on the GitHub repository - indicates community engagement
- licenseType: Open source license type (e.g., MIT, Apache-2.0, GPL-3.0)

