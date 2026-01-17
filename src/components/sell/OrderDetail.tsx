'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Printer,
  MoreVertical,
  X,
  ExternalLink,
  ChevronDown,
  Plus,
  MapPin,
  Trash2,
  Info,
  ArrowLeft,
  ChevronRight,
  Search,
  Copy,
  FileText,
  Barcode,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  List,
  ListOrdered,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SalesOrder, OrderItem, Address } from '@/lib/mock-data';
import { StatusBadge } from '@/components/ui/StatusBadge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { pdf } from '@react-pdf/renderer';
import { PackingListPDF, AmazonPackingSlipPDF, SalesOrderPDF } from '@/components/print/Templates';

interface OrderDetailProps {
  order: SalesOrder;
}

const LOCATIONS = [
  "MMH Kelowna",
  "Storage Warehouse",
  "Amazon USA",
  "Amazon CA",
  "Amazon AU",
  "Shopify"
];

const MOCK_PRODUCTS = [
  { name: "[AGJAR-1] Amber Jars / 1 OZ / AMBER / GLASS", price: 60.00 },
  { name: "[AGJAR-2] Amber Jars / 2 OZ / AMBER / GLASS", price: 1.95 },
  { name: "[AGJAR-4] Amber Jars / 4 OZ / AMBER / GLASS", price: 2.50 },
  { name: "[VP-50-W] WOUND CARE / VARIETY BANDAGE PACK", price: 5.00 },
];

