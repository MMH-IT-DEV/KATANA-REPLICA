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
    'MO-6504 (UFC367E 11/28) // DEC 01',
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
    'MO-6505 (UFC368A 12/28) // DEC 02',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6506 (UFC368B 12/28) // DEC 02',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6507  (UFC368C 12/28) // DEC 02',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6508 (UFC368D 12/28) // DEC 02',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6509 (UFC368E 12/28) // DEC 02',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6510 (UFC369A 12/28) // DEC 03',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6511 (UFC369B 12/28) // DEC 03',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6512 (UFC369C 12/28) // DEC 03',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6513 (UFC369D 12/28) // DEC 03',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6514 (UFC369E 12/28) // DEC 03',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6515 (UFC370A 12/28) // DEC 04',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6516 (UFC370B 12/28) // DEC 04',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6518 (UFC370C 12/28) // DEC 04',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6519 (UFC370D 12/28) // DEC 04',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6520 (UFC370E 12/28) // DEC 04',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6521 (UFC371A 12/28) // DEC 05',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6522 (UFC371B 12/28) // DEC 05',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6524 (UFC371C 12/28) // DEC 05',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6525 (UFC371D 12/28) // DEC 05',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6527 (UFC371E 12/28) // DEC 05',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
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
    'MO-6528 (UFC372A 12/28) // DEC 08',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
    400,
    0,
    'NOT_STARTED',
    '2025-11-21',
    '2025-12-08'
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
    'MO-6529 (UFC372B 12/28) // DEC 08',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
    400,
    0,
    'NOT_STARTED',
    '2025-11-21',
    '2025-12-08'
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
    'MO-6530 (UFC372C 12/28) // DEC 08',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
    400,
    0,
    'NOT_STARTED',
    '2025-11-21',
    '2025-12-08'
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
    'MO-6531 (UFC372D 12/28) // DEC 08',
    (SELECT id FROM variants WHERE sku = 'LUP-4' LIMIT 1),
    400,
    0,
    'NOT_STARTED',
    '2025-11-21',
    '2025-12-08'
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
    'MO-6532 // DEC 08',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-21',
    '2025-12-08'
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
    'MO-6533 // DEC 08',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-21',
    '2025-12-08'
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
    'MO-6534 // DEC 08',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
    0,
    'NOT_STARTED',
    '2025-11-21',
    '2025-12-08'
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
    'MO-6536 // NOV 28',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
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
    'MO-6537 (TTFC079A) // DEC 08',
    (SELECT id FROM variants WHERE sku = 'FGJ-IS-1' LIMIT 1),
    1600,
    0,
    'NOT_STARTED',
    '2025-11-21',
    '2025-12-08'
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
    'MO-6539 (TTFC079B) // DEC 08',
    (SELECT id FROM variants WHERE sku = 'FGJ-IS-1' LIMIT 1),
    1600,
    0,
    'NOT_STARTED',
    '2025-11-21',
    '2025-12-08'
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
    'MO-6540 (TTFC079C) // DEC 08',
    (SELECT id FROM variants WHERE sku = 'FGJ-IS-2' LIMIT 1),
    800,
    0,
    'NOT_STARTED',
    '2025-11-21',
    '2025-12-08'
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
    'MO-6540 (HI120525) // DEC 05',
    (SELECT id FROM variants WHERE sku = 'IP-HI' LIMIT 1),
    44462,
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
    'MO-6542 // DEC 04',
    (SELECT id FROM variants WHERE sku = 'IP-EGG' LIMIT 1),
    3200,
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
    'MO-6544 // NOV 25',
    (SELECT id FROM variants WHERE sku = 'FBOX-MS4' LIMIT 1),
    720,
    0,
    'NOT_STARTED',
    '2025-11-21',
    '2025-11-25'
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
    'MO-6545 // NOV 25',
    (SELECT id FROM variants WHERE sku = 'FG-MS-4' LIMIT 1),
    720,
    0,
    'NOT_STARTED',
    '2025-11-21',
    '2025-11-25'
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
    'MO-6547 // NOV 25',
    (SELECT id FROM variants WHERE sku = 'FG-MS-4' LIMIT 1),
    576,
    576,
    'WORK_IN_PROGRESS',
    '2025-11-21',
    '2025-11-25'
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
    'MO-6550 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'FBOX-MS2' LIMIT 1),
    798,
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
    'MO-6551 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'FG-MSJ-2' LIMIT 1),
    228,
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
    'MO-6552 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'FBOX-MS2' LIMIT 1),
    228,
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
    'MO-6553 // NOV 26',
    (SELECT id FROM variants WHERE sku = 'FG-MSJ-2' LIMIT 1),
    228,
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
    'MO-6558 // NOV 27',
    (SELECT id FROM variants WHERE sku = 'FBOX-MS2' LIMIT 1),
    912,
    0,
    'NOT_STARTED',
    '2025-11-25',
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
    'MO-6558 // NOV 28',
    (SELECT id FROM variants WHERE sku = 'FBOX-MS4' LIMIT 1),
    792,
    0,
    'NOT_STARTED',
    '2025-11-25',
    '2025-11-28'
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
    updated_at = NOW();