const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Hardcoded credentials from src/lib/supabaseClient.ts
const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

const dataPath = path.join(__dirname, '../src/lib/katana-imported-data.json');
const allData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Start from index 0 (Process ALL items to ensure completeness)
const START_INDEX = 0;
const dataToProcess = allData.slice(START_INDEX);

console.log(`Loaded ${allData.length} items. Processing ${dataToProcess.length} items starting from index ${START_INDEX}.`);

async function getOrCreateDefaultLocation() {
    const { data: locations } = await supabase.from('locations').select('id').limit(1);
    if (locations && locations.length > 0) {
        return locations[0].id;
    }
    
    // Create default if none
    const { data: newLoc, error } = await supabase.from('locations').insert({
        name: 'Main Location',
        is_default: true
    }).select().single();
    
    if (error) throw new Error(`Failed to create location: ${error.message}`);
    return newLoc.id;
}

async function getOrCreateSupplier(name) {
    if (!name || name === '-') return null;
    
    // Check existing
    const { data: existing } = await supabase.from('suppliers').select('id').eq('name', name).single();
    if (existing) return existing.id;
    
    // Create new
    const { data: newSup, error } = await supabase.from('suppliers').insert({ name }).select().single();
    if (error) {
        // Handle race condition
        const { data: retry } = await supabase.from('suppliers').select('id').eq('name', name).single();
        if (retry) return retry.id;
        console.warn(`Warning: Could not create supplier ${name}: ${error.message}`);
        return null;
    }
    return newSup.id;
}

async function getOrCreateCategory(name) {
    if (!name || name === 'Uncategorized') return null;

    // Check existing
    const { data: existing } = await supabase.from('categories').select('id').eq('name', name).single();
    if (existing) return existing.id;
    
    // Create new
    const { data: newCat, error } = await supabase.from('categories').insert({ name }).select().single();
    if (error) {
        const { data: retry } = await supabase.from('categories').select('id').eq('name', name).single();
        if (retry) return retry.id;
        console.warn(`Warning: Could not create category ${name}: ${error.message}`);
        return null;
    }
    return newCat.id;
}

async function processItem(item, locationId) {
    try {
        // 1. Prepare dependencies
        const supplierId = await getOrCreateSupplier(item.supplier);
        const categoryId = await getOrCreateCategory(item.category);
        
        // 2. Upsert Item
        // Use SKU as unique key if valid, else fall back to ID logic (but we need a unique SKU for DB constraint)
        let sku = item.sku && item.sku !== '-' ? item.sku : `GEN-${item.id}`;
        
        const itemData = {
            name: item.name,
            sku: sku,
            type: (item.type || 'Material').toLowerCase() === 'product' ? 'product' : 'material',
            uom: item.uom || 'pcs',
            category_id: categoryId,
            default_supplier_id: supplierId,
            is_sellable: (item.type || '').toLowerCase() === 'product',
            is_purchasable: (item.type || '').toLowerCase() !== 'product',
            default_purchase_price: item.avgCost || 0
        };

        const { data: savedItem, error: itemError } = await supabase
            .from('items')
            .upsert(itemData, { onConflict: 'sku' })
            .select('id')
            .single();

        if (itemError) throw new Error(`Item Upsert Error: ${itemError.message}`);

        // 3. Upsert Variant
        const variantData = {
            item_id: savedItem.id,
            sku: sku, // Simple 1:1 variant for now
            purchase_price: item.avgCost || 0,
            sales_price: 0 // Default
        };

        const { data: savedVariant, error: variantError } = await supabase
            .from('variants')
            .upsert(variantData, { onConflict: 'sku' })
            .select('id')
            .single();

        if (variantError) throw new Error(`Variant Upsert Error: ${variantError.message}`);

        // 4. Upsert Inventory
        const inventoryData = {
            variant_id: savedVariant.id,
            location_id: locationId,
            quantity_in_stock: item.inStock || 0,
            quantity_committed: item.committed || 0,
            quantity_expected: item.expected || 0,
            reorder_point: item.safetyStock || 0,
            average_cost: item.avgCost || 0
        };

        const { error: invError } = await supabase
            .from('inventory')
            .upsert(inventoryData, { onConflict: 'variant_id,location_id' });

        if (invError) throw new Error(`Inventory Upsert Error: ${invError.message}`);

        return true;
    } catch (err) {
        console.error(`❌ Error processing ${item.name} (${item.sku}):`, err.message);
        return false;
    }
}

async function main() {
    try {
        console.log('🌍 Fetching location...');
        const locationId = await getOrCreateDefaultLocation();
        console.log(`📍 Using Location ID: ${locationId}`);

        let success = 0;
        let fail = 0;

        // Process in batches of 5 to avoid rate limits
        for (let i = 0; i < dataToProcess.length; i += 5) {
            const chunk = dataToProcess.slice(i, i + 5);
            const promises = chunk.map(item => processItem(item, locationId));
            const results = await Promise.all(promises);
            
            success += results.filter(r => r).length;
            fail += results.filter(r => !r).length;
            
            process.stdout.write(`\rProgress: ${i + chunk.length}/${dataToProcess.length} (✅ ${success} ❌ ${fail})`);
        }

        console.log('\n\n🎉 Seeding Complete!');
        console.log(`Total Processed: ${dataToProcess.length}`);
        console.log(`Successful: ${success}`);
        console.log(`Failed: ${fail}`);

    } catch (err) {
        console.error('Fatal Error:', err);
    }
}

main();