export function OrderDetail({ order }: OrderDetailProps) {
  const [localOrder, setLocalOrder] = useState(order);

  useEffect(() => {
    setLocalOrder(order);
  }, [order]);

  const defaultAddress: Address = {
    name: '',
    line1: '',
    phone: '',
  };

  const billingAddress = localOrder.billing_address || defaultAddress;
  const shippingAddress = localOrder.shipping_address || defaultAddress;

  const [trackingInfo, setTrackingInfo] = useState({
    number: '',
    link: '',
    carrier: '',
    method: ''
  });

  const [attributeRowId, setAttributeRowId] = useState<string | null>(null);
  const [attributeValue, setAttributeValue] = useState("");

  // State for controlled popover on new rows
  const [openRowId, setOpenRowId] = useState<string | null>(null);

  // Shipping Fee State
  const [shippingFeeRows, setShippingFeeRows] = useState<{ id: string, description: string, cost: number, tax: string }[]>([]);
  const EXCHANGE_RATE = 1.41034;

  // Saving State
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

  // Address Editing State
  const [editingAddressType, setEditingAddressType] = useState<'billing' | 'shipping' | null>(null);
  const [addressForm, setAddressForm] = useState({
    firstName: '', lastName: '', company: '', phone: '',
    street: '', details: '', city: '', state: '', zip: '', country: ''
  });

  // Rich Text State & Refs
  const [additionalInfo, setAdditionalInfo] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const simulateSave = () => {
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 800);
  };

  // Helper to recalculate totals
  const recalculateOrder = (items: OrderItem[]) => {
    const newTotal = items.reduce((sum, item) => sum + item.total, 0);
    return { items, total_amount: newTotal };
  };

  // --- Item Updates ---
  const updateItem = (itemId: string, field: keyof OrderItem, value: any) => {
    simulateSave();
    const updatedItems = localOrder.items.map(item => {
      if (item.id === itemId) {
        const updatedItem = { ...item, [field]: value };
        // Recalculate total if price or quantity changes
        if (field === 'price' || field === 'quantity' || field === 'discount') {
          const discountMult = 1 - (updatedItem.discount / 100);
          updatedItem.total = updatedItem.price * updatedItem.quantity * discountMult;
        }
        return updatedItem;
      }
      return item;
    });
    const { total_amount } = recalculateOrder(updatedItems);
    setLocalOrder({ ...localOrder, items: updatedItems, total_amount });
  };

  // Handle Location Change (Global)
  const handleLocationChange = (location: string) => {
    simulateSave();
    const updatedItems: OrderItem[] = localOrder.items.map(item => {
      const salesStatus: OrderItem['status']['sales'] = location !== "Storage Warehouse" ? 'In stock' : 'Not available';
      return {
        ...item,
        location: location,
        status: {
          ...item.status,
          sales: salesStatus
        }
      };
    });

    setLocalOrder({
      ...localOrder,
      ship_from: location,
      items: updatedItems
    });
  };

  // Handle Delivery Status Change
  const handleStatusChange = (status: string) => {
    simulateSave();
    const deliveryStatus = status.includes('Deliver') ? 'SHIPPED' :
      status.includes('Pack') ? 'PARTIALLY_SHIPPED' : 'NOT_SHIPPED';

    // Auto-generate tracking info if shipping
    if (deliveryStatus === 'SHIPPED' && !trackingInfo.number) {
      setTrackingInfo({
        number: '1Z999AA10123456784',
        link: 'https://www.ups.com/track?loc=en_US&tracknum=1Z999AA10123456784',
        carrier: 'UPS',
        method: 'Standard'
      });
    }

    // Auto-generate shipping fee if not present
    if ((deliveryStatus === 'SHIPPED' || deliveryStatus === 'PARTIALLY_SHIPPED') && shippingFeeRows.length === 0) {
      setShippingFeeRows([{
        id: 'fee-1',
        description: 'FedEx International Connect Plus',
        cost: 24.00,
        tax: '-'
      }]);
    }

    // TODO: Inventory Deduction Logic
    // When deliveryStatus becomes 'SHIPPED' or 'DELIVERED', items should be deducted from inventory.
    // In a real scenario, this would trigger a backend update to reduce 'On Hand' counts.
    // For now, this is simulated via state changes.

    setLocalOrder({ ...localOrder, delivery_status: deliveryStatus });
  };

  // Add Row
  const handleAddRow = () => {
    simulateSave();
    const newItem: OrderItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      quantity: 1,
      price: 0,
      discount: 0,
      total: 0,
      tax: '5% - GST',
      location: localOrder.ship_from,
      status: {
        sales: 'Not available',
        ingredients: 'Not applicable',
        production: 'Not applicable'
      }
    };
    setLocalOrder({ ...localOrder, items: [...localOrder.items, newItem] });
    setTimeout(() => setOpenRowId(newItem.id), 100);
  };

  // Update Item from Search
  const handleItemSelect = (itemId: string, product: { name: string, price: number }) => {
    simulateSave();
    const updatedItems: OrderItem[] = localOrder.items.map(item => {
      if (item.id === itemId) {
        const salesStatus: OrderItem['status']['sales'] = localOrder.ship_from !== "Storage Warehouse" ? 'In stock' : 'Not available';
        return {
          ...item,
          name: product.name,
          price: product.price,
          total: product.price * item.quantity,
          status: {
            ...item.status,
            sales: salesStatus
          }
        };
      }
      return item;
    });

    const { total_amount } = recalculateOrder(updatedItems);
    setLocalOrder({ ...localOrder, items: updatedItems, total_amount });
    setOpenRowId(null);
  };

  // Delete Row
  const handleDeleteRow = (itemId: string) => {
    simulateSave();
    const updatedItems = localOrder.items.filter(i => i.id !== itemId);
    const { total_amount } = recalculateOrder(updatedItems);
    setLocalOrder({ ...localOrder, items: updatedItems, total_amount });
  };

  // Duplicate Order
  const handleDuplicate = () => {
    simulateSave();
    alert("Order duplicated (mock).");
  };

  // Print Action
  const handlePrint = async (template: string) => {
    setSaveStatus('saving');
    try {
      let doc;
      if (template === 'Packing list') doc = <PackingListPDF order={localOrder} />;
      else if (template === 'Sales order') doc = <SalesOrderPDF order={localOrder} />;
      else if (template === 'Amazon Packing Slip') doc = <AmazonPackingSlipPDF order={localOrder} />;

      if (doc) {
        const blob = await pdf(doc).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        alert(`Printing ${template}...`);
      }
    } catch (error) {
      console.error("PDF Gen Error:", error);
      alert("Failed to generate PDF");
    } finally {
      setSaveStatus('saved');
    }
  };

  // --- Address Editing ---
  const openAddressEdit = (type: 'billing' | 'shipping') => {
    const addr = type === 'billing' ? billingAddress : shippingAddress;
    const [first, ...last] = (addr.name || '').split(' ');
    const parts = (addr.line1 || '').split(',').map(s => s.trim());

    setAddressForm({
      firstName: first || '',
      lastName: last.join(' ') || '',
      company: '',
      phone: addr.phone,
      street: parts[0] || '',
      details: '',
      city: parts[1] || '',
      state: parts[2] || '',
      zip: parts[3] || '',
      country: parts[4] || 'Canada'
    });
    setEditingAddressType(type);
  };

  const saveAddress = () => {
    if (!editingAddressType) return;
    simulateSave();
    const { firstName, lastName, street, city, state, zip, country, phone } = addressForm;
    const newAddress: Address = {
      name: `${firstName} ${lastName}`.trim(),
      line1: [street, city, state, zip, country].filter(Boolean).join(', '),
      phone: phone
    };

    setLocalOrder({
      ...localOrder,
      [editingAddressType === 'billing' ? 'billing_address' : 'shipping_address']: newAddress
    });
    setEditingAddressType(null);
  };

  // --- Rich Text Helpers ---
  const insertMarkdown = (prefix: string, suffix?: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = additionalInfo;
    const selectedText = text.substring(start, end);
    const actualSuffix = suffix ?? prefix; // Use same as prefix if not specified

    let newText: string;
    let newCursorPos: number;

    if (selectedText) {
      // Wrap selected text with prefix/suffix
      newText = text.substring(0, start) + prefix + selectedText + actualSuffix + text.substring(end);
      newCursorPos = start + prefix.length + selectedText.length + actualSuffix.length;
    } else {
      // No selection - insert prefix+suffix and place cursor in middle
      newText = text.substring(0, start) + prefix + actualSuffix + text.substring(end);
      newCursorPos = start + prefix.length; // Cursor between prefix and suffix
    }

    setAdditionalInfo(newText);
    simulateSave();

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      simulateSave();
      // Logic to save message? For now just simulating save.
      // If we want to KEEP the newline, remove e.preventDefault().
      // User said "when I click Enter, I want the message to be saved."
      // Typically implies "Submit". I'll prevent default to signify "Done".
    }
  };

  const isShippingSameAsBilling =
    shippingAddress.name === billingAddress.name &&
    shippingAddress.line1 === billingAddress.line1 &&
    shippingAddress.phone === billingAddress.phone;

  const notShippedItems = localOrder.items.filter(i => i.delivery_status !== 'DELIVERED');
  const deliveredItems = localOrder.items.filter(i => i.delivery_status === 'DELIVERED');

  const shippingTotal = shippingFeeRows.reduce((sum, row) => sum + row.cost, 0);
  const itemsTotal = localOrder.total_amount;
  const finalTotal = itemsTotal + shippingTotal;
  const totalDelivered = deliveredItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-full bg-background font-sans text-[13px] text-foreground pb-20 flex flex-col">

      {/* --- Header (Sticky) --- */}
      <header className="bg-background sticky top-0 z-30 border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex justify-between items-center">

          {/* Left: Title & Breadcrumb Area */}
          <div className="flex items-center gap-4">
            <Link href="/sell" className="p-2 rounded-full hover:bg-secondary/50 text-muted-foreground transition-colors">
              <ArrowLeft size={20} />
            </Link>

            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5">
                <Link href="/sell" className="hover:text-foreground transition-colors">Sales orders</Link>
                <span className="text-border">/</span>
                <span>{localOrder.order_no}</span>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-medium text-foreground tracking-tight">
                  {localOrder.order_no} {localOrder.customer?.name}
                </h1>
                <StatusBadge status={localOrder.status} />
              </div>
            </div>
          </div>

          {/* Right: Actions Toolbar */}
          <div className="flex items-center gap-2">
            {/* Return Button */}
            <button className="px-4 py-2 text-primary font-medium rounded-md text-sm hover:bg-primary/5 transition-colors">
              + Return
            </button>

            {/* Status Dropdown (Popover) */}
            <Popover>
              <PopoverTrigger asChild>
                <button className={cn(
                  "px-4 py-2 font-medium rounded-md flex items-center gap-2 text-sm transition-colors border outline-none",
                  localOrder.delivery_status === 'NOT_SHIPPED' ? "bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-default)] hover:bg-[var(--bg-hover)]" :
                    localOrder.delivery_status === 'PARTIALLY_SHIPPED' ? "bg-[var(--status-warning-bg)] text-[var(--status-warning)] border-[var(--status-warning)]/20" :
                      "bg-[var(--status-success-bg)] text-[var(--status-success)] border-[var(--status-success)]/20"
                )}>
                  {localOrder.delivery_status === 'NOT_SHIPPED' ? 'Not shipped' :
                    localOrder.delivery_status === 'PARTIALLY_SHIPPED' ? 'Partially delivered' : 'Shipped'}
                  <ChevronDown size={16} className="opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-1" align="end" sideOffset={5}>
                <div className="text-xs font-medium text-muted-foreground px-2 py-1.5">Quote status</div>
                <div className="px-2 py-1.5 text-sm hover:bg-secondary/50 rounded-sm cursor-pointer flex items-center gap-2" onClick={() => handleStatusChange('Pending')}>
                  <div className="w-2 h-2 bg-gray-200 rounded-sm"></div> Pending
                </div>
                <Separator className="my-1" />
                <div className="text-xs font-medium text-muted-foreground px-2 py-1.5">Delivery status</div>
                <div onClick={() => handleStatusChange('Pack some')} className="px-2 py-1.5 text-sm hover:bg-secondary/50 rounded-sm cursor-pointer flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-sm"></div> Pack some...
                </div>
                <div onClick={() => handleStatusChange('Pack all')} className="px-2 py-1.5 text-sm hover:bg-secondary/50 rounded-sm cursor-pointer flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-sm"></div> Pack all
                </div>
                <div onClick={() => handleStatusChange('Deliver some')} className="px-2 py-1.5 text-sm hover:bg-secondary/50 rounded-sm cursor-pointer flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-sm"></div> Deliver some...
                </div>
                <div onClick={() => handleStatusChange('Deliver all')} className="px-2 py-1.5 text-sm hover:bg-secondary/50 rounded-sm cursor-pointer flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-sm"></div> Deliver all
                </div>
              </PopoverContent>
            </Popover>

            {/* Saving Indicator */}
            <span className="text-xs text-muted-foreground mr-4 hidden xl:flex items-center gap-2 min-w-[100px] justify-end">
              {saveStatus === 'saving' ? (
                <>
                  <Loader2 size={12} className="animate-spin" /> Saving...
                </>
              ) : (
                "All changes saved"
              )}
            </span>

            {/* Print Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-secondary/50 rounded-md transition-all text-muted-foreground" title="Print">
                  <Printer size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  Choose a print template:
                </div>
                <DropdownMenuItem onClick={() => handlePrint('Sales order')}>
                  Sales order
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePrint('Packing list')}>
                  Packing list
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePrint('Barcode Label')}>
                  Barcode Label
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePrint('Amazon Packing Slip')}>
                  Amazon Packing Slip
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Manage print templates
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* More Options Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-secondary/50 rounded-md transition-all text-muted-foreground" title="More options">
                  <MoreVertical size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={handleDuplicate}>
                  <Copy className="mr-2 h-4 w-4" /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-[1px] h-5 bg-border mx-1"></div>
            <Link href="/sell" className="p-2 hover:bg-secondary/50 rounded-md transition-all text-muted-foreground hover:text-foreground" title="Close">
              <X size={20} />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto w-full p-6 space-y-6">

        {/* ... Info Card ... */}
        <div className="bg-background rounded-lg border border-border p-6">
          <div className="grid grid-cols-4 gap-x-12 gap-y-8 border-b border-border pb-8 mb-8">
            {/* Column 1 */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Customer</label>
                <div className="flex items-center justify-between group cursor-pointer">
                  <span className="text-primary font-medium text-[14px] hover:underline">{localOrder.customer?.name || 'Unknown'}</span>
                  <ExternalLink size={12} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Sales order #</label>
                <div className="text-[14px] text-foreground">{localOrder.id}</div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Customer reference #</label>
                <div className="text-muted-foreground italic text-[14px]">{localOrder.customer_ref || '-'}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Order currency</label>
                <div className="flex items-center gap-1 text-foreground text-[14px]">
                  {localOrder.currency} <ChevronDown size={12} className="text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Column 3 - Spacer */}
            <div></div>

            {/* Column 4 */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Delivery deadline</label>
                  <div className={cn(
                    "text-[14px] font-medium",
                    new Date(localOrder.delivery_date) < new Date() ? "text-red-600" : "text-foreground"
                  )}>
                    {localOrder.delivery_date}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Created date</label>
                  <div className="text-foreground text-[14px]">{localOrder.created_at}</div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Ship from</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="text-foreground text-[14px] cursor-pointer hover:underline flex items-center gap-1">
                      {localOrder.ship_from} <ChevronDown size={12} className="text-muted-foreground" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-1" align="start">
                    {LOCATIONS.map(loc => (
                      <div
                        key={loc}
                        className={cn(
                          "px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-secondary/50",
                          localOrder.ship_from === loc && "bg-secondary font-medium"
                        )}
                        onClick={() => handleLocationChange(loc)}
                      >
                        {loc}
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Addresses Section - Clickable to Edit (Fixed for text selection) */}
          <div className="grid grid-cols-2 gap-12">
            <div className="bg-secondary/20 p-5 rounded-md border border-border/50 relative group transition-colors hover:bg-secondary/30">
              <div
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => openAddressEdit('billing')}
                title="Edit billing address"
              >
                <div className="bg-background p-1.5 rounded-full border border-border hover:bg-secondary">
                  <FileText size={12} />
                </div>
              </div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3 select-none">Bill to</label>
              <div className="text-[14px] font-medium text-foreground mb-1">{billingAddress.name || 'No name'}</div>
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin size={14} className="mt-0.5 text-muted-foreground/70 shrink-0" />
                <span>{billingAddress.line1 || 'No address provided'}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm pl-6">
                <span className="text-muted-foreground/70">Phone:</span> {billingAddress.phone || '-'}
              </div>
            </div>
            <div className="bg-secondary/20 p-5 rounded-md border border-border/50 relative group transition-colors hover:bg-secondary/30">
              <div
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => openAddressEdit('shipping')}
                title="Edit shipping address"
              >
                <div className="bg-background p-1.5 rounded-full border border-border hover:bg-secondary">
                  <FileText size={12} />
                </div>
              </div>
              <label className="block text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3 select-none">Ship to</label>

              {isShippingSameAsBilling ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground italic py-2">
                  <MapPin size={16} />
                  <span>Same as billing address</span>
                </div>
              ) : (
                <>
                  <div className="text-[14px] font-medium text-foreground mb-1">{shippingAddress.name || 'No name'}</div>
                  <div className="flex items-start gap-2 text-muted-foreground text-sm">
                    <MapPin size={14} className="mt-0.5 text-muted-foreground/70 shrink-0" />
                    <span>{shippingAddress.line1 || 'No address provided'}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm pl-6">
                    <span className="text-muted-foreground/70">Phone:</span> {shippingAddress.phone || '-'}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* --- Items Section --- */}
        <div className="space-y-8">

          {/* Items Not Shipped */}
          <div className="space-y-4">
            <div className="flex justify-between items-end px-1">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-medium text-foreground">Items not shipped</h2>
                <span className="bg-secondary text-muted-foreground px-2 py-0.5 rounded-sm text-[11px] font-medium flex items-center gap-1 border border-border">
                  <MapPin size={10} /> {localOrder.ship_from}
                </span>
              </div>
              {/* Tracking Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-foreground font-medium transition-colors">
                    Tracking info <ChevronDown size={12} />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="end">
                  <div className="grid gap-4">
                    <h4 className="font-medium leading-none">Tracking Information</h4>
                    <div className="grid gap-2">
                      <Label htmlFor="tracking-number">Tracking number</Label>
                      <div className="relative">
                        <Input
                          id="tracking-number"
                          value={trackingInfo.number}
                          onChange={(e) => setTrackingInfo({ ...trackingInfo, number: e.target.value })}
                          className={cn("h-8", trackingInfo.link && "pr-8 text-primary cursor-pointer hover:underline")}
                          onClick={() => trackingInfo.link && window.open(trackingInfo.link, '_blank')}
                          readOnly={!!trackingInfo.link}
                        />
                        {trackingInfo.link && (
                          <ExternalLink
                            size={14}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                          />
                        )}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="carrier">Carrier</Label>
                      <Input
                        id="carrier"
                        value={trackingInfo.carrier}
                        onChange={(e) => setTrackingInfo({ ...trackingInfo, carrier: e.target.value })}
                        className="h-8"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="bg-background rounded-lg border border-border overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-secondary/10 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                    <th className="p-3 w-10 text-center font-medium">#</th>
                    <th className="p-3 min-w-[300px] font-medium">Item</th>
                    <th className="p-3 text-right w-24 font-medium">Quantity</th>
                    <th className="p-3 text-right w-28 font-medium">Price/Unit</th>
                    <th className="p-3 text-right w-24 font-medium">Disc %</th>
                    <th className="p-3 text-right w-28 font-medium">Total</th>
                    <th className="p-3 text-right w-24 font-medium">Tax</th>
                    <th className="p-3 w-32 font-medium">Location</th>
                    <th className="p-3 w-32 text-center font-medium">Sales</th>
                    <th className="p-3 w-32 text-center font-medium">Ingredients</th>
                    <th className="p-3 w-32 text-center font-medium">Production</th>
                    <th className="p-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {notShippedItems.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-secondary/20 transition-colors group">
                      <td className="p-3 text-center text-muted-foreground text-xs">{idx + 1}</td>
                      <td className="p-3">
                        {item.name === "" ? (
                          <Popover open={openRowId === item.id} onOpenChange={(open) => !open && setOpenRowId(null)}>
                            <PopoverTrigger asChild>
                              <Input placeholder="Search or create item" className="h-8 text-xs" autoFocus />
                            </PopoverTrigger>
                            <PopoverContent className="p-0 w-[400px]" align="start">
                              <Command>
                                <CommandInput placeholder="Search item..." />
                                <CommandList>
                                  <CommandEmpty>No item found.</CommandEmpty>
                                  <CommandGroup heading="Recently created items">
                                    {MOCK_PRODUCTS.map(product => (
                                      <CommandItem
                                        key={product.name}
                                        onSelect={() => handleItemSelect(item.id, product)}
                                        className="text-xs"
                                      >
                                        <span className="truncate w-full block">{product.name}</span>
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        ) : (
                          <div className="flex justify-between items-start gap-2">
                            <TooltipProvider>
                              <Tooltip delayDuration={300}>
                                <TooltipTrigger asChild>
                                  <span
                                    className="text-primary font-medium hover:underline cursor-pointer truncate max-w-[200px] block"
                                    onClick={() => setOpenRowId(item.id)}
                                  >
                                    {item.name}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" align="start" className="max-w-[300px]">
                                  <p>{item.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <ExternalLink size={12} className="text-primary opacity-0 group-hover:opacity-50 transition-opacity shrink-0 mt-1" />
                          </div>
                        )}
                      </td>

                      {/* Editable Fields with Hidden Outline */}
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Input
                            type="number"
                            className="h-7 text-right w-20 bg-transparent border-0 p-1 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none hover:bg-secondary/10 rounded-sm font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={item.quantity}
                            onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                          />
                          <span className="text-muted-foreground text-[10px] whitespace-nowrap">pcs</span>
                        </div>
                      </td>
                      <td className="p-3 text-right text-muted-foreground">
                        <div className="flex items-center justify-end gap-1">
                          <Input
                            type="number"
                            className="h-7 text-right w-24 bg-transparent border-0 p-1 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none hover:bg-secondary/10 rounded-sm font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={item.price}
                            onChange={e => updateItem(item.id, 'price', parseFloat(e.target.value))}
                          />
                          <span className="text-[10px] whitespace-nowrap">{localOrder.currency}</span>
                        </div>
                      </td>
                      <td className="p-3 text-right text-muted-foreground">
                        <div className="flex items-center justify-end gap-1">
                          <Input
                            type="number"
                            className="h-7 text-right w-16 bg-transparent border-0 p-1 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none hover:bg-secondary/10 rounded-sm font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={item.discount}
                            onChange={e => updateItem(item.id, 'discount', parseFloat(e.target.value))}
                          />
                          <span className="text-[10px] whitespace-nowrap">%</span>
                        </div>
                      </td>
                      <td className="p-3 text-right font-medium">
                        {item.total.toFixed(2)} <span className="text-[10px] text-muted-foreground">{localOrder.currency}</span>
                      </td>
                      <td className="p-3 text-right text-muted-foreground text-xs">{item.tax}</td>
                      <td className="p-3 text-muted-foreground text-xs">
                        <Select
                          value={item.location}
                          onValueChange={(val) => updateItem(item.id, 'location', val)}
                        >
                          <SelectTrigger className="h-7 border-transparent hover:border-input bg-transparent p-1 text-xs w-full">
                            <SelectValue placeholder="Location" />
                          </SelectTrigger>
                          <SelectContent>
                            {LOCATIONS.map(loc => (
                              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>

                      {/* Status Badges */}
                      <td className="p-3">
                        <StatusBadge status={item.status.sales} className="w-full" />
                      </td>
                      <td className="p-3">
                        <StatusBadge status={item.status.ingredients} className="w-full" />
                      </td>
                      <td className="p-3">
                        {item.status.production === 'Done' ? (
                          <div className="bg-secondary/50 text-muted-foreground border border-border/30 px-2 py-0.5 rounded text-center text-[11px] font-medium flex items-center justify-center gap-1 cursor-pointer hover:bg-secondary transition-colors">
                            Done <ChevronRight size={10} />
                          </div>
                        ) : (
                          <div className="cursor-pointer flex items-center gap-1 justify-center">
                            <StatusBadge status={item.status.production} className="w-full" />
                            {item.status.production !== 'Not applicable' && (
                              <ChevronRight size={10} className="opacity-50" />
                            )}
                          </div>
                        )}
                      </td>

                      {/* Row Actions */}
                      <td className="p-3 text-center">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="p-1 border border-primary/20 rounded-sm text-primary hover:bg-primary/5 transition-colors">
                              <Plus size={12} />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-32 p-1" align="end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <div className="px-2 py-1.5 text-sm hover:bg-secondary/50 rounded-sm cursor-pointer flex items-center gap-2">
                                  <Plus size={12} /> Attribute
                                </div>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Add Attribute</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                  <Label>Value</Label>
                                  <Input
                                    placeholder="e.g. Engraving text"
                                    value={attributeValue}
                                    onChange={(e) => setAttributeValue(e.target.value)}
                                  />
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild><Button>Save</Button></DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <Separator className="my-1" />
                            <div
                              className="px-2 py-1.5 text-sm hover:bg-red-50 text-red-600 rounded-sm cursor-pointer flex items-center gap-2"
                              onClick={() => handleDeleteRow(item.id)}
                            >
                              <Trash2 size={12} /> Delete
                            </div>
                          </PopoverContent>
                        </Popover>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-background border-t border-border">
                    <td colSpan={2} className="p-3">
                      <button
                        className="text-primary font-medium text-xs hover:underline flex items-center gap-1"
                        onClick={handleAddRow}
                      >
                        + Add row
                      </button>
                    </td>
                    <td colSpan={9} className="p-3 text-right text-xs font-medium text-foreground">
                      Total items not shipped (with tax): <span className="ml-4">{localOrder.total_amount.toFixed(2)} {localOrder.currency}</span>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Delivered Items (Conditional) */}
          {deliveredItems.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-1">
                <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-status-green" />
                  Delivered items
                </h2>
              </div>
              <div className="bg-background rounded-lg border border-border overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-secondary/10 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                      <th className="p-3 w-10 text-center font-medium">#</th>
                      <th className="p-3 min-w-[300px] font-medium">Item</th>
                      <th className="p-3 text-right w-24 font-medium">Quantity</th>
                      <th className="p-3 text-right w-28 font-medium">Price/Unit</th>
                      <th className="p-3 text-right w-24 font-medium">Disc %</th>
                      <th className="p-3 text-right w-28 font-medium">Total</th>
                      <th className="p-3 text-right w-24 font-medium">Tax</th>
                      <th className="p-3 w-32 font-medium">Location</th>
                      <th className="p-3 w-32 text-center font-medium">Production</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {deliveredItems.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-secondary/5 transition-colors">
                        <td className="p-3 text-center text-muted-foreground text-xs">{idx + 1}</td>
                        <td className="p-3">
                          <span className="text-foreground font-medium">{item.name}</span>
                        </td>
                        <td className="p-3 text-right text-muted-foreground">{item.quantity} pcs</td>
                        <td className="p-3 text-right text-muted-foreground">{item.price} {localOrder.currency}</td>
                        <td className="p-3 text-right text-muted-foreground">{item.discount}%</td>
                        <td className="p-3 text-right font-medium">{item.total.toFixed(2)} {localOrder.currency}</td>
                        <td className="p-3 text-right text-muted-foreground text-xs">{item.tax}</td>
                        <td className="p-3 text-muted-foreground text-xs">{item.location}</td>
                        <td className="p-3">
                          <div className="bg-secondary/50 text-muted-foreground border border-border/30 px-2 py-0.5 rounded text-center text-[11px] font-medium flex items-center justify-center gap-1">
                            Done <CheckCircle2 size={10} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* --- Shipping Fee --- */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2 px-1">
            Shipping fee
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Info size={14} className="text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-secondary text-foreground border-border">
                  <p className="text-xs">It's important to understand that this part, the shipment or the carrier is being assigned only when the shop of an actual Shopify order is being fulfilled.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          <div className="bg-background rounded-lg border border-border overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background border-b border-border text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                  <th className="py-2 px-4 w-full pl-6">Description</th>
                  <th className="py-2 px-4 w-32 text-right">Cost</th>
                  <th className="py-2 px-4 w-32 text-right">Tax</th>
                  <th className="py-2 px-4 w-16"></th>
                </tr>
              </thead>
              <tbody>
                {shippingFeeRows.length > 0 ? (
                  shippingFeeRows.map(row => (
                    <tr key={row.id} className="border-b border-border text-sm">
                      <td className="p-2 pl-4">
                        <input
                          value={row.description}
                          onChange={(e) => {
                            const newRows = shippingFeeRows.map(r => r.id === row.id ? { ...r, description: e.target.value } : r);
                            setShippingFeeRows(newRows);
                            simulateSave();
                          }}
                          className="w-full bg-transparent border border-transparent hover:border-border rounded px-3 py-1.5 outline-none focus:bg-background focus:border-primary transition-all placeholder:text-muted-foreground/50"
                        />
                      </td>
                      <td className="p-2 text-right text-muted-foreground">
                        <div className="flex items-center justify-end gap-1">
                          <Input
                            type="number"
                            value={row.cost}
                            onChange={(e) => {
                              const newRows = shippingFeeRows.map(r => r.id === row.id ? { ...r, cost: parseFloat(e.target.value) || 0 } : r);
                              setShippingFeeRows(newRows);
                              simulateSave();
                            }}
                            className="h-7 text-right w-24 bg-transparent border-0 p-1 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none hover:bg-secondary/10 rounded-sm font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-[10px] whitespace-nowrap">{localOrder.currency}</span>
                        </div>
                      </td>
                      <td className="p-2 text-right text-muted-foreground">{row.tax}</td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => {
                            setShippingFeeRows(shippingFeeRows.filter(r => r.id !== row.id));
                            simulateSave();
                          }}
                          className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b border-border text-sm">
                    <td className="p-2 pl-4">
                      <input
                        placeholder="Add description"
                        className="w-full bg-secondary/10 border border-transparent hover:border-border rounded px-3 py-1.5 outline-none focus:bg-background focus:border-primary transition-all placeholder:text-muted-foreground/50"
                        onFocus={() => {
                          setShippingFeeRows([{ id: Math.random().toString(), description: '', cost: 0, tax: '-' }]);
                          simulateSave();
                        }}
                      />
                    </td>
                    <td className="p-2 text-right text-muted-foreground">0.00 <span className="text-[10px]">{localOrder.currency}</span></td>
                    <td className="p-2 text-right text-muted-foreground">-</td>
                    <td className="p-2 text-center">
                      <button className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-md transition-all">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-secondary/5">
                  <td colSpan={4} className="p-3 text-right text-xs text-muted-foreground">
                    Total shipping fee (with tax): <span className="ml-4 font-medium text-foreground">{shippingTotal.toFixed(2)} {localOrder.currency}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* --- Totals --- */}
        <div className="flex justify-end mt-8">
          <div className="w-96 bg-background rounded-lg border border-border p-6 space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Total units:</span>
              <span>{localOrder.items.reduce((acc, item) => acc + item.quantity, 0)} pcs</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal (tax excluded):</span>
              <span>{(itemsTotal * 0.95).toFixed(2)} {localOrder.currency}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping fee (tax excluded):</span>
              <span>{shippingTotal.toFixed(2)} {localOrder.currency}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground border-b border-border pb-4">
              <span>Plus tax:</span>
              <span>{(itemsTotal * 0.05).toFixed(2)} {localOrder.currency}</span>
            </div>
            <div className="flex justify-between text-lg font-normal text-foreground pt-2">
              <span>Total:</span>
              <span className="font-medium">{finalTotal.toFixed(2)} {localOrder.currency}</span>
            </div>

            {/* Currency Conversion Display */}
            {localOrder.currency !== 'CAD' && (
              <>
                <div className="flex justify-between text-xs text-muted-foreground mt-2 pt-2 border-t border-border border-dashed">
                  <span>Currency rate:</span>
                  <span>{EXCHANGE_RATE}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-foreground">
                  <span>Converted total (CAD):</span>
                  <span>{(finalTotal * EXCHANGE_RATE).toFixed(2)} CAD</span>
                </div>
              </>
            )}

            {/* Total Delivered Display */}
            {deliveredItems.length > 0 && (
              <div className="flex justify-between text-sm text-status-green mt-4 pt-4 border-t border-border">
                <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Total delivered (with tax):</span>
                <span className="font-medium">{totalDelivered.toFixed(2)} {localOrder.currency}</span>
              </div>
            )}
          </div>
        </div>

        {/* --- Additional Info (Rich Text) --- */}
        <div className="mt-8 border border-border rounded-lg bg-background overflow-hidden">
          <div className="px-4 py-2 bg-secondary/5 border-b border-border flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>Additional info</span>
            <Info size={12} />
          </div>
          <div className="px-2 py-1.5 border-b border-border flex items-center gap-1 bg-secondary/5">
            <Button variant="ghost" size="icon" className="h-7 w-7" onMouseDown={(e) => e.preventDefault()} onClick={() => insertMarkdown('**')}><Bold size={14} /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onMouseDown={(e) => e.preventDefault()} onClick={() => insertMarkdown('*')}><Italic size={14} /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onMouseDown={(e) => e.preventDefault()} onClick={() => insertMarkdown('__')}><Underline size={14} /></Button>
            <div className="w-[1px] h-4 bg-border mx-1"></div>
            <Button variant="ghost" size="icon" className="h-7 w-7" onMouseDown={(e) => e.preventDefault()} onClick={() => insertMarkdown('[', '](url)')}><LinkIcon size={14} /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onMouseDown={(e) => e.preventDefault()} onClick={() => insertMarkdown('- ', '')}><List size={14} /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onMouseDown={(e) => e.preventDefault()} onClick={() => insertMarkdown('1. ', '')}><ListOrdered size={14} /></Button>
          </div>
          <Textarea
            ref={textareaRef}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            onKeyDown={handleTextareaKeyDown}
            placeholder="Type comment here"
            className="min-h-[100px] border-0 focus-visible:ring-0 rounded-none resize-y p-4 font-mono text-sm"
          />
        </div>

      </main>

      {/* --- Address Edit Dialog (Updated Layout) --- */}
      <Dialog open={!!editingAddressType} onOpenChange={(open) => !open && setEditingAddressType(null)}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none  bg-transparent">
          <div className="bg-background rounded-xl border border-border flex flex-col h-full max-h-[85vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <DialogTitle className="text-lg font-medium tracking-tight">{editingAddressType === 'billing' ? 'Billing' : 'Shipping'} Address</DialogTitle>
            </div>

            <div className="p-6 overflow-y-auto space-y-8">
              {/* Contact Section */}
              <section className="space-y-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Information</h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">First name</Label>
                      <Input className="h-9" value={addressForm.firstName} onChange={e => setAddressForm({ ...addressForm, firstName: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Last name</Label>
                      <Input className="h-9" value={addressForm.lastName} onChange={e => setAddressForm({ ...addressForm, lastName: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Company</Label>
                    <Input className="h-9" value={addressForm.company} onChange={e => setAddressForm({ ...addressForm, company: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Phone number</Label>
                    <div className="relative">
                      <Input className="h-9 pl-8" value={addressForm.phone} onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })} />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">📞</span>
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Address Section */}
              <section className="space-y-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</h3>
                <div className="grid gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Street address</Label>
                    <Input className="h-9" value={addressForm.street} onChange={e => setAddressForm({ ...addressForm, street: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Apartment, suite, etc.</Label>
                    <Input className="h-9" value={addressForm.details} onChange={e => setAddressForm({ ...addressForm, details: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">City</Label>
                      <Input className="h-9" value={addressForm.city} onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">State / Province</Label>
                      <Input className="h-9" value={addressForm.state} onChange={e => setAddressForm({ ...addressForm, state: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Zip / Postal code</Label>
                      <Input className="h-9" value={addressForm.zip} onChange={e => setAddressForm({ ...addressForm, zip: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Country</Label>
                      <Input className="h-9" value={addressForm.country} onChange={e => setAddressForm({ ...addressForm, country: e.target.value })} />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="p-4 border-t border-border flex justify-between items-center">
              <Button variant="ghost" className="text-red-600 h-8 text-xs hover:bg-red-50 hover:text-red-700" onClick={() => setEditingAddressType(null)}>Remove address</Button>
              <div className="flex gap-2">
                <Button variant="outline" className="h-8 text-xs" onClick={() => setEditingAddressType(null)}>Cancel</Button>
                <Button className="h-8 text-xs" onClick={saveAddress}>Save Changes</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
