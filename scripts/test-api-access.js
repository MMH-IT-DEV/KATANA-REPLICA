const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testAPIAccess() {
    console.log('🔍 Testing Supabase REST API Access\n');
    console.log('='.repeat(60));

    // Test each table individually
    const tables = ['items', 'variants', 'inventory', 'categories', 'suppliers', 'locations'];

    for (const table of tables) {
        console.log(`\n=== Testing: ${table} ===`);

        try {
            const { data, error, count } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

            if (error) {
                console.log(`❌ ERROR: ${error.message}`);
                console.log(`   Code: ${error.code}`);
                console.log(`   Details: ${error.details}`);
                console.log(`   Hint: ${error.hint}`);
            } else {
                console.log(`✅ SUCCESS - Row count: ${count}`);
            }
        } catch (err) {
            console.log(`❌ EXCEPTION: ${err.message}`);
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n🔍 Testing Complex Join Query\n');

    try {
        const { data, error } = await supabase
            .from('inventory')
            .select('*, variants(*), locations(*)')
            .limit(1);

        if (error) {
            console.log(`❌ ERROR: ${error.message}`);
            console.log(`   Code: ${error.code}`);
        } else {
            console.log(`✅ Join query successful - returned ${data?.length || 0} rows`);
        }
    } catch (err) {
        console.log(`❌ EXCEPTION: ${err.message}`);
    }
}

testAPIAccess();
