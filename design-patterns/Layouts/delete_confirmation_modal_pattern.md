# Delete Confirmation Modal Pattern (Standard)

## Overview
This document captures the standardized approach for **destructive confirmation modals** in the Katana MRP Replica project, based on the finalized "Delete Location" implementation.

## Core Specifications

| Property | Value | Notes |
|----------|-------|-------|
| **Max Width** | `max-w-md` | Compact width for focused decision |
| **Background** | `bg-[#1a1a18]` | Standard dark theme dialog background |
| **Border** | `border-[#3a3a38]` | Subtle border |
| **Paddings** | See below | Highly specific compact spacing |

## Layout Structure

### 1. Header
```tsx
<DialogHeader className="px-5 pt-5 pb-2">
    <DialogTitle className="text-lg font-semibold tracking-tight">
        Delete the "Target Name" item
    </DialogTitle>
</DialogHeader>
```
- **Padding**: `px-5 pt-5 pb-2`
- **Typography**: `text-lg font-semibold tracking-tight`

### 2. Content Body
```tsx
<div className="px-5 pt-1 pb-4 space-y-3">
    <p className="text-[13px] text-[#faf9f5] leading-relaxed">
        Warning message line 1.
    </p>
    <p className="text-[13px] text-[#faf9f5] leading-relaxed">
        <strong className="font-bold">Bold impact statement.</strong>
    </p>
</div>
```
- **Padding**: `px-5 pt-1 pb-4` (Top padding reduced to `pt-1` to pull text closer to header)
- **Spacing**: `space-y-3` between paragraphs
- **Typography**: `text-[13px]` for body text

### 3. Footer / Actions
```tsx
<div className="flex justify-end gap-3 px-5 py-4 bg-[#1a1a18]">
    <Button
        variant="ghost"
        onClick={handleCancel}
        className="h-8 px-4 text-sm font-medium border border-[#3a3a38] hover:bg-white/[0.05] text-[#faf9f5]"
    >
        Cancel
    </Button>
    <Button
        onClick={handleDelete}
        className="h-8 px-3 bg-[#d97371] hover:bg-[#d97371]/90 text-white text-sm font-medium shadow-sm transition-colors"
    >
        Delete
    </Button>
</div>
```
- **Padding**: `px-5 py-4`
- **Gap**: `gap-3` between buttons
- **Button Height**: `h-8` (Compact)

## Button Styles

### Cancel Button
- **Style**: Ghost with Border
- **Border**: `border border-[#3a3a38]`
- **Text Color**: `text-[#faf9f5]` (White/Neutral)
- **Hover**: `hover:bg-white/[0.05]`

### Delete Button
- **Style**: Solid Destructive
- **Background**: `#d97371` (Custom softer red)
- **Hover**: `#d97371` with 90% opacity or similar
- **Padding**: `px-3` (Compact width)
- **Text**: White, `font-medium`

## Complete Example Snippet

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5] max-w-md p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="px-5 pt-5 pb-2">
            <DialogTitle className="text-lg font-semibold tracking-tight">
                Delete Confirmation
            </DialogTitle>
        </DialogHeader>

        <div className="px-5 pt-1 pb-4 space-y-3">
            <p className="text-[13px] text-[#faf9f5] leading-relaxed">
                Are you sure you want to delete this item?
            </p>
            <p className="text-[13px] text-[#faf9f5] leading-relaxed">
                This action cannot be undone.
            </p>
        </div>

        <div className="flex justify-end gap-3 px-5 py-4 bg-[#1a1a18]">
            <Button
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="h-8 px-4 text-sm font-medium border border-[#3a3a38] hover:bg-white/[0.05] text-[#faf9f5]"
            >
                Cancel
            </Button>
            <Button
                onClick={handleConfirm}
                className="h-8 px-3 bg-[#d97371] hover:bg-[#d97371]/90 text-white text-sm font-medium shadow-sm transition-colors"
            >
                Delete
            </Button>
        </div>
    </DialogContent>
</Dialog>
```

## Instructions & Best Practices

### 1. Vertical Rhythm
Crucial for a clean destructive UI:
- Use `pt-5 pb-2` on the Header.
- Use `pt-1 pb-4` on the Content div. This "pulls" the warning text closer to the title, indicating they are a single logical unit of information.
- Use `py-4` on the Footer.

### 2. High Friction Destructive Actions
- The Delete button uses a specific **soft red (`#d97371`)** that is noticeable but not garish against the dark theme.
- The button width is constrained (`px-3`) to keep it compact and "secondary" in visual weight compared to large primary "Save" buttons, while its color provides the necessary warning.

### 3. Common Pitfalls
- **Avoid Dividers**: Never add a horizontal line between the content and the footer. The `bg-[#1a1a18]` should be continuous.
- **Button Alignment**: Always right-align the buttons in the footer.
- **Text Density**: Paragraphs should use `text-[13px]` and `leading-relaxed` for maximum readability.

## Quick Checklist
- [ ] `max-w-md` applied to DialogContent
- [ ] No border-top on footer
- [ ] Cancel button has `#3a3a38` border
- [ ] Delete button uses background `#d97371`
- [ ] Padding: `px-5` horizontal across all segments
- [ ] Paragraph density: `space-y-3` between p tags
