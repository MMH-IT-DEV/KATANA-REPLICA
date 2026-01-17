const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../ManufacturingOrdersIngredients-2025-11-26-06_51.html');
const stream = fs.createReadStream(filePath, { encoding: 'utf8', start: 3000, end: 6000 }); 

stream.on('data', (chunk) => {
    console.log(chunk);
    stream.destroy(); 
});











