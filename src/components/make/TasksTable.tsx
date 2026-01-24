'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Plus, Search, Download, Printer, Pencil, Trash, MoreHorizontal, Info, User, Check, Pause, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchProductionTasks, ProductionTask } from '@/lib/katana-data-provider';
import { supabase } from '@/lib/supabaseClient';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/LoadingSpinner';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

type StatusType = 'Open' | 'Done';

interface FilterState {
    resource: string;
    orderNo: string;
    moDeadline: string;
    delDeadline: string;
    product: string;
    qty: string;
    operation: string;
    type: string;
    time: string;
    assigned: string;
}

// Helper to format seconds into time string (e.g., "1 h 2 m" or "3 s")
const formatTime = (seconds: number): string => {
    if (!seconds) return '-';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const parts = [];
    if (h > 0) parts.push(`${h} h`);
    if (m > 0) parts.push(`${m} m`);
    if (s > 0 || (h === 0 && m === 0)) parts.push(`${s} s`);

    return parts.join(' ');
};

export function TasksTable() {
    const router = useRouter();
    const [tasks, setTasks] = useState<ProductionTask[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
    const [activeStatus, setActiveStatus] = useState<StatusType>('Open');

    // Dropdown coordination state - allows single-click switching between dropdowns
    const [openDropdown, setOpenDropdown] = useState<'resource' | 'location' | null>(null);

    // Filters State
    const [filters, setFilters] = useState<FilterState>({
        resource: '',
        orderNo: '',
        moDeadline: '',
        delDeadline: '',
        product: '',
        qty: '',
        operation: '',
        type: '',
        time: '',
        assigned: ''
    });

    // Debounce search input
    const debouncedProductFilter = useDebounce(filters.product, 300);

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
    const STORAGE_KEY = 'tasks-table-view';
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
        resource: 120,
        orderNo: 100,
        moDeadline: 120,
        delDeadline: 120,
        product: 400,
        qty: 120,
        operation: 150,
        type: 100,
        time: 120,
        assigned: 150,
        status: 80
    });

    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        resource: true,
        orderNo: true,
        moDeadline: true,
        delDeadline: true,
        product: true,
        qty: true,
        operation: true,
        type: true,
        time: true,
        assigned: true,
        status: true
    });

    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const resizingRef = useRef<{ column: string; startX: number; startWidth: number } | null>(null);

    // Column Order & Drag State
    const [columnOrder, setColumnOrder] = useState<string[]>([
        'resource', 'orderNo', 'moDeadline', 'delDeadline', 'product',
        'qty', 'operation', 'type', 'time', 'assigned', 'status'
    ]);
    const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

    // Shared Menu Styles
    const menuStyles = "fixed z-50 bg-[#1e1e1e] border border-[#3a3a38] rounded-md shadow-lg py-1 min-w-[200px] animate-in fade-in-0 zoom-in-95";
    const menuItemStyles = "flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-[#2a2a28] transition-colors text-xs text-white rounded mx-1";

    // Column Config
    const allColumns = [
        { key: 'checkbox', label: '', width: 50, fixed: true },
        { key: 'resource', label: 'RESOURCE', required: true, info: 'Work center or machine' },
        { key: 'orderNo', label: 'MO #', info: 'Manufacturing Order number' },
        { key: 'moDeadline', label: 'MO DEADLINE', info: 'Production deadline' },
        { key: 'delDeadline', label: 'DEL. DEADLINE', info: 'Delivery deadline' },
        { key: 'product', label: 'PRODUCT', info: 'Product name' },
        { key: 'qty', label: 'PLANNED QTY', info: 'Completed / Planned quantity' },
        { key: 'operation', label: 'OPERATION', info: 'Operation name' },
        { key: 'type', label: 'TYPE', info: 'Task type' },
        { key: 'time', label: 'PLANNED TIME', info: 'Planned duration' },
        { key: 'assigned', label: 'ASSIGNED TO', info: 'Assigned operators' },
        { key: 'status', label: 'STATUS', align: 'center', info: 'Task status' }
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
                resource: true,
                orderNo: true,
                moDeadline: true,
                delDeadline: true,
                product: true,
                qty: true,
                operation: true,
                type: true,
                time: true,
                assigned: true,
                status: true
            });
            setColumnWidths({
                resource: 120,
                orderNo: 100,
                moDeadline: 120,
                delDeadline: 120,
                product: 200,
                qty: 120,
                operation: 150,
                type: 100,
                time: 120,
                assigned: 150,
                status: 80
            });
            setColumnOrder([
                'resource', 'orderNo', 'moDeadline', 'delDeadline', 'product',
                'qty', 'operation', 'type', 'time', 'assigned', 'status'
            ]);
            setContextMenu(null);
        } catch (error) {
            console.error('Failed to reset preferences:', error);
        }
    };

    // Close context menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            const contextMenuEl = document.getElementById('tasks-context-menu');

            if (contextMenu && contextMenuEl && !contextMenuEl.contains(target)) {
                setContextMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [contextMenu]);

    // Load tasks data
    useEffect(() => {
        async function loadTasks() {
            if (tasks.length === 0) {
                setInitialLoading(true);
            } else {
                setIsRefreshing(true);
            }

            try {
                const data = await fetchProductionTasks();
                if (data) {
                    setTasks(data);
                    setTotalCount(data.length);
                    setTotalPages(Math.ceil(data.length / pageSize));
                }
            } catch (error) {
                console.error("Failed to load tasks", error);
            } finally {
                setInitialLoading(false);
                setIsRefreshing(false);
            }
        }
        loadTasks();
    }, [activeStatus]);

    // Filtering & Pagination Logic
    const filteredTasks = useMemo(() => {
        let result = tasks;

        // Filter by Status (Open/Done)
        result = result.filter(task => {
            const isDone = task.status === 'done';
            if (activeStatus === 'Open') return !isDone;
            if (activeStatus === 'Done') return isDone;
            return true;
        });

        // Apply Column Filters (Smart/Partial Match)
        if (Object.values(filters).some(f => f)) {
            result = result.filter(task => {
                const matchText = (text: string | number | null | undefined, filter: string) => {
                    if (!filter) return true;
                    if (text === null || text === undefined) return false;
                    return text.toString().toLowerCase().includes(filter.toLowerCase().trim());
                };

                return (
                    matchText(task.resource, filters.resource) &&
                    matchText(task.orderNo, filters.orderNo) &&
                    matchText(task.productionDeadline, filters.moDeadline) &&
                    matchText(task.deliveryDeadline, filters.delDeadline) &&
                    matchText(task.productName, filters.product) &&
                    matchText(`${task.completedQuantity}/${task.plannedQuantity}`, filters.qty) &&
                    matchText(task.operation, filters.operation) &&
                    matchText(task.type, filters.type) &&
                    matchText(formatTime(task.plannedTimeSeconds), filters.time) &&
                    matchText(task.operatorName, filters.assigned)
                );
            });
        }

        return result;
    }, [tasks, activeStatus, filters]);

    // Paginated tasks
    const paginatedTasks = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredTasks.slice(start, start + pageSize);
    }, [filteredTasks, currentPage, pageSize]);

    // Total planned time calculation
    const totalPlannedSeconds = useMemo(() => {
        return filteredTasks.reduce((acc, t) => acc + (t.plannedTimeSeconds || 0), 0);
    }, [filteredTasks]);

    // Update pagination when filtered results change
    useEffect(() => {
        setTotalCount(filteredTasks.length);
        setTotalPages(Math.ceil(filteredTasks.length / pageSize));
    }, [filteredTasks]);

    // Reset page on status change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeStatus]);

    // Drag-to-Scroll Handlers
    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
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
        if (paginatedTasks.length === 0) return;
        if (selectedTasks.length === paginatedTasks.length) setSelectedTasks([]);
        else setSelectedTasks(paginatedTasks.map(t => t.id));
    };

    const toggleSelect = (id: string) => {
        if (selectedTasks.includes(id)) setSelectedTasks(selectedTasks.filter(sid => sid !== id));
        else setSelectedTasks([...selectedTasks, id]);
    };

    const handleRowClick = (task: ProductionTask, e: React.MouseEvent) => {
        if (wasDragging) return;

        const target = e.target as HTMLElement;
        if (target.closest('input') || target.closest('button') || target.closest('a')) {
            return;
        }
        router.push(`/make/mo/${task.manufacturingOrderId}`);
    };

    // Handle task status change
    const handleTaskStatusChange = async (taskId: string, newStatus: string) => {
        console.log('[Tasks] Updating status:', { taskId, newStatus });

        // Optimistic update
        setTasks(prev => prev.map(task =>
            task.id === taskId ? { ...task, status: newStatus as ProductionTask['status'] } : task
        ));

        // Update in database - tasks are stored in manufacturing_order_operations table
        const { error } = await supabase
            .from('manufacturing_order_operations')
            .update({ status: newStatus })
            .eq('id', taskId);

        if (error) {
            console.error('[Tasks] Failed to update status:', error);
            // Revert on error - reload tasks
            const data = await fetchProductionTasks();
            setTasks(data);
        } else {
            console.log('[Tasks] Status updated successfully');
        }
    };

    // Filter Change Handler
    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Get unique resources for display
    const resources = useMemo(() => {
        const res = new Set(tasks.map(t => t.resource));
        return Array.from(res).filter(Boolean).sort();
    }, [tasks]);

    // Only show full skeleton on initial load
    if (initialLoading && tasks.length === 0) {
        return (
            <div className="flex-1 p-4">
                <TableSkeleton rows={15} />
            </div>
        );
    }

    return (
        <div
            className="w-full h-full flex flex-col bg-background relative"
            onContextMenu={handleContextMenu}
        >
            {/* Context Menu */}
            {contextMenu && (
                <div
                    id="tasks-context-menu"
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
                        {allColumns.filter(col => col.key !== 'checkbox').map(col => (
                            <label
                                key={col.key}
                                className={cn(
                                    menuItemStyles,
                                    col.required && "opacity-50 cursor-not-allowed"
                                )}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Checkbox
                                    checked={visibleColumns[col.key] || col.required}
                                    onCheckedChange={() => {
                                        if (!col.required) toggleColumn(col.key);
                                    }}
                                    disabled={col.required}
                                    className="size-3.5 rounded-sm border-[#3a3a38] data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18]"
                                />
                                <span className={cn("text-xs", col.required ? "text-gray-500" : "text-white")}>
                                    {col.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Header Controls (Tabs & Filters) */}
            <div className="flex flex-col border-b border-[#3a3a38] bg-[#1a1a18] shrink-0">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-4">
                        <div className="flex rounded-md bg-secondary/40 p-0.5">
                            <button
                                onClick={() => setActiveStatus('Open')}
                                className={cn(
                                    "px-3 py-0.5 font-medium rounded-sm transition-all text-xs",
                                    activeStatus === 'Open'
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                Open
                            </button>
                            <button
                                onClick={() => setActiveStatus('Done')}
                                className={cn(
                                    "px-3 py-0.5 font-medium rounded-sm transition-all text-xs",
                                    activeStatus === 'Done'
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                Done
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Resource Filter Dropdown */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center justify-between gap-2 px-3 py-1.5 bg-[#2a2a28] border border-[#3a3a38] rounded min-w-[140px] text-white hover:bg-[#323230] transition-colors text-xs whitespace-nowrap">
                                    <span>
                                        {filters.resource || 'Resource -'}
                                    </span>
                                    <ChevronDown size={14} className="text-gray-400" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[#1e1e1e] border-[#3a3a38] min-w-[200px] p-1 shadow-xl" align="end">
                                <DropdownMenuLabel className="text-[#7a7974] text-[10px] font-bold uppercase tracking-widest px-2 py-1.5 selection:bg-transparent">
                                    Filter by Resource
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-[#3a3a38] mx-1" />
                                <DropdownMenuItem onClick={() => handleFilterChange('resource', '')} className="text-[#faf9f5] hover:bg-[#2a2a28] cursor-pointer text-xs rounded-sm py-1.5 focus:bg-[#2a2a28] px-3">
                                    All Resources
                                </DropdownMenuItem>
                                {resources.map(res => (
                                    <DropdownMenuItem key={res} onClick={() => handleFilterChange('resource', res)} className="text-[#faf9f5] hover:bg-[#2a2a28] cursor-pointer text-xs rounded-sm py-1.5 focus:bg-[#2a2a28] px-3">
                                        {res}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Location Dropdown - Mocked for consistency */}
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center justify-between gap-2 px-3 py-1.5 bg-[#2a2a28] border border-[#3a3a38] rounded min-w-[140px] text-white hover:bg-[#323230] transition-colors text-xs">
                                    <span>MMH Kelowna</span>
                                    <ChevronDown size={14} className="text-gray-400" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[#1e1e1e] border-[#3a3a38] min-w-[200px] p-1 shadow-xl" align="end">
                                <DropdownMenuLabel className="text-[#7a7974] text-[10px] font-bold uppercase tracking-widest px-2 py-1.5 selection:bg-transparent">
                                    Filter by Location
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-[#3a3a38] mx-1" />
                                <DropdownMenuItem className="text-[#faf9f5] hover:bg-[#2a2a28] focus:bg-[#2a2a28] cursor-pointer py-1.5 px-3 text-xs rounded-sm">
                                    All locations
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-[#faf9f5] hover:bg-[#2a2a28] focus:bg-[#2a2a28] cursor-pointer py-1.5 px-3 text-xs rounded-sm">
                                    MMH Kelowna
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <button className="bg-[#d97757] text-white px-4 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-[#c66a4d] shadow-sm transition-colors relative z-10 cursor-pointer" onClick={() => router.push('/make/mo/new')}>
                            <Plus size={14} />
                            + Manufacturing Order
                        </button>
                    </div>
                </div>

                {/* Sub-header (Total Count & Actions) */}
                {selectedTasks.length > 0 ? (
                    <div className="px-4 py-2 border-b border-[#3a3a38]/50 text-[11px] text-muted-foreground flex items-center justify-between bg-muted/5 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="flex items-center gap-4">
                            <span className="text-[#d97757] font-medium">{selectedTasks.length} selected</span>
                            <div className="h-4 w-px bg-[#3a3a38]/50"></div>
                            <button className="hover:text-foreground transition-colors hidden md:block">Bulk edit</button>
                            <button className="hover:text-foreground transition-colors hidden md:block">Change status</button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="hover:text-foreground transition-colors"><Printer className="w-3.5 h-3.5" /></button>
                        </div>
                    </div>
                ) : (
                    <div className="px-4 pb-2 border-b border-[#3a3a38]/50 text-muted-foreground flex items-center justify-between bg-muted/5">
                        <div className="flex items-center gap-4">
                            <span className="text-[14px] font-bold text-[#faf9f5]">{totalCount} tasks</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => console.log('[Tasks] Export clicked')}
                                className="p-1.5 border border-[#3a3a38] rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                title="Export to CSV"
                            >
                                <Download size={14} />
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="p-1.5 border border-[#3a3a38] rounded hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
                                title="Print"
                            >
                                <Printer size={14} />
                            </button>
                        </div>
                    </div>
                )}
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
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>

                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead className="sticky top-0 z-20 shadow-sm">
                        <tr className="border-b border-[#3a3a38]/50 bg-[#222220] h-8">
                            {/* Checkbox column */}
                            <th
                                style={{ width: 40, minWidth: 40 }}
                                className="px-2 h-8 bg-[#222220] border-r border-[#3a3a38]/50 text-center sticky left-0 z-30"
                            >
                                <Checkbox
                                    className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-[#3a3a38] size-4"
                                    checked={paginatedTasks.length > 0 && selectedTasks.length === paginatedTasks.length}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </th>
                            {/* Columns Headers */}
                            {allColumns.filter(c => c.key !== 'checkbox').map((col) => {
                                if (!visibleColumns[col.key]) return null;

                                return (
                                    <th
                                        key={col.key}
                                        style={{ width: columnWidths[col.key], minWidth: columnWidths[col.key] }}
                                        className={cn(
                                            "px-3 align-middle font-medium text-[#7a7974] uppercase tracking-wider text-[11px] border-r border-[#3a3a38]/50 select-none bg-[#222220] relative group/header",
                                            col.align === 'center' ? 'text-center' : 'text-left'
                                        )}
                                    >
                                        <div className={cn("flex items-center gap-1", col.align === 'center' && "justify-center")}>
                                            <span>{col.label}</span>
                                            {col.info && (
                                                <TooltipProvider delayDuration={300}>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Info size={11} className="text-[#7a7974]/30 hover:text-[#7a7974] transition-colors" />
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-[#1e1e1e] border-[#3a3a38] text-xs text-white">
                                                            <p>{col.info}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
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
                        <tr className="border-b border-[#3a3a38]/50 bg-[#1a1a18] sticky top-8 z-20">
                            <th className="p-0.5 bg-[#1a1a18] border-r border-[#3a3a38]/50 sticky left-0 z-30"></th>
                            {allColumns.filter(c => c.key !== 'checkbox').map((col) => {
                                if (!visibleColumns[col.key]) return null;

                                return (
                                    <th
                                        key={`filter-${col.key}`}
                                        style={{ width: columnWidths[col.key], minWidth: columnWidths[col.key] }}
                                        className="p-0.5 px-2 border-r border-[#3a3a38]/50 bg-[#1a1a18]"
                                    >
                                        <input
                                            className="w-full px-2 py-0.5 border border-[#3a3a38] rounded-sm text-[11px] font-normal bg-background focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                                            placeholder="Filter"
                                            spellCheck={false}
                                            value={filters[col.key as keyof FilterState] || ''}
                                            onChange={(e) => handleFilterChange(col.key as keyof FilterState, e.target.value)}
                                        />
                                    </th>
                                );
                            })}
                            <th className="p-0.5 bg-[#1a1a18]"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#3a3a38] bg-background">
                        <tr className="bg-secondary/10 border-b border-[#3a3a38] font-semibold text-[12px]">
                            <td className="px-4 py-2 border-r border-[#3a3a38]/50"></td>
                            {visibleColumns.resource && (
                                <td className="px-3 py-2 border-r border-[#3a3a38]/50 text-muted-foreground uppercase tracking-wider">
                                    Total
                                </td>
                            )}
                            {visibleColumns.orderNo && <td className="px-3 py-2 border-r border-border/50"></td>}
                            {visibleColumns.moDeadline && <td className="px-3 py-2 border-r border-border/50"></td>}
                            {visibleColumns.delDeadline && <td className="px-3 py-2 border-r border-border/50"></td>}
                            {visibleColumns.product && <td className="px-3 py-2 border-r border-border/50"></td>}
                            {visibleColumns.qty && <td className="px-3 py-2 border-r border-border/50"></td>}
                            {visibleColumns.operation && <td className="px-3 py-2 border-r border-border/50"></td>}
                            {visibleColumns.type && <td className="px-3 py-2 border-r border-border/50"></td>}
                            {visibleColumns.time && (
                                <td className="px-3 py-2 border-r border-border/50 text-foreground font-mono">
                                    {formatTime(totalPlannedSeconds)}
                                </td>
                            )}
                            {visibleColumns.assigned && <td className="px-3 py-2 border-r border-border/50"></td>}
                            {visibleColumns.status && <td className="px-3 py-2 border-r border-border/50"></td>}
                            <td className="px-3 py-2"></td>
                        </tr>

                        {/* Data Rows */}
                        {paginatedTasks.map((task) => (
                            <tr
                                key={task.id}
                                onClick={(e) => handleRowClick(task, e)}
                                className={cn(
                                    "h-10 hover:bg-secondary/20 transition-colors group cursor-pointer border-b border-[#3a3a38]/50",
                                    selectedTasks.includes(task.id) && "bg-[#2a3a4a]/40"
                                )}
                            >
                                <td className="px-4 py-1 border-r border-[#3a3a38]/50">
                                    <div className="flex justify-center">
                                        <Checkbox
                                            className="data-[state=checked]:!bg-[#a5d6ff] data-[state=checked]:!border-[#a5d6ff] data-[state=checked]:!text-[#1a1a18] border-muted-foreground size-4"
                                            checked={selectedTasks.includes(task.id)}
                                            onCheckedChange={() => toggleSelect(task.id)}
                                        />
                                    </div>
                                </td>

                                {visibleColumns.resource && (
                                    <td className="px-3 py-1 text-[11px] font-bold text-muted-foreground uppercase border-r border-border/50 truncate max-w-[120px]">
                                        {task.resource || '-'}
                                    </td>
                                )}

                                {visibleColumns.orderNo && (
                                    <td className="px-3 py-1 border-r border-border/50">
                                        <Link
                                            href={`/make/mo/${task.manufacturingOrderId}`}
                                            className="text-[#d97757] hover:underline font-bold text-xs"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {task.orderNo}
                                        </Link>
                                    </td>
                                )}

                                {visibleColumns.moDeadline && (
                                    <td className="px-3 py-1 text-xs border-r border-border/50">
                                        {task.productionDeadline || '-'}
                                    </td>
                                )}

                                {visibleColumns.delDeadline && (
                                    <td className="px-3 py-1 text-xs border-r border-border/50">
                                        {task.deliveryDeadline || '-'}
                                    </td>
                                )}

                                {visibleColumns.product && (
                                    <td className="px-3 py-1 text-sm border-r border-border/50 font-medium truncate max-w-[200px]">
                                        <span className="text-foreground">
                                            {task.productName}
                                        </span>
                                    </td>
                                )}

                                {visibleColumns.qty && (
                                    <td className="px-3 py-1 text-xs border-r border-border/50">
                                        <span className="text-foreground">{task.completedQuantity} / {task.plannedQuantity}</span>
                                        <span className="text-muted-foreground ml-1">{task.uom}</span>
                                    </td>
                                )}

                                {visibleColumns.operation && (
                                    <td className="px-3 py-1 text-[11px] font-bold uppercase tracking-tight border-r border-border/50 truncate max-w-[150px]">
                                        {task.operation}
                                    </td>
                                )}

                                {visibleColumns.type && (
                                    <td className="px-3 py-1 text-xs text-muted-foreground border-r border-border/50">
                                        {task.type || '-'}
                                    </td>
                                )}

                                {visibleColumns.time && (
                                    <td className="px-3 py-1 text-xs font-mono text-foreground border-r border-border/50">
                                        {formatTime(task.plannedTimeSeconds)}
                                    </td>
                                )}

                                {visibleColumns.assigned && (
                                    <td className="px-3 py-1 border-r border-border/50">
                                        <div className="flex gap-1 overflow-hidden">
                                            {task.operators && task.operators.length > 0 ? (
                                                task.operators.map(op => (
                                                    <span key={op} className="px-1.5 py-0.5 bg-secondary rounded text-[10px] flex items-center gap-1 border border-border">
                                                        <User size={10} className="text-primary" />
                                                        {op}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </div>
                                    </td>
                                )}

                                {visibleColumns.status && (
                                    <td className="px-3 py-1 border-r border-border/50 text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    className={cn(
                                                        "px-2.5 py-1 rounded-md text-[11px] font-medium border inline-flex items-center gap-2 transition-all",
                                                        task.status === 'done'
                                                            ? "bg-[#1a2e1a] text-[#8aaf6e] border-[#8aaf6e]/50 shadow-[0_0_8px_rgba(138,175,110,0.3)] hover:shadow-[0_0_12px_rgba(138,175,110,0.4)]"
                                                            : task.status === 'work_in_progress'
                                                                ? "bg-[#2e2a1a] text-[#bb8b5d] border-[#bb8b5d]/50 shadow-[0_0_8px_rgba(187,139,93,0.3)] hover:shadow-[0_0_12px_rgba(187,139,93,0.4)]"
                                                                : task.status === 'partially_complete'
                                                                    ? "bg-[#2e2a1a] text-[#bb8b5d] border-[#bb8b5d]/50 shadow-[0_0_8px_rgba(187,139,93,0.3)] hover:shadow-[0_0_12px_rgba(187,139,93,0.4)]"
                                                                    : task.status === 'blocked'
                                                                        ? "bg-[#2e1a1a] text-[#ff7b6f] border-[#ff7b6f]/50 shadow-[0_0_8px_rgba(255,123,111,0.3)] hover:shadow-[0_0_12px_rgba(255,123,111,0.4)]"
                                                                        : "bg-[#262624] text-[#9a9a94] border-[#4a4a48] shadow-[0_0_6px_rgba(154,154,148,0.15)] hover:shadow-[0_0_10px_rgba(154,154,148,0.25)]"
                                                    )}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <span className={cn(
                                                        "w-2 h-2 rounded-full",
                                                        task.status === 'done' ? "bg-[#8aaf6e] shadow-[0_0_6px_rgba(138,175,110,0.8)]" :
                                                            task.status === 'work_in_progress' ? "bg-[#bb8b5d] shadow-[0_0_6px_rgba(187,139,93,0.8)]" :
                                                                task.status === 'partially_complete' ? "bg-[#bb8b5d] shadow-[0_0_6px_rgba(187,139,93,0.8)]" :
                                                                    task.status === 'blocked' ? "bg-[#ff7b6f] shadow-[0_0_6px_rgba(255,123,111,0.8)]" :
                                                                        "bg-[#7a7974] shadow-[0_0_4px_rgba(122,121,116,0.5)]"
                                                    )} />
                                                    <span>
                                                        {task.status === 'done' ? 'Completed' :
                                                            task.status === 'work_in_progress' ? 'In progress' :
                                                                task.status === 'partially_complete' ? 'Partially complete' :
                                                                    task.status === 'blocked' ? 'Blocked' :
                                                                        'Not started'}
                                                    </span>
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="center" className="w-40 bg-[#1e1e1e] border-gray-700" onClick={(e) => e.stopPropagation()}>
                                                <DropdownMenuLabel className="text-gray-400 text-[11px] uppercase tracking-wider">Status</DropdownMenuLabel>
                                                <DropdownMenuSeparator className="bg-gray-700" />
                                                <DropdownMenuItem
                                                    className="text-white hover:bg-[#2a2a28] text-xs flex items-center gap-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleTaskStatusChange(task.id, 'not_started');
                                                    }}
                                                >
                                                    <span className="w-2 h-2 rounded-full bg-[#7a7974] shadow-[0_0_4px_rgba(122,121,116,0.6)]" />
                                                    Not started
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-white hover:bg-[#2a2a28] text-xs flex items-center gap-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleTaskStatusChange(task.id, 'work_in_progress');
                                                    }}
                                                >
                                                    <span className="w-2 h-2 rounded-full bg-[#bb8b5d] shadow-[0_0_4px_rgba(187,139,93,0.8)]" />
                                                    In progress
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-white hover:bg-[#2a2a28] text-xs flex items-center gap-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleTaskStatusChange(task.id, 'partially_complete');
                                                    }}
                                                >
                                                    <span className="w-2 h-2 rounded-full bg-[#bb8b5d] shadow-[0_0_4px_rgba(187,139,93,0.8)]" />
                                                    Partially complete
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-white hover:bg-[#2a2a28] text-xs flex items-center gap-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleTaskStatusChange(task.id, 'done');
                                                    }}
                                                >
                                                    <span className="w-2 h-2 rounded-full bg-[#8aaf6e] shadow-[0_0_4px_rgba(138,175,110,0.8)]" />
                                                    Completed
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-white hover:bg-[#2a2a28] text-xs flex items-center gap-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleTaskStatusChange(task.id, 'blocked');
                                                    }}
                                                >
                                                    <span className="w-2 h-2 rounded-full bg-[#ff7b6f] shadow-[0_0_4px_rgba(255,123,111,0.8)]" />
                                                    Blocked
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                )}

                                <td className="px-3 py-1 text-right">
                                    <button className="p-1 hover:bg-secondary rounded transition-colors text-muted-foreground opacity-0 group-hover:opacity-100">
                                        <MoreHorizontal size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {paginatedTasks.length === 0 && (
                            <tr>
                                <td colSpan={allColumns.length + 2} className="p-8 text-center text-muted-foreground italic text-xs">
                                    No tasks found.
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
