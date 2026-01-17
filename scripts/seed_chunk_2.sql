DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'B-PURPLE-4';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('BRANDED PACKAGING BOX / UNIVERSAL FLARE CARE (PURPLE) / 4 OZ', 'B-PURPLE-4', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'B-PURPLE-4' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'B-PURPLE-4', 0.7347118445, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 1886, 3888, 5040, 5000, 0.7347118445);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 1886,
            quantity_committed = 3888,
            quantity_expected = 5040,
            reorder_point = 5000,
            average_cost = 0.7347118445
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'B-YELLOW-1';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('BRANDED PACKAGING BOX / UNIVERSAL FLARE CARE EO FREE (YELLOW) / 1 OZ', 'B-YELLOW-1', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'B-YELLOW-1' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'B-YELLOW-1', 0.6290821438, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 520, 0, 0, 1500, 0.6290821438);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 520,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 1500,
            average_cost = 0.6290821438
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'B-YELLOW-2';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('BRANDED PACKAGING BOX / UNIVERSAL FLARE CARE EO FREE (YELLOW) / 2 OZ', 'B-YELLOW-2', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'B-YELLOW-2' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'B-YELLOW-2', 0.5479970033, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 192, 0, 0, 1500, 0.5479970033);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 192,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 1500,
            average_cost = 0.5479970033
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'B-YELLOW-4';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('BRANDED PACKAGING BOX / UNIVERSAL FLARE CARE EO FREE (YELLOW) / 4 OZ', 'B-YELLOW-4', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'B-YELLOW-4' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'B-YELLOW-4', 0.6058700605, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 120, 0, 0, 1000, 0.6058700605);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 120,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 1000,
            average_cost = 0.6058700605
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-BRANDTAPE';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Branded Tape', 'NI-BRANDTAPE', 'material', 'ROLLS', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-BRANDTAPE' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-BRANDTAPE', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 38, 0, 100, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 38,
            quantity_committed = 0,
            quantity_expected = 100,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-BROOM';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Broom', 'NI-BROOM', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-BROOM' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-BROOM', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-BROTZETAPE';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Brother Tze Tape', 'NI-BROTZETAPE', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-BROTZETAPE' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-BROTZETAPE', 32.36721967, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 6, 0, 0, 0, 32.36721967);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 6,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 32.36721967
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-BUBBLEMAIL';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Bubble Mailer', 'NI-BUBBLEMAIL', 'material', 'box', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-BUBBLEMAIL' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-BUBBLEMAIL', 3.048181818, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 11, 0, 0, 0, 3.048181818);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 11,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 3.048181818
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'VB-CF-C';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('BUNDLE/ COMPLETE FLARE CARE', 'VB-CF-C', 'product', 'pcs', true, false)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'VB-CF-C' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'VB-CF-C', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'B-FC-M';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('BUNDLE/ MINI FLARE CARE', 'B-FC-M', 'product', 'pcs', true, false)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'B-FC-M' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'B-FC-M', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-BUNGEE';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Bungee Cords', 'NI-BUNGEE', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-BUNGEE' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-BUNGEE', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-BURNKIT';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Burn Kit', 'NI-BURNKIT', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-BURNKIT' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-BURNKIT', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-CBLPRO';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Cable Protector', 'NI-CBLPRO', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-CBLPRO' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-CBLPRO', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-CALIBRATIONSET';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Calibration Set', 'NI-CALIBRATIONSET', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-CALIBRATIONSET' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-CALIBRATIONSET', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-5kg';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Calibration Weight 5kg', 'NI-5kg', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-5kg' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-5kg', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-CAUTIONTAPE';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Caution Tape', 'NI-CAUTIONTAPE', 'material', 'pack', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-CAUTIONTAPE' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-CAUTIONTAPE', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-CLR-TAPE-6';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Clear Tape', 'NI-CLR-TAPE-6', 'material', 'pack', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-CLR-TAPE-6' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-CLR-TAPE-6', 22.86, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 7.3, 0, 0, 0, 22.86);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 7.3,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 22.86
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-COFFEE';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Coffee', 'NI-COFFEE', 'material', 'bucket', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-COFFEE' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-COFFEE', 28.99, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0.95, 0, 0, 0, 28.99);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0.95,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 28.99
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-COFFEEFILT';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Coffee Filters', 'NI-COFFEEFILT', 'material', 'pack', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-COFFEEFILT' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-COFFEEFILT', 4.49, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0.75, 0, 0, 0, 4.49);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0.75,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 4.49
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI_COFFEEPOT';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Coffee Pot', 'NI_COFFEEPOT', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI_COFFEEPOT' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI_COFFEEPOT', 47.8093624, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 1, 0, 0, 0, 47.8093624);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 1,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 47.8093624
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-COLDPACK';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Cold Pack', 'NI-COLDPACK', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-COLDPACK' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-COLDPACK', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-COLOURCART';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Colour Cartridge', 'NI-COLOURCART', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-COLOURCART' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-COLOURCART', 369.99, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 3, 0, 0, 0, 369.99);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 3,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 369.99
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-COMFORTKNIFE';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Comfort-Grip Knife', 'NI-COMFORTKNIFE', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-COMFORTKNIFE' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-COMFORTKNIFE', 5.889775972, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 6, 0, 0, 0, 5.889775972);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 6,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 5.889775972
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-COMPOSTBAG';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Compost Bags', 'NI-COMPOSTBAG', 'material', 'box', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-COMPOSTBAG' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-COMPOSTBAG', 1.886612903, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 186, 0, 0, 0, 1.886612903);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 186,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 1.886612903
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-DIWATER';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Deionized Water', 'NI-DIWATER', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-DIWATER' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-DIWATER', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-DISHSOAP';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Dish Soap', 'NI-DISHSOAP', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-DISHSOAP' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-DISHSOAP', 10.31142857, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 2.8, 0, 0, 0, 10.31142857);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 2.8,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 10.31142857
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-DISHPODS';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Dishwasher Pods', 'NI-DISHPODS', 'material', 'bucket', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-DISHPODS' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-DISHPODS', 30.08317929, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 2, 0, 0, 0, 30.08317929);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 2,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 30.08317929
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-Dolly';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Dolly', 'NI-Dolly', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-Dolly' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-Dolly', 134.94, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 1, 0, 0, 0, 134.94);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 1,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 134.94
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-DRUMLIFT';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Drum Lifter - Forklift', 'NI-DRUMLIFT', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-DRUMLIFT' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-DRUMLIFT', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-DRUMPLUGOPEN';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Drum Plug Opener', 'NI-DRUMPLUGOPEN', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-DRUMPLUGOPEN' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-DRUMPLUGOPEN', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-CUTTER';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Edge Protector Cutter', 'NI-CUTTER', 'material', 'EA', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-CUTTER' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-CUTTER', 684.1060542, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 1, 0, 0, 0, 684.1060542);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 1,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 684.1060542
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-EDGEPROT';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Edge Protectors', 'NI-EDGEPROT', 'material', 'pack', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-EDGEPROT' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-EDGEPROT', 197.5613654, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 1, 0, 0, 0, 197.5613654);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 1,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 197.5613654
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'EGG-X';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('EGG', 'EGG-X', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'EGG-X' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'EGG-X', 0.5833333333, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 2090, 10920, 25080, 2000, 0.5833333333);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 2090,
            quantity_committed = 10920,
            quantity_expected = 25080,
            reorder_point = 2000,
            average_cost = 0.5833333333
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'IP-EGG';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('EGG YOLK', 'IP-EGG', 'product', 'g', true, false)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'IP-EGG' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'IP-EGG', 0.0612827178, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 324, 163200, 166400, 0, 0.0612827178);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 324,
            quantity_committed = 163200,
            quantity_expected = 166400,
            reorder_point = 0,
            average_cost = 0.0612827178
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'EO-CB';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('ESSENTIAL OIL / CLOVE BUD', 'EO-CB', 'material', 'g', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'EO-CB' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'EO-CB', 0.1232294093, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 4739.595, 0, 0, 2000, 0.1232294093);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 4739.595,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 2000,
            average_cost = 0.1232294093
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'EO-CS';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('ESSENTIAL OIL / CORIANDER SEED', 'EO-CS', 'material', 'g', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'EO-CS' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'EO-CS', 0.259644548, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 4498.36, 0, 0, 2000, 0.259644548);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 4498.36,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 2000,
            average_cost = 0.259644548
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'EO-LAV';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('ESSENTIAL OIL / LAVENDER', 'EO-LAV', 'material', 'g', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'EO-LAV' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'EO-LAV', 0.0939753283, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 14360.53, 12672, 40000, 5000, 0.0939753283);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 14360.53,
            quantity_committed = 12672,
            quantity_expected = 40000,
            reorder_point = 5000,
            average_cost = 0.0939753283
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'EO-PEP';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('ESSENTIAL OIL / PEPPERMINT', 'EO-PEP', 'material', 'g', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'EO-PEP' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'EO-PEP', 0.0446092196, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 3962.353, 0, 5000, 2000, 0.0446092196);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 3962.353,
            quantity_committed = 0,
            quantity_expected = 5000,
            reorder_point = 2000,
            average_cost = 0.0446092196
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'EO-TT';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('ESSENTIAL OIL / TEA TREE', 'EO-TT', 'material', 'g', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'EO-TT' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'EO-TT', 0.06759083, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 11288, 2136, 0, 5000, 0.06759083);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 11288,
            quantity_committed = 2136,
            quantity_expected = 0,
            reorder_point = 5000,
            average_cost = 0.06759083
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'EO-THY';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('ESSENTIAL OIL / THYME', 'EO-THY', 'material', 'g', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'EO-THY' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'EO-THY', 0.2121193402, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 7258.26, 1339.2, 0, 5000, 0.2121193402);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 7258.26,
            quantity_committed = 1339.2,
            quantity_expected = 0,
            reorder_point = 5000,
            average_cost = 0.2121193402
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-EXACTO';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Exacto Knife', 'NI-EXACTO', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-EXACTO' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-EXACTO', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-EXTCORD';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Extension Cord', 'NI-EXTCORD', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-EXTCORD' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-EXTCORD', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'IP-HI';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('EXTRACT / HERB', 'IP-HI', 'product', 'g', true, false)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'IP-HI' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'IP-HI', 0.0173905342, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 10699, 0, 44462, 30000, 0.0173905342);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 10699,
            quantity_committed = 0,
            quantity_expected = 44462,
            reorder_point = 30000,
            average_cost = 0.0173905342
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-EYEWASHSTAT';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Eye Wash Station', 'NI-EYEWASHSTAT', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-EYEWASHSTAT' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-EYEWASHSTAT', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-FACEMASK';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Face Masks', 'NI-FACEMASK', 'material', 'box', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-FACEMASK' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-FACEMASK', 8.194470918, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 4, 0, 0, 0, 8.194470918);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 4,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 8.194470918
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-FACESHIELD';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Face Shield', 'NI-FACESHIELD', 'material', 'pack', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-FACESHIELD' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-FACESHIELD', 20, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 1, 0, 0, 0, 20);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 1,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 20
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'FGJ-PS-1';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('FILLED 1 OZ / COMFREY AND ARNICA RELIEF (PINK)', 'FGJ-PS-1', 'product', 'pcs', true, false)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'FGJ-PS-1' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'FGJ-PS-1', 1.429226317, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 2, 0, 0, 0, 1.429226317);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 2,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 1.429226317
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'FGJ-IS-1';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('FILLED 1 OZ / THYME AND TEA TREE FLARE CARE (GREEN)', 'FGJ-IS-1', 'product', 'pcs', true, false)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'FGJ-IS-1' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'FGJ-IS-1', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 3200, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 3200,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'FGJ-MS-1';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('FILLED 1 OZ / UNIVERSAL FLARE CARE (PURPLE)', 'FGJ-MS-1', 'product', 'pcs', true, false)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'FGJ-MS-1' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'FGJ-MS-1', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'FGJ-US-1';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('FILLED 1 OZ / UNIVERSAL FLARE CARE EO FREE (YELLOW)', 'FGJ-US-1', 'product', 'pcs', true, false)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'FGJ-US-1' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'FGJ-US-1', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;

