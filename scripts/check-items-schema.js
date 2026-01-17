const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log('Fetching sample item...');
    const { data: item, error: fetchError } = await supabase.from('items').select('id').limit(1).single();
    if (fetchError) {
        console.error('FETCH ERROR:', fetchError);
        return;
    }
    console.log('Found item:', item.id);

    console.log('Attempting to update variant_config...');
    const { error: updateError } = await supabase.from('items').update({
        variant_config: [JSON.stringify({ name: 'Color', values: ['Red', 'Blue'] })]
    }).eq('id', item.id);

    if (updateError) {
        console.error('UPDATE ERROR:', updateError);
        console.log('Error code:', updateError.code);
        console.log('Error details:', updateError.details);
        console.log('Error hint:', updateError.hint);
        console.log('Error message:', updateError.message);
    } else {
        console.log('UPDATE SUCCESSFUL!');
    }
}

test();
