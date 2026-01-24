'use client';

import { useState, useEffect } from 'react';
import { Info, Globe, Calendar, ArrowRight, Search, Check, Loader2 } from 'lucide-react';
import { fetchSettings, updateSetting } from '@/lib/katana-data-provider';
import HelpTooltip from '@/components/ui/HelpTooltip';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Standardized list of currencies
const currencies = [
    { code: 'USD', symbol: '$', name: 'United States Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'HKD', symbol: '$', name: 'Hong Kong Dollar' },
    { code: 'SGD', symbol: '$', name: 'Singapore Dollar' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
    { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
];

export default function GeneralSettings() {
    const [settings, setSettings] = useState<any>({
        base_currency: 'USD',
        default_delivery_days: 14,
        default_lead_time_days: 7
    });
    const [loading, setLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

    // Currency Dialog State
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const [currencySearch, setCurrencySearch] = useState('');
    const [currencyLocked, setCurrencyLocked] = useState(true); // Locked by default in replicator

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const data = await fetchSettings();
        if (data && Array.isArray(data)) {
            // Transform array of {key, value} to an object
            const settingsObj: any = {};
            data.forEach(s => {
                // Map database keys to our local state keys if needed
                if (s.key === 'currency') settingsObj.base_currency = s.value;
                else if (s.key === 'default_delivery_time_days') settingsObj.default_delivery_days = parseInt(s.value) || 0;
                else settingsObj[s.key] = s.value;
            });
            setSettings((prev: any) => ({ ...prev, ...settingsObj }));
        }
        setLoading(false);
    };

    const handleSettingChange = async (key: string, value: any) => {
        setSaveStatus('saving');
        setSettings((prev: any) => ({ ...prev, [key]: value }));

        // Map local state keys back to database keys
        let dbKey = key;
        if (key === 'base_currency') dbKey = 'currency';
        if (key === 'default_delivery_days') dbKey = 'default_delivery_time_days';

        await updateSetting(dbKey, value.toString());

        // Simulate network delay for UX
        setTimeout(() => setSaveStatus('saved'), 600);
    };

    const filteredCurrencies = currencies.filter(c =>
        c.name.toLowerCase().includes(currencySearch.toLowerCase()) ||
        c.code.toLowerCase().includes(currencySearch.toLowerCase())
    );

    const selectedCurrency = currencies.find(c => c.code === settings.base_currency) || currencies[0];

    // Tooltip State for Dimming
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [isCurrencyTooltipOpen, setIsCurrencyTooltipOpen] = useState(false);

    // Reference Pattern: Page Title Hierarchy
    return (
        <div className="max-w-[1600px] mx-auto p-6 space-y-6">

            {/* Page Header */}
            <div>
                <h1 className="text-xl font-medium text-foreground tracking-tight">General settings</h1>
                <p className="mt-2 text-sm leading-relaxed max-w-2xl selection:bg-primary/20">
                    <span className={cn(
                        "text-[#7a7974] transition-opacity duration-100", // Faster transition
                        isTooltipOpen && "opacity-40"
                    )}>
                        Configure your globally applied business settings. These defaults will be preset
                        on new orders and inventory movements but can be adjusted individually.
                    </span>
                    <HelpTooltip
                        title="General settings"
                        description="Configure your base currency and default lead times for sales and purchase orders."
                        onOpenChange={setIsTooltipOpen}
                    >
                        <span className="ml-1 text-[#faf9f5] font-medium inline-flex items-center gap-1 transition-all cursor-pointer">
                            Learn more
                        </span>
                    </HelpTooltip>
                </p>
            </div>

            {/* Content Grid */}
            <div className="grid gap-6">

                {/* Card 1: Base Currency */}
                <div className="bg-background rounded-lg border border-border p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium text-foreground">Base currency</h3>
                            <Globe size={16} className="text-muted-foreground" />
                        </div>
                    </div>

                    <div className="max-w-md space-y-4">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-muted-foreground">Currency</Label>

                            <Dialog open={isCurrencyOpen} onOpenChange={setIsCurrencyOpen}>
                                <DialogTrigger asChild>
                                    <div
                                        className={cn(
                                            "flex items-center justify-between h-9 px-3 rounded-md border text-sm transition-colors",
                                            "bg-[#1e1e1e] border-[#3a3a38] text-[#faf9f5] hover:bg-accent/10 cursor-pointer",
                                            currencyLocked && "opacity-80 cursor-not-allowed"
                                        )}
                                        onClick={(e) => currencyLocked && e.preventDefault()}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{selectedCurrency.code}</span>
                                            <span className="text-muted-foreground">- {selectedCurrency.name}</span>
                                        </div>
                                        <span className="text-muted-foreground text-xs">{selectedCurrency.symbol}</span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5] max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Select Base Currency</DialogTitle>
                                    </DialogHeader>

                                    <div className="relative mb-2">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search currency..."
                                            className="pl-9 h-9 bg-[#1e1e1e] border-[#3a3a38] text-[#faf9f5]"
                                            value={currencySearch}
                                            onChange={(e) => setCurrencySearch(e.target.value)}
                                        />
                                    </div>

                                    <div className="max-h-[300px] overflow-y-auto space-y-1 pr-1">
                                        {filteredCurrencies.map(currency => (
                                            <div
                                                key={currency.code}
                                                className={cn(
                                                    "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors text-sm",
                                                    settings.base_currency === currency.code
                                                        ? "bg-[#d97757]/20 text-[#d97757]"
                                                        : "hover:bg-secondary/20 text-[#faf9f5]"
                                                )}
                                                onClick={() => {
                                                    handleSettingChange('base_currency', currency.code);
                                                    setIsCurrencyOpen(false);
                                                }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="font-mono">{currency.code}</span>
                                                    <span className={settings.base_currency === currency.code ? "text-[#d97757]" : "text-muted-foreground"}>
                                                        {currency.name}
                                                    </span>
                                                </div>
                                                {settings.base_currency === currency.code && <Check size={16} />}
                                            </div>
                                        ))}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Reference Pattern: Info Box styling */}
                        {currencyLocked && (
                            <div className="rounded-md bg-secondary/20 border border-border/50 p-4 flex gap-3">
                                <Info size={18} className="text-[#faf9f5] shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-[#faf9f5]">Currency conversion is locked</p>
                                    <p className="text-xs leading-relaxed">
                                        <span className={cn(
                                            "text-muted-foreground transition-opacity duration-100",
                                            isCurrencyTooltipOpen && "opacity-40"
                                        )}>
                                            Your business uses multiple currencies which restricts changing the
                                            base currency.{' '}
                                        </span>
                                        <HelpTooltip
                                            title="Locked Currency"
                                            description="Base currency is locked when there are transactions in multiple currencies. This prevents historical data corruption."
                                            onOpenChange={setIsCurrencyTooltipOpen}
                                        >
                                            <span className="text-[#faf9f5] font-medium cursor-pointer">Read more</span>
                                        </HelpTooltip>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Card 2: Order Lead Times */}
                <div className="bg-background rounded-lg border border-border p-6">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium text-foreground">Order lead times</h3>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                        {/* Sales Orders */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium text-[#faf9f5] border-b border-border pb-2">Sales orders</h4>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium text-muted-foreground">Default delivery deadline (days)</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="number"
                                        min="0"
                                        className="h-9 w-24 bg-[#1e1e1e] border-[#3a3a38] text-[#faf9f5] text-left pl-3 focus-visible:ring-1 focus-visible:ring-[#3a3a38] focus-visible:border-[#d97757]"
                                        value={settings.default_delivery_days ?? ''}
                                        onChange={(e) => handleSettingChange('default_delivery_days', parseInt(e.target.value) || 0)}
                                    />
                                    <span className="text-xs text-muted-foreground">days from creation</span>
                                </div>
                                <p className="text-xs text-muted-foreground pt-1">
                                    Used to calculate Delivery Deadline when a new Sales Order is created.
                                </p>
                            </div>
                        </div>

                        {/* Purchase Orders */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium text-[#faf9f5] border-b border-border pb-2">Purchase orders</h4>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium text-muted-foreground">Default arrival time (days)</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="number"
                                        min="0"
                                        className="h-9 w-24 bg-[#1e1e1e] border-[#3a3a38] text-[#faf9f5] text-left pl-3 focus-visible:ring-1 focus-visible:ring-[#3a3a38] focus-visible:border-[#d97757]"
                                        value={settings.default_lead_time_days ?? ''}
                                        onChange={(e) => handleSettingChange('default_lead_time_days', parseInt(e.target.value) || 0)}
                                    />
                                    <span className="text-xs text-muted-foreground">days from creation</span>
                                </div>
                                <p className="text-xs text-muted-foreground pt-1">
                                    Used to calculate Expected Arrival date when a new Purchase Order is created.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Saving Indicator */}
            <div className="fixed bottom-4 right-6 z-50 pointer-events-none">
                <div className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1e1e1e] border border-[#3a3a38] shadow-lg transition-all duration-300",
                    saveStatus === 'saving' ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    <Loader2 size={14} className="animate-spin text-[#d97757]" />
                    <span className="text-xs font-medium text-[#faf9f5]">Saving changes...</span>
                </div>
            </div>
        </div>
    );
}
