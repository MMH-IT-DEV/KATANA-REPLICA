const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
    console.log('Checking settings table...');
    const { data: settingsData, error: settingsError } = await supabase.from('settings').select('id').limit(1);
    if (settingsError) {
        console.log('Settings table does not exist or error:', settingsError.message);
    } else {
        console.log('Settings table exists.');
    }

    console.log('Checking units_of_measure table...');
    const { data: unitsData, error: unitsError } = await supabase.from('units_of_measure').select('id').limit(1);
    if (unitsError) {
        console.log('Units table does not exist or error:', unitsError.message);
    } else {
        console.log('Units table exists.');
    }
}

checkTables();
