const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../ManufacturingOrdersIngredients-2025-11-26-06_51.html');
const content = fs.readFileSync(filePath, 'utf8');

// Simple regex to find table headers
const headerRegex = /<td[^>]*>(.*?)<\/td>/g;
// HTML exports often use td for headers in the first row or th. Let's look for the first row.

// Find the first tr
const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
let match;
let rowCount = 0;

while ((match = trRegex.exec(content)) !== null) {
    rowCount++;
    if (rowCount > 3) break; // Header + 2 data rows
    
    const rowContent = match[1];
    const cellRegex = /<td[^>]*>(.*?)<\/td>/g;
    let cellMatch;
    const cells = [];
    while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
        // clean html tags and decode entities if needed
        let text = cellMatch[1].replace(/<[^>]*>/g, '').trim();
        text = text.replace(/&nbsp;/g, ' ');
        cells.push(text);
    }
    console.log(`Row ${rowCount}:`, cells);
}

