'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    ChevronDown,
    Printer,
    MoreVertical,
    X,
    Plus,
    Trash2,
    ExternalLink,
    Loader2,
    Check,
    Copy,
    GripVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from '@/components/ui/checkbox';
import { SearchableSelect } from '@/components/ui/SearchableSelect';
import { Shell } from '@/components/layout/Shell';

interface PurchaseOrderLine {
    id: string;
    variant_id: string;
    item_name: string;
    item_sku: string;
    supplier_item_code: string;
    internal_barcode: string;
    quantity: number;
    quantity_received: number;
    uom: string;
    price_per_unit: number;
    total_price: number;
    tax_rate: string;
    expected_arrival: string;
    landed_cost: number;
}

interface AdditionalCost {
    id: string;
    description: string;
    reference: string;
    distribution_method: string;
    total_price: number;
    tax_rate: string;
}

interface PurchaseOrderData {
    id: string;
    order_no: string;
    supplier_id: string;
    supplier_name: string;
    status: string;
    delivery_status: string;
    expected_arrival_date: string;
    created_at: string;
    currency: string;
    location_id: string;
    location_name: string;
    additional_info: string;
    lines: PurchaseOrderLine[];
    additional_costs: AdditionalCost[];
}

interface Props {
    id: string;
}

const STATUS_OPTIONS = [
    { value: 'not_received', label: 'Not received', color: 'bg-gray-500' },
    { value: 'partially_received', label: 'Partially received', color: 'bg-amber-500' },
    { value: 'received', label: 'Received', color: 'bg-emerald-500' },
];

const LOCATIONS = [
    { id: 'storage', name: 'Storage Warehouse' },
    { id: 'main', name: 'Main Warehouse' },
    { id: 'shopify', name: 'Shopify' },
    { id: 'amazon', name: 'Amazon FBA' },
];

const CURRENCIES = [
    { id: 'USD', name: 'USD' },
    { id: 'CAD', name: 'CAD' },
    { id: 'EUR', name: 'EUR' },
    { id: 'GBP', name: 'GBP' },
];

