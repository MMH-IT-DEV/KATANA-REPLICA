'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

/**
 * VARIATION A: Minimal Clean
 * - Less visual weight
 * - Bottom borders only for inputs (like underline)
 * - More whitespace
 * - Smaller, subtle labels
 */
export function MinimalCleanPopup({ open, onOpenChange }: any) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5] max-w-lg p-8">
                <DialogHeader className="mb-6">
                    <DialogTitle className="text-xl font-light tracking-tight">Edit address</DialogTitle>
                </DialogHeader>

                <div className="space-y-8">
                    <div className="space-y-1">
                        <Label className="text-[10px] text-[#7a7974] uppercase tracking-widest font-semibold">Street address</Label>
                        <input className="w-full bg-transparent border-b border-[#3a3a38] py-2 text-sm focus:outline-none focus:border-[#d97757] transition-colors" placeholder="1005 Ethel Street" />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-1">
                            <Label className="text-[10px] text-[#7a7974] uppercase tracking-widest font-semibold">City</Label>
                            <input className="w-full bg-transparent border-b border-[#3a3a38] py-2 text-sm focus:outline-none focus:border-[#d97757] transition-colors" placeholder="Kelowna" />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] text-[#7a7974] uppercase tracking-widest font-semibold">State</Label>
                            <input className="w-full bg-transparent border-b border-[#3a3a38] py-2 text-sm focus:outline-none focus:border-[#d97757] transition-colors" placeholder="BC" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#3a3a38]/30">
                    <button className="text-[#ff7b6f] text-xs font-medium px-3 py-1.5 rounded border border-[#ff7b6f]/20 bg-[#ff7b6f]/5">Remove address</button>
                    <div className="flex gap-4">
                        <Button variant="ghost" className="text-sm font-light">Cancel</Button>
                        <Button className="bg-[#d97757] hover:bg-[#c66b4d] text-white px-8">Ok</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

/**
 * VARIATION B: Card Style
 * - Floating card feel
 * - Grouped sections
 * - Softer corners
 */
export function CardStylePopup({ open, onOpenChange }: any) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5] max-w-lg p-0 overflow-hidden rounded-xl">
                <div className="p-6 bg-[#262624]/50 border-b border-[#3a3a38]">
                    <DialogTitle className="text-lg font-semibold">Update Warehouse Address</DialogTitle>
                </div>

                <div className="p-6 space-y-4">
                    <div className="bg-[#262624] p-4 rounded-lg border border-[#3a3a38] space-y-4">
                        <div className="space-y-1.5">
                            <Label className="text-xs text-[#7a7974]">Location Details</Label>
                            <Input className="bg-[#1a1a18] border-[#3a3a38] rounded-md" placeholder="Street Address" />
                            <Input className="bg-[#1a1a18] border-[#3a3a38] rounded-md" placeholder="Additional Details" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#262624] p-4 rounded-lg border border-[#3a3a38] space-y-2">
                            <Label className="text-xs text-[#7a7974]">Region</Label>
                            <Input className="bg-[#1a1a18] border-[#3a3a38]" placeholder="City" />
                            <Input className="bg-[#1a1a18] border-[#3a3a38]" placeholder="State" />
                        </div>
                        <div className="bg-[#262624] p-4 rounded-lg border border-[#3a3a38] space-y-2">
                            <Label className="text-xs text-[#7a7974]">Postal</Label>
                            <Input className="bg-[#1a1a18] border-[#3a3a38]" placeholder="Zip Code" />
                            <Input className="bg-[#1a1a18] border-[#3a3a38]" placeholder="Country" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-[#1a1a18] flex items-center justify-between border-t border-[#3a3a38]">
                    <button className="text-[#ff7b6f] text-xs font-semibold px-3 py-2 rounded-lg border border-[#ff7b6f]/30 bg-[#ff7b6f]/10">REMOVE</button>
                    <div className="flex gap-2">
                        <Button variant="outline" className="border-[#3a3a38] rounded-lg">Dismiss</Button>
                        <Button className="bg-[#d97757] rounded-lg px-6">Save Changes</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

/**
 * VARIATION C: Tight & Compact
 * - Efficient space
 * - Closer fields
 * - Professional/enterprise feel
 */
export function CompactPopup({ open, onOpenChange }: any) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5] max-w-md p-4">
                <div className="flex items-center justify-between mb-4 px-2">
                    <DialogTitle className="text-sm font-bold uppercase tracking-tight">Edit Address</DialogTitle>
                </div>

                <div className="grid gap-2 text-[13px]">
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <Label className="text-right text-[#7a7974]">Street</Label>
                        <Input className="h-8 text-xs bg-[#262624] border-[#3a3a38]" />
                    </div>
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <Label className="text-right text-[#7a7974]">Details</Label>
                        <Input className="h-8 text-xs bg-[#262624] border-[#3a3a38]" />
                    </div>
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <Label className="text-right text-[#7a7974]">City/State</Label>
                        <div className="flex gap-2">
                            <Input className="h-8 text-xs bg-[#262624] border-[#3a3a38]" />
                            <Input className="h-8 text-xs bg-[#262624] border-[#3a3a38] w-20" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#3a3a38]">
                    <button className="text-[#ff7b6f] text-[11px] font-bold uppercase p-1 px-2 border border-[#ff7b6f]/20 rounded bg-[#ff7b6f]/5">Delete</button>
                    <div className="flex gap-1">
                        <Button variant="ghost" className="h-8 text-xs">Cancel</Button>
                        <Button className="h-8 text-xs bg-[#d97757] px-4">Save</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
