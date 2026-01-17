const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSampleData() {
    console.log('=== Sample Data Check ===\n');

    // Get a few items
    const { data: items, error: itemsError } = await supabase
        .from('items')
        .select('*')
        .limit(3);

    console.log('Sample Items:');
    items?.forEach(item => {
        console.log(`  - ${item.name} (${item.sku}) - Type: ${item.type}`);
    });

    // Get a few categories
    const { data: categories } = await supabase
        .from('categories')
        .select('*');

    console.log('\nAll Categories:');
    categories?.forEach(cat => {
        console.log(`  - ${cat.name}`);
    });

    // Get locations
    const { data: locations } = await supabase
        .from('locations')
        .select('*');

    console.log('\nAll Locations:');
    locations?.forEach(loc => {
        console.log(`  - ${loc.name}${loc.is_default ? ' (default)' : ''}`);
    });
}

checkSampleData();
