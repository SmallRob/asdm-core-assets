# Generate Definition of Done

## Description
Generates a Definition of Done (DoD) checklist tailored to specific deliverable types, ensuring quality and consistency across the team.

## Usage
```
/generate-dod [options]
```

## Parameters
- `--type`: Deliverable type (feature, bugfix, release, spike) (default: feature)
- `--team`: Team name for customization
- `--strict`: Include strict quality gates (default: false)
- `--output`: Output file path (default: specs/dod/{type}-dod.md)

## Examples

### Feature DoD
```
/generate-dod --type feature
```

### Strict bugfix DoD
```
/generate-dod --type bugfix --strict
```

### Release DoD
```
/generate-dod --type release --team "Alpha Team"
```

## Output Format

### Feature Definition of Done

```markdown
# Definition of Done: Feature

## Code Quality
- [ ] Code follows team coding standards
- [ ] Code has been peer reviewed
- [ ] No compiler warnings
- [ ] No code duplication (DRY principle)
- [ ] Code is self-documenting with clear naming
- [ ] Complex logic has inline comments

## Testing
- [ ] Unit tests written and passing
- [ ] Unit test coverage ≥ 80%
- [ ] Integration tests passing
- [ ] End-to-end tests updated (if applicable)
- [ ] Manual testing completed
- [ ] Regression tests passing

## Documentation
- [ ] API documentation updated
- [ ] README updated (if applicable)
- [ ] User documentation updated
- [ ] Changelog entry added
- [ ] Inline code comments for complex logic

## Performance
- [ ] Performance impact assessed
- [ ] No significant performance degradation
- [ ] Load testing completed (if applicable)
- [ ] Memory leak check passed

## Security
- [ ] Security review completed
- [ ] No sensitive data in logs
- [ ] Input validation implemented
- [ ] Authentication/authorization verified

## Deployment
- [ ] Feature flag implemented (if applicable)
- [ ] Database migrations tested
- [ ] Backward compatible
- [ ] Deployed to staging environment
- [ ] Smoke tests passing in staging
- [ ] Rollback plan documented

## Acceptance Criteria
- [ ] All acceptance criteria met
- [ ] Product owner approval
- [ ] UX review completed (if applicable)

## Team Agreements
- [ ] Technical debt identified and logged
- [ ] Knowledge shared with team
- [ ] Demo prepared for sprint review
```

### Bugfix Definition of Done

```markdown
# Definition of Done: Bugfix

## Root Cause Analysis
- [ ] Root cause identified
- [ ] Root cause documented in ticket
- [ ] Similar issues checked in other areas

## Code Quality
- [ ] Fix follows team coding standards
- [ ] Code has been peer reviewed
- [ ] Fix is minimal and focused
- [ ] No regression introduced

## Testing
- [ ] Bug reproduced in test environment
- [ ] Fix verified in test environment
- [ ] Regression tests added
- [ ] Unit tests for fix written
- [ ] Edge cases tested

## Documentation
- [ ] Bug details documented
- [ ] Fix explanation added to PR
- [ ] Changelog entry added

## Verification
- [ ] Fix verified by QA
- [ ] Fix verified by reporter
- [ ] No side effects identified

## Deployment
- [ ] Deployed to staging
- [ ] Verified in staging
- [ ] Production deployment plan ready
```

### Release Definition of Done

```markdown
# Definition of Done: Release

## Pre-Release
- [ ] All features completed and tested
- [ ] All bugs fixed or deferred with approval
- [ ] Release notes prepared
- [ ] Documentation updated
- [ ] User communication prepared

## Quality Assurance
- [ ] Full regression suite passing
- [ ] Performance benchmarks met
- [ ] Security scan completed
- [ ] Accessibility testing completed
- [ ] Cross-browser testing completed

## Deployment
- [ ] Deployment checklist ready
- [ ] Rollback plan tested
- [ ] Monitoring alerts configured
- [ ] On-call support identified
- [ ] Deployment window confirmed

## Post-Release
- [ ] Production smoke tests passing
- [ ] Monitoring dashboards checked
- [ ] User feedback channels open
- [ ] Support team briefed
- [ ] Retrospective scheduled
```

### Spike Definition of Done

```markdown
# Definition of Done: Spike

## Research
- [ ] Research objectives defined
- [ ] Timebox respected
- [ ] Findings documented

## Deliverables
- [ ] Technical approach documented
- [ ] Prototype/demo created (if applicable)
- [ ] Risks identified
- [ ] Recommendations made

## Knowledge Sharing
- [ ] Team presentation completed
- [ ] Wiki/documentation updated
- [ ] Follow-up stories created
```

## Customization

### Team-Specific Additions

```json
{
  "team": "Alpha Team",
  "custom_items": [
    "Demo recording uploaded to shared drive",
    "Accessibility score ≥ 90",
    "Mobile responsiveness verified"
  ]
}
```

### Strict Mode Additions

When `--strict` flag is enabled:
- Code coverage ≥ 95%
- Performance benchmarks documented
- Security penetration testing
- Architecture review completed

## Integration

DoD can be integrated with:
- CI/CD pipelines (automated checks)
- Code review tools (checklist automation)
- Project management tools (status requirements)

## Best Practices

1. **Team Agreement**: All team members should agree on DoD
2. **Regular Review**: Review and update DoD periodically
3. **Enforce Consistently**: Apply DoD to all work items
4. **Automate Where Possible**: Use CI/CD for automated checks

## Related Actions
- `/create-user-story`: Create user stories with DoD
- `/plan-sprint`: Include DoD in sprint planning
