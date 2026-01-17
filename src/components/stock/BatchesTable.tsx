'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Download, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { fetchKatanaBatches, KatanaBatch } from '@/lib/katana-data-provider';
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

type TabType = 'All' | 'Products' | 'Materials';

interface FilterState {
    variantName: string;
    sku: string;
    batchNumber: string;
    barcode: string;
    quantity: string;
    expirationDate: string;
    createdAt: string;
}

// Quantity badge with neon glow styling
const QuantityBadge = ({ quantity, unit }: { quantity: number; unit?: string }) => {
    const isZero = quantity === 0;
    const isPositive = quantity > 0;

    return (
        <span className={cn(
            "px-2 py-0.5 rounded-md text-[11px] font-mono font-medium inline-flex items-center gap-1.5",
            isZero
                ? "bg-[#262624] text-[#9a9a94] border border-[#3a3a38]"
                : isPositive
                    ? "bg-[#1a2e1a] text-[#8aaf6e] border border-[#8aaf6e]/50 shadow-[0_0_6px_rgba(138,175,110,0.2)]"
                    : "bg-[#262624] text-[#9a9a94] border border-[#3a3a38]"
        )}>
            {quantity.toLocaleString()}{unit ? ` ${unit}` : ''}
        </span>
    );
};

const BatchTableRow = React.memo(({
    batch,
    isSelected,
    toggleSelect,
    handleRowClick,
    visibleColumns,
    allColumns
}: {
    batch: KatanaBatch,
    isSelected: boolean,
    toggleSelect: (id: string) => void,
    handleRowClick: (batch: KatanaBatch, e: React.MouseEvent) => void,
    visibleColumns: Record<string, boolean>,
    allColumns: { key: string; label: string; align?: string }[]
}) => (
    <tr
        key={batch.id}
        className={cn(
            "h-10 hover:bg-secondary/20 group transition-colors cursor-pointer border-b border-[#3a3a38]/50",
            isSelected && "bg-[#5b9bd5]/10"
        )}
        onClick={(e) => handleRowClick(batch, e)}
    >
        <td className="px-2 py-1 border-r border-[#3a3a38]/50 text-center">
            <Checkbox
                className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-muted-foreground size-4"
                checked={isSelected}
                onCheckedChange={() => toggleSelect(batch.id)}
            />
        </td>
        {allColumns.map((col) => {
            if (!visibleColumns[col.key]) return null;

            if (col.key === 'variantName') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-[#3a3a38]/50 overflow-hidden">
                        <Link
                            href={`/items/${batch.variantId}`}
                            className="text-[#d97757] hover:text-[#e08868] font-medium text-xs hover:underline transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {batch.variantName}
                        </Link>
                    </td>
                );
            }

            if (col.key === 'sku') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-[#3a3a38]/50 overflow-hidden">
                        <span className="text-[#7a7974] font-mono text-[11px]">
                            {batch.sku || '-'}
                        </span>
                    </td>
                );
            }

            if (col.key === 'batchNumber') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-[#3a3a38]/50 overflow-hidden">
                        <span className="text-white text-[11px]">
                            {batch.batchNumber}
                        </span>
                    </td>
                );
            }

            if (col.key === 'barcode') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-[#3a3a38]/50 overflow-hidden">
                        <span className="text-[#7a7974] font-mono text-[11px]">
                            {'-'}
                        </span>
                    </td>
                );
            }

            if (col.key === 'quantity') {
                return (
                    <td key={col.key} className="px-3 py-1 text-right border-r border-[#3a3a38]/50 overflow-hidden">
                        <QuantityBadge quantity={batch.quantity} />
                    </td>
                );
            }

            if (col.key === 'expirationDate') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-[#3a3a38]/50 overflow-hidden">
                        <span className="text-white text-[11px]">
                            {batch.expirationDate ? new Date(batch.expirationDate).toLocaleDateString('en-CA') : '-'}
                        </span>
                    </td>
                );
            }

            if (col.key === 'createdAt') {
                return (
                    <td key={col.key} className="px-3 py-1 border-r border-[#3a3a38]/50 overflow-hidden">
                        <span className="text-white text-[11px]">
                            {new Date(batch.createdAt).toLocaleDateString('en-CA')}
                        </span>
                    </td>
                );
            }

            const val = (batch as any)[col.key];
            return (
                <td key={col.key} className={cn(
                    "px-3 py-1 text-white text-[11px] border-r border-[#3a3a38]/50 overflow-hidden text-ellipsis",
                    col.align === 'right' ? 'text-right' : 'text-left'
                )}>
                    {val || '-'}
                </td>
            );
        })}
    </tr>
));
BatchTableRow.displayName = 'BatchTableRow';

