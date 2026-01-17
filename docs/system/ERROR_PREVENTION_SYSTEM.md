# 🛡️ Error Prevention System
## Katana MRP Replica Project

**Purpose:** Track all errors encountered, document solutions, and create guidelines to prevent recurrence.

**Last Updated:** 2025-12-11

---

## 📊 Error Log

### Error #001: Navigation Race Condition
| Field | Details |
|-------|---------|
| **Date** | 2025-12-11 |
| **Symptom** | Clicking "New Material" or "New Product" sometimes doesn't navigate |
| **Root Cause** | 1. CSS hover dropdown closing before click registers. 2. `router` in useEffect dependency array causing re-runs |
| **Solution** | 1. Use useState-controlled dropdown with stopPropagation. 2. Remove router from deps, add isCreating lock |
| **Files Changed** | `ItemsTable.tsx`, `items/new/page.tsx` |
| **Prevention Rule** | **NAV-001**: Always use click-controlled dropdowns, never CSS hover for navigation menus. Always add loading locks to prevent double-submission. |

---

## 📜 Prevention Rules (Living Document)

### Navigation Rules (NAV-XXX)

#### NAV-001: Dropdown Navigation
```
❌ DON'T: Use CSS hover-based dropdowns for navigation
✅ DO: Use useState-controlled dropdowns with onClick handlers
✅ DO: Always call e.stopPropagation() and e.preventDefault()
✅ DO: Close dropdown BEFORE navigation, not after
```

#### NAV-002: Page Creation Pattern
```
❌ DON'T: Include `router` in useEffect dependency arrays
❌ DON'T: Allow async operations to run multiple times
✅ DO: Use a loading lock (isCreating state)
✅ DO: Show loading spinner during async operations
✅ DO: Handle errors with user-friendly messages and "Go Back" button
```

### Database Rules (DB-XXX)

#### DB-001: SKU Generation
```
❌ DON'T: Use Math.random() for unique identifiers
✅ DO: Use sequential generation with database lookup
✅ DO: Use prefix by type (PROD-, MAT-, etc.)
✅ DO: Pad numbers (00001, 00002, etc.)
```

#### DB-002: Required Fields
```
❌ DON'T: Assume columns have defaults
✅ DO: Check schema for NOT NULL constraints before insert
✅ DO: Always provide category_id (create "Uncategorized" if needed)
✅ DO: Validate all required fields before database calls
```

### Component Rules (COMP-XXX)

#### COMP-001: Auto-Save Implementation
```
✅ DO: Use debounced saves (1000ms minimum)
✅ DO: Show "Saving..." indicator during save
✅ DO: Show "All changes saved" on success
✅ DO: Handle save errors gracefully
```

#### COMP-002: Modal/Dialog Pattern
```
✅ DO: Use controlled state (isOpen)
✅ DO: Clear form state when closing
✅ DO: Prevent background scroll when open
✅ DO: Close on ESC key and outside click
```

### Agent Specialization Rules (AGENT-XXX)

#### AGENT-001: Dedicated Responsibilities
```
✅ DO: Use UI Agent for all visual/styling changes
✅ DO: Use Logic Agent for database/business logic changes
✅ DO: Clearly state which agent should receive each task
❌ DON'T: Mix UI and logic tasks in the same instruction block
❌ DON'T: Have UI Agent modify server actions or database code
❌ DON'T: Have Logic Agent modify CSS or visual components
```

#### AGENT-002: Cross-Agent Dependencies
```
When a feature requires BOTH UI and Logic work:
1. Logic Agent builds the data layer first
2. Claude Alpha verifies logic works
3. UI Agent builds the visual layer second
4. UI Agent calls existing functions - does NOT create new server actions

Example:
- Logic Agent: Creates addRecipeIngredient() function
- UI Agent: Creates the modal that calls addRecipeIngredient()
```

#### AGENT-003: Handoff Protocol
```
When passing work between agents:
1. Document what was built and where
2. List the functions/components available
3. Specify interfaces (what to call, what it returns)
4. Note any dependencies or prerequisites
```

---

### API/Action Rules (API-XXX)

