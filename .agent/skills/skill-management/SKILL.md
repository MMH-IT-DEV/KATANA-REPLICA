---
name: skill-management
description: "How to create, name, and update skills. Keep skills potent, not lengthy. Prefer updating existing skills over creating new ones."
---

# Skill Management

## Core Principle

```
NEW INFORMATION → Does it fit an existing skill?
                        │
        ┌───────────────┴───────────────┐
        ↓                               ↓
       YES                              NO
        │                               │
   UPDATE that skill              Is it a new domain?
   (default action)                     │
                            ┌───────────┴───────────┐
                            ↓                       ↓
                           YES                      NO
                            │                       │
                      CREATE new skill        Add to workflow-knowledge
```

**Default is UPDATE, not CREATE.**

---

## Before Creating a New Skill, Ask:

| Question | If Yes → |
|----------|----------|
| Fits an existing skill's scope? | Update existing |
| Just a new section? | Update existing |
| Makes sense grouped together? | Merge into existing |
| Truly a new domain/capability? | Create new |
| Will be referenced independently? | Create new |

**Example:**
- "Instruction writing tips" → fits `multi-agent-workflow`
- "Code Agent reporting format" → fits `multi-agent-workflow`  
- "New AI tool integration" → new skill (new domain)

---

## Naming Convention

```
[category]-[purpose]

Categories:
  workflow-*   → processes, coordination
  project-*    → completed project references
  (no prefix)  → core skills
```

**Rules:** lowercase-kebab-case, no company prefix, max 3 words

---

## Skill Format

**Potent, not lengthy:**

| Do | Don't |
|----|-------|
| Tables | Paragraphs |
| Code blocks | Explanations |
| 1-2 pages max | Walls of text |

---

## Quick Update Protocol

```
SKILL: [skill-name]
ADD TO: [section name]
CONTENT: [table row or code block]
```

Human approves → Update → Done.

---

## Skill Map

| Skill | Update with... |
|-------|----------------|
| `workflow-knowledge` | New patterns from any project |
| `multi-agent-workflow` | Instruction formats, reporting, routing |
| `project-planning` | New project type patterns |
| `platform-discovery` | Platform-specific findings |
| `knowledge-extraction` | Extraction methods |
| `design-system` | Colors, components |
| `skill-management` | Meta improvements |

---

## Create vs Update

| New Info | Decision |
|----------|----------|
| Instruction writing tips | Update `multi-agent-workflow` |
| Response format | Update `multi-agent-workflow` |
| Database pattern | Update `workflow-knowledge` |
| New AI tool X | **Create** new skill |
| Project summary | **Create** `project-*` skill |
