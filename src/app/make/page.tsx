'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Plus,
    Download,
    Printer,
    ChevronDown,
    GripVertical,
    Info,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    Search,
    Calendar,
    Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchManufacturingOrdersPaginated, ManufacturingOrder } from '@/lib/katana-data-provider';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/LoadingSpinner';
import { Shell } from '@/components/layout/Shell';
import { TasksTable } from '@/components/make/TasksTable';
import { StatusDropdown, moStatusOptions } from '@/components/ui/StatusDropdown';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from '@/lib/supabaseClient';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DatePicker } from '@/components/ui/DatePicker';




interface FilterState {
    orderNo: string;
    customer: string;
    productName: string;
    category: string;
    qty: string;
    time: string;
    materialsCost: string;
    subAssembliesCost: string;
    operationsCost: string;
    totalCost: string;
    doneDate: string;
    productionStatus: string;
    ingredients: string;
    completed: string;
    plannedTime: string;
    prodDeadline: string;
    delDeadline: string;
    rank: string;
}

type DateFilterOption = 'last_7_days' | 'last_30_days' | 'all_time' | 'custom';

import { MAKE_NAV_GROUPS } from './constants';
import { createManufacturingOrder, searchKatanaItems } from '@/lib/katana-actions';
import { SearchableSelect } from '@/components/ui/SearchableSelect';

