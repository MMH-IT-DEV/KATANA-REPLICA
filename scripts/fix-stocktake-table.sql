
-- SQL to create the missing stocktake_items table
CREATE TABLE IF NOT EXISTS stocktake_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stocktake_id UUID NOT NULL REFERENCES stocktakes(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES variants(id),
  item_name TEXT,
  category TEXT,
  internal_barcode TEXT,
  registered_barcode TEXT,
  supplier_item_code TEXT,
  batch_number TEXT,
  batch_barcode TEXT,
  notes TEXT,
  expected_quantity DECIMAL(15,4) DEFAULT 0,
  counted_quantity DECIMAL(15,4),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_stocktake_items_stocktake_id ON stocktake_items(stocktake_id);
CREATE INDEX IF NOT EXISTS idx_stocktake_items_variant_id ON stocktake_items(variant_id);

COMMENT ON TABLE stocktake_items IS 'Stores individual items included in a stocktake/inventory count.';
