---
name: reference-based-replication
description: "Workflow for building new pages/components by replicating a completed 'gold standard' reference. Use when: (1) A finished, polished page exists that should be the template, (2) Building a new page that should match the reference exactly, (3) Code Agent needs to learn the UI pattern from working code then apply it elsewhere. The reference file IS the documentation."
---

# Reference-Based Page Replication

## Core Concept

```
REFERENCE FILE (complete, working)
        ↓
   Code Agent READS it
        ↓
   Code Agent REPORTS understanding
        ↓
   Code Agent REPLICATES for new page
        ↓
   Code Agent VERIFIES against reference
        ↓
   NEW PAGE (same structure, different data)
```

**The reference file IS the documentation.** No separate design docs needed - the working code shows exactly how to build it.

---

## Related Skills

| Situation | Use This Skill |
|-----------|----------------|
| Building NEW pages from scratch | ✅ `reference-based-replication` (this skill) |
| FIXING existing pages to match reference | → `ui-component-redesign` skill |
| Exploring platform before building | → `platform-discovery` skill |

---

## When in Project Lifecycle

```
Platform Discovery → Architecture → Phase Planning
                                         ↓
                    ┌────────────────────────────────┐
                    │  Phase: UI Development         │
                    │                                │
                    │  1. Build REFERENCE first      │
                    │  2. Verify reference (human)   │
                    │  3. REPLICATE for other pages  │ ← THIS SKILL
                    │  4. Verify each replication    │
                    └────────────────────────────────┘
```

---

## Pre-Flight Checklist

Before giving Code Agent a replication task:

```markdown
## Pre-Flight Check

- [ ] Reference file is identified
- [ ] Reference file is COMPLETE (no TODOs, no placeholders)
- [ ] Reference has been visually verified by human/Mini Agent
- [ ] Adaptation table is filled out (entity names, columns, routes)
- [ ] Target file path is decided
- [ ] Database/data source for new page exists
- [ ] Required imports are available
```

**Do NOT proceed until all boxes are checked.**

---

## Reference Inventory

Maintain a list of designated gold standard files:

| Page Type | Reference File | Status |
|-----------|---------------|--------|
| List page (table) | `src/components/items/ItemsTable.tsx` | ✅ Verified |
| Detail page | `src/app/items/[id]/page.tsx` | ✅ Verified |
| Edit form | `src/app/items/[id]/edit/page.tsx` | ✅ Verified |
| Dashboard | `src/app/dashboard/page.tsx` | ✅ Verified |
| Modal dialog | `src/components/ui/ItemModal.tsx` | ✅ Verified |

**Rule**: Before building new page, check if reference exists. If no suitable reference exists, build and verify the reference FIRST.

---

## The Process

### Step 1: DESIGNATE the Reference

Identify the "gold standard" file that is:
- ✅ Complete and working
- ✅ Visually correct (human verified)
- ✅ Has all the patterns we want to reuse
- ✅ No TODOs or placeholder content

### Step 2: Code Agent READS the Reference

Code Agent studies the reference file to understand:
- Component structure (what JSX blocks exist)
- Styling patterns (what classes are used)
- Data flow (how state and props work)
- Interaction patterns (clicks, hovers, selections)

### Step 3: Code Agent REPORTS Understanding

Code Agent must report what they learned BEFORE writing code.

### Step 4: Code Agent REPLICATES

Code Agent creates the new page by:
- Copying the exact structure
- Adapting field names for new context
- Keeping all styling identical
- Preserving interaction patterns

### Step 5: Code Agent VERIFIES

Code Agent checks their work against the reference before reporting complete.

---

## Instruction Template

```markdown
## 🔧 CODE AGENT INSTRUCTION - Build [New Page] from Reference

╔═══════════════════════════════════════════════════════════════════╗
║  BUILD BY REPLICATION                                             ║
║  Reference: [reference file path]                                 ║
║  Target: [new file to create]                                     ║
╚═══════════════════════════════════════════════════════════════════╝

⚠️ RULES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• DO NOT open localhost or launch browsers
• DO NOT invent new patterns - copy from reference EXACTLY
• The reference file IS your documentation
• REPORT understanding before writing code
• VERIFY against reference before reporting complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 STEP 1: READ THE REFERENCE FILE

File: [path to reference file]

Read this file completely. This is a FINISHED, WORKING page.
Study and note:

□ Component structure (list the main JSX sections)
□ How tabs are built (lines ___-___)
□ How the stats/actions bar is built (lines ___-___)
□ How the table header is built (lines ___-___)
□ How the filter row is built (lines ___-___)
□ How the table body maps data (lines ___-___)
□ How pagination works (lines ___-___)
□ What state variables exist
□ What data fetching pattern is used

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 STEP 2: REPORT YOUR UNDERSTANDING

Before writing any code, report:

"I've read [reference file]. Here's the structure:

1. TABS SECTION (lines X-Y): [describe]
2. STATS/ACTIONS BAR (lines X-Y): [describe]
3. TABLE HEADER (lines X-Y): [describe]
4. FILTER ROW (lines X-Y): [describe]
5. TABLE BODY (lines X-Y): [describe]
6. PAGINATION (lines X-Y): [describe]

State variables: [list them]
Data fetching: [describe pattern]

Ready to replicate for [new page]."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔨 STEP 3: CREATE THE NEW PAGE

Target file: [path for new file]

Replicate the reference with these adaptations:

| Reference | New Page |
|-----------|----------|
| [old entity name] | [new entity name] |
| [old columns] | [new columns] |
| [old data function] | [new data function] |
| [old route] | [new route] |

KEEP IDENTICAL:
- All styling classes
- Component structure
- Tab patterns
- Table patterns
- Filter patterns
- Pagination patterns

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 STEP 4: VERIFY AGAINST REFERENCE

Before reporting complete, verify:

□ File compiles without errors
□ All sections from reference are present:
  - [ ] Tabs section (if applicable)
  - [ ] Stats/actions bar
  - [ ] Table header
  - [ ] Filter row
  - [ ] Table body
  - [ ] Pagination
□ No styling classes were changed from reference
□ No new patterns were invented
□ Data fetching follows same pattern as reference
□ All adaptations from the table above are applied

If anything is missing or different from reference, FIX IT before reporting.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 OUTPUT REQUIRED:

□ Step 1 complete: Reference file read
□ Step 2 complete: Structure report provided
□ Step 3 complete: New file created at [path]
□ Step 4 complete: Verification checklist passed
□ Lines of code: [X]
□ Build status: ✓ Compiled / ✗ Errors
```

