-- ==============================================
-- SUPPLY DETAILS COLUMNS FOR VARIANTS
-- Adds supplier-related columns to variants table
-- ==============================================

-- Add supplier item code (vendor's SKU)
ALTER TABLE variants
ADD COLUMN IF NOT EXISTS supplier_item_code TEXT;

-- Add default lead time in days
ALTER TABLE variants
ADD COLUMN IF NOT EXISTS default_lead_time INTEGER;

-- Add minimum order quantity
ALTER TABLE variants
ADD COLUMN IF NOT EXISTS moq INTEGER;

-- Note: purchase_price already exists in variants table
-- We can rename it or add a new column if needed

-- Add index for supplier item code lookups
CREATE INDEX IF NOT EXISTS idx_variants_supplier_item_code
ON variants(supplier_item_code) WHERE supplier_item_code IS NOT NULL;

-- ==============================================
-- UPDATE EXISTING VARIANTS WITH DEFAULT VALUES
-- ==============================================

-- Set some sample values for testing (optional)
-- UPDATE variants SET default_lead_time = 45 WHERE default_lead_time IS NULL;
-- UPDATE variants SET moq = 1 WHERE moq IS NULL;
