'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import HelpTooltip from '@/components/ui/HelpTooltip';

export default function Manufacturing() {
    const [settings, setSettings] = useState({
        picking_required: false,
        ask_consumed_qty: true,
        ask_finished_qty: true,
        show_mfg_deadline: true,
        show_so_deadline: true
    });

    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [isNoteTooltipOpen, setIsNoteTooltipOpen] = useState(false);

    const toggleSetting = (id: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="max-w-[1600px] mx-auto p-6 space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-xl font-medium text-[#faf9f5] tracking-tight">Manufacturing settings</h1>
                <p className="text-[13px] leading-relaxed max-w-2xl">
                    <span className={cn(
                        "text-[#7a7974] transition-opacity duration-200",
                        isTooltipOpen && "opacity-40"
                    )}>
                        Customize specific manufacturing and Shop floor app settings included in the Advanced Manufacturing add-on.{' '}
                    </span>
                    <HelpTooltip
                        title="Manufacturing settings"
                        description="Configure advanced manufacturing workflows and shop floor operator visibility."
                        onOpenChange={setIsTooltipOpen}
                    >
                        <span className="text-[#faf9f5] hover:text-[#faf9f5]/80 transition-colors cursor-pointer ml-1">
                            Learn more
                        </span>
                    </HelpTooltip>
                </p>
            </div>

            {/* Section 1: Manufacturing settings */}
            <div className="space-y-6">
                <h2 className="text-sm font-bold text-[#faf9f5]">Manufacturing settings</h2>

                <div className="flex items-center justify-between max-w-2xl group">
                    <div className="flex items-center gap-3">
                        <span className="text-[13px] text-[#faf9f5]">
                            Picking of raw ingredients is required for manufacturing orders
                        </span>
                    </div>
                    <Switch
                        checked={settings.picking_required}
                        onCheckedChange={() => toggleSetting('picking_required')}
                    />
                </div>
            </div>

            {/* Section 2: Shop floor app settings */}
            <div className="space-y-6">
                <h2 className="text-sm font-bold text-[#faf9f5]">Shop floor app settings</h2>

                <div className="space-y-5 max-w-2xl">
                    <div className="flex items-center justify-between group">
                        <span className="text-[13px] text-[#faf9f5]">
                            Ask consumed ingredient quantities from the operator when a task is finished
                        </span>
                        <Switch
                            checked={settings.ask_consumed_qty}
                            onCheckedChange={() => toggleSetting('ask_consumed_qty')}
                        />
                    </div>

                    <div className="flex items-center justify-between group">
                        <span className="text-[13px] text-[#faf9f5]">
                            Ask the quantity of finished products from the operator when a manufacturing order is completed
                        </span>
                        <Switch
                            checked={settings.ask_finished_qty}
                            onCheckedChange={() => toggleSetting('ask_finished_qty')}
                        />
                    </div>

                    <div className="flex items-center justify-between group">
                        <span className="text-[13px] text-[#faf9f5]">
                            Show manufacturing order deadline in floor app
                        </span>
                        <Switch
                            checked={settings.show_mfg_deadline}
                            onCheckedChange={() => toggleSetting('show_mfg_deadline')}
                        />
                    </div>

                    <div className="flex items-center justify-between group">
                        <span className="text-[13px] text-[#faf9f5]">
                            Show sales order deadline in floor app
                        </span>
                        <Switch
                            checked={settings.show_so_deadline}
                            onCheckedChange={() => toggleSetting('show_so_deadline')}
                        />
                    </div>
                </div>
            </div>

            {/* Info Note Box */}
            <div className="bg-[#ffffff]/[0.03] border border-[#ffffff]/[0.08] rounded-md p-4 max-w-4xl">
                <p className="text-[13px] leading-relaxed text-[#7a7974]">
                    <span className="font-medium mr-1 text-[#faf9f5]">Note:</span>
                    <span className="italic">
                        The setting of "Show operations consecutively" has moved to each product operations setup. You can now configure this for each product operations separately.{' '}
                    </span>
                    <HelpTooltip
                        title="Relocated Settings"
                        description="Operation sequence settings are now managed at the product level for greater flexibility."
                        onOpenChange={setIsNoteTooltipOpen}
                    >
                        <span className="text-[#faf9f5] hover:text-[#faf9f5]/80 transition-colors cursor-pointer">
                            Read more
                        </span>
                    </HelpTooltip>
                </p>
            </div>
        </div>
    );
}
