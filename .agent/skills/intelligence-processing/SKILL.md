---
name: intelligence-processing
description: "Process and evaluate collected AI intelligence to decide what to explore, implement, or skip. Use after running ai-intelligence-gathering to systematically evaluate findings and create action plans. Turns raw intelligence into decisions."
---

# Intelligence Processing Skill

## Purpose

Take raw intelligence reports and systematically decide:
- What to explore immediately
- What to schedule for later
- What to skip
- What resources to acquire

---

## Processing Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                 INTELLIGENCE PROCESSING FLOW                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. INTAKE: Receive intelligence report                         │
│                                                                 │
│  2. QUICK SCAN: Identify highest-signal findings                │
│     → What has 🔥 viral engagement?                             │
│     → What's directly relevant to current projects?             │
│                                                                 │
│  3. EVALUATE: Score each finding                                │
│     → Relevance to our work (1-5)                               │
│     → Effort to implement (1-5)                                 │
│     → Community validation strength (1-5)                       │
│     → Time sensitivity (urgent/soon/later)                      │
│                                                                 │
│  4. DECIDE: Categorize actions                                  │
│     → DO NOW: High value, low effort, time-sensitive            │
│     → SCHEDULE: High value, needs planning                      │
│     → EXPLORE: Interesting, needs more research                 │
│     → WATCH: Monitor for developments                           │
│     → SKIP: Not relevant or too speculative                     │
│                                                                 │
│  5. PLAN: Create specific next steps                            │
│     → Who does what (which agent)                               │
│     → By when                                                   │
│     → Success criteria                                          │
│                                                                 │
│  6. OUTPUT: Action plan document                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Evaluation Matrix

### Score Each Finding (1-5)

| Dimension | 1 (Low) | 3 (Medium) | 5 (High) |
|-----------|---------|------------|----------|
| **Relevance** | Tangentially related | Related to our domain | Directly impacts current work |
| **Effort** | Weeks of work | Days of work | Hours or less |
| **Validation** | Unverified claim | Some engagement | Viral + expert confirmed |
| **Urgency** | Evergreen | This month | This week |

### Priority Score Formula

```
Priority = (Relevance × 2) + Validation - Effort + Urgency Bonus

Urgency Bonus:
- This week: +3
- This month: +1
- Evergreen: 0
```

### Priority Thresholds

| Score | Category | Action |
|-------|----------|--------|
| 12+ | 🔴 DO NOW | Immediate action this week |
| 8-11 | 🟡 SCHEDULE | Plan for next 2 weeks |
| 5-7 | 🔵 EXPLORE | Research more before deciding |
| 3-4 | ⚪ WATCH | Monitor, revisit next month |
| 1-2 | ⬛ SKIP | Not worth pursuing |

---

## Decision Framework

### DO NOW Criteria (Any 2 = Yes)

- [ ] Directly improves current project
- [ ] Takes < 2 hours to test
- [ ] Community strongly validated (1000+ likes)
- [ ] Time-sensitive (beta access, limited slots)
- [ ] Competitor advantage if we delay

### SCHEDULE Criteria

- [ ] High value but needs preparation
- [ ] Requires learning new tool/concept first
- [ ] Dependencies on other work
- [ ] Would benefit from more research

### EXPLORE Criteria

- [ ] Interesting but unvalidated
- [ ] New concept we don't fully understand
- [ ] Potential high value, unclear effort
- [ ] Need to see examples first

### WATCH Criteria

- [ ] Too early / not mature enough
- [ ] Interesting but not urgent
- [ ] Waiting for more community validation
- [ ] Outside current focus but could be relevant later

### SKIP Criteria

- [ ] Not relevant to our work
- [ ] Too much effort for unclear benefit
- [ ] Already doing something similar
- [ ] Hype without substance

---

## Processing Template

### For Each Finding:

