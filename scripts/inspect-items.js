const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectTable() {
    // We can't query information_schema directly via Supabase client usually unless enabled.
    // But we can try an RPC or just a raw query if we have the postgres connection.
    // Since we don't, we can try to guess or use a tool if available.
    // Instead, I'll try to find a column that might be used for config.

    const { data, error } = await supabase.from('items').select('*').limit(1);
    console.log('Columns found:', Object.keys(data[0]));
}

inspectTable();
