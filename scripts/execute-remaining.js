const fs = require('fs');
const path = require('path');

// List all remaining mini-batches
const batches = [
    'seed_chunk_5_2.sql',
    'seed_chunk_5_3.sql',
    'seed_chunk_5_4.sql',
    'seed_chunk_5_5.sql',
    'seed_chunk_6_1.sql',
    'seed_chunk_6_2.sql',
    'seed_chunk_6_3.sql',
    'seed_chunk_6_4.sql',
    'seed_chunk_6_5.sql',
    'seed_chunk_7_1.sql'
];

console.log('Remaining mini-batches to execute:');
batches.forEach((batch, idx) => {
    const filePath = path.join(__dirname, batch);
    if (fs.existsSync(filePath)) {
        const sql = fs.readFileSync(filePath, 'utf8');
        const blockCount = (sql.match(/DO \$\$/g) || []).length;
        console.log(`${idx + 1}. ${batch} - ${blockCount} blocks`);
    } else {
        console.log(`${idx + 1}. ${batch} - FILE NOT FOUND`);
    }
});













