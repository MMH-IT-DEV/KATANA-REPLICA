const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

const VALID_ID = '893598ab-31c6-4339-aaeb-cedef5b27a58';

async function testLength() {
    console.log(`--- Testing SKU length on variant ${VALID_ID} ---`);

    // Save original SKU
    const { data: original } = await supabase.from('variants').select('sku').eq('id', VALID_ID).single();
    const originalSku = original.sku;
    console.log('Original SKU:', originalSku);

    const lengthsToTest = [10, 50, 255];

    for (const len of lengthsToTest) {
        const testSku = 'S' + 'K' + 'U'.repeat(len - 2);
        console.log(`Testing length ${len}...`);
        const { data, error } = await supabase
            .from('variants')
            .update({ sku: testSku })
            .eq('id', VALID_ID)
            .select('sku')
            .single();

        if (error) {
            console.error(`FAILED at length ${len}:`, error.message);
        } else {
            console.log(`SUCCESS! Saved SKU length: ${data.sku.length}`);
            if (data.sku.length !== len) {
                console.warn(`TRUNCATION DETECTED! Expected ${len}, got ${data.sku.length}`);
            }
        }
    }

    // Restore original SKU
    await supabase.from('variants').update({ sku: originalSku }).eq('id', VALID_ID);
    console.log('Original SKU restored.');
}

testLength();
