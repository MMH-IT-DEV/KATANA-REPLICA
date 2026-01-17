import { supabase } from './supabaseClient';
import { SalesOrder } from './mock-data';

// Re-export actions to maintain backward compatibility
export * from './katana-actions';

// --- Types ---

export interface KatanaItemListItem {
    id: string;
    productId?: string;
    materialId?: string;
    name: string;
    sku: string;
    category: string;
    type: 'Product' | 'Material' | 'Service';
    supplier: string;
    registeredBarcode: string;
    internalBarcode: string;
    supplierItemCode: string;
    salesPrice: number;
    productionTime: number; // seconds
    status: 'Active' | 'Archived';
}

export interface KatanaInventoryItem {
    id: string;
    productId?: string;
    materialId?: string;
    name: string;
    sku: string;
    category: string;
    type: 'Product' | 'Material';
    supplier: string;
    registeredBarcode: string;
    internalBarcode: string;
    supplierItemCode: string;
    bin: string;
    avgCost: number;
    value: number;
    inStock: number;
    expected: number;
    committed: number;
    potential: number;
    safetyStock: number;
    calculatedStock: number;
}

export interface ManufacturingOrder {
    id: string;
    orderNo: string;
    productName: string;
    customer: string;
    category: string;
    rank: string;
    completedQuantity: number;
    plannedQuantity: number;
    plannedTime: string;
    productionDeadline: string;
    deliveryDeadline: string;
    ingredientsStatus: 'in_stock' | 'expected' | 'not_available' | 'reserved';
    expectedDate?: string | null;
    productionStatus: 'not_started' | 'work_in_progress' | 'done' | 'blocked' | 'partially_complete';
    createdDate: string;
    doneDate?: string | null;
    totalCost?: number;
    materialsCost?: number;
    subAssembliesCost?: number;
    operationsCost?: number;
    plannedTimeSeconds?: number;
    actualTimeSeconds?: number;
    salesOrderId?: string | null;
    uom: string;
}

export function mapDBStatusToUI(status: string): any {
    if (!status) return 'not_started';
    const s = status.toUpperCase();
    switch (s) {
        case 'NOT_STARTED': return 'not_started';
        case 'WORK_IN_PROGRESS': return 'work_in_progress';
        case 'IN_PROGRESS': return 'work_in_progress';
        case 'DONE': return 'done';
        case 'COMPLETED': return 'done';
        case 'BLOCKED': return 'blocked';
        case 'PAUSED': return 'paused';
        case 'PARTIALLY_COMPLETE': return 'partially_complete';
        default: return 'not_started';
    }
}

// Helper to convert empty strings to null for UUID fields
const sanitizeUUID = (value: string | null | undefined): string | null => {
    console.log('🔧 sanitizeUUID called with:', JSON.stringify(value), 'type:', typeof value);
    if (!value || value === '' || value === 'all' || value === 'undefined') {
        console.log('🔧 sanitizeUUID: returning null (falsy or invalid)');
        return null;
    }
    console.log('🔧 sanitizeUUID: returning value:', value);
    return value;
};

export interface ManufacturingOrderDetails {
    id: string;
    orderNo: string;
    productName: string;
    productSku: string;
    customer: string;
    plannedQuantity: number;
    completedQuantity: number;
    uom: string;
    creationDate: string;
    productionDeadline: string;
    productionStatus: 'not_started' | 'work_in_progress' | 'done' | 'blocked' | 'partially_complete';
    variant_id?: string; // The product variant being manufactured
    ingredients: {
        id: string;
        name: string;
        sku: string;
        plannedQuantity: number;
        actualQuantity: number;
        uom: string;
        cost: number;
        stock: number;
    }[];
    operations: {
        id: string;
        operation: string;
        resource: string;
        operator: string;
        plannedTime: number;
        actualTime: number;
        cost: number;
        status: 'NOT_STARTED' | 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED';
    }[];
}

export interface KatanaBatch {
    id: string;
    batchNumber: string;
    variantId: string;
    variantName: string;
    sku: string;
    expirationDate: string;
    createdAt: string;
    quantity: number;
    itemType: 'product' | 'material';
}

export interface StockMovement {
    id: string;
    date: string;
    type: string;
    change: number;
    price: number;
    balance: number;
    value: number;
    avgCost: number;
    isAlert: boolean;
}

export interface ProductionTask {
    id: string;
    manufacturingOrderId: string;
    orderNo: string;
    productName: string;
    productionDeadline: string;
    deliveryDeadline: string;
    operation: string;
    resource: string;
    plannedTime: number; // Minutes
    plannedTimeSeconds: number;
    actualTime: number; // Minutes
    operatorName: string;
    operators: string[];
    status: 'not_started' | 'work_in_progress' | 'paused' | 'done' | 'blocked' | 'partially_complete';
    type: string;
    stepNumber: number;
    plannedQuantity: number;
    completedQuantity: number;
    uom: string;
}

export interface StockAdjustment {
    id: string;
    adjustmentNumber: string;
    adjustedDate: string;
    location: string;
    reason: string;
    value: number;
    status: 'open' | 'done';
}

export interface StockTransfer {
    id: string;
    transferNumber: string; // ST-XXX
    createdDate: string;
    origin: string; // From location
    destination: string; // To location
    value: number;
    expectedArrival: string;
    status: 'created' | 'in_transit' | 'received' | 'done';
}

export interface Stocktake {
    id: string;
    stocktakeNumber: string; // STK-XXX
    reason: string;
    createdDate: string;
    completedDate: string | null;
    stockAdjustmentId: string | null;
    stockAdjustmentNumber: string | null; // SA-XXX
    status: 'not_started' | 'in_progress' | 'completed';
    location: string;
}

export interface PurchaseOrder {
    id: string;
    orderNumber: string; // PO-XXX
    createdDate: string;
    supplier: string;
    totalValue: number;
    expectedArrival: string;
    deliveryStatus: 'not_received' | 'partially_received' | 'received';
    status: 'open' | 'done';
    location: string;
}

// --- Missing Types for Items Page ---

// Removed duplicate KatanaProductDetails interface


export interface RecipeIngredient {
    id: string; // recipe ID
    variantId: string;
    name: string;
    sku: string;
    quantity: number;
    cost: number;
    uom: string;
    notes?: string;
    itemId?: string;
}

export interface ProductionOperation {
    id: string;
    name: string;
    resource: string;
    costPerHour: number;
    duration: number; // seconds
    cost: number; // calculated per unit
    operation?: string; // Alias for name
    time?: number; // Alias for duration
}

export interface UsedInBOM {
    id: string;
    productName: string;
    productSku: string;
    quantity: number;
    variantName?: string; // Alias for productName
    uom?: string;
}

// --- Functions ---

export async function fetchKatanaItemsList(): Promise<KatanaItemListItem[]> {
    // Fetch all variants joined with items
    const { data, error } = await supabase
        .from('variants')
        .select(`
            id,
            sku,
            sales_price,
            option1_value,
            option2_value,
            option3_value,
            item:items (
                id,
                name,
                type,
                category:categories(name),
                supplier:suppliers(name)
            )
        `);

    if (error) {
        console.error('Error fetching items list:', error);
        return [];
    }

    // Process results: We want one row per VARIANT
    return data.map((v: any) => {
        const i = Array.isArray(v.item) ? v.item[0] : v.item;
        if (!i) return null;

        const attrs = [v.option1_value, v.option2_value, v.option3_value].filter(Boolean).join(' / ');
        const fullName = i.name + (attrs ? ` / ${attrs}` : '');

        return {
            id: v.id,
            productId: i.type === 'product' ? i.id : undefined,
            materialId: i.type === 'material' ? i.id : undefined,
            name: fullName,
            sku: v.sku,
            category: i.category?.name || 'Uncategorized',
            type: i.type === 'product' ? 'Product' : (i.type === 'material' ? 'Material' : 'Service'),
            supplier: i.supplier?.name || '-',
            registeredBarcode: '-',
            internalBarcode: '-',
            supplierItemCode: '-',
            salesPrice: v.sales_price || 0,
            productionTime: 0, // Need to aggregate operations time
            status: 'Active'
        };
    }).filter(Boolean) as KatanaItemListItem[];
}

