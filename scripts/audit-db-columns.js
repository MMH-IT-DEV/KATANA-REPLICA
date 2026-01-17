const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function audit() {
    console.log('--- ITEMS TABLE ---');
    const { data: itemsSchema, error: itemsError } = await supabase.rpc('exec_sql', {
        query: "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'items' ORDER BY ordinal_position"
    });

    if (itemsError) {
        console.error('Error fetching items schema:', itemsError);
    } else {
        console.table(itemsSchema);
    }

    console.log('\n--- VARIANTS TABLE ---');
    const { data: variantsSchema, error: variantsError } = await supabase.rpc('exec_sql', {
        query: "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'variants' ORDER BY ordinal_position"
    });

    if (variantsError) {
        console.error('Error fetching variants schema:', variantsError);
    } else {
        console.table(variantsSchema);
    }
}

audit();
