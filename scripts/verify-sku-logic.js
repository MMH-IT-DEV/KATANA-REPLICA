const { createClient } = require('@supabase/supabase-js');

// Hardcoded credentials from audit-schema.js (known working)
const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateSequentialSKU(prefix) {
    console.log(`\n--- Generating SKU for prefix: ${prefix} ---`);
    const { data, error } = await supabase
        .from('items')
        .select('sku')
        .like('sku', `${prefix}-%`)
        .order('sku', { ascending: false })
        .limit(1);

    if (error) {
        console.error('Error fetching items:', error);
        return;
    }

    console.log('Most recent SKU found:', data && data.length > 0 ? data[0].sku : 'None');

    let nextNum = 1;
    if (data && data.length > 0) {
        const lastSku = data[0].sku;
        const match = lastSku.match(/-(\d+)$/);
        if (match) {
            nextNum = parseInt(match[1]) + 1;
        }
    }

    const newSku = `${prefix}-${nextNum.toString().padStart(5, '0')}`;
    console.log(`Generated SKU: ${newSku}`);
    return newSku;
}

async function run() {
    console.log('🧪 VERIFYING SKU GENERATION LOGIC');

    // Test for Product
    await generateSequentialSKU('PROD');

    // Test for Material
    await generateSequentialSKU('MAT');
}

run();
