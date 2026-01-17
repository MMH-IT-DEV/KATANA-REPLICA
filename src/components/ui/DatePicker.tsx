'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DatePickerProps {
    value: string | null;
    onChange: (date: string | null) => void;
    placeholder?: string;
}

export const DatePicker = ({ value, onChange, placeholder = 'Select date' }: DatePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Safe parsing of YYYY-MM-DD to avoid timezone issues
    // Helper to parse "2026-03-11" -> Date(2026, 2, 11) local time
    const parseDate = (dateStr: string | null): Date => {
        if (!dateStr) return new Date();
        const [y, m, d] = dateStr.split('-').map(Number);
        // Note: m is 1-based in string, 0-based in Date
        return new Date(y, m - 1, d);
    };

    const [viewDate, setViewDate] = useState(() => parseDate(value));
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Sync viewDate when value changes
    useEffect(() => {
        if (value) {
            setViewDate(parseDate(value));
        }
    }, [value]);

    // Calendar calculations
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
    const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

    const selectDate = (day: number) => {
        // Format manually YYYY-MM-DD to ensure exact date usage
        const m = String(month + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        const formatted = `${year}-${m}-${d}`;

        onChange(formatted);
        setIsOpen(false);
    };

    const isSelected = (day: number) => {
        if (!value) return false;
        const [y, m, d] = value.split('-').map(Number);
        return y === year && (m - 1) === month && d === day;
    };

    const isToday = (day: number) => {
        const today = new Date();
        return today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;
    };

    const formatDisplayDate = (dateStr: string | null) => {
        if (!dateStr) return placeholder;
        const [y, m, d] = dateStr.split('-');
        const date = new Date(Number(y), Number(m) - 1, Number(d));
        return date.toLocaleDateString('en-CA');
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition h-8"
            >
                <span>{formatDisplayDate(value)}</span>
                <Calendar className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Calendar Popup */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 z-50 bg-[#1f1f1d] border border-gray-600 rounded-lg shadow-2xl w-[280px]">
                    {/* Month/Year Header */}
                    <div className="flex items-center justify-between p-3 border-b border-gray-700">
                        <button
                            type="button"
                            onClick={prevMonth}
                            className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-white font-medium">
                            {monthNames[month]} {year}
                        </span>
                        <button
                            type="button"
                            onClick={nextMonth}
                            className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Day Names Header */}
                    <div className="grid grid-cols-7 px-2 pt-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                            <div key={day} className="text-center text-xs text-gray-500 font-medium py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 p-2 pb-3">
                        {/* Empty cells before first day */}
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square" />
                        ))}

                        {/* Day buttons */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const selected = isSelected(day);
                            const today = isToday(day);

                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => selectDate(day)}
                                    className={`
                    aspect-square flex items-center justify-center text-sm rounded
                    transition-all duration-150
                    ${selected
                                            ? 'bg-[#d97757] text-white font-medium'
                                            : today
                                                ? 'ring-1 ring-[#d97757] text-white'
                                                : 'text-gray-300 hover:bg-gray-700'
                                        }
                  `}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
