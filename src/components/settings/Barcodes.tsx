'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchSettings, updateSetting } from '@/lib/katana-data-provider';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import HelpTooltip from '@/components/ui/HelpTooltip';
import { cn } from '@/lib/utils';

interface BarcodeSetting {
    key: string;
    label: string;
    defaultValue: boolean;
    type: 'switch' | 'checkbox';
    indent?: boolean;
}

const barcodeSettings: BarcodeSetting[] = [
    {
        key: 'barcode_supplier_item_codes',
        label: 'Supplier item codes (for receiving materials and products)',
        defaultValue: true,
        type: 'switch'
    },
    {
        key: 'barcode_internal',
        label: 'Internal barcodes (for warehouse management)',
        defaultValue: true,
        type: 'switch'
    },
    {
        key: 'barcode_use_for_batches',
        label: 'Use barcodes for batches',
        defaultValue: true,
        type: 'checkbox',
        indent: true
    },
    {
        key: 'barcode_auto_generate',
        label: 'Generate barcodes automatically',
        defaultValue: false,
        type: 'checkbox',
        indent: true
    },
    {
        key: 'barcode_registered',
        label: 'Registered barcodes (for sending products to retailers)',
        defaultValue: true,
        type: 'switch'
    }
];

export default function Barcodes() {
    const [settings, setSettings] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const loadSettings = useCallback(async () => {
        setIsLoading(true);
        const data = await fetchSettings();

        const settingsObj: Record<string, boolean> = {};
        barcodeSettings.forEach(setting => {
            const dbSetting = data?.find((s: any) => s.key === setting.key);
            settingsObj[setting.key] = dbSetting ? dbSetting.value === 'true' : setting.defaultValue;
        });

        setSettings(settingsObj);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        let isMounted = true;
        const init = async () => {
            if (isMounted) await loadSettings();
        };
        init();
        return () => { isMounted = false; };
    }, [loadSettings]);

    const handleToggle = async (key: string, value: boolean) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        await updateSetting(key, value.toString());
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
                <h1 className="text-xl font-medium text-foreground tracking-tight">Barcodes</h1>
                <div className="mt-2 text-sm text-[#7a7974] leading-relaxed max-w-4xl">
                    <p>
                        <span className={cn(
                            "transition-opacity duration-200",
                            isTooltipOpen && "opacity-40"
                        )}>
                            Barcodes offer a reliable method for tracking movements and reducing errors both in and outside of Katana. Below, you can enable/disable different types of barcodes depending on your needs.
                        </span>{' '}
                        <HelpTooltip
                            title="Barcodes"
                            description="Barcodes help you track inventory movements, reduce manual data entry errors, and speed up warehouse operations. Different barcode types serve different purposes in your workflow."
                            onOpenChange={setIsTooltipOpen}
                        >
                            <span className="ml-1 text-[#faf9f5] font-medium inline-flex items-center gap-1 transition-all cursor-pointer">
                                Read more
                            </span>
                        </HelpTooltip>
                    </p>
                </div>
            </div>

            {/* Toggle List */}
            <div className="max-w-3xl space-y-2">
                {barcodeSettings.map((setting) => {
                    // Conditional rendering for nested options
                    if (setting.indent && !settings['barcode_internal']) {
                        return null;
                    }

                    return (
                        <div
                            key={setting.key}
                            className={cn(
                                "flex items-center gap-4 py-3",
                                setting.indent && "pl-12 py-2"
                            )}
                        >
                            <div className="flex-1 flex items-center gap-3">
                                {setting.type === 'checkbox' ? (
                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            id={setting.key}
                                            checked={settings[setting.key] || false}
                                            onCheckedChange={(checked) => handleToggle(setting.key, !!checked)}
                                            className="border-[#5a5a58] data-[state=checked]:bg-[#4A90E2] data-[state=checked]:border-transparent data-[state=checked]:text-black focus-visible:ring-0"
                                        />
                                        <label
                                            htmlFor={setting.key}
                                            className="text-[13px] text-[#faf9f5] cursor-pointer select-none"
                                        >
                                            {setting.label}
                                        </label>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Switch
                                                id={setting.key}
                                                checked={settings[setting.key] || false}
                                                onCheckedChange={(checked) => handleToggle(setting.key, checked)}
                                                className="checked:bg-[#538fc1] data-[state=checked]:bg-[#538fc1]"
                                            />
                                            <label
                                                htmlFor={setting.key}
                                                className="text-[14px] text-[#faf9f5] font-medium cursor-pointer select-none"
                                            >
                                                {setting.label}
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
