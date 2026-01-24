'use client';

import { useState, useEffect } from 'react';
import { Info, AlertTriangle } from 'lucide-react';
import { fetchSetting, updateSetting } from '@/lib/katana-data-provider';
import { DatePicker } from '@/components/ui/DatePicker';
import HelpTooltip from '@/components/ui/HelpTooltip';
import { cn } from '@/lib/utils';

export default function Costing() {
    const [closingDate, setClosingDate] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    useEffect(() => {
        loadSetting();
    }, []);

    const loadSetting = async () => {
        setIsLoading(true);
        const setting = await fetchSetting('inventory_closing_date');
        if (setting) {
            setClosingDate(setting.value);
        }
        setIsLoading(false);
    };

    const handleDateChange = async (date: string | null) => {
        if (!date) return;
        setClosingDate(date);
        await updateSetting('inventory_closing_date', date);
    };

    if (isLoading) {
        return (
            <div className="max-w-[1600px] mx-auto p-6">
                <div className="text-sm text-[#7a7974]">Loading...</div>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-xl font-medium text-foreground tracking-tight">Costing</h1>
                <div className="mt-2 text-sm text-[#7a7974] leading-relaxed max-w-4xl">
                    <p className="mb-1">
                        <span className={cn(
                            "transition-opacity duration-100",
                            isTooltipOpen && "opacity-40"
                        )}>
                            The inventory closing date defines the period where it's no longer possible to make changes to closed documents that affect inventory (Sales orders, Purchase orders, Stock adjustments, Manufacturing orders, etc).
                        </span>{' '}
                        <HelpTooltip
                            title="Inventory closing date"
                            description="The closing date protects your financial records by preventing changes to inventory transactions in closed periods. This ensures accounting accuracy and compliance."
                            onOpenChange={setIsTooltipOpen}
                        >
                            <span className="ml-1 text-[#faf9f5] font-medium inline-flex items-center gap-1 transition-all cursor-pointer">Read more</span>
                        </HelpTooltip>
                    </p>
                    <p className={cn(
                        "transition-opacity duration-100",
                        isTooltipOpen && "opacity-40"
                    )}>
                        Documents can only be edited or created if they haven't yet entered a closed period. At the end of each month, inventory periods will close automatically leaving only the current month and previous month open.
                    </p>
                </div>
            </div>

            {/* Example Block */}
            <div className="max-w-4xl">
                <div className="bg-[#222220] border border-[#3a3a38]/40 rounded-lg px-4 py-3">
                    <p className="text-sm text-[#9a9994] italic leading-relaxed">
                        <span className="text-[#7a7974] font-medium not-italic">Example:</span> If today is May 5th, then May and April are open periods, and everything before April 1st is in a closed period.
                    </p>
                </div>
            </div>

            {/* Date Setting */}
            <div className="space-y-3 max-w-md">
                <label className="text-[11px] uppercase font-semibold text-[#7a7974] tracking-wider">
                    Inventory closing date
                </label>
                <DatePicker
                    value={closingDate}
                    onChange={handleDateChange}
                />
            </div>

            {/* Warning Alert Box */}
            <div className="max-w-4xl">
                <div className="bg-[#3d2a1f] border border-[#f59e0b]/30 rounded-lg overflow-hidden">
                    {/* Alert Header */}
                    <div className="bg-[#f59e0b]/10 border-b border-[#f59e0b]/20 px-4 py-3 flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#f59e0b] flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-3 h-3 text-[#1a1a18]" strokeWidth={2.5} />
                        </div>
                        <h3 className="text-sm font-semibold text-[#f59e0b] tracking-tight">
                            Manually change the inventory closing date
                        </h3>
                    </div>

                    {/* Alert Content */}
                    <div className="px-4 py-4 space-y-4">
                        <div className="space-y-3 text-sm text-[#d4d4d0] leading-relaxed">
                            <p>
                                A manually changed inventory closing date will only stay in effect until the next automatic monthly closing cycle. If the closing date is manually moved forward from the default date, the automatic closing cycle will not reopen this closed period.
                            </p>
                            <p>
                                We <span className="text-[#faf9f5] font-medium">strongly recommend</span> communicating with your accountant before changing the inventory closing date.
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                // Placeholder for future modal/confirmation dialog
                                alert('This would open a confirmation dialog to change the closing date.');
                            }}
                            className="px-4 h-9 bg-transparent border border-[#5a5a58] hover:border-[#7a7974] rounded-md text-sm font-medium text-[#faf9f5] hover:bg-white/[0.03] transition-all"
                        >
                            Change inventory closing date
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
