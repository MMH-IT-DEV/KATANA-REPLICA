---
name: ui-component-redesign
description: "Systematic workflow for redesigning UI components to match established reference patterns. Use when: (1) A page or component needs to match an existing 'gold standard' reference, (2) Rebuilding tables, dashboards, or list views for consistency, (3) Code Agent needs to audit current vs target state before making changes. Implements the UNDERSTAND → DELETE → REPLICATE → PERFECT methodology."
---

# UI Component Redesign Workflow

## Overview

A 4-phase process for systematically redesigning UI components to match established reference patterns. Ensures consistency across pages while preserving business logic.

```
UNDERSTAND → DELETE → REPLICATE → PERFECT
    ↓           ↓          ↓          ↓
  Audit      Remove     Copy from   Wire up
  current    old UI     reference   data
```

---

## Phase 1: UNDERSTAND (Audit)

**Goal**: Document current state vs reference before any code changes.

### Audit Instruction Template

```markdown
## 🔍 CODE AGENT INSTRUCTION - Phase 1: AUDIT

╔═══════════════════════════════════════════════════════════════════╗
║  AUDIT - [Page/Component Name]                                    ║
║  Priority: HIGH | Module: [Module Name]                           ║
╚═══════════════════════════════════════════════════════════════════╝

⚠️ RULES:
• DO NOT make any code changes - AUDIT ONLY
• DO NOT open localhost or browsers
• Report findings in the format below

📁 FILES TO ANALYZE:
- Target: [path to file being redesigned]
- Reference: [path to gold standard file]

📋 AUDIT CHECKLIST:

Report on each component:

| Component | Reference Pattern | Current Implementation | Match? | Action |
|-----------|------------------|----------------------|--------|--------|
| Status Tabs | [describe] | [describe] | ✅/⚠️/❌ | [action] |
| Type Tabs | [describe] | [describe] | ✅/⚠️/❌ | [action] |
| Actions Bar | [describe] | [describe] | ✅/⚠️/❌ | [action] |
| Stats Line | [describe] | [describe] | ✅/⚠️/❌ | [action] |
| Selection Bar | [describe] | [describe] | ✅/⚠️/❌ | [action] |
| Header Row | [describe] | [describe] | ✅/⚠️/❌ | [action] |
| Filter Row | [describe] | [describe] | ✅/⚠️/❌ | [action] |
| Table Body | [describe] | [describe] | ✅/⚠️/❌ | [action] |
| Pagination | [describe] | [describe] | ✅/⚠️/❌ | [action] |
| Context Menu | [describe] | [describe] | ✅/⚠️/❌ | [action] |

OUTPUT:
□ File structure identified
□ Component comparison table completed
□ Fix priorities ranked (P1, P2, P3...)
□ Await Phase 2 instructions
```

### Priority Classification

| Symbol | Meaning | Action |
|--------|---------|--------|
| ❌ | Does not match | P1 - Must fix |
| ⚠️ | Partial match | P2 - Should fix |
| ✅ | Matches | No action |

---

## Phase 2: DELETE

**Goal**: Remove old UI code while preserving business logic.

### What to KEEP
- Data fetching hooks (useState, useEffect, useMemo)
- Column definitions
- Business logic functions
- API calls and Supabase queries
- Type definitions

### What to DELETE
- Old layout structure
- Old styling classes
- Old component hierarchy
- Hardcoded styles that don't match design system

---

## Phase 3: REPLICATE

**Goal**: Copy exact patterns from reference file.

### Replicate Instruction Template

