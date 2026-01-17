'use client';

import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, MapPin, ChevronDown, Download, Printer, Pencil, Trash, ScanLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchPurchaseOrdersPaginated, PurchaseOrder } from '@/lib/katana-data-provider';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/LoadingSpinner';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterState {
    createdDate: string;
    poNo: string;
    supplier: string;
    total: string;
    expectedArrival: string;
    status: string;
}

// Memoized table row component for performance
const PurchaseOrderRow = React.memo(({
    order,
    isSelected,
    toggleSelect,
    handleRowClick,
    visibleColumns,
    allColumns
}: {
    order: PurchaseOrder,
    isSelected: boolean,
    toggleSelect: (id: string) => void,
    handleRowClick: (order: PurchaseOrder, e: React.MouseEvent) => void,
    visibleColumns: Record<string, boolean>,
    allColumns: { key: string; label: string; align?: string }[]
}) => (
    <tr
        key={order.id}
        className={cn(
            "h-10 hover:bg-secondary/20 group transition-colors cursor-pointer border-b border-border/50",
            isSelected && "bg-[#5b9bd5]/10"
        )}
        onClick={(e) => handleRowClick(order, e)}
    >
        <td className="px-2 py-1 border-r border-border/50 text-center">
            <Checkbox
                className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-[#3a3a38] size-4"
                checked={isSelected}
                onCheckedChange={() => toggleSelect(order.id)}
            />
        </td>
        {allColumns.map((col) => {
            if (!visibleColumns[col.key]) return null;

            if (col.key === 'poNo') {
                return (
                    <td key={col.key} className="px-3 py-1 text-xs border-r border-border/50 font-medium truncate max-w-[150px]">
                        <Link
                            href={`/buy/purchase-orders/${order.id}`}
                            className="text-[#d97757] hover:text-[#e08868] font-medium hover:underline transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {order.orderNumber}
                        </Link>
                    </td>
                );
            }

            if (col.key === 'total') {
                return (
                    <td key={col.key} className="px-3 py-1 text-right font-medium text-white text-xs border-r border-border/50 whitespace-nowrap">
                        {order.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-[#7a7974]">CAD</span>
                    </td>
                );
            }

            if (col.key === 'status') {
                return (
                    <td key={col.key} className="px-3 py-1 text-xs border-r border-border/50">
                        <StatusBadge status={order.deliveryStatus} />
                    </td>
                );
            }

            if (col.key === 'expectedArrival') {
                const isOverdue = order.expectedArrival && order.expectedArrival !== '-' &&
                    new Date(order.expectedArrival) < new Date() && order.deliveryStatus !== 'received';
                return (
                    <td key={col.key} className={cn(
                        "px-3 py-1 text-xs border-r border-border/50 truncate",
                        isOverdue ? "text-red-400" : "text-white"
                    )}>
                        {order.expectedArrival || '-'}
                    </td>
                );
            }

            const val = (order as any)[col.key] || (order as any)[col.key === 'createdDate' ? 'createdDate' : col.key];
            return (
                <td key={col.key} className="px-3 py-1 text-white text-xs border-r border-border/50 truncate max-w-[200px]">
                    {val || '-'}
                </td>
            );
        })}
    </tr>
));
PurchaseOrderRow.displayName = 'PurchaseOrderRow';

export function PurchasingTable() {
    const router = useRouter();
    const [orders, setOrders] = useState<PurchaseOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'Open' | 'Done'>('Open');
    const [selectedLocation, setSelectedLocation] = useState('All locations');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 25;

    // Filters State
    const [filters, setFilters] = useState<FilterState>({
        createdDate: '',
        poNo: '',
        supplier: '',
        total: '',
        expectedArrival: '',
        status: ''
    });

    // Column Management State
    const STORAGE_KEY = 'buy-table-view';
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
        createdDate: 120,
        poNo: 140,
        supplier: 300,
        total: 150,
        expectedArrival: 140,
        status: 160,
    });

    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        createdDate: true,
        poNo: true,
        supplier: true,
        total: true,
        expectedArrival: true,
        status: true,
    });

    const allColumns = [
        { key: 'createdDate', label: 'Created date' },
        { key: 'poNo', label: 'Order #' },
        { key: 'supplier', label: 'Supplier' },
        { key: 'total', label: 'Total order value', align: 'right' },
        { key: 'expectedArrival', label: 'Expected arrival' },
        { key: 'status', label: 'Delivery' },
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

    // Save view changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            columns: visibleColumns,
            widths: columnWidths
        }));
    }, [visibleColumns, columnWidths]);

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
        setVisibleColumns({
            createdDate: true,
            poNo: true,
            supplier: true,
            total: true,
            expectedArrival: true,
            status: true,
        });
        setContextMenu(null);
    };

    // Dark theme menu styles matching design system
    const menuStyles = "fixed z-50 bg-[#1e1e1e] border border-gray-700 rounded-md shadow-lg py-1 min-w-[200px] animate-in fade-in-0 zoom-in-95";
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
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [contextMenu]);

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Resizing State
    const resizingRef = useRef<{ column: string; startX: number; startWidth: number } | null>(null);
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

            requestAnimationFrame(() => {
                if (!resizingRef.current) return;

                const diff = e.clientX - resizingRef.current.startX;
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

    // Data fetching
    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const { orders: fetchedOrders, totalCount: count, totalPages: pages } = await fetchPurchaseOrdersPaginated(
                    currentPage,
                    pageSize,
                    { status: activeTab.toLowerCase() }
                );
                setOrders(fetchedOrders);
                setTotalCount(count);
                setTotalPages(pages);
            } catch (error) {
                console.error("Failed to load purchase orders", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [activeTab, currentPage]);

    // Reset page on tab change
    useEffect(() => {
        setCurrentPage(1);
        setSelectedItems([]);
    }, [activeTab]);

    const filteredOrders = useMemo(() => {
        let result = orders;

        // Location filtering
        if (selectedLocation !== 'All locations') {
            result = result.filter(o => o.location === selectedLocation);
        }

        const matchText = (text: string | number | null | undefined, filter: string) => {
            if (!filter) return true;
            if (text === null || text === undefined) return false;
            return text.toString().toLowerCase().includes(filter.toLowerCase().trim());
        };

        return result.filter(o =>
            matchText(o.createdDate, filters.createdDate) &&
            matchText(o.orderNumber, filters.poNo) &&
            matchText(o.supplier, filters.supplier) &&
            matchText(o.totalValue, filters.total) &&
            matchText(o.expectedArrival, filters.expectedArrival) &&
            matchText(o.deliveryStatus, filters.status)
        );
    }, [orders, selectedLocation, filters]);

    // Calculate totals
    const totalValue = useMemo(() => {
        return filteredOrders.reduce((acc, o) => acc + o.totalValue, 0);
    }, [filteredOrders]);

    // Selection handlers
    const toggleSelectAll = () => {
        if (filteredOrders.length === 0) return;
        if (selectedItems.length === filteredOrders.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredOrders.map(o => o.id));
        }
    };

    const toggleSelect = useCallback((id: string) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    }, []);

    const handleRowClick = useCallback((order: PurchaseOrder, e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('input') || target.closest('button') || target.closest('a')) {
            return;
        }
        router.push(`/buy/purchase-orders/${order.id}`);
    }, [router]);

    const handleCreateOrder = () => {
        router.push('/buy/purchase-orders/new');
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
            className="w-full h-full flex flex-col bg-background text-[13px]"
            onContextMenu={handleContextMenu}
        >
            {/* Context Menu for Column Visibility */}
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
                    <div className="h-px bg-gray-700 mx-1 mb-1"></div>

                    <div className="py-1">
                        {allColumns.map(col => (
                            <label
                                key={col.key}
                                className={menuItemStyles}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Checkbox
                                    checked={visibleColumns[col.key]}
                                    onCheckedChange={() => toggleColumn(col.key)}
                                    className="size-3.5 rounded-sm border-[#3a3a38] data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18]"
                                />
                                <span className="text-xs text-white">{col.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Header Controls */}
            <div className="flex flex-col border-b border-[#3a3a38] bg-[#1a1a18] shrink-0">
                {/* Row 1: Status Tabs + Actions */}
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-4">
                        {/* Open/Done Pill Toggle */}
                        <div className="flex rounded-md bg-secondary/40 p-0.5">
                            {['Open', 'Done'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as 'Open' | 'Done')}
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
                        {/* Start scanning link */}
                        <button
                            onClick={() => console.log('Start scanning clicked')}
                            className="flex items-center gap-1.5 text-[#d97757] hover:text-[#e08868] text-xs font-medium transition-colors"
                        >
                            <span>Start scanning</span>
                            <ScanLine size={14} />
                        </button>

                        {/* Location Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center justify-between gap-2 px-3 py-2 bg-[#2a2a28] border border-gray-600 rounded min-w-[140px] text-white hover:bg-[#323230] transition-colors text-xs">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-3.5 w-3.5" />
                                        <span>{selectedLocation}</span>
                                    </div>
                                    <ChevronDown size={14} className="text-gray-400" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-[#1e1e1e] border-gray-700">
                                <DropdownMenuLabel className="text-gray-400 text-[11px] uppercase tracking-wider">Filter by Location</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-gray-700" />
                                <DropdownMenuItem className="text-white hover:bg-[#2a2a28] text-xs" onClick={() => setSelectedLocation('All locations')}>
                                    All locations
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-[#2a2a28] text-xs" onClick={() => setSelectedLocation('Main Warehouse')}>
                                    Main Warehouse
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Purchase Order Button */}
                        <button
                            onClick={handleCreateOrder}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-[#d97757] border border-[#e08868] rounded text-white hover:bg-[#e08868] transition-colors text-xs font-medium"
                        >
                            <Plus size={14} />
                            <span>Purchase order</span>
                        </button>
                    </div>
                </div>

                {/* Row 2: Orders Count + Download/Print buttons OR Selection Actions */}
                <div className="flex items-center justify-between px-4 pb-2">
                    <div className="flex items-center gap-4">
                        <span className="text-[14px] font-bold text-[#faf9f5]">
                            {selectedItems.length > 0
                                ? `${selectedItems.length} order${selectedItems.length > 1 ? 's' : ''} selected`
                                : `${filteredOrders.length} orders`
                            }
                        </span>
                    </div>
                    {selectedItems.length > 0 ? (
                        <div className="flex items-center gap-1">
                            <button
                                className="p-1.5 border border-border rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => console.log(`Export ${selectedItems.length} orders`)}
                                title="Export"
                            >
                                <Download size={14} />
                            </button>
                            <button
                                className="p-1.5 border border-border rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => console.log(`Print ${selectedItems.length} orders`)}
                                title="Print"
                            >
                                <Printer size={14} />
                            </button>
                            <button
                                className="p-1.5 border border-border rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                onClick={() => console.log(`Delete ${selectedItems.length} orders`)}
                                title="Delete"
                            >
                                <Trash size={14} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => console.log('[Buy] Export clicked')}
                                className="p-1.5 border border-border rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                title="Export to CSV"
                            >
                                <Download size={14} />
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="p-1.5 border border-border rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                title="Print"
                            >
                                <Printer size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Table Container */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead className="sticky top-0 z-10 shadow-sm">
                        {/* Column Header Row */}
                        <tr className="h-8 bg-[#222220]">
                            <th className="p-1 w-8 bg-[#222220] text-center border-r border-border/50">
                                <Checkbox
                                    className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-[#3a3a38] size-4"
                                    checked={filteredOrders.length > 0 && selectedItems.length === filteredOrders.length}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </th>
                            {allColumns.map((col) => visibleColumns[col.key] && (
                                <th
                                    key={col.key}
                                    style={{ width: columnWidths[col.key], minWidth: 40 }}
                                    className={cn(
                                        "h-8 px-3 py-0 align-middle font-medium text-[#7a7974] uppercase tracking-wider text-[11px] border-r border-border/50 select-none bg-[#222220] relative group/header",
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
                            ))}
                        </tr>
                        {/* Filter Row */}
                        <tr className="border-b border-border/50 bg-[#1a1a18] sticky top-8 z-10">
                            <th className="p-0.5 bg-[#1a1a18] border-r border-border/50 w-8"></th>
                            {allColumns.map((col) => visibleColumns[col.key] && (
                                <th key={col.key} style={{ width: columnWidths[col.key], minWidth: 40 }} className="p-0.5 px-2 border-r border-border/50 bg-[#1a1a18]">
                                    {col.key === 'createdDate' || col.key === 'expectedArrival' ? (
                                        <div className="flex items-center gap-1">
                                            <input
                                                className="flex-1 px-2 py-0.5 border border-border rounded-sm text-[11px] font-normal bg-background focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                                                placeholder="All dates"
                                                spellCheck={false}
                                                value={filters[col.key as keyof FilterState]}
                                                onChange={(e) => handleFilterChange(col.key as keyof FilterState, e.target.value)}
                                            />
                                        </div>
                                    ) : (
                                        <input
                                            className="w-full px-2 py-0.5 border border-border rounded-sm text-[11px] font-normal bg-background focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                                            placeholder="Filter"
                                            spellCheck={false}
                                            value={filters[col.key as keyof FilterState]}
                                            onChange={(e) => handleFilterChange(col.key as keyof FilterState, e.target.value)}
                                        />
                                    )}
                                </th>
                            ))}
                        </tr>
                        {/* Total Row */}
                        <tr className="border-b border-border bg-[#1a1a18]">
                            <th className="p-1 bg-[#1a1a18] border-r border-border/50 w-8"></th>
                            {allColumns.map((col) => visibleColumns[col.key] && (
                                <th key={col.key} style={{ width: columnWidths[col.key], minWidth: 40 }} className="px-3 py-1.5 border-r border-border/50 bg-[#1a1a18]">
                                    {col.key === 'total' ? (
                                        <div className="text-right text-xs font-bold text-white">
                                            {totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-[#7a7974]">CAD</span>
                                        </div>
                                    ) : col.key === 'createdDate' ? (
                                        <span className="text-xs font-medium text-white">Total:</span>
                                    ) : null}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-background">
                        {filteredOrders.map((order) => (
                            <PurchaseOrderRow
                                key={order.id}
                                order={order}
                                isSelected={selectedItems.includes(order.id)}
                                toggleSelect={toggleSelect}
                                handleRowClick={handleRowClick}
                                visibleColumns={visibleColumns}
                                allColumns={allColumns}
                            />
                        ))}
                        {filteredOrders.length === 0 && (
                            <tr>
                                <td colSpan={allColumns.filter(c => visibleColumns[c.key]).length + 1} className="p-8 text-center text-muted-foreground italic text-xs">
                                    No purchase orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
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
