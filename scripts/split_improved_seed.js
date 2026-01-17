const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'seed_imported_mo_improved.sql');
const sql = fs.readFileSync(inputFile, 'utf8');

const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);

const chunkSize = 50; // Smaller chunk size to be safe
let fileCount = 1;

for (let i = 0; i < statements.length; i += chunkSize) {
    const chunk = statements.slice(i, i + chunkSize).join(';\n') + ';';
    const fileName = path.join(__dirname, `seed_mo_improved_part${fileCount}.sql`);
    fs.writeFileSync(fileName, chunk);
    console.log(`Wrote ${fileName}`);
    fileCount++;
}









