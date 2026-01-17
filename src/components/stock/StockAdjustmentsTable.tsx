'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Plus, Download, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { fetchStockAdjustments, StockAdjustment } from '@/lib/katana-data-provider';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/LoadingSpinner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TabType = 'Open' | 'Done';

interface FilterState {
    adjustmentNumber: string;
    adjustedDate: string;
    location: string;
    reason: string;
    value: string;
}

const AdjustmentTableRow = React.memo(({
    adj,
    isSelected,
    toggleSelect,
    handleRowClick,
    visibleColumns,
    allColumns
}: {
    adj: StockAdjustment,
    isSelected: boolean,
    toggleSelect: (id: string) => void,
    handleRowClick: (adj: StockAdjustment, e: React.MouseEvent) => void,
    visibleColumns: Record<string, boolean>,
    allColumns: { key: string; label: string; align?: string }[]
}) => (
    <tr
        key={adj.id}
        className={cn(
            "h-10 hover:bg-secondary/20 group transition-colors cursor-pointer border-b border-border/50",
            isSelected && "bg-[#5b9bd5]/10"
        )}
        onClick={(e) => handleRowClick(adj, e)}
    >
        <td className="px-2 py-1 border-r border-border/50 text-center">
            <Checkbox
                className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-[#3a3a38] size-4"
                checked={isSelected}
                onCheckedChange={() => toggleSelect(adj.id)}
            />
        </td>
        {allColumns.map((col) => {
            if (!visibleColumns[col.key]) return null;

            if (col.key === 'adjustmentNumber') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-border/50 overflow-hidden">
                        <Link
                            href={`/stock/adjustments/${adj.id}`}
                            className="text-[#d97757] hover:text-[#e08868] font-medium text-xs hover:underline transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {adj.adjustmentNumber}
                        </Link>
                    </td>
                );
            }

            if (col.key === 'adjustedDate') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-border/50 overflow-hidden">
                        <span className="text-white text-[11px]">
                            {adj.adjustedDate || '-'}
                        </span>
                    </td>
                );
            }

            if (col.key === 'location') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-border/50 overflow-hidden">
                        <span className="text-white text-[11px]">
                            {adj.location || '-'}
                        </span>
                    </td>
                );
            }

            if (col.key === 'reason') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-border/50 overflow-hidden">
                        <span className="text-white text-[11px] truncate block max-w-[400px]" title={adj.reason}>
                            {adj.reason || '-'}
                        </span>
                    </td>
                );
            }

            if (col.key === 'value') {
                const isNegative = adj.value < 0;
                const isPositive = adj.value > 0;
                return (
                    <td key={col.key} className="px-3 py-1 text-right border-r border-border/50 overflow-hidden">
                        <span className={cn(
                            "text-[11px] font-mono font-medium",
                            isNegative ? "text-[#ff7b6f]" : isPositive ? "text-[#8aaf6e]" : "text-white"
                        )}>
                            {adj.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-gray-500">CAD</span>
                        </span>
                    </td>
                );
            }

            const val = (adj as any)[col.key];
            return (
                <td key={col.key} className={cn(
                    "px-3 py-1 text-white text-[11px] border-r border-border/50 overflow-hidden text-ellipsis",
                    col.align === 'right' ? 'text-right' : 'text-left'
                )}>
                    {val || '-'}
                </td>
            );
        })}
    </tr>
));
AdjustmentTableRow.displayName = 'AdjustmentTableRow';

