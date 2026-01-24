'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface HelpTooltipProps {
    children: ReactNode;
    title: string;
    description: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    onOpenChange?: (isOpen: boolean) => void;
}

export default function HelpTooltip({
    children,
    title,
    description,
    position = 'bottom',
    onOpenChange
}: HelpTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [mounted, setMounted] = useState(false);
    const triggerRef = useRef<HTMLSpanElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const updateVisibility = (visible: boolean) => {
        setIsVisible(visible);
        onOpenChange?.(visible);
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isVisible && triggerRef.current && tooltipRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            let top = 0;
            let left = 0;

            const scrollY = window.scrollY;
            const scrollX = window.scrollX;

            switch (position) {
                case 'bottom':
                    top = triggerRect.bottom + scrollY + 8;
                    left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
                    break;
                case 'top':
                    top = triggerRect.top + scrollY - tooltipRect.height - 8;
                    left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
                    break;
                case 'left':
                    top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
                    left = triggerRect.left + scrollX - tooltipRect.width - 8;
                    break;
                case 'right':
                    top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
                    left = triggerRect.right + scrollX + 8;
                    break;
            }

            // Keep tooltip within viewport
            const padding = 8;
            left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));

            setCoords({ top, left });
        }
    }, [isVisible, position]);

    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        updateVisibility(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            updateVisibility(false);
        }, 100); // 100ms quick buffer
    };

    const tooltipContent = isVisible && (
        <div
            ref={tooltipRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'absolute',
                top: coords.top,
                left: coords.left,
                zIndex: 100,
            }}
        // Removed pointer-events-none to allow interaction
        >
            {/* Added invisible padding bridge to prevent gap flickering if needed */}
            <div className="bg-[#262624] border border-[#3a3a38] rounded-lg p-3 shadow-xl max-w-[320px] animate-in fade-in zoom-in-95 duration-150">
                <h4 className="text-[#faf9f5] text-sm font-medium mb-1">{title}</h4>
                <p className="text-[#7a7974] text-xs leading-relaxed">{description}</p>
            </div>
        </div>
    );

    return (
        <>
            <span
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="inline-block cursor-help align-middle leading-none"
            >
                {children}
            </span>
            {mounted && createPortal(tooltipContent, document.body)}
        </>
    );
}
