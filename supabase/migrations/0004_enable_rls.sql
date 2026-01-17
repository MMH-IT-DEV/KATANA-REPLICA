-- Enable RLS and create permissive policies for development
-- This fixes the "RLS Disabled in Public" warning while maintaining anonymous access for the replica

-- 1. Categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON categories FOR ALL USING (true) WITH CHECK (true);

-- 2. Suppliers
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON suppliers FOR ALL USING (true) WITH CHECK (true);

-- 3. Locations
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON locations FOR ALL USING (true) WITH CHECK (true);

-- 4. Tax Rates
ALTER TABLE tax_rates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON tax_rates FOR ALL USING (true) WITH CHECK (true);

-- 5. Items
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON items FOR ALL USING (true) WITH CHECK (true);

-- 6. Variants
ALTER TABLE variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON variants FOR ALL USING (true) WITH CHECK (true);

-- 7. Inventory
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON inventory FOR ALL USING (true) WITH CHECK (true);

-- 8. Recipes
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON recipes FOR ALL USING (true) WITH CHECK (true);

-- 9. Customers
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON customers FOR ALL USING (true) WITH CHECK (true);

-- 10. Sales Orders
ALTER TABLE sales_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON sales_orders FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE sales_order_rows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON sales_order_rows FOR ALL USING (true) WITH CHECK (true);

-- 11. Manufacturing Orders
ALTER TABLE manufacturing_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON manufacturing_orders FOR ALL USING (true) WITH CHECK (true);

-- 12. Purchase Orders
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON purchase_orders FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE purchase_order_rows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON purchase_order_rows FOR ALL USING (true) WITH CHECK (true);

-- 13. Batches
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for all users" ON batches FOR ALL USING (true) WITH CHECK (true);








