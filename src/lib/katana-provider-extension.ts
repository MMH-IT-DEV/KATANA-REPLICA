import { supabase } from './supabaseClient';

export async function fetchKatanaCategories(): Promise<{ label: string; value: string }[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('name')
        .order('name');

    if (error) return [];

    // Deduplicate names
    const uniqueNames = Array.from(new Set(data.map((c: any) => c.name)));
    return uniqueNames.map(name => ({ label: name, value: name }));
}

export async function createKatanaCategory(name: string): Promise<string | null> {
    const { data, error } = await supabase
        .from('categories')
        .insert({ name })
        .select('name')
        .single();

    if (error) return null;
    return data.name;
}

export async function fetchKatanaUOMs(): Promise<{ label: string; value: string }[]> {
    // Fetch distinct UOMs from items + some defaults
    const { data, error } = await supabase
        .from('items')
        .select('uom')
        .not('uom', 'is', null); // Ensure not null

    const defaults = ['pcs', 'kg', 'm', 'L', 'g', 'cm', 'mm', 'box', 'pack', 'set'];
    const existing = data ? data.map((i: any) => i.uom) : [];

    // Merge and unique
    const all = Array.from(new Set([...defaults, ...existing])).sort();

    return all.map(u => ({ label: u, value: u }));
}


export async function fetchKatanaSuppliers(): Promise<{ label: string; value: string; id: string; currency: string }[]> {
    const { data, error } = await supabase
        .from('suppliers')
        .select('id, name, currency')
        .order('name');

    if (error) return [];

    return data.map((s: any) => ({
        label: s.name,
        value: s.name,
        id: s.id,
        currency: s.currency || 'USD'
    }));
}
