'use client';

import { Shell } from "@/components/layout/Shell";
import { useState } from "react";
import { SalesOrderTable } from "@/components/sell/SalesOrderTable";


import { SELL_NAV_GROUPS } from "./constants";

export default function SellPage() {
  const [activePage, setActivePage] = useState('Sales orders');

  return (
    <Shell activeTab="Sell" activePage={activePage} onPageChange={setActivePage} sidebarGroups={SELL_NAV_GROUPS}>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 bg-background">
        {activePage === 'Sales orders' ? (
          <SalesOrderTable />
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
