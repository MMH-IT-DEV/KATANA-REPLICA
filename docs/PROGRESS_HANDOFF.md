# Project Handoff: Katana Replica

**Date:** 2025-11-29
**Status:** Phase 1 (Items & Core Architecture) - *In Progress*

---

## 1. The Mission
We are building a pixel-perfect replica of the Katana MRP system.
**Key Architecture:** Next.js 14, Tailwind CSS, Supabase (PostgreSQL).
**Philosophy:** "No Mock Data" - everything must read/write to Supabase.

## 2. The "Council" System (Your Persona)
You are **NOT** a generic AI. You are a Council of three agents defined in `.cursorrules`:
*   **🧠 Lincoln (Architect):** Strategy, Logic, "Why we do this".
*   **🗄️ John (Database):** Supabase, SQL, Data Integrity.
*   **🎨 Frank (UI):** Pixel-perfection, Tailwind, UX.

**INSTRUCTION:** When you start, read `.cursorrules` and `docs/agents/*.md` immediately.

---

## 3. Current State (The "Save Game")

### ✅ Completed
*   **Agent Infrastructure:** `.cursorrules` and `docs/agents/` are set up.
*   **Design System:** Established `#6A9BCC` as the primary brand blue. See `docs/design-system.md`.
*   **Database:**
    *   RLS enabled (`0004_enable_rls.sql`).
    *   `variants` table is the source of truth for items.
*   **Item Detail Page (`src/app/items/[id]/page.tsx`):**
    *   **Dynamic Tabs:** "Recipe" and "Supply" tabs appear/disappear based on "Make/Buy" toggles.
    *   **Editable Variants:** The Variants table is fully editable (Inputs for Price, SKU, etc.).
    *   **Live Saving:** `handleVariantUpdate` writes changes to Supabase instantly.
    *   **Visuals:** "Saving..." indicator is blue (`#6A9BCC`), shadows removed from inputs.

### 🚧 In Progress (Your Next Tasks)
1.  **Recipe Tab Logic:**
    *   The "Product recipe / BOM" tab exists but needs real logic.
    *   **Goal:** Connect the "Add Ingredient" modal to `addRecipeIngredient` in `katana-data-provider.ts`.
    *   **Goal:** Ensure cost calculations update when ingredients are added.
2.  **Supply Tab Logic:**
    *   Ensure "Default Supplier" selection actually saves to the item record.

### 🐛 Known Issues (Fixed, but watch out)
*   **Infinite Saving Loop:** Fixed by wrapping API calls in `try/catch` in `page.tsx`. Do not regress this.
*   **Build Errors:** `getKatanaInventory` was previously deleted by accident. It is restored. Be careful when using `write_file` on `katana-data-provider.ts` - use `search_replace` or read the whole file first.

---

## 4. Immediate Action Plan for New Agent

1.  **Read:** `docs/design-system.md` to understand the color palette.
2.  **Navigate:** Go to `src/app/items/[id]/page.tsx`.
3.  **Task:** Implement the **"Add Ingredient"** functionality in the `Product recipe / BOM` tab.
    *   The UI is there.
    *   Wire up `handleAddIngredient` to actually insert rows into the `recipes` table via Supabase.
    *   Verify the "Total Cost" updates automatically.

**Signed,**
*Agent 7 (Lincoln, John, Frank)*








