# User Story Specifications

## Purpose
Defines the standard format and guidelines for creating user stories that align with Agile best practices.

## User Story Format

### Standard Format
```
As a <role>
I want <feature>
So that <benefit>
```

### Components

#### Role
- **Who** is the user?
- Must be specific (e.g., "registered user", "admin", "guest")
- Avoid generic terms like "user" when possible

#### Feature
- **What** does the user want to do?
- Must be actionable and testable
- Focus on outcome, not implementation

#### Benefit
- **Why** does the user want this?
- Must provide clear value
- Should be measurable when possible

## Acceptance Criteria

### Format Options

#### Gherkin (BDD)
```
Given [precondition]
When [action]
Then [expected result]
```

#### Simple Checklist
```
- [ ] Criteria 1
- [ ] Criteria 2
```

### Guidelines

1. **Specific**: Each criterion should be testable
2. **Independent**: Criteria should not overlap
3. **Complete**: Cover all scenarios
4. **Clear**: No ambiguity

## INVEST Criteria

### Independent
- Can be delivered separately
- No dependencies on other stories
- Can be reordered

### Negotiable
- Details can be discussed
- Not a contract
- Open to refinement

### Valuable
- Delivers user value
- Stakeholder wants it
- Supports business goals

### Estimable
- Team can estimate effort
- Scope is clear
- Technical approach understood

### Small
- Completable in one sprint
- Typically ≤ 8 story points
- Can be broken down if larger

### Testable
- Clear acceptance criteria
- Can verify completion
- Has success conditions

## Story Points Estimation

### Scale (Fibonacci)
1, 2, 3, 5, 8, 13, 21, 34, 55

### Guidelines
- **1-2**: Trivial, < 1 day
- **3-5**: Small, 1-3 days
- **8**: Medium, ~1 week
- **13**: Large, split recommended
- **21+**: Epic, must break down

### Estimation Factors
- Complexity
- Uncertainty
- Dependencies
- Team experience

## Metadata

### Required Fields
```json
{
  "id": "US-001",
  "title": "User Login",
  "story": "As a registered user...",
  "acceptance_criteria": [],
  "story_points": 5,
  "priority": "high",
  "created_at": "2024-01-01"
}
```

### Optional Fields
```json
{
  "epic": "EPIC-001",
  "sprint": "Sprint 5",
  "assignee": "Developer 1",
  "dependencies": ["US-000"],
  "tags": ["authentication", "security"],
  "business_value": "high",
  "risk": "low"
}
```

## Quality Checklist

Before marking a user story as ready:

- [ ] Has clear role-feature-benefit format
- [ ] Has at least 3 acceptance criteria
- [ ] Is estimated by the team
- [ ] Has no blocking dependencies
- [ ] Is small enough for one sprint
- [ ] Has clear test scenarios
- [ ] Has been refined with the team

## Anti-Patterns to Avoid

### Too Technical
❌ Bad: "As a user, I want the system to use JWT tokens for authentication"
✅ Good: "As a user, I want to stay logged in for 24 hours"

### Too Vague
❌ Bad: "As a user, I want a better login"
✅ Good: "As a user, I want to log in with my email and password"

### Implementation-Specific
❌ Bad: "As a user, I want a React login form"
✅ Good: "As a user, I want a responsive login page"

### Missing Benefit
❌ Bad: "As a user, I want to reset my password"
✅ Good: "As a user, I want to reset my password so I can regain access to my account"

### Too Large
❌ Bad: "As a user, I want a complete e-commerce system"
✅ Good: Break into multiple stories: "As a user, I want to browse products"

## Examples

### Good User Story
```markdown
# US-001: User Login

## Story
**As a** registered user  
**I want to** log into my account  
**So that** I can access my personalized content

## Acceptance Criteria
- [ ] Given valid credentials, when I submit the login form, then I am redirected to dashboard
- [ ] Given invalid credentials, when I submit the login form, then I see an error message
- [ ] Given I am logged in, when I close the browser, then I remain logged in for 24 hours

## Story Points
5

## Priority
High
```

### Bad User Story (and how to fix)
```markdown
# Bad Example
As a user, I want authentication

## Problems:
- Role is too generic
- Feature is vague
- No benefit stated
- No acceptance criteria

## Fixed Version:
As a registered user, I want to log in with my email and password so I can access my account securely.
```

## Related Specifications
- [Acceptance Criteria Specification](acceptance-criteria-spec.md)
- [Story Point Estimation Guide](story-point-estimation.md)
