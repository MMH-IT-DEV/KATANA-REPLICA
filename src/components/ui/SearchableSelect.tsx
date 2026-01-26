'use client';
import { useState, useRef, useEffect } from 'react';
import { Search, Check, ExternalLink, Plus, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
    id: string;
    name: string;
    sku?: string;
}

interface SearchableSelectProps {
    value: string | null;
    options: { id: string; name: string; sku?: string }[];
    onChange: (id: string) => void;
    onNavigate?: (id: string) => void;  // For external link
    onCreate?: (name: string) => Promise<string | null>;
    placeholder?: string;
    searchPlaceholder?: string;
    showExternalLink?: boolean;
    allowCreate?: boolean;
    createLabel?: string;
    triggerClassName?: string;
}

export const SearchableSelect = ({
    value,
    options,
    onChange,
    onNavigate,
    placeholder = 'Select...',
    searchPlaceholder = 'Search...',
    showExternalLink = false,
    allowCreate = false,
    createLabel = 'Create',
    onCreate,
    triggerClassName,
}: SearchableSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Filter options based on search
    const filteredOptions = options.filter(opt =>
        opt.name.toLowerCase().includes(search.toLowerCase()) ||
        (opt.sku && opt.sku.toLowerCase().includes(search.toLowerCase()))
    );

    // Get selected option
    const selectedOption = options.find(opt => opt.id === value);

    return (
        <div className="relative" ref={containerRef}>
            {/* Trigger - Display selected value */}
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "flex-1 text-left flex items-center justify-between h-8 px-3 rounded border border-[#5a5a58] bg-[#1a1a18] text-foreground hover:border-[#7a7974] transition-colors cursor-pointer w-full group",
                        triggerClassName
                    )}
                >
                    <span className="truncate text-sm">
                        {selectedOption?.name || placeholder}
                    </span>
                    <ChevronDown className="w-4 h-4 text-[#7a7974] group-hover:text-foreground transition-colors shrink-0" />
                </button>

                {/* External link icon */}
                {showExternalLink && selectedOption && onNavigate && (
                    <button
                        type="button"
                        onClick={() => onNavigate(selectedOption.id)}
                        className="p-1 hover:bg-muted rounded transition"
                    >
                        <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </button>
                )}
            </div>

            {/* Dropdown Popup */}
            {isOpen && (
                <div className={cn(
                    "absolute top-full left-0 mt-1 z-50 bg-[#1f1f1d] border border-[#3a3a38] rounded-lg shadow-2xl w-[320px] max-h-[350px] flex flex-col overflow-hidden",
                    "animate-in fade-in zoom-in-95 duration-150 ease-out"
                )}>
                    {/* Search Input */}
                    <div className="p-1.5 border-b border-[#3a3a38]/50">
                        <div className="flex items-center gap-2 px-2 py-1 bg-[#2a2a28] rounded border border-[#3a3a38] focus-within:border-[#5a5a58] transition-colors">
                            <Search className="w-3 h-3 text-[#7a7974]" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="bg-transparent text-white text-xs outline-none flex-1 placeholder-[#5a5a58]"
                            />
                        </div>
                    </div>

                    {/* Options List */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden py-1 px-1 scrollbar-hide">
                        {filteredOptions.length === 0 && !(allowCreate && onCreate && search.trim()) ? (
                            <div className="px-4 py-3 text-gray-500 text-sm">
                                No results found
                            </div>
                        ) : (
                            filteredOptions.map(option => (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.id);
                                        setIsOpen(false);
                                        setSearch('');
                                    }}
                                    className={cn(
                                        "w-full px-3 py-1.5 text-left flex items-center gap-2 rounded-md transition-colors mb-0.5 last:mb-0",
                                        option.id === value ? "bg-[#2a2a28] text-white" : "hover:bg-[#2a2a28]/60 text-[#bebebe] hover:text-white"
                                    )}
                                >
                                    {/* Option content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[13px] truncate">
                                            {option.name}
                                        </div>
                                        {option.sku && (
                                            <div className="text-[#5a5a58] text-[11px]">
                                                {option.sku}
                                            </div>
                                        )}
                                    </div>
                                    {/* Checkmark for selected option */}
                                    {option.id === value && (
                                        <Check className="w-3.5 h-3.5 text-white flex-shrink-0" />
                                    )}
                                </button>
                            ))
                        )}
                    </div>

                    {/* Create Option - AT BOTTOM, only when no matches */}
                    {allowCreate && onCreate && search.trim() && filteredOptions.length === 0 && (
                        <div className="border-t border-gray-700">
                            <button
                                type="button"
                                onClick={async () => {
                                    const newId = await onCreate(search.trim());
                                    if (newId) {
                                        onChange(newId);
                                        setIsOpen(false);
                                        setSearch('');
                                    }
                                }}
                                className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-gray-700/50 transition"
                            >
                                <Plus className="w-4 h-4 text-[#d97757]" />
                                <span className="text-[#d97757] text-sm">
                                    {createLabel} "{search.trim()}"
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;
