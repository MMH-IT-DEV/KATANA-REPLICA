'use client';

import React, { useState, useEffect } from 'react';
import { TopNav } from './TopNav';
import Sidebar, { SidebarItem } from '@/components/ui/Sidebar';
import { cn } from "@/lib/utils";

// Make the NavGroup interface compatible with the previous one to avoid breaking changes
export interface NavGroup {
  title?: string;
  items: { name: string; id: string }[];
}

interface ShellProps {
  children: React.ReactNode;
  activeTab?: string; // Top Nav Tab (e.g. Stock)
  activePage?: string; // Sidebar Page (e.g. Inventory)
  onPageChange?: (page: string) => void;
  sidebarGroups?: NavGroup[]; // Custom Sidebar groups
}

const DEFAULT_GROUPS: NavGroup[] = [
  {
    title: "General",
    items: [
      { name: "Inventory", id: "Inventory" },
      { name: "Batches", id: "Batches" },
      { name: "Stock adjustments", id: "Stock adjustments" },
      { name: "Stocktakes", id: "Stocktakes" },
    ]
  }
];

export function Shell({ children, activeTab = 'Stock', activePage = 'Inventory', onPageChange, sidebarGroups }: ShellProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  // Convert old NavGroup format to new SidebarItem format
  const groupsToRender = sidebarGroups || DEFAULT_GROUPS;
  const sidebarItems: SidebarItem[] = groupsToRender.flatMap(group =>
    group.items.map(item => ({
      id: item.id,
      label: item.name
    }))
  );

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-background font-sans selection:bg-primary/10 selection:text-primary">
      <TopNav activeTab={activeTab} />

      {/* Main Layout Container - Full Width, No Outer Borders */}
      <div className="flex flex-1 w-full relative overflow-hidden">

        {/* Reusable Sidebar Component */}
        <Sidebar
          items={sidebarItems}
          activeId={activePage}
          onItemClick={onPageChange || (() => { })}
          title={groupsToRender[0]?.title} // Use first group title if available
          defaultWidth={200}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
