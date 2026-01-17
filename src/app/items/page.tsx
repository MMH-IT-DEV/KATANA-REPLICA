'use client';

import { Shell } from "@/components/layout/Shell";
import { ItemsTable } from "@/components/items/ItemsTable";
import { useState } from "react";

export default function ItemsPage() {
  // For Items tab, we might have different sidebar items, 
  // but for now let's just have "Items" active.
  const [activePage, setActivePage] = useState('Items');

  const itemsSidebar = [
      {
          title: "Data",
          items: [
              { name: "Items", id: "Items" },
              // Add more if needed later like "Services", "Resources"
          ]
      }
  ];

  return (
    <Shell activeTab="Items" activePage={activePage} onPageChange={setActivePage} sidebarGroups={itemsSidebar}>
      <div className="flex-1 flex flex-col min-h-0 bg-background">
         <ItemsTable />
      </div>
    </Shell>
  );
}
















