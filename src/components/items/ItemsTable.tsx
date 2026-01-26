'use client';

import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, ArrowUpDown, MoreHorizontal, ChevronLeft, ChevronRight, Filter, Download, Printer, Pencil, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchItemsPaginated, KatanaItemListItem } from '@/lib/katana-data-provider';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/LoadingSpinner';
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from '@/lib/supabaseClient';

// Debounce hook - wait for user to stop typing before searching
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};

type TabType = 'Products' | 'Materials' | 'Services';
type StatusType = 'Active' | 'Archive';

interface FilterState {
    name: string;
    sku: string;
    registeredBarcode: string;
    internalBarcode: string;
    supplierItemCode: string;
    category: string;
    salesPrice: string;
    prodTime: string;
}

// Helper to format seconds into time string (e.g., "1 m 2 s" or "3 s")
const formatTime = (seconds: number): string => {
    if (!seconds) return '-';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    if (m > 0 && s > 0) return `${m} m ${s} s`;
    if (m > 0) return `${m} m`;
    return `${s} s`;
};

export function ItemsTable() {
    const router = useRouter();
    const [items, setItems] = useState<KatanaItemListItem[]>([]);
    const [initialLoading, setInitialLoading] = useState(true); // Only for first load
    const [isRefreshing, setIsRefreshing] = useState(false); // For subsequent loads (subtle indicator)
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [activeStatus, setActiveStatus] = useState<StatusType>('Active');
    const [activeTab, setActiveTab] = useState<TabType>('Products');

    // Filters State
    const [filters, setFilters] = useState<FilterState>({
        name: '',
        sku: '',
        registeredBarcode: '',
        internalBarcode: '',
        supplierItemCode: '',
        category: '',
        salesPrice: '',
        prodTime: ''
    });

    // Debounce search input - wait 300ms after user stops typing
    const debouncedNameFilter = useDebounce(filters.name, 300);

    // Drag-to-Scroll State
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [wasDragging, setWasDragging] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 25;

    // Column Management State
    const STORAGE_KEY = 'items-table-view';
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
        name: 300,
        sku: 150,
        registeredBarcode: 150,
        internalBarcode: 150,
        supplierItemCode: 150,
        category: 150,
        salesPrice: 120,
        prodTime: 100,
    });

    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        name: true,
        sku: true,
        registeredBarcode: true,
        internalBarcode: true,
        supplierItemCode: true,
        category: true,
        salesPrice: true,
        prodTime: true,
    });

    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    // Use useRef for resizing to avoid re-renders during drag
    const resizingRef = useRef<{ column: string; startX: number; startWidth: number } | null>(null);

    // Column Order & Drag State
    const [columnOrder, setColumnOrder] = useState<string[]>([
        'name', 'sku', 'registeredBarcode', 'internalBarcode',
        'supplierItemCode', 'category', 'salesPrice', 'prodTime'
    ]);
    const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

    // Shared Menu Styles - Dark theme matching design system
    const menuStyles = "fixed z-50 bg-[#1e1e1e] border border-[#3a3a38] rounded-md shadow-lg py-1 min-w-[200px] animate-in fade-in-0 zoom-in-95";
    const menuItemStyles = "flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-[#2a2a28] transition-colors text-xs text-white rounded mx-1";
    const menuHeaderStyles = "px-3 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wide border-b border-[#3a3a38] mb-1";

    // Column Config

    // Column Config
    const allColumns = [
        { key: 'name', label: 'Name', required: true, info: 'Item name' },
        { key: 'sku', label: 'Variant code / SKU', info: 'Stock Keeping Unit identifier' },
        { key: 'registeredBarcode', label: 'Registered barcode', info: 'Official barcode' },
        { key: 'internalBarcode', label: 'Internal barcode', info: 'Internal tracking barcode' },
        { key: 'supplierItemCode', label: 'Supplier item code', info: 'Supplier reference' },
        { key: 'category', label: 'Category', info: 'Item category' },
        { key: 'salesPrice', label: 'Default sales price', align: 'left', info: 'Default selling price' },
        { key: 'prodTime', label: 'Prod. time', align: 'left', info: 'Production time' },
    ];

    // Load saved view on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const { columns, widths } = JSON.parse(saved);
                if (columns) setVisibleColumns(columns);
                if (widths) setColumnWidths(prev => ({ ...prev, ...widths }));
            } catch (e) {
                console.error("Failed to load saved view", e);
            }
        }
    }, []);



    // Resize Logic (Smooth with RAF)
    const handleMouseMoveRef = useRef<((e: MouseEvent) => void) | null>(null);
    const handleMouseUpRef = useRef<(() => void) | null>(null);

    const handleResizeStart = (e: React.MouseEvent, column: string) => {
        e.preventDefault();
        e.stopPropagation();

        const startWidth = columnWidths[column] || 150;
        resizingRef.current = { column, startX: e.clientX, startWidth };

        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        const handleMouseMove = (e: MouseEvent) => {
            if (!resizingRef.current) return;

            // Use requestAnimationFrame for smooth updates
            requestAnimationFrame(() => {
                if (!resizingRef.current) return;

                const diff = e.clientX - resizingRef.current.startX;
                // Min 40px, Max 600px
                const newWidth = Math.max(40, Math.min(600, resizingRef.current.startWidth + diff));

                setColumnWidths(prev => ({
                    ...prev,
                    [resizingRef.current!.column]: newWidth
                }));
            });
        };

        const handleMouseUp = () => {
            resizingRef.current = null;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';

            if (handleMouseMoveRef.current) document.removeEventListener('mousemove', handleMouseMoveRef.current);
            if (handleMouseUpRef.current) document.removeEventListener('mouseup', handleMouseUpRef.current);
        };

        handleMouseMoveRef.current = handleMouseMove;
        handleMouseUpRef.current = handleMouseUp;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Drag-to-Reorder Handlers
    const handleDragStart = (e: React.DragEvent, columnKey: string) => {
        setDraggedColumn(columnKey);
        e.dataTransfer.effectAllowed = 'move';
        // Make drag image slightly transparent
        if (e.currentTarget instanceof HTMLElement) {
            e.currentTarget.style.opacity = '0.5';
        }
    };

    const handleDragEnd = (e: React.DragEvent) => {
        setDraggedColumn(null);
        setDragOverColumn(null);
        if (e.currentTarget instanceof HTMLElement) {
            e.currentTarget.style.opacity = '1';
        }
    };

    const handleDragOver = (e: React.DragEvent, columnKey: string) => {
        e.preventDefault();
        if (columnKey !== draggedColumn) {
            setDragOverColumn(columnKey);
        }
    };

    const handleDrop = (e: React.DragEvent, targetColumnKey: string) => {
        e.preventDefault();
        if (!draggedColumn || draggedColumn === targetColumnKey) return;

        setColumnOrder(prev => {
            const newOrder = [...prev];
            const draggedIndex = newOrder.indexOf(draggedColumn);
            const targetIndex = newOrder.indexOf(targetColumnKey);

            // Remove dragged column and insert at target position
            newOrder.splice(draggedIndex, 1);
            newOrder.splice(targetIndex, 0, draggedColumn);

            return newOrder;
        });

        setDraggedColumn(null);
        setDragOverColumn(null);
    };

    // Context Menu Logic
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };



    const toggleColumn = (key: string) => {
        setVisibleColumns(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const saveAsDefault = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                columns: visibleColumns,
                widths: columnWidths,
            }));
            setContextMenu(null);
        } catch (error) {
            console.error('Failed to save preferences:', error);
        }
    };

    const resetAllColumns = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        try {
            localStorage.removeItem(STORAGE_KEY);
            setVisibleColumns({
                name: true,
                sku: true,
                registeredBarcode: true,
                internalBarcode: true,
                supplierItemCode: true,
                category: true,
                salesPrice: true,
                prodTime: true,
            });
            setColumnWidths({
                name: 300,
                sku: 150,
                registeredBarcode: 150,
                internalBarcode: 150,
                supplierItemCode: 150,
                category: 150,
                salesPrice: 120,
                prodTime: 100,
            });
            setColumnOrder([
                'name', 'sku', 'registeredBarcode', 'internalBarcode',
                'supplierItemCode', 'category', 'salesPrice', 'prodTime'
            ]);
            setContextMenu(null);
        } catch (error) {
            console.error('Failed to reset preferences:', error);
        }
    };

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // Check if clicking inside any custom menu
            const target = e.target as Node;
            const contextMenuEl = document.getElementById('column-context-menu');

            if (contextMenu && contextMenuEl && !contextMenuEl.contains(target)) {
                setContextMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [contextMenu]);

    useEffect(() => {
        async function loadItems() {
            // Only show full skeleton on initial load, not during filtering
            if (items.length === 0) {
                setInitialLoading(true);
            } else {
                setIsRefreshing(true);
            }

            try {
                // Map activeTab to type filter
                const typeFilter = activeTab === 'Products' ? 'product' : activeTab === 'Materials' ? 'material' : 'service';

                const { items: fetchedItems, totalCount: count, totalPages: pages } = await fetchItemsPaginated(
                    currentPage,
                    pageSize,
                    {
                        type: typeFilter,
                        search: debouncedNameFilter // Use debounced value
                    }
                );

                // Only update if we got data
                if (fetchedItems) {
                    setItems(fetchedItems);
                    setTotalCount(count);
                    setTotalPages(pages);
                }
            } catch (error) {
                console.error("Failed to load items", error);
            } finally {
                setInitialLoading(false);
                setIsRefreshing(false);
            }
        }
        loadItems();
    }, [activeTab, activeStatus, currentPage, debouncedNameFilter]); // Use debounced filter value

    // Filtering & Pagination Logic
    const filteredItems = useMemo(() => {
        let result = items;

        // Filter by Status (Active/Archive)
        result = result.filter(i => i.status === (activeStatus === 'Archive' ? 'Archived' : 'Active'));

        // Filter by Type
        if (activeTab === 'Products') {
            result = result.filter(i => i.type === 'Product');
        } else if (activeTab === 'Materials') {
            result = result.filter(i => i.type === 'Material');
        } else if (activeTab === 'Services') {
            result = result.filter(i => i.type === 'Service');
        }

        // Apply Column Filters (Smart/Partial Match)
        if (Object.values(filters).some(f => f)) {
            result = result.filter(item => {
                const matchText = (text: string, filter: string) => {
                    if (!filter) return true;
                    if (!text) return false;
                    const normalizedText = text.toLowerCase();
                    const normalizedFilter = filter.toLowerCase().trim();
                    return normalizedText.includes(normalizedFilter);
                };

                return (
                    matchText(item.name, filters.name) &&
                    matchText(item.sku, filters.sku) &&
                    matchText(item.registeredBarcode, filters.registeredBarcode) &&
                    matchText(item.internalBarcode, filters.internalBarcode) &&
                    matchText(item.supplierItemCode, filters.supplierItemCode) &&
                    matchText(item.category, filters.category) &&
                    matchText(item.salesPrice ? item.salesPrice.toString() : '', filters.salesPrice) &&
                    matchText(formatTime(item.productionTime), filters.prodTime)
                );
            });
        }

        return result;
    }, [items, activeTab, activeStatus, filters]);

    // Reset page on tab change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, activeStatus]); // Reset page when category or status changes

    // Drag-to-Scroll Handlers
    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        // Only start drag if not clicking an input
        if ((e.target as HTMLElement).tagName === 'INPUT') return;

        setIsDragging(true);
        setWasDragging(false);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const onMouseLeave = () => {
        setIsDragging(false);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 1.2;

        if (Math.abs(x - startX) > 5) {
            setWasDragging(true);
        }

        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const toggleSelectAll = () => {
        if (filteredItems.length === 0) return;
        if (selectedItems.length === filteredItems.length) setSelectedItems([]);
        else setSelectedItems(filteredItems.map(i => i.id));
    };

    const toggleSelect = (id: string) => {
        if (selectedItems.includes(id)) setSelectedItems(selectedItems.filter(sid => sid !== id));
        else setSelectedItems([...selectedItems, id]);
    };

    const handleRowClick = (item: KatanaItemListItem, e: React.MouseEvent) => {
        if (wasDragging) return;

        // Prevent navigation if clicking checkboxes or buttons, OR input fields (defensive)
        const target = e.target as HTMLElement;
        if (target.closest('input') || target.closest('button')) {
            return;
        }
        const targetId = item.productId || item.materialId || item.id;
        router.push(`/items/${targetId}?type=${item.type}`);
    };

    // Filter Change Handler
    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Only show full skeleton on initial load (no data yet)
    if (initialLoading && items.length === 0) {
        return (
            <div className="p-8">
                <TableSkeleton rows={15} />
            </div>
        );
    }

    return (
        <div
            className="w-full h-full flex flex-col bg-background relative"
            onContextMenu={handleContextMenu}
        >
            {contextMenu && (
                <div
                    id="column-context-menu"
                    className={menuStyles}
                    style={{ left: contextMenu.x, top: contextMenu.y }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between px-3 py-1.5">
                        <span className="text-gray-400 text-[11px] uppercase tracking-wider font-medium">
                            Columns
                        </span>
                        <button
                            onClick={resetAllColumns}
                            className="text-[11px] text-gray-400 hover:text-white transition-colors"
                            title="Reset to default"
                        >
                            Reset
                        </button>
                    </div>
                    <div className="h-px bg-[#3a3a38] mx-1 mb-1"></div>

                    <div className="py-1">
                        {allColumns.filter(col => col.key !== 'name').map(col => (
                            <label
                                key={col.key}
                                className={menuItemStyles}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Checkbox
                                    checked={visibleColumns[col.key]}
                                    onCheckedChange={(checked) => {
                                        toggleColumn(col.key);
                                    }}
                                    className="size-3.5 rounded-sm border-[#3a3a38] data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18]"
                                />
                                <span className="text-xs text-white">{col.label}</span>
                            </label>
                        ))}
                    </div>

                </div>
            )}
            {/* Header Controls */}
            <div className="flex flex-col border-b border-[#3a3a38] shrink-0 relative z-20 bg-[#1a1a18]">
                {/* Top Level: Status Tabs */}
                <div className="flex items-center px-6 border-b border-[#3a3a38] gap-6">
                    {['Active', 'Archive'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setActiveStatus(status as StatusType)}
                            className={cn(
                                "py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
                                activeStatus === status
                                    ? "border-primary text-primary"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Second Level: Type Tabs & Actions */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a18]">
                    <div className="flex items-center gap-4">
                        {/* Products/Materials/Services Pill Toggle */}
                        <div className="flex rounded-md bg-secondary/40 p-0.5">
                            {['Products', 'Materials', 'Services'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as TabType)}
                                    className={cn(
                                        "px-3 py-0.5 font-medium rounded-sm transition-all text-xs",
                                        activeTab === tab
                                            ? "bg-background text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* New Item Button - creates item based on active tab */}
                        <button
                            onClick={async () => {
                                // Determine item type based on active tab
                                const type = activeTab === 'Products' ? 'product' : activeTab === 'Materials' ? 'material' : 'service';
                                const name = activeTab === 'Products' ? 'New Product' : activeTab === 'Materials' ? 'New Material' : 'New Service';

                                // Set properties based on type
                                const isPurchasable = type === 'material';
                                const isSellable = type === 'product' || type === 'service';
                                const isProducible = type === 'product';

                                const itemId = crypto.randomUUID();
                                const { error: itemError } = await supabase
                                    .from('items')
                                    .insert({
                                        id: itemId,
                                        name: name,
                                        sku: null,
                                        type: type,
                                        uom: 'pcs',
                                        is_purchasable: isPurchasable,
                                        is_sellable: isSellable,
                                        is_producible: isProducible,
                                        is_batch_tracked: false,
                                        batch_tracking_enabled: false,
                                    });

                                if (itemError) {
                                    console.error(`Failed to create ${type}:`, JSON.stringify(itemError, null, 2));
                                    return;
                                }

                                // Create default variant with null SKU (user will enter their own)
                                await supabase.from('variants').insert({
                                    id: crypto.randomUUID(),
                                    item_id: itemId,
                                    sku: null,
                                });

                                router.push(`/items/${itemId}?type=${type}`);
                            }}
                            className="flex items-center gap-1 bg-white border border-[#e5e5e5] text-[#1a1a18] hover:bg-[#f5f5f5] rounded px-3 py-2 text-xs font-medium transition-colors"
                        >
                            {activeTab === 'Products' ? 'Product' : activeTab === 'Materials' ? 'Material' : 'Service'}
                        </button>
                    </div>
                </div>

                {/* Row 2: Item Count or Selection Action Bar */}
                <div className="flex items-center justify-between px-4 pb-2">
                    <div className="flex items-center gap-4">
                        <span className="text-[14px] font-bold text-[#faf9f5]">
                            {selectedItems.length > 0
                                ? `${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''} selected`
                                : `${filteredItems.length} items`
                            }
                        </span>
                    </div>
                    {selectedItems.length > 0 && (
                        <div className="flex items-center gap-1">
                            <button
                                className="p-1.5 border border-border rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => console.log(`Export ${selectedItems.length} items as CSV`)}
                                title="Export"
                            >
                                <Download size={14} />
                            </button>
                            <button
                                className="p-1.5 border border-border rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => console.log(`Print ${selectedItems.length} items`)}
                                title="Print"
                            >
                                <Printer size={14} />
                            </button>
                            <button
                                className="p-1.5 border border-border rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => console.log(`Edit ${selectedItems.length} items`)}
                                title="Edit"
                            >
                                <Pencil size={14} />
                            </button>
                            <button
                                className="p-1.5 border border-border rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => console.log(`Delete ${selectedItems.length} items`)}
                                title="Delete"
                            >
                                <Trash size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Table Container */}
            <div
                className="flex-1 overflow-auto no-scrollbar relative"
                ref={scrollContainerRef}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
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
                {/* Subtle loading indicator - small spinner in corner */}
                {isRefreshing && (
                    <div className="absolute top-2 right-2 z-20">
                        <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-primary rounded-full animate-spin" />
                    </div>
                )}
                <table className={cn(
                    "w-full text-[13px] text-left border-collapse whitespace-nowrap transition-opacity duration-150",
                    isRefreshing && "opacity-60"
                )}>
                    <thead className="sticky top-0 z-10 shadow-sm">
                        {/* Column Header Row */}
                        <tr className="h-8 bg-[#222220]">
                            <th className="p-1 w-8 bg-[#222220] text-center border-r border-[#3a3a38]/50">
                                <Checkbox
                                    className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-[#3a3a38] size-4"
                                    checked={filteredItems.length > 0 && selectedItems.length === filteredItems.length}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </th>
                            {allColumns.map((col) => (
                                visibleColumns[col.key] && (
                                    <th
                                        key={col.key}
                                        style={{ width: columnWidths[col.key], minWidth: 40 }}
                                        className={cn(
                                            "h-8 px-3 py-0 align-middle font-medium text-[#7a7974] uppercase tracking-wider text-[11px] border-r border-[#3a3a38]/50 select-none bg-[#222220] relative group/header",
                                            col.align === 'right' ? 'text-right' : 'text-left'
                                        )}
                                    >
                                        <div className={cn("flex items-center gap-1", col.align === 'right' && "justify-end")}>
                                            <span>{col.label}</span>
                                        </div>
                                        {/* Resize Handle */}
                                        <div
                                            onMouseDown={(e) => handleResizeStart(e, col.key)}
                                            className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 opacity-0 group-hover/header:opacity-100 transition-all z-20"
                                        />
                                    </th>
                                )
                            ))}
                            <th className="px-4 py-1 w-8 bg-[#222220]"></th>
                        </tr>
                        {/* Filter Row */}
                        <tr className="border-b border-[#3a3a38]/50 bg-[#1a1a18] sticky top-8 z-10">
                            <th className="p-0.5 bg-[#1a1a18] border-r border-[#3a3a38]/50 w-8"></th>
                            {allColumns.map((col) => {
                                if (!visibleColumns[col.key]) return null;
                                return (
                                    <th
                                        key={`filter-${col.key}`}
                                        style={{ width: columnWidths[col.key], minWidth: 40 }}
                                        className="p-0.5 px-2 border-r border-[#3a3a38]/50 bg-[#1a1a18]"
                                    >
                                        <input
                                            className="w-full px-2 py-0.5 border border-[#3a3a38] rounded-sm text-[11px] font-normal bg-background focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                                            placeholder="Filter"
                                            spellCheck={false}
                                            value={filters[col.key as keyof FilterState]}
                                            onChange={(e) => handleFilterChange(col.key as keyof FilterState, e.target.value)}
                                        />
                                    </th>
                                );
                            })}
                            <th className="p-0.5 bg-[#1a1a18] w-8"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3a3a38] bg-background">
                        {filteredItems.map((item) => (
                            <tr
                                key={item.id}
                                onClick={(e) => handleRowClick(item, e)}
                                className={cn(
                                    "h-10 hover:bg-secondary/20 transition-colors group cursor-pointer border-b border-[#3a3a38]/50",
                                    selectedItems.includes(item.id) && "bg-[#5b9bd5]/10"
                                )}
                            >
                                <td className="px-2 py-1 border-r border-[#3a3a38]/50 text-center">
                                    <Checkbox
                                        className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-[#3a3a38] size-4"
                                        checked={selectedItems.includes(item.id)}
                                        onCheckedChange={() => toggleSelect(item.id)}
                                    />
                                </td>
                                {allColumns.map((col) => {
                                    if (!visibleColumns[col.key]) return null;

                                    if (col.key === 'name') {
                                        return (
                                            <td key={col.key} className="px-3 py-1 text-sm border-r border-[#3a3a38]/50 font-medium truncate max-w-[300px]">
                                                <span className="text-[#d97757] hover:underline cursor-pointer">
                                                    {item.name}
                                                </span>
                                            </td>
                                        );
                                    }

                                    if (col.key === 'salesPrice') {
                                        return (
                                            <td key={col.key} className="px-3 py-1 text-left font-mono text-white text-xs border-r border-border/50 whitespace-nowrap">
                                                {item.salesPrice.toFixed(2)} <span className="text-[10px] text-gray-400">CAD</span>
                                            </td>
                                        );
                                    }

                                    if (col.key === 'prodTime') {
                                        return (
                                            <td key={col.key} className="px-3 py-1 text-left text-xs border-r border-border/50 whitespace-nowrap">
                                                {formatTime(item.productionTime)}
                                            </td>
                                        );
                                    }

                                    const val = (item as any)[col.key];
                                    return (
                                        <td key={col.key} className="px-3 py-1 text-white text-xs border-r border-border/50 truncate max-w-[150px]">
                                            {val || '-'}
                                        </td>
                                    );
                                })}
                                <td className="px-3 py-1 text-right">
                                    <button className="p-1 hover:bg-secondary rounded transition-colors text-muted-foreground opacity-0 group-hover:opacity-100">
                                        <MoreHorizontal size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredItems.length === 0 && (
                            <tr>
                                <td colSpan={allColumns.length + 2} className="p-8 text-center text-muted-foreground italic text-xs">
                                    No items found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            {!initialLoading && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalCount}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
}