export default function MakePage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'Open' | 'Done'>('Open');
    const [orders, setOrders] = useState<ManufacturingOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeSidebarPage, setActiveSidebarPage] = useState('Schedule');
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const [dateFilter, setDateFilter] = useState<DateFilterOption>('last_7_days');
    const [customDateRange, setCustomDateRange] = useState<{
        from: string | null;
        to: string | null;
    }>({ from: null, to: null });
    const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
    const [calendarViewDate, setCalendarViewDate] = useState(new Date()); // Left calendar month

    const pageSize = 25;

    // Filters State
    const [filters, setFilters] = useState<FilterState>({
        orderNo: '',
        customer: '',
        productName: '',
        category: '',
        qty: '',
        time: '',
        materialsCost: '',
        subAssembliesCost: '',
        operationsCost: '',
        totalCost: '',
        doneDate: '',
        productionStatus: '',
        ingredients: '',
        completed: '',
        plannedTime: '',
        prodDeadline: '',
        delDeadline: '',
        rank: '',
    });

    // Column Management State
    const STORAGE_KEY = 'make-table-view';
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
        checkbox: 40,
        rank: 50,
        orderNo: 120,
        customer: 140,
        productName: 400,
        category: 120,
        completed: 160,
        qty: 100,
        plannedTime: 120,
        prodDeadline: 120,
        delDeadline: 120,
        ingredients: 160,
        materialsCost: 130,
        subAssembliesCost: 150,
        operationsCost: 140,
        totalCost: 120,
        doneDate: 110,
        productionStatus: 140,
    });

    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        rank: true,
        orderNo: true,
        customer: true,
        productName: true,
        category: true,
        completed: true,
        qty: true,
        plannedTime: true,
        prodDeadline: true,
        delDeadline: true,
        ingredients: true,
        materialsCost: true,
        subAssembliesCost: true,
        operationsCost: true,
        totalCost: true,
        doneDate: true,
        productionStatus: true,
    });

    // Dynamic columns based on tab
    // Column order: Identification → Product Info → Time/Quantity → Costs → Dates → Status
    const allColumns = React.useMemo(() => {
        if (activeTab === 'Open') {
            return [
                // Identification
                { key: 'rank', label: '#', type: 'rank', required: true, align: 'center' as const },
                { key: 'orderNo', label: 'Order #', required: true },
                // Product Info
                { key: 'customer', label: 'Customer' },
                { key: 'productName', label: 'Product' },
                { key: 'category', label: 'Category' },
                // Time & Quantity
                { key: 'plannedTime', label: 'Time', align: 'right' as const },
                { key: 'completed', label: 'Qty', align: 'right' as const },
                // Costs
                { key: 'materialsCost', label: 'Materials', align: 'right' as const },
                { key: 'operationsCost', label: 'Operations', align: 'right' as const },
                { key: 'subAssembliesCost', label: 'Sub-assemblies', align: 'right' as const },
                { key: 'totalCost', label: 'Total', align: 'right' as const },
                // Dates & Deadlines
                { key: 'prodDeadline', label: 'Prod. deadline', align: 'center' as const },
                { key: 'delDeadline', label: 'Del. deadline', align: 'center' as const },
                { key: 'doneDate', label: 'Done date', align: 'center' as const },
                // Status
                { key: 'ingredients', label: 'Ingredients', align: 'center' as const },
                { key: 'productionStatus', label: 'Production', align: 'center' as const },
            ];
        } else {
            return [
                // Identification
                { key: 'orderNo', label: 'Order #', required: true },
                // Product Info
                { key: 'customer', label: 'Customer' },
                { key: 'productName', label: 'Product' },
                { key: 'category', label: 'Category' },
                // Time & Quantity
                { key: 'plannedTime', label: 'Time', align: 'right' as const },
                { key: 'completed', label: 'Completed', align: 'right' as const },
                // Costs
                { key: 'materialsCost', label: 'Materials', align: 'right' as const },
                { key: 'operationsCost', label: 'Operations', align: 'right' as const },
                { key: 'subAssembliesCost', label: 'Sub-assemblies', align: 'right' as const },
                { key: 'totalCost', label: 'Total', align: 'right' as const },
                // Dates
                { key: 'doneDate', label: 'Done date', align: 'center' as const },
                // Status
                { key: 'productionStatus', label: 'Production', align: 'center' as const },
            ];
        }
    }, [activeTab]);

    const [draggedColIdx, setDraggedColIdx] = useState<number | null>(null);
    const [draggedRowIdx, setDraggedRowIdx] = useState<number | null>(null);

    const updateStatus = async (orderId: string, newStatus: ManufacturingOrder['productionStatus']) => {
        // Store former status for potential revert
        const formerStatus = orders.find(o => o.id === orderId)?.productionStatus;

        // Optimistic update
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, productionStatus: newStatus } : order
        ));

        try {
            const dbStatus = newStatus.toUpperCase();
            const { error } = await supabase
                .from('manufacturing_orders')
                .update({ status: dbStatus })
                .eq('id', orderId);

            if (error) {
                console.error('Failed to update status:', error);
                // Revert on failure
                if (formerStatus) {
                    setOrders(prev => prev.map(order =>
                        order.id === orderId ? { ...order, productionStatus: formerStatus } : order
                    ));
                }
            }
        } catch (err) {
            console.error('Status update error:', err);
            // Revert on exception
            if (formerStatus) {
                setOrders(prev => prev.map(order =>
                    order.id === orderId ? { ...order, productionStatus: formerStatus } : order
                ));
            }
        }
    };



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

            if (handleMouseMoveRef.current) document.removeEventListener('mousemove', handleMouseMoveRef.current);
            if (handleMouseUpRef.current) document.removeEventListener('mouseup', handleMouseUpRef.current);
        };

        handleMouseMoveRef.current = handleMouseMove;
        handleMouseUpRef.current = handleMouseUp;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const resetAllColumns = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setVisibleColumns({
            orderNo: true,
            customer: true,
            productName: true,
            category: true,
            qty: true,
            time: true,
            materialsCost: true,
            subAssembliesCost: true,
            operationsCost: true,
            totalCost: true,
            doneDate: true,
            productionStatus: true,
        });
        setContextMenu(null);
    };

    // Shared Menu Styles
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
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [contextMenu]);

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Drag-to-Scroll State
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const startPosRef = useRef({ x: 0, y: 0 });
    const scrollStartRef = useRef({ left: 0, top: 0 });
    const wasDraggingRef = useRef(false);
    const velocity = useRef({ x: 0, y: 0 });
    const lastMoveTime = useRef(0);
    const lastPosRef = useRef({ x: 0, y: 0 });
    const rafId = useRef<number>(0);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.closest('button')) return;

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
        const newScrollLeft = scrollStartRef.current.left - deltaX * 0.5;
        scrollContainerRef.current.scrollLeft = newScrollLeft;

        if (dt > 0 && dt < 100) {
            const movementX = x - lastPosRef.current.x;
            const newVelX = -movementX / dt * 0.5;
            velocity.current = { x: newVelX * 0.3 + velocity.current.x * 0.7, y: 0 };
        }
        lastPosRef.current = { x, y };
        lastMoveTime.current = now;
    };
    const startMomentum = () => {
        if (!scrollContainerRef.current) return;
        const friction = 0.92;
        let velX = velocity.current.x * 1.5;

        const step = () => {
            if (!scrollContainerRef.current) return;
            if (Math.abs(velX) < 0.5) return;
            scrollContainerRef.current.scrollLeft -= velX;
            velX *= friction;
            rafId.current = requestAnimationFrame(step);
        };
        rafId.current = requestAnimationFrame(step);
    };

    const getDateRange = () => {
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];

        switch (dateFilter) {
            case 'last_7_days': {
                const start = new Date(now);
                start.setDate(now.getDate() - 7);
                return { from: start.toISOString().split('T')[0], to: todayStr };
            }
            case 'last_30_days': {
                const start = new Date(now);
                start.setDate(now.getDate() - 30);
                return { from: start.toISOString().split('T')[0], to: todayStr };
            }
            case 'all_time':
                return { from: null, to: null };
            case 'custom':
                return customDateRange;
            default:
                return { from: null, to: null };
        }
    };


    // Fetch Data from Supabase
    useEffect(() => {
        if (activeSidebarPage !== 'Schedule') return;

        async function loadData() {
            setLoading(true);
            try {
                // 'Open' = 'not_started', 'Done' = 'done'
                const statusFilter: string = activeTab === 'Open' ? 'not_started' : 'done';

                const { from, to } = activeTab === 'Done' ? getDateRange() : { from: null, to: null };

                const { orders, totalCount, totalPages } = await fetchManufacturingOrdersPaginated(
                    currentPage,
                    pageSize,
                    {
                        status: statusFilter,
                        dateFrom: from,
                        dateTo: to
                    }
                );

                setOrders(orders);
                setTotalCount(totalCount);
                setTotalPages(totalPages);
            } catch (error) {
                console.error("Failed to load manufacturing orders", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [activeSidebarPage, activeTab, currentPage, dateFilter, customDateRange]);

    // Format time for display like Katana: "394 h 1 m 15 s"
    const formatTimeKatana = (secs: number): string => {
        if (!secs || secs === 0) return '0 m';
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;

        const parts = [];
        if (h > 0) parts.push(`${h} h`);
        if (m > 0 || h > 0) parts.push(`${m} m`);
        if (s > 0) parts.push(`${s} s`);

        return parts.length > 0 ? parts.join(' ') : '0 m';
    };

    // Helper: Ingredients Status Badge
    const getIngredientsStatusBadge = (status?: string, expectedDate?: string) => {
        // Matching the neon glow style from Production status buttons
        const statusConfig: Record<string, { buttonStyle: string; dotStyle: string; label: string }> = {
            'in_stock': {
                buttonStyle: 'bg-[#1a2e1a] text-[#8aaf6e] border-[#8aaf6e]/50 shadow-[0_0_8px_rgba(138,175,110,0.3)]',
                dotStyle: 'bg-[#8aaf6e] shadow-[0_0_6px_rgba(138,175,110,0.8)]',
                label: 'In stock'
            },
            'expected': {
                buttonStyle: 'bg-[#2e2a1a] text-[#bb8b5d] border-[#bb8b5d]/50 shadow-[0_0_8px_rgba(187,139,93,0.3)]',
                dotStyle: 'bg-[#bb8b5d] shadow-[0_0_6px_rgba(187,139,93,0.8)]',
                label: 'Expected'
            },
            'not_available': {
                buttonStyle: 'bg-[#2e1a1a] text-[#ff7b6f] border-[#ff7b6f]/50 shadow-[0_0_8px_rgba(255,123,111,0.3)]',
                dotStyle: 'bg-[#ff7b6f] shadow-[0_0_6px_rgba(255,123,111,0.8)]',
                label: 'Not available'
            }
        };

        if (!status) return <span className="text-[#7a7974] text-xs">-</span>;

        const config = statusConfig[status] || statusConfig['in_stock'];

        // For expected status with date, show date inside the button
        const displayLabel = status === 'expected' && expectedDate
            ? `Expected ${expectedDate}`
            : config.label;

        return (
            <span className={cn(
                "px-2.5 py-1 rounded-md text-[11px] font-medium border inline-flex items-center gap-2 whitespace-nowrap",
                config.buttonStyle
            )}>
                <span className={cn("w-2 h-2 rounded-full", config.dotStyle)} />
                {displayLabel}
            </span>
        );
    };

    // Helper: Format currency
    const formatCurrency = (amount?: number): string => {
        if (!amount && amount !== 0) return '-';
        return `${amount.toFixed(2)} CAD`;
    };

    // Helper: Format quantity with UOM
    const formatQuantity = (actual: number, planned: number, uom: string): string => {
        return `${actual || 0} / ${planned || 0} ${uom || 'pcs'}`;
    };

    const filteredOrders = orders.filter(o => {
        const matchesTab = activeTab === 'Open' ? o.productionStatus !== 'done' : o.productionStatus === 'done';
        if (!matchesTab) return false;

        const matchText = (text: string | number | null | undefined, filter: string) => {
            if (!filter) return true;
            if (text === null || text === undefined) return false;
            return text.toString().toLowerCase().includes(filter.toLowerCase().trim());
        };

        return (
            matchText(o.orderNo, filters.orderNo) &&
            matchText(o.customer, filters.customer) &&
            matchText(o.productName, filters.productName) &&
            matchText(o.category, filters.category) &&
            matchText(o.plannedQuantity, filters.qty) &&
            matchText(o.plannedTimeSeconds, filters.time) &&
            matchText(o.materialsCost, filters.materialsCost) &&
            matchText(o.subAssembliesCost, filters.subAssembliesCost) &&
            matchText(o.operationsCost, filters.operationsCost) &&
            matchText(o.totalCost, filters.totalCost) &&
            matchText(o.doneDate, filters.doneDate) &&
            matchText(o.ingredientsStatus, filters.ingredients) &&
            matchText(o.productionStatus, filters.productionStatus)
        );
    });

    // Handle Tab Change
    const handleTabChange = (tab: 'Open' | 'Done') => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    // Logging for verification
    useEffect(() => {
        if (!loading && orders.length > 0) {
            console.log('[Make] Order customer data:', orders.map(o => ({
                id: o.id,
                order_number: o.orderNo,
                customer: o.customer,
                sales_order_id: o.salesOrderId
            })));
        }
    }, [orders, loading]);

    // Calculate totals for the filtered orders
    const totals = React.useMemo(() => {
        return filteredOrders.reduce((acc, o) => ({
            plannedQty: acc.plannedQty + (o.plannedQuantity || 0),
            actualQty: acc.actualQty + (o.completedQuantity || 0),
            plannedTime: acc.plannedTime + (o.plannedTimeSeconds || 0),
            actualTime: acc.actualTime + (o.actualTimeSeconds || 0),
            materialsCost: acc.materialsCost + (o.materialsCost || 0),
            subAssembliesCost: acc.subAssembliesCost + (o.subAssembliesCost || 0),
            operationsCost: acc.operationsCost + (o.operationsCost || 0),
            totalCost: acc.totalCost + (o.totalCost || 0),
        }), {
            plannedQty: 0, actualQty: 0, plannedTime: 0, actualTime: 0,
            materialsCost: 0, subAssembliesCost: 0, operationsCost: 0, totalCost: 0
        });
    }, [filteredOrders]);

    const toggleSelectAll = () => {
        if (selectedOrders.length === filteredOrders.length) setSelectedOrders([]);
        else setSelectedOrders(filteredOrders.map(o => o.id));
    };

    const toggleSelect = (id: string) => {
        if (selectedOrders.includes(id)) setSelectedOrders(selectedOrders.filter(oid => oid !== id));
        else setSelectedOrders([...selectedOrders, id]);
    };


    return (
        <Shell
            activeTab="Make"
            activePage={activeSidebarPage}
            onPageChange={setActiveSidebarPage}
            sidebarGroups={MAKE_NAV_GROUPS}
        >
            {activeSidebarPage === 'Tasks' ? (
                <TasksTable />
            ) : activeSidebarPage === 'Schedule' ? (
                <div
                    className="flex-1 flex flex-col min-h-0 bg-[#1a1a18] text-[13px]"
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
                                {allColumns.filter(col => !col.required).map((col) => (
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
                                        <span className="text-xs text-white">
                                            {col.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Header Controls - Matching TasksTable pattern */}
                    <div className="flex flex-col border-b border-[#3a3a38] bg-[#1a1a18] shrink-0">
                        {/* Row 1: Status Tabs + Location Dropdown + New MO Button */}
                        <div className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center gap-4">
                                {/* Open/Done Pill Toggle */}
                                <div className="flex rounded-md bg-secondary/40 p-0.5">
                                    <button
                                        onClick={() => handleTabChange('Open')}
                                        className={cn(
                                            "px-3 py-0.5 font-medium rounded-sm transition-all text-xs",
                                            activeTab === 'Open'
                                                ? "bg-background text-foreground shadow-sm"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        Open
                                    </button>
                                    <button
                                        onClick={() => handleTabChange('Done')}
                                        className={cn(
                                            "px-3 py-0.5 font-medium rounded-sm transition-all text-xs",
                                            activeTab === 'Done'
                                                ? "bg-background text-foreground shadow-sm"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Location Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center justify-between gap-2 px-3 py-2 bg-[#2a2a28] border border-[#3a3a38] rounded min-w-[140px] text-white hover:bg-[#323230] transition-colors text-xs">
                                            <span>MMH Kelowna</span>
                                            <ChevronDown size={14} className="text-gray-400" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 bg-[#1e1e1e] border-[#3a3a38]">
                                        <DropdownMenuLabel className="text-gray-400 text-[11px] uppercase tracking-wider">Filter by Location</DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-[#3a3a38]" />
                                        <DropdownMenuItem className="text-white hover:bg-[#2a2a28] text-xs">
                                            MMH Kelowna
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-white hover:bg-[#2a2a28] text-xs">
                                            Manage locations
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* New MO Button - Matching MMH Kelowna style */}
                                <button
                                    className="flex items-center justify-center gap-2 px-3 py-2 bg-[#d97757] border border-[#e08868] rounded text-white hover:bg-[#e08868] transition-colors text-xs font-medium"
                                    onClick={() => router.push('/make/mo/new')}
                                >
                                    <Plus size={14} />
                                    <span>New MO</span>
                                </button>
                            </div>
                        </div>

                        {/* Row 2: Order Count + Download/Print buttons */}
                        <div className="flex items-center justify-between px-4 pb-2">
                            <div className="flex items-center gap-4">
                                <span className="text-[14px] font-bold text-[#faf9f5]">
                                    {totalCount} orders
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Download Button */}
                                <button
                                    onClick={() => console.log('[Schedule] Export clicked')}
                                    className="p-1.5 border border-[#3a3a38] rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                    title="Export to CSV"
                                >
                                    <Download size={14} />
                                </button>

                                {/* Print Button */}
                                <button
                                    onClick={() => window.print()}
                                    className="p-1.5 border border-[#3a3a38] rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                    title="Print"
                                >
                                    <Printer size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Selection Action Bar (only shows when items selected) */}
                    {selectedOrders.length > 0 && (
                        <div className="px-4 py-2 border-b border-[#3a3a38] bg-[#262624] flex items-center gap-4 shrink-0 animate-in fade-in slide-in-from-top-2 duration-300 ease-out">
                            <span className="text-xs font-bold text-[#faf9f5]">
                                {selectedOrders.length} orders selected
                            </span>
                            <div className="h-4 w-[1px] bg-[#3a3a38]" />
                            <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#faf9f5] hover:text-[#d97757] transition-colors">
                                <Calendar size={13} />
                                Deadline
                            </button>
                            <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#faf9f5] hover:text-[#d97757] transition-colors">
                                <Check size={13} />
                                Change status
                            </button>
                        </div>
                    )}

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
                            <table className="w-full text-left border-collapse whitespace-nowrap">
                                <thead className="sticky top-0 z-10 shadow-sm">
                                    <tr className="h-8 bg-[#222220]">
                                        {/* Checkbox column header */}
                                        <th className="p-1 w-10 bg-[#222220] text-center border-r border-border/50">
                                            <Checkbox
                                                className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-[#3a3a38] size-4"
                                                checked={filteredOrders.length > 0 && selectedOrders.length === filteredOrders.length}
                                                onCheckedChange={toggleSelectAll}
                                            />
                                        </th>
                                        {allColumns.map((col, idx) => {
                                            if (!visibleColumns[col.key]) return null;

                                            return (
                                                <th
                                                    key={col.key}
                                                    style={{ width: columnWidths[col.key], minWidth: 40 }}
                                                    className={cn(
                                                        "h-8 px-3 py-0 align-middle font-medium text-[#7a7974] uppercase tracking-wider text-[11px] border-r border-border/50 select-none bg-[#222220] relative group/header",
                                                        col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                                                    )}
                                                >
                                                    <span>{col.label}</span>
                                                    {/* Resize Handle */}
                                                    <div
                                                        onMouseDown={(e) => handleResizeStart(e, col.key)}
                                                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 opacity-0 group-hover/header:opacity-100 transition-all z-20"
                                                    />
                                                </th>
                                            );
                                        })}
                                        <th className="px-4 py-1 w-10 bg-[#222220]"></th>
                                    </tr>
                                    {/* Filter Row */}
                                    <tr className="border-b border-border/50 bg-[#1a1a18] sticky top-8 z-10">
                                        <th className="p-0.5 bg-[#1a1a18] border-r border-border/50 w-10"></th>
                                        {allColumns.map((col) => {
                                            if (!visibleColumns[col.key]) return null;

                                            return (
                                                <th
                                                    key={`filter-${col.key}`}
                                                    style={{ width: columnWidths[col.key], minWidth: 40 }}
                                                    className="p-0.5 px-2 border-r border-border/50 bg-[#1a1a18]"
                                                >
                                                    {col.key === 'ingredients' ? (
                                                        <select
                                                            className="w-full px-2 py-0.5 border border-border rounded-sm text-[11px] font-normal bg-background focus:outline-none focus:border-primary/50 transition-colors"
                                                            value={filters.ingredients}
                                                            onChange={(e) => handleFilterChange('ingredients', e.target.value)}
                                                        >
                                                            <option value="">Filter</option>
                                                            <option value="in_stock">In stock</option>
                                                            <option value="expected">Expected</option>
                                                            <option value="not_available">Not available</option>
                                                        </select>
                                                    ) : col.key === 'productionStatus' ? (
                                                        <select
                                                            className="w-full px-2 py-0.5 border border-border rounded-sm text-[11px] font-normal bg-background focus:outline-none focus:border-primary/50 transition-colors"
                                                            value={filters.productionStatus}
                                                            onChange={(e) => handleFilterChange('productionStatus', e.target.value)}
                                                        >
                                                            <option value="">Filter</option>
                                                            <option value="not_started">Not started</option>
                                                            <option value="work_in_progress">Work in progress</option>
                                                            <option value="done">Done</option>
                                                            <option value="blocked">Blocked</option>
                                                        </select>
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
                                            );
                                        })}
                                        <th className="p-0.5 bg-[#1a1a18] w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border bg-background">

                                    {filteredOrders.map((order, index) => (
                                        <tr
                                            key={order.id}
                                            draggable
                                            onDragStart={(e) => {
                                                const target = e.target as HTMLElement;
                                                if (!target.closest('.drag-handle')) {
                                                    e.preventDefault();
                                                    return;
                                                }
                                                setDraggedRowIdx(index);
                                            }}
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                if (draggedRowIdx === null || draggedRowIdx === index) return;
                                                const newOrders = [...orders];
                                                const fromIdx = orders.findIndex(o => o.id === filteredOrders[draggedRowIdx].id);
                                                const toIdx = orders.findIndex(o => o.id === filteredOrders[index].id);
                                                if (fromIdx !== -1 && toIdx !== -1) {
                                                    const item = newOrders.splice(fromIdx, 1)[0];
                                                    newOrders.splice(toIdx, 0, item);
                                                    setOrders(newOrders);
                                                    setDraggedRowIdx(index);
                                                }
                                            }}
                                            onDragEnd={() => setDraggedRowIdx(null)}
                                            className={cn(
                                                "h-10 transition-colors border-b border-border/50",
                                                selectedOrders.includes(order.id)
                                                    ? "bg-[#5b9bd5]/10"
                                                    : "hover:bg-secondary/20 group",
                                                draggedRowIdx === index && "bg-secondary/30 opacity-50"
                                            )}
                                        >
                                            {/* Checkbox cell - scrolls with table */}
                                            <td className="px-4 py-1 border-r border-border/50">
                                                <div className="flex justify-center">
                                                    <Checkbox
                                                        className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-[#3a3a38] size-4"
                                                        checked={selectedOrders.includes(order.id)}
                                                        onCheckedChange={() => toggleSelect(order.id)}
                                                    />
                                                </div>
                                            </td>
                                            {allColumns.map((col) => {
                                                if (!visibleColumns[col.key]) return null;
                                                const cellStyle = { width: columnWidths[col.key], minWidth: columnWidths[col.key] };
                                                const baseClass = "px-3 py-1 border-r border-border/50 text-[11px] font-medium";

                                                switch (col.key) {
                                                    case 'rank':
                                                        return (
                                                            <td key={col.key} style={cellStyle} className={cn(baseClass, "text-center text-muted-foreground font-mono")}>
                                                                {order.rank}
                                                            </td>
                                                        );
                                                    case 'orderNo':
                                                        return (
                                                            <td key={col.key} style={cellStyle} className={baseClass}>
                                                                <Link href={`/make/mo/${order.id}`} className="text-[#d97757] hover:underline uppercase">
                                                                    {order.orderNo}
                                                                </Link>
                                                            </td>
                                                        );
                                                    case 'customer':
                                                        return (
                                                            <td key={col.key} style={cellStyle} className={cn(baseClass, "text-white")}>
                                                                {order.customer}
                                                            </td>
                                                        );
                                                    case 'productName':
                                                        return (
                                                            <td key={col.key} style={cellStyle} className={cn(baseClass, "text-white uppercase whitespace-normal")}>
                                                                <div title={order.productName} className="line-clamp-2">
                                                                    {order.productName}
                                                                </div>
                                                            </td>
                                                        );
                                                    case 'category':
                                                        return (
                                                            <td key={col.key} style={cellStyle} className={cn(baseClass, "text-gray-400 text-[10px] uppercase font-semibold")}>
                                                                {order.category}
                                                            </td>
                                                        );
                                                    case 'plannedTime':
                                                        return (
                                                            <td key={col.key} style={cellStyle} className={cn(baseClass, "text-right font-mono text-white")}>
                                                                {formatTimeKatana(order.plannedTimeSeconds || 0)} / {formatTimeKatana(order.actualTimeSeconds || 0)}
                                                            </td>
                                                        );
                                                    case 'completed':
                                                        return (
                                                            <td key={col.key} style={cellStyle} className={cn(baseClass, "text-right font-mono text-white")}>
                                                                {order.completedQuantity} / {order.plannedQuantity}
                                                            </td>
                                                        );
                                                    case 'qty':
                                                        return (
                                                            <td key={col.key} style={cellStyle} className={cn(baseClass, "text-right font-mono text-white")}>
                                                                {order.plannedQuantity} <span className="text-gray-500">{(order.uom || 'pcs').toUpperCase()}</span>
                                                            </td>
                                                        );
                                                    case 'materialsCost':
                                                    case 'operationsCost':
                                                    case 'subAssembliesCost':
                                                    case 'totalCost':
                                                        const cost = order[col.key as keyof ManufacturingOrder] as number;
                                                        return (
                                                            <td key={col.key} style={cellStyle} className={cn(baseClass, "text-right font-mono text-white")}>
                                                                {(cost || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-gray-500">CAD</span>
                                                            </td>
                                                        );
                                                    case 'doneDate':
                                                        return (
                                                            <td key={col.key} style={cellStyle} className={cn(baseClass, "text-center text-white")}>
                                                                {order.doneDate || '-'}
                                                            </td>
                                                        );
                                                    case 'ingredients':
                                                        return (
                                                            <td key={col.key} style={cellStyle} className={cn(baseClass, "text-center")}>
                                                                {getIngredientsStatusBadge(order.ingredientsStatus || 'in_stock', order.expectedDate || undefined)}
                                                            </td>
                                                        );
                                                    case 'productionStatus':
                                                        return (
                                                            <td key={col.key} style={cellStyle} className={cn(baseClass, "relative text-center")}>
                                                                <div className="flex justify-center">
                                                                    <StatusDropdown
                                                                        value={order.productionStatus}
                                                                        onChange={(status) => updateStatus(order.id, status as any)}
                                                                        options={moStatusOptions}
                                                                    />
                                                                </div>
                                                            </td>
                                                        );
                                                    case 'prodDeadline':
                                                    case 'delDeadline':
                                                        const deadline = col.key === 'prodDeadline' ? order.productionDeadline : order.deliveryDeadline;
                                                        return (
                                                            <td key={col.key} style={cellStyle} className={cn(baseClass, "text-center text-white")}>
                                                                {deadline || '-'}
                                                            </td>
                                                        );
                                                    default:
                                                        return <td key={col.key} style={cellStyle} className={baseClass}>-</td>;
                                                }
                                            })}
                                            <td className="px-4 py-1 text-center">
                                                <MoreHorizontal size={14} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Totals Row at Bottom */}
                                    {
                                        filteredOrders.length === 0 && (
                                            <tr>
                                                <td colSpan={allColumns.length + 2} className="px-4 py-8 text-center text-muted-foreground">
                                                    {loading ? "Loading orders..." : "No items found."}
                                                </td>
                                            </tr>
                                        )
                                    }
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
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    Module "{activeSidebarPage}" under construction.
                </div>
            )
            }
            {/* Custom Date Range Modal */}
            {showCustomDatePicker && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] animate-in fade-in duration-200">
                    <div className="bg-[#262624] rounded-lg border border-[#3a3a38] w-[640px] shadow-2xl overflow-hidden">
                        {/* Header Area */}
                        <div className="p-6 pb-0">
                            <h3 className="text-sm font-bold text-[#faf9f5] mb-4">
                                Custom date range
                            </h3>

                            {/* Date Inputs Display */}
                            <div className="flex items-center gap-0 mb-6">
                                <div className={cn(
                                    "flex-1 border-b-2 py-1.5 transition-colors",
                                    !customDateRange.to ? "border-[#d97757]" : "border-[#3a3a38]"
                                )}>
                                    <span className="text-sm text-[#faf9f5]">
                                        {customDateRange.from || 'YYYY-MM-DD'}
                                    </span>
                                </div>
                                <div className="px-3 text-[#7a7974]">-</div>
                                <div className={cn(
                                    "flex-1 border-b-2 py-1.5 transition-colors",
                                    customDateRange.to ? "border-[#d97757]" : "border-[#3a3a38]"
                                )}>
                                    <span className="text-sm text-[#faf9f5]">
                                        {customDateRange.to || 'YYYY-MM-DD'}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setCustomDateRange({ from: null, to: null })}
                                    className="ml-4 p-1 hover:bg-[#3a3a38] rounded-full text-[#7a7974] hover:text-[#faf9f5]"
                                >
                                    <Plus className="w-4 h-4 rotate-45" />
                                </button>
                            </div>
                        </div>

                        {/* Side-by-Side Calendars */}
                        <div className="flex gap-8 p-6 pt-2 bg-[#1f1f1d] border-t border-[#3a3a38]">
                            {[0, 1].map((offset) => {
                                const currentMonth = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + offset, 1);
                                const year = currentMonth.getFullYear();
                                const month = currentMonth.getMonth();
                                const daysInMonth = new Date(year, month + 1, 0).getDate();
                                const firstDay = new Date(year, month, 1).getDay();

                                return (
                                    <div key={offset} className="flex-1">
                                        {/* Month Header */}
                                        <div className="flex items-center justify-between mb-4">
                                            {offset === 0 ? (
                                                <button
                                                    onClick={() => setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1))}
                                                    className="p-1 hover:bg-[#323230] rounded text-gray-400 hover:text-white"
                                                >
                                                    <ChevronLeft className="w-5 h-5" />
                                                </button>
                                            ) : <div className="w-7" />}

                                            <span className="text-sm font-medium text-white">
                                                {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentMonth)}
                                            </span>

                                            {offset === 1 ? (
                                                <button
                                                    onClick={() => setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1))}
                                                    className="p-1 hover:bg-[#323230] rounded text-gray-400 hover:text-white"
                                                >
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            ) : <div className="w-7" />}
                                        </div>

                                        {/* Days Grid */}
                                        <div className="grid grid-cols-7 text-center mb-2">
                                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                                <span key={d} className="text-[10px] text-[#7a7974] uppercase font-bold">{d.slice(0, 3)}</span>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-7 gap-y-1">
                                            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                                const day = i + 1;
                                                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                                const isStart = customDateRange.from === dateStr;
                                                const isEnd = customDateRange.to === dateStr;
                                                const isInRange = customDateRange.from && customDateRange.to &&
                                                    dateStr > customDateRange.from && dateStr < customDateRange.to;

                                                return (
                                                    <button
                                                        key={day}
                                                        onClick={() => {
                                                            if (!customDateRange.from || (customDateRange.from && customDateRange.to)) {
                                                                setCustomDateRange({ from: dateStr, to: null });
                                                            } else {
                                                                if (dateStr < customDateRange.from) {
                                                                    setCustomDateRange({ from: dateStr, to: customDateRange.from });
                                                                } else {
                                                                    setCustomDateRange({ from: customDateRange.from, to: dateStr });
                                                                }
                                                            }
                                                        }}
                                                        className={cn(
                                                            "h-8 flex items-center justify-center text-xs relative",
                                                            isStart && "bg-[#d97757] text-white rounded-l-md font-bold",
                                                            isEnd && "bg-[#d97757] text-white rounded-r-md font-bold",
                                                            isInRange && "bg-[#d97757]/20 text-[#faf9f5]",
                                                            !isStart && !isEnd && !isInRange && "text-[#bebcb3] hover:bg-[#3a3a38] rounded-md"
                                                        )}
                                                    >
                                                        {day}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer Actions */}
                        <div className="p-4 flex justify-end gap-3 border-t border-[#3a3a38]">
                            <button
                                onClick={() => {
                                    setShowCustomDatePicker(false);
                                    if (!customDateRange.from || !customDateRange.to) setDateFilter('last_7_days');
                                }}
                                className="px-4 py-2 text-xs text-[#7a7974] hover:text-[#faf9f5]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowCustomDatePicker(false)}
                                disabled={!customDateRange.from || !customDateRange.to}
                                className="px-6 py-2 bg-[#d97757] hover:bg-[#e08868] text-white text-xs font-bold rounded-sm shadow-md disabled:opacity-20"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Shell>
    );
}
