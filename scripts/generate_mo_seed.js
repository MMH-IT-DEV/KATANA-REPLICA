const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../ManufacturingOrdersIngredients-2025-11-26-06_51.html');
const outputFile = path.join(__dirname, 'seed_imported_mo.sql');

const content = fs.readFileSync(inputFile, 'utf8');

const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
let match;
let rowCount = 0;

const orders = new Map();

const STATUS_MAP = {
    'In progress': 'WORK_IN_PROGRESS',
    'Done': 'DONE',
    'Blocked': 'BLOCKED',
    'Not started': 'NOT_STARTED',
    'Open': 'NOT_STARTED' // Just in case
};

console.log('Parsing file...');

while ((match = trRegex.exec(content)) !== null) {
    rowCount++;
    if (rowCount <= 2) continue; // Skip headers

    const rowContent = match[1];
    const cellRegex = /<td[^>]*>(.*?)<\/td>/g;
    const cells = [];
    let cellMatch;
    
    while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
        let text = cellMatch[1].replace(/<[^>]*>/g, '').trim();
        text = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
        cells.push(text);
    }

    if (cells.length < 15) continue;

    const orderNo = cells[0];
    if (!orderNo) continue;

    // Deduplicate by Order No
    if (!orders.has(orderNo)) {
        orders.set(orderNo, {
            orderNo: orderNo,
            createdDate: cells[1],
            doneDate: cells[2], // Might be empty
            status: cells[3],
            sku: cells[4],
            plannedQty: parseFloat(cells[12]) || 0,
            actualQty: parseFloat(cells[13]) || 0
        });
    }
}

console.log(`Found ${orders.size} unique manufacturing orders.`);

let sql = `-- Seed Imported Manufacturing Orders\n`;
sql += `DELETE FROM manufacturing_orders WHERE order_no LIKE 'MO-%';\n\n`;

for (const order of orders.values()) {
    const status = STATUS_MAP[order.status] || 'NOT_STARTED';
    
    // Escape single quotes in strings
    const safeOrderNo = order.orderNo.replace(/'/g, "''");
    const safeSku = order.sku.replace(/'/g, "''");
    
    // Construct SQL
    // We use a subquery to find the variant_id from the SKU.
    // If SKU is not found, variant_id will be NULL.
    
    sql += `INSERT INTO manufacturing_orders (
    order_no, 
    variant_id, 
    planned_quantity, 
    actual_quantity, 
    status, 
    created_at,
    due_date
) VALUES (
    '${safeOrderNo}',
    (SELECT id FROM variants WHERE sku = '${safeSku}' LIMIT 1),
    ${order.plannedQty},
    ${order.actualQty},
    '${status}',
    ${order.createdDate ? `'${order.createdDate}'` : 'NOW()'},
    ${order.doneDate ? `'${order.doneDate}'` : 'NULL'}
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    updated_at = NOW();\n`;
}

fs.writeFileSync(outputFile, sql);
console.log(`Generated SQL to ${outputFile}`);











