const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function audit() {
    const tables = ['manufacturing_order_rows', 'manufacturing_order_operations'];

    for (const table of tables) {
        console.log(`\n--- ${table.toUpperCase()} TABLE (First Row Keys) ---`);
        const { data, error } = await supabase.from(table).select('*').limit(1);

        if (error) {
            console.error(`Error fetching ${table}:`, error);
        } else if (data && data.length > 0) {
            console.log(Object.keys(data[0]));
        } else {
            console.log('No rows found in table.');
        }
    }
}

audit();
