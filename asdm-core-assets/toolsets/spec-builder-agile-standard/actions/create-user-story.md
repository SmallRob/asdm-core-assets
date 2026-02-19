# Create User Story

## Description
Generates a well-structured user story with acceptance criteria following Agile best practices and standard formats.

## Usage
```
/create-user-story [options]
```

## Parameters
- `--title`: Title of the user story (required)
- `--epic`: Parent epic ID or name
- `--priority`: Priority level (high, medium, low) (default: medium)
- `--story-points`: Estimated story points
- `--template`: Story template (standard, bdd, job-story) (default: standard)
- `--output`: Output directory (default: specs/user-stories/)

## Examples

### Basic user story
```
/create-user-story --title "User Login"
```

### User story with epic and priority
```
/create-user-story --title "User Login" --epic "Authentication" --priority high
```

### BDD-style user story
```
/create-user-story --title "Password Reset" --template bdd --story-points 5
```

## Output Format

### Standard Template
```markdown
# US-001: User Login

## User Story
**As a** registered user  
**I want to** log into my account  
**So that** I can access my personalized content

## Acceptance Criteria
- [ ] Given I am a registered user, when I enter valid credentials, then I should be logged in
- [ ] Given I enter invalid credentials, when I attempt to login, then I should see an error message
- [ ] Given I am logged in, when I close the browser, then my session should persist for 24 hours

## Technical Notes
- Implement secure password hashing
- Add rate limiting for failed attempts
- Support OAuth 2.0 integration

## Dependencies
- Database schema for user authentication
- Email verification service

## Story Points
**Estimate**: 5 points

## Priority
**Priority**: High

## Epic
**Epic**: Authentication (EPIC-001)

## Definition of Done
- [ ] Code reviewed
- [ ] Unit tests written
- [ ] Integration tests passing
- [ ] Documentation updated
- [ ] Deployed to staging

## Created
**Date**: 2024-01-01  
**Author**: Development Team
```

### BDD Template
```markdown
# US-001: User Login (BDD)

## Feature: User Authentication

### Scenario: Successful login
**Given** I am a registered user with valid credentials  
**When** I enter my email "user@example.com" and password "validPass123"  
**Then** I should be redirected to the dashboard  
**And** I should see "Welcome back!" message

### Scenario: Invalid credentials
**Given** I am on the login page  
**When** I enter email "user@example.com" and password "wrongPass"  
**Then** I should see "Invalid credentials" error  
**And** I should remain on the login page
```

## Acceptance Criteria Patterns

### Gherkin (Given-When-Then)
```
Given [precondition]
When [action]
Then [expected result]
```

### Simple Checklist
```
- [ ] Criteria 1
- [ ] Criteria 2
- [ ] Criteria 3
```

### Verification-based
```
Verify that:
1. [Condition 1]
2. [Condition 2]
3. [Condition 3]
```

## Best Practices

1. **Independent**: Story should be deliverable independently
2. **Negotiable**: Details can be refined during development
3. **Valuable**: Clear value to end user
4. **Estimable**: Team can estimate effort
5. **Small**: Completable within one sprint
6. **Testable**: Clear acceptance criteria

## Related Actions
- `/plan-sprint`: Plan sprints with user stories
- `/prioritize-backlog`: Prioritize user stories
- `/generate-dod`: Generate Definition of Done checklist
