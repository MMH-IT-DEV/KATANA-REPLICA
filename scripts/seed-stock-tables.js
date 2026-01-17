const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedStock() {
    console.log('Seeding stock_adjustments...');
    const { data: adjData, error: adjError } = await supabase
        .from('stock_adjustments')
        .insert([
            { adjustment_number: 'SA-712', location: 'Storage Warehouse', reason: 'WITCH HAZEL TRANSFER', value: -434.68, status: 'done' },
            { adjustment_number: 'SA-711', location: 'MMH Kelowna', reason: 'RETURN - HB', value: 297.37, status: 'done' }
        ])
        .select();

    if (adjError) console.error('Error seeding adjustments:', adjError);
    else console.log('Successfully seeded adjustments.');

    console.log('Seeding stock_transfers...');
    const { error: transError } = await supabase
        .from('stock_transfers')
        .insert([
            { transfer_number: 'ST-178', origin: 'Storage Warehouse', destination: 'MMH Kelowna', value: 1640.53, status: 'created' },
            { transfer_number: 'ST-177', origin: 'MMH Kelowna', destination: 'Amazon USA', value: 850.00, status: 'in_transit' }
        ]);

    if (transError) console.error('Error seeding transfers:', transError);
    else console.log('Successfully seeded transfers.');

    console.log('Seeding stocktakes...');
    if (adjData && adjData.length > 0) {
        const { error: takeError } = await supabase
            .from('stocktakes')
            .insert([
                { stocktake_number: 'STK-044', reason: 'Finished Goods Count', location: 'MMH Kelowna', status: 'not_started' },
                { stocktake_number: 'STK-043', reason: 'jars', location: 'Storage Warehouse', status: 'completed', completed_date: new Date().toISOString(), stock_adjustment_id: adjData[0].id }
            ]);

        if (takeError) console.error('Error seeding stocktakes:', takeError);
        else console.log('Successfully seeded stocktakes.');
    }
}

seedStock();
