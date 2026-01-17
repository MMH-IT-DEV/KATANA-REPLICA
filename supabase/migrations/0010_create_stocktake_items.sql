-- Create stocktake_items table
CREATE TABLE IF NOT EXISTS stocktake_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stocktake_id UUID REFERENCES stocktakes(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES variants(id),
  expected_quantity DECIMAL(10,2) DEFAULT 0,
  counted_quantity DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for stocktake_items
CREATE INDEX IF NOT EXISTS idx_stocktake_items_stocktake ON stocktake_items(stocktake_id);
CREATE INDEX IF NOT EXISTS idx_stocktake_items_variant ON stocktake_items(variant_id);

-- Create stock_adjustment_items table
CREATE TABLE IF NOT EXISTS stock_adjustment_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_adjustment_id UUID REFERENCES stock_adjustments(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES variants(id),
  quantity DECIMAL(10,2) NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for stock_adjustment_items
CREATE INDEX IF NOT EXISTS idx_adjust_items_adjustment ON stock_adjustment_items(stock_adjustment_id);
