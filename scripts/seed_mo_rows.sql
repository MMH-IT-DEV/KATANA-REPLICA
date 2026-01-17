INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6163 // NOV 18' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'L-Q' LIMIT 1),
        90,
        34,
        0.2797,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6163 // NOV 18' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LUP-1' LIMIT 1),
        90,
        34,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6163 // NOV 18' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LUY-1' LIMIT 1),
        90,
        34,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6163 // NOV 18' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LCP-1' LIMIT 1),
        90,
        34,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6163 // NOV 18' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LTG-1' LIMIT 1),
        90,
        34,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6163 // NOV 18' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'FBOX-QUADRUPLE' LIMIT 1),
        90,
        34,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6163 // NOV 18' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'B-221210' LIMIT 1),
        2.647058824,
        1,
        8.7353,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6348 // NOV 20' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
        792,
        792,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6348 // NOV 20' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'FBOX-MS4' LIMIT 1),
        792,
        792,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6348 // NOV 20' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'L-M' LIMIT 1),
        792,
        792,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6360 // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6364 (UFC365E) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6364 (UFC365E) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6364 (UFC365E) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6364 (UFC365E) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6364 (UFC365E) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6364 (UFC365E) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6364 (UFC365E) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6364 (UFC365E) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6364 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'AGJAR-4' LIMIT 1),
        2375,
        0,
        0.1522,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6364 // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6365 (UFC366E) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6365 (UFC366E) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6365 (UFC366E) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6365 (UFC366E) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6365 (UFC366E) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6365 (UFC366E) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6365 (UFC366E) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6365 (UFC366E) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6366 // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'AGJAR-4' LIMIT 1),
        2375,
        0,
        0.1522,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6367 (UFC367E) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6367 (UFC367E) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6367 (UFC367E) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6367 (UFC367E) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6367 (UFC367E) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6367 (UFC367E) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6367 (UFC367E) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6367 (UFC367E) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6368 // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'AGJAR-4' LIMIT 1),
        2375,
        0,
        0.1522,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6388 // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6389 // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6390 // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6391 // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6392 // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6393 // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6394 // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6395 // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6396 // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6397 // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6398 // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6399 // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6400 // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6401 (UFC368E) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6401 (UFC368E) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6401 (UFC368E) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6401 (UFC368E) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6401 (UFC368E) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6401 (UFC368E) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6401 (UFC368E) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6401 (UFC368E) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6401 // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'AGJAR-4' LIMIT 1),
        2375,
        0,
        0.1522,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6401 // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6401 // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6402 // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6403 // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6404 // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6405 (UFC369E) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6405 (UFC369E) // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6405 (UFC369E) // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6405 (UFC369E) // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6405 (UFC369E) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6405 (UFC369E) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6405 (UFC369E) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6405 (UFC369E) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6407 // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6408 // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6409 // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6410 // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6411 // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6412 // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6413 // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6414 // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6415 // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6416 (UFC370E) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6416 (UFC370E) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6416 (UFC370E) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6416 (UFC370E) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6416 (UFC370E) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6416 (UFC370E) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6416 (UFC370E) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6416 (UFC370E) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6416 // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'AGJAR-4' LIMIT 1),
        2375,
        0,
        0.1522,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6416 // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'AGJAR-4' LIMIT 1),
        2375,
        0,
        0.1522,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6417 // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'AGJAR-4' LIMIT 1),
        2375,
        0,
        0.1522,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6418 // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'AGJAR-4' LIMIT 1),
        475,
        0,
        0.1522,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6419 // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'AGJL-2' LIMIT 1),
        900,
        0,
        1.2400,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6419 // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'AGJAR-1' LIMIT 1),
        3552,
        0,
        0.0874,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6437 (UFC365A) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6437 (UFC365A) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6437 (UFC365A) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6437 (UFC365A) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6437 (UFC365A) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6437 (UFC365A) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6437 (UFC365A) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6437 (UFC365A) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6438 (UFC365B) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6438 (UFC365B) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6438 (UFC365B) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6438 (UFC365B) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6438 (UFC365B) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6438 (UFC365B) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6438 (UFC365B) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6438 (UFC365B) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6439 (UFC365C) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6439 (UFC365C) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6439 (UFC365C) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6439 (UFC365C) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6439 (UFC365C) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6439 (UFC365C) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6439 (UFC365C) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6439 (UFC365C) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6440 (UFC365D) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6440 (UFC365D) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6440 (UFC365D) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6440 (UFC365D) // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6440 (UFC365D) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6440 (UFC365D) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6440 (UFC365D) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6440 (UFC365D) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6442 (UFC366A) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6442 (UFC366A) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6442 (UFC366A) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6442 (UFC366A) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6442 (UFC366A) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6442 (UFC366A) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6442 (UFC366A) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6442 (UFC366A) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6443 (UFC366B) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6443 (UFC366B) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6443 (UFC366B) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6443 (UFC366B) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6443 (UFC366B) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6443 (UFC366B) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6443 (UFC366B) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6443 (UFC366B) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6445 (UFC366C) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6445 (UFC366C) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6445 (UFC366C) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6445 (UFC366C) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6445 (UFC366C) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6445 (UFC366C) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6445 (UFC366C) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6445 (UFC366C) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6446 (UFC366D) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6446 (UFC366D) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6446 (UFC366D) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6446 (UFC366D) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6446 (UFC366D) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6446 (UFC366D) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6446 (UFC366D) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6446 (UFC366D) // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6447 (UFC367A) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6447 (UFC367A) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6447 (UFC367A) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6447 (UFC367A) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6447 (UFC367A) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6447 (UFC367A) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6447 (UFC367A) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6447 (UFC367A) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6448 (UFC367B) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6448 (UFC367B) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6448 (UFC367B) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6448 (UFC367B) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6448 (UFC367B) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6448 (UFC367B) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6448 (UFC367B) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6448 (UFC367B) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6449 (UFC367C) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6449 (UFC367C) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6449 (UFC367C) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6449 (UFC367C) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6449 (UFC367C) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6449 (UFC367C) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6449 (UFC367C) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6449 (UFC367C) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6450 (UFC367D) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6450 (UFC367D) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6450 (UFC367D) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6450 (UFC367D) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6450 (UFC367D) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6450 (UFC367D) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6450 (UFC367D) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6450 (UFC367D) // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6452 (UFC368A) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6452 (UFC368A) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6452 (UFC368A) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6452 (UFC368A) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6452 (UFC368A) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6452 (UFC368A) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6452 (UFC368A) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6452 (UFC368A) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6453 (UFC368B) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6453 (UFC368B) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6453 (UFC368B) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6453 (UFC368B) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6453 (UFC368B) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6453 (UFC368B) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6453 (UFC368B) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6453 (UFC368B) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6454 (UFC368C) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6454 (UFC368C) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6454 (UFC368C) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6454 (UFC368C) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6454 (UFC368C) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6454 (UFC368C) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6454 (UFC368C) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6454 (UFC368C) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6455 (UFC368D) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6455 (UFC368D) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6455 (UFC368D) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6455 (UFC368D) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6455 (UFC368D) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6455 (UFC368D) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6455 (UFC368D) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6455 (UFC368D) // DEC 01' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6456 (UFC369A) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6456 (UFC369A) // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6456 (UFC369A) // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6456 (UFC369A) // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6456 (UFC369A) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6456 (UFC369A) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6456 (UFC369A) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6456 (UFC369A) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6457 (UFC369B // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6457 (UFC369B // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6457 (UFC369B // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6457 (UFC369B // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6457 (UFC369B // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6457 (UFC369B // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6457 (UFC369B // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6457 (UFC369B // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6458 (UFC369C) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6458 (UFC369C) // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6458 (UFC369C) // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6458 (UFC369C) // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6458 (UFC369C) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6458 (UFC369C) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6458 (UFC369C) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6458 (UFC369C) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6459 (UFC369D) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6459 (UFC369D) // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6459 (UFC369D) // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6459 (UFC369D) // DEC 02' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6459 (UFC369D) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6459 (UFC369D) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6459 (UFC369D) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6459 (UFC369D) // DEC 02' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6460 (UFC370A) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6460 (UFC370A) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6460 (UFC370A) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6460 (UFC370A) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6460 (UFC370A) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6460 (UFC370A) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6460 (UFC370A) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6460 (UFC370A) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6461 (UFC370B) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6461 (UFC370B) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6461 (UFC370B) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6461 (UFC370B) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6461 (UFC370B) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6461 (UFC370B) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6461 (UFC370B) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6461 (UFC370B) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6462 (UFC370C) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6462 (UFC370C) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6462 (UFC370C) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6462 (UFC370C) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6462 (UFC370C) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6462 (UFC370C) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6462 (UFC370C) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6462 (UFC370C) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6463 (UFC370D) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6463 (UFC370D) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6463 (UFC370D) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6463 (UFC370D) // DEC 03' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6463 (UFC370D) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6463 (UFC370D) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6463 (UFC370D) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6463 (UFC370D) // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6464 (UFC371A) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6464 (UFC371A) // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6464 (UFC371A) // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6464 (UFC371A) // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6464 (UFC371A) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6464 (UFC371A) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6464 (UFC371A) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6464 (UFC371A) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6465 (UFC371B) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6465 (UFC371B) // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6465 (UFC371B) // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6465 (UFC371B) // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6465 (UFC371B) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6465 (UFC371B) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6465 (UFC371B) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6465 (UFC371B) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6466 (UFC371C) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6466 (UFC371C) // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6466 (UFC371C) // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6466 (UFC371C) // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6466 (UFC371C) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6466 (UFC371C) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6466 (UFC371C) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6466 (UFC371C) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6467 (UFC371D) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6467 (UFC371D) // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6467 (UFC371D) // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6467 (UFC371D) // DEC 04' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6467 (UFC371D) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6467 (UFC371D) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6467 (UFC371D) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6467 (UFC371D) // DEC 04' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6468 (UFC372A) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6468 (UFC372A) // DEC 05' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6468 (UFC372A) // DEC 05' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6468 (UFC372A) // DEC 05' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6468 (UFC372A) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6468 (UFC372A) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6468 (UFC372A) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6468 (UFC372A) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6469 (UFC372B) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6469 (UFC372B) // DEC 05' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6469 (UFC372B) // DEC 05' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6469 (UFC372B) // DEC 05' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6469 (UFC372B) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6469 (UFC372B) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6469 (UFC372B) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6469 (UFC372B) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6470 (UFC372C) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6470 (UFC372C) // DEC 05' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6470 (UFC372C) // DEC 05' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6470 (UFC372C) // DEC 05' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6470 (UFC372C) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6470 (UFC372C) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6470 (UFC372C) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6470 (UFC372C) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6471 (UFC372D) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'O-OIL' LIMIT 1),
        30.196,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6471 (UFC372D) // DEC 05' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6471 (UFC372D) // DEC 05' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6471 (UFC372D) // DEC 05' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6471 (UFC372D) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
        1,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6471 (UFC372D) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'EO-LAV' LIMIT 1),
        264,
        0,
        0.1500,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6471 (UFC372D) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6471 (UFC372D) // DEC 05' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LABSSEAL-4' LIMIT 1),
        400,
        0,
        0.2015,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6473 // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6474 // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6475 // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6476 // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6477 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'B-PROP' LIMIT 1),
        4800,
        0,
        0.1650,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6477 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'INFBAG-160' LIMIT 1),
        30,
        0,
        0.2000,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6478 // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'B-PROP' LIMIT 1),
        4800,
        0,
        0.1650,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6478 // DEC 03' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'INFBAG-160' LIMIT 1),
        30,
        0,
        0.2000,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6486 (UFC364B 11/28) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'FGJ-MS-2' LIMIT 1),
        890,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6486 (UFC364B 11/28) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-2' LIMIT 1),
        890,
        0,
        0.1862,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6487 (UFC364C 11/28) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'FGJ-MS-2' LIMIT 1),
        888,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6487 (UFC364C 11/28) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-2' LIMIT 1),
        888,
        0,
        0.1862,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6488 (UFC364D 11/28) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        478,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6488 (UFC364D 11/28) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        478,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6489 (UFC364E 11/28) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
        469,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6489 (UFC364E 11/28) // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'PL-PURPLE-4' LIMIT 1),
        469,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6490 (UFC365A 11/28) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6490 (UFC365A 11/28) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6491 (UFC365B 11/28) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6491 (UFC365B 11/28) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6492 (UFC365C 11/28) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6492 (UFC365C 11/28) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6493 (UFC365D 11/28) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6493 (UFC365D 11/28) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6494 (UFC365E 11/28) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6494 (UFC365E 11/28) // NOV 27' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6495 (UFC366A 11/28) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6495 (UFC366A 11/28) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6496 (UFC366B 11/28) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6496 (UFC366B 11/28) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6497 (UFC366C 11/28) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6497 (UFC366C 11/28) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6498 (UFC366D 11/28) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6498 (UFC366D 11/28) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6499 (UFC366E 11/28) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6499 (UFC366E 11/28) // NOV 28' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6500 (UFC367A 11/28) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6500 (UFC367A 11/28) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6501 (UFC367B 11/28) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6501 (UFC367B 11/28) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6502 (UFC367C 11/28) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6502 (UFC367C 11/28) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6503 (UFC367D 11/28) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6503 (UFC367D 11/28) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6504 (UFC367E 11/28) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6504 (UFC367E 11/28) // DEC 01' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6505 (UFC368A 12/28) // DEC 02' LIMIT 1),
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
INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6551 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'FBOX-MS2' LIMIT 1),
        228,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6551 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'L-M' LIMIT 1),
        228,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6552 // NOV 26' LIMIT 1),
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6553 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LUP-2' LIMIT 1),
        228,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6553 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'FBOX-MS2' LIMIT 1),
        228,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6553 // NOV 26' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'L-M' LIMIT 1),
        228,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6558 // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'B-PURPLE-2' LIMIT 1),
        912,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6558 // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LUP-2' LIMIT 1),
        912,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6558 // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'FBOX-MS2' LIMIT 1),
        912,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6558 // NOV 27' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'L-M' LIMIT 1),
        912,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6558 // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'B-PURPLE-4' LIMIT 1),
        792,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6558 // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
        792,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6558 // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'FBOX-MS4' LIMIT 1),
        792,
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
        (SELECT id FROM manufacturing_orders WHERE order_no = 'MO-6558 // NOV 28' LIMIT 1),
        (SELECT id FROM variants WHERE sku = 'L-M' LIMIT 1),
        792,
        0,
        0.1057,
        ''
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;