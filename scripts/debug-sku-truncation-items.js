const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    console.log('🔍 CHECKING SKU COLUMN FOR ITEMS TABLE');

    const testSku = 'ITEM-LONG-SKU-VALUE-123';
    const { data: items } = await supabase.from('items').select('id, sku').limit(1);

    if (items && items[0]) {
        const item = items[0];
        console.log(`Original Item SKU: ${item.sku}`);
        const { error: updateError } = await supabase.from('items').update({ sku: testSku }).eq('id', item.id);

        if (updateError) {
            console.error('Update Error:', updateError);
        } else {
            const { data: updated } = await supabase.from('items').select('sku').eq('id', item.id).single();
            console.log(`Updated Item SKU: ${updated.sku}`);
            if (updated.sku === testSku) {
                console.log('✅ Items SKU column supports long values.');
            } else {
                console.log(`❌ Items SKU TRUNCATED to ${updated.sku.length} chars: ${updated.sku}`);
            }
            // Restore
            await supabase.from('items').update({ sku: item.sku }).eq('id', item.id);
        }
    }
}

checkSchema();
