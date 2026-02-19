# Prioritize Backlog

## Description
Analyzes and prioritizes product backlog items using various prioritization frameworks to ensure the team works on the most valuable items first.

## Usage
```
/prioritize-backlog [options]
```

## Parameters
- `--framework`: Prioritization framework (moscow, wsjf, rice, kano) (default: moscow)
- `--input`: Input backlog file (default: specs/backlog.json)
- `--output`: Output file (default: specs/backlog-prioritized.json)
- `--interactive`: Enable interactive prioritization (default: false)
- `--team-capacity`: Team capacity in story points

## Examples

### MoSCoW prioritization
```
/prioritize-backlog --framework moscow
```

### WSJF prioritization
```
/prioritize-backlog --framework wsjf --team-capacity 30
```

### Interactive RICE scoring
```
/prioritize-backlog --framework rice --interactive
```

## Prioritization Frameworks

### MoSCoW

**Must Have**: Critical for delivery  
**Should Have**: Important but not critical  
**Could Have**: Desirable if time permits  
**Won't Have**: Not planned for this release

```markdown
# Backlog Prioritization (MoSCoW)

## Must Have 🔴
| ID | Story | Priority Score | Rationale |
|----|-------|----------------|-----------|
| US-001 | User Login | 100 | Core functionality |
| US-002 | Password Reset | 95 | Security requirement |
| US-003 | User Profile | 90 | MVP feature |

## Should Have 🟡
| ID | Story | Priority Score | Rationale |
|----|-------|----------------|-----------|
| US-004 | Profile Picture | 75 | User expectation |
| US-005 | Account Settings | 70 | User convenience |

## Could Have 🟢
| ID | Story | Priority Score | Rationale |
|----|-------|----------------|-----------|
| US-006 | Two-Factor Auth | 50 | Security enhancement |
| US-007 | Social Login | 45 | User convenience |

## Won't Have ⚪
| ID | Story | Priority Score | Rationale |
|----|-------|----------------|-----------|
| US-008 | Avatar Customization | 20 | Nice to have |
| US-009 | Profile Themes | 15 | Low value |
```

### WSJF (Weighted Shortest Job First)

**WSJF Formula**: (Business Value + Time Criticality + Risk Reduction) / Job Size

```markdown
# Backlog Prioritization (WSJF)

| ID | Story | Business Value | Time Criticality | Risk Reduction | Job Size | WSJF Score |
|----|-------|----------------|------------------|----------------|----------|------------|
| US-001 | User Login | 9 | 8 | 7 | 5 | 4.8 |
| US-002 | Password Reset | 7 | 9 | 6 | 3 | 7.3 |
| US-003 | User Profile | 8 | 5 | 5 | 8 | 2.3 |
| US-004 | Profile Picture | 5 | 3 | 3 | 5 | 2.2 |

**Recommended Order**: US-002 (7.3) → US-001 (4.8) → US-003 (2.3) → US-004 (2.2)
```

### RICE Scoring

**RICE Score**: (Reach × Impact × Confidence) / Effort

```markdown
# Backlog Prioritization (RICE)

| ID | Story | Reach | Impact | Confidence | Effort | RICE Score |
|----|-------|-------|--------|------------|--------|------------|
| US-001 | User Login | 1000 | 3 | 80% | 2 | 1200 |
| US-002 | Password Reset | 500 | 2 | 90% | 1 | 900 |
| US-003 | User Profile | 800 | 2 | 70% | 3 | 373 |

**Reach**: Number of users affected per quarter  
**Impact**: 3=massive, 2=high, 1=medium, 0.5=low  
**Confidence**: 100%=high, 80%=medium, 50%=low  
**Effort**: Person-months

**Recommended Order**: US-001 (1200) → US-002 (900) → US-003 (373)
```

### Kano Model

Categorizes features based on customer satisfaction:

```markdown
# Backlog Prioritization (Kano Model)

## Delighters 🌟
Features that exceed expectations
- Social Login Integration
- AI-powered Recommendations

## Performance Features 📈
More is better
- Page Load Speed
- Search Accuracy

## Basic Features ✅
Must-have, expected
- User Login
- Password Reset
- User Profile

## Indifferent ⚪
No impact on satisfaction
- Color scheme options
- Font size preferences

## Dissatisfiers ❌
Can cause dissatisfaction if missing
- Security features
- Data privacy
```

## Output File Format

```json
{
  "prioritization_date": "2024-01-01",
  "framework": "wsjf",
  "backlog": [
    {
      "id": "US-002",
      "title": "Password Reset",
      "score": 7.3,
      "rank": 1,
      "category": "Must Have",
      "rationale": "High WSJF score due to time criticality and low effort"
    },
    {
      "id": "US-001",
      "title": "User Login",
      "score": 4.8,
      "rank": 2,
      "category": "Must Have",
      "rationale": "Core functionality with high business value"
    }
  ],
  "recommendations": [
    "Prioritize US-002 due to high time criticality",
    "Consider splitting US-003 into smaller stories",
    "Re-evaluate US-008 after user research"
  ]
}
```

## Factors to Consider

### Business Value
- Revenue impact
- Cost savings
- User satisfaction
- Strategic alignment

### Technical Factors
- Dependencies
- Technical debt
- Architecture impact
- Learning opportunities

### Risk Factors
- Market timing
- Competition
- Technical uncertainty
- Resource availability

## Integration

### Sprint Planning Integration
```
/prioritize-backlog --framework wsjf
/plan-sprint --sprint 6 --velocity 30
```

### Metrics Integration
- Historical velocity
- Cycle time
- Defect rate
- Customer feedback

## Best Practices

1. **Regular Re-prioritization**: Revisit priorities each sprint
2. **Stakeholder Input**: Include business and technical perspectives
3. **Transparency**: Share prioritization rationale with team
4. **Flexibility**: Be willing to adjust based on new information

## Related Actions
- `/create-user-story`: Create new backlog items
- `/plan-sprint`: Select items for sprint
- `/create-retrospective`: Review prioritization effectiveness
