
import { supabase } from './supabaseClient';

export async function createKatanaItem(name: string, type: 'product' | 'material', sku: string): Promise<string | null> {
    // SKU is required
    if (!sku || !sku.trim()) {
        console.error('SKU is required to create an item');
        return null;
    }
    const finalSku = sku.trim();

    // 1. Create Category if not exists
    let catId = null;

    // Try to find it first
    const { data: catData } = await supabase.from('categories').select('id').eq('name', 'Uncategorized').single();
    if (catData) {
        catId = catData.id;
    } else {
        // Try to create it
        const { data: newCat, error: createError } = await supabase.from('categories').insert({ name: 'Uncategorized' }).select('id').single();
        if (newCat) {
            catId = newCat.id;
        } else if (createError) {
            // If creation failed (likely duplicate key race condition), try finding it again
            console.warn('Category creation failed, trying to find existing...', createError.message);
            const { data: retryCat } = await supabase.from('categories').select('id').eq('name', 'Uncategorized').single();
            if (retryCat) catId = retryCat.id;
        }
    }

    // 2. Create Item
    const isProduct = type === 'product';
    const { data, error } = await supabase.from('items').insert({
        name: name || 'New ' + (isProduct ? 'Product' : 'Material'),
        sku: finalSku,
        type: type,
        category_id: catId,
        uom: 'pcs',
        is_sellable: isProduct,
        is_purchasable: !isProduct,
        is_producible: isProduct,
        is_batch_tracked: false,
        batch_tracking_enabled: false
    }).select('id, sku').single();

    if (error) {
        console.error('Error creating item:', JSON.stringify(error, null, 2));
        console.error('Error details:', error.message, error.details, error.hint);
        return null;
    }

    const newItem = data;

    // 3. Create Default Variant with the same SKU
    const { error: varError } = await supabase.from('variants').insert({
        item_id: newItem.id,
        sku: finalSku,
        sales_price: 0,
        purchase_price: 0,
        option1_name: null,
        option1_value: null
    });

    if (varError) {
        console.error('Error creating variant:', JSON.stringify(varError, null, 2));
    }

    return newItem.id;
}

export async function searchKatanaItems(query: string, type?: 'product' | 'material' | 'variant'): Promise<any[]> {
    console.log('🔍 BOM Search:', { query, type });

    // Fetch all variants with their items - Supabase doesn't support filtering on joined tables well
    // so we fetch more data and filter locally for better search flexibility
    const { data, error } = await supabase
        .from('variants')
        .select(`
            id,
            sku,
            item_id,
            item:items (
                id,
                name,
                type,
                uom
            ),
            option1_value,
            option2_value,
            option3_value
        `)
        .order('sku');

    if (error) {
        console.error('Error searching items:', error);
        return [];
    }

    // Map to expected format
    let results = (data || []).map((v: any) => {
        const i = Array.isArray(v.item) ? v.item[0] : v.item;
        if (!i) return null;
        const name = i.name + (v.option1_value ? ` / ${v.option1_value}` : '');
        return {
            variantId: v.id,
            itemId: i.id || v.item_id,
            name: `[${v.sku}] ${name}`,
            uom: i.uom || 'pcs',
            type: i.type
        };
    }).filter(Boolean);

    // Apply text search filter locally
    if (query && query.trim()) {
        const lowerQuery = query.toLowerCase();
        results = results.filter((r: any) =>
            r.name.toLowerCase().includes(lowerQuery)
        );
    }

    // Apply type filter locally (case-insensitive to handle 'material' vs 'Material')
    if (type) {
        results = results.filter((r: any) =>
            r.type?.toLowerCase() === type.toLowerCase()
        );
    }

    // Sort by name alphabetically
    results.sort((a: any, b: any) => a.name.localeCompare(b.name));

    console.log('📊 BOM Search results:', { count: results.length, sample: results.slice(0, 3).map((r: any) => r.name) });
    return results.slice(0, 50);
}

export async function addRecipeIngredient(productVariantId: string, ingredientVariantId: string, quantity: number): Promise<boolean> {
    // Check for loops
    const hasLoop = await detectRecipeLoop(productVariantId, ingredientVariantId);
    if (hasLoop) {
        console.error('Cannot add ingredient: Circular dependency detected');
        return false;
    }

    // Check if exists first to determine if we add or update (or use upsert if constraint exists)
    // Since we added a unique constraint in 0005, we can try upsert, but to be safe with existing data/schema state:

    const { data: existing } = await supabase
        .from('recipes')
        .select('id, quantity')
        .eq('product_variant_id', productVariantId)
        .eq('ingredient_variant_id', ingredientVariantId)
        .single();

    if (existing) {
        // Update existing
        console.log(`[Persistence Debug] Updating existing recipe ingredient:`, { productVariantId, ingredientVariantId, quantity });
        const { data, error } = await supabase
            .from('recipes')
            .update({ quantity: quantity })
            .eq('id', existing.id);

        console.log(`[Persistence Debug] Ingredient update result:`, { data, error });
        if (error) {
            console.error('Error updating recipe:', JSON.stringify(error, null, 2));
            console.error('Error message:', error?.message);
            console.error('Error details:', error?.details);
            console.error('Error code:', (error as any)?.code);
            return false;
        }
        return true;
    } else {
        // Insert new
        console.log(`[Persistence Debug] Adding new recipe ingredient:`, { productVariantId, ingredientVariantId, quantity });
        const { data, error } = await supabase.from('recipes').insert({
            product_variant_id: productVariantId,
            ingredient_variant_id: ingredientVariantId,
            quantity: quantity,
            notes: '' // Initialize notes
        });

        console.log(`[Persistence Debug] Ingredient insert result:`, { data, error });
        if (error) {
            console.error('Error adding recipe:', JSON.stringify(error, null, 2));
            console.error('Error message:', error?.message);
            console.error('Error details:', error?.details);
            console.error('Error code:', (error as any)?.code);
            return false;
        }
        return true;
    }
}

// ... (rest of the file until calculateProductCost)



export async function deleteRecipeIngredient(productVariantId: string, ingredientVariantId: string): Promise<boolean> {
    const { error } = await supabase.from('recipes').delete()
        .eq('product_variant_id', productVariantId)
        .eq('ingredient_variant_id', ingredientVariantId);
    return !error;
}

export async function addOperation(productVariantId: string, operation: any): Promise<boolean> {
    const { error } = await supabase.from('product_operations').insert({
        product_variant_id: productVariantId,
        step_number: operation.step || 1,
        operation_name: operation.name,
        resource: operation.resource,
        cost_per_hour: operation.costPerHour,
        duration_seconds: operation.duration,
        type: 'Process'
    });
    return !error;
}

