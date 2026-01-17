const fs = require('fs');
const path = require('path');
const data = require('../src/lib/katana-imported-data.json');

let sql = `
-- Clear existing data (using CASCADE to handle foreign keys)
TRUNCATE TABLE inventory CASCADE;
TRUNCATE TABLE variants CASCADE;
TRUNCATE TABLE items CASCADE;
`;

data.forEach(item => {
    // Sanitize strings
    const name = item.name.replace(/'/g, "''");
    // Use SKU if available, otherwise generate one from Name to ensure uniqueness constraints
    let sku = item.sku && item.sku !== '-' ? item.sku : `GEN-${item.id}`;
    sku = sku.replace(/'/g, "''");
    
    const uom = (item.uom || 'pcs').replace(/'/g, "''");
    const type = (item.type || 'Material').toLowerCase(); // Default to material if missing
    
    // Values
    const inStock = item.inStock || 0;
    const committed = item.committed || 0;
    const expected = item.expected || 0;
    const avgCost = item.avgCost || 0;
    const safetyStock = item.safetyStock || 0;

    sql += `
DO $$
DECLARE
    new_item_id uuid;
    new_variant_id uuid;
    existing_inv_id uuid;
BEGIN
    -- Check if item exists (idempotent)
    SELECT id INTO new_item_id FROM items WHERE sku = '${sku}';
    
    IF new_item_id IS NULL THEN
        INSERT INTO items (name, sku, type, uom, is_sellable, is_purchasable)
        VALUES ('${name}', '${sku}', '${type}', '${uom}', ${type === 'product'}, ${type === 'material'})
        RETURNING id INTO new_item_id;
    END IF;

    -- Check if variant exists
    SELECT id INTO new_variant_id FROM variants WHERE sku = '${sku}' AND item_id = new_item_id;

    IF new_variant_id IS NULL THEN
        INSERT INTO variants (item_id, sku, purchase_price, sales_price)
        VALUES (new_item_id, '${sku}', ${avgCost}, 0)
        RETURNING id INTO new_variant_id;
    END IF;

    -- Check/Update Inventory
    SELECT id INTO existing_inv_id FROM inventory WHERE variant_id = new_variant_id AND location_id IS NULL;

    IF existing_inv_id IS NULL THEN
        INSERT INTO inventory (variant_id, quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost)
        VALUES (new_variant_id, ${inStock}, ${committed}, ${expected}, ${safetyStock}, ${avgCost});
    ELSE
        UPDATE inventory SET
            quantity_in_stock = ${inStock},
            quantity_committed = ${committed},
            quantity_expected = ${expected},
            reorder_point = ${safetyStock},
            average_cost = ${avgCost}
        WHERE id = existing_inv_id;
    END IF;
END $$;
`;
});

fs.writeFileSync(path.join(__dirname, 'seed_imported.sql'), sql);
console.log('Generated scripts/seed_imported.sql');
