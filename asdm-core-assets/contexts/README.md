# Context Spaces

This directory stores all context spaces processed by ASDM. Each context space represents a unified collection of resources that have been analyzed and structured for AI-assisted development.

## Directory Structure

Each context space is stored in its own directory with a unique GUID:

```
contexts/
├── contexts-registry.json    # Registry of all context spaces
└── {context-space-guid}/     # Individual context space
    ├── README.md              # Entry point for AI agents
    ├── manifest.json          # Metadata and structure
    └── {resource-guid}/       # Individual resources
        └── README.md          # Resource documentation
```

## Context Space Components

### README.md
The entry point for AI agents, providing:
- Overview of the context space
- Usage guidelines
- Key resources and their purposes
- Navigation instructions

### manifest.json
Structured metadata including:
- Data source type and connection info
- Synchronization status
- Update timestamps
- Internal file structure
- Authentication requirements (sanitized)

### Resource Directories
Each resource has its own directory containing:
- README.md with resource documentation
- Associated files and data
- Metadata specific to the resource

## Usage

### Accessing Context
AI agents can:
1. Read the context space README.md for guidance
2. Parse manifest.json for structured information
3. Access individual resources as needed

### Adding New Context Spaces
Use the Context Builder toolset to:
1. Analyze a workspace or data source
2. Extract relevant context
3. Build a context space
4. Synchronize with this repository

## Registry

The `contexts-registry.json` file tracks all context spaces with:
- GUID and name
- Source information
- Last update timestamp
- Status indicators

## Best Practices

1. **Keep context focused**: Each space should have a clear purpose
2. **Update regularly**: Sync with source changes
3. **Document thoroughly**: Help AI agents understand the context
4. **Maintain structure**: Follow the standard directory layout
5. **Clean up unused**: Remove obsolete context spaces

## Integration

Context spaces integrate with:
- ASDM Platform for sharing
- AI coding assistants for context injection
- Team collaboration features
- Version control for history

## Support

For questions or issues with context spaces, visit the [ASDM Platform](https://platform.asdm.ai).
