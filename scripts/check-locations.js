const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLocations() {
    const { data: locations } = await supabase.from('locations').select('*');
    console.log('=== Locations ===');
    console.table(locations);
    
    // Check inventory distribution
    const { data: inventory } = await supabase.from('inventory').select('location_id, count(*)');
    // Note: count(*) isn't directly supported in select without grouping, but let's just list counts per location
    
    // Simple group by
    const { data: allInv } = await supabase.from('inventory').select('location_id');
    const counts = {};
    allInv.forEach(i => {
        counts[i.location_id] = (counts[i.location_id] || 0) + 1;
    });
    console.log('\n=== Inventory per Location ===');
    console.log(counts);
}

checkLocations();












