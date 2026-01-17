'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
    status: string;
    className?: string;
}

const statusColors: Record<string, { text: string, bg: string, border: string }> = {
    // Success states
    'done': { text: 'text-[#8aaf6e]', bg: 'bg-[#8aaf6e]/20', border: 'border-[#8aaf6e]/50' },
    'completed': { text: 'text-[#8aaf6e]', bg: 'bg-[#8aaf6e]/20', border: 'border-[#8aaf6e]/50' },
    'received': { text: 'text-[#8aaf6e]', bg: 'bg-[#8aaf6e]/20', border: 'border-[#8aaf6e]/50' },
    'in_stock': { text: 'text-[#8aaf6e]', bg: 'bg-[#8aaf6e]/20', border: 'border-[#8aaf6e]/50' },
    'picked': { text: 'text-[#8aaf6e]', bg: 'bg-[#8aaf6e]/20', border: 'border-[#8aaf6e]/50' },
    'active': { text: 'text-[#8aaf6e]', bg: 'bg-[#8aaf6e]/20', border: 'border-[#8aaf6e]/50' },

    // Warning states
    'in_transit': { text: 'text-[#bb8b5d]', bg: 'bg-[#bb8b5d]/20', border: 'border-[#bb8b5d]/50' },
    'in_progress': { text: 'text-[#bb8b5d]', bg: 'bg-[#bb8b5d]/20', border: 'border-[#bb8b5d]/50' },
    'partially_received': { text: 'text-[#bb8b5d]', bg: 'bg-[#bb8b5d]/20', border: 'border-[#bb8b5d]/50' },
    'partially_delivered': { text: 'text-[#bb8b5d]', bg: 'bg-[#bb8b5d]/20', border: 'border-[#bb8b5d]/50' },
    'partially_shipped': { text: 'text-[#bb8b5d]', bg: 'bg-[#bb8b5d]/20', border: 'border-[#bb8b5d]/50' },
    'expected': { text: 'text-[#bb8b5d]', bg: 'bg-[#bb8b5d]/20', border: 'border-[#bb8b5d]/50' },

    // Error states
    'not_available': { text: 'text-[#ff7b6f]', bg: 'bg-[#ff7b6f]/10', border: 'border-[#ff7b6f]/60' },
    'blocked': { text: 'text-[#ff7b6f]', bg: 'bg-[#ff7b6f]/10', border: 'border-[#ff7b6f]/60' },

    // Info/Action states (Coral)
    'created': { text: 'text-[#d97757]', bg: 'bg-[#d97757]/10', border: 'border-[#d97757]/60' },
    'open': { text: 'text-[#d97757]', bg: 'bg-[#d97757]/10', border: 'border-[#d97757]/60' },
    'shipped': { text: 'text-[#d97757]', bg: 'bg-[#d97757]/10', border: 'border-[#d97757]/60' },

    // Neutral states
    'not_started': { text: 'text-[#faf9f5]', bg: 'bg-[#3e3e3c]', border: 'border-[#525252]' },
    'not_received': { text: 'text-[#faf9f5]', bg: 'bg-[#3e3e3c]', border: 'border-[#525252]' },
};

// These statuses should NOT be badges - just plain text
const plainTextStatuses = [
    'not_shipped',
    'not_applicable',
    'n/a'
];

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const normalizedStatus = status.toLowerCase().replace(/ /g, '_');

    // Check if this should be plain text instead of a badge
    if (plainTextStatuses.includes(normalizedStatus)) {
        return (
            <span className={cn("text-[13px] text-muted-foreground font-normal whitespace-nowrap", className)}>
                {status.replace(/_/g, ' ')}
            </span>
        );
    }

    const config = statusColors[normalizedStatus] || { text: 'text-gray-400', border: 'border-gray-400/30', bg: 'bg-gray-400/20' };

    // Title Case transformation for display
    const displayText = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace(/_/g, ' ');

    return (
        <span className={cn(
            "px-2 py-0.5 rounded-sm text-[11px] font-bold border whitespace-nowrap inline-flex items-center justify-center min-w-[70px] shadow-sm tracking-tight",
            config.text,
            config.border,
            config.bg,
            className
        )}>
            {displayText}
        </span>
    );
}
