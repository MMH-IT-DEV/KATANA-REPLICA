const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function runCheck() {
    console.log('--- SYSTEM HEALTH CHECK: DATABASE ---\n');

    // 1. List all tables
    console.log('1. Checking table existence...');
    const { data: tables, error: tableError } = await supabase
        .rpc('list_tables'); // Assuming list_tables RPC exists or using information_schema directly if possible.
    // Since I cannot run raw SQL easily without an RPC, I will try to select from each table.

    if (tableError) {
        // Fallback: Manually check each critical table
        console.log('RPC list_tables not found, manual check starting...');
    }

    const criticalTables = [
        'items', 'variants', 'categories', 'recipes',
        'product_operations', 'sales_orders', 'manufacturing_orders',
        'purchase_orders', 'stock_adjustments', 'stock_transfers', 'stocktakes'
    ];

    const results = [];

    for (const table of criticalTables) {
        try {
            const { count, error } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

            if (error) {
                results.push({ table, status: 'MISSING OR ERROR', count: 0, error: error.message });
            } else {
                results.push({ table, status: 'EXISTS', count: count || 0 });
            }
        } catch (e) {
            results.push({ table, status: 'EXCEPTION', count: 0, error: e.message });
        }
    }

    console.table(results);

    console.log('\n--- DATA SUMMARY ---');
    results.forEach(r => {
        if (r.status === 'EXISTS') {
            console.log(`${r.table.padEnd(25)}: ${r.count} records`);
        } else {
            console.log(`${r.table.padEnd(25)}: NOT FOUND`);
        }
    });

    console.log('\n--- END OF CHECK ---');
}

runCheck();