export async function fetchKatanaInventoryList(): Promise<KatanaInventoryItem[]> {
    const { data, error } = await supabase
        .from('inventory')
        .select(`
            id,
            quantity_in_stock,
            quantity_committed,
            quantity_expected,
            average_cost,
            reorder_point,
            variant:variants (
                id,
                sku,
                sales_price,
                item:items (
                    id,
                    name,
                    type,
                    category:categories(name),
                    supplier:suppliers(name),
                    uom
                )
            ),
            location:locations (
                name
            )
        `);

    if (error) {
        console.error('Error fetching inventory:', error);
        return [];
    }

    return data.map((row: any) => {
        const v = row.variant;
        const i = v?.item;
        const inStock = Number(row.quantity_in_stock || 0);
        const committed = Number(row.quantity_committed || 0);
        const expected = Number(row.quantity_expected || 0);
        const avgCost = Number(row.average_cost || 0);

        return {
            id: v?.id,
            productId: i?.type === 'product' ? i?.id : undefined,
            materialId: i?.type === 'material' ? i?.id : undefined,
            name: i?.name || 'Unknown',
            sku: v?.sku || '',
            category: i?.category?.name || '-',
            type: (i?.type === 'product' ? 'Product' : 'Material') as 'Product' | 'Material',
            supplier: i?.supplier?.name || '-',
            registeredBarcode: '-',
            internalBarcode: '-',
            supplierItemCode: '-',
            bin: '-',
            avgCost: avgCost,
            value: inStock * avgCost,
            inStock: inStock,
            expected: expected,
            committed: committed,
            potential: inStock - committed,
            safetyStock: Number(row.reorder_point || 0),
            calculatedStock: inStock + expected - committed
        };
    });
}

export async function fetchManufacturingOrders(): Promise<ManufacturingOrder[]> {
    const { data, error } = await supabase
        .from('manufacturing_orders')
        .select(`
            id,
            order_no,
            planned_quantity,
            actual_quantity,
            status,
            due_date,
            total_cost,
            created_at,
            sales_order_id,
            variant:variants (
                item:items (
                    name,
                    category:categories(name),
                    uom
                )
            ),
            sales_order:sales_orders(
                customer:customers(name)
            )
        `);

    if (error) {
        console.error('Error fetching MOs:', error);
        return [];
    }

    return data.map((mo: any, index: number) => ({
        id: mo.id,
        orderNo: mo.order_no,
        rank: `#${index + 1}`,
        productName: mo.variant?.item?.name || 'Unknown',
        category: mo.variant?.item?.category?.name || '-',
        completedQuantity: Number(mo.actual_quantity || 0),
        plannedQuantity: Number(mo.planned_quantity || 0),
        uom: mo.variant?.item?.uom || 'pcs',
        plannedTime: '1h',
        productionDeadline: mo.due_date || '',
        deliveryDeadline: '-',
        ingredientsStatus: mo.ingredients_status || (index === 1 ? 'expected' : (index === 3 ? 'not_available' : 'in_stock')),
        expectedDate: mo.expected_date || (index === 1 ? '2026-01-12' : null),
        productionStatus: mapDBStatusToUI(mo.status),
        totalCost: Number(mo.total_cost || 0),
        createdDate: mo.created_at ? new Date(mo.created_at).toLocaleDateString() : '-',
        salesOrderId: mo.sales_order_id,
        customer: mo.sales_order?.customer?.name || 'Stock'
    }));
}

export async function fetchManufacturingOrder(id: string): Promise<ManufacturingOrderDetails | null> {
    const { data: mo, error } = await supabase
        .from('manufacturing_orders')
        .select(`
            id,
            order_no,
            variant_id,
            planned_quantity,
            actual_quantity,
            status,
            due_date,
            created_at,
            variant:variants (
                sku,
                item:items (
                    name,
                    uom
                )
            ),
            sales_order:sales_orders(
                customer:customers(name)
            )
        `)
        .eq('id', id)
        .single();

    if (error || !mo) {
        console.error('Error fetching MO details:', error);
        return null;
    }

    const { data: ops } = await supabase
        .from('manufacturing_order_operations')
        .select('*')
        .eq('manufacturing_order_id', id)
        .order('step_number', { ascending: true });

    const { data: ings } = await supabase
        .from('manufacturing_order_rows')
        .select(`
            id,
            planned_quantity,
            actual_quantity,
            cost_per_unit,
            variant:variants (
                sku,
                item:items (
                    name,
                    uom
                )
            )
        `)
        .eq('manufacturing_order_id', id);

    return {
        id: mo.id,
        orderNo: mo.order_no,
        variant_id: mo.variant_id, // Include variant_id for product linking
        productName: (mo.variant as any)?.item?.name || '',
        productSku: (mo.variant as any)?.sku || '',
        customer: (mo.sales_order as any)?.customer?.name || 'Stock',
        plannedQuantity: Number(mo.planned_quantity),
        completedQuantity: Number(mo.actual_quantity || 0),
        uom: (mo.variant as any)?.item?.uom || 'pcs',
        creationDate: mo.created_at,
        productionDeadline: mo.due_date,
        productionStatus: mapDBStatusToUI(mo.status),
        ingredients: (ings || []).map((i: any) => ({
            id: i.id,
            name: i.variant?.item?.name || '',
            sku: i.variant?.sku || '',
            plannedQuantity: Number(i.planned_quantity),
            actualQuantity: Number(i.actual_quantity || 0),
            uom: i.variant?.item?.uom || 'pcs',
            cost: Number(i.cost_per_unit || 0),
            stock: 999
        })),
        operations: (ops || []).map((o: any) => ({
            id: o.id,
            operation: o.operation_name,
            resource: o.resource,
            operator: o.operator_name,
            plannedTime: o.planned_time_seconds,
            actualTime: o.actual_time_seconds || 0,
            cost: o.actual_cost || 0,
            status: o.status
        }))
    };
}

export async function fetchKatanaBatches(): Promise<KatanaBatch[]> {
    const { data, error } = await supabase
        .from('batches')
        .select(`
            id,
            batch_number,
            expiration_date,
            created_at,
            variant:variants (
                id,
                sku,
                item:items (
                    name,
                    type
                )
            )
        `);

    if (error) {
        console.error('Error fetching batches:', error);
        return [];
    }

    return data.map((b: any) => ({
        id: b.id,
        batchNumber: b.batch_number,
        variantId: b.variant?.id,
        variantName: b.variant?.item?.name || '-',
        sku: b.variant?.sku || '-',
        expirationDate: b.expiration_date,
        createdAt: b.created_at,
        quantity: 0,
        itemType: (b.variant?.item?.type === 'product' ? 'product' : 'material') as 'product' | 'material'
    }));
}

