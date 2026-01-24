'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export interface SidebarItem {
    id: string;
    label: string;
    icon?: ReactNode;
    badge?: string;
}

interface SidebarProps {
    items: SidebarItem[];
    activeId: string;
    onItemClick: (id: string) => void;
    title?: string;
    defaultWidth?: number;
    minWidth?: number;
    maxWidth?: number;
}

const DEFAULT_MIN_WIDTH = 180;
const DEFAULT_MAX_WIDTH = 400;
const DEFAULT_WIDTH = 256;
const COLLAPSED_WIDTH = 12; // Adjusted to show just the pill area
const DRAG_THRESHOLD = 5;

export default function Sidebar({
    items,
    activeId,
    onItemClick,
    title,
    defaultWidth = DEFAULT_WIDTH,
    minWidth = DEFAULT_MIN_WIDTH,
    maxWidth = DEFAULT_MAX_WIDTH,
}: SidebarProps) {
    const [width, setWidth] = useState(defaultWidth);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isHoveringHandle, setIsHoveringHandle] = useState(false);

    const dragStartX = useRef<number | null>(null);
    const hasDragged = useRef(false);

    const [isHoveringMenu, setIsHoveringMenu] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        dragStartX.current = e.clientX;
        hasDragged.current = false;
        setIsResizing(true);
    }, []);

    const handleMouseUp = useCallback(() => {
        if (!hasDragged.current && dragStartX.current !== null) {
            setIsCollapsed(prev => !prev);
        }
        dragStartX.current = null;
        hasDragged.current = false;
        setIsResizing(false);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (dragStartX.current === null) return;

        const deltaX = Math.abs(e.clientX - dragStartX.current);

        if (deltaX > DRAG_THRESHOLD) {
            hasDragged.current = true;
        }

        if (hasDragged.current) {
            const newWidth = e.clientX;
            if (newWidth >= minWidth && newWidth <= maxWidth) {
                setWidth(newWidth);
                if (isCollapsed) {
                    setIsCollapsed(false);
                }
            } else if (newWidth < minWidth - 20) {
                setIsCollapsed(true);
            }
        }
    }, [isCollapsed, minWidth, maxWidth]);

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, handleMouseMove, handleMouseUp]);

    return (
        <div
            className="relative flex flex-col border-r border-[#3a3a38] bg-background shrink-0 select-none group/sidebar transition-[width] duration-300 ease-in-out"
            style={{
                width: isCollapsed ? `${COLLAPSED_WIDTH}px` : `${width}px`,
                transition: isResizing ? 'none' : undefined
            }}
        >
            {/* Sidebar Content */}
            <div className={`h-full flex flex-col transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                {title && (
                    <div className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {title}
                    </div>
                )}

                <nav
                    className="py-2 h-full overflow-y-auto"
                    onMouseEnter={() => setIsHoveringMenu(true)}
                    onMouseLeave={() => {
                        setIsHoveringMenu(false);
                        setHoveredItem(null);
                    }}
                >
                    {items.map((item) => {
                        const isActive = activeId === item.id;
                        const isHovered = hoveredItem === item.id;
                        const shouldDim = isHoveringMenu && !isHovered && !isActive;

                        return (
                            <button
                                key={item.id}
                                onClick={() => onItemClick(item.id)}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={`
                  w-[calc(100%-16px)] mx-2 flex items-center justify-between px-3 py-1.5 text-[13px] 
                  transition-all duration-150 rounded-md my-0.5 truncate
                  ${isActive
                                        ? 'bg-[#3a3a38]/60 text-[#faf9f5]'
                                        : isHovered
                                            ? 'bg-[#3a3a38]/30 text-[#faf9f5]'
                                            : 'text-[#7a7974]'
                                    }
                  ${shouldDim ? 'opacity-40' : 'opacity-100'}
                `}
                            >
                                <div className="flex items-center gap-2 truncate">
                                    {item.icon && <span className="shrink-0">{item.icon}</span>}
                                    <span className="truncate">{item.label}</span>
                                    {item.badge && (
                                        <span className="ml-2 px-1.5 py-0.5 text-[9px] font-bold bg-[#d97757] text-white rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Resize Handle with Pill */}
            <div
                className={`
          absolute top-0 -right-[4px] w-[8px] h-full cursor-col-resize z-50
          flex items-center justify-center
          transition-colors duration-150
          ${isResizing || isHoveringHandle
                        ? 'bg-[#d97757]/10'
                        : 'bg-transparent group-hover/sidebar:bg-[#3a3a38]/30'
                    }
        `}
                onMouseDown={handleMouseDown}
                onMouseEnter={() => setIsHoveringHandle(true)}
                onMouseLeave={() => setIsHoveringHandle(false)}
            >
                <div
                    className={`
            w-1 h-8 rounded-full cursor-pointer
            transition-colors duration-150
            ${isResizing || isHoveringHandle
                            ? 'bg-[#d97757]'
                            : 'bg-[#3a3a38]'
                        }
            hover:bg-[#d97757]
          `}
                />
            </div>
        </div>
    );
}
