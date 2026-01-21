---
name: knowledge-extraction
description: "Extract lessons from projects. Process intelligence reports. Update universal patterns. Use after project completion or when evaluating new information."
---

# Knowledge Extraction

## Three-Layer System

```
PROJECT COMPLETE
      │
      ▼
┌─────────────────────────┐
│ 1. RAW EXTRACTION       │ → [project]-extraction.md
│    All insights         │
└─────────────────────────┘
      │
      ▼
┌─────────────────────────┐
│ 2. PROJECT SKILL        │ → [project-name].skill
│    Summary + decisions  │
└─────────────────────────┘
      │
      ▼
┌─────────────────────────┐
│ 3. UNIVERSAL SKILL      │ → workflow-knowledge.skill
│    Reusable patterns    │
└─────────────────────────┘
```

---

## Insight Template

```yaml
insight_id: [CATEGORY]-[NUMBER]
category: [AGENT_COORDINATION|ERROR_PREVENTION|DESIGN_SYSTEM|etc]
title: "[Short title]"
problem: "[What went wrong]"
solution: "[What fixed it]"
reusable_pattern: "[Code or process]"
universal: [true/false]
```

---

## Extraction Questions

| Journey | Retrospective |
|---------|---------------|
| What mistakes were fixed? | What would we do on Day 1? |
| What rules were established? | What questions should we ask first? |
| What patterns worked? | What's the optimal sequence? |
| What debugging helped? | What checkpoints prevent rework? |

---

## Project Skill Template

```yaml
---
name: project-[name]
description: "Project summary for [NAME]. Completed [DATE]. [What was built]."
---

# [NAME]

| Field | Value |
|-------|-------|
| Completed | [DATE] |
| Type | [Bot/UI/Migration] |
| Status | ✅ Complete |

## What We Built
[2-3 sentences]

## Tech Stack
- [Tool]: [Purpose]

## Key Decisions
| Decision | Choice | Why |
|----------|--------|-----|

## Lessons → Universal
- [Pattern added to workflow-knowledge]
```

---

## Universal Skill Update

### Add If
- Applies to multiple projects
- Prevents future errors
- Proven pattern (not theory)

### Don't Add If
- Only for this project
- One-time workaround
- Untested idea

---

## Intelligence Processing

### Quick Triage
| Question | If Yes |
|----------|--------|
| Helps this week's work? | DO NOW |
| Test in < 2 hours? | Higher priority |
| 1000+ likes? | Trust signal |
| Limited time offer? | Act now |

### Priority Categories

| Score | Category | Action |
|-------|----------|--------|
| 12+ | 🔴 DO NOW | This week |
| 8-11 | 🟡 SCHEDULE | Next 2 weeks |
| 5-7 | 🔵 EXPLORE | Research more |
| 3-4 | ⚪ WATCH | Monitor |
| 1-2 | ⬛ SKIP | Not worth it |

### Score Formula
```
Priority = (Relevance × 2) + Validation - Effort + Urgency
Urgency: This week +3, This month +1, Evergreen 0
```

---

## End of Project Checklist

```
□ Export conversation
□ Extract insights (use template)
□ Create project skill
□ Update workflow-knowledge with universal patterns
□ Add to Project Registry
```

---

## Pattern Promotion

Moves to Universal when:
1. Used in 2+ projects
2. Prevents common error
3. Applies regardless of tech
4. Improves agent coordination
