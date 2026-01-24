'use client';
import { useState, useRef, useEffect } from 'react';
import { Search, Check, ExternalLink, Plus } from 'lucide-react';

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
                    className={triggerClassName || "flex-1 text-foreground hover:text-muted-foreground text-left flex items-center h-8 cursor-pointer w-full"}
                >
                    {selectedOption?.name || placeholder}
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
                <div className="absolute top-full left-0 mt-2 z-50 bg-[#1f1f1d] border border-gray-600 rounded-lg shadow-2xl w-[350px] max-h-[400px] flex flex-col">
                    {/* Search Input */}
                    <div className="p-3 border-b border-gray-700">
                        <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2a28] rounded border border-gray-600 focus-within:border-[#3a3a38]">
                            <Search className="w-4 h-4 text-gray-500" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="bg-transparent text-white text-sm outline-none flex-1 placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Options List */}
                    <div className="flex-1 overflow-y-auto py-1">
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
                                    className={`
                    w-full px-4 py-1.5 text-left flex items-center gap-2
                    hover:bg-gray-700/50 transition
                    ${option.id === value ? 'bg-gray-700/30' : ''}
                  `}
                                >
                                    {/* Option content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-white text-sm truncate">
                                            {option.name}
                                        </div>
                                        {option.sku && (
                                            <div className="text-gray-500 text-xs">
                                                {option.sku}
                                            </div>
                                        )}
                                    </div>
                                    {/* Checkmark for selected option */}
                                    {option.id === value && (
                                        <Check className="w-4 h-4 text-white flex-shrink-0" />
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
