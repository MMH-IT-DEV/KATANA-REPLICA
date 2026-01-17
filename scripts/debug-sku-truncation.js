const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    console.log('🔍 CHECKING COLUMN TYPES FOR VARIANTS AND ITEMS');

    const { data, error } = await supabase.rpc('exec_sql', {
        query: `
            SELECT table_name, column_name, data_type, character_maximum_length 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name IN ('items', 'variants')
            AND column_name = 'sku';
        `
    });

    if (error) {
        console.error('RPC Error:', error);

        // Fallback: Test insertion of long SKU
        console.log('\nTesting direct update with long SKU...');
        const testSku = 'TEST-LONG-SKU-VALUE-123';
        const { data: variants } = await supabase.from('variants').select('id, sku').limit(1);
        if (variants && variants[0]) {
            const originalSku = variants[0].sku;
            console.log(`Original SKU: ${originalSku}`);
            const { error: updateError } = await supabase.from('variants').update({ sku: testSku }).eq('id', variants[0].id);
            if (updateError) {
                console.error('Update Error:', updateError);
            } else {
                const { data: updated } = await supabase.from('variants').select('sku').eq('id', variants[0].id).single();
                console.log(`Updated SKU: ${updated.sku}`);
                if (updated.sku === testSku) {
                    console.log('✅ SKU column supports long values.');
                } else if (updated.sku === testSku.substring(0, updated.sku.length)) {
                    console.log(`❌ SKU TRUNCATED to ${updated.sku.length} characters.`);
                }
                // Restore
                await supabase.from('variants').update({ sku: originalSku }).eq('id', variants[0].id);
            }
        }
    } else {
        console.table(data);
    }
}

checkSchema();
