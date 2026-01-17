
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fetchStocktakeWithItems(idOrNumber) {
    console.log('=== fetchStocktakeWithItems CALLED ===');
    console.log('Input ID/Number:', idOrNumber);

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

    if (stError) return;

    // Fetch Items
    const { data: items, error: itemsError } = await supabase
        .from('stocktake_items')
        .select(`
      *,
      variant:variants(
        id, name, sku, category_id,
        internal_barcode, registered_barcode,
        supplier_item_code, in_stock,
        category:categories(name)
      )
    `)
        .eq('stocktake_id', stocktake.id);

    console.log('Items found:', items?.length);
    if (itemsError) console.error('Items error:', itemsError);
}

// Test with invalid ID, valid ID if known, and random STK number
async function run() {
    // 1. List all stocktakes
    const { data: allStocktakes } = await supabase.from('stocktakes').select('id, stocktake_number').limit(5);
    console.log('Available Stocktakes:', allStocktakes);

    if (allStocktakes && allStocktakes.length > 0) {
        // Test with UUID
        await fetchStocktakeWithItems(allStocktakes[0].id);
        // Test with Number
        await fetchStocktakeWithItems(allStocktakes[0].stocktake_number);
    } else {
        console.log('No stocktakes found in DB to test with.');
    }
}

run();