export async function deleteOperation(operationId: string): Promise<boolean> {
    const { error } = await supabase.from('product_operations').delete().eq('id', operationId);
    return !error;
}

export async function generateKatanaVariants(itemId: string, configs: { name: string, values: string }[]): Promise<boolean> {
    if (!configs || configs.length === 0) return false;

    // 1. Parse values
    const parsedConfigs = configs.map(c => ({
        name: c.name,
        values: c.values.split(',').map(v => v.trim()).filter(v => v !== '')
    })).filter(c => c.values.length > 0);

    // We allow generating even if empty values to potentially clear/reset
    // but for now let's ensure we have valid configs.
    if (parsedConfigs.length === 0) return false;

    // FIX Task #62: Decouple configuration from variant generation.
    // This function now ONLY updates the configuration definitions (headers/schema).
    // It does NOT create or delete variant rows.

    // 2. Sync Option Names Globally for this Item
    // This ensures renaming "Size" to "Volume" updates ALL variants, not just new ones.
    const updates: any = {};
    parsedConfigs.forEach((c, i) => {
        updates[`option${i + 1}_name`] = c.name;
    });
    // If we have fewer configs than 3, we should probably clear the others? 
    if (parsedConfigs.length < 3) updates['option3_name'] = null;
    if (parsedConfigs.length < 2) updates['option2_name'] = null;

    // Apply global name update to existing variants
    console.log('[GLOBAL VARIANT UPDATE] Time:', new Date().toISOString(), 'itemId:', itemId, 'updates:', JSON.stringify(updates));
    await supabase.from('variants').update(updates).eq('item_id', itemId);

    // 3. Update Item Config (The Source of Truth for available options)
    // FIX Task #71: Save full configuration in JSONB format for persistence.
    const configToSave = {
        options: parsedConfigs
    };

    await supabase.from('items').update({
        variant_config: configToSave
    }).eq('id', itemId);

    return true;
}

// ============ WAREHOUSE / LOCATION FUNCTIONS ============

export interface Warehouse {
    id: string;
    name: string;
    legalName: string;
    address: string;
    canSell: boolean;
    canMake: boolean;
    canBuy: boolean;
}

// Mock warehouses for now (per user request)
const MOCK_WAREHOUSES: Warehouse[] = [
    { id: 'wh-1', name: 'MMH Kelowna', legalName: 'MYMAGICHEALER NATURA', address: '1625 Dilworth Drive, 204, Kelowna, British Columbia, V1Y 7V3, Canada', canSell: true, canMake: true, canBuy: true },
    { id: 'wh-2', name: 'Storage Warehouse', legalName: 'Fripp', address: '1005 Ethel Street, Kelowna, British Columbia, V1Y 2W3, Canada', canSell: true, canMake: false, canBuy: true }
];

export async function fetchWarehouses(): Promise<Warehouse[]> {
    // For now return mock data. Later can fetch from `locations` table
    return MOCK_WAREHOUSES;
}

// ============ BIN MANAGEMENT ============

export interface VariantWarehouseBin {
    warehouseId: string;
    warehouseName: string;
    bin: string | null;
}

export async function fetchVariantBins(variantId: string): Promise<VariantWarehouseBin[]> {
    // For now, we'll return the warehouses with the current bin from inventory
    // In a full implementation, there would be a variant_warehouse_bins junction table
    const { data: invData } = await supabase
        .from('inventory')
        .select('default_storage_bin')
        .eq('variant_id', variantId)
        .single();

    const currentBin = invData?.default_storage_bin || null;

    return MOCK_WAREHOUSES.map(wh => ({
        warehouseId: wh.id,
        warehouseName: wh.name,
        bin: wh.id === 'wh-1' ? currentBin : null // Only first warehouse has the bin for now
    }));
}

export async function updateVariantBin(variantId: string, warehouseId: string, bin: string): Promise<boolean> {
    // Update the inventory table's default_storage_bin
    const { error } = await supabase
        .from('inventory')
        .update({ default_storage_bin: bin || null })
        .eq('variant_id', variantId);

    if (error) {
        console.error('Error updating bin:', error);
        return false;
    }
    return true;
}

// ============ MANUFACTURING ORDER FUNCTIONS ============

export interface CreateMOParams {
    variantId: string;
    productName: string;
    quantity: number;
    productionDeadline: string;
    locationId: string;
    createSubassemblyMOs: boolean;
}

export async function createManufacturingOrder(params: CreateMOParams): Promise<{ id: string; orderNo: string } | null> {
    // Generate order number
    const { data: lastMO } = await supabase
        .from('manufacturing_orders')
        .select('order_no')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    let nextNum = 6634; // Default starting number
    if (lastMO?.order_no) {
        const match = lastMO.order_no.match(/MO-(\d+)/);
        if (match) nextNum = parseInt(match[1]) + 1;
    }
    const orderNo = `MO-${nextNum}`;

    // Get the variant's item_id
    const { data: variantData } = await supabase
        .from('variants')
        .select('item_id')
        .eq('id', params.variantId)
        .single();

    if (!variantData) {
        console.error('Variant not found');
        return null;
    }

    const { data: newMO, error } = await supabase
        .from('manufacturing_orders')
        .insert({
            order_no: orderNo,
            item_id: variantData.item_id,
            variant_id: params.variantId,
            planned_quantity: params.quantity,
            completed_quantity: 0,
            status: 'NOT_STARTED',
            production_deadline: params.productionDeadline,
            location_id: params.locationId,
            ingredients_status: 'NOT_AVAILABLE'
        })
        .select('id, order_no')
        .single();

    if (error) {
        console.error('Error creating MO:', error);
        return null;
    }

    const moId = newMO.id;

    // 1. Populate Ingredients (BOM)
    const { data: recipeItems } = await supabase
        .from('recipes')
        .select(`
            quantity,
            ingredient_variant_id,
            ingredient:variants (
                id,
                purchase_price,
                inventory ( average_cost )
            )
        `)
        .eq('product_variant_id', params.variantId);

    if (recipeItems && recipeItems.length > 0) {
        const ingredientsToInsert = recipeItems.map((item: any) => {
            // Calculate cost per unit (fallback chain: average_cost > purchase_price > 0)
            const avgCost = item.ingredient?.inventory?.[0]?.average_cost;
            const purchPrice = item.ingredient?.purchase_price;
            const unitCost = avgCost || purchPrice || 0;

            return {
                manufacturing_order_id: moId,
                variant_id: item.ingredient_variant_id,
                planned_quantity: item.quantity * params.quantity,
                actual_quantity: null, // Start empty
                cost_per_unit: unitCost,
                total_cost: 0, // Will be actual * unitCost later
                is_picked: false
            };
        });

        const { error: ingError } = await supabase.from('manufacturing_order_rows').insert(ingredientsToInsert);
        if (ingError) console.error('Error inserting BOM ingredients:', ingError);
    }

    // 2. Populate Operations
    const { data: productOps } = await supabase
        .from('product_operations')
        .select('*')
        .eq('product_variant_id', params.variantId)
        .order('step_number', { ascending: true });

    if (productOps && productOps.length > 0) {
        const opsToInsert = productOps.map((op: any) => ({
            manufacturing_order_id: moId,
            operation_name: op.operation_name,
            type: op.type || 'Process',
            resource: op.resource,
            cost_per_hour: op.cost_per_hour || 0,
            planned_time_seconds: (op.duration_seconds || 0) * params.quantity,
            actual_time_seconds: 0,
            status: 'NOT_STARTED',
            step_number: op.step_number,
            cost_per_unit: op.cost_per_unit || 0, // If applicable
            fixed_cost: op.fixed_cost || 0 // If applicable
        }));

        const { error: opError } = await supabase.from('manufacturing_order_operations').insert(opsToInsert);
        if (opError) console.error('Error inserting operations:', opError);
    }

    // 3. Calculate initial costs
    await recalculateMOCost(moId);

    return { id: newMO.id, orderNo: newMO.order_no };
}

