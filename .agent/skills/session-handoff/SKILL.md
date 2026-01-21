---
name: session-handoff
description: "Maintain context between Lead Agent sessions. Use when ending long conversations or switching chats."
---

# Session Handoff

## When to Use

- Context window getting long
- Ending session for the day
- Starting new chat for same project
- Switching focus temporarily

---

## Handoff Package

```markdown
## 📦 SESSION HANDOFF

### Project: [Name]
### Date: [Date]
### Session: [#]

---

### Current State
| What | Status |
|------|--------|
| [Component] | [Done/In Progress/Blocked] |
| [Component] | [Status] |

### Just Completed
- [Task 1]
- [Task 2]

### In Progress
- [Task] - [where we left off]

### Blocked On
- [Issue] - [what's needed]

### Next Steps
1. [Immediate next]
2. [After that]
3. [Then]

### Key Decisions Made
| Decision | Choice |
|----------|--------|
| [Decision] | [What we chose] |

### Files Modified This Session
- `[path]` - [what changed]

### Open Questions
- [Question needing answer]

---

**To resume**: [One sentence instruction]
```

---

## Quick Handoff (Short Version)

```markdown
## HANDOFF: [Project]

**Done**: [What's complete]
**Next**: [Immediate next task]
**Blocked**: [If any]
**Resume with**: "[First instruction to give new session]"
```

---

## Resuming

New session starts with:
```
Continuing [PROJECT]. Last session completed [X]. 
Starting with [NEXT TASK].
```

---

## Slack History

Search `#mmh-ai-updates` for:
- `"🤖 Lead"` - Lead Agent activity
- `"[Project Name]"` - Project-specific
- `"waiting"` - Tasks needing action
