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