async function recalculateMOCost(moId: string): Promise<void> {
    // Get ingredient costs
    const { data: ingredients } = await supabase
        .from('manufacturing_order_rows')
        .select('planned_quantity, cost_per_unit')
        .eq('manufacturing_order_id', moId);

    let ingredientsCost = 0;
    if (ingredients) {
        ingredientsCost = ingredients.reduce((sum, ing) => {
            return sum + ((ing.planned_quantity || 0) * (ing.cost_per_unit || 0));
        }, 0);
    }

    // Get operation costs
    const { data: operations } = await supabase
        .from('manufacturing_order_operations')
        .select('cost_per_hour, planned_time_seconds, fixed_cost, cost_per_unit')
        .eq('manufacturing_order_id', moId);

    let operationsCost = 0;
    if (operations) {
        operationsCost = operations.reduce((sum, op) => {
            // Calculate operation cost: (time/3600 * hourly) + fixed + unit*qty(implied in unit logic)
            // Simplified calculation closer to user prompt's `calculated_cost` if that column existed, 
            // but we calculate it here based on fields we have.
            const timeCost = (op.cost_per_hour || 0) * ((op.planned_time_seconds || 0) / 3600);
            // We don't have the MO quantity here easily without refetching or passing it, 
            // but let's assume operations cost is primarily time based + fixed.
            return sum + timeCost + (op.fixed_cost || 0);
        }, 0);
    }

    // Update total cost
    const totalCost = ingredientsCost + operationsCost;

    await supabase
        .from('manufacturing_orders')
        .update({ total_cost: totalCost })
        .eq('id', moId);
}

export async function completeManufacturingOrder(moId: string, quantity: number): Promise<boolean> {
    // 1. Get MO details
    const { data: mo } = await supabase
        .from('manufacturing_orders')
        .select('variant_id, planned_quantity')
        .eq('id', moId)
        .single();

    if (!mo) return false;

    // 2. Calculate Cost of Production (Unit Cost)
    // In a real system, this would be based on actual ingredients consumed.
    // Here we use the current estimated cost.
    const unitCost = await calculateProductCost(mo.variant_id);

    // 3. Update MO status
    const { error } = await supabase
        .from('manufacturing_orders')
        .update({
            status: 'DONE',
            completed_quantity: quantity,
            ingredients_status: 'CONSUMED' // Simplified
        })
        .eq('id', moId);

    if (error) {
        console.error('Error completing MO:', error);
        return false;
    }

    // 4. Update Inventory & MAC
    // Add produced quantity to inventory and update MAC
    await updateMovingAverageCost(mo.variant_id, quantity, unitCost);

    // Update stock quantity
    const { data: inv } = await supabase.from('inventory').select('quantity_in_stock').eq('variant_id', mo.variant_id).single();
    const currentQty = inv?.quantity_in_stock || 0;
    await supabase.from('inventory').update({ quantity_in_stock: currentQty + quantity }).eq('variant_id', mo.variant_id);

    return true;
    return true;
}

export interface ManufacturingOrderDetails {
    id: string;
    orderNo: string;
    productName: string;
    productSku: string;
    customer?: string;
    plannedQuantity: number;
    completedQuantity: number;
    uom: string;
    productionStatus: 'Not started' | 'Work in progress' | 'Done' | 'Blocked';
    creationDate: string;
    productionDeadline: string;
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
        operator?: string;
        plannedTime: number; // seconds
        actualTime: number; // seconds
        cost: number;
        status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
    }[];
}

export async function fetchManufacturingOrder(id: string): Promise<ManufacturingOrderDetails | null> {
    const { data: mo, error } = await supabase
        .from('manufacturing_orders')
        .select(`
            *,
            variant:variants (
                id,
                sku,
                item:items (
                    name,
                    uom
                )
            )
        `)
        .eq('id', id)
        .single();

    if (error || !mo) {
        console.error('Error fetching MO:', error);
        return null;
    }

    // Fetch ingredients from recipe (simulated for now as we don't have MO specific ingredients table yet)
    // In a real app, we would copy recipe to MO ingredients table upon creation
    const { data: recipeRows } = await supabase
        .from('recipes')
        .select(`
            quantity,
            ingredient:variants (
                id,
                sku,
                item:items (
                    name,
                    uom
                ),
                inventory (
                    average_cost,
                    quantity_in_stock
                )
            )
        `)
        .eq('variant_id', mo.variant_id);

    const ingredients = recipeRows?.map((row: any, index: number) => ({
        id: `ing-${index}`,
        name: row.ingredient.item.name,
        sku: row.ingredient.sku,
        plannedQuantity: row.quantity * mo.planned_quantity,
        actualQuantity: 0, // Placeholder
        uom: row.ingredient.item.uom,
        cost: (row.ingredient.inventory?.[0]?.average_cost || 0) * row.quantity * mo.planned_quantity,
        stock: row.ingredient.inventory?.[0]?.quantity_in_stock || 0
    })) || [];

    // Fetch operations (simulated)
    const { data: opRows } = await supabase
        .from('product_operations')
        .select('*')
        .eq('variant_id', mo.variant_id)
        .order('sequence', { ascending: true });

    const operations = opRows?.map((op: any) => ({
        id: op.id,
        operation: op.operation,
        resource: op.resource,
        operator: undefined,
        plannedTime: op.time_per_unit * mo.planned_quantity,
        actualTime: 0,
        cost: op.cost_per_hour * (op.time_per_unit / 3600) * mo.planned_quantity,
        status: 'NOT_STARTED' as const
    })) || [];

    return {
        id: mo.id,
        orderNo: mo.order_no,
        productName: mo.variant.item.name,
        productSku: mo.variant.sku,
        plannedQuantity: mo.planned_quantity,
        completedQuantity: mo.completed_quantity,
        uom: mo.variant.item.uom,
        productionStatus: mo.status === 'NOT_STARTED' ? 'Not started' :
            mo.status === 'IN_PROGRESS' ? 'Work in progress' :
                mo.status === 'DONE' ? 'Done' : 'Blocked',
        creationDate: mo.created_at,
        productionDeadline: mo.production_deadline,
        ingredients,
        operations
    };
}

