import React from 'react';
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  id: string;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

interface SidebarProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
  groups?: NavGroup[];
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

export function Sidebar({ activePage = "Inventory", onNavigate, groups }: SidebarProps) {
  const navGroups = groups || DEFAULT_GROUPS;

  return (
    <aside className="w-full h-full overflow-y-auto py-4 px-4">
      {/* Reduced top padding to py-4 to move content up */}
      <div className="space-y-8">
        {navGroups.map((group, idx) => (
          <div key={group.title || idx}>
            {group.title && (
              <h4 className="text-xs font-medium text-muted-foreground mb-3 px-2 uppercase tracking-wider">
                {group.title}
              </h4>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onNavigate?.(item.id)}
                      className={cn(
                        "w-full text-left px-2 py-1.5 text-[13px] rounded-md transition-colors flex items-center justify-between group",
                        isActive
                          ? "text-primary font-medium bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                      )}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
