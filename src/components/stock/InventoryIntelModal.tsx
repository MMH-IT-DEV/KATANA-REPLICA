'use client';

import React, { useState, useMemo, useRef, MouseEvent, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { KatanaInventoryItem, fetchStockMovements, StockMovement } from "@/lib/katana-data-provider";
import { X, Download, Plus, MapPin, ChevronDown, Info, Calendar } from 'lucide-react';

interface InventoryIntelModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: KatanaInventoryItem | null;
}

// Simplified Button/Tab Component matching the new "Pill" style
const MetricTab = ({ label, value, isActive, onClick }: { label: string, value: number, isActive: boolean, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className={cn(
            "flex flex-col items-center justify-center px-4 py-1.5 rounded-md border transition-all min-w-[100px]",
            isActive 
                ? "bg-background border-border shadow-sm" 
                : "bg-transparent border-transparent hover:bg-secondary/50 text-muted-foreground"
        )}
    >
        <span className={cn("text-[13px] font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>{label}</span>
        {isActive && <span className="text-[11px] font-bold text-foreground mt-0.5">{value}</span>}
    </button>
);

export function InventoryIntelModal({ isOpen, onClose, item }: InventoryIntelModalProps) {
  const [activeTab, setActiveTab] = useState<'in_stock' | 'expected' | 'committed'>('in_stock');
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Drag to scroll state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startX, setStartX] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  useEffect(() => {
      if (isOpen && item) {
          setLoading(true);
          fetchStockMovements(item.id, item.inStock, item.avgCost)
              .then(data => {
                  setMovements(data);
                  setLoading(false);
              })
              .catch(err => {
                  console.error("Failed to fetch stock movements", err);
                  setLoading(false);
              });
      } else {
          setMovements([]);
      }
  }, [isOpen, item]);

  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartY(e.pageY - scrollContainerRef.current.offsetTop);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollTop(scrollContainerRef.current.scrollTop);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    
    // Change cursor
    scrollContainerRef.current.style.cursor = 'grabbing';
    scrollContainerRef.current.style.userSelect = 'none';
  };

  const handleMouseLeave = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'default'; // changed from grab to default
    scrollContainerRef.current.style.removeProperty('user-select');
  };

  const handleMouseUp = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'default'; // changed from grab to default
    scrollContainerRef.current.style.removeProperty('user-select');
    
    // If we barely moved, we consider it a click, otherwise it was a drag
    // This logic is partly handled in click events of children by checking hasDragged or similar 
    // but simple click handler blocking is tricky without capture phase.
    // Instead, we can rely on the fact that small movements won't trigger hasDragged = true easily
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    
    const y = e.pageY - scrollContainerRef.current.offsetTop;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    
    const walkY = (y - startY) * 1; // Scroll speed multiplier
    const walkX = (x - startX) * 1;

    const dist = Math.sqrt(walkX*walkX + walkY*walkY);
    if (dist > 5) {
        setHasDragged(true);
    }

    scrollContainerRef.current.scrollTop = scrollTop - walkY;
    scrollContainerRef.current.scrollLeft = scrollLeft - walkX;
  };

  // Capture click events to prevent them if we were dragging
  const handleCaptureClick = (e: MouseEvent) => {
      if (hasDragged) {
          e.preventDefault();
          e.stopPropagation();
      }
  };

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="!max-w-[95vw] !w-[95vw] h-[90vh] p-0 gap-0 bg-background shadow-2xl border-0 rounded-xl outline-none overflow-hidden flex flex-col"
        showCloseButton={false}
      >
        {/* Visually Hidden Title for Accessibility */}
        <DialogTitle className="sr-only">
          Inventory Intel of [{item.sku}] {item.name}
        </DialogTitle>

        {/* --- 1. Header Section --- */}
        <header className="flex items-start justify-between px-8 pt-8 pb-2 bg-background shrink-0">
            <div className="space-y-1">
                <div className="text-[10px] font-bold text-status-green uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-green"></span>
                    INVENTORY INTEL
                </div>
                <div className="text-3xl font-medium text-foreground tracking-tight leading-tight">
                     <span className="text-muted-foreground font-normal mr-3">[{item.sku}]</span>
                     {item.name}
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Location Selector */}
                <div className="relative">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-md text-sm font-medium text-foreground hover:border-primary/30 transition-colors shadow-sm">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                        MMH Kelowna
                        <ChevronDown className="w-3 h-3 text-muted-foreground opacity-50 ml-1" />
                    </button>
                </div>

                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                    <X className="w-5 h-5" />
                </button>
            </div>
        </header>

        {/* --- 2. Metrics & Controls Bar (The "Pill" Tabs) --- */}
        <div className="px-8 pb-4 flex items-end justify-between bg-background shrink-0">
            
            {/* Pill Tabs Group */}
            <div className="flex items-center bg-secondary/50 p-1 rounded-lg border border-border">
                <MetricTab 
                    label="In stock" 
                    value={item.inStock} 
                    isActive={activeTab === 'in_stock'} 
                    onClick={() => setActiveTab('in_stock')} 
                />
                <MetricTab 
                    label="Expected" 
                    value={item.expected} 
                    isActive={activeTab === 'expected'} 
                    onClick={() => setActiveTab('expected')} 
                />
                <MetricTab 
                    label="Committed" 
                    value={item.committed} 
                    isActive={activeTab === 'committed'} 
                    onClick={() => setActiveTab('committed')} 
                />
            </div>

            {/* Right Side Stats & Actions */}
            <div className="flex items-center gap-6">
                <div className="flex gap-6 mr-4 border-r border-border pr-6 h-8 items-center">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Safety Stock</span>
                        <span className="text-sm font-bold text-foreground">{item.safetyStock}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Calculated</span>
                        <span className="text-sm font-bold text-foreground">{item.calculatedStock}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border text-foreground rounded-md hover:bg-secondary/50 text-xs font-medium transition-all shadow-sm">
                        <Download className="w-3.5 h-3.5 text-muted-foreground" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-xs font-bold transition-all shadow-sm">
                        <Plus className="w-3.5 h-3.5" />
                        Buy Stock
                    </button>
                </div>
            </div>
        </div>

        {/* --- 3. Data Table Section --- */}
        <div className="flex-1 overflow-hidden bg-background border-t border-border relative group/container">
            <div 
                ref={scrollContainerRef}
                className="h-full overflow-auto custom-scrollbar cursor-default"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onClickCapture={handleCaptureClick}
            >
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-background sticky top-0 z-20 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                        {/* Column Headers */}
                        <tr>
                            <th className="bg-background py-3 pl-8 text-[10px] font-bold uppercase tracking-wider text-muted-foreground w-[200px] select-none">
                                <div className="flex items-center gap-1">
                                    Movement Date
                                    <Info className="w-3 h-3 text-muted-foreground/50" />
                                </div>
                            </th>
                            <th className="bg-background py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground w-[250px] select-none">
                                <div className="flex items-center gap-1">
                                    Caused By
                                    <Info className="w-3 h-3 text-muted-foreground/50" />
                                </div>
                            </th>
                            <th className="bg-background py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right w-[150px] select-none">
                                Quantity Change
                            </th>
                            <th className="bg-background py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right w-[150px] select-none">
                                Cost/Unit
                            </th>
                            <th className="bg-background py-3 pr-8 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right select-none">
                                Balance
                            </th>
                        </tr>
                        
                        {/* Filter Row - Inputs need to stop propagation of drag events so they can be used */}
                        <tr className="border-b border-border bg-secondary/10">
                            <td className="py-2 pl-8 pr-2" onMouseDown={(e) => e.stopPropagation()}>
                                <div className="relative">
                                    <Calendar className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" />
                                    <input 
                                        type="text" 
                                        placeholder="All dates" 
                                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-border rounded hover:border-primary/30 focus:border-primary outline-none transition-colors placeholder:text-muted-foreground" 
                                    />
                                </div>
                            </td>
                            <td className="py-2 pr-2" onMouseDown={(e) => e.stopPropagation()}>
                                <input type="text" placeholder="Filter..." className="w-full px-3 py-1.5 text-xs bg-background border border-border rounded hover:border-primary/30 focus:border-primary outline-none transition-colors placeholder:text-muted-foreground" />
                            </td>
                            <td className="py-2 pr-2" onMouseDown={(e) => e.stopPropagation()}>
                                <input type="text" placeholder="Filter" className="w-full px-3 py-1.5 text-xs bg-background border border-border rounded hover:border-primary/30 focus:border-primary outline-none transition-colors placeholder:text-muted-foreground text-right" />
                            </td>
                            <td className="py-2 pr-2" onMouseDown={(e) => e.stopPropagation()}>
                                <input type="text" placeholder="Filter" className="w-full px-3 py-1.5 text-xs bg-background border border-border rounded hover:border-primary/30 focus:border-primary outline-none transition-colors placeholder:text-muted-foreground text-right" />
                            </td>
                            <td className="py-2 pr-8" onMouseDown={(e) => e.stopPropagation()}>
                                <input type="text" placeholder="Filter" className="w-full px-3 py-1.5 text-xs bg-background border border-border rounded hover:border-primary/30 focus:border-primary outline-none transition-colors placeholder:text-muted-foreground text-right" />
                            </td>
                        </tr>
                    </thead>

                    <tbody className="text-[13px]">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-muted-foreground">Loading history...</td>
                            </tr>
                        ) : movements.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-muted-foreground">No movement history found.</td>
                            </tr>
                        ) : (
                            movements.map((row) => (
                                <tr key={row.id} className="group border-b border-border/50 hover:bg-secondary/20 transition-colors h-12">
                                    <td className="py-3 pl-8 text-muted-foreground font-sans text-xs select-none">
                                        {new Date(row.date).toLocaleString('en-US', {
                                            year: 'numeric', month: '2-digit', day: '2-digit',
                                            hour: '2-digit', minute: '2-digit', hour12: true
                                        })}
                                    </td>
                                    <td className="py-3 select-none">
                                        <a href="#" onClick={(e) => hasDragged && e.preventDefault()} className="text-primary font-medium hover:underline cursor-pointer">
                                            {row.type}
                                        </a>
                                    </td>
                                    <td className={cn("py-3 text-right font-medium select-none", row.change > 0 ? "text-status-green" : "text-status-red")}>
                                        {row.change > 0 ? `+${row.change}` : row.change}
                                    </td>
                                    <td className="py-3 text-right text-foreground select-none">
                                        {row.price.toFixed(3)} <span className="text-[10px] text-muted-foreground/70 ml-1">CAD</span>
                                    </td>
                                    <td className="py-3 pr-8 text-right font-bold text-foreground select-none">
                                        {row.balance}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Custom Scroll Hint (optional, visuals only) */}
            <div className="absolute bottom-4 right-8 pointer-events-none opacity-0 group-hover/container:opacity-50 transition-opacity text-[10px] bg-black/70 text-white px-2 py-1 rounded">
                Drag to scroll
            </div>
        </div>

        {/* Footer */}
        <footer className="bg-background border-t border-border p-3 text-[10px] text-muted-foreground flex justify-between px-8 shrink-0 font-medium">
            <div>Displaying {movements.length} of {movements.length} records</div>
            <div>Last synced: Just now</div>
        </footer>

      </DialogContent>
    </Dialog>
  );
}
