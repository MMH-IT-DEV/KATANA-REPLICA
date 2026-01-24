'use client';

import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight, HelpCircle, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import HelpTooltip from '@/components/ui/HelpTooltip';

interface CustomField {
    id: string;
    name: string;
    placesShown: string[];
}

interface CustomFieldCollection {
    id: string;
    name: string;
    isExpanded: boolean;
    fields: CustomField[];
}

export default function CustomFields() {
    const [collections, setCollections] = useState<CustomFieldCollection[]>([
        {
            id: '1',
            name: 'Key Materials',
            isExpanded: true,
            fields: []
        }
    ]);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const toggleCollection = (id: string) => {
        setCollections(prev => prev.map(c =>
            c.id === id ? { ...c, isExpanded: !c.isExpanded } : c
        ));
    };

    const updateCollectionName = (id: string, name: string) => {
        setCollections(prev => prev.map(c =>
            c.id === id ? { ...c, name } : c
        ));
    };

    const deleteCollection = (id: string) => {
        setCollections(prev => prev.filter(c => c.id !== id));
    };

    const createCollection = () => {
        const newCollection: CustomFieldCollection = {
            id: Math.random().toString(36).substr(2, 9),
            name: 'New collection',
            isExpanded: true,
            fields: []
        };
        setCollections(prev => [...prev, newCollection]);
    };

    const addFieldToCollection = (collectionId: string) => {
        setCollections(prev => prev.map(c => {
            if (c.id === collectionId) {
                if (c.fields.length >= 3) {
                    alert('Each collection can include up to 3 fields.');
                    return c;
                }
                const newField: CustomField = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: 'New custom field',
                    placesShown: ['Sales orders']
                };
                return { ...c, fields: [...c.fields, newField] };
            }
            return c;
        }));
    };

    const deleteField = (collectionId: string, fieldId: string) => {
        setCollections(prev => prev.map(c => {
            if (c.id === collectionId) {
                return { ...c, fields: c.fields.filter(f => f.id !== fieldId) };
            }
            return c;
        }));
    };

    return (
        <div className="max-w-[1600px] mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="space-y-4 max-w-4xl">
                <p className="text-sm text-[#7a7974] leading-relaxed">
                    <span className={cn(
                        "transition-opacity duration-100",
                        isTooltipOpen && "opacity-40"
                    )}>
                        Manage custom fields for items by organizing them into different collections. Each collection can include <span className="text-[#faf9f5] font-medium">up to 3 fields</span>, and the value of the fields can be defined on each item.
                    </span>
                    <br />
                    <span className={cn(
                        "transition-opacity duration-100",
                        isTooltipOpen && "opacity-40"
                    )}>
                        Use the <span className="text-[#faf9f5] font-medium">Places where shown</span> column to select the types of orders in which each custom field can be found.
                    </span>
                    <HelpTooltip
                        title="Custom fields"
                        description="Custom fields allow you to add additional information to items that can be displayed on sales orders, purchase orders, and other documents."
                        onOpenChange={setIsTooltipOpen}
                    >
                        <span className="ml-1 text-[#faf9f5] font-medium inline-flex items-center gap-1 transition-all cursor-pointer">Learn more</span>
                    </HelpTooltip>
                </p>
                <h1 className="text-xl font-medium text-foreground tracking-tight">Custom fields on Items</h1>
            </div>

            {/* Collections List */}
            <div className="space-y-8">
                {collections.map(collection => (
                    <div key={collection.id} className="bg-transparent pb-4">
                        {/* Collection Header */}
                        <div className="flex items-start group mb-4">
                            <button
                                onClick={() => toggleCollection(collection.id)}
                                className="mt-[26px] mr-3 text-muted-foreground hover:text-foreground transition-colors pt-1"
                            >
                                {collection.isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            </button>

                            <div className="flex-1 flex items-end justify-between">
                                <div className="space-y-1.5 flex-1 max-w-md">
                                    <label className="text-[11px] uppercase font-semibold text-[#7a7974] tracking-wider ml-0.5">
                                        Collection name
                                    </label>
                                    <input
                                        type="text"
                                        value={collection.name}
                                        onChange={(e) => updateCollectionName(collection.id, e.target.value)}
                                        className="block w-full bg-[#1a1a18] border border-[#3a3a38] hover:border-[#5a5a58] focus:outline-none focus:ring-2 focus:ring-[#d97757] focus:border-transparent rounded-md text-sm px-3 py-2 text-[#faf9f5] transition-all placeholder:text-[#5a5a58]"
                                        placeholder="Enter collection name..."
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Expandable Fields Section */}
                        {collection.isExpanded && (
                            <div className="ml-8 space-y-4">
                                {collection.fields.length > 0 ? (
                                    <div className="bg-background rounded-lg border border-[#3a3a38]/40 overflow-hidden max-w-4xl shadow-sm">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="h-8 bg-[#222220] border-b border-[#3a3a38]/40 text-[10px] uppercase font-bold text-[#7a7974] tracking-widest">
                                                    <th className="px-4 py-0 align-middle border-r border-[#3a3a38]/20 w-[45%]">Field name</th>
                                                    <th className="px-4 py-0 align-middle">Places where shown</th>
                                                    <th className="px-4 py-0 w-10"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#3a3a38]/20">
                                                {collection.fields.map(field => (
                                                    <tr key={field.id} className="group/row hover:bg-white/[0.015] transition-colors h-9">
                                                        <td className="py-0 px-4 border-r border-[#3a3a38]/20 align-middle">
                                                            <input
                                                                type="text"
                                                                value={field.name}
                                                                onChange={(e) => {
                                                                    setCollections(prev => prev.map(c => {
                                                                        if (c.id === collection.id) {
                                                                            return {
                                                                                ...c,
                                                                                fields: c.fields.map(f => f.id === field.id ? { ...f, name: e.target.value } : f)
                                                                            };
                                                                        }
                                                                        return c;
                                                                    }));
                                                                }}
                                                                className="bg-transparent border-0 focus:outline-none focus:ring-0 text-[13px] p-0 text-[#faf9f5] font-medium w-full placeholder:text-[#5a5a58] h-full"
                                                                placeholder="Field name..."
                                                            />
                                                        </td>
                                                        <td className="py-0 px-4 align-middle">
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {field.placesShown.map(place => (
                                                                    <button
                                                                        key={place}
                                                                        className="text-[10px] bg-[#1a1a18] text-[#9a9994] px-1.5 py-0.5 rounded border border-[#3a3a38] hover:border-[#5a5a58] hover:text-[#faf9f5] transition-all"
                                                                    >
                                                                        {place}
                                                                    </button>
                                                                ))}
                                                                <button className="text-[10px] text-[#7a7974] border border-dashed border-[#3a3a38] px-2 py-0.5 rounded hover:border-[#5a5a58] hover:text-[#faf9f5] transition-all">
                                                                    + Add
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="py-0 px-2 text-right align-middle">
                                                            <button
                                                                onClick={() => deleteField(collection.id, field.id)}
                                                                className="text-[#ff7b6f]/70 hover:text-[#ff7b6f] opacity-0 group-hover/row:opacity-100 hover:bg-[#ff7b6f]/10 p-1.5 rounded transition-all"
                                                            >
                                                                <Trash2 size={13} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {/* Pattern: Add Row Button Inside Table */}
                                                <tr className="bg-transparent">
                                                    <td colSpan={3} className="p-1.5">
                                                        <button
                                                            className="text-[#7a7974] hover:text-[#d97757] hover:bg-white/[0.03] h-7 px-2.5 text-[11px] font-medium flex items-center gap-1.5 transition-all rounded w-full"
                                                            onClick={() => addFieldToCollection(collection.id)}
                                                        >
                                                            <Plus size={13} className="mb-0.5" /> Add new field
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => addFieldToCollection(collection.id)}
                                        className="text-[#7a7974] hover:text-[#d97757] hover:bg-white/[0.03] h-8 px-2 text-xs font-medium flex items-center gap-1.5 transition-all rounded"
                                    >
                                        <Plus size={14} />
                                        Add new field
                                    </button>
                                )}
                            </div>
                        )}
                        <div className="border-b border-[#3a3a38]/20 mt-8 ml-8"></div>
                    </div>
                ))}
            </div>

            {/* Global Actions */}
            <div className="pt-2">
                <button
                    onClick={createCollection}
                    className="text-[#7a7974] hover:text-[#faf9f5] hover:bg-white/[0.03] h-8 px-2 text-xs font-medium flex items-center gap-1.5 transition-all rounded"
                >
                    <Plus size={14} />
                    Create a custom field collection
                </button>
            </div>
        </div>
    );
}
