import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { ManufacturingOrder } from '@/lib/katana-data-provider';

interface StatusDropdownProps {
    value: string;
    onChange: (status: ManufacturingOrder['productionStatus']) => void;
    className?: string;
    disabled?: boolean;
}

const statusOptions: {
    value: ManufacturingOrder['productionStatus'],
    label: string,
    buttonStyle: string,
    dotStyle: string
}[] = [
    {
        value: 'not_started',
        label: 'Not started',
        buttonStyle: 'bg-[#262624] text-[#9a9a94] border-[#4a4a48] shadow-[0_0_6px_rgba(154,154,148,0.15)] hover:shadow-[0_0_10px_rgba(154,154,148,0.25)]',
        dotStyle: 'bg-[#7a7974] shadow-[0_0_4px_rgba(122,121,116,0.5)]'
    },
    {
        value: 'blocked',
        label: 'Blocked',
        buttonStyle: 'bg-[#2e1a1a] text-[#ff7b6f] border-[#ff7b6f]/50 shadow-[0_0_8px_rgba(255,123,111,0.3)] hover:shadow-[0_0_12px_rgba(255,123,111,0.4)]',
        dotStyle: 'bg-[#ff7b6f] shadow-[0_0_6px_rgba(255,123,111,0.8)]'
    },
    {
        value: 'work_in_progress',
        label: 'In progress',
        buttonStyle: 'bg-[#2e2a1a] text-[#bb8b5d] border-[#bb8b5d]/50 shadow-[0_0_8px_rgba(187,139,93,0.3)] hover:shadow-[0_0_12px_rgba(187,139,93,0.4)]',
        dotStyle: 'bg-[#bb8b5d] shadow-[0_0_6px_rgba(187,139,93,0.8)]'
    },
    {
        value: 'partially_complete',
        label: 'Partially complete',
        buttonStyle: 'bg-[#2e2a1a] text-[#bb8b5d] border-[#bb8b5d]/50 shadow-[0_0_8px_rgba(187,139,93,0.3)] hover:shadow-[0_0_12px_rgba(187,139,93,0.4)]',
        dotStyle: 'bg-[#bb8b5d] shadow-[0_0_6px_rgba(187,139,93,0.8)]'
    },
    {
        value: 'done',
        label: 'Completed',
        buttonStyle: 'bg-[#1a2e1a] text-[#8aaf6e] border-[#8aaf6e]/50 shadow-[0_0_8px_rgba(138,175,110,0.3)] hover:shadow-[0_0_12px_rgba(138,175,110,0.4)]',
        dotStyle: 'bg-[#8aaf6e] shadow-[0_0_6px_rgba(138,175,110,0.8)]'
    },
];

// Dropdown menu item dot styles
const menuDotStyles: Record<string, string> = {
    'not_started': 'bg-[#7a7974] shadow-[0_0_4px_rgba(122,121,116,0.6)]',
    'blocked': 'bg-[#ff7b6f] shadow-[0_0_4px_rgba(255,123,111,0.8)]',
    'work_in_progress': 'bg-[#bb8b5d] shadow-[0_0_4px_rgba(187,139,93,0.8)]',
    'partially_complete': 'bg-[#bb8b5d] shadow-[0_0_4px_rgba(187,139,93,0.8)]',
    'done': 'bg-[#8aaf6e] shadow-[0_0_4px_rgba(138,175,110,0.8)]',
};

export function StatusDropdown({ value, onChange, className, disabled }: StatusDropdownProps) {
    const currentOption = statusOptions.find(opt => opt.value === value) || statusOptions[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={disabled}>
                <button
                    className={cn(
                        "px-2.5 py-1 rounded-md text-[11px] font-medium border inline-flex items-center gap-2 transition-all",
                        currentOption.buttonStyle,
                        className
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    <span className={cn("w-2 h-2 rounded-full", currentOption.dotStyle)} />
                    <span>{currentOption.label}</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="center"
                className="w-44 bg-[#1e1e1e] border-gray-700"
                sideOffset={4}
            >
                <DropdownMenuLabel className="text-gray-400 text-[11px] uppercase tracking-wider">Status</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                {statusOptions.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        className="text-white hover:bg-[#2a2a28] text-xs flex items-center gap-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange(option.value);
                        }}
                    >
                        <span className={cn("w-2 h-2 rounded-full", menuDotStyles[option.value])} />
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