export function PurchaseOrderDetail({ id }: Props) {
    const router = useRouter();
    const isNew = id === 'new';

    const [loading, setLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
    const [activeTab, setActiveTab] = useState('Order details');
    const [selectedLines, setSelectedLines] = useState<string[]>([]);

    const [order, setOrder] = useState<PurchaseOrderData>({
        id: '',
        order_no: '',
        supplier_id: '',
        supplier_name: '',
        status: 'OPEN',
        delivery_status: 'not_received',
        expected_arrival_date: '',
        created_at: new Date().toISOString().split('T')[0],
        currency: 'USD',
        location_id: '',
        location_name: 'Storage Warehouse',
        additional_info: '',
        lines: [],
        additional_costs: [
            { id: '1', description: 'Shipping', reference: '', distribution_method: 'By value', total_price: 0, tax_rate: '-' }
        ],
    });

    // Load purchase order data
    useEffect(() => {
        async function loadPurchaseOrder() {
            if (isNew) {
                setLoading(false);
                return;
            }

            try {
                const { data: poData, error: poError } = await supabase
                    .from('purchase_orders')
                    .select(`
                        *,
                        suppliers(id, name),
                        locations(id, name)
                    `)
                    .eq('id', id)
                    .single();

                if (poError) throw poError;

                const { data: rowsData, error: rowsError } = await supabase
                    .from('purchase_order_rows')
                    .select(`
                        *,
                        variants(
                            id,
                            sku,
                            items(id, name, uom)
                        )
                    `)
                    .eq('purchase_order_id', id);

                if (rowsError) throw rowsError;

                const lines: PurchaseOrderLine[] = (rowsData || []).map((row: any) => ({
                    id: row.id,
                    variant_id: row.variant_id,
                    item_name: row.variants?.items?.name || '',
                    item_sku: row.variants?.sku || '',
                    supplier_item_code: row.supplier_item_code || '',
                    internal_barcode: row.internal_barcode || '',
                    quantity: row.quantity || 0,
                    quantity_received: row.quantity_received || 0,
                    uom: row.variants?.items?.uom || 'pcs',
                    price_per_unit: row.price_per_unit || 0,
                    total_price: row.total_price || (row.quantity * row.price_per_unit),
                    tax_rate: row.tax_rate || '0% - TAX EXEMPT',
                    expected_arrival: row.expected_arrival || poData.expected_arrival_date || '',
                    landed_cost: row.landed_cost || row.price_per_unit || 0,
                }));

                setOrder({
                    id: poData.id,
                    order_no: poData.order_no,
                    supplier_id: poData.supplier_id,
                    supplier_name: poData.suppliers?.name || '',
                    status: poData.status,
                    delivery_status: poData.status === 'RECEIVED' ? 'received' :
                        poData.status === 'PARTIALLY_RECEIVED' ? 'partially_received' : 'not_received',
                    expected_arrival_date: poData.expected_arrival_date || '',
                    created_at: poData.created_at?.split('T')[0] || '',
                    currency: poData.currency || 'USD',
                    location_id: poData.location_id || '',
                    location_name: poData.locations?.name || 'Storage Warehouse',
                    additional_info: poData.additional_info || '',
                    lines,
                    additional_costs: order.additional_costs,
                });
            } catch (error) {
                console.error('Failed to load purchase order:', error);
            } finally {
                setLoading(false);
            }
        }

        loadPurchaseOrder();
    }, [id, isNew]);

    // Calculate totals
    const totals = useMemo(() => {
        const itemsNotReceived = order.lines.filter(l => l.quantity_received < l.quantity);
        const totalQuantity = itemsNotReceived.reduce((sum, l) => sum + (l.quantity - l.quantity_received), 0);
        const totalPrice = itemsNotReceived.reduce((sum, l) => sum + ((l.quantity - l.quantity_received) * l.price_per_unit), 0);
        const additionalCostsTotal = order.additional_costs.reduce((sum, c) => sum + c.total_price, 0);
        const taxTotal = 0;

        return {
            totalQuantity,
            totalPrice,
            additionalCostsTotal,
            taxTotal,
            grandTotal: totalPrice + additionalCostsTotal + taxTotal,
        };
    }, [order.lines, order.additional_costs]);

    // Handle status change
    const handleStatusChange = async (newStatus: string) => {
        setOrder(prev => ({ ...prev, delivery_status: newStatus }));
        setSaveStatus('saving');

        const dbStatus = newStatus === 'received' ? 'RECEIVED' :
            newStatus === 'partially_received' ? 'PARTIALLY_RECEIVED' : 'OPEN';

        try {
            await supabase
                .from('purchase_orders')
                .update({ status: dbStatus })
                .eq('id', order.id);

            setSaveStatus('saved');
        } catch (error) {
            console.error('Failed to update status:', error);
            setSaveStatus('saved');
        }
    };

    // Handle line update
    const handleLineUpdate = useCallback((lineId: string, field: string, value: any) => {
        setOrder(prev => ({
            ...prev,
            lines: prev.lines.map(line =>
                line.id === lineId
                    ? {
                        ...line,
                        [field]: value,
                        total_price: field === 'quantity' || field === 'price_per_unit'
                            ? (field === 'quantity' ? value : line.quantity) * (field === 'price_per_unit' ? value : line.price_per_unit)
                            : line.total_price
                    }
                    : line
            )
        }));
    }, []);

    // Handle add line
    const handleAddLine = () => {
        const newLine: PurchaseOrderLine = {
            id: crypto.randomUUID(),
            variant_id: '',
            item_name: '',
            item_sku: '',
            supplier_item_code: '',
            internal_barcode: '',
            quantity: 0,
            quantity_received: 0,
            uom: 'pcs',
            price_per_unit: 0,
            total_price: 0,
            tax_rate: '0% - TAX EXEMPT',
            expected_arrival: order.expected_arrival_date,
            landed_cost: 0,
        };
        setOrder(prev => ({ ...prev, lines: [...prev.lines, newLine] }));
    };

    // Handle delete line
    const handleDeleteLine = (lineId: string) => {
        setOrder(prev => ({
            ...prev,
            lines: prev.lines.filter(l => l.id !== lineId)
        }));
        setSelectedLines(prev => prev.filter(id => id !== lineId));
    };

    // Handle additional cost update
    const handleCostUpdate = useCallback((costId: string, field: string, value: any) => {
        setOrder(prev => ({
            ...prev,
            additional_costs: prev.additional_costs.map(cost =>
                cost.id === costId ? { ...cost, [field]: value } : cost
            )
        }));
    }, []);

    // Handle add cost
    const handleAddCost = () => {
        const newCost: AdditionalCost = {
            id: crypto.randomUUID(),
            description: '',
            reference: '',
            distribution_method: 'By value',
            total_price: 0,
            tax_rate: '-',
        };
        setOrder(prev => ({ ...prev, additional_costs: [...prev.additional_costs, newCost] }));
    };

    // Handle delete cost
    const handleDeleteCost = (costId: string) => {
        setOrder(prev => ({
            ...prev,
            additional_costs: prev.additional_costs.filter(c => c.id !== costId)
        }));
    };

    // Handle select all lines
    const handleSelectAllLines = (checked: boolean) => {
        if (checked) {
            setSelectedLines(order.lines.map(l => l.id));
        } else {
            setSelectedLines([]);
        }
    };

    // Handle select single line
    const handleSelectLine = (lineId: string, checked: boolean) => {
        if (checked) {
            setSelectedLines(prev => [...prev, lineId]);
        } else {
            setSelectedLines(prev => prev.filter(id => id !== lineId));
        }
    };

    // Handle delete order
    const handleDeleteOrder = async () => {
        if (!confirm('Are you sure you want to delete this purchase order?')) return;

        try {
            await supabase.from('purchase_orders').delete().eq('id', order.id);
            router.push('/buy');
        } catch (error) {
            console.error('Failed to delete order:', error);
        }
    };

    // Handle duplicate order
    const handleDuplicateOrder = async () => {
        setSaveStatus('saving');
        // Implementation for duplicating order
        setSaveStatus('saved');
    };

    const tabs = ['Order details', 'Additional costs'];

    if (loading) {
        return (
            <Shell activeTab="Buy" activePage="Purchasing">
                <div className="h-full bg-[#1a1a18] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </Shell>
        );
    }

    return (
        <Shell activeTab="Buy" activePage="Purchasing">
            <div className="h-full overflow-y-auto bg-[#1a1a18] font-sans text-[13px] text-[#faf9f5] pb-20 flex flex-col">

            {/* === STICKY HEADER === */}
            <header className="bg-[#1a1a18] sticky top-0 z-30 border-b border-[#3a3a38]">
                <div className="w-full max-w-[1920px] mx-auto px-4 py-3 flex justify-between items-center">

                    {/* Left: Back + Title Area */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full hover:bg-[#222220] text-[#7a7974] transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        <div>
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 text-xs text-[#7a7974] mb-0.5">
                                <Link href="/buy" className="hover:text-[#faf9f5] transition-colors">
                                    Purchasing
                                </Link>
                                <span className="text-[#3a3a38]">/</span>
                                <span>Purchase order</span>
                            </div>

                            {/* Title + Status Badge */}
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-medium text-[#faf9f5] tracking-tight">
                                    {order.order_no || 'New Order'} {order.supplier_name && `- ${order.supplier_name}`}
                                </h1>
                                <span className={cn(
                                    "px-2 py-0.5 rounded text-[11px] font-medium border",
                                    order.delivery_status === 'received'
                                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                        : order.delivery_status === 'partially_received'
                                            ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                )}>
                                    {order.delivery_status === 'received' ? 'Received' :
                                        order.delivery_status === 'partially_received' ? 'Partial' : 'Open'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Actions Toolbar */}
                    <div className="flex items-center gap-2">

                        {/* Status Dropdown */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className={cn(
                                    "px-3 py-1.5 font-medium rounded-md flex items-center gap-2 text-xs transition-colors border",
                                    order.delivery_status === 'received'
                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                                        : order.delivery_status === 'partially_received'
                                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                                            : "bg-[#222220] text-[#7a7974] border-[#3a3a38] hover:bg-[#2a2a28]"
                                )}>
                                    {order.delivery_status === 'received' ? 'Received' :
                                        order.delivery_status === 'partially_received' ? 'Partially received' : 'Not received'}
                                    <ChevronDown size={14} className="opacity-60" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-1 bg-[#1e1e1e] border-[#3a3a38]" align="end" sideOffset={5}>
                                <div className="text-[10px] font-medium text-[#7a7974] uppercase tracking-wider px-2 py-1.5">
                                    Delivery status
                                </div>
                                {STATUS_OPTIONS.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleStatusChange(option.value)}
                                        className={cn(
                                            "w-full px-2 py-1.5 text-sm text-left rounded-sm flex items-center gap-2 transition-colors",
                                            order.delivery_status === option.value
                                                ? "bg-[#2a2a28] text-[#faf9f5]"
                                                : "text-[#faf9f5] hover:bg-[#2a2a28]"
                                        )}
                                    >
                                        <div className={cn("w-2 h-2 rounded-full", option.color)} />
                                        {option.label}
                                        {order.delivery_status === option.value && (
                                            <Check size={14} className="ml-auto text-[#d97757]" />
                                        )}
                                    </button>
                                ))}
                            </PopoverContent>
                        </Popover>

                        {/* Save Status Indicator */}
                        <div className="flex items-center gap-2 mx-2">
                            {saveStatus === 'saving' ? (
                                <Loader2 size={16} className="animate-spin text-[#7a7974]" />
                            ) : (
                                <Check size={14} className="text-emerald-500" strokeWidth={3} />
                            )}
                            <span className="text-xs text-[#7a7974] whitespace-nowrap">
                                {saveStatus === 'saving' ? 'Saving...' : 'All changes saved'}
                            </span>
                        </div>

                        {/* Print */}
                        <button className="p-2 hover:bg-[#222220] rounded-md transition-colors text-[#7a7974]" title="Print">
                            <Printer size={18} />
                        </button>

                        {/* More Options */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="p-2 hover:bg-[#222220] rounded-md transition-colors text-[#7a7974]">
                                    <MoreVertical size={18} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44 bg-[#1e1e1e] border-[#3a3a38]">
                                <DropdownMenuItem
                                    onClick={handleDuplicateOrder}
                                    className="text-[#faf9f5] hover:bg-[#2a2a28] cursor-pointer"
                                >
                                    <Copy className="mr-2 h-4 w-4" />
                                    Duplicate order
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-[#3a3a38]" />
                                <DropdownMenuItem
                                    onClick={handleDeleteOrder}
                                    className="text-red-500 hover:bg-[#2a2a28] cursor-pointer"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete order
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="w-px h-5 bg-[#3a3a38] mx-1" />

                        {/* Close */}
                        <Link
                            href="/buy"
                            className="p-2 hover:bg-[#222220] rounded-md transition-colors text-[#7a7974] hover:text-[#faf9f5]"
                        >
                            <X size={20} />
                        </Link>
                    </div>
                </div>

                {/* Tabs Row */}
                <div className="w-full max-w-[1920px] mx-auto px-4 flex items-center gap-6 mt-2">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "py-2 text-sm font-medium border-b-2 outline-none transition-colors",
                                activeTab === tab
                                    ? "border-[#d97757] text-[#d97757]"
                                    : "border-transparent text-[#7a7974] hover:text-[#faf9f5]"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>

            {/* === MAIN CONTENT === */}
            <main className="w-full max-w-[1920px] mx-auto p-4 space-y-6">

                {activeTab === 'Order details' && (
                    <>
                        {/* === INFO CARD === */}
                        <div className="bg-[#1a1a18] rounded-lg border border-[#3a3a38]">
                            <div className="grid grid-cols-2 divide-x divide-[#3a3a38]">

                                {/* Left Column */}
                                <div className="divide-y divide-[#3a3a38]">
                                    {/* Supplier */}
                                    <div className="p-3">
                                        <label className="text-[10px] font-medium text-[#7a7974] uppercase tracking-wider block mb-1.5">
                                            Supplier
                                        </label>
                                        <Link
                                            href={`/suppliers/${order.supplier_id}`}
                                            className="text-[#d97757] hover:text-[#e08868] font-medium text-sm flex items-center gap-1.5 group"
                                        >
                                            {order.supplier_name || 'Select supplier...'}
                                            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </div>

                                    {/* Order # */}
                                    <div className="p-3">
                                        <label className="text-[10px] font-medium text-[#7a7974] uppercase tracking-wider block mb-1.5">
                                            Order #
                                        </label>
                                        <input
                                            type="text"
                                            value={order.order_no}
                                            onChange={(e) => setOrder(prev => ({ ...prev, order_no: e.target.value }))}
                                            className="w-full bg-transparent text-[#faf9f5] text-sm border-0 focus:outline-none focus:ring-1 focus:ring-[#d97757]/50 rounded px-0 py-0.5"
                                            placeholder="PO-0001"
                                        />
                                    </div>

                                    {/* Ship to */}
                                    <div className="p-3">
                                        <label className="text-[10px] font-medium text-[#7a7974] uppercase tracking-wider block mb-1.5">
                                            Ship to
                                        </label>
                                        <SearchableSelect
                                            value={order.location_name}
                                            options={LOCATIONS}
                                            onChange={(val) => setOrder(prev => ({ ...prev, location_name: val }))}
                                            placeholder="Select location..."
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="divide-y divide-[#3a3a38]">
                                    {/* Expected Arrival + Created Date (side by side) */}
                                    <div className="grid grid-cols-2 divide-x divide-[#3a3a38]">
                                        <div className="p-3">
                                            <label className="text-[10px] font-medium text-[#7a7974] uppercase tracking-wider block mb-1.5">
                                                Expected arrival
                                            </label>
                                            <input
                                                type="date"
                                                value={order.expected_arrival_date}
                                                onChange={(e) => setOrder(prev => ({ ...prev, expected_arrival_date: e.target.value }))}
                                                className={cn(
                                                    "w-full bg-transparent text-sm border-0 focus:outline-none focus:ring-1 focus:ring-[#d97757]/50 rounded px-0 py-0.5",
                                                    order.expected_arrival_date && new Date(order.expected_arrival_date) < new Date()
                                                        ? "text-red-500"
                                                        : "text-[#faf9f5]"
                                                )}
                                            />
                                        </div>
                                        <div className="p-3">
                                            <label className="text-[10px] font-medium text-[#7a7974] uppercase tracking-wider block mb-1.5">
                                                Created
                                            </label>
                                            <span className="text-[#faf9f5] text-sm">
                                                {order.created_at}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Currency */}
                                    <div className="p-3">
                                        <label className="text-[10px] font-medium text-[#7a7974] uppercase tracking-wider block mb-1.5">
                                            Order currency
                                        </label>
                                        <SearchableSelect
                                            value={order.currency}
                                            options={CURRENCIES}
                                            onChange={(val) => setOrder(prev => ({ ...prev, currency: val }))}
                                            placeholder="USD"
                                        />
                                    </div>

                                    {/* Additional Info */}
                                    <div className="p-3">
                                        <label className="text-[10px] font-medium text-[#7a7974] uppercase tracking-wider block mb-1.5">
                                            Notes
                                        </label>
                                        <textarea
                                            value={order.additional_info}
                                            onChange={(e) => setOrder(prev => ({ ...prev, additional_info: e.target.value }))}
                                            placeholder="Add notes..."
                                            className="w-full bg-transparent text-[#faf9f5] text-sm border-0 resize-none focus:outline-none min-h-[60px] placeholder:text-[#7a7974]/50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* === ITEMS TABLE === */}
                        <div className="bg-[#1a1a18] rounded-lg border border-[#3a3a38] overflow-hidden">

                            {/* Table Header Bar */}
                            <div className="flex justify-between items-center px-4 py-3 border-b border-[#3a3a38]">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-sm font-medium text-[#faf9f5]">
                                        {order.lines.length} Items
                                    </h2>
                                    {selectedLines.length > 0 && (
                                        <span className="text-xs text-[#d97757]">
                                            {selectedLines.length} selected
                                        </span>
                                    )}
                                </div>

                                {selectedLines.length > 0 ? (
                                    <button
                                        onClick={() => {
                                            selectedLines.forEach(id => handleDeleteLine(id));
                                        }}
                                        className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1.5"
                                    >
                                        <Trash2 size={14} />
                                        Delete selected
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleAddLine}
                                        className="text-xs text-[#d97757] hover:text-[#e08868] flex items-center gap-1.5 font-medium"
                                    >
                                        <Plus size={14} />
                                        Add item
                                    </button>
                                )}
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[1100px]">
                                    <thead>
                                        <tr className="bg-[#222220] text-[10px] text-[#7a7974] uppercase tracking-wider">
                                            <th className="px-3 py-2 w-10">
                                                <Checkbox
                                                    checked={selectedLines.length === order.lines.length && order.lines.length > 0}
                                                    onCheckedChange={(checked) => handleSelectAllLines(!!checked)}
                                                    className="data-[state=checked]:bg-[#a5d6ff] data-[state=checked]:border-[#a5d6ff]"
                                                />
                                            </th>
                                            <th className="px-3 py-2 font-medium">Item</th>
                                            <th className="px-3 py-2 font-medium">Supplier code</th>
                                            <th className="px-3 py-2 font-medium">Barcode</th>
                                            <th className="px-3 py-2 font-medium text-right">Qty</th>
                                            <th className="px-3 py-2 font-medium">UoM</th>
                                            <th className="px-3 py-2 font-medium text-right">Price</th>
                                            <th className="px-3 py-2 font-medium text-right">Total</th>
                                            <th className="px-3 py-2 font-medium">Tax</th>
                                            <th className="px-3 py-2 font-medium">Arrival</th>
                                            <th className="px-3 py-2 w-10"></th>
                                        </tr>

                                        {/* Totals Row */}
                                        <tr className="bg-[#1a1a18] border-b border-[#3a3a38]">
                                            <td className="px-3 py-2"></td>
                                            <td className="px-3 py-2 text-xs font-semibold text-[#faf9f5]">Total:</td>
                                            <td className="px-3 py-2"></td>
                                            <td className="px-3 py-2"></td>
                                            <td className="px-3 py-2 text-right font-bold text-[#faf9f5]">
                                                {totals.totalQuantity}
                                            </td>
                                            <td className="px-3 py-2 text-[#7a7974]">pcs</td>
                                            <td className="px-3 py-2"></td>
                                            <td className="px-3 py-2 text-right font-bold text-[#faf9f5]">
                                                {totals.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                <span className="text-[#7a7974] font-normal ml-1">{order.currency}</span>
                                            </td>
                                            <td className="px-3 py-2 text-right font-bold text-[#faf9f5]">
                                                0.00
                                                <span className="text-[#7a7974] font-normal ml-1">{order.currency}</span>
                                            </td>
                                            <td className="px-3 py-2"></td>
                                            <td className="px-3 py-2"></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.lines.map((line, index) => (
                                            <tr
                                                key={line.id}
                                                className={cn(
                                                    "border-b border-[#3a3a38]/50 transition-colors",
                                                    selectedLines.includes(line.id)
                                                        ? "bg-[#5b9bd5]/10"
                                                        : "hover:bg-[#222220]/50"
                                                )}
                                            >
                                                <td className="px-3 py-2">
                                                    <Checkbox
                                                        checked={selectedLines.includes(line.id)}
                                                        onCheckedChange={(checked) => handleSelectLine(line.id, !!checked)}
                                                        className="data-[state=checked]:bg-[#a5d6ff] data-[state=checked]:border-[#a5d6ff]"
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    {line.item_name ? (
                                                        <Link
                                                            href={`/items/${line.variant_id}`}
                                                            className="text-[#d97757] hover:text-[#e08868] hover:underline text-sm flex items-center gap-1"
                                                        >
                                                            {line.item_name}
                                                            <ExternalLink size={10} />
                                                        </Link>
                                                    ) : (
                                                        <span className="text-[#7a7974] italic text-sm">Select item...</span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input
                                                        type="text"
                                                        value={line.supplier_item_code}
                                                        onChange={(e) => handleLineUpdate(line.id, 'supplier_item_code', e.target.value)}
                                                        className="w-full bg-transparent text-[#faf9f5] text-xs border-0 focus:outline-none focus:ring-1 focus:ring-[#d97757]/30 rounded"
                                                        placeholder="-"
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input
                                                        type="text"
                                                        value={line.internal_barcode}
                                                        onChange={(e) => handleLineUpdate(line.id, 'internal_barcode', e.target.value)}
                                                        className="w-full bg-transparent text-[#faf9f5] text-xs border-0 focus:outline-none focus:ring-1 focus:ring-[#d97757]/30 rounded"
                                                        placeholder="-"
                                                    />
                                                </td>
                                                <td className="px-3 py-2 text-right">
                                                    <input
                                                        type="number"
                                                        value={line.quantity}
                                                        onChange={(e) => handleLineUpdate(line.id, 'quantity', parseFloat(e.target.value) || 0)}
                                                        className="w-16 bg-transparent text-[#faf9f5] text-xs text-right border-0 focus:outline-none focus:ring-1 focus:ring-[#d97757]/30 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    />
                                                </td>
                                                <td className="px-3 py-2 text-[#7a7974] text-xs">{line.uom}</td>
                                                <td className="px-3 py-2 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <input
                                                            type="number"
                                                            value={line.price_per_unit}
                                                            onChange={(e) => handleLineUpdate(line.id, 'price_per_unit', parseFloat(e.target.value) || 0)}
                                                            className="w-16 bg-transparent text-[#faf9f5] text-xs text-right border-0 focus:outline-none focus:ring-1 focus:ring-[#d97757]/30 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        />
                                                        <span className="text-[#7a7974] text-xs">{order.currency}</span>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2 text-right text-xs">
                                                    <span className="text-[#faf9f5]">
                                                        {line.total_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                    </span>
                                                    <span className="text-[#7a7974] ml-1">{order.currency}</span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span className="text-[#7a7974] text-xs truncate block max-w-[80px]">
                                                        {line.tax_rate}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input
                                                        type="date"
                                                        value={line.expected_arrival}
                                                        onChange={(e) => handleLineUpdate(line.id, 'expected_arrival', e.target.value)}
                                                        className={cn(
                                                            "w-28 bg-transparent text-xs border-0 focus:outline-none focus:ring-1 focus:ring-[#d97757]/30 rounded",
                                                            line.expected_arrival && new Date(line.expected_arrival) < new Date()
                                                                ? "text-red-500"
                                                                : "text-[#faf9f5]"
                                                        )}
                                                    />
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    <button
                                                        onClick={() => handleDeleteLine(line.id)}
                                                        className="p-1 hover:bg-red-500/10 rounded text-[#7a7974] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {order.lines.length === 0 && (
                                            <tr>
                                                <td colSpan={11} className="px-4 py-8 text-center text-[#7a7974]">
                                                    No items added yet.
                                                    <button
                                                        onClick={handleAddLine}
                                                        className="text-[#d97757] hover:text-[#e08868] ml-2"
                                                    >
                                                        Add your first item
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Add Row Footer */}
                            {order.lines.length > 0 && (
                                <div className="px-4 py-2 border-t border-[#3a3a38]">
                                    <button
                                        onClick={handleAddLine}
                                        className="text-[#d97757] hover:text-[#e08868] text-sm font-medium flex items-center gap-1.5"
                                    >
                                        <Plus size={14} />
                                        Add item
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* === TOTALS SUMMARY === */}
                        <div className="flex justify-end">
                            <div className="w-80 bg-[#1a1a18] rounded-lg border border-[#3a3a38] p-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7a7974]">Total units:</span>
                                    <span className="text-[#faf9f5]">{totals.totalQuantity} pcs</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7a7974]">Subtotal:</span>
                                    <span className="text-[#faf9f5]">
                                        {totals.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })} {order.currency}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7a7974]">Additional costs:</span>
                                    <span className="text-[#faf9f5]">
                                        {totals.additionalCostsTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })} {order.currency}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#7a7974]">Tax:</span>
                                    <span className="text-[#faf9f5]">
                                        {totals.taxTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })} {order.currency}
                                    </span>
                                </div>
                                <div className="border-t border-[#3a3a38] pt-3">
                                    <div className="flex justify-between text-base font-semibold">
                                        <span className="text-[#faf9f5]">Total:</span>
                                        <span className="text-[#faf9f5]">
                                            {totals.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })} {order.currency}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'Additional costs' && (
                    <div className="bg-[#1a1a18] rounded-lg border border-[#3a3a38] overflow-hidden">

                        {/* Table Header Bar */}
                        <div className="flex justify-between items-center px-4 py-3 border-b border-[#3a3a38]">
                            <h2 className="text-sm font-medium text-[#faf9f5]">
                                Additional Costs
                            </h2>
                            <button
                                onClick={handleAddCost}
                                className="text-xs text-[#d97757] hover:text-[#e08868] flex items-center gap-1.5 font-medium"
                            >
                                <Plus size={14} />
                                Add cost
                            </button>
                        </div>

                        {/* Table */}
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#222220] text-[10px] text-[#7a7974] uppercase tracking-wider">
                                    <th className="px-3 py-2 w-10 font-medium">#</th>
                                    <th className="px-3 py-2 font-medium">Description</th>
                                    <th className="px-3 py-2 font-medium">Reference</th>
                                    <th className="px-3 py-2 font-medium">Distribution</th>
                                    <th className="px-3 py-2 font-medium text-right">Amount</th>
                                    <th className="px-3 py-2 font-medium">Tax</th>
                                    <th className="px-3 py-2 w-10"></th>
                                </tr>

                                {/* Totals Row */}
                                <tr className="bg-[#1a1a18] border-b border-[#3a3a38]">
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2 text-xs font-semibold text-[#faf9f5]">Total:</td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2"></td>
                                    <td className="px-3 py-2 text-right font-bold text-[#faf9f5]">
                                        {totals.additionalCostsTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        <span className="text-[#7a7974] font-normal ml-1">{order.currency}</span>
                                    </td>
                                    <td className="px-3 py-2 text-right font-bold text-[#faf9f5]">
                                        0.00
                                        <span className="text-[#7a7974] font-normal ml-1">{order.currency}</span>
                                    </td>
                                    <td className="px-3 py-2"></td>
                                </tr>
                            </thead>
                            <tbody>
                                {order.additional_costs.map((cost, index) => (
                                    <tr
                                        key={cost.id}
                                        className="border-b border-[#3a3a38]/50 hover:bg-[#222220]/50 transition-colors group"
                                    >
                                        <td className="px-3 py-2 text-[#7a7974] text-xs">{index + 1}.</td>
                                        <td className="px-3 py-2">
                                            <input
                                                type="text"
                                                value={cost.description}
                                                onChange={(e) => handleCostUpdate(cost.id, 'description', e.target.value)}
                                                className="w-full bg-transparent text-[#faf9f5] text-xs border-0 focus:outline-none focus:ring-1 focus:ring-[#d97757]/30 rounded"
                                                placeholder="Cost description"
                                            />
                                        </td>
                                        <td className="px-3 py-2">
                                            <input
                                                type="text"
                                                value={cost.reference}
                                                onChange={(e) => handleCostUpdate(cost.id, 'reference', e.target.value)}
                                                className="w-full bg-transparent text-[#faf9f5] text-xs border-0 focus:outline-none focus:ring-1 focus:ring-[#d97757]/30 rounded"
                                                placeholder="-"
                                            />
                                        </td>
                                        <td className="px-3 py-2 text-[#7a7974] text-xs">{cost.distribution_method}</td>
                                        <td className="px-3 py-2 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <input
                                                    type="number"
                                                    value={cost.total_price}
                                                    onChange={(e) => handleCostUpdate(cost.id, 'total_price', parseFloat(e.target.value) || 0)}
                                                    className="w-20 bg-transparent text-[#faf9f5] text-xs text-right border-0 focus:outline-none focus:ring-1 focus:ring-[#d97757]/30 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                                <span className="text-[#7a7974] text-xs">{order.currency}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 text-[#7a7974] text-xs">{cost.tax_rate}</td>
                                        <td className="px-3 py-2 text-center">
                                            <button
                                                onClick={() => handleDeleteCost(cost.id)}
                                                className="p-1 hover:bg-red-500/10 rounded text-[#7a7974] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {order.additional_costs.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-[#7a7974]">
                                            No additional costs.
                                            <button
                                                onClick={handleAddCost}
                                                className="text-[#d97757] hover:text-[#e08868] ml-2"
                                            >
                                                Add cost
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Add Row Footer */}
                        {order.additional_costs.length > 0 && (
                            <div className="px-4 py-2 border-t border-[#3a3a38]">
                                <button
                                    onClick={handleAddCost}
                                    className="text-[#d97757] hover:text-[#e08868] text-sm font-medium flex items-center gap-1.5"
                                >
                                    <Plus size={14} />
                                    Add cost
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
        </Shell>
    );
}