export async function fetchStockMovements(variantId: string, currentInStock: number, currentAvgCost: number): Promise<StockMovement[]> {
    console.log('[fetchStockMovements] Called with:', { variantId, currentInStock, currentAvgCost });

    const [poRowsRes, soRowsRes, moRes, moIngredientsRes] = await Promise.all([
        supabase.from('purchase_order_rows').select('*, purchase_order:purchase_orders!inner(*)').eq('variant_id', variantId).gt('quantity_received', 0),
        supabase.from('sales_order_rows').select('*, sales_order:sales_orders!inner(*)').eq('variant_id', variantId).eq('sales_orders.delivery_status', 'SHIPPED'),
        supabase.from('manufacturing_orders').select('*').eq('variant_id', variantId).eq('status', 'DONE'),
        supabase.from('manufacturing_order_rows').select('*, manufacturing_order:manufacturing_orders!inner(*)').eq('variant_id', variantId).eq('manufacturing_orders.status', 'DONE')
    ]);

    console.log('[fetchStockMovements] Query results:', {
        poRows: poRowsRes.data?.length || 0,
        soRows: soRowsRes.data?.length || 0,
        moProduced: moRes.data?.length || 0,
        moIngredients: moIngredientsRes.data?.length || 0,
        errors: {
            po: poRowsRes.error,
            so: soRowsRes.error,
            mo: moRes.error,
            moIng: moIngredientsRes.error
        }
    });

    let movements: any[] = [];

    (poRowsRes.data || []).forEach((row: any) => {
        movements.push({
            id: row.id,
            date: row.purchase_order.updated_at,
            type: `PO-${row.purchase_order.order_no}`,
            change: Number(row.quantity_received),
            price: Number(row.price_per_unit)
        });
    });

    (soRowsRes.data || []).forEach((row: any) => {
        movements.push({
            id: row.id,
            date: row.sales_order.updated_at,
            type: `SO-${row.sales_order.order_no}`,
            change: -Number(row.quantity),
            price: Number(row.price_per_unit)
        });
    });

    (moRes.data || []).forEach((row: any) => {
        movements.push({
            id: row.id,
            date: row.completed_at,
            type: `MO-${row.order_no}`,
            change: Number(row.actual_quantity),
            price: currentAvgCost
        });
    });

    (moIngredientsRes.data || []).forEach((row: any) => {
        movements.push({
            id: row.id,
            date: row.manufacturing_order.completed_at,
            type: `MO-${row.manufacturing_order.order_no} (Consumed)`,
            change: -Number(row.planned_quantity),
            price: currentAvgCost
        });
    });

    movements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let runningBalance = currentInStock;
    return movements.map((m) => {
        const balanceSnapshot = runningBalance;
        runningBalance = runningBalance - m.change;
        return {
            id: m.id,
            date: m.date,
            type: m.type,
            change: m.change,
            price: m.price,
            balance: balanceSnapshot,
            value: balanceSnapshot * currentAvgCost,
            avgCost: currentAvgCost,
            isAlert: balanceSnapshot < 0
        };
    });
}

export async function fetchStockAdjustments(): Promise<StockAdjustment[]> {
    const { data, error } = await supabase
        .from('stock_adjustments')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching stock adjustments:', error);
        return [];
    }

    return (data || []).map(row => ({
        id: row.id,
        adjustmentNumber: row.adjustment_number,
        adjustedDate: row.adjusted_date,
        location: row.location || '-',
        reason: row.reason || '-',
        value: Number(row.value || 0),
        status: row.status as 'open' | 'done'
    }));
}

export async function fetchStockTransfers(): Promise<StockTransfer[]> {
    const { data, error } = await supabase
        .from('stock_transfers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching stock transfers:', error);
        return [];
    }

    return (data || []).map(row => ({
        id: row.id,
        transferNumber: row.transfer_number,
        createdDate: row.created_date,
        origin: row.origin || '-',
        destination: row.destination || '-',
        value: Number(row.value || 0),
        expectedArrival: row.expected_arrival || '-',
        status: row.status as 'created' | 'in_transit' | 'received' | 'done'
    }));
}

export async function fetchStocktakes(): Promise<Stocktake[]> {
    const { data, error } = await supabase
        .from('stocktakes')
        .select(`
            *,
            adjustment:stock_adjustments(adjustment_number)
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching stocktakes:', error);
        return [];
    }

    return (data || []).map(row => ({
        id: row.id,
        stocktakeNumber: row.stocktake_number,
        reason: row.reason || '-',
        createdDate: row.created_date,
        completedDate: row.completed_date,
        location: row.location || '-',
        stockAdjustmentId: row.stock_adjustment_id,
        stockAdjustmentNumber: row.adjustment?.adjustment_number || null,
        status: row.status as 'not_started' | 'in_progress' | 'completed'
    }));
}

export async function fetchStocktake(id: string): Promise<Stocktake | null> {
    const { data, error } = await supabase
        .from('stocktakes')
        .select(`
            *,
            adjustment:stock_adjustments(adjustment_number)
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching stocktake:', error);
        return null;
    }

    if (!data) return null;

    return {
        id: data.id,
        stocktakeNumber: data.stocktake_number,
        reason: data.reason || '-',
        createdDate: data.created_date,
        completedDate: data.completed_date,
        location: data.location || '-',
        stockAdjustmentId: data.stock_adjustment_id,
        stockAdjustmentNumber: data.adjustment?.adjustment_number || null,
        status: data.status as 'not_started' | 'in_progress' | 'completed'
    };
}

export async function fetchPurchaseOrders(): Promise<PurchaseOrder[]> {
    // Mock data for Purchase Orders as per instructions
    return [
        {
            id: '1',
            orderNumber: 'PO-156',
            createdDate: '2025-12-10',
            supplier: 'Coop Fédérée',
            totalValue: 1500.00,
            expectedArrival: '2025-12-20',
            deliveryStatus: 'not_received',
            status: 'open',
            location: 'MMH Kelowna'
        },
        {
            id: '2',
            orderNumber: 'PO-155',
            createdDate: '2025-12-05',
            supplier: 'Local Beeswax',
            totalValue: 2340.50,
            expectedArrival: '2025-12-15',
            deliveryStatus: 'partially_received',
            status: 'open',
            location: 'MMH Kelowna'
        },
        {
            id: '3',
            orderNumber: 'PO-154',
            createdDate: '2025-11-28',
            supplier: 'Glass Jars Inc',
            totalValue: 4200.00,
            expectedArrival: '2025-12-01',
            deliveryStatus: 'received',
            status: 'done',
            location: 'Storage Warehouse'
        },
        {
            id: '4',
            orderNumber: 'PO-157',
            createdDate: '2025-12-15',
            supplier: 'Essential Oils Co',
            totalValue: 1250.75,
            expectedArrival: '2025-12-25',
            deliveryStatus: 'not_received',
            status: 'open',
            location: 'Storage Warehouse'
        },
        {
            id: '5',
            orderNumber: 'PO-153',
            createdDate: '2025-11-20',
            supplier: 'Labels & Print',
            totalValue: 450.00,
            expectedArrival: '2025-11-25',
            deliveryStatus: 'received',
            status: 'done',
            location: 'MMH Kelowna'
        },
        {
            id: '6',
            orderNumber: 'PO-158',
            createdDate: '2025-12-18',
            supplier: 'Packaging Supplies',
            totalValue: 890.30,
            expectedArrival: '2025-12-22',
            deliveryStatus: 'not_received',
            status: 'open',
            location: 'MMH Kelowna'
        },
        {
            id: '7',
            orderNumber: 'PO-152',
            createdDate: '2025-11-15',
            supplier: 'Raw Materials Ltd',
            totalValue: 5600.00,
            expectedArrival: '2025-11-20',
            deliveryStatus: 'received',
            status: 'done',
            location: 'Storage Warehouse'
        }
    ];
}

export async function fetchProductionTasks(): Promise<ProductionTask[]> {
    const { data, error } = await supabase
        .from('manufacturing_order_operations')
        .select(`
            id,
            operation_name,
            type,
            resource,
            planned_time_seconds,
            status,
            operator_name,
            operators,
            step_number,
            manufacturing_order:manufacturing_orders (
                id,
                order_no,
                due_date,
                planned_quantity,
                actual_quantity,
                variant:variants (
                    item:items (
                        name,
                        uom
                    )
                )
            )
        `);

    if (error) {
        console.error('Error fetching tasks - Full error:', JSON.stringify(error, null, 2));
        return [];
    }

    return (data || []).map((op: any) => {
        const mo = op.manufacturing_order;
        const variant = mo?.variant;
        const item = variant?.item;

        return {
            id: op.id,
            manufacturingOrderId: mo?.id || '',
            orderNo: mo?.order_no || '-',
            productName: item?.name || 'Unknown',
            productionDeadline: mo?.due_date || '',
            deliveryDeadline: mo?.delivery_deadline || '-',
            operation: op.operation_name || '-',
            resource: op.resource || '-',
            plannedTime: Math.floor((op.planned_time_seconds || 0) / 60),
            plannedTimeSeconds: op.planned_time_seconds || 0,
            actualTime: Math.floor((op.actual_time_seconds || 0) / 60),
            operatorName: op.operator_name || 'Unassigned',
            operators: op.operators || [],
            status: mapDBStatusToUI(op.status),
            type: op.type || 'Process',
            stepNumber: op.step_number || 0,
            plannedQuantity: mo?.planned_quantity || 0,
            completedQuantity: mo?.actual_quantity || 0,
            uom: item?.uom || 'pcs'
        };
    });
}



