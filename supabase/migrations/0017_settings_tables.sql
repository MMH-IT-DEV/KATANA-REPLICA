-- Custom Fields
CREATE TABLE IF NOT EXISTS custom_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  field_type VARCHAR(50) NOT NULL, -- text, number, date, dropdown, checkbox
  applies_to VARCHAR(50) NOT NULL, -- products, materials, sales_orders, purchase_orders, manufacturing_orders
  is_required BOOLEAN DEFAULT false,
  options JSONB, -- for dropdown options
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Operations (Manufacturing)
CREATE TABLE IF NOT EXISTS operations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  default_cost_per_hour DECIMAL(10,2) DEFAULT 0,
  default_duration_minutes INT DEFAULT 60,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources (Production)
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  default_operators VARCHAR(255) DEFAULT 'Unassigned',
  default_cost_per_hour DECIMAL(10,2) DEFAULT 20.00,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Warehouses (Locations)
CREATE TABLE IF NOT EXISTS warehouses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  legal_name VARCHAR(255),
  street VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip VARCHAR(50),
  country VARCHAR(100) DEFAULT 'Canada',
  can_sell BOOLEAN DEFAULT true,
  can_make BOOLEAN DEFAULT true,
  can_buy BOOLEAN DEFAULT true,
  is_default_sales BOOLEAN DEFAULT false,
  is_default_manufacturing BOOLEAN DEFAULT false,
  is_default_purchases BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Storage Bins
CREATE TABLE IF NOT EXISTS storage_bins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  warehouse_id UUID REFERENCES warehouses(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  parent_bin_id UUID REFERENCES storage_bins(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Print Templates
CREATE TABLE IF NOT EXISTS print_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  document_type VARCHAR(100) NOT NULL, -- quote, sales_order, manufacturing_order, purchase_order, etc.
  category VARCHAR(100) NOT NULL, -- Quote templates, Sales order templates, etc.
  is_visible BOOLEAN DEFAULT true,
  is_system BOOLEAN DEFAULT false, -- system templates can't be deleted
  display_order INT DEFAULT 0,
  template_config JSONB, -- PDF layout configuration
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Manufacturing Settings
CREATE TABLE IF NOT EXISTS manufacturing_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value BOOLEAN DEFAULT false,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default manufacturing settings
INSERT INTO manufacturing_settings (setting_key, setting_value, description) VALUES
  ('picking_required', false, 'Picking of raw ingredients is required for manufacturing orders'),
  ('ask_consumed_qty', true, 'Ask consumed ingredient quantities from the operator when a task is finished'),
  ('ask_finished_qty', true, 'Ask the quantity of finished products from the operator when a manufacturing order is completed'),
  ('show_mfg_deadline', true, 'Show manufacturing order deadline in floor app'),
  ('show_so_deadline', true, 'Show sales order deadline in floor app')
ON CONFLICT (setting_key) DO NOTHING;

-- Insert default resources
INSERT INTO resources (name, default_operators, default_cost_per_hour, display_order) VALUES
  ('KITCHEN', 'Unassigned', 20.00, 1),
  ('PREPARATION ZONE', 'Unassigned', 20.00, 2),
  ('POURING ISLAND', 'Unassigned', 20.00, 3),
  ('LABELLING ZONE', 'Unassigned', 20.00, 4),
  ('ASSEMBLY ZONE', 'Unassigned', 20.00, 5),
  ('PACKAGING ZONE', 'Unassigned', 20.00, 6)
ON CONFLICT DO NOTHING;

-- Insert default warehouse
INSERT INTO warehouses (name, legal_name, city, country, can_sell, can_make, can_buy, is_default_sales, is_default_manufacturing, is_default_purchases) VALUES
  ('MMH Kelowna', 'MyMagicHealer Inc.', 'Kelowna', 'Canada', true, true, true, true, true, true)
ON CONFLICT DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_custom_fields_applies_to ON custom_fields(applies_to);
CREATE INDEX IF NOT EXISTS idx_storage_bins_warehouse ON storage_bins(warehouse_id);
CREATE INDEX IF NOT EXISTS idx_print_templates_category ON print_templates(category);
CREATE INDEX IF NOT EXISTS idx_print_templates_document_type ON print_templates(document_type);
