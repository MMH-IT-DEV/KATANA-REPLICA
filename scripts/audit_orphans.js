
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkOrphans() {
    console.log('--- CHECKING ORPHANED RECORDS ---');

    // 1. Manufacturing Order Rows
    const { count: countRows, error: errorRows } = await supabase.from('manufacturing_order_rows').select('*', { count: 'exact', head: true });
    const { count: countOrders, error: errorOrders } = await supabase.from('manufacturing_orders').select('*', { count: 'exact', head: true });

    if (errorRows || errorOrders) {
        console.error("Error fetching counts:", errorRows, errorOrders);
        return;
    }

    console.log(`Manufacturing Order Rows: ${countRows}`);
    console.log(`Manufacturing Orders: ${countOrders}`);

    if (countRows < 10000 && countOrders < 10000) {
        // Fetch all IDs
        const { data: rows } = await supabase.from('manufacturing_order_rows').select('id, manufacturing_order_id');
        const { data: orders } = await supabase.from('manufacturing_orders').select('id');

        const orderIds = new Set(orders.map(o => o.id));
        const orphans = rows.filter(r => !orderIds.has(r.manufacturing_order_id));

        console.log(`Found ${orphans.length} orphaned manufacturing_order_rows.`);
        if (orphans.length > 0) {
            console.log('Orphan IDs:', orphans.map(o => o.id));
        }
    } else {
        console.log("Skipping JS-based orphan check for MOs due to large dataset.");
    }

    // 2. Stocktake Items
    // Check if table exists first (it failed in diagnose script if valid?)
    // diagnose script said "Checking table: stocktake_items".

    const { count: countStItems, error: errorStItems } = await supabase.from('stocktake_items').select('*', { count: 'exact', head: true });
    const { count: countStocktakes, error: errorStocktakes } = await supabase.from('stocktakes').select('*', { count: 'exact', head: true });

    if (!errorStItems && !errorStocktakes) {
        console.log(`Stocktake Items: ${countStItems}`);
        console.log(`Stocktakes: ${countStocktakes}`);

        if (countStItems < 10000 && countStocktakes < 10000) {
            const { data: items } = await supabase.from('stocktake_items').select('id, stocktake_id');
            const { data: stocktakes } = await supabase.from('stocktakes').select('id');

            const stIds = new Set(stocktakes.map(s => s.id));
            const stOrphans = items.filter(i => !stIds.has(i.stocktake_id));

            console.log(`Found ${stOrphans.length} orphaned stocktake_items.`);
            if (stOrphans.length > 0) {
                console.log('Orphan IDs:', stOrphans.map(o => o.id));
            }
        }
    } else {
        console.log("Could not check stocktake items (maybe tables don't exist)");
    }
}

checkOrphans();
