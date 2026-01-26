'use client';

import { useState } from 'react';
import {
    Download,
    Upload,
    ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImportItem {
    id: string;
    title: string;
    description: string;
    hasTemplate?: boolean;
    usesOwnData?: boolean;
    hasDataExport?: boolean;
    integration?: 'zapier' | 'make';
    hasSetup?: boolean;
}

const createNewImports: ImportItem[] = [
    { id: 'products', title: 'Add new products', description: 'You can import new products using our import template. Download and fill in the template and upload it back to Katana.', hasTemplate: true },
    { id: 'materials', title: 'Add new materials', description: 'You can import new materials using our import template. Download and fill in the template and upload it back to Katana.', hasTemplate: true },
    { id: 'recipes', title: 'Add new product recipes / BOMs', description: 'You can import recipes / BOMs to existing products in Katana using our import template. Download and fill in the template and upload it back to Katana to add new ingredients to products in Katana.', hasTemplate: true },
    { id: 'operations', title: 'Add new product operations', description: 'You can import product operations to existing products in Katana using our import template. Download and fill in the template and upload it back to Katana to add new operations to products in Katana.', hasTemplate: true },
    { id: 'batch_numbers', title: 'Add new batch / lot numbers', description: 'Add batch numbers and their initial stock quantities to existing products and materials. Your own data (minus archived information) will be used as a template. Edit the template and upload it back into Katana.', hasTemplate: true, usesOwnData: true },
    { id: 'price_lists', title: 'Update price lists', description: 'Add price lists and their related data into Katana. Download available price list data (not including archived information) and use it as a template for uploading price lists into Katana.', hasTemplate: true },
    { id: 'sales_orders', title: 'Add new sales orders', description: 'You can import sales orders from Google Sheets via Zapier. Once you have connected your Katana account and spreadsheet in Zapier, every new row added to a Google Sheets spreadsheet will be imported as a sales order in Katana.', integration: 'zapier', hasSetup: true },
    { id: 'customers', title: 'Add new customers', description: 'You can import customers from Google Sheets via Zapier. Once you have connected your Katana account and spreadsheet in Zapier, every new row added to a Google Sheets spreadsheet will be imported as a customer in Katana.', integration: 'zapier', hasSetup: true },
    { id: 'purchase_orders', title: 'Add new purchase orders', description: 'You can import purchase orders from Google Sheets via Make. Once you have connected your Katana account and spreadsheet in Make, every new row added to a Google Sheets spreadsheet will be imported as a purchase order in Katana.', integration: 'make', hasSetup: true },
    { id: 'suppliers', title: 'Add new suppliers', description: 'You can import suppliers from Google Sheets via Make. Once you have connected your Katana account and spreadsheet in Make, every new row added to a Google Sheets spreadsheet will be imported as a supplier in Katana.', integration: 'make', hasSetup: true },
];

const updateImports: ImportItem[] = [
    { id: 'update_products', title: 'Update existing products + safety stock levels', description: 'Update product records and safety stock quantities in bulk using an import template or exported data.', hasTemplate: true, hasDataExport: true },
    { id: 'update_materials', title: 'Update existing materials + safety stock levels', description: 'Update material records and safety stock quantities in bulk using an import template or exported data.', hasTemplate: true, hasDataExport: true },
    { id: 'stock_levels', title: 'Update stock levels & stock values', description: 'Update inventory quantities and values for all items. Very useful for physical inventory counts.', hasTemplate: true, hasDataExport: true },
    { id: 'mfg_serial', title: 'Add serial numbers to Manufacturing Orders', description: 'Add serial numbers to closed manufacturing orders that are missing them.', hasTemplate: true },
    { id: 'po_serial', title: 'Add serial numbers to Purchase Orders', description: 'Add serial numbers to received (Outsourced) purchase orders that are missing them.', hasTemplate: true },
];

export default function DataImport() {
    const handleDownload = (id: string, type: 'template' | 'data') => {
        console.log(`Download ${type}:`, id);
    };

    const handleUpload = (id: string) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) console.log('Upload:', file.name, 'for', id);
        };
        input.click();
    };

    const handleSetup = (id: string) => {
        console.log('Setup:', id);
    };

    const renderImportRow = (item: ImportItem) => (
        <div key={item.id} className="h-11 border-b border-[#3a3a38]/30 last:border-0 flex items-center justify-between group px-2 hover:bg-[#222220]/50 transition-colors">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-[13px] font-medium text-[#faf9f5] truncate">{item.title}</span>
                {item.integration && (
                    <span className="text-[9px] font-bold text-[#7a7974] bg-[#2a2a28] px-1 py-0 rounded uppercase tracking-wider shrink-0 border border-[#3a3a38]">
                        {item.integration}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-5 shrink-0 ml-4">
                {item.hasTemplate && !item.usesOwnData && (
                    <button
                        onClick={() => handleDownload(item.id, 'template')}
                        className="flex items-center gap-1.5 text-[12px] font-medium text-[#538fc1] hover:text-[#a5d6ff] transition-colors"
                    >
                        <Download size={13} />
                        Download template
                    </button>
                )}
                {item.usesOwnData && (
                    <button
                        onClick={() => handleDownload(item.id, 'data')}
                        className="flex items-center gap-1.5 text-[12px] font-medium text-[#538fc1] hover:text-[#a5d6ff] transition-colors"
                    >
                        <Download size={13} />
                        Download data
                    </button>
                )}
                {item.hasDataExport && (
                    <button
                        onClick={() => handleDownload(item.id, 'data')}
                        className="flex items-center gap-1.5 text-[12px] font-medium text-[#538fc1] hover:text-[#a5d6ff] transition-colors"
                    >
                        <Download size={13} />
                        Download data
                    </button>
                )}
                {item.hasTemplate && (
                    <button
                        onClick={() => handleUpload(item.id)}
                        className="flex items-center gap-1.5 text-[12px] font-medium text-[#538fc1] hover:text-[#a5d6ff] transition-colors"
                    >
                        <Upload size={13} />
                        Upload data
                    </button>
                )}
                {item.hasSetup && (
                    <button
                        onClick={() => handleSetup(item.id)}
                        className="flex items-center gap-1.5 text-[12px] font-medium text-[#538fc1] hover:text-[#a5d6ff] transition-colors"
                    >
                        Go to setup
                        <ExternalLink size={13} />
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="max-w-[1600px] mx-auto p-6 space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-xl font-medium text-[#faf9f5] tracking-tight">Import data</h1>
                <p className="mt-1 text-[13px] text-[#7a7974] leading-relaxed max-w-4xl">
                    Discover templates related to different sections/tables, which you can use to upload your own data into Katana.
                </p>
            </div>

            {/* Content Tables */}
            <div className="space-y-10">
                {/* Create New Data */}
                <div className="space-y-3">
                    <h2 className="text-[14px] font-bold text-[#faf9f5] ml-1">Create new data</h2>
                    <div className="bg-[#1a1a18] rounded-md border border-[#3a3a38]/50 overflow-hidden shadow-sm">
                        {createNewImports.map(renderImportRow)}
                    </div>
                </div>

                {/* Update Existing Data */}
                <div className="space-y-3">
                    <h2 className="text-[14px] font-bold text-[#faf9f5] ml-1">Update existing data</h2>
                    <div className="bg-[#1a1a18] rounded-md border border-[#3a3a38]/50 overflow-hidden shadow-sm">
                        {updateImports.map(renderImportRow)}
                    </div>
                </div>
            </div>

            {/* Compact Note Box */}
            <div className="bg-[#ffffff]/[0.03] border border-[#ffffff]/[0.08] rounded-md p-4 max-w-5xl">
                <p className="text-[12px] leading-relaxed text-[#7a7974]">
                    <span className="font-medium mr-1 text-[#faf9f5]">Note:</span>
                    <span className="italic">
                        Cannot find an import you need? You can build custom imports via the Katana API.
                    </span>
                    <button className="text-[#faf9f5] hover:text-[#faf9f5]/80 transition-colors ml-2 font-medium">
                        Read more
                    </button>
                </p>
            </div>
        </div>
    );
}
