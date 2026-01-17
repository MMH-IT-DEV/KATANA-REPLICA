-- Upgrade sales_orders table with Sell Module features
ALTER TABLE sales_orders 
ADD COLUMN IF NOT EXISTS rank TEXT, -- For Lexorank or simple ordering
ADD COLUMN IF NOT EXISTS shipping_address JSONB,
ADD COLUMN IF NOT EXISTS billing_address JSONB,
ADD COLUMN IF NOT EXISTS customer_notes TEXT,
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'MANUAL', -- e.g. 'SHOPIFY', 'MANUAL'
ADD COLUMN IF NOT EXISTS external_id TEXT; -- Store external system IDs

-- Upgrade sales_order_rows table
ALTER TABLE sales_order_rows
ADD COLUMN IF NOT EXISTS attributes JSONB DEFAULT '[]'::jsonb; -- Custom key-value attributes

-- Add logic/status columns to sales_orders for denormalized performance (Optional but helpful for the grid)
-- For now, we will calculate them on the fly or use views, but let's verify if we need them.
-- The spec mentions "Sales Items Status", "Ingredients Status", "Production Status".
-- These are usually computed. Let's stick to computing them for now to keep the source of truth in inventory.

