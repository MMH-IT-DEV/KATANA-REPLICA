const { createClient } = require('@supabase/supabase-js');

// Hardcoded credentials from audit-schema.js (known working)
const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateSequentialSKU(prefix) {
    const { data } = await supabase
        .from('items')
        .select('sku')
        .like('sku', `${prefix}-%`)
        .order('sku', { ascending: false })
        .limit(1);

    let nextNum = 1;
    if (data && data.length > 0) {
        const lastSku = data[0].sku;
        const match = lastSku.match(/-(\d+)$/);
        if (match) {
            nextNum = parseInt(match[1]) + 1;
        }
    }
    return `${prefix}-${nextNum.toString().padStart(5, '0')}`;
}

async function run() {
    console.log('🧪 DEBUGGING ITEM CREATION');
    const type = 'product';
    const isProduct = true;
    const name = 'Debug Item ' + Date.now();

    // 1. Create Category if not exists
    console.log('Step 1: Checking/Creating Category...');
    let catId;
    const { data: catData, error: catError } = await supabase.from('categories').select('id').eq('name', 'Uncategorized').single();

    if (catError && catError.code !== 'PGRST116') { // PGRST116 is "Row not found" (single() returned 0 rows)
        console.error('Error fetching category:', catError);
    }

    if (catData) {
        console.log('Found category:', catData.id);
        catId = catData.id;
    } else {
        console.log('Creating "Uncategorized" category...');
        const { data: newCat, error: createCatError } = await supabase.from('categories').insert({ name: 'Uncategorized' }).select('id').single();
        if (createCatError) {
            console.error('Error creating category:', createCatError);
        } else {
            console.log('Created category:', newCat.id);
            catId = newCat.id;
        }
    }

    // 2. Generate SKU
    console.log('Step 2: Generating SKU...');
    const itemSku = await generateSequentialSKU('DEBUG');
    console.log('Generated SKU:', itemSku);

    // 3. Insert Item
    console.log('Step 3: Inserting Item...');
    const payload = {
        name: name,
        sku: itemSku,
        type: type,
        category_id: catId,
        uom: 'pcs',
        is_sellable: isProduct,
        is_purchasable: !isProduct,
        is_producible: isProduct,
        is_batch_tracked: false,
        batch_tracking_enabled: false
    };
    console.log('Payload:', payload);

    const { data: newItem, error: insertError } = await supabase.from('items').insert(payload).select('id').single();

    if (insertError) {
        console.error('❌ ERROR INSERTING ITEM:');
        console.error(JSON.stringify(insertError, null, 2));
    } else {
        console.log('✅ Item created successfully:', newItem.id);

        // Clean up
        console.log('Cleaning up...');
        await supabase.from('items').delete().eq('id', newItem.id);
    }
}

run();
