'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import HelpTooltip from '@/components/ui/HelpTooltip';
import {
    fetchTaxRates,
    createTaxRate,
    updateTaxRate,
    deleteTaxRate,
    TaxRate,
    fetchSettings,
    updateSetting,
} from '@/lib/katana-data-provider';
import { cn } from "@/lib/utils";
import { DeleteConfirmDialog } from '@/components/ui/DeleteConfirmDialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ITEMS_PER_PAGE = 10;

export default function TaxRates() {
    const [taxRates, setTaxRates] = useState<TaxRate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState({ rate: 0, name: '' });
    const [sortAsc, setSortAsc] = useState(true);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Default tax settings
    const [defaultSalesTax, setDefaultSalesTax] = useState<string>('');
    const [defaultPurchaseTax, setDefaultPurchaseTax] = useState<string>('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        const [rates, settings] = await Promise.all([
            fetchTaxRates(),
            fetchSettings()
        ]);
        setTaxRates(rates);
        if (settings && Array.isArray(settings)) {
            const salesTaxSetting = settings.find(s => s.key === 'default_sales_tax_id');
            const purchaseTaxSetting = settings.find(s => s.key === 'default_purchase_tax_id');
            setDefaultSalesTax(salesTaxSetting?.value || '');
            setDefaultPurchaseTax(purchaseTaxSetting?.value || '');
        }
        setIsLoading(false);
    };

    const handleAddTaxRate = async () => {
        const newTaxRate = await createTaxRate(0, 'New Tax Rate');
        if (newTaxRate) {
            setTaxRates((prev) => [...prev, newTaxRate]);
            setEditingId(newTaxRate.id);
            setEditValue({ rate: 0, name: 'New Tax Rate' });
        }
    };

    const handleStartEdit = (taxRate: TaxRate) => {
        // Save current edit before switching
        if (editingId && (editValue.name.trim() || editValue.rate !== 0) && editingId !== taxRate.id) {
            updateTaxRate(editingId, editValue.rate, editValue.name.trim());
            setTaxRates((prev) =>
                prev.map((t) => (t.id === editingId ? { ...t, rate: editValue.rate, name: editValue.name.trim() } : t))
            );
        }

        setEditingId(taxRate.id);
        setEditValue({ rate: taxRate.rate, name: taxRate.name || '' });
    };

    const handleSaveEdit = async () => {
        if (editingId && editValue.name.trim()) {
            await updateTaxRate(editingId, editValue.rate, editValue.name.trim());
            setTaxRates((prev) =>
                prev.map((t) => (t.id === editingId ? { ...t, rate: editValue.rate, name: editValue.name.trim() } : t))
            );
        }
        setEditingId(null);
        setEditValue({ rate: 0, name: '' });
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            const result = await deleteTaxRate(deleteId);
            if (result.success) {
                setTaxRates((prev) => prev.filter((t) => t.id !== deleteId));
            } else {
                alert(result.error || 'Failed to delete tax rate');
            }
            setDeleteId(null);
        }
    };

    const handleSort = () => {
        setSortAsc(!sortAsc);
    };

    const handleDefaultTaxChange = async (type: 'sales' | 'purchase', value: string) => {
        const key = type === 'sales' ? 'default_sales_tax_id' : 'default_purchase_tax_id';
        await updateSetting(key, value);
        if (type === 'sales') {
            setDefaultSalesTax(value);
        } else {
            setDefaultPurchaseTax(value);
        }
    };

    // Smart sorting: new tax rates always appear at bottom
    const sortedTaxRates = (() => {
        const existingRates = taxRates.filter(t => !(editingId === t.id && t.name === 'New Tax Rate'));
        const newRates = taxRates.filter(t => editingId === t.id && t.name === 'New Tax Rate');

        const sorted = [...existingRates].sort((a, b) =>
            sortAsc ? a.rate - b.rate : b.rate - a.rate
        );

        return [...sorted, ...newRates];
    })();

    // Pagination
    const totalPages = Math.ceil(sortedTaxRates.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedRates = sortedTaxRates.slice(startIndex, endIndex);

    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToPrevPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
    const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

    // Navigation Handler
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, currentIndex: number, field: 'rate' | 'name') => {
        if (e.key === 'Enter') {
            handleSaveEdit();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentIndex > 0) {
                if (editingId && editValue.name.trim()) {
                    updateTaxRate(editingId, editValue.rate, editValue.name.trim());
                    setTaxRates((prev) => prev.map((t) => (t.id === editingId ? { ...t, rate: editValue.rate, name: editValue.name.trim() } : t)));
                }
                const prevRate = paginatedRates[currentIndex - 1];
                setEditingId(prevRate.id);
                setEditValue({ rate: prevRate.rate, name: prevRate.name });
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentIndex < paginatedRates.length - 1) {
                if (editingId && editValue.name.trim()) {
                    updateTaxRate(editingId, editValue.rate, editValue.name.trim());
                    setTaxRates((prev) => prev.map((t) => (t.id === editingId ? { ...t, rate: editValue.rate, name: editValue.name.trim() } : t)));
                }
                const nextRate = paginatedRates[currentIndex + 1];
                setEditingId(nextRate.id);
                setEditValue({ rate: nextRate.rate, name: nextRate.name });
            }
        }
    };

    if (isLoading) {
        return <div className="p-8 text-[#7a7974] text-sm">Loading...</div>;
    }

    return (
        <div className="max-w-[1600px] mx-auto p-6 space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-xl font-medium text-foreground tracking-tight">Tax rates</h1>
                <div className="mt-2 text-sm text-[#7a7974] leading-relaxed max-w-2xl">
                    <p className="mb-1">
                        <span className={cn(
                            "transition-opacity duration-100",
                            isTooltipOpen && "opacity-40"
                        )}>
                            Set and edit tax rates for products and transactions to ensure accurate tax calculations and compliance.
                        </span>{' '}
                        <HelpTooltip
                            title="Tax rates"
                            description="Tax rates are automatically applied to items on sales and purchase orders based on your default settings."
                            onOpenChange={setIsTooltipOpen}
                        >
                            <span className="ml-1 text-[#faf9f5] font-medium inline-flex items-center gap-1 transition-all cursor-pointer">Learn more</span>
                        </HelpTooltip>
                    </p>
                    <p className={cn(
                        "transition-opacity duration-100",
                        isTooltipOpen && "opacity-40"
                    )}>
                        Tax rates are applied to items on sales and purchase orders to calculate the total price or cost of items on the order with taxes.
                    </p>
                </div>
            </div>

            {/* Split Layout: Table (LEFT) + Settings Panel (RIGHT) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT: Tax Rates Table */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-background rounded-lg border border-border overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="h-8 bg-[#222220] border-b border-[#3a3a38]/50">
                                    <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50">
                                        <button
                                            onClick={handleSort}
                                            className="flex items-center gap-1 font-medium text-[#7a7974] uppercase tracking-wider text-[11px] hover:text-foreground transition-colors"
                                        >
                                            Rate
                                            {sortAsc ? (
                                                <ArrowUp size={12} />
                                            ) : (
                                                <ArrowDown size={12} />
                                            )}
                                        </button>
                                    </th>
                                    <th className="px-3 py-0 align-middle w-full border-r border-[#3a3a38]/50">
                                        <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">
                                            Tax name
                                        </span>
                                    </th>
                                    <th className="px-3 py-0 w-16 text-center bg-[#222220]"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#3a3a38] text-[13px]">
                                {paginatedRates.map((taxRate, index) => (
                                    <tr
                                        key={taxRate.id}
                                        className="h-8 hover:bg-secondary/20 transition-colors group"
                                    >
                                        {/* Rate Column */}
                                        <td className="px-2 py-1 border-r border-[#3a3a38]/50">
                                            {editingId === taxRate.id ? (
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={editValue.rate}
                                                        onChange={(e) => setEditValue(prev => ({ ...prev, rate: parseFloat(e.target.value) || 0 }))}
                                                        onBlur={handleSaveEdit}
                                                        onKeyDown={(e) => handleKeyDown(e, index, 'rate')}
                                                        className="w-16 h-6 bg-transparent border border-[#d97757] rounded-sm focus:outline-none focus:border-[#d97757] text-[13px] text-foreground px-2 text-right"
                                                    />
                                                    <span className="text-[#7a7974]">%</span>
                                                </div>
                                            ) : (
                                                <div
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        handleStartEdit(taxRate);
                                                    }}
                                                    className="cursor-pointer h-6 flex items-center justify-end text-foreground px-1"
                                                >
                                                    {taxRate.rate}%
                                                </div>
                                            )}
                                        </td>

                                        {/* Name Column */}
                                        <td className="px-2 py-1 border-r border-[#3a3a38]/50">
                                            {editingId === taxRate.id ? (
                                                <input
                                                    type="text"
                                                    value={editValue.name}
                                                    onChange={(e) => setEditValue(prev => ({ ...prev, name: e.target.value }))}
                                                    onBlur={handleSaveEdit}
                                                    onKeyDown={(e) => handleKeyDown(e, index, 'name')}
                                                    autoFocus
                                                    className="w-full h-6 bg-transparent border border-[#d97757] rounded-sm focus:outline-none focus:border-[#d97757] text-[13px] text-foreground px-2"
                                                />
                                            ) : (
                                                <div
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        handleStartEdit(taxRate);
                                                    }}
                                                    className="cursor-pointer w-full h-6 flex items-center text-foreground px-1"
                                                >
                                                    {taxRate.name}
                                                </div>
                                            )}
                                        </td>

                                        {/* Delete Button */}
                                        <td className="px-2 py-0 text-center">
                                            <button
                                                onClick={(e) => handleDelete(taxRate.id, e)}
                                                className="text-[#ff7b6f] opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#ff7b6f]/10 rounded"
                                                title="Delete"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                <tr className="bg-transparent border-t border-[#3a3a38]">
                                    <td colSpan={3} className="p-2">
                                        <button
                                            className="text-muted-foreground hover:text-primary hover:bg-secondary/50 h-8 px-2 text-xs font-medium flex items-center gap-1 transition-colors rounded"
                                            onClick={handleAddTaxRate}
                                        >
                                            <Plus size={14} /> Add row
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-2">
                            <div className="text-xs text-[#7a7974]">
                                Page {currentPage} of {totalPages}
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={goToFirstPage}
                                    disabled={currentPage === 1}
                                    className="p-1.5 rounded hover:bg-secondary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    title="First page"
                                >
                                    <ChevronsLeft size={16} className="text-muted-foreground" />
                                </button>
                                <button
                                    onClick={goToPrevPage}
                                    disabled={currentPage === 1}
                                    className="p-1.5 rounded hover:bg-secondary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    title="Previous page"
                                >
                                    <ChevronLeft size={16} className="text-muted-foreground" />
                                </button>
                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    className="p-1.5 rounded hover:bg-secondary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    title="Next page"
                                >
                                    <ChevronRight size={16} className="text-muted-foreground" />
                                </button>
                                <button
                                    onClick={goToLastPage}
                                    disabled={currentPage === totalPages}
                                    className="p-1.5 rounded hover:bg-secondary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    title="Last page"
                                >
                                    <ChevronsRight size={16} className="text-muted-foreground" />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="text-xs text-[#7a7974] px-1">
                        {taxRates.length} tax rates defined
                    </div>
                </div>

                {/* RIGHT: Default Settings Panel */}
                <div className="lg:col-span-1">
                    <div className="bg-background rounded-lg border border-border p-6 space-y-6">
                        <h3 className="text-lg font-medium text-foreground">Default tax rates</h3>

                        {/* Default Sales Tax */}
                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-muted-foreground">Default tax on Sales order</Label>
                            <Select value={defaultSalesTax} onValueChange={(val) => handleDefaultTaxChange('sales', val)}>
                                <SelectTrigger className="h-9 bg-[#1e1e1e] border-[#3a3a38] text-[#faf9f5]">
                                    <SelectValue placeholder="Select tax rate..." />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5]">
                                    {taxRates.map(rate => (
                                        <SelectItem key={rate.id} value={rate.id}>
                                            {rate.name} ({rate.rate}%)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Default Purchase Tax */}
                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-muted-foreground">Default tax on Purchase order</Label>
                            <Select value={defaultPurchaseTax} onValueChange={(val) => handleDefaultTaxChange('purchase', val)}>
                                <SelectTrigger className="h-9 bg-[#1e1e1e] border-[#3a3a38] text-[#faf9f5]">
                                    <SelectValue placeholder="Select tax rate..." />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5]">
                                    {taxRates.map(rate => (
                                        <SelectItem key={rate.id} value={rate.id}>
                                            {rate.name} ({rate.rate}%)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmDialog
                open={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                onConfirm={confirmDelete}
                title={`Delete the "${taxRates.find(t => t.id === deleteId)?.name || 'selected'}" tax rate?`}
                description="This tax rate will be permanently removed. This action cannot be undone."
                actionLabel="Delete"
            />
        </div>
    );
}