export async function receivePurchaseOrder(poId: string, items: { variantId: string, quantity: number, price: number }[]): Promise<boolean> {
    // Placeholder for PO receiving logic
    for (const item of items) {
        await updateMovingAverageCost(item.variantId, item.quantity, item.price);

        // Also update stock quantity
        const { data: inv } = await supabase.from('inventory').select('quantity_in_stock').eq('variant_id', item.variantId).single();
        const currentQty = inv?.quantity_in_stock || 0;
        await supabase.from('inventory').update({ quantity_in_stock: currentQty + item.quantity }).eq('variant_id', item.variantId);
    }
    return true;
}

// ============ SALES ORDER FUNCTIONS ============

export interface CreateSOParams {
    variantId: string;
    productName: string;
    quantity: number;
    customerId?: string;
    customerName?: string;
    deliveryDeadline: string;
    shipFromLocationId: string;
}

export async function createSalesOrder(params: CreateSOParams): Promise<{ id: string; orderNo: string } | null> {
    // Generate order number
    const { data: lastSO } = await supabase
        .from('sales_orders')
        .select('order_no')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    let nextNum = 29; // Default starting number
    if (lastSO?.order_no) {
        const match = lastSO.order_no.match(/SO-(\d+)/);
        if (match) nextNum = parseInt(match[1]) + 1;
    }
    const orderNo = `SO-${nextNum}`;

    // Get variant details for pricing
    const { data: variantData } = await supabase
        .from('variants')
        .select('item_id, sales_price')
        .eq('id', params.variantId)
        .single();

    if (!variantData) {
        console.error('Variant not found');
        return null;
    }

    const unitPrice = variantData.sales_price || 0;
    const totalAmount = unitPrice * params.quantity;

    const { data: newSO, error } = await supabase
        .from('sales_orders')
        .insert({
            order_no: orderNo,
            status: 'NOT_SHIPPED',
            delivery_status: 'NOT_SHIPPED',
            customer_name: params.customerName || 'Walk-in Customer',
            delivery_deadline: params.deliveryDeadline,
            ship_from_location_id: params.shipFromLocationId,
            total_amount: totalAmount,
            currency: 'CAD'
        })
        .select('id, order_no')
        .single();

    if (error) {
        console.error('Error creating SO:', error);
        return null;
    }

    // Create the order item
    await supabase.from('sales_order_items').insert({
        sales_order_id: newSO.id,
        variant_id: params.variantId,
        quantity: params.quantity,
        unit_price: unitPrice,
        total_price: totalAmount
    });

    return { id: newSO.id, orderNo: newSO.order_no };
}

// ============ VARIANT DELETE ============

export async function deleteVariant(variantId: string): Promise<{ success: boolean; error?: string }> {
    // 1. Check constraints
    // Manufacturing Orders
    const { data: mo } = await supabase.from('manufacturing_orders').select('id').eq('variant_id', variantId).limit(1);
    if (mo && mo.length > 0) {
        return { success: false, error: 'Cannot delete: Variant is used in Manufacturing Orders.' };
    }

    // Sales Orders
    const { data: so } = await supabase.from('sales_order_items').select('id').eq('variant_id', variantId).limit(1);
    if (so && so.length > 0) {
        return { success: false, error: 'Cannot delete: Variant is used in Sales Orders.' };
    }

    // 2. Delete related records first (Cascade manually)
    await supabase.from('inventory').delete().eq('variant_id', variantId);
    await supabase.from('recipes').delete().eq('product_variant_id', variantId);
    await supabase.from('recipes').delete().eq('ingredient_variant_id', variantId);
    await supabase.from('product_operations').delete().eq('product_variant_id', variantId);

    // 3. Delete Variant
    const { error } = await supabase.from('variants').delete().eq('id', variantId);
    if (error) {
        console.error('Error deleting variant:', error.message, error.details, error.code);
        return { success: false, error: error.message };
    }
    return { success: true };
}

export async function deleteKatanaItem(itemId: string): Promise<{ success: boolean; error?: string }> {
    console.log('[Items] Action: Deleting item:', itemId);

    try {
        // 1. Fetch all variants to check constraints
        const { data: variants, error: fetchError } = await supabase.from('variants').select('id, sku').eq('item_id', itemId);

        if (fetchError) throw fetchError;

        if (variants) {
            for (const v of variants) {
                // Check Manufacturing Orders (as product)
                const { data: mo } = await supabase.from('manufacturing_orders').select('id').eq('variant_id', v.id).limit(1);
                if (mo && mo.length > 0) {
                    return { success: false, error: `Cannot delete: Variant ${v.sku} is used in Manufacturing Orders.` };
                }

                // Check Manufacturing Orders (as ingredient)
                const { data: moIng } = await supabase.from('manufacturing_order_rows').select('id').eq('variant_id', v.id).limit(1);
                if (moIng && moIng.length > 0) {
                    return { success: false, error: `Cannot delete: Variant ${v.sku} is used as an ingredient in Manufacturing Orders.` };
                }

                // Check Sales Orders
                const { data: so } = await supabase.from('sales_order_items').select('id').eq('variant_id', v.id).limit(1);
                if (so && so.length > 0) {
                    return { success: false, error: `Cannot delete: Variant ${v.sku} is used in Sales Orders.` };
                }

                // Check Purchase Orders
                const { data: po } = await supabase.from('purchase_order_rows').select('id').eq('variant_id', v.id).limit(1);
                if (po && po.length > 0) {
                    return { success: false, error: `Cannot delete: Variant ${v.sku} is used in Purchase Orders.` };
                }
            }

            // 2. Clear related data for each variant
            // We do this manually because not all tables have ON DELETE CASCADE
            for (const v of variants) {
                // These usually have CASCADE but let's be safe/explicit if needed
                await supabase.from('inventory').delete().eq('variant_id', v.id);
                await supabase.from('batches').delete().eq('variant_id', v.id);
                await supabase.from('recipes').delete().eq('product_variant_id', v.id);
                await supabase.from('recipes').delete().eq('ingredient_variant_id', v.id);
                await supabase.from('product_operations').delete().eq('product_variant_id', v.id);

                // Finally delete the variant
                const { error: varDelError } = await supabase.from('variants').delete().eq('id', v.id);
                if (varDelError) console.warn(`[Items] Warning: Failed to delete variant ${v.id}:`, varDelError.message);
            }
        }

        // 3. Delete the item itself
        const { error: itemDelError } = await supabase.from('items').delete().eq('id', itemId);

        if (itemDelError) {
            console.error('[Items] Error: Delete item failed:', itemDelError);
            return { success: false, error: itemDelError.message };
        }

        console.log('[Items] Action: Item deleted successfully');
        return { success: true };
    } catch (err: any) {
        console.error('[Items] Action: deleteKatanaItem unexpected error:', err);
        return { success: false, error: err.message || 'An unexpected error occurred' };
    }
}

