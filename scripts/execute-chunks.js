const fs = require('fs');
const path = require('path');

// Read and combine the remaining chunks
const chunks = [5, 6, 7];
let combined = '';

for (const num of chunks) {
    const chunkPath = path.join(__dirname, `seed_chunk_${num}.sql`);
    const content = fs.readFileSync(chunkPath, 'utf8');
    combined += content + '\n\n';
}

// Write to a single file for easier execution
fs.writeFileSync(path.join(__dirname, 'seed_remaining.sql'), combined);
console.log('Combined chunks 5-7 into seed_remaining.sql');













