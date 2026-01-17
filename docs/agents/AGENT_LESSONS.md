# Key Lessons & Guidelines for Agents

## 1. The "Higher View" Methodology (CRITICAL)
* **Ultimate Goal:** We are building a fully functional ERP to manage stock across **Shopify** and **Amazon**. It is not just a visual replica; it must work.
* **Logic over Looks:** Real ERP logic is paramount. Example: When a user "Makes" a product, the system must automatically deduct the required ingredients from inventory based on the recipe.
* **Think Systematically:** Do not just patch a specific bug. If a data point is wrong (e.g., production time), build the logic to calculate it accurately from the source data.
* **Intentionality:** Every button must have a clear purpose and meaning derived from Katana's functionality. If you are unsure what a button does, ask or consult the Katana logic.
* **Functional Parity:** Features like "Producible" vs "Purchasable" or "Active" vs "Archived" must be replicated with full data integrity.

* **Think Systematically, Not Locally:** Do not just patch a specific bug or change a hardcoded value. Look at the system as a 
whole. If a data point is wrong (e.g., production time), build the logic to calculate it accurately from the source data (e.g., 
summing operation durations from the API) rather than just updating the placeholder.
* **Functional Parity:** We are building a CRM that must be identical to Katana's logic. If a feature exists in Katana (e.g., 
"Producible" vs "Purchasable" logic, "Active" vs "Archived" states), it must be replicated here with full data integrity.
* **Anticipate Needs:** Don't wait for the user to point out missing logic. If you see a "Production Time" column, you should 
proactively implement the calculation logic behind it.

* **Anticipate Needs:** Don't wait for the user to point out missing logic. If you see a "Production Time" column, proactively implement the calculation logic behind it.


## 2. The "Sell Page" is the Design Bible
* **Strict Consistency:** The file `src/app/sell/[orderId]/page.tsx` is the reference implementation.
* **Copy, Don't Invent:** When creating new UI elements (buttons, headers, control bars, inputs), strictly copy the styles, font sizes (`text-xs`, `text-[13px]`), and structural patterns from the Sell page.
* **Visual Precision:** Pay attention to "pill" style tabs, segmented controls, and specific border colors.

## 3. Performance is a Feature
* **Instant & Fluid:** The application must feel native and instant.
* **Technical Excellence:** Implement virtualization for large lists, optimize `useMemo` filters, and ensure interactions like "drag-to-scroll" are buttery smooth and bug-free (e.g., preventing accidental clicks during drags).

## 4. Data Accuracy Standards
* **90%+ Accuracy:** Data extracted and displayed must be accurate to the source (Katana API).
* **Handling Nulls:** Know when to display an empty string `''` versus a hyphen `'-'`.
* **Format Data Correctly:** Display time as "1 m 2 s", not raw seconds. Display prices with correct currency suffixes.

## 5. Specific Agent Preferences
* **Emoji Usage:** In search results or summaries, use actual emoji symbols (🔍, 📍) instead of text codes like `:mag:`.
* **Image Standards:** 
    * Desktop: 1920x1080px
    * Mobile: 414x736px
    * Use responsive `<picture>` elements.

