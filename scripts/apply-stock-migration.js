const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function applyMigration() {
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '0009_stock_tables.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('Applying stock tables migration...');
    const { data, error } = await supabase.rpc('exec_sql', { query: sql });

    if (error) {
        console.error('MIGRATION ERROR:', error);
    } else {
        console.log('MIGRATION SUCCESSFUL!');
    }
}

applyMigration();
