const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in environment');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function executeChunk(chunkNum) {
    const sqlPath = path.join(__dirname, `seed_chunk_${chunkNum}.sql`);
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log(`Executing chunk ${chunkNum}...`);
    
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
        console.error(`Error in chunk ${chunkNum}:`, error);
        return false;
    }
    
    console.log(`Chunk ${chunkNum} completed successfully`);
    return true;
}

async function main() {
    for (let i = 5; i <= 7; i++) {
        const success = await executeChunk(i);
        if (!success) {
            console.error(`Failed at chunk ${i}`);
            break;
        }
    }
    
    // Verify final count
    const { data, error } = await supabase.from('items').select('id', { count: 'exact', head: true });
    if (!error) {
        console.log(`\nFinal item count: ${data?.length || 'unknown'}`);
    }
}

main().catch(console.error);













