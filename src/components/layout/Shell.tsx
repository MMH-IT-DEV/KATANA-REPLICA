'use client';

import React, { useState, useEffect } from 'react';
import { TopNav } from './TopNav';
import { Sidebar, NavGroup } from './Sidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ShellProps {
  children: React.ReactNode;
  activeTab?: string; // Top Nav Tab (e.g. Stock)
  activePage?: string; // Sidebar Page (e.g. Inventory)
  onPageChange?: (page: string) => void;
  sidebarGroups?: NavGroup[]; // Custom Sidebar groups
}

export function Shell({ children, activeTab = 'Stock', activePage, onPageChange, sidebarGroups }: ShellProps) {
  // Initialize state from localStorage if available, otherwise default to true
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLeft = localStorage.getItem('katana-sidebar-left');
    const savedRight = localStorage.getItem('katana-sidebar-right');

    if (savedLeft !== null) setIsLeftOpen(savedLeft === 'true');
    if (savedRight !== null) setIsRightOpen(savedRight === 'true');
  }, []);

  const toggleLeft = () => {
    const newState = !isLeftOpen;
    setIsLeftOpen(newState);
    localStorage.setItem('katana-sidebar-left', String(newState));
  };

  const toggleRight = () => {
    const newState = !isRightOpen;
    setIsRightOpen(newState);
    localStorage.setItem('katana-sidebar-right', String(newState));
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-background font-sans selection:bg-primary/10 selection:text-primary">
      <TopNav activeTab={activeTab} />

      {/* Main Layout Container - Full Width, No Outer Borders */}
      <div className="flex flex-1 w-full relative overflow-hidden">

        {/* Left Sidebar Area */}
        <div
          className={cn(
            "shrink-0 border-r border-border h-full transition-all duration-300 ease-in-out relative z-20 bg-sidebar",
            isLeftOpen ? "w-48" : "w-[50px]"
          )}
        >
          {/* Left Toggle Button - Vertically Centered on the Line */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-[12px] z-20">
            <button
              onClick={toggleLeft}
              className="flex items-center justify-center w-6 h-6 bg-sidebar border border-border rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none"
              title={isLeftOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {isLeftOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
            </button>
          </div>

          {/* Content */}
          <div className={cn(
            "h-full overflow-hidden transition-opacity duration-200",
            isLeftOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            <Sidebar activePage={activePage} onNavigate={onPageChange} groups={sidebarGroups} />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-background">
          {children}
        </main>

        {/* Right Panel (Inventory Copilot) */}
        <div
          className={cn(
            "shrink-0 border-l border-border h-full transition-all duration-300 ease-in-out hidden xl:block relative z-20 bg-sidebar",
            isRightOpen ? "w-72" : "w-[50px]"
          )}
        >
          {/* Right Toggle Button - Vertically Centered on the Line */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-[12px] z-20">
            <button
              onClick={toggleRight}
              className="flex items-center justify-center w-6 h-6 bg-sidebar border border-border rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none"
              title={isRightOpen ? "Collapse Panel" : "Expand Panel"}
            >
              {isRightOpen ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
            </button>
          </div>

          <div className={cn(
            "h-full overflow-hidden px-6 py-4 transition-opacity duration-200",
            isRightOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            <div className="bg-card rounded-lg p-4 border border-border/50">
              <h3 className="text-xs font-medium text-foreground mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/50"></span>
                Inventory Copilot
              </h3>
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                Ask questions about your stock levels, incoming orders, or manufacturing bottlenecks.
              </p>
              <button className="mt-3 w-full py-1.5 bg-background border border-border rounded-md text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors shadow-none">
                Ask AI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