```markdown
## 🔧 CODE AGENT INSTRUCTION - Phase 2-3: REPLICATE

╔═══════════════════════════════════════════════════════════════════╗
║  FIX - [Component Name]                                           ║
║  Priority: [P1/P2/P3] | File: [path]                             ║
╚═══════════════════════════════════════════════════════════════════╝

⚠️ RULES:
• DO NOT open localhost or browsers
• Copy patterns EXACTLY from reference
• Report changes with line numbers

📁 FILES:
- Target: [file to modify]
- Reference: [file to copy from] (lines X-Y)

🎯 FIX [N]: [Component Name]

CURRENT (wrong):
- [describe current implementation]

REQUIRED (copy from reference):
- [describe target implementation]

COPY THIS PATTERN:
```tsx
[exact code from reference file]
```

OUTPUT:
□ Line numbers changed: [X-Y]
□ Old → New summary
□ Build status
```

### Common Component Patterns

#### Status Tabs (Full-width, underline)
```tsx
<div className="flex gap-6 border-b border-border">
  <button
    onClick={() => setFilter('active')}
    className={`pb-2 text-sm font-medium transition-colors ${
      filter === 'active'
        ? 'border-b-2 border-primary text-primary'
        : 'border-b-2 border-transparent text-muted-foreground hover:text-foreground'
    }`}
  >
    Active
  </button>
  {/* More tabs... */}
</div>
```

#### Stats Line + Actions Bar
```tsx
<div className="flex items-center justify-between py-2">
  <span className="text-sm text-muted-foreground">
    <strong>{count}</strong> items
  </span>
  <div className="flex items-center gap-2">
    <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
    <Button variant="ghost" size="sm"><Printer className="h-4 w-4" /></Button>
    <Button size="sm" className="bg-primary text-primary-foreground">
      <Plus className="h-4 w-4 mr-1" />New Item
    </Button>
  </div>
</div>
```

#### Filter Row (Sticky)
```tsx
<tr className="sticky top-8 z-10 bg-secondary/5">
  <td className="p-1">
    <input
      type="text"
      placeholder="Filter"
      className="w-full bg-background border border-border rounded px-2 py-1 text-[11px]"
    />
  </td>
  {/* More filter cells... */}
</tr>
```

---

## Phase 4: PERFECT

**Goal**: Wire up data, test interactions, apply design system.

### Checklist
- [ ] Data displays correctly
- [ ] Filters work
- [ ] Sorting works
- [ ] Selection works
- [ ] Pagination works
- [ ] Colors match design system
- [ ] Spacing is consistent

---

## Design System Reference

### Colors (Dark Theme)

| Purpose | Hex | Tailwind |
|---------|-----|----------|
| Page bg | `#1a1a18` | `bg-[#1a1a18]` |
| Card bg | `#262624` | `bg-[#262624]` |
| Hover | `#3a3a38` | `hover:bg-[#3a3a38]` |
| Border | `#3a3a38` | `border-[#3a3a38]` |
| Primary text | `#faf9f5` | `text-[#faf9f5]` |
| Muted text | `#7a7974` | `text-[#7a7974]` |
| Accent | `#d97757` | `text-[#d97757]` / `bg-[#d97757]` |
| Success | `#8aaf6e` | `text-[#8aaf6e]` |
| Warning | `#bb8b5d` | `text-[#bb8b5d]` |
| Error | `#ff7b6f` | `text-[#ff7b6f]` |

### Standard Heights
- Header row: `h-8`
- Filter row: `h-8`
- Table row: `h-10`
- Tab padding: `pb-2`

---

## Error Prevention Rules

```
⚠️ ALWAYS INCLUDE IN INSTRUCTIONS:
• DO NOT open localhost or launch browsers
• DO NOT run visual verification
• ONLY make code changes and report what was changed
• Browser testing is done by Mini Agent or Human
• Report changes with file names and line numbers
```

---

## Quick Reference: Instruction Flow

```
1. Send AUDIT instruction
   ↓
2. Receive comparison table
   ↓
3. Review priorities (❌ P1, ⚠️ P2, ✅ skip)
   ↓
4. Send FIX instruction for each priority
   ↓
5. Receive change report
   ↓
6. Visual verification (Mini Agent or Human)
   ↓
7. Iterate if needed
```
