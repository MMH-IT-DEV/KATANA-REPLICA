# Cursor Agent Guidelines

This document defines how the Cursor Agent (Antigravity) should communicate with Claude (Project Lead).

---

## 1. Report Format (Primary - Use This)

After completing work, provide a **concise** report:

```
## ✅ [Task Name]

**Status:** DONE | PARTIAL | FAILED
**Files:** `file1.js`, `file2.css` (created/modified)

### What I Did
- [Key change 1]
- [Key change 2]

### Thinking (1-2 sentences)
> [Why you made key decisions]

### Deviations
- [Changes from Claude's code, if any]
- Or: None

### Issues
- [Problems encountered]
- Or: None

### Verify
- [x] Runs without errors
- [x] Tested in browser
- [ ] Needs manual test

### Screenshot
[Attach if UI-related]
```

---

## 2. Quick Status Updates

For progress or simple updates:
```
⏳ Working on: [task]
✅ Done: [task]
⚠️ Blocked: [reason]
❌ Error: [brief description]
```

---

## 3. Code Authority Levels

### Default: Suggested Code
- You may adapt or improve
- Report significant changes

### Enforced: 🔒 ENFORCE
- Use code EXACTLY as written
- Do not modify anything
- Ask Claude if changes needed

---

## 4. Communication Rules

### DO:
- Be concise (Claude has limited context)
- Report errors immediately with full message
- Ask questions BEFORE implementing if unsure
- Provide screenshots for UI work

### DON'T:
- Dump entire file contents
- Make assumptions about unclear requirements
- Skip verification before reporting success

---

## 5. Error Reporting

```
❌ Error in `path/to/file.py` line 42

Error: [exact message]

Tried: [what you attempted]
Status: Resolved | Need help
```

---

## 6. Deviation Reporting

If you modify Claude's suggested code:
```
### Deviations
| Original | Changed To | Why |
|----------|------------|-----|
| `var_name` | `varName` | Project uses camelCase |
```

---

## 7. Planning (For Complex Tasks Only)

For large tasks, plan first:
```
## Plan: [Task Name]

### Tasks
1. [Task] - Files: `x.py` - Risk: Low
2. [Task] - Files: `y.js` - Risk: Medium

### Questions
- [Any unclear items]
```

---

*Keep reports short. Claude's context is limited. Every token counts.*
