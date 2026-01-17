import React, { useState } from 'react';

interface InlineEditProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const InlineEdit = ({ value, onChange, placeholder }: InlineEditProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const handleSave = () => {
        onChange(tempValue);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                className="bg-transparent border border-border/50 rounded px-2 text-foreground outline-none w-full h-8 -ml-2"
                autoFocus
            />
        );
    }

    return (
        <button
            onClick={() => {
                setTempValue(value);
                setIsEditing(true);
            }}
            className="text-foreground hover:text-muted-foreground cursor-pointer h-8 flex items-center text-left"
        >
            {value || placeholder || '-'}
        </button>
    );
};
