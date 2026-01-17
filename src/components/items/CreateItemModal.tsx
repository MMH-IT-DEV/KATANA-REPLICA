'use client';

import { useState, useEffect } from 'react';
import { X, Info, Package } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/Toast';

interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (item: any) => void;
  defaultType?: 'product' | 'material';
}

export const CreateItemModal = ({
  isOpen,
  onClose,
  onCreated,
  defaultType = 'material'
}: CreateItemModalProps) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'general' | 'supply'>('general');
  const [itemType] = useState<'product' | 'material'>(defaultType);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    uom: 'pcs',
    custom_field_collection: '',
    // Usability
    is_saleable: defaultType === 'product' ? true : false,
    is_purchasable: defaultType === 'material' ? true : false,
    is_producible: defaultType === 'product' ? true : false,
    // Tracking
    tracking: 'none', // 'none' | 'batch'
    // Variants
    has_variants: false,
    // Default variant
    sku: '',
    registered_barcode: '',
    internal_barcode: '',
    bin: '',
    // Additional info
    description: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  // Set correct default values based on item type
  useEffect(() => {
    if (itemType === 'material') {
      setFormData(prev => ({
        ...prev,
        is_saleable: false,      // Materials usually not sold
        is_purchasable: true,    // Materials ALWAYS purchased
        is_producible: false,
      }));
    } else if (itemType === 'product') {
      setFormData(prev => ({
        ...prev,
        is_saleable: true,       // Products usually sold
        is_purchasable: false,   // Products usually made, not bought
        is_producible: true,     // Products can be manufactured
      }));
    }
  }, [itemType]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!formData.name.trim()) {
      showToast(`${itemType === 'material' ? 'Material' : 'Product'} name is required`, 'error');
      return;
    }
    if (!formData.sku.trim()) {
      showToast('Variant code / SKU is required', 'error');
      return;
    }

    setIsSaving(true);

    try {
      // 1. Create the item
      const itemId = crypto.randomUUID();
      const { error: itemError } = await supabase
        .from('items')
        .insert({
          id: itemId,
          name: formData.name,
          sku: formData.sku,
          type: itemType,
          category_id: formData.category_id || null,
          uom: formData.uom,
          is_saleable: formData.is_saleable,
          is_purchasable: itemType === 'material' ? true : formData.is_purchasable, // Force true for materials
          is_producible: itemType === 'product' ? true : false, // Force true for products
          description: formData.description,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (itemError) {
        console.error('Failed to create item:', itemError);
        throw itemError;
      }

      // 2. Create the default variant
      const variantId = crypto.randomUUID();
      const { error: variantError } = await supabase
        .from('variants')
        .insert({
          id: variantId,
          item_id: itemId,
          sku: formData.sku,
          registered_barcode: formData.registered_barcode || null,
          internal_barcode: formData.internal_barcode || null,
          bin: formData.bin || null,
        });

      if (variantError) {
        console.error('Failed to create variant:', variantError);
        throw variantError;
      }

      showToast(`${itemType === 'material' ? 'Material' : 'Product'} created successfully`, 'success');
      onCreated({ id: itemId, name: formData.name, sku: formData.sku, type: itemType });

      // Reset form
      setFormData({
        name: '',
        category_id: '',
        uom: 'pcs',
        custom_field_collection: '',
        is_saleable: false,
        is_purchasable: defaultType === 'material' ? true : false,
        is_producible: defaultType === 'product' ? true : false,
        tracking: 'none',
        has_variants: false,
        sku: '',
        registered_barcode: '',
        internal_barcode: '',
        bin: '',
        description: '',
      });

      onClose();

    } catch (error) {
      console.error('Failed to create item:', error);
      showToast('Failed to create item', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#2a2a28] border border-border rounded-lg shadow-xl w-[900px] max-w-[95vw] mb-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-foreground font-medium text-lg">
            {itemType === 'material' ? 'Material' : 'Product'}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-red-400 text-sm">Not saved</span>
            <button onClick={onClose} className="p-1 hover:bg-secondary/50 rounded transition-colors">
              <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4 border-b border-border">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 text-sm rounded-t transition-colors ${
              activeTab === 'general'
                ? 'bg-secondary/30 text-foreground border-t border-l border-r border-border'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            General info
          </button>
          <button
            onClick={() => setActiveTab('supply')}
            className={`px-4 py-2 text-sm rounded-t transition-colors ${
              activeTab === 'supply'
                ? 'bg-secondary/30 text-foreground border-t border-l border-r border-border'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Supply details
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 divide-x divide-border">
                {/* Left Column */}
                <div className="divide-y divide-border">
                  {/* Material/Product Name */}
                  <div className="p-3">
                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                      {itemType === 'material' ? 'Material' : 'Product'} name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={`New ${itemType}`}
                      className="bg-transparent border-0 px-0 py-0 text-foreground placeholder-muted-foreground w-full outline-none focus:ring-0"
                    />
                  </div>

                  {/* Category */}
                  <div className="p-3">
                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">Category</label>
                    <input
                      type="text"
                      value={formData.category_id}
                      onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                      placeholder="Select or create category"
                      className="bg-transparent border-0 px-0 py-0 text-foreground placeholder-muted-foreground w-full outline-none focus:ring-0"
                    />
                  </div>

                  {/* Unit of Measure */}
                  <div className="p-3">
                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">Unit of measure</label>
                    <input
                      type="text"
                      value={formData.uom}
                      onChange={(e) => setFormData(prev => ({ ...prev, uom: e.target.value }))}
                      placeholder="pcs"
                      className="bg-transparent border-0 px-0 py-0 text-foreground placeholder-muted-foreground w-full outline-none focus:ring-0"
                    />
                  </div>

                  {/* Custom field collection */}
                  <div className="p-3">
                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">Custom field collection</label>
                    <select
                      value={formData.custom_field_collection}
                      onChange={(e) => setFormData(prev => ({ ...prev, custom_field_collection: e.target.value }))}
                      className="bg-transparent border-0 px-0 py-0 text-foreground w-full outline-none focus:ring-0"
                    >
                      <option value="">Select...</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="divide-y divide-border">
                  {/* Usability */}
                  <div className="p-3">
                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">Usability</label>
                    <div className="flex items-center gap-6">
                      {/* Sell checkbox - available for both */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.is_saleable}
                          onChange={(e) => setFormData(prev => ({ ...prev, is_saleable: e.target.checked }))}
                          className="w-4 h-4 rounded border-border bg-background accent-primary cursor-pointer"
                        />
                        <span className="text-foreground text-sm">Sell</span>
                      </label>

                      {/* Buy checkbox - ALWAYS ON and DISABLED for materials */}
                      <label className={`flex items-center gap-2 ${itemType === 'material' ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}>
                        <input
                          type="checkbox"
                          checked={itemType === 'material' ? true : formData.is_purchasable}
                          onChange={(e) => {
                            // Only allow change for products, not materials
                            if (itemType !== 'material') {
                              setFormData(prev => ({ ...prev, is_purchasable: e.target.checked }));
                            }
                          }}
                          disabled={itemType === 'material'}
                          className={`w-4 h-4 rounded border-border bg-background accent-primary ${itemType === 'material' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        />
                        <span className="text-foreground text-sm">Buy</span>
                      </label>
                    </div>
                  </div>

                  {/* Material Tracking */}
                  <div className="p-3">
                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">Material tracking</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tracking"
                          checked={formData.tracking === 'none'}
                          onChange={() => setFormData(prev => ({ ...prev, tracking: 'none' }))}
                          className="w-4 h-4 border-border accent-primary cursor-pointer"
                        />
                        <span className="text-foreground text-sm">No tracking</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tracking"
                          checked={formData.tracking === 'batch'}
                          onChange={() => setFormData(prev => ({ ...prev, tracking: 'batch' }))}
                          className="w-4 h-4 border-border accent-primary cursor-pointer"
                        />
                        <span className="text-foreground text-sm">Batch / lot numbers</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'supply' && (
            <div className="text-muted-foreground text-sm py-8 text-center">
              Supply details tab content (to be implemented)
            </div>
          )}

          {/* Variants Section */}
          <div className="mt-6">
            <div className="flex items-center gap-4 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.has_variants}
                  onChange={(e) => setFormData(prev => ({ ...prev, has_variants: e.target.checked }))}
                  className="w-4 h-4 rounded border-border bg-background accent-primary cursor-pointer"
                />
                <span className="text-foreground text-sm">
                  Does this {itemType} come in different colors, sizes or similar?
                </span>
              </label>
              <span className="text-muted-foreground text-sm">
                Yes, this {itemType} has multiple variants
              </span>
              <button className="ml-auto px-3 py-1.5 border border-border rounded text-muted-foreground text-sm hover:bg-secondary/50 hover:text-foreground transition-colors">
                Generate internal barcodes
              </button>
            </div>

            {/* Variant Table */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-[1fr_150px_150px_100px_80px] gap-2 px-4 py-2 border-b border-border text-xs font-medium text-muted-foreground bg-secondary/5">
                <div className="flex items-center gap-1">
                  Variant code / SKU <Info className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-1">
                  Registered barcode <Info className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-1">
                  Internal barcode <Info className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-1">
                  In stock <Info className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-1">
                  Bin <Info className="w-3 h-3" />
                </div>
              </div>
              <div className="grid grid-cols-[1fr_150px_150px_100px_80px] gap-2 px-4 py-3">
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                  placeholder="Enter SKU (e.g., OIL-001, MAT-BEESWAX)"
                  className="bg-transparent text-foreground text-sm placeholder-muted-foreground outline-none"
                />
                <input
                  type="text"
                  value={formData.registered_barcode}
                  onChange={(e) => setFormData(prev => ({ ...prev, registered_barcode: e.target.value }))}
                  className="bg-transparent text-foreground text-sm outline-none"
                />
                <input
                  type="text"
                  value={formData.internal_barcode}
                  onChange={(e) => setFormData(prev => ({ ...prev, internal_barcode: e.target.value }))}
                  className="bg-transparent text-foreground text-sm outline-none"
                />
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  0 {formData.uom}
                </div>
                <input
                  type="text"
                  value={formData.bin}
                  onChange={(e) => setFormData(prev => ({ ...prev, bin: e.target.value }))}
                  className="bg-transparent text-foreground text-sm outline-none"
                />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-2">
              Additional info <Info className="w-3 h-3" />
            </label>
            <div className="border border-border rounded-lg overflow-hidden">
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Type comment here"
                rows={4}
                className="w-full px-3 py-3 bg-transparent text-foreground placeholder-muted-foreground outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItemModal;
