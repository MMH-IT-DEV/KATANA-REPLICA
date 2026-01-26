'use client';

import { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, GripVertical, ChevronDown, ChevronRight, MapPin, HelpCircle, Check } from 'lucide-react';
import HelpTooltip from '@/components/ui/HelpTooltip';
import { DeleteConfirmDialog } from '@/components/ui/DeleteConfirmDialog';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User as UserIcon } from 'lucide-react';
import { SearchableSelect } from '@/components/ui/SearchableSelect';

interface Address {
    street: string;
    details: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface Warehouse {
    id: string;
    name: string;
    legalName: string;
    address: string;
    addressParts: Address;
    sell: boolean;
    make: boolean;
    buy: boolean;
    bins: string[];
    users: string[]; // List of user IDs
}

const emptyAddress: Address = {
    street: '',
    details: '',
    city: '',
    state: '',
    zip: '',
    country: 'Canada'
};

const mockWarehouses: Warehouse[] = [
    {
        id: '1',
        name: 'MMH Kelowna',
        legalName: 'MYMAGICHEALER NATURAL CORPORATION',
        address: '1625 Dilworth Drive, 201, Kelowna, BC V1Y 7V3, Canada',
        addressParts: {
            street: '1625 Dilworth Drive',
            details: '201',
            city: 'Kelowna',
            state: 'BC',
            zip: 'V1Y 7V3',
            country: 'Canada'
        },
        sell: true,
        make: true,
        buy: true,
        bins: ['0'],
        users: ['1', '2', '3']
    },
    {
        id: '2',
        name: 'Storage Warehouse',
        legalName: 'Fripp',
        address: '1005 Ethel Street, Kelowna, BC V1Y 2W3, Canada',
        addressParts: {
            street: '1005 Ethel Street',
            details: '',
            city: 'Kelowna',
            state: 'BC',
            zip: 'V1Y 2W3',
            country: 'Canada'
        },
        sell: true,
        make: false,
        buy: true,
        bins: [],
        users: ['1']
    },
    {
        id: '3',
        name: 'Amazon USA',
        legalName: 'Amazon USA FBA',
        address: 'Enter address',
        addressParts: emptyAddress,
        sell: true,
        make: false,
        buy: true,
        bins: [],
        users: ['1']
    },
    {
        id: '4',
        name: 'Shopify',
        legalName: 'Shopify',
        address: 'Enter address',
        addressParts: emptyAddress,
        sell: true,
        make: false,
        buy: true,
        bins: [],
        users: ['1']
    },
];

const mockUsers = [
    { id: '1', name: 'MMH KELOWNA', isOwner: true },
    { id: '2', name: 'Harkirat Brar', isOwner: false },
    { id: '3', name: 'Erik Demchuk', isOwner: false },
    { id: '4', name: 'Robyn Bepple', isOwner: false },
];

const MIN_COLUMN_WIDTH = 150;
const INITIAL_COLUMN_WIDTHS = {
    name: 220,
    legalName: 220,
    address: 300,
    functions: 190
};

export default function Locations() {
    const [subTab, setSubTab] = useState<'warehouse' | 'bins' | 'defaults'>('warehouse');
    const [warehouses, setWarehouses] = useState<Warehouse[]>(mockWarehouses);
    const [expandedWarehouses, setExpandedWarehouses] = useState<string[]>([]);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Inline Editing State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editField, setEditField] = useState<'name' | 'legalName' | null>(null);
    const [editValue, setEditValue] = useState('');

    // Address Modal State
    const [addressWarehouseId, setAddressWarehouseId] = useState<string | null>(null);
    const [tempAddress, setTempAddress] = useState<Address>(emptyAddress);

    // User Access Modal State
    const [userAccessWarehouseId, setUserAccessWarehouseId] = useState<string | null>(null);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

    // Row Reordering State
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [draggedBinIndex, setDraggedBinIndex] = useState<{ warehouseId: string, index: number } | null>(null);
    const [dragOverBinIndex, setDragOverBinIndex] = useState<{ warehouseId: string, index: number } | null>(null);

    // Location Delete State
    const [deleteWarehouseId, setDeleteWarehouseId] = useState<string | null>(null);

