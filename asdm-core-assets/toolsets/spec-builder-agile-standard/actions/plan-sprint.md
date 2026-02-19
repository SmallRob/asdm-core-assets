# Plan Sprint

## Description
Creates comprehensive sprint planning documentation including sprint goal, selected user stories, capacity planning, and risk assessment.

## Usage
```
/plan-sprint [options]
```

## Parameters
- `--sprint`: Sprint name or number (required)
- `--duration`: Sprint duration in days (default: 14)
- `--team-size`: Number of team members
- `--velocity`: Team velocity (story points per sprint)
- `--start-date`: Sprint start date (default: next Monday)
- `--output`: Output directory (default: specs/sprints/)

## Examples

### Basic sprint planning
```
/plan-sprint --sprint "Sprint 5"
```

### Detailed sprint planning
```
/plan-sprint --sprint "Sprint 5" --duration 14 --team-size 5 --velocity 30 --start-date 2024-01-15
```

### Quick sprint setup
```
/plan-sprint --sprint 5 --velocity 35
```

## Output Format

```markdown
# Sprint 5 Planning

## Sprint Overview
- **Sprint Name**: Sprint 5
- **Duration**: 14 days
- **Start Date**: January 15, 2024
- **End Date**: January 29, 2024
- **Sprint Goal**: Implement user authentication and profile management

## Team Capacity
| Team Member | Availability | Capacity (points) |
|-------------|--------------|-------------------|
| Developer 1 | 100%         | 8                 |
| Developer 2 | 80%          | 6                 |
| Developer 3 | 100%         | 8                 |
| Developer 4 | 60%          | 5                 |
| Developer 5 | 100%         | 8                 |
| **Total**   |              | **35**            |

## Selected User Stories

### High Priority
1. **US-001: User Login** (5 points) - Authentication
2. **US-002: Password Reset** (3 points) - Authentication
3. **US-003: User Profile** (8 points) - User Management

### Medium Priority
4. **US-004: Profile Picture Upload** (5 points) - User Management
5. **US-005: Account Settings** (5 points) - User Management

### Low Priority (Stretch Goals)
6. **US-006: Two-Factor Authentication** (8 points) - Security

**Total Committed**: 26 points  
**Stretch Goals**: 8 points  
**Buffer**: 1 point

## Sprint Backlog Breakdown

### Week 1 (Jan 15 - Jan 21)
| Day | Activities |
|-----|------------|
| Mon | Sprint Planning, US-001 Kickoff |
| Tue | US-001 Development |
| Wed | US-001 Development, US-002 Kickoff |
| Thu | US-002 Development |
| Fri | US-003 Kickoff, Code Review |

### Week 2 (Jan 22 - Jan 28)
| Day | Activities |
|-----|------------|
| Mon | US-003 Development |
| Tue | US-003 Development, US-004 Kickoff |
| Wed | US-004 Development |
| Thu | US-005 Development, Testing |
| Fri | Sprint Review Prep, Demo Rehearsal |

## Sprint Ceremonies

### Sprint Planning
- **Date**: January 15, 2024
- **Duration**: 2 hours
- **Participants**: Full team
- **Agenda**:
  1. Review product backlog (30 min)
  2. Select user stories (30 min)
  3. Break down tasks (45 min)
  4. Assign responsibilities (15 min)

### Daily Standup
- **Time**: 9:00 AM daily
- **Duration**: 15 minutes
- **Format**: What I did, What I'll do, Blockers

### Sprint Review
- **Date**: January 29, 2024
- **Duration**: 1 hour
- **Demo Items**: US-001, US-002, US-003, US-004, US-005

### Sprint Retrospective
- **Date**: January 29, 2024
- **Duration**: 1 hour
- **Format**: Start, Stop, Continue

## Risk Assessment
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Team member absence | High | Medium | Cross-training, documentation |
| Technical complexity | Medium | Low | Spike stories, timeboxing |
| Dependency delays | High | Low | Early coordination |

## Dependencies
- API endpoints from backend team (US-001, US-002)
- Design assets from UX team (US-004)
- QA availability for testing (All stories)

## Success Criteria
- [ ] All high-priority stories completed
- [ ] Sprint velocity achieved (26+ points)
- [ ] Zero critical bugs in demo
- [ ] Team satisfaction score > 4/5

## Notes
- Consider adding US-006 if team velocity exceeds expectations
- Schedule mid-sprint check-in with product owner
- Allocate time for technical debt reduction
```

## Capacity Calculation

Automatic capacity calculation based on:
- Team size × Points per developer
- Availability factors (vacations, meetings, support duties)
- Buffer for unknowns (typically 10-20%)

## Sprint Goal Guidelines

Good sprint goals are:
1. **Specific**: Clear and focused
2. **Measurable**: Achievable within sprint
3. **Relevant**: Aligned with product vision
4. **Valuable**: Delivers user value

## Related Actions
- `/create-user-story`: Create user stories for sprint
- `/create-retrospective`: Document sprint retrospective
- `/prioritize-backlog`: Prioritize remaining backlog items
