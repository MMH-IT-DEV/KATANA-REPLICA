'use client';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface StatusOption {
    value: string;
    label: string;
    buttonStyle: string;
    dotStyle: string;
}

interface StatusDropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: StatusOption[];
}

export const StatusDropdown = ({ value, onChange, options }: StatusDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentOption = options.find(o => o.value === value) || options[0];

    return (
        <div className="relative flex justify-center" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "px-2.5 py-1 rounded-md text-[11px] font-medium border inline-flex items-center gap-2 transition-all",
                    currentOption.buttonStyle,
                    isOpen && "ring-1 ring-white/20"
                )}
            >
                <span className={cn("w-2 h-2 rounded-full", currentOption.dotStyle)} />
                <span>{currentOption.label}</span>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
                    <div
                        className="fixed bg-[#1e1e1e] border border-gray-700 rounded-md shadow-2xl z-[9999] min-w-[160px] flex flex-col py-1"
                        style={{
                            left: (dropdownRef.current?.getBoundingClientRect().left ?? 0) + (dropdownRef.current?.getBoundingClientRect().width ?? 0) / 2 - 80,
                            top: (dropdownRef.current?.getBoundingClientRect().bottom ?? 0) + 4
                        }}
                    >
                        {/* Header */}
                        <div className="px-3 py-1.5 text-gray-400 text-[11px] uppercase tracking-wider font-medium">
                            Status
                        </div>
                        <div className="h-px bg-gray-700 mx-1 mb-1"></div>
                        {/* Options List */}
                        <div className="py-1">
                            {options.map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-[#2a2a28] transition-colors text-white text-xs"
                                >
                                    <span className={cn("w-2 h-2 rounded-full", option.dotStyle)} />
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

// Default status options for Manufacturing Orders with neon effect
export const moStatusOptions: StatusOption[] = [
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

// Task status options (for production tasks) - matches database constraint values
export const taskStatusOptions: StatusOption[] = [
    {
        value: 'not_started',
        label: 'Not started',
        buttonStyle: 'bg-[#262624] text-[#9a9a94] border-[#4a4a48] shadow-[0_0_6px_rgba(154,154,148,0.15)] hover:shadow-[0_0_10px_rgba(154,154,148,0.25)]',
        dotStyle: 'bg-[#7a7974] shadow-[0_0_4px_rgba(122,121,116,0.5)]'
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
    {
        value: 'blocked',
        label: 'Blocked',
        buttonStyle: 'bg-[#2e1a1a] text-[#ff7b6f] border-[#ff7b6f]/50 shadow-[0_0_8px_rgba(255,123,111,0.3)] hover:shadow-[0_0_12px_rgba(255,123,111,0.4)]',
        dotStyle: 'bg-[#ff7b6f] shadow-[0_0_6px_rgba(255,123,111,0.8)]'
    },
];