```markdown
## Finding: [Title]

### Quick Assessment
| Dimension | Score | Notes |
|-----------|-------|-------|
| Relevance | /5 | [Why] |
| Effort | /5 | [Estimate] |
| Validation | /5 | [Evidence] |
| Urgency | +0/+1/+3 | [Deadline?] |
| **TOTAL** | **/18** | |

### Category: [DO NOW / SCHEDULE / EXPLORE / WATCH / SKIP]

### Decision Rationale
[1-2 sentences on why this category]

### If Acting:
- **What**: [Specific action]
- **Who**: [Agent/Human]
- **By When**: [Date]
- **Success Looks Like**: [Criteria]
- **First Step**: [Immediate next action]
```

---

## Quick Processing Questions

For rapid triage, ask yourself:

1. **"Does this help what I'm building THIS WEEK?"**
   - Yes → DO NOW
   - No → Continue evaluation

2. **"Can I test this in under 2 hours?"**
   - Yes → Higher priority
   - No → Needs scheduling

3. **"Did the community validate this?"**
   - 1000+ likes → Trust signal
   - Expert confirmed → Extra trust
   - Controversial → Caution

4. **"Is there a deadline or limited access?"**
   - Beta waitlist → Act now
   - Always available → Can schedule

5. **"Am I excited about this?"**
   - Yes → Energy to execute
   - No → May stall even if scheduled

---

## Output: Action Plan Template

```markdown
# Intelligence Action Plan
**Report Date**: [Date]
**Processed**: [Date]
**Findings Evaluated**: [X]

---

## 🔴 DO NOW (This Week)

### 1. [Action Title]
**Finding**: [From which finding]
**Action**: [Specific task]
**Agent**: [Who does it]
**By**: [Date]
**First Step**: [Immediate action]

### 2. [Action Title]
...

---

## 🟡 SCHEDULED (Next 2 Weeks)

### 1. [Action Title]
**Finding**: [Source]
**Action**: [Task]
**Scheduled For**: [Date]
**Blocked By**: [Dependencies]

---

## 🔵 EXPLORE (Need More Info)

| Topic | Question to Answer | How to Research |
|-------|-------------------|-----------------|
| [Topic] | [Question] | [Method] |

---

## ⚪ WATCHING

| Topic | Why Watching | Check Again |
|-------|--------------|-------------|
| [Topic] | [Reason] | [Date] |

---

## ⬛ SKIPPED

| Topic | Why Skipped |
|-------|-------------|
| [Topic] | [Reason] |

---

## Resources to Acquire

| Resource | Type | Priority | Link |
|----------|------|----------|------|
| [Resource] | [Type] | [HIGH/MED] | [URL] |

---

*Processed by: [Lead Agent]*
*Next intelligence collection: [Date]*
```

---

## Integration with Intelligence Gathering

```
┌─────────────────────────────────────────────────────────────────┐
│                    FULL INTELLIGENCE CYCLE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  MONDAY AM: Mini Agent runs ai-intelligence-gathering           │
│       │                                                         │
│       ▼                                                         │
│  MONDAY: Lead Agent processes with intelligence-processing      │
│       │                                                         │
│       ▼                                                         │
│  MONDAY-FRIDAY: Execute DO NOW items                            │
│       │                                                         │
│       ▼                                                         │
│  ONGOING: Work through SCHEDULED items                          │
│       │                                                         │
│       ▼                                                         │
│  NEXT MONDAY: New collection cycle                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Example Processing

### Finding: Claude Cowork Launch

```markdown
## Finding: Claude Cowork Launch

### Quick Assessment
| Dimension | Score | Notes |
|-----------|-------|-------|
| Relevance | 5/5 | Directly relates to our multi-agent work |
| Effort | 4/5 | Just need to sign up for beta |
| Validation | 5/5 | 78K likes, official Anthropic |
| Urgency | +3 | Beta waitlist, limited access |
| **TOTAL** | **17/18** | |

### Category: 🔴 DO NOW

### Decision Rationale
Highest possible relevance (agent filesystem access is exactly what we're building toward), minimal effort to get started (just join waitlist), and time-sensitive (beta access is limited).

### Action:
- **What**: Join Cowork beta waitlist
- **Who**: Human (needs form submission)
- **By When**: Today
- **Success Looks Like**: Confirmation email received
- **First Step**: Go to forms.gle/MtoJrd8kfYny29...
```

---

*This skill turns information into decisions and decisions into actions.*