    // Default Locations State
    const [defaultSalesLocationId, setDefaultSalesLocationId] = useState<string>('4'); // Shopify
    const [defaultManufacturingLocationId, setDefaultManufacturingLocationId] = useState<string>('1'); // MMH Kelowna
    const [defaultPurchasesLocationId, setDefaultPurchasesLocationId] = useState<string>('1'); // MMH Kelowna

    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    // Column Resizing State (Ported from ItemsTable for smoothness)
    const [columnWidths, setColumnWidths] = useState(INITIAL_COLUMN_WIDTHS);
    const resizingRef = useRef<{ column: keyof typeof INITIAL_COLUMN_WIDTHS; startX: number; startWidth: number } | null>(null);
    const handleMouseMoveRef = useRef<((e: MouseEvent) => void) | null>(null);
    const handleMouseUpRef = useRef<(() => void) | null>(null);

    const handleResizeStart = (e: React.MouseEvent, column: keyof typeof INITIAL_COLUMN_WIDTHS) => {
        e.preventDefault();
        e.stopPropagation();

        const startWidth = columnWidths[column];
        resizingRef.current = { column, startX: e.clientX, startWidth };

        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        const handleMouseMove = (e: MouseEvent) => {
            if (!resizingRef.current) return;

            // Use requestAnimationFrame for smooth updates
            requestAnimationFrame(() => {
                if (!resizingRef.current) return;
                const current = resizingRef.current;

                const diff = e.clientX - current.startX;
                const newWidth = Math.max(MIN_COLUMN_WIDTH, current.startWidth + diff);

                setColumnWidths(prev => ({
                    ...prev,
                    [current.column]: newWidth
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

    const toggleExpanded = (id: string) => {
        setExpandedWarehouses(prev => {
            const isExpanding = !prev.includes(id);
            if (isExpanding) {
                setWarehouses(current => current.map(w => {
                    if (w.id === id && w.bins.length === 0) {
                        return { ...w, bins: [''] };
                    }
                    return w;
                }));
            }
            return isExpanding ? [...prev, id] : prev.filter(wId => wId !== id);
        });
    };

    const handleToggleFunction = (id: string, func: 'sell' | 'make' | 'buy') => {
        setWarehouses(prev => prev.map(w =>
            w.id === id ? { ...w, [func]: !w[func] } : w
        ));
    };

    const handleAddLocation = () => {
        const newLocation: Warehouse = {
            id: crypto.randomUUID(),
            name: 'New Location',
            legalName: '',
            address: 'Enter address',
            addressParts: emptyAddress,
            sell: true,
            make: false,
            buy: true,
            bins: [],
            users: []
        };
        setWarehouses(prev => [...prev, newLocation]);

        // Auto-start editing name
        setEditingId(newLocation.id);
        setEditField('name');
        setEditValue('New Location');
    };

    const handleConfirmDeleteLocation = () => {
        if (deleteWarehouseId) {
            setWarehouses(prev => prev.filter(w => w.id !== deleteWarehouseId));
            setDeleteWarehouseId(null);
        }
    };

    const handleStartEdit = (warehouse: Warehouse, field: 'name' | 'legalName') => {
        setEditingId(warehouse.id);
        setEditField(field);
        setEditValue(field === 'name' ? warehouse.name : warehouse.legalName);
    };

    const handleSaveEdit = () => {
        if (editingId && editField) {
            setWarehouses(prev => prev.map(w => {
                if (w.id === editingId) {
                    return { ...w, [editField]: editValue };
                }
                return w;
            }));
        }
        setEditingId(null);
        setEditField(null);
        setEditValue('');
    };

    const handleOpenAddress = (warehouse: Warehouse) => {
        setAddressWarehouseId(warehouse.id);
        setTempAddress(warehouse.addressParts);
    };

    const handleSaveAddress = () => {
        if (addressWarehouseId) {
            const formattedAddress = `${tempAddress.street}${tempAddress.details ? ', ' + tempAddress.details : ''}, ${tempAddress.city}, ${tempAddress.state} ${tempAddress.zip}, ${tempAddress.country}`;
            setWarehouses(prev => prev.map(w => {
                if (w.id === addressWarehouseId) {
                    return { ...w, addressParts: tempAddress, address: formattedAddress };
                }
                return w;
            }));
        }
        setAddressWarehouseId(null);
    };

    const handleRemoveAddress = () => {
        if (addressWarehouseId) {
            setWarehouses(prev => prev.map(w => {
                if (w.id === addressWarehouseId) {
                    return { ...w, addressParts: emptyAddress, address: 'Enter address' };
                }
                return w;
            }));
        }
        setAddressWarehouseId(null);
    };

    const handleOpenUserAccess = (warehouse: Warehouse) => {
        setUserAccessWarehouseId(warehouse.id);
        setSelectedUserIds(warehouse.users);
    };

    const handleSaveUserAccess = () => {
        if (userAccessWarehouseId) {
            setWarehouses(prev => prev.map(w => {
                if (w.id === userAccessWarehouseId) {
                    return { ...w, users: selectedUserIds };
                }
                return w;
            }));
        }
        setUserAccessWarehouseId(null);
    };

    const toggleUserAccess = (userId: string) => {
        const user = mockUsers.find(u => u.id === userId);
        if (user?.isOwner) return; // Cannot toggle owner

        setSelectedUserIds(prev =>
            prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
        );
    };

    const addBin = (warehouseId: string) => {
        setWarehouses(prev => prev.map(w => {
            if (w.id === warehouseId) {
                return { ...w, bins: [...w.bins, ''] };
            }
            return w;
        }));
    };

    const deleteBin = (warehouseId: string, binIndex: number) => {
        setWarehouses(prev => prev.map(w => {
            if (w.id === warehouseId) {
                const newBins = [...w.bins];
                newBins.splice(binIndex, 1);
                return { ...w, bins: newBins };
            }
            return w;
        }));
    };

    // Row Drag Handlers
    const handleRowDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        // Optional: Custom drag image or styling
    };

    const handleRowDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOverIndex !== index) {
            setDragOverIndex(index);
        }
    };

    const handleRowDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newWarehouses = [...warehouses];
        const [movedItem] = newWarehouses.splice(draggedIndex, 1);
        newWarehouses.splice(index, 0, movedItem);

        setWarehouses(newWarehouses);
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleRowDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    // Sub-tab: Warehouse
    const renderWarehouseTab = () => (
        <div className="space-y-6">
            <div className="text-sm text-[#7a7974] leading-relaxed max-w-4xl">
                <p>
                    <span className={cn(
                        "transition-opacity duration-200",
                        isTooltipOpen && "opacity-40"
                    )}>
                        Track and manage inventory across multiple locations, such as warehouses or stores. The location names set here will be used in location selection menus.{' '}
                    </span>
                    <HelpTooltip
                        title="Location Management"
                        description="Learn how to configure your warehouses and locations to optimize your inventory tracking."
                        onOpenChange={setIsTooltipOpen}
                    >
                        <span className="text-[#faf9f5] font-medium cursor-pointer">Read more</span>
                    </HelpTooltip>
                </p>
            </div>

            <div className="bg-background rounded-lg border border-border overflow-hidden w-full shadow-sm">
                <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                        <tr className="h-8 bg-[#222220] border-b border-[#3a3a38]/50">
                            <th className="px-3 py-0 w-10 align-middle border-r border-[#3a3a38]/50"></th>
                            <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 relative group/th" style={{ width: columnWidths.name }}>
                                <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px] flex items-center gap-1">
                                    Location name
                                </span>
                                <div
                                    className="absolute right-0 top-0 bottom-0 w-1 hover:bg-[#d97757] cursor-col-resize z-10 transition-colors"
                                    onMouseDown={(e) => handleResizeStart(e, 'name')}
                                />
                            </th>
                            <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 relative group/th" style={{ width: columnWidths.legalName }}>
                                <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px] flex items-center gap-1">
                                    Legal name
                                </span>
                                <div
                                    className="absolute right-0 top-0 bottom-0 w-1 hover:bg-[#d97757] cursor-col-resize z-10 transition-colors"
                                    onMouseDown={(e) => handleResizeStart(e, 'legalName')}
                                />
                            </th>
                            <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 relative group/th" style={{ width: columnWidths.address }}>
                                <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px] flex items-center gap-1">
                                    Address
                                </span>
                                <div
                                    className="absolute right-0 top-0 bottom-0 w-1 hover:bg-[#d97757] cursor-col-resize z-10 transition-colors"
                                    onMouseDown={(e) => handleResizeStart(e, 'address')}
                                />
                            </th>
                            <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 relative group/th" style={{ width: columnWidths.functions }}>
                                <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px] flex items-center gap-1">
                                    Enabled functions
                                </span>
                                <div
                                    className="absolute right-0 top-0 bottom-0 w-1 hover:bg-[#d97757] cursor-col-resize z-10 transition-colors"
                                    onMouseDown={(e) => handleResizeStart(e, 'functions')}
                                />
                            </th>
                            <th className="px-3 py-0 w-20 text-center bg-[#222220]"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3a3a38] text-[13px]">
                        {warehouses.map((w, index) => (
                            <tr
                                key={w.id}
                                draggable
                                onDragStart={(e) => handleRowDragStart(e, index)}
                                onDragOver={(e) => handleRowDragOver(e, index)}
                                onDrop={(e) => handleRowDrop(e, index)}
                                onDragEnd={handleRowDragEnd}
                                className={cn(
                                    "h-10 hover:bg-secondary/20 transition-colors group",
                                    draggedIndex === index && "opacity-50 bg-secondary/10",
                                    dragOverIndex === index && draggedIndex !== index && "border-t-2 border-t-[#d97757]"
                                )}
                            >
                                <td className="px-2 py-1 border-r border-[#3a3a38]/50 text-center cursor-grab active:cursor-grabbing">
                                    <GripVertical size={14} className="text-[#5a5a58] mx-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                                </td>
                                <td className="px-3 py-1 border-r border-[#3a3a38]/50">
                                    {editingId === w.id && editField === 'name' ? (
                                        <input
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={handleSaveEdit}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                                            autoFocus
                                            className="w-full h-7 bg-transparent border border-[#d97757] rounded-sm focus:outline-none focus:border-[#d97757] text-[13px] text-foreground px-2 font-medium"
                                        />
                                    ) : (
                                        <div
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleStartEdit(w, 'name');
                                            }}
                                            className="cursor-pointer text-foreground font-medium h-7 flex items-center px-1 hover:bg-white/[0.03] rounded-sm -ml-1 transition-colors truncate"
                                            title={w.name}
                                        >
                                            {w.name}
                                        </div>
                                    )}
                                </td>
                                <td className="px-3 py-1 border-r border-[#3a3a38]/50">
                                    {editingId === w.id && editField === 'legalName' ? (
                                        <input
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={handleSaveEdit}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                                            autoFocus
                                            className="w-full h-7 bg-transparent border border-[#d97757] rounded-sm focus:outline-none focus:border-[#d97757] text-[13px] text-foreground px-2"
                                        />
                                    ) : (
                                        <div
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleStartEdit(w, 'legalName');
                                            }}
                                            className="cursor-pointer text-foreground h-7 flex items-center px-1 hover:bg-white/[0.03] rounded-sm -ml-1 transition-colors truncate"
                                            title={w.legalName}
                                        >
                                            {w.legalName}
                                        </div>
                                    )}
                                </td>
                                <td className="px-3 py-1 border-r border-[#3a3a38]/50">
                                    <div
                                        onClick={() => handleOpenAddress(w)}
                                        className="flex items-center gap-2 group cursor-pointer hover:bg-white/[0.03] p-1 -m-1 rounded transition-colors max-w-full"
                                    >
                                        <MapPin size={12} className="shrink-0 text-[#7a7974] group-hover:text-[#faf9f5]" />
                                        <span
                                            className={cn(
                                                "truncate block flex-1",
                                                w.address === 'Enter address' ? "text-[#7a7974] italic" : "text-foreground"
                                            )}
                                            title={w.address}
                                        >
                                            {w.address}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-3 py-1 border-r border-[#3a3a38]/50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2 cursor-pointer transition-all" onClick={() => handleToggleFunction(w.id, 'sell')}>
                                                <Checkbox checked={w.sell} className="size-4" />
                                                <span className="text-[13px] font-medium text-foreground">Sell</span>
                                            </div>
                                            <div className="flex items-center gap-2 cursor-pointer transition-all" onClick={() => handleToggleFunction(w.id, 'make')}>
                                                <Checkbox checked={w.make} className="size-4" />
                                                <span className="text-[13px] font-medium text-foreground">Make</span>
                                            </div>
                                            <div className="flex items-center gap-2 cursor-pointer transition-all" onClick={() => handleToggleFunction(w.id, 'buy')}>
                                                <Checkbox checked={w.buy} className="size-4" />
                                                <span className="text-[13px] font-medium text-foreground">Buy</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 py-0 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <button
                                            className="text-[#7a7974] hover:text-[#faf9f5] opacity-0 group-hover:opacity-100 transition-all p-1.5 hover:bg-white/10 rounded-full"
                                            onClick={() => handleOpenUserAccess(w)}
                                            title="Manage user access"
                                        >
                                            <UserIcon size={16} />
                                        </button>
                                        <div className="h-4 w-[1px] bg-[#3a3a38]/50 mx-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <button
                                            className="text-[#ff7b6f] opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#ff7b6f]/10 rounded"
                                            onClick={() => setDeleteWarehouseId(w.id)}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-transparent border-t border-[#3a3a38]">
                            <td colSpan={6} className="p-3">
                                <button
                                    onClick={handleAddLocation}
                                    className="text-[#7a7974] hover:text-[#d97757] hover:bg-white/[0.03] h-8 px-2 text-xs font-medium flex items-center gap-1.5 transition-all rounded"
                                >
                                    <Plus size={14} /> Add new location
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Sub-tab: Storage Bins
    const renderBinsTab = () => (
        <div className="space-y-6">
            <div className="text-sm text-[#7a7974] leading-relaxed max-w-4xl">
                <p>
                    <span className={cn(
                        "transition-opacity duration-200",
                        isTooltipOpen && "opacity-40"
                    )}>
                        Define the designated areas (storage bins) within a warehouse used to organize and track inventory more effectively. Bins can be added by location.{' '}
                    </span>
                    <HelpTooltip
                        title="Storage Bins"
                        description="Storage bins are physical areas within a warehouse. Using bins helps you track inventory at a more granular level and optimize picking routes."
                        onOpenChange={setIsTooltipOpen}
                    >
                        <span className="text-[#faf9f5] font-medium cursor-pointer">Read more</span>
                    </HelpTooltip>
                </p>
            </div>

            <div className="space-y-4 max-w-2xl">
                {warehouses.map(w => (
                    <div key={w.id} className="space-y-2">
                        <button
                            onClick={() => toggleExpanded(w.id)}
                            className="flex items-center gap-2 group w-full text-left"
                        >
                            {expandedWarehouses.includes(w.id) ? <ChevronDown size={16} className="text-[#7a7974]" /> : <ChevronRight size={16} className="text-[#7a7974]" />}
                            <span className="text-sm font-medium text-foreground group-hover:text-[#faf9f5] transition-colors">{w.name}</span>
                        </button>

                        {expandedWarehouses.includes(w.id) && (
                            <div className="ml-6 space-y-3">
                                <div className="bg-background rounded-lg border border-border overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="h-8 bg-[#222220] border-b border-[#3a3a38]/50">
                                                <th className="px-3 py-0 w-10 align-middle border-r border-[#3a3a38]/50"></th>
                                                <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 w-full">
                                                    <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px] flex items-center gap-1">
                                                        Bin name
                                                    </span>
                                                </th>
                                                <th className="px-3 py-0 w-16 text-center bg-[#222220]"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#3a3a38] text-[13px]">
                                            {w.bins.length > 0 ? (
                                                w.bins.map((bin, bIdx) => (
                                                    <tr
                                                        key={bIdx}
                                                        draggable
                                                        onDragStart={(e) => {
                                                            setDraggedBinIndex({ warehouseId: w.id, index: bIdx });
                                                            e.dataTransfer.effectAllowed = 'move';
                                                        }}
                                                        onDragOver={(e) => {
                                                            e.preventDefault();
                                                            setDragOverBinIndex({ warehouseId: w.id, index: bIdx });
                                                        }}
                                                        onDrop={(e) => {
                                                            e.preventDefault();
                                                            if (!draggedBinIndex || draggedBinIndex.warehouseId !== w.id || draggedBinIndex.index === bIdx) return;

                                                            setWarehouses(prev => prev.map(wh => {
                                                                if (wh.id === w.id) {
                                                                    const newBins = [...wh.bins];
                                                                    const [movedItem] = newBins.splice(draggedBinIndex.index, 1);
                                                                    newBins.splice(bIdx, 0, movedItem);
                                                                    return { ...wh, bins: newBins };
                                                                }
                                                                return wh;
                                                            }));
                                                            setDraggedBinIndex(null);
                                                            setDragOverBinIndex(null);
                                                        }}
                                                        onDragEnd={() => {
                                                            setDraggedBinIndex(null);
                                                            setDragOverBinIndex(null);
                                                        }}
                                                        className={cn(
                                                            "h-10 hover:bg-secondary/20 transition-colors group/bin cursor-default",
                                                            draggedBinIndex?.warehouseId === w.id && draggedBinIndex.index === bIdx && "opacity-50",
                                                            dragOverBinIndex?.warehouseId === w.id && dragOverBinIndex.index === bIdx && draggedBinIndex?.index !== bIdx && "border-t-2 border-t-[#d97757]"
                                                        )}
                                                    >
                                                        <td className="px-2 py-1 border-r border-[#3a3a38]/50 text-center cursor-grab active:cursor-grabbing">
                                                            <GripVertical size={14} className="text-[#5a5a58] mx-auto opacity-50 group-hover/bin:opacity-100 transition-opacity" />
                                                        </td>
                                                        <td className="px-3 py-1 border-r border-[#3a3a38]/50">
                                                            <input
                                                                type="text"
                                                                value={bin}
                                                                onChange={(e) => {
                                                                    const newValue = e.target.value;
                                                                    setWarehouses(prev => prev.map(wh => {
                                                                        if (wh.id === w.id) {
                                                                            const newBins = [...wh.bins];
                                                                            newBins[bIdx] = newValue;
                                                                            return { ...wh, bins: newBins };
                                                                        }
                                                                        return wh;
                                                                    }));
                                                                }}
                                                                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-[13px] text-foreground p-0 placeholder:text-[#5a5a58] placeholder:italic"
                                                                placeholder="Bin name..."
                                                            />
                                                        </td>
                                                        <td className="px-2 py-0 text-center">
                                                            <button
                                                                onClick={() => deleteBin(w.id, bIdx)}
                                                                className="text-[#ff7b6f] opacity-0 group-hover/bin:opacity-100 transition-opacity p-1.5 hover:bg-[#ff7b6f]/10 rounded"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={3} className="h-10 text-center text-[#7a7974] text-xs italic">
                                                        No Rows To Show
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <button
                                    onClick={() => addBin(w.id)}
                                    className="text-muted-foreground hover:text-primary hover:bg-secondary/50 h-8 px-2 text-xs font-medium flex items-center gap-1.5 transition-colors rounded"
                                >
                                    <Plus size={14} /> Add row
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    // Sub-tab: Default Locations
    const renderDefaultsTabFixed = () => (
        <div className="space-y-8">
            <div className="text-sm text-[#7a7974] leading-relaxed max-w-4xl">
                <p>
                    Choose the main locations for sales, manufacturing, and purchasing.
                </p>
            </div>

            <div className="max-w-md space-y-6">
                {/* Sales */}
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-[#7a7974] uppercase tracking-wider">Default sales location</label>
                    <SearchableSelect
                        value={defaultSalesLocationId}
                        options={warehouses.map(w => ({ id: w.id, name: w.name }))}
                        onChange={setDefaultSalesLocationId}
                        triggerClassName="h-10 border-[#5a5a58]"
                    />
                </div>

                {/* Manufacturing */}
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-[#7a7974] uppercase tracking-wider">Default manufacturing location</label>
                    <SearchableSelect
                        value={defaultManufacturingLocationId}
                        options={warehouses.map(w => ({ id: w.id, name: w.name }))}
                        onChange={setDefaultManufacturingLocationId}
                        triggerClassName="h-10 border-[#5a5a58]"
                    />
                </div>

                {/* Purchasing */}
                <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-[#7a7974] uppercase tracking-wider">Default purchases location</label>
                    <SearchableSelect
                        value={defaultPurchasesLocationId}
                        options={warehouses.map(w => ({ id: w.id, name: w.name }))}
                        onChange={setDefaultPurchasesLocationId}
                        triggerClassName="h-10 border-[#5a5a58]"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-[1600px] mx-auto p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-xl font-medium text-foreground tracking-tight">Locations</h1>
            </div>

            {/* Sub-tabs Navigation */}
            <div className="flex gap-8 border-b border-[#3a3a38] mb-6">
                <button
                    onClick={() => setSubTab('warehouse')}
                    className={cn(
                        "pb-2 text-sm font-medium transition-all relative",
                        subTab === 'warehouse' ? "text-primary" : "text-[#7a7974] hover:text-foreground"
                    )}
                >
                    Warehouse
                    {subTab === 'warehouse' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                </button>
                <button
                    onClick={() => setSubTab('bins')}
                    className={cn(
                        "pb-2 text-sm font-medium transition-all relative",
                        subTab === 'bins' ? "text-primary" : "text-[#7a7974] hover:text-foreground"
                    )}
                >
                    Storage bins
                    {subTab === 'bins' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                </button>
                <button
                    onClick={() => setSubTab('defaults')}
                    className={cn(
                        "pb-2 text-sm font-medium transition-all relative",
                        subTab === 'defaults' ? "text-primary" : "text-[#7a7974] hover:text-foreground"
                    )}
                >
                    Default locations
                    {subTab === 'defaults' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                </button>
            </div>

            {/* Content Area */}
            <div className="pt-2">
                {subTab === 'warehouse' && renderWarehouseTab()}
                {subTab === 'bins' && renderBinsTab()}
                {subTab === 'defaults' && renderDefaultsTabFixed()}
            </div>

            {/* Address Modal */}
            <Dialog open={!!addressWarehouseId} onOpenChange={(open) => !open && handleSaveAddress()}>
                <DialogContent
                    className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5] max-w-xl p-0 overflow-hidden"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                >
                    <DialogHeader className="p-6 pb-2">
                        <DialogTitle className="text-xl font-medium">Edit address</DialogTitle>
                    </DialogHeader>

                    <div className="px-5 pt-1 pb-4 space-y-4">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-medium text-[#7a7974] uppercase tracking-wider">Street address</Label>
                            <Input
                                value={tempAddress.street}
                                placeholder="Enter street address"
                                onChange={(e) => setTempAddress({ ...tempAddress, street: e.target.value })}
                                autoFocus={false}
                                className="bg-[#262624] border border-[#3a3a38] h-8 text-sm px-3 focus-visible:ring-0 focus-visible:border-[#d97757] focus-visible:bg-[#2a2a28]"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[11px] font-medium text-[#7a7974] uppercase tracking-wider">Additional details</Label>
                            <Input
                                value={tempAddress.details}
                                placeholder="Apartment, suite, or building number"
                                onChange={(e) => setTempAddress({ ...tempAddress, details: e.target.value })}
                                className="bg-[#262624] border border-[#3a3a38] h-8 text-sm px-3 focus-visible:ring-0 focus-visible:border-[#d97757] focus-visible:bg-[#2a2a28]"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label className="text-[11px] font-medium text-[#7a7974] uppercase tracking-wider">City/Town</Label>
                                <Input
                                    value={tempAddress.city}
                                    placeholder="City"
                                    onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })}
                                    className="bg-[#262624] border border-[#3a3a38] h-8 text-sm px-3 focus-visible:ring-0 focus-visible:border-[#d97757] focus-visible:bg-[#2a2a28]"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[11px] font-medium text-[#7a7974] uppercase tracking-wider">State/Region</Label>
                                <Input
                                    value={tempAddress.state}
                                    placeholder="State"
                                    onChange={(e) => setTempAddress({ ...tempAddress, state: e.target.value })}
                                    className="bg-[#262624] border border-[#3a3a38] h-8 text-sm px-3 focus-visible:ring-0 focus-visible:border-[#d97757] focus-visible:bg-[#2a2a28]"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label className="text-[11px] font-medium text-[#7a7974] uppercase tracking-wider">Zip/Postal code</Label>
                                <Input
                                    value={tempAddress.zip}
                                    placeholder="Postal code"
                                    onChange={(e) => setTempAddress({ ...tempAddress, zip: e.target.value })}
                                    className="bg-[#262624] border border-[#3a3a38] h-8 text-sm px-3 focus-visible:ring-0 focus-visible:border-[#d97757] focus-visible:bg-[#2a2a28]"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-[11px] font-medium text-[#7a7974] uppercase tracking-wider">Country</Label>
                                <Input
                                    value={tempAddress.country}
                                    placeholder="Country"
                                    onChange={(e) => setTempAddress({ ...tempAddress, country: e.target.value })}
                                    className="bg-[#262624] border border-[#3a3a38] h-8 text-sm px-3 focus-visible:ring-0 focus-visible:border-[#d97757] focus-visible:bg-[#2a2a28]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-5 py-4 bg-[#1a1a18]">
                        <button
                            type="button"
                            onClick={handleRemoveAddress}
                            className="flex items-center gap-2 text-[#ff7b6f] hover:text-[#e06b60] transition-colors font-medium px-3 py-1.5 hover:bg-[#ff7b6f]/20 rounded"
                        >
                            <Trash2 size={14} /> Delete
                        </button>
                        <div className="flex gap-3">
                            <Button
                                variant="ghost"
                                onClick={() => setAddressWarehouseId(null)}
                                className="h-8 px-4 text-sm font-medium border border-[#3a3a38] hover:bg-white/[0.05] text-[#faf9f5]"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveAddress}
                                className="h-8 px-5 bg-[#d97757] hover:bg-[#c66b4d] text-white text-sm font-medium shadow-sm"
                            >
                                Ok
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* User Access Modal */}
            <Dialog open={!!userAccessWarehouseId} onOpenChange={(open) => !open && setUserAccessWarehouseId(null)}>
                <DialogContent
                    className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5] max-w-md p-0 overflow-hidden"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                >
                    <DialogHeader className="px-3 pt-3 pb-1">
                        <DialogTitle className="text-lg font-medium">Select users</DialogTitle>
                    </DialogHeader>

                    <div className="px-3 pt-0 pb-2 space-y-3">
                        <div className="space-y-1 mb-2">
                            <p className="text-sm text-[#faf9f5]">Edit location visibility for non-owner users.</p>
                            <p className="text-sm text-[#faf9f5]">
                                Note: A user needs to have access to at least one location.
                            </p>
                        </div>

                        <div className="space-y-0.5">
                            {mockUsers.map(user => (
                                <div
                                    key={user.id}
                                    className={cn(
                                        "flex items-center gap-3 p-1.5 rounded-md transition-colors",
                                        user.isOwner ? "opacity-50" : "hover:bg-white/[0.04] cursor-pointer"
                                    )}
                                    onClick={() => !user.isOwner && toggleUserAccess(user.id)}
                                >
                                    <Checkbox
                                        checked={selectedUserIds.includes(user.id)}
                                        disabled={user.isOwner}
                                        className={cn(
                                            "size-4 border-none bg-[#3a3a38] data-[state=checked]:bg-primary",
                                            user.isOwner && "opacity-50"
                                        )}
                                    />
                                    <span className="text-sm">{user.name}</span>
                                    {user.isOwner && <span className="text-sm text-[#7a7974]">(Owner)</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 px-3 py-2 bg-[#1a1a18]">
                        <Button
                            variant="ghost"
                            onClick={() => setUserAccessWarehouseId(null)}
                            className="h-8 px-4 text-sm font-medium border border-[#3a3a38] hover:bg-white/[0.05] text-[#faf9f5]"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveUserAccess}
                            className="h-8 px-5 bg-[#d97757] hover:bg-[#c66b4d] text-white text-sm font-medium shadow-sm"
                        >
                            Apply
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Location Dialog */}
            <DeleteConfirmDialog
                open={!!deleteWarehouseId}
                onOpenChange={(open) => !open && setDeleteWarehouseId(null)}
                onConfirm={handleConfirmDeleteLocation}
                title={`Delete the "${warehouses.find(w => w.id === deleteWarehouseId)?.name}" location`}
                description={
                    <div className="space-y-3">
                        <p>This location may contain scheduled open orders.</p>
                        <p>
                            If you proceed with deletion, <strong className="font-bold">all of the open orders and quantities in stock associated with the location will also be deleted.</strong>
                        </p>
                        <p>This action cannot be undone.</p>
                    </div>
                }
            />
        </div>
    );
}
