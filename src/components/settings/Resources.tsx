'use client';

import React, { useState } from 'react';
import { Trash2, Plus, GripVertical, HelpCircle, Check, User } from 'lucide-react';
import HelpTooltip from '@/components/ui/HelpTooltip';
import { DeleteConfirmDialog } from '@/components/ui/DeleteConfirmDialog';
import { cn } from '@/lib/utils';

interface Resource {
    id: string;
    name: string;
    operators: string[];
    costPerHour: number;
    order: number;
}

const OPERATORS_LIST = [
    'Natalia', 'Khrystyna', 'Danee', 'Erik', 'Lisa',
    'Lilia', 'Alina', 'Solene', 'Holly', 'Victoria',
    'Olena', 'Anastasia', 'Daria', 'Luan'
];

const mockResources: Resource[] = [
    { id: '1', name: 'KITCHEN', operators: [], costPerHour: 20.00, order: 1 },
    { id: '2', name: 'PREPARATION ZONE', operators: [], costPerHour: 20.00, order: 2 },
    { id: '3', name: 'POURING ISLAND', operators: [], costPerHour: 20.00, order: 3 },
    { id: '4', name: 'LABELLING ZONE', operators: [], costPerHour: 20.00, order: 4 },
    { id: '5', name: 'ASSEMBLY ZONE', operators: [], costPerHour: 20.00, order: 5 },
    { id: '6', name: 'PACKAGING ZONE', operators: [], costPerHour: 20.00, order: 6 },
];

