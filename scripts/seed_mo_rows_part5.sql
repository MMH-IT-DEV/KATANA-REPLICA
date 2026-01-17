INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6505 (UFC368A 12/28) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6506 (UFC368B 12/28) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6506 (UFC368B 12/28) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6507  (UFC368C 12/28) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6507  (UFC368C 12/28) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6508 (UFC368D 12/28) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6508 (UFC368D 12/28) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6509 (UFC368E 12/28) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6509 (UFC368E 12/28) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6510 (UFC369A 12/28) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6510 (UFC369A 12/28) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6511 (UFC369B 12/28) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6511 (UFC369B 12/28) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6512 (UFC369C 12/28) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6512 (UFC369C 12/28) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6513 (UFC369D 12/28) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6513 (UFC369D 12/28) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6514 (UFC369E 12/28) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6514 (UFC369E 12/28) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6515 (UFC370A 12/28) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6515 (UFC370A 12/28) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6516 (UFC370B 12/28) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6516 (UFC370B 12/28) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6518 (UFC370C 12/28) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6518 (UFC370C 12/28) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6519 (UFC370D 12/28) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6519 (UFC370D 12/28) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6520 (UFC370E 12/28) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6520 (UFC370E 12/28) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6521 (UFC371A 12/28) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6521 (UFC371A 12/28) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6522 (UFC371B 12/28) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6522 (UFC371B 12/28) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6524 (UFC371C 12/28) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6524 (UFC371C 12/28) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6525 (UFC371D 12/28) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6525 (UFC371D 12/28) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6527 (UFC371E 12/28) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6527 (UFC371E 12/28) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6528 (UFC372A 12/28) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6528 (UFC372A 12/28) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6529 (UFC372B 12/28) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6529 (UFC372B 12/28) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6530 (UFC372C 12/28) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6530 (UFC372C 12/28) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6531 (UFC372D 12/28) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        400,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6531 (UFC372D 12/28) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        400,
        0,
        0.1576,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6532 // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EGG-X' LIMIT 1),
        210,
        0,
        0.5833,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6533 // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EGG-X' LIMIT 1),
        210,
        0,
        0.5833,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6534 // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EGG-X' LIMIT 1),
        210,
        0,
        0.5833,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6536 // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EGG-X' LIMIT 1),
        210,
        0,
        0.5833,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6537 (TTFC079A) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.192,
        0,
        8.7351,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6537 (TTFC079A) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'G-OIL' LIMIT 1),
        10.048,
        0,
        6.3400,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6537 (TTFC079A) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'B-WAX' LIMIT 1),
        7200,
        0,
        0.0154,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6537 (TTFC079A) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
        3200,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6537 (TTFC079A) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-THY' LIMIT 1),
        446.4,
        0,
        0.3100,
        'Operator: 5004585690-447 g.'
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6537 (TTFC079A) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-TT' LIMIT 1),
        712,
        0,
        0.1100,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6537 (TTFC079A) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-1' LIMIT 1),
        1600,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6537 (TTFC079A) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-1' LIMIT 1),
        1600,
        0,
        0.1761,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6539 (TTFC079B) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.192,
        0,
        8.7351,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6539 (TTFC079B) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'G-OIL' LIMIT 1),
        10.048,
        0,
        6.3400,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6539 (TTFC079B) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'B-WAX' LIMIT 1),
        7200,
        0,
        0.0154,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6539 (TTFC079B) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
        3200,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6539 (TTFC079B) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-THY' LIMIT 1),
        446.4,
        0,
        0.3100,
        'Operator: 5004585690-447 g.'
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6539 (TTFC079B) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-TT' LIMIT 1),
        712,
        0,
        0.1100,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6539 (TTFC079B) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-1' LIMIT 1),
        1600,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6539 (TTFC079B) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-1' LIMIT 1),
        1600,
        0,
        0.1761,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6540 (TTFC079C) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.2,
        0,
        8.7351,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6540 (TTFC079C) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'G-OIL' LIMIT 1),
        10.064,
        0,
        6.3400,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6540 (TTFC079C) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'B-WAX' LIMIT 1),
        7200,
        0,
        0.0154,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6540 (TTFC079C) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
        3200,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6540 (TTFC079C) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-THY' LIMIT 1),
        446.4,
        0,
        0.3100,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6540 (TTFC079C) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-TT' LIMIT 1),
        712,
        0,
        0.1100,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6540 (TTFC079C) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-2' LIMIT 1),
        800,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6540 (TTFC079C) // DEC 08' LIMIT 1),
        (SELECT id FROM variants WHERE sku = '2OZSEAL' LIMIT 1),
        800,
        0,
        0.0660,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6540 (HI120525) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'G-OIL' LIMIT 1),
        47.3,
        0,
        6.3400,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6540 (HI120525) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'H-COML' LIMIT 1),
        1491,
        0,
        0.0506,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6540 (HI120525) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'H-ARNF' LIMIT 1),
        1491,
        0,
        0.0594,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6542 // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EGG-X' LIMIT 1),
        210,
        0,
        0.5833,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6544 // NOV 25' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'B-PURPLE-4' LIMIT 1),
        720,
        0,
        0.5636,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6545 // NOV 25' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
        720,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6545 // NOV 25' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'FBOX-MS4' LIMIT 1),
        720,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6545 // NOV 25' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'L-M' LIMIT 1),
        720,
        0,
        0.1057,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6547 // NOV 25' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
        576,
        576,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6547 // NOV 25' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'FBOX-MS4' LIMIT 1),
        576,
        576,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6547 // NOV 25' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'L-M' LIMIT 1),
        576,
        576,
        0.1057,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6550 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'B-PURPLE-2' LIMIT 1),
        798,
        0,
        0.5636,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6550 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LUP-2' LIMIT 1),
        798,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6550 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'FBOX-MS2' LIMIT 1),
        798,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6550 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'L-M' LIMIT 1),
        798,
        0,
        0.1057,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6550 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'B-PURPLE-2' LIMIT 1),
        798,
        0,
        0.5636,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6550 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LUP-2' LIMIT 1),
        798,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6550 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'FBOX-MS2' LIMIT 1),
        798,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6550 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'L-M' LIMIT 1),
        798,
        0,
        0.1057,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6550 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'B-PURPLE-2' LIMIT 1),
        456,
        0,
        0.5636,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6550 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LUP-2' LIMIT 1),
        456,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6550 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'FBOX-MS2' LIMIT 1),
        456,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6550 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'L-M' LIMIT 1),
        456,
        0,
        0.1057,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6550 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'B-PURPLE-2' LIMIT 1),
        228,
        0,
        0.5636,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6551 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LUP-2' LIMIT 1),
        228,
        0,
        0.0000,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;