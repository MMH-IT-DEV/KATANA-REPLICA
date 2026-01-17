'use client';

import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Download, Printer, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchSuppliersPaginated, createSupplier, deleteSupplier, Supplier } from '@/lib/katana-data-provider';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/LoadingSpinner';
import { Checkbox } from "@/components/ui/checkbox";

interface FilterState {
    name: string;
    email: string;
    currency: string;
    phone: string;
    comment: string;
}

// Memoized table row component for performance
const SupplierRow = React.memo(({
    supplier,
    isSelected,
    toggleSelect,
    visibleColumns,
    allColumns
}: {
    supplier: Supplier,
    isSelected: boolean,
    toggleSelect: (id: string) => void,
    visibleColumns: Record<string, boolean>,
    allColumns: { key: string; label: string; align?: string }[]
}) => (
    <tr
        key={supplier.id}
        className={cn(
            "h-10 hover:bg-secondary/20 group transition-colors border-b border-border/50",
            isSelected && "bg-[#5b9bd5]/10"
        )}
    >
        <td className="px-2 py-1 border-r border-border/50 text-center">
            <Checkbox
                className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-[#3a3a38] size-4"
                checked={isSelected}
                onCheckedChange={() => toggleSelect(supplier.id)}
            />
        </td>
        {allColumns.map((col) => {
            if (!visibleColumns[col.key]) return null;

            if (col.key === 'name') {
                return (
                    <td key={col.key} className="px-3 py-1 text-xs border-r border-border/50 font-medium truncate max-w-[250px]">
                        <Link
                            href={`/buy/suppliers/${supplier.id}`}
                            className="text-[#d97757] hover:text-[#e08868] font-medium hover:underline transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {supplier.name}
                        </Link>
                    </td>
                );
            }

            if (col.key === 'email') {
                return (
                    <td key={col.key} className="px-3 py-1 text-white text-xs border-r border-border/50 truncate max-w-[250px]">
                        {supplier.email ? (
                            <a href={`mailto:${supplier.email}`} className="text-[#d97757] hover:text-[#e08868] transition-colors">
                                {supplier.email}
                            </a>
                        ) : '-'}
                    </td>
                );
            }

            if (col.key === 'currency') {
                return (
                    <td key={col.key} className="px-3 py-1 text-white text-xs border-r border-border/50">
                        {supplier.currency || 'CAD'}
                    </td>
                );
            }

            if (col.key === 'phone') {
                return (
                    <td key={col.key} className="px-3 py-1 text-white text-xs border-r border-border/50 truncate max-w-[150px]">
                        {supplier.phone || '-'}
                    </td>
                );
            }

            if (col.key === 'comment') {
                return (
                    <td key={col.key} className="px-3 py-1 text-white text-xs border-r border-border/50 truncate max-w-[400px]" title={supplier.comment || ''}>
                        {supplier.comment || '-'}
                    </td>
                );
            }

            const val = (supplier as any)[col.key];
            return (
                <td key={col.key} className="px-3 py-1 text-white text-xs border-r border-border/50 truncate max-w-[200px]">
                    {val || '-'}
                </td>
            );
        })}
    </tr>
));
SupplierRow.displayName = 'SupplierRow';

export function SuppliersTable() {
    const router = useRouter();
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 25;

    // Filters State
    const [filters, setFilters] = useState<FilterState>({
        name: '',
        email: '',
        currency: '',
        phone: '',
        comment: ''
    });

    // Column Management State
    const STORAGE_KEY = 'suppliers-table-view';
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
        name: 250,
        email: 280,
        currency: 100,
        phone: 160,
        comment: 400,
    });

    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        name: true,
        email: true,
        currency: true,
        phone: true,
        comment: true,
    });

    const allColumns: { key: string; label: string; align?: string }[] = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'E-mail address' },
        { key: 'currency', label: 'Currency' },
        { key: 'phone', label: 'Phone number' },
        { key: 'comment', label: 'Comment' },
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
            name: true,
            email: true,
            currency: true,
            phone: true,
            comment: true,
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
        setCurrentPage(1); // Reset to first page on filter change
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
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const activeFilters: any = {};
            if (filters.name) activeFilters.name = filters.name;
            if (filters.email) activeFilters.email = filters.email;
            if (filters.currency) activeFilters.currency = filters.currency;
            if (filters.phone) activeFilters.phone = filters.phone;
            if (filters.comment) activeFilters.comment = filters.comment;

            const { suppliers: fetchedSuppliers, totalCount: count, totalPages: pages } = await fetchSuppliersPaginated(
                currentPage,
                pageSize,
                Object.keys(activeFilters).length > 0 ? activeFilters : undefined
            );
            setSuppliers(fetchedSuppliers);
            setTotalCount(count);
            setTotalPages(pages);
        } catch (error) {
            console.error("Failed to load suppliers", error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, filters]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Selection handlers
    const toggleSelectAll = () => {
        if (suppliers.length === 0) return;
        if (selectedItems.length === suppliers.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(suppliers.map(s => s.id));
        }
    };

    const toggleSelect = useCallback((id: string) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    }, []);

    const handleCreateSupplier = async () => {
        const { data, error } = await createSupplier({
            name: 'New Supplier',
            email: null,
            phone: null,
            currency: 'CAD',
            address: null,
            comment: null
        });

        if (!error && data) {
            // Navigate to the new supplier's detail page
            router.push(`/buy/suppliers/${data.id}`);
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedItems.length === 0) return;

        // Delete all selected suppliers
        for (const id of selectedItems) {
            await deleteSupplier(id);
        }

        setSelectedItems([]);
        loadData();
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
                {/* Row 1: Title + Actions */}
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-4">
                        <span className="text-[14px] font-bold text-[#faf9f5]">
                            {selectedItems.length > 0
                                ? `${selectedItems.length} supplier${selectedItems.length > 1 ? 's' : ''} selected`
                                : `${totalCount} suppliers`
                            }
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        {selectedItems.length > 0 ? (
                            <div className="flex items-center gap-1">
                                <button
                                    className="p-1.5 border border-border rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                    onClick={() => console.log(`Export ${selectedItems.length} suppliers`)}
                                    title="Export"
                                >
                                    <Download size={14} />
                                </button>
                                <button
                                    className="p-1.5 border border-border rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                    onClick={() => console.log(`Print ${selectedItems.length} suppliers`)}
                                    title="Print"
                                >
                                    <Printer size={14} />
                                </button>
                                <button
                                    className="p-1.5 border border-border rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                    onClick={handleDeleteSelected}
                                    title="Delete"
                                >
                                    <Trash size={14} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => console.log('[Suppliers] Export clicked')}
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

                        {/* Add Supplier Button */}
                        <button
                            onClick={handleCreateSupplier}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-[#d97757] border border-[#e08868] rounded text-white hover:bg-[#e08868] transition-colors text-xs font-medium"
                        >
                            <Plus size={14} />
                            <span>Supplier</span>
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
                                    checked={suppliers.length > 0 && selectedItems.length === suppliers.length}
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
                        {suppliers.map((supplier) => (
                            <SupplierRow
                                key={supplier.id}
                                supplier={supplier}
                                isSelected={selectedItems.includes(supplier.id)}
                                toggleSelect={toggleSelect}
                                visibleColumns={visibleColumns}
                                allColumns={allColumns}
                            />
                        ))}
                        {suppliers.length === 0 && (
                            <tr>
                                <td colSpan={allColumns.filter(c => visibleColumns[c.key]).length + 1} className="p-8 text-center text-muted-foreground italic text-xs">
                                    No suppliers found.
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
