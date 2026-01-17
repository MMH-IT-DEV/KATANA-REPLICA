-- Add missing columns to manufacturing_orders to support Make module features
ALTER TABLE manufacturing_orders 
ADD COLUMN IF NOT EXISTS rank TEXT DEFAULT 'z', -- Using Lexorank or similar string-based ranking
ADD COLUMN IF NOT EXISTS planned_time_seconds INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sales_order_id UUID REFERENCES sales_orders(id) ON DELETE SET NULL;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_manufacturing_orders_status ON manufacturing_orders(status);
CREATE INDEX IF NOT EXISTS idx_manufacturing_orders_sales_order_id ON manufacturing_orders(sales_order_id);











