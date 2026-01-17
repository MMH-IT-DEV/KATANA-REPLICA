-- ==============================================
-- SUPPLIERS TABLE UPDATE
-- Add comment and address fields for supplier details
-- ==============================================

-- Add comment field to suppliers table
ALTER TABLE suppliers
ADD COLUMN IF NOT EXISTS comment TEXT;

-- Add address field to suppliers table
ALTER TABLE suppliers
ADD COLUMN IF NOT EXISTS address TEXT;

-- Add index for supplier name lookups (for filtering)
CREATE INDEX IF NOT EXISTS idx_suppliers_name
ON suppliers(name);

-- Add index for supplier email lookups
CREATE INDEX IF NOT EXISTS idx_suppliers_email
ON suppliers(email) WHERE email IS NOT NULL;