// === COSTING & VALIDATION ===

// Recursive Cost Calculation
export async function calculateProductCost(variantId: string, visited = new Set<string>()): Promise<number> {
    if (visited.has(variantId)) {
        console.warn('Circular dependency detected in cost calculation', variantId);
        return 0; // Break cycle
    }
    visited.add(variantId);

    // 1. Fetch Recipe
    const { data: recipe } = await supabase
        .from('recipes')
        .select('quantity, ingredient_variant_id')
        .eq('product_variant_id', variantId);

    let totalCost = 0;

    if (recipe && recipe.length > 0) {
        for (const row of recipe) {
            // Get ingredient details (cost and type)
            const { data: ingredient } = await supabase
                .from('variants')
                .select(`
                    id, 
                    item:items(type),
                    inventory:inventory(average_cost)
                `)
                .eq('id', row.ingredient_variant_id)
                .single();

            if (ingredient) {
                const itemType = Array.isArray(ingredient.item) ? (ingredient.item[0] as any).type : (ingredient.item as any)?.type;
                const avgCost = ingredient.inventory?.[0]?.average_cost || 0;

                if (itemType === 'product') {
                    // Recursive: For subassemblies, we *could* recalculate deep, 
                    // but for performance we often use the stored average_cost 
                    // UNLESS we want "Estimated Cost" (theoretical).
                    // The doc says: "Estimated Product Cost = Sum(Ingredient MAC * BOM Qty)"
                    // If the subassembly has a stored cost, use it. 
                    // If not (or if we want theoretical), recurse.
                    // Let's recurse for "Estimated Cost" accuracy.
                    const subCost = await calculateProductCost(ingredient.id, new Set(visited));
                    totalCost += (subCost * row.quantity);
                } else {
                    // Material: Use stored MAC
                    totalCost += (avgCost * row.quantity);
                }
            }
        }
    }

    // 2. Fetch Operations
    const { data: ops } = await supabase
        .from('product_operations')
        .select('duration_seconds, cost_per_hour')
        .eq('product_variant_id', variantId);

    if (ops) {
        for (const op of ops) {
            const hours = (op.duration_seconds || 0) / 3600;
            totalCost += (hours * (op.cost_per_hour || 0));
        }
    }

    return totalCost;
}

// Loop Detection
export async function detectRecipeLoop(parentVariantId: string, ingredientVariantId: string): Promise<boolean> {
    // Check if adding 'ingredientVariantId' to 'parentVariantId' creates a loop.
    // This means checking if 'parentVariantId' is present in the BOM tree of 'ingredientVariantId'.

    if (parentVariantId === ingredientVariantId) return true; // Direct self-reference

    const checkTree = async (currentId: string, targetId: string, visited = new Set<string>()): Promise<boolean> => {
        if (currentId === targetId) return true;
        if (visited.has(currentId)) return false; // Already checked this branch
        visited.add(currentId);

        const { data: recipe } = await supabase
            .from('recipes')
            .select('ingredient_variant_id')
            .eq('product_variant_id', currentId);

        if (!recipe) return false;

        for (const row of recipe) {
            if (await checkTree(row.ingredient_variant_id, targetId, visited)) {
                return true;
            }
        }
        return false;
    };

    return await checkTree(ingredientVariantId, parentVariantId);
}

// ============ RECIPE COPY FUNCTIONS ============

export async function updateRecipeIngredient(productVariantId: string, ingredientVariantId: string, updates: { quantity?: number; notes?: string }): Promise<boolean> {
    console.log(`[Persistence Debug] Updating recipe ingredient:`, { productVariantId, ingredientVariantId, updates });
    const { data, error } = await supabase
        .from('recipes')
        .update(updates)
        .eq('product_variant_id', productVariantId)
        .eq('ingredient_variant_id', ingredientVariantId);

    console.log(`[Persistence Debug] Ingredient update result:`, { data, error });

    if (error) {
        console.error('Error updating recipe ingredient:', JSON.stringify(error, null, 2));
        console.error('Error message:', error?.message);
        console.error('Error details:', error?.details);
        console.error('Error code:', (error as any)?.code);
        return false;
    }
    return true;
}

// ============ INVENTORY & COSTING FUNCTIONS ============

export interface InventoryStatus {
    inStock: number;
    committed: number;
    expected: number;
    missingExcess: number;
}

export async function calculateInventoryStatus(variantId: string): Promise<InventoryStatus> {
    // 1. In Stock
    const { data: inv } = await supabase
        .from('inventory')
        .select('quantity_in_stock, reorder_point')
        .eq('variant_id', variantId)
        .single();
    const inStock = inv?.quantity_in_stock || 0;
    const reorderPoint = inv?.reorder_point || 0;

    // 2. Committed
    // Sales Orders (Not Shipped)
    const { data: soItems } = await supabase
        .from('sales_order_items')
        .select('quantity, sales_orders!inner(delivery_status)')
        .eq('variant_id', variantId)
        .neq('sales_orders.delivery_status', 'Shipped');

    const committedSO = soItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

    // Manufacturing Orders (Ingredients for Not Done MOs)
    // This is harder: we need to find MOs where this variant is an ingredient.
    // For now, let's stick to SOs for "Committed" to avoid complex MO ingredient queries without a direct link table.
    // In a full system, we'd query `manufacturing_order_ingredients`.
    const committedMO = 0;

    const committed = committedSO + committedMO;

    // 3. Expected
    // Manufacturing Orders (Output of Not Done MOs)
    const { data: moOutput } = await supabase
        .from('manufacturing_orders')
        .select('planned_quantity, status')
        .eq('variant_id', variantId)
        .neq('status', 'DONE');

    const expectedMO = moOutput?.reduce((sum, mo) => sum + (mo.planned_quantity || 0), 0) || 0;

    // Purchase Orders (Not Received)
    // Assuming purchase_order_items table exists, otherwise 0
    let expectedPO = 0;
    // const { data: poItems } = await supabase.from('purchase_order_items')... 

    const expected = expectedMO + expectedPO;
    const calculatedStock = inStock - committed + expected;

    return {
        inStock,
        committed,
        expected,
        missingExcess: calculatedStock - reorderPoint
    };
}