## 6. Modal & Pop-up Design Principles (CRITICAL)
* *
* **Design Consistency Across ALL Modals:** Every modal must follow the established design code from `src/app/sell/[orderId]/page.tsx`:
    - Typography: `text-[13px]` for body, `text-xs` for labels, `font-medium`/`font-bold` for emphasis
    - Colors: Use theme variables (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`) NOT hardcoded colors
    - Spacing: Consistent padding (`p-6`, `p-8`), gaps (`gap-3`, `gap-4`)
    - Buttons: Pill-style segmented controls for toggles (with `bg-secondary/50` wrapper), standard rounded buttons for actions
* **User Flow & Interaction:** Design with how users actually interact with the interface:
    - Place related actions together logically
    - Buttons must be appropriately sized and positioned for easy clicking
    - Clear visual hierarchy: Header → Controls/Metrics → Data Table → Footer
    - Consistent hover states and smooth transitions
    - Consider drag-to-scroll for tables (prevent accidental clicks during drags)
* **Layout Structure (The "Formula"):**
    1. Clean header with title and close button (top-right)
    2. Metrics/control bar with pill tabs on left, stats in middle, action buttons on right
    3. Main content area (table/form) utilizing MAXIMUM width
    4. Footer with status information
* **Aesthetics = Simplistic + Functional:** Every element must have a clear purpose and position. No "all around the place" layouts.

## 7. Technical Implementation Rules
* **Always Verify Changes Work:** When you say "I made it wider," the width must ACTUALLY change in the browser. Don't just modify code and assume it works.
* **Override Component Constraints:** Base components (like `DialogContent`) often have responsive width constraints (e.g., `sm:max-w-lg`). Use `!important` modifier (`!max-w-[95vw]`) to force your custom widths.
* **Fix Accessibility Errors Immediately:** Radix UI components require proper accessibility attributes (e.g., `DialogTitle`). Use `sr-only` class for visually hidden but screen-reader accessible elements.
* **Test in Browser:** After making changes, verify they appear correctly. A hard refresh may be needed to see CSS changes.

## 8. Communication & Iteration
* **Be Honest About Mistakes:** If you say something is fixed but it's not, acknowledge it immediately and investigate why.
* **Understand User Intent:** When user says "make it wider," they mean SIGNIFICANTLY wider (like 95vw), not just incrementally wider.
* **Show, Don't Tell:** Changes must be visible and functional, not just theoretical code updates.

## 9. The "Everything Must Connect" Rule
* **Shopify & Amazon Integration:** The end goal is a system that manages stock across real platforms. Every inventory change here must eventually reflect in Shopify/Amazon.
* **Functional Logic:** If a button implies an action (e.g., "Buy Stock"), it must trigger the corresponding business logic (e.g., create a PO, update Expected stock), not just change a number in a table.
* **Data Integrity:** All "Calculated" fields must be dynamically derived from the sum of their parts (In Stock + Expected - Committed). Never hardcode these values if they can be calculated.
* **Live Data Interconnectivity:** Data must flow seamlessly between different parts of the system. If a product name is changed in the "Item Detail" view, it must immediately reflect in the "Inventory Table" and "Sales Orders" without requiring a hard refresh.

## 10. Agent Responsibility: "The Owner Mindset" (The Verification Flow)
* **Deduce First:** When presented with a new UI/Screenshot, the Agent must analyze the full "picture" and deduce the purpose of every button, input, and metric based on ERP logic.
* **Visual Explanation:** BEFORE implementing code, the Agent must create a "Picture" (verbal or structured explanation) of the window's layout and functionality.
* **Verify Then Build:**
    1.  **User provides screenshot/goal.**
    2.  **Agent analyzes and explains:** "Here is what this page does, what each button means, and how it flows."
    3.  **User verifies:** "Yes, that's correct." OR "No, actually this button does X."
    4.  **Agent implements:** Only after verification does coding begin.
* **Why?** This prevents wasted effort building the "wrong" thing and ensures the Agent truly understands the system architecture before writing a single line of code.

## 11. Critical Rule: NO Blind Placeholder Replacements
* **Context Verification is MANDATORY:** Never replace a code block (like `// ... (pagination state)`) without first READING the file to confirm exactly what code was there before and what dependencies (variables, hooks) it provided to the rest of the component.
* **Linter as a Safety Net:** After EVERY file modification, you MUST run the linter (`read_lints`). If a variable like `filteredItems` is undefined, the linter will catch it immediately. You are not allowed to skip this step.
* **Why?** This prevents "Zombie Code" errors where restoring one part of a file accidentally kills another part because you didn't check the dependencies.

## 12. The "Whole Picture" of Feature Completeness
*   **Input = Output (Persistence Rule):** If an input field exists on screen, it MUST save data. Never create a UI that "looks" editable but resets on refresh. If a backend is missing, create a mutable in-memory store for the session.
*   **Visuals != Functionality:** A page is not "done" because it matches the screenshot pixels. It is done when the *business logic* matches the screenshot. (e.g., A "Rename" field that doesn't rename is a bug, not a feature).
*   **Verify the Lifecycle:** When building a page, ask: "Where does this data come from? Where does it go when changed? What happens if I leave and come back?"
*   **Active Feedback:** Users must always know the system status. "Saved" text should not be static; it must actively change to "Saving..." or show a loading indicator when data is in transit, and "All changes saved" when confirmed.

## 13. Database Stewardship & Project Vision (CRITICAL)
*   **Constant Database Vigilance:** You are the guardian of the Supabase database. Always watch for changes in the codebase that affect the database schema, data structure, or relationships.
*   **Proactive Schema Management:** When you notice the project evolving in a way that impacts the database (new fields, changed relationships, modified data types), you MUST:
    1. Identify the database changes required
    2. Update the Supabase schema accordingly (via SQL migrations or direct updates)
    3. Ensure data integrity is maintained during transitions
    4. Update seed scripts if sample data is affected
*   **Keep the Vision Clear:** Always maintain awareness of the project's ultimate goal:
    - **What we're building:** A fully functional ERP system to manage stock across Shopify and Amazon
    - **Core purpose:** Real-time inventory management with live platform synchronization
    - **Key integrations:** Shopify API, Amazon API, Supabase database
    - **End user:** Business owners who need reliable, instant stock visibility and control
*   **Database-Code Synchronization:** The database schema should never lag behind the codebase. If you add a new feature that requires a `production_batch` field, the database must have that column BEFORE the code tries to access it.
*   **Migration Documentation:** When you make database changes, briefly note them in comments or commit messages so future agents understand the evolution.
*   **Why?** A disconnected database is a broken ERP. The database is the single source of truth, and it must evolve in lockstep with the application logic.
