-- ==============================================
-- INSERT TEST STOCK MOVEMENTS DATA
-- Run this in Supabase SQL Editor
-- ==============================================

-- First, find variant IDs for Oil/Olive and Nylon Mesh
-- Run this query first to get the IDs:
/*
SELECT v.id, v.sku, i.name, i.uom
FROM variants v
JOIN items i ON v.item_id = i.id
WHERE i.name ILIKE '%olive%'
   OR i.name ILIKE '%oil%'
   OR i.name ILIKE '%nylon%'
   OR i.name ILIKE '%mesh%'
LIMIT 10;
*/

-- ==============================================
-- STEP 1: Get or create a supplier and location
-- ==============================================

-- Check if we have a supplier
-- SELECT * FROM suppliers LIMIT 1;

-- Check if we have a location
-- SELECT * FROM locations LIMIT 1;

-- ==============================================
-- STEP 2: Insert Purchase Order for Oil/Olive
-- Replace VARIANT_ID with actual variant ID from Step 1
-- ==============================================

-- Insert a Purchase Order
INSERT INTO purchase_orders (
    id,
    order_no,
    status,
    expected_arrival_date,
    currency,
    created_at,
    updated_at
) VALUES (
    'aaaaaaaa-0001-0001-0001-000000000001',
    'PO-475',
    'RECEIVED',
    '2026-01-02',
    'CAD',
    '2026-01-02 15:24:00+00',
    '2026-01-02 15:24:00+00'
) ON CONFLICT (order_no) DO UPDATE SET
    status = 'RECEIVED',
    updated_at = '2026-01-02 15:24:00+00';

-- Insert PO Row - REPLACE 'YOUR_OLIVE_OIL_VARIANT_ID' with actual ID
/*
INSERT INTO purchase_order_rows (
    id,
    purchase_order_id,
    variant_id,
    quantity,
    price_per_unit,
    quantity_received
) VALUES (
    'bbbbbbbb-0001-0001-0001-000000000001',
    'aaaaaaaa-0001-0001-0001-000000000001',
    'YOUR_OLIVE_OIL_VARIANT_ID',  -- Replace this!
    4000,
    12.98869,
    4000
) ON CONFLICT (id) DO UPDATE SET
    quantity_received = 4000;
*/

-- ==============================================
-- STEP 3: Insert Manufacturing Orders (for ingredient consumption)
-- These will show as negative movements when ingredients are consumed
-- ==============================================

-- MO-6811 - Manufacturing Order
INSERT INTO manufacturing_orders (
    id,
    order_no,
    status,
    planned_quantity,
    actual_quantity,
    started_at,
    completed_at,
    created_at,
    updated_at
) VALUES (
    'cccccccc-0001-0001-0001-000000000001',
    'MO-6811',
    'DONE',
    100,
    100,
    '2026-01-02 12:00:00+00',
    '2026-01-02 13:22:00+00',
    '2026-01-02 10:00:00+00',
    '2026-01-02 13:22:00+00'
) ON CONFLICT (order_no) DO UPDATE SET
    status = 'DONE',
    completed_at = '2026-01-02 13:22:00+00';

-- MO-6804
INSERT INTO manufacturing_orders (
    id,
    order_no,
    status,
    planned_quantity,
    actual_quantity,
    started_at,
    completed_at,
    created_at,
    updated_at
) VALUES (
    'cccccccc-0002-0002-0002-000000000002',
    'MO-6804',
    'DONE',
    100,
    100,
    '2025-12-30 09:00:00+00',
    '2025-12-30 11:53:00+00',
    '2025-12-30 08:00:00+00',
    '2025-12-30 11:53:00+00'
) ON CONFLICT (order_no) DO UPDATE SET
    status = 'DONE',
    completed_at = '2025-12-30 11:53:00+00';

-- MO-6798
INSERT INTO manufacturing_orders (
    id,
    order_no,
    status,
    planned_quantity,
    actual_quantity,
    started_at,
    completed_at,
    created_at,
    updated_at
) VALUES (
    'cccccccc-0003-0003-0003-000000000003',
    'MO-6798',
    'DONE',
    100,
    100,
    '2025-12-29 09:00:00+00',
    '2025-12-29 12:31:00+00',
    '2025-12-29 08:00:00+00',
    '2025-12-29 12:31:00+00'
) ON CONFLICT (order_no) DO UPDATE SET
    status = 'DONE',
    completed_at = '2025-12-29 12:31:00+00';

-- MO-6769
INSERT INTO manufacturing_orders (
    id,
    order_no,
    status,
    planned_quantity,
    actual_quantity,
    started_at,
    completed_at,
    created_at,
    updated_at
) VALUES (
    'cccccccc-0004-0004-0004-000000000004',
    'MO-6769',
    'DONE',
    100,
    100,
    '2025-12-23 14:00:00+00',
    '2025-12-23 15:36:00+00',
    '2025-12-23 13:00:00+00',
    '2025-12-23 15:36:00+00'
) ON CONFLICT (order_no) DO UPDATE SET
    status = 'DONE',
    completed_at = '2025-12-23 15:36:00+00';