export async function updateMovingAverageCost(variantId: string, addedQty: number, addedCost: number): Promise<boolean> {
    if (addedQty <= 0) return false;

    // Get current inventory
    const { data: inv } = await supabase
        .from('inventory')
        .select('quantity_in_stock, average_cost')
        .eq('variant_id', variantId)
        .single();

    if (!inv) return false;

    const currentQty = inv.quantity_in_stock || 0;
    const currentCost = inv.average_cost || 0;

    // Calculate new MAC
    // Formula: (OldValue + NewValue) / TotalQty
    const oldValue = currentQty * currentCost;
    const newValue = addedQty * addedCost;
    const totalQty = currentQty + addedQty;

    if (totalQty <= 0) return true; // Should not happen for addition

    const newMAC = (oldValue + newValue) / totalQty;

    // Update DB
    const { error } = await supabase
        .from('inventory')
        .update({ average_cost: newMAC })
        .eq('variant_id', variantId);

    if (error) {
        console.error('Error updating MAC:', error);
        return false;
    }
    return true;
}

export async function copyRecipeTo(sourceVariantId: string, targetVariantIds: string[]): Promise<boolean> {
    // Fetch source recipe
    const { data: sourceRecipe, error: fetchError } = await supabase
        .from('recipes')
        .select('ingredient_variant_id, quantity, notes')
        .eq('product_variant_id', sourceVariantId);

    if (fetchError || !sourceRecipe) {
        console.error('Error fetching source recipe:', fetchError);
        return false;
    }

    // Copy to each target
    for (const targetId of targetVariantIds) {
        // Clear existing recipe for target
        await supabase.from('recipes').delete().eq('product_variant_id', targetId);

        // Insert copied ingredients
        for (const ing of sourceRecipe) {
            await supabase.from('recipes').insert({
                product_variant_id: targetId,
                ingredient_variant_id: ing.ingredient_variant_id,
                quantity: ing.quantity,
                notes: ing.notes || ''
            });
        }
    }

    return true;
}

export async function copyRecipeFrom(targetVariantId: string, sourceVariantId: string): Promise<boolean> {
    // Fetch source recipe
    const { data: sourceRecipe, error: fetchError } = await supabase
        .from('recipes')
        .select('ingredient_variant_id, quantity, notes')
        .eq('product_variant_id', sourceVariantId);

    if (fetchError || !sourceRecipe) {
        console.error('Error fetching source recipe:', fetchError);
        return false;
    }

    // Clear existing recipe for target
    await supabase.from('recipes').delete().eq('product_variant_id', targetVariantId);

    // Insert copied ingredients
    for (const ing of sourceRecipe) {
        await supabase.from('recipes').insert({
            product_variant_id: targetVariantId,
            ingredient_variant_id: ing.ingredient_variant_id,
            quantity: ing.quantity,
            notes: ing.notes || ''
        });
    }

    return true;
}

// ============ OPERATION FUNCTIONS ============

export async function updateOperation(operationId: string, updates: {
    operation_name?: string;
    type?: string;
    resource?: string;
    cost_per_hour?: number;
    cost_per_unit?: number;
    fixed_cost?: number;
    duration_seconds?: number;
    variant_filter?: string[];
}): Promise<boolean> {
    const { error } = await supabase
        .from('product_operations')
        .update(updates)
        .eq('id', operationId);

    if (error) {
        console.error('Error updating operation:', error);
        return false;
    }
    return true;
}

export async function copyOperationsFrom(targetVariantId: string, sourceVariantId: string): Promise<boolean> {
    // Fetch source operations
    const { data: sourceOps, error: fetchError } = await supabase
        .from('product_operations')
        .select('*')
        .eq('product_variant_id', sourceVariantId)
        .order('step_number', { ascending: true });

    if (fetchError || !sourceOps) {
        console.error('Error fetching source operations:', fetchError);
        return false;
    }

    // Clear existing operations for target
    await supabase.from('product_operations').delete().eq('product_variant_id', targetVariantId);

    // Insert copied operations
    for (const op of sourceOps) {
        await supabase.from('product_operations').insert({
            product_variant_id: targetVariantId,
            step_number: op.step_number,
            operation_name: op.operation_name,
            type: op.type || 'Process',
            resource: op.resource,
            cost_per_hour: op.cost_per_hour,
            cost_per_unit: op.cost_per_unit,
            fixed_cost: op.fixed_cost,
            duration_seconds: op.duration_seconds
        });
    }

    return true;
}

export async function fetchVariantsWithRecipes(itemId: string): Promise<{ id: string; sku: string; name: string; hasRecipe: boolean }[]> {
    // Fetch all variants for the item with recipe count
    const { data: variants, error } = await supabase
        .from('variants')
        .select(`
            id,
            sku,
            option1_value,
            option2_value,
            option3_value,
            item:items (name)
        `)
        .eq('item_id', itemId);

    if (error || !variants) return [];

    // Check which have recipes
    const results = [];
    for (const v of variants) {
        const { count } = await supabase
            .from('recipes')
            .select('id', { count: 'exact', head: true })
            .eq('product_variant_id', v.id);

        const itemName = Array.isArray(v.item) ? v.item[0]?.name : (v.item as any)?.name || '';
        const attrs = [v.option1_value, v.option2_value, v.option3_value].filter(Boolean).join(' / ');

        results.push({
            id: v.id,
            sku: v.sku,
            name: `[${v.sku}] ${itemName}${attrs ? ' / ' + attrs : ''}`,
            hasRecipe: (count || 0) > 0
        });
    }

    return results;
}

export async function searchProductsWithRecipes(query: string): Promise<{ variantId: string; name: string; sku: string }[]> {
    // Search for products that have recipes
    const { data, error } = await supabase
        .from('variants')
        .select(`
            id,
            sku,
            option1_value,
            item:items!inner (
                id,
                name,
                type
            )
        `)
        .eq('item.type', 'product');

    if (error || !data) return [];

    // Filter by query and check for recipes
    const results = [];
    for (const v of data) {
        const itemData = Array.isArray(v.item) ? v.item[0] : v.item;
        if (!itemData) continue;

        const fullName = `[${v.sku}] ${itemData.name}${v.option1_value ? ' / ' + v.option1_value : ''}`;

        if (query && !fullName.toLowerCase().includes(query.toLowerCase())) continue;

        const { count } = await supabase
            .from('recipes')
            .select('id', { count: 'exact', head: true })
            .eq('product_variant_id', v.id);

        if ((count || 0) > 0) {
            results.push({
                variantId: v.id,
                name: fullName,
                sku: v.sku
            });
        }
    }

    return results.slice(0, 20);
}

