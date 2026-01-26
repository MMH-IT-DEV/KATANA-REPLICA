'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Printer,
    MoreVertical,
    X,
    Plus,
    Info,
    Maximize2,
    Bold,
    Italic,
    Underline,
    Link as LinkIcon,
    List,
    ListOrdered,
    ChevronDown,
    ExternalLink,
    Trash2,
    Copy,
    Archive,
    Check,
    Cloud,
    Loader2,
    ScanBarcode,
    // New icons
    Package,
    Factory,
    ShoppingCart,
    Calendar,
    Search,
    Settings2,
    MoreHorizontal,
    GripVertical,
    Box,
    Grid,
    Cog,
    FileText,
    MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DeleteConfirmDialog } from '@/components/ui/DeleteConfirmDialog';
import {
    fetchKatanaItemDetails,
    fetchKatanaRecipe,
    fetchKatanaOperations,
    fetchUsedInBOMs,
    updateKatanaItemDetails,
    updateKatanaItemVariant,
    searchKatanaItems,
    addRecipeIngredient,
    deleteRecipeIngredient,
    addOperation,
    deleteOperation,
    fetchKatanaCategories,
    createKatanaCategory,
    fetchKatanaUOMs,
    KatanaProductDetails,
    RecipeIngredient,
    ProductionOperation,
    UsedInBOM,
    generateKatanaVariants,
    // New imports
    fetchWarehouses,
    fetchVariantBins,
    updateVariantBin,
    createManufacturingOrder,
    createSalesOrder,
    deleteVariant,
    deleteKatanaItem,
    updateRecipeIngredient,
    copyRecipeTo,
    copyRecipeFrom,
    updateOperation,
    copyOperationsFrom,
    fetchVariantsWithRecipes,
    duplicateKatanaItem,
    createKatanaItem,
    searchProductsWithRecipes,
    fetchKatanaSuppliers,
    Warehouse,
    fetchStockMovements,
    StockMovement,
    updateItemPurchaseUOM,
    // Item-level operations
    ItemProductionOperation,
    fetchProductOperations,
    createProductOperation,
    updateProductOperationField,
    deleteProductOperationById,
    updateOperationSequence,
    fetchResourcesList,
    fetchOperationsList,
    copyProductOperationsFrom
} from '@/lib/katana-data-provider';
import { supabase } from '@/lib/supabaseClient';
import { createKatanaVariant } from '@/lib/katana-variant-actions';
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { DatePicker } from "@/components/ui/DatePicker";
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { CreatableCombobox } from '@/components/ui/creatable-combobox';
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectSeparator,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { TagInput } from '@/components/ui/tag-input';
import { Shell } from '@/components/layout/Shell';
import { InlineEdit } from '@/components/ui/InlineEdit';
import { SearchableSelect } from '@/components/ui/SearchableSelect';



// Default operation options for the Production Operations dropdown
const DEFAULT_OPERATION_OPTIONS = [
    'PREPARATION',
    'COOKING',
    'ASSEMBLY',
    'LABELLING',
    'PACKAGING',
    'COOK AND FILL',
    'LAYING JARS',
    'CLOSING JARS',
    'LABELLING JARS',
    'LAYING TUBES',
    'CLOSING TUBES',
    'SHIP FOR AMAZON',
    'FOLD BOXES',
    'BOXING JARS',
    'STORING',
    'PREPARING FOR PRODUCTION',
    'COOKING AND FILLING',
    'PREPPING, COOKING AND FILLING',
    'CLOSING AND STORING JARS',
];

// Default resource options for the Resource dropdown
const DEFAULT_RESOURCE_OPTIONS = [
    'KITCHEN',
    'PREPARATION ZONE',
    'POURING ISLAND',
    'LABELLING ZONE',
    'ASSEMBLY ZONE',
    'PACKAGING ZONE',
];

