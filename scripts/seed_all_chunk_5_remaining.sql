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


DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'PL-PINK-1';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PRODUCT LABEL / COMFREY AND ARNICA RELIEF (PINK) / 1 OZ', 'PL-PINK-1', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'PL-PINK-1' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'PL-PINK-1', 0.0882348344, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 6284, 0, 0, 1000, 0.0882348344);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 6284,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 1000,
            average_cost = 0.0882348344
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'PL-PINK-2';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PRODUCT LABEL / COMFREY AND ARNICA RELIEF (PINK) / 2 OZ', 'PL-PINK-2', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'PL-PINK-2' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'PL-PINK-2', 0.1800365899, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 20, 0, 0, 1000, 0.1800365899);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 20,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 1000,
            average_cost = 0.1800365899
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'PL-PINK-4';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PRODUCT LABEL / COMFREY AND ARNICA RELIEF (PINK) / 4 OZ', 'PL-PINK-4', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'PL-PINK-4' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'PL-PINK-4', 0.1450579176, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 10903, 0, 0, 1000, 0.1450579176);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 10903,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 1000,
            average_cost = 0.1450579176
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'PL-GREEN-1';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PRODUCT LABEL / THYME AND TEA TREE FLARE CARE (GREEN) / 1 OZ', 'PL-GREEN-1', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'PL-GREEN-1' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'PL-GREEN-1', 0.0335821881, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 17436, 0, 0, 2500, 0.0335821881);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 17436,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 2500,
            average_cost = 0.0335821881
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'PL-GREEN-2';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PRODUCT LABEL / THYME AND TEA TREE FLARE CARE (GREEN) / 2 OZ', 'PL-GREEN-2', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'PL-GREEN-2' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'PL-GREEN-2', 0.1390140155, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 5675, 0, 0, 2500, 0.1390140155);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 5675,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 2500,
            average_cost = 0.1390140155
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'PL-GREEN-4';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PRODUCT LABEL / THYME AND TEA TREE FLARE CARE (GREEN) / 4 OZ', 'PL-GREEN-4', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'PL-GREEN-4' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'PL-GREEN-4', 0.1141664203, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 9717, 0, 0, 3000, 0.1141664203);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 9717,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 3000,
            average_cost = 0.1141664203
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'PL-PURPLE-1';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PRODUCT LABEL / UNIVERSAL FLARE CARE (PURPLE) / 1 OZ', 'PL-PURPLE-1', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'PL-PURPLE-1' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'PL-PURPLE-1', 0.0329084299, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 17042, 0, 60000, 30000, 0.0329084299);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 17042,
            quantity_committed = 0,
            quantity_expected = 60000,
            reorder_point = 30000,
            average_cost = 0.0329084299
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'PL-PURPLE-2';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PRODUCT LABEL / UNIVERSAL FLARE CARE (PURPLE) / 2 OZ', 'PL-PURPLE-2', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'PL-PURPLE-2' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'PL-PURPLE-2', 0.1707425609, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 8200, 0, 0, 6000, 0.1707425609);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 8200,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 6000,
            average_cost = 0.1707425609
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'PL-PURPLE-4';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PRODUCT LABEL / UNIVERSAL FLARE CARE (PURPLE) / 4 OZ', 'PL-PURPLE-4', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'PL-PURPLE-4' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'PL-PURPLE-4', 0.06886, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 50366, 21600, 20000, 16500, 0.06886);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 50366,
            quantity_committed = 21600,
            quantity_expected = 20000,
            reorder_point = 16500,
            average_cost = 0.06886
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'PL-YELLOW-1';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PRODUCT LABEL / UNIVERSAL FLARE CARE EO FREE (YELLOW) / 1 OZ', 'PL-YELLOW-1', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'PL-YELLOW-1' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'PL-YELLOW-1', 0.0701628237, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 1600, 0, 10000, 1500, 0.0701628237);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 1600,
            quantity_committed = 0,
            quantity_expected = 10000,
            reorder_point = 1500,
            average_cost = 0.0701628237
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'PL-YELLOW-2';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PRODUCT LABEL / UNIVERSAL FLARE CARE EO FREE (YELLOW) / 2 OZ', 'PL-YELLOW-2', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'PL-YELLOW-2' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'PL-YELLOW-2', 0.1915586269, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 4506, 0, 0, 1500, 0.1915586269);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 4506,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 1500,
            average_cost = 0.1915586269
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'PL-YELLOW-4';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PRODUCT LABEL / UNIVERSAL FLARE CARE EO FREE (YELLOW) / 4 OZ', 'PL-YELLOW-4', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'PL-YELLOW-4' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'PL-YELLOW-4', 0.0947895575, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 10203, 0, 0, 3000, 0.0947895575);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 10203,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 3000,
            average_cost = 0.0947895575
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'B-PROP';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('PROPOLIS', 'B-PROP', 'material', 'g', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'B-PROP' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'B-PROP', 0.1579787234, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 16350, 9600, 27000, 4800, 0.1579787234);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 16350,
            quantity_committed = 9600,
            quantity_expected = 27000,
            reorder_point = 4800,
            average_cost = 0.1579787234
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI_PUTTYKNIFE';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Putty Knife', 'NI_PUTTYKNIFE', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI_PUTTYKNIFE' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI_PUTTYKNIFE', 0, 0)
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-QCAPPROVE';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('QC Label - Approve', 'NI-QCAPPROVE', 'material', 'ROLLS', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-QCAPPROVE' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-QCAPPROVE', 0, 0)
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-QCHOLD';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('QC LABEL - HOLD', 'NI-QCHOLD', 'material', 'ROLLS', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-QCHOLD' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-QCHOLD', 47.42470031, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 1, 0, 0, 0, 47.42470031);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 1,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 47.42470031
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-QCREJECT';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('QC LABEL - REJECT', 'NI-QCREJECT', 'material', 'ROLLS', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-QCREJECT' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-QCREJECT', 0, 0)
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-RECYCLEBAG';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Recycle Bags', 'NI-RECYCLEBAG', 'material', 'box', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-RECYCLEBAG' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-RECYCLEBAG', 69.38, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0.9, 0, 0, 0, 69.38);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0.9,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 69.38
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-RTOTE';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Red Mesh Tote', 'NI-RTOTE', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-RTOTE' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-RTOTE', 30.29513478, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 6, 0, 0, 0, 30.29513478);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 6,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 30.29513478
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'GEN-GEN-239';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Redirect package', 'GEN-GEN-239', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'GEN-GEN-239' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'GEN-GEN-239', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, -1, 0, 0, 0, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = -1,
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'REP-LID-1';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('REPLACEMENT LID / 1 OZ', 'REP-LID-1', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'REP-LID-1' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'REP-LID-1', 0.1764239095, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 448, 0, 0, 0, 0.1764239095);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 448,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0.1764239095
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'REP-LID-2';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('REPLACEMENT LID / 2 OZ', 'REP-LID-2', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'REP-LID-2' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'REP-LID-2', 0.0930166964, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 468, 0, 0, 0, 0.0930166964);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 468,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0.0930166964
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'REP-LID-4';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('REPLACEMENT LID / 4 OZ', 'REP-LID-4', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'REP-LID-4' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'REP-LID-4', 0.1225070145, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 376, 0, 0, 0, 0.1225070145);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 376,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0.1225070145
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-RUBBANDS';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Rubber Bands', 'NI-RUBBANDS', 'material', 'pack', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-RUBBANDS' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-RUBBANDS', 0, 0)
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-SCALEBATT';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Scale Battery', 'NI-SCALEBATT', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-SCALEBATT' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-SCALEBATT', 18.92, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 1, 0, 0, 0, 18.92);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 1,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 18.92
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-SCISSORS';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Scissors', 'NI-SCISSORS', 'material', 'pack', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-SCISSORS' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-SCISSORS', 9.99, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 1, 0, 0, 0, 9.99);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 1,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 9.99
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-SCOURER';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Scourer', 'NI-SCOURER', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-SCOURER' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-SCOURER', 4.833333333, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 2, 0, 0, 0, 4.833333333);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 2,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 4.833333333
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-SCRUB-10';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('SCRUBBER', 'NI-SCRUB-10', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-SCRUB-10' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-SCRUB-10', 1.399, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 14, 0, 0, 0, 1.399);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 14,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 1.399
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-SDSSTICK';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('SDS Stickers', 'NI-SDSSTICK', 'material', 'ROLLS', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-SDSSTICK' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-SDSSTICK', 0, 0)
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'B-221010';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('SHIPPING BOX / 22 X 10 X 10', 'B-221010', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'B-221010' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'B-221010', 0, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0, 0, 0, 60, 0);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 60,
            average_cost = 0
        WHERE id = existing_inv_id;
    END IF;
END $$;

