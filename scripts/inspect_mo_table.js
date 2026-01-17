/* eslint-disable @typescript-eslint/no-var-requires */
const { createClient } = require('@supabase/supabase-js');

// Hardcoded from src/lib/supabaseClient.ts
const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
    console.log("Inspecting manufacturing_orders table...\n");

    // Get a sample row to see what columns exist
    console.log("[Query] Fetching sample manufacturing order...");
    const { data: sample, error: sampleError } = await supabase
        .from('manufacturing_orders')
        .select('*')
        .limit(1);

    if (sampleError) {
        console.log("Error fetching sample:", sampleError.message);
    } else if (sample && sample.length > 0) {
        console.log("\n=== MANUFACTURING_ORDERS COLUMNS ===");
        console.log("Columns found:", Object.keys(sample[0]).join(', '));
        console.log("\n=== SAMPLE DATA ===");
        console.table(sample);

        // Check specifically for product-related columns
        const productColumns = Object.keys(sample[0]).filter(key =>
            key.toLowerCase().includes('product') || key.toLowerCase().includes('item')
        );
        console.log("\n=== PRODUCT-RELATED COLUMNS ===");
        console.log(productColumns.join(', ') || 'None found');
    } else {
        console.log("No manufacturing orders found in table.");
    }
}

run();
