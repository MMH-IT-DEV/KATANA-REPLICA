-- 1. Product Operations (Template)
CREATE TABLE IF NOT EXISTS product_operations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_variant_id UUID REFERENCES variants(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL DEFAULT 1,
    operation_name TEXT NOT NULL, -- e.g. "Packaging", "Mixing"
    resource TEXT NOT NULL, -- e.g. "Packaging Zone"
    cost_per_hour NUMERIC(10, 2) DEFAULT 0,
    duration_seconds INTEGER DEFAULT 0, -- Standard time per unit or batch? Usually per unit for simple BOMs
    type TEXT DEFAULT 'Process', -- "Process" or "Quality Check" etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. MO Rows (Ingredients Snapshot)
CREATE TABLE IF NOT EXISTS manufacturing_order_rows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    manufacturing_order_id UUID REFERENCES manufacturing_orders(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES variants(id), -- The Ingredient
    planned_quantity NUMERIC(12, 4) NOT NULL DEFAULT 0,
    actual_quantity NUMERIC(12, 4) DEFAULT 0,
    cost_per_unit NUMERIC(12, 4) DEFAULT 0, -- Snapshot of cost at time of usage
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(manufacturing_order_id, variant_id)
);

-- 3. MO Operations (Steps Snapshot)
CREATE TABLE IF NOT EXISTS manufacturing_order_operations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    manufacturing_order_id UUID REFERENCES manufacturing_orders(id) ON DELETE CASCADE,
    operation_name TEXT NOT NULL,
    resource TEXT,
    
    planned_time_seconds INTEGER DEFAULT 0,
    actual_time_seconds INTEGER DEFAULT 0,
    
    cost_per_hour NUMERIC(10, 2) DEFAULT 0,
    actual_cost NUMERIC(10, 2) DEFAULT 0, -- Calculated from actual_time * cost_per_hour
    
    status TEXT CHECK (status IN ('NOT_STARTED', 'IN_PROGRESS', 'PAUSED', 'COMPLETED')) DEFAULT 'NOT_STARTED',
    operator_name TEXT, -- Who did it
    
    step_number INTEGER DEFAULT 1,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_mo_rows_mo_id ON manufacturing_order_rows(manufacturing_order_id);
CREATE INDEX IF NOT EXISTS idx_mo_ops_mo_id ON manufacturing_order_operations(manufacturing_order_id);











