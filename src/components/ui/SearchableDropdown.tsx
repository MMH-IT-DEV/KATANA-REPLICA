import React, { useState, useRef, useEffect } from 'react';
import { Search, Check } from 'lucide-react';

interface SearchableDropdownProps {
    value: string;
    options: { id: string; name: string }[];
    onChange: (id: string) => void;
    placeholder?: string;
    label?: string;
}

export const SearchableDropdown = ({ value, options, onChange, placeholder, label }: SearchableDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(opt =>
        opt.name.toLowerCase().includes(search.toLowerCase())
    );

    const selectedOption = options.find(opt => opt.id === value);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative flex-1" ref={dropdownRef}>
            {/* Display current value - clickable */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground hover:text-muted-foreground cursor-pointer h-8 flex items-center text-left w-full"
            >
                {selectedOption?.name || placeholder || 'Select...'}
            </button>

            {/* Dropdown popup */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 min-w-[300px]">
                    {/* Search input */}
                    <div className="p-2 border-b border-border">
                        <div className="flex items-center gap-2 px-2 py-1.5 bg-muted rounded">
                            <Search className="w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={placeholder || "Search..."}
                                className="bg-transparent text-foreground text-sm outline-none flex-1 placeholder:text-muted-foreground"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Options list */}
                    <div className="max-h-[250px] overflow-y-auto py-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(option => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        onChange(option.id);
                                        setIsOpen(false);
                                        setSearch('');
                                    }}
                                    className={`w-full px-3 py-2 text-left text-sm hover:bg-muted/50 flex items-center gap-2 ${option.id === value ? 'text-foreground' : 'text-muted-foreground'
                                        }`}
                                >
                                    {option.id === value && <Check className="w-4 h-4 text-[#8aaf6e]" />}
                                    <span className={option.id === value ? '' : 'ml-6'}>{option.name}</span>
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-xs text-muted-foreground text-center">No results found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
