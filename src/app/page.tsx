'use client';

import { Shell } from "@/components/layout/Shell";
import { useState } from "react";
import { StockTable } from "@/components/stock/StockTable";

export default function Home() {
  const [activePage, setActivePage] = useState('Inventory');

  return (
    <Shell activeTab="Stock" activePage={activePage} onPageChange={setActivePage}>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-background">
        {activePage === 'Inventory' ? (
            <StockTable />
        ) : (
             <div className="p-8 flex flex-col items-center justify-center h-full text-muted-foreground">
                 <div className="text-lg font-medium mb-2">Module Under Construction</div>
                 <p className="text-sm">The <strong>{activePage}</strong> view is currently being built.</p>
            </div>
        )}
      </div>
    </Shell>
  );
}
