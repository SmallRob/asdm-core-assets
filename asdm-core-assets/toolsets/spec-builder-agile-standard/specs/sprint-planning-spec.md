# Sprint Planning Specifications

## Purpose
Defines the process and guidelines for effective sprint planning in Agile teams.

## Sprint Planning Overview

### Objectives
1. Select backlog items for the sprint
2. Define sprint goal
3. Break down stories into tasks
4. Identify dependencies and risks
5. Establish team commitment

### Duration
- 2-week sprint: 2-4 hours
- 4-week sprint: 4-8 hours

### Participants
- Product Owner (required)
- Scrum Master (required)
- Development Team (required)
- Stakeholders (optional, for clarification)

## Pre-Planning Requirements

### Product Owner Preparation
- [ ] Backlog prioritized
- [ ] Stories refined and estimated
- [ ] Acceptance criteria clear
- [ ] Dependencies identified
- [ ] Sprint goal proposed

### Team Preparation
- [ ] Velocity calculated
- [ ] Capacity determined
- [ ] Previous retrospective reviewed
- [ ] Technical debt considered

## Capacity Planning

### Calculation Formula
```
Team Capacity = (Team Size × Days × Hours per Day) × Availability Factor

Example:
5 members × 10 days × 6 productive hours × 0.8 (availability) = 240 hours
Convert to story points based on historical velocity
```

### Availability Factors
- Vacation/time off: Reduce capacity
- Meetings: Reduce capacity
- Support duties: Reduce capacity
- Training: Reduce capacity
- Onboarding: Reduce capacity

### Buffer
Include 10-20% buffer for:
- Unforeseen issues
- Estimation uncertainty
- Mid-sprint requests

## Sprint Goal

### Characteristics
- **Specific**: Clear focus for the sprint
- **Measurable**: Can determine success
- **Achievable**: Within team capacity
- **Relevant**: Aligned with product vision
- **Time-bound**: For this sprint only

### Examples

#### Good Sprint Goals
✅ "Enable users to manage their profiles"
✅ "Improve application performance by 20%"
✅ "Implement core authentication features"

#### Bad Sprint Goals
❌ "Complete 10 user stories" (too vague)
❌ "Finish everything in the backlog" (unrealistic)
❌ "Work on various improvements" (no focus)

## Story Selection

### Criteria
1. **Priority**: Select highest priority items
2. **Capacity**: Stay within team capacity
3. **Dependencies**: Ensure dependencies are resolved
4. **Risk**: Balance risk across sprint
5. **Value**: Maximize user value

### Selection Process
1. Product Owner presents top priority items
2. Team discusses and asks clarifying questions
3. Team estimates any unestimated items
4. Team commits to what they can deliver
5. Document sprint backlog

## Task Breakdown

### Guidelines
- Tasks should be ≤ 1 day
- Include all work types: dev, test, documentation
- Identify dependencies between tasks
- Assign task owners

### Task Types
- Development
- Testing
- Code review
- Documentation
- Research/spike
- Deployment

### Example Breakdown
```
US-001: User Login (5 points)
├── Task 1: Design login UI (0.5 day) - Dev 1
├── Task 2: Implement API endpoint (1 day) - Dev 2
├── Task 3: Write unit tests (0.5 day) - Dev 1
├── Task 4: Integration testing (0.5 day) - QA
├── Task 5: Update documentation (0.5 day) - Dev 2
└── Task 6: Deploy to staging (0.5 day) - Dev 3
```

## Risk Assessment

### Categories
1. **Technical Risks**
   - New technology
   - Complex architecture
   - Performance concerns

2. **Dependency Risks**
   - External dependencies
   - Cross-team dependencies
   - Third-party services

3. **Resource Risks**
   - Team availability
   - Skill gaps
   - Knowledge sharing

### Mitigation Strategies
- Time-boxing uncertain work
- Spike stories for research
- Pair programming for knowledge transfer
- Buffer in capacity planning

## Sprint Backlog Format

```json
{
  "sprint": {
    "name": "Sprint 5",
    "start_date": "2024-01-15",
    "end_date": "2024-01-29",
    "goal": "Implement user authentication and profile management"
  },
  "capacity": {
    "total_hours": 240,
    "total_points": 30,
    "committed_points": 26,
    "buffer_points": 4
  },
  "stories": [
    {
      "id": "US-001",
      "title": "User Login",
      "points": 5,
      "priority": "high",
      "tasks": [
        {"id": "T-001", "title": "Design login UI", "hours": 4, "assignee": "Dev 1"}
      ]
    }
  ],
  "risks": [
    {
      "description": "API dependency on backend team",
      "impact": "high",
      "mitigation": "Coordinate early, have mock data fallback"
    }
  ]
}
```

## Definition of Ready

A story is ready for sprint when:
- [ ] Clearly defined
- [ ] Estimated by the team
- [ ] Acceptance criteria defined
- [ ] Dependencies resolved
- [ ] No blocking questions
- [ ] Fits in sprint timeframe

## Common Anti-Patterns

### Over-Commitment
❌ Team commits to more than capacity
✅ Use historical velocity for realistic planning

### Under-Commitment
❌ Team commits to less than capacity
✅ Have stretch goals ready

### Scope Creep
❌ Adding stories mid-sprint without removing others
✅ Protect sprint scope, negotiate with PO

### Missing Dependencies
❌ Stories selected with unresolved dependencies
✅ Identify and resolve dependencies during planning

## Success Metrics

### Planning Effectiveness
- Planned vs. actual velocity
- Sprint goal achievement rate
- Scope stability (stories added/removed)

### Team Health
- Team confidence level
- Sustainable pace
- Knowledge distribution

## Related Specifications
- [User Story Specification](user-story-spec.md)
- [Velocity Tracking Guide](velocity-tracking.md)
- [Definition of Ready](definition-of-ready.md)