export function StockAdjustmentsTable() {
    const router = useRouter();
    const [adjustments, setAdjustments] = useState<StockAdjustment[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>('Open');
    const [locationFilter, setLocationFilter] = useState('All locations');
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

    // Column Management State
    const STORAGE_KEY = 'stock-adjustments-table-view';
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
        adjustmentNumber: 120,
        adjustedDate: 140,
        location: 160,
        reason: 400,
        value: 140,
    });

    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        adjustmentNumber: true,
        adjustedDate: true,
        location: true,
        reason: true,
        value: true,
    });

    // Column definitions
    const allColumns = [
        { key: 'adjustmentNumber', label: 'SA #' },
        { key: 'adjustedDate', label: 'Adjusted date' },
        { key: 'location', label: 'Location' },
        { key: 'reason', label: 'Reason' },
        { key: 'value', label: 'Value', align: 'right' },
    ];

    // Filters State
    const [filters, setFilters] = useState<FilterState>({
        adjustmentNumber: '',
        adjustedDate: '',
        location: '',
        reason: '',
        value: '',
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 25;

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const data = await fetchStockAdjustments();
                setAdjustments(data);
            } catch (error) {
                console.error("Failed to load stock adjustments", error);
                setAdjustments([]);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

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
        setVisibleColumns({
            adjustmentNumber: true,
            adjustedDate: true,
            location: true,
            reason: true,
            value: true,
        });
        setContextMenu(null);
    };

    // Shared Menu Styles - Dark theme matching Inventory page
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

    // Filtering Logic
    const filteredAdjustments = useMemo(() => {
        let result = [...adjustments];

        // Tab Filter
        if (activeTab === 'Open') {
            result = result.filter(adj => adj.status === 'open');
        } else if (activeTab === 'Done') {
            result = result.filter(adj => adj.status === 'done');
        }

        // Column Filters
        if (Object.values(filters).some(f => f)) {
            result = result.filter(adj => {
                const matchText = (text: string | number | null | undefined, filter: string) => {
                    if (!filter) return true;
                    if (text === null || text === undefined) return false;
                    const str = text.toString().toLowerCase();
                    return str.includes(filter.toLowerCase().trim());
                };

                return (
                    matchText(adj.adjustmentNumber, filters.adjustmentNumber) &&
                    matchText(adj.adjustedDate, filters.adjustedDate) &&
                    matchText(adj.location, filters.location) &&
                    matchText(adj.reason, filters.reason) &&
                    matchText(adj.value, filters.value)
                );
            });
        }

        // Sort by date descending (newest first)
        result.sort((a, b) => new Date(b.adjustedDate).getTime() - new Date(a.adjustedDate).getTime());

        return result;
    }, [adjustments, activeTab, filters]);

    // Paginated items
    const paginatedAdjustments = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredAdjustments.slice(startIndex, startIndex + pageSize);
    }, [filteredAdjustments, currentPage, pageSize]);

    const totalPages = Math.ceil(filteredAdjustments.length / pageSize);
    const totalCount = filteredAdjustments.length;

    // Reset page on tab change or filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, filters]);

    const toggleSelectAll = () => {
        if (paginatedAdjustments.length === 0) return;
        if (selectedItems.length === paginatedAdjustments.length) setSelectedItems([]);
        else setSelectedItems(paginatedAdjustments.map(a => a.id));
    };

    const toggleSelect = (id: string) => {
        if (selectedItems.includes(id)) setSelectedItems(selectedItems.filter(sid => sid !== id));
        else setSelectedItems([...selectedItems, id]);
    };

    const handleRowClick = (adj: StockAdjustment, e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('input') || target.closest('button') || target.closest('a')) {
            return;
        }
        router.push(`/stock/adjustments/${adj.id}`);
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

        const handleMouseMove = (e: MouseEvent) => {
            const current = resizingRef.current;
            if (!current) return;

            const { column, startX, startWidth } = current;

            requestAnimationFrame(() => {
                if (!resizingRef.current) return;

                const diff = e.clientX - startX;
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
                        {allColumns.map((col) => (
                            <label key={col.key} className={menuItemStyles} onClick={(e) => e.stopPropagation()}>
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

            {/* Header Controls - Matching Inventory page pattern */}
            <div className="flex flex-col border-b border-[#3a3a38] bg-[#1a1a18] shrink-0">
                {/* Row 1: Status Tabs + Location Dropdown + Action Button */}
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-4">
                        {/* Open/Done Pill Toggle */}
                        <div className="flex rounded-md bg-secondary/40 p-0.5">
                            {['Open', 'Done'].map((tab) => (
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
                                <button className="flex items-center justify-between gap-2 px-3 py-2 bg-[#2a2a28] border border-gray-600 rounded min-w-[140px] text-white hover:bg-[#323230] transition-colors text-xs">
                                    <span>{locationFilter}</span>
                                    <ChevronDown size={14} className="text-gray-400" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-[#1e1e1e] border-gray-700">
                                <DropdownMenuLabel className="text-gray-400 text-[11px] uppercase tracking-wider">Filter by Location</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-gray-700" />
                                <DropdownMenuItem className="text-white hover:bg-[#2a2a28] text-xs" onClick={() => setLocationFilter('All locations')}>
                                    All locations
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-[#2a2a28] text-xs" onClick={() => setLocationFilter('MMH Kelowna')}>
                                    MMH Kelowna
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Stock Adjustment Button - Primary style */}
                        <button
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-[#d97757] border border-[#e08868] rounded text-white hover:bg-[#e08868] transition-colors text-xs font-medium"
                            onClick={() => router.push('/stock/adjustments/new')}
                        >
                            <Plus size={14} />
                            <span>Stock adjustment</span>
                        </button>
                    </div>
                </div>

                {/* Row 2: Item Count + Download/Print buttons */}
                <div className="flex items-center justify-between px-4 pb-2">
                    <div className="flex items-center gap-4">
                        <span className="text-[14px] font-bold text-[#faf9f5]">
                            {totalCount} items
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Download Button */}
                        <button
                            onClick={() => console.log('[Stock Adjustments] Export clicked')}
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
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead className="sticky top-0 z-10 shadow-sm">
                        {/* Column Header Row */}
                        <tr className="h-8 bg-[#222220]">
                            <th className="p-1 w-8 bg-[#222220] text-center border-r border-border/50">
                                <Checkbox
                                    className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-[#3a3a38] size-4"
                                    checked={paginatedAdjustments.length > 0 && selectedItems.length === paginatedAdjustments.length}
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
                                    <span>{col.label}</span>
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
                                    {col.key === 'adjustedDate' ? (
                                        <div className="flex items-center gap-1">
                                            <input
                                                className="flex-1 px-2 py-0.5 border border-border rounded-sm text-[11px] font-normal bg-background focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                                                placeholder="All dates"
                                                spellCheck={false}
                                                value={filters.adjustedDate}
                                                onChange={(e) => handleFilterChange('adjustedDate', e.target.value)}
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
                    </thead>
                    <tbody className="divide-y divide-border bg-background">
                        {paginatedAdjustments.map((adj) => (
                            <AdjustmentTableRow
                                key={adj.id}
                                adj={adj}
                                isSelected={selectedItems.includes(adj.id)}
                                toggleSelect={toggleSelect}
                                handleRowClick={handleRowClick}
                                visibleColumns={visibleColumns}
                                allColumns={allColumns}
                            />
                        ))}
                        {paginatedAdjustments.length === 0 && (
                            <tr>
                                <td colSpan={allColumns.length + 1} className="px-4 py-8 text-center text-muted-foreground italic">
                                    No adjustments found.
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