// ============ ITEM MANAGEMENT (Missing Imports) ============

export interface KatanaProductDetails {
    id: string;
    name: string;
    sku: string;
    category: string;
    categoryId?: string;
    categoryName?: string;
    uom: string;
    type: 'product' | 'material';
    batchTracking: boolean;
    additionalInfo?: string;
    customCollection?: string;
    isSellable?: boolean;
    isPurchasable?: boolean;
    isProducible?: boolean;
    serialTracked?: boolean;
    batchTracked?: boolean;
    defaultSupplier?: { id: string; name: string; currency: string; };
    // Purchase UOM fields
    purchaseInDifferentUom?: boolean;
    purchaseUom?: string | null;
    purchaseUomConversionRate?: number;
    variants: {
        id: string;
        sku: string;
        salesPrice: number;
        purchasePrice: number;
        config: { name: string; value: string }[];
        option1Value?: string;
        option2Value?: string;
        option3Value?: string;
        attributes?: string;
        registeredBarcode?: string;
        internalBarcode?: string;
        supplierItemCode?: string;
        operationsCost: number;
        inStock: number;
        inventoryStatus?: { missingExcess: number };
        bin?: string;
        leadTime?: number;
        moq?: number;
    }[];
    descrip?: string;
    variantOptionDefinitions?: { name: string; values: string }[];
    variantConfig: string[];
}

export async function fetchKatanaItemDetails(id: string): Promise<KatanaProductDetails | null> {
    // Fetch item and its category
    // Note: We fetch supplier separately using supplier_id to ensure we get the correct one
    const { data: item, error } = await supabase
        .from('items')
        .select('*, category:categories(name)')
        .eq('id', id)
        .single();

    if (error || !item) return null;

    // Debug: Log raw purchase UOM fields from database
    console.log('📥 Raw item from DB - Purchase UOM fields:', {
        purchase_in_different_uom: item.purchase_in_different_uom,
        purchase_uom: item.purchase_uom,
        purchase_uom_conversion_rate: item.purchase_uom_conversion_rate
    });

    // Debug: Log supplier_id from database
    console.log('📥 Raw item from DB - supplier_id:', item.supplier_id);
    console.log('📥 Raw item from DB - supplier_currency:', item.supplier_currency);

    // Fetch supplier separately using the supplier_id column
    let supplier = null;
    if (item.supplier_id) {
        const { data: supplierData, error: supplierError } = await supabase
            .from('suppliers')
            .select('id, name, currency')
            .eq('id', item.supplier_id)
            .single();

        console.log('📥 Fetched supplier by supplier_id:', JSON.stringify(supplierData));
        if (!supplierError && supplierData) {
            supplier = supplierData;
        }
    }

    // Fetch variants with inventory, ordered by created_at so new rows appear at bottom
    console.log('🔍 Fetching variants for item_id:', id);
    const { data: variants, error: variantsError } = await supabase
        .from('variants')
        .select('*')
        .eq('item_id', id)
        .order('created_at', { ascending: true });

    console.log('🔍 Variants query result for item_id:', id, {
        variantsCount: variants?.length || 0,
        variants: variants,
        error: variantsError,
        errorMessage: variantsError?.message,
        errorDetails: variantsError?.details
    });

    const variantConfig: string[] = [];
    const variantOptionDefinitions: { name: string; values: string }[] = [];

    // Try to parse variant_config from item to get definitions (User Saved Config)
    if (item.variant_config) {
        // Handle new JSONB structure: { options: [ { name, values: [] } ] }
        if (typeof item.variant_config === 'object' && !Array.isArray(item.variant_config)) {
            const config = item.variant_config as any;
            if (config.options && Array.isArray(config.options)) {
                config.options.forEach((opt: any) => {
                    variantOptionDefinitions.push({
                        name: opt.name,
                        values: Array.isArray(opt.values) ? opt.values.join(', ') : (opt.values || '')
                    });
                    variantConfig.push(opt.name);
                });
            }
        }
        // Handle legacy array structure: [ '{"name": "...", "values": []}' ] 
        else if (Array.isArray(item.variant_config)) {
            item.variant_config.forEach((cfg: any) => {
                try {
                    const parsed = typeof cfg === 'string' ? JSON.parse(cfg) : cfg;
                    if (parsed && parsed.name) {
                        variantOptionDefinitions.push({
                            name: parsed.name,
                            values: Array.isArray(parsed.values) ? parsed.values.join(', ') : (parsed.values || '')
                        });
                        variantConfig.push(parsed.name);
                    }
                } catch (e) {
                    // Fallback for plain strings
                    if (typeof cfg === 'string') {
                        variantOptionDefinitions.push({ name: cfg, values: '' });
                        variantConfig.push(cfg);
                    }
                }
            });
        }
    }

    if (variantOptionDefinitions.length === 0 && variants && variants.length > 0) {
        // Fallback: Derive from existing variants
        // We need to collect all unique values for each option index
        [1, 2, 3].forEach(idx => {
            const name = variants[0][`option${idx}_name` as keyof typeof variants[0]];
            if (name) {
                const values = new Set<string>();
                variants.forEach((v: any) => {
                    const val = v[`option${idx}_value`];
                    if (val) values.add(val);
                });

                variantOptionDefinitions.push({
                    name: String(name),
                    values: Array.from(values).join(', ')
                });
                variantConfig.push(String(name));
            }
        });
    }

    const mappedVariants = (variants || []).map((v: any) => {
        const inv = v.inventory?.[0] || {};
        const attributes = [v.option1_value, v.option2_value, v.option3_value].filter(Boolean).join(' / ');

        return {
            id: v.id,
            sku: v.sku,
            salesPrice: v.sales_price || 0,
            purchasePrice: v.purchase_price || 0,
            config: [
                { name: v.option1_name, value: v.option1_value },
                { name: v.option2_name, value: v.option2_value },
                { name: v.option3_name, value: v.option3_value }
            ].filter(c => c.name),
            option1Value: v.option1_value,
            option2Value: v.option2_value,
            option3Value: v.option3_value,
            attributes: attributes,
            registeredBarcode: v.registered_barcode || '-',
            internalBarcode: v.internal_barcode || '-',
            supplierItemCode: v.supplier_item_code || '',
            operationsCost: 0, // TODO: Calculate from operations
            inStock: inv.quantity_in_stock || 0,
            inventoryStatus: { missingExcess: 0 }, // TODO: Calculate
            bin: '-', // TODO: Fetch bin
            leadTime: v.default_lead_time || null,
            moq: v.moq || null
        };
    });

    return {
        id: item.id,
        name: item.name,
        sku: mappedVariants[0]?.sku || '',
        categoryId: item.category_id,
        category: item.category_id, // For UI state compatibility
        categoryName: item.category?.name || 'Uncategorized',
        uom: item.uom,
        type: item.type === 'product' ? 'product' : 'material',
        batchTracking: item.is_batch_tracked,
        additionalInfo: item.description || '', // Use description column
        customCollection: item.custom_collection || '',
        isSellable: item.is_sellable !== false, // Use database value
        isPurchasable: item.is_purchasable !== false, // Use database value
        isProducible: item.is_producible !== false, // Use database value
        serialTracked: false,
        batchTracked: item.is_batch_tracked,
        defaultSupplier: supplier ? {
            id: supplier.id,
            name: supplier.name,
            // Use item's saved supplier_currency first, fallback to supplier's default currency
            currency: item.supplier_currency || supplier.currency || 'CAD'
        } : (item.supplier_currency ? {
            id: '',
            name: '',
            currency: item.supplier_currency
        } : undefined),
        // Purchase UOM fields
        purchaseInDifferentUom: item.purchase_in_different_uom || false,
        purchaseUom: item.purchase_uom || null,
        purchaseUomConversionRate: item.purchase_uom_conversion_rate || 1,
        variants: mappedVariants,
        variantConfig,
        variantOptionDefinitions
    };
}

