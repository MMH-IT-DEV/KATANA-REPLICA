const { Client } = require('pg');

// Try with AWS pooler endpoint (port 6543 for connection pooling)
const connectionConfig = {
    host: 'aws-0-us-east-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.foggedeapevnksvhcrgp',
    password: 'Nicareplus1!',
    ssl: { rejectUnauthorized: false }
};

async function testDirectConnection() {
    const client = new Client(connectionConfig);

    try {
        console.log('🔌 Connecting to Supabase PostgreSQL (Pooler)...\n');
        await client.connect();
        console.log('✅ Connection successful!\n');

        // Test 1: Check variants table
        console.log('=== TEST 1: Variants Table ===');
        const variantsCount = await client.query('SELECT COUNT(*) FROM variants');
        console.log(`Total variants: ${variantsCount.rows[0].count}`);

        const variantsSample = await client.query('SELECT id, item_id, sku, sales_price FROM variants LIMIT 5');
        console.log('\nSample variants:');
        variantsSample.rows.forEach(v => {
            console.log(`  - ${v.sku} | Price: $${v.sales_price || 'N/A'} | ID: ${v.id.substring(0, 8)}...`);
        });

        // Test 2: Check inventory table
        console.log('\n=== TEST 2: Inventory Table ===');
        const inventoryCount = await client.query('SELECT COUNT(*) FROM inventory');
        console.log(`Total inventory records: ${inventoryCount.rows[0].count}`);

        const inventorySample = await client.query(`
            SELECT i.id, i.variant_id, i.quantity_in_stock, i.location_id 
            FROM inventory i 
            LIMIT 5
        `);
        console.log('\nSample inventory:');
        inventorySample.rows.forEach(inv => {
            console.log(`  - Variant: ${inv.variant_id.substring(0, 8)}... | Stock: ${inv.quantity_in_stock}`);
        });

        // Test 3: Check RLS policies on variants
        console.log('\n=== TEST 3: RLS Policies - Variants ===');
        const variantsRLS = await client.query(`
            SELECT schemaname, tablename, rowsecurity 
            FROM pg_tables 
            WHERE tablename = 'variants'
        `);
        console.log(`RLS Enabled: ${variantsRLS.rows[0]?.rowsecurity ? 'YES' : 'NO'}`);

        const variantsPolicies = await client.query(`
            SELECT policyname, permissive, roles, cmd, qual 
            FROM pg_policies 
            WHERE tablename = 'variants'
        `);
        console.log(`Total policies: ${variantsPolicies.rows.length}`);
        variantsPolicies.rows.forEach(p => {
            console.log(`  - ${p.policyname} (${p.cmd}) - Roles: ${p.roles}`);
        });

        // Test 4: Check RLS policies on inventory
        console.log('\n=== TEST 4: RLS Policies - Inventory ===');
        const inventoryRLS = await client.query(`
            SELECT schemaname, tablename, rowsecurity 
            FROM pg_tables 
            WHERE tablename = 'inventory'
        `);
        console.log(`RLS Enabled: ${inventoryRLS.rows[0]?.rowsecurity ? 'YES' : 'NO'}`);

        const inventoryPolicies = await client.query(`
            SELECT policyname, permissive, roles, cmd 
            FROM pg_policies 
            WHERE tablename = 'inventory'
        `);
        console.log(`Total policies: ${inventoryPolicies.rows.length}`);
        inventoryPolicies.rows.forEach(p => {
            console.log(`  - ${p.policyname} (${p.cmd}) - Roles: ${p.roles}`);
        });

        // Test 5: Full Inventory Join Query
        console.log('\n=== TEST 5: Full Inventory Join Query ===');
        const fullQuery = await client.query(`
            SELECT 
                v.id as variant_id,
                v.sku,
                i.id as item_id,
                i.name as item_name,
                inv.quantity_in_stock,
                inv.value_in_stock
            FROM variants v
            LEFT JOIN items i ON v.item_id = i.id
            LEFT JOIN inventory inv ON v.id = inv.variant_id
            LIMIT 5
        `);
        console.log(`Query returned ${fullQuery.rows.length} rows`);
        fullQuery.rows.forEach(row => {
            console.log(`  - ${row.item_name} (${row.sku}) | Stock: ${row.quantity_in_stock || 0}`);
        });

    } catch (err) {
        console.error('❌ Error:', err.message);
        console.error('Stack:', err.stack);
    } finally {
        await client.end();
        console.log('\n🔌 Connection closed');
    }
}

testDirectConnection();