-- MO-6768
INSERT INTO manufacturing_orders (
    id,
    order_no,
    status,
    planned_quantity,
    actual_quantity,
    started_at,
    completed_at,
    created_at,
    updated_at
) VALUES (
    'cccccccc-0005-0005-0005-000000000005',
    'MO-6768',
    'DONE',
    100,
    100,
    '2025-12-23 09:00:00+00',
    '2025-12-23 12:43:00+00',
    '2025-12-23 08:00:00+00',
    '2025-12-23 12:43:00+00'
) ON CONFLICT (order_no) DO UPDATE SET
    status = 'DONE',
    completed_at = '2025-12-23 12:43:00+00';

-- ==============================================
-- STEP 4: Insert MO Ingredient Rows (consumption)
-- REPLACE 'YOUR_OLIVE_OIL_VARIANT_ID' with actual ID
-- ==============================================

/*
-- MO-6811 consumption rows
INSERT INTO manufacturing_order_rows (
    id,
    manufacturing_order_id,
    variant_id,
    planned_quantity
) VALUES
    ('dddddddd-0001-0001-0001-000000000001', 'cccccccc-0001-0001-0001-000000000001', 'YOUR_OLIVE_OIL_VARIANT_ID', 38.25),
    ('dddddddd-0002-0002-0002-000000000002', 'cccccccc-0001-0001-0001-000000000001', 'YOUR_OLIVE_OIL_VARIANT_ID', 38.262)
ON CONFLICT (id) DO NOTHING;

-- MO-6804 consumption rows
INSERT INTO manufacturing_order_rows (
    id,
    manufacturing_order_id,
    variant_id,
    planned_quantity
) VALUES
    ('dddddddd-0003-0003-0003-000000000003', 'cccccccc-0002-0002-0002-000000000002', 'YOUR_OLIVE_OIL_VARIANT_ID', 38.296),
    ('dddddddd-0004-0004-0004-000000000004', 'cccccccc-0002-0002-0002-000000000002', 'YOUR_OLIVE_OIL_VARIANT_ID', 40.266)
ON CONFLICT (id) DO NOTHING;

-- MO-6798 consumption rows
INSERT INTO manufacturing_order_rows (
    id,
    manufacturing_order_id,
    variant_id,
    planned_quantity
) VALUES
    ('dddddddd-0005-0005-0005-000000000005', 'cccccccc-0003-0003-0003-000000000003', 'YOUR_OLIVE_OIL_VARIANT_ID', 38.25),
    ('dddddddd-0006-0006-0006-000000000006', 'cccccccc-0003-0003-0003-000000000003', 'YOUR_OLIVE_OIL_VARIANT_ID', 40.26)
ON CONFLICT (id) DO NOTHING;

-- MO-6769 consumption row
INSERT INTO manufacturing_order_rows (
    id,
    manufacturing_order_id,
    variant_id,
    planned_quantity
) VALUES
    ('dddddddd-0007-0007-0007-000000000007', 'cccccccc-0004-0004-0004-000000000004', 'YOUR_OLIVE_OIL_VARIANT_ID', 38.81)
ON CONFLICT (id) DO NOTHING;

-- MO-6768 consumption rows
INSERT INTO manufacturing_order_rows (
    id,
    manufacturing_order_id,
    variant_id,
    planned_quantity
) VALUES
    ('dddddddd-0008-0008-0008-000000000008', 'cccccccc-0005-0005-0005-000000000005', 'YOUR_OLIVE_OIL_VARIANT_ID', 38.24),
    ('dddddddd-0009-0009-0009-000000000009', 'cccccccc-0005-0005-0005-000000000005', 'YOUR_OLIVE_OIL_VARIANT_ID', 38.256)
ON CONFLICT (id) DO NOTHING;
*/

-- ==============================================
-- VERIFICATION QUERIES
-- ==============================================

-- Check purchase orders
-- SELECT * FROM purchase_orders WHERE order_no LIKE 'PO-47%';

-- Check purchase order rows
-- SELECT por.*, v.sku, i.name
-- FROM purchase_order_rows por
-- JOIN variants v ON por.variant_id = v.id
-- JOIN items i ON v.item_id = i.id
-- WHERE por.quantity_received > 0;

-- Check manufacturing orders
-- SELECT * FROM manufacturing_orders WHERE status = 'DONE' ORDER BY completed_at DESC LIMIT 10;

-- Check manufacturing order rows (ingredient consumption)
-- SELECT mor.*, v.sku, i.name, mo.order_no
-- FROM manufacturing_order_rows mor
-- JOIN variants v ON mor.variant_id = v.id
-- JOIN items i ON v.item_id = i.id
-- JOIN manufacturing_orders mo ON mor.manufacturing_order_id = mo.id
-- WHERE mo.status = 'DONE'
-- ORDER BY mo.completed_at DESC
-- LIMIT 20;
