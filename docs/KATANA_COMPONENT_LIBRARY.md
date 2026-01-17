# Katana Component Library - Design Patterns

This document records the exact design specifications for reusable Katana UI components, captured from the flagship **Stock** and **Schedule** modules.

---

## 🔘 1. Action Buttons (Subtle Style)
Used for Print, Download, and Export actions. These buttons are quiet and blend into the background.

| Property | Value |
| :--- | :--- |
| **Background** | Transparent / `bg-background` |
| **Border** | `1px solid #3a3a38` (or `border-border`) |
| **Padding** | `p-1.5` (approx 6px) |
| **Border Radius** | `rounded-md` (4px) |
| **Icon Color** | `#7a7974` (`text-muted-foreground`) |
| **Hover State** | `hover:bg-[#3a3a38]/40`, `text-foreground` (#faf9f5) |
| **Implementation** | `className="p-1.5 border border-[#3a3a38] rounded-md hover:bg-[#3a3a38]/40 transition-colors text-[#7a7974] hover:text-[#faf9f5]"` |

---

## 🔽 2. Selection Dropdown (Dark Control)
The standard trigger for filters like "Location" or "Resource".

| Property | Value |
| :--- | :--- |
| **Background** | `#2a2a28` |
| **Border** | `1px solid #4a4a48` (dark gray) |
| **Padding** | `px-3 py-1.5` |
| **Typography** | `text-xs font-bold uppercase tracking-wider text-white` |
| **Hover State** | `hover:bg-[#323230]` |
| **Trigger Icons** | Left: `User` (for location), Right: `ChevronDown` |

---

## 📜 3. Dropdown Menu (Popup)
The content that appears when clicking a selection dropdown.

### Container
| Property | Value |
| :--- | :--- |
| **Background** | `#1e1e1e` (True Dark) |
| **Border** | `1px solid #3a3a38` |
| **Shadow** | Subtle outer glow / shadow |
| **Implementation** | `className="bg-[#1e1e1e] border-[#3a3a38] rounded shadow-lg p-1"` |

### Section Header (Label)
| Property | Value |
| :--- | :--- |
| **Typography** | `text-[#7a7974] text-[10px] uppercase font-bold tracking-widest px-3 py-2` |

### Menu Item
| Property | Value |
| :--- | :--- |
| **Text Color** | `#faf9f5` |
| **Typography** | `text-xs py-1.5 px-3 rounded` |
| **Hover State** | `bg-[#2a2a28]` |

---

## 📊 4. Dashboard Table Header
Reference for all new tables.

| Element | Style |
| :--- | :--- |
| **Header Row** | `bg-[#262624] border-b border-[#3a3a38] h-10` |
| **Header Text** | `text-[10px] font-bold text-[#7a7974] uppercase tracking-widest` |
| **Filter Row** | `bg-[#1a1a18] border-b border-[#3a3a38] h-9` |
| **Total Row** | `bg-[#262624]/40 border-b border-[#3a3a38] font-bold text-[11px]` |

---

## 🔄 5. Status Indicators (Circles)
| Status | Outer Style | Inner Style |
| :--- | :--- | :--- |
| **Done** | `bg-[#8aaf6e]` | White `Check` icon |
| **WIP** | `border-[#bb8b5d]` | Half-fill or 50% height bottom fill |
| **Paused** | `bg-[#d97757]` | White `Pause` icon |
| **Blocked** | `bg-[#ff7b6f]` | White `X` or Pause icon |
| **Empty** | `border-[#3a3a38]` | - |
