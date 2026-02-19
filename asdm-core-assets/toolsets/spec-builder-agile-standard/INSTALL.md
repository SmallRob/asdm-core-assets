# Installation Guide for Spec Builder for Agile Team

## Prerequisites

- ASDM Bootstrapper v1.0.0 or higher
- Python 3.8+ or Node.js 16+
- Git (for version control features)
- Markdown editor (recommended)

## Installation Steps

### Using ASDM Bootstrapper

1. **Install the toolset**
   ```bash
   asdm-bootstrapper install spec-builder-agile-standard
   ```

2. **Verify installation**
   ```bash
   asdm-toolset list | grep spec-builder
   ```

3. **Initialize configuration**
   ```bash
   asdm-toolset init spec-builder-agile-standard --workspace .
   ```

### Manual Installation

1. **Download the package**
   ```bash
   wget https://asdm.ai/repo/toolsets-repo/spec-builder-agile-standard.zip
   ```

2. **Extract to toolsets directory**
   ```bash
   unzip spec-builder-agile-standard.zip -d ~/.asdm/toolsets/
   ```

3. **Register with ASDM**
   ```bash
   asdm-toolset register spec-builder-agile-standard
   ```

## Configuration

Create or edit the configuration file:

```bash
vim ~/.asdm/toolsets/spec-builder-agile-standard/config.json
```

Example configuration:
```json
{
  "team": {
    "name": "Development Team Alpha",
    "size": 5,
    "velocity": 30
  },
  "sprint": {
    "duration_days": 14,
    "ceremonies": ["planning", "daily", "review", "retro"]
  },
  "templates": {
    "user_story": "standard",
    "acceptance_criteria": "gherkin",
    "retrospective": "start-stop-continue"
  },
  "integration": {
    "jira": {
      "enabled": false,
      "url": "",
      "project_key": ""
    }
  }
}
```

## Project Structure

After initialization, create the following directory structure:

```
specs/
├── epics/
│   └── epic-001-authentication.md
├── user-stories/
│   ├── US-001-login.md
│   └── US-002-registration.md
├── sprints/
│   └── sprint-001.md
├── retrospective/
│   └── retro-2024-01-15.md
└── dod/
    └── feature-dod.md
```

## Environment Variables

- `ASDM_SPEC_BUILDER_TEAM_NAME`: Team name
- `ASDM_SPEC_BUILDER_SPRINT_DURATION`: Sprint duration in days
- `ASDM_SPEC_BUILDER_TEMPLATE_PATH`: Custom template directory

## Verify Installation

Run a test command:

```bash
asdm-toolset exec spec-builder-agile-standard --action create-user-story --title "Test Story"
```

Expected output:
```
Spec Builder v0.0.1
Creating user story: Test Story
Template: standard
Output: specs/user-stories/US-001-test-story.md
User story created successfully
```

## Integration Setup

### Jira Integration

1. Enable Jira in configuration:
   ```json
   "jira": {
     "enabled": true,
     "url": "https://your-company.atlassian.net",
     "project_key": "PROJ"
   }
   ```

2. Set up authentication:
   ```bash
   export JIRA_API_TOKEN="your-api-token"
   export JIRA_EMAIL="your-email@company.com"
   ```

3. Test connection:
   ```bash
   asdm-toolset exec spec-builder-agile-standard --action test-jira-connection
   ```

### Git Integration

1. Initialize Git repository:
   ```bash
   git init
   ```

2. Configure commit hooks:
   ```bash
   asdm-toolset exec spec-builder-agile-standard --action setup-git-hooks
   ```

## Customization

### Custom Templates

1. Create templates directory:
   ```bash
   mkdir -p .asdm/templates/spec-builder
   ```

2. Add custom templates:
   ```bash
   cp custom-user-story.md .asdm/templates/spec-builder/user-story.md
   ```

3. Update configuration:
   ```json
   "templates": {
     "user_story": "custom",
     "custom_path": ".asdm/templates/spec-builder"
   }
   ```

## Troubleshooting

### Installation Issues
- Ensure all prerequisites are installed
- Check file permissions
- Verify network connectivity

### Configuration Errors
- Validate JSON syntax
- Check file paths exist
- Ensure API tokens are valid

### Template Errors
- Verify template file exists
- Check template syntax
- Ensure template variables are valid

## Next Steps

1. Create your first user story
2. Set up sprint planning
3. Configure team velocity tracking
4. Integrate with your project management tool
