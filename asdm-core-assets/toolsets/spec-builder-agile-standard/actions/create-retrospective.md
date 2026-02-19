# Create Retrospective

## Description
Creates a structured retrospective document from team input, facilitating continuous improvement and team learning.

## Usage
```
/create-retrospective [options]
```

## Parameters
- `--sprint`: Sprint name or number (required)
- `--format`: Retrospective format (start-stop-continue, 4ls, mad-sad-glad) (default: start-stop-continue)
- `--date`: Retrospective date (default: sprint end date)
- `--facilitator`: Facilitator name
- `--output`: Output file path (default: specs/retrospective/retro-{date}.md)

## Examples

### Basic retrospective
```
/create-retrospective --sprint "Sprint 5"
```

### Specific format
```
/create-retrospective --sprint 5 --format 4ls --facilitator "John Doe"
```

### Custom date
```
/create-retrospective --sprint 5 --date 2024-01-29
```

## Output Format

### Start-Stop-Continue Format

```markdown
# Sprint 5 Retrospective

**Date**: January 29, 2024  
**Sprint**: Sprint 5  
**Facilitator**: John Doe  
**Participants**: [Team Members]

## Sprint Metrics
- **Committed Points**: 26
- **Completed Points**: 24
- **Completion Rate**: 92%
- **Bugs Found**: 3
- **Bugs Fixed**: 3

## Start ⭐

What should we start doing?

### Team Input
- **Developer 1**: Start doing code reviews before merging to main
- **Developer 2**: Start using feature branches for all work
- **Developer 3**: Start documenting architectural decisions
- **Developer 4**: Start pair programming on complex features
- **Developer 5**: Start tracking technical debt items

### Action Items
| Item | Owner | Due Date |
|------|-------|----------|
| Set up PR review checklist | Developer 1 | Feb 5, 2024 |
| Create branch naming convention doc | Developer 2 | Feb 3, 2024 |
| Create ADR template | Developer 3 | Feb 7, 2024 |

## Stop 🛑

What should we stop doing?

### Team Input
- **Developer 1**: Stop skipping unit tests for "simple" changes
- **Developer 2**: Stop having long standups (>15 min)
- **Developer 3**: Stop committing directly to main
- **Developer 4**: Stop overcommitting to sprint backlog

### Action Items
| Item | Owner | Due Date |
|------|-------|----------|
| Add pre-commit hooks for tests | Developer 1 | Feb 5, 2024 |
| Create standup timer | Developer 2 | Feb 3, 2024 |
| Protect main branch | Developer 3 | Feb 1, 2024 |

## Continue ✅

What should we continue doing?

### Team Input
- **Developer 1**: Continue the daily knowledge sharing sessions
- **Developer 2**: Continue using sprint boards effectively
- **Developer 3**: Continue the weekly tech talks
- **Developer 4**: Continue the bug bash sessions
- **Developer 5**: Continue documenting user stories well

### Action Items
| Item | Owner | Due Date |
|------|-------|----------|
| Schedule next month's tech talks | Developer 3 | Feb 10, 2024 |

## Themes & Insights

### What Went Well
1. **Improved velocity**: 92% completion rate, up from 85%
2. **Better communication**: Daily sync improved team coordination
3. **Quality focus**: Zero critical bugs in production

### What Could Be Improved
1. **Scope creep**: Added 2 stories mid-sprint
2. **Documentation lag**: Some features lack documentation
3. **Testing gaps**: Integration tests need improvement

## Action Plan

### High Priority
1. Implement code review checklist (Due: Feb 5)
2. Add pre-commit hooks (Due: Feb 5)
3. Protect main branch (Due: Feb 1)

### Medium Priority
1. Create ADR template (Due: Feb 7)
2. Improve test coverage (Ongoing)

### Low Priority
1. Schedule pair programming sessions (Due: Feb 15)

## Follow-up
- Review action items in next retrospective
- Track action item completion in sprint board
- Share summary with stakeholders

## Next Steps
- Schedule Sprint 6 retrospective for Feb 12
- Assign action item owners
- Update team working agreement
```

### 4Ls Format (Liked, Learned, Lacked, Longed For)

```markdown
# Sprint 5 Retrospective (4Ls)

## Liked 💚
What did you like about this sprint?
- Good team collaboration
- Clear sprint goal
- Effective code reviews

## Learned 📚
What did you learn this sprint?
- New testing framework
- Better estimation techniques
- Improved debugging skills

## Lacked 📉
What was lacking this sprint?
- Documentation
- Automated testing
- Time for refactoring

## Longed For 💭
What did you long for this sprint?
- More pair programming
- Better development environment
- Dedicated innovation time
```

### Mad-Sad-Glad Format

```markdown
# Sprint 5 Retrospective (Mad-Sad-Glad)

## Mad 😡
What made you mad?
- Production incident on day 3
- Unclear requirements on US-004
- Long deployment times

## Sad 😢
What made you sad?
- Missed sprint goal by 2 points
- Had to de-prioritize tech debt
- Team member unavailable

## Glad 😊
What made you glad?
- Successful feature launch
- Great team collaboration
- Positive user feedback
```

## Facilitation Tips

### Before the Retro
1. Gather sprint metrics
2. Prepare timeline of events
3. Set up collaborative board
4. Send pre-retro survey (optional)

### During the Retro
1. Set time limits for each section
2. Encourage all voices
3. Focus on actionable items
4. Assign owners and due dates

### After the Retro
1. Share summary with team
2. Track action items
3. Review in next retro
4. Update team processes

## Metrics Integration

Include sprint metrics:
- Velocity
- Completion rate
- Bug count
- Deployment frequency
- Lead time

## Related Actions
- `/plan-sprint`: Plan the next sprint
- `/create-user-story`: Create follow-up user stories
- `/generate-dod`: Update Definition of Done based on learnings
