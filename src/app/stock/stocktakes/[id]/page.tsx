'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    X,
    ArrowLeft,
    Printer,
    MoreVertical,
    ChevronDown,
    ExternalLink,
    Trash2,
    Check,
    Plus,
    ScanBarcode,
    Loader2,
    HelpCircle,
    MoreHorizontal,
    Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchStocktake, Stocktake } from '@/lib/katana-data-provider';
import {
    addStocktakeItem,
    updateStocktakeItemCount,
    updateStocktakeStatus,
    deleteStocktakeItem,
    fetchStocktakeWithItems,
    fetchVariantsForStocktake
} from '@/lib/katana-actions';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Shell } from "@/components/layout/Shell";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StocktakeItem {
    id: string;
    variant_id: string | null;
    item_name: string;
    category: string;
    internal_barcode: string;
    registered_barcode: string;
    supplier_item_code: string;
    batch_number: string;
    batch_barcode: string;
    notes: string;
    quantity_in_stock: number;
    expected_quantity: number;
    counted_quantity: number | null;
}

// MOCK_INVENTORY removed

export default function StocktakeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [stocktake, setStocktake] = useState<Stocktake | null>(null);
    const [loading, setLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

    // State for items in stocktake
    const [items, setItems] = useState<StocktakeItem[]>([]);
    const [availableVariants, setAvailableVariants] = useState<any[]>([]);

    // State for controlled popover on rows
    const [openRowId, setOpenRowId] = useState<string | null>(null);

    // Column Management State (Copied from ItemsTable)
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
        item: 300,
        category: 150,
        internalBarcode: 140,
        registeredBarcode: 140,
        supplierItemCode: 150,
        batchNumber: 100,
        batchBarcode: 140,
        notes: 200,
        quantityInStock: 140,
        expectedQuantity: 120,
        countedQuantity: 120,
    });

    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        item: true,
        category: true,
        internalBarcode: true,
        registeredBarcode: true,
        supplierItemCode: true,
        batchNumber: true,
        batchBarcode: true,
        notes: true,
        quantityInStock: true,
        expectedQuantity: true,
        countedQuantity: true,
    });

    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const resizingRef = useRef<{ column: string; startX: number; startWidth: number } | null>(null);

    // Resize Handlers
    const handleResizeStart = (e: React.MouseEvent, column: string) => {
        e.preventDefault();
        e.stopPropagation();

        const startWidth = columnWidths[column] || 150;
        resizingRef.current = { column, startX: e.clientX, startWidth };

        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        const handleMouseMove = (e: MouseEvent) => {
            if (!resizingRef.current) return;
            requestAnimationFrame(() => {
                if (!resizingRef.current) return;
                const diff = e.clientX - resizingRef.current.startX;
                const newWidth = Math.max(80, Math.min(800, resizingRef.current.startWidth + diff));
                setColumnWidths(prev => ({ ...prev, [resizingRef.current!.column]: newWidth }));
            });
        };

        const handleMouseUp = () => {
            resizingRef.current = null;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Context Menu Handlers
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        const handleClick = () => setContextMenu(null);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    const toggleColumn = (key: string) => {
        setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const resetAllColumns = () => {
        setVisibleColumns({
            item: true, category: true, internalBarcode: true, registeredBarcode: true,
            supplierItemCode: true, batchNumber: true, batchBarcode: true, notes: true,
            quantityInStock: true, expectedQuantity: true, countedQuantity: true
        });
        setColumnWidths({
            item: 300, category: 150, internalBarcode: 140, registeredBarcode: 140,
            supplierItemCode: 150, batchNumber: 100, batchBarcode: 140, notes: 200,
            quantityInStock: 140, expectedQuantity: 120, countedQuantity: 120
        });
    };

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                // Fetch stocktake data and variants in parallel
                const [stocktakeData, variantsData] = await Promise.all([
                    fetchStocktakeWithItems(id),
                    fetchVariantsForStocktake()
                ]);

                if (stocktakeData && stocktakeData.stocktake) {
                    setStocktake(stocktakeData.stocktake);
                    setItems(stocktakeData.items);
                }
                if (variantsData) {
                    setAvailableVariants(variantsData);
                }
            } catch (error) {
                console.error("Failed to fetch stocktake:", error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    const simulateSave = () => {
        setSaveStatus('saving');
        setTimeout(() => setSaveStatus('saved'), 800);
    };

    const handleAddRow = () => {
        simulateSave();
        const newRow: StocktakeItem = {
            id: crypto.randomUUID(),
            variant_id: null,
            item_name: '',
            category: '',
            internal_barcode: '',
            registered_barcode: '',
            supplier_item_code: '',
            batch_number: '',
            batch_barcode: '',
            notes: '',
            quantity_in_stock: 0,
            expected_quantity: 0,
            counted_quantity: null,
        };
        setItems([...items, newRow]);
        // Set openRowId to open the search dropdown for the new row
        setOpenRowId(newRow.id);
    };

    const handleSelectItem = async (rowIndex: number, variant: any) => {
        simulateSave();

        // Optimistic update for UI responsiveness
        const tempItems = [...items];
        tempItems[rowIndex] = {
            ...tempItems[rowIndex],
            variant_id: variant.id,
            item_name: variant.name,
            category: variant.category,
            internal_barcode: variant.internal_barcode,
            registered_barcode: variant.registered_barcode,
            supplier_item_code: variant.supplier_item_code,
            quantity_in_stock: variant.in_stock || 0,
            expected_quantity: variant.in_stock || 0,
        };
        setItems(tempItems);
        setOpenRowId(null);

        // Save to backend
        try {
            if (stocktake && stocktake.id) {
                const newItem = await addStocktakeItem(stocktake.id, variant.id, variant.in_stock || 0);
                if (newItem) {
                    // Update the row with the real ID from DB
                    const updatedItems = [...tempItems];
                    updatedItems[rowIndex] = newItem;
                    setItems(updatedItems);
                }
            }
        } catch (error) {
            console.error("Failed to add stocktake item:", error);
            // Optionally revert optimistic update here
        }
    };


    const handleDeleteRow = async (id: string, rowIndex?: number) => {
        simulateSave();
        // Optimistic delete
        const prevItems = [...items];
        setItems(items.filter(item => item.id !== id));

        // If it's a temp row (not saved to DB yet), just basic filter is enough (which we did).
        // If it has a real DB ID (length is UUID like), call API. 
        // Our newRow uses crypto.randomUUID(), so checking if it exists in DB is tricky unless we track isNew.
        // However, items loaded from DB exist. Items added via Add Row have randomUUID.
        // If we successfully saved it in handleSelectItem, it has a DB ID.
        // The safest way is to try deleting from DB. If it fails (not found), ignore.
        // Or assume everything with variant_id set is in DB.

        const itemToDelete = prevItems.find(i => i.id === id);
        if (itemToDelete && itemToDelete.variant_id) {
            try {
                await deleteStocktakeItem(id);
            } catch (error) {
                console.error("Failed to delete item:", error);
                // Revert
                setItems(prevItems);
            }
        }
    };

    const handleCountedQuantity = async (rowIndex: number, value: string) => {
        simulateSave();
        const newItems = [...items];
        const numValue = value === '' ? null : parseFloat(value);
        newItems[rowIndex].counted_quantity = numValue;
        setItems(newItems);

        // Save to backend
        const item = newItems[rowIndex];
        if (item.variant_id) { // Only save if it's a real item
            try {
                await updateStocktakeItemCount(item.id, numValue);
            } catch (error) {
                console.error("Failed to update count:", error);
            }
        }
    };

    const handleStatusChange = async (status: 'not_started' | 'in_progress' | 'completed') => {
        if (!stocktake) return;
        simulateSave();
        // Optimistic update
        setStocktake({ ...stocktake, status: status as any }); // Cast as any because local type might differ slightly from DB enum

        try {
            const updated = await updateStocktakeStatus(stocktake.id, status);
            if (updated) {
                // Refresh if completed to show adjustment link
                if (status === 'completed') {
                    const { stocktake: refreshed } = await fetchStocktakeWithItems(stocktake.id);
                    setStocktake(refreshed);
                } else {
                    setStocktake(updated);
                }
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const handleClose = () => {
        router.push('/stock?tab=stocktakes');
    };

    if (loading) return (
        <Shell activeTab="Stock" activePage="Stocktakes">
            <div className="flex-1 flex items-center justify-center bg-background">
                <Loader2 className="animate-spin text-muted-foreground" size={32} />
            </div>
        </Shell>
    );

    if (!stocktake) return (
        <Shell activeTab="Stock" activePage="Stocktakes">
            <div className="flex-1 flex flex-col items-center justify-center bg-background text-foreground space-y-4">
                <div className="text-xl font-medium">Stocktake not found</div>
                <Button onClick={handleClose} variant="outline">
                    Go Back
                </Button>
            </div>
        </Shell>
    );

    return (
        <Shell activeTab="Stock" activePage="Stocktakes">
            <div
                className="h-full overflow-y-auto bg-background font-sans text-[13px] text-foreground pb-20 flex flex-col no-scrollbar"
                onContextMenu={handleContextMenu}
            >
                {contextMenu && (
                    <div
                        style={{ top: contextMenu.y, left: contextMenu.x }}
                        className="fixed z-50 bg-popover border border-border rounded-md shadow-lg py-1 min-w-[180px] w-auto animate-in fade-in-0 zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border/50 mb-1">
                            Columns
                        </div>
                        {[
                            { key: 'category', label: 'Category' },
                            { key: 'internalBarcode', label: 'Internal Barcode' },
                            { key: 'registeredBarcode', label: 'Reg. Barcode' },
                            { key: 'supplierItemCode', label: 'Supp. Item Code' },
                            { key: 'batchNumber', label: 'Batch #' },
                            { key: 'batchBarcode', label: 'Batch Barcode' },
                            { key: 'notes', label: 'Notes' },
                            { key: 'quantityInStock', label: 'Quantity in Stock' },
                            { key: 'expectedQuantity', label: 'Expected' },
                            { key: 'countedQuantity', label: 'Counted' },
                        ].map(col => (
                            <div
                                key={col.key}
                                className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-accent/50 transition-colors text-sm text-foreground rounded mx-1"
                                onClick={() => toggleColumn(col.key)}
                            >
                                <Checkbox
                                    checked={visibleColumns[col.key]}
                                    className="data-[state=checked]:bg-[#5b9bd5] data-[state=checked]:border-[#5b9bd5] data-[state=checked]:text-white w-3.5 h-3.5 rounded-[3px]"
                                />
                                <span className="truncate">{col.label}</span>
                            </div>
                        ))}
                        <div className="border-t border-border/50 mt-1 pt-1 mx-1">
                            <button
                                className="w-full text-left px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent/50 rounded transition-colors"
                                onClick={resetAllColumns}
                            >
                                Reset to defaults
                            </button>
                        </div>
                    </div>
                )}

                {/* --- Header (Sticky) --- */}
                <header className="bg-background sticky top-0 z-30 border-b border-border">
                    <div className="w-full max-w-[1920px] mx-auto px-4 py-3 flex justify-between items-center">

                        {/* Left: Title & Breadcrumb Area */}
                        <div className="flex items-center gap-4">
                            <button onClick={handleClose} className="p-2 rounded-full hover:bg-secondary/50 text-muted-foreground transition-colors">
                                <ArrowLeft size={20} />
                            </button>

                            <div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5 font-medium uppercase tracking-tight">
                                    <span className="opacity-70">Stocktake</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-xl font-bold text-foreground tracking-tight">
                                        {stocktake.stocktakeNumber}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Right: Actions Toolbar */}
                        <div className="flex items-center gap-2">
                            {/* Status Dropdown */}
                            {/* Status Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className={cn(
                                        "px-2 py-0.5 rounded text-[11px] font-medium border flex items-center gap-1.5 transition-all outline-none",
                                        stocktake.status === 'not_started'
                                            ? "bg-[#ea580c]/10 text-[#ea580c] border-[#ea580c]/20 hover:bg-[#ea580c]/20"
                                            : stocktake.status === 'in_progress'
                                                ? "bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20 hover:bg-[#3b82f6]/20"
                                                : "bg-[#8aaf6e]/10 text-[#8aaf6e] border-[#8aaf6e]/20 hover:bg-[#8aaf6e]/20"
                                    )}>
                                        {stocktake.status === 'not_started' ? 'Not started' :
                                            stocktake.status === 'in_progress' ? 'In progress' : 'Completed'}
                                        <ChevronDown size={12} className="opacity-70" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[180px]">
                                    <DropdownMenuItem onClick={() => handleStatusChange('not_started')} className="text-[11px] font-bold uppercase tracking-wider">
                                        <div className="w-2 h-2 rounded-full bg-[#bb8b5d] mr-2"></div>
                                        Not started
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleStatusChange('in_progress')} className="text-[11px] font-bold uppercase tracking-wider">
                                        <div className="w-2 h-2 rounded-full bg-[#5b9bd5] mr-2"></div>
                                        In progress
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleStatusChange('completed')} className="text-[11px] font-bold uppercase tracking-wider">
                                        <div className="w-2 h-2 rounded-full bg-[#8aaf6e] mr-2"></div>
                                        Completed
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="mr-4 flex items-center justify-center">
                                {saveStatus === 'saving' ? (
                                    <Loader2 size={16} className="animate-spin text-muted-foreground" />
                                ) : (
                                    <Check size={16} className="text-[#8aaf6e]" strokeWidth={3} />
                                )}
                                <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                                    {saveStatus === 'saving' ? 'Saving...' : 'All changes saved'}
                                </span>
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
                                <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuItem className="text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete stocktake
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="w-[1px] h-5 bg-border mx-1"></div>

                            <button onClick={handleClose} className="p-2 hover:bg-secondary/50 rounded-md transition-all text-muted-foreground hover:text-foreground" title="Close">
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="w-full max-w-[1920px] mx-auto p-6 space-y-8 flex-1">

                    {/* Top Section: Redesigned Header Form Section (match Sales Order style) */}
                    <div className="bg-background rounded-lg border border-border overflow-hidden">
                        <div className="grid grid-cols-3 border-b border-border">
                            <div className="p-4 border-r border-border">
                                <label className="block text-[11px] font-bold text-muted-foreground mb-1 uppercase tracking-wider opacity-60">Stocktake #</label>
                                <div className="text-[14px] font-medium text-foreground">{stocktake.stocktakeNumber}</div>
                            </div>
                            <div className="p-4 border-r border-border">
                                <label className="block text-[11px] font-bold text-muted-foreground mb-1 uppercase tracking-wider opacity-60">Created date</label>
                                <div className="text-[14px] text-foreground">{stocktake.createdDate?.split('T')[0]}</div>
                            </div>
                            <div className="p-4">
                                <label className="block text-[11px] font-bold text-muted-foreground mb-1 uppercase tracking-wider opacity-60">Completed date</label>
                                <div className="text-[14px] text-foreground">{stocktake.completedDate || '-'}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3">
                            <div className="p-4 border-r border-border group">
                                <label className="block text-[11px] font-bold text-muted-foreground mb-1 uppercase tracking-wider opacity-60">Stocktake reason</label>
                                <input
                                    className="w-full bg-transparent py-1 text-[14px] text-foreground focus:outline-none transition-colors placeholder:text-muted-foreground/30"
                                    defaultValue={stocktake.reason}
                                    placeholder="Add a reason..."
                                    onBlur={() => simulateSave()}
                                />
                            </div>
                            <div className="p-4 border-r border-border group">
                                <label className="block text-[11px] font-bold text-muted-foreground mb-1 uppercase tracking-wider opacity-60">Location</label>
                                <div className="flex items-center justify-between py-1 cursor-pointer hover:bg-secondary/20 transition-colors px-1 rounded-sm -mx-1">
                                    <span className="text-[14px] text-foreground font-medium">{stocktake.location}</span>
                                    <ChevronDown size={14} className="text-muted-foreground opacity-50" />
                                </div>
                            </div>
                            <div className="p-4">
                                <label className="text-[11px] font-bold text-muted-foreground mb-1 uppercase tracking-wider opacity-60 flex items-center gap-1.5">
                                    Stock Adjustment #
                                    <TooltipProvider>
                                        <Tooltip delayDuration={300}>
                                            <TooltipTrigger asChild>
                                                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help hover:text-foreground transition-colors" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-[280px] bg-popover border border-border p-3 text-xs leading-relaxed shadow-lg text-popover-foreground">
                                                Link to the stock adjustment created by a stocktake (once the stocktake's status is set to Completed).
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </label>
                                <div className="text-[14px] mt-1">
                                    {stocktake.stockAdjustmentId ? (
                                        <Link href={`/stock/adjustments/${stocktake.stockAdjustmentId}`} className="text-[#d97757] hover:underline font-medium">
                                            {stocktake.stockAdjustmentNumber || 'SA-XXX'}
                                        </Link>
                                    ) : (
                                        <span className="text-muted-foreground">-</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Grid Section - Copied/Adapted from Product Page */}
                    <div className="bg-background rounded-lg border border-border overflow-hidden relative">
                        <div className="flex justify-between items-center px-4 py-3 border-b border-border">
                            <div className="flex items-center gap-4">
                                <h2 className="text-sm font-medium text-foreground flex items-center gap-2">{items.length} Items</h2>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 text-xs gap-2"
                                    >
                                        <ScanBarcode size={14} />
                                        Scan barcodes
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto no-scrollbar">
                            <table className="w-full text-left border-collapse min-w-[1400px]">
                                <thead>
                                    <tr className="border-b border-border bg-secondary/10 text-[11px] text-muted-foreground font-medium uppercase tracking-wider h-10 select-none">
                                        {visibleColumns.item && (
                                            <th className="px-3 py-4 text-left font-medium whitespace-nowrap border-r border-border/50 relative group" style={{ width: columnWidths.item }}>
                                                ITEM / VARIANT
                                                <div className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/50" onMouseDown={(e) => handleResizeStart(e, 'item')} />
                                            </th>
                                        )}
                                        {visibleColumns.category && (
                                            <th className="px-3 py-4 text-left font-medium whitespace-nowrap border-r border-border/50 relative group" style={{ width: columnWidths.category }}>
                                                CATEGORY
                                                <div className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/50" onMouseDown={(e) => handleResizeStart(e, 'category')} />
                                            </th>
                                        )}
                                        {visibleColumns.internalBarcode && (
                                            <th className="px-3 py-4 text-left font-medium whitespace-nowrap border-r border-border/50 relative group" style={{ width: columnWidths.internalBarcode }}>
                                                INTERNAL BARCODE
                                                <div className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/50" onMouseDown={(e) => handleResizeStart(e, 'internalBarcode')} />
                                            </th>
                                        )}
                                        {visibleColumns.registeredBarcode && (
                                            <th className="px-3 py-4 text-left font-medium whitespace-nowrap border-r border-border/50 relative group" style={{ width: columnWidths.registeredBarcode }}>
                                                REG. BARCODE
                                                <div className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/50" onMouseDown={(e) => handleResizeStart(e, 'registeredBarcode')} />
                                            </th>
                                        )}
                                        {visibleColumns.supplierItemCode && (
                                            <th className="px-3 py-4 text-left font-medium whitespace-nowrap border-r border-border/50 relative group" style={{ width: columnWidths.supplierItemCode }}>
                                                SUPP. ITEM CODE
                                                <div className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/50" onMouseDown={(e) => handleResizeStart(e, 'supplierItemCode')} />
                                            </th>
                                        )}
                                        {visibleColumns.batchNumber && (
                                            <th className="px-3 py-4 text-left font-medium whitespace-nowrap border-r border-border/50 relative group" style={{ width: columnWidths.batchNumber }}>
                                                BATCH #
                                                <div className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/50" onMouseDown={(e) => handleResizeStart(e, 'batchNumber')} />
                                            </th>
                                        )}
                                        {visibleColumns.batchBarcode && (
                                            <th className="px-3 py-4 text-left font-medium whitespace-nowrap border-r border-border/50 relative group" style={{ width: columnWidths.batchBarcode }}>
                                                BATCH BARCODE
                                                <div className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/50" onMouseDown={(e) => handleResizeStart(e, 'batchBarcode')} />
                                            </th>
                                        )}
                                        {visibleColumns.notes && (
                                            <th className="px-3 py-4 text-left font-medium whitespace-nowrap border-r border-border/50 relative group" style={{ width: columnWidths.notes }}>
                                                NOTES
                                                <div className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/50" onMouseDown={(e) => handleResizeStart(e, 'notes')} />
                                            </th>
                                        )}
                                        {visibleColumns.quantityInStock && (
                                            <th className="px-3 py-4 text-left font-medium whitespace-nowrap border-r border-border/50 text-right relative group" style={{ width: columnWidths.quantityInStock }}>
                                                QUANTITY IN STOCK
                                                <div className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/50" onMouseDown={(e) => handleResizeStart(e, 'quantityInStock')} />
                                            </th>
                                        )}
                                        {visibleColumns.expectedQuantity && (
                                            <th className="px-3 py-4 text-left font-medium whitespace-nowrap border-r border-border/50 text-right relative group" style={{ width: columnWidths.expectedQuantity }}>
                                                EXPECTED
                                                <div className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/50" onMouseDown={(e) => handleResizeStart(e, 'expectedQuantity')} />
                                            </th>
                                        )}
                                        {visibleColumns.countedQuantity && (
                                            <th className="px-3 py-4 text-left font-medium whitespace-nowrap border-r border-border/50 text-right relative group" style={{ width: columnWidths.countedQuantity }}>
                                                COUNTED
                                                <div className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/50" onMouseDown={(e) => handleResizeStart(e, 'countedQuantity')} />
                                            </th>
                                        )}
                                        <th className="p-4 w-10 sticky right-0 bg-secondary/10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border text-sm bg-background">
                                    {/* Table Rows */}
                                    {items.map((item, idx) => (
                                        <tr key={item.id} className="hover:bg-secondary/20 transition-colors group h-12">
                                            {visibleColumns.item && (
                                                <td className="px-3 py-1 text-left border-r border-border/50">
                                                    {item.item_name === "" ? (
                                                        <Popover open={openRowId === item.id} onOpenChange={(open) => !open && setOpenRowId(null)}>
                                                            <PopoverTrigger asChild>
                                                                <div className="flex items-center w-full">
                                                                    <Input
                                                                        placeholder="Search or select item"
                                                                        className="h-7 w-full text-xs bg-transparent border-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm focus-visible:shadow-none"
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="p-0 w-[400px]" align="start">
                                                                <Command>
                                                                    <CommandInput placeholder="Search item..." className="text-xs" />
                                                                    <CommandList>
                                                                        <CommandEmpty className="text-xs p-2">No item found.</CommandEmpty>
                                                                        <CommandGroup heading="Items" className="text-[10px] uppercase font-bold text-muted-foreground">
                                                                            {availableVariants.map(variant => (
                                                                                <CommandItem
                                                                                    key={variant.id}
                                                                                    onSelect={() => handleSelectItem(idx, variant)}
                                                                                    className="text-xs flex flex-col items-start gap-1 py-2 cursor-pointer"
                                                                                >
                                                                                    <span className="font-medium text-foreground">{variant.name}</span>
                                                                                    <span className="text-[10px] text-muted-foreground uppercase">{variant.category} • {variant.internal_barcode}</span>
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </CommandList>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                    ) : (
                                                        <div className="flex items-center gap-1 group/item">
                                                            <span
                                                                className="uppercase font-medium text-[#d97757] text-xs px-2 py-0.5 rounded hover:underline cursor-pointer"
                                                                onClick={() => setOpenRowId(item.id)}
                                                            >
                                                                {item.item_name}
                                                            </span>
                                                            <ExternalLink size={12} className="text-[#d97757]/50 group-hover/item:text-[#d97757] transition-colors cursor-pointer" />
                                                        </div>
                                                    )}
                                                </td>
                                            )}
                                            {visibleColumns.category && <td className="px-3 py-1 text-muted-foreground border-r border-border/50">{item.category}</td>}
                                            {visibleColumns.internalBarcode && <td className="px-3 py-1 font-mono text-[11px] text-[#faf9f5] border-r border-border/50">{item.internal_barcode}</td>}
                                            {visibleColumns.registeredBarcode && <td className="px-3 py-1 font-mono text-[11px] text-[#faf9f5]/50 border-r border-border/50 italic">{item.registered_barcode}</td>}
                                            {visibleColumns.supplierItemCode && <td className="px-3 py-1 font-mono text-[11px] text-[#faf9f5]/50 border-r border-border/50 italic">{item.supplier_item_code}</td>}
                                            {visibleColumns.batchNumber && <td className="px-3 py-1 font-medium text-[#faf9f5] border-r border-border/50">{item.batch_number || '-'}</td>}
                                            {visibleColumns.batchBarcode && <td className="px-3 py-1 font-mono text-[11px] text-[#faf9f5]/50 border-r border-border/50">{item.batch_barcode || '-'}</td>}
                                            {visibleColumns.notes && <td className="px-3 py-1 text-[#faf9f5]/30 border-r border-border/50 italic">{item.notes || '-'}</td>}
                                            {visibleColumns.quantityInStock && (
                                                <td className="px-3 py-1 text-right border-r border-border/50 font-medium">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <span className="text-[#faf9f5]">{item.quantity_in_stock.toLocaleString()}</span>
                                                        <span className="text-[11px] text-[#bebcb3]">pcs</span>
                                                    </div>
                                                </td>
                                            )}
                                            {visibleColumns.expectedQuantity && (
                                                <td className="px-3 py-1 text-right border-r border-border/50 font-medium">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <span className="text-[#faf9f5]">{item.expected_quantity.toLocaleString()}</span>
                                                        <span className="text-[11px] text-[#bebcb3]">pcs</span>
                                                    </div>
                                                </td>
                                            )}
                                            {visibleColumns.countedQuantity && (
                                                <td className="px-3 py-1 text-right border-r border-border/50">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Input
                                                            type="number"
                                                            value={item.counted_quantity ?? ''}
                                                            onChange={(e) => handleCountedQuantity(idx, e.target.value)}
                                                            placeholder="0"
                                                            className="h-7 w-20 text-xs text-right bg-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm px-1 shadow-none focus-visible:shadow-none font-medium text-[#faf9f5] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        />
                                                        <span className="text-[11px] text-[#bebcb3]">pcs</span>
                                                    </div>
                                                </td>
                                            )}
                                            <td className="p-2">
                                                <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleDeleteRow(item.id)}
                                                        className="p-1.5 rounded hover:bg-secondary/50 text-muted-foreground hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="p-2">
                                            <Button
                                                variant="ghost"
                                                className="text-muted-foreground hover:text-primary hover:bg-secondary/50 h-8 px-2 text-xs font-medium flex items-center gap-1 transition-colors"
                                                onClick={handleAddRow}
                                            >
                                                <Plus size={14} /> Add row
                                            </Button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </main>

                {/* Scoped styles */}
                <style jsx global>{`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
            </div >
        </Shell >
    );
}