// Component: Operator Multi-Select
const OperatorMultiSelect = ({
    selectedOperators,
    onUpdate
}: {
    selectedOperators: string[];
    onUpdate: (operators: string[]) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

    const handleOpen = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const dropdownHeight = 300;
            const viewportHeight = window.innerHeight;
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;

            if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
                setDropdownStyle({
                    bottom: viewportHeight - rect.top + 4,
                    left: rect.left,
                    maxHeight: Math.min(dropdownHeight, spaceAbove - 20)
                });
            } else {
                setDropdownStyle({
                    top: rect.bottom + 4,
                    left: rect.left,
                    maxHeight: Math.min(dropdownHeight, spaceBelow - 20)
                });
            }
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={handleOpen}
                className="w-full min-h-[28px] text-xs px-2 py-1 bg-transparent border border-[#3a3a38]/50 rounded-md focus:ring-0 shadow-none flex items-center justify-start text-left hover:bg-white/[0.03] transition-colors"
            >
                {selectedOperators.length === 0 ? (
                    <span className="text-muted-foreground flex items-center gap-1 text-xs px-1">
                        <User size={12} className="opacity-50" />
                        Unassigned
                    </span>
                ) : (
                    <div className="flex flex-wrap gap-1 px-1">
                        {selectedOperators.map(op => (
                            <span
                                key={op}
                                className="bg-[#4a4a48] text-gray-200 px-2 py-0.5 rounded text-[11px] font-medium"
                            >
                                {op}
                            </span>
                        ))}
                    </div>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
                    <div
                        className={cn(
                            "fixed bg-[#1f1f1d] border border-[#3a3a38] rounded-lg shadow-2xl z-[9999] w-[180px] flex flex-col overflow-hidden",
                            "animate-in fade-in zoom-in-95 duration-150 ease-out"
                        )}
                        style={dropdownStyle}
                    >
                        <div className="px-3 py-1.5 text-[11px] text-[#7a7974] font-medium uppercase tracking-wider border-b border-[#3a3a38]/50">
                            Select operators
                        </div>
                        <div className="flex-1 overflow-y-auto py-1 px-1 scrollbar-hide overflow-x-hidden max-h-[250px]">
                            {OPERATORS_LIST.map(name => {
                                const isChecked = selectedOperators.includes(name);
                                return (
                                    <label
                                        key={name}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-1.5 cursor-pointer rounded-md transition-colors mb-0.5 last:mb-0",
                                            isChecked ? "bg-[#2a2a28] text-white" : "hover:bg-[#2a2a28]/60 text-[#bebebe] hover:text-white"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors border-[#3a3a38] bg-[#2a2a28]",
                                                isChecked ? "bg-[#a5d6ff] border-[#a5d6ff]" : "bg-transparent border-[#3a3a38]"
                                            )}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const newSelection = isChecked
                                                    ? selectedOperators.filter(o => o !== name)
                                                    : [...selectedOperators, name];
                                                onUpdate(newSelection);
                                            }}
                                        >
                                            {isChecked && (
                                                <Check size={10} className="text-black" />
                                            )}
                                        </div>
                                        <span className="text-xs">{name}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default function Resources() {
    const [resources, setResources] = useState<Resource[]>(mockResources);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
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

        const newResources = [...resources];
        const [movedItem] = newResources.splice(draggedIndex, 1);
        newResources.splice(index, 0, movedItem);

        const updatedResources = newResources.map((res, idx) => ({
            ...res,
            order: idx + 1
        }));

        setResources(updatedResources);
        setDraggedIndex(null);
    };

    const handleDragEnd = (e: React.DragEvent) => {
        const target = e.target as HTMLElement;
        target.classList.remove('opacity-50');
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleAddRow = () => {
        const newResource: Resource = {
            id: Math.random().toString(36).substr(2, 9),
            name: 'New resource',
            operators: [],
            costPerHour: 20.00,
            order: resources.length + 1
        };
        setResources(prev => [...prev, newResource]);
        setEditingId(newResource.id);
        setEditValue('New resource');
    };

    const handleStartEdit = (resource: Resource) => {
        if (editingId && editValue.trim() && editingId !== resource.id) {
            setResources(prev =>
                prev.map(r => (r.id === editingId ? { ...r, name: editValue.trim() } : r))
            );
        }
        setEditingId(resource.id);
        setEditValue(resource.name || '');
    };

    const handleSaveEdit = () => {
        if (editingId && editValue.trim()) {
            setResources(prev =>
                prev.map(r => (r.id === editingId ? { ...r, name: editValue.trim() } : r))
            );
        }
        setEditingId(null);
        setEditValue('');
    };

    const updateCost = (id: string, cost: string) => {
        const value = parseFloat(cost) || 0;
        setResources(prev => prev.map(r => r.id === id ? { ...r, costPerHour: value } : r));
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setDeleteId(id);
    };

    const confirmDelete = () => {
        if (deleteId) {
            setResources(prev => prev.filter(r => r.id !== deleteId));
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
                <h1 className="text-xl font-medium text-foreground tracking-tight">Resources</h1>
                <div className="mt-2 text-sm text-[#7a7974] leading-relaxed max-w-4xl">
                    <p>
                        <span className={cn(
                            "transition-opacity duration-200",
                            isTooltipOpen && "opacity-40"
                        )}>
                            Resources are anything from employees to workstations. They can be assigned to default operators. Managing resources in Katana allows you to assign specific tasks and calculate operational costs more easily.
                        </span>{' '}
                        <HelpTooltip
                            title="Resources"
                            description="Resources represent workstations or people involved in production. Defining them helps track capacity and calculate labor costs in manufacturing orders."
                            onOpenChange={setIsTooltipOpen}
                        >
                            <span className="ml-1 text-[#faf9f5] font-medium inline-flex items-center gap-1 transition-all cursor-pointer">Read more</span>
                        </HelpTooltip>
                    </p>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-background rounded-lg border border-border overflow-hidden max-w-5xl shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="h-8 bg-[#222220] border-b border-[#3a3a38]/50">
                            <th className="px-3 py-0 w-10 align-middle border-r border-[#3a3a38]/50"></th>
                            <th className="px-3 py-0 align-middle w-[35%] border-r border-[#3a3a38]/50">
                                <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px] flex items-center gap-1">
                                    Name
                                </span>
                            </th>
                            <th className="px-3 py-0 align-middle w-[30%] border-r border-[#3a3a38]/50">
                                <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px] flex items-center gap-1">
                                    Default operators
                                </span>
                            </th>
                            <th className="px-3 py-0 align-middle w-[35%] border-r border-[#3a3a38]/50">
                                <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px] flex items-center gap-1">
                                    Default cost per hour
                                </span>
                            </th>
                            <th className="px-3 py-0 w-12 text-center bg-[#222220]"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3a3a38] text-[13px]">
                        {resources.map((resource, index) => (
                            <tr
                                key={resource.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                className={cn(
                                    "h-9 hover:bg-secondary/20 transition-colors group cursor-default",
                                    draggedIndex === index && "opacity-50",
                                    dragOverIndex === index && draggedIndex !== index && "border-t-2 border-t-[#d97757]"
                                )}
                            >
                                <td className="px-2 py-1 border-r border-[#3a3a38]/50 text-center cursor-grab active:cursor-grabbing">
                                    <div className="flex items-center justify-center">
                                        <GripVertical size={14} className="text-[#5a5a58] opacity-50 group-hover:opacity-100 transition-opacity mx-auto" />
                                    </div>
                                </td>
                                <td className="px-3 py-1 border-r border-[#3a3a38]/50">
                                    {editingId === resource.id ? (
                                        <input
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={handleSaveEdit}
                                            onKeyDown={handleKeyDown}
                                            autoFocus
                                            className="w-full h-7 bg-transparent border border-[#d97757] rounded-sm focus:outline-none focus:border-[#d97757] text-[13px] text-foreground px-2"
                                        />
                                    ) : (
                                        <div
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleStartEdit(resource);
                                            }}
                                            className="cursor-pointer w-full h-7 flex items-center text-foreground px-1"
                                        >
                                            {resource.name}
                                        </div>
                                    )}
                                </td>
                                <td className="px-3 py-1 border-r border-[#3a3a38]/50">
                                    <OperatorMultiSelect
                                        selectedOperators={resource.operators}
                                        onUpdate={(newOperators) => {
                                            setResources(prev => prev.map(r => r.id === resource.id ? { ...r, operators: newOperators } : r));
                                        }}
                                    />
                                </td>
                                <td className="px-3 py-1 border-r border-[#3a3a38]/50">
                                    <div className="flex items-center justify-end w-full gap-2 pr-1">
                                        <input
                                            type="number"
                                            value={resource.costPerHour.toFixed(2)}
                                            onChange={(e) => updateCost(resource.id, e.target.value)}
                                            className="w-full h-7 bg-transparent border-none text-right focus:outline-none focus:ring-1 focus:ring-[#3a3a38] rounded-sm text-[13px] text-foreground px-1"
                                        />
                                        <span className="text-[#7a7974] text-[11px] font-medium shrink-0">CAD</span>
                                    </div>
                                </td>
                                <td className="px-2 py-0 text-center">
                                    <button
                                        onClick={(e) => handleDelete(resource.id, e)}
                                        className="text-[#ff7b6f] opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#ff7b6f]/10 rounded"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        <tr className="bg-transparent border-t border-[#3a3a38]">
                            <td colSpan={5} className="p-2">
                                <button
                                    className="text-[#7a7974] hover:text-[#d97757] hover:bg-white/[0.03] h-8 px-2 text-xs font-medium flex items-center gap-1.5 transition-all rounded"
                                    onClick={handleAddRow}
                                >
                                    <Plus size={14} /> Add row
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="text-xs text-[#7a7974] px-1">
                {resources.length} resources defined
            </div>

            <DeleteConfirmDialog
                open={!!deleteId}
                onOpenChange={(open) => !open && setDeleteId(null)}
                onConfirm={confirmDelete}
                title={`Delete the "${resources.find(r => r.id === deleteId)?.name || 'selected'}" resource?`}
                description="This resource will be permanently removed. This action cannot be undone."
                actionLabel="Delete"
            />
        </div>
    );
}
