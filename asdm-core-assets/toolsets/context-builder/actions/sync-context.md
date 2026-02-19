# Sync Context

## Description
Synchronizes the local context space with remote storage, enabling sharing and backup of context data with the ASDM platform.

## Usage
```
/sync-context [options]
```

## Parameters
- `--context-id`: ID of the context space to sync (required)
- `--direction`: Sync direction (push, pull, bidirectional) (default: push)
- `--remote`: Remote storage URL (default: ASDM platform)
- `--force`: Force sync even with conflicts (default: false)
- `--dry-run`: Preview changes without syncing (default: false)

## Examples

### Push to remote
```
/sync-context --context-id my-project --direction push
```

### Pull from remote
```
/sync-context --context-id my-project --direction pull
```

### Bidirectional sync with preview
```
/sync-context --context-id my-project --direction bidirectional --dry-run
```

### Force sync with conflicts
```
/sync-context --context-id my-project --direction push --force
```

## Sync Process

1. **Validation**
   - Check context space exists locally
   - Verify authentication credentials
   - Validate manifest.json

2. **Conflict Detection**
   - Compare local and remote versions
   - Identify modified files
   - Generate conflict report

3. **Sync Execution**
   - Upload/download changed files
   - Update sync timestamps
   - Generate sync report

## Output

```json
{
  "status": "success",
  "context_id": "my-project",
  "direction": "push",
  "files_synced": 15,
  "files_added": 3,
  "files_updated": 10,
  "files_deleted": 2,
  "conflicts": [],
  "duration": "5.2s",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Conflict Resolution

When conflicts are detected:

```
{
  "status": "conflict",
  "conflicts": [
    {
      "file": "manifest.json",
      "local_version": "1.0.1",
      "remote_version": "1.0.2",
      "resolution": "manual"
    }
  ]
}
```

Use `--force` to overwrite remote or accept remote changes.

## Authentication

Configure authentication in `~/.asdm/config.json`:

```json
{
  "platform": {
    "url": "https://platform.asdm.ai",
    "api_key": "your-api-key-here"
  }
}
```

## Best Practices

1. Always use `--dry-run` first to preview changes
2. Resolve conflicts manually before syncing
3. Sync regularly to keep remote up-to-date
4. Use meaningful version numbers in manifest.json

## Related Actions
- `/build-context-space`: Build context space before syncing
- `/analyze-workspace`: Analyze workspace for updates
