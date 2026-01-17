const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testRPC() {
    const sql = `ALTER TABLE items ADD COLUMN IF NOT EXISTS variant_config JSONB;`;
    console.log('Attempting to run SQL via RPC exec_sql...');
    const { data, error } = await supabase.rpc('exec_sql', { query: sql });

    if (error) {
        console.error('RPC ERROR:', error);
    } else {
        console.log('RPC SUCCESSFUL!', data);
    }
}

testRPC();
