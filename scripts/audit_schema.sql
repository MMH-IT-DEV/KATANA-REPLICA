-- 📊 DATA INTEGRITY AUDIT SCRIPT
-- Run this script in the Supabase Dashboard SQL Editor to perform the full audit.

-- 1. Check existing foreign key constraints
SELECT
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
ORDER BY tc.table_name;

-- 2. Check unique constraints
SELECT
    tc.table_name,
    kcu.column_name,
    tc.constraint_name
FROM 
    information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu 
      ON tc.constraint_name = kcu.constraint_name
WHERE tc.constraint_type = 'UNIQUE'
ORDER BY tc.table_name;

-- 3. Add Missing Unique Constraints (Safe to run, will fail if exists)
-- Add unique constraint on manufacturing order numbers
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'manufacturing_orders_order_no_unique') THEN
        -- Note: User prompt said 'order_number' but DB usually uses 'order_no' in this project (based on code). 
        -- Checking code usage: 'orderNo' maps to 'order_no' in fetchManufacturingOrders.
        -- Usage: order_no
        ALTER TABLE manufacturing_orders
        ADD CONSTRAINT manufacturing_orders_order_no_unique 
        UNIQUE (order_no);
    END IF;
EXCEPTION
    WHEN duplicate_column THEN RAISE NOTICE 'Constraint already exists';
    WHEN undefined_column THEN 
        -- Fallback to order_number if order_no doesn't exist (less likely based on code)
        ALTER TABLE manufacturing_orders
        ADD CONSTRAINT manufacturing_orders_order_number_unique 
        UNIQUE (order_number);
END $$;

-- Add unique constraint on sales order numbers
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'sales_orders_order_no_unique') THEN
        ALTER TABLE sales_orders
        ADD CONSTRAINT sales_orders_order_no_unique 
        UNIQUE (order_no);
    END IF;
EXCEPTION 
    WHEN undefined_column THEN
         ALTER TABLE sales_orders
        ADD CONSTRAINT sales_orders_order_number_unique 
        UNIQUE (order_number);
END $$;

-- Add unique constraint on item SKUs
DO $$
BEGIN
     IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'variants_sku_unique') THEN
        ALTER TABLE variants
        ADD CONSTRAINT variants_sku_unique 
        UNIQUE (sku);
    END IF;
END $$;

-- 4. Verify NOT NULL Constraints
SELECT table_name, column_name, is_nullable, data_type
FROM information_schema.columns
WHERE table_name IN ('manufacturing_orders', 'sales_orders', 'items', 'variants')
AND column_name IN ('order_no', 'order_number', 'name', 'status', 'sku')
ORDER BY table_name, column_name;

-- 5. Orphaned Records (Already checked via JS, but good to have in SQL)
SELECT mor.id, mor.manufacturing_order_id
FROM manufacturing_order_rows mor
LEFT JOIN manufacturing_orders mo ON mor.manufacturing_order_id = mo.id
WHERE mo.id IS NULL;

SELECT si.id, si.stocktake_id
FROM stocktake_items si
LEFT JOIN stocktakes s ON si.stocktake_id = s.id
WHERE s.id IS NULL;
