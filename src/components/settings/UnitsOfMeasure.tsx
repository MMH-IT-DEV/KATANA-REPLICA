'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import HelpTooltip from '@/components/ui/HelpTooltip';
import {
    fetchUnitsOfMeasure,
    createUnitOfMeasure,
    updateUnitOfMeasure,
    deleteUnitOfMeasure,
    UnitOfMeasure,
} from '@/lib/katana-data-provider';
import { Input } from "@/components/ui/input"; // Use standardized Input
import { cn } from "@/lib/utils";
import { DeleteConfirmDialog } from '@/components/ui/DeleteConfirmDialog';

export default function UnitsOfMeasure() {
    const [units, setUnits] = useState<UnitOfMeasure[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [sortAsc, setSortAsc] = useState(true);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        loadUnits();
    }, []);

    const loadUnits = async () => {
        setIsLoading(true);
        const data = await fetchUnitsOfMeasure();
        setUnits(data);
        setIsLoading(false);
    };

    const handleAddUnit = async () => {
        const newUnit = await createUnitOfMeasure('New Unit');
        if (newUnit) {
            setUnits((prev) => [...prev, newUnit]);
            setEditingId(newUnit.id);
            setEditValue('New Unit');
        }
    };

    const handleStartEdit = (unit: UnitOfMeasure) => {
        // Save current edit before switching
        if (editingId && editValue.trim() && editingId !== unit.id) {
            updateUnitOfMeasure(editingId, editValue.trim());
            setUnits((prev) =>
                prev.map((u) => (u.id === editingId ? { ...u, name: editValue.trim() } : u))
            );
        }

        setEditingId(unit.id);
        setEditValue(unit.name || '');
    };

    const handleSaveEdit = async () => {
        if (editingId && editValue.trim()) {
            await updateUnitOfMeasure(editingId, editValue.trim());
            setUnits((prev) =>
                prev.map((u) => (u.id === editingId ? { ...u, name: editValue.trim() } : u))
            );
        }
        setEditingId(null);
        setEditValue('');
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            const result = await deleteUnitOfMeasure(deleteId);
            if (result.success) {
                setUnits((prev) => prev.filter((u) => u.id !== deleteId));
            } else {
                alert(result.error || 'Failed to delete unit of measure');
            }
            setDeleteId(null);
        }
    };

    const handleSort = () => {
        setSortAsc(!sortAsc);
    };

    // Smart sorting: new units always appear at bottom
    const sortedUnits = (() => {
        const existingUnits = units.filter(u => !(editingId === u.id && u.name === 'New Unit'));
        const newUnits = units.filter(u => editingId === u.id && u.name === 'New Unit');

        const sorted = [...existingUnits].sort((a, b) =>
            sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );

        // New units always at the bottom
        return [...sorted, ...newUnits];
    })();

    // Navigation Handler
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, currentIndex: number) => {
        if (e.key === 'Enter') {
            handleSaveEdit();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentIndex > 0) {
                // Save current
                if (editingId && editValue.trim()) {
                    updateUnitOfMeasure(editingId, editValue.trim());
                    // Optimistic update
                    setUnits((prev) => prev.map((u) => (u.id === editingId ? { ...u, name: editValue.trim() } : u)));
                }
                // Move to prev
                const prevUnit = sortedUnits[currentIndex - 1];
                setEditingId(prevUnit.id);
                setEditValue(prevUnit.name);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentIndex < sortedUnits.length - 1) {
                // Save current
                if (editingId && editValue.trim()) {
                    updateUnitOfMeasure(editingId, editValue.trim());
                    // Optimistic update
                    setUnits((prev) => prev.map((u) => (u.id === editingId ? { ...u, name: editValue.trim() } : u)));
                }
                // Move to next
                const nextUnit = sortedUnits[currentIndex + 1];
                setEditingId(nextUnit.id);
                setEditValue(nextUnit.name);
            }
        }
    };

    if (isLoading) {
        return <div className="p-8 text-[#7a7974] text-sm">Loading...</div>;
    }

    // Pattern: Standard Page Layout
    return (
        <div className="max-w-[1600px] mx-auto p-6 space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-xl font-medium text-foreground tracking-tight">Units of measure</h1>
                <div className="mt-2 text-sm text-[#7a7974] leading-relaxed max-w-2xl">
                    <p className="mb-1">
                        <span className={cn(
                            "transition-opacity duration-100",
                            isTooltipOpen && "opacity-40"
                        )}>
                            Define which measurement units can be used for items in Katana.
                        </span>{' '}
                        <HelpTooltip
                            title="Units of measure"
                            description="Units are used to measure the quantity of items in stock, on orders, and in recipes. You can define units like 'pcs', 'kg', 'm', etc."
                            onOpenChange={setIsTooltipOpen}
                        >
                            <span className="ml-1 text-[#faf9f5] font-medium inline-flex items-center gap-1 transition-all cursor-pointer">Learn more</span>
                        </HelpTooltip>
                    </p>
                    <p className={cn(
                        "transition-opacity duration-100",
                        isTooltipOpen && "opacity-40"
                    )}>
                        This ensures that item quantities, dimensions, and weights are consistently and accurately recorded.
                    </p>
                </div>
            </div>

            {/* Content: Table Container */}
            <div className="bg-background rounded-lg border border-border overflow-hidden max-w-4xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        {/* Pattern: Table Header from Items Page */}
                        <tr className="h-8 bg-[#222220] border-b border-[#3a3a38]/50">
                            <th className="px-3 py-0 align-middle w-full border-r border-[#3a3a38]/50">
                                <button
                                    onClick={handleSort}
                                    className="flex items-center gap-1 font-medium text-[#7a7974] uppercase tracking-wider text-[11px] hover:text-foreground transition-colors"
                                >
                                    Name
                                    {sortAsc ? (
                                        <ArrowUp size={12} />
                                    ) : (
                                        <ArrowDown size={12} />
                                    )}
                                </button>
                            </th>
                            <th className="px-3 py-0 w-16 text-center bg-[#222220]"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3a3a38] text-[13px]">
                        {sortedUnits.map((unit, index) => (
                            <tr
                                key={unit.id}
                                className="h-8 hover:bg-secondary/20 transition-colors group"
                            >
                                <td className="px-2 py-1 border-r border-[#3a3a38]/50">
                                    {editingId === unit.id ? (
                                        // Pattern: Inline Table Input with focus outline
                                        <input
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={handleSaveEdit}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            autoFocus
                                            className="w-full h-6 bg-transparent border border-[#d97757] rounded-sm focus:outline-none focus:border-[#d97757] text-[13px] text-foreground px-2"
                                        />
                                    ) : (
                                        <div
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleStartEdit(unit);
                                            }}
                                            className="cursor-pointer w-full h-6 flex items-center text-foreground px-1"
                                        >
                                            {unit.name}
                                        </div>
                                    )}
                                </td>
                                <td className="px-2 py-0 text-center">
                                    <button
                                        onClick={(e) => handleDelete(unit.id, e)}
                                        className="text-[#ff7b6f] opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#ff7b6f]/10 rounded"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {/* Pattern: Add Row Button (Product Page Style) */}
                        <tr className="bg-transparent border-t border-[#3a3a38]">
                            <td colSpan={2} className="p-2">
                                <button
                                    className="text-muted-foreground hover:text-primary hover:bg-secondary/50 h-8 px-2 text-xs font-medium flex items-center gap-1 transition-colors rounded"
                                    onClick={handleAddUnit}
                                >
                                    <Plus size={14} /> Add row
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="text-xs text-[#7a7974] px-1">
                {units.length} units defined
            </div>

            <DeleteConfirmDialog
                open={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                onConfirm={confirmDelete}
                title={`Delete the "${units.find(u => u.id === deleteId)?.name || 'selected'}" unit?`}
                description="This unit of measure will be permanently removed. This action cannot be undone."
                actionLabel="Delete"
            />
        </div>
    );
}
