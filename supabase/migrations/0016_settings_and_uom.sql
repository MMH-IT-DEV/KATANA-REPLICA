-- Create SETTINGS table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  value_type VARCHAR(20) DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default General settings
INSERT INTO settings (key, value, value_type, description) VALUES
  ('currency', 'CAD', 'string', 'Base currency code'),
  ('currency_locked', 'true', 'boolean', 'Whether currency can be changed'),
  ('default_delivery_time_days', '14', 'number', 'Default delivery time for sales orders in days'),
  ('default_lead_time_days', '14', 'number', 'Default lead time for purchase orders in days'),
  ('inventory_closing_date', NULL, 'string', 'Inventory closing date for costing')
ON CONFLICT (key) DO NOTHING;

-- Create UNITS_OF_MEASURE table
CREATE TABLE IF NOT EXISTS units_of_measure (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  category VARCHAR(50), -- 'weight', 'volume', 'length', 'count', 'packaging', 'custom'
  is_default BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique index on name
CREATE UNIQUE INDEX IF NOT EXISTS units_of_measure_name_idx ON units_of_measure(name);

-- Insert default units
INSERT INTO units_of_measure (name, category, is_default) VALUES
  -- Weight
  ('g', 'weight', true),
  ('kg', 'weight', true),
  ('lbs', 'weight', true),
  ('oz', 'weight', true),
  -- Volume
  ('ml', 'volume', true),
  ('l', 'volume', true),
  ('L', 'volume', true),
  -- Length
  ('cm', 'length', true),
  ('m', 'length', true),
  ('inches', 'length', true),
  -- Count
  ('EA', 'count', true),
  ('pc', 'count', true),
  ('pcs', 'count', true),
  ('dozen', 'count', true),
  -- Packaging
  ('pack', 'packaging', true),
  ('BOX', 'packaging', true),
  ('case', 'packaging', true),
  ('ROLLS', 'packaging', true)
ON CONFLICT (name) DO NOTHING;
