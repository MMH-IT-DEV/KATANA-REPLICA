
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function diagnose() {
    console.log('--- DIAGNOSING STOCKTAKE SCHEMA ---');

    const tablesToCheck = ['stocktakes', 'stocktake_items', 'variants', 'categories', 'items'];

    for (const table of tablesToCheck) {
        console.log(`\nChecking table: ${table}`);
        const { data, error } = await supabase.from(table).select('*').limit(1);

        if (error) {
            console.log(`❌ Error: ${error.message} (Code: ${error.code})`);
            if (error.code === '42P01') {
                console.log(`   Table '${table}' does not exist.`);
            }
        } else {
            console.log(`✅ Table '${table}' exists.`);
            if (data && data.length > 0) {
                console.log(`   Columns: ${Object.keys(data[0]).join(', ')}`);
            } else {
                console.log(`   Table is empty, cannot determine columns from select * limit 1.`);
            }
        }
    }

    // Specifically check columns for the failing queries
    console.log('\n--- DETAILED COLUMN CHECKS ---');

    // Check variants specifically
    const { data: variantsData, error: vError } = await supabase.from('variants').select('id, sku').limit(1);
    if (!vError && variantsData) {
        console.log('Variants columns (confirmed): id, sku, ...');
    }

    console.log('\n--- END DIAGNOSIS ---');
}

diagnose();
