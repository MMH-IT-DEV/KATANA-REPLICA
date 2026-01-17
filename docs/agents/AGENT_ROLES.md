# 🤖 Agent Roles & Responsibilities
## Katana MRP Replica Project

**Purpose:** Define clear boundaries between specialized agents to improve quality and reduce confusion.

---

## Agent Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLAUDE ALPHA (Lead)                         │
│         Coordinates, reviews, creates instruction blocks        │
└─────────────────────┬───────────────────────────────────────────┘
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
┌─────────────────────┐ ┌─────────────────────┐
│    UI AGENT         │ │    LOGIC AGENT      │
│    (Frontend)       │ │    (Backend)        │
│                     │ │                     │
│ • Styling/CSS       │ │ • Database ops      │
│ • Dark mode         │ │ • Server actions    │
│ • Layouts           │ │ • Business logic    │
│ • Components        │ │ • Data validation   │
│ • Animations        │ │ • API integrations  │
└─────────────────────┘ └─────────────────────┘
```

---

## 🎨 UI Agent (Frontend Specialist)

### Responsibilities:
- Dark mode / theming
- CSS and Tailwind styling
- Component layouts and structure
- Visual polish and refinement
- Responsive design
- Animations and transitions
- Icon and image handling
- Typography and spacing

### Files Owned:
```
src/app/globals.css
tailwind.config.js / tailwind.config.ts
src/components/ui/*
*.module.css
Layout files (visual structure only)
```

### Can Modify:
- Any `.css` file
- Tailwind classes in components
- Component JSX structure (layout/styling)
- Visual-only props (className, style)

### Should NOT Modify:
- `*-actions.ts` files (server actions)
- `lib/*.ts` (utility functions with logic)
- Database queries
- State management logic
- API calls or data fetching

### Example Tasks:
✅ "Make the app dark mode"
✅ "Add hover effects to table rows"
✅ "Improve the modal design"
✅ "Add loading spinner animation"
❌ "Fix the save function" (Logic Agent task)
❌ "Add new database query" (Logic Agent task)

---

## ⚙️ Logic Agent (Backend Specialist)

### Responsibilities:
- Database operations (Supabase)
- Server actions
- Business logic implementation
- Data validation
- Cost calculations
- Inventory formulas
- API integrations
- Error handling for data operations

### Files Owned:
```
src/lib/katana-actions.ts
src/lib/supabaseClient.ts
src/lib/*.ts (utility functions)
src/app/api/* (API routes)
supabase/migrations/*
scripts/*.js (database scripts)
```

### Can Modify:
- Server action functions
- Database queries
- Business logic
- Data transformation functions
- API route handlers

### Should NOT Modify:
- CSS files (unless fixing a bug)
- Tailwind config (unless adding programmatic colors)
- Component visual structure
- Layout styling

### Example Tasks:
✅ "Add function to calculate product cost"
✅ "Create SKU generation logic"
✅ "Fix database insert failing"
✅ "Add validation before save"
❌ "Make buttons look better" (UI Agent task)
❌ "Add dark mode" (UI Agent task)

---

## 
## 🤝 Collaboration Workflow

### When a Feature Needs Both Agents:

**Example: "Add Ingredient Modal"**

```
Step 1: Logic Agent
├── Creates addRecipeIngredient() function
├── Creates searchItems() function
├── Tests functions work via script
└── Reports: "Functions ready at katana-actions.ts lines 101-140"

Step 2: Claude Alpha Reviews
├── Verifies functions work
├── Documents the interface
└── Creates UI instruction block

Step 3: UI Agent
├── Creates modal component
├── Adds form inputs
├── Calls existing functions (does NOT create new ones)
└── Styles the modal for dark mode
```

### Handoff Template:

When Logic Agent completes work for UI Agent:
```markdown
## Handoff: [Feature Name]

### Functions Available:
- `functionName(param1, param2): ReturnType` - Description
- `anotherFunction(): Promise<Data[]>` - Description

### Location:
- File: `src/lib/katana-actions.ts`
- Lines: 101-140

### Usage Example:
```typescript
const result = await functionName("value1", "value2");
if (result) {
  // success
}
```

### Notes:
- Function handles errors internally
- Returns null on failure
```

---

## 📋 Task Assignment Guide

| Task Type | Assign To | Why |
|-----------|-----------|-----|
| "Add dark mode" | UI Agent | Pure styling |
| "Fix button not saving" | Logic Agent | Database/action issue |
| "Make table look like Katana" | UI Agent | Visual matching |
| "Add cost calculation" | Logic Agent | Business logic |
| "Create new modal" | UI Agent | Component creation |
| "Modal should save to DB" | Logic Agent | Data persistence |
| "Improve loading states" | UI Agent | Visual feedback |
| "Fix SKU generation" | Logic Agent | Data logic |

---

## 🚨 Conflict Resolution

If unclear which agent should do a task:

1. **Ask:** "Does this change how data works, or how things look?"
   - Data → Logic Agent
   - Look → UI Agent

2. **Split if needed:** 
   - "Make modal save correctly" = Logic Agent (save function) + UI Agent (form/button)

3. **When in doubt:** Claude Alpha decides and documents why

---

## 📊 Benefits of This System

| Metric | Before | After |
|--------|--------|-------|
| Context per agent | Large (everything) | Focused (domain only) |
| Error rate | Higher (confusion) | Lower (clear scope) |
| Code quality | Mixed | Specialized excellence |
| Review speed | Slower | Faster (clear ownership) |
| Debugging | "Who changed what?" | Clear responsibility |

---

*This document should be shared with both agents as part of their core memory.*