// Update item purchase UOM settings
export async function updateItemPurchaseUOM(
    itemId: string,
    purchaseUom: string | null,
    conversionRate: number
): Promise<{ error: any }> {
    console.log('💾 Saving Purchase UOM:', {
        itemId,
        purchaseUom,
        conversionRate
    });

    // Only update the UOM and conversion rate fields
    // Do NOT update purchase_in_different_uom here - it's managed separately by the checkbox
    const { data, error } = await supabase
        .from('items')
        .update({
            purchase_uom: purchaseUom,
            purchase_uom_conversion_rate: conversionRate
        })
        .eq('id', itemId)
        .select();

    console.log('💾 Save result:', { data, error });

    if (error) {
        console.error('Supabase updateItemPurchaseUOM error (full):', JSON.stringify(error, null, 2));
        console.error('Supabase updateItemPurchaseUOM error:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
        });
    }

    return { error };
}

export async function fetchKatanaRecipe(variantId: string): Promise<RecipeIngredient[]> {
    const { data: recipe, error } = await supabase
        .from('recipes')
        .select(`
            id,
            quantity,
            notes,
            ingredient:variants!ingredient_variant_id (
                id,
                sku,
                item:items (
                    id,
                    name,
                    uom
                ),
                inventory:inventory (
                    average_cost
                )
            )
        `)
        .eq('product_variant_id', variantId);

    if (error) return [];

    return (recipe || []).map((row: any) => ({
        id: row.id,
        variantId: row.ingredient.id,
        name: row.ingredient.item.name,
        sku: row.ingredient.sku,
        quantity: row.quantity,
        uom: row.ingredient.item.uom,
        cost: row.ingredient.inventory?.[0]?.average_cost || 0,
        notes: row.notes,
        itemId: row.ingredient.item.id
    }));
}

export async function fetchKatanaOperations(variantId: string): Promise<ProductionOperation[]> {
    const { data, error } = await supabase
        .from('product_operations')
        .select('*')
        .eq('product_variant_id', variantId)
        .order('step_number', { ascending: true });

    if (error) return [];

    return (data || []).map((op: any) => ({
        id: op.id,
        name: op.operation_name,
        resource: op.resource,
        costPerHour: op.cost_per_hour,
        duration: op.duration_seconds,
        cost: (op.duration_seconds / 3600) * op.cost_per_hour,
        operation: op.operation_name,
        time: op.duration_seconds
    }));
}

export async function fetchUsedInBOMs(variantId: string): Promise<UsedInBOM[]> {
    const { data, error } = await supabase
        .from('recipes')
        .select(`
            id,
            quantity,
            product:variants (
                id,
                sku,
                item:items (
                    name,
                    uom
                )
            )
        `)
        .eq('ingredient_variant_id', variantId);

    if (error) return [];

    return (data || []).map((row: any) => ({
        id: row.id,
        productName: row.product?.item?.name || 'Unknown',
        productSku: row.product?.sku || '-',
        quantity: row.quantity,
        variantName: row.product?.item?.name || 'Unknown',
        uom: row.product?.item?.uom || 'pcs'
    }));
}

export async function updateKatanaItemDetails(id: string, _type: string, updates: any): Promise<boolean> {
    const mappedUpdates: any = {};
    const mapping: any = {
        additionalInfo: 'description',
        isSellable: 'is_sellable',
        isPurchasable: 'is_purchasable',
        isProducible: 'is_producible',
        batchTracked: 'is_batch_tracked',
        serialTracked: 'serial_tracked',
        category: 'category_id',
        customCollection: 'custom_collection',
        defaultSupplier: 'supplier_id',
        supplierCurrency: 'supplier_currency'
    };

    Object.keys(updates).forEach(key => {
        const mappedKey = mapping[key] || key;
        let value = updates[key];

        // Handle complex objects like defaultSupplier - extract id and currency separately
        if (key === 'defaultSupplier' && value && typeof value === 'object') {
            console.log('🔍 Processing defaultSupplier object:', JSON.stringify(value));
            console.log('🔍 Raw value.id:', value.id, 'type:', typeof value.id);
            console.log('🔍 Raw value.currency:', value.currency);

            if (value.id) {
                const sanitizedId = sanitizeUUID(value.id);
                console.log('🔍 sanitizeUUID result for supplier_id:', sanitizedId, 'type:', typeof sanitizedId);
                mappedUpdates['supplier_id'] = sanitizedId;
            }
            if (value.currency) {
                mappedUpdates['supplier_currency'] = value.currency;
            }
            console.log('🔍 mappedUpdates after defaultSupplier:', JSON.stringify(mappedUpdates));
            return; // Skip the rest of the loop for this key
        }

        // Sanitize specific UUID fields
        if (mappedKey === 'category_id' || mappedKey === 'supplier_id' || mappedKey === 'location_id') {
            value = sanitizeUUID(value);
        }

        mappedUpdates[mappedKey] = value;
    });

    console.log(`[Persistence Debug] Supabase update items table:`, JSON.stringify({ id, mappedUpdates }, null, 2));
    console.log(`[Persistence Debug] supplier_id in payload:`, mappedUpdates.supplier_id, 'type:', typeof mappedUpdates.supplier_id);

    const { data, error } = await supabase
        .from('items')
        .update(mappedUpdates)
        .eq('id', id)
        .select()
        .single();

    console.log(`[Persistence Debug] Save result data:`, JSON.stringify(data, null, 2));
    console.log(`[Persistence Debug] Save result error:`, JSON.stringify(error, null, 2));
    console.log(`[Persistence Debug] Saved supplier_id:`, data?.supplier_id);

    if (error) {
        console.error('Error updating item details:', JSON.stringify(error, null, 2));
        console.error('Error message:', error?.message);
        console.error('Error details:', error?.details);
        console.error('Error code:', (error as any)?.code);
        return false;
    }

    if (!data) {
        console.warn('Update successful but no data returned (items)');
    }

    return true;
}

export async function updateKatanaItemVariant(variantId: string, updates: any): Promise<boolean> {
    // Prevent saving empty SKU
    if ('sku' in updates && (!updates.sku || String(updates.sku).trim() === '')) {
        console.error('Cannot update variant with empty SKU');
        return false;
    }

    const mappedUpdates: any = {};
    const mapping: any = {
        internalBarcode: 'internal_barcode',
        registeredBarcode: 'registered_barcode',
        supplierItemCode: 'supplier_item_code',
        salesPrice: 'sales_price',
        purchasePrice: 'purchase_price',
        option1Value: 'option1_value',
        option2Value: 'option2_value',
        option3Value: 'option3_value'
    };

    Object.keys(updates).forEach(key => {
        const mappedKey = mapping[key] || key;
        let value = updates[key];

        // Sanitize specific UUID fields if they exist here
        if (mappedKey === 'item_id' || mappedKey === 'variant_id') {
            value = sanitizeUUID(value);
        }

        mappedUpdates[mappedKey] = value;
    });

    const { data, error } = await supabase
        .from('variants')
        .update(mappedUpdates)
        .eq('id', variantId)
        .select()
        .single();

    if (error) {
        console.error('Error updating variant:', JSON.stringify(error, null, 2));
        console.error('Error message:', error?.message);
        console.error('Error details:', error?.details);
        console.error('Error code:', (error as any)?.code);
        return false;
    }

    if (!data) {
        console.warn('Update successful but no data returned (variants)');
    }

    return true;
}

