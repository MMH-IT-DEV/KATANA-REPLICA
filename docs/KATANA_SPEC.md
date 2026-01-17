# Katana Replica Specification

## Overview
This document outlines the core data structures and functionalities for the Katana Inventory Management replica. The goal is to replicate the "Inventory Intelligence" features: real-time master planning, tracking, and manufacturing management.

## Core Data Models

### 1. Product (`products`)
Items that are manufactured or sold.
- **Attributes**:
  - `id`: UUID (Internal) / Integer (External Reference)
  - `name`: Product name
  - `sku`: Stock Keeping Unit (unique)
  - `uom`: Unit of Measure (e.g., pcs, kg)
  - `category_id`: Reference to category
  - `is_sellable`: Boolean (Can be added to Sales Orders)
  - `is_producible`: Boolean (Has recipes, can be manufactured)
  - `is_purchasable`: Boolean (Can be bought from suppliers)
  - `is_batch_tracked`: Boolean (Enables full traceability)
  - `sales_price`: Default selling price
  - `purchase_price`: Default purchase price (if purchasable)
  - `configs`: Array of variant options (e.g., `[{"name": "Size", "values": ["S", "M"]}]`)
  - `variants`: Array of variant configurations (Size, Color) with specific SKUs

### 2. Material (`materials`)
Items purchased for use in production.
- **Attributes**:
  - `id`: UUID (Internal) / Integer (External Reference)
  - `name`: Material name
  - `sku`: Unique code
  - `uom`: Unit of Measure
  - `category_id`: Reference to category
  - `default_supplier_id`: Reference to Supplier
  - `is_batch_tracked`: Boolean
  - `purchase_price`: Default cost
  - `purchase_uom`: Optional different UoM for purchasing

### 3. Recipe / Bill of Materials (`recipes`)
Defines how a product is made.
- **Attributes**:
  - `product_id`: The product being made
  - `ingredients`: List of items required
    - `variant_id`: Product or Material variant ID
    - `quantity`: Amount required per unit of output
    - `wastage_percentage`: Optional waste factor

### 4. Inventory (`inventory`)
Tracks stock levels at locations.
- **Attributes**:
  - `variant_id`: Product/Material Variant ID
  - `location_id`: Warehouse Location ID
  - `quantity_in_stock`: Physical on-hand count
  - `quantity_committed`: Required by open Sales Orders or Manufacturing Orders
  - `quantity_expected`: Incoming from Purchase Orders or Manufacturing Orders
  - `reorder_point`: Threshold for low stock alerts
  - `average_cost`: Moving Average Cost (MAC) valuation

