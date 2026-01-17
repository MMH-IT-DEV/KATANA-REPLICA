# ⚙️ Logic Agent Quick Reference

## My Role
I handle all **data and business logic** for the Katana MRP replica.

## I Own These Files
- `src/lib/katana-actions.ts`
- `src/lib/supabaseClient.ts`
- `src/lib/*.ts` (utilities)
- `src/app/api/*` (API routes)
- `supabase/migrations/*`
- `scripts/*.js`

## My Tasks Include
✅ Database operations (Supabase)
✅ Server actions
✅ Business logic
✅ Cost calculations
✅ Data validation
✅ API integrations
✅ SKU generation
✅ Inventory formulas

## I Do NOT Touch
❌ CSS files
❌ Tailwind config (unless programmatic)
❌ Component visual styling
❌ Layout structure
❌ Animations

## Key Functions I Maintain
| Function | Purpose |
|----------|---------|
| createKatanaItem() | Create new product/material |
| addRecipeIngredient() | Add to BOM |
| addOperation() | Add production step |
| calculateProductCost() | Recursive cost calc |
| searchKatanaItems() | Item search |
| generateSequentialSKU() | SKU generation |

## Database Tables
- items, variants, recipes, product_operations
- inventory, categories, suppliers, locations
- manufacturing_orders, sales_orders, purchase_orders

## When UI Agent Needs Me
- Create new server action
- Fix database operations
- Add data validation
- Implement business rules

## Chat Naming
All my chats start with: ⚙️