export async function fetchKatanaCategories(): Promise<any[]> {
    const { data } = await supabase.from('categories').select('*');
    return data || [];
}

export async function createKatanaCategory(name: string): Promise<string | null> {
    const { data, error } = await supabase.from('categories').insert({ name }).select('id').single();
    if (error) return null;
    return data.id;
}

export async function fetchKatanaUOMs(): Promise<string[]> {
    return ['pcs', 'kg', 'g', 'L', 'ml', 'm', 'm2']; // Hardcoded for now
}

export async function fetchKatanaSuppliers(): Promise<any[]> {
    const { data } = await supabase.from('suppliers').select('*');
    return data || [];
}

// --- Paginated Fetch Functions ---

// Paginated fetch for Manufacturing Orders
export async function fetchManufacturingOrdersPaginated(
    page: number = 1,
    pageSize: number = 25,
    filters?: {
        status?: string;
        search?: string;
        dateFrom?: string | null;
        dateTo?: string | null;
    }
) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Complex query to match UI needs
    let query = supabase
        .from('manufacturing_orders')
        .select(`
            id,
            order_no,
            planned_quantity,
            actual_quantity,
            status,
            due_date,
            completed_at,
            total_cost,
            created_at,
            sales_order_id,
            planned_time_seconds,
            variant:variants (
                sku,
                item:items (
                    name,
                    category:categories(name),
                    uom
                )
            ),
            sales_order:sales_orders(
                customer:customers(name)
            )
        `, { count: 'exact' });

    // Apply filters
    if (filters?.status && filters.status !== 'all') {
        const statusDB = filters.status.toUpperCase();
        query = query.eq('status', statusDB);
    }

    if (filters?.search) {
        query = query.ilike('order_no', `%${filters.search}%`);
    }

    // Apply date range filters if provided
    if (filters?.dateFrom) {
        // Use completed_at for filtering Finished orders
        query = query.gte('completed_at', filters.dateFrom);
    }
    if (filters?.dateTo) {
        query = query.lte('completed_at', filters.dateTo);
    }

    const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error fetching paginated MOs:', JSON.stringify(error, null, 2));
        return { orders: [], totalCount: 0, totalPages: 0 };
    }

    const mappedOrders = (data || []).map((mo: any, index: number) => ({
        id: mo.id,
        orderNo: mo.order_no,
        rank: `#${from + index + 1}`,
        productName: mo.variant?.item?.name || 'Unknown',
        productSku: mo.variant?.sku || '',
        category: mo.variant?.item?.category?.name || '-',
        completedQuantity: Number(mo.actual_quantity || 0),
        plannedQuantity: Number(mo.planned_quantity || 0),
        uom: mo.variant?.item?.uom || 'pcs',
        plannedTime: '1h',
        plannedTimeSeconds: Number(mo.planned_time_seconds || 0),
        actualTimeSeconds: Number(mo.actual_time_seconds || 0) || (index % 2 === 0 ? 3600 : 1800), // Mix of real and mock for testing
        productionDeadline: mo.due_date || '',
        deliveryDeadline: '-',
        ingredientsStatus: mo.ingredients_status || (index === 1 ? 'expected' : (index === 3 ? 'not_available' : 'in_stock')),
        expectedDate: mo.expected_date || (index === 1 ? '2026-01-12' : null),
        productionStatus: mapDBStatusToUI(mo.status),
        totalCost: Number(mo.total_cost || 0) || (index % 2 === 0 ? 1500.50 : 250.75),
        materialsCost: Number(mo.materials_cost || 0) || (index % 2 === 0 ? 1000 : 150),
        subAssembliesCost: Number(mo.sub_assemblies_cost || 0) || (index % 2 === 0 ? 200 : 50),
        operationsCost: Number(mo.operations_cost || 0) || (index % 2 === 0 ? 300.50 : 50.75),
        createdDate: mo.created_at ? new Date(mo.created_at).toISOString().split('T')[0] : '-',
        doneDate: (mo.done_date || mo.completed_at) ? new Date(mo.done_date || mo.completed_at).toISOString().split('T')[0] : null,
        salesOrderId: mo.sales_order_id,
        customer: mo.sales_order?.customer?.name || 'Stock'
    }));

    return {
        orders: mappedOrders,
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
    };
}

// Paginated fetch for Sales Orders
export async function fetchSalesOrdersPaginated(
    page: number = 1,
    pageSize: number = 25,
    filters?: { status?: string; search?: string }
) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from('sales_orders')
        .select(`
          *,
          customer:customers(name)
      `, { count: 'exact' });

    if (filters?.status && filters.status !== 'all') {
        query = query.ilike('status', filters.status);
    }

    if (filters?.search) {
        query = query.ilike('order_no', `%${filters.search}%`);
    }

    const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error fetching sales orders:', error);
        return { orders: [], totalCount: 0, totalPages: 0 };
    }

    const mappedSales = data?.map(so => ({
        ...so,
        orderNo: so.order_no || '-',
        createdDate: so.created_at ? new Date(so.created_at).toLocaleDateString() : '-',
        customer: so.customer || { name: 'Unknown' },
        total: Number(so.total_amount || 0),
        deadline: so.delivery_date || '-',
        items: [], // Default empty items to prevent map error
        status: (so.status || 'OPEN').toUpperCase() as any,
        delivery_status: (so.delivery_status || 'NOT_SHIPPED').toUpperCase() as any,
    })) || [];

    return {
        orders: mappedSales as SalesOrder[],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
    };
}

// Fetch single Sales Order by ID with all details
export async function fetchSalesOrder(id: string): Promise<SalesOrder | null> {
    const { data: so, error } = await supabase
        .from('sales_orders')
        .select(`
            *,
            customer:customers(*),
            items:sales_order_rows (
                *,
                variant:variants (
                    sku,
                    item:items (
                        name,
                        uom
                    )
                )
            )
        `)
        .eq('id', id)
        .single();

    if (error || !so) {
        console.error('Error fetching sales order:', error);
        return null;
    }

    // Map to SalesOrder interface
    return {
        ...so,
        orderNo: so.order_no || '-',
        createdDate: so.created_at ? new Date(so.created_at).toLocaleDateString() : '-',
        customer: so.customer || { name: 'Unknown' },
        total_amount: Number(so.total_amount || 0),
        status: (so.status || 'OPEN').toUpperCase() as any,
        delivery_status: (so.delivery_status || 'NOT_SHIPPED').toUpperCase() as any,
        items: (so.items || []).map((row: any) => ({
            id: row.id,
            name: row.variant?.item?.name || 'Unknown Item',
            sku: row.variant?.sku || '-',
            quantity: Number(row.quantity || 0),
            price: Number(row.price_per_unit || 0),
            discount: Number(row.discount_percent || 0),
            total: Number(row.total_price || 0),
            tax: row.tax_rate_id || '0%',
            location: 'Main Warehouse', // Default for now
            status: {
                sales: 'In stock', // Mocked for now
                ingredients: 'Not applicable',
                production: 'Not applicable'
            }
        }))
    } as SalesOrder;
}

