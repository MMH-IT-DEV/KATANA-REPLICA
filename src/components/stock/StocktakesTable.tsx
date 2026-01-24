'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Plus, Download, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { fetchStocktakes, Stocktake } from '@/lib/katana-data-provider';
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

type TabType = 'Open' | 'Completed';

interface FilterState {
    stocktakeNumber: string;
    reason: string;
    createdDate: string;
    completedDate: string;
    stockAdjustmentNumber: string;
    status: string;
}

// Status badge with neon glow styling - matching TasksTable pattern
const StatusBadgeNeon = ({ status }: { status: string }) => {
    const normalizedStatus = status?.toLowerCase() || '';

    if (normalizedStatus === 'completed' || normalizedStatus === 'done') {
        return (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-medium border inline-flex items-center gap-2 bg-[#1a2e1a] text-[#8aaf6e] border-[#8aaf6e]/50 shadow-[0_0_8px_rgba(138,175,110,0.3)]">
                <span className="w-2 h-2 rounded-full bg-[#8aaf6e] shadow-[0_0_6px_rgba(138,175,110,0.8)]" />
                Completed
            </span>
        );
    }

    if (normalizedStatus === 'in progress' || normalizedStatus === 'in_progress') {
        return (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-medium border inline-flex items-center gap-2 bg-[#2e2a1a] text-[#bb8b5d] border-[#bb8b5d]/50 shadow-[0_0_8px_rgba(187,139,93,0.3)]">
                <span className="w-2 h-2 rounded-full bg-[#bb8b5d] shadow-[0_0_6px_rgba(187,139,93,0.8)]" />
                In progress
            </span>
        );
    }

    // Not started / default
    return (
        <span className="px-2.5 py-1 rounded-md text-[11px] font-medium border inline-flex items-center gap-2 bg-[#262624] text-[#9a9a94] border-[#4a4a48] shadow-[0_0_6px_rgba(154,154,148,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#7a7974] shadow-[0_0_4px_rgba(122,121,116,0.5)]" />
            Not started
        </span>
    );
};

const StocktakeTableRow = React.memo(({
    st,
    isSelected,
    toggleSelect,
    handleRowClick,
    visibleColumns,
    allColumns
}: {
    st: Stocktake,
    isSelected: boolean,
    toggleSelect: (id: string) => void,
    handleRowClick: (st: Stocktake, e: React.MouseEvent) => void,
    visibleColumns: Record<string, boolean>,
    allColumns: { key: string; label: string; align?: string }[]
}) => (
    <tr
        key={st.id}
        className={cn(
            "h-10 hover:bg-secondary/20 group transition-colors cursor-pointer border-b border-border/50",
            isSelected && "bg-[#5b9bd5]/10"
        )}
        onClick={(e) => handleRowClick(st, e)}
    >
        <td className="px-2 py-1 border-r border-border/50 text-center">
            <Checkbox
                className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-[#3a3a38] size-4"
                checked={isSelected}
                onCheckedChange={() => toggleSelect(st.id)}
            />
        </td>
        {allColumns.map((col) => {
            if (!visibleColumns[col.key]) return null;

            if (col.key === 'stocktakeNumber') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-border/50 overflow-hidden">
                        <Link
                            href={`/stock/stocktakes/${st.id}`}
                            className="text-[#d97757] hover:text-[#e08868] font-medium text-xs hover:underline transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {st.stocktakeNumber}
                        </Link>
                    </td>
                );
            }

            if (col.key === 'reason') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-border/50 overflow-hidden">
                        <span className="text-white text-[11px] truncate block max-w-[400px]" title={st.reason}>
                            {st.reason || '-'}
                        </span>
                    </td>
                );
            }

            if (col.key === 'createdDate') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-border/50 overflow-hidden">
                        <span className="text-white text-[11px]">
                            {st.createdDate || '-'}
                        </span>
                    </td>
                );
            }

            if (col.key === 'completedDate') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-border/50 overflow-hidden">
                        <span className="text-white text-[11px]">
                            {st.completedDate || '-'}
                        </span>
                    </td>
                );
            }

            if (col.key === 'stockAdjustmentNumber') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-border/50 overflow-hidden">
                        {st.stockAdjustmentNumber ? (
                            <Link
                                href={`/stock/adjustments/${st.stockAdjustmentId}`}
                                className="text-[#d97757] hover:text-[#e08868] text-xs hover:underline transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {st.stockAdjustmentNumber}
                            </Link>
                        ) : (
                            <span className="text-[#7a7974] text-[11px]">-</span>
                        )}
                    </td>
                );
            }

            if (col.key === 'status') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-border/50 overflow-hidden">
                        <StatusBadgeNeon status={st.status} />
                    </td>
                );
            }

            const val = (st as any)[col.key];
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
StocktakeTableRow.displayName = 'StocktakeTableRow';

