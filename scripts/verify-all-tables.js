const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllTables() {
    const tables = [
        'items',
        'variants',
        'inventory',
        'recipes',
        'suppliers',
        'customers',
        'categories',
        'locations',
        'tax_rates',
        'sales_orders',
        'sales_order_rows',
        'purchase_orders',
        'purchase_order_rows',
        'manufacturing_orders',
        'batches'
    ];

    console.log('=== Complete Database Status ===\n');
    
    for (const table of tables) {
        try {
            const { count, error } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });
            
            if (error) {
                console.log(`${table.padEnd(25)} ERROR: ${error.message}`);
            } else {
                console.log(`${table.padEnd(25)} ${count || 0} rows`);
            }
        } catch (err) {
            console.log(`${table.padEnd(25)} ERROR: ${err.message}`);
        }
    }
}

checkAllTables();