// Paginated fetch for Items
export async function fetchItemsPaginated(
    page: number = 1,
    pageSize: number = 25,
    filters?: { type?: string; search?: string; category?: string }
) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from('items')
        .select(`
        *,
        category:categories(name),
        supplier:suppliers(name)
      `, { count: 'exact' });

    if (filters?.type && filters.type !== 'all') {
        // Try 'type' first, then 'item_type' if needed, but 'type' is more likely
        query = query.ilike('type', filters.type);
    }

    if (filters?.category && filters.category !== 'all') {
        query = query.eq('category_id', sanitizeUUID(filters.category));
    }

    if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`);
    }

    const { data, count, error } = await query
        .order('name', { ascending: true })
        .range(from, to);

    if (error) {
        console.error('Error fetching items:', error);
        return { items: [], totalCount: 0, totalPages: 0 };
    }

    // Mapping to KatanaItemListItem or similar interface
    const mappedItems = data?.map(item => {
        const itemType = item.type || 'material';
        return {
            id: item.id,
            productId: itemType === 'product' ? item.id : undefined,
            materialId: itemType === 'material' ? item.id : undefined,
            name: item.name,
            sku: item.sku || '-',
            category: item.category?.name || 'Uncategorized',
            type: (itemType.charAt(0).toUpperCase() + itemType.slice(1)) as any,
            supplier: item.supplier?.name || '-',
            registeredBarcode: item.registered_barcode || '-',
            internalBarcode: item.internal_barcode || '-',
            supplierItemCode: item.supplier_item_code || '-',
            salesPrice: Number(item.default_sales_price || 0),
            productionTime: Number(item.production_time || 0),
            status: (item.status || 'Active') as any,
            uom: item.uom,
        };
    }) || [];

    return {
        items: mappedItems as KatanaItemListItem[],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
    };
}

// Paginated fetch for Purchase Orders
export async function fetchPurchaseOrdersPaginated(
    page: number = 1,
    pageSize: number = 25,
    filters?: { status?: string; search?: string }
) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from('purchase_orders')
        .select(`
          *,
          supplier:suppliers(name)
      `, { count: 'exact' });

    if (filters?.status && filters.status !== 'all') {
        const statusMap: Record<string, string[]> = {
            'open': ['Not received', 'Partially received', 'Requested', 'Confirmed'],
            'done': ['Received', 'Done']
        };

        if (statusMap[filters.status.toLowerCase()]) {
            query = query.in('status', statusMap[filters.status.toLowerCase()]);
        } else {
            query = query.ilike('status', filters.status);
        }
    }

    if (filters?.search) {
        query = query.ilike('order_no', `%${filters.search}%`);
    }

    const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error fetching purchase orders:', error);
        return { orders: [], totalCount: 0, totalPages: 0 };
    }

    const mappedPOs = data?.map(po => ({
        id: po.id,
        orderNumber: po.order_no,
        supplier: po.supplier?.name || 'Unknown',
        totalValue: Number(po.total_price || 0),
        expectedArrival: po.expected_arrival_date || '-',
        deliveryStatus: po.status,
        createdDate: po.created_at ? new Date(po.created_at).toLocaleDateString() : '-',
        location: 'Main Warehouse', // Default for now
        currency: 'CAD'
    })) || [];

    return {
        orders: mappedPOs as any[],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
    };
}

// Paginated fetch for Inventory
export async function fetchInventoryPaginated(
    page: number = 1,
    pageSize: number = 25,
    filters?: { type?: string; search?: string }
) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from('items')
        .select(`
          *,
          category:categories(name),
          supplier:suppliers(name)
      `, { count: 'exact' });

    if (filters?.type && filters.type !== 'all') {
        // Try 'type' first, then 'item_type' if needed, but 'type' is more likely
        query = query.ilike('type', filters.type);
    }

    if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`);
    }

    const { data, count, error } = await query
        .order('name', { ascending: true })
        .range(from, to);

    if (error) {
        console.error('Error fetching inventory:', error);
        return { items: [], totalCount: 0, totalPages: 0 };
    }

    const mappedInventory = data?.map(item => {
        const itemType = item.type || 'material';
        return {
            id: item.id,
            productId: itemType === 'product' ? item.id : undefined,
            materialId: itemType === 'material' ? item.id : undefined,
            name: item.name,
            sku: item.sku || '-',
            category: item.category?.name || 'Uncategorized',
            type: (itemType.charAt(0).toUpperCase() + itemType.slice(1)) as any,
            supplier: item.supplier?.name || '-',
            registeredBarcode: item.registered_barcode || '-',
            internalBarcode: item.internal_barcode || '-',
            supplierItemCode: item.supplier_item_code || '-',
            bin: 'Main Warehouse', // Default for now
            avgCost: 0,
            value: 0,
            inStock: 0,
            expected: 0,
            committed: 0,
            potential: 0,
            safetyStock: 0,
            calculatedStock: 0
        };
    }) || [];

    return {
        items: mappedInventory as KatanaInventoryItem[],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
    };
}

// Generic paginated fetch
export async function fetchPaginated<T>(
    table: string,
    page: number = 1,
    pageSize: number = 25,
    options?: {
        filters?: Record<string, any>;
        search?: { column: string; value: string };
        orderBy?: { column: string; ascending?: boolean };
    }
): Promise<{ data: T[]; totalCount: number; totalPages: number }> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from(table)
        .select('*', { count: 'exact' });

    // Apply filters
    if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== 'all') {
                query = query.eq(key, value);
            }
        });
    }

    // Apply search
    if (options?.search?.value) {
        query = query.ilike(options.search.column, `%${options.search.value}%`);
    }

    // Apply ordering
    const orderColumn = options?.orderBy?.column || 'created_at';
    const ascending = options?.orderBy?.ascending ?? false;
    query = query.order(orderColumn, { ascending });

    // Apply pagination
    const { data, count, error } = await query.range(from, to);

    if (error) {
        console.error(`Error fetching ${table}:`, error);
        return { data: [], totalCount: 0, totalPages: 0 };
    }

    return {
        data: (data as T[]) || [],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
    };
}

// ============ ITEM-LEVEL PRODUCTION OPERATIONS ============
// Uses ACTUAL database schema: product_variant_id, step_number, duration_seconds, type, resource

export interface ItemProductionOperation {
    id: string;
    itemId: string;
    variantId: string;
    operationName: string;
    operationType: string;
    resourceName: string | null;
    costPerHour: number;
    timeSeconds: number;
    calculatedCost: number;
    sequenceOrder: number;
}

// Fetch operations for an item (uses product_variant_id to get all variants' operations)
export async function fetchProductOperations(itemId: string): Promise<ItemProductionOperation[]> {
    // Get all variant IDs for this item
    const { data: variants } = await supabase
        .from('variants')
        .select('id')
        .eq('item_id', itemId);

    const variantIds = variants?.map(v => v.id) || [];

    if (variantIds.length === 0) {
        return [];
    }

    const { data, error } = await supabase
        .from('product_operations')
        .select('*')
        .in('product_variant_id', variantIds)
        .order('step_number', { ascending: true });

    if (error) {
        console.error('fetchProductOperations error:', error);
        return [];
    }

    // Map to unified format for UI
    return (data || []).map((op: any) => ({
        id: op.id,
        itemId: itemId,
        variantId: op.product_variant_id,
        operationName: op.operation_name || '',
        operationType: op.type || 'Process',
        resourceName: op.resource || null,
        costPerHour: Number(op.cost_per_hour || 0),
        timeSeconds: Number(op.duration_seconds || 0),
        calculatedCost: op.duration_seconds && op.cost_per_hour
            ? (Number(op.cost_per_hour) / 3600) * Number(op.duration_seconds)
            : 0,
        sequenceOrder: op.step_number || 0
    }));
}

