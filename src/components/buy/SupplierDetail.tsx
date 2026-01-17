'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, X, MoreVertical, Check, Loader2, Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchSupplierById, updateSupplier, Supplier } from '@/lib/katana-data-provider';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Currency options
const CURRENCIES = [
    { value: 'CAD', label: 'CAD (Base)' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
    { value: 'CNY', label: 'CNY' },
];

interface SupplierDetailProps {
    id: string;
}

export function SupplierDetail({ id }: SupplierDetailProps) {
    const router = useRouter();
    const [supplier, setSupplier] = useState<Supplier | null>(null);
    const [loading, setLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
    const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);

    // Load supplier data
    useEffect(() => {
        async function loadSupplier() {
            setLoading(true);
            const data = await fetchSupplierById(id);
            setSupplier(data);
            setLoading(false);
        }
        loadSupplier();
    }, [id]);

    // Auto-save handler with debounce
    const handleFieldChange = useCallback((field: keyof Supplier, value: string | null) => {
        if (!supplier) return;

        // Update local state immediately
        setSupplier(prev => prev ? { ...prev, [field]: value } : null);

        // Clear existing timeout
        if (saveTimeout) {
            clearTimeout(saveTimeout);
        }

        // Set saving status
        setSaveStatus('saving');

        // Debounce save to database
        const timeout = setTimeout(async () => {
            await updateSupplier(id, { [field]: value });
            setSaveStatus('saved');
        }, 500);

        setSaveTimeout(timeout);
    }, [supplier, id, saveTimeout]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (saveTimeout) {
                clearTimeout(saveTimeout);
            }
        };
    }, [saveTimeout]);

    const handleClose = () => {
        router.push('/buy');
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-[#1a1a18]">
                <Loader2 className="h-8 w-8 animate-spin text-[#d97757]" />
            </div>
        );
    }

    if (!supplier) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#1a1a18] text-[#faf9f5]">
                <p className="text-lg">Supplier not found</p>
                <button
                    onClick={handleClose}
                    className="mt-4 text-[#d97757] hover:text-[#e08868] transition-colors"
                >
                    Go back
                </button>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-[#faf9f5]">
            {/* Header */}
            <header className="bg-white border-b border-[#e5e5e5] px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Left side - Title */}
                    <div>
                        <span className="text-[#7a7974] text-xs uppercase tracking-wider">Supplier</span>
                        <h1 className="text-xl font-semibold text-[#1a1a18]">{supplier.name}</h1>
                    </div>

                    {/* Right side - Status and actions */}
                    <div className="flex items-center gap-4">
                        {/* Save Status */}
                        <span className="flex items-center gap-2 text-sm text-[#7a7974]">
                            {saveStatus === 'saving' ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    All changes saved
                                </>
                            )}
                        </span>

                        {/* More options */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="p-2 hover:bg-[#f0f0f0] rounded transition-colors">
                                    <MoreVertical size={18} className="text-[#7a7974]" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white border-[#e5e5e5]">
                                <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600">
                                    Delete supplier
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-[#f0f0f0] rounded transition-colors"
                        >
                            <X size={18} className="text-[#7a7974]" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Blue accent bar */}
            <div className="h-1 bg-[#2196f3]" />

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-4xl">
                    {/* Two-column layout */}
                    <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Company name */}
                            <div>
                                <label className="block text-xs text-[#7a7974] mb-1">Company name</label>
                                <input
                                    type="text"
                                    value={supplier.name}
                                    onChange={(e) => handleFieldChange('name', e.target.value)}
                                    className="w-full bg-transparent text-[#1a1a18] text-sm border-0 border-b border-[#e5e5e5] focus:border-[#2196f3] focus:outline-none pb-2 transition-colors"
                                    placeholder="Company name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs text-[#7a7974] mb-1">Email</label>
                                <div className="flex items-center gap-2 border-b border-[#e5e5e5] pb-2">
                                    <Mail size={14} className="text-[#7a7974]" />
                                    <input
                                        type="email"
                                        value={supplier.email || ''}
                                        onChange={(e) => handleFieldChange('email', e.target.value || null)}
                                        className="flex-1 bg-transparent text-[#1a1a18] text-sm border-0 focus:outline-none"
                                        placeholder="email@example.com"
                                    />
                                </div>
                            </div>

                            {/* Phone number */}
                            <div>
                                <label className="block text-xs text-[#7a7974] mb-1">Phone number</label>
                                <div className="flex items-center gap-2 border-b border-[#e5e5e5] pb-2">
                                    <Phone size={14} className="text-[#7a7974]" />
                                    <input
                                        type="tel"
                                        value={supplier.phone || ''}
                                        onChange={(e) => handleFieldChange('phone', e.target.value || null)}
                                        className="flex-1 bg-transparent text-[#1a1a18] text-sm border-0 focus:outline-none"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-xs text-[#7a7974] mb-1">Address</label>
                                <div className="flex items-start gap-2 border-b border-[#e5e5e5] pb-2">
                                    <MapPin size={14} className="text-[#7a7974] mt-0.5" />
                                    <textarea
                                        value={supplier.address || ''}
                                        onChange={(e) => handleFieldChange('address', e.target.value || null)}
                                        className="flex-1 bg-transparent text-[#1a1a18] text-sm border-0 focus:outline-none resize-none min-h-[40px]"
                                        placeholder="Enter address..."
                                        rows={2}
                                    />
                                </div>
                            </div>

                            {/* Comment */}
                            <div>
                                <label className="block text-xs text-[#7a7974] mb-1">Comment</label>
                                <textarea
                                    value={supplier.comment || ''}
                                    onChange={(e) => handleFieldChange('comment', e.target.value || null)}
                                    className="w-full bg-transparent text-[#1a1a18] text-sm border-0 border-b border-[#e5e5e5] focus:border-[#2196f3] focus:outline-none pb-2 resize-none min-h-[60px] transition-colors"
                                    placeholder="Add notes about this supplier..."
                                    rows={3}
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Currency */}
                            <div>
                                <label className="block text-xs text-[#7a7974] mb-1">Currency</label>
                                <select
                                    value={supplier.currency}
                                    onChange={(e) => handleFieldChange('currency', e.target.value)}
                                    className="w-full bg-transparent text-[#1a1a18] text-sm border-0 border-b border-[#e5e5e5] focus:border-[#2196f3] focus:outline-none pb-2 cursor-pointer transition-colors appearance-none"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237a7974' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center' }}
                                >
                                    {CURRENCIES.map(c => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
