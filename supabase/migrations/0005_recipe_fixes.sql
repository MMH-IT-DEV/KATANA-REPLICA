ALTER TABLE recipes ADD COLUMN IF NOT EXISTS notes TEXT;

-- Ensure unique ingredients per product variant to support the delete logic
ALTER TABLE recipes DROP CONSTRAINT IF EXISTS recipes_product_ingredient_unique;
ALTER TABLE recipes ADD CONSTRAINT recipes_product_ingredient_unique UNIQUE (product_variant_id, ingredient_variant_id);








