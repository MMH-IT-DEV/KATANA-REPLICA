'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Info,
  ExternalLink,
  Trash2,
  Copy,
  GripVertical,
  X,
  ShoppingCart,
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { fetchStockMovements, StockMovement } from '@/lib/katana-data-provider';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchableSelect } from '@/components/ui/SearchableSelect';
import { useToast } from '@/components/ui/Toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Variant {
  id: string;
  sku: string;
  attributes?: string;
  item: {
    id: string;
    name: string;
    uom?: string;
  };
}

interface Recipe {
  id: string;
  quantity: number;
  wastage_percentage?: number;
  notes?: string;
  ingredient_variant_id: string;
  ingredient_variant: {
    id: string;
    sku: string;
    item: {
      id: string;
      name: string;
      cost?: number;
      uom?: string;
    };
  };
}

interface ProductBOMProps {
  itemId: string;
  itemName: string;
  itemUom: string;
  variants: Variant[];
  initialVariantId?: string;
}

export function ProductBOM({
  itemId,
  itemName,
  itemUom,
  variants,
  initialVariantId,
}: ProductBOMProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    initialVariantId || variants[0]?.id || ''
  );
  const [ingredients, setIngredients] = useState<Recipe[]>([]);
  const [availableIngredients, setAvailableIngredients] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Inventory Intel popup state
  const [showInventoryIntel, setShowInventoryIntel] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Recipe | null>(null);
  const [inventoryData, setInventoryData] = useState<any>(null);
  const [loadingIntel, setLoadingIntel] = useState(false);
  const [intelTab, setIntelTab] = useState<'movements' | 'expected' | 'committed'>('movements');
  const [expectedData, setExpectedData] = useState<Array<{
    id: string;
    poNumber: string;
    expectedDate: string;
    quantity: number;
    received: number;
    remaining: number;
  }>>([]);
  const [committedData, setCommittedData] = useState<Array<{
    id: string;
    moNumber: string;
    productName: string;
    quantity: number;
    status: string;
  }>>([]);

  // Load BOM ingredients for selected variant
  useEffect(() => {
    if (selectedVariantId) {
      loadIngredients(selectedVariantId);
    }
  }, [selectedVariantId]);

  // Load available ingredients (all variants) for the dropdown
  useEffect(() => {
    loadAvailableIngredients();
  }, []);

  const loadIngredients = async (variantId: string) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('recipes')
      .select(`
        id,
        quantity,
        wastage_percentage,
        notes,
        ingredient_variant_id,
        ingredient_variant:variants!ingredient_variant_id (
          id,
          sku,
          item:items (
            id,
            name,
            cost,
            uom
          )
        )
      `)
      .eq('product_variant_id', variantId)
      .order('created_at');

    if (data) {
      setIngredients(data as any);
    } else if (error) {
      console.error('Failed to load ingredients:', error);
    }
    setIsLoading(false);
  };

  const loadAvailableIngredients = async () => {
    console.log('🔍 ProductBOM: Loading available ingredients...');
    const { data, error } = await supabase
      .from('variants')
      .select(`
        id,
        sku,
        item:items!inner (
          id,
          name,
          type,
          uom
        )
      `)
      .order('item(name)');

    if (error) {
      console.error('❌ ProductBOM: Failed to load ingredients:', error);
      return;
    }

    if (data) {
      const formatted = data.map((v: any) => {
        const item = Array.isArray(v.item) ? v.item[0] : v.item;
        return {
          id: v.id,
          name: `[${v.sku}] ${item?.name || 'Unknown'}`,
          sku: v.sku,
          type: item?.type,
        };
      });
      console.log('📊 ProductBOM: Loaded ingredients:', { count: formatted.length, sample: formatted.slice(0, 3).map(f => f.name) });
      setAvailableIngredients(formatted);
    }
  };

  const addIngredient = async (ingredientVariantId: string) => {
    const { error } = await supabase
      .from('recipes')
      .insert({
        id: crypto.randomUUID(),
        product_variant_id: selectedVariantId,
        ingredient_variant_id: ingredientVariantId,
        quantity: 1,
        wastage_percentage: 0,
        notes: '',
      });

    if (!error) {
      await loadIngredients(selectedVariantId);
      showToast('Ingredient added', 'success');
    } else {
      showToast('Failed to add ingredient', 'error');
      console.error('Failed to add ingredient:', error);
    }
  };

  const updateIngredient = async (id: string, field: string, value: any) => {
    const { error } = await supabase
      .from('recipes')
      .update({ [field]: value })
      .eq('id', id);

    if (!error) {
      await loadIngredients(selectedVariantId);
    } else {
      showToast('Failed to update ingredient', 'error');
    }
  };

  const deleteIngredient = async (id: string) => {
    const { error } = await supabase.from('recipes').delete().eq('id', id);

    if (!error) {
      await loadIngredients(selectedVariantId);
      showToast('Ingredient removed', 'success');
    } else {
      showToast('Failed to delete ingredient', 'error');
    }
  };

  const openInventoryIntel = async (ingredient: Recipe) => {
    setSelectedIngredient(ingredient);
    setShowInventoryIntel(true);
    setLoadingIntel(true);
    setIntelTab('movements'); // Reset to movements tab
    setExpectedData([]);
    setCommittedData([]);

    const variantId = ingredient.ingredient_variant_id;

    // DEBUG: Log the variant_id being queried
    console.log('[Inventory Intel] Opening for ingredient:', {
      variantId,
      ingredientName: ingredient.ingredient_variant?.item?.name,
      ingredientSku: ingredient.ingredient_variant?.sku,
    });

    // TARGETED DEBUG - Compare with expected ID
    console.log('📍 POPUP DEBUG:', {
      calledWith: variantId,
      expected: '35678c03-8564-49da-8d40-9ba043cf3a44',
      match: variantId === '35678c03-8564-49da-8d40-9ba043cf3a44'
    });

    try {
      // 1. Fetch inventory summary
      const { data: inventoryRecord } = await supabase
        .from('inventory')
        .select('quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost')
        .eq('variant_id', variantId)
        .maybeSingle();

      const inStock = inventoryRecord?.quantity_in_stock || 0;
      const expected = inventoryRecord?.quantity_expected || 0;
      const committed = inventoryRecord?.quantity_committed || 0;
      const safetyStock = inventoryRecord?.reorder_point || 0;
      const avgCost = inventoryRecord?.average_cost || ingredient.ingredient_variant?.item?.cost || 0;

      // 2. Try to load from stock_movements table first
      const { data: stockMovements, error: movementsError } = await supabase
        .from('stock_movements')
        .select('*')
        .eq('variant_id', variantId)
        .order('movement_date', { ascending: false })
        .limit(50);

      // DEBUG: Log stock_movements query result
      console.log('[Inventory Intel] Stock movements query:', {
        variantId,
        recordsFound: stockMovements?.length || 0,
        error: movementsError,
        firstRecord: stockMovements?.[0] || null,
      });

      let movements: StockMovement[] = [];

      if (!movementsError && stockMovements && stockMovements.length > 0) {
        // Map stock_movements table data to StockMovement interface
        movements = stockMovements.map((m: any) => ({
          id: m.id,
          date: m.movement_date,
          type: m.caused_by_reference || m.caused_by_type || 'Unknown',
          change: Number(m.quantity_change),
          price: Number(m.cost_per_unit) || avgCost,
          balance: Number(m.balance_after),
          value: Number(m.value_after),
          avgCost: Number(m.avg_cost_after),
          isAlert: Number(m.balance_after) < 0,
        }));
      } else {
        // Fall back to calculated movements from PO/MO/SO tables
        movements = await fetchStockMovements(variantId, inStock, avgCost);
      }

      // 3. Load Expected data from purchase_order_rows (pending PO lines)
      const { data: poRows, error: poError } = await supabase
        .from('purchase_order_rows')
        .select(`
          id,
          quantity,
          quantity_received,
          purchase_order:purchase_orders!inner(
            order_no,
            expected_arrival_date,
            status
          )
        `)
        .eq('variant_id', variantId)
        .neq('purchase_order.status', 'RECEIVED')
        .neq('purchase_order.status', 'CANCELLED');

      if (!poError && poRows && poRows.length > 0) {
        const expectedRows = poRows.map((row: any) => ({
          id: row.id,
          poNumber: row.purchase_order?.order_no || 'Unknown',
          expectedDate: row.purchase_order?.expected_arrival_date || '',
          quantity: Number(row.quantity) || 0,
          received: Number(row.quantity_received) || 0,
          remaining: (Number(row.quantity) || 0) - (Number(row.quantity_received) || 0),
        }));
        setExpectedData(expectedRows);
      }

      // 4. Load Committed data from manufacturing_order_rows (pending MO ingredient consumption)
      const { data: moRows, error: moError } = await supabase
        .from('manufacturing_order_rows')
        .select(`
          id,
          planned_quantity,
          manufacturing_order:manufacturing_orders!inner(
            order_no,
            status,
            variant:variants(
              item:items(name)
            )
          )
        `)
        .eq('variant_id', variantId)
        .neq('manufacturing_order.status', 'DONE')
        .neq('manufacturing_order.status', 'CANCELLED');

      if (!moError && moRows && moRows.length > 0) {
        const committedRows = moRows.map((row: any) => ({
          id: row.id,
          moNumber: row.manufacturing_order?.order_no || 'Unknown',
          productName: row.manufacturing_order?.variant?.item?.name || 'Unknown Product',
          quantity: Number(row.planned_quantity) || 0,
          status: row.manufacturing_order?.status || 'Unknown',
        }));
        setCommittedData(committedRows);
      }

      setInventoryData({
        in_stock: inStock,
        expected: expected,
        committed: committed,
        safety_stock: safetyStock,
        calculated_stock: inStock + expected - committed - safetyStock,
        average_cost: avgCost,
        uom: ingredient.ingredient_variant?.item?.uom || 'pcs',
        movements: movements || [],
      });
    } catch (err) {
      console.error('Failed to load inventory data:', err);
      setInventoryData({
        in_stock: 0,
        expected: 0,
        committed: 0,
        safety_stock: 0,
        calculated_stock: 0,
        average_cost: 0,
        uom: ingredient.ingredient_variant?.item?.uom || 'pcs',
        movements: [],
      });
    }

    setLoadingIntel(false);
  };

  const filteredIngredients = useMemo(() => {
    if (!filter) return ingredients;
    return ingredients.filter((ing) =>
      ing.ingredient_variant?.item?.name?.toLowerCase().includes(filter.toLowerCase()) ||
      ing.ingredient_variant?.sku?.toLowerCase().includes(filter.toLowerCase())
    );
  }, [ingredients, filter]);

  const totalCost = useMemo(() => {
    return ingredients.reduce((sum, ing) => {
      const cost = (ing.ingredient_variant?.item?.cost || 0) * (ing.quantity || 0);
      return sum + cost;
    }, 0);
  }, [ingredients]);

  const selectedVariant = variants.find((v) => v.id === selectedVariantId);
  const variantName = selectedVariant
    ? `[${selectedVariant.sku}] ${itemName}${selectedVariant.attributes ? ' / ' + selectedVariant.attributes : ''}`
    : '';

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-foreground">Ingredients</h2>
        <div className="flex items-center gap-4 text-sm">
          <button className="text-primary hover:underline flex items-center gap-1">
            Compare variants{' '}
            <span className="bg-yellow-500 text-black text-xs px-1 rounded font-bold">
              BETA
            </span>
          </button>
          <span className="text-muted-foreground">
            Updatable Orders{' '}
            <span className="text-foreground bg-secondary px-1.5 py-0.5 rounded-full ml-1">
              0
            </span>
          </span>
        </div>
      </div>

      {/* Active Variant Section */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground block">Active Variant</label>
        <Select value={selectedVariantId} onValueChange={setSelectedVariantId}>
          <SelectTrigger className="w-auto min-w-[300px] h-8 text-sm bg-transparent border-transparent hover:bg-secondary/50 hover:border-border">
            <SelectValue>{variantName}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {variants.map((v) => (
              <SelectItem key={v.id} value={v.id}>
                [{v.sku}] {itemName}
                {v.attributes ? ` / ${v.attributes}` : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Any changes made here only affect the selected variant.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          per <span className="text-foreground font-medium">1 {itemUom}</span> of product
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <button className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
          <Plus className="w-4 h-4" /> Make
        </button>
        <button className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
          <Copy className="w-4 h-4" /> Copy to...
        </button>
        <button className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
          <Copy className="w-4 h-4" /> Copy from...
        </button>
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-400 transition-colors">
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>

      {/* Ingredients Table */}
      <div className="bg-background rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/10 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                <th className="p-3 w-10 text-center"></th>
                <th className="p-3 min-w-[300px]">
                  Item{' '}
                  <Info size={12} className="inline ml-1 text-muted-foreground/50" />
                </th>
                <th className="p-3 text-right w-32">
                  Quantity{' '}
                  <Info size={12} className="inline ml-1 text-muted-foreground/50" />
                </th>
                <th className="p-3 w-48">
                  Notes{' '}
                  <Info size={12} className="inline ml-1 text-muted-foreground/50" />
                </th>
                <th className="p-3 text-right w-32">
                  Stock cost{' '}
                  <Info size={12} className="inline ml-1 text-muted-foreground/50" />
                </th>
                <th className="p-3 w-10 text-center"></th>
              </tr>
              <tr className="border-b border-border bg-secondary/5">
                <td className="p-2"></td>
                <td className="p-2">
                  <input
                    type="text"
                    placeholder="Filter"
                    className="w-full px-2 py-1 text-sm bg-transparent text-muted-foreground outline-none focus:text-foreground"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                </td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {filteredIngredients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    {filter ? 'No ingredients match your filter.' : 'No ingredients found.'}
                  </td>
                </tr>
              ) : (
                filteredIngredients.map((ing, index) => (
                  <tr
                    key={ing.id}
                    className="hover:bg-secondary/20 transition-colors group"
                  >
                    {/* Drag Handle */}
                    <td className="p-3 text-center text-muted-foreground/50 cursor-grab hover:text-foreground">
                      <GripVertical size={14} />
                    </td>

                    {/* Item Name */}
                    <td className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground font-medium">
                          [{ing.ingredient_variant?.sku}] {ing.ingredient_variant?.item?.name}
                        </span>
                        <ExternalLink
                          size={12}
                          className="text-primary opacity-0 group-hover:opacity-100 cursor-pointer hover:text-primary/80 transition-opacity"
                          onClick={() =>
                            router.push(`/items/${ing.ingredient_variant?.item?.id}`)
                          }
                        />
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="p-2">
                      <div className="flex items-center justify-end gap-1">
                        <input
                          type="number"
                          step="0.00001"
                          value={ing.quantity}
                          onChange={(e) =>
                            updateIngredient(ing.id, 'quantity', parseFloat(e.target.value) || 0)
                          }
                          className="bg-transparent text-foreground text-right text-sm w-20 outline-none focus:ring-1 focus:ring-primary rounded px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="text-muted-foreground text-xs">
                          {ing.ingredient_variant?.item?.uom || 'pcs'}
                        </span>
                      </div>
                    </td>

                    {/* Notes */}
                    <td className="p-2">
                      <input
                        type="text"
                        value={ing.notes || ''}
                        onChange={(e) => updateIngredient(ing.id, 'notes', e.target.value)}
                        className="bg-transparent text-muted-foreground text-sm w-full outline-none focus:text-foreground focus:ring-1 focus:ring-primary rounded px-1"
                        placeholder=""
                      />
                    </td>

                    {/* Stock Cost */}
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-foreground text-sm">
                          {((ing.ingredient_variant?.item?.cost || 0) * ing.quantity).toFixed(5)}
                        </span>
                        <span className="text-muted-foreground text-xs">CAD</span>
                        <button
                          type="button"
                          onClick={() => openInventoryIntel(ing)}
                          className="p-1 hover:bg-secondary rounded transition-colors ml-1"
                          title="View inventory intel"
                        >
                          <Info size={12} className="text-primary hover:text-primary/80" />
                        </button>
                      </div>
                    </td>

                    {/* Delete */}
                    <td className="p-3 text-center">
                      <button
                        onClick={() => deleteIngredient(ing.id)}
                        className="text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="border-t border-border">
                <td colSpan={6} className="p-3">
                  <SearchableSelect
                    value={null}
                    options={availableIngredients}
                    onChange={(variantId) => {
                      if (variantId) {
                        addIngredient(variantId);
                      }
                    }}
                    placeholder="+ Add row"
                    searchPlaceholder="Search or create ingredient..."
                    allowCreate={false}
                    triggerClassName="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 h-auto p-0 border-0 shadow-none bg-transparent hover:bg-transparent justify-start"
                  />
                </td>
              </tr>
              <tr className="border-t border-border bg-secondary/5">
                <td colSpan={4} className="p-4 text-right text-sm font-medium text-muted-foreground">
                  Total cost:
                </td>
                <td className="p-4 text-right text-sm font-medium text-foreground">
                  {totalCost.toFixed(2)} CAD
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Inventory Intel Popup - Dark Theme */}
      {showInventoryIntel && selectedIngredient && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowInventoryIntel(false)}
          />

          {/* Modal Container */}
          <div className="relative bg-[#30302e] rounded-lg shadow-2xl w-[980px] max-w-[95vw] max-h-[85vh] overflow-hidden border border-[#3a3a38]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#3a3a38]">
              <div>
                <div className="text-xs text-[#7a7974]">Inventory Intel of</div>
                <div className="text-lg font-semibold text-[#faf9f5]">
                  [{selectedIngredient.ingredient_variant?.sku || 'N/A'}] {selectedIngredient.ingredient_variant?.item?.name || 'Unknown'}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#7a7974]">Batch #</span>
                  <select className="bg-[#1a1a18] border border-[#3a3a38] rounded px-3 py-1.5 text-sm text-[#faf9f5] focus:border-[#d97757] focus:outline-none">
                    <option>- All -</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#7a7974]">Location</span>
                  <select className="bg-[#1a1a18] border border-[#3a3a38] rounded px-3 py-1.5 text-sm text-[#faf9f5] focus:border-[#d97757] focus:outline-none">
                    <option>📍 MMH Kelowna</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInventoryIntel(false)}
                  className="p-2 hover:bg-[#3a3a38] rounded-lg transition"
                >
                  <X className="w-5 h-5 text-[#7a7974]" />
                </button>
              </div>
            </div>

            {/* Stock Summary Cards */}
            <div className="flex items-center gap-4 px-6 py-4 bg-[#262624] border-b border-[#3a3a38]">
              {/* In Stock - Highlighted when on movements tab */}
              <button
                type="button"
                onClick={() => setIntelTab('movements')}
                className={`rounded-lg px-5 py-3 min-w-[140px] text-left transition-all ${intelTab === 'movements'
                  ? 'bg-[#1a1a18] border-2 border-[#3a3a38]'
                  : 'bg-[#1a1a18] border border-[#3a3a38] hover:border-[#4a4a47]'
                  }`}
              >
                <div className={`text-xs mb-1 ${intelTab === 'movements' ? 'text-[#d97757]' : 'text-[#7a7974]'}`}>In stock</div>
                <div className="text-2xl font-bold text-[#faf9f5]">
                  {inventoryData?.in_stock?.toFixed(5) || '0'}
                </div>
                <div className="text-xs text-[#7a7974]">{inventoryData?.uom || 'pcs'}</div>
              </button>

              {/* Expected - Clickable */}
              <button
                type="button"
                onClick={() => setIntelTab('expected')}
                className={`rounded-lg px-5 py-3 min-w-[120px] text-left transition-all ${intelTab === 'expected'
                  ? 'bg-[#1a1a18] border-2 border-[#3a3a38]'
                  : 'hover:bg-[#3a3a38]'
                  }`}
              >
                <div className={`text-xs mb-1 ${intelTab === 'expected' ? 'text-[#d97757]' : 'text-[#7a7974]'}`}>Expected</div>
                <div className="text-xl font-semibold text-[#faf9f5]">
                  {inventoryData?.expected || 0} <span className="text-sm font-normal text-[#7a7974]">{inventoryData?.uom || 'pcs'}</span>
                </div>
              </button>

              {/* Committed - Clickable */}
              <button
                type="button"
                onClick={() => setIntelTab('committed')}
                className={`rounded-lg px-5 py-3 min-w-[120px] text-left transition-all ${intelTab === 'committed'
                  ? 'bg-[#1a1a18] border-2 border-[#3a3a38]'
                  : 'hover:bg-[#3a3a38]'
                  }`}
              >
                <div className={`text-xs mb-1 ${intelTab === 'committed' ? 'text-[#d97757]' : 'text-[#7a7974]'}`}>Committed</div>
                <div className="text-xl font-semibold text-[#faf9f5]">
                  {inventoryData?.committed || 0} <span className="text-sm font-normal text-[#7a7974]">{inventoryData?.uom || 'pcs'}</span>
                </div>
              </button>

              <div className="px-4 py-3">
                <div className="text-xs text-[#7a7974] mb-1">Safety stock</div>
                <div className="text-xl font-semibold text-[#faf9f5]">
                  {inventoryData?.safety_stock || 0} <span className="text-sm font-normal text-[#7a7974]">{inventoryData?.uom || 'pcs'}</span>
                </div>
              </div>

              <div className="px-4 py-3">
                <div className="text-xs text-[#7a7974] mb-1">Calculated stock</div>
                <div className="text-2xl font-bold text-[#faf9f5]">
                  {inventoryData?.calculated_stock?.toFixed(5) || '0'}
                </div>
                <div className="text-xs text-[#7a7974]">{inventoryData?.uom || 'pcs'}</div>
              </div>

              {/* Action buttons */}
              <div className="ml-auto flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-4 py-2 bg-[#3a3a38] border border-[#4a4a47] rounded-lg text-sm text-[#faf9f5] hover:bg-[#4a4a47] transition">
                  <ExternalLink size={14} />
                  Export
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-[#d97757] text-white rounded-lg text-sm hover:bg-[#ff7b6f] transition">
                  <ShoppingCart size={14} />
                  Buy
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="overflow-auto max-h-[450px]">
              {/* Movements Table */}
              {intelTab === 'movements' && (
                <table className="w-full text-sm">
                  <thead className="bg-[#30302e] sticky top-0 border-b border-[#3a3a38]">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        Movement date <Info className="w-3 h-3 inline ml-1 text-[#4a4a47]" />
                      </th>
                      <th className="text-left px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        Caused by <Info className="w-3 h-3 inline ml-1 text-[#4a4a47]" />
                      </th>
                      <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        Quantity change <Info className="w-3 h-3 inline ml-1 text-[#4a4a47]" />
                      </th>
                      <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        Cost/price per unit <Info className="w-3 h-3 inline ml-1 text-[#4a4a47]" />
                      </th>
                      <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        Balance after <Info className="w-3 h-3 inline ml-1 text-[#4a4a47]" />
                      </th>
                      <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        Value in stock after <Info className="w-3 h-3 inline ml-1 text-[#4a4a47]" />
                      </th>
                      <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        Average cost after <Info className="w-3 h-3 inline ml-1 text-[#4a4a47]" />
                      </th>
                    </tr>
                    <tr className="border-b border-[#3a3a38] bg-[#262624]">
                      <th className="px-4 py-2">
                        <input type="text" placeholder="All dates" className="w-full px-2 py-1.5 text-xs bg-[#1a1a18] border border-[#3a3a38] rounded text-[#faf9f5] placeholder-[#7a7974] focus:border-[#d97757] focus:outline-none" />
                      </th>
                      <th className="px-4 py-2">
                        <input type="text" placeholder="Filter" className="w-full px-2 py-1.5 text-xs bg-[#1a1a18] border border-[#3a3a38] rounded text-[#faf9f5] placeholder-[#7a7974] focus:border-[#d97757] focus:outline-none" />
                      </th>
                      <th className="px-4 py-2">
                        <input type="text" placeholder="Filter" className="w-full px-2 py-1.5 text-xs bg-[#1a1a18] border border-[#3a3a38] rounded text-[#faf9f5] placeholder-[#7a7974] focus:border-[#d97757] focus:outline-none" />
                      </th>
                      <th className="px-4 py-2">
                        <input type="text" placeholder="Filter" className="w-full px-2 py-1.5 text-xs bg-[#1a1a18] border border-[#3a3a38] rounded text-[#faf9f5] placeholder-[#7a7974] focus:border-[#d97757] focus:outline-none" />
                      </th>
                      <th className="px-4 py-2">
                        <input type="text" placeholder="Filter" className="w-full px-2 py-1.5 text-xs bg-[#1a1a18] border border-[#3a3a38] rounded text-[#faf9f5] placeholder-[#7a7974] focus:border-[#d97757] focus:outline-none" />
                      </th>
                      <th className="px-4 py-2">
                        <input type="text" placeholder="Filter" className="w-full px-2 py-1.5 text-xs bg-[#1a1a18] border border-[#3a3a38] rounded text-[#faf9f5] placeholder-[#7a7974] focus:border-[#d97757] focus:outline-none" />
                      </th>
                      <th className="px-4 py-2">
                        <input type="text" placeholder="Filter" className="w-full px-2 py-1.5 text-xs bg-[#1a1a18] border border-[#3a3a38] rounded text-[#faf9f5] placeholder-[#7a7974] focus:border-[#d97757] focus:outline-none" />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#30302e]">
                    {loadingIntel ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-[#7a7974]">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-[#3a3a38] border-t-[#d97757] rounded-full animate-spin" />
                            Loading...
                          </div>
                        </td>
                      </tr>
                    ) : !inventoryData?.movements || inventoryData.movements.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-[#7a7974]">
                          No stock movements found
                        </td>
                      </tr>
                    ) : (
                      inventoryData.movements.map((mov: StockMovement, idx: number) => {
                        // Parse type to create clickable link
                        const typeMatch = mov.type.match(/^(MO|PO|SO|ST|SA)-?(\d+)/i);
                        const linkType = typeMatch?.[1]?.toUpperCase();
                        const linkHref = linkType === 'MO' ? `/make?order=${typeMatch?.[2]}` :
                          linkType === 'PO' ? `/buy?order=${typeMatch?.[2]}` :
                            linkType === 'SO' ? `/sell?order=${typeMatch?.[2]}` :
                              linkType === 'ST' ? `/stock/transfers/${typeMatch?.[2]}` :
                                linkType === 'SA' ? `/stock/adjustments/${typeMatch?.[2]}` :
                                  null;

                        return (
                          <tr key={mov.id || idx} className="border-b border-[#3a3a38] hover:bg-[#3a3a38] transition-colors">
                            <td className="px-4 py-3 text-[#bebcb3]">
                              {mov.date ? new Date(mov.date).toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              }) : '-'}
                            </td>
                            <td className="px-4 py-3">
                              {linkHref ? (
                                <a href={linkHref} className="text-[#d97757] hover:text-[#ff7b6f] hover:underline">{mov.type}</a>
                              ) : (
                                <span className="text-[#d97757]">{mov.type}</span>
                              )}
                            </td>
                            <td className={`px-4 py-3 text-right ${mov.change < 0 ? 'text-[#ff7b6f]' : 'text-[#bebcb3]'}`}>
                              {mov.change}
                            </td>
                            <td className="px-4 py-3 text-right text-[#bebcb3]">{mov.price?.toFixed(5) || '0'} CAD</td>
                            {/* Balance after - red background when negative like Real Katana */}
                            <td className={`px-4 py-3 text-right ${mov.balance < 0 ? 'bg-red-900/60 text-red-400' : 'text-[#bebcb3]'}`}>
                              {mov.balance?.toFixed(5) || '0'}
                            </td>
                            {/* Value in stock - red background when negative */}
                            <td className={`px-4 py-3 text-right ${mov.value < 0 ? 'bg-red-900/60 text-red-400' : 'text-[#bebcb3]'}`}>
                              {mov.value?.toFixed(5) || '0'} CAD
                            </td>
                            <td className="px-4 py-3 text-right text-[#bebcb3]">{mov.avgCost?.toFixed(5) || '0'} CAD</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              )}

              {/* Expected Table (Purchase Orders) */}
              {intelTab === 'expected' && (
                <table className="w-full text-sm">
                  <thead className="bg-[#30302e] sticky top-0 border-b border-[#3a3a38]">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        PO Number
                      </th>
                      <th className="text-left px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        Expected Date
                      </th>
                      <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        Ordered Qty
                      </th>
                      <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        Received
                      </th>
                      <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        Remaining
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#30302e]">
                    {loadingIntel ? (
                      <tr>
                        <td colSpan={5} className="text-center py-12 text-[#7a7974]">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-[#3a3a38] border-t-[#d97757] rounded-full animate-spin" />
                            Loading...
                          </div>
                        </td>
                      </tr>
                    ) : expectedData.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-12 text-[#7a7974]">
                          No pending purchase orders found
                        </td>
                      </tr>
                    ) : (
                      expectedData.map((po) => (
                        <tr key={po.id} className="border-b border-[#3a3a38] hover:bg-[#3a3a38] transition-colors">
                          <td className="px-4 py-3">
                            <a href={`/purchasing/${po.id}`} className="text-[#d97757] hover:text-[#ff7b6f] hover:underline">{po.poNumber}</a>
                          </td>
                          <td className="px-4 py-3 text-[#bebcb3]">
                            {po.expectedDate ? new Date(po.expectedDate).toLocaleDateString() : '-'}
                          </td>
                          <td className="px-4 py-3 text-right text-[#bebcb3]">
                            {po.quantity} {inventoryData?.uom || 'pcs'}
                          </td>
                          <td className="px-4 py-3 text-right text-[#bebcb3]">
                            {po.received} {inventoryData?.uom || 'pcs'}
                          </td>
                          <td className="px-4 py-3 text-right text-[#d97757] font-medium">
                            {po.remaining} {inventoryData?.uom || 'pcs'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* Committed Table (Manufacturing Orders) */}
              {intelTab === 'committed' && (
                <table className="w-full text-sm">
                  <thead className="bg-[#30302e] sticky top-0 border-b border-[#3a3a38]">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        MO Number
                      </th>
                      <th className="text-left px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        Product
                      </th>
                      <th className="text-left px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider">
                        Quantity Required
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#30302e]">
                    {loadingIntel ? (
                      <tr>
                        <td colSpan={4} className="text-center py-12 text-[#7a7974]">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-[#3a3a38] border-t-[#d97757] rounded-full animate-spin" />
                            Loading...
                          </div>
                        </td>
                      </tr>
                    ) : committedData.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-12 text-[#7a7974]">
                          No pending manufacturing orders found
                        </td>
                      </tr>
                    ) : (
                      committedData.map((mo) => (
                        <tr key={mo.id} className="border-b border-[#3a3a38] hover:bg-[#3a3a38] transition-colors">
                          <td className="px-4 py-3">
                            <a href={`/make/${mo.id}`} className="text-[#d97757] hover:text-[#ff7b6f] hover:underline">{mo.moNumber}</a>
                          </td>
                          <td className="px-4 py-3 text-[#bebcb3]">{mo.productName}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${mo.status === 'IN_PROGRESS' ? 'bg-[#d97757]/20 text-[#d97757]' :
                              mo.status === 'NOT_STARTED' ? 'bg-[#7a7974]/20 text-[#bebcb3]' :
                                'bg-[#3a3a38] text-[#bebcb3]'
                              }`}>
                              {mo.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-[#ff7b6f] font-medium">
                            {mo.quantity} {inventoryData?.uom || 'pcs'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
