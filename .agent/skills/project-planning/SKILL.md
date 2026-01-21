---
name: project-planning
description: "Start new projects with right questions and optimal sequence. Use at project kickoff."
---

# Project Planning

## Planning Flow

```
INTAKE → PATTERN MATCH → QUESTIONS → VERIFY → PLAN
```

---

## Project Intake

| Field | Answer |
|-------|--------|
| Name | |
| Deadline | |
| What to build | |
| Problem solved | |
| Success criteria | |
| Similar systems? | |

---

## Pattern Match

| Project Type | Apply These Patterns |
|--------------|---------------------|
| **Windows Bot** | Task Scheduler, absolute paths, batch files |
| **Google Drive** | Shared Drive API, supportsAllDrives, Apps Script |
| **UI Module** | Design system, create mode guards, reference-based-replication |
| **API Integration** | Auth testing, error handling, rate limits |
| **Migration** | Copy-Verify-Delete, ownership checks |

---

## Upfront Questions

### Always Ask
- [ ] External platforms involved? → platform-discovery FIRST
- [ ] Database schema exists?
- [ ] Reference UI exists?
- [ ] Credentials needed?
- [ ] Who approves deployment?

### By Type

| Type | Ask |
|------|-----|
| Bot | Where will it run? Task Scheduler? |
| UI | Design system? Gold standard page? |
| API | Auth method? Rate limits? |
| Migration | Who owns files? Backup exists? |

---

## Mini Agent Verification

Before deep planning, resolve unknowns:

```
┌─────────────────────────────────────────┐
│  MINI AGENT: Quick Verification          │
├─────────────────────────────────────────┤
│  Check: [What to verify]                │
│  URL: [Where to look]                   │
│  Report: [What to capture]              │
└─────────────────────────────────────────┘
```

---

## Phase Template

```markdown
## Phase [N]: [Name]
**Goal**: [One sentence]
**Agent**: [Code/Mini/Database]
**Tasks**:
- [ ] [Task 1]
- [ ] [Task 2]
**Validation**: [How to verify before next phase]
**Estimate**: [Hours/Days]
```

---

## Gotcha Checklist

| Gotcha | Prevention |
|--------|------------|
| Network paths fail | Use local paths always |
| "new" in URL breaks queries | Add create mode guard |
| Shared Drive 404 | Add supportsAllDrives=True |
| Mini Agent types code badly | Use clipboard paste |
| Credentials in Git | Create .gitignore FIRST |

---

## Build-First Rule

```
BUILD CORE → LEARN → ESTABLISH PATTERNS
```

Don't over-plan. Build minimal working version, then extract patterns.

---

## Quick Start

```
1. Fill intake table
2. Match to project type
3. Ask upfront questions
4. Mini Agent verifies unknowns
5. Create phase plan
6. Check gotcha list
7. Start building
```
