-- Seed Data for Katana Replica (Sell Module Focus)

-- Clean up existing data (Order matters due to FKs)
TRUNCATE TABLE 
    sales_order_rows, sales_orders, 
    inventory, batches, 
    recipes, variants, items, 
    customers, suppliers, categories, locations, tax_rates 
CASCADE;

-- Wrap in a transaction/DO block to use variables for relationships
DO $$
DECLARE
    -- IDs
    loc_main_id UUID;
    loc_shop_id UUID;
    cat_fg_id UUID;
    cat_raw_id UUID;
    supp_id UUID;
    tax_id UUID;
    
    -- Items/Variants
    item_honey_id UUID;
    var_honey_id UUID;
    item_jar_id UUID;
    var_jar_id UUID;
    item_label_id UUID;
    var_label_id UUID;
    
    -- Customers
    cust_allison_id UUID;
    cust_elizabeth_id UUID;
    
    -- Orders
    so_1_id UUID;
BEGIN

    -- 1. Locations
    INSERT INTO locations (name, address, is_default) 
    VALUES ('Main Warehouse', '123 Industrial Ave, Kelowna', TRUE) 
    RETURNING id INTO loc_main_id;

    INSERT INTO locations (name, is_default) 
    VALUES ('Shopify App', FALSE) 
    RETURNING id INTO loc_shop_id;

    -- 2. Tax Rates
    INSERT INTO tax_rates (name, rate) 
    VALUES ('GST/PST', 12.00) 
    RETURNING id INTO tax_id;

    -- 3. Categories
    INSERT INTO categories (name) VALUES ('Finished Goods') RETURNING id INTO cat_fg_id;
    INSERT INTO categories (name) VALUES ('Raw Materials') RETURNING id INTO cat_raw_id;

    -- 4. Suppliers
    INSERT INTO suppliers (name, email, currency) 
    VALUES ('Bee Supplies Co.', 'orders@beesupplies.com', 'USD') 
    RETURNING id INTO supp_id;

    -- 5. Items (Products & Materials)
    
    -- Product: Honey Bear 500g
    INSERT INTO items (name, sku, type, category_id, uom, is_sellable, is_producible, is_batch_tracked, default_sales_price)
    VALUES ('Honey Bear 500g', 'FG-HB-500', 'product', cat_fg_id, 'pcs', TRUE, TRUE, TRUE, 15.00)
    RETURNING id INTO item_honey_id;
    
    INSERT INTO variants (item_id, sku, sales_price)
    VALUES (item_honey_id, 'FG-HB-500', 15.00)
    RETURNING id INTO var_honey_id;

    -- Material: Glass Jar
    INSERT INTO items (name, sku, type, category_id, uom, is_purchasable, default_purchase_price, default_supplier_id)
    VALUES ('Glass Jar 500ml', 'MAT-JAR-500', 'material', cat_raw_id, 'pcs', TRUE, 1.50, supp_id)
    RETURNING id INTO item_jar_id;

    INSERT INTO variants (item_id, sku, purchase_price)
    VALUES (item_jar_id, 'MAT-JAR-500', 1.50)
    RETURNING id INTO var_jar_id;

    -- Material: Label
    INSERT INTO items (name, sku, type, category_id, uom, is_purchasable, default_purchase_price)
    VALUES ('Honey Label V1', 'MAT-LAB-V1', 'material', cat_raw_id, 'pcs', TRUE, 0.20)
    RETURNING id INTO item_label_id;

    INSERT INTO variants (item_id, sku, purchase_price)
    VALUES (item_label_id, 'MAT-LAB-V1', 0.20)
    RETURNING id INTO var_label_id;

    -- 6. Recipes (BOM)
    INSERT INTO recipes (product_variant_id, ingredient_variant_id, quantity)
    VALUES 
        (var_honey_id, var_jar_id, 1),
        (var_honey_id, var_label_id, 1);

    -- 7. Inventory
    -- Have Jars, Missing Labels (Scarcity Scenario)
    INSERT INTO inventory (variant_id, location_id, quantity_in_stock, reorder_point)
    VALUES 
        (var_jar_id, loc_main_id, 1000, 100),
        (var_label_id, loc_main_id, 5, 500), -- Low stock
        (var_honey_id, loc_main_id, 10, 20); -- Low finished goods

    -- 8. Customers
    INSERT INTO customers (name, email, city, country) 
    VALUES ('Allison Chin', 'allison@example.com', 'Vancouver', 'Canada') 
    RETURNING id INTO cust_allison_id;

    INSERT INTO customers (name, email, city, country) 
    VALUES ('Elizabeth Dreon', 'liz@example.com', 'Toronto', 'Canada') 
    RETURNING id INTO cust_elizabeth_id;

    -- 9. Sales Orders
    
    -- Order #68029 (Problem Order)
    INSERT INTO sales_orders (order_no, customer_id, location_id, status, delivery_status, total_amount, delivery_date, source, created_at)
    VALUES ('#68029', cust_allison_id, loc_main_id, 'OPEN', 'NOT_SHIPPED', 65.05, NOW() + INTERVAL '2 days', 'SHOPIFY', NOW() - INTERVAL '3 days')
    RETURNING id INTO so_1_id;

    INSERT INTO sales_order_rows (sales_order_id, variant_id, quantity, price_per_unit, tax_rate_id)
    VALUES (so_1_id, var_honey_id, 50, 15.00, tax_id); -- Ordering 50, only have 10. Result: Sales Item Red.

    -- Order #71656 (Good Order)
    INSERT INTO sales_orders (order_no, customer_id, location_id, status, delivery_status, total_amount, delivery_date, source, created_at)
    VALUES ('#71656', cust_elizabeth_id, loc_main_id, 'OPEN', 'NOT_SHIPPED', 113.73, NOW() + INTERVAL '5 days', 'SHOPIFY', NOW() - INTERVAL '1 day');
    -- (Assuming we add rows later or leave empty for now, but let's add one that fits)
    
END $$;


















