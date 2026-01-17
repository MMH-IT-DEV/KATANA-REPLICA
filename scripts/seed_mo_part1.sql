-- Seed Imported Manufacturing Orders
DELETE FROM manufacturing_orders WHERE order_no LIKE 'MO-%';
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6163 // NOV 18',
    (SELECT id FROM variants WHERE sku = 'B-MIPU-1' LIMIT 1),
    90,
    34,
    'WORK_IN_PROGRESS',
    '2025-11-03',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6348 // NOV 20',
    (SELECT id FROM variants WHERE sku = 'FG-MS-4' LIMIT 1),
    792,
    792,
    'WORK_IN_PROGRESS',
    '2025-11-18',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6360 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-19',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6364 (UFC365E) // NOV 26',
    (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
    400,
    0,
    'NOT_STARTED',
    '2025-11-19',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6364 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
    2375,
    0,
    'NOT_STARTED',
    '2025-11-19',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6364 // NOV 27',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-19',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6365 (UFC366E) // NOV 27',
    (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
    400,
    0,
    'NOT_STARTED',
    '2025-11-19',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6366 // NOV 27',
    (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
    2375,
    0,
    'NOT_STARTED',
    '2025-11-19',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6367 (UFC367E) // NOV 28',
    (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
    400,
    0,
    'NOT_STARTED',
    '2025-11-19',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6368 // NOV 28',
    (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
    2375,
    0,
    'NOT_STARTED',
    '2025-11-19',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6388 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6389 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6390 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6391 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6392 // NOV 27',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6393 // NOV 27',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6394 // NOV 27',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6395 // NOV 27',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6396 // DEC 01',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6397 // DEC 01',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6398 // DEC 01',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6399 // DEC 01',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6400 // DEC 01',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6401 (UFC368E) // DEC 01',
    (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
    400,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6401 // DEC 01',
    (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
    2375,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6401 // DEC 02',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6402 // DEC 02',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6403 // DEC 02',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6404 // DEC 02',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6405 (UFC369E) // DEC 02',
    (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
    400,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6407 // DEC 03',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6408 // DEC 03',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6409 // DEC 03',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6410 // DEC 03',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6411 // DEC 03',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6412 // DEC 04',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6413 // DEC 04',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6414 // DEC 04',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6415 // DEC 04',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6416 (UFC370E) // DEC 03',
    (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
    400,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6416 // DEC 03',
    (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
    2375,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6416 // DEC 02',
    (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
    2375,
    0,
    'NOT_STARTED',
    '2025-11-21',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6417 // DEC 04',
    (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
    2375,
    0,
    'NOT_STARTED',
    '2025-11-21',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6418 // DEC 05',
    (SELECT id FROM variants WHERE sku = 'IPLJ-4' LIMIT 1),
    475,
    0,
    'NOT_STARTED',
    '2025-11-21',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6419 // DEC 05',
    (SELECT id FROM variants WHERE sku = 'IPLJ-2' LIMIT 1),
    900,
    0,
    'NOT_STARTED',
    '2025-11-20',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6437 (UFC365A) // NOV 26',
    (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
    400,
    0,
    'WORK_IN_PROGRESS',
    '2025-11-21',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6438 (UFC365B) // NOV 26',
    (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
    400,
    0,
    'NOT_STARTED',
    '2025-11-21',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6439 (UFC365C) // NOV 26',
    (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
    400,
    0,
    'NOT_STARTED',
    '2025-11-21',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6440 (UFC365D) // NOV 26',
    (SELECT id FROM variants WHERE sku = 'MS-IP-4' LIMIT 1),
    400,
    0,
    'NOT_STARTED',
    '2025-11-21',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();