#### API-001: Server Actions Pattern
```
✅ DO: Always wrap in try/catch
✅ DO: Log errors with context (console.error)
✅ DO: Return null or error object on failure, never throw to UI
✅ DO: Validate inputs before database operations
```

#### API-002: Supabase Queries
```
✅ DO: Check for error in response: if (error) { handle it }
✅ DO: Use .single() only when expecting exactly one row
✅ DO: Add .select() after .insert() to get created data
✅ DO: Use proper types for query parameters
```

---

## 🔍 Pre-Implementation Checklist

Before writing any new feature, Cursor Agent should verify:

### Navigation Feature
- [ ] Using click-controlled state, not CSS hover?
- [ ] stopPropagation and preventDefault added?
- [ ] Loading state implemented?
- [ ] Error state with recovery option?

### Database Insert Feature
- [ ] All NOT NULL fields provided?
- [ ] Unique fields (SKU) using sequential generation?
- [ ] Foreign keys (category_id) validated or defaulted?
- [ ] Error handling for constraint violations?

### Form/Modal Feature
- [ ] Controlled open/close state?
- [ ] Form reset on close?
- [ ] Validation before submit?
- [ ] Loading indicator during submission?

### List/Table Feature
- [ ] Loading state while fetching?
- [ ] Empty state when no data?
- [ ] Error state with retry option?
- [ ] Pagination if large dataset?

---

## 📝 Code Agent Instructions Template

When sending tasks to Cursor Agent, include:

```markdown
## Task: [Feature Name]

### Requirements
[What needs to be built]

### Prevention Rules to Follow
- NAV-001: [If navigation involved]
- DB-001: [If database inserts involved]
- COMP-001: [If forms involved]

### Pre-Implementation Checklist
- [ ] [Specific checks for this feature]

### Expected Deliverables
- [ ] Feature implemented
- [ ] Error handling added
- [ ] Loading states added
- [ ] Tested manually or via script

### Known Gotchas
- [Any project-specific issues to watch for]
```

---

## 🔄 Error Resolution Workflow

When an error occurs:

1. **Document Immediately**
   - Add to Error Log with date, symptom, root cause
   
2. **Fix the Issue**
   - Apply targeted fix
   - Test the fix works
   
3. **Create Prevention Rule**
   - Add new rule (NAV-XXX, DB-XXX, etc.)
   - Include DO and DON'T examples
   
4. **Update Checklists**
   - Add to Pre-Implementation Checklist if applicable
   
5. **Notify for Future Tasks**
   - Reference relevant rules in future instruction blocks

---

## 📈 Error Metrics

| Week | Errors Found | Errors Prevented | Prevention Rate |
|------|--------------|------------------|-----------------|
| Week 1 | 1 | 0 | 0% |
| Week 2 | - | - | - |

**Goal:** Achieve 80%+ prevention rate by maintaining this system.

---

## 🗂️ Quick Reference Card

### Common Patterns

**Safe Navigation:**
```tsx
const [isOpen, setIsOpen] = useState(false);
onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
  setIsOpen(false);
  router.push('/path');
}}
```

**Safe Database Insert:**
```typescript
try {
  const { data, error } = await supabase
    .from('table')
    .insert({ ...validatedData })
    .select()
    .single();
  if (error) throw error;
  return data.id;
} catch (err) {
  console.error('Insert failed:', err);
  return null;
}
```

**Safe Async Page Load:**
```tsx
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  if (isLoading) return; // Prevent double-run
  setIsLoading(true);
  
  doAsyncWork()
    .then(result => handleSuccess(result))
    .catch(err => setError(err.message))
    .finally(() => setIsLoading(false));
}, [/* minimal deps, no router */]);
```

---

## 📚 Reference Documents

- `docs/CURRENT_SCHEMA.md` - Database schema
- `docs/ITEM_CREATION_AUDIT.md` - Frontend audit
- `PROGRESS_HANDOFF.md` - Current build status
- `CLAUDE_LEAD_GUIDELINES.md` - Project guidelines

---

*This is a living document. Update it every time an error is encountered and resolved.*
