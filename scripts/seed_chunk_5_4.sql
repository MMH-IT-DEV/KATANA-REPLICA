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


