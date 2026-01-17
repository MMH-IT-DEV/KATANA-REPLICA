-- Add missing RLS policies for tables created in 0003_mo_details.sql

-- Product Operations
ALTER TABLE product_operations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON product_operations FOR ALL USING (true) WITH CHECK (true);

-- Manufacturing Order Rows
ALTER TABLE manufacturing_order_rows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON manufacturing_order_rows FOR ALL USING (true) WITH CHECK (true);

-- Manufacturing Order Operations
ALTER TABLE manufacturing_order_operations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON manufacturing_order_operations FOR ALL USING (true) WITH CHECK (true);








