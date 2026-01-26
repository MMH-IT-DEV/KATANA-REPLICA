'use client';

import { useState } from 'react';
import {
    Plus,
    Trash2,
    ChevronDown,
    ChevronRight,
    GripVertical,
    MoreHorizontal,
    Lock,
    Copy,
    Edit2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import HelpTooltip from '@/components/ui/HelpTooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PrintTemplate {
    id: string;
    name: string;
    visible: boolean;
    isSystem: boolean;
}

interface TemplateCategory {
    id: string;
    name: string;
    templates: PrintTemplate[];
    baseTemplates: string[];
}

const INITIAL_CATEGORIES: TemplateCategory[] = [
    {
        id: 'quote',
        name: 'Quote templates',
        templates: [
            { id: '1', name: 'Quote', visible: true, isSystem: true }
        ],
        baseTemplates: ['Quote', 'Barcode label']
    },
    {
        id: 'sales_order',
        name: 'Sales order templates',
        templates: [
            { id: '2', name: 'Sales order', visible: true, isSystem: true },
            { id: '3', name: 'Packing list', visible: true, isSystem: true },
            { id: '4', name: 'Barcode Label', visible: true, isSystem: true },
            { id: '5', name: 'Amazon Packing Slip', visible: true, isSystem: false }
        ],
        baseTemplates: ['Sales order', 'Packing list', 'Barcode label', 'Pick list']
    },
    {
        id: 'manufacturing_order',
        name: 'Manufacturing order templates',
        templates: [
            { id: '6', name: 'Manufacturing Order', visible: true, isSystem: true },
            { id: '7', name: 'Manufacturing Order for Taking Notes', visible: true, isSystem: false },
            { id: '8', name: 'Barcode Label', visible: true, isSystem: true },
            { id: '9', name: 'Pick list', visible: true, isSystem: true }
        ],
        baseTemplates: ['Manufacturing order', 'Barcode label', 'Pick list', 'Task list']
    },
    {
        id: 'consolidated_pick',
        name: 'Consolidated manufacturing pick list templates',
        templates: [
            { id: '10', name: 'Consolidated pick list', visible: true, isSystem: true },
            { id: '11', name: 'Consolidated pick list with storage location info', visible: true, isSystem: true }
        ],
        baseTemplates: ['Consolidated pick list']
    },
    {
        id: 'task_list',
        name: 'Task list templates',
        templates: [
            { id: '12', name: 'Tasks', visible: true, isSystem: true }
        ],
        baseTemplates: ['Task list']
    },
    {
        id: 'purchase_order',
        name: 'Purchase order templates',
        templates: [
            { id: '13', name: 'Purchase order', visible: true, isSystem: true },
            { id: '14', name: 'Request for quote', visible: true, isSystem: true },
            { id: '15', name: 'Barcode label with supplier code', visible: true, isSystem: true },
            { id: '16', name: 'Barcode label Internal', visible: true, isSystem: true },
            { id: '17', name: 'Barcode label', visible: true, isSystem: true },
            { id: '18', name: 'Purchase order COPY', visible: false, isSystem: false },
            { id: '19', name: 'Put-away list', visible: true, isSystem: true }
        ],
        baseTemplates: ['Bill of materials', 'Consolidated pick list', 'Purchase order', 'Request for quote', 'Barcode label with supplier code', 'Barcode label Internal', 'Barcode label', 'Put-away list']
    },
    {
        id: 'outsourced_po',
        name: 'Outsourced purchase order templates',
        templates: [
            { id: '20', name: 'Bill of materials', visible: true, isSystem: true },
            { id: '21', name: 'Consolidated pick list', visible: true, isSystem: true },
            { id: '22', name: 'Purchase order', visible: true, isSystem: true }
        ],
        baseTemplates: ['Bill of materials', 'Consolidated pick list', 'Purchase order', 'Barcode label']
    },
    {
        id: 'stock_adjustment',
        name: 'Stock adjustment templates',
        templates: [
            { id: '23', name: 'Stock adjustment', visible: true, isSystem: true }
        ],
        baseTemplates: ['Stock adjustment']
    },
    {
        id: 'stock_transfer',
        name: 'Stock transfer templates',
        templates: [
            { id: '24', name: 'Stock transfer', visible: true, isSystem: true }
        ],
        baseTemplates: ['Stock transfer']
    },
    {
        id: 'stocktake',
        name: 'Stocktake templates',
        templates: [
            { id: '25', name: 'Stocktake', visible: true, isSystem: true }
        ],
        baseTemplates: ['Stocktake']
    },
    {
        id: 'batch_tracking',
        name: 'Batch tracking templates',
        templates: [
            { id: '26', name: 'Batch tracking data', visible: true, isSystem: true }
        ],
        baseTemplates: ['Batch tracking']
    },
    {
        id: 'inventory_items',
        name: 'Inventory items templates',
        templates: [
            { id: '27', name: 'Inventory items', visible: true, isSystem: true }
        ],
        baseTemplates: ['Inventory items', 'Barcode label']
    }
];

