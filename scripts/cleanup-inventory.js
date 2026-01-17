const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanup() {
    console.log('🧹 Cleaning up orphaned inventory records (location_id IS NULL)...');
    
    const { data, error } = await supabase
        .from('inventory')
        .delete()
        .is('location_id', null)
        .select();
        
    if (error) {
        console.error('❌ Error deleting records:', error.message);
    } else {
        console.log(`✅ Deleted ${data.length} orphaned records.`);
    }
}

cleanup();












