# Action Tool 002

## Description
This is another example action that demonstrates different capabilities of ASDM toolsets.

## Usage
```
/action-tool-002 [command] [options]
```

## Commands
- `init`: Initialize a new project
- `build`: Build the project
- `deploy`: Deploy the project

## Parameters
- `--env`: Environment (development, staging, production)
- `--verbose`: Enable verbose output
- `--dry-run`: Simulate without making changes

## Examples

### Initialize a project
```
/action-tool-002 init --env development
```

### Build with verbose output
```
/action-tool-002 build --verbose
```

### Deploy to staging (dry run)
```
/action-tool-002 deploy --env staging --dry-run
```

## Related Specifications
See [specs4action002.md](../specs/specs4action002.md) for detailed specifications.

## Error Handling
The action handles errors gracefully and provides meaningful error messages:

```
Error: Configuration file not found
Solution: Run 'init' command first to create configuration
```
