const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStatusValues() {
    console.log('--- STATUS VALUES ---');
    const { data, error } = await supabase
        .from('manufacturing_order_operations')
        .select('status')
        .limit(10);

    if (error) {
        console.error('Error fetching statuses:', error);
    } else {
        const statuses = [...new Set(data.map(d => d.status))];
        console.log('Available statuses:', statuses);
    }
}

checkStatusValues();