export default function PrintTemplates() {
    const [categories, setCategories] = useState<TemplateCategory[]>(INITIAL_CATEGORIES);
    const [expandedCategories, setExpandedCategories] = useState<string[]>(['quote', 'sales_order', 'manufacturing_order', 'purchase_order']);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    // UI State for Drag and Drop
    const [draggedItem, setDraggedItem] = useState<{ categoryId: string, index: number } | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<{ categoryId: string, index: number } | null>(null);

    // Inline Editing State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleEdit = (templateId: string) => {
        window.open(`/settings/template-editor/${templateId}`, '_blank');
    };

    const handleDuplicate = (categoryId: string, template: PrintTemplate) => {
        const newTemplate: PrintTemplate = {
            ...template,
            id: Math.random().toString(36).substr(2, 9),
            name: `${template.name} (Copy)`,
            isSystem: false
        };
        setCategories(prev => prev.map(cat =>
            cat.id === categoryId
                ? { ...cat, templates: [...cat.templates, newTemplate] }
                : cat
        ));
    };

    const handleDelete = (categoryId: string, templateId: string) => {
        setCategories(prev => prev.map(cat =>
            cat.id === categoryId
                ? { ...cat, templates: cat.templates.filter(t => t.id !== templateId) }
                : cat
        ));
    };

    const handleToggleVisibility = (categoryId: string, templateId: string) => {
        setCategories(prev => prev.map(cat =>
            cat.id === categoryId
                ? { ...cat, templates: cat.templates.map(t => t.id === templateId ? { ...t, visible: !t.visible } : t) }
                : cat
        ));
    };

    const handleAddNew = (categoryId: string, baseName: string) => {
        const newTemplate: PrintTemplate = {
            id: Math.random().toString(36).substr(2, 9),
            name: baseName,
            visible: true,
            isSystem: false
        };
        setCategories(prev => prev.map(cat =>
            cat.id === categoryId
                ? { ...cat, templates: [...cat.templates, newTemplate] }
                : cat
        ));
    };

    const handleStartEdit = (template: PrintTemplate) => {
        if (template.isSystem) return;
        setEditingId(template.id);
        setEditValue(template.name);
    };

    const handleSaveName = (categoryId: string) => {
        if (editingId && editValue.trim()) {
            setCategories(prev => prev.map(cat =>
                cat.id === categoryId
                    ? { ...cat, templates: cat.templates.map(t => t.id === editingId ? { ...t, name: editValue } : t) }
                    : cat
            ));
        }
        setEditingId(null);
    };

    // Drag Handlers
    const onDragStart = (categoryId: string, index: number) => {
        setDraggedItem({ categoryId, index });
    };

    const onDragOver = (e: React.DragEvent, categoryId: string, index: number) => {
        e.preventDefault();
        if (draggedItem?.categoryId === categoryId) {
            setDragOverIndex({ categoryId, index });
        }
    };

    const onDrop = (categoryId: string, index: number) => {
        if (!draggedItem || draggedItem.categoryId !== categoryId || draggedItem.index === index) {
            setDraggedItem(null);
            setDragOverIndex(null);
            return;
        }

        setCategories(prev => prev.map(cat => {
            if (cat.id === categoryId) {
                const newTemplates = [...cat.templates];
                const [movedItem] = newTemplates.splice(draggedItem.index, 1);
                newTemplates.splice(index, 0, movedItem);
                return { ...cat, templates: newTemplates };
            }
            return cat;
        }));

        setDraggedItem(null);
        setDragOverIndex(null);
    };

    return (
        <div className="max-w-[1600px] mx-auto p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-xl font-medium text-foreground tracking-tight">Print templates</h1>
                <div className="mt-2 text-sm text-[#7a7974] leading-relaxed max-w-4xl">
                    <p>
                        <span className={cn(
                            "transition-opacity duration-200",
                            isTooltipOpen && "opacity-40"
                        )}>
                            Create, customize, and reorder print templates used throughout different areas of Katana. Disabling visibility on a template will hide it from that specific dropdown.{' '}
                        </span>
                        <HelpTooltip
                            title="Print Templates"
                            description="Maintain consistent branding and communication by customizing your print templates for quotes, orders, and internal lists."
                            onOpenChange={setIsTooltipOpen}
                        >
                            <span className="text-[#faf9f5] font-medium cursor-pointer">Read more</span>
                        </HelpTooltip>
                    </p>
                </div>
            </div>

            {/* Content: List of Categories */}
            <div className="space-y-4">
                {categories.map(category => (
                    <div key={category.id} className="space-y-2">
                        {/* Category Toggle */}
                        <button
                            onClick={() => toggleCategory(category.id)}
                            className="flex items-center gap-2 group w-full text-left py-1"
                        >
                            {expandedCategories.includes(category.id)
                                ? <ChevronDown size={14} className="text-[#7a7974]" />
                                : <ChevronRight size={14} className="text-[#7a7974]" />
                            }
                            <span className="text-sm font-medium text-foreground group-hover:text-[#faf9f5] transition-colors flex items-center gap-2">
                                {category.name}
                            </span>
                        </button>

                        {/* Collapsible Content */}
                        {expandedCategories.includes(category.id) && (
                            <div className="ml-5 space-y-3">
                                {category.templates.length > 0 ? (
                                    <div className="bg-background rounded-lg border border-border overflow-hidden max-w-4xl shadow-sm">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="h-8 bg-[#222220] border-b border-[#3a3a38]/50">
                                                    <th className="px-3 py-0 w-10 align-middle border-r border-[#3a3a38]/50"></th>
                                                    <th className="px-3 py-0 align-middle border-r border-[#3a3a38]/50 w-full">
                                                        <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px] flex items-center gap-1">
                                                            Template name
                                                        </span>
                                                    </th>
                                                    <th className="px-3 py-0 w-24 align-middle border-r border-[#3a3a38]/50 text-center">
                                                        <span className="font-medium text-[#7a7974] uppercase tracking-wider text-[11px] flex items-center gap-1 justify-center">
                                                            Visible
                                                        </span>
                                                    </th>
                                                    <th className="px-3 py-0 w-12 text-center bg-[#222220]"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#3a3a38] text-[13px]">
                                                {category.templates.map((template, idx) => (
                                                    <tr
                                                        key={template.id}
                                                        draggable
                                                        onDragStart={() => onDragStart(category.id, idx)}
                                                        onDragOver={(e) => onDragOver(e, category.id, idx)}
                                                        onDrop={() => onDrop(category.id, idx)}
                                                        onDragEnd={() => { setDraggedItem(null); setDragOverIndex(null); }}
                                                        className={cn(
                                                            "h-10 hover:bg-secondary/20 transition-colors group/row cursor-default",
                                                            draggedItem?.categoryId === category.id && draggedItem.index === idx && "opacity-40 bg-secondary/10",
                                                            dragOverIndex?.categoryId === category.id && dragOverIndex.index === idx && draggedItem?.index !== idx && "border-t-2 border-t-[#d97757]"
                                                        )}
                                                    >
                                                        <td className="px-2 py-1 border-r border-[#3a3a38]/50 text-center cursor-grab active:cursor-grabbing">
                                                            <GripVertical size={14} className="text-[#5a5a58] mx-auto opacity-50 group-hover/row:opacity-100 transition-opacity" />
                                                        </td>
                                                        <td className="px-3 py-1 border-r border-[#3a3a38]/50">
                                                            <div className="flex items-center justify-between group/name min-h-[28px]">
                                                                {editingId === template.id ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editValue}
                                                                        onChange={(e) => setEditValue(e.target.value)}
                                                                        onBlur={() => handleSaveName(category.id)}
                                                                        onKeyDown={(e) => e.key === 'Enter' && handleSaveName(category.id)}
                                                                        autoFocus
                                                                        className="w-full h-7 bg-transparent border border-[#d97757] rounded-sm focus:outline-none focus:border-[#d97757] text-[13px] text-foreground px-2 font-medium"
                                                                    />
                                                                ) : (
                                                                    <span
                                                                        className={cn(
                                                                            "text-foreground font-medium truncate flex-1",
                                                                            !template.isSystem && "cursor-pointer hover:text-[#faf9f5]"
                                                                        )}
                                                                        onClick={() => handleStartEdit(template)}
                                                                    >
                                                                        {template.name}
                                                                    </span>
                                                                )}
                                                                {template.isSystem && (
                                                                    <Lock size={12} className="text-[#7a7974] opacity-40 ml-2" />
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-3 py-1 border-r border-[#3a3a38]/50 text-center">
                                                            <div className="flex justify-center">
                                                                <Checkbox
                                                                    checked={template.visible}
                                                                    onCheckedChange={() => handleToggleVisibility(category.id, template.id)}
                                                                    className="size-4 data-[state=checked]:bg-[#a5d6ff] data-[state=checked]:border-transparent border-[#3a3a38] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none focus:outline-none focus-visible:outline-none ring-0 shadow-none ring-offset-0"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="px-2 py-0 text-center">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <button className="text-[#7a7974] hover:text-[#faf9f5] p-1.5 hover:bg-white/10 rounded transition-all transition-opacity opacity-0 group-hover/row:opacity-100">
                                                                        <MoreHorizontal size={14} />
                                                                    </button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="bg-[#1f1f1d] border-[#3a3a38] text-[#faf9f5] min-w-[140px]">
                                                                    <DropdownMenuItem className="text-xs hover:bg-secondary/50 cursor-pointer flex items-center gap-2" onClick={() => handleEdit(template.id)}>
                                                                        <Edit2 size={12} /> Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem className="text-xs hover:bg-secondary/50 cursor-pointer flex items-center gap-2" onClick={() => handleDuplicate(category.id, template)}>
                                                                        <Copy size={12} /> Duplicate
                                                                    </DropdownMenuItem>
                                                                    {!template.isSystem && (
                                                                        <DropdownMenuItem className="text-xs text-[#ff7b6f] focus:text-[#ff7b6f] focus:bg-[#ff7b6f]/30 cursor-pointer flex items-center gap-2" onClick={() => handleDelete(category.id, template.id)}>
                                                                            <Trash2 size={12} className="text-[#ff7b6f]" /> Delete
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="py-2 text-[13px] text-[#7a7974] italic">No templates in this category.</div>
                                )}

                                {/* Add New Template Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="text-[#7a7974] hover:text-[#d97757] hover:bg-white/[0.03] h-8 px-2 text-xs font-medium flex items-center gap-1.5 transition-all rounded">
                                            <Plus size={14} /> Add new
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className="bg-[#1f1f1d] border-[#3a3a38] text-[#faf9f5] min-w-[200px] max-h-[300px] overflow-y-auto scrollbar-hide">
                                        <div className="px-3 py-2 text-[10px] text-[#7a7974] font-bold uppercase tracking-wider border-b border-[#3a3a38]/50 mb-1">
                                            Select base template
                                        </div>
                                        {category.baseTemplates.map(base => (
                                            <DropdownMenuItem
                                                key={base}
                                                className="text-xs hover:bg-secondary/50 cursor-pointer py-2 px-3"
                                                onClick={() => handleAddNew(category.id, base)}
                                            >
                                                {base}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
