import { supabase } from './supabaseClient';
import { ManufacturingOrder } from './katana-data-provider';

export interface ManufacturingOrderDetails extends ManufacturingOrder {
    productSku: string;
    ingredients: Array<{
        id: string;
        variantId: string;
        name: string;
        sku: string;
        plannedQuantity: number;
        actualQuantity: number;
        cost: number;
        uom: string;
        stock: number;
        committed: number;
        notes: string;
    }>;
    operations: Array<{
        id: string;
        operation: string;
        resource: string;
        status: string;
        plannedTime: number; // seconds
        actualTime: number; // seconds
        cost: number;
        operator?: string;
    }>;
}

export async function fetchManufacturingOrder(id: string): Promise<ManufacturingOrderDetails | null> {
    const { data, error } = await supabase
        .from('manufacturing_orders')
        .select(`
            id,
            order_no,
            planned_quantity,
            actual_quantity,
            status,
            due_date,
            created_at,
            rank,
            planned_time_seconds,
            variant:variants (
                sku,
                item:items (
                    name,
                    category:categories (name),
                    uom
                )
            ),
            sales_order:sales_orders (
                order_no,
                customer:customers (name),
                delivery_date
            ),
            rows:manufacturing_order_rows (
                id,
                variant_id,
                planned_quantity,
                actual_quantity,
                cost_per_unit,
                notes,
                variant:variants (
                    sku,
                    item:items (
                        name,
                        uom
                    )
                )
            ),
            ops:manufacturing_order_operations (
                id,
                operation_name,
                resource,
                planned_time_seconds,
                actual_time_seconds,
                actual_cost,
                status,
                operator_name
            )
        `)
        .eq('id', id)
        .single();

    if (error || !data) {
        console.error('Error fetching MO:', error);
        return null;
    }

    // Map basic fields (reuse logic if possible, but easier to inline)
    let prodStatus: ManufacturingOrder['productionStatus'] = 'not_started';
    if (data.status === 'WORK_IN_PROGRESS') prodStatus = 'work_in_progress';
    if (data.status === 'DONE') prodStatus = 'done';
    if (data.status === 'BLOCKED') prodStatus = 'blocked';

    const seconds = data.planned_time_seconds || 0;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const timeStr = `${hours > 0 ? hours + ' h ' : ''}${minutes} m`;

    // Map Ingredients
    const ingredients = data.rows.map((row: any) => {
        const rowVariant = Array.isArray(row.variant) ? row.variant[0] : row.variant;
        const rowItem = rowVariant?.item ? (Array.isArray(rowVariant.item) ? rowVariant.item[0] : rowVariant.item) : null;

        return {
            id: row.id,
            variantId: row.variant_id,
            name: rowItem?.name || 'Unknown',
            sku: rowVariant?.sku || '-',
            plannedQuantity: row.planned_quantity,
            actualQuantity: row.actual_quantity,
            cost: row.cost_per_unit * row.actual_quantity, // Total cost
            uom: rowItem?.uom || 'pcs',
            stock: 0, // TODO: Need to join inventory or fetch separately
            committed: 0,
            notes: row.notes || ''
        };
    });

    // Map Operations
    const operations = data.ops.map((op: any) => ({
        id: op.id,
        operation: op.operation_name,
        resource: op.resource,
        status: op.status,
        plannedTime: op.planned_time_seconds,
        actualTime: op.actual_time_seconds,
        cost: op.actual_cost,
        operator: op.operator_name
    }));

    const salesOrder = Array.isArray(data.sales_order) ? data.sales_order[0] : data.sales_order;
    const variant = Array.isArray(data.variant) ? data.variant[0] : data.variant;
    const item = variant?.item ? (Array.isArray(variant.item) ? variant.item[0] : variant.item) : null;
    const customer = salesOrder?.customer ? (Array.isArray(salesOrder.customer) ? salesOrder.customer[0] : salesOrder.customer) : null;
    const category = item?.category ? (Array.isArray(item.category) ? item.category[0] : item.category) : null;

    return {
        id: data.id,
        orderNo: data.order_no,
        createdDate: data.created_at,
        customer: salesOrder ? `${customer?.name || 'Unknown'} / ${salesOrder.order_no}` : 'Stock',
        productName: item?.name || 'Unknown Product',
        productSku: variant?.sku || '-',
        category: category?.name || 'Uncategorized',
        completedQuantity: data.actual_quantity || 0,
        plannedQuantity: data.planned_quantity || 0,
        uom: item?.uom || 'pcs',
        plannedTime: timeStr,
        productionDeadline: data.due_date || '-',
        deliveryDeadline: salesOrder?.delivery_date || 'All dates',
        ingredientsStatus: data.status === 'DONE' ? 'not_available' : 'in_stock', // Mock
        productionStatus: prodStatus,
        rank: data.rank || 'z',
        ingredients,
        operations
    };
}