### 5. Sales Order (`sales_orders`)
Customer orders.
- **Attributes**:
  - `id`: UUID (Internal) / Integer (External Reference)
  - `order_no`: Human readable ID (e.g., #1001)
  - `source`: Origin (e.g., "manual", "shopify")
  - `customer_id`: Reference to Customer
  - `status`: `NOT_SHIPPED`, `PACKED`, `DELIVERED`, `BLOCKED`
  - `product_availability`: `IN_STOCK`, `EXPECTED`, `NOT_AVAILABLE`
  - `production_status`: `NOT_STARTED`, `IN_PROGRESS`, `DONE`
  - `delivery_date`: Expected delivery
  - `currency`: Transaction currency
  - `conversion_rate`: For multi-currency support
  - `total`: Total value
  - `rows`: List of items
    - `variant_id`: Item sold
    - `quantity`: Amount
    - `price_per_unit`: Sale price
    - `total_discount`: Discount amount
    - `tax_rate_id`: Tax reference
    - `batch_id`: (If batch tracked) Assignment happens at Fulfillment

### 6. Manufacturing Order (`manufacturing_orders`)
Internal orders to produce goods.
- **Attributes**:
  - `id`: UUID (Internal) / Integer (External Reference)
  - `order_no`: MO-1001
  - `product_id`: Item to produce
  - `variant_id`: Specific variant to produce
  - `planned_quantity`: Target amount
  - `actual_quantity`: Final produced amount
  - `status`: `NOT_STARTED`, `WORK_IN_PROGRESS`, `PARTIALLY_COMPLETE`, `BLOCKED`, `DONE`
  - `due_date`: Deadline
  - `ingredients_availability`: `IN_STOCK`, `EXPECTED`, `NOT_AVAILABLE`, `PROCESSED`
  - `production_operations`: Steps/Tasks (e.g., Cutting, Assembly)
  - `cost_breakdown`:
    - `material_cost`: Cost of raw materials
    - `subassemblies_cost`: Cost of intermediate items
    - `operations_cost`: Labor/Machine cost
    - `total_cost`: Sum of above

### 7. Purchase Order (`purchase_orders`)
Orders to suppliers.
- **Attributes**:
  - `id`: UUID
  - `order_no`: PO-1001
  - `supplier_id`: Reference to Supplier
  - `status`: `NOT_RECEIVED`, `PARTIALLY_RECEIVED`, `RECEIVED`
  - `expected_arrival_date`: ETA
  - `rows`: List of items
    - `variant_id`: Material/Product
    - `quantity`: Amount
    - `price_per_unit`: Cost

### 8. Batch (`batches`)
For tracking specific lots of items (Traceability).
- **Attributes**:
  - `id`: UUID
  - `batch_number`: Human readable (unique per variant)
  - `variant_id`: The item this batch belongs to
  - `expiration_date`: Optional
  - `created_at`: Creation date

## Core Functionalities & Logic

### 1. Inventory Intelligence (Real-time Commitments)
- **Sales Order (SO)**:
  - `OPEN`: Increases `quantity_committed` for the product.
  - `PACKED/DELIVERED`: Decreases `quantity_committed`, Decreases `quantity_in_stock`.
- **Purchase Order (PO)**:
  - `NOT_RECEIVED`: Increases `quantity_expected` for items.
  - `RECEIVED`: Decreases `quantity_expected`, Increases `quantity_in_stock`. (Triggers MAC recalculation).
- **Manufacturing Order (MO)**:
  - `NOT_STARTED` / `BLOCKED` / `WORK_IN_PROGRESS`: 
    - Increases `quantity_expected` (Finished Product).
    - Increases `quantity_committed` (Ingredients).
  - `PARTIALLY_COMPLETE`: 
    - Increases `quantity_in_stock` (Product) by completed amount.
    - Decreases `quantity_in_stock` (Ingredients) by *planned* consumption.
  - `DONE`:
    - Finalizes all stock movements based on *actual* consumption.

### 2. Costing: Moving Average Cost (MAC)
- **Formula**: `MAC = (Total Stock Value + New Purchase Value) / (Total Stock Quantity + New Purchase Quantity)`
- **Triggers**:
  - Receiving a PO (adds value at Purchase Price).
  - Completing an MO (adds value at [Ingredients Cost + Operations Cost]).
- **Usage**:
  - Sales COGS (Cost of Goods Sold) uses the *current* MAC at the moment of shipment.
  - Ingredient consumption uses the *current* MAC at the moment of production.

### 3. Batch Tracking Workflow
- **Receiving (PO)**: User must assign items to a Batch (New or Existing).
- **Production (MO)**:
  - Ingredients: User selects which Batch to consume from.
  - Product: User assigns a Batch # to the finished good.
- **Fulfillment (SO)**: User selects which Batch to ship to the customer.

## Workflows
1.  **Make-to-Stock**:
    - Sales Order comes in -> Check Stock.
    - If low -> Create Manufacturing Order (MO).
    - MO checks ingredients -> If low -> Create Purchase Order (PO).
2.  **Make-to-Order**:
    - Sales Order triggers specific linked MO.

## UI/UX Principles (from "Japanese Master" & Ryo Lu)
- **Simplicity**: Clean architecture, flexible components.
- **Vibe**: "Retro" or distinct personality (as per video inspiration), but functional.
- **Components**: Use `shadcn/ui` for robust foundation, themed heavily.
- **No Slop**: Every pixel and interaction must be intentional.

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS, shadcn/ui, Framer Motion (for "vibe").
- **Backend**: Supabase (Postgres) for "Inventory Intelligence" logic (triggers/functions or API logic).
