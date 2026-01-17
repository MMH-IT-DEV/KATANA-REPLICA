-- Add missing barcode columns to variants table
ALTER TABLE variants ADD COLUMN IF NOT EXISTS internal_barcode TEXT;
ALTER TABLE variants ADD COLUMN IF NOT EXISTS registered_barcode TEXT;

-- Add missing columns to inventory table
ALTER TABLE inventory ADD COLUMN IF NOT EXISTS quantity_potential NUMERIC(12, 4) DEFAULT 0;
ALTER TABLE inventory ADD COLUMN IF NOT EXISTS value_in_stock NUMERIC(12, 4) DEFAULT 0;
ALTER TABLE inventory ADD COLUMN IF NOT EXISTS safety_stock_level NUMERIC(12, 4) DEFAULT 0;
ALTER TABLE inventory ADD COLUMN IF NOT EXISTS default_storage_bin TEXT;

