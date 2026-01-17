# Katana Replica - Design System Reference

## 🎯 Purpose
This document defines the design system for the Katana MRP Replica. 
Code Agent MUST read this before creating any UI components.

---

## 🎨 Color Palette

### Backgrounds (Dark Theme)
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-page` | `#1a1a18` | Main page background |
| `bg-card` | `#262624` | Cards, modals, table headers, dropdowns |
| `bg-hover` | `#3a3a38` | Hover states, selected rows |
| `bg-input` | `#1a1a18` | Input field backgrounds |

### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#faf9f5` | Primary text, headings |
| `text-secondary` | `#bebcb3` | Secondary text, descriptions |
| `text-muted` | `#7a7974` | Muted text, placeholders, labels |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `accent-coral` | `#d97757` | Primary actions, links, focus states |
| `accent-coral-hover` | `#e08868` | Hover state for coral |
| `accent-green` | `#8aaf6e` | Success, "In stock", "Done" |
| `accent-amber` | `#bb8b5d` | Warning, "Expected", "Work in progress" |
| `accent-red` | `#ff7b6f` | Error, "Not available", "Blocked" |
| `accent-blue` | `#5b9bd5` | Info, links (alternative) |

### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| `border-default` | `#3a3a38` | Default borders |
| `border-focus` | `#d97757` | Focus state borders |

---

## 📐 Spacing & Layout

### Spacing Scale
- `xs`: 4px (gap-1, p-1)
- `sm`: 8px (gap-2, p-2)
- `md`: 12px (gap-3, p-3)
- `lg`: 16px (gap-4, p-4)
- `xl`: 24px (gap-6, p-6)

### Page Layout
```tsx
<div className="min-h-screen bg-[#1a1a18] text-[#faf9f5]">
  {/* Header */}
  <div className="flex items-center justify-between p-4 border-b border-[#3a3a38]">
    {/* Left: Tabs, Count */}
    {/* Right: Filters, Actions */}
  </div>
  
  {/* Content */}
  <div className="p-4">
    {/* Table or content */}
  </div>
</div>
```

---

## 🧩 Component Patterns

### 1. Tab Buttons (Open/Done)
```tsx
<div className="flex gap-2">
  <button
    onClick={() => setActiveTab('open')}
    className={`px-4 py-2 rounded font-medium transition-colors ${
      activeTab === 'open'
        ? 'bg-[#3a3a38] text-[#faf9f5]'
        : 'text-[#7a7974] hover:text-[#faf9f5]'
    }`}
  >
    Open
  </button>
  <button
    onClick={() => setActiveTab('done')}
    className={`px-4 py-2 rounded font-medium transition-colors ${
      activeTab === 'done'
        ? 'bg-[#3a3a38] text-[#faf9f5]'
        : 'text-[#7a7974] hover:text-[#faf9f5]'
    }`}
  >
    Done
  </button>
</div>
```

### 2. Data Table
```tsx
<table className="w-full">
  {/* Header */}
  <thead>
    <tr className="bg-[#262624] border-b border-[#3a3a38]">
      <th className="py-3 px-3 text-left text-sm text-[#bebcb3] font-medium">
        COLUMN NAME
      </th>
    </tr>
    {/* Filter Row */}
    <tr className="bg-[#1a1a18] border-b border-[#3a3a38]">
      <td className="py-2 px-3">
        <input
          type="text"
          placeholder="Filter"
          className="w-full bg-transparent text-sm text-[#faf9f5] placeholder:text-[#7a7974] outline-none"
        />
      </td>
    </tr>
  </thead>
  
  {/* Body */}
  <tbody>
    <tr className="border-b border-[#3a3a38] hover:bg-[#262624] transition-colors">
      <td className="py-3 px-3 text-[#faf9f5]">Cell content</td>
    </tr>
  </tbody>
</table>
```

### 3. Status Badge (Solid Background)
```tsx
// Green - Success/Done/In Stock
<span className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-[#8aaf6e] text-white">
  In stock
</span>

// Amber - Warning/Expected/In Progress
<span className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-[#bb8b5d] text-white">
  Expected
</span>

// Red - Error/Not Available/Blocked
<span className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-[#ff7b6f] text-white">
  Not available
</span>

// Gray - Not Started/Default
<span className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-[#3a3a38] text-[#faf9f5]">
  Not started
</span>
```

### 4. Status Dropdown
```tsx
<div className="relative">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium bg-[#8aaf6e] text-white"
  >
    Done
    <ChevronDown className="w-3 h-3" />
  </button>
  
  {isOpen && (
    <div className="absolute right-0 top-full mt-1 bg-[#262624] border border-[#3a3a38] rounded shadow-lg z-50 min-w-[150px]">
      {options.map((option) => (
        <button
          key={option.value}
          className="w-full px-3 py-2 text-left text-sm text-[#faf9f5] hover:bg-[#3a3a38]"
        >
          {option.label}
        </button>
      ))}
    </div>
  )}
</div>
```

