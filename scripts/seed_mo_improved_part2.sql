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
    '2025-11-27'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-27'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-27'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-28'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-28'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-28'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-28'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-01'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-01'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-01'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-01'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-02'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-02'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-02'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-02'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-03'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-03'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-03'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-03'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-04'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-04'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-04'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-04'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-05'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-05'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-05'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-05'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-01'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-01'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-01'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-01'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-26'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-03'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-26'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-26'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-26'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-26'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-27'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-27'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-27'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-27'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-27'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-28'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-28'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-28'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-28'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-11-28'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-01'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-01'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
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
    '2025-12-01'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
    updated_at = NOW();