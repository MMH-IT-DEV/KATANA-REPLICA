-- ==============================================
-- SEED STOCK MOVEMENTS DATA
-- Run this in Supabase SQL Editor to insert test data
-- This script auto-detects the correct variant_id
-- ==============================================

-- STEP 1: Find Oil/Olive variant (run this query to see what exists)
-- SELECT v.id, v.sku, i.name FROM variants v JOIN items i ON v.item_id = i.id WHERE i.name ILIKE '%olive%' OR i.name ILIKE '%oil%' LIMIT 5;

-- STEP 2: Check existing stock_movements
-- SELECT * FROM stock_movements LIMIT 10;

-- STEP 3: Insert test data using DO block with dynamic variant_id
DO $$
DECLARE
    olive_variant_id UUID;
BEGIN
    -- Find variant for Oil/Olive (case-insensitive search)
    SELECT v.id INTO olive_variant_id
    FROM variants v
    JOIN items i ON v.item_id = i.id
    WHERE i.name ILIKE '%olive%' OR i.name ILIKE '%oil/%'
    LIMIT 1;

    -- If not found, try a broader search
    IF olive_variant_id IS NULL THEN
        SELECT v.id INTO olive_variant_id
        FROM variants v
        JOIN items i ON v.item_id = i.id
        WHERE i.name ILIKE '%oil%'
        LIMIT 1;
    END IF;

    -- Log what we found
    RAISE NOTICE 'Found variant_id: %', olive_variant_id;

    -- Exit if no variant found
    IF olive_variant_id IS NULL THEN
        RAISE EXCEPTION 'No Oil/Olive variant found in database. Please create an item with "olive" or "oil" in its name first.';
    END IF;

    -- Delete existing test data for this variant (to allow re-running)
    DELETE FROM stock_movements WHERE variant_id = olive_variant_id;

    -- Insert test stock movements
    INSERT INTO stock_movements (variant_id, movement_date, quantity_change, cost_per_unit, balance_after, value_after, avg_cost_after, caused_by_type, caused_by_reference, location_name)
    VALUES
        (olive_variant_id, '2026-01-02 15:24:00+00', 4000, 12.98869, 4898.86799, 63379.83748, 12.93765, 'PO', 'PO-475', 'MMH Kelowna'),
        (olive_variant_id, '2026-01-02 13:22:00+00', -38.25, 12.71053, 898.86799, 11425.08734, 12.71053, 'MO_INGREDIENT', 'MO-6811 (UFC381A) // JAN 02', 'MMH Kelowna'),
        (olive_variant_id, '2026-01-02 13:06:00+00', -38.262, 12.71053, 937.11799, 11911.26506, 12.71053, 'MO_INGREDIENT', 'MO-6811 (UFC381B) // JAN 02', 'MMH Kelowna'),
        (olive_variant_id, '2025-12-30 11:53:00+00', -38.296, 12.71053, 975.37999, 12397.59531, 12.71053, 'MO_INGREDIENT', 'MO-6804 (UFC380) // DEC 30', 'MMH Kelowna'),
        (olive_variant_id, '2025-12-30 10:25:00+00', -40.266, 12.71053, 1013.67599, 12884.35771, 12.71053, 'MO_INGREDIENT', 'MO-6804 (UEOF045) // DEC 30', 'MMH Kelowna'),
        (olive_variant_id, '2025-12-29 12:31:00+00', -38.25, 12.71053, 1053.94199, 13396.15986, 12.71053, 'MO_INGREDIENT', 'MO-6798 (UFC379) // DEC 29', 'MMH Kelowna'),
        (olive_variant_id, '2025-12-29 10:52:00+00', -40.26, 12.71053, 1092.19199, 13882.33758, 12.71053, 'MO_INGREDIENT', 'MO-6798 // (UEOF044) // DEC', 'MMH Kelowna'),
        (olive_variant_id, '2025-12-23 15:36:00+00', -38.81, 12.71053, 1132.45199, 14394.06346, 12.71053, 'MO_INGREDIENT', 'MO-6769 (UFC378C) // DEC 23', 'MMH Kelowna'),
        (olive_variant_id, '2025-12-23 12:43:00+00', -38.24, 12.71053, 1171.26199, 14887.35908, 12.71053, 'MO_INGREDIENT', 'MO-6768 (UFC378B) // DEC 23', 'MMH Kelowna'),
        (olive_variant_id, '2025-12-23 10:03:00+00', -38.256, 12.71053, 1209.50199, 15373.40969, 12.71053, 'MO_INGREDIENT', 'MO-6768 (UFC378A) // DEC 23', 'MMH Kelowna');

    RAISE NOTICE 'Successfully inserted 10 stock movements for variant_id: %', olive_variant_id;
END $$;

-- STEP 4: Verify the data was inserted
SELECT
    sm.id,
    sm.variant_id,
    v.sku,
    i.name as item_name,
    sm.movement_date,
    sm.quantity_change,
    sm.caused_by_reference,
    sm.location_name
FROM stock_movements sm
LEFT JOIN variants v ON sm.variant_id = v.id
LEFT JOIN items i ON v.item_id = i.id
ORDER BY sm.movement_date DESC
LIMIT 15;
