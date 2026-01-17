
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    console.log('Cleaning up categories...');
    
    // 1. Unlink
    const { error: unlinkError } = await supabase.from('items').update({ category_id: null }).neq('id', '00000000-0000-0000-0000-000000000000');
    if (unlinkError) console.error('Unlink Error:', unlinkError);
    else console.log('Items unlinked.');

    // 2. Delete Categories
    // Note: RLS might block this if not authenticated as admin, but Anon usually has rights in this dev setup.
    // If it fails, we might need to loop or use a different approach.
    const { error: deleteError } = await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteError) console.error('Delete Error:', deleteError);
    else console.log('Categories deleted.');

    console.log('Please run supabase/migrations/0006_fix_categories.sql in your Supabase SQL Editor to enforce uniqueness constraints permanently.');
}

run();