export function BatchesTable() {
    const router = useRouter();
    const [batches, setBatches] = useState<KatanaBatch[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>('All');
    const [locationFilter, setLocationFilter] = useState('MMH Kelowna');
    const [showEmpty, setShowEmpty] = useState(false);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

    // Column Management State
    const STORAGE_KEY = 'batches-table-view';
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
        variantName: 280,
        sku: 120,
        batchNumber: 140,
        barcode: 120,
        quantity: 100,
        expirationDate: 130,
        createdAt: 130,
    });

    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        variantName: true,
        sku: true,
        batchNumber: true,
        barcode: true,
        quantity: true,
        expirationDate: true,
        createdAt: true,
    });

    // Column definitions - matching screenshot
    const allColumns = [
        { key: 'variantName', label: 'Name' },
        { key: 'sku', label: 'Variant code' },
        { key: 'batchNumber', label: 'Batch number' },
        { key: 'barcode', label: 'Barcode' },
        { key: 'quantity', label: 'In stock', align: 'right' },
        { key: 'expirationDate', label: 'Expiration date' },
        { key: 'createdAt', label: 'Created date' },
    ];

    // Filters State
    const [filters, setFilters] = useState<FilterState>({
        variantName: '',
        sku: '',
        batchNumber: '',
        barcode: '',
        quantity: '',
        expirationDate: '',
        createdAt: '',
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 25;

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const data = await fetchKatanaBatches();
                setBatches(data);
            } catch (error) {
                console.error("Failed to load batches", error);
                setBatches([]);
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
            variantName: true,
            sku: true,
            batchNumber: true,
            barcode: true,
            quantity: true,
            expirationDate: true,
            createdAt: true,
        });
        setContextMenu(null);
    };

    // Shared Menu Styles - Dark theme matching Inventory page
    const menuStyles = "fixed z-50 bg-[#1e1e1e] border border-[#3a3a38] rounded-md shadow-lg py-1 min-w-[200px] animate-in fade-in-0 zoom-in-95";
    const menuItemStyles = "flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-[#2a2a28] transition-colors text-xs text-white rounded mx-1";

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const contextMenuEl = document.getElementById('column-context-menu-batches');
            if (contextMenu && contextMenuEl && !contextMenuEl.contains(e.target as Node)) {
                setContextMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [contextMenu]);

    // Filtering Logic
    const filteredBatches = useMemo(() => {
        let result = [...batches];

        // Tab Filter
        if (activeTab === 'Products') {
            result = result.filter(b => b.itemType === 'product');
        } else if (activeTab === 'Materials') {
            result = result.filter(b => b.itemType === 'material');
        }

        // Show empty filter
        if (!showEmpty) {
            result = result.filter(b => b.quantity > 0);
        }

        // Column Filters
        if (Object.values(filters).some(f => f)) {
            result = result.filter(batch => {
                const matchText = (text: string | number | null | undefined, filter: string) => {
                    if (!filter) return true;
                    if (text === null || text === undefined) return false;
                    const str = text.toString().toLowerCase();
                    return str.includes(filter.toLowerCase().trim());
                };

                return (
                    matchText(batch.variantName, filters.variantName) &&
                    matchText(batch.sku, filters.sku) &&
                    matchText(batch.batchNumber, filters.batchNumber) &&
                    matchText(batch.quantity, filters.quantity) &&
                    matchText(batch.expirationDate, filters.expirationDate) &&
                    matchText(batch.createdAt, filters.createdAt)
                );
            });
        }

        // Sort by created date descending (newest first)
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return result;
    }, [batches, activeTab, showEmpty, filters]);

    // Paginated items
    const paginatedBatches = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredBatches.slice(startIndex, startIndex + pageSize);
    }, [filteredBatches, currentPage, pageSize]);

    const totalPages = Math.ceil(filteredBatches.length / pageSize);
    const totalCount = filteredBatches.length;

    // Reset page on tab change or filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, filters, showEmpty]);

    const toggleSelectAll = () => {
        if (paginatedBatches.length === 0) return;
        if (selectedItems.length === paginatedBatches.length) setSelectedItems([]);
        else setSelectedItems(paginatedBatches.map(b => b.id));
    };

    const toggleSelect = (id: string) => {
        if (selectedItems.includes(id)) setSelectedItems(selectedItems.filter(sid => sid !== id));
        else setSelectedItems([...selectedItems, id]);
    };

    const handleRowClick = (batch: KatanaBatch, e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('input') || target.closest('button') || target.closest('a')) {
            return;
        }
        router.push(`/items/${batch.variantId}`);
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
                    id="column-context-menu-batches"
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

            {/* Header Controls - Matching reference screenshot */}
            <div className="flex flex-col border-b border-[#3a3a38] bg-[#1a1a18] shrink-0">
                {/* Row 1: Type Tabs + Show Empty Checkbox + Location Dropdown */}
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
                        {/* Show empty batches toggle */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <span className="text-xs text-muted-foreground">Show empty batches</span>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={showEmpty}
                                onClick={() => setShowEmpty(!showEmpty)}
                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${showEmpty ? 'bg-[#a5d6ff]' : 'bg-gray-600'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showEmpty ? 'translate-x-4' : 'translate-x-0.5'
                                        }`}
                                />
                            </button>
                        </label>

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
                                <DropdownMenuItem className="text-white hover:bg-[#2a2a28] text-xs" onClick={() => setLocationFilter('MMH Kelowna')}>
                                    MMH Kelowna
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-[#2a2a28] text-xs" onClick={() => setLocationFilter('Storage Warehouse')}>
                                    Storage Warehouse
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Row 2: Batch Count + Download/Print buttons */}
                <div className="flex items-center justify-between px-4 pb-2">
                    <div className="flex items-center gap-4">
                        <span className="text-[14px] font-bold text-[#faf9f5]">
                            {totalCount} batches
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Download Button */}
                        <button
                            onClick={() => console.log('[Batches] Export clicked')}
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
                            <th className="p-1 w-8 bg-[#222220] text-center border-r border-[#3a3a38]/50">
                                <Checkbox
                                    className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-muted-foreground size-4"
                                    checked={paginatedBatches.length > 0 && selectedItems.length === paginatedBatches.length}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </th>
                            {allColumns.map((col) => visibleColumns[col.key] && (
                                <th
                                    key={col.key}
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
                        </tr>
                        {/* Filter Row */}
                        <tr className="border-b border-[#3a3a38]/50 bg-[#1a1a18] sticky top-8 z-10">
                            <th className="p-0.5 bg-[#1a1a18] border-r border-[#3a3a38]/50 w-8"></th>
                            {allColumns.map((col) => visibleColumns[col.key] && (
                                <th key={col.key} style={{ width: columnWidths[col.key], minWidth: 40 }} className="p-0.5 px-2 border-r border-[#3a3a38]/50 bg-[#1a1a18]">
                                    {col.key === 'expirationDate' || col.key === 'createdAt' ? (
                                        <input
                                            className="w-full px-2 py-0.5 border border-[#3a3a38] rounded-sm text-[11px] font-normal bg-background focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                                            placeholder="All dates"
                                            spellCheck={false}
                                            value={filters[col.key as keyof FilterState]}
                                            onChange={(e) => handleFilterChange(col.key as keyof FilterState, e.target.value)}
                                        />
                                    ) : (
                                        <input
                                            className="w-full px-2 py-0.5 border border-[#3a3a38] rounded-sm text-[11px] font-normal bg-background focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
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
                    <tbody className="divide-y divide-[#3a3a38] bg-background">
                        {paginatedBatches.map((batch) => (
                            <BatchTableRow
                                key={batch.id}
                                batch={batch}
                                isSelected={selectedItems.includes(batch.id)}
                                toggleSelect={toggleSelect}
                                handleRowClick={handleRowClick}
                                visibleColumns={visibleColumns}
                                allColumns={allColumns}
                            />
                        ))}
                        {paginatedBatches.length === 0 && (
                            <tr>
                                <td colSpan={allColumns.length + 1} className="px-4 py-8 text-center text-muted-foreground italic">
                                    {showEmpty ? "No batches found." : "No batches with quantity > 0 found. Try enabling 'Show empty batches'."}
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
