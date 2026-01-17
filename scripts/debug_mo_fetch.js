const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://foggedeapevnksvhcrgp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ2dlZGVhcGV2bmtzdmhjcmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTM5MjcsImV4cCI6MjA3ODM4OTkyN30.XhmPdKJxNqnfzyQiz053PJDnlFKYUmOGJldiVsZX6kY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
    console.log("Running Fetch Query 1: Manufacturing Orders (Schedule Page)...");

    // Query matching fetchManufacturingOrders
    const { data: moData, error: moError } = await supabase
        .from('manufacturing_orders')
        .select(`
            id,
            order_no,
            planned_quantity,
            actual_quantity,
            status,
            due_date,
            total_cost,
            created_at,
            sales_order_id,
            variant:variants (
                item:items (
                    name,
                    category:categories(name),
                    uom
                )
            ),
            sales_order:sales_orders(
                customer:customers(name)
            )
        `)
        .limit(5);

    if (moError) {
        console.error("❌ MO Fetch Failed:", JSON.stringify(moError, null, 2));
    } else {
        console.log("✅ MO Fetch Success! Rows:", moData.length);
    }

    console.log("\nRunning Fetch Query 2: Production Tasks (Tasks Page)...");

    // Query matching fetchProductionTasks (FIXED: Removed actual_time_seconds)
    const { data: taskData, error: taskError } = await supabase
        .from('manufacturing_order_operations')
        .select(`
            id,
            operation_name,
            type,
            resource,
            planned_time_seconds,
            status,
            operator_name,
            operators,
            step_number,
            manufacturing_order:manufacturing_orders (
                id,
                order_no,
                due_date,
                planned_quantity,
                actual_quantity,
                variant:variants (
                    item:items (
                        name,
                        uom
                    )
                )
            )
        `)
        .limit(5);

    if (taskError) {
        console.error("❌ Tasks Fetch Failed:", JSON.stringify(taskError, null, 2));
    } else {
        console.log("✅ Tasks Fetch Success! Rows:", taskData.length);
    }
}

run();
