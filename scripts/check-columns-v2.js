const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('--- ITEMS ---');
    const { data: item } = await supabase.from('items').select('*').limit(1).single();
    if (item) console.log(Object.keys(item).sort());

    console.log('\n--- VARIANTS ---');
    const { data: variant } = await supabase.from('variants').select('*').limit(1).single();
    if (variant) console.log(Object.keys(variant).sort());
}

check();