export function StocktakesTable() {
    const router = useRouter();
    const [stocktakes, setStocktakes] = useState<Stocktake[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>('Open');
    const [locationFilter, setLocationFilter] = useState('All locations');
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

    // Column Management State
    const STORAGE_KEY = 'stocktakes-table-view';
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
        stocktakeNumber: 120,
        reason: 350,
        createdDate: 140,
        completedDate: 140,
        stockAdjustmentNumber: 150,
        status: 130,
    });

    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        stocktakeNumber: true,
        reason: true,
        createdDate: true,
        completedDate: true,
        stockAdjustmentNumber: true,
        status: true,
    });

    // Column definitions
    const allColumns = [
        { key: 'stocktakeNumber', label: 'Stocktake #', align: 'left' },
        { key: 'reason', label: 'Stocktake reason', align: 'left' },
        { key: 'createdDate', label: 'Created date', align: 'left' },
        { key: 'completedDate', label: 'Completed date', align: 'left' },
        { key: 'stockAdjustmentNumber', label: 'Stock adjustment #', align: 'left' },
        { key: 'status', label: 'Status', align: 'left' },
    ];

    // Filters State
    const [filters, setFilters] = useState<FilterState>({
        stocktakeNumber: '',
        reason: '',
        createdDate: '',
        completedDate: '',
        stockAdjustmentNumber: '',
        status: '',
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 25;

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const data = await fetchStocktakes();
                setStocktakes(data);
            } catch (error) {
                console.error("Failed to load stocktakes", error);
                setStocktakes([]);
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
            stocktakeNumber: true,
            reason: true,
            createdDate: true,
            completedDate: true,
            stockAdjustmentNumber: true,
            status: true,
        });
        setContextMenu(null);
    };

    // Shared Menu Styles - Dark theme matching Inventory page
    const menuStyles = "fixed z-50 bg-[#1e1e1e] border border-gray-700 rounded-md shadow-lg py-1 min-w-[200px] animate-in fade-in-0 zoom-in-95";
    const menuItemStyles = "flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-[#2a2a28] transition-colors text-xs text-white rounded mx-1";

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const contextMenuEl = document.getElementById('column-context-menu-stocktakes');
            if (contextMenu && contextMenuEl && !contextMenuEl.contains(e.target as Node)) {
                setContextMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [contextMenu]);

    // Filtering Logic
    const filteredStocktakes = useMemo(() => {
        let result = [...stocktakes];

        // Tab Filter
        if (activeTab === 'Open') {
            result = result.filter(st => {
                const status = st.status?.toLowerCase() || '';
                return status !== 'completed' && status !== 'done';
            });
        } else if (activeTab === 'Completed') {
            result = result.filter(st => {
                const status = st.status?.toLowerCase() || '';
                return status === 'completed' || status === 'done';
            });
        }

        // Location Filter
        if (locationFilter !== 'All locations') {
            result = result.filter(st => st.location === locationFilter);
        }

        // Column Filters
        if (Object.values(filters).some(f => f)) {
            result = result.filter(st => {
                const matchText = (text: string | number | null | undefined, filter: string) => {
                    if (!filter) return true;
                    if (text === null || text === undefined) return false;
                    const str = text.toString().toLowerCase();
                    return str.includes(filter.toLowerCase().trim());
                };

                return (
                    matchText(st.stocktakeNumber, filters.stocktakeNumber) &&
                    matchText(st.reason, filters.reason) &&
                    matchText(st.createdDate, filters.createdDate) &&
                    matchText(st.completedDate, filters.completedDate) &&
                    matchText(st.stockAdjustmentNumber, filters.stockAdjustmentNumber) &&
                    matchText(st.status, filters.status)
                );
            });
        }

        // Sort by date descending (newest first)
        result.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

        return result;
    }, [stocktakes, activeTab, locationFilter, filters]);

    // Paginated items
    const paginatedStocktakes = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredStocktakes.slice(startIndex, startIndex + pageSize);
    }, [filteredStocktakes, currentPage, pageSize]);

    const totalPages = Math.ceil(filteredStocktakes.length / pageSize);
    const totalCount = filteredStocktakes.length;

    // Reset page on tab change or filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, filters, locationFilter]);

    const toggleSelectAll = () => {
        if (paginatedStocktakes.length === 0) return;
        if (selectedItems.length === paginatedStocktakes.length) setSelectedItems([]);
        else setSelectedItems(paginatedStocktakes.map(st => st.id));
    };

    const toggleSelect = (id: string) => {
        if (selectedItems.includes(id)) setSelectedItems(selectedItems.filter(sid => sid !== id));
        else setSelectedItems([...selectedItems, id]);
    };

    const handleRowClick = (st: Stocktake, e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('input') || target.closest('button') || target.closest('a')) {
            return;
        }
        router.push(`/stock/stocktakes/${st.id}`);
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
                    id="column-context-menu-stocktakes"
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
                        {/* Open/Completed Pill Toggle */}
                        <div className="flex rounded-md bg-secondary/40 p-0.5">
                            {['Open', 'Completed'].map((tab) => (
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
                                <DropdownMenuItem className="text-white hover:bg-[#2a2a28] text-xs" onClick={() => setLocationFilter('Storage Warehouse')}>
                                    Storage Warehouse
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Stocktake Button - Primary style */}
                        <button
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-[#d97757] border border-[#e08868] rounded text-white hover:bg-[#e08868] transition-colors text-xs font-medium"
                            onClick={() => router.push('/stock/stocktakes/new')}
                        >
                            <Plus size={14} />
                            <span>Stocktake</span>
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
                            onClick={() => console.log('[Stocktakes] Export clicked')}
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
                                    checked={paginatedStocktakes.length > 0 && selectedItems.length === paginatedStocktakes.length}
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
                                    <input
                                        className="w-full px-2 py-0.5 border border-border rounded-sm text-[11px] font-normal bg-background focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                                        placeholder="Filter"
                                        spellCheck={false}
                                        value={filters[col.key as keyof FilterState]}
                                        onChange={(e) => handleFilterChange(col.key as keyof FilterState, e.target.value)}
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-background">
                        {paginatedStocktakes.map((st) => (
                            <StocktakeTableRow
                                key={st.id}
                                st={st}
                                isSelected={selectedItems.includes(st.id)}
                                toggleSelect={toggleSelect}
                                handleRowClick={handleRowClick}
                                visibleColumns={visibleColumns}
                                allColumns={allColumns}
                            />
                        ))}
                        {paginatedStocktakes.length === 0 && (
                            <tr>
                                <td colSpan={allColumns.length + 1} className="px-4 py-8 text-center text-muted-foreground italic">
                                    No stocktakes found.
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
