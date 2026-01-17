'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Plus, Search, ArrowUpDown, MoreHorizontal, Info, ChevronLeft, ChevronRight, Filter, Factory, ShoppingCart, Download, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { fetchInventoryPaginated, KatanaInventoryItem } from '@/lib/katana-data-provider';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/LoadingSpinner';
import { InventoryIntelModal } from './InventoryIntelModal';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type TabType = 'All' | 'Products' | 'Materials';

interface FilterState {
    name: string;
    sku: string;
    category: string;
    supplier: string;
    registeredBarcode: string;
    internalBarcode: string;
    supplierItemCode: string;
    bin: string;
    avgCost: string;
    value: string;
    inStock: string;
    expected: string;
    committed: string;
    potential: string;
    safetyStock: string;
    calculatedStock: string;
}

const InventoryTableRow = React.memo(({ item, isSelected, toggleSelect, handleRowClick, handleIntelClick, handleMakeBuy, visibleColumns, allColumns }: {
    item: KatanaInventoryItem,
    isSelected: boolean,
    toggleSelect: (sku: string) => void,
    handleRowClick: (item: KatanaInventoryItem, e: React.MouseEvent) => void,
    handleIntelClick: (e: React.MouseEvent, item: KatanaInventoryItem) => void,
    handleMakeBuy: (e: React.MouseEvent, item: KatanaInventoryItem) => void,
    visibleColumns: Record<string, boolean>,
    allColumns: { key: string; label: string; align?: string }[]
}) => (
    <tr key={item.sku}
        className={cn(
            "h-10 hover:bg-secondary/20 group transition-colors cursor-pointer border-b border-[#3a3a38]/50",
            isSelected && "bg-[#5b9bd5]/10"
        )}
        onClick={(e) => handleRowClick(item, e)}
    >
        <td className="px-4 py-1 border-r border-[#3a3a38]/50">
            <Checkbox
                className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-muted-foreground size-4"
                checked={isSelected}
                onCheckedChange={() => toggleSelect(item.sku)}
            />
        </td>
        {allColumns.map((col) => {
            if (!visibleColumns[col.key]) return null;

            if (col.key === 'name') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-[#3a3a38]/50 overflow-hidden">
                        <span className="text-[#d97757] hover:text-[#e08868] font-medium text-xs truncate block max-w-[280px] hover:underline cursor-pointer transition-colors">
                            {item.name}
                        </span>
                    </td>
                );
            }

            if (col.key === 'sku') {
                return (
                    <td
                        key={col.key}
                        className="px-3 py-1 border-r border-[#3a3a38]/50 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="text-[#7a7974] font-mono text-[11px] select-text cursor-text">
                            {item.sku}
                        </span>
                    </td>
                );
            }

            if (col.key === 'category') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-[#3a3a38]/50 overflow-hidden">
                        <span className="text-white text-[11px]">
                            {item.category || '-'}
                        </span>
                    </td>
                );
            }

            if (col.key === 'avgCost' || col.key === 'value') {
                const val = (item as any)[col.key];
                return (
                    <td key={col.key} className="px-3 py-1 text-right text-white text-[11px] border-r border-[#3a3a38]/50 font-mono overflow-hidden">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0)}
                    </td>
                );
            }

            if (['inStock', 'expected', 'committed', 'potential', 'safetyStock', 'calculatedStock'].includes(col.key)) {
                const val = (item as any)[col.key];
                const isNegative = val < 0;
                const isPositive = val > 0;
                const formattedVal = Number.isInteger(val) ? val : (val || 0).toFixed(2).replace(/\.?0+$/, '');

                // Style configuration for stock levels with neon glow
                const getStockStyle = () => {
                    if (isNegative) {
                        return "text-[#ff7b6f]"; // Red for negative
                    }
                    if (col.key === 'inStock' && isPositive) {
                        return "text-[#8aaf6e]"; // Green for positive in-stock
                    }
                    return "text-white";
                };

                if (col.key === 'inStock') {
                    return (
                        <td key={col.key} className="px-3 py-1 text-right no-row-click border-r border-[#3a3a38]/50 overflow-hidden">
                            <span
                                className={cn(
                                    "px-2 py-0.5 rounded-md text-[11px] font-mono font-medium inline-flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity",
                                    isNegative
                                        ? "bg-[#2e1a1a] text-[#ff7b6f] border border-[#ff7b6f]/50 shadow-[0_0_6px_rgba(255,123,111,0.2)]"
                                        : isPositive
                                            ? "bg-[#1a2e1a] text-[#8aaf6e] border border-[#8aaf6e]/50 shadow-[0_0_6px_rgba(138,175,110,0.2)]"
                                            : "bg-[#262624] text-[#9a9a94] border border-[#3a3a38]"
                                )}
                                onClick={(e) => handleIntelClick(e, item)}
                            >
                                <span className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    isNegative
                                        ? "bg-[#ff7b6f] shadow-[0_0_4px_rgba(255,123,111,0.8)]"
                                        : isPositive
                                            ? "bg-[#8aaf6e] shadow-[0_0_4px_rgba(138,175,110,0.8)]"
                                            : "bg-[#7a7974]"
                                )} />
                                {formattedVal}
                            </span>
                        </td>
                    );
                }

                // Calculated stock also gets badge treatment
                if (col.key === 'calculatedStock') {
                    return (
                        <td key={col.key} className="px-3 py-1 text-right border-r border-[#3a3a38]/50 overflow-hidden">
                            <span
                                className={cn(
                                    "px-2 py-0.5 rounded-md text-[11px] font-mono font-medium inline-flex items-center",
                                    isNegative
                                        ? "bg-[#2e1a1a] text-[#ff7b6f] border border-[#ff7b6f]/50"
                                        : isPositive
                                            ? "text-[#8aaf6e]"
                                            : "text-white"
                                )}
                            >
                                {formattedVal}
                            </span>
                        </td>
                    );
                }

                return (
                    <td key={col.key} className={cn("px-3 py-1 text-right font-medium border-r border-[#3a3a38]/50 text-[11px] font-mono overflow-hidden", getStockStyle())}>
                        {formattedVal}
                    </td>
                );
            }

            const val = (item as any)[col.key];
            return (
                <td key={col.key} className={cn(
                    "px-3 py-1 text-white text-[11px] border-r border-[#3a3a38]/50 overflow-hidden text-ellipsis",
                    col.align === 'right' ? 'text-right' : 'text-left'
                )}>
                    {val || '-'}
                </td>
            );
        })}

        <td className="px-2 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.type === 'Product' ? (
                    <button
                        className="p-1 border border-[#3a3a38] rounded text-[#7a7974] hover:text-[#d97757] hover:border-[#d97757]/50 transition-colors"
                        title="Create Manufacturing Order"
                        onClick={(e) => handleMakeBuy(e, item)}
                    >
                        <Factory size={14} />
                    </button>
                ) : (
                    <button
                        className="p-1 border border-[#3a3a38] rounded text-[#7a7974] hover:text-[#5b9bd5] hover:border-[#5b9bd5]/50 transition-colors"
                        title="Create Purchase Order"
                        onClick={(e) => handleMakeBuy(e, item)}
                    >
                        <ShoppingCart size={14} />
                    </button>
                )}
            </div>
        </td>
    </tr>
));
InventoryTableRow.displayName = 'InventoryTableRow';

