const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../ManufacturingOrdersIngredients-2025-11-26-06_51.html');
const stream = fs.createReadStream(filePath, { encoding: 'utf8', start: 0, end: 4000 }); // Read first 4KB

stream.on('data', (chunk) => {
    // Just print the raw chunk to see structure
    console.log(chunk);
    stream.destroy(); // Stop after first chunk
});











