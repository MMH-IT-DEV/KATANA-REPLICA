# 📋 Cursor Agent Instruction Block Template

**Use this template when creating tasks for Cursor Agent to minimize errors.**

---

## INSTRUCTION BLOCK #[NUMBER]: [Task Title]

**To:** Cursor Agent  
**From:** Claude Alpha (Task Lead)  
**Date:** [Date]  
**Priority:** [High/Medium/Low]

---

## 🎯 Mission

[Clear, concise description of what needs to be accomplished]

---

## 📋 Requirements

### Functional Requirements
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

### Technical Requirements
- [Framework/library constraints]
- [Performance requirements]
- [Compatibility requirements]

---

## 🛡️ Prevention Rules to Follow

**Reference:** `ERROR_PREVENTION_SYSTEM.md`

### Required Rules for This Task:
- [ ] **[RULE-ID]**: [Rule description]
- [ ] **[RULE-ID]**: [Rule description]

### Code Patterns to Use:
```tsx
// Include specific safe patterns from ERROR_PREVENTION_SYSTEM.md
```

---

## ✅ Pre-Implementation Checklist

Before writing any code, verify:

- [ ] [Check 1]
- [ ] [Check 2]
- [ ] [Check 3]
- [ ] All referenced files/functions exist
- [ ] Database schema supports the feature
- [ ] No conflicting implementations exist

---

## 📁 Files to Modify/Create

| File | Action | Purpose |
|------|--------|---------|
| `path/to/file.tsx` | Modify | [What changes] |
| `path/to/new-file.tsx` | Create | [What it does] |

---

## 🔧 Implementation Steps

### Step 1: [Step Name]
[Detailed instructions]

```tsx
// Code example if helpful
```

### Step 2: [Step Name]
[Detailed instructions]

---

## ⚠️ Known Gotchas

1. **[Gotcha 1]**: [Description and how to avoid]
2. **[Gotcha 2]**: [Description and how to avoid]

---

## 🧪 Testing Requirements

### Manual Tests
1. [Test scenario 1]
2. [Test scenario 2]

### Verification Script (if applicable)
```javascript
// Script to verify implementation
```

---

## 📦 Expected Deliverables

- [ ] [Deliverable 1]
- [ ] [Deliverable 2]
- [ ] All changes documented
- [ ] No console errors
- [ ] Tested and working

---

## 🚫 Do NOT

- [Thing to avoid 1]
- [Thing to avoid 2]
- Do not proceed if unclear - ask for clarification

---

## 📞 Escalation

If you encounter:
- Unclear requirements → Stop and ask Claude Alpha
- Conflicting code → Document the conflict, don't guess
- Missing dependencies → Report what's missing

---

**End of Instruction Block**