// Create new operation row using product_variant_id
export async function createProductOperation(itemId: string, sequenceOrder: number): Promise<{ data: ItemProductionOperation | null; error: any }> {
    console.log('📦 createProductOperation called with:', { itemId, sequenceOrder });

    // Get the first variant for this item
    const { data: variants, error: variantError } = await supabase
        .from('variants')
        .select('id')
        .eq('item_id', itemId)
        .limit(1);

    console.log('📦 Variants query result:', { variants, variantError });

    if (!variants || variants.length === 0) {
        console.log('❌ No variant found for item:', itemId);
        return { data: null, error: new Error('No variant found for this item') };
    }

    const variantId = variants[0].id;
    console.log('📦 Using variant ID:', variantId);

    const insertData = {
        product_variant_id: variantId,
        step_number: sequenceOrder,
        type: 'Process',
        operation_name: '',
        resource: '',  // NOT NULL constraint - use empty string
        cost_per_hour: 0,
        duration_seconds: 0
    };
    console.log('📦 Inserting data:', JSON.stringify(insertData, null, 2));
    console.log('📦 Variant ID type:', typeof variantId);
    console.log('📦 Is valid UUID?:', /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(variantId || ''));

    const { data, error } = await supabase
        .from('product_operations')
        .insert(insertData)
        .select()
        .single();

    console.log('📦 Insert result:', { data, error });

    if (error) {
        console.error('❌ Insert error (full):', JSON.stringify(error, null, 2));
        console.error('❌ Error message:', error.message);
        console.error('❌ Error code:', error.code);
        console.error('❌ Error details:', error.details);
        console.error('❌ Error hint:', error.hint);
        return { data: null, error };
    }

    return {
        data: {
            id: data.id,
            itemId: itemId,
            variantId: data.product_variant_id,
            operationName: data.operation_name || '',
            operationType: data.type || 'Process',
            resourceName: data.resource || null,
            costPerHour: Number(data.cost_per_hour || 0),
            timeSeconds: Number(data.duration_seconds || 0),
            calculatedCost: 0,
            sequenceOrder: data.step_number
        },
        error: null
    };
}

// Update operation field - maps UI field names to actual DB columns
export async function updateProductOperationField(
    operationId: string,
    field: string,
    value: any
): Promise<{ data: any; error: any }> {
    // Map frontend field names to actual database column names
    const fieldMapping: Record<string, string> = {
        'operationName': 'operation_name',
        'operationType': 'type',
        'resourceName': 'resource',
        'costPerHour': 'cost_per_hour',
        'timeSeconds': 'duration_seconds',
        'sequenceOrder': 'step_number',
        // Direct mappings (already correct)
        'operation_name': 'operation_name',
        'type': 'type',
        'resource': 'resource',
        'cost_per_hour': 'cost_per_hour',
        'duration_seconds': 'duration_seconds',
        'step_number': 'step_number'
    };

    const dbField = fieldMapping[field] || field;

    const { data, error } = await supabase
        .from('product_operations')
        .update({ [dbField]: value })
        .eq('id', operationId)
        .select()
        .single();

    return { data, error };
}

// Delete operation
export async function deleteProductOperationById(operationId: string): Promise<{ error: any }> {
    const { error } = await supabase
        .from('product_operations')
        .delete()
        .eq('id', operationId);

    return { error };
}

// Update operation sequence (for drag & drop reordering) - uses step_number
export async function updateOperationSequence(
    operations: { id: string; sequenceOrder: number }[]
): Promise<void> {
    const updates = operations.map(op =>
        supabase
            .from('product_operations')
            .update({ step_number: op.sequenceOrder })
            .eq('id', op.id)
    );

    await Promise.all(updates);
}

// Fetch available resources (for dropdown)
export async function fetchResourcesList(): Promise<{ id: string; name: string; defaultCostPerHour: number }[]> {
    const { data } = await supabase
        .from('resources')
        .select('id, name, default_cost_per_hour')
        .order('name');
    return (data || []).map(r => ({
        id: r.id,
        name: r.name,
        defaultCostPerHour: Number(r.default_cost_per_hour || 0)
    }));
}

// Fetch available operations (for dropdown)
export async function fetchOperationsList(): Promise<string[]> {
    const { data } = await supabase
        .from('operations')
        .select('name')
        .order('name');
    return (data || []).map(op => op.name);
}

// Copy operations from another item
export async function copyProductOperationsFrom(targetItemId: string, sourceItemId: string): Promise<boolean> {
    // Get source operations
    const sourceOps = await fetchProductOperations(sourceItemId);

    if (!sourceOps || sourceOps.length === 0) {
        return false;
    }

    // Get target item's first variant
    const { data: targetVariants } = await supabase
        .from('variants')
        .select('id')
        .eq('item_id', targetItemId);

    if (!targetVariants || targetVariants.length === 0) {
        return false;
    }

    const targetVariantIds = targetVariants.map(v => v.id);

    // Delete existing operations for target item's variants
    await supabase
        .from('product_operations')
        .delete()
        .in('product_variant_id', targetVariantIds);

    // Insert copied operations using the first target variant
    const targetVariantId = targetVariants[0].id;

    for (const op of sourceOps) {
        await supabase.from('product_operations').insert({
            product_variant_id: targetVariantId,
            step_number: op.sequenceOrder,
            operation_name: op.operationName,
            type: op.operationType,
            resource: op.resourceName,
            cost_per_hour: op.costPerHour,
            duration_seconds: op.timeSeconds
        });
    }

    return true;
}

// ============ SUPPLIERS ============

export interface Supplier {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    currency: string;
    address: string | null;
    comment: string | null;
    createdAt: string;
}

// Paginated fetch for Suppliers
export async function fetchSuppliersPaginated(
    page: number = 1,
    pageSize: number = 25,
    filters?: {
        name?: string;
        email?: string;
        currency?: string;
        phone?: string;
        comment?: string;
    }
) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from('suppliers')
        .select('*', { count: 'exact' });

    // Apply filters
    if (filters?.name) {
        query = query.ilike('name', `%${filters.name}%`);
    }
    if (filters?.email) {
        query = query.ilike('email', `%${filters.email}%`);
    }
    if (filters?.currency) {
        query = query.ilike('currency', `%${filters.currency}%`);
    }
    if (filters?.phone) {
        query = query.ilike('phone', `%${filters.phone}%`);
    }
    if (filters?.comment) {
        query = query.ilike('comment', `%${filters.comment}%`);
    }

    const { data, count, error } = await query
        .order('name', { ascending: true })
        .range(from, to);

    if (error) {
        console.error('Error fetching suppliers:', error);
        return { suppliers: [], totalCount: 0, totalPages: 0 };
    }

    const mappedSuppliers: Supplier[] = (data || []).map((s: any) => ({
        id: s.id,
        name: s.name,
        email: s.email || null,
        phone: s.phone || null,
        currency: s.currency || 'CAD',
        address: s.address || null,
        comment: s.comment || null,
        createdAt: s.created_at
    }));

    return {
        suppliers: mappedSuppliers,
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
    };
}

// Fetch a single supplier by ID
export async function fetchSupplierById(id: string): Promise<Supplier | null> {
    const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching supplier:', error);
        return null;
    }

    if (!data) return null;

    return {
        id: data.id,
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        currency: data.currency || 'CAD',
        address: data.address || null,
        comment: data.comment || null,
        createdAt: data.created_at
    };
}

// Create a new supplier
export async function createSupplier(supplier: Omit<Supplier, 'id' | 'createdAt'>): Promise<{ data: Supplier | null; error: any }> {
    const { data, error } = await supabase
        .from('suppliers')
        .insert({
            name: supplier.name,
            email: supplier.email,
            phone: supplier.phone,
            currency: supplier.currency || 'CAD',
            address: supplier.address,
            comment: supplier.comment
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating supplier:', error);
        return { data: null, error };
    }

    return {
        data: {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            currency: data.currency,
            address: data.address,
            comment: data.comment,
            createdAt: data.created_at
        },
        error: null
    };
}

// Update a supplier
export async function updateSupplier(id: string, updates: Partial<Omit<Supplier, 'id' | 'createdAt'>>): Promise<{ error: any }> {
    const { error } = await supabase
        .from('suppliers')
        .update(updates)
        .eq('id', id);

    if (error) {
        console.error('Error updating supplier:', error);
    }

    return { error };
}

// Delete a supplier
export async function deleteSupplier(id: string): Promise<{ error: any }> {
    const { error } = await supabase
        .from('suppliers')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting supplier:', error);
    }

    return { error };
}
