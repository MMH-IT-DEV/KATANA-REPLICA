'use client';

import { useState } from 'react';
import { Shell } from '@/components/layout/Shell';
import GeneralSettings from '@/components/settings/GeneralSettings';
import UnitsOfMeasure from '@/components/settings/UnitsOfMeasure';
import TaxRates from '@/components/settings/TaxRates';
import Categories from '@/components/settings/Categories';
import Costing from '@/components/settings/Costing';
import CustomFields from '@/components/settings/CustomFields';
import Barcodes from '@/components/settings/Barcodes';
import Operations from '@/components/settings/Operations';
import Resources from '@/components/settings/Resources';
import Locations from '@/components/settings/Locations';
import PrintTemplates from '@/components/settings/PrintTemplates';
import Manufacturing from '@/components/settings/Manufacturing';
import DataImport from '@/components/settings/DataImport';
import { NavGroup } from '@/components/layout/Shell';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');

    // Define the Settings Sidebar structure to pass to Shell
    const settingsSidebar: NavGroup[] = [
        {
            title: "General",
            items: [
                { name: "General", id: "general" },
                { name: "Units of measure", id: "units-of-measure" },
                { name: "Tax rates", id: "tax-rates" },
                { name: "Categories", id: "categories" },
                { name: "Custom fields", id: "custom-fields" }
            ]
        },
        {
            title: "Production",
            items: [
                { name: "Costing", id: "costing" },
                { name: "Barcodes", id: "barcodes" },
                { name: "Operations", id: "operations" },
                { name: "Resources", id: "resources" },
                { name: "Locations", id: "locations" }
            ]
        },
        {
            title: "System",
            items: [
                { name: "Print templates", id: "print-templates" },
                { name: "Manufacturing", id: "manufacturing" },
                { name: "Data import", id: "data-import" }
            ]
        }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return <GeneralSettings />;
            case 'units-of-measure':
                return <UnitsOfMeasure />;
            case 'tax-rates':
                return <TaxRates />;
            case 'categories':
                return <Categories />;
            case 'costing':
                return <Costing />;
            case 'custom-fields':
                return <CustomFields />;
            case 'barcodes':
                return <Barcodes />;
            case 'operations':
                return <Operations />;
            case 'resources':
                return <Resources />;
            case 'locations':
                return <Locations />;
            case 'print-templates':
                return <PrintTemplates />;
            case 'manufacturing':
                return <Manufacturing />;
            case 'data-import':
                return <DataImport />;
            default:
                // Pattern: Empty State for upcoming pages
                return (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
                        <div className="text-lg font-medium mb-2">{activeTab.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
                        <p className="text-sm">This settings page is currently under development.</p>
                    </div>
                );
        }
    };

    return (
        // Pass sidebarGroups to Shell to render a SINGLE sidebar for this page
        <Shell
            activeTab="Settings"
            activePage={activeTab}
            onPageChange={setActiveTab}
            sidebarGroups={settingsSidebar}
        >
            <div className="flex-1 bg-[#1a1a18] overflow-auto">
                {renderContent()}
            </div>
        </Shell>
    );
}
