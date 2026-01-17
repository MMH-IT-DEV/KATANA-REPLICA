const fs = require('fs');
const path = require('path');

// Split remaining chunks (5-7) into mini-batches of 10 DO blocks each
for (let chunkNum = 5; chunkNum <= 7; chunkNum++) {
    const sqlPath = path.join(__dirname, `seed_chunk_${chunkNum}.sql`);
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Split by DO $$ blocks
    const blocks = sql.split('DO $$').slice(1).map(b => 'DO $$' + b);
    
    console.log(`Chunk ${chunkNum} has ${blocks.length} blocks`);
    
    // Create mini-batches of 10
    const MINI_BATCH_SIZE = 10;
    let miniBatchNum = 1;
    
    for (let i = 0; i < blocks.length; i += MINI_BATCH_SIZE) {
        const batch = blocks.slice(i, i + MINI_BATCH_SIZE).join('\n\n');
        const filename = `seed_chunk_${chunkNum}_${miniBatchNum}.sql`;
        fs.writeFileSync(path.join(__dirname, filename), batch);
        miniBatchNum++;
    }
    
    console.log(`  Created ${miniBatchNum - 1} mini-batches`);
}

console.log('\nMini-batches created successfully!');













