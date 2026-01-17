-- ==============================================
-- STOCK MOVEMENTS TABLE
-- Tracks all inventory movements for Inventory Intel
-- ==============================================

CREATE TABLE IF NOT EXISTS stock_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    variant_id UUID NOT NULL REFERENCES variants(id) ON DELETE CASCADE,

    -- Movement details
    movement_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    quantity_change NUMERIC(12, 5) NOT NULL,
    cost_per_unit NUMERIC(12, 5) DEFAULT 0,

    -- Running totals (snapshot at time of movement)
    balance_after NUMERIC(12, 5) NOT NULL DEFAULT 0,
    value_after NUMERIC(12, 5) DEFAULT 0,
    avg_cost_after NUMERIC(12, 5) DEFAULT 0,

    -- Source tracking
    caused_by_type TEXT CHECK (caused_by_type IN ('PO', 'SO', 'MO', 'MO_INGREDIENT', 'ADJUSTMENT', 'TRANSFER', 'MANUAL')),
    caused_by_id UUID,
    caused_by_reference TEXT, -- e.g., "PO-475" or "MO-6811 (UFC381A)"

    -- Location
    location_id UUID REFERENCES locations(id),
    location_name TEXT,

    -- Metadata
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_stock_movements_variant_id ON stock_movements(variant_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_movement_date ON stock_movements(movement_date DESC);
CREATE INDEX IF NOT EXISTS idx_stock_movements_caused_by ON stock_movements(caused_by_type, caused_by_id);

-- RLS Policies
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on stock_movements"
    ON stock_movements FOR ALL
    USING (true)
    WITH CHECK (true);

-- ==============================================
-- INSERT SAMPLE DATA FOR OIL/OLIVE
-- Run this after finding the variant ID
-- ==============================================

-- To insert test data, first find the variant ID:
-- SELECT v.id, v.sku, i.name FROM variants v JOIN items i ON v.item_id = i.id WHERE i.name ILIKE '%olive%' LIMIT 1;

-- Then uncomment and run with the correct variant_id:
/*
INSERT INTO stock_movements (variant_id, movement_date, quantity_change, cost_per_unit, balance_after, value_after, avg_cost_after, caused_by_type, caused_by_reference, location_name)
VALUES
    ('YOUR_VARIANT_ID', '2026-01-02 15:24:00+00', 4000, 12.98869, 4898.86799, 63379.83748, 12.93765, 'PO', 'PO-475', 'MMH Kelowna'),
    ('YOUR_VARIANT_ID', '2026-01-02 13:22:00+00', -38.25, 12.71053, 898.86799, 11425.08734, 12.71053, 'MO_INGREDIENT', 'MO-6811 (UFC381A) // JAN 02', 'MMH Kelowna'),
    ('YOUR_VARIANT_ID', '2026-01-02 13:06:00+00', -38.262, 12.71053, 937.11799, 11911.26506, 12.71053, 'MO_INGREDIENT', 'MO-6811 (UFC381B) // JAN 02', 'MMH Kelowna'),
    ('YOUR_VARIANT_ID', '2025-12-30 11:53:00+00', -38.296, 12.71053, 975.37999, 12397.59531, 12.71053, 'MO_INGREDIENT', 'MO-6804 (UFC380) // DEC 30', 'MMH Kelowna'),
    ('YOUR_VARIANT_ID', '2025-12-30 10:25:00+00', -40.266, 12.71053, 1013.67599, 12884.35771, 12.71053, 'MO_INGREDIENT', 'MO-6804 (UEOF045) // DEC 30', 'MMH Kelowna'),
    ('YOUR_VARIANT_ID', '2025-12-29 12:31:00+00', -38.25, 12.71053, 1053.94199, 13396.15986, 12.71053, 'MO_INGREDIENT', 'MO-6798 (UFC379) // DEC 29', 'MMH Kelowna'),
    ('YOUR_VARIANT_ID', '2025-12-29 10:52:00+00', -40.26, 12.71053, 1092.19199, 13882.33758, 12.71053, 'MO_INGREDIENT', 'MO-6798 // (UEOF044) // DEC', 'MMH Kelowna'),
    ('YOUR_VARIANT_ID', '2025-12-23 15:36:00+00', -38.81, 12.71053, 1132.45199, 14394.06346, 12.71053, 'MO_INGREDIENT', 'MO-6769 (UFC378C) // DEC 23', 'MMH Kelowna'),
    ('YOUR_VARIANT_ID', '2025-12-23 12:43:00+00', -38.24, 12.71053, 1171.26199, 14887.35908, 12.71053, 'MO_INGREDIENT', 'MO-6768 (UFC378B) // DEC 23', 'MMH Kelowna'),
    ('YOUR_VARIANT_ID', '2025-12-23 10:03:00+00', -38.256, 12.71053, 1209.50199, 15373.40969, 12.71053, 'MO_INGREDIENT', 'MO-6768 (UFC378A) // DEC 23', 'MMH Kelowna');
*/
