---
name: multi-agent-workflow
description: "Agent coordination, instruction writing, and reporting formats. Use for any multi-agent work."
---

# Multi-Agent Workflow

## Agent Capabilities

| Agent | Tool | Can | Cannot |
|-------|------|-----|--------|
| **Lead** | Claude.ai | Plan, instruct, decide | Browser, code, commands |
| **Code** | Cursor/Windsurf | Edit files, run commands | Open browser, verify visually |
| **Mini** | Chrome Extension | Browse, screenshot, verify | Edit code, run commands |
| **Database** | Supabase/SQL | Query, migrate, verify | Browser, app code |

## Task Routing

| Task | Route To |
|------|----------|
| Code changes, file edits | Code Agent |
| Visual verification, screenshots | Mini Agent |
| SQL queries, schema work | Database Agent |
| Planning, decisions | Lead Agent |

---

## Code Agent Rules

### Localhost / Server

| Action | Allowed |
|--------|---------|
| Start dev server (`npm run dev`) | ✅ Yes |
| Open browser | ❌ Never (slow) |
| Navigate to localhost | ❌ Never |
| Visual verification | ❌ Never (Mini Agent) |
| Take screenshots | ❌ Never (Mini Agent) |

### When Asked to "Run" or "Open" Localhost

```
1. Run start command: npm run dev (or equivalent)
2. Report: "Dev server running at localhost:3000"
3. STOP - do not open browser
```

### Response Format

```markdown
## ✅ DONE
Server running at localhost:3000
Ready for visual verification (Mini Agent or Human)
```

---

## Writing Instructions

### Template

```markdown
## 🔧 [TITLE]

**Goal:** [One sentence]

**Context:** [What exists, what to read first]

### Requirements
1. [Specific requirement]
2. [Specific requirement]

### Key Decisions (if non-obvious)
- [Technical choice]

### Acceptance Criteria
- [ ] [Testable outcome]

**Start by reading:** [file paths]
**Report back:** ✅⚠️❌ format
```

### When to Include Code

| ✅ Include | ❌ Skip |
|-----------|---------|
| New pattern (first time) | Pattern exists in project |
| Previous attempt failed | Using documented library |
| Critical (must be exact) | Agent can figure it out |
| Data structure shape (1 example) | Full implementation |
| Bug fix (exact lines) | Styling/layout |

### Length Guide

| Task | Lines |
|------|-------|
| Bug fix | 10-20 |
| Simple feature | 20-40 |
| New component | 40-60 |
| Complex feature | 80-120 |

**Over 150 lines → split into multiple instructions**

---

## Code Agent Reporting

### Response Format

```markdown
## ✅ DONE | ⚠️ PARTIAL | ❌ BLOCKED

### Changes
| File | Change |
|------|--------|
| `path/file.ts` | [what changed] |

### Status
- [x] Requirement 1
- [ ] Requirement 2 ← issue

### Issues (if any)
**Issue:** [what's wrong]
**Tried:** [what was attempted]
**Need:** [what's needed]

### Next
[Ready / Waiting / Question]
```

### Quick Responses

```markdown
## ✅ DONE
Changed `components/X.tsx` - added Y
Ready for next task

## ❓ QUESTION
Should X do A or B?
Waiting on answer

## ❌ BLOCKED
**Issue:** [what]
**Need:** [what]
```

### Lead Agent Parse

| Status | Action |
|--------|--------|
| ✅ DONE | Send next task |
| ⚠️ PARTIAL | Read issues, help or skip |
| ❌ BLOCKED | Provide solution |
| ❓ QUESTION | Answer |

---

## Mini Agent Instructions

### Command Style

```
✅ "Go to [URL] now and..."
✅ "Find and list..."
❌ "Here are instructions..."
❌ Third-person language
```

### Template

```
┌────────────────────────────────────────┐
│  MINI AGENT TASK: [Name]               │
├────────────────────────────────────────┤
│  OBJECTIVE: [Goal]                     │
│  STEPS: 1. [Step] → [Action]           │
│  OUTPUT: [What to report]              │
│  IF BLOCKED: [Fallback]                │
└────────────────────────────────────────┘
```

**Never let Mini Agent TYPE code** - use clipboard paste only.

---

## Notification Block

End significant responses with:

```
---NOTIFY---
user: [What was asked - 5-15 words]
done: [What was accomplished - 5-15 words]
next: [Next step or "None"]
status: [ready|waiting|question|blocked]
---END---
```

---

## Project CLAUDE.md Template

```markdown
## Agent Rules
- Code Agent: No browser, report with ✅⚠️❌ format
- Localhost: Start server only, never open browser
- Changes table + requirements checklist always
- Keep responses concise

## Tech Stack
[List stack]

## Patterns
[Key patterns to follow]
```
