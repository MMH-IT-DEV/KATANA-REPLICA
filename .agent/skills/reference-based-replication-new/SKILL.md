---
name: reference-based-replication
description: "Build new pages from gold standard reference. Fix existing pages to match. Use when building UI at scale."
---

# Reference-Based Replication

## Core Method

```
UNDERSTAND → DELETE → REPLICATE → VERIFY
   Audit      Remove     Copy       Check
   current    old UI     exact      matches
```

---

## Phase 1: Audit

```markdown
## 🔍 AUDIT - [Page Name]

⚠️ RULES: AUDIT ONLY - no code changes

📁 FILES:
- Target: [file to fix]
- Reference: [gold standard file]

📋 COMPARE:

| Component | Reference | Current | Match? |
|-----------|-----------|---------|--------|
| Header | [pattern] | [actual] | ✅/⚠️/❌ |
| Filters | [pattern] | [actual] | ✅/⚠️/❌ |
| Table | [pattern] | [actual] | ✅/⚠️/❌ |

OUTPUT:
□ Comparison table
□ Priority list (❌=P1, ⚠️=P2)
```

---

## Phase 2-3: Delete & Replicate

```markdown
## 🔧 FIX - [Component]

⚠️ RULES: Copy EXACTLY from reference

📁 FILES:
- Target: [file]
- Reference: [file] lines [X-Y]

CURRENT (wrong):
[describe]

REQUIRED (copy from reference):
[describe]

COPY THIS:
```tsx
[exact code from reference]
```

OUTPUT:
□ Lines changed: [X-Y]
□ Build passes
```

### Keep vs Delete

| Keep | Delete |
|------|--------|
| Data fetching hooks | Old layout structure |
| Column definitions | Old styling classes |
| Business logic | Hardcoded styles |
| API calls | Old component hierarchy |

---

## Phase 4: Verify

```
□ Code Agent reports changes (line numbers)
□ Mini Agent screenshots result
□ Lead Agent confirms match
□ ONLY THEN: complete
```

---

## Common Patterns

### Status Tabs
```tsx
<div className="flex gap-6 border-b border-[#3a3a38]">
  <button className={`pb-2 text-sm font-medium ${
    active ? 'border-b-2 border-[#d97757] text-[#d97757]'
           : 'text-[#7a7974] hover:text-[#faf9f5]'
  }`}>
    Tab
  </button>
</div>
```

### Stats + Actions
```tsx
<div className="flex items-center justify-between py-2">
  <span className="text-sm text-[#7a7974]">
    <strong>{count}</strong> items
  </span>
  <div className="flex gap-2">
    <Button variant="ghost" size="sm"><Download /></Button>
    <Button size="sm" className="bg-[#d97757]">
      <Plus /> New
    </Button>
  </div>
</div>
```

### Filter Row
```tsx
<tr className="sticky top-8 z-10 bg-[#262624]">
  <td className="p-1">
    <input className="w-full bg-[#1a1a18] border border-[#3a3a38] rounded px-2 py-1 text-xs" />
  </td>
</tr>
```

---

## Colors (Dark Theme)

| Purpose | Hex |
|---------|-----|
| Page bg | `#1a1a18` |
| Card bg | `#262624` |
| Hover | `#3a3a38` |
| Border | `#3a3a38` |
| Text | `#faf9f5` |
| Muted | `#7a7974` |
| Accent | `#d97757` |
| Success | `#8aaf6e` |

---

## Instruction Flow

```
1. AUDIT → Get comparison table
2. Review → Prioritize ❌ first
3. FIX → One component at a time
4. VERIFY → Screenshot confirms match
5. Repeat → Until all ✅
```
