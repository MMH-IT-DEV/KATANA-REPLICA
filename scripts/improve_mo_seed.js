const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../ManufacturingOrdersIngredients-2025-11-26-06_51.html');
const outputFile = path.join(__dirname, 'seed_imported_mo_improved.sql');

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
    'Open': 'NOT_STARTED'
};

const MONTH_MAP = {
    'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04', 'MAY': '05', 'JUN': '06',
    'JUL': '07', 'AUG': '08', 'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
};

console.log('Parsing file for improved seed...');

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
            doneDate: cells[2], 
            status: cells[3],
            sku: cells[4],
            plannedQty: parseFloat(cells[12]) || 0,
            actualQty: parseFloat(cells[13]) || 0
        });
    }
}

console.log(`Found ${orders.size} unique manufacturing orders.`);

let sql = `-- Seed Improved Manufacturing Orders with Deadlines\n`;
// We use UPSERT (ON CONFLICT) so we don't need to delete everything, but for cleanliness we might want to.
// However, to preserve relationships if rows exist, we prefer UPSERT.
// But `generate_mo_seed.js` had a DELETE. Since we are re-seeding, we can just UPDATE existing ones or INSERT new ones.
// To be safe and fix bad data, let's rely on ON CONFLICT UPDATE.

for (const order of orders.values()) {
    const status = STATUS_MAP[order.status] || 'NOT_STARTED';
    
    // Parse Deadline from Order No "MO-XXXX // MMM DD"
    let dueDate = 'NULL';
    if (order.orderNo.includes('//')) {
        const parts = order.orderNo.split('//');
        const datePart = parts[1].trim(); // e.g. "NOV 18"
        const [monthName, day] = datePart.split(' ');
        
        if (monthName && day && MONTH_MAP[monthName.toUpperCase()]) {
            const month = MONTH_MAP[monthName.toUpperCase()];
            // Assume year 2025 as per file context (created 2025)
            // Or if month is before creation month, maybe next year? 
            // But "NOV 18" created "NOV 03" is same year.
            // Simple assumption: 2025.
            const year = '2025';
            const padDay = day.padStart(2, '0');
            dueDate = `'${year}-${month}-${padDay}'`;
        }
    }

    // Escape single quotes
    const safeOrderNo = order.orderNo.replace(/'/g, "''");
    const safeSku = order.sku.replace(/'/g, "''");
    
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
    ${dueDate}
) ON CONFLICT (order_no) DO UPDATE SET
    status = EXCLUDED.status,
    actual_quantity = EXCLUDED.actual_quantity,
    variant_id = EXCLUDED.variant_id,
    due_date = EXCLUDED.due_date,
    planned_quantity = EXCLUDED.planned_quantity,
    updated_at = NOW();\n`;
}

fs.writeFileSync(outputFile, sql);
console.log(`Generated SQL to ${outputFile}`);









