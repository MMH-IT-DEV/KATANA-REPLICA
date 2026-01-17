DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-ONYX6';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Onyx 6 L', 'NI-ONYX6', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-ONYX6' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-ONYX6', 49.9, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 2, 0, 0, 0, 49.9);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 2,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 49.9
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-OTGSAFETYGLASSES';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('OTG Safety Glasses', 'NI-OTGSAFETYGLASSES', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-OTGSAFETYGLASSES' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-OTGSAFETYGLASSES', 0, 0)
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-PAPERTAPE';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Paper Tape', 'NI-PAPERTAPE', 'material', '6 pack', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-PAPERTAPE' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-PAPERTAPE', 12.8, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 1.3, 0, 0, 0, 12.8);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 1.3,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 12.8
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-PAPERTOWEL8';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Paper Towel', 'NI-PAPERTOWEL8', 'material', 'ROLLS', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-PAPERTOWEL8' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-PAPERTOWEL8', 9.819887991, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 86, 0, 0, 0, 9.819887991);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 86,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 9.819887991
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-PEN';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PEN', 'NI-PEN', 'material', 'EA', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-PEN' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-PEN', 0.717027027, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 37, 0, 0, 0, 0.717027027);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 37,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0.717027027
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-PENHOLDER';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Pen Holder', 'NI-PENHOLDER', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-PENHOLDER' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-PENHOLDER', 0, 0)
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-POUNCH';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PL Enclosed Pounch', 'NI-POUNCH', 'material', 'EA', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-POUNCH' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-POUNCH', 0.1554536391, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 1003, 0, 0, 0, 0.1554536391);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 1003,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0.1554536391
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-POWERBAR';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Power bar', 'NI-POWERBAR', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-POWERBAR' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-POWERBAR', 0, 0)
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'PROPOLIS160';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Preweighed Propolis', 'PROPOLIS160', 'product', 'pcs', true, false)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'PROPOLIS160' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'PROPOLIS160', 25.80457583, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 14, 48, 60, 0, 25.80457583);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 14,
            quantity_committed = 48,
            quantity_expected = 60,
            reorder_point = 0,
            average_cost = 25.80457583
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-PRINTERPAPER';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Printer Paper', 'NI-PRINTERPAPER', 'material', 'pack', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-PRINTERPAPER' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-PRINTERPAPER', 32.784, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 5, 0, 0, 0, 32.784);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 5,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 32.784
        WHERE id = existing_inv_id;
    END IF;
END $$;


