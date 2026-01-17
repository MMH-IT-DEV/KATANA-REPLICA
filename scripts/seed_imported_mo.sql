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
INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    'MO-6442 (UFC366A) // NOV 27',
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
    'MO-6443 (UFC366B) // NOV 27',
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
    'MO-6445 (UFC366C) // NOV 27',
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
    'MO-6446 (UFC366D) // NOV 27',
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
    'MO-6447 (UFC367A) // NOV 28',
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
    'MO-6448 (UFC367B) // NOV 28',
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
    'MO-6449 (UFC367C) // NOV 28',
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
    'MO-6450 (UFC367D) // NOV 28',
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
    'MO-6452 (UFC368A) // DEC 01',
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
    'MO-6453 (UFC368B) // DEC 01',
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
    'MO-6454 (UFC368C) // DEC 01',
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
    'MO-6455 (UFC368D) // DEC 01',
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
    'MO-6456 (UFC369A) // DEC 02',
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
    'MO-6457 (UFC369B // DEC 02',
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
    'MO-6458 (UFC369C) // DEC 02',
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
    'MO-6459 (UFC369D) // DEC 02',
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
    'MO-6460 (UFC370A) // DEC 03',
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
    'MO-6461 (UFC370B) // DEC 03',
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
    'MO-6462 (UFC370C) // DEC 03',
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
    'MO-6463 (UFC370D) // DEC 03',
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
    'MO-6464 (UFC371A) // DEC 04',
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
    'MO-6465 (UFC371B) // DEC 04',
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
    'MO-6466 (UFC371C) // DEC 04',
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
    'MO-6467 (UFC371D) // DEC 04',
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
    'MO-6468 (UFC372A) // DEC 05',
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
    'MO-6469 (UFC372B) // DEC 05',
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
    'MO-6470 (UFC372C) // DEC 05',
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
    'MO-6471 (UFC372D) // DEC 05',
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
    'MO-6473 // DEC 01',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
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
    'MO-6474 // DEC 01',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
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
    'MO-6475 // DEC 01',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
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
    'MO-6476 // DEC 01',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
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
    'MO-6477 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
    30,
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
    'MO-6478 // DEC 03',
    (SELECT id FROM variants WHERE sku = 'PROPOLIS160' LIMIT 1),
    30,
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
    'MO-6486 (UFC364B 11/28) // NOV 26',
    (SELECT id FROM variants WHERE sku = 'LUP-2' LIMIT 1),
    890,
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
    'MO-6487 (UFC364C 11/28) // NOV 26',
    (SELECT id FROM variants WHERE sku = 'LUP-2' LIMIT 1),
    888,
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
    'MO-6488 (UFC364D 11/28) // NOV 26',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
    478,
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
    'MO-6489 (UFC364E 11/28) // NOV 26',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
    469,
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
    'MO-6490 (UFC365A 11/28) // NOV 27',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6491 (UFC365B 11/28) // NOV 27',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6492 (UFC365C 11/28) // NOV 27',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6493 (UFC365D 11/28) // NOV 27',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6494 (UFC365E 11/28) // NOV 27',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6495 (UFC366A 11/28) // NOV 28',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6496 (UFC366B 11/28) // NOV 28',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6497 (UFC366C 11/28) // NOV 28',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6498 (UFC366D 11/28) // NOV 28',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6499 (UFC366E 11/28) // NOV 28',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6500 (UFC367A 11/28) // DEC 01',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6501 (UFC367B 11/28) // DEC 01',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6502 (UFC367C 11/28) // DEC 01',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6503 (UFC367D 11/28) // DEC 01',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6504 (UFC367E 11/28) // DEC 01',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6505 (UFC368A 12/28) // DEC 02',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6506 (UFC368B 12/28) // DEC 02',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6507  (UFC368C 12/28) // DEC 02',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6508 (UFC368D 12/28) // DEC 02',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6509 (UFC368E 12/28) // DEC 02',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6510 (UFC369A 12/28) // DEC 03',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6511 (UFC369B 12/28) // DEC 03',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6512 (UFC369C 12/28) // DEC 03',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6513 (UFC369D 12/28) // DEC 03',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6514 (UFC369E 12/28) // DEC 03',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6515 (UFC370A 12/28) // DEC 04',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6516 (UFC370B 12/28) // DEC 04',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6518 (UFC370C 12/28) // DEC 04',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6519 (UFC370D 12/28) // DEC 04',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6520 (UFC370E 12/28) // DEC 04',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6521 (UFC371A 12/28) // DEC 05',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6522 (UFC371B 12/28) // DEC 05',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6524 (UFC371C 12/28) // DEC 05',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6525 (UFC371D 12/28) // DEC 05',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6527 (UFC371E 12/28) // DEC 05',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6528 (UFC372A 12/28) // DEC 08',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6529 (UFC372B 12/28) // DEC 08',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6530 (UFC372C 12/28) // DEC 08',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6531 (UFC372D 12/28) // DEC 08',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6532 // DEC 08',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
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
    'MO-6533 // DEC 08',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
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
    'MO-6534 // DEC 08',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
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
    'MO-6536 // NOV 28',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
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
    'MO-6537 (TTFC079A) // DEC 08',
    (SELECT id FROM variants WHERE sku = 'FGJ-IS-1' LIMIT 1),
    1600,
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
    'MO-6539 (TTFC079B) // DEC 08',
    (SELECT id FROM variants WHERE sku = 'FGJ-IS-1' LIMIT 1),
    1600,
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
    'MO-6540 (TTFC079C) // DEC 08',
    (SELECT id FROM variants WHERE sku = 'FGJ-IS-2' LIMIT 1),
    800,
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
    'MO-6540 (HI120525) // DEC 05',
    (SELECT id FROM variants WHERE sku = 'IP-HI' LIMIT 1),
    44462,
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
    'MO-6542 // DEC 04',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
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
    'MO-6544 // NOV 25',
    (SELECT id FROM variants WHERE sku = 'FBOX-MS4' LIMIT 1),
    720,
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
    'MO-6545 // NOV 25',
    (SELECT id FROM variants WHERE sku = 'FG-MS-4' LIMIT 1),
    720,
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
    'MO-6547 // NOV 25',
    (SELECT id FROM variants WHERE sku = 'FG-MS-4' LIMIT 1),
    576,
    576,
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
    'MO-6550 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'FBOX-MS2' LIMIT 1),
    798,
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
    'MO-6551 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'FG-MSJ-2' LIMIT 1),
    228,
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
    'MO-6552 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'FBOX-MS2' LIMIT 1),
    228,
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
    'MO-6553 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'FG-MSJ-2' LIMIT 1),
    228,
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
    'MO-6558 // NOV 27',
    (SELECT id FROM variants WHERE sku = 'FBOX-MS2' LIMIT 1),
    912,
    0,
    'NOT_STARTED',
    '2025-11-25',
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
    'MO-6558 // NOV 28',
    (SELECT id FROM variants WHERE sku = 'FBOX-MS4' LIMIT 1),
    792,
    0,
    'NOT_STARTED',
    '2025-11-25',
    NULL
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();
