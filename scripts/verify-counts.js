const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCounts() {
    const { count: items } = await supabase.from('items').select('*', { count: 'exact', head: true });
    const { count: variants } = await supabase.from('variants').select('*', { count: 'exact', head: true });
    const { count: inventory } = await supabase.from('inventory').select('*', { count: 'exact', head: true });

    console.log('=== Database Counts ===');
    console.log(`Items: ${items}`);
    console.log(`Variants: ${variants}`);
    console.log(`Inventory Records: ${inventory}`);
}

checkCounts();












