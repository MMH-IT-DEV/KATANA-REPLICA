const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../ManufacturingOrdersIngredients-2025-11-26-06_51.html');
const outputFile = path.join(__dirname, 'seed_mo_rows.sql');

const content = fs.readFileSync(inputFile, 'utf8');

const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
const cellRegex = /<td[^>]*>(.*?)<\/td>/g;

let match;
let rowCount = 0;
let headers = [];
let headerMap = {};

const statements = [];

console.log('Parsing ingredients file...');

while ((match = trRegex.exec(content)) !== null) {
    rowCount++;
    const rowContent = match[1];
    const cells = [];
    let cellMatch;
    
    while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
        let text = cellMatch[1].replace(/<[^>]*>/g, '').trim(); // Strip tags
        text = text.replace(/&nbsp;/g, ' '); // Handle non-breaking spaces
        text = text.replace(/&amp;/g, '&'); // Handle ampersands
        cells.push(text);
    }
    
    // Header detection
    if (headers.length === 0) {
        // Look for "MO #"
        const moIndex = cells.findIndex(c => c === 'MO #' || c === 'Manufacturing order');
        if (moIndex !== -1) {
            headers = cells;
            headers.forEach((h, i) => headerMap[h] = i);
            console.log('Found headers:', headerMap);
        }
        continue;
    }
    
    // Data Rows
    const moNo = cells[headerMap['MO #']];
    const ingSku = cells[headerMap['Ingredient variant code/SKU']];
    
    if (!moNo || !ingSku) continue; // Skip invalid rows
    
    const plannedQty = parseFloat(cells[headerMap['Planned quantity of ingredient']] || '0');
    const actualQty = parseFloat(cells[headerMap['Actual quantity of ingredient']] || '0');
    const costVal = parseFloat(cells[headerMap['Ingredient cost']] || '0');
    const notes = cells[headerMap['Ingredient notes']] || '';
    
    if (statements.length < 3) {
        console.log(`Sample Row: MO=${moNo}, SKU=${ingSku}, Planned=${plannedQty}, Actual=${actualQty}, CostCol=${costVal}`);
    }

    let unitCost = 0;
    if (actualQty > 0) unitCost = costVal / actualQty;
    else if (plannedQty > 0) unitCost = costVal / plannedQty; // Fallback to planned if actual is 0 (assuming cost is projected)
    
    const sql = `INSERT INTO manufacturing_order_rows (
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes
    ) VALUES (
        (SELECT id FROM manufacturing_orders WHERE order_no = '${moNo}' LIMIT 1),
        (SELECT id FROM variants WHERE sku = '${ingSku}' LIMIT 1),
        ${plannedQty},
        ${actualQty},
        ${unitCost.toFixed(4)},
        '${notes.replace(/'/g, "''")}'
    ) ON CONFLICT (manufacturing_order_id, variant_id) DO UPDATE SET
        planned_quantity = manufacturing_order_rows.planned_quantity + EXCLUDED.planned_quantity,
        actual_quantity = manufacturing_order_rows.actual_quantity + EXCLUDED.actual_quantity;`;

    // Wait, "Ingredient cost" usually is Total Cost for that line? Or Unit Cost?
    // Looking at screenshot/html, typically it's Total Cost.
    // If Actual Qty is 0, Cost is probably 0.
    // Let's check the column header again: "Ingredient cost". 
    // In Row 2: Planned: 90, Actual: 34, Cost: ? (Need to see data)
    // Assuming it's total cost.
    
    statements.push(sql);
}

console.log(`Generated ${statements.length} row statements.`);
fs.writeFileSync(outputFile, statements.join('\n'));

