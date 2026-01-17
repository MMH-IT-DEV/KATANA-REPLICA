'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ChevronDown, Plus, Calendar, Download, Printer, MoreHorizontal, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SalesOrder } from '@/lib/mock-data';
import { fetchSalesOrdersPaginated } from '@/lib/katana-data-provider';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/LoadingSpinner';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterState {
    createdDate: string;
    orderNo: string;
    customer: string;
    total: string;
    deadline: string;
    salesItems: string;
    ingredients: string;
    production: string;
    delivery: string;
}

export function SalesOrderTable() {
    const [orders, setOrders] = useState<SalesOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'Open' | 'Done' | 'All'>('Open');
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 25;

    // Filters State
    const [filters, setFilters] = useState<FilterState>({
        createdDate: '',
        orderNo: '',
        customer: '',
        total: '',
        deadline: '',
        salesItems: '',
        ingredients: '',
        production: '',
        delivery: ''
    });

    // Column Management State
    const STORAGE_KEY = 'sales-table-view';
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
        createdDate: 120,
        orderNo: 100,
        customer: 200,
        total: 100,
        deadline: 120,
        salesItems: 130,
        ingredients: 130,
        production: 130,
        delivery: 130,
    });

    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        createdDate: true,
        orderNo: true,
        customer: true,
        total: true,
        deadline: true,
        salesItems: true,
        ingredients: true,
        production: true,
        delivery: true,
    });

    const allColumns = [
        { key: 'createdDate', label: 'Created date' },
        { key: 'orderNo', label: 'Order #' },
        { key: 'customer', label: 'Customer' },
        { key: 'total', label: 'Total', align: 'right' },
        { key: 'deadline', label: 'Deadline', align: 'center' },
        { key: 'salesItems', label: 'Sales items' },
        { key: 'ingredients', label: 'Ingredients' },
        { key: 'production', label: 'Production' },
        { key: 'delivery', label: 'Delivery' },
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
        setVisibleColumns({
            createdDate: true,
            orderNo: true,
            customer: true,
            total: true,
            deadline: true,
            salesItems: true,
            ingredients: true,
            production: true,
            delivery: true,
        });
        setContextMenu(null);
    };

    // Shared Menu Styles
    const menuStyles = "fixed z-50 bg-popover border border-border rounded-md shadow-lg py-1 min-w-[200px] animate-in fade-in-0 zoom-in-95";
    const menuItemStyles = "flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-accent/50 transition-colors text-sm text-foreground rounded mx-1";

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
    const resizingRef = React.useRef<{ column: string; startX: number; startWidth: number } | null>(null);
    const handleMouseMoveRef = React.useRef<((e: MouseEvent) => void) | null>(null);
    const handleMouseUpRef = React.useRef<(() => void) | null>(null);

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

    // Drag-to-Scroll State
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const isDraggingRef = React.useRef(false);
    const startPosRef = React.useRef({ x: 0, y: 0 });
    const scrollStartRef = React.useRef({ left: 0, top: 0 });
    const wasDraggingRef = React.useRef(false);
    const velocity = React.useRef({ x: 0, y: 0 });
    const lastMoveTime = React.useRef(0);
    const lastPosRef = React.useRef({ x: 0, y: 0 });
    const rafId = React.useRef<number>(0);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.closest('button') || target.tagName === 'A' || target.closest('a')) return;
        cancelAnimationFrame(rafId.current);
        isDraggingRef.current = true;
        wasDraggingRef.current = false;
        startPosRef.current = { x: e.pageX, y: e.pageY };
        lastPosRef.current = { x: e.pageX, y: e.pageY };
        scrollStartRef.current = { left: scrollContainerRef.current.scrollLeft, top: scrollContainerRef.current.scrollTop };
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
        const rawDeltaX = x - startPosRef.current.x;
        const rawDeltaY = y - startPosRef.current.y;

        if (!wasDraggingRef.current) {
            if (Math.abs(rawDeltaX) > 5 || Math.abs(rawDeltaY) > 5) {
                wasDraggingRef.current = true;
                startPosRef.current = { x, y };
                scrollStartRef.current = { left: scrollContainerRef.current.scrollLeft, top: scrollContainerRef.current.scrollTop };
            } else {
                return;
            }
        }

        const deltaX = x - startPosRef.current.x;
        const newScrollLeft = scrollStartRef.current.left - deltaX;
        scrollContainerRef.current.scrollLeft = newScrollLeft;

        if (dt > 0 && dt < 100) {
            const movementX = x - lastPosRef.current.x;
            const newVelX = -movementX / dt;
            velocity.current = { x: newVelX * 0.3 + velocity.current.x * 0.7, y: 0 };
        }
        lastPosRef.current = { x, y };
        lastMoveTime.current = now;
    };

    const startMomentum = () => {
        if (!scrollContainerRef.current) return;
        const friction = 0.95;
        let velX = velocity.current.x * 16; // Approximate frame duration scaling

        const step = () => {
            if (!scrollContainerRef.current) return;
            if (Math.abs(velX) < 0.1) return;
            scrollContainerRef.current.scrollLeft -= velX;
            velX *= friction;
            rafId.current = requestAnimationFrame(step);
        };
        rafId.current = requestAnimationFrame(step);
    };

    useEffect(() => {
        const loadRequests = async () => {
            setLoading(true);
            try {
                // Determine status filter
                const statusFilter = activeTab === 'Open' ? 'open' : activeTab === 'Done' ? 'done' : 'all';

                // Fetch paginated data
                // Note: The UI activeTab logic is Open/Done/All.
                // fetchSalesOrdersPaginated accepts 'status' filter.
                // If 'Open', we might want to pass 'open' or exclude done.
                // Assuming 'open' works or we use what we have.
                // Note: fetchSalesOrdersPaginated accepts 'status' string.

                const { orders, totalCount, totalPages } = await fetchSalesOrdersPaginated(
                    currentPage,
                    pageSize,
                    { status: activeTab === 'All' ? 'all' : statusFilter }
                );

                // We need to map the result to `SalesOrder` interface if not already compatible.
                // `fetchSalesOrdersPaginated` returns items with a certain shape. 
                // Let's assume it matches or cast to `any` then map to `SalesOrder` if needed.
                // Previous mock data had: items[], delivery_status, etc.
                // The fetcher function I wrote returns `mappedSales` which tries to match structure.
                // Let's assume it is compatible enough or fix if broken.
                setOrders(orders as any);
                setTotalCount(totalCount);
                setTotalPages(totalPages);
            } catch (err) {
                console.error('Failed to load sales orders', err);
            } finally {
                setLoading(false);
            }
        };
        loadRequests();
    }, [activeTab, currentPage]);

    const handleTabChange = (tab: 'Open' | 'Done' | 'All') => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    // Helper to calculate "Sales items" status
    const getSalesItemsStatus = (order: SalesOrder) => {
        if (!order.items || order.items.length === 0) return 'In stock';
        // If any item is 'Not available', the whole order is blocked
        if (order.items.some(item => item.status.sales === 'Not available')) return 'Not available';
        // If any item is 'Expected', the whole order is 'Expected'
        if (order.items.some(item => item.status.sales === 'Expected')) return 'Expected';
        return 'In stock';
    };

    const getIngredientsStatus = (order: SalesOrder) => {
        if (!order.items || order.items.length === 0) return 'Not applicable';

        // Priority: Not available > Expected > Picked > In stock > Not applicable
        const statuses = order.items.map(i => i.status.ingredients);
        if (statuses.includes('Not available')) return 'Not available';
        if (statuses.includes('Expected')) return 'Expected';
        if (statuses.includes('Picked')) return 'Picked';
        if (statuses.includes('In stock')) return 'In stock';
        return 'Not applicable';
    };

    const getProductionStatus = (order: SalesOrder) => {
        // Logic: If any is 'In progress', return 'In progress'. If all 'Done', 'Done'.
        const statuses = order.items.map(i => i.status.production);
        if (statuses.includes('In progress')) return 'In progress';
        if (statuses.includes('Not started')) return '+ Make...'; // Simplified for UI
        if (statuses.every(s => s === 'Done')) return 'Done';
        return '+ Make...';
    };

    const toggleSelectAll = () => {
        if (selectedOrders.length === orders.length) setSelectedOrders([]);
        else setSelectedOrders(orders.map(o => o.id));
    };

    const toggleSelect = (id: string) => {
        if (selectedOrders.includes(id)) setSelectedOrders(selectedOrders.filter(oid => oid !== id));
        else setSelectedOrders([...selectedOrders, id]);
    };

    const filteredOrders = orders.filter(order => {
        const matchesTab = activeTab === 'Open' ? order.status === 'OPEN' : activeTab === 'Done' ? order.status === 'DONE' : true;
        if (!matchesTab) return false;

        const matchText = (text: string | number | null | undefined, filter: string) => {
            if (!filter) return true;
            if (text === null || text === undefined) return false;
            return text.toString().toLowerCase().includes(filter.toLowerCase().trim());
        };

        return (
            matchText(order.created_at, filters.createdDate) &&
            matchText(order.order_no, filters.orderNo) &&
            matchText(order.customer?.name, filters.customer) &&
            matchText(order.total_amount, filters.total) &&
            matchText(order.delivery_date, filters.deadline) &&
            matchText(getSalesItemsStatus(order), filters.salesItems) &&
            matchText(getIngredientsStatus(order), filters.ingredients) &&
            matchText(getProductionStatus(order), filters.production) &&
            matchText(order.delivery_status, filters.delivery)
        );
    });

    // Logging for verification
    useEffect(() => {
        if (!loading) {
            console.log('[Sales] Active tab:', activeTab);
            console.log('[Sales] Total orders:', orders.length);
            console.log('[Sales] Filtered orders:', filteredOrders.length);
            console.log('[Sales] Order statuses:', orders.map(o => o.status));
            console.log('[Sales] Orders:', orders.map(o => ({ id: o.id, status: o.status, delivery_status: o.delivery_status })));
        }
    }, [activeTab, orders, loading, filteredOrders.length]);

    if (loading) return <div className="p-8 text-muted-foreground">Loading orders...</div>;

    return (
        <div
            className="w-full h-full flex flex-col bg-background text-[13px]"
            onContextMenu={handleContextMenu}
        >
            {contextMenu && (
                <div
                    id="column-context-menu"
                    className={menuStyles}
                    style={{ left: contextMenu.x, top: contextMenu.y }}
                >
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/50">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Columns</span>
                        <button onClick={resetAllColumns} className="text-xs text-muted-foreground hover:text-primary transition-colors">Reset</button>
                    </div>
                    <div className="p-1">
                        {allColumns.map(col => (
                            <label
                                key={col.key}
                                className={cn(menuItemStyles)}
                            >
                                <Checkbox
                                    checked={visibleColumns[col.key]}
                                    onCheckedChange={() => toggleColumn(col.key)}
                                    className="size-3.5 rounded-sm border-[#3a3a38] data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18]"
                                />
                                <span>{col.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
            {/* Header Controls */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background">
                <div className="flex items-center gap-4">
                    <div className="flex rounded-md bg-secondary/40 p-0.5">
                        <button
                            onClick={() => setActiveTab('Open')}
                            className={cn(
                                "px-3 py-0.5 font-medium rounded-sm transition-all",
                                activeTab === 'Open' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Open
                        </button>
                        <button
                            onClick={() => setActiveTab('Done')}
                            className={cn(
                                "px-3 py-0.5 font-medium rounded-sm transition-all",
                                activeTab === 'Done' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Done
                        </button>
                        <button
                            onClick={() => setActiveTab('All')}
                            className={cn(
                                "px-3 py-0.5 font-medium rounded-sm transition-all",
                                activeTab === 'All' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            All
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {/* Export/Download Button */}
                    <button
                        onClick={() => {
                            console.log('[Sales] Export clicked');
                            alert('Export feature - CSV download coming soon');
                        }}
                        className="p-1.5 border border-border rounded-md hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                        title="Export to CSV"
                    >
                        <Download size={18} />
                    </button>

                    {/* Print Button */}
                    <button
                        onClick={() => {
                            console.log('[Sales] Print clicked');
                            window.print();
                        }}
                        className="p-1.5 border border-border rounded-md hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                        title="Print"
                    >
                        <Printer size={18} />
                    </button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center justify-between gap-2 px-3 py-1.5 bg-[#2a2a28] border border-gray-600 rounded min-w-[140px] text-white hover:bg-[#323230] transition-colors text-xs">
                                <span>All locations</span>
                                <ChevronDown size={14} className="text-gray-400" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#1e1e1e] border-gray-700">
                            <DropdownMenuItem className="text-white hover:bg-gray-800">All locations</DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-gray-800">Main Warehouse</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <button
                        className="bg-[#d97757] text-white px-4 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-[#c66a4d] shadow-sm transition-colors relative z-10 cursor-pointer"
                        onClick={() => {
                            console.log('[Sales] + Sales Order button clicked');
                            alert('Create Sales Order functionality coming soon');
                        }}
                    >
                        <Plus size={14} />
                        + Sales Order
                    </button>
                </div>
            </div>

            {/* Stats Line */}
            <div className="px-4 py-2 border-b border-border text-[11px] text-muted-foreground flex items-center gap-4 bg-muted/5">
                <span className="font-bold text-foreground">{filteredOrders.length} orders</span>
                <span className="text-muted-foreground/60">|</span>
                <span>Total amount: {filteredOrders.reduce((acc, o) => acc + (o.total_amount || 0), 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
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
                }
                .customize-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .customize-scrollbar::-webkit-scrollbar-thumb {
                    background: #444;
                    border-radius: 2px;
                }
            `}</style>
                {loading ? (
                    <div className="p-4">
                        <TableSkeleton rows={10} />
                    </div>
                ) : (
                    <table className="w-full table-fixed text-left border-collapse whitespace-nowrap">
                        <thead className="sticky top-0 bg-background z-10 shadow-sm">
                            <tr className="border-b border-border bg-background h-10">
                                <th className="px-4 py-3 w-10 bg-background border-r border-border/50">
                                    <Checkbox
                                        className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-[#3a3a38] size-4"
                                        checked={filteredOrders.length > 0 && selectedOrders.length === filteredOrders.length}
                                        onCheckedChange={toggleSelectAll}
                                    />
                                </th>
                                {allColumns.map((col, idx) => visibleColumns[col.key] && (
                                    <th
                                        key={idx}
                                        style={{ width: columnWidths[col.key], minWidth: 40 }}
                                        className={cn(
                                            "h-10 px-3 align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[11px] border-r border-border/50 select-none bg-background relative group/header",
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
                                <th className="px-4 py-3 w-10 bg-background"></th>
                            </tr>
                            {/* Filter Row */}
                            <tr className="border-b border-border bg-secondary/5 sticky top-10 z-10">
                                <th className="p-1 px-2 border-r border-border/50 bg-secondary/5"></th>
                                {allColumns.map((col) => visibleColumns[col.key] && (
                                    <th key={col.key} className="p-1 px-2 border-r border-border/50 bg-secondary/5">
                                        <input
                                            className="w-full px-2 py-1 border border-border rounded-sm text-[11px] font-normal bg-background focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                                            placeholder="Filter"
                                            value={filters[col.key as keyof FilterState] || ''}
                                            onChange={(e) => handleFilterChange(col.key as keyof FilterState, e.target.value)}
                                        />
                                    </th>
                                ))}
                                <th className="p-1 bg-secondary/5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-background">
                            {filteredOrders.map(order => {
                                const salesStatus = getSalesItemsStatus(order);
                                const ingredientsStatus = getIngredientsStatus(order);
                                const productionStatus = getProductionStatus(order);
                                const isOverdue = order.delivery_date && new Date(order.delivery_date) < new Date();

                                return (
                                    <tr key={order.id} className="h-10 hover:bg-secondary/20 group transition-colors border-b border-border/50 cursor-pointer">
                                        <td className="px-4 py-1 border-r border-border/50">
                                            <Checkbox
                                                className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-[#3a3a38] size-4"
                                                checked={selectedOrders.includes(order.id)}
                                                onCheckedChange={() => toggleSelect(order.id)}
                                            />
                                        </td>
                                        {allColumns.map((col) => {
                                            if (!visibleColumns[col.key]) return null;

                                            const value = (col.key === 'customer') ? order.customer?.name : (order as any)[col.key];

                                            if (col.key === 'orderNo') {
                                                return (
                                                    <td key={col.key} className="px-3 py-1 text-sm border-r border-border/50 font-medium truncate max-w-[150px]">
                                                        <Link href={`/sell/${order.id}`} className="text-[#d97757] font-medium hover:underline cursor-pointer">
                                                            {order.order_no}
                                                        </Link>
                                                    </td>
                                                );
                                            }

                                            if (col.key === 'total') {
                                                return (
                                                    <td key={col.key} className="px-3 py-1 text-right font-mono text-white text-xs border-r border-border/50 whitespace-nowrap">
                                                        {(order.total_amount || 0).toFixed(2)} <span className="text-[10px] text-gray-400">{order.currency}</span>
                                                    </td>
                                                );
                                            }

                                            if (col.key === 'deadline') {
                                                return (
                                                    <td key={col.key} className={cn("px-3 py-1 text-center text-xs border-r border-border/50 whitespace-nowrap", isOverdue ? "text-[#ff7b6f] font-bold" : "text-white")}>
                                                        {order.delivery_date || '-'}
                                                    </td>
                                                );
                                            }

                                            if (['salesItems', 'ingredients', 'production', 'delivery'].includes(col.key)) {
                                                let status = '';
                                                if (col.key === 'salesItems') status = salesStatus;
                                                if (col.key === 'ingredients') status = ingredientsStatus;
                                                if (col.key === 'production') status = productionStatus;
                                                if (col.key === 'delivery') status = order.delivery_status;

                                                return (
                                                    <td key={col.key} className="px-3 py-1 border-r border-border/50 whitespace-nowrap overflow-hidden text-center">
                                                        <StatusBadge status={status} />
                                                    </td>
                                                );
                                            }

                                            return (
                                                <td key={col.key} className="px-3 py-1 text-white text-xs border-r border-border/50 truncate max-w-[200px]">
                                                    {value || '-'}
                                                </td>
                                            );
                                        })}
                                        <td className="px-3 py-1 text-right">
                                            <button className="p-1 hover:bg-secondary rounded transition-colors text-muted-foreground opacity-0 group-hover:opacity-100">
                                                <MoreHorizontal size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
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
