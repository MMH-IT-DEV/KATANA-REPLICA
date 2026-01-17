-- 📊 PERFORMANCE OPTIMIZATION SCRIPT
-- Run this script in the Supabase Dashboard SQL Editor.

-- 1. Check Existing Indexes (For reporting purposes)
SELECT
    tablename,
    indexname,
    indexdef
FROM
    pg_indexes
WHERE
    schemaname = 'public'
ORDER BY
    tablename,
    indexname;

-- 2. Add Performance Indexes
-- Note: Using 'IF NOT EXISTS' to avoid errors if run multiple times.
-- Note: 'order_no' is used instead of 'order_number' based on schema verification.

-- Indexes for Manufacturing Orders
CREATE INDEX IF NOT EXISTS idx_manufacturing_orders_status 
ON manufacturing_orders(status);

CREATE INDEX IF NOT EXISTS idx_manufacturing_orders_created_at 
ON manufacturing_orders(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_manufacturing_orders_order_no
ON manufacturing_orders(order_no);

-- Indexes for Sales Orders
CREATE INDEX IF NOT EXISTS idx_sales_orders_status 
ON sales_orders(status);

CREATE INDEX IF NOT EXISTS idx_sales_orders_created_at 
ON sales_orders(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_sales_orders_customer_id 
ON sales_orders(customer_id);

-- Indexes for Items
CREATE INDEX IF NOT EXISTS idx_items_name 
ON items(name);

CREATE INDEX IF NOT EXISTS idx_items_category_id 
ON items(category_id);

-- Indexes for Variants
CREATE INDEX IF NOT EXISTS idx_variants_item_id 
ON variants(item_id);

CREATE INDEX IF NOT EXISTS idx_variants_sku 
ON variants(sku);

-- Indexes for Stocktakes
CREATE INDEX IF NOT EXISTS idx_stocktakes_status 
ON stocktakes(status);

CREATE INDEX IF NOT EXISTS idx_stocktake_items_stocktake_id 
ON stocktake_items(stocktake_id);

-- Indexes for Manufacturing Order Rows & Operations
CREATE INDEX IF NOT EXISTS idx_mo_rows_manufacturing_order_id 
ON manufacturing_order_rows(manufacturing_order_id);

CREATE INDEX IF NOT EXISTS idx_mo_operations_manufacturing_order_id 
ON manufacturing_order_operations(manufacturing_order_id);

-- 3. Analyze Table Statistics
-- Updates internal statistics for the query planner
ANALYZE manufacturing_orders;
ANALYZE sales_orders;
ANALYZE items;
ANALYZE variants;
ANALYZE stocktakes;
ANALYZE manufacturing_order_rows;
ANALYZE manufacturing_order_operations;

-- 4. Check Query Performance example
-- This will output the query plan. Look for 'Index Scan' vs 'Seq Scan'.
EXPLAIN ANALYZE
SELECT * FROM manufacturing_orders
WHERE status = 'not_started'
ORDER BY created_at DESC
LIMIT 50;
