const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testRecipe() {
    console.log('🧪 TESTING RECIPE PERSISTENCE');

    // 1. Get a product variant and a material variant
    const { data: variants, error: vError } = await supabase
        .from('variants')
        .select('id, sku')
        .limit(10);

    if (vError || !variants || variants.length < 2) {
        console.error('Need at least 2 variants', vError);
        return;
    }

    const productV = variants[0];
    const materialV = variants[1];

    console.log(`Product Variant: ${productV.id} (${productV.sku})`);
    console.log(`Material Variant: ${materialV.id} (${materialV.sku})`);

    // 2. Try to add ingredient
    console.log('Adding ingredient...');
    const { data: insertData, error: insertError } = await supabase
        .from('recipes')
        .insert({
            product_variant_id: productV.id,
            ingredient_variant_id: materialV.id,
            quantity: 5.5
        })
        .select();

    if (insertError) {
        console.error('Insert Error:', insertError);
    } else {
        console.log('✅ Insert Success:', insertData);

        // 3. Verify fetch
        console.log('Fetching recipe...');
        const { data: fetched, error: fetchError } = await supabase
            .from('recipes')
            .select('*')
            .eq('product_variant_id', productV.id);

        if (fetchError) {
            console.error('Fetch Error:', fetchError);
        } else {
            console.log('Fetched rows:', fetched.length);
            console.table(fetched);
        }

        // Cleanup if needed, but let's keep it for now to verify and then delete manually or later
        // await supabase.from('recipes').delete().eq('id', insertData[0].id);
    }
}

testRecipe();
