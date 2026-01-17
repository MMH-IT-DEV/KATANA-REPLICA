'use client';

import { Shell } from "@/components/layout/Shell";
import { PurchasingTable } from "@/components/buy/PurchasingTable";
import { SuppliersTable } from "@/components/buy/SuppliersTable";
import { useState } from "react";

export default function BuyPage() {
    const [activePage, setActivePage] = useState('Purchasing');

    const buySidebar = [
        {
            title: "General",
            items: [
                { name: "Purchasing", id: "Purchasing" },
                { name: "Outsourcing", id: "Outsourcing" },
                { name: "Suppliers", id: "Suppliers" },
            ]
        }
    ];

    return (
        <Shell activeTab="Buy" activePage={activePage} onPageChange={setActivePage} sidebarGroups={buySidebar}>
            <div className="flex-1 flex flex-col min-h-0 bg-background">
                {activePage === 'Purchasing' && <PurchasingTable />}
                {activePage === 'Suppliers' && <SuppliersTable />}

                {activePage !== 'Purchasing' && activePage !== 'Suppliers' && (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        {activePage} feature coming soon
                    </div>
                )}
            </div>
        </Shell>
    );
}
