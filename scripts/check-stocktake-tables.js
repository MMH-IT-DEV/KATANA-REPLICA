import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
    const tables = ['stocktakes', 'stocktake_items', 'stock_adjustments', 'stock_adjustment_items'];
    console.log('Checking tables...');

    for (const table of tables) {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .limit(1);

        if (error) {
            // If error code is '42P01' (undefined_table) it means table doesn't exist
            // But supabase-js might return a different error structure
            if (error.code === '42P01' || error.message.includes('does not exist')) {
                console.log(`❌ Table '${table}' DOES NOT exist.`);
            } else {
                console.log(`❓ Error checking '${table}':`, error.message);
            }
        } else {
            console.log(`✅ Table '${table}' exists.`);
        }
    }
}

checkTables();
