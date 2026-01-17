/* eslint-disable @typescript-eslint/no-var-requires */
const { createClient } = require('@supabase/supabase-js');

// Hardcoded from src/lib/supabaseClient.ts
const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
    console.log("Starting investigation...");

    // Query 1: Info Schema (Attempt)
    // This will check if we can access information_schema to verify required columns
    console.log("\n[Query 1] Checking Table Structure...");
    const { data: cols, error: colError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable, column_default')
        .eq('table_name', 'items');

    if (colError) {
        console.log("Could not query information_schema (likely RLS restricted):", colError.message);
    } else if (cols && cols.length > 0) {
        console.log("Columns found via Schema:");
        console.table(cols);
    } else {
        console.log("No columns found in information_schema for 'items' (Schema might be private).");
    }

    // Query 2: Item Types
    console.log("\n[Query 2] Checking Item Types...");
    const { data: items, error: itemsError } = await supabase
        .from('items')
        .select('item_type');

    if (itemsError) {
        console.log("Error fetching items:", itemsError.message);
    } else {
        const counts = {};
        items.forEach(i => {
            counts[i.item_type] = (counts[i.item_type] || 0) + 1;
        });
        console.log("Item Type Counts:");
        console.table(counts);
    }

    // Query 3: Sample Items
    console.log("\n[Query 3] Sample Items (Limit 10)...");
    const { data: samples, error: sampleError } = await supabase
        .from('items')
        .select('*')
        .limit(10);

    if (samples) {
        if (samples.length > 0) {
            console.log("\nFound Keys in Data:", Object.keys(samples[0]).join(', '));
            console.table(samples);
        } else {
            console.log("No items found in table.");
        }
    } else {
        console.log("Error fetching samples:", sampleError?.message);
    }
}

run();
