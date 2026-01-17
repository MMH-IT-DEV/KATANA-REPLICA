import { supabase } from './supabaseClient';

export async function createKatanaVariant(itemId: string, configs: { name: string, value?: string }[], sku?: string): Promise<boolean> {
    const updates: any = {
        item_id: itemId,
        // Use null for empty SKU to avoid unique constraint issues with multiple empty rows
        sku: sku?.trim() || null,
        sales_price: 0,
        purchase_price: 0
    };

    configs.forEach((c, i) => {
        updates[`option${i+1}_name`] = c.name;
        updates[`option${i+1}_value`] = c.value || '';
    });

    console.log('📝 createKatanaVariant inserting:', updates);
    const { data, error } = await supabase.from('variants').insert(updates).select();
    console.log('📝 createKatanaVariant result:', { data, error });

    if (error) {
        console.error('❌ createKatanaVariant error:', error);
        return false;
    }

    // Verify: Query all variants for this item immediately after insert
    const { data: verifyData, error: verifyError } = await supabase
        .from('variants')
        .select('id, item_id, sku, created_at')
        .eq('item_id', itemId)
        .order('created_at', { ascending: false });

    console.log('🔍 VERIFY after insert - variants for item_id:', itemId, {
        count: verifyData?.length || 0,
        variants: verifyData,
        error: verifyError
    });

    return true;
}








