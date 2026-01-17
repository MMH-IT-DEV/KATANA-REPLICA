
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function clearCategories() {
    console.log('Clearing categories...');

    // 1. Unlink items from categories first to avoid FK constraint errors
    const { error: updateError } = await supabase
        .from('items')
        .update({ category_id: null })
        .not('category_id', 'is', null);

    if (updateError) {
        console.error('Error unlinking items:', updateError);
        return;
    }
    console.log('Unlinked items from categories.');

    // 2. Delete categories
    const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all (neq strict UUID zero usually works to select all if id is UUID)
    
    // Alternative: Delete where name is not null
    const { error: deleteError2 } = await supabase
        .from('categories')
        .delete()
        .not('name', 'is', null);

    if (deleteError2) {
        console.error('Error deleting categories:', deleteError2);
    } else {
        console.log('Categories cleared.');
    }
}

clearCategories();

