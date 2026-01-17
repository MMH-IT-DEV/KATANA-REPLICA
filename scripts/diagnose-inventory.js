const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnoseInventoryIssue() {
    console.log('🔍 Diagnosing Inventory Data Fetching Issue\n');
    console.log('='.repeat(60));

    // Test 1: Variants table
    console.log('\n=== TEST 1: Variants Table (Direct Query) ===');
    const { data: variants, error: variantsError, count: variantsCount } = await supabase
        .from('variants')
        .select('*', { count: 'exact' })
        .limit(5);

    if (variantsError) {
        console.log(`❌ Error querying variants: ${variantsError.message}`);
        console.log(`   Code: ${variantsError.code}`);
        console.log(`   Details: ${variantsError.details}`);
        console.log(`   Hint: ${variantsError.hint}`);
    } else {
        console.log(`✅ Successfully queried variants`);
        console.log(`   Total count: ${variantsCount}`);
        console.log(`   Sample data (${variants.length} rows):`);
        variants.forEach(v => {
            console.log(`   - ${v.sku} | Price: $${v.sales_price || 'N/A'}`);
        });
    }

    // Test 2: Inventory table
    console.log('\n=== TEST 2: Inventory Table (Direct Query) ===');
    const { data: inventory, error: inventoryError, count: inventoryCount } = await supabase
        .from('inventory')
        .select('*', { count: 'exact' })
        .limit(5);

    if (inventoryError) {
        console.log(`❌ Error querying inventory: ${inventoryError.message}`);
        console.log(`   Code: ${inventoryError.code}`);
        console.log(`   Details: ${inventoryError.details}`);
        console.log(`   Hint: ${inventoryError.hint}`);
    } else {
        console.log(`✅ Successfully queried inventory`);
        console.log(`   Total count: ${inventoryCount}`);
        console.log(`   Sample data (${inventory.length} rows):`);
        inventory.forEach(inv => {
            console.log(`   - Variant ID: ${inv.variant_id?.substring(0, 8)}... | Stock: ${inv.quantity_in_stock}`);
        });
    }

    // Test 3: Items table
    console.log('\n=== TEST 3: Items Table (Direct Query) ===');
    const { data: items, error: itemsError, count: itemsCount } = await supabase
        .from('items')
        .select('*', { count: 'exact' })
        .limit(5);

    if (itemsError) {
        console.log(`❌ Error querying items: ${itemsError.message}`);
    } else {
        console.log(`✅ Successfully queried items`);
        console.log(`   Total count: ${itemsCount}`);
        console.log(`   Sample data (${items.length} rows):`);
        items.forEach(item => {
            console.log(`   - ${item.name} (${item.sku}) | Type: ${item.type}`);
        });
    }

    // Test 4: Complex join query (what the UI probably uses)
    console.log('\n=== TEST 4: Complex Join Query (UI Simulation) ===');
    const { data: joinData, error: joinError } = await supabase
        .from('variants')
        .select(`
            id,
            sku,
            sales_price,
            items (
                id,
                name,
                type,
                category_id
            ),
            inventory (
                quantity_in_stock,
                location_id
            )
        `)
        .limit(5);

    if (joinError) {
        console.log(`❌ Error with join query: ${joinError.message}`);
        console.log(`   Code: ${joinError.code}`);
        console.log(`   Details: ${joinError.details}`);
    } else {
        console.log(`✅ Join query successful`);
        console.log(`   Returned ${joinData.length} rows`);
        joinData.forEach(row => {
            console.log(`   - ${row.items?.name || 'N/A'} (${row.sku})`);
            console.log(`     Inventory records: ${row.inventory?.length || 0}`);
        });
    }

    // Test 5: Check RLS policies via REST API
    console.log('\n=== TEST 5: Checking RLS Policies ===');
    console.log('Note: Using anon key, subject to RLS policies');
    console.log(`Current role: anon (from JWT)`);

    // Test 6: What the actual frontend code does
    console.log('\n=== TEST 6: Simulating Frontend getKatanaInventory() ===');
    try {
        // This should match what's in katana-data-provider.ts
        const { data: katanaInventory, error: katanaError } = await supabase
            .from('variants')
            .select(`
                *,
                items!inner(*),
                inventory(*)
            `);

        if (katanaError) {
            console.log(`❌ Error: ${katanaError.message}`);
            console.log(`   This is likely why the UI shows empty!`);
            console.log(`   Code: ${katanaError.code}`);
            console.log(`   Hint: ${katanaError.hint}`);
        } else {
            console.log(`✅ Query successful`);
            console.log(`   Returned ${katanaInventory?.length || 0} rows`);
            if (katanaInventory && katanaInventory.length > 0) {
                console.log(`   First item: ${katanaInventory[0].items?.name}`);
            }
        }
    } catch (err) {
        console.log(`❌ Exception: ${err.message}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('🔍 Diagnosis Complete\n');
}

diagnoseInventoryIssue();