---

## Adaptation Guide

When replicating, ONLY change these things:

| Change | Example |
|--------|---------|
| Entity name | "items" → "batches" |
| State variables | `items` → `batches`, `itemFilter` → `batchFilter` |
| Data function | `fetchItems()` → `fetchBatches()` |
| Column definitions | Different fields for different entity |
| Route/links | `/items/[id]` → `/stock/batches/[id]` |
| Tab labels | "Products/Materials" → "All/Products/Materials" |
| Stats text | "{N} items" → "{N} batches" |

DO NOT change:
- Styling classes
- Component structure
- Layout patterns
- Spacing values
- Color values
- Interaction patterns

---

## Quick Start Examples

### Example 1: New List Page

```markdown
📚 REFERENCE: src/components/items/ItemsTable.tsx
🎯 TARGET: src/components/stock/BatchesTable.tsx

Adaptations:
| Reference | New Page |
|-----------|----------|
| items | batches |
| fetchItems() | fetchBatches() |
| ItemsTable | BatchesTable |
| /items/[id] | /stock/batches/[id] |

Columns: Name, Variant code, Batch number, Barcode, In stock, Expiration, Created
```

### Example 2: New Detail Page

```markdown
📚 REFERENCE: src/app/items/[id]/page.tsx
🎯 TARGET: src/app/stock/batches/[id]/page.tsx

Adaptations:
| Reference | New Page |
|-----------|----------|
| Item detail | Batch detail |
| fetchItemById() | fetchBatchById() |
| ItemDetailPage | BatchDetailPage |

Fields: [list the fields for batch detail]
```

---

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| New page looks different | Code Agent invented patterns | Re-read reference, copy exactly |
| Missing section | Code Agent skipped part of reference | Check line ranges in reference, add missing section |
| Wrong styling | Different Tailwind classes used | Compare class strings character-by-character |
| Data not loading | Wrong data fetch function | Verify database table/query exists |
| Build errors | Import paths wrong | Check relative paths from new file location |
| Spacing is off | Changed padding/margin values | Copy exact spacing classes from reference |
| Colors don't match | Used different color values | Copy exact color classes from reference |

### If Code Agent "Drifts"

Signs of drift:
- "I improved the layout..."
- "I added a feature..."
- "I used a better pattern..."

Response:
```
STOP. Do not improve or add features.
Your job is to REPLICATE, not innovate.
Re-read the reference file and match it EXACTLY.
```

---

## Why This Works

| Benefit | Explanation |
|---------|-------------|
| **No guessing** | Code Agent sees exactly how it should look |
| **Consistency** | All pages follow the same patterns |
| **Speed** | Copy-adapt is faster than build-from-scratch |
| **Quality** | Reference is already tested and approved |
| **Scalability** | One reference → unlimited pages |

---

## Reference File Requirements

A good reference file must be:

- [ ] Fully functional (no TODOs or placeholders)
- [ ] Visually approved by human
- [ ] Well-structured (clear sections with comments if helpful)
- [ ] Representative (has all common patterns for this page type)
- [ ] Self-contained (minimal external dependencies)

### Creating a New Reference

If no reference exists for a page type:

1. Build the first page carefully with full attention
2. Have human verify visually (Mini Agent can help)
3. Polish until perfect
4. Add to Reference Inventory
5. THEN use it for replication

---

## Integration with Other Skills

```
┌─────────────────────────────────────────────────────────────────┐
│                    UI DEVELOPMENT FLOW                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Need NEW page, no reference exists?                            │
│       │                                                         │
│       ▼                                                         │
│  Build first page carefully → Human verify → Add to inventory   │
│       │                                                         │
│       ▼                                                         │
│  Need MORE pages of same type?                                  │
│       │                                                         │
│       ▼                                                         │
│  ┌─────────────────────────────────────────┐                   │
│  │ reference-based-replication (THIS SKILL)│                   │
│  │ Read → Report → Replicate → Verify      │                   │
│  └─────────────────────────────────────────┘                   │
│       │                                                         │
│       ▼                                                         │
│  Existing page doesn't match reference?                         │
│       │                                                         │
│       ▼                                                         │
│  ┌─────────────────────────────────────────┐                   │
│  │ ui-component-redesign skill             │                   │
│  │ Audit → Delete → Replicate → Perfect    │                   │
│  └─────────────────────────────────────────┘                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

*The reference file is the single source of truth. Copy it exactly.*
