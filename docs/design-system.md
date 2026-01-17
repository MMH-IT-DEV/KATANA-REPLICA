# Katana Replica Design System

This document serves as the source of truth for all UI components, colors, and styles in the Katana Replica project. All new code must adhere to these standards.

**Source of Truth:** `src/app/sell/[orderId]/page.tsx` and `src/components/sell/OrderDetail.tsx`

---

## 1. Colors

### Primary
- **Foreground (Text):** `text-foreground` (Standard black/dark gray)
- **Muted Text:** `text-muted-foreground` (Gray #9CA3AF or similar)
- **Primary Brand:** `text-primary` (Usually black or a very dark green/gray in this system)
- **Links:** `text-primary hover:underline` (Not blue, unless specific external link)
- **Blue:** `text-[#6A9BCC]` (Specific brand blue for Info icons and active states)

### Status Colors
- **Green (Success/Stock):** `text-emerald-600` or `text-status-green`
- **Red (Error/Warning):** `text-red-600` or `text-status-red`
- **Amber (Pending):** `text-amber-700`

### Backgrounds
- **Main:** `bg-background`
- **Secondary/Hover:** `bg-secondary/50` (Subtle gray for rows/hovers)
- **Border:** `border-border`

---

## 2. Typography

- **Font:** `font-sans` (Inter/System Default)
- **Sizes:**
    - **Page Title:** `text-xl font-medium tracking-tight`
    - **Section Headers:** `text-sm font-medium`
    - **Body Text:** `text-[13px]` (Standard Katana size)
    - **Small Labels:** `text-xs font-medium text-muted-foreground`
    - **Micro Labels:** `text-[10px]` (Currency codes, unit labels)

---

## 3. Layout & Spacing

- **Max Width:** `max-w-[1600px]` (Wide layout)
- **Page Padding:** `p-6`
- **Cards:** `rounded-lg border border-border p-6`
- **Gap:** Standard `gap-4` or `gap-6` between sections.

---

## 4. Components

### Buttons
- **Standard:** `px-4 py-2 rounded-md text-sm font-medium transition-colors`
- **Ghost/Icon:** `p-2 hover:bg-secondary/50 rounded-md text-muted-foreground hover:text-foreground`
- **Primary Action:** `bg-primary text-primary-foreground hover:bg-primary/90`

### Inputs
- **Table Inputs:** `h-7 bg-transparent border-transparent focus:border-primary focus:bg-background shadow-none` (No outlines unless focused)
- **Standard Inputs:** `h-9`

### Modals (Dialogs)
- **Style:** Wide, clean, no unnecessary borders.
- **Header:** `text-lg font-medium tracking-tight`
- **Footer:** Clear separation with `Save` and `Cancel`.

---

## 5. "Saving" Indicator

- **Standard:** `text-xs text-muted-foreground`
- **Icon:** `Loader2` (animate-spin) or `Check`
- **Color:** Do **NOT** use blue. Use `text-muted-foreground` or `text-emerald-600` for success.

---

## 6. Icons

- **Library:** `lucide-react`
- **Size:** Standard `14` or `16` for UI elements, `18` or `20` for navigation.
- **Color:** Generally `text-muted-foreground` unless interactive.