### 5. Primary Action Button
```tsx
<button className="flex items-center gap-2 px-4 py-2 bg-[#d97757] hover:bg-[#e08868] text-white rounded transition-colors">
  <Plus className="w-4 h-4" />
  Manufacturing Order
</button>
```

### 6. Secondary Button / Dropdown Trigger
```tsx
<button className="flex items-center gap-2 px-4 py-2 bg-[#262624] border border-[#3a3a38] rounded text-[#faf9f5] hover:bg-[#3a3a38] transition-colors">
  <span>MMH Kelowna</span>
  <ChevronDown className="w-4 h-4" />
</button>
```

### 7. Clickable Link (Table Cell)
```tsx
<Link 
  href={`/make/${order.id}`}
  className="text-[#d97757] hover:text-[#e08868] hover:underline"
>
  {order.orderNo}
</Link>
```

### 8. Chip/Tag (Operators)
```tsx
<div className="flex flex-wrap gap-1">
  {operators.map((op) => (
    <span 
      key={op}
      className="px-2 py-0.5 bg-[#3a3a38] text-[#faf9f5] text-xs rounded"
    >
      {op}
    </span>
  ))}
</div>
```

### 9. Totals Row
```tsx
<tr className="bg-[#262624] border-b border-[#3a3a38] font-medium">
  <td className="py-3 px-3 text-[#faf9f5]">Total</td>
  <td className="py-3 px-3 text-[#faf9f5] text-right">72 h 29 m 18 s</td>
</tr>
```

### 10. Empty State Indicator
```tsx
<span className="text-[#7a7974]">-</span>
// or
<span className="text-[#7a7974]">...</span>
```

### 11. Circular Status Indicator
```tsx
// Empty circle (not started)
<div className="w-5 h-5 rounded-full border-2 border-[#3a3a38]" />

// Filled circle (done)
<div className="w-5 h-5 rounded-full bg-[#8aaf6e]" />

// Half circle or in-progress
<div className="w-5 h-5 rounded-full border-2 border-[#bb8b5d] bg-[#bb8b5d]/30" />
```

---

## 📊 Table Column Patterns

### Time Display
```tsx
// Format: "X h Y m Z s"
const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  
  const parts = [];
  if (h > 0) parts.push(`${h} h`);
  if (m > 0) parts.push(`${m} m`);
  if (s > 0 || parts.length === 0) parts.push(`${s} s`);
  
  return parts.join(' ');
};

// Display with planned/actual
<span className="text-[#faf9f5]">{formatTime(planned)}</span>
<span className="text-[#7a7974]"> / </span>
<span className="text-[#bebcb3]">{formatTime(actual)}</span>
```

### Quantity Display
```tsx
// Format: "actual / planned UOM"
<span className="text-[#faf9f5]">{actual}</span>
<span className="text-[#7a7974]"> / </span>
<span className="text-[#bebcb3]">{planned} {uom}</span>
```

### Currency Display
```tsx
// Format: "1,234.56 CAD"
const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString('en-CA', { minimumFractionDigits: 2 })} CAD`;
};

<span className="text-[#faf9f5]">{formatCurrency(amount)}</span>
<span className="text-[#7a7974] text-xs ml-1">CAD</span>
```

### Date Display
```tsx
// Format: "YYYY-MM-DD"
<span className="text-[#faf9f5]">{date || '-'}</span>
```

---

## 🔧 Reference Files

Before building any new page, study these existing implementations:

1. **Schedule Page (Make)**: `src/app/make/page.tsx`
   - Open/Done tabs
   - Data table with filters
   - Status badges and dropdowns

2. **MO Detail Page**: `src/components/make/ManufacturingOrderDetail.tsx`
   - Complex forms
   - Time/Quantity pickers
   - Status dropdowns

3. **Items Page**: `src/app/items/[id]/page.tsx`
   - Tab navigation
   - Detailed forms
   - Production operations table

4. **UI Components**: `src/components/ui/`
   - DatePicker
   - StatusDropdown
   - SearchableDropdown

---

## ✅ Checklist Before Writing Code

1. [ ] Read this Design System document
2. [ ] Study the reference files listed above
3. [ ] Identify which components can be reused
4. [ ] Use exact hex colors from palette (no approximations)
5. [ ] Follow spacing conventions
6. [ ] Test hover and focus states
7. [ ] Ensure consistent typography

---

## ❌ Common Mistakes to Avoid

1. **Wrong background color**: Use `#1a1a18` for page, `#262624` for cards
2. **Wrong text color**: Primary is `#faf9f5`, NOT white (#ffffff)
3. **Missing hover states**: Always add `hover:bg-[#3a3a38]` for interactive elements
4. **Inconsistent borders**: Use `border-[#3a3a38]` everywhere
5. **Wrong focus color**: Focus should be `#d97757` (coral), not blue
6. **Missing transitions**: Add `transition-colors` for smooth interactions
7. **Hardcoded values**: Use the defined color tokens, not arbitrary colors
