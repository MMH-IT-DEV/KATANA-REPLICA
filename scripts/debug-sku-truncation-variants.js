const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkVariantsSku() {
    console.log('🔍 CHECKING SKU COLUMN FOR VARIANTS TABLE');

    const testSku = 'VARIANT-LONG-SKU-VALUE-1234567890';
    const { data: variants } = await supabase.from('variants').select('id, sku').limit(1);

    if (variants && variants[0]) {
        const variant = variants[0];
        console.log(`Original Variant SKU: ${variant.sku}`);
        const { error: updateError } = await supabase.from('variants').update({ sku: testSku }).eq('id', variant.id);

        if (updateError) {
            console.error('Update Error:', updateError);
        } else {
            const { data: updated } = await supabase.from('variants').select('sku').eq('id', variant.id).single();
            console.log(`Updated Variant SKU: ${updated.sku}`);
            if (updated.sku === testSku) {
                console.log('✅ Variants SKU column supports long values.');
            } else {
                console.log(`❌ Variants SKU TRUNCATED to ${updated.sku.length} chars: ${updated.sku}`);
            }
            // Restore
            await supabase.from('variants').update({ sku: variant.sku }).eq('id', variant.id);
        }
    } else {
        console.log('No variants found to test.');
    }
}

checkVariantsSku();
