'use client';

import { Shell } from "@/components/layout/Shell";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronLeft, Save, Trash, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdjustmentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [id]);

    return (
        <Shell activeTab="Stock" activePage="Stock adjustments">
            <div className="flex-1 flex flex-col h-full bg-background overflow-hidden">
                {/* Header */}
                <div className="h-14 border-b border-border flex items-center justify-between px-6 bg-secondary/5 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/stock?tab=adjustments')}
                            className="p-1 hover:bg-secondary rounded-md text-muted-foreground transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <h1 className="text-sm font-bold tracking-tight uppercase">Stock Adjustment Details</h1>
                        <span className="text-xs text-muted-foreground font-mono bg-secondary/50 px-2 py-0.5 rounded">
                            {id}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-2">
                            <Trash size={14} />
                            Delete
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                            <MoreHorizontal size={14} />
                        </Button>
                        <div className="w-px h-4 bg-border mx-1" />
                        <Button size="sm" className="h-8 text-xs gap-2 bg-[#F37021] hover:bg-[#D55F1C]">
                            <Save size={14} />
                            Save
                        </Button>
                    </div>
                </div>

                {/* Content Placeholder */}
                <div className="flex-1 overflow-auto p-8">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="grid grid-cols-2 gap-8 bg-card p-6 rounded-lg border border-border/50">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Adjustment Reason</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Damage, Inventory count"
                                        className="w-full bg-transparent border-b border-border py-1 text-sm focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Location</label>
                                    <div className="text-sm border-b border-border py-1">Main Warehouse</div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Adjustment Date</label>
                                    <div className="text-sm border-b border-border py-1">{new Date().toLocaleDateString()}</div>
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Status</label>
                                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                                        Open
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Line Items Placeholder */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold uppercase tracking-wider">Items</h2>
                                <Button variant="outline" size="sm" className="h-8 text-xs gap-2">
                                    <Plus size={14} />
                                    Add row
                                </Button>
                            </div>
                            <div className="border border-border rounded-lg overflow-hidden bg-card">
                                <table className="w-full text-sm">
                                    <thead className="bg-secondary/20">
                                        <tr className="border-b border-border h-10">
                                            <th className="px-4 text-[10px] font-bold uppercase text-muted-foreground text-left">Item / Variant</th>
                                            <th className="px-4 text-[10px] font-bold uppercase text-muted-foreground text-right w-[150px]">Adjustment Qty</th>
                                            <th className="px-4 text-[10px] font-bold uppercase text-muted-foreground text-right w-[150px]">Cost / Unit</th>
                                            <th className="px-4 text-[10px] font-bold uppercase text-muted-foreground text-right w-[150px]">Total Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="h-14 border-b border-border/50 italic text-muted-foreground">
                                            <td colSpan={4} className="px-4 text-center text-xs">No items added to this adjustment yet.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex justify-center p-12 border-2 border-dashed border-border rounded-xl">
                            <div className="text-center space-y-2">
                                <p className="text-sm text-foreground font-medium">Detailed Stock Adjustment Form</p>
                                <p className="text-xs text-muted-foreground">This feature is currently under active development. You can now create and navigate to adjustments, but adding rows and finalizing will be available in the next update.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}

import { Plus } from "lucide-react";
