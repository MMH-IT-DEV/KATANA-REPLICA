-- ==============================================
-- PURCHASE UOM CONVERSION FEATURE
-- Allows items to be purchased in a different unit
-- than the base unit of measure
-- ==============================================

-- Add purchase UOM fields to items table (item-level setting)
ALTER TABLE items
ADD COLUMN IF NOT EXISTS purchase_in_different_uom BOOLEAN DEFAULT FALSE;

ALTER TABLE items
ADD COLUMN IF NOT EXISTS purchase_uom TEXT;

ALTER TABLE items
ADD COLUMN IF NOT EXISTS purchase_uom_conversion_rate NUMERIC(12, 5) DEFAULT 1;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_items_purchase_uom
ON items(purchase_uom) WHERE purchase_uom IS NOT NULL;

-- Comments for documentation
COMMENT ON COLUMN items.purchase_in_different_uom IS 'Whether this item is purchased in a different unit of measure';
COMMENT ON COLUMN items.purchase_uom IS 'Unit of measure used when purchasing (may differ from base UOM)';
COMMENT ON COLUMN items.purchase_uom_conversion_rate IS 'Conversion: 1 purchase_uom = X base_uom';

-- ==============================================
-- EXAMPLE USAGE:
-- If item base UOM is "kg" and you buy in "bags" where 1 bag = 25 kg:
--   purchase_uom = 'bag'
--   purchase_uom_conversion_rate = 25
--
-- When creating a PO for 10 bags:
--   Inventory receives: 10 * 25 = 250 kg
--   Cost per kg = purchase_price / 25
-- ==============================================
