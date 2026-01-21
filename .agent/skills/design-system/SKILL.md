---
name: design-system
description: "Universal design system for all web projects. Includes colors, typography, spacing, and component patterns. Based on dark theme. Use when building any UI to ensure consistency."
---

# Universal Design System

> **Principle**: Patterns emerge from building, not from pre-planning.
> This system evolves with each project.

---

## Color Palette

### Backgrounds (Dark to Light)

| Name | Hex | Tailwind | Use For |
|------|-----|----------|---------|
| **Page** | `#1a1a18` | `bg-[#1a1a18]` | Page background |
| **Card** | `#262624` | `bg-[#262624]` | Cards, panels |
| **Elevated** | `#2a2a28` | `bg-[#2a2a28]` | Modals, dropdowns |
| **Hover** | `#3a3a38` | `bg-[#3a3a38]` | Hover states |
| **Active** | `#4a4a48` | `bg-[#4a4a48]` | Active/pressed |
| **Border** | `#3a3a38` | `border-[#3a3a38]` | All borders |

### Text

| Name | Hex | Tailwind | Use For |
|------|-----|----------|---------|
| **Primary** | `#faf9f5` | `text-[#faf9f5]` | Main text, headings |
| **Secondary** | `#a8a8a4` | `text-[#a8a8a4]` | Descriptions |
| **Muted** | `#7a7974` | `text-[#7a7974]` | Labels, captions |
| **Disabled** | `#5a5a58` | `text-[#5a5a58]` | Disabled text |

### Semantic Colors

| Name | Hex | Use For |
|------|-----|---------|
| **Accent** | `#d97757` | Primary actions, highlights |
| **Success** | `#8aaf6e` | Success states |
| **Warning** | `#bb8b5d` | Warnings |
| **Error** | `#ff7b6f` | Errors |
| **Info** | `#a5d6ff` | Information, links |

### Node Type Colors (Infrastructure Hub)

| Type | Hex |
|------|-----|
| **Agent** | `#d97757` |
| **Skill** | `#4a9eff` |
| **Reference** | `#888888` |
| **Platform** | `#ff6b6b` |

---

## Typography

### Font Stack
```css
font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
```

### Scale

| Name | Size | Weight | Use For |
|------|------|--------|---------|
| **H1** | 24px / `text-2xl` | 700 | Page titles |
| **H2** | 20px / `text-xl` | 600 | Section headers |
| **H3** | 16px / `text-base` | 600 | Card headers |
| **Body** | 14px / `text-sm` | 400 | Main content |
| **Small** | 12px / `text-xs` | 400 | Labels, captions |
| **Tiny** | 10px / `text-[10px]` | 500 | Badges |

---

## Spacing

| Name | Value | Tailwind |
|------|-------|----------|
| **xs** | 4px | `p-1`, `gap-1` |
| **sm** | 8px | `p-2`, `gap-2` |
| **md** | 16px | `p-4`, `gap-4` |
| **lg** | 24px | `p-6`, `gap-6` |
| **xl** | 32px | `p-8`, `gap-8` |

---

## Components

### Button

```tsx
// Primary
<button className="px-4 py-2 bg-[#d97757] text-white rounded font-medium hover:bg-[#c96747] transition-colors">
  Primary
</button>

// Secondary
<button className="px-4 py-2 bg-[#3a3a38] text-[#faf9f5] rounded font-medium hover:bg-[#4a4a48] transition-colors">
  Secondary
</button>

// Ghost
<button className="px-4 py-2 text-[#7a7974] rounded font-medium hover:bg-[#3a3a38] hover:text-[#faf9f5] transition-colors">
  Ghost
</button>
```

### Card

```tsx
<div className="bg-[#262624] rounded-lg p-4 border border-[#3a3a38]">
  <h3 className="text-base font-semibold text-[#faf9f5] mb-2">Title</h3>
  <p className="text-sm text-[#7a7974]">Content</p>
</div>
```

### Input

```tsx
<input 
  className="w-full px-3 py-2 bg-[#1a1a18] border border-[#3a3a38] rounded text-sm text-[#faf9f5] placeholder-[#5a5a58] focus:border-[#d97757] focus:outline-none transition-colors"
/>
```

### Badge

```tsx
<span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#8aaf6e] text-[#1a1a18]">
  Active
</span>
```

### Table

```tsx
<table className="w-full">
  <thead>
    <tr className="border-b border-[#3a3a38]">
      <th className="text-left text-xs font-semibold text-[#7a7974] px-3 py-2">Column</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-[#3a3a38] hover:bg-[#3a3a38]">
      <td className="text-sm text-[#faf9f5] px-3 py-2">Cell</td>
    </tr>
  </tbody>
</table>
```

---

## Quick Reference

### Most Used Classes

```
Backgrounds: bg-[#1a1a18] bg-[#262624] bg-[#3a3a38]
Text:        text-[#faf9f5] text-[#7a7974] text-[#d97757]
Borders:     border border-[#3a3a38]
Rounded:     rounded rounded-lg
Spacing:     p-4 px-3 py-2 gap-2 gap-4
Flex:        flex items-center justify-between gap-2
```

### Component Quick Patterns

```tsx
// Card
bg-[#262624] rounded-lg p-4 border border-[#3a3a38]

// Primary Button
bg-[#d97757] text-white px-4 py-2 rounded hover:bg-[#c96747]

// Input
bg-[#1a1a18] border border-[#3a3a38] rounded px-3 py-2 text-sm

// Badge
text-[10px] px-2 py-0.5 rounded bg-[#8aaf6e] text-[#1a1a18]
```

---

## Icons

Use **Lucide React** for all icons.

```tsx
import { Settings, Download, Search, Plus, X, Check } from 'lucide-react';

<Settings className="w-4 h-4" />
```

---

## Transitions

All interactive elements: `transition-colors`

---

*This system evolves with each project. Patterns that work get added here.*
