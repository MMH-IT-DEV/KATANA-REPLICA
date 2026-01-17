import { NextResponse } from 'next/server';
import { fetchKatanaProducts, fetchKatanaInventory } from '@/lib/katanaClient';

export async function GET() {
  try {
    // 1. Test Connection & Fetch Products
    const products = await fetchKatanaProducts();
    
    // 2. Fetch Inventory (if products worked)
    let inventory = [];
    if (products.length > 0) {
        inventory = await fetchKatanaInventory();
    }

    return NextResponse.json({
      success: true,
      message: `Successfully connected to Katana. Found ${products.length} products and ${inventory.length} inventory records.`,
      data: {
        product_sample: products.slice(0, 3),
        inventory_sample: inventory.slice(0, 3)
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || 'Unknown error occurred'
    }, { status: 500 });
  }
}

















