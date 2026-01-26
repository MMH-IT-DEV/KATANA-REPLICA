'use client';

import { useState } from 'react';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import HelpTooltip from '@/components/ui/HelpTooltip';
import { DeleteConfirmDialog } from '@/components/ui/DeleteConfirmDialog';
import { cn } from '@/lib/utils';

interface Operation {
    id: string;
    name: string;
    order: number;
}

export default function Operations() {
    const [operations, setOperations] = useState<Operation[]>([
        { id: '1', name: 'PREPPING, COOKING AND FILLING', order: 1 },
        { id: '2', name: 'CLOSING AND STORING JARS', order: 2 },
        { id: '3', name: 'LABELLING', order: 3 },
        { id: '4', name: 'PACKAGING', order: 4 },
        { id: '5', name: 'LAYING JARS', order: 5 },
        { id: '6', name: 'COOKING', order: 6 },
    ]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        // Add a ghost image or some styling if needed
        const target = e.target as HTMLElement;
        target.classList.add('opacity-50');
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        setDragOverIndex(index);
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newOperations = [...operations];
        const [movedItem] = newOperations.splice(draggedIndex, 1);
        newOperations.splice(index, 0, movedItem);

        // Update the order property based on new positions
        const updatedOperations = newOperations.map((op, idx) => ({
            ...op,
            order: idx + 1
        }));

        setOperations(updatedOperations);
        setDraggedIndex(null);
    };

    const handleDragEnd = (e: React.DragEvent) => {
        const target = e.target as HTMLElement;
        target.classList.remove('opacity-50');
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleAddOperation = () => {
        const newOperation: Operation = {
            id: Math.random().toString(36).substr(2, 9),
            name: 'New operation',
            order: operations.length + 1
        };
        setOperations(prev => [...prev, newOperation]);
        setEditingId(newOperation.id);
        setEditValue('New operation');
    };

    const handleStartEdit = (operation: Operation) => {
        // Save current edit before switching
        if (editingId && editValue.trim() && editingId !== operation.id) {
            setOperations(prev =>
                prev.map(op => (op.id === editingId ? { ...op, name: editValue.trim() } : op))
            );
        }

        setEditingId(operation.id);
        setEditValue(operation.name || '');
    };

    const handleSaveEdit = () => {
        if (editingId && editValue.trim()) {
            setOperations(prev =>
                prev.map(op => (op.id === editingId ? { ...op, name: editValue.trim() } : op))
            );
        }
        setEditingId(null);
        setEditValue('');
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setDeleteId(id);
    };

    const confirmDelete = () => {
        if (deleteId) {
            setOperations(prev => prev.filter(op => op.id !== deleteId));
            setDeleteId(null);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSaveEdit();
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-xl font-medium text-foreground tracking-tight">Operations</h1>
                <div className="mt-2 text-sm text-[#7a7974] leading-relaxed max-w-4xl">
                    <p>
                        <span className={cn(
                            "transition-opacity duration-200",
                            isTooltipOpen && "opacity-40"
                        )}>
                            Define all of the steps and actions needed to produce products in your manufacturing or outsourced manufacturing process. The order listed here represents the order in which they will appear in the dropdown menu when choosing operations.
                        </span>{' '}
                        <HelpTooltip
                            title="Operations"
                            description="Operations represent the individual steps in your manufacturing process. You can reorder them by dragging, and they will appear in this order when creating manufacturing orders."
                            onOpenChange={setIsTooltipOpen}
                        >
                            <span className="ml-1 text-[#faf9f5] font-medium inline-flex items-center gap-1 transition-all cursor-pointer">Read more</span>
                        </HelpTooltip>
                    </p>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-background rounded-lg border border-border overflow-hidden max-w-4xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="h-8 bg-[#222220] border-b border-[#3a3a38]/50">
                            <th className="px-3 py-0 w-10 align-middle border-r border-[#3a3a38]/50"></th>
                            <th className="px-3 py-0 align-middle w-full border-r border-[#3a3a38]/50">
                                <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px]">
                                    Name
                                </span>
                            </th>
                            <th className="px-3 py-0 w-16 text-center bg-[#222220]"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3a3a38] text-[13px]">
                        {operations.map((operation, index) => (
                            <tr
                                key={operation.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                className={cn(
                                    "h-8 hover:bg-secondary/20 transition-colors group cursor-default",
                                    draggedIndex === index && "opacity-50",
                                    dragOverIndex === index && draggedIndex !== index && "border-t-2 border-t-[#d97757]"
                                )}
                            >
                                <td className="px-2 py-1 border-r border-[#3a3a38]/50 text-center cursor-grab active:cursor-grabbing">
                                    <div className="flex items-center justify-center">
                                        <GripVertical size={14} className="text-[#5a5a58] opacity-50 group-hover:opacity-100 transition-opacity mx-auto" />
                                    </div>
                                </td>
                                <td className="px-2 py-1 border-r border-[#3a3a38]/50">
                                    {editingId === operation.id ? (
                                        <input
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={handleSaveEdit}
                                            onKeyDown={handleKeyDown}
                                            autoFocus
                                            className="w-full h-6 bg-transparent border border-[#d97757] rounded-sm focus:outline-none focus:border-[#d97757] text-[13px] text-foreground px-2"
                                        />
                                    ) : (
                                        <div
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleStartEdit(operation);
                                            }}
                                            className="cursor-pointer w-full h-6 flex items-center text-foreground px-1"
                                        >
                                            {operation.name}
                                        </div>
                                    )}
                                </td>
                                <td className="px-2 py-0 text-center">
                                    <button
                                        onClick={(e) => handleDelete(operation.id, e)}
                                        className="text-[#ff7b6f] opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#ff7b6f]/10 rounded"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {/* Add Row Button */}
                        <tr className="bg-transparent border-t border-[#3a3a38]">
                            <td colSpan={3} className="p-2">
                                <button
                                    className="text-muted-foreground hover:text-primary hover:bg-secondary/50 h-8 px-2 text-xs font-medium flex items-center gap-1 transition-colors rounded"
                                    onClick={handleAddOperation}
                                >
                                    <Plus size={14} /> Add row
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="text-xs text-[#7a7974] px-1">
                {operations.length} operations defined
            </div>

            <DeleteConfirmDialog
                open={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                onConfirm={confirmDelete}
                title={`Delete the "${operations.find(op => op.id === deleteId)?.name || 'selected'}" operation?`}
                description="This operation will be permanently removed. This action cannot be undone."
                actionLabel="Delete"
            />
        </div>
    );
}
