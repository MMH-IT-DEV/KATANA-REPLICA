# Standard Form Modal Pattern

## Overview
This document captures the standardized approach for creating form popups/modals in the Katana MRP Replica project, based on the Address popup refinement session.

## Core Structure

### 1. Dialog Component Setup
```tsx
<Dialog open={!!stateVariable} onOpenChange={(open) => !open && setStateVariable(null)}>
    <DialogContent 
        className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5] max-w-md p-0 overflow-hidden"
        onOpenAutoFocus={(e) => e.preventDefault()}  // CRITICAL: Prevents auto-focus/selection
    >
        {/* Content */}
    </DialogContent>
</Dialog>
```

**Key Points:**
- `max-w-md` for compact popups (can adjust to `max-w-lg` for larger forms)
- `p-0` on DialogContent, apply padding to inner sections instead
- `overflow-hidden` for clean rounded corners
- **`onOpenAutoFocus={(e) => e.preventDefault()}`** - Essential to prevent auto-selection bug

## 2. Header Section
```tsx
<DialogHeader className="px-5 pt-5 pb-2">
    <DialogTitle className="text-lg font-medium">Edit address</DialogTitle>
</DialogHeader>
```

**Styling:**
- Padding: `px-5 pt-5 pb-2` (compact vertical spacing)
- Title: `text-lg font-medium` (not too large)

## 3. Content/Form Section
```tsx
<div className="px-5 pt-1 pb-4 space-y-4">
    {/* Form fields */}
</div>
```

**Spacing:**
- Horizontal padding: `px-5` (matches header)
- Vertical: `pt-1 pb-4` (compact)
- Field spacing: `space-y-4` between field groups

## 4. Input Field Pattern

### Standard Input Field
```tsx
<div className="space-y-1">
    <Label className="text-[10px] font-bold text-[#7a7974] uppercase tracking-wider">
        Field Label
    </Label>
    <Input
        value={value}
        placeholder="Placeholder text"
        onChange={(e) => setValue(e.target.value)}
        className="bg-[#262624] border border-[#3a3a38] h-8 text-sm px-3 focus-visible:ring-0 focus-visible:border-[#d97757] focus-visible:bg-[#2a2a28]"
    />
</div>
```

**Input Styling Breakdown:**
- **Background**: `bg-[#262624]` - Darker filled background
- **Border**: `border border-[#3a3a38]` - Subtle outline
- **Height**: `h-8` - Compact
- **Padding**: `px-3` - Adequate spacing from border edge
- **Focus state**: 
  - `focus-visible:ring-0` - No focus ring
  - `focus-visible:border-[#d97757]` - Coral border on focus
  - `focus-visible:bg-[#2a2a28]` - Slightly lighter background on focus

**Label Styling:**
- Size: `text-[10px]` - Small, compact
- Weight: `font-bold`
- Color: `text-[#7a7974]` - Muted gray
- Transform: `uppercase tracking-wider`

### Grid Layout for Side-by-Side Fields
```tsx
<div className="grid grid-cols-2 gap-3">
    <div className="space-y-1">
        {/* Field 1 */}
    </div>
    <div className="space-y-1">
        {/* Field 2 */}
    </div>
</div>
```

**Grid spacing:** `gap-3` (compact)

## 5. Footer Section

### Structure
```tsx
<div className="flex items-center justify-between px-5 py-4 bg-[#1a1a18]">
    {/* Left: Destructive action */}
    <button
        onClick={handleDelete}
        className="flex items-center gap-2 text-[#ff7b6f] px-3 py-1.5 hover:bg-[#ff7b6f]/10 rounded transition-all"
    >
        <Trash2 size={14} />
        <span className="text-sm font-medium">Delete</span>
    </button>
    
    {/* Right: Primary actions */}
    <div className="flex gap-3">
        <Button
            variant="ghost"
            onClick={handleCancel}
            className="h-8 px-4 text-sm font-medium border border-[#3a3a38] hover:bg-white/[0.05] text-[#faf9f5]"
        >
            Cancel
        </Button>
        <Button
            onClick={handleSave}
            className="h-8 px-5 bg-[#d97757] hover:bg-[#c66b4d] text-white text-sm font-medium shadow-sm"
        >
            Ok
        </Button>
    </div>
</div>
```

**Footer Styling:**
- **Background**: `bg-[#1a1a18]` - Same as dialog background (no split/divider)
- **NO border-top** - Seamless appearance
- **Padding**: `px-5 py-4` - Matches content padding
- **Layout**: `justify-between` for left/right alignment

### Button Patterns

**Delete/Destructive Button:**
- Icon + text
- Color: `text-[#ff7b6f]` (coral/red)
- Hover: `hover:bg-[#ff7b6f]/10` (subtle background)
- No border, minimal style

**Cancel Button:**
- Ghost variant with border
- Border: `border border-[#3a3a38]`
- Height: `h-8`
- Hover: `hover:bg-white/[0.05]`

**Primary/Save Button:**
- Background: `bg-[#d97757]` (coral)
- Hover: `hover:bg-[#c66b4d]` (darker coral)
- Height: `h-8`
- Shadow: `shadow-sm`

## Color Palette Reference

```tsx
// Backgrounds
--dialog-bg: #1a1a18        // Main dialog background
--input-bg: #262624         // Input field background
--input-focus-bg: #2a2a28   // Input on focus

// Borders
--border-default: #3a3a38   // Default borders
--border-focus: #d97757     // Focus state (coral)

// Text
--text-primary: #faf9f5     // Primary text
--text-muted: #7a7974       // Labels, secondary text

// Accents
--accent-coral: #d97757     // Primary action color
--accent-red: #ff7b6f       // Destructive actions
```

## Common Pitfalls & Fixes

### 1. Auto-Selection Bug
**Problem:** Text in first input gets auto-selected when dialog opens.

**Solution:** Add `onOpenAutoFocus={(e) => e.preventDefault()}` to DialogContent.

### 2. Split/Divider Between Sections
**Problem:** Visible line between content and footer.

**Solution:** 
- Remove `border-t border-[#3a3a38]` from footer
- Use same background color as dialog: `bg-[#1a1a18]`

### 3. Text Too Close to Input Border
**Problem:** Input text appears cramped against the border.

**Solution:** Add `px-3` to input className for adequate horizontal padding.

### 4. Inconsistent Spacing
**Problem:** Popup feels too large or unbalanced.

**Solution:**
- Use `space-y-4` for field groups
- Use `space-y-1` within individual field containers
- Keep padding consistent: `px-5` for horizontal, `py-4` for vertical

## Quick Checklist

When creating a new popup, ensure:
- [ ] `onOpenAutoFocus={(e) => e.preventDefault()}` on DialogContent
- [ ] `p-0` on DialogContent, padding on inner sections
- [ ] Input fields have `px-3` for text spacing
- [ ] Footer has NO `border-t`, same `bg-[#1a1a18]` as dialog
- [ ] Consistent padding: `px-5` horizontal
- [ ] Compact spacing: `h-8` inputs, `space-y-4` between groups
- [ ] Focus states: coral border `focus-visible:border-[#d97757]`
- [ ] Button heights: `h-8` for compact appearance
