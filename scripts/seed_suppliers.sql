-- ==============================================
-- SEED SUPPLIERS DATA
-- Based on real Katana suppliers list
-- ==============================================

-- First, ensure comment and address columns exist
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS comment TEXT;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS address TEXT;

-- Clear existing suppliers to avoid duplicates
DELETE FROM suppliers;

-- Insert suppliers based on real Katana data
INSERT INTO suppliers (id, name, email, phone, currency, comment) VALUES
-- Packaging Suppliers
(uuid_generate_v4(), 'ULINE', 'Jessica.Montalvo@uline.ca', '(604) 235-6301 x 82037', 'CAD', 'Contact Person: Jessica Montalvo, https://www.uline.ca/ (PACKAGING SUPPLIES)'),
(uuid_generate_v4(), 'COSTCO', NULL, NULL, 'CAD', 'https://www.costco.ca/ (OIL AND TOILETRIES)'),

-- Essential Oils & Aromatics
(uuid_generate_v4(), 'NEW DIRECTION AROMATICS', NULL, NULL, 'CAD', 'https://www.newdirectionsaromatics.ca/ (ESSENTIAL OILS)'),
(uuid_generate_v4(), 'TRADE TECHNOCRATS', NULL, NULL, 'CAD', 'https://tradetechnocrats.com/ (COMFREY AND ARNICA)'),

-- Honey & Beeswax Suppliers
(uuid_generate_v4(), 'MIEDEMA HONEY FARM', 'miedemahoney@gmail.com', '7802064483', 'CAD', 'Contact Person: Curtis Miedma, https://miedemahoney.com, (BEESWAX AND PROPOLIS)'),

-- Printing & Labels
(uuid_generate_v4(), 'SHENZEN HAIK PRINTING (LEAFLETS)', 'delia.chenlin@gmail.com', '+86 159 19735652', 'USD', 'Contact Person: Delia, LEAFLETS/ GUIDELINES'),
(uuid_generate_v4(), 'SUMMIT LABELS', 'Adam@summitlabels.ca', '(604) 803-5713', 'CAD', 'Contact Person: Adam, Product Label Supplier'),
(uuid_generate_v4(), 'SOURCE GRAPHICS', 'Joyce@sourcegraphics.net', '250-765-6445', 'CAD', 'Contact Person: Joyce Belding/ Robb Burnham, BACKUP GUIDELINE/ LEAFLET SUPPLIER'),

-- Eggs Suppliers
(uuid_generate_v4(), 'RHODES FARMS', 'rhodesfarm11@gmail.com', '2508646827', 'CAD', 'Contact Person: Raj Rhodes, EGGS (OLD SUPPLIER)'),
(uuid_generate_v4(), 'HIDDEN ON HALL FARM AND FEED', 'ljrempel@gmail.com', '(250) 300-1266', 'CAD', 'Contact Person: Joy/ Miles Rempel EGGS (CURRENT SUPPLIER)'),
(uuid_generate_v4(), 'NORTH BROADVIEW FARMS', 'broadviewpoultryinc@gmail.com', '778-829-6757', 'CAD', 'Contact Person: Sajid, Egg Supplier (New)'),

-- Custom Packaging
(uuid_generate_v4(), 'GUANGZHOU YISON PRINTING (CUSTOM BOXES)', 'maggie@yisonprinting.com', '+8613822231187', 'USD', 'Contact Person: Maggie, CUSTOM/ BRANDED BOXES'),

-- Cosmetic Ingredients & Labels
(uuid_generate_v4(), 'BEAUTY PRIVATE LABELS', 'anurag.sharma@beautyprivatelabels.com', '1 336 937 7253', 'USD', 'Contact Person: Anurag Sharma, WHITE LABELLED WITCH HAZEL'),

-- Medical & Wound Care
(uuid_generate_v4(), 'HYNAUT (WOUND CARE)', 'cathy@hynaut.cn', NULL, 'USD', 'Contact Person: Cathy, Wound Care Items such as tape, gauze and variety pack'),

-- Tape Supplier
(uuid_generate_v4(), 'SHENZHEN ANGELAPACK CO. LTD', 'sz@angelapack.com', 'Whatsapp +8615873365633', 'USD', 'Contact Person: Angela, Branded Tape Supplier, www.angelapackaging.com, alibaba.ang'),

-- Bulk Oils
(uuid_generate_v4(), 'JEDWARDS', 'Debbie@bulknaturaloils.com', '6176816386', 'USD', 'Contact Person: Debbie Smith, Bulk Grapeseed and Olive Oil Supplier'),

-- Industrial Supplies
(uuid_generate_v4(), 'Global Industrial', NULL, NULL, 'CAD', 'https://www.globalindustrial.ca/'),
(uuid_generate_v4(), 'AMAZON', NULL, NULL, 'CAD', NULL),

-- Placeholder/Test entries
(uuid_generate_v4(), 'TEST', NULL, NULL, 'CAD', NULL),
(uuid_generate_v4(), 'HARFINGTON', 'info@harfington.com', NULL, 'CAD', NULL),
(uuid_generate_v4(), 'Sneed', NULL, NULL, 'CAD', NULL),
(uuid_generate_v4(), 'Grainger', NULL, NULL, 'CAD', NULL),
(uuid_generate_v4(), 'Vevor', NULL, NULL, 'CAD', NULL);

-- Verify insertion
SELECT COUNT(*) as total_suppliers FROM suppliers;
