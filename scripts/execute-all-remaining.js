const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials!');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// List of remaining mini-batches
const batches = [
    'seed_chunk_5_2.sql',
    'seed_chunk_5_3.sql',
    'seed_chunk_5_4.sql',
    'seed_chunk_5_5.sql',
    'seed_chunk_6_1.sql',
    'seed_chunk_6_2.sql',
    'seed_chunk_6_3.sql',
    'seed_chunk_6_4.sql',
    'seed_chunk_6_5.sql',
    'seed_chunk_7_1.sql'
];

async function executeBatch(batchFile) {
    const filePath = path.join(__dirname, batchFile);
    const sql = fs.readFileSync(filePath, 'utf8');
    
    console.log(`Executing ${batchFile}...`);
    
    try {
        const { data, error } = await supabase.rpc('exec_sql', { query: sql });
        
        if (error) {
            console.error(`  ❌ Error: ${error.message}`);
            return false;
        }
        
        console.log(`  ✅ Success!`);
        return true;
    } catch (err) {
        console.error(`  ❌ Exception: ${err.message}`);
        return false;
    }
}

async function main() {
    console.log('Starting batch execution...\n');
    
    let successCount = 0;
    let failCount = 0;
    
    for (const batch of batches) {
        const success = await executeBatch(batch);
        if (success) {
            successCount++;
        } else {
            failCount++;
        }
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log(`\n=== Summary ===`);
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`Total: ${batches.length}`);
    
    // Check final counts
    console.log('\n=== Checking database counts ===');
    const { data: itemCount } = await supabase.from('items').select('*', { count: 'exact', head: true });
    const { data: variantCount } = await supabase.from('variants').select('*', { count: 'exact', head: true });
    const { data: invCount } = await supabase.from('inventory').select('*', { count: 'exact', head: true });
    
    console.log(`Items: ${itemCount?.length || 'unknown'}`);
    console.log(`Variants: ${variantCount?.length || 'unknown'}`);
    console.log(`Inventory: ${invCount?.length || 'unknown'}`);
}

main().catch(console.error);













