'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import HelpTooltip from '@/components/ui/HelpTooltip';
import {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    Category,
} from '@/lib/katana-data-provider';
import { cn } from "@/lib/utils";
import { DeleteConfirmDialog } from '@/components/ui/DeleteConfirmDialog';

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [sortAsc, setSortAsc] = useState(true);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setIsLoading(true);
        const data = await fetchCategories();
        setCategories(data);
        setIsLoading(false);
    };

    const handleAddCategory = async () => {
        const newCategory = await createCategory('New Category');
        if (newCategory) {
            setCategories((prev) => [...prev, newCategory]);
            setEditingId(newCategory.id);
            setEditValue('New Category');
        }
    };

    const handleStartEdit = (category: Category) => {
        // Save current edit before switching
        if (editingId && editValue.trim() && editingId !== category.id) {
            updateCategory(editingId, editValue.trim());
            setCategories((prev) =>
                prev.map((c) => (c.id === editingId ? { ...c, name: editValue.trim() } : c))
            );
        }

        setEditingId(category.id);
        setEditValue(category.name || '');
    };

    const handleSaveEdit = async () => {
        if (editingId && editValue.trim()) {
            await updateCategory(editingId, editValue.trim());
            setCategories((prev) =>
                prev.map((c) => (c.id === editingId ? { ...c, name: editValue.trim() } : c))
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
            const result = await deleteCategory(deleteId);
            if (result.success) {
                setCategories((prev) => prev.filter((c) => c.id !== deleteId));
            } else {
                alert(result.error || 'Failed to delete category');
            }
            setDeleteId(null);
        }
    };

    const handleSort = () => {
        setSortAsc(!sortAsc);
    };

    // Smart sorting: new categories always appear at bottom
    const sortedCategories = (() => {
        const existingCategories = categories.filter(c => !(editingId === c.id && c.name === 'New Category'));
        const newCategories = categories.filter(c => editingId === c.id && c.name === 'New Category');

        const sorted = [...existingCategories].sort((a, b) =>
            sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );

        // New categories always at the bottom
        return [...sorted, ...newCategories];
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
                    updateCategory(editingId, editValue.trim());
                    // Optimistic update
                    setCategories((prev) => prev.map((c) => (c.id === editingId ? { ...c, name: editValue.trim() } : c)));
                }
                // Move to prev
                const prevCategory = sortedCategories[currentIndex - 1];
                setEditingId(prevCategory.id);
                setEditValue(prevCategory.name);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentIndex < sortedCategories.length - 1) {
                // Save current
                if (editingId && editValue.trim()) {
                    updateCategory(editingId, editValue.trim());
                    // Optimistic update
                    setCategories((prev) => prev.map((c) => (c.id === editingId ? { ...c, name: editValue.trim() } : c)));
                }
                // Move to next
                const nextCategory = sortedCategories[currentIndex + 1];
                setEditingId(nextCategory.id);
                setEditValue(nextCategory.name);
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
                <h1 className="text-xl font-medium text-foreground tracking-tight">Categories</h1>
                <div className="mt-2 text-sm text-[#7a7974] leading-relaxed max-w-2xl">
                    <p className="mb-1">
                        <span className={cn(
                            "transition-opacity duration-200",
                            isTooltipOpen && "opacity-40"
                        )}>
                            Use categories to organize items, enhancing inventory management efficiency.
                        </span>{' '}
                        <HelpTooltip
                            title="Categories"
                            description="Categories help you organize and filter items in your inventory. Group similar items together for easier management."
                            onOpenChange={setIsTooltipOpen}
                        >
                            <span className="ml-1 text-[#faf9f5] font-medium inline-flex items-center gap-1 transition-all cursor-pointer">Read more</span>
                        </HelpTooltip>
                    </p>
                    <p className={cn(
                        "transition-opacity duration-200",
                        isTooltipOpen && "opacity-40"
                    )}>
                        By grouping similar items, categories facilitate more straightforward navigation and filtering.
                    </p>
                </div>
            </div>

            {/* Content: Table Container */}
            <div className="bg-background rounded-lg border border-border overflow-hidden max-w-4xl">
                <table className="w-full text-left border-collapse">
                    <thead>
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
                        {sortedCategories.map((category, index) => (
                            <tr
                                key={category.id}
                                className="h-8 hover:bg-secondary/20 transition-colors group"
                            >
                                <td className="px-2 py-1 border-r border-[#3a3a38]/50">
                                    {editingId === category.id ? (
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
                                                handleStartEdit(category);
                                            }}
                                            className="cursor-pointer w-full h-6 flex items-center text-foreground px-1"
                                        >
                                            {category.name}
                                        </div>
                                    )}
                                </td>
                                <td className="px-2 py-0 text-center">
                                    <button
                                        onClick={(e) => handleDelete(category.id, e)}
                                        className="text-[#ff7b6f] opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#ff7b6f]/10 rounded"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        <tr className="bg-transparent border-t border-[#3a3a38]">
                            <td colSpan={2} className="p-2">
                                <button
                                    className="text-muted-foreground hover:text-primary hover:bg-secondary/50 h-8 px-2 text-xs font-medium flex items-center gap-1 transition-colors rounded"
                                    onClick={handleAddCategory}
                                >
                                    <Plus size={14} /> Add row
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="text-xs text-[#7a7974] px-1">
                {categories.length} categories defined
            </div>

            <DeleteConfirmDialog
                open={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                onConfirm={confirmDelete}
                title={`Delete the "${categories.find(c => c.id === deleteId)?.name || 'selected'}" category?`}
                description="This category will be permanently removed. This action cannot be undone."
                actionLabel="Delete"
            />
        </div>
    );
}
