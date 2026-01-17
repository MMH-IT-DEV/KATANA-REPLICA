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