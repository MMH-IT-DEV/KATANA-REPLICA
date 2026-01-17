-- migration 0014_mo_additional_fields.sql
ALTER TABLE manufacturing_orders
ADD COLUMN IF NOT EXISTS ingredients_status TEXT DEFAULT 'in_stock',
ADD COLUMN IF NOT EXISTS expected_date DATE,
ADD COLUMN IF NOT EXISTS materials_cost NUMERIC(12, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS operations_cost NUMERIC(12, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS sub_assemblies_cost NUMERIC(12, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS done_date DATE,
ADD COLUMN IF NOT EXISTS actual_time_seconds INTEGER DEFAULT 0;
