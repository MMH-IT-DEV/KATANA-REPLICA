-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CLEANUP: Drop existing tables to ensure clean replica state
DROP TABLE IF EXISTS 
    sales_order_rows, sales_orders, 
    purchase_order_rows, purchase_orders,
    manufacturing_orders,
    inventory, batches, 
    recipes, variants, items, 
    customers, suppliers, categories, locations, tax_rates 
CASCADE;

-- 1. Categories (Shared by Products and Materials)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Suppliers
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    currency TEXT DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Locations (Warehouses)
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    address TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tax Rates
CREATE TABLE tax_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    rate NUMERIC(5, 2) NOT NULL, -- Percentage (e.g., 20.00)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Items (Base table for Products and Materials)
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    type TEXT CHECK (type IN ('product', 'material')),
    category_id UUID REFERENCES categories(id),
    uom TEXT NOT NULL DEFAULT 'pcs',
    
    -- Logic Flags
    is_sellable BOOLEAN DEFAULT FALSE,
    is_purchasable BOOLEAN DEFAULT FALSE,
    is_producible BOOLEAN DEFAULT FALSE,
    is_batch_tracked BOOLEAN DEFAULT FALSE,
    
    -- Financials (Defaults)
    default_purchase_price NUMERIC(10, 2) DEFAULT 0,
    default_sales_price NUMERIC(10, 2) DEFAULT 0,
    
    -- Product Specifics
    batch_tracking_enabled BOOLEAN DEFAULT FALSE,
    
    -- Material Specifics
    default_supplier_id UUID REFERENCES suppliers(id),
    purchase_uom TEXT,
    conversion_rate NUMERIC(10, 5) DEFAULT 1, -- purchase_uom to uom

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Variants (Specific Configurations of Items)
CREATE TABLE variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID REFERENCES items(id) ON DELETE CASCADE,
    sku TEXT UNIQUE NOT NULL, -- Variant SKU
    option1_name TEXT,
    option1_value TEXT,
    option2_name TEXT,
    option2_value TEXT,
    option3_name TEXT,
    option3_value TEXT,
    
    sales_price NUMERIC(10, 2), -- Override item default
    purchase_price NUMERIC(10, 2), -- Override item default
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Inventory (Stock Levels)
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    variant_id UUID REFERENCES variants(id) ON DELETE CASCADE,
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
    
    quantity_in_stock NUMERIC(12, 4) DEFAULT 0,
    quantity_committed NUMERIC(12, 4) DEFAULT 0,
    quantity_expected NUMERIC(12, 4) DEFAULT 0,
    
    reorder_point NUMERIC(12, 4) DEFAULT 0,
    average_cost NUMERIC(12, 4) DEFAULT 0, -- Moving Average Cost
    
    UNIQUE(variant_id, location_id)
);

-- 8. Recipes / Bill of Materials
CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_variant_id UUID REFERENCES variants(id) ON DELETE CASCADE,
    ingredient_variant_id UUID REFERENCES variants(id),
    quantity NUMERIC(12, 4) NOT NULL,
    wastage_percentage NUMERIC(5, 2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Customers
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    currency TEXT DEFAULT 'USD',
    address_line_1 TEXT,
    address_line_2 TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    country TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Sales Orders
CREATE TABLE sales_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_no TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    location_id UUID REFERENCES locations(id),
    
    status TEXT CHECK (status IN ('OPEN', 'PACKED', 'DELIVERED', 'BLOCKED', 'CANCELLED')) DEFAULT 'OPEN',
    delivery_status TEXT CHECK (delivery_status IN ('NOT_SHIPPED', 'PARTIALLY_SHIPPED', 'SHIPPED')) DEFAULT 'NOT_SHIPPED',
    
    delivery_date DATE,
    currency TEXT,
    total_amount NUMERIC(12, 2),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE sales_order_rows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sales_order_id UUID REFERENCES sales_orders(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES variants(id),
    quantity NUMERIC(12, 4) NOT NULL,
    price_per_unit NUMERIC(12, 2) NOT NULL,
    tax_rate_id UUID REFERENCES tax_rates(id),
    total_price NUMERIC(12, 2) GENERATED ALWAYS AS (quantity * price_per_unit) STORED
);

-- 11. Manufacturing Orders
CREATE TABLE manufacturing_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_no TEXT UNIQUE NOT NULL,
    variant_id UUID REFERENCES variants(id), -- What we are making
    location_id UUID REFERENCES locations(id),
    
    planned_quantity NUMERIC(12, 4) NOT NULL,
    actual_quantity NUMERIC(12, 4),
    
    status TEXT CHECK (status IN ('NOT_STARTED', 'WORK_IN_PROGRESS', 'PARTIALLY_COMPLETE', 'BLOCKED', 'DONE', 'CANCELLED')) DEFAULT 'NOT_STARTED',
    
    due_date DATE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Costing Snapshot (Calculated upon completion)
    total_cost NUMERIC(12, 2),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Purchase Orders
CREATE TABLE purchase_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_no TEXT UNIQUE NOT NULL,
    supplier_id UUID REFERENCES suppliers(id),
    location_id UUID REFERENCES locations(id),
    
    status TEXT CHECK (status IN ('OPEN', 'PARTIALLY_RECEIVED', 'RECEIVED', 'CANCELLED')) DEFAULT 'OPEN',
    expected_arrival_date DATE,
    currency TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE purchase_order_rows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_order_id UUID REFERENCES purchase_orders(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES variants(id),
    quantity NUMERIC(12, 4) NOT NULL,
    price_per_unit NUMERIC(12, 2) NOT NULL, -- Purchase Price
    quantity_received NUMERIC(12, 4) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Batches (Traceability)
CREATE TABLE batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_number TEXT NOT NULL,
    variant_id UUID REFERENCES variants(id),
    expiration_date DATE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(batch_number, variant_id)
);