export async function duplicateKatanaItem(sourceItemId: string): Promise<string | null> {
    // 1. Fetch source item
    const { data: sourceItem } = await supabase.from('items').select('*').eq('id', sourceItemId).single();
    if (!sourceItem) return null;

    // 2. Create new item
    const { data: newItem, error: itemError } = await supabase.from('items').insert({
        name: `${sourceItem.name} (copy)`,
        sku: `COPY-${Math.floor(Math.random() * 10000)}`, // Temporary SKU
        type: sourceItem.type,
        category_id: sourceItem.category_id,
        uom: sourceItem.uom,
        is_sellable: sourceItem.is_sellable,
        is_purchasable: sourceItem.is_purchasable,
        is_producible: sourceItem.is_producible,
        is_batch_tracked: sourceItem.is_batch_tracked,
        batch_tracking_enabled: sourceItem.batch_tracking_enabled
    }).select('id').single();

    if (itemError || !newItem) {
        console.error('Error duplicating item:', itemError);
        return null;
    }

    // 3. Fetch source variants
    const { data: sourceVariants } = await supabase.from('variants').select('*').eq('item_id', sourceItemId);

    if (sourceVariants) {
        for (const v of sourceVariants) {
            // Create new variant
            const { data: newVariant } = await supabase.from('variants').insert({
                item_id: newItem.id,
                sku: `${v.sku}-copy`,
                sales_price: v.sales_price,
                purchase_price: v.purchase_price,
                option1_name: v.option1_name,
                option1_value: v.option1_value,
                option2_name: v.option2_name,
                option2_value: v.option2_value,
                option3_name: v.option3_name,
                option3_value: v.option3_value,
                registered_barcode: v.registered_barcode,
                internal_barcode: v.internal_barcode,
                supplier_item_code: v.supplier_item_code
            }).select('id').single();

            if (newVariant) {
                // 4. Copy Recipe (Ingredients)
                const { data: recipe } = await supabase.from('recipes').select('*').eq('product_variant_id', v.id);
                if (recipe && recipe.length > 0) {
                    const newRecipeRows = recipe.map(r => ({
                        product_variant_id: newVariant.id,
                        ingredient_variant_id: r.ingredient_variant_id,
                        quantity: r.quantity,
                        notes: r.notes
                    }));
                    await supabase.from('recipes').insert(newRecipeRows);
                }

                // 5. Copy Operations
                const { data: ops } = await supabase.from('product_operations').select('*').eq('product_variant_id', v.id);
                if (ops && ops.length > 0) {
                    const newOps = ops.map(o => ({
                        product_variant_id: newVariant.id,
                        step_number: o.step_number,
                        operation_name: o.operation_name,
                        type: o.type,
                        resource: o.resource,
                        cost_per_hour: o.cost_per_hour,
                        cost_per_unit: o.cost_per_unit,
                        fixed_cost: o.fixed_cost,
                        duration_seconds: o.duration_seconds
                    }));
                    await supabase.from('product_operations').insert(newOps);
                }

                // Initialize Inventory for new variant
                await supabase.from('inventory').insert({
                    variant_id: newVariant.id,
                    quantity_in_stock: 0,
                    reorder_point: 0,
                    average_cost: 0
                });
            }
        }
    }
    return newItem.id;
}

export async function createStockAdjustment(): Promise<string | null> {
    try {
        const { count } = await supabase.from('stock_adjustments').select('id', { count: 'exact', head: true });
        const nextNo = (count || 0) + 715;
        const adjustmentNumber = `SA-${nextNo}`;

        const { data, error } = await supabase.from('stock_adjustments').insert({
            adjustment_number: adjustmentNumber,
            adjusted_date: new Date().toISOString(),
            status: 'open',
            reason: '',
            location: 'Main Warehouse',
            value: 0
        }).select('id').single();

        if (error) throw error;
        return data.id;
    } catch (error) {
        console.error('Error creating stock adjustment:', error);
        return null;
    }
}

export async function createStockTransfer(): Promise<string | null> {
    try {
        // 1. Generate sequential ST number
        const { count } = await supabase.from('stock_transfers').select('id', { count: 'exact', head: true });
        const nextNo = (count || 0) + 181; // Starting from existing ST-180
        const transferNumber = `ST-${nextNo}`;

        // 2. Insert new transfer
        const { data, error } = await supabase.from('stock_transfers').insert({
            transfer_number: transferNumber,
            created_date: new Date().toISOString(),
            status: 'created',
            origin: 'Main Warehouse',
            destination: 'MMH Kelowna',
            value: 0
        }).select('id').single();

        if (error) throw error;
        return data.id;
    } catch (error) {
        console.error('Error creating stock transfer:', error);
        return null;
    }
}

export async function createStocktake(): Promise<string | null> {
    try {
        // 1. Generate sequential STK number
        const { count } = await supabase.from('stocktakes').select('id', { count: 'exact', head: true });
        const nextNo = (count || 0) + 1;
        const stocktakeNumber = `STK-${nextNo}`;

        // 2. Insert new stocktake
        const { data, error } = await supabase.from('stocktakes').insert({
            stocktake_number: stocktakeNumber,
            reason: 'General inventory count',
            location: 'Main Warehouse',
            status: 'not_started',
            created_date: new Date().toISOString()
        }).select('id').single();

        if (error) throw error;
        return data.id;
    } catch (error) {
        console.error('Error creating stocktake:', error);
        return null;
    }
}

// --- Stocktake Actions ---

// 1. Add item to stocktake
export async function addStocktakeItem(
    stocktakeId: string,
    variantId: string,
    expectedQuantity: number
) {
    const { data, error } = await supabase
        .from('stocktake_items')
        .insert({
            stocktake_id: stocktakeId,
            variant_id: variantId,
            expected_quantity: expectedQuantity,
            counted_quantity: null,
        })
        .select(`
            *,
            variant:variants(
                id, name, sku, category_id,
                internal_barcode, registered_barcode,
                supplier_item_code, in_stock,
                category:categories(name)
            )
        `)
        .single();

    if (error) throw error;

    // Map to UI format
    return {
        id: data.id,
        variant_id: data.variant_id,
        item_name: data.variant?.name || 'Unknown Item',
        category: data.variant?.category?.name || 'Uncategorized',
        internal_barcode: data.variant?.internal_barcode || '',
        registered_barcode: data.variant?.registered_barcode || '',
        supplier_item_code: data.variant?.supplier_item_code || '',
        batch_number: '',
        batch_barcode: '',
        notes: '',
        quantity_in_stock: data.expected_quantity,
        expected_quantity: data.expected_quantity,
        counted_quantity: data.counted_quantity,
    };
}

