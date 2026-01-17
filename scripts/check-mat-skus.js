const { createClient } = require('@supabase/supabase-js');

// Hardcoded credentials from audit-schema.js
const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSkus() {
    console.log('🔍 CHECKING MAT SKUS');

    // Get top 10 MAT SKUs
    const { data, error } = await supabase
        .from('items')
        .select('sku, created_at')
        .like('sku', 'MAT-%')
        .order('sku', { ascending: false })
        .limit(10);

    if (error) {
        console.error('Error:', error);
    } else {
        console.table(data);
    }
}

checkSkus();
