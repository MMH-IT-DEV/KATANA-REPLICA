DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = 'GEN-GEN-200';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Marker', 'GEN-GEN-200', 'material', 'pcs', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'GEN-GEN-200' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'GEN-GEN-200', 0.63, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 30, 0, 0, 0, 0.63);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 30,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 0.63
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-MEDGLOVES';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Medium Gloves', 'NI-MEDGLOVES', 'material', 'box', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-MEDGLOVES' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-MEDGLOVES', 26.42401429, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 15, 0, 0, 0, 26.42401429);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 15,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 26.42401429
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-N95MD';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('N95 Mask Deluxe', 'NI-N95MD', 'material', 'pack', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-N95MD' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-N95MD', 23.71238513, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0.9, 0, 0, 0, 23.71238513);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0.9,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 23.71238513
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-N95MS';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('N95 Mask Standard', 'NI-N95MS', 'material', 'pack', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-N95MS' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-N95MS', 23.71238513, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 0.9, 0, 0, 0, 23.71238513);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 0.9,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 23.71238513
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-NAPKINS';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Napkins', 'NI-NAPKINS', 'material', 'pack', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-NAPKINS' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-NAPKINS', 4.16, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 10, 0, 0, 0, 4.16);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 10,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 4.16
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-NOTEBOOK';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Notebook', 'NI-NOTEBOOK', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-NOTEBOOK' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-NOTEBOOK', 18.04, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 1, 0, 0, 0, 18.04);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 1,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 18.04
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-NYLONMESH120';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Nylon Mesh', 'NI-NYLONMESH120', 'material', 'box', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-NYLONMESH120' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-NYLONMESH120', 12.13115667, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 54, 0, 0, 0, 12.13115667);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 54,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 12.13115667
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'G-OIL';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('OIL / GRAPESEED', 'G-OIL', 'material', 'kg', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'G-OIL' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'G-OIL', 7.24446217, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 620.51804, 560.532, 2000, 1000, 7.24446217);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 620.51804,
            quantity_committed = 560.532,
            quantity_expected = 2000,
            reorder_point = 1000,
            average_cost = 7.24446217
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'O-OIL';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('OIL / OLIVE', 'O-OIL', 'material', 'kg', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'O-OIL' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'O-OIL', 9.946968411, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 761.83199, 1539.992, 2400, 1000, 9.946968411);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 761.83199,
            quantity_committed = 1539.992,
            quantity_expected = 2400,
            reorder_point = 1000,
            average_cost = 9.946968411
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
    SELECT id INTO new_item_id FROM items WHERE sku = 'NI-ONYX4';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('Onyx 4 L', 'NI-ONYX4', 'material', 'pc', false, true)
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = 'NI-ONYX4' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, 'NI-ONYX4', 73.79, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, 1, 0, 0, 0, 73.79);
    ELSE
        UPDATE inventory SET
            quantity_in_stock = 1,
            quantity_committed = 0,
            quantity_expected = 0,
            reorder_point = 0,
            average_cost = 73.79
        WHERE id = existing_inv_id;
    END IF;
END $$;


