# Spec Builder Tools

This directory contains utility tools for the Spec Builder for Agile Team toolset.

## Available Tools

### story-estimator
Helps estimate story points using various estimation techniques.

**Usage**:
```bash
python tools/story-estimator/main.py --story "US-001" --method planning-poker
```

### sprint-metrics
Calculates and visualizes sprint metrics including velocity trends.

**Usage**:
```bash
python tools/sprint-metrics/main.py --sprint "Sprint 5" --output metrics.json
```

### backlog-analyzer
Analyzes backlog health and provides recommendations.

**Usage**:
```bash
python tools/backlog-analyzer/main.py --input backlog.json --report backlog-health.md
```

### retro-analyzer
Analyzes retrospective data to identify patterns and trends.

**Usage**:
```bash
python tools/retro-analyzer/main.py --retros retro/*.md --output trends.json
```

## Tool Development Guidelines

1. Each tool should be self-contained
2. Provide clear usage documentation
3. Return structured JSON output
4. Support common flags (--help, --version, --verbose)
5. Include test cases

## Integration

These tools can be integrated with:
- Jira API
- GitHub Projects
- Azure DevOps
- Trello

## Testing

Run tool tests:
```bash
pytest tools/*/tests/
```