export function StockTable() {
    const router = useRouter();
    const [items, setItems] = useState<KatanaInventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>('All');
    const [selectedIntelItem, setSelectedIntelItem] = useState<KatanaInventoryItem | null>(null);
    const [locationFilter, setLocationFilter] = useState('All locations');
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

    // Column Management State
    const STORAGE_KEY = 'stock-table-view';
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
        name: 220,
        sku: 150,
        category: 120,
        supplier: 120,
        bin: 100,
        registeredBarcode: 130,
        internalBarcode: 120,
        supplierItemCode: 120,
        avgCost: 100,
        value: 100,
        inStock: 90,
        expected: 80,
        committed: 90,
        potential: 80,
        safetyStock: 80,
        calculatedStock: 100,
    });

    // Default visible columns - hide barcodes by default for cleaner view
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        name: true,
        sku: true,
        category: true,
        supplier: true,
        bin: true,
        registeredBarcode: false,  // Hidden by default
        internalBarcode: false,    // Hidden by default
        supplierItemCode: false,   // Hidden by default
        avgCost: true,
        value: true,
        inStock: true,
        expected: true,
        committed: true,
        potential: false,          // Hidden by default
        safetyStock: false,        // Hidden by default
        calculatedStock: true,
    });

    // Column order: Item Info → Stock Status → Stock Details → Value → Source
    const allColumns = [
        // Item Identification
        { key: 'name', label: 'Name' },
        { key: 'sku', label: 'SKU' },
        { key: 'category', label: 'Category' },
        // Stock Status (most important)
        { key: 'inStock', label: 'In stock', align: 'right' },
        { key: 'committed', label: 'Committed', align: 'right' },
        { key: 'expected', label: 'Expected', align: 'right' },
        { key: 'calculatedStock', label: 'Available', align: 'right' },
        // Stock Planning (secondary)
        { key: 'potential', label: 'Potential', align: 'right' },
        { key: 'safetyStock', label: 'Safety', align: 'right' },
        // Value
        { key: 'avgCost', label: 'Avg cost', align: 'right' },
        { key: 'value', label: 'Value', align: 'right' },
        // Source & Location
        { key: 'supplier', label: 'Supplier' },
        { key: 'bin', label: 'Bin' },
        // Barcodes (usually hidden)
        { key: 'registeredBarcode', label: 'Barcode' },
        { key: 'internalBarcode', label: 'Internal' },
        { key: 'supplierItemCode', label: 'Supplier code' },
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

    const resetAllColumns = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        // Reset to default view - cleaner with barcodes hidden
        setVisibleColumns({
            name: true,
            sku: true,
            category: true,
            supplier: true,
            bin: true,
            registeredBarcode: false,
            internalBarcode: false,
            supplierItemCode: false,
            avgCost: true,
            value: true,
            inStock: true,
            expected: true,
            committed: true,
            potential: false,
            safetyStock: false,
            calculatedStock: true,
        });
        setContextMenu(null);
    };

    // Shared Menu Styles - Dark theme matching Schedule page
    const menuStyles = "fixed z-50 bg-[#1e1e1e] border border-[#3a3a38] rounded-md shadow-lg py-1 min-w-[200px] animate-in fade-in-0 zoom-in-95";
    const menuItemStyles = "flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-[#2a2a28] transition-colors text-xs text-white rounded mx-1";

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const contextMenuEl = document.getElementById('column-context-menu');
            if (contextMenu && contextMenuEl && !contextMenuEl.contains(e.target as Node)) {
                setContextMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => cancelAnimationFrame(rafId.current);
    }, [contextMenu]);

    // Filters State
    const [filters, setFilters] = useState<FilterState>({
        name: '',
        sku: '',
        category: '',
        supplier: '',
        registeredBarcode: '',
        internalBarcode: '',
        supplierItemCode: '',
        bin: '',
        avgCost: '',
        value: '',
        inStock: '',
        expected: '',
        committed: '',
        potential: '',
        safetyStock: '',
        calculatedStock: ''
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 25;

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                // Map activeTab to type filter
                const typeFilter = activeTab === 'Products' ? 'product' : activeTab === 'Materials' ? 'material' : 'all';

                const { items: fetchedItems, totalCount: count, totalPages: pages } = await fetchInventoryPaginated(
                    currentPage,
                    pageSize,
                    {
                        type: typeFilter,
                        search: filters.name // Basic search by name for now
                    }
                );
                setItems(fetchedItems);
                setTotalCount(count);
                setTotalPages(pages);
            } catch (e) {
                console.error("Failed to load inventory", e);
                setItems([]);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [activeTab, currentPage, filters.name]);

    // Reset page on tab change or filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, filters]);

    // Filtering & Pagination Logic
    const filteredItems = useMemo(() => {
        let result = [...items]; // Create a copy to sort safely

        // Tab Filter
        if (activeTab === 'Products') {
            result = result.filter(i => i.type === 'Product');
        } else if (activeTab === 'Materials') {
            result = result.filter(i => i.type === 'Material');
        }

        // Column Filters
        if (Object.values(filters).some(f => f)) {
            result = result.filter(item => {
                const matchText = (text: string | number | null | undefined, filter: string) => {
                    if (!filter) return true;
                    if (text === null || text === undefined) return false;
                    const str = text.toString().toLowerCase();
                    return str.includes(filter.toLowerCase().trim());
                };

                // Apply strict column-specific filtering
                // If any filter is set, we must match ALL set filters (AND logic across columns)

                const nameMatch = matchText(item.name, filters.name);
                const skuMatch = matchText(item.sku, filters.sku);
                const categoryMatch = matchText(item.category, filters.category);
                const supplierMatch = matchText(item.supplier, filters.supplier);
                const regBarcodeMatch = matchText(item.registeredBarcode, filters.registeredBarcode);
                const intBarcodeMatch = matchText(item.internalBarcode, filters.internalBarcode);
                const supItemCodeMatch = matchText(item.supplierItemCode, filters.supplierItemCode);
                const binMatch = matchText(item.bin, filters.bin);

                // For numeric fields, we might want exact match or starts with, string match is decent for now
                const avgCostMatch = matchText(item.avgCost, filters.avgCost);
                const valueMatch = matchText(item.value, filters.value);
                const inStockMatch = matchText(item.inStock, filters.inStock);
                const expectedMatch = matchText(item.expected, filters.expected);
                const committedMatch = matchText(item.committed, filters.committed);
                const potentialMatch = matchText(item.potential, filters.potential);
                const safetyStockMatch = matchText(item.safetyStock, filters.safetyStock);
                const calcStockMatch = matchText(item.calculatedStock, filters.calculatedStock);

                return (
                    nameMatch &&
                    skuMatch &&
                    categoryMatch &&
                    supplierMatch &&
                    regBarcodeMatch &&
                    intBarcodeMatch &&
                    supItemCodeMatch &&
                    binMatch &&
                    avgCostMatch &&
                    valueMatch &&
                    inStockMatch &&
                    expectedMatch &&
                    committedMatch &&
                    potentialMatch &&
                    safetyStockMatch &&
                    calcStockMatch
                );
            });
        }

        // Default Sorting: Alphabetical by Name (Numeric aware)
        result.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

        return result;
    }, [items, activeTab, filters]);

    // Reset page on tab change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    // Drag-to-Scroll State
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const startPosRef = useRef({ x: 0, y: 0 });
    const scrollStartRef = useRef({ left: 0, top: 0 });
    const wasDraggingRef = useRef(false); // Changed to Ref for performance (no re-renders)

    // Momentum State
    const velocity = useRef({ x: 0, y: 0 });
    const lastMoveTime = useRef(0);
    const lastPosRef = useRef({ x: 0, y: 0 });
    const rafId = useRef<number>(0);

    // Drag-to-Scroll Handlers
    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.closest('button')) return;

        // Stop any existing momentum
        cancelAnimationFrame(rafId.current);

        isDraggingRef.current = true;
        wasDraggingRef.current = false; // Reset drag status without re-render

        const x = e.pageX;
        const y = e.pageY;

        startPosRef.current = { x, y };
        lastPosRef.current = { x, y };
        scrollStartRef.current = {
            left: scrollContainerRef.current.scrollLeft,
            top: scrollContainerRef.current.scrollTop
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
        if (!isDraggingRef.current || !scrollContainerRef.current) return;
        e.preventDefault();

        const x = e.pageX;
        const y = e.pageY;

        const now = Date.now();
        const dt = now - lastMoveTime.current;

        // Calculate raw distance from start
        const rawDeltaX = x - startPosRef.current.x;
        const rawDeltaY = y - startPosRef.current.y;

        // Dead Zone Logic:
        // If we haven't started "officially" dragging yet, check threshold
        if (!wasDraggingRef.current) {
            if (Math.abs(rawDeltaX) > 5 || Math.abs(rawDeltaY) > 5) {
                wasDraggingRef.current = true;
                // Re-anchor start position to current to prevent "jump"
                startPosRef.current = { x, y };
                scrollStartRef.current = {
                    left: scrollContainerRef.current.scrollLeft,
                    top: scrollContainerRef.current.scrollTop
                };
            } else {
                // Ignore micro-movements (dead zone)
                return;
            }
        }

        // Now calculate effective delta from the (potentially re-anchored) start
        const deltaX = x - startPosRef.current.x;

        // Apply scroll with damping (Horizontal only)
        const newScrollLeft = scrollStartRef.current.left - deltaX * 0.5;

        scrollContainerRef.current.scrollLeft = newScrollLeft;

        // Calculate velocity for momentum (based on actual movement)
        if (dt > 0 && dt < 100) {
            const movementX = x - lastPosRef.current.x;
            const newVelX = -movementX / dt * 0.5;

            velocity.current = {
                x: newVelX * 0.3 + velocity.current.x * 0.7,
                y: 0 // No vertical momentum
            };
        }

        lastPosRef.current = { x, y };
        lastMoveTime.current = now;
    };

    const startMomentum = () => {
        if (!scrollContainerRef.current) return;

        const friction = 0.92; // Smooth glide
        let velX = velocity.current.x * 1.5; // Moderate throw power
        let velY = velocity.current.y * 1.5;

        const step = () => {
            if (!scrollContainerRef.current) return;

            if (Math.abs(velX) < 0.5) return; // Only check X velocity

            scrollContainerRef.current.scrollLeft -= velX;
            // Removed scrollTop update

            velX *= friction;
            // Removed velY update

            rafId.current = requestAnimationFrame(step);
        };

        rafId.current = requestAnimationFrame(step);
    };

    const toggleSelectAll = () => {
        if (items.length === 0) return;
        if (selectedItems.length === items.length) setSelectedItems([]);
        else setSelectedItems(items.map(i => i.sku));
    };

    const toggleSelect = (sku: string) => {
        if (selectedItems.includes(sku)) setSelectedItems(selectedItems.filter(sid => sid !== sku));
        else setSelectedItems([...selectedItems, sku]);
    };

    const handleRowClick = (item: KatanaInventoryItem, e: React.MouseEvent) => {
        if (wasDraggingRef.current) return;

        const target = e.target as HTMLElement;
        // Prevent navigation if clicking specific elements
        if (target.closest('input') || target.closest('button') || target.closest('.no-row-click')) {
            return;
        }

        const targetId = item.productId || item.materialId || item.id;
        router.push(`/items/${targetId}?type=${item.type}`);
    };

    const handleIntelClick = (e: React.MouseEvent, item: KatanaInventoryItem) => {
        e.stopPropagation(); // Prevent row click
        setSelectedIntelItem(item);
    };

    const handleMakeBuy = (e: React.MouseEvent, item: KatanaInventoryItem) => {
        e.stopPropagation();
        const missingQty = item.calculatedStock < 0 ? Math.abs(item.calculatedStock) : 0;

        if (item.type === 'Product') {
            // Redirect to Make page (new MO)
            // In a real app, we'd pass the variantId and missingQty as params
            console.log('Navigating to Make for', item.name, 'Qty:', missingQty);
            // Placeholder for now - would be router.push(`/make/new?variantId=${item.id}&quantity=${missingQty}`)
        } else {
            // Redirect to Buy page (new PO)
            console.log('Navigating to Buy for', item.name, 'Qty:', missingQty);
            // Placeholder for now - would be router.push(`/buy/new?variantId=${item.id}&quantity=${missingQty}`)
        }
    };

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Resizing State
    const resizingRef = useRef<{ column: string; startX: number; startWidth: number } | null>(null);
    const handleMouseMoveRefResizing = useRef<((e: MouseEvent) => void) | null>(null);
    const handleMouseUpRefResizing = useRef<(() => void) | null>(null);

    const handleResizeStart = (e: React.MouseEvent, column: string) => {
        e.preventDefault();
        e.stopPropagation();

        const startWidth = columnWidths[column] || 150;
        resizingRef.current = { column, startX: e.clientX, startWidth };

        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
            const current = resizingRef.current;
            if (!current) return;

            const { column, startX, startWidth } = current;

            requestAnimationFrame(() => {
                if (!resizingRef.current) return;

                const diff = (e as MouseEvent).clientX - startX;
                const newWidth = Math.max(40, Math.min(600, startWidth + diff));

                setColumnWidths(prev => ({
                    ...prev,
                    [column]: newWidth
                }));
            });
        };

        const handleMouseUp = () => {
            resizingRef.current = null;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';

            if (handleMouseMoveRefResizing.current) document.removeEventListener('mousemove', handleMouseMoveRefResizing.current);
            if (handleMouseUpRefResizing.current) document.removeEventListener('mouseup', handleMouseUpRefResizing.current);
        };

        handleMouseMoveRefResizing.current = handleMouseMove;
        handleMouseUpRefResizing.current = handleMouseUp;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    if (loading) {
        return (
            <div className="p-8">
                <TableSkeleton rows={15} />
            </div>
        );
    }

    return (
        <div
            className="w-full h-full flex flex-col bg-background"
            onContextMenu={handleContextMenu}
        >
            <InventoryIntelModal
                isOpen={!!selectedIntelItem}
                onClose={() => setSelectedIntelItem(null)}
                item={selectedIntelItem}
            />

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

                    <div className="py-1 max-h-[400px] overflow-y-auto">
                        {/* Item Info */}
                        <div className="px-3 py-1 text-[10px] text-gray-500 uppercase tracking-wider">Item Info</div>
                        {['name', 'sku', 'category'].map(key => {
                            const col = allColumns.find(c => c.key === key);
                            if (!col) return null;
                            return (
                                <label key={col.key} className={menuItemStyles} onClick={(e) => e.stopPropagation()}>
                                    <Checkbox
                                        checked={visibleColumns[col.key]}
                                        onCheckedChange={() => toggleColumn(col.key)}
                                        className="size-3.5 rounded-sm border-[#3a3a38] data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18]"
                                    />
                                    <span className="text-xs text-white">{col.label}</span>
                                </label>
                            );
                        })}

                        {/* Stock Levels */}
                        <div className="px-3 py-1 mt-1 text-[10px] text-gray-500 uppercase tracking-wider">Stock Levels</div>
                        {['inStock', 'committed', 'expected', 'calculatedStock', 'potential', 'safetyStock'].map(key => {
                            const col = allColumns.find(c => c.key === key);
                            if (!col) return null;
                            return (
                                <label key={col.key} className={menuItemStyles} onClick={(e) => e.stopPropagation()}>
                                    <Checkbox
                                        checked={visibleColumns[col.key]}
                                        onCheckedChange={() => toggleColumn(col.key)}
                                        className="size-3.5 rounded-sm border-[#3a3a38] data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18]"
                                    />
                                    <span className="text-xs text-white">{col.label}</span>
                                </label>
                            );
                        })}

                        {/* Value */}
                        <div className="px-3 py-1 mt-1 text-[10px] text-gray-500 uppercase tracking-wider">Value</div>
                        {['avgCost', 'value'].map(key => {
                            const col = allColumns.find(c => c.key === key);
                            if (!col) return null;
                            return (
                                <label key={col.key} className={menuItemStyles} onClick={(e) => e.stopPropagation()}>
                                    <Checkbox
                                        checked={visibleColumns[col.key]}
                                        onCheckedChange={() => toggleColumn(col.key)}
                                        className="size-3.5 rounded-sm border-[#3a3a38] data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18]"
                                    />
                                    <span className="text-xs text-white">{col.label}</span>
                                </label>
                            );
                        })}

                        {/* Source & Location */}
                        <div className="px-3 py-1 mt-1 text-[10px] text-gray-500 uppercase tracking-wider">Source & Location</div>
                        {['supplier', 'bin'].map(key => {
                            const col = allColumns.find(c => c.key === key);
                            if (!col) return null;
                            return (
                                <label key={col.key} className={menuItemStyles} onClick={(e) => e.stopPropagation()}>
                                    <Checkbox
                                        checked={visibleColumns[col.key]}
                                        onCheckedChange={() => toggleColumn(col.key)}
                                        className="size-3.5 rounded-sm border-[#3a3a38] data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18]"
                                    />
                                    <span className="text-xs text-white">{col.label}</span>
                                </label>
                            );
                        })}

                        {/* Barcodes */}
                        <div className="px-3 py-1 mt-1 text-[10px] text-gray-500 uppercase tracking-wider">Barcodes</div>
                        {['registeredBarcode', 'internalBarcode', 'supplierItemCode'].map(key => {
                            const col = allColumns.find(c => c.key === key);
                            if (!col) return null;
                            return (
                                <label key={col.key} className={menuItemStyles} onClick={(e) => e.stopPropagation()}>
                                    <Checkbox
                                        checked={visibleColumns[col.key]}
                                        onCheckedChange={() => toggleColumn(col.key)}
                                        className="size-3.5 rounded-sm border-[#3a3a38] data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18]"
                                    />
                                    <span className="text-xs text-white">{col.label}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Header Controls - Matching Schedule page pattern */}
            <div className="flex flex-col border-b border-[#3a3a38] bg-[#1a1a18] shrink-0">
                {/* Row 1: Status Tabs + Location Dropdown + Action Buttons */}
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-4">
                        {/* All/Products/Materials Pill Toggle */}
                        <div className="flex rounded-md bg-secondary/40 p-0.5">
                            {['All', 'Products', 'Materials'].map((tab) => (
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

                    <div className="flex items-center gap-3">
                        {/* Location Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center justify-between gap-2 px-3 py-2 bg-[#2a2a28] border border-[#3a3a38] rounded min-w-[140px] text-white hover:bg-[#323230] transition-colors text-xs">
                                    <span>{locationFilter}</span>
                                    <ChevronDown size={14} className="text-gray-400" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-[#1e1e1e] border-[#3a3a38]">
                                <DropdownMenuLabel className="text-gray-400 text-[11px] uppercase tracking-wider">Filter by Location</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-[#3a3a38]" />
                                <DropdownMenuItem className="text-white hover:bg-[#2a2a28] text-xs" onClick={() => setLocationFilter('All locations')}>
                                    All locations
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-[#2a2a28] text-xs" onClick={() => setLocationFilter('Main Warehouse')}>
                                    Main Warehouse
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-[#2a2a28] text-xs" onClick={() => setLocationFilter('Shopify')}>
                                    Shopify
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-[#2a2a28] text-xs" onClick={() => setLocationFilter('Amazon FBA')}>
                                    Amazon FBA
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Stock Adjustment Button - Secondary style */}
                        <button
                            onClick={() => router.push('/stock/adjustments/new')}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-[#2a2a28] border border-[#3a3a38] rounded text-white hover:bg-[#323230] transition-colors text-xs font-medium"
                        >
                            <Plus size={14} />
                            <span>Stock adjustment</span>
                        </button>

                        {/* New Item Button - Primary style matching Schedule's New MO */}
                        <button
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-[#d97757] border border-[#e08868] rounded text-white hover:bg-[#e08868] transition-colors text-xs font-medium"
                            onClick={() => router.push('/items/new')}
                        >
                            <Plus size={14} />
                            <span>New item</span>
                        </button>
                    </div>
                </div>

                {/* Row 2: Item Count + Download/Print buttons */}
                <div className="flex items-center justify-between px-4 pb-2">
                    <div className="flex items-center gap-4">
                        <span className="text-[14px] font-bold text-[#faf9f5]">
                            {totalCount} items
                        </span>
                        <span className="text-[11px] text-[#7a7974]">
                            Total value: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(items.reduce((acc, i) => acc + i.value, 0))}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Download Button */}
                        <button
                            onClick={() => console.log('[Stock] Export clicked')}
                            className="p-1.5 border border-border rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                            title="Export to CSV"
                        >
                            <Download size={14} />
                        </button>

                        {/* Print Button */}
                        <button
                            onClick={() => window.print()}
                            className="p-1.5 border border-border rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                            title="Print"
                        >
                            <Printer size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div
                className="flex-1 overflow-auto no-scrollbar cursor-grab active:cursor-grabbing select-none relative"
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
                .customize-scrollbar::-webkit-scrollbar {
                    width: 4px;
                    height: 4px;
                }
                .customize-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .customize-scrollbar::-webkit-scrollbar-thumb {
                    background: #444;
                    border-radius: 2px;
                }
            `}</style>
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead className="sticky top-0 z-10 shadow-sm">
                        {/* Column Header Row */}
                        <tr className="h-8 bg-[#222220]">
                            <th className="p-1 w-10 bg-[#222220] text-center border-r border-[#3a3a38]/50">
                                <Checkbox
                                    className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-muted-foreground size-4"
                                    checked={items.length > 0 && selectedItems.length === items.length}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </th>
                            {allColumns.map((col, idx) => visibleColumns[col.key] && (
                                <th
                                    key={idx}
                                    style={{ width: columnWidths[col.key], minWidth: 40 }}
                                    className={cn(
                                        "h-8 px-3 py-0 align-middle font-medium text-[#7a7974] uppercase tracking-wider text-[11px] border-r border-[#3a3a38]/50 select-none bg-[#222220] relative group/header",
                                        col.align === 'right' ? 'text-right' : 'text-left'
                                    )}
                                >
                                    <span>{col.label}</span>
                                    {/* Resize Handle */}
                                    <div
                                        onMouseDown={(e) => handleResizeStart(e, col.key)}
                                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 opacity-0 group-hover/header:opacity-100 transition-all z-20"
                                    />
                                </th>
                            ))}
                            <th className="px-4 py-1 w-10 bg-[#222220]"></th>
                        </tr>
                        {/* Filter Row */}
                        <tr className="border-b border-[#3a3a38]/50 bg-[#1a1a18] sticky top-8 z-10">
                            <th className="p-0.5 bg-[#1a1a18] border-r border-[#3a3a38]/50 w-10"></th>
                            {allColumns.map((col) => visibleColumns[col.key] && (
                                <th key={col.key} style={{ width: columnWidths[col.key], minWidth: 40 }} className="p-0.5 px-2 border-r border-[#3a3a38]/50 bg-[#1a1a18]">
                                    <input
                                        className="w-full px-2 py-0.5 border border-[#3a3a38] rounded-sm text-[11px] font-normal bg-background focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                                        placeholder="Filter"
                                        spellCheck={false}
                                        value={filters[col.key as keyof FilterState]}
                                        onChange={(e) => handleFilterChange(col.key as keyof FilterState, e.target.value)}
                                    />
                                </th>
                            ))}
                            <th className="p-0.5 bg-[#1a1a18] w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3a3a38] bg-background">
                        {items.map((item) => (
                            <InventoryTableRow
                                key={item.sku}
                                item={item}
                                isSelected={selectedItems.includes(item.sku)}
                                toggleSelect={toggleSelect}
                                handleRowClick={handleRowClick}
                                handleIntelClick={handleIntelClick}
                                handleMakeBuy={handleMakeBuy}
                                visibleColumns={visibleColumns}
                                allColumns={allColumns}
                            />
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan={allColumns.length + 1} className="px-4 py-8 text-center text-muted-foreground italic">
                                    No items found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            {!loading && (
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