// 2. Update counted quantity
export async function updateStocktakeItemCount(
    itemId: string,
    countedQuantity: number | null
) {
    const { data, error } = await supabase
        .from('stocktake_items')
        .update({
            counted_quantity: countedQuantity,
            updated_at: new Date().toISOString()
        })
        .eq('id', itemId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// 3. Update stocktake status
export async function updateStocktakeStatus(
    stocktakeId: string,
    status: 'not_started' | 'in_progress' | 'counted' | 'completed'
) {
    const updateData: any = {
        status,
        updated_at: new Date().toISOString()
    };

    // If completing, set completed_date
    if (status === 'completed') {
        updateData.completed_date = new Date().toISOString();
    }

    const { data, error } = await supabase
        .from('stocktakes')
        .update(updateData)
        .eq('id', stocktakeId)
        .select()
        .single();

    if (error) throw error;

    // If completing, create stock adjustment
    if (status === 'completed') {
        await createAdjustmentFromStocktake(stocktakeId);
    }

    return data;
}

// 4. Delete stocktake item
export async function deleteStocktakeItem(itemId: string) {
    const { error } = await supabase
        .from('stocktake_items')
        .delete()
        .eq('id', itemId);

    if (error) throw error;
    return { success: true };
}

// 5. Create stock adjustment from completed stocktake
export async function createAdjustmentFromStocktake(stocktakeId: string) {
    // Get stocktake items with discrepancies
    const { data: items, error: itemsError } = await supabase
        .from('stocktake_items')
        .select('*')
        .eq('stocktake_id', stocktakeId)
        .not('counted_quantity', 'is', null);

    if (itemsError) throw itemsError;

    // Filter items with discrepancies (counted != expected)
    const discrepancies = items.filter(
        (item: any) => item.counted_quantity !== item.expected_quantity
    );

    if (discrepancies.length === 0) {
        // No discrepancies, no adjustment needed
        return null;
    }

    // Create adjustment
    const { data: adjustment, error: adjError } = await supabase
        .from('stock_adjustments')
        .insert({
            adjustment_number: `SA-${Date.now()}`,
            reason: `Stocktake adjustment`,
            status: 'open',
            created_at: new Date().toISOString(),
        })
        .select()
        .single();

    if (adjError) throw adjError;

    // Link adjustment to stocktake
    await supabase
        .from('stocktakes')
        .update({ stock_adjustment_id: adjustment.id })
        .eq('id', stocktakeId);

    // Add adjustment line items for each discrepancy
    const adjustmentItems = discrepancies.map((item: any) => ({
        stock_adjustment_id: adjustment.id,
        variant_id: item.variant_id,
        quantity: item.counted_quantity - item.expected_quantity, // The difference
        reason: 'Stocktake variance',
    }));

    await supabase
        .from('stock_adjustment_items')
        .insert(adjustmentItems);

    return adjustment;
}

// 6. Fetch stocktake with items
export async function fetchStocktakeWithItems(idOrNumber: string) {
    console.log('=== fetchStocktakeWithItems CALLED ===');
    console.log('Input ID/Number:', idOrNumber);
    console.log('Type:', typeof idOrNumber);

    // Check if it's a UUID
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrNumber);
    console.log('Is UUID:', isUUID);

    let query = supabase.from('stocktakes').select('*');

    if (isUUID) {
        console.log('Querying by ID...');
        query = query.eq('id', idOrNumber);
    } else {
        console.log('Querying by stocktake_number...');
        query = query.eq('stocktake_number', idOrNumber);
    }

    const { data: stocktake, error: stError } = await query.single();

    console.log('Stocktake Fetch Result:', stocktake);
    if (stError) console.error('Stocktake Fetch Error:', stError);

    if (stError) {
        console.error(`Error fetching stocktake (${idOrNumber}):`, stError);
        // Don't throw immediately, let's see if we can recover or return null to let UI handle it
        return { stocktake: null, items: [] };
    }

    if (!stocktake) {
        console.warn(`Stocktake not found for identifier: ${idOrNumber}`);
        return { stocktake: null, items: [] };
    }

    console.log(`Found stocktake: ${stocktake.stocktake_number} (ID: ${stocktake.id})`);

    const { data: items, error: itemsError } = await supabase
        .from('stocktake_items')
        .select(`
      *,
      variant:variants(
        id, sku,
        internal_barcode, registered_barcode,
        supplier_item_code,
        item:items(
          name,
          category:categories(name)
        )
      )
    `)
        .eq('stocktake_id', stocktake.id);

    if (itemsError) {
        console.error(`Error fetching items for stocktake ${stocktake.id}:`, JSON.stringify(itemsError, null, 2));
        console.error("Error message:", itemsError.message);
        console.error("Error code:", itemsError.code);
        // Return stocktake with empty items to allow page to load
        return { stocktake, items: [] };
    }

    // Map the variant data to match the UI expected format
    const mappedItems = items && items.length > 0 ? items.map((item: any) => ({
        id: item.id,
        variant_id: item.variant_id,
        item_name: item.variant?.item?.name || item.item_name || 'Unknown Item',
        category: item.variant?.item?.category?.name || item.category || 'Uncategorized',
        internal_barcode: item.variant?.internal_barcode || item.internal_barcode || '',
        registered_barcode: item.variant?.registered_barcode || item.registered_barcode || '',
        supplier_item_code: item.variant?.supplier_item_code || item.supplier_item_code || '',
        batch_number: item.batch_number || '',
        batch_barcode: item.batch_barcode || '',
        notes: item.notes || '',
        quantity_in_stock: item.expected_quantity, // Using expected as snapshot of stock
        expected_quantity: item.expected_quantity,
        counted_quantity: item.counted_quantity,
    })) : [];

    return { stocktake, items: mappedItems };
}

// 7. Fetch all variants for dropdown
export async function fetchVariantsForStocktake() {
    const { data, error } = await supabase
        .from('variants')
        .select(`
            id, sku,
            internal_barcode, registered_barcode,
            supplier_item_code,
            item:items(
                name,
                category:categories(name)
            )
        `);

    if (error) {
        console.error("Error fetching variants:", JSON.stringify(error, null, 2));
        console.error("Error message:", error.message);
        console.error("Error code:", error.code);
        return [];
    }

    return data.map((v: any) => ({
        id: v.id,
        name: v.item?.name || 'Unknown Item',
        category: v.item?.category?.name || 'Uncategorized',
        internal_barcode: v.internal_barcode || '',
        registered_barcode: v.registered_barcode || '',
        supplier_item_code: v.supplier_item_code || '',
        in_stock: 0 // Will be populated from inventory if needed later
    }));
}


