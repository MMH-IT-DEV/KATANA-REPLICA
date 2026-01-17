const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSku() {
    console.log('🧪 TESTING SKU PERSISTENCE WITH ERROR CHECKING');

    const { data: variants } = await supabase.from('variants').select('id, sku').limit(1);
    const v = variants[0];
    const testSku = 'MS-IP-4';

    console.log(`Original SKU: ${v.sku}`);
    console.log(`Setting SKU to: ${testSku}`);

    const { error } = await supabase.from('variants').update({ sku: testSku }).eq('id', v.id);
    if (error) {
        console.error('UPDATE ERROR:', error);
    } else {
        console.log('Update call successful');
    }

    const { data: updated, error: fetchError } = await supabase.from('variants').select('sku').eq('id', v.id).single();
    if (fetchError) {
        console.error('FETCH ERROR:', fetchError);
    } else {
        console.log(`Fetched SKU: ${updated.sku}`);

        if (updated.sku === testSku) {
            console.log('✅ SKU PERSISTED CORRECTLY');
        } else {
            console.log('❌ SKU DID NOT PERSIST OR WAS CHANGED BY DATABASE');
        }
    }
}

testSku();
