import React from 'react';
import { cn } from "@/lib/utils";
import { Search, Command, Settings } from "lucide-react";
import Link from 'next/link';

interface TopNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void; // Optional now
}

const TABS = [
  { name: 'Sell', href: '/sell' },
  { name: 'Make', href: '/make' },
  { name: 'Buy', href: '/buy' },
  { name: 'Stock', href: '/stock' },
  { name: 'Plan', href: '/plan' },
  { name: 'Insights', href: '/insights' },
  { name: 'Items', href: '/items' },
];

export function TopNav({ activeTab = 'Stock', onTabChange }: TopNavProps) {
  return (
    <header className="bg-[var(--bg-surface)] border-b border-border sticky top-0 z-50 h-14 flex items-center justify-between px-6 shadow-none">
      {/* Logo Area */}
      <div className="flex items-center gap-8">

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {TABS.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "text-[13px] font-medium transition-all duration-200 border-b-2 py-4",
                activeTab === tab.name
                  ? "text-[var(--text-accent)] border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
              )}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Center Search */}
      <div className="hidden lg:flex items-center justify-center max-w-xl w-full mx-4">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-input border border-border rounded-md w-full text-left text-muted-foreground hover:bg-accent transition-all group h-9">
          <Search size={14} className="group-hover:text-foreground transition-colors" />
          <span className="text-[13px] flex-1">Search...</span>
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-background rounded border border-border text-[10px] font-mono text-muted-foreground">
            <Command size={10} />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <Link href="/settings">
          <button className="p-1.5 text-muted-foreground hover:text-[#faf9f5] hover:bg-[#3a3a38]/50 rounded-md transition-all mr-1" title="Settings">
            <Settings size={18} />
          </button>
        </Link>
        <button className="px-3 py-1.5 bg-foreground hover:bg-foreground/90 text-background rounded-md text-[12px] font-medium transition-all shadow-sm">
          Sign in
        </button>
      </div>
    </header>
  );
}
