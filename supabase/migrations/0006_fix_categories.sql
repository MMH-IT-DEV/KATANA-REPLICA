
-- 1. Unlink items from categories so we can delete categories
UPDATE items SET category_id = NULL;

-- 2. Delete all categories
DELETE FROM categories;

-- 3. Add Unique Constraint to prevent future duplicates (Case Insensitive is better for UX, but standard Unique is a good start)
-- We'll use a unique index on lower(name) if possible, or just name. Katana allows "A" and "a" usually? No, usually categories are unique.
-- Let's enforce strict case-insensitive uniqueness.
CREATE UNIQUE INDEX IF NOT EXISTS idx_categories_name_unique ON categories (lower(name));