export default function ItemDetailPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id as string;
    const typeRaw = searchParams.get('type') || 'Product';
    const type = typeRaw.toLowerCase() as 'product' | 'material';

    // Drag-to-Scroll State
    const variantsTableRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const startPosRef = useRef({ x: 0, y: 0 });
    const scrollStartRef = useRef({ left: 0, top: 0 });
    const wasDraggingRef = useRef(false);

    // Momentum State
    const velocity = useRef({ x: 0, y: 0 });
    const lastMoveTime = useRef(0);
    const lastPosRef = useRef({ x: 0, y: 0 });
    const rafId = useRef<number>(0);

    // Drag-to-Scroll Handlers
    const onMouseDown = (e: React.MouseEvent) => {
        if (!variantsTableRef.current) return;
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('[role="combobox"]')) return;

        // Stop any existing momentum
        cancelAnimationFrame(rafId.current);

        isDraggingRef.current = true;
        wasDraggingRef.current = false;

        const x = e.pageX;
        const y = e.pageY;

        startPosRef.current = { x, y };
        lastPosRef.current = { x, y };
        scrollStartRef.current = {
            left: variantsTableRef.current.scrollLeft,
            top: variantsTableRef.current.scrollTop
        };

        velocity.current = { x: 0, y: 0 };
        lastMoveTime.current = Date.now();
    };

    const onMouseLeave = () => {
        if (isDraggingRef.current) {
            isDraggingRef.current = false;
            startMomentum();
        }
    };

    const onMouseUp = () => {
        if (isDraggingRef.current) {
            isDraggingRef.current = false;
            startMomentum();
        }
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDraggingRef.current || !variantsTableRef.current) return;
        e.preventDefault();

        const x = e.pageX;
        const y = e.pageY;

        const now = Date.now();
        const dt = now - lastMoveTime.current;

        // Calculate raw distance from start
        const rawDeltaX = x - startPosRef.current.x;
        const rawDeltaY = y - startPosRef.current.y;

        // Dead Zone Logic
        if (!wasDraggingRef.current) {
            if (Math.abs(rawDeltaX) > 5 || Math.abs(rawDeltaY) > 5) {
                wasDraggingRef.current = true;
                startPosRef.current = { x, y };
                scrollStartRef.current = {
                    left: variantsTableRef.current.scrollLeft,
                    top: variantsTableRef.current.scrollTop
                };
            } else {
                return;
            }
        }

        const deltaX = x - startPosRef.current.x;

        // Apply scroll with damping (Horizontal only)
        const newScrollLeft = scrollStartRef.current.left - deltaX;

        variantsTableRef.current.scrollLeft = newScrollLeft;

        // Calculate velocity for momentum
        if (dt > 0 && dt < 100) {
            const movementX = x - lastPosRef.current.x;
            const newVelX = -movementX / dt;

            velocity.current = {
                x: newVelX * 0.5 + velocity.current.x * 0.5,
                y: 0
            };
        }

        lastPosRef.current = { x, y };
        lastMoveTime.current = now;
    };

    const startMomentum = () => {
        if (!variantsTableRef.current) return;

        const friction = 0.95;
        let velX = velocity.current.x * 10; // Boost momentum

        const step = () => {
            if (!variantsTableRef.current) return;

            if (Math.abs(velX) < 0.1) return;

            variantsTableRef.current.scrollLeft -= velX;
            velX *= friction;

            rafId.current = requestAnimationFrame(step);
        };

        rafId.current = requestAnimationFrame(step);
    };

    const [item, setItem] = useState<KatanaProductDetails | null>(null);
    const itemRef = useRef(item);
    useEffect(() => {
        itemRef.current = item;
    }, [item]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('General info');
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
    const isInitialMount = useRef(true);

    // Local state for edits
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [uom, setUom] = useState('');
    const [customCollection, setCustomCollection] = useState('');

    // Usability State
    const [usability, setUsability] = useState({
        sell: false,
        buy: false,
        make: false,
        kit: false
    });

    // Tracking State
    const [tracking, setTracking] = useState<'none' | 'batch' | 'serial'>('none');
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        variant: true,
        sku: true,
        salesPrice: true,
        registeredBarcode: true,
        internalBarcode: true,
        ingredientsCost: true,
        operationsCost: true,
        purchasePrice: true,
        inStock: true,
        bin: true,
    });

    // Variant Edit Handler
    const handleVariantUpdate = useCallback(async (variantId: string, field: string, value: string | number, skipOptimistic = false) => {
        const currentVariant = itemRef.current?.variants.find(v => v.id === variantId);
        if (!currentVariant) return;

        // Prevent saving empty SKU (silently reject, no popup)
        if (field === 'sku' && (!value || String(value).trim() === '')) {
            setSaveStatus('unsaved');
            return;
        }

        // Save previous value for revert
        const previousValue = (currentVariant as any)[field];

        // 1. Optimistic Update
        if (!skipOptimistic) {
            setItem(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    variants: prev.variants.map(v => {
                        if (v.id === variantId) {
                            return { ...v, [field]: value };
                        }
                        return v;
                    })
                };
            });
        }

        // 2. Save
        setSaveStatus('saving');

        try {
            const updates: any = {};
            updates[field] = value;

            const success = await updateKatanaItemVariant(variantId, updates);

            if (success) {
                setSaveStatus('saved');
            } else {
                // REVERT
                setItem(prev => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        variants: prev.variants.map(v => {
                            if (v.id === variantId) {
                                return { ...v, [field]: previousValue };
                            }
                            return v;
                        })
                    };
                });
                setSaveStatus('unsaved');
                alert(`Failed to save ${field}. If you changed the SKU, it might already be in use.`);
            }
        } catch (error) {
            console.error("Save failed:", error);
            // REVERT
            setItem(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    variants: prev.variants.map(v => {
                        if (v.id === variantId) {
                            return { ...v, [field]: previousValue };
                        }
                        return v;
                    })
                };
            });
            setSaveStatus('unsaved');
        }
    }, [id, type]);

    const handleDelete = async () => {
        if (!item || id === 'new') {
            console.log('[Items] Delete aborted: item is null or id is "new"');
            return;
        }
        setShowItemDeleteConfirm(true);
    };

    const confirmItemDelete = async () => {
        if (!item || id === 'new') return;

        console.log('[Items] Action: Deleting product:', id);
        setSaveStatus('saving');

        try {
            const res = await deleteKatanaItem(id);

            if (!res.success) {
                console.error('[Items] Error: Delete failed:', res.error);
                throw new Error(res.error || 'Failed to delete product');
            }

            console.log('[Items] Action: Product deleted successfully');
            router.push('/items');
        } catch (err: any) {
            console.error('[Items] Action: Delete failed:', err);
            alert(err.message || 'Failed to delete product');
            setSaveStatus('unsaved');
        }
    };

    const handleGenerateBarcodes = async () => {
        if (!item) return;

        console.log('[Items] Action: Generating internal barcodes for variants');
        setSaveStatus('saving');

        try {
            let count = 0;
            const updatedVariants = await Promise.all(item.variants.map(async (v) => {
                // Only generate if empty or '-'
                if (!v.internalBarcode || v.internalBarcode === '-') {
                    const newBarcode = Math.floor(10000000 + Math.random() * 90000000).toString();
                    const success = await updateKatanaItemVariant(v.id, { internalBarcode: newBarcode });
                    if (success) {
                        count++;
                        return { ...v, internalBarcode: newBarcode };
                    }
                }
                return v;
            }));

            if (count > 0) {
                setItem({ ...item, variants: updatedVariants });
                console.log(`[Items] Action: Generated ${count} barcodes`);
            } else {
                console.log('[Items] Action: No variants needed new barcodes');
            }

            setSaveStatus('saved');
        } catch (error) {
            console.error('[Items] Action: Generate barcodes failed:', error);
            setSaveStatus('unsaved');
            alert('Failed to generate barcodes');
        }
    };

    const debouncedVariantUpdate = useMemo(
        () => debounce((variantId: string, field: string, value: string | number) => {
            handleVariantUpdate(variantId, field, value, true); // Skip optimistic inside debounce
        }, 500),
        [handleVariantUpdate]
    );

    const updateVariantOptimistically = useCallback((variantId: string, field: string, value: string | number) => {
        setItem(prev => {
            if (!prev) return null;
            return {
                ...prev,
                variants: prev.variants.map(v => {
                    if (v.id === variantId) {
                        return { ...v, [field]: value };
                    }
                    return v;
                })
            };
        });
    }, []);

    // Update variant supply details (supplier item code, lead time, MOQ, purchase price)
    const handleUpdateVariantSupplyField = useCallback(async (variantId: string, field: string, value: string | number | null) => {
        // Map field names to local state keys
        const fieldMapping: Record<string, string> = {
            'supplier_item_code': 'supplierItemCode',
            'default_lead_time': 'leadTime',
            'moq': 'moq',
            'purchase_price': 'purchasePrice'
        };

        const localField = fieldMapping[field] || field;

        // Optimistic update
        setItem(prev => {
            if (!prev) return null;
            return {
                ...prev,
                variants: prev.variants.map(v => {
                    if (v.id === variantId) {
                        return { ...v, [localField]: value };
                    }
                    return v;
                })
            };
        });

        // Save to database
        setSaveStatus('saving');
        console.log('💾 Updating variant supply field:', { variantId, field, value });

        const { data, error } = await supabase
            .from('variants')
            .update({ [field]: value })
            .eq('id', variantId)
            .select();

        if (error) {
            console.error('❌ Failed to update variant supply field:', {
                field,
                value,
                variantId,
                error: JSON.stringify(error),
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
            });
            setSaveStatus('unsaved');
        } else {
            console.log('✅ Variant supply field updated:', data);
            setSaveStatus('saved');
        }
    }, []);

    // Clean up debounced function on unmount
    useEffect(() => {
        return () => {
            debouncedVariantUpdate.cancel();
        };
    }, [debouncedVariantUpdate]);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

    // Context Menu Handler
    useEffect(() => {
        const handleClick = () => setContextMenu(null);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    // Rich Text State
    const [additionalInfo, setAdditionalInfo] = useState("");

    // Recipe & Operations State
    const [activeVariantId, setActiveVariantId] = useState<string | null>(null);
    const [recipeItems, setRecipeItems] = useState<RecipeIngredient[]>([]);
    const [operations, setOperations] = useState<ProductionOperation[]>([]);
    const [usedInBOMs, setUsedInBOMs] = useState<UsedInBOM[]>([]);

    // Item-level Production Operations State
    const [productOperations, setProductOperations] = useState<ItemProductionOperation[]>([]);
    const [availableResources, setAvailableResources] = useState<{ id: string; name: string; defaultCostPerHour: number }[]>([]);
    const [availableOperations, setAvailableOperations] = useState<string[]>([]);
    const [draggedOperationIndex, setDraggedOperationIndex] = useState<number | null>(null);
    const [dragOverOperationIndex, setDragOverOperationIndex] = useState<number | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null); // operation ID to delete
    const [showItemDeleteConfirm, setShowItemDeleteConfirm] = useState(false);
    const [activeTimePicker, setActiveTimePicker] = useState<string | null>(null); // operation ID with open time picker
    const [activeOperationPicker, setActiveOperationPicker] = useState<string | null>(null); // operation ID with open operation picker
    const [operationSearchQuery, setOperationSearchQuery] = useState('');
    const [operationOptions, setOperationOptions] = useState<string[]>(DEFAULT_OPERATION_OPTIONS); // Dynamic list of operations
    const [activeResourcePicker, setActiveResourcePicker] = useState<string | null>(null); // operation ID with open resource picker
    const [resourceSearchQuery, setResourceSearchQuery] = useState('');
    const [resourceOptions, setResourceOptions] = useState<string[]>(DEFAULT_RESOURCE_OPTIONS); // Dynamic list of resources
    const [activeTypePicker, setActiveTypePicker] = useState<string | null>(null); // operation ID with open type picker
    const [activeVariantPicker, setActiveVariantPicker] = useState<string | null>(null); // operation ID with open variant picker
    // Track which variants each operation applies to: { operationId: { allSelected: true, variantIds: [...] } }
    const [operationVariantSelections, setOperationVariantSelections] = useState<Record<string, { allSelected: boolean; variantIds: string[] }>>({});

    // Supply Details State
    const [purchasingInDiffUom, setPurchasingInDiffUom] = useState(false);
    const [purchaseUom, setPurchaseUom] = useState<string | null>(null);
    const [purchaseUomConversionRate, setPurchaseUomConversionRate] = useState(1);

    // Handler for updating purchase UOM
    const handleUpdatePurchaseUOM = useCallback(async (newUom: string | null, newRate: number) => {
        if (!item) return;

        setSaveStatus('saving');
        const { error } = await updateItemPurchaseUOM(item.id, newUom, newRate);

        if (error) {
            console.error('Failed to update purchase UOM:', error);
            setSaveStatus('unsaved');
        } else {
            setSaveStatus('saved');
        }
    }, [item]);

    // Combobox Options
    const [categoryOptions, setCategoryOptions] = useState<{ label: string, value: string }[]>([]);
    const [uomOptions, setUomOptions] = useState<{ label: string, value: string }[]>([]);
    const [supplierOptions, setSupplierOptions] = useState<{ label: string, value: string, id: string, currency: string }[]>([]);

    // Bulk Edit State
    const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
    const [showEditMenu, setShowEditMenu] = useState(false);
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [priceAdjustmentType, setPriceAdjustmentType] = useState<'new' | 'percentage' | 'flat'>('new');
    const [priceAdjustmentValue, setPriceAdjustmentValue] = useState('');
    const [isVariantConfigOpen, setIsVariantConfigOpen] = useState(false);
    const [isCopyingConfig, setIsCopyingConfig] = useState(false);
    const [isUpdatingConfig, setIsUpdatingConfig] = useState(false);
    const [variantConfigs, setVariantConfigs] = useState<{ name: string, values: string }[]>([
        { name: '', values: '' }
    ]);

    // === NEW MODAL STATES ===
    // Bin Modal
    const [isBinModalOpen, setIsBinModalOpen] = useState(false);
    const [binModalVariant, setBinModalVariant] = useState<any>(null);
    const [warehouseBins, setWarehouseBins] = useState<{ warehouseId: string; warehouseName: string; bin: string | null }[]>([]);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

    // Make (MO) Modal
    const [isMakeModalOpen, setIsMakeModalOpen] = useState(false);
    const [makeModalVariant, setMakeModalVariant] = useState<any>(null);
    const [moQuantity, setMoQuantity] = useState('1');
    const [moDeadline, setMoDeadline] = useState(new Date().toISOString().split('T')[0]);
    const [moLocation, setMoLocation] = useState('wh-1');
    const [moCreateSubassemblies, setMoCreateSubassemblies] = useState(false);

    // Sell (SO) Modal
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);
    const [sellModalVariant, setSellModalVariant] = useState<any>(null);
    const [soQuantity, setSoQuantity] = useState('1');
    const [soCustomer, setSoCustomer] = useState('');
    const [soDeadline, setSoDeadline] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + 14);
        return d.toISOString().split('T')[0];
    });
    const [soLocation, setSoLocation] = useState('wh-1');

    // Delete Confirmation Modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteModalVariant, setDeleteModalVariant] = useState<any>(null);

    // Copy To Modal (BOM)
    const [isCopyToModalOpen, setIsCopyToModalOpen] = useState(false);
    const [copyToTargets, setCopyToTargets] = useState<string[]>([]);
    const [copyToVariants, setCopyToVariants] = useState<{ id: string; sku: string; name: string; hasRecipe: boolean }[]>([]);
    const [copyToSearch, setCopyToSearch] = useState('');
    const [copyToStep, setCopyToStep] = useState<1 | 2>(1);

    // Inventory Intel Modal (Stock cost info)
    const [showInventoryIntel, setShowInventoryIntel] = useState(false);
    const [selectedIngredientForIntel, setSelectedIngredientForIntel] = useState<RecipeIngredient | null>(null);
    const [loadingInventoryIntel, setLoadingInventoryIntel] = useState(false);
    const [inventoryIntelData, setInventoryIntelData] = useState<{
        inStock: number;
        expected: number;
        committed: number;
        safetyStock: number;
        calculatedStock: number;
        averageCost: number;
        uom: string;
        movements: StockMovement[];
    } | null>(null);
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

    // Batch tracking for Inventory Intel
    const [ingredientBatchTracked, setIngredientBatchTracked] = useState(false);
    const [ingredientBatches, setIngredientBatches] = useState<Array<{
        id: string;
        batchNumber: string;
    }>>([]);
    const [selectedBatchFilter, setSelectedBatchFilter] = useState<string>('all');

    // Item type and usability for Inventory Intel Make/Buy buttons
    const [ingredientItemType, setIngredientItemType] = useState<'Product' | 'Material' | null>(null);
    const [ingredientCanBuy, setIngredientCanBuy] = useState(false);
    const [ingredientCanMake, setIngredientCanMake] = useState(false);

    // New Purchase Order Modal
    const [showNewPOModal, setShowNewPOModal] = useState(false);
    const [newPOData, setNewPOData] = useState({
        variantId: '',
        productName: '',
        calculatedStock: 0,
        quantity: 1,
        uom: 'pcs',
        supplier: '',
        poNumber: '',
        expectedArrival: '',
        shipTo: 'MMH Kelowna',
        addOtherMissing: false
    });
    const [suppliers, setSuppliers] = useState<Array<{ id: string; name: string }>>([]);
    const [creatingPO, setCreatingPO] = useState(false);

    // Usability Confirmation Dialog
    const [showUsabilityConfirm, setShowUsabilityConfirm] = useState(false);
    const [usabilityConfirmAction, setUsabilityConfirmAction] = useState<{
        type: 'sell' | 'buy' | 'make' | 'kit';
        newValue: boolean;
    } | null>(null);

    // Copy From Modal (BOM)
    const [isCopyFromModalOpen, setIsCopyFromModalOpen] = useState(false);
    const [copyFromSearch, setCopyFromSearch] = useState('');
    const [copyFromResults, setCopyFromResults] = useState<{ variantId: string; name: string; sku: string }[]>([]);
    const [copyFromSelected, setCopyFromSelected] = useState<string | null>(null);

    // Operations State
    const [operationsInSequence, setOperationsInSequence] = useState(false);
    const [editingOperationId, setEditingOperationId] = useState<string | null>(null);

    // Copy Operations From Modal
    const [isCopyOpsFromModalOpen, setIsCopyOpsFromModalOpen] = useState(false);
    const [copyOpsFromSearch, setCopyOpsFromSearch] = useState('');
    const [copyOpsFromResults, setCopyOpsFromResults] = useState<{ variantId: string; name: string; sku: string }[]>([]);



    // Initialize configs from existing item variants on load
    useEffect(() => {
        if (item) {
            if (item.variantOptionDefinitions && item.variantOptionDefinitions.length > 0) {
                // FIX Task #63: Use the explicitly saved configuration from the database
                setVariantConfigs(item.variantOptionDefinitions);
            } else if (item.variants.length > 0 && item.variantConfig) {
                // Legacy Fallback: Derive from existing variants
                const newConfigs: { name: string; values: string }[] = [];

                item.variantConfig.forEach((name, index) => {
                    const values = new Set(item.variants.map(v => {
                        if (index === 0) return v.option1Value;
                        if (index === 1) return v.option2Value;
                        if (index === 2) return v.option3Value;
                        return '';
                    }).filter(Boolean));
                    newConfigs.push({ name, values: Array.from(values).join(', ') });
                });

                if (newConfigs.length > 0) {
                    setVariantConfigs(newConfigs);
                }
            }
        }
    }, [item]);

    const [draftVariantConfigs, setDraftVariantConfigs] = useState<{ name: string; values: string }[]>([]);

    useEffect(() => {
        if (isVariantConfigOpen) {
            setDraftVariantConfigs(JSON.parse(JSON.stringify(variantConfigs)));
        }
    }, [isVariantConfigOpen, variantConfigs]);

    const handleAddVariantConfig = () => {
        if (draftVariantConfigs.length < 3) {
            setDraftVariantConfigs([...draftVariantConfigs, { name: '', values: '' }]);
        }
    };

    const handleRemoveVariantConfig = (index: number) => {
        const newConfigs = [...draftVariantConfigs];
        newConfigs.splice(index, 1);
        setDraftVariantConfigs(newConfigs);
    };

    const handleUpdateVariantConfig = (index: number, field: 'name' | 'values', val: string) => {
        const newConfigs = [...draftVariantConfigs];
        newConfigs[index] = { ...newConfigs[index], [field]: val };
        setDraftVariantConfigs(newConfigs);
    };


    const handleGenerateVariants = async () => {
        setIsUpdatingConfig(true);
        try {
            const success = await generateKatanaVariants(id, draftVariantConfigs);
            if (success) {
                // Reload item to see new variants
                const data = await fetchKatanaItemDetails(id);
                if (data) setItem(data);
                setIsVariantConfigOpen(false);
            }
        } catch (error) {
            console.error('Update failed:', error);
        } finally {
            setIsUpdatingConfig(false);
        }
    };

    // Add Variant Row
    const handleAddVariantRow = async () => {
        console.log('➕ handleAddVariantRow called, id:', id);
        if (!id) {
            console.log('❌ No id, returning');
            return;
        }

        // Prepare configs based on current setup
        const currentConfigs = variantConfigs.map(c => ({ name: c.name }));
        console.log('📋 variantConfigs:', variantConfigs);
        console.log('📋 currentConfigs:', currentConfigs);

        if (currentConfigs.length === 0) {
            // Default if no config
            currentConfigs.push({ name: 'Variant' });
            console.log('📋 Using default config:', currentConfigs);
        }

        console.log('🚀 Calling createKatanaVariant...');
        const success = await createKatanaVariant(id, currentConfigs);
        console.log('✅ createKatanaVariant result:', success);

        if (success) {
            // Reload
            console.log('🔄 Reloading item details...');
            const data = await fetchKatanaItemDetails(id);
            console.log('📥 Reloaded data:', data ? `${data.variants.length} variants` : 'null');
            if (data) {
                setItem(prev => {
                    if (!prev) return data;
                    // Preserve local unsaved edits (like SKU) for existing variants
                    const mergedVariants = data.variants.map(newV => {
                        const localV = prev.variants.find(oldV => oldV.id === newV.id);
                        if (localV) {
                            return {
                                ...newV,
                                option1Value: localV.option1Value,
                                option2Value: localV.option2Value,
                                option3Value: localV.option3Value,
                                sku: localV.sku,
                                salesPrice: localV.salesPrice,
                                purchasePrice: localV.purchasePrice,
                                registeredBarcode: localV.registeredBarcode,
                                internalBarcode: localV.internalBarcode
                            };
                        }
                        return newV;
                    });
                    return { ...data, variants: mergedVariants };
                });
            }
        } else {
            console.log('❌ createKatanaVariant failed');
        }
    };

    const handleUpdateVariantOption = async (variantId: string, optionIndex: number, value: string) => {
        // Optimistic
        setItem(prev => {
            if (!prev) return null;
            return {
                ...prev,
                variants: prev.variants.map(v => {
                    if (v.id === variantId) {
                        const updates: any = {};
                        // We need to map optionIndex (0, 1, 2) to option1Value, etc.
                        if (optionIndex === 0) updates.option1Value = value;
                        if (optionIndex === 1) updates.option2Value = value;
                        if (optionIndex === 2) updates.option3Value = value;
                        return { ...v, ...updates };
                    }
                    return v;
                })
            };
        });

        setSaveStatus('saving');

        // Map optionIndex to database column name
        const dbFieldMap: Record<number, string> = {
            0: 'option1_value',
            1: 'option2_value',
            2: 'option3_value'
        };
        const dbField = dbFieldMap[optionIndex];

        if (dbField) {
            const success = await updateKatanaItemVariant(variantId, { [dbField]: value });
            if (success) {
                setSaveStatus('saved');
            } else {
                setSaveStatus('unsaved');
            }
        }
    };
    const [filterBomProduct, setFilterBomProduct] = useState('');
    const [filterIngredients, setFilterIngredients] = useState('');

    // Add Ingredient State
    const [isAddingIngredient, setIsAddingIngredient] = useState(false);
    const [ingredientSearch, setIngredientSearch] = useState('');
    const [ingredientResults, setIngredientResults] = useState<any[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState<any>(null);
    const [ingredientQuantity, setIngredientQuantity] = useState('');
    const [ingredientOpen, setIngredientOpen] = useState(false);

    // Drag and Drop State for Ingredients
    const [draggedIngredientIndex, setDraggedIngredientIndex] = useState<number | null>(null);
    const [dragOverIngredientIndex, setDragOverIngredientIndex] = useState<number | null>(null);

    // Add Operation State
    const [isAddingOperation, setIsAddingOperation] = useState(false);
    const [newOpName, setNewOpName] = useState('');
    const [newOpResource, setNewOpResource] = useState('');
    const [newOpCost, setNewOpCost] = useState('');
    const [newOpDuration, setNewOpDuration] = useState('');

    // Load Search Results - Also load initial results when adding ingredient
    useEffect(() => {
        const loadResults = async () => {
            // Load results for search term - search both materials AND products for BOM ingredients
            // Don't pass type filter to allow all item types as ingredients
            const results = await searchKatanaItems(ingredientSearch || '');
            setIngredientResults(results);
        };

        if (isAddingIngredient) {
            const timer = setTimeout(loadResults, ingredientSearch ? 300 : 0);
            return () => clearTimeout(timer);
        }
    }, [ingredientSearch, isAddingIngredient]);

    useEffect(() => {
        async function loadOptions() {
            const cats = await fetchKatanaCategories();
            setCategoryOptions(cats.map((c: any) => ({ label: c.name, value: c.id })));

            const uoms = await fetchKatanaUOMs();
            setUomOptions(uoms.map((u: string) => ({ label: u, value: u })));

            const supps = await fetchKatanaSuppliers();
            setSupplierOptions(supps.map((s: any) => ({ label: s.name, value: s.id, id: s.id, currency: s.currency })));
        }
        loadOptions();
    }, []);

    const handleCreateCategory = async (val: string) => {
        // Check for duplicates locally first
        const normalizedVal = val.trim();
        if (categoryOptions.some(opt => opt?.value?.toLowerCase() === normalizedVal.toLowerCase())) {
            // Already exists
            setCategory(categoryOptions.find(opt => opt?.value?.toLowerCase() === normalizedVal.toLowerCase())?.value || normalizedVal);
            return;
        }

        const newId = await createKatanaCategory(normalizedVal);
        if (newId) {
            // Check again if it was added in the meantime or if fetch returns existing
            if (!categoryOptions.some(opt => opt.value === newId)) {
                setCategoryOptions(prev => [...prev, { label: normalizedVal, value: newId }]);
            }
            setCategory(newId);
        }
    };

    const handleCreateUom = async (val: string) => {
        const normalizedVal = val.trim();
        if (uomOptions.some(opt => opt?.value?.toLowerCase() === normalizedVal.toLowerCase())) {
            setUom(uomOptions.find(opt => opt?.value?.toLowerCase() === normalizedVal.toLowerCase())?.value || normalizedVal);
            return;
        }

        setUomOptions(prev => [...prev, { label: normalizedVal, value: normalizedVal }]);
        setUom(normalizedVal);
    };

    const handleAddIngredient = async () => {
        if (activeVariantId && selectedIngredient && ingredientQuantity) {
            const success = await addRecipeIngredient(activeVariantId.toString(), selectedIngredient.variantId, parseFloat(ingredientQuantity));
            if (success) {
                setIsAddingIngredient(false);
                setSelectedIngredient(null);
                setIngredientQuantity('');
                setIngredientSearch('');
                setIngredientOpen(false);
                // Reload
                const data = await fetchKatanaRecipe(activeVariantId.toString());
                setRecipeItems(data);
            }
        }
    };

    // Quick add ingredient - called when selecting from dropdown
    const handleQuickAddIngredient = async (item: any) => {
        console.log('[Ingredient Debug] START - selecting ingredient');
        console.log('[Ingredient Debug] ingredient:', JSON.stringify(item));
        console.log('[Ingredient Debug] activeVariantId:', activeVariantId);

        if (!activeVariantId) {
            console.log('[Ingredient Debug] No activeVariantId, returning');
            return;
        }

        // [VARIANT ID CHECK]
        console.log('[VARIANT ID CHECK] activeVariantId:', activeVariantId);
        console.log('[VARIANT ID CHECK] Type:', typeof activeVariantId);
        console.log('[VARIANT ID CHECK] Is UUID format:', /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(activeVariantId));

        const qty = parseFloat(ingredientQuantity) || 1;
        console.log('[Ingredient Debug] Adding ingredient:', { variantId: activeVariantId, itemVariantId: item.variantId, qty });

        try {
            const success = await addRecipeIngredient(activeVariantId.toString(), item.variantId, qty);
            if (success) {
                // Reset state
                setIsAddingIngredient(false);
                setSelectedIngredient(null);
                setIngredientQuantity('1');
                setIngredientSearch('');
                // Reload recipe
                const data = await fetchKatanaRecipe(activeVariantId.toString());
                setRecipeItems(data);
            }
        } catch (error) {
            console.error('[Ingredient Debug] ERROR:', error);
        }
        console.log('[Ingredient Debug] END');
    };

    const handleDeleteIngredient = async (ing: RecipeIngredient) => {
        if (activeVariantId) {
            const success = await deleteRecipeIngredient(activeVariantId.toString(), ing.variantId.toString());
            if (success) {
                setRecipeItems(prev => prev.filter(i => i.variantId !== ing.variantId));
            }
        }
    };

    const handleAddOperation = async () => {
        if (activeVariantId && newOpName && newOpResource) {
            const success = await addOperation(activeVariantId.toString(), {
                name: newOpName,
                resource: newOpResource,
                costPerHour: parseFloat(newOpCost) || 0,
                duration: parseFloat(newOpDuration) || 0
            });
            if (success) {
                setIsAddingOperation(false);
                setNewOpName('');
                setNewOpResource('');
                setNewOpCost('');
                setNewOpDuration('');
                // Reload
                const data = await fetchKatanaOperations(activeVariantId.toString());
                setOperations(data);
            }
        }
    };

    const handleDeleteOperation = async (opId: string) => {
        const success = await deleteOperation(opId);
        if (success) {
            setOperations(prev => prev.filter(o => o.id !== opId));
        }
    };

    // === ITEM-LEVEL PRODUCTION OPERATIONS HANDLERS ===

    // Load item-level operations when tab becomes active
    const loadItemOperations = useCallback(async () => {
        if (!item?.id) return;
        const ops = await fetchProductOperations(item.id);
        setProductOperations(ops);
    }, [item?.id]);

    // Load available resources and operations for dropdowns
    const loadOperationsAndResources = useCallback(async () => {
        const [resources, operations] = await Promise.all([
            fetchResourcesList(),
            fetchOperationsList()
        ]);
        setAvailableResources(resources);
        setAvailableOperations(operations);
    }, []);

    // Add new item-level operation row
    const handleAddItemOperation = async () => {
        console.log('➕ handleAddItemOperation called');
        console.log('➕ Item ID:', item?.id);
        console.log('➕ Current operations count:', productOperations.length);

        if (!item?.id) {
            console.log('❌ No item ID, returning early');
            return;
        }

        const nextSequence = productOperations.length;
        console.log('➕ Next sequence:', nextSequence);
        console.log('➕ Calling createProductOperation...');

        const { data, error } = await createProductOperation(item.id, nextSequence);

        console.log('➕ createProductOperation result:', { data, error });

        if (data && !error) {
            console.log('✅ Adding operation to state');
            setProductOperations(prev => [...prev, data]);
        } else {
            console.error('❌ Failed to create operation:', error);
        }
    };

    // Update item-level operation field
    const handleUpdateItemOperation = async (opId: string, field: string, value: any) => {
        // Optimistic update
        setProductOperations(prev =>
            prev.map(op => op.id === opId ? { ...op, [field]: value } : op)
        );

        setSaveStatus('saving');
        const { data, error } = await updateProductOperationField(opId, field, value);

        if (error) {
            console.error('Failed to update operation:', error);
            // Reload to revert
            loadItemOperations();
            setSaveStatus('unsaved');
        } else {
            setSaveStatus('saved');
        }
    };

    // Delete item-level operation with confirmation
    const handleDeleteItemOperation = async (opId: string) => {
        setShowDeleteConfirm(opId);
    };

    // Confirm delete operation
    const confirmDeleteOperation = async () => {
        if (!showDeleteConfirm) return;
        const { error } = await deleteProductOperationById(showDeleteConfirm);
        if (!error) {
            setProductOperations(prev => prev.filter(op => op.id !== showDeleteConfirm));
        }
        setShowDeleteConfirm(null);
    };

    // Helper to format seconds as time display
    const formatTimeDisplay = (seconds: number): string => {
        if (!seconds || seconds === 0) return '0 s';
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hrs > 0) {
            return `${hrs}h ${mins}m ${secs}s`;
        } else if (mins > 0) {
            return `${mins}m ${secs}s`;
        }
        return `${secs} s`;
    };

    // Drag & drop handlers for reordering
    const handleOperationDragStart = (e: React.DragEvent, index: number) => {
        setDraggedOperationIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        const target = e.target as HTMLElement;
        target.classList.add('opacity-50');
    };

    const handleOperationDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        setDragOverOperationIndex(index);
        e.dataTransfer.dropEffect = 'move';
    };

    const handleOperationDrop = async (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        if (draggedOperationIndex === null || draggedOperationIndex === dropIndex) {
            setDraggedOperationIndex(null);
            setDragOverOperationIndex(null);
            return;
        }

        const newOps = [...productOperations];
        const [removed] = newOps.splice(draggedOperationIndex, 1);
        newOps.splice(dropIndex, 0, removed);

        // Update sequence orders
        const updatedOps = newOps.map((op, idx) => ({ ...op, sequenceOrder: idx }));
        setProductOperations(updatedOps);

        // Save to database
        await updateOperationSequence(updatedOps.map(op => ({
            id: op.id,
            sequenceOrder: op.sequenceOrder
        })));

        setDraggedOperationIndex(null);
        setDragOverOperationIndex(null);
    };

    const handleOperationDragEnd = (e: React.DragEvent) => {
        const target = e.target as HTMLElement;
        target.classList.remove('opacity-50');
        setDraggedOperationIndex(null);
        setDragOverOperationIndex(null);
    };

    // Calculate operation cost
    const calculateOperationCost = (costPerHour: number, timeSeconds: number): string => {
        if (!costPerHour || !timeSeconds) return '0.00000';
        const cost = (costPerHour / 3600) * timeSeconds;
        return cost.toFixed(5);
    };

    // Copy operations from modal
    const [showCopyOpsItemModal, setShowCopyOpsItemModal] = useState(false);
    const [copyOpsItemSearch, setCopyOpsItemSearch] = useState('');
    const [copyOpsItemResults, setCopyOpsItemResults] = useState<{ id: string; name: string; sku: string }[]>([]);

    const openCopyOpsItemModal = async () => {
        // Search for items with operations
        const results = await searchProductsWithRecipes('');
        setCopyOpsItemResults(results.map(r => ({ id: r.variantId, name: r.name, sku: r.sku })));
        setShowCopyOpsItemModal(true);
    };

    const handleCopyOpsFromItem = async (sourceItemId: string) => {
        if (!item?.id) return;
        const success = await copyProductOperationsFrom(item.id, sourceItemId);
        if (success) {
            await loadItemOperations();
        }
        setShowCopyOpsItemModal(false);
    };

    // === END ITEM-LEVEL PRODUCTION OPERATIONS HANDLERS ===

    // === NEW HANDLERS ===

    // Load warehouses on mount
    useEffect(() => {
        fetchWarehouses().then(setWarehouses);
    }, []);

    // Open Bin Modal
    const openBinModal = async (variant: any) => {
        setBinModalVariant(variant);
        const bins = await fetchVariantBins(variant.id);
        setWarehouseBins(bins);
        setIsBinModalOpen(true);
    };

    // Save Bin
    const handleSaveBin = async (warehouseId: string, bin: string) => {
        if (!binModalVariant) return;
        await updateVariantBin(binModalVariant.id, warehouseId, bin);
        // Update local state
        setWarehouseBins(prev => prev.map(wb =>
            wb.warehouseId === warehouseId ? { ...wb, bin } : wb
        ));
        // Update item variants
        setItem(prev => {
            if (!prev) return null;
            return {
                ...prev,
                variants: prev.variants.map(v =>
                    v.id === binModalVariant.id ? { ...v, bin } : v
                )
            };
        });
    };

    // Open Make Modal
    const openMakeModal = (variant: any) => {
        setMakeModalVariant(variant);
        setMoQuantity('1');
        setMoDeadline(new Date().toISOString().split('T')[0]);
        setMoLocation('wh-1');
        setMoCreateSubassemblies(false);
        setIsMakeModalOpen(true);
    };

    // Create Manufacturing Order
    const handleCreateMO = async (openAfter: boolean) => {
        if (!makeModalVariant || !item) return;

        const result = await createManufacturingOrder({
            variantId: makeModalVariant.id,
            productName: `${item.name} / ${makeModalVariant.attributes || 'DEFAULT'}`,
            quantity: parseInt(moQuantity) || 1,
            productionDeadline: moDeadline,
            locationId: moLocation,
            createSubassemblyMOs: moCreateSubassemblies
        });

        if (result) {
            setIsMakeModalOpen(false);
            if (openAfter) {
                // Navigate to MO page (if exists)
                router.push(`/make/${result.id}`);
            }
        }
    };

    // Open Sell Modal
    const openSellModal = (variant: any) => {
        setSellModalVariant(variant);
        setSoQuantity('1');
        setSoCustomer('');
        const d = new Date();
        d.setDate(d.getDate() + 14);
        setSoDeadline(d.toISOString().split('T')[0]);
        setSoLocation('wh-1');
        setIsSellModalOpen(true);
    };

    // Create Sales Order
    const handleCreateSO = async (openAfter: boolean) => {
        if (!sellModalVariant || !item) return;

        const result = await createSalesOrder({
            variantId: sellModalVariant.id,
            productName: `${item.name} / ${sellModalVariant.attributes || 'DEFAULT'}`,
            quantity: parseInt(soQuantity) || 1,
            customerName: soCustomer || undefined,
            deliveryDeadline: soDeadline,
            shipFromLocationId: soLocation
        });

        if (result) {
            setIsSellModalOpen(false);
            if (openAfter) {
                router.push(`/sell/${result.orderNo.replace('SO-', '')}`);
            }
        }
    };

    // Open Delete Modal
    const openDeleteModal = (variant: any) => {
        setDeleteModalVariant(variant);
        setIsDeleteModalOpen(true);
    };

    // Delete Variant
    const handleDeleteVariant = async () => {
        if (!deleteModalVariant) return;

        const result = await deleteVariant(deleteModalVariant.id);
        if (result.success) {
            setItem(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    variants: prev.variants.filter(v => v.id !== deleteModalVariant.id)
                };
            });
            setIsDeleteModalOpen(false);
        } else {
            alert(result.error || 'Failed to delete variant');
        }
    };

    // Selection Handlers
    const handleSelectVariant = (variantId: string, checked: boolean) => {
        if (checked) {
            setSelectedVariants(prev => [...prev, variantId]);
        } else {
            setSelectedVariants(prev => prev.filter(id => id !== variantId));
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked && item) {
            setSelectedVariants(item.variants.map(v => v.id));
        } else {
            setSelectedVariants([]);
        }
    };

    // Bulk Update Logic
    const handleUpdatePrices = async () => {
        if (!item) return;
        const value = parseFloat(priceAdjustmentValue);
        if (isNaN(value)) return;

        for (const variantId of selectedVariants) {
            const variant = item.variants.find(v => v.id === variantId);
            if (!variant) continue;

            let newPrice = variant.salesPrice || 0;

            if (priceAdjustmentType === 'new') {
                newPrice = value;
            } else if (priceAdjustmentType === 'percentage') {
                newPrice = newPrice * (1 + value / 100);
            } else if (priceAdjustmentType === 'flat') {
                newPrice = newPrice + value;
            }

            await updateKatanaItemVariant(variantId, { sales_price: newPrice });
        }

        setShowPriceModal(false);
        setShowEditMenu(false);
        setSelectedVariants([]);

        // Refresh
        const data = await fetchKatanaItemDetails(id);
        if (data) setItem(data);
    };

    // Update ingredient quantity inline
    const handleUpdateIngredientQuantity = async (ing: RecipeIngredient, newQuantity: number) => {
        if (!activeVariantId) return;

        const success = await updateRecipeIngredient(activeVariantId.toString(), ing.variantId.toString(), { quantity: newQuantity });
        if (success) {
            setRecipeItems(prev => prev.map(i =>
                i.variantId === ing.variantId ? { ...i, quantity: newQuantity } : i
            ));
        }
    };

    // Update ingredient notes inline
    const handleUpdateIngredientNotes = async (ing: RecipeIngredient, newNotes: string) => {
        if (!activeVariantId) return;

        const success = await updateRecipeIngredient(activeVariantId.toString(), ing.variantId.toString(), { notes: newNotes });
        if (success) {
            setRecipeItems(prev => prev.map(i =>
                i.variantId === ing.variantId ? { ...i, notes: newNotes } : i
            ));
        }
    };

    // Drag and Drop Handlers for Ingredients
    const handleIngredientDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIngredientIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        const target = e.target as HTMLElement;
        target.classList.add('opacity-50');
    };

    const handleIngredientDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        setDragOverIngredientIndex(index);
        e.dataTransfer.dropEffect = 'move';
    };

    const handleIngredientDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIngredientIndex === null || draggedIngredientIndex === index) return;

        const newIngredients = [...filteredRecipeItems];
        const [movedItem] = newIngredients.splice(draggedIngredientIndex, 1);
        newIngredients.splice(index, 0, movedItem);

        setRecipeItems(newIngredients);
        setDraggedIngredientIndex(null);
    };

    const handleIngredientDragEnd = (e: React.DragEvent) => {
        const target = e.target as HTMLElement;
        target.classList.remove('opacity-50');
        setDraggedIngredientIndex(null);
        setDragOverIngredientIndex(null);
    };

    // Load Inventory Intel for an ingredient
    const loadInventoryIntel = async (ing: RecipeIngredient) => {
        setSelectedIngredientForIntel(ing);
        setShowInventoryIntel(true);
        setLoadingInventoryIntel(true);
        setInventoryIntelData(null);
        setIntelTab('movements'); // Reset to movements tab
        setExpectedData([]);
        setCommittedData([]);
        setIngredientBatchTracked(false);
        setIngredientBatches([]);
        setSelectedBatchFilter('all');
        setIngredientItemType(null);
        setIngredientCanBuy(false);
        setIngredientCanMake(false);

        const variantId = ing.variantId;

        if (!variantId) {
            console.error('No variant ID for ingredient:', ing);
            setLoadingInventoryIntel(false);
            return;
        }

        try {
            // 0. Fetch item details: type, usability flags, and batch tracking
            if (ing.itemId) {
                const { data: itemData, error: itemError } = await supabase
                    .from('items')
                    .select('type, is_batch_tracked, is_purchasable, is_producible')
                    .eq('id', ing.itemId)
                    .single();

                if (!itemError && itemData) {
                    // Set item type
                    const itemType = itemData.type as 'Product' | 'Material';
                    setIngredientItemType(itemType);

                    // Set usability flags - default based on type if not explicitly set
                    const canBuy = itemData.is_purchasable ?? (itemType === 'Material');
                    const canMake = itemData.is_producible ?? (itemType === 'Product');
                    setIngredientCanBuy(canBuy);
                    setIngredientCanMake(canMake);

                    // Set batch tracking
                    if (itemData.is_batch_tracked) {
                        setIngredientBatchTracked(true);

                        // Fetch batches for this variant
                        const { data: batchesData, error: batchesError } = await supabase
                            .from('batches')
                            .select('id, batch_number')
                            .eq('variant_id', variantId)
                            .order('created_at', { ascending: false });

                        if (!batchesError && batchesData && batchesData.length > 0) {
                            setIngredientBatches(batchesData.map((b: any) => ({
                                id: b.id,
                                batchNumber: b.batch_number
                            })));
                        }
                    }
                }
            }

            // 1. Get inventory summary
            const { data: inventoryRecord, error: invError } = await supabase
                .from('inventory')
                .select(`
                    quantity_in_stock,
                    quantity_committed,
                    quantity_expected,
                    reorder_point,
                    average_cost
                `)
                .eq('variant_id', variantId)
                .maybeSingle();

            if (invError && invError.code !== 'PGRST116') {
                console.error('Failed to load inventory:', invError);
            }

            const inStock = inventoryRecord?.quantity_in_stock || 0;
            const expected = inventoryRecord?.quantity_expected || 0;
            const committed = inventoryRecord?.quantity_committed || 0;
            const safetyStock = inventoryRecord?.reorder_point || 0;
            const avgCost = inventoryRecord?.average_cost || 0;

            // 2. Try to load from stock_movements table first
            const { data: stockMovements, error: movementsError } = await supabase
                .from('stock_movements')
                .select('*')
                .eq('variant_id', variantId)
                .order('movement_date', { ascending: false })
                .limit(50);

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

            setInventoryIntelData({
                inStock,
                expected,
                committed,
                safetyStock,
                calculatedStock: inStock - committed + expected,
                averageCost: avgCost,
                uom: ing.uom || 'pcs',
                movements
            });
        } catch (err) {
            console.error('Error loading inventory intel:', err);
        }

        setLoadingInventoryIntel(false);
    };

    // Open Copy To Modal
    const openCopyToModal = async () => {
        if (!item || !activeVariantId) return;
        setCopyToStep(1);
        setCopyToTargets([]);
        setCopyToSearch('');
        const variants = await fetchVariantsWithRecipes(item.id);
        // Filter out current variant
        setCopyToVariants(variants.filter(v => v.id !== activeVariantId));
        setIsCopyToModalOpen(true);
    };

    // Execute Copy To
    const handleCopyTo = async () => {
        if (!activeVariantId || copyToTargets.length === 0) return;

        const success = await copyRecipeTo(activeVariantId.toString(), copyToTargets);
        if (success) {
            setIsCopyToModalOpen(false);
        }
    };

    // Open Copy From Modal
    const openCopyFromModal = async () => {
        setCopyFromSearch('');
        setCopyFromSelected(null);
        const results = await searchProductsWithRecipes('');
        setCopyFromResults(results.filter(r => r.variantId !== activeVariantId));
        setIsCopyFromModalOpen(true);
    };

    // Search for Copy From
    useEffect(() => {
        if (isCopyFromModalOpen) {
            const timer = setTimeout(async () => {
                const results = await searchProductsWithRecipes(copyFromSearch);
                setCopyFromResults(results.filter(r => r.variantId !== activeVariantId));
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [copyFromSearch, isCopyFromModalOpen, activeVariantId]);

    // Execute Copy From
    const handleCopyFrom = async () => {
        if (!activeVariantId || !copyFromSelected) return;

        const success = await copyRecipeFrom(activeVariantId.toString(), copyFromSelected);
        if (success) {
            // Reload recipe
            const data = await fetchKatanaRecipe(activeVariantId.toString());
            setRecipeItems(data);
            setIsCopyFromModalOpen(false);
        }
    };

    // Update Operation inline
    const handleUpdateOperation = async (opId: string, field: string, value: any) => {
        const updates: any = {};
        updates[field] = value;

        const success = await updateOperation(opId, updates);
        if (success) {
            setOperations(prev => prev.map(op =>
                op.id === opId ? { ...op, [field === 'operation_name' ? 'operation' : field]: value } : op
            ));
        }
    };

    // Open Copy Operations From Modal
    const openCopyOpsFromModal = async () => {
        setCopyOpsFromSearch('');
        const results = await searchProductsWithRecipes('');
        setCopyOpsFromResults(results.filter(r => r.variantId !== activeVariantId));
        setIsCopyOpsFromModalOpen(true);
    };

    // Execute Copy Operations From
    const handleCopyOpsFrom = async (sourceVariantId: string) => {
        if (!activeVariantId) return;

        const success = await copyOperationsFrom(activeVariantId.toString(), sourceVariantId);
        if (success) {
            // Reload operations
            const data = await fetchKatanaOperations(activeVariantId.toString());
            setOperations(data);
            setIsCopyOpsFromModalOpen(false);
        }
    };

    // Open New Purchase Order Modal
    const openNewPOModal = async () => {
        if (!selectedIngredientForIntel) return;

        // Generate next PO number
        const { data: lastPO } = await supabase
            .from('purchase_orders')
            .select('order_no')
            .order('order_no', { ascending: false })
            .limit(1)
            .single();

        const lastNum = lastPO?.order_no ? parseInt(lastPO.order_no.replace('PO-', '')) : 0;
        const nextPONumber = `PO-${lastNum + 1}`;

        // Get tomorrow's date as default expected arrival
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 7);
        const expectedDate = tomorrow.toISOString().split('T')[0];

        // Calculate suggested quantity
        const calcStock = inventoryIntelData?.calculatedStock ?? 0;
        const suggestedQty = calcStock < 0 ? Math.ceil(Math.abs(calcStock)) : 1;

        // Load suppliers
        const { data: suppliersData } = await supabase
            .from('suppliers')
            .select('id, name')
            .order('name');

        setSuppliers(suppliersData || []);

        setNewPOData({
            variantId: selectedIngredientForIntel.variantId,
            productName: selectedIngredientForIntel.name || 'Unknown',
            calculatedStock: calcStock,
            quantity: suggestedQty,
            uom: inventoryIntelData?.uom || selectedIngredientForIntel.uom || 'pcs',
            supplier: suppliersData?.[0]?.name || '',
            poNumber: nextPONumber,
            expectedArrival: expectedDate,
            shipTo: 'MMH Kelowna',
            addOtherMissing: false
        });

        setShowNewPOModal(true);
    };

    // Create Purchase Order
    const handleCreatePO = async (openAfterCreate: boolean) => {
        if (!newPOData.variantId || !newPOData.supplier) return;

        setCreatingPO(true);

        try {
            // Find supplier ID
            const selectedSupplier = suppliers.find(s => s.name === newPOData.supplier);

            // Create PO
            const { data: newPO, error: poError } = await supabase
                .from('purchase_orders')
                .insert({
                    id: crypto.randomUUID(),
                    order_no: newPOData.poNumber,
                    supplier_id: selectedSupplier?.id,
                    status: 'OPEN',
                    expected_arrival_date: newPOData.expectedArrival,
                    location_id: null // Would need to look up MMH Kelowna location
                })
                .select()
                .single();

            if (poError) throw poError;

            // Create PO row
            const { error: rowError } = await supabase
                .from('purchase_order_rows')
                .insert({
                    id: crypto.randomUUID(),
                    purchase_order_id: newPO.id,
                    variant_id: newPOData.variantId,
                    quantity: newPOData.quantity,
                    quantity_received: 0,
                    price_per_unit: 0
                });

            if (rowError) throw rowError;

            setShowNewPOModal(false);

            if (openAfterCreate) {
                router.push(`/buy/${newPO.id}`);
            }
        } catch (err) {
            console.error('Error creating PO:', err);
        } finally {
            setCreatingPO(false);
        }
    };

    // Autosave Effect
    useEffect(() => {
        if (loading) return;

        // Skip the very first run after loading to prevent saving initial state
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Immediate feedback: Set status to 'saving' as soon as dependencies change
        setSaveStatus('saving');

        const timer = setTimeout(async () => {
            if (!id || id === 'new') return;

            const updatePayload = {
                name,
                category: category || null,
                uom,
                additionalInfo,
                customCollection,
                isSellable: usability.sell,
                isPurchasable: type === 'material' ? true : usability.buy, // Force true for materials
                isProducible: usability.make,
                batchTracked: tracking === 'batch',
                serialTracked: tracking === 'serial'
            };

            console.log('[Persistence Debug] Saving item with:', JSON.stringify(updatePayload, null, 2));

            const success = await updateKatanaItemDetails(id, type.toLowerCase() as 'product' | 'material', updatePayload);

            console.log('[Persistence Debug] Save result:', success);
            if (success) {
                setSaveStatus('saved');
            } else {
                setSaveStatus('unsaved');
            }
        }, 1000); // 1s debounce

        return () => clearTimeout(timer);
    }, [name, category, uom, additionalInfo, customCollection, usability, tracking, id, type, loading]);

    useEffect(() => {
        async function loadItem() {
            if (id === 'new') {
                const newItemType = type.toLowerCase() as 'product' | 'material';
                // Default initialization for new item
                setItem({
                    id: 'new',
                    name: '',
                    sku: '',
                    category: '',
                    uom: 'pcs',
                    type: newItemType,
                    batchTracking: false,
                    variants: [],
                    variantConfig: []
                } as any);

                // Initialize usability based on type
                setUsability({
                    sell: true, // Both default to sellable
                    buy: true,  // Both default to purchasable
                    make: newItemType === 'product', // Only product can be made
                    kit: false
                });

                setLoading(false);
                return;
            }

            const data = await fetchKatanaItemDetails(id);
            console.log('🔍 [PAGE] fetchKatanaItemDetails returned:', {
                dataExists: !!data,
                itemName: data?.name,
                variantsCount: data?.variants?.length || 0,
                variants: data?.variants?.map(v => ({ id: v.id, sku: v.sku }))
            });
            if (data) {
                setItem(data);
                setName(data.name);
                setCategory(data.category || '');
                setUom(data.uom);
                setAdditionalInfo(data.additionalInfo || '');
                setCustomCollection(data.customCollection || '');
                setUsability({
                    sell: data.isSellable ?? false,
                    buy: data.isPurchasable ?? false,
                    make: data.isProducible ?? false,
                    kit: false
                });
                if (data.serialTracked) setTracking('serial');
                else if (data.batchTracked) setTracking('batch');
                else setTracking('none');

                // Initialize purchase UOM state
                console.log('📥 Loading Purchase UOM data:', {
                    purchaseInDifferentUom: data.purchaseInDifferentUom,
                    purchaseUom: data.purchaseUom,
                    purchaseUomConversionRate: data.purchaseUomConversionRate
                });
                setPurchasingInDiffUom(data.purchaseInDifferentUom || false);
                setPurchaseUom(data.purchaseUom || null);
                setPurchaseUomConversionRate(data.purchaseUomConversionRate || 1);

                // Default active variant to the first one - ONLY if not already set
                if (data.variants.length > 0 && !activeVariantId) {
                    console.log('[Ingredient Debug] Setting initial activeVariantId:', data.variants[0].id);
                    setActiveVariantId(data.variants[0].id);
                } else if (activeVariantId) {
                    console.log('[Ingredient Debug] Preserving activeVariantId:', activeVariantId);
                }
            }
            setLoading(false);
        }
        loadItem();
    }, [id, type]);

    // Fetch tab-specific data
    useEffect(() => {
        async function loadTabData() {
            if (activeTab === 'Production operations' && item?.id) {
                // Load item-level operations
                await loadItemOperations();
                await loadOperationsAndResources();
            } else if (activeVariantId) {
                if (activeTab === 'Product recipe / BOM') {
                    const data = await fetchKatanaRecipe(activeVariantId.toString());
                    setRecipeItems(data);
                } else if (activeTab === 'Used in BOMs') {
                    const data = await fetchUsedInBOMs(activeVariantId.toString());
                    setUsedInBOMs(data);
                }
            }
        }
        loadTabData();
    }, [activeTab, activeVariantId, item?.id, loadItemOperations, loadOperationsAndResources]);

    // Filtered Data
    const filteredRecipeItems = recipeItems.filter(item =>
        item.name.toLowerCase().includes(filterIngredients.toLowerCase()) ||
        (item.notes || '').toLowerCase().includes(filterIngredients.toLowerCase())
    );

    const filteredUsedInBOMs = usedInBOMs.filter(bom =>
        (bom.productName || bom.variantName || '').toLowerCase().includes(filterBomProduct.toLowerCase())
    );

    const itemDetailSidebarGroups = [
        {
            title: "DATA",
            items: [
                { name: "Items", id: "Inventory" }
            ]
        }
    ];

    if (loading) return <Shell activeTab="Items" activePage="Inventory" sidebarGroups={itemDetailSidebarGroups}><div className="p-8 text-muted-foreground">Loading item...</div></Shell>;
    if (!item) return <Shell activeTab="Items" activePage="Inventory" sidebarGroups={itemDetailSidebarGroups}><div className="p-8 text-muted-foreground">Item not found</div></Shell>;

    const getActiveVariantName = () => {
        const v = item.variants.find(v => v.id === activeVariantId);
        if (!v) return '';
        return `[${v.sku}] ${name}${v.attributes ? ' / ' + v.attributes : ''}`;
    };


    // Determine available tabs based on item type and capabilities
    const tabs = ['General info'];

    // Show Product recipe / BOM and Production operations when Make is checked (products only)
    if (usability.make && type === 'product') {
        tabs.push('Product recipe / BOM');
        tabs.push('Production operations');
    }

    // Show Supply details when Buy is checked
    if (usability.buy) {
        tabs.push('Supply details');
    }

    // Always show "Used in BOMs" - shows where this item is used as ingredient
    // Materials are typically ingredients, products can be semi-finished goods used in other products
    tabs.push('Used in BOMs');

    return (
        <Shell activeTab="Items" activePage="Inventory" sidebarGroups={itemDetailSidebarGroups}>
            <div
                className="h-full overflow-y-auto bg-background font-sans text-[13px] text-foreground pb-20 flex flex-col no-scrollbar"
            >
                <style jsx global>{`
            .no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}</style>

                {/* --- Header (Sticky) --- */}
                <header className="bg-background sticky top-0 z-30 border-b border-[#3a3a38]">
                    <div className="w-full max-w-[1920px] mx-auto px-4 py-3 flex justify-between items-center">

                        {/* Left: Title & Breadcrumb Area */}
                        <div className="flex items-center gap-4">
                            <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-secondary/50 text-muted-foreground transition-colors">
                                <ArrowLeft size={20} />
                            </button>

                            <div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5">
                                    <Link href="/" className="hover:text-foreground transition-colors">Inventory</Link>
                                    <span className="text-border">/</span>
                                    <span className="">{item.type}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-xl font-medium text-foreground tracking-tight">
                                        {name}
                                    </h1>
                                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#8aaf6e]/20 text-[#8aaf6e] border border-[#8aaf6e]/30">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Actions Toolbar */}
                        <div className="flex items-center gap-2">
                            <div className="mr-4 flex items-center justify-center">
                                {saveStatus === 'saving' ? (
                                    <Loader2 size={20} className="animate-spin text-muted-foreground" />
                                ) : (
                                    <Check size={16} className="text-[#8aaf6e]" strokeWidth={3} />
                                )}
                                <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">{saveStatus === 'saving' ? 'Saving...' : 'All changes saved'}</span>
                            </div>

                            <button className="p-2 hover:bg-secondary/50 rounded-md transition-all text-muted-foreground" title="Print">
                                <Printer size={18} />
                            </button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="p-2 hover:bg-secondary/50 rounded-md transition-all text-muted-foreground" title="More options">
                                        <MoreVertical size={18} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-[#1f1f1d] border-[#3a3a38] text-[#faf9f5] min-w-[140px]">
                                    <DropdownMenuItem
                                        className="text-xs hover:bg-secondary/50 cursor-pointer flex items-center gap-2"
                                        onClick={() => {
                                            // TODO: Implement archive functionality
                                            console.log('Archive item:', item?.id);
                                        }}
                                    >
                                        <Archive size={12} /> Archive
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="text-xs hover:bg-secondary/50 cursor-pointer flex items-center gap-2"
                                        onClick={async () => {
                                            if (!item) return;
                                            setSaveStatus('saving');
                                            const newId = await duplicateKatanaItem(item.id);
                                            if (newId) {
                                                router.push(`/items/${newId}?type=${item.type === 'product' ? 'Product' : 'Material'}`);
                                            } else {
                                                alert("Failed to duplicate item.");
                                                setSaveStatus('saved');
                                            }
                                        }}
                                    >
                                        <Copy size={12} /> Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="text-xs text-[#ff7b6f] focus:text-[#ff7b6f] focus:bg-[#ff7b6f]/30 cursor-pointer flex items-center gap-2"
                                        onClick={handleDelete}
                                    >
                                        <Trash2 size={12} className="text-[#ff7b6f]" /> Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="w-[1px] h-5 bg-border mx-1"></div>
                            <button onClick={() => router.back()} className="p-2 hover:bg-secondary/50 rounded-md transition-all text-muted-foreground hover:text-foreground" title="Close">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="w-full max-w-[1920px] mx-auto px-4 flex items-center gap-6 mt-2">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "py-2 text-sm font-medium border-b-2 outline-none focus:outline-none focus:ring-0",
                                    activeTab === tab
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Content Scrollable Area */}
                <main className="w-full max-w-[1920px] mx-auto p-4 space-y-6">

                    {/* Tab Content Switcher */}
                    {activeTab === 'General info' && (
                        <div className="space-y-6">
                            {/* General Info Card */}
                            <div className="bg-background rounded-lg border border-[#3a3a38]">
                                <div className="grid grid-cols-2 divide-x divide-[#3a3a38]">
                                    {/* Left Column */}
                                    <div className="divide-y divide-[#3a3a38]">
                                        <div className="p-3">
                                            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                                {item?.type === 'product' ? 'Product name' : 'Material name'}
                                            </label>
                                            <InlineEdit
                                                value={name}
                                                onChange={setName}
                                                placeholder="Item name"
                                            />
                                        </div>

                                        <div className="p-3">
                                            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Category</label>
                                            <SearchableSelect
                                                value={category}
                                                options={categoryOptions.map(opt => ({ id: opt.value, name: opt.label }))}
                                                onChange={setCategory}
                                                onCreate={async (categoryName) => {
                                                    const normalizedVal = categoryName.trim();

                                                    // Check if already exists
                                                    const existing = categoryOptions.find(opt => opt?.label?.toLowerCase() === normalizedVal.toLowerCase());
                                                    if (existing) {
                                                        setCategory(existing.value);
                                                        return existing.value;
                                                    }

                                                    // Create new category
                                                    const newId = await createKatanaCategory(normalizedVal);
                                                    if (newId) {
                                                        if (!categoryOptions.some(opt => opt.value === newId)) {
                                                            setCategoryOptions(prev => [...prev, { label: normalizedVal, value: newId }]);
                                                        }
                                                        setCategory(newId);
                                                        return newId;
                                                    }
                                                    return null;
                                                }}
                                                placeholder="Select or create category"
                                                searchPlaceholder="Search or create category..."
                                                allowCreate={true}
                                                createLabel="Create category"
                                            />
                                        </div>

                                        <div className="p-3">
                                            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Unit of measure</label>
                                            <SearchableSelect
                                                value={uom}
                                                options={uomOptions.map(opt => ({ id: opt.value, name: opt.label }))}
                                                onChange={setUom}
                                                onCreate={async (uomName) => {
                                                    const normalizedVal = uomName.trim();
                                                    const existing = uomOptions.find(opt => opt?.value?.toLowerCase() === normalizedVal.toLowerCase());
                                                    if (existing) {
                                                        setUom(existing.value);
                                                        return existing.value;
                                                    }
                                                    setUomOptions(prev => [...prev, { label: normalizedVal, value: normalizedVal }]);
                                                    setUom(normalizedVal);
                                                    return normalizedVal;
                                                }}
                                                placeholder="pcs"
                                                searchPlaceholder="Search or create unit..."
                                                allowCreate={true}
                                                createLabel="Create unit"
                                            />
                                        </div>

                                        <div className="p-3">
                                            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Custom field collection</label>
                                            <SearchableSelect
                                                value={customCollection}
                                                options={[
                                                    { id: 'Key Materials', name: 'Key Materials' },
                                                    { id: 'General', name: 'General' },
                                                    { id: 'Custom', name: 'Custom' }
                                                ]}
                                                onChange={setCustomCollection}
                                                onCreate={async (collectionName) => {
                                                    const normalizedVal = collectionName.trim();
                                                    setCustomCollection(normalizedVal);
                                                    return normalizedVal;
                                                }}
                                                placeholder="Key Materials"
                                                searchPlaceholder="Search or create collection..."
                                                allowCreate={true}
                                                createLabel="Create collection"
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="divide-y divide-border">
                                        <div className="p-3">
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">Usability</label>
                                            <div className="flex items-center gap-6 h-8">
                                                {[
                                                    { id: 'sell', label: 'Sell', checked: usability.sell, show: true, disabled: false },
                                                    { id: 'buy', label: 'Buy', checked: type === 'material' ? true : usability.buy, show: true, disabled: type === 'material' },
                                                    { id: 'make', label: 'Make', checked: usability.make, show: type === 'product', disabled: false },
                                                    { id: 'kit', label: 'Kit/bundle', checked: usability.kit, show: type === 'product', disabled: false },
                                                ].filter(opt => opt.show).map(opt => (
                                                    <div key={opt.id} className={cn("flex items-center gap-2", opt.disabled && "opacity-70")}>
                                                        <Checkbox
                                                            id={`use-${opt.id}`}
                                                            checked={opt.checked}
                                                            disabled={opt.disabled}
                                                            onCheckedChange={(checked) => {
                                                                if (opt.disabled) return;

                                                                const newValue = checked === true;

                                                                // If unchecking sell, buy, make, or kit - show confirmation dialog
                                                                if (!newValue && (opt.id === 'sell' || opt.id === 'buy' || opt.id === 'make' || opt.id === 'kit')) {
                                                                    setUsabilityConfirmAction({
                                                                        type: opt.id as 'sell' | 'buy' | 'make' | 'kit',
                                                                        newValue: false
                                                                    });
                                                                    setShowUsabilityConfirm(true);
                                                                } else {
                                                                    // Checking - no confirmation needed
                                                                    setUsability({ ...usability, [opt.id]: newValue });
                                                                }
                                                            }}
                                                            className="data-[state=checked]:bg-[#d97757] data-[state=checked]:border-[#d97757] data-[state=checked]:text-white dark:data-[state=checked]:bg-[#d97757] dark:data-[state=checked]:border-[#d97757] dark:data-[state=checked]:text-white"
                                                        />
                                                        <div className="grid gap-1.5 leading-none"><label htmlFor={`use-${opt.id}`} className={cn("text-sm text-foreground select-none", opt.disabled ? "cursor-not-allowed" : "cursor-pointer")}>{opt.label}</label></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">{type === 'product' ? 'Product tracking' : 'Material tracking'}</label>
                                            <div className="flex items-center gap-6 h-8">
                                                {[
                                                    { id: 'none', label: 'No tracking', show: true },
                                                    { id: 'batch', label: 'Batch / lot numbers', show: true },
                                                    { id: 'serial', label: 'Serial numbers', show: type === 'product' },
                                                ].filter(opt => opt.show).map(opt => (
                                                    <div key={opt.id} className="flex items-center gap-2">
                                                        <div
                                                            className={cn(
                                                                "relative w-4 h-4 rounded-full border cursor-pointer transition-all",
                                                                tracking === opt.id ? "border-[#d97757]" : "border-muted-foreground"
                                                            )}
                                                            onClick={() => setTracking(opt.id as any)}
                                                        >
                                                            {tracking === opt.id && (
                                                                <div
                                                                    className="absolute w-2 h-2 rounded-full bg-[#d97757]"
                                                                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                                                />
                                                            )}
                                                        </div>
                                                        <label className="text-sm text-foreground cursor-pointer select-none" onClick={() => setTracking(opt.id as any)}>{opt.label}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Variants Table Section */}
                            <div className="bg-background rounded-lg border border-[#3a3a38] overflow-hidden relative">
                                {selectedVariants.length > 0 ? (
                                    <div className="flex justify-between items-center px-4 py-3 border-b border-[#3a3a38] bg-[#d97757]/10">
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-medium text-[#d97757]">{selectedVariants.length} variants selected</span>
                                            <div className="relative">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 text-xs gap-2 text-[#d97757] hover:text-[#d97757] hover:bg-[#d97757]/10"
                                                    onClick={() => setShowEditMenu(!showEditMenu)}
                                                >
                                                    Edit <ChevronDown size={14} />
                                                </Button>
                                                {showEditMenu && (
                                                    <div className="absolute top-full left-0 mt-1 w-48 bg-[#262624] border border-[#3a3a38] rounded shadow-lg z-50 py-1">
                                                        <button
                                                            className="w-full text-left px-4 py-2 text-sm text-[#faf9f5] hover:bg-[#3a3a38]"
                                                            onClick={() => {
                                                                setShowEditMenu(false);
                                                                setShowPriceModal(true);
                                                            }}
                                                        >
                                                            Sales Price
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center px-4 py-3 border-b border-border">
                                        <div className="flex items-center gap-4">
                                            <h2 className="text-sm font-medium text-foreground flex items-center gap-2">{item.variants.length} Variants</h2>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 text-xs gap-2"
                                                    onClick={() => setIsVariantConfigOpen(true)}
                                                >
                                                    <Plus size={14} />
                                                    Open configuration...
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 text-xs gap-2"
                                                    onClick={handleGenerateBarcodes}
                                                >
                                                    <ScanBarcode size={14} />
                                                    Generate internal barcodes
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div
                                    className="overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing scrollbar-hide select-none"
                                    ref={variantsTableRef}
                                    onMouseDown={onMouseDown}
                                    onMouseLeave={onMouseLeave}
                                    onMouseUp={onMouseUp}
                                    onMouseMove={onMouseMove}
                                    onContextMenu={handleContextMenu}
                                >
                                    <table className="w-full text-left border-collapse min-w-[1200px]">
                                        <thead>
                                            <tr className="h-8 bg-[#222220] border-b border-[#3a3a38]/50">
                                                {/* Dynamic Headers based on Config */}
                                                {visibleColumns.variant && (
                                                    variantConfigs.length > 0 ? (
                                                        variantConfigs.map((c, i) => (
                                                            <th key={i} className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 min-w-[150px] whitespace-nowrap">
                                                                <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">{c.name}</span>
                                                            </th>
                                                        ))
                                                    ) : (
                                                        <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 min-w-[120px] whitespace-nowrap">
                                                            <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">Type</span>
                                                        </th>
                                                    )
                                                )}
                                                {visibleColumns.sku && (
                                                    <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 w-[180px]">
                                                        <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">SKU</span>
                                                    </th>
                                                )}
                                                {usability.sell && visibleColumns.salesPrice && (
                                                    <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 w-[180px]">
                                                        <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">Default sales price</span>
                                                    </th>
                                                )}
                                                {visibleColumns.registeredBarcode && <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 w-[180px] whitespace-nowrap"><span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">Registered Barcode</span></th>}
                                                {visibleColumns.internalBarcode && <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 w-[180px] whitespace-nowrap"><span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">Internal Barcode</span></th>}
                                                {usability.make && visibleColumns.ingredientsCost && (
                                                    <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 w-[150px] whitespace-nowrap">
                                                        <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">Ingredients cost</span>
                                                    </th>
                                                )}
                                                {usability.make && visibleColumns.operationsCost && (
                                                    <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 w-[150px] whitespace-nowrap">
                                                        <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">Operations cost</span>
                                                    </th>
                                                )}
                                                {usability.buy && visibleColumns.purchasePrice && (
                                                    <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 w-[150px]">
                                                        <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">Purchase Price</span>
                                                    </th>
                                                )}
                                                {visibleColumns.inStock && (
                                                    <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 w-[120px]">
                                                        <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">In Stock</span>
                                                    </th>
                                                )}
                                                {visibleColumns.bin && (
                                                    <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 w-[150px]">
                                                        <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">Bin</span>
                                                    </th>
                                                )}
                                                <th className="px-3 py-0 w-20 text-center bg-[#222220]"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#3a3a38] text-[13px]">
                                            {item.variants.map(v => (
                                                <tr key={v.id} className="h-10 hover:bg-secondary/20 transition-colors group">

                                                    {/* Dynamic Cells */}
                                                    {visibleColumns.variant && (
                                                        variantConfigs.length > 0 ? (
                                                            variantConfigs.map((c, i) => {
                                                                // Map index to value property
                                                                let val = '';
                                                                if (i === 0) val = v.option1Value || '';
                                                                if (i === 1) val = v.option2Value || '';
                                                                if (i === 2) val = v.option3Value || '';

                                                                return (
                                                                    <td key={i} className="px-3 py-1 text-left border-r border-[#3a3a38]/50 relative whitespace-nowrap">
                                                                        <div className="flex items-center justify-between">
                                                                            <CreatableCombobox
                                                                                className="h-7 flex-1 text-xs font-medium bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm px-2 focus-visible:shadow-none"
                                                                                value={val}
                                                                                options={c.values ? c.values.split(',').map(opt => ({ label: opt.trim(), value: opt.trim() })) : []}
                                                                                onChange={(newValue) => handleUpdateVariantOption(v.id, i, newValue)}
                                                                                onCreate={(newValue) => {
                                                                                    // 1. Add to config
                                                                                    const currentValues = c.values ? c.values.split(',').map(s => s.trim()) : [];
                                                                                    if (!currentValues.includes(newValue.trim())) {
                                                                                        const newValues = [...currentValues, newValue.trim()].join(', ');
                                                                                        handleUpdateVariantConfig(i, 'values', newValues);
                                                                                    }
                                                                                    // 2. Select it
                                                                                    handleUpdateVariantOption(v.id, i, newValue.trim());
                                                                                    return Promise.resolve();
                                                                                }}
                                                                                placeholder=""
                                                                                hideIcon={true}
                                                                            />
                                                                            <ExternalLink
                                                                                size={12}
                                                                                className="text-white/70 shrink-0 cursor-pointer hover:text-white ml-2"
                                                                                onClick={() => {
                                                                                    setActiveVariantId(v.id);
                                                                                    if (usability.make) {
                                                                                        setActiveTab('Product recipe / BOM');
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                );
                                                            })
                                                        ) : (
                                                            <td className="px-3 py-1 border-r border-[#3a3a38]/50">
                                                                <span className="inline-block bg-[#3a3a38] px-2 py-0.5 rounded text-xs text-foreground">
                                                                    {v.attributes || 'DEFAULT'}
                                                                </span>
                                                            </td>
                                                        )
                                                    )}

                                                    {visibleColumns.sku && (
                                                        <td className="px-3 py-1 hover:bg-muted/50 cursor-pointer transition-colors relative group/cell border-r border-border/50 text-left">
                                                            <Input
                                                                className="h-7 w-full text-xs font-mono bg-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm px-2 shadow-none focus-visible:shadow-none"
                                                                value={v.sku || ''}
                                                                placeholder="Enter SKU (required)"
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    console.log('[SKU Debug] Input change:', {
                                                                        time: new Date().toISOString(),
                                                                        id: v.id,
                                                                        val,
                                                                        len: val.length,
                                                                        lastChar: val[val.length - 1]
                                                                    });
                                                                    // Only update optimistically, don't save yet
                                                                    updateVariantOptimistically(v.id, 'sku', val);
                                                                }}
                                                                onBlur={(e) => {
                                                                    const val = e.target.value.trim();
                                                                    if (!val) {
                                                                        return; // Don't save empty SKU
                                                                    }
                                                                    setSaveStatus('saving');
                                                                    debouncedVariantUpdate(v.id, 'sku', val);
                                                                    debouncedVariantUpdate.flush();
                                                                }}
                                                            />
                                                        </td>
                                                    )}
                                                    {usability.sell && visibleColumns.salesPrice && (
                                                        <td className="px-3 py-1 hover:bg-muted/50 cursor-pointer transition-colors relative group/cell border-r border-[#3a3a38]/50 text-right">
                                                            <div className="flex items-center justify-end gap-1">
                                                                <Input
                                                                    type="number"
                                                                    step="0.01"
                                                                    className="h-7 w-24 text-xs text-foreground bg-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm px-2 shadow-none focus-visible:shadow-none text-right"
                                                                    value={v.salesPrice === 0 ? '' : v.salesPrice}
                                                                    placeholder="0.00"
                                                                    onChange={(e) => {
                                                                        const val = parseFloat(e.target.value) || 0;
                                                                        setSaveStatus('saving');
                                                                        updateVariantOptimistically(v.id, 'salesPrice', val);
                                                                        debouncedVariantUpdate(v.id, 'salesPrice', val);
                                                                    }}
                                                                    onBlur={() => {
                                                                        debouncedVariantUpdate.flush();
                                                                    }}
                                                                />
                                                                <span className="text-[11px] text-[#bebcb3]">CAD</span>
                                                            </div>
                                                        </td>
                                                    )}
                                                    {visibleColumns.registeredBarcode && (
                                                        <td className="px-3 py-1 hover:bg-muted/50 cursor-pointer transition-colors relative group/cell border-r border-border/50 text-left">
                                                            <Input
                                                                className="h-7 w-full text-xs text-muted-foreground bg-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm px-2 shadow-none focus-visible:shadow-none"
                                                                value={v.registeredBarcode !== '-' ? v.registeredBarcode : ''}
                                                                placeholder="-"
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    setSaveStatus('saving');
                                                                    updateVariantOptimistically(v.id, 'registeredBarcode', val);
                                                                    debouncedVariantUpdate(v.id, 'registeredBarcode', val);
                                                                }}
                                                                onBlur={() => {
                                                                    debouncedVariantUpdate.flush();
                                                                }}
                                                            />
                                                        </td>
                                                    )}
                                                    {visibleColumns.internalBarcode && (
                                                        <td className="px-3 py-1 hover:bg-muted/50 cursor-pointer transition-colors relative group/cell border-r border-border/50 text-left">
                                                            <Input
                                                                className="h-7 w-full text-xs text-muted-foreground bg-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm px-2 shadow-none focus-visible:shadow-none"
                                                                value={v.internalBarcode !== '-' ? v.internalBarcode : ''}
                                                                placeholder="-"
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    setSaveStatus('saving');
                                                                    updateVariantOptimistically(v.id, 'internalBarcode', val);
                                                                    debouncedVariantUpdate(v.id, 'internalBarcode', val);
                                                                }}
                                                                onBlur={() => {
                                                                    debouncedVariantUpdate.flush();
                                                                }}
                                                            />
                                                        </td>
                                                    )}
                                                    {usability.make && visibleColumns.ingredientsCost && (
                                                        <td className="px-3 py-1 text-left font-medium text-muted-foreground border-r border-border/50">
                                                            <div className="flex items-center justify-start gap-1">
                                                                {/* Info icon removed */}
                                                            </div>
                                                        </td>
                                                    )}
                                                    {usability.make && visibleColumns.operationsCost && (
                                                        <td className="px-3 py-1 text-left font-medium text-muted-foreground border-r border-border/50">
                                                            <div className="flex items-center justify-start gap-0.5">
                                                                <span className="text-[#faf9f5]">{v.operationsCost.toFixed(2)}</span><span className="text-[11px] text-[#bebcb3]">CAD</span>
                                                            </div>
                                                        </td>
                                                    )}
                                                    {usability.buy && visibleColumns.purchasePrice && (
                                                        <td className="px-3 py-1 text-left font-medium text-muted-foreground border-r border-border/50">
                                                            <div className="flex items-center justify-start gap-0.5">
                                                                <span className="text-[#faf9f5]">{v.purchasePrice.toFixed(2)}</span><span className="text-[11px] text-[#bebcb3]">CAD</span>
                                                            </div>
                                                        </td>
                                                    )}
                                                    {visibleColumns.inStock && (
                                                        <td className="px-3 py-1 text-left font-medium border-r border-border/50">
                                                            <div className="flex items-center justify-start gap-1">
                                                                <span className="text-[#faf9f5]">{v.inStock}</span> <span className="text-[11px] text-[#bebcb3]">{item.uom}</span>
                                                            </div>
                                                        </td>
                                                    )}
                                                    {visibleColumns.bin && (
                                                        <td className="px-3 py-1 text-left text-xs text-muted-foreground border-r border-border/50">
                                                            <span>{v.bin || '-'}</span>
                                                        </td>
                                                    )}
                                                    {/* Action Buttons Column */}
                                                    <td className="p-2">
                                                        <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <button className="text-[#7a7974] hover:text-[#faf9f5] p-1.5 hover:bg-white/10 rounded transition-all">
                                                                        <MoreHorizontal size={14} />
                                                                    </button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="bg-[#1f1f1d] border-[#3a3a38] text-[#faf9f5] min-w-[140px]">
                                                                    <DropdownMenuItem className="text-xs hover:bg-secondary/50 cursor-pointer flex items-center" onClick={(e) => { e.stopPropagation(); openBinModal(v); }}>
                                                                        <MapPin className="w-4 h-4 mr-2" /> Default storage bin
                                                                    </DropdownMenuItem>
                                                                    {usability.make && (
                                                                        <DropdownMenuItem className="text-xs hover:bg-secondary/50 cursor-pointer flex items-center" onClick={(e) => { e.stopPropagation(); openMakeModal(v); }}>
                                                                            <Factory className="w-4 h-4 mr-2" /> Create manufacturing order
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                    {usability.sell && (
                                                                        <DropdownMenuItem className="text-xs hover:bg-secondary/50 cursor-pointer flex items-center" onClick={(e) => { e.stopPropagation(); openSellModal(v); }}>
                                                                            <ShoppingCart className="w-4 h-4 mr-2" /> Create sales order
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                    <DropdownMenuItem className="text-xs text-[#ff7b6f] focus:text-[#ff7b6f] focus:bg-[#ff7b6f]/30 cursor-pointer flex items-center" onClick={(e) => { e.stopPropagation(); openDeleteModal(v); }}>
                                                                        <Trash2 className="w-4 h-4 mr-2 text-[#ff7b6f]" /> Delete variant
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={Object.values(visibleColumns).filter(Boolean).length + 2} className="p-2">
                                                    <Button
                                                        variant="ghost"
                                                        className="text-muted-foreground hover:text-primary hover:bg-secondary/50 h-8 px-2 text-xs font-medium flex items-center gap-1 transition-colors"
                                                        onClick={handleAddVariantRow}
                                                    >
                                                        <Plus size={14} /> Add row
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                {contextMenu && (
                                    <div
                                        style={{ top: contextMenu.y, left: contextMenu.x }}
                                        className="fixed z-50 bg-[#1f1f1d] border border-[#3a3a38] rounded-md shadow-lg py-2 min-w-[220px] w-auto animate-in fade-in-0 zoom-in-95"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="px-3 py-2">
                                            <div className="text-xs font-semibold text-[#7a7974] uppercase tracking-wider mb-3">
                                                Columns
                                            </div>
                                            <div className="space-y-0.5">
                                                {[
                                                    { key: 'variant', label: 'Variant' },
                                                    { key: 'sku', label: 'SKU' },
                                                    { key: 'salesPrice', label: 'Default sales price' },
                                                    { key: 'registeredBarcode', label: 'Registered Barcode' },
                                                    { key: 'internalBarcode', label: 'Internal Barcode' },
                                                    { key: 'ingredientsCost', label: 'Ingredients Cost' },
                                                    { key: 'operationsCost', label: 'Operations Cost' },
                                                    { key: 'purchasePrice', label: 'Purchase Price' },
                                                    { key: 'inStock', label: 'In Stock' },
                                                    { key: 'bin', label: 'Bin' },
                                                ].map(col => (
                                                    <div
                                                        key={col.key}
                                                        className="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-white/[0.05] transition-colors text-sm text-[#faf9f5] rounded"
                                                        onClick={() => {
                                                            setVisibleColumns(prev => ({ ...prev, [col.key]: !prev[col.key] }));
                                                        }}
                                                    >
                                                        <Checkbox
                                                            checked={visibleColumns[col.key]}
                                                            className="data-[state=checked]:bg-[#5b9bd5] data-[state=checked]:border-[#5b9bd5] data-[state=checked]:text-white border-[#3a3a38] w-3.5 h-3.5 rounded-[3px]"
                                                        />
                                                        <span className="text-[13px]">{col.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Variant Configuration Modal */}
                            <Dialog open={isVariantConfigOpen} onOpenChange={setIsVariantConfigOpen}>
                                <DialogContent
                                    className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5] max-w-md p-0 overflow-hidden"
                                    onOpenAutoFocus={(e) => e.preventDefault()}
                                >
                                    <DialogHeader className="px-5 pt-5 pb-2">
                                        <DialogTitle className="text-lg font-medium">Product variant configuration</DialogTitle>
                                    </DialogHeader>

                                    <div className="px-5 pt-1 pb-4 space-y-3">
                                        {/* Variant Options */}
                                        {draftVariantConfigs.map((config, index) => (
                                            <div key={index} className="flex items-start gap-3 group">
                                                <Input
                                                    value={config.name}
                                                    onChange={e => handleUpdateVariantConfig(index, 'name', e.target.value)}
                                                    className="w-24 bg-[#1a1a18] border border-[#3a3a38] h-8 text-sm px-3 focus-visible:ring-0 focus-visible:border-[#d97757] focus-visible:bg-[#2a2a28]"
                                                    placeholder="TYPE"
                                                />
                                                <div className="flex-1">
                                                    <TagInput
                                                        value={config.values}
                                                        onChange={(e) => handleUpdateVariantConfig(index, 'values', e.target.value)}
                                                        placeholder=""
                                                    />
                                                </div>
                                                <button
                                                    className="text-[#ff7b6f] opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#ff7b6f]/10 rounded"
                                                    onClick={() => handleRemoveVariantConfig(index)}
                                                    disabled={draftVariantConfigs.length === 1}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}

                                        {/* Add Button */}
                                        {draftVariantConfigs.length < 3 && (
                                            <button
                                                className="text-[#7a7974] hover:text-[#d97757] hover:bg-white/[0.03] h-8 px-2 text-xs font-medium flex items-center gap-1.5 transition-all rounded"
                                                onClick={handleAddVariantConfig}
                                            >
                                                <Plus size={14} /> Add option
                                            </button>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-end px-5 py-4 bg-[#1a1a18]">
                                        <div className="flex gap-3">
                                            <Button
                                                variant="ghost"
                                                onClick={() => setIsVariantConfigOpen(false)}
                                                className="h-8 px-4 text-sm font-medium border border-[#3a3a38] hover:bg-white/[0.05] text-[#faf9f5]"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleGenerateVariants}
                                                disabled={isUpdatingConfig}
                                                className="h-8 px-5 bg-[#d97757] hover:bg-[#c66b4d] text-white text-sm font-medium shadow-sm disabled:opacity-50"
                                            >
                                                {isUpdatingConfig ? 'Saving...' : 'Update'}
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            {/* === BIN MODAL === */}
                            <Dialog open={isBinModalOpen} onOpenChange={setIsBinModalOpen}>
                                <DialogContent className="max-w-xl bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5]">
                                    <DialogHeader>
                                        <DialogTitle className="text-sm font-medium text-[#faf9f5]">
                                            Default storage setup for<br />
                                            <span className="text-[#faf9f5] font-semibold">
                                                [{binModalVariant?.sku}] {name} / {binModalVariant?.attributes || 'DEFAULT'}
                                            </span>
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4 font-normal">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-[#3a3a38] text-[11px] text-muted-foreground font-medium uppercase">
                                                    <th className="p-3">Warehouse <Info size={10} className="inline ml-1" /></th>
                                                    <th className="p-3">Default storage bin <Info size={10} className="inline ml-1" /></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#3a3a38] text-sm">
                                                {warehouseBins.map(wb => (
                                                    <tr key={wb.warehouseId} className="hover:bg-secondary/10 hover:text-white transition-colors">
                                                        <td className="p-3 text-[#faf9f5]">{wb.warehouseName}</td>
                                                        <td className="p-3">
                                                            <Input
                                                                className="h-8 text-xs bg-[#1e1e1e] border-[#3a3a38] text-[#faf9f5] focus-visible:ring-1 focus-visible:ring-[#3a3a38] focus-visible:border-[#d97757]"
                                                                placeholder="Select or enter bin"
                                                                value={wb.bin || ''}
                                                                onChange={(e) => handleSaveBin(wb.warehouseId, e.target.value)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsBinModalOpen(false)} className="border-[#3a3a38] text-[#faf9f5] hover:bg-secondary/20">Close</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            {/* === MAKE (MO) MODAL === */}
                            <Dialog open={isMakeModalOpen} onOpenChange={setIsMakeModalOpen}>
                                <DialogContent className="max-w-lg bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5]">
                                    <DialogHeader>
                                        <DialogTitle className="text-base font-medium text-[#faf9f5]">New manufacturing order</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4 space-y-4">
                                        <div className="space-y-1">
                                            <Label className="text-xs text-muted-foreground">Product</Label>
                                            <div className="text-sm font-medium text-[#faf9f5]">
                                                [{makeModalVariant?.sku}] {name} / {makeModalVariant?.attributes || 'DEFAULT'}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label className="text-xs text-muted-foreground">Quantity</Label>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="number"
                                                        className="h-9 w-24 bg-[#1e1e1e] border-[#3a3a38] text-[#faf9f5] focus-visible:ring-1 focus-visible:ring-[#3a3a38] focus-visible:border-[#d97757]"
                                                        value={moQuantity}
                                                        onChange={(e) => setMoQuantity(e.target.value)}
                                                    />
                                                    <span className="text-xs text-muted-foreground">{item?.uom}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs text-muted-foreground">Calculated stock</Label>
                                                <div className="text-sm font-medium text-[#faf9f5] pt-2">
                                                    {makeModalVariant?.inStock || 0} {item?.uom}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label className="text-xs text-muted-foreground">Manufacturing order #</Label>
                                                <div className="text-sm text-muted-foreground pt-2">MO-{Math.floor(6634 + Math.random() * 100)}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs text-muted-foreground">Production deadline</Label>
                                                <Input
                                                    type="date"
                                                    className="h-9 bg-[#1e1e1e] border-[#3a3a38] text-[#faf9f5] focus-visible:ring-1 focus-visible:ring-[#3a3a38] focus-visible:border-[#d97757] [color-scheme:dark]"
                                                    value={moDeadline}
                                                    onChange={(e) => setMoDeadline(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs text-muted-foreground">Main location</Label>
                                            <Select value={moLocation} onValueChange={setMoLocation}>
                                                <SelectTrigger className="h-9 bg-[#1e1e1e] border-[#3a3a38] text-[#faf9f5] focus:ring-1 focus:ring-[#3a3a38]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5]">
                                                    {warehouses.map(wh => (
                                                        <SelectItem key={wh.id} value={wh.id} className="hover:bg-secondary/20 focus:bg-secondary/20">{wh.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex items-center gap-2 pt-2">
                                            <Checkbox
                                                id="mo-subassemblies"
                                                checked={moCreateSubassemblies}
                                                onCheckedChange={(c) => setMoCreateSubassemblies(c === true)}
                                                className="border-[#3a3a38] data-[state=checked]:bg-[#d97757] data-[state=checked]:border-[#d97757]"
                                            />
                                            <label htmlFor="mo-subassemblies" className="text-sm text-[#faf9f5] cursor-pointer">
                                                Create MOs for subassemblies <Info size={12} className="inline text-muted-foreground ml-1" />
                                            </label>
                                        </div>
                                        <p className="text-xs text-muted-foreground italic">
                                            More parameters available on full manufacturing order card
                                        </p>
                                    </div>
                                    <DialogFooter className="gap-2">
                                        <Button variant="ghost" onClick={() => setIsMakeModalOpen(false)} className="text-muted-foreground hover:bg-secondary/20 hover:text-[#faf9f5]">Cancel</Button>
                                        <Button variant="outline" onClick={() => handleCreateMO(true)} className="bg-transparent border-[#3a3a38] text-[#faf9f5] hover:bg-secondary/20">
                                            Create and open order
                                        </Button>
                                        <Button onClick={() => handleCreateMO(false)} className="bg-[#d97757] text-white hover:bg-[#c66a4d] border-none">
                                            Create and close
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            {/* === SELL (SO) MODAL === */}
                            <Dialog open={isSellModalOpen} onOpenChange={setIsSellModalOpen}>
                                <DialogContent className="max-w-lg bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5]">
                                    <DialogHeader>
                                        <DialogTitle className="text-base font-medium text-[#faf9f5]">New sales order</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4 space-y-4">
                                        <div className="space-y-1">
                                            <Label className="text-xs text-muted-foreground">Product</Label>
                                            <div className="text-sm font-medium text-[#faf9f5]">
                                                [{sellModalVariant?.sku}] {name} / {sellModalVariant?.attributes || 'DEFAULT'}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label className="text-xs text-muted-foreground">Quantity</Label>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="number"
                                                        className="h-9 w-24 bg-[#1e1e1e] border-[#3a3a38] text-[#faf9f5] focus-visible:ring-1 focus-visible:ring-[#3a3a38] focus-visible:border-[#d97757]"
                                                        value={soQuantity}
                                                        onChange={(e) => setSoQuantity(e.target.value)}
                                                    />
                                                    <span className="text-xs text-muted-foreground">{item?.uom}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs text-muted-foreground">Calculated stock</Label>
                                                <div className="text-sm font-medium text-[#faf9f5] pt-2">
                                                    {sellModalVariant?.inStock || 0} {item?.uom}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label className="text-xs text-muted-foreground text-red-500">Customer</Label>
                                                <Input
                                                    className="h-9 bg-[#1e1e1e] border-[#3a3a38] text-[#faf9f5] focus-visible:ring-1 focus-visible:ring-[#3a3a38] focus-visible:border-[#d97757]"
                                                    placeholder="Search or create customer"
                                                    value={soCustomer}
                                                    onChange={(e) => setSoCustomer(e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs text-muted-foreground">Sales order #</Label>
                                                <div className="text-sm text-muted-foreground pt-2">SO-{Math.floor(29 + Math.random() * 100)}</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label className="text-xs text-muted-foreground">Delivery deadline</Label>
                                                <Input
                                                    type="date"
                                                    className="h-9 bg-[#1e1e1e] border-[#3a3a38] text-[#faf9f5] focus-visible:ring-1 focus-visible:ring-[#3a3a38] focus-visible:border-[#d97757] [color-scheme:dark]"
                                                    value={soDeadline}
                                                    onChange={(e) => setSoDeadline(e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs text-muted-foreground">Ship from</Label>
                                                <Select value={soLocation} onValueChange={setSoLocation}>
                                                    <SelectTrigger className="h-9 bg-[#1e1e1e] border-[#3a3a38] text-[#faf9f5] focus:ring-1 focus:ring-[#3a3a38]">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5]">
                                                        {warehouses.map(wh => (
                                                            <SelectItem key={wh.id} value={wh.id} className="hover:bg-secondary/20 focus:bg-secondary/20">{wh.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground italic">
                                            More parameters available on full sales order card
                                        </p>
                                    </div>
                                    <DialogFooter className="gap-2">
                                        <Button variant="ghost" onClick={() => setIsSellModalOpen(false)} className="text-muted-foreground hover:bg-secondary/20 hover:text-[#faf9f5]">Cancel</Button>
                                        <Button variant="outline" onClick={() => handleCreateSO(true)} disabled={!soCustomer} className="border-[#3a3a38] text-[#faf9f5] hover:bg-secondary/20">
                                            Create and open order
                                        </Button>
                                        <Button onClick={() => handleCreateSO(false)} disabled={!soCustomer} className="bg-[#d97757] text-white hover:bg-[#c66a4d] border-none">
                                            Create and close
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            {/* === DELETE CONFIRMATION MODAL === */}
                            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                                <DialogContent className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5] max-w-md p-0 overflow-hidden shadow-2xl">
                                    <DialogHeader className="px-5 pt-5 pb-2">
                                        <DialogTitle className="text-lg font-semibold tracking-tight">
                                            Delete the &quot;{deleteModalVariant?.sku}&quot; variant
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="px-5 pt-1 pb-4 space-y-3">
                                        <p className="text-[13px] text-[#faf9f5] leading-relaxed">
                                            Are you sure you want to delete this variant?
                                        </p>
                                        <p className="text-[13px] text-[#faf9f5] leading-relaxed">
                                            <strong className="font-bold">This action cannot be undone.</strong> All related recipes, operations, and inventory records will be removed.
                                        </p>
                                    </div>
                                    <div className="flex justify-end gap-3 px-5 py-4 bg-[#1a1a18]">
                                        <Button
                                            variant="ghost"
                                            onClick={() => setIsDeleteModalOpen(false)}
                                            className="h-8 px-4 text-sm font-medium border border-[#3a3a38] hover:bg-white/[0.05] text-[#faf9f5]"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleDeleteVariant}
                                            className="h-8 px-3 bg-[#d97371] hover:bg-[#d97371]/90 text-white text-sm font-medium shadow-sm transition-colors"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            {/* === USABILITY CONFIRMATION DIALOG === */}
                            <Dialog open={showUsabilityConfirm} onOpenChange={setShowUsabilityConfirm}>
                                <DialogContent className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5] max-w-md p-0 overflow-hidden shadow-2xl">
                                    <DialogHeader className="px-5 pt-5 pb-2">
                                        <DialogTitle className="text-lg font-semibold tracking-tight">
                                            {usabilityConfirmAction?.type === 'sell' && 'Disable selling'}
                                            {usabilityConfirmAction?.type === 'buy' && 'Disable buying'}
                                            {usabilityConfirmAction?.type === 'make' && 'Disable making'}
                                            {usabilityConfirmAction?.type === 'kit' && 'Disable kit/bundle'}
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="px-5 pt-1 pb-4 space-y-3">
                                        <p className="text-[13px] text-[#faf9f5] leading-relaxed">
                                            {usabilityConfirmAction?.type === 'sell' && (
                                                <>
                                                    This <span className="font-semibold text-[#faf9f5]">prevents the item from being added to any new sales orders</span>, but doesn&apos;t affect sales orders that already contain the item.
                                                </>
                                            )}
                                            {usabilityConfirmAction?.type === 'buy' && (
                                                <>
                                                    This <span className="font-semibold text-[#faf9f5]">prevents the item from being added to any new purchase orders</span>, but doesn&apos;t affect purchase orders that already contain the item.
                                                </>
                                            )}
                                            {usabilityConfirmAction?.type === 'make' && (
                                                <>
                                                    This <span className="font-semibold text-[#faf9f5]">prevents the item from being added to any new manufacturing orders</span>, but doesn&apos;t affect manufacturing orders that already contain the item.
                                                </>
                                            )}
                                            {usabilityConfirmAction?.type === 'kit' && (
                                                <>
                                                    This <span className="font-semibold text-[#faf9f5]">prevents this item from being a kit/bundle for new orders</span>, but doesn&apos;t affect any orders that already contain this item as a kit/bundle.
                                                </>
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex justify-end gap-3 px-5 py-4 bg-[#1a1a18]">
                                        <Button
                                            variant="ghost"
                                            onClick={() => {
                                                setShowUsabilityConfirm(false);
                                                setUsabilityConfirmAction(null);
                                            }}
                                            className="h-8 px-4 text-sm font-medium border border-[#3a3a38] hover:bg-white/[0.05] text-[#faf9f5]"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                if (usabilityConfirmAction) {
                                                    setUsability({ ...usability, [usabilityConfirmAction.type]: false });
                                                }
                                                setShowUsabilityConfirm(false);
                                                setUsabilityConfirmAction(null);
                                            }}
                                            className="h-8 px-3 bg-[#d97371] hover:bg-[#d97371]/90 text-white text-sm font-medium shadow-sm transition-colors"
                                        >
                                            Disable
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            {/* === INVENTORY INTEL DIALOG === */}
                            <Dialog open={showInventoryIntel} onOpenChange={(open) => {
                                setShowInventoryIntel(open);
                                if (!open) {
                                    setSelectedIngredientForIntel(null);
                                    setInventoryIntelData(null);
                                }
                            }}>
                                <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5]">
                                    {/* Header with ingredient info */}
                                    <div className="flex items-start justify-between border-b border-[#3a3a38] pb-4">
                                        <div>
                                            <div className="text-xs text-muted-foreground">Inventory Intel of</div>
                                            <div className="text-lg font-medium text-[#faf9f5]">
                                                [{selectedIngredientForIntel?.sku}] {selectedIngredientForIntel?.name}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground">Batch #</span>
                                                <span className="text-sm text-[#faf9f5]">- All -</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground">Location</span>
                                                <span className="text-sm text-[#faf9f5]">MMH Kelowna</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stock Summary Cards */}
                                    <div className="grid grid-cols-5 gap-3 py-4 border-b border-[#3a3a38]">
                                        <div className="border border-[#3a3a38] rounded-lg p-3 bg-secondary/5">
                                            <div className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">In stock</div>
                                            <div className="text-lg font-semibold text-[#faf9f5]">
                                                {loadingInventoryIntel ? '...' : (inventoryIntelData?.inStock?.toFixed(5) || '0')}
                                                <span className="text-xs text-muted-foreground font-normal ml-1">{inventoryIntelData?.uom || selectedIngredientForIntel?.uom || 'pcs'}</span>
                                            </div>
                                        </div>
                                        <div className="border border-[#3a3a38] rounded-lg p-3 bg-secondary/5">
                                            <div className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Expected</div>
                                            <div className="text-lg font-semibold text-[#faf9f5]">
                                                {loadingInventoryIntel ? '...' : (inventoryIntelData?.expected || 0)}
                                                <span className="text-xs text-muted-foreground font-normal ml-1">{inventoryIntelData?.uom || selectedIngredientForIntel?.uom || 'pcs'}</span>
                                            </div>
                                        </div>
                                        <div className="border border-[#3a3a38] rounded-lg p-3 bg-secondary/5">
                                            <div className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Committed</div>
                                            <div className="text-lg font-semibold text-[#faf9f5]">
                                                {loadingInventoryIntel ? '...' : (inventoryIntelData?.committed || 0)}
                                                <span className="text-xs text-muted-foreground font-normal ml-1">{inventoryIntelData?.uom || selectedIngredientForIntel?.uom || 'pcs'}</span>
                                            </div>
                                        </div>
                                        <div className="border border-[#3a3a38] rounded-lg p-3 bg-secondary/5">
                                            <div className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Safety stock</div>
                                            <div className="text-lg font-semibold text-[#faf9f5]">
                                                {loadingInventoryIntel ? '...' : (inventoryIntelData?.safetyStock || 0)}
                                                <span className="text-xs text-muted-foreground font-normal ml-1">{inventoryIntelData?.uom || selectedIngredientForIntel?.uom || 'pcs'}</span>
                                            </div>
                                        </div>
                                        <div className="border border-[#3a3a38] rounded-lg p-3 bg-secondary/5">
                                            <div className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Calculated stock</div>
                                            <div className="text-lg font-semibold text-[#faf9f5]">
                                                {loadingInventoryIntel ? '...' : (inventoryIntelData?.calculatedStock?.toFixed(5) || '0')}
                                                <span className="text-xs text-muted-foreground font-normal ml-1">{inventoryIntelData?.uom || selectedIngredientForIntel?.uom || 'pcs'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex items-center gap-2 py-3 border-b border-[#3a3a38]">
                                        <Button variant="outline" size="sm" className="text-xs border-[#3a3a38] text-[#faf9f5] hover:bg-secondary/20">
                                            Export
                                        </Button>
                                        <Button variant="outline" size="sm" className="text-xs border-[#3a3a38] text-[#faf9f5] hover:bg-secondary/20">
                                            Buy
                                        </Button>
                                    </div>

                                    {/* Stock Movements Table */}
                                    <div className="flex-1 overflow-auto">
                                        <table className="w-full text-sm">
                                            <thead className="sticky top-0 bg-[#1a1a18]">
                                                <tr className="border-b border-[#3a3a38] bg-secondary/10 text-[11px] text-muted-foreground uppercase tracking-wider">
                                                    <th className="px-3 py-2 text-left font-medium whitespace-nowrap">
                                                        <div className="flex items-center gap-1">
                                                            Movement date <Info size={10} className="text-muted-foreground" />
                                                        </div>
                                                    </th>
                                                    <th className="px-3 py-2 text-left font-medium whitespace-nowrap">
                                                        <div className="flex items-center gap-1">
                                                            Caused by <Info size={10} className="text-muted-foreground" />
                                                        </div>
                                                    </th>
                                                    <th className="px-3 py-2 text-right font-medium whitespace-nowrap">
                                                        <div className="flex items-center justify-end gap-1">
                                                            Quantity change <Info size={10} className="text-muted-foreground" />
                                                        </div>
                                                    </th>
                                                    <th className="px-3 py-2 text-right font-medium whitespace-nowrap">
                                                        <div className="flex items-center justify-end gap-1">
                                                            Cost/price per unit <Info size={10} className="text-muted-foreground" />
                                                        </div>
                                                    </th>
                                                    <th className="px-3 py-2 text-right font-medium whitespace-nowrap">
                                                        <div className="flex items-center justify-end gap-1">
                                                            Balance after <Info size={10} className="text-muted-foreground" />
                                                        </div>
                                                    </th>
                                                    <th className="px-3 py-2 text-right font-medium whitespace-nowrap">
                                                        <div className="flex items-center justify-end gap-1">
                                                            Value in stock after <Info size={10} className="text-muted-foreground" />
                                                        </div>
                                                    </th>
                                                    <th className="px-3 py-2 text-right font-medium whitespace-nowrap">
                                                        <div className="flex items-center justify-end gap-1">
                                                            Average cost after <Info size={10} className="text-muted-foreground" />
                                                        </div>
                                                    </th>
                                                </tr>
                                                {/* Filter row */}
                                                <tr className="border-b border-[#3a3a38] bg-secondary/5">
                                                    <th className="px-3 py-1">
                                                        <Input className="h-6 text-xs bg-transparent border-[#3a3a38] text-[#faf9f5] focus-visible:ring-1 focus-visible:ring-[#3a3a38]" placeholder="All dates" />
                                                    </th>
                                                    <th className="px-3 py-1">
                                                        <Input className="h-6 text-xs bg-transparent border-[#3a3a38] text-[#faf9f5] focus-visible:ring-1 focus-visible:ring-[#3a3a38]" placeholder="Filter" />
                                                    </th>
                                                    <th className="px-3 py-1">
                                                        <Input className="h-6 text-xs bg-transparent border-[#3a3a38] text-[#faf9f5] text-right focus-visible:ring-1 focus-visible:ring-[#3a3a38]" placeholder="Filter" />
                                                    </th>
                                                    <th className="px-3 py-1">
                                                        <Input className="h-6 text-xs bg-transparent border-[#3a3a38] text-[#faf9f5] text-right focus-visible:ring-1 focus-visible:ring-[#3a3a38]" placeholder="Filter" />
                                                    </th>
                                                    <th className="px-3 py-1">
                                                        <Input className="h-6 text-xs bg-transparent border-[#3a3a38] text-[#faf9f5] text-right focus-visible:ring-1 focus-visible:ring-[#3a3a38]" placeholder="Filter" />
                                                    </th>
                                                    <th className="px-3 py-1">
                                                        <Input className="h-6 text-xs bg-transparent border-[#3a3a38] text-[#faf9f5] text-right focus-visible:ring-1 focus-visible:ring-[#3a3a38]" placeholder="Filter" />
                                                    </th>
                                                    <th className="px-3 py-1">
                                                        <Input className="h-6 text-xs bg-transparent border-[#3a3a38] text-[#faf9f5] text-right focus-visible:ring-1 focus-visible:ring-[#3a3a38]" placeholder="Filter" />
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loadingInventoryIntel ? (
                                                    <tr>
                                                        <td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">
                                                            <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                                                            Loading...
                                                        </td>
                                                    </tr>
                                                ) : inventoryIntelData?.movements && inventoryIntelData.movements.length > 0 ? (
                                                    inventoryIntelData.movements.map((movement) => (
                                                        <tr key={movement.id} className="border-b border-border hover:bg-secondary/10">
                                                            <td className="px-3 py-2 text-sm whitespace-nowrap">
                                                                {movement.date ? new Date(movement.date).toLocaleString('en-US', {
                                                                    year: 'numeric',
                                                                    month: '2-digit',
                                                                    day: '2-digit',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                }) : '-'}
                                                            </td>
                                                            <td className="px-3 py-2 text-sm">
                                                                <span className="text-[#5b9bd5] hover:underline cursor-pointer">
                                                                    {movement.type}
                                                                </span>
                                                            </td>
                                                            <td className={cn(
                                                                "px-3 py-2 text-sm text-right",
                                                                movement.change < 0 ? "text-red-500" : ""
                                                            )}>
                                                                {movement.change}
                                                            </td>
                                                            <td className="px-3 py-2 text-sm text-right">
                                                                {movement.price?.toFixed(5) || '-'} <span className="text-muted-foreground">CAD</span>
                                                            </td>
                                                            <td className="px-3 py-2 text-sm text-right">
                                                                {movement.balance?.toFixed(5) || '-'}
                                                            </td>
                                                            <td className="px-3 py-2 text-sm text-right">
                                                                {movement.value?.toFixed(5) || '-'} <span className="text-muted-foreground">CAD</span>
                                                            </td>
                                                            <td className="px-3 py-2 text-sm text-right">
                                                                {movement.avgCost?.toFixed(5) || '-'} <span className="text-muted-foreground">CAD</span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">
                                                            No stock movements found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            {/* Additional Info (Rich Text) */}
                            <div className="border border-border rounded-lg bg-background overflow-hidden relative z-0">
                                <div className="px-4 py-2 bg-secondary/5 border-b border-border flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <span>Additional info</span>
                                    <TooltipProvider>
                                        <Tooltip delayDuration={300}>
                                            <TooltipTrigger asChild><Info size={12} className="cursor-help" /></TooltipTrigger>
                                            <TooltipContent className="max-w-xs bg-secondary text-foreground border-border"><p className="text-xs">Internal notes for this product.</p></TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <RichTextEditor
                                    content={additionalInfo}
                                    onChange={setAdditionalInfo}
                                    className="border-0 rounded-none shadow-none"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'Product recipe / BOM' && (
                        <div className="space-y-4">
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-medium text-foreground">Ingredients</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">Active Variant</span>
                                        <SearchableSelect
                                            value={activeVariantId}
                                            options={item.variants.map(v => ({
                                                id: v.id,
                                                name: `[${v.sku || 'null'}] ${v.attributes || item.name}`
                                            }))}
                                            onChange={(val) => {
                                                console.log('[VARIANT SELECT LOG] User selected:', val);
                                                setActiveVariantId(val);
                                            }}
                                            placeholder="Select variant..."
                                            searchPlaceholder="Search variants..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Ingredients Card */}
                            <div className="bg-background rounded-lg border border-[#3a3a38]">
                                {/* Ingredients Table */}
                                <div className="overflow-hidden">
                                <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
                                    <table className="w-full text-left border-collapse min-w-[900px]">
                                        <thead>
                                            <tr className="border-b border-[#3a3a38] bg-[#222220] text-[11px] text-[#7a7974] font-medium uppercase tracking-wider h-8">
                                                <th className="p-2 w-[30px] text-center font-medium whitespace-nowrap border-r border-[#3a3a38]/50"></th>
                                                <th className="px-3 py-0 text-left font-medium min-w-[350px] whitespace-nowrap border-r border-[#3a3a38]/50">Item</th>
                                                <th className="px-3 py-0 text-right font-medium min-w-[120px] whitespace-nowrap border-r border-[#3a3a38]/50">Quantity</th>
                                                <th className="px-3 py-0 text-left font-medium min-w-[180px] whitespace-nowrap border-r border-[#3a3a38]/50">Notes</th>
                                                <th className="px-3 py-0 text-left font-medium min-w-[150px] whitespace-nowrap border-r border-[#3a3a38]/50">Stock cost</th>
                                                <th className="p-2 w-[50px] font-medium whitespace-nowrap text-center"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#3a3a38] text-sm">
                                            {filteredRecipeItems.map((ing, idx) => (
                                                <tr
                                                    key={ing.variantId}
                                                    draggable
                                                    onDragStart={(e) => handleIngredientDragStart(e, idx)}
                                                    onDragOver={(e) => handleIngredientDragOver(e, idx)}
                                                    onDrop={(e) => handleIngredientDrop(e, idx)}
                                                    onDragEnd={handleIngredientDragEnd}
                                                    className={cn(
                                                        "h-8 hover:bg-secondary/20 transition-colors group cursor-default",
                                                        draggedIngredientIndex === idx && "opacity-50",
                                                        dragOverIngredientIndex === idx && draggedIngredientIndex !== idx && "border-t-2 border-t-[#d97757]"
                                                    )}
                                                >
                                                    <td className="p-1 text-center border-r border-[#3a3a38]/50 cursor-grab active:cursor-grabbing">
                                                        <div className="flex items-center justify-center">
                                                            <GripVertical size={14} className="text-[#5a5a58] opacity-50 group-hover:opacity-100 transition-opacity" />
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-0 border-r border-[#3a3a38]/50">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span
                                                                className="cursor-pointer text-[#faf9f5] font-medium"
                                                                onClick={() => router.push(`/items/${ing.itemId}?type=Material`)}
                                                            >
                                                                {ing.name}
                                                            </span>
                                                            <ExternalLink
                                                                size={12}
                                                                className="text-[#faf9f5] opacity-0 group-hover:opacity-100 cursor-pointer shrink-0"
                                                                onClick={() => router.push(`/items/${ing.itemId}?type=Material`)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-0 border-r border-[#3a3a38]/50">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Input
                                                                type="number"
                                                                step="0.00001"
                                                                className="h-6 w-16 text-xs text-right bg-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm px-1 shadow-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                defaultValue={ing.quantity}
                                                                onFocus={(e) => e.target.select()}
                                                                onBlur={(e) => {
                                                                    const newVal = parseFloat(e.target.value);
                                                                    if (!isNaN(newVal) && newVal !== ing.quantity) {
                                                                        handleUpdateIngredientQuantity(ing, newVal);
                                                                    }
                                                                }}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        (e.target as HTMLInputElement).blur();
                                                                    }
                                                                }}
                                                            />
                                                            <span className="text-[11px] text-[#bebcb3] whitespace-nowrap">{ing.uom}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-0 border-r border-[#3a3a38]/50">
                                                        <Input
                                                            type="text"
                                                            className="h-6 w-full text-xs bg-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm px-1 shadow-none text-muted-foreground italic placeholder:text-muted-foreground"
                                                            defaultValue={ing.notes || ''}
                                                            placeholder="Add notes..."
                                                            onBlur={(e) => {
                                                                const newNotes = e.target.value.trim();
                                                                if (newNotes !== (ing.notes || '')) {
                                                                    handleUpdateIngredientNotes(ing, newNotes);
                                                                }
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    (e.target as HTMLInputElement).blur();
                                                                }
                                                            }}
                                                        />
                                                    </td>
                                                    <td className="px-2 py-0 border-r border-[#3a3a38]/50">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <span className="text-foreground text-xs font-medium">
                                                                {ing.cost.toFixed(5)}
                                                            </span>
                                                            <span className="text-[#bebcb3] text-[11px]">CAD</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => loadInventoryIntel(ing)}
                                                                className="p-0.5 hover:bg-secondary rounded"
                                                                title="View inventory intel"
                                                            >
                                                                <Info size={12} className="text-[#7a7974] hover:text-[#bebcb3]" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="p-1 text-center">
                                                        <button className="text-[#ff7b6f] opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[#ff7b6f]/10 rounded" onClick={() => handleDeleteIngredient(ing)}>
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {/* Empty Row for Adding New Ingredient */}
                                            {isAddingIngredient && (
                                                <tr className="hover:bg-secondary/20 transition-colors">
                                                    <td className="p-2 text-center border-r border-[#3a3a38]/50">
                                                        <div className="flex items-center justify-center">
                                                            <GripVertical size={14} className="text-[#5a5a58] opacity-30" />
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-1 border-r border-border/50">
                                                        <CreatableCombobox
                                                            options={ingredientResults.map(r => ({ label: r.name, value: r.name }))}
                                                            value={ingredientSearch}
                                                            onChange={(val) => {
                                                                setIngredientSearch(val);
                                                                const match = ingredientResults.find(r => r.name === val);
                                                                if (match) handleQuickAddIngredient(match);
                                                            }}
                                                            onCreate={async (name) => {
                                                                const sku = window.prompt(`Enter SKU for new material "${name}":`, '');
                                                                if (!sku || !sku.trim()) {
                                                                    alert('SKU is required to create a material');
                                                                    return;
                                                                }
                                                                const newId = await createKatanaItem(name, 'material', sku);
                                                                if (newId) {
                                                                    const details = await fetchKatanaItemDetails(newId);
                                                                    if (details && details.variants.length > 0) {
                                                                        handleQuickAddIngredient({ variantId: details.variants[0].id, name });
                                                                    }
                                                                } else {
                                                                    alert('Failed to create material. SKU may already be in use.');
                                                                }
                                                            }}
                                                            placeholder="Search or create a material or a product"
                                                        />
                                                    </td>
                                                    <td className="px-3 py-1 border-r border-border/50">
                                                        <div className="flex items-center gap-1">
                                                            <Input
                                                                type="number"
                                                                className="h-7 w-20 bg-transparent border-0 p-1 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none hover:bg-secondary/10 rounded-sm font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                value={ingredientQuantity}
                                                                onChange={(e) => setIngredientQuantity(e.target.value)}
                                                                placeholder="1"
                                                            />
                                                            <span className="text-muted-foreground text-[11px] whitespace-nowrap">pcs</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-1 border-r border-border/50 text-muted-foreground">-</td>
                                                    <td className="px-3 py-1 border-r border-border/50 text-muted-foreground">-</td>
                                                    <td className="p-4 text-center">
                                                        <button
                                                            className="text-muted-foreground hover:text-red-600 p-1"
                                                            onClick={() => {
                                                                setIsAddingIngredient(false);
                                                                setSelectedIngredient(null);
                                                                setIngredientQuantity('1');
                                                                setIngredientSearch('');
                                                                setIngredientOpen(false);
                                                            }}
                                                            title="Cancel"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )}
                                            {filteredRecipeItems.length === 0 && !isAddingIngredient && (
                                                <tr>
                                                    <td colSpan={6} className="p-8 text-center text-muted-foreground text-sm">No ingredients found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot>
                                            <tr className="border-t border-[#3a3a38] bg-[#262624]/30">
                                                <td colSpan={4} className="p-2">
                                                    <button
                                                        className="text-[#7a7974] hover:text-[#d97757] hover:bg-white/[0.03] h-8 px-2 text-xs font-medium flex items-center gap-1.5 transition-all rounded"
                                                        onClick={() => {
                                                            setIsAddingIngredient(true);
                                                            setIngredientOpen(true);
                                                            setIngredientSearch('');
                                                            setSelectedIngredient(null);
                                                            setIngredientQuantity('1');
                                                        }}
                                                    >
                                                        <Plus size={14} /> Add row
                                                    </button>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="text-sm font-medium text-foreground">Total cost:</span>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-sm font-bold text-foreground">{filteredRecipeItems.reduce((acc, i) => acc + i.cost, 0).toFixed(2)}</span>
                                                            <span className="text-[11px] text-[#bebcb3]">CAD</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                </div>
                            </div>

                            {/* === COPY TO MODAL === */}
                            <Dialog open={isCopyToModalOpen} onOpenChange={setIsCopyToModalOpen}>
                                <DialogContent className="max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle className="text-base font-medium">Select a product or variant to copy to</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4">
                                        {copyToStep === 1 && (
                                            <>
                                                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">1</span>
                                                        <span className="font-medium text-foreground">Select target</span>
                                                    </div>
                                                    <div className="flex-1 h-px bg-border"></div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center">2</span>
                                                        <span>Review</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs text-muted-foreground">Product or variant to copy recipe to</Label>
                                                    <Input
                                                        placeholder="Search..."
                                                        className="h-9 mb-3"
                                                        value={copyToSearch}
                                                        onChange={(e) => setCopyToSearch(e.target.value)}
                                                    />
                                                    <div className="max-h-[200px] overflow-y-auto border border-border rounded-md">
                                                        {copyToVariants
                                                            .filter(v => v.name.toLowerCase().includes(copyToSearch.toLowerCase()))
                                                            .map(v => (
                                                                <div
                                                                    key={v.id}
                                                                    className="flex items-center gap-2 p-2 hover:bg-secondary/20 cursor-pointer border-b border-border last:border-0"
                                                                    onClick={() => {
                                                                        if (copyToTargets.includes(v.id)) {
                                                                            setCopyToTargets(copyToTargets.filter(id => id !== v.id));
                                                                        } else {
                                                                            setCopyToTargets([...copyToTargets, v.id]);
                                                                        }
                                                                    }}
                                                                >
                                                                    <Checkbox checked={copyToTargets.includes(v.id)} />
                                                                    <span className="text-sm">{v.name}</span>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {copyToStep === 2 && (
                                            <div className="space-y-4">
                                                <p className="text-sm">
                                                    Copy recipe from <span className="font-medium">{getActiveVariantName()}</span> to:
                                                </p>
                                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                                    {copyToTargets.map(id => {
                                                        const v = copyToVariants.find(v => v.id === id);
                                                        return <li key={id}>{v?.name}</li>;
                                                    })}
                                                </ul>
                                                <p className="text-xs text-amber-600">
                                                    This will replace any existing recipes on the target variants.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <DialogFooter>
                                        <Button variant="ghost" onClick={() => setIsCopyToModalOpen(false)}>Cancel</Button>
                                        {copyToStep === 1 ? (
                                            <Button
                                                onClick={() => setCopyToStep(2)}
                                                disabled={copyToTargets.length === 0}
                                            >
                                                Next
                                            </Button>
                                        ) : (
                                            <>
                                                <Button variant="outline" onClick={() => setCopyToStep(1)}>Back</Button>
                                                <Button onClick={handleCopyTo}>Copy Recipe</Button>
                                            </>
                                        )}
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            {/* === COPY FROM MODAL === */}
                            <Dialog open={isCopyFromModalOpen} onOpenChange={setIsCopyFromModalOpen}>
                                <DialogContent className="max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle className="text-base font-medium flex items-center gap-2">
                                            <Search size={16} />
                                            Search for item to copy BOM from...
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <Input
                                            placeholder="Search products with recipes..."
                                            className="h-9 mb-3"
                                            value={copyFromSearch}
                                            onChange={(e) => setCopyFromSearch(e.target.value)}
                                            autoFocus
                                        />
                                        <div className="max-h-[250px] overflow-y-auto border border-border rounded-md">
                                            {copyFromResults.length > 0 ? (
                                                copyFromResults.map(r => (
                                                    <div
                                                        key={r.variantId}
                                                        className={cn(
                                                            "flex items-center gap-2 p-3 hover:bg-secondary/20 cursor-pointer border-b border-border last:border-0",
                                                            copyFromSelected === r.variantId && "bg-primary/10"
                                                        )}
                                                        onClick={() => setCopyFromSelected(r.variantId)}
                                                    >
                                                        <div className={cn(
                                                            "w-4 h-4 rounded-full border flex items-center justify-center",
                                                            copyFromSelected === r.variantId ? "border-primary" : "border-muted-foreground"
                                                        )}>
                                                            {copyFromSelected === r.variantId && <div className="w-2 h-2 rounded-full bg-primary" />}
                                                        </div>
                                                        <span className="text-sm">{r.name}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-4 text-center text-muted-foreground text-sm">
                                                    No products with recipes found
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="ghost" onClick={() => setIsCopyFromModalOpen(false)}>Cancel</Button>
                                        <Button onClick={handleCopyFrom} disabled={!copyFromSelected}>
                                            Copy Recipe
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}

                    {activeTab === 'Production operations' && (
                        <div className="space-y-4">
                            {/* Header Section */}
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-foreground">Operation steps</h3>
                                <div className="flex items-center gap-4">
                                    {/* Operations in Sequence Toggle */}
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <span className="text-sm text-muted-foreground">Operations are in sequence</span>
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked={operationsInSequence}
                                            onClick={() => setOperationsInSequence(!operationsInSequence)}
                                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${operationsInSequence ? 'bg-[#a5d6ff]' : 'bg-[#3a3a38]'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${operationsInSequence ? 'translate-x-4' : 'translate-x-0.5'
                                                    }`}
                                            />
                                        </button>
                                    </label>

                                </div>
                            </div>

                            {/* Operations Table */}
                            <div className="bg-background rounded-lg border border-[#3a3a38] overflow-visible">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#3a3a38] bg-[#222220] text-[11px] text-[#7a7974] font-medium uppercase tracking-wider h-8">
                                            <th className="p-2 w-10 border-r border-[#3a3a38]/50"></th>
                                            {operationsInSequence && (
                                                <th className="px-3 py-0 w-16 border-r border-[#3a3a38]/50 text-center">
                                                    Step
                                                </th>
                                            )}
                                            <th className="px-3 py-0 min-w-[200px] border-r border-[#3a3a38]/50">
                                                Operation
                                            </th>
                                            <th className="px-3 py-0 w-28 border-r border-[#3a3a38]/50">
                                                Type
                                            </th>
                                            <th className="px-3 py-0 w-40 border-r border-[#3a3a38]/50">
                                                Resource
                                            </th>
                                            <th className="px-3 py-0 text-right w-32 border-r border-[#3a3a38]/50">
                                                Cost para.
                                            </th>
                                            <th className="px-3 py-0 text-right w-24 border-r border-[#3a3a38]/50">
                                                Time
                                            </th>
                                            <th className="px-3 py-0 w-32 border-r border-[#3a3a38]/50">
                                                Product: TYPE
                                            </th>
                                            <th className="px-3 py-0 text-right w-32 border-r border-[#3a3a38]/50">
                                                Cost
                                            </th>
                                            <th className="p-2 w-12"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border text-sm">
                                        {productOperations.length === 0 ? (
                                            <tr>
                                                <td colSpan={operationsInSequence ? 10 : 9} className="p-8 text-center text-muted-foreground">
                                                    No operations defined. Click "+ Add row" to add an operation.
                                                </td>
                                            </tr>
                                        ) : (
                                            productOperations.map((op, index) => (
                                                <tr
                                                    key={op.id}
                                                    className={cn(
                                                        "h-8 hover:bg-secondary/20 transition-colors group cursor-default",
                                                        draggedOperationIndex === index && "opacity-50",
                                                        dragOverOperationIndex === index && draggedOperationIndex !== index && "border-t-2 border-t-[#d97757]"
                                                    )}
                                                    draggable
                                                    onDragStart={(e) => handleOperationDragStart(e, index)}
                                                    onDragOver={(e) => handleOperationDragOver(e, index)}
                                                    onDrop={(e) => handleOperationDrop(e, index)}
                                                    onDragEnd={handleOperationDragEnd}
                                                >
                                                    {/* Drag Handle */}
                                                    <td className="p-1 cursor-grab active:cursor-grabbing border-r border-r-[#3a3a38]/50">
                                                        <div className="flex items-center justify-center">
                                                            <GripVertical size={14} className="text-[#5a5a58] opacity-50 group-hover:opacity-100 transition-opacity mx-auto" />
                                                        </div>
                                                    </td>

                                                    {/* Step - shown when operations are in sequence */}
                                                    {operationsInSequence && (
                                                        <td className="px-2 py-0 border-r border-border/50 text-center text-sm text-muted-foreground">
                                                            {index + 1}
                                                        </td>
                                                    )}

                                                    {/* Operation Name - Searchable dropdown */}
                                                    <td className="p-1 border-r border-border/50">
                                                        <div className="relative">
                                                            <button
                                                                onClick={() => setActiveOperationPicker(activeOperationPicker === op.id ? null : op.id)}
                                                                className="w-full h-7 text-xs px-3 bg-transparent border border-border/50 rounded-md focus:ring-0 shadow-none flex items-center justify-start text-left"
                                                            >
                                                                <span className="truncate">{op.operationName || 'Select operation...'}</span>
                                                            </button>
                                                            {activeOperationPicker === op.id && (
                                                                <>
                                                                    <div className="fixed inset-0 z-[9998]" onClick={() => setActiveOperationPicker(null)} />
                                                                    <div className="absolute left-0 top-full mt-1 bg-[#1f1f1d] border border-[#3a3a38] rounded-md shadow-lg z-[9999] w-[300px] max-h-[350px] flex flex-col py-1 px-1">
                                                                        {/* Options List */}
                                                                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                                                                            {operationOptions.map(opName => (
                                                                                <button
                                                                                    key={opName}
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        handleUpdateItemOperation(op.id, 'operationName', opName);
                                                                                        setActiveOperationPicker(null);
                                                                                        setOperationSearchQuery('');
                                                                                    }}
                                                                                    className={`w-full px-2 py-1 text-left text-sm text-[#faf9f5] hover:bg-white/[0.05] rounded-md transition ${opName === op.operationName ? 'bg-white/[0.05]' : ''}`}
                                                                                >
                                                                                    {opName}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>

                                                    {/* Type */}
                                                    <td className="p-1 border-r border-border/50">
                                                        <div className="relative">
                                                            <button
                                                                onClick={() => setActiveTypePicker(activeTypePicker === op.id ? null : op.id)}
                                                                className="w-full h-7 text-xs px-3 bg-transparent border border-border/50 rounded-md focus:ring-0 shadow-none flex items-center justify-start text-left"
                                                            >
                                                                <span className="truncate">{op.operationType || 'Process'}</span>
                                                            </button>
                                                            {activeTypePicker === op.id && (
                                                                <>
                                                                    <div className="fixed inset-0 z-[9998]" onClick={() => setActiveTypePicker(null)} />
                                                                    <div className="absolute left-0 top-full mt-1 bg-[#1f1f1d] border border-[#3a3a38] rounded-md shadow-lg z-[9999] w-[180px] max-h-[350px] flex flex-col py-1 px-1">
                                                                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                                                                            {['Process', 'Setup', 'Per unit', 'Fixed cost'].map(type => (
                                                                                <button
                                                                                    key={type}
                                                                                    type="button"
                                                                                    className={`w-full px-2 py-1 text-left text-sm text-[#faf9f5] hover:bg-white/[0.05] rounded-md transition ${type === op.operationType ? 'bg-white/[0.05]' : ''}`}
                                                                                    onClick={() => {
                                                                                        handleUpdateItemOperation(op.id, 'operationType', type);
                                                                                        setActiveTypePicker(null);
                                                                                    }}
                                                                                >
                                                                                    {type}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>

                                                    {/* Resource - Searchable dropdown */}
                                                    <td className="p-1 border-r border-border/50">
                                                        <div className="relative">
                                                            <button
                                                                onClick={() => setActiveResourcePicker(activeResourcePicker === op.id ? null : op.id)}
                                                                className="w-full h-7 text-xs px-3 bg-transparent border border-border/50 rounded-md focus:ring-0 shadow-none flex items-center justify-start text-left"
                                                            >
                                                                <span className="truncate">{op.resourceName || 'Select resource...'}</span>
                                                            </button>
                                                            {activeResourcePicker === op.id && (
                                                                <>
                                                                    <div className="fixed inset-0 z-[9998]" onClick={() => setActiveResourcePicker(null)} />
                                                                    <div className="absolute left-0 top-full mt-1 bg-[#1f1f1d] border border-[#3a3a38] rounded-md shadow-lg z-[9999] w-[300px] max-h-[350px] flex flex-col py-1 px-1">
                                                                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                                                                            {resourceOptions.map(resName => (
                                                                                <button
                                                                                    key={resName}
                                                                                    type="button"
                                                                                    className={`w-full px-2 py-1 text-left text-sm text-[#faf9f5] hover:bg-white/[0.05] rounded-md transition-colors ${resName === op.resourceName ? 'bg-white/[0.05]' : ''}`}
                                                                                    onClick={() => {
                                                                                        handleUpdateItemOperation(op.id, 'resourceName', resName);
                                                                                        setActiveResourcePicker(null);
                                                                                    }}
                                                                                >
                                                                                    {resName}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>

                                                    {/* Cost Parameter */}
                                                    <td className="p-1 border-r border-border/50">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Input
                                                                type="number"
                                                                step="0.01"
                                                                className="h-7 w-16 text-right text-xs bg-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm px-2 shadow-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                defaultValue={op.costPerHour || 0}
                                                                onBlur={(e) => {
                                                                    const val = parseFloat(e.target.value);
                                                                    if (!isNaN(val) && val !== op.costPerHour) {
                                                                        handleUpdateItemOperation(op.id, 'costPerHour', val);
                                                                    }
                                                                }}
                                                            />
                                                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">CAD/h</span>
                                                        </div>
                                                    </td>

                                                    {/* Time - Dropdown time picker (auto-saves on blur) */}
                                                    <td className="p-1 border-r border-border/50">
                                                        <div className="relative">
                                                            <button
                                                                onClick={() => setActiveTimePicker(activeTimePicker === op.id ? null : op.id)}
                                                                className="w-full h-7 text-xs px-3 bg-transparent border border-border/50 rounded-md focus:ring-0 shadow-none flex items-center justify-end"
                                                            >
                                                                <span>{formatTimeDisplay(op.timeSeconds)}</span>
                                                            </button>
                                                            {activeTimePicker === op.id && (
                                                                <>
                                                                    <div className="fixed inset-0 z-[9998]" onClick={() => setActiveTimePicker(null)} />
                                                                    <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-lg p-3 shadow-xl z-[9999] min-w-[200px]">
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="flex flex-col items-center">
                                                                                <label className="text-[10px] text-muted-foreground mb-1">hrs</label>
                                                                                <Input
                                                                                    type="number"
                                                                                    min={0}
                                                                                    defaultValue={Math.floor((op.timeSeconds || 0) / 3600)}
                                                                                    className="w-14 h-8 text-center text-xs bg-transparent border-border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                                    onBlur={(e) => {
                                                                                        const hrs = parseInt(e.target.value) || 0;
                                                                                        const currentMins = Math.floor(((op.timeSeconds || 0) % 3600) / 60);
                                                                                        const currentSecs = (op.timeSeconds || 0) % 60;
                                                                                        const totalSeconds = (hrs * 3600) + (currentMins * 60) + currentSecs;
                                                                                        if (totalSeconds !== op.timeSeconds) {
                                                                                            handleUpdateItemOperation(op.id, 'timeSeconds', totalSeconds);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <span className="mt-4 text-muted-foreground">:</span>
                                                                            <div className="flex flex-col items-center">
                                                                                <label className="text-[10px] text-muted-foreground mb-1">min</label>
                                                                                <Input
                                                                                    type="number"
                                                                                    min={0}
                                                                                    max={59}
                                                                                    defaultValue={Math.floor(((op.timeSeconds || 0) % 3600) / 60)}
                                                                                    className="w-14 h-8 text-center text-xs bg-transparent border-border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                                    onBlur={(e) => {
                                                                                        const currentHrs = Math.floor((op.timeSeconds || 0) / 3600);
                                                                                        const mins = parseInt(e.target.value) || 0;
                                                                                        const currentSecs = (op.timeSeconds || 0) % 60;
                                                                                        const totalSeconds = (currentHrs * 3600) + (mins * 60) + currentSecs;
                                                                                        if (totalSeconds !== op.timeSeconds) {
                                                                                            handleUpdateItemOperation(op.id, 'timeSeconds', totalSeconds);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <span className="mt-4 text-muted-foreground">:</span>
                                                                            <div className="flex flex-col items-center">
                                                                                <label className="text-[10px] text-muted-foreground mb-1">sec</label>
                                                                                <Input
                                                                                    type="number"
                                                                                    min={0}
                                                                                    max={59}
                                                                                    defaultValue={(op.timeSeconds || 0) % 60}
                                                                                    className="w-14 h-8 text-center text-xs bg-transparent border-border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                                    onBlur={(e) => {
                                                                                        const currentHrs = Math.floor((op.timeSeconds || 0) / 3600);
                                                                                        const currentMins = Math.floor(((op.timeSeconds || 0) % 3600) / 60);
                                                                                        const secs = parseInt(e.target.value) || 0;
                                                                                        const totalSeconds = (currentHrs * 3600) + (currentMins * 60) + secs;
                                                                                        if (totalSeconds !== op.timeSeconds) {
                                                                                            handleUpdateItemOperation(op.id, 'timeSeconds', totalSeconds);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>

                                                    {/* Product Type - Multi-select checkbox dropdown for variant selection */}
                                                    <td className="p-1 border-r border-border/50">
                                                        <div className="relative">
                                                            <button
                                                                onClick={() => setActiveVariantPicker(activeVariantPicker === op.id ? null : op.id)}
                                                                className="w-full h-7 text-xs px-3 bg-transparent border border-border/50 rounded-md focus:ring-0 shadow-none flex items-center justify-start text-left"
                                                            >
                                                                <span className="truncate">
                                                                    {(() => {
                                                                        const selection = operationVariantSelections[op.id];
                                                                        if (!selection || selection.allSelected) return '- all -';
                                                                        if (selection.variantIds.length === 0) return '- all -';
                                                                        if (selection.variantIds.length === item.variants.length) return '- all -';
                                                                        // Show variant names/codes
                                                                        const selectedNames = selection.variantIds
                                                                            .map(vid => item.variants.find(v => v.id === vid))
                                                                            .filter(Boolean)
                                                                            .map(v => v!.option1Value || v!.sku || 'Variant')
                                                                            .join(', ');
                                                                        return selectedNames || '- all -';
                                                                    })()}
                                                                </span>
                                                            </button>
                                                            {activeVariantPicker === op.id && (
                                                                <>
                                                                    <div className="fixed inset-0 z-[9998]" onClick={() => setActiveVariantPicker(null)} />
                                                                    <div className="absolute left-0 top-full mt-1 bg-[#1f1f1d] border border-[#3a3a38] rounded-md shadow-lg z-[9999] w-[320px] max-h-[350px] flex flex-col py-1 px-1">
                                                                        {/* Options List */}
                                                                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                                                                            {/* "- All -" option */}
                                                                            <label
                                                                                className={`w-full px-2 py-1 text-left flex items-center gap-2 hover:bg-white/[0.05] rounded-md transition cursor-pointer ${(!operationVariantSelections[op.id] || operationVariantSelections[op.id]?.allSelected) ? 'bg-white/[0.05]' : ''
                                                                                    }`}
                                                                            >
                                                                                <Checkbox
                                                                                    checked={!operationVariantSelections[op.id] || operationVariantSelections[op.id]?.allSelected}
                                                                                    onCheckedChange={(checked) => {
                                                                                        if (checked) {
                                                                                            // Select all
                                                                                            setOperationVariantSelections(prev => ({
                                                                                                ...prev,
                                                                                                [op.id]: {
                                                                                                    allSelected: true,
                                                                                                    variantIds: item.variants.map(v => v.id)
                                                                                                }
                                                                                            }));
                                                                                        } else {
                                                                                            // Uncheck all - keep current variants selected but not "all"
                                                                                            setOperationVariantSelections(prev => ({
                                                                                                ...prev,
                                                                                                [op.id]: {
                                                                                                    allSelected: false,
                                                                                                    variantIds: prev[op.id]?.variantIds || item.variants.map(v => v.id)
                                                                                                }
                                                                                            }));
                                                                                        }
                                                                                    }}
                                                                                    className="data-[state=checked]:bg-[#3b82f6] data-[state=checked]:border-[#3b82f6] border-0"
                                                                                />
                                                                                <span className="text-[#faf9f5] text-sm">- All -</span>
                                                                            </label>

                                                                            {/* Individual variant options */}
                                                                            {item.variants.map(variant => {
                                                                                const selection = operationVariantSelections[op.id];
                                                                                const isSelected = !selection || selection.allSelected || selection.variantIds.includes(variant.id);
                                                                                const variantName = variant.option1Value || variant.attributes || variant.sku || 'Variant';

                                                                                return (
                                                                                    <label
                                                                                        key={variant.id}
                                                                                        className={`w-full px-2 py-1 text-left flex items-center gap-2 hover:bg-white/[0.05] rounded-md transition cursor-pointer ${isSelected ? 'bg-white/[0.05]' : ''}`}
                                                                                    >
                                                                                        <Checkbox
                                                                                            checked={isSelected}
                                                                                            onCheckedChange={(checked) => {
                                                                                                setOperationVariantSelections(prev => {
                                                                                                    const current = prev[op.id] || { allSelected: true, variantIds: item.variants.map(v => v.id) };
                                                                                                    let newVariantIds: string[];

                                                                                                    if (checked) {
                                                                                                        // Add variant
                                                                                                        newVariantIds = [...new Set([...current.variantIds, variant.id])];
                                                                                                    } else {
                                                                                                        // Remove variant
                                                                                                        newVariantIds = current.variantIds.filter(id => id !== variant.id);
                                                                                                    }

                                                                                                    // Check if all variants are now selected
                                                                                                    const allSelected = newVariantIds.length === item.variants.length;

                                                                                                    return {
                                                                                                        ...prev,
                                                                                                        [op.id]: {
                                                                                                            allSelected,
                                                                                                            variantIds: newVariantIds
                                                                                                        }
                                                                                                    };
                                                                                                });
                                                                                            }}
                                                                                            className="data-[state=checked]:bg-[#3b82f6] data-[state=checked]:border-[#3b82f6] border-0"
                                                                                        />
                                                                                        <span className="text-[#faf9f5] text-sm">{variantName}</span>
                                                                                    </label>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>

                                                    {/* Calculated Cost */}
                                                    <td className="px-2 py-0 text-right text-muted-foreground border-r border-border/50">
                                                        {calculateOperationCost(op.costPerHour, op.timeSeconds)} <span className="text-[10px]">CAD</span>
                                                    </td>

                                                    {/* Delete Button */}
                                                    <td className="px-2 py-0 text-center">
                                                        <button
                                                            onClick={() => handleDeleteItemOperation(op.id)}
                                                            className="text-[#ff7b6f] opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#ff7b6f]/10 rounded"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>

                                {/* Add Row Button */}
                                <div className="p-3 border-t border-border">
                                    <Button
                                        variant="ghost"
                                        className="text-muted-foreground hover:text-primary hover:bg-secondary/50 h-8 px-2 text-xs font-medium flex items-center gap-1 transition-colors"
                                        onClick={() => {
                                            console.log('🔘 Add row button clicked!');
                                            handleAddItemOperation();
                                        }}
                                    >
                                        <Plus size={14} /> Add row
                                    </Button>
                                </div>
                            </div>

                            {/* === DELETE OPERATION CONFIRMATION DIALOG === */}
                            <DeleteConfirmDialog
                                open={!!showDeleteConfirm}
                                onOpenChange={(open) => !open && setShowDeleteConfirm(null)}
                                onConfirm={confirmDeleteOperation}
                                title="Delete Operation"
                                description="Are you sure you want to delete this operation? This action cannot be undone."
                                actionLabel="Delete"
                            />

                            {/* === COPY OPERATIONS FROM MODAL === */}
                            <Dialog open={showCopyOpsItemModal} onOpenChange={setShowCopyOpsItemModal}>
                                <DialogContent className="max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle className="text-base font-medium flex items-center gap-2">
                                            <Search size={16} />
                                            Search for item to copy operations from...
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <Input
                                            placeholder="Search products with operations..."
                                            className="h-9 mb-3"
                                            value={copyOpsItemSearch}
                                            onChange={(e) => setCopyOpsItemSearch(e.target.value)}
                                            autoFocus
                                        />
                                        <div className="max-h-[250px] overflow-y-auto border border-border rounded-md">
                                            {copyOpsItemResults.length > 0 ? (
                                                copyOpsItemResults
                                                    .filter(r => r.name.toLowerCase().includes(copyOpsItemSearch.toLowerCase()))
                                                    .map(r => (
                                                        <div
                                                            key={r.id}
                                                            className="flex items-center gap-2 p-3 hover:bg-secondary/20 cursor-pointer border-b border-border last:border-0"
                                                            onClick={() => handleCopyOpsFromItem(r.id)}
                                                        >
                                                            <span className="text-sm">{r.name}</span>
                                                        </div>
                                                    ))
                                            ) : (
                                                <div className="p-4 text-center text-muted-foreground text-sm">
                                                    No products found
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="ghost" onClick={() => setShowCopyOpsItemModal(false)}>Cancel</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}

                    {activeTab === 'Used in BOMs' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-foreground">{usedInBOMs.length} BOMs using this item</h3>
                            </div>

                            <div className="bg-background rounded-lg border border-[#3a3a38] overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="h-8 bg-[#222220] border-b border-[#3a3a38]/50">
                                            <th className="px-3 py-0 min-w-[250px] border-r border-[#3a3a38]/50">
                                                <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">Product</span>
                                            </th>
                                            <th className="px-3 py-0 w-40 border-r border-[#3a3a38]/50">
                                                <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">SKU</span>
                                            </th>
                                            <th className="px-3 py-0 text-right w-32 border-r border-[#3a3a38]/50">
                                                <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">Quantity</span>
                                            </th>
                                            <th className="px-3 py-0 w-20">
                                                <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">UOM</span>
                                            </th>
                                        </tr>
                                        <tr className="border-b border-[#3a3a38]">
                                            <th className="p-1" colSpan={4}>
                                                <input
                                                    className="w-full px-2 py-1 border-0 bg-transparent text-xs font-normal text-foreground placeholder:text-[#7a7974] focus:outline-none"
                                                    placeholder="Filter by product..."
                                                    value={filterBomProduct}
                                                    onChange={(e) => setFilterBomProduct(e.target.value)}
                                                />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#3a3a38] text-[13px]">
                                        {filteredUsedInBOMs.length > 0 ? filteredUsedInBOMs.map((bom, idx) => (
                                            <tr key={idx} className="h-8 hover:bg-secondary/20 transition-colors group">
                                                <td className="px-2 py-0 border-r border-[#3a3a38]/50">
                                                    <span className="text-[#faf9f5] font-medium cursor-pointer hover:text-[#d97757]">
                                                        {bom.productName || bom.variantName || 'Unknown'}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-0 text-[#bebcb3] border-r border-[#3a3a38]/50">{bom.productSku}</td>
                                                <td className="px-2 py-0 text-right text-foreground border-r border-[#3a3a38]/50">{bom.quantity}</td>
                                                <td className="px-2 py-0 text-[#bebcb3]">{bom.uom || item.uom}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={4} className="p-8 text-center text-[#7a7974] text-sm">
                                                    This item is not used in any product BOMs.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Supply details' && (
                        <div className="space-y-6">
                            {/* Supplier Settings Card - Matching General Info style */}
                            <div className="bg-background rounded-lg border border-border">
                                <div className="grid grid-cols-2 divide-x divide-border">
                                    {/* Left Column */}
                                    <div className="p-3">
                                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Default supplier</label>
                                        <SearchableSelect
                                            value={item.defaultSupplier?.id || ''}
                                            options={supplierOptions.map(s => ({ id: s.id, name: s.label }))}
                                            onChange={async (val) => {
                                                console.log('🔄 Supplier dropdown changed - val:', JSON.stringify(val), 'itemId:', id);
                                                const supplier = supplierOptions.find(s => s.id === val);
                                                console.log('🔄 Found supplier:', JSON.stringify(supplier));
                                                console.log('🔄 supplier.id:', supplier?.id, 'type:', typeof supplier?.id);
                                                if (!supplier) return;

                                                // Keep existing currency if set, otherwise use supplier's default currency
                                                const existingCurrency = item.defaultSupplier?.currency;
                                                const currencyToUse = existingCurrency || supplier.currency || 'CAD';

                                                console.log('🔄 Saving supplier with:', JSON.stringify({
                                                    supplier_id: supplier.id,
                                                    currency: currencyToUse
                                                }));
                                                console.log('🔄 supplier.id value:', supplier.id, 'type:', typeof supplier.id);

                                                setItem(prev => {
                                                    if (!prev) return null;
                                                    return {
                                                        ...prev,
                                                        defaultSupplier: {
                                                            id: supplier.id,
                                                            name: supplier.label,
                                                            currency: currencyToUse
                                                        }
                                                    };
                                                });

                                                setSaveStatus('saving');
                                                const success = await updateKatanaItemDetails(id, type.toLowerCase(), {
                                                    defaultSupplier: {
                                                        id: supplier.id,
                                                        name: supplier.label,
                                                        currency: currencyToUse
                                                    }
                                                });

                                                console.log('🔄 Supplier save result:', success);
                                                if (success) setSaveStatus('saved');
                                                else setSaveStatus('unsaved');
                                            }}
                                            placeholder="Select supplier..."
                                            searchPlaceholder="Search suppliers..."
                                            allowCreate={false}
                                        />
                                    </div>

                                    {/* Right Column */}
                                    <div className="p-3">
                                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Supplier currency</label>
                                        <SearchableSelect
                                            value={item.defaultSupplier?.currency || 'CAD'}
                                            options={[
                                                { id: 'AED', name: 'AED - UAE Dirham' },
                                                { id: 'AFN', name: 'AFN - Afghan Afghani' },
                                                { id: 'ALL', name: 'ALL - Albanian Lek' },
                                                { id: 'AMD', name: 'AMD - Armenian Dram' },
                                                { id: 'ANG', name: 'ANG - Netherlands Antillean Guilder' },
                                                { id: 'AOA', name: 'AOA - Angolan Kwanza' },
                                                { id: 'ARS', name: 'ARS - Argentine Peso' },
                                                { id: 'AUD', name: 'AUD - Australian Dollar' },
                                                { id: 'AWG', name: 'AWG - Aruban Florin' },
                                                { id: 'AZN', name: 'AZN - Azerbaijani Manat' },
                                                { id: 'BAM', name: 'BAM - Bosnia-Herzegovina Convertible Mark' },
                                                { id: 'BBD', name: 'BBD - Barbadian Dollar' },
                                                { id: 'BDT', name: 'BDT - Bangladeshi Taka' },
                                                { id: 'BGN', name: 'BGN - Bulgarian Lev' },
                                                { id: 'BHD', name: 'BHD - Bahraini Dinar' },
                                                { id: 'BIF', name: 'BIF - Burundian Franc' },
                                                { id: 'BMD', name: 'BMD - Bermudan Dollar' },
                                                { id: 'BND', name: 'BND - Brunei Dollar' },
                                                { id: 'BOB', name: 'BOB - Bolivian Boliviano' },
                                                { id: 'BRL', name: 'BRL - Brazilian Real' },
                                                { id: 'BSD', name: 'BSD - Bahamian Dollar' },
                                                { id: 'BTN', name: 'BTN - Bhutanese Ngultrum' },
                                                { id: 'BWP', name: 'BWP - Botswanan Pula' },
                                                { id: 'BYN', name: 'BYN - Belarusian Ruble' },
                                                { id: 'BZD', name: 'BZD - Belize Dollar' },
                                                { id: 'CAD', name: 'CAD - Canadian Dollar' },
                                                { id: 'CDF', name: 'CDF - Congolese Franc' },
                                                { id: 'CHF', name: 'CHF - Swiss Franc' },
                                                { id: 'CLP', name: 'CLP - Chilean Peso' },
                                                { id: 'CNY', name: 'CNY - Chinese Yuan' },
                                                { id: 'COP', name: 'COP - Colombian Peso' },
                                                { id: 'CRC', name: 'CRC - Costa Rican Colón' },
                                                { id: 'CUP', name: 'CUP - Cuban Peso' },
                                                { id: 'CVE', name: 'CVE - Cape Verdean Escudo' },
                                                { id: 'CZK', name: 'CZK - Czech Koruna' },
                                                { id: 'DJF', name: 'DJF - Djiboutian Franc' },
                                                { id: 'DKK', name: 'DKK - Danish Krone' },
                                                { id: 'DOP', name: 'DOP - Dominican Peso' },
                                                { id: 'DZD', name: 'DZD - Algerian Dinar' },
                                                { id: 'EGP', name: 'EGP - Egyptian Pound' },
                                                { id: 'ERN', name: 'ERN - Eritrean Nakfa' },
                                                { id: 'ETB', name: 'ETB - Ethiopian Birr' },
                                                { id: 'EUR', name: 'EUR - Euro' },
                                                { id: 'FJD', name: 'FJD - Fijian Dollar' },
                                                { id: 'FKP', name: 'FKP - Falkland Islands Pound' },
                                                { id: 'GBP', name: 'GBP - British Pound' },
                                                { id: 'GEL', name: 'GEL - Georgian Lari' },
                                                { id: 'GHS', name: 'GHS - Ghanaian Cedi' },
                                                { id: 'GIP', name: 'GIP - Gibraltar Pound' },
                                                { id: 'GMD', name: 'GMD - Gambian Dalasi' },
                                                { id: 'GNF', name: 'GNF - Guinean Franc' },
                                                { id: 'GTQ', name: 'GTQ - Guatemalan Quetzal' },
                                                { id: 'GYD', name: 'GYD - Guyanaese Dollar' },
                                                { id: 'HKD', name: 'HKD - Hong Kong Dollar' },
                                                { id: 'HNL', name: 'HNL - Honduran Lempira' },
                                                { id: 'HRK', name: 'HRK - Croatian Kuna' },
                                                { id: 'HTG', name: 'HTG - Haitian Gourde' },
                                                { id: 'HUF', name: 'HUF - Hungarian Forint' },
                                                { id: 'IDR', name: 'IDR - Indonesian Rupiah' },
                                                { id: 'ILS', name: 'ILS - Israeli New Shekel' },
                                                { id: 'INR', name: 'INR - Indian Rupee' },
                                                { id: 'IQD', name: 'IQD - Iraqi Dinar' },
                                                { id: 'IRR', name: 'IRR - Iranian Rial' },
                                                { id: 'ISK', name: 'ISK - Icelandic Króna' },
                                                { id: 'JMD', name: 'JMD - Jamaican Dollar' },
                                                { id: 'JOD', name: 'JOD - Jordanian Dinar' },
                                                { id: 'JPY', name: 'JPY - Japanese Yen' },
                                                { id: 'KES', name: 'KES - Kenyan Shilling' },
                                                { id: 'KGS', name: 'KGS - Kyrgystani Som' },
                                                { id: 'KHR', name: 'KHR - Cambodian Riel' },
                                                { id: 'KMF', name: 'KMF - Comorian Franc' },
                                                { id: 'KPW', name: 'KPW - North Korean Won' },
                                                { id: 'KRW', name: 'KRW - South Korean Won' },
                                                { id: 'KWD', name: 'KWD - Kuwaiti Dinar' },
                                                { id: 'KYD', name: 'KYD - Cayman Islands Dollar' },
                                                { id: 'KZT', name: 'KZT - Kazakhstani Tenge' },
                                                { id: 'LAK', name: 'LAK - Laotian Kip' },
                                                { id: 'LBP', name: 'LBP - Lebanese Pound' },
                                                { id: 'LKR', name: 'LKR - Sri Lankan Rupee' },
                                                { id: 'LRD', name: 'LRD - Liberian Dollar' },
                                                { id: 'LSL', name: 'LSL - Lesotho Loti' },
                                                { id: 'LYD', name: 'LYD - Libyan Dinar' },
                                                { id: 'MAD', name: 'MAD - Moroccan Dirham' },
                                                { id: 'MDL', name: 'MDL - Moldovan Leu' },
                                                { id: 'MGA', name: 'MGA - Malagasy Ariary' },
                                                { id: 'MKD', name: 'MKD - Macedonian Denar' },
                                                { id: 'MMK', name: 'MMK - Myanmar Kyat' },
                                                { id: 'MNT', name: 'MNT - Mongolian Tugrik' },
                                                { id: 'MOP', name: 'MOP - Macanese Pataca' },
                                                { id: 'MRU', name: 'MRU - Mauritanian Ouguiya' },
                                                { id: 'MUR', name: 'MUR - Mauritian Rupee' },
                                                { id: 'MVR', name: 'MVR - Maldivian Rufiyaa' },
                                                { id: 'MWK', name: 'MWK - Malawian Kwacha' },
                                                { id: 'MXN', name: 'MXN - Mexican Peso' },
                                                { id: 'MYR', name: 'MYR - Malaysian Ringgit' },
                                                { id: 'MZN', name: 'MZN - Mozambican Metical' },
                                                { id: 'NAD', name: 'NAD - Namibian Dollar' },
                                                { id: 'NGN', name: 'NGN - Nigerian Naira' },
                                                { id: 'NIO', name: 'NIO - Nicaraguan Córdoba' },
                                                { id: 'NOK', name: 'NOK - Norwegian Krone' },
                                                { id: 'NPR', name: 'NPR - Nepalese Rupee' },
                                                { id: 'NZD', name: 'NZD - New Zealand Dollar' },
                                                { id: 'OMR', name: 'OMR - Omani Rial' },
                                                { id: 'PAB', name: 'PAB - Panamanian Balboa' },
                                                { id: 'PEN', name: 'PEN - Peruvian Sol' },
                                                { id: 'PGK', name: 'PGK - Papua New Guinean Kina' },
                                                { id: 'PHP', name: 'PHP - Philippine Peso' },
                                                { id: 'PKR', name: 'PKR - Pakistani Rupee' },
                                                { id: 'PLN', name: 'PLN - Polish Zloty' },
                                                { id: 'PYG', name: 'PYG - Paraguayan Guarani' },
                                                { id: 'QAR', name: 'QAR - Qatari Rial' },
                                                { id: 'RON', name: 'RON - Romanian Leu' },
                                                { id: 'RSD', name: 'RSD - Serbian Dinar' },
                                                { id: 'RUB', name: 'RUB - Russian Ruble' },
                                                { id: 'RWF', name: 'RWF - Rwandan Franc' },
                                                { id: 'SAR', name: 'SAR - Saudi Riyal' },
                                                { id: 'SBD', name: 'SBD - Solomon Islands Dollar' },
                                                { id: 'SCR', name: 'SCR - Seychellois Rupee' },
                                                { id: 'SDG', name: 'SDG - Sudanese Pound' },
                                                { id: 'SEK', name: 'SEK - Swedish Krona' },
                                                { id: 'SGD', name: 'SGD - Singapore Dollar' },
                                                { id: 'SHP', name: 'SHP - Saint Helena Pound' },
                                                { id: 'SLL', name: 'SLL - Sierra Leonean Leone' },
                                                { id: 'SOS', name: 'SOS - Somali Shilling' },
                                                { id: 'SRD', name: 'SRD - Surinamese Dollar' },
                                                { id: 'SSP', name: 'SSP - South Sudanese Pound' },
                                                { id: 'STN', name: 'STN - São Tomé and Príncipe Dobra' },
                                                { id: 'SYP', name: 'SYP - Syrian Pound' },
                                                { id: 'SZL', name: 'SZL - Swazi Lilangeni' },
                                                { id: 'THB', name: 'THB - Thai Baht' },
                                                { id: 'TJS', name: 'TJS - Tajikistani Somoni' },
                                                { id: 'TMT', name: 'TMT - Turkmenistani Manat' },
                                                { id: 'TND', name: 'TND - Tunisian Dinar' },
                                                { id: 'TOP', name: 'TOP - Tongan Paʻanga' },
                                                { id: 'TRY', name: 'TRY - Turkish Lira' },
                                                { id: 'TTD', name: 'TTD - Trinidad and Tobago Dollar' },
                                                { id: 'TWD', name: 'TWD - New Taiwan Dollar' },
                                                { id: 'TZS', name: 'TZS - Tanzanian Shilling' },
                                                { id: 'UAH', name: 'UAH - Ukrainian Hryvnia' },
                                                { id: 'UGX', name: 'UGX - Ugandan Shilling' },
                                                { id: 'USD', name: 'USD - US Dollar' },
                                                { id: 'UYU', name: 'UYU - Uruguayan Peso' },
                                                { id: 'UZS', name: 'UZS - Uzbekistani Som' },
                                                { id: 'VES', name: 'VES - Venezuelan Bolívar' },
                                                { id: 'VND', name: 'VND - Vietnamese Dong' },
                                                { id: 'VUV', name: 'VUV - Vanuatu Vatu' },
                                                { id: 'WST', name: 'WST - Samoan Tala' },
                                                { id: 'XAF', name: 'XAF - Central African CFA Franc' },
                                                { id: 'XCD', name: 'XCD - East Caribbean Dollar' },
                                                { id: 'XOF', name: 'XOF - West African CFA Franc' },
                                                { id: 'XPF', name: 'XPF - CFP Franc' },
                                                { id: 'YER', name: 'YER - Yemeni Rial' },
                                                { id: 'ZAR', name: 'ZAR - South African Rand' },
                                                { id: 'ZMW', name: 'ZMW - Zambian Kwacha' },
                                                { id: 'ZWL', name: 'ZWL - Zimbabwean Dollar' },
                                            ]}
                                            onChange={async (val) => {
                                                // Update local state
                                                setItem(prev => prev ? {
                                                    ...prev,
                                                    defaultSupplier: prev.defaultSupplier ? {
                                                        ...prev.defaultSupplier,
                                                        currency: val
                                                    } : { id: '', name: '', currency: val }
                                                } : prev);

                                                // Save to database
                                                setSaveStatus('saving');
                                                const success = await updateKatanaItemDetails(id, type.toLowerCase(), {
                                                    supplierCurrency: val
                                                });

                                                if (success) {
                                                    console.log('✅ Currency saved:', val);
                                                    setSaveStatus('saved');
                                                } else {
                                                    console.error('❌ Failed to save currency');
                                                    setSaveStatus('unsaved');
                                                }
                                            }}
                                            placeholder="Select currency..."
                                            searchPlaceholder="Search currencies..."
                                            allowCreate={false}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Purchase UOM Options Card */}
                            <div className="bg-background rounded-lg border border-border">
                                <div className="p-3">
                                    <p className="text-xs font-medium text-muted-foreground mb-2">
                                        Do you buy this item in a different unit of measure?
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            id="diff-uom"
                                            checked={purchasingInDiffUom}
                                            onCheckedChange={async (c) => {
                                                const checked = c === true;
                                                setPurchasingInDiffUom(checked);
                                                setSaveStatus('saving');
                                                if (checked) {
                                                    // Save the checkbox state to database when checked
                                                    const { error } = await supabase
                                                        .from('items')
                                                        .update({ purchase_in_different_uom: true })
                                                        .eq('id', id);
                                                    setSaveStatus(error ? 'unsaved' : 'saved');
                                                } else {
                                                    // Reset values and save unchecked state to database
                                                    setPurchaseUom(null);
                                                    setPurchaseUomConversionRate(1);
                                                    const { error } = await supabase
                                                        .from('items')
                                                        .update({
                                                            purchase_in_different_uom: false,
                                                            purchase_uom: null,
                                                            purchase_uom_conversion_rate: 1
                                                        })
                                                        .eq('id', id);
                                                    setSaveStatus(error ? 'unsaved' : 'saved');
                                                }
                                            }}
                                        />
                                        <label htmlFor="diff-uom" className="text-sm text-foreground cursor-pointer select-none">
                                            Yes, I purchase in a different unit
                                        </label>
                                    </div>
                                </div>

                                {/* Conditional UOM Fields */}
                                {purchasingInDiffUom && (
                                    <div className="border-t border-border">
                                        <div className="grid grid-cols-2 divide-x divide-border">
                                            {/* Purchase UOM */}
                                            <div className="p-3">
                                                <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                                    Default purchase unit of measure
                                                </label>
                                                <SearchableSelect
                                                    value={purchaseUom || ''}
                                                    options={uomOptions.map(u => ({ id: u.value, name: u.label }))}
                                                    onChange={(val) => {
                                                        setPurchaseUom(val || null);
                                                        handleUpdatePurchaseUOM(val || null, purchaseUomConversionRate);
                                                    }}
                                                    onCreate={async (uomName) => {
                                                        const normalizedVal = uomName.trim();
                                                        const existing = uomOptions.find(opt => opt?.value?.toLowerCase() === normalizedVal.toLowerCase());
                                                        if (existing) {
                                                            setPurchaseUom(existing.value);
                                                            handleUpdatePurchaseUOM(existing.value, purchaseUomConversionRate);
                                                            return existing.value;
                                                        }
                                                        setUomOptions(prev => [...prev, { label: normalizedVal, value: normalizedVal }]);
                                                        setPurchaseUom(normalizedVal);
                                                        handleUpdatePurchaseUOM(normalizedVal, purchaseUomConversionRate);
                                                        return normalizedVal;
                                                    }}
                                                    placeholder="Select UOM..."
                                                    searchPlaceholder="Search or create unit..."
                                                    allowCreate={true}
                                                    createLabel="Create unit"
                                                />
                                            </div>

                                            {/* Conversion Rate */}
                                            <div className="p-3">
                                                <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                                    Unit conversion rate
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-foreground text-sm">1</span>
                                                    <span className="text-muted-foreground text-sm min-w-[40px]">
                                                        {purchaseUom || 'unit'}
                                                    </span>
                                                    <span className="text-foreground text-sm">=</span>
                                                    <input
                                                        type="text"
                                                        inputMode="decimal"
                                                        value={purchaseUomConversionRate === 0 ? '' : purchaseUomConversionRate}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            if (val === '' || val === '0') {
                                                                setPurchaseUomConversionRate(0);
                                                            } else {
                                                                const rate = parseFloat(val);
                                                                if (!isNaN(rate)) {
                                                                    setPurchaseUomConversionRate(rate);
                                                                }
                                                            }
                                                        }}
                                                        onBlur={(e) => {
                                                            const rate = parseFloat(e.target.value) || 1;
                                                            setPurchaseUomConversionRate(rate);
                                                            handleUpdatePurchaseUOM(purchaseUom, rate);
                                                        }}
                                                        className="min-w-10 w-auto bg-transparent border border-border rounded px-2 py-1 text-foreground text-sm text-center focus:border-primary focus:outline-none"
                                                        style={{ width: `${Math.max(40, String(purchaseUomConversionRate || '').length * 10 + 16)}px` }}
                                                    />
                                                    <span className="text-muted-foreground text-sm">{item.uom}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Variants Table */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-foreground">Variants</h3>
                                <div className="bg-background rounded-lg border border-border overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-border bg-secondary/10 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                                                <th className="p-3 font-medium border-r border-border">Variant</th>
                                                <th className="p-3 font-medium border-r border-border">
                                                    <span className="flex items-center gap-1">
                                                        Supplier item code
                                                        <Info size={12} className="text-muted-foreground/50" />
                                                    </span>
                                                </th>
                                                <th className="p-3 text-right font-medium border-r border-border">
                                                    <span className="flex items-center justify-end gap-1">
                                                        Default lead time
                                                        <Info size={12} className="text-muted-foreground/50" />
                                                    </span>
                                                </th>
                                                <th className="p-3 text-right font-medium border-r border-border">
                                                    <span className="flex items-center justify-end gap-1">
                                                        MOQ
                                                        <Info size={12} className="text-muted-foreground/50" />
                                                    </span>
                                                </th>
                                                <th className="p-3 text-right font-medium">
                                                    <span className="flex items-center justify-end gap-1">
                                                        Default purchase price
                                                        <Info size={12} className="text-muted-foreground/50" />
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border text-sm">
                                            {item.variants.map(v => (
                                                <tr key={v.id} className="hover:bg-secondary/20 transition-colors">
                                                    <td className="px-3 py-1 border-r border-border">
                                                        <span className="text-foreground text-xs font-medium">
                                                            {v.attributes || v.sku}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-1 border-r border-border">
                                                        <Input
                                                            type="text"
                                                            value={v.supplierItemCode || ''}
                                                            onChange={(e) => handleUpdateVariantSupplyField(v.id, 'supplier_item_code', e.target.value)}
                                                            placeholder="—"
                                                            className="h-7 w-full text-xs text-foreground bg-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm px-2 shadow-none focus-visible:shadow-none"
                                                        />
                                                    </td>
                                                    <td className="px-3 py-1 border-r border-border">
                                                        <Input
                                                            type="text"
                                                            inputMode="numeric"
                                                            defaultValue={v.leadTime ?? ''}
                                                            key={`lead-time-${v.id}-${v.leadTime}`}
                                                            onBlur={(e) => {
                                                                const val = e.target.value.trim();
                                                                if (val === '') {
                                                                    handleUpdateVariantSupplyField(v.id, 'default_lead_time', null);
                                                                } else {
                                                                    const parsed = parseInt(val);
                                                                    if (!isNaN(parsed)) {
                                                                        handleUpdateVariantSupplyField(v.id, 'default_lead_time', parsed);
                                                                    }
                                                                }
                                                            }}
                                                            placeholder="—"
                                                            className="h-7 w-full text-xs text-foreground bg-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm px-2 shadow-none focus-visible:shadow-none text-right"
                                                        />
                                                    </td>
                                                    <td className="px-3 py-1 border-r border-border">
                                                        <div className="flex items-center gap-1 w-full">
                                                            <Input
                                                                type="text"
                                                                inputMode="numeric"
                                                                defaultValue={v.moq ?? ''}
                                                                key={`moq-${v.id}-${v.moq}`}
                                                                onBlur={(e) => {
                                                                    const val = e.target.value.trim();
                                                                    if (val === '') {
                                                                        handleUpdateVariantSupplyField(v.id, 'moq', null);
                                                                    } else {
                                                                        const parsed = parseInt(val);
                                                                        if (!isNaN(parsed)) {
                                                                            handleUpdateVariantSupplyField(v.id, 'moq', parsed);
                                                                        }
                                                                    }
                                                                }}
                                                                placeholder="—"
                                                                className="h-7 w-full text-xs text-foreground bg-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm px-2 shadow-none focus-visible:shadow-none text-right"
                                                            />
                                                            <span className="text-muted-foreground text-[10px] shrink-0">{item.uom}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-1">
                                                        <div className="flex items-center gap-1 w-full">
                                                            <Input
                                                                type="text"
                                                                inputMode="decimal"
                                                                defaultValue={v.purchasePrice ?? ''}
                                                                key={`purchase-price-${v.id}-${v.purchasePrice}`}
                                                                onBlur={(e) => {
                                                                    const val = e.target.value.trim();
                                                                    if (val === '') {
                                                                        handleUpdateVariantSupplyField(v.id, 'purchase_price', null);
                                                                    } else {
                                                                        const parsed = parseFloat(val);
                                                                        if (!isNaN(parsed)) {
                                                                            handleUpdateVariantSupplyField(v.id, 'purchase_price', parsed);
                                                                        }
                                                                    }
                                                                }}
                                                                placeholder="—"
                                                                className="h-7 w-full text-xs text-foreground bg-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm px-2 shadow-none focus-visible:shadow-none text-right"
                                                            />
                                                            <span className="text-muted-foreground text-[10px] shrink-0">{item.defaultSupplier?.currency || 'CAD'}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div >

            {/* Inventory Intel Modal - Redesigned to match General Info tab */}
            {showInventoryIntel && selectedIngredientForIntel && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setShowInventoryIntel(false)}
                    />

                    {/* Modal Container - matching General Info design system */}
                    <div className="relative bg-background rounded-lg shadow-2xl w-[1000px] max-w-[95vw] max-h-[85vh] overflow-hidden border border-border">
                        {/* Header - Clean design like General Info */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#d97757]/10 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-[#d97757]" />
                                </div>
                                <div>
                                    <div className="text-xs font-medium text-muted-foreground">Inventory Intel</div>
                                    <div className="text-lg font-semibold text-foreground">
                                        {selectedIngredientForIntel.name || 'Unknown Item'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Batch # dropdown - only show when batch tracking enabled AND batches exist */}
                                {ingredientBatchTracked && ingredientBatches.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-[#7a7974]">Batch #</span>
                                        <div className="relative">
                                            <select
                                                value={selectedBatchFilter}
                                                onChange={(e) => setSelectedBatchFilter(e.target.value)}
                                                className="bg-[#1a1a18] border border-[#3a3a38] rounded-md pl-3 pr-8 py-1.5 text-sm text-[#faf9f5] focus:border-[#d97757] focus:outline-none focus:ring-1 focus:ring-[#d97757]/50 appearance-none cursor-pointer min-w-[100px] hover:border-[#4a4a47] transition-colors"
                                            >
                                                <option value="all">- All -</option>
                                                {ingredientBatches.map((batch) => (
                                                    <option key={batch.id} value={batch.id}>{batch.batchNumber}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a7974] pointer-events-none" />
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-[#7a7974]">Location</span>
                                    <div className="relative">
                                        <select className="bg-[#1a1a18] border border-[#3a3a38] rounded-md pl-3 pr-8 py-1.5 text-sm text-[#faf9f5] focus:border-[#d97757] focus:outline-none focus:ring-1 focus:ring-[#d97757]/50 appearance-none cursor-pointer min-w-[130px] hover:border-[#4a4a47] transition-colors">
                                            <option>MMH Kelowna</option>
                                        </select>
                                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a7974] pointer-events-none" />
                                    </div>
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

                        {/* Stock Summary Card - Grid layout like General Info */}
                        <div className="p-4">
                            <div className="bg-[#262624] rounded-lg border border-[#3a3a38]">
                                <div className="grid grid-cols-6">
                                    {/* In Stock */}
                                    <button
                                        type="button"
                                        onClick={() => setIntelTab('movements')}
                                        className={`p-4 text-left transition-all hover:bg-[#3a3a38]/50 border-r border-[#3a3a38] ${intelTab === 'movements' ? 'bg-[#d97757]/5 border-b-2 border-b-[#d97757]' : ''
                                            }`}
                                    >
                                        <div className={`text-xs font-medium mb-2 ${intelTab === 'movements' ? 'text-[#d97757]' : 'text-[#7a7974]'}`}>
                                            In stock
                                        </div>
                                        <div className="text-2xl font-bold text-[#faf9f5]">
                                            {inventoryIntelData?.inStock?.toFixed(2) || '0'}
                                        </div>
                                        <div className="text-xs text-[#7a7974] mt-1">{inventoryIntelData?.uom || 'pcs'}</div>
                                    </button>

                                    {/* Expected */}
                                    <button
                                        type="button"
                                        onClick={() => setIntelTab('expected')}
                                        className={`p-4 text-left transition-all hover:bg-[#3a3a38]/50 border-r border-[#3a3a38] ${intelTab === 'expected' ? 'bg-[#d97757]/5 border-b-2 border-b-[#d97757]' : ''
                                            }`}
                                    >
                                        <div className={`text-xs font-medium mb-2 ${intelTab === 'expected' ? 'text-[#d97757]' : 'text-[#7a7974]'}`}>
                                            Expected
                                        </div>
                                        <div className="text-2xl font-bold text-[#faf9f5]">
                                            {inventoryIntelData?.expected || 0}
                                        </div>
                                        <div className="text-xs text-[#7a7974] mt-1">{inventoryIntelData?.uom || 'pcs'}</div>
                                    </button>

                                    {/* Committed */}
                                    <button
                                        type="button"
                                        onClick={() => setIntelTab('committed')}
                                        className={`p-4 text-left transition-all hover:bg-[#3a3a38]/50 border-r border-[#3a3a38] ${intelTab === 'committed' ? 'bg-[#d97757]/5 border-b-2 border-b-[#d97757]' : ''
                                            }`}
                                    >
                                        <div className={`text-xs font-medium mb-2 ${intelTab === 'committed' ? 'text-[#d97757]' : 'text-[#7a7974]'}`}>
                                            Committed
                                        </div>
                                        <div className="text-2xl font-bold text-[#faf9f5]">
                                            {inventoryIntelData?.committed || 0}
                                        </div>
                                        <div className="text-xs text-[#7a7974] mt-1">{inventoryIntelData?.uom || 'pcs'}</div>
                                    </button>

                                    {/* Safety Stock */}
                                    <div className="p-4 border-r border-[#3a3a38]">
                                        <div className="text-xs font-medium text-[#7a7974] mb-2">Safety stock</div>
                                        <div className="text-2xl font-bold text-[#faf9f5]">
                                            {inventoryIntelData?.safetyStock || 0}
                                        </div>
                                        <div className="text-xs text-[#7a7974] mt-1">{inventoryIntelData?.uom || 'pcs'}</div>
                                    </div>

                                    {/* Calculated Stock */}
                                    <div className="p-4 border-r border-[#3a3a38]">
                                        <div className="text-xs font-medium text-[#7a7974] mb-2">Calculated stock</div>
                                        <div className="text-2xl font-bold text-[#8aaf6e]">
                                            {inventoryIntelData?.calculatedStock?.toFixed(2) || '0'}
                                        </div>
                                        <div className="text-xs text-[#7a7974] mt-1">{inventoryIntelData?.uom || 'pcs'}</div>
                                    </div>

                                    {/* Actions */}
                                    <div className="p-4 flex flex-col justify-center gap-2">
                                        <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#3a3a38] border border-[#4a4a47] rounded-md text-sm text-[#faf9f5] hover:bg-[#4a4a47] transition">
                                            <ExternalLink size={14} />
                                            Export
                                        </button>
                                        {/* Buy button - show for items that can be purchased */}
                                        {ingredientCanBuy && (
                                            <button
                                                onClick={() => openNewPOModal()}
                                                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#d97757] text-white rounded-md text-sm hover:bg-[#c86a4d] transition"
                                            >
                                                <ShoppingCart size={14} />
                                                Buy
                                            </button>
                                        )}
                                        {/* Make button - show for items that can be produced */}
                                        {ingredientCanMake && (
                                            <button
                                                onClick={() => {
                                                    const suggestedQty = (inventoryIntelData?.calculatedStock ?? 0) < 0
                                                        ? Math.abs(inventoryIntelData?.calculatedStock ?? 0)
                                                        : 1;
                                                    router.push(`/make/new?variant_id=${selectedIngredientForIntel?.variantId}&quantity=${suggestedQty}`);
                                                }}
                                                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#d97757] text-white rounded-md text-sm hover:bg-[#c86a4d] transition"
                                            >
                                                <Factory size={14} />
                                                Make
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tab Content - Table Section */}
                        <div className="px-4 pb-4">
                            <div className="bg-[#1a1a18] rounded-lg border border-[#3a3a38] overflow-hidden">
                                <div className="overflow-auto max-h-[400px]">
                                    {/* Movements Table */}
                                    {intelTab === 'movements' && (
                                        <table className="w-full text-sm">
                                            <thead className="bg-[#262624] sticky top-0 z-10">
                                                <tr className="border-b border-[#3a3a38]">
                                                    <th className="text-left px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624] border-r border-[#3a3a38]">
                                                        Movement date
                                                    </th>
                                                    <th className="text-left px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624] border-r border-[#3a3a38]">
                                                        Caused by
                                                    </th>
                                                    <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624] border-r border-[#3a3a38]">
                                                        Qty change
                                                    </th>
                                                    <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624] border-r border-[#3a3a38]">
                                                        Cost/unit
                                                    </th>
                                                    <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624] border-r border-[#3a3a38]">
                                                        Balance
                                                    </th>
                                                    <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624] border-r border-[#3a3a38]">
                                                        Value
                                                    </th>
                                                    <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624]">
                                                        Avg cost
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#3a3a38]">
                                                {loadingInventoryIntel ? (
                                                    <tr>
                                                        <td colSpan={7} className="text-center py-12 text-[#7a7974]">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <div className="w-5 h-5 border-2 border-[#3a3a38] border-t-[#d97757] rounded-full animate-spin" />
                                                                Loading...
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : !inventoryIntelData?.movements || inventoryIntelData.movements.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={7} className="text-center py-12 text-[#7a7974]">
                                                            No stock movements found
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    inventoryIntelData.movements.map((mov, idx) => {
                                                        // Parse type to create clickable link
                                                        const typeMatch = mov.type.match(/^(MO|PO|SO|ST|SA|ADJ)-?(\d+)/i);
                                                        const linkType = typeMatch?.[1]?.toUpperCase();
                                                        const linkHref = linkType === 'MO' ? `/make?order=${typeMatch?.[2]}` :
                                                            linkType === 'PO' ? `/buy?order=${typeMatch?.[2]}` :
                                                                linkType === 'SO' ? `/sell?order=${typeMatch?.[2]}` :
                                                                    linkType === 'ST' ? `/stock/transfers/${typeMatch?.[2]}` :
                                                                        linkType === 'SA' || linkType === 'ADJ' ? `/stock/adjustments/${typeMatch?.[2]}` :
                                                                            null;

                                                        return (
                                                            <tr key={mov.id || idx} className="hover:bg-[#262624] transition-colors">
                                                                <td className="px-4 py-3 text-[#faf9f5] border-r border-[#3a3a38]">
                                                                    {mov.date ? new Date(mov.date).toLocaleString('en-US', {
                                                                        year: 'numeric',
                                                                        month: '2-digit',
                                                                        day: '2-digit',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        hour12: true
                                                                    }) : '-'}
                                                                </td>
                                                                <td className="px-4 py-3 border-r border-[#3a3a38]">
                                                                    {linkHref ? (
                                                                        <a href={linkHref} className="text-[#d97757] hover:text-[#ff7b6f] hover:underline font-medium">{mov.type}</a>
                                                                    ) : (
                                                                        <span className="text-[#d97757] font-medium">{mov.type}</span>
                                                                    )}
                                                                </td>
                                                                <td className={`px-4 py-3 text-right font-medium border-r border-[#3a3a38] ${mov.change < 0 ? 'text-[#ff7b6f]' : 'text-[#8aaf6e]'}`}>
                                                                    {mov.change > 0 ? '+' : ''}{mov.change}
                                                                </td>
                                                                <td className="px-4 py-3 text-right text-[#faf9f5] border-r border-[#3a3a38]">{mov.price.toFixed(2)} CAD</td>
                                                                <td className={`px-4 py-3 text-right font-medium border-r border-[#3a3a38] ${mov.balance < 0 ? 'bg-[#ff7b6f]/10 text-[#ff7b6f]' : 'text-[#faf9f5]'}`}>
                                                                    {mov.balance.toFixed(2)}
                                                                </td>
                                                                <td className={`px-4 py-3 text-right border-r border-[#3a3a38] ${mov.value < 0 ? 'bg-[#ff7b6f]/10 text-[#ff7b6f]' : 'text-[#faf9f5]'}`}>
                                                                    {mov.value.toFixed(2)} CAD
                                                                </td>
                                                                <td className="px-4 py-3 text-right text-[#faf9f5]">{mov.avgCost.toFixed(2)} CAD</td>
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
                                            <thead className="bg-[#262624] sticky top-0 z-10">
                                                <tr className="border-b border-[#3a3a38]">
                                                    <th className="text-left px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624] border-r border-[#3a3a38]">
                                                        PO Number
                                                    </th>
                                                    <th className="text-left px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624] border-r border-[#3a3a38]">
                                                        Expected Date
                                                    </th>
                                                    <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624] border-r border-[#3a3a38]">
                                                        Ordered
                                                    </th>
                                                    <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624] border-r border-[#3a3a38]">
                                                        Received
                                                    </th>
                                                    <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624]">
                                                        Remaining
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#3a3a38]">
                                                {loadingInventoryIntel ? (
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
                                                        <tr key={po.id} className="hover:bg-[#262624] transition-colors">
                                                            <td className="px-4 py-3 border-r border-[#3a3a38]">
                                                                <a href={`/purchasing/${po.id}`} className="text-[#d97757] hover:text-[#ff7b6f] hover:underline font-medium">{po.poNumber}</a>
                                                            </td>
                                                            <td className="px-4 py-3 text-[#faf9f5] border-r border-[#3a3a38]">
                                                                {po.expectedDate ? new Date(po.expectedDate).toLocaleDateString() : '-'}
                                                            </td>
                                                            <td className="px-4 py-3 text-right text-[#faf9f5] border-r border-[#3a3a38]">
                                                                {po.quantity} {inventoryIntelData?.uom || 'pcs'}
                                                            </td>
                                                            <td className="px-4 py-3 text-right text-[#faf9f5] border-r border-[#3a3a38]">
                                                                {po.received} {inventoryIntelData?.uom || 'pcs'}
                                                            </td>
                                                            <td className="px-4 py-3 text-right text-[#8aaf6e] font-medium">
                                                                +{po.remaining} {inventoryIntelData?.uom || 'pcs'}
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
                                            <thead className="bg-[#262624] sticky top-0 z-10">
                                                <tr className="border-b border-[#3a3a38]">
                                                    <th className="text-left px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624] border-r border-[#3a3a38]">
                                                        MO Number
                                                    </th>
                                                    <th className="text-left px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624] border-r border-[#3a3a38]">
                                                        Product
                                                    </th>
                                                    <th className="text-left px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624] border-r border-[#3a3a38]">
                                                        Status
                                                    </th>
                                                    <th className="text-right px-4 py-3 text-xs text-[#7a7974] font-medium uppercase tracking-wider bg-[#262624]">
                                                        Qty Required
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#3a3a38]">
                                                {loadingInventoryIntel ? (
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
                                                        <tr key={mo.id} className="hover:bg-[#262624] transition-colors">
                                                            <td className="px-4 py-3 border-r border-[#3a3a38]">
                                                                <a href={`/make/${mo.id}`} className="text-[#d97757] hover:text-[#ff7b6f] hover:underline font-medium">{mo.moNumber}</a>
                                                            </td>
                                                            <td className="px-4 py-3 text-[#faf9f5] border-r border-[#3a3a38]">{mo.productName}</td>
                                                            <td className="px-4 py-3 border-r border-[#3a3a38]">
                                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${mo.status === 'IN_PROGRESS' ? 'bg-[#d97757]/10 text-[#d97757]' :
                                                                    mo.status === 'NOT_STARTED' ? 'bg-[#3a3a38] text-[#7a7974]' :
                                                                        'bg-[#3a3a38] text-[#7a7974]'
                                                                    }`}>
                                                                    {mo.status.replace('_', ' ')}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3 text-right text-[#ff7b6f] font-medium">
                                                                -{mo.quantity} {inventoryIntelData?.uom || 'pcs'}
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
                    </div>
                </div>
            )}

            {/* New Purchase Order Modal */}
            {showNewPOModal && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setShowNewPOModal(false)}
                    />

                    {/* Modal - matching dropdown styling */}
                    <div className="relative bg-[#1f1f1d] rounded-lg shadow-2xl w-[480px] max-w-[95vw] border border-gray-600">
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-gray-700">
                            <h2 className="text-base font-medium text-white">New purchase order</h2>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-4">
                            {/* Product */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Product</label>
                                    <div className="text-sm text-white font-medium">{newPOData.productName}</div>
                                </div>
                                <div className="text-right">
                                    <label className="block text-xs text-gray-500 mb-1">Calculated stock</label>
                                    <div className="text-sm text-white">
                                        {newPOData.calculatedStock.toFixed(0)} {newPOData.uom}
                                    </div>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Quantity</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        value={newPOData.quantity}
                                        onChange={(e) => setNewPOData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                                        className="flex-1 bg-[#2a2a28] border border-gray-600 rounded px-3 py-2 text-sm text-white focus:border-gray-500 focus:outline-none"
                                    />
                                    <span className="text-sm text-gray-400">{newPOData.uom}</span>
                                </div>
                            </div>

                            {/* Supplier */}
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Supplier</label>
                                <div className="text-sm text-white font-medium">
                                    {newPOData.supplier || 'Select supplier...'}
                                </div>
                            </div>

                            {/* Checkbox */}
                            <div className="flex items-start gap-3 py-1">
                                <input
                                    type="checkbox"
                                    id="addOtherMissing"
                                    checked={newPOData.addOtherMissing}
                                    onChange={(e) => setNewPOData(prev => ({ ...prev, addOtherMissing: e.target.checked }))}
                                    className="mt-0.5 w-4 h-4 rounded border-gray-600 bg-[#2a2a28] text-[#d97757] focus:ring-0"
                                />
                                <label htmlFor="addOtherMissing" className="text-sm text-gray-400">
                                    Add other missing items from the same supplier to the purchase order.
                                </label>
                            </div>

                            {/* PO Number & Expected Arrival */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Purchase order #</label>
                                    <input
                                        type="text"
                                        value={newPOData.poNumber}
                                        onChange={(e) => setNewPOData(prev => ({ ...prev, poNumber: e.target.value }))}
                                        className="w-full bg-[#2a2a28] border border-gray-600 rounded px-3 py-2 text-sm text-white focus:border-gray-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Expected arrival</label>
                                    <div className="bg-[#2a2a28] border border-gray-600 rounded px-3 py-2">
                                        <DatePicker
                                            value={newPOData.expectedArrival}
                                            onChange={(date) => setNewPOData(prev => ({ ...prev, expectedArrival: date || '' }))}
                                            placeholder="Select date"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Ship to */}
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Ship to</label>
                                <div className="text-sm text-white font-medium">
                                    {newPOData.shipTo}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-4 border-t border-gray-700 flex justify-end gap-3">
                            <button
                                onClick={() => setShowNewPOModal(false)}
                                className="px-4 py-2 text-sm text-[#d97757] hover:text-[#ff7b6f] transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleCreatePO(true)}
                                disabled={creatingPO}
                                className="px-4 py-2 text-sm bg-[#d97757] text-white rounded hover:bg-[#c86a4d] transition disabled:opacity-50"
                            >
                                {creatingPO ? 'Creating...' : 'Create and open order'}
                            </button>
                            <button
                                onClick={() => handleCreatePO(false)}
                                disabled={creatingPO}
                                className="px-4 py-2 text-sm bg-[#d97757] text-white rounded hover:bg-[#c86a4d] transition disabled:opacity-50"
                            >
                                {creatingPO ? 'Creating...' : 'Create and close'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Item Delete confirmation */}
            <DeleteConfirmDialog
                open={showItemDeleteConfirm}
                onOpenChange={setShowItemDeleteConfirm}
                onConfirm={confirmItemDelete}
                title={`Delete the "${name}" ${type.toLowerCase()}?`}
                description={`Are you sure you want to delete this ${type.toLowerCase()}? This action cannot be undone.`}
                actionLabel="Delete"
            />
        </Shell >
    );
}
