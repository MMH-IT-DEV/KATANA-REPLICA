const { Client } = require('pg');

const connectionConfig = {
    host: 'db.foggedeapevnksvhcrgp.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Nicareplus1!',
    ssl: { rejectUnauthorized: false }
};

async function addColumn() {
    const client = new Client(connectionConfig);

    try {
        console.log('🔌 Connecting to Supabase PostgreSQL...');
        await client.connect();
        console.log('✅ Connected.');

        const sql = `ALTER TABLE items ADD COLUMN IF NOT EXISTS variant_config JSONB;`;
        console.log('🚀 Running SQL:', sql);
        await client.query(sql);
        console.log('✅ Column added (or already exists).');

        console.log('🧐 Verifying column in schema...');
        const verifySql = `
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'items' AND column_name = 'variant_config';
        `;
        const res = await client.query(verifySql);
        if (res.rows.length > 0) {
            console.log('📊 Column found:', res.rows[0]);
        } else {
            console.error('❌ Column NOT found after update!');
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await client.end();
        console.log('🔌 Connection closed');
    }
}

addColumn();
