'use client';

import { Shell } from "@/components/layout/Shell";
import { StockTable } from "@/components/stock/StockTable";
import { BatchesTable } from "@/components/stock/BatchesTable";
import { StockAdjustmentsTable } from "@/components/stock/StockAdjustmentsTable";
import { StocktakesTable } from "@/components/stock/StocktakesTable";
import { useState } from "react";

export default function StockPage() {
    const [activePage, setActivePage] = useState('Inventory');

    const stockSidebar = [
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

    return (
        <Shell activeTab="Stock" activePage={activePage} onPageChange={setActivePage} sidebarGroups={stockSidebar}>
            <div className="flex-1 flex flex-col min-h-0 bg-background">
                {activePage === 'Inventory' && <StockTable />}
                {activePage === 'Batches' && <BatchesTable />}
                {activePage === 'Stock adjustments' && <StockAdjustmentsTable />}
                {activePage === 'Stocktakes' && <StocktakesTable />}

                {activePage !== 'Inventory' && activePage !== 'Batches' && activePage !== 'Stock adjustments' && activePage !== 'Stocktakes' && (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        {activePage} feature coming soon
                    </div>
                )}
            </div>
        </Shell>
    );
}
