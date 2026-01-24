'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Printer,
  MoreVertical,
  X,
  ChevronDown,
  User,
  Plus,
  Trash2,
  Info,
  ExternalLink,
  Link as LinkIcon,
  GripVertical,
  CheckCircle,
  Circle,
  RefreshCw,
  ShoppingCart,
  Hammer,
  Check,
  Bug,
  Search,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';
import { ManufacturingOrderDetails, fetchManufacturingOrder, fetchKatanaInventoryList, KatanaInventoryItem, fetchStockMovements } from '@/lib/katana-data-provider';
import { supabase } from '@/lib/supabaseClient';
import { StatusDropdown, moStatusOptions } from '@/components/ui/StatusDropdown';
import { SearchableSelect } from '@/components/ui/SearchableSelect';
import { DatePicker } from '@/components/ui/DatePicker';
import { InlineEdit } from '@/components/ui/InlineEdit';

import { Package, Factory } from 'lucide-react';
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
import { DeleteConfirmDialog } from '@/components/ui/DeleteConfirmDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ManufacturingOrderDetailProps {
  initialOrder: ManufacturingOrderDetails;
}

// Full list of operators from the organization
const OPERATORS_LIST = [
  'Natalia', 'Khrystyna', 'Danee', 'Erik', 'Lisa',
  'Lilia', 'Alina', 'Solene', 'Holly', 'Victoria',
  'Olena', 'Anastasia', 'Daria', 'Luan'
];

// Default operation options for dropdown
const DEFAULT_OPERATION_OPTIONS = [
  'PREPARATION', 'COOKING', 'ASSEMBLY', 'LABELLING', 'PACKAGING',
  'COOK AND FILL', 'LAYING JARS', 'CLOSING JARS', 'LABELLING JARS',
  'LAYING TUBES', 'CLOSING TUBES', 'SHIP FOR AMAZON', 'FOLD BOXES',
  'BOXING JARS', 'STORING', 'PREPARING FOR PRODUCTION', 'COOKING AND FILLING',
  'PREPPING, COOKING AND FILLING', 'CLOSING AND STORING JARS',
];

// Default resource options for dropdown
const DEFAULT_RESOURCE_OPTIONS = [
  'KITCHEN', 'PREPARATION ZONE', 'POURING ISLAND',
  'LABELLING ZONE', 'ASSEMBLY ZONE', 'PACKAGING ZONE',
];

interface ConfirmDialogState {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  actionLabel?: string;
}

// Helper: Parse comma-separated operators string to array
const parseOperators = (operatorString: string | null | undefined): string[] => {
  if (!operatorString) return [];
  return operatorString.split(',').map(s => s.trim()).filter(Boolean);
};

// Helper: Serialize array of operators to comma-separated string
const serializeOperators = (operators: string[]): string => {
  return operators.join(',');
};

// Helper: Safely format numbers for database (prevents NUMERIC overflow)
// PostgreSQL NUMERIC(12,4) can store up to 99,999,999.9999
const safeNumber = (value: any, maxValue: number = 99999999, decimals: number = 4): number => {
  if (value === null || value === undefined || value === '') return 0;

  let num = typeof value === 'number' ? value : parseFloat(String(value));

  if (isNaN(num) || !isFinite(num)) return 0;

  // Clamp to max value to prevent overflow
  if (num > maxValue) {
    console.warn(`[safeNumber] Clamping ${num} to max ${maxValue}`);
    num = maxValue;
  }
  if (num < -maxValue) {
    console.warn(`[safeNumber] Clamping ${num} to min ${-maxValue}`);
    num = -maxValue;
  }

  // Round to specified decimals
  return Number(num.toFixed(decimals));
};

// Helper: Validate time values (max 1 year in seconds)
const MAX_TIME_SECONDS = 365 * 24 * 60 * 60; // ~31.5 million
const safeTimeSeconds = (value: any): number => {
  const num = parseInt(String(value)) || 0;
  if (num > MAX_TIME_SECONDS) {
    console.warn(`[safeTimeSeconds] Time ${num} exceeds max, clamping to ${MAX_TIME_SECONDS}`);
    return MAX_TIME_SECONDS;
  }
  return Math.max(0, num);
};

// Operation types for cost calculation
type OperationType = 'Process' | 'Setup' | 'Per unit' | 'Fixed cost';

// Operation type options for dropdown
const OPERATION_TYPE_OPTIONS = [
  { value: 'Process', label: 'Process' },
  { value: 'Setup', label: 'Setup' },
  { value: 'Per unit', label: 'Per unit' },
  { value: 'Fixed cost', label: 'Fixed cost' },
];

/**
 * Calculate operation cost based on type
 * - Process: time × quantity × cost_per_hour (time is per unit)
 * - Setup: time × cost_per_hour (not multiplied by quantity)
 * - Per unit: quantity × cost_per_unit
 * - Fixed cost: fixed_cost (constant amount)
 */
const calculateOperationCostByType = (
  op: any,
  moQuantity: number = 1,
  useActual: boolean = false
): number => {
  const type: OperationType = op.type || 'Process';

  // Time in hours (convert from seconds)
  const plannedTimeHours = (op.planned_time_seconds || 0) / 3600;
  const actualTimeHours = (op.actual_time_seconds || 0) / 3600;
  const timeHours = useActual && actualTimeHours > 0 ? actualTimeHours : plannedTimeHours;

  // Quantity
  const quantity = moQuantity;

  // Cost parameters
  const costPerHour = op.cost_per_hour || 0;
  const costPerUnit = op.cost_per_unit || 0;
  const fixedCost = op.fixed_cost || 0;

  let cost = 0;

  switch (type) {
    case 'Process':
      // Process: time × quantity × cost_per_hour
      cost = timeHours * quantity * costPerHour;
      break;

    case 'Setup':
      // Setup: time × cost_per_hour (not multiplied by quantity)
      cost = timeHours * costPerHour;
      break;

    case 'Per unit':
      // Per unit: quantity × cost_per_unit
      cost = quantity * costPerUnit;
      break;

    case 'Fixed cost':
      // Fixed cost: always the fixed amount
      cost = fixedCost;
      break;

    default:
      // Default to simple time × rate calculation
      cost = timeHours * costPerHour;
  }

  return safeNumber(cost);
};

// Legacy helper for simple cost calculation (backwards compatibility)
const calculateOperationCost = (costPerHour: number, durationSeconds: number): number => {
  if (!costPerHour || !durationSeconds) return 0;
  return safeNumber((costPerHour / 3600) * durationSeconds);
};

// Helper: Format seconds as time display (e.g. 1 h 0 m)
const formatTimeDisplay = (seconds: number): string => {
  if (!seconds || seconds === 0) return '0 m';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  const parts = [];
  if (hrs > 0) parts.push(`${hrs} h`);
  if (mins > 0 || hrs === 0) parts.push(`${mins} m`);

  return parts.join(' ');
};

// Helper: Format date for Done date display (YYYY-MM-DD hh:mm AM/PM)
const formatDoneDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const hh = String(hours).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');

  return `${y}-${m}-${d} ${hh}:${mm} ${ampm}`;
};

// Operation status options with neon effect styling
// Values must match database check constraint (lowercase with underscores)
const OPERATION_STATUS_OPTIONS = [
  { value: 'not_started', label: 'Not started', buttonStyle: 'bg-[#262624] text-[#9a9a94] border-[#4a4a48] shadow-[0_0_6px_rgba(154,154,148,0.15)] hover:shadow-[0_0_10px_rgba(154,154,148,0.25)]', dotStyle: 'bg-[#7a7974] shadow-[0_0_4px_rgba(122,121,116,0.5)]' },
  { value: 'blocked', label: 'Blocked', buttonStyle: 'bg-[#2e1a1a] text-[#ff7b6f] border-[#ff7b6f]/50 shadow-[0_0_8px_rgba(255,123,111,0.3)] hover:shadow-[0_0_12px_rgba(255,123,111,0.4)]', dotStyle: 'bg-[#ff7b6f] shadow-[0_0_6px_rgba(255,123,111,0.8)]' },
  { value: 'work_in_progress', label: 'In progress', buttonStyle: 'bg-[#2e2a1a] text-[#bb8b5d] border-[#bb8b5d]/50 shadow-[0_0_8px_rgba(187,139,93,0.3)] hover:shadow-[0_0_12px_rgba(187,139,93,0.4)]', dotStyle: 'bg-[#bb8b5d] shadow-[0_0_6px_rgba(187,139,93,0.8)]' },
  { value: 'partially_complete', label: 'Partially complete', buttonStyle: 'bg-[#2e2a1a] text-[#bb8b5d] border-[#bb8b5d]/50 shadow-[0_0_8px_rgba(187,139,93,0.3)] hover:shadow-[0_0_12px_rgba(187,139,93,0.4)]', dotStyle: 'bg-[#bb8b5d] shadow-[0_0_6px_rgba(187,139,93,0.8)]' },
  { value: 'done', label: 'Completed', buttonStyle: 'bg-[#1a2e1a] text-[#8aaf6e] border-[#8aaf6e]/50 shadow-[0_0_8px_rgba(138,175,110,0.3)] hover:shadow-[0_0_12px_rgba(138,175,110,0.4)]', dotStyle: 'bg-[#8aaf6e] shadow-[0_0_6px_rgba(138,175,110,0.8)]' },
];

// Component: Operation Status Dropdown with neon effect
const OperationStatusDropdown = ({
  status,
  onStatusChange
}: {
  status: string;
  onStatusChange: (newStatus: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  // Normalize status to match option values (handle both "Work in progress" and "work_in_progress" formats)
  const normalizedStatus = status?.toLowerCase().replace(/ /g, '_');
  const currentStatus = OPERATION_STATUS_OPTIONS.find(
    opt => opt.value === normalizedStatus
  ) || OPERATION_STATUS_OPTIONS[0];

  const handleOpen = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = 280;
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropdownStyle({
          bottom: viewportHeight - rect.top + 4,
          left: rect.left,
          maxHeight: Math.min(dropdownHeight, spaceAbove - 20)
        });
      } else {
        setDropdownStyle({
          top: rect.bottom + 4,
          left: rect.left,
          maxHeight: Math.min(dropdownHeight, spaceBelow - 20)
        });
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex justify-center" ref={containerRef}>
      <button
        onClick={handleOpen}
        className={cn(
          "px-2.5 py-1 rounded-md text-[11px] font-medium border inline-flex items-center gap-2 transition-all",
          currentStatus.buttonStyle,
          isOpen && "ring-1 ring-white/20"
        )}
      >
        <span className={cn("w-2 h-2 rounded-full", currentStatus.dotStyle)} />
        <span>{currentStatus.label}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
          <div
            className="fixed bg-[#1e1e1e] border border-[#3a3a38] rounded-md shadow-2xl z-[9999] w-[180px] flex flex-col py-1"
            style={dropdownStyle}
          >
            {/* Header */}
            <div className="px-3 py-1.5 text-gray-400 text-[11px] uppercase tracking-wider font-medium">
              Status
            </div>
            <div className="h-px bg-[#3a3a38] mx-1 mb-1"></div>
            {/* Options List */}
            <div className="py-1">
              {OPERATION_STATUS_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    onStatusChange(option.value);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-[#2a2a28] transition-colors text-white text-xs"
                >
                  <span className={cn("w-2 h-2 rounded-full", option.dotStyle)} />
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Component: Time Picker Popup - Shows "Planned / Actual" format, only Planned is editable via popup
interface TimePickerPopupProps {
  plannedSeconds: number;
  actualSeconds?: number;
  onPlannedChange: (seconds: number) => void;
  onActualChange?: (seconds: number) => void; // Kept for compatibility but not used in popup
}

const TimePickerPopup: React.FC<TimePickerPopupProps> = ({
  plannedSeconds,
  actualSeconds = 0,
  onPlannedChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempHours, setTempHours] = useState(0);
  const [tempMinutes, setTempMinutes] = useState(0);
  const [tempSeconds, setTempSeconds] = useState(0);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});

  // Format time for display like Katana: "12 h 50 m" or "7 h 4 m 25 s"
  const formatTimeKatana = (secs: number): string => {
    if (secs === 0) return '0 m';
    if (!secs) return '0 m';
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;

    const parts = [];
    if (h > 0) parts.push(`${h} h`);
    if (m > 0 || h > 0) parts.push(`${m} m`);
    if (s > 0) parts.push(`${s} s`);

    return parts.length > 0 ? parts.join(' ') : '0 m';
  };

  // Initialize temp values when popup opens (always for Planned time)
  const handleOpen = () => {
    const hrs = Math.floor((plannedSeconds || 0) / 3600);
    const mins = Math.floor(((plannedSeconds || 0) % 3600) / 60);
    const secs = (plannedSeconds || 0) % 60;
    setTempHours(hrs);
    setTempMinutes(mins);
    setTempSeconds(secs);

    // Position the popup
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popupHeight = 140;
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;

      if (spaceBelow < popupHeight && rect.top > spaceBelow) {
        setPopupStyle({
          bottom: viewportHeight - rect.top + 4,
          left: rect.left,
        });
      } else {
        setPopupStyle({
          top: rect.bottom + 4,
          left: rect.left,
        });
      }
    }
    setIsOpen(true);
  };

  const handleSave = () => {
    const totalSeconds = (tempHours * 3600) + (tempMinutes * 60) + tempSeconds;
    if (totalSeconds !== plannedSeconds) {
      onPlannedChange(safeTimeSeconds(totalSeconds));
    }
  };

  const handleSaveAndClose = () => {
    handleSave();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Trigger Button - shows "Planned / Actual" like Katana, clicking opens popup for Planned only */}
      <button
        ref={triggerRef}
        onClick={handleOpen}
        className="flex items-center gap-1 text-[11px] transition-all group hover:bg-secondary/50 px-2 py-1 rounded-md border border-transparent hover:border-[#3a3a38]/50 text-[#faf9f5] cursor-pointer"
      >
        {/* Planned time (editable via popup) */}
        <span className="text-foreground font-medium whitespace-nowrap">
          {formatTimeKatana(plannedSeconds)}
        </span>
        {/* Separator */}
        <span className="text-muted-foreground/40 mx-0.5">/</span>
        {/* Actual time (read-only, system-recorded) */}
        <span className="text-muted-foreground whitespace-nowrap">
          {formatTimeKatana(actualSeconds)}
        </span>
      </button>

      {/* Popup - for editing Planned time only */}
      {isOpen && (
        <>
          {/* Backdrop - saves on click away */}
          <div className="fixed inset-0 z-[9998]" onClick={handleSaveAndClose} />

          {/* Popup Content */}
          <div
            className="fixed bg-[#1f1f1d] border border-[#3a3a38] rounded-lg shadow-2xl z-[9999] p-4 min-w-[220px]"
            style={popupStyle}
          >
            {/* Header - No tabs, just title */}
            <div className="text-[10px] font-medium uppercase tracking-wider text-[#7a7974] mb-3">
              Edit Planned Time
            </div>

            {/* Time Inputs */}
            <div className="flex items-center gap-1 justify-center">
              {/* Hours */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-[#7a7974] mb-1 font-normal">hrs</span>
                <Input
                  type="number"
                  min="0"
                  max="999"
                  value={tempHours}
                  onChange={(e) => setTempHours(Math.max(0, parseInt(e.target.value) || 0))}
                  onBlur={handleSave}
                  onFocus={(e) => e.target.select()}
                  className="w-12 h-9 bg-[#1a1a18] text-[#faf9f5] text-center text-sm border-[#3a3a38] focus-visible:ring-1 focus-visible:ring-[#d97757] focus:border-[#d97757] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  autoFocus
                />
              </div>

              <span className="text-[#7a7974] text-base mt-4 font-light">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-[#7a7974] mb-1 font-normal">min</span>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  value={tempMinutes}
                  onChange={(e) => setTempMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                  onBlur={handleSave}
                  onFocus={(e) => e.target.select()}
                  className="w-12 h-9 bg-[#1a1a18] text-[#faf9f5] text-center text-sm border-[#3a3a38] focus-visible:ring-1 focus-visible:ring-[#d97757] focus:border-[#d97757] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <span className="text-[#7a7974] text-base mt-4 font-light">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-[#7a7974] mb-1 font-normal">sec</span>
                <Input
                  type="number"
                  min="0"
                  max="59"
                  value={tempSeconds}
                  onChange={(e) => setTempSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                  onBlur={handleSave}
                  onFocus={(e) => e.target.select()}
                  className="w-12 h-9 bg-[#1a1a18] text-[#faf9f5] text-center text-sm border-[#3a3a38] focus-visible:ring-1 focus-visible:ring-[#d97757] focus:border-[#d97757] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Component: Quantity Picker Popup (Planned / Actual)
const QuantityPickerPopup = ({
  planned,
  actual,
  uom,
  onChange,
  onActualChange
}: {
  planned: number;
  actual: number;
  uom?: string;
  onChange: (val: number) => void;
  onActualChange?: (val: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState<'planned' | 'actual'>('planned');
  const [tempValue, setTempValue] = useState<number>(0);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});

  const handleOpen = (mode: 'planned' | 'actual' = 'planned') => {
    const val = mode === 'planned' ? planned : actual;
    setTempValue(val || 0);
    setEditMode(mode);

    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popupHeight = 160;
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;

      if (spaceBelow < popupHeight && rect.top > spaceBelow) {
        setPopupStyle({
          bottom: viewportHeight - rect.top + 4,
          left: rect.left,
        });
      } else {
        setPopupStyle({
          top: rect.bottom + 4,
          left: rect.left,
        });
      }
    }
    setIsOpen(true);
  };

  const handleSaveOnly = () => {
    const currentVal = editMode === 'planned' ? planned : actual;
    if (tempValue !== currentVal) {
      if (editMode === 'planned') {
        onChange(tempValue);
      } else if (onActualChange) {
        onActualChange(tempValue);
      }
    }
  };

  const handleSaveAndClose = () => {
    handleSaveOnly();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        ref={triggerRef}
        className="flex items-center justify-end gap-1.5 text-[11px] font-mono transition-all group hover:bg-secondary/30 px-2 py-1 rounded border border-transparent hover:border-[#3a3a38]/30 text-[#faf9f5] w-fit ml-auto cursor-pointer"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpen('planned');
          }}
          className="text-white font-bold whitespace-nowrap hover:text-primary transition-colors"
        >
          {planned || 0}
        </button>
        <span className="text-muted-foreground/30 font-light">/</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpen('actual');
          }}
          className={cn(
            "whitespace-nowrap hover:text-primary transition-colors",
            actual === 0 ? "text-muted-foreground/40" : (actual === planned ? "text-white" : "text-muted-foreground/80")
          )}
        >
          {actual || 0}
        </button>
        <span className="text-muted-foreground/60 text-[10px] ml-0.5">{uom || 'pcs'}</span>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={handleSaveAndClose} />
          <div
            className="fixed bg-[#1f1f1d] border border-[#3a3a38] rounded-lg shadow-2xl z-[9999] p-5 min-w-[220px]"
            style={popupStyle}
          >
            <div className="flex gap-4 mb-6 border-b border-border/30 pb-2">
              <button
                onClick={() => handleOpen('planned')}
                className={cn(
                  "text-[10px] font-medium uppercase tracking-wider pb-1 transition-colors",
                  editMode === 'planned' ? "text-primary border-b border-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                PLANNED QTY
              </button>
              <button
                onClick={() => handleOpen('actual')}
                className={cn(
                  "text-[10px] font-medium uppercase tracking-wider pb-1 transition-colors",
                  editMode === 'actual' ? "text-primary border-b border-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                ACTUAL QTY
              </button>
            </div>

            <div className="flex flex-col items-start gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={tempValue}
                  onChange={(e) => setTempValue(parseFloat(e.target.value) || 0)}
                  onBlur={handleSaveOnly}
                  onFocus={(e) => e.target.select()}
                  className="w-32 h-9 bg-[#1a1a18] text-[#faf9f5] text-left px-3 text-sm border-[#3a3a38] rounded-md focus-visible:ring-1 focus-visible:ring-[#d97757] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  autoFocus
                />
                <span className="text-muted-foreground text-xs">{uom || 'pcs'}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};


// Component: Operator Multi-Select
const OperatorMultiSelect = ({
  operationId,
  selectedOperators,
  onUpdate
}: {
  operationId: string;
  selectedOperators: string[];
  onUpdate: (operators: string[]) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const handleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 300;
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      // If not enough space below, open upward
      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropdownStyle({
          bottom: viewportHeight - rect.top + 4,
          left: rect.left,
          maxHeight: Math.min(dropdownHeight, spaceAbove - 20)
        });
      } else {
        setDropdownStyle({
          top: rect.bottom + 4,
          left: rect.left,
          maxHeight: Math.min(dropdownHeight, spaceBelow - 20)
        });
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleOpen}
        className="w-full min-h-[28px] text-xs px-2 py-1 bg-transparent border border-[#3a3a38]/50 rounded-md focus:ring-0 shadow-none flex items-center justify-start text-left"
      >
        {selectedOperators.length === 0 ? (
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            <User size={12} className="opacity-50" />
            Unassigned
          </span>
        ) : (
          <div className="flex flex-wrap gap-1">
            {selectedOperators.map(op => (
              <span
                key={op}
                className="bg-[#4a4a48] text-gray-200 px-2.5 py-0.5 rounded text-[11px] font-medium"
              >
                {op}
              </span>
            ))}
          </div>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
          <div
            className="fixed bg-[#1f1f1d] border border-[#3a3a38] rounded-lg shadow-2xl z-[9999] w-[200px] flex flex-col"
            style={dropdownStyle}
          >
            {/* Header */}
            <div className="px-3 py-2 text-xs text-gray-400 border-b border-[#3a3a38]">
              Select operators
            </div>
            {/* Options List */}
            <div className="flex-1 overflow-y-auto py-1">
              {OPERATORS_LIST.map(name => {
                const isChecked = selectedOperators.includes(name);
                return (
                  <label
                    key={name}
                    className="flex items-center gap-2 px-4 py-1.5 hover:bg-gray-700/50 cursor-pointer text-sm text-white transition"
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked
                        ? 'bg-[#a5d6ff] border-[#a5d6ff]'
                        : 'bg-transparent border-[#3a3a38]'
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        const newSelection = isChecked
                          ? selectedOperators.filter(o => o !== name)
                          : [...selectedOperators, name];
                        onUpdate(newSelection);
                      }}
                    >
                      {isChecked && (
                        <Check size={12} className="text-black" />
                      )}
                    </div>
                    <span>{name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export function ManufacturingOrderDetail({ initialOrder }: ManufacturingOrderDetailProps) {
  const [order, setOrder] = useState<ManufacturingOrderDetails>(initialOrder);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    open: false,
    title: '',
    description: '',
    onConfirm: () => { }
  });
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [operations, setOperations] = useState<any[]>([]);
  const [availableVariants, setAvailableVariants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [targetBatch, setTargetBatch] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ id: string; type: 'operation' | 'ingredient' } | null>(null);

  // Draft / New MO State
  const isNew = initialOrder.id === 'new';
  const [productOptions, setProductOptions] = useState<any[]>([]);

  // Load products for dropdown if new
  useEffect(() => {
    if (isNew) {
      import('@/lib/katana-actions').then(({ searchKatanaItems }) => {
        searchKatanaItems('', 'product').then(setProductOptions);
      });
    }
  }, [isNew]);

  const handleProductSelect = async (variantId: string) => {
    if (!variantId) return;
    setIsLoading(true);

    try {
      // Delegate to loadProductDataForMO which handles MO creation in create mode
      await loadProductDataForMO(variantId, false);
    } catch (err) {
      console.error('Failed to create MO:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // State for ingredient stock levels (variant_id -> stock info including expected)
  const [ingredientStockLevels, setIngredientStockLevels] = useState<Record<string, {
    inStock: number;
    expected: number;
    committed: number;
    averageCost: number;
  }>>({});

  // State for batch tracking expand/collapse
  const [expandedIngredients, setExpandedIngredients] = useState<Set<string>>(new Set());

  // State for batch tracking modal
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [selectedIngredientForBatch, setSelectedIngredientForBatch] = useState<any>(null);
  const [batchAssignments, setBatchAssignments] = useState<any[]>([]);
  const [availableBatches, setAvailableBatches] = useState<any[]>([]);
  const [isLoadingBatches, setIsLoadingBatches] = useState(false);

  // State for active operator picker dropdown
  const [activeOperatorPicker, setActiveOperatorPicker] = useState<string | null>(null);

  // State for operation and resource dropdowns
  const [operationOptions, setOperationOptions] = useState<string[]>(DEFAULT_OPERATION_OPTIONS);
  const [resourceOptions, setResourceOptions] = useState<string[]>(DEFAULT_RESOURCE_OPTIONS);
  const [activeOperationPicker, setActiveOperationPicker] = useState<string | null>(null);
  const [activeResourcePicker, setActiveResourcePicker] = useState<string | null>(null);
  const [operationSearchQuery, setOperationSearchQuery] = useState('');
  const [resourceSearchQuery, setResourceSearchQuery] = useState('');
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  // Helper to open dropdown at correct position with viewport boundary detection
  const openDropdownAtButton = (e: React.MouseEvent<HTMLButtonElement>, setActive: (id: string | null) => void, currentActive: string | null, opId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dropdownHeight = 350;
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    // If not enough space below, open upward
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      setDropdownStyle({
        bottom: viewportHeight - rect.top + 4,
        left: rect.left,
        maxHeight: Math.min(dropdownHeight, spaceAbove - 20)
      });
    } else {
      setDropdownStyle({
        top: rect.bottom + 4,
        left: rect.left,
        maxHeight: Math.min(dropdownHeight, spaceBelow - 20)
      });
    }
    setActive(currentActive === opId ? null : opId);
  };

  // Close operator picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeOperatorPicker) {
        const target = event.target as HTMLElement;
        if (!target.closest('.operator-picker-container')) {
          setActiveOperatorPicker(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeOperatorPicker]);

  const router = useRouter();
  const [products, setProducts] = useState<{ id: string; name: string; sku?: string }[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // State for calculated costs
  const [calculatedCosts, setCalculatedCosts] = useState({
    ingredientsCost: 0,
    operationsCost: 0,
    totalCost: 0,
  });

  // State for Buy Modal
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyIngredient, setBuyIngredient] = useState<any>(null);
  const [buyModalData, setBuyModalData] = useState({
    quantity: 0,
    purchaseUnitQty: 0,
    poNumber: '',
    expectedArrival: '',
    supplierName: '',
    supplierId: null as string | null,
    addMissingItems: false,
    conversionRate: 1,
    purchaseUom: '',
    locationName: 'MMH Kelowna',
    locationId: null as string | null,
  });

  // State for additional info rich text
  const [additionalInfo, setAdditionalInfo] = useState((initialOrder as any)?.additional_info || '');

  // Load products (actually variants with item names)
  useEffect(() => {
    const loadProducts = async () => {
      console.log('[DEBUG] Loading variants for product dropdown...');
      setProductsLoading(true);

      const { data, error } = await supabase
        .from('variants')
        .select(`
          id,
          sku,
          item:items (
            id,
            name,
            type
          )
        `)
        .order('sku');

      if (error) {
        console.error('[DEBUG] Failed to load variants:', error.message || error);
      } else if (data) {
        console.log('[DEBUG] Raw variants data:', data);

        // Filter to only products and map to the format SearchableSelect expects
        const productOptions = data
          .filter((v: any) => v.item?.type === 'product')
          .map((variant: any) => ({
            id: variant.id,  // THIS MUST BE variants.id, not items.id!
            name: variant.item?.name || 'Unknown Product',
            sku: variant.sku || undefined
          }));

        console.log('[DEBUG] Product options for dropdown (variant IDs):', productOptions);
        console.log('[DEBUG] Total variants loaded:', data.length, '| Products only:', productOptions.length);
        setProducts(productOptions);
      }

      setProductsLoading(false);
    };

    loadProducts();

    // Temporary: Check actual table schemas
    const debugSchemas = async () => {
      console.log('🔍 DEBUG: Inspecting table schemas...');

      // Check variants columns
      const { data: variantSample } = await supabase
        .from('variants')
        .select('*')
        .limit(1);
      console.log('📋 Variants columns:', variantSample && variantSample[0] ? Object.keys(variantSample[0]) : 'none/empty');

      // Check manufacturing_order_operations columns
      const { data: mooSample } = await supabase
        .from('manufacturing_order_operations')
        .select('*')
        .limit(1);
      console.log('📋 MO Operations columns:', mooSample && mooSample[0] ? Object.keys(mooSample[0]) : 'none/empty');
    };

    debugSchemas();
  }, []);



  // Load ingredients and operations
  useEffect(() => {
    const loadData = async () => {
      // ===== CRITICAL: Exit early for create mode =====
      if (!order.id || order.id === 'new' || isNew) {
        console.log('[loadData] Skipping - create mode or no ID');
        setIngredients([]);
        setOperations([]);
        return;
      }
      // ===== END CRITICAL SECTION =====

      const { data: ingredientsData, error: ingredientsError } = await supabase
        .from('manufacturing_order_rows')
        .select(`
          id,
          manufacturing_order_id,
          variant_id,
          planned_quantity,
          actual_quantity,
          cost_per_unit,
          notes,
          variant:variants (
            id,
            sku,
            item:items (
              id,
              name
            )
          )
        `)
        .eq('manufacturing_order_id', order.id);

      if (ingredientsData) {
        setIngredients(ingredientsData);
      } else if (ingredientsError) {
        console.error('Failed to load ingredients:', ingredientsError);
      }

      const { data: operationsData, error: operationsError } = await supabase
        .from('manufacturing_order_operations')
        .select('*')
        .eq('manufacturing_order_id', order.id)
        .order('step_number', { ascending: true });

      if (operationsError) {
        console.error('Failed to load operations:', JSON.stringify(operationsError, null, 2));
        console.error('Error details:', operationsError?.message, operationsError?.code, operationsError?.details);
      } else {
        setOperations(operationsData || []);
      }
    };

    loadData();
  }, [order.id, isNew]);

  // Calculate costs when ingredients, operations, or stock levels change
  useEffect(() => {
    // Helper to get ingredient unit cost with proper fallback chain
    const getUnitCost = (ing: any): number => {
      const stockInfo = ingredientStockLevels[ing.variant_id];
      if (stockInfo?.averageCost && stockInfo.averageCost > 0) {
        return stockInfo.averageCost;
      }
      if (ing.variant?.purchase_price && ing.variant.purchase_price > 0) {
        return Number(ing.variant.purchase_price);
      }
      if (ing.variant?.item?.default_purchase_price && ing.variant.item.default_purchase_price > 0) {
        return Number(ing.variant.item.default_purchase_price);
      }
      return ing.cost_per_unit || 0;
    };

    // Ingredients cost: SUM(qty × unit_cost) per ingredient
    const ingredientsCost = ingredients.reduce((sum, ing) => {
      const qty = ing.actual_quantity || ing.planned_quantity || 0;
      const unitCost = getUnitCost(ing);
      return sum + (qty * unitCost);
    }, 0);

    // Operations cost: Use type-based cost calculation for each operation
    const moQuantity = order.plannedQuantity || 1;
    const operationsCost = operations.reduce((sum, op) => {
      const useActual = op.status?.toLowerCase() === 'done';
      return sum + calculateOperationCostByType(op, moQuantity, useActual);
    }, 0);

    setCalculatedCosts({
      ingredientsCost,
      operationsCost,
      totalCost: ingredientsCost + operationsCost,
    });
  }, [ingredients, operations, ingredientStockLevels]);

  // Helper to get ingredient unit cost with proper fallback chain:
  // 1. average_cost from inventory (most accurate, reflects FIFO/LIFO)
  // 2. purchase_price from variant
  // 3. default_purchase_price from item
  const getIngredientUnitCost = (ing: any): number => {
    const stockInfo = ingredientStockLevels[ing.variant_id];
    if (stockInfo?.averageCost && stockInfo.averageCost > 0) {
      return stockInfo.averageCost;
    }
    if (ing.variant?.purchase_price && ing.variant.purchase_price > 0) {
      return Number(ing.variant.purchase_price);
    }
    if (ing.variant?.item?.default_purchase_price && ing.variant.item.default_purchase_price > 0) {
      return Number(ing.variant.item.default_purchase_price);
    }
    // Fallback to stored cost_per_unit if available
    return ing.cost_per_unit || 0;
  };

  // Calculate ingredient totals with proper cost fallback
  const ingredientTotals = useMemo(() => {
    return ingredients.reduce((acc, ing) => {
      const qty = ing.planned_quantity || 0;
      const actualQty = ing.actual_quantity || 0;
      const unitCost = getIngredientUnitCost(ing);
      // Use actual qty if available (MO done), otherwise planned qty
      const costQty = actualQty > 0 ? actualQty : qty;
      return {
        plannedQty: acc.plannedQty + qty,
        actualQty: acc.actualQty + actualQty,
        cost: acc.cost + (costQty * unitCost),
      };
    }, { plannedQty: 0, actualQty: 0, cost: 0 });
  }, [ingredients, ingredientStockLevels]);

  // Calculate operation totals using type-based cost formulas
  const operationTotals = useMemo(() => {
    const moQuantity = order.plannedQuantity || 1;
    return operations.reduce((acc, op) => {
      const plannedSeconds = op.planned_time_seconds || 0;
      const actualSeconds = op.actual_time_seconds || 0;
      // Use type-based cost calculation
      const useActual = op.status?.toLowerCase() === 'done';
      const operationCost = calculateOperationCostByType(op, moQuantity, useActual);
      return {
        plannedTime: acc.plannedTime + plannedSeconds,
        actualTime: acc.actualTime + actualSeconds,
        cost: acc.cost + operationCost,
      };
    }, { plannedTime: 0, actualTime: 0, cost: 0 });
  }, [operations, order.plannedQuantity]);

  // Fetch stock levels for all ingredients when ingredients change
  useEffect(() => {
    const fetchStockLevels = async () => {
      const variantIds = ingredients
        .filter(ing => ing.variant_id)
        .map(ing => ing.variant_id);

      if (variantIds.length === 0) return;

      const { data, error } = await supabase
        .from('inventory')
        .select('variant_id, quantity_in_stock, quantity_expected, quantity_committed, average_cost')
        .in('variant_id', variantIds);

      if (!error && data) {
        const stockMap: Record<string, { inStock: number; expected: number; committed: number; averageCost: number }> = {};
        data.forEach((row: any) => {
          stockMap[row.variant_id] = {
            inStock: Number(row.quantity_in_stock || 0),
            expected: Number(row.quantity_expected || 0),
            committed: Number(row.quantity_committed || 0),
            averageCost: Number(row.average_cost || 0),
          };
        });
        setIngredientStockLevels(stockMap);
      }
    };

    fetchStockLevels();
  }, [ingredients]);

  // Create new product (creates both item and variant)
  const handleCreateProduct = async (name: string): Promise<string | null> => {
    try {
      // Prompt user for SKU instead of auto-generating
      const sku = window.prompt(`Enter SKU for new product "${name}":`, '');

      if (!sku || !sku.trim()) {
        showToast('SKU is required to create a product', 'error');
        return null;
      }

      const itemId = crypto.randomUUID();
      const variantId = crypto.randomUUID();

      // Step 1: Create the item (product)
      const { error: itemError } = await supabase
        .from('items')
        .insert({
          id: itemId,
          name: name,
          sku: sku.trim(),
          type: 'product',
          is_purchasable: true,
          is_saleable: true,
          is_producible: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (itemError) {
        console.error('Failed to create item:', itemError);
        showToast('Failed to create product', 'error');
        return null;
      }

      // Step 2: Create a variant for this item
      const { error: variantError } = await supabase
        .from('variants')
        .insert({
          id: variantId,
          item_id: itemId,
          sku: sku.trim(),
        });

      if (variantError) {
        console.error('Failed to create variant:', variantError);
        showToast('Failed to create product variant', 'error');
        // Optionally: delete the item we just created
        return null;
      }

      // Add to local products list (using variant ID!)
      setProducts(prev => [...prev, {
        id: variantId,  // Important: use variant ID
        name: name,
        sku: sku.trim()
      }]);

      showToast('Product created successfully', 'success');
      console.log('[DEBUG] Created new product. Returning variant_id:', variantId);
      return variantId;  // Return variant ID, not item ID
    } catch (err) {
      console.error('Error creating product:', err);
      showToast('Error creating product', 'error');
      return null;
    }
  };

  // Load BOM (recipes) for a product variant
  const loadBOMForProduct = async (productVariantId: string) => {
    console.log('🔍 Loading BOM for:', {
      variantId: productVariantId,
      moId: order.id,
      table: 'recipes'
    });

    const { data, error } = await supabase
      .from('recipes')
      .select(`
        id,
        ingredient_variant_id,
        quantity,
        wastage_percentage,
        notes,
        ingredient_variant:variants!ingredient_variant_id (
          id,
          sku,
          item:items (
            id,
            name
          )
        )
      `)
      .eq('product_variant_id', productVariantId);

    console.log('🔍 BOM query result:', {
      data: data,
      dataLength: data?.length,
      error: error ? JSON.stringify(error) : null
    });

    if (error) {
      console.error('❌ Failed to load BOM:', JSON.stringify(error, null, 2));
      console.error('❌ Error message:', error.message);
      console.error('❌ Error code:', error.code);
      console.error('❌ Error details:', error.details);
      console.error('❌ Error hint:', error.hint);
      return [];
    }

    return data || [];
  };

  // Populate ingredients from BOM
  const populateIngredientsFromBOM = async (bom: any[], moId?: string) => {
    const targetMoId = moId || order.id;

    // Guard against invalid ID
    if (!targetMoId || targetMoId === 'new') {
      console.error('❌ Cannot populate ingredients: invalid MO ID');
      return;
    }

    console.log('📝 Populating ingredients from BOM:', {
      bomLength: bom.length,
      moId: targetMoId,
      plannedQty: order.plannedQuantity
    });

    // Delete existing ingredients first
    if (ingredients.length > 0) {
      console.log('🗑️ Deleting existing ingredients...');
      const { error: deleteError } = await supabase
        .from('manufacturing_order_rows')
        .delete()
        .eq('manufacturing_order_id', targetMoId);

      if (deleteError) {
        console.error('❌ Failed to delete existing ingredients:', JSON.stringify(deleteError, null, 2));
      }
    }

    // Create new ingredient rows from BOM
    const newIngredients = bom.map(recipe => ({
      id: crypto.randomUUID(),
      manufacturing_order_id: targetMoId,
      variant_id: recipe.ingredient_variant_id,
      planned_quantity: safeNumber((recipe.quantity || 0) * (order.plannedQuantity || 1)),
      actual_quantity: safeNumber(0),
      cost_per_unit: safeNumber(0),
      notes: recipe.notes || '',
    }));

    console.log('📝 Inserting ingredients into table: manufacturing_order_rows');
    console.log('📝 Ingredients to insert:', newIngredients);

    const { data: inserted, error } = await supabase
      .from('manufacturing_order_rows')
      .insert(newIngredients)
      .select();

    console.log('📝 Insert result:', {
      data: inserted,
      dataLength: inserted?.length,
      error: error ? JSON.stringify(error) : null
    });

    if (error) {
      console.error('❌ Failed to populate ingredients:', JSON.stringify(error, null, 2));
      console.error('❌ Error message:', error.message);
      console.error('❌ Error code:', error.code);
      console.error('❌ Error details:', error.details);
      console.error('❌ Error hint:', error.hint);
      showToast('Failed to load ingredients from BOM', 'error');
    } else {
      showToast(`Loaded ${bom.length} ingredients from BOM`, 'success');
      // Reload ingredients to refresh the table
      await loadIngredientsData();
    }
  };

  // Reload ingredients from database
  const loadIngredientsData = async () => {
    const { data: ingredientsData, error: ingredientsError } = await supabase
      .from('manufacturing_order_rows')
      .select(`
        id,
        manufacturing_order_id,
        variant_id,
        planned_quantity,
        actual_quantity,
        cost_per_unit,
        notes,
        variant:variants (
          id,
          sku,
          item:items (
            id,
            name,
            type
          )
        )
      `)
      .eq('manufacturing_order_id', order.id);

    if (ingredientsData) {
      setIngredients(ingredientsData);
    } else if (ingredientsError) {
      console.error('Failed to load ingredients:', ingredientsError);
    }
  };

  // Reload operations from database
  const loadOperationsData = async () => {
    const { data: operationsData, error: operationsError } = await supabase
      .from('manufacturing_order_operations')
      .select('*')
      .eq('manufacturing_order_id', order.id)
      .order('step_number', { ascending: true });

    if (operationsData) {
      setOperations(operationsData);
    } else if (operationsError) {
      console.error('Failed to load operations:', operationsError);
    }
  };

  // Load product operations (template) for a product variant
  const loadProductOperationsTemplate = async (productVariantId: string) => {
    console.log('🔍 Loading operations for:', {
      variantId: productVariantId,
      moId: order.id,
      table: 'product_operations'
    });

    const { data, error } = await supabase
      .from('product_operations')
      .select('*')
      .eq('product_variant_id', productVariantId)
      .order('step_number', { ascending: true });

    console.log('🔍 Operations query result:', {
      data: data,
      dataLength: data?.length,
      error: error ? JSON.stringify(error) : null
    });

    if (error) {
      console.error('❌ Failed to load product operations:', JSON.stringify(error, null, 2));
      console.error('❌ Error message:', error.message);
      console.error('❌ Error code:', error.code);
      console.error('❌ Error details:', error.details);
      console.error('❌ Error hint:', error.hint);
      return [];
    }

    console.log('✅ Product operations loaded:', data?.length || 0);
    return data || [];
  };

  // Populate MO operations from product operations template
  const populateOperationsFromProduct = async (productOps: any[], moId?: string) => {
    const targetMoId = moId || order.id;

    // Guard against invalid ID
    if (!targetMoId || targetMoId === 'new') {
      console.error('❌ Cannot populate operations: invalid MO ID');
      return;
    }

    console.log('📝 Populating MO operations:', {
      productOpsLength: productOps.length,
      moId: targetMoId,
      plannedQty: order.plannedQuantity
    });

    // Delete existing operations first
    if (operations.length > 0) {
      console.log('🗑️ Deleting existing operations...');
      const { error: deleteError } = await supabase
        .from('manufacturing_order_operations')
        .delete()
        .eq('manufacturing_order_id', targetMoId);

      if (deleteError) {
        console.error('❌ Failed to delete existing operations:', JSON.stringify(deleteError, null, 2));
      }
    }

    // Create new MO operation rows from product operations template
    const newOperations = productOps.map((op, index) => ({
      id: crypto.randomUUID(),
      manufacturing_order_id: targetMoId,
      operation_name: op.operation_name || 'Unnamed Operation',
      resource: op.resource || '',
      planned_time_seconds: safeTimeSeconds((op.duration_seconds || 0) * (order.plannedQuantity || 1)),
      actual_time_seconds: safeTimeSeconds(0),
      cost_per_hour: safeNumber(op.cost_per_hour || 0),
      actual_cost: safeNumber(0),
      status: 'NOT_STARTED',
      operator_name: 'Unassigned',
      step_number: op.step_number || (index + 1) * 10,
    }));

    if (newOperations.length === 0) {
      console.log('⚠️ No operations to insert');
      return;
    }

    console.log('📝 Inserting operations into table: manufacturing_order_operations');
    console.log('📝 Operations to insert:', newOperations);

    const { data: inserted, error } = await supabase
      .from('manufacturing_order_operations')
      .insert(newOperations)
      .select();

    console.log('📝 Operations insert result:', {
      data: inserted,
      dataLength: inserted?.length,
      error: error ? JSON.stringify(error) : null
    });

    if (error) {
      console.error('❌ Failed to populate operations:', JSON.stringify(error, null, 2));
      console.error('❌ Error message:', error.message);
      console.error('❌ Error code:', error.code);
      console.error('❌ Error details:', error.details);
      console.error('❌ Error hint:', error.hint);
      showToast('Failed to load operations from product', 'error');
    } else {
      showToast(`Loaded ${productOps.length} operations from product`, 'success');
      // Reload operations to refresh the table
      await loadOperationsData();
    }
  };

  // Combined function to load both BOM and Operations for a product
  const loadProductDataForMO = async (variantId: string, askConfirmation: boolean = true) => {
    console.log('[DEBUG] Loading product data for MO, variant_id:', variantId);

    let moId = order.id;

    // ===== CRITICAL: Create MO first if in create mode =====
    if (order.id === 'new' || isNew) {
      console.log('[loadProductDataForMO] Create mode - creating MO first');

      // Generate MO number
      const { data: lastMO } = await supabase
        .from('manufacturing_orders')
        .select('order_no')
        .order('created_at', { ascending: false })
        .limit(1);

      let moNumber = 'MO-001';
      if (lastMO?.[0]?.order_no) {
        const match = lastMO[0].order_no.match(/MO-(\d+)/);
        if (match) {
          moNumber = `MO-${String(parseInt(match[1]) + 1).padStart(3, '0')}`;
        }
      }

      // Create the MO record
      const { data: newMO, error: createError } = await supabase
        .from('manufacturing_orders')
        .insert({
          order_no: moNumber,
          variant_id: variantId,
          planned_quantity: order.plannedQuantity || 1,
          actual_quantity: 0,
          status: 'NOT_STARTED',
          total_cost: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select('id, order_no')
        .single();

      if (createError || !newMO) {
        console.error('❌ Failed to create MO:', createError);
        showToast('Failed to create Manufacturing Order', 'error');
        return;
      }

      console.log('✅ Created MO:', newMO.id, newMO.order_no);
      moId = newMO.id; // Use the REAL UUID now

      // Update local state with real ID
      setOrder(prev => ({
        ...prev,
        id: newMO.id,
        orderNo: newMO.order_no,
        variant_id: variantId
      }));
    }
    // ===== END CREATE MODE SECTION =====

    // Load BOM and Operations in parallel
    const [bom, productOps] = await Promise.all([
      loadBOMForProduct(variantId),
      loadProductOperationsTemplate(variantId)
    ]);

    console.log('[DEBUG] Loaded BOM:', bom.length, 'ingredients, Operations:', productOps.length);

    // Populate both ingredients and operations with the REAL moId
    if (bom.length > 0) {
      await populateIngredientsFromBOM(bom, moId);
    }

    if (productOps.length > 0) {
      await populateOperationsFromProduct(productOps, moId);
    }

    if (bom.length === 0 && productOps.length === 0) {
      showToast('No BOM or operations found for this product', 'info');
    }

    // If we created a new MO, navigate to its real URL
    if ((order.id === 'new' || isNew) && moId !== 'new') {
      router.replace(`/make/${moId}`);
    }
  };

  const handleUpdate = async (updates: any) => {
    // Log what we're trying to update
    console.log('[DEBUG] ========== UPDATE START ==========');
    console.log('[DEBUG] Order ID:', order?.id);
    console.log('[DEBUG] Updates to apply:', JSON.stringify(updates, null, 2));

    if (!order?.id) {
      console.error('[DEBUG] No order ID available!');
      return;
    }

    // Sanitize numeric fields to prevent overflow
    const numericFields = ['planned_quantity', 'actual_quantity', 'total_cost'];
    const safeUpdates = { ...updates };
    for (const field of numericFields) {
      if (field in safeUpdates && typeof safeUpdates[field] === 'number') {
        safeUpdates[field] = safeNumber(safeUpdates[field]);
      }
    }

    // Optimistic update - apply all updates to local state
    setOrder(prev => {
      const next = { ...prev };
      if (updates.variant_id) {
        next.variant_id = updates.variant_id;
        // Find the product name from the variant_id
        const product = products.find(p => p.id === updates.variant_id);
        if (product) {
          next.productName = product.name;
          next.productSku = product.sku || '';
        }
      }
      // Map other fields if needed
      return next;
    });

    // For new/draft orders, do not save to database yet
    if (isNew) return;

    try {
      const { data, error, status, statusText } = await supabase
        .from('manufacturing_orders')
        .update(safeUpdates)
        .eq('id', order.id)
        .select();  // Add .select() to get the response back

      console.log('[DEBUG] Response status:', status, statusText);
      console.log('[DEBUG] Response data:', data);
      console.log('[DEBUG] Response error:', error);
      console.log('[DEBUG] Error stringified:', JSON.stringify(error));

      if (error) {
        console.error('[DEBUG] Update failed!');
        console.error('[DEBUG] Error code:', error.code);
        console.error('[DEBUG] Error message:', error.message);
        console.error('[DEBUG] Error details:', error.details);
        console.error('[DEBUG] Error hint:', error.hint);
        showToast('Failed to update', 'error');
      } else if (data && data.length > 0) {
        console.log('[DEBUG] Update successful! Updated row:', data[0]);
        showToast('Updated successfully', 'success');
      } else {
        console.warn('[DEBUG] No rows updated - check if ID exists');
        showToast('No changes made', 'warning');
      }

    } catch (err) {
      console.error('[DEBUG] Exception caught:', err);
      showToast('Failed to update', 'error');
    }

    console.log('[DEBUG] ========== UPDATE END ==========');
  };

  // Save additional info to database
  const handleSaveAdditionalInfo = async () => {
    if (!order?.id) return;
    await supabase
      .from('manufacturing_orders')
      .update({
        additional_info: additionalInfo,
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id);
  };

  const { showToast } = useToast();

  const orderId = order.id;

  // Track rows that are being added but not yet saved (because they need a variant_id)
  const [newIngredientId, setNewIngredientId] = useState<string | null>(null);
  const [newOperationId, setNewOperationId] = useState<string | null>(null);

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  // Inventory Intel Modal State (matches items page design)
  const [showInventoryIntel, setShowInventoryIntel] = useState(false);
  const [selectedIngredientForIntel, setSelectedIngredientForIntel] = useState<{
    variantId: string;
    itemId?: string;
    sku: string;
    name: string;
    uom?: string;
  } | null>(null);
  const [loadingInventoryIntel, setLoadingInventoryIntel] = useState(false);
  const [inventoryIntelData, setInventoryIntelData] = useState<{
    inStock: number;
    expected: number;
    committed: number;
    safetyStock: number;
    calculatedStock: number;
    averageCost: number;
    uom: string;
    movements: Array<{
      id: string;
      date: string;
      type: string;
      change: number;
      price: number;
      balance: number;
      value: number;
      avgCost: number;
      isAlert?: boolean;
    }>;
  } | null>(null);
  const [intelTab, setIntelTab] = useState<'movements' | 'expected' | 'committed'>('movements');
  const [expectedData, setExpectedData] = useState<Array<{
    id: string;
    poNumber: string;
    expectedDate: string;
    quantity: number;
    received: number;
    remaining: number;
  }>>([]);
  const [committedData, setCommittedData] = useState<Array<{
    id: string;
    moNumber: string;
    productName: string;
    quantity: number;
    status: string;
  }>>([]);
  const [ingredientCanBuy, setIngredientCanBuy] = useState(false);
  const [ingredientCanMake, setIngredientCanMake] = useState(false);



  // Status helpers
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'done': return 'bg-[var(--status-success-bg)] text-[var(--status-success)] border-[var(--status-success)]/20';
      case 'work_in_progress':
      case 'work in progress': return 'bg-[var(--status-warning-bg)] text-[var(--status-warning)] border-[var(--status-warning)]/20';
      case 'blocked': return 'bg-[var(--status-error-bg)] text-[var(--status-error)] border-[var(--status-error)]/20';
      default: return 'bg-secondary/50 text-muted-foreground border-border';
    }
  };

  // Load data on mount - SKIP if in create mode (id='new')
  useEffect(() => {
    // Skip database queries for new/draft MOs to avoid UUID error
    if (isNew || orderId === 'new') {
      console.log('[ManufacturingOrderDetail] Create mode - skipping database load');
      setIngredients([]);
      setOperations([]);
      return;
    }

    const loadIngredients = async () => {
      const { data, error } = await supabase
        .from('manufacturing_order_rows')
        .select(`
          *,
          variant:variants (
            id,
            sku,
            item:items (
              name,
              uom,
              in_stock,
              is_batch_tracked
            )
          ),
          batches:manufacturing_order_ingredient_batches (
            id,
            batch_number,
            batch_barcode,
            quantity,
            expiration_date
          )
        `)
        .eq('manufacturing_order_id', orderId)
        .order('created_at', { ascending: true });

      if (!error && data) {
        // Add is_batch_tracked from variant to ingredient for easier access
        const ingredientsWithBatchFlag = data.map(ing => ({
          ...ing,
          is_batch_tracked: ing.variant?.item?.is_batch_tracked || false
        }));
        setIngredients(ingredientsWithBatchFlag);
      }
    };

    const loadOperations = async () => {
      const { data, error } = await supabase
        .from('manufacturing_order_operations')
        .select('*')
        .eq('manufacturing_order_id', orderId)
        .order('step_number', { ascending: true });

      if (!error && data) {
        setOperations(data);
      }
    };

    const loadVariants = async () => {
      const { data } = await supabase
        .from('variants')
        .select(`
          id,
          sku,
          item:items (
            name,
            uom
          )
        `)
        .order('sku');

      if (data) setAvailableVariants(data);
    };

    loadIngredients();
    loadOperations();
    loadVariants();
  }, [orderId, isNew]);

  const handleAddIngredient = () => {
    // Add local-only row first
    const tempId = `temp-${crypto.randomUUID()}`;
    const newRow = {
      id: tempId,
      manufacturing_order_id: orderId,
      variant_id: null,
      planned_quantity: 0,
      actual_quantity: 0,
      cost_per_unit: 0,
      notes: '',
      is_new: true,
    };

    setIngredients(prev => [...prev, newRow]);
    setNewIngredientId(tempId);
  };

  const handleSaveIngredient = async (tempId: string, variantId: string) => {
    const tempRow = ingredients.find(i => i.id === tempId);
    if (!tempRow) return;

    const variant = availableVariants.find(v => v.id === variantId);
    const newId = crypto.randomUUID();

    const newRow = {
      id: newId,
      manufacturing_order_id: orderId,
      variant_id: variantId,
      planned_quantity: safeNumber(tempRow.planned_quantity || 0),
      actual_quantity: safeNumber(tempRow.actual_quantity || 0),
      cost_per_unit: safeNumber(tempRow.cost_per_unit || 0),
      notes: tempRow.notes || '',
    };

    // Update UI with real row (including nested variant data for display)
    setIngredients(prev => prev.map(ing =>
      ing.id === tempId ? { ...newRow, variant: variant } : ing
    ));
    setNewIngredientId(null);

    const { error } = await supabase
      .from('manufacturing_order_rows')
      .insert(newRow);

    if (error) {
      console.error('Failed to save ingredient:', error);
      setIngredients(prev => prev.filter(i => i.id !== newId));
      showToast('Failed to add ingredient', 'error');
    }
  };

  const handleUpdateIngredient = async (rowId: string, updates: any) => {
    // Sanitize numeric fields to prevent overflow
    const numericFields = ['planned_quantity', 'actual_quantity', 'cost_per_unit', 'total_cost'];
    const safeUpdates = { ...updates };
    for (const field of numericFields) {
      if (field in safeUpdates && typeof safeUpdates[field] === 'number') {
        safeUpdates[field] = safeNumber(safeUpdates[field]);
      }
    }

    // If it's a new unsaved row, just update local state
    if (rowId.startsWith('temp-')) {
      setIngredients(prev => prev.map(ing =>
        ing.id === rowId ? { ...ing, ...safeUpdates } : ing
      ));
      return;
    }

    setIngredients(prev => prev.map(ing =>
      ing.id === rowId ? { ...ing, ...safeUpdates } : ing
    ));

    const { error } = await supabase
      .from('manufacturing_order_rows')
      .update(safeUpdates)
      .eq('id', rowId);

    if (error) {
      console.error('Failed to update ingredient:', JSON.stringify(error, null, 2));
      showToast('Failed to save changes', 'error');
    }
  };

  const handleDeleteIngredient = (rowId: string) => {
    if (rowId.startsWith('temp-')) {
      setIngredients(prev => prev.filter(ing => ing.id !== rowId));
      setNewIngredientId(null);
      return;
    }
    setShowDeleteConfirm({ id: rowId, type: 'ingredient' });
  };

  // ===== BATCH TRACKING FUNCTIONS =====

  // Load available batches for an ingredient's variant
  const loadAvailableBatches = async (variantId: string) => {
    setIsLoadingBatches(true);

    // Get batches from inventory that have stock
    const { data, error } = await supabase
      .from('inventory_batches')
      .select(`
        id,
        batch_number,
        barcode,
        quantity_available,
        expiration_date,
        created_at
      `)
      .eq('variant_id', variantId)
      .gt('quantity_available', 0)
      .order('expiration_date', { ascending: true }); // FIFO by expiration

    if (error) {
      console.error('Failed to load batches:', error);
      setAvailableBatches([]);
    } else {
      setAvailableBatches(data || []);
    }

    setIsLoadingBatches(false);
  };

  // Load existing batch assignments for an ingredient
  const loadBatchAssignments = async (moIngredientId: string) => {
    const { data, error } = await supabase
      .from('manufacturing_order_ingredient_batches')
      .select('*')
      .eq('mo_ingredient_id', moIngredientId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Failed to load batch assignments:', error);
      setBatchAssignments([]);
    } else {
      setBatchAssignments(data || []);
    }
  };

  // Open batch modal for an ingredient
  const openBatchModal = async (ingredient: any) => {
    setSelectedIngredientForBatch(ingredient);
    setBatchModalOpen(true);

    // Load available batches for this ingredient's variant
    if (ingredient.variant_id) {
      await loadAvailableBatches(ingredient.variant_id);
    }

    // Load existing assignments
    if (ingredient.id && !ingredient.id.startsWith('temp-')) {
      await loadBatchAssignments(ingredient.id);
    } else {
      setBatchAssignments([]);
    }
  };

  // Add a new batch assignment row
  const addBatchAssignment = () => {
    setBatchAssignments([
      ...batchAssignments,
      {
        id: `temp-${Date.now()}`,
        mo_ingredient_id: selectedIngredientForBatch?.id,
        batch_number: '',
        batch_barcode: '',
        quantity: 0,
        expiration_date: null,
        isNew: true
      }
    ]);
  };

  // Update a batch assignment field
  const updateBatchAssignment = (index: number, field: string, value: any) => {
    const updated = [...batchAssignments];
    updated[index] = { ...updated[index], [field]: value };

    // If selecting from available batches, auto-fill other fields
    if (field === 'batch_number') {
      const selectedBatch = availableBatches.find(b => b.batch_number === value);
      if (selectedBatch) {
        updated[index].batch_barcode = selectedBatch.barcode || '';
        updated[index].expiration_date = selectedBatch.expiration_date;
        updated[index].batch_id = selectedBatch.id;
      }
    }

    setBatchAssignments(updated);
  };

  // Remove a batch assignment
  const removeBatchAssignment = (index: number) => {
    const updated = batchAssignments.filter((_, i) => i !== index);
    setBatchAssignments(updated);
  };

  // Save batch assignments to database
  const saveBatchAssignments = async () => {
    if (!selectedIngredientForBatch) return;

    const moIngredientId = selectedIngredientForBatch.id;

    // Don't save for temp ingredients
    if (moIngredientId.startsWith('temp-')) {
      showToast('Please save the ingredient first', 'error');
      return;
    }

    // Delete existing assignments
    await supabase
      .from('manufacturing_order_ingredient_batches')
      .delete()
      .eq('mo_ingredient_id', moIngredientId);

    // Insert new assignments (filter out empty ones)
    const validAssignments = batchAssignments.filter(
      b => b.batch_number && b.quantity > 0
    );

    if (validAssignments.length > 0) {
      const toInsert = validAssignments.map(b => ({
        mo_ingredient_id: moIngredientId,
        batch_id: b.batch_id || null,
        batch_number: b.batch_number,
        batch_barcode: b.batch_barcode || null,
        quantity: safeNumber(b.quantity),
        expiration_date: b.expiration_date || null
      }));

      const { error } = await supabase
        .from('manufacturing_order_ingredient_batches')
        .insert(toInsert);

      if (error) {
        console.error('Failed to save batch assignments:', error);
        showToast('Failed to save batches', 'error');
        return;
      }
    }

    // Calculate total assigned quantity
    const totalAssigned = validAssignments.reduce(
      (sum, b) => sum + (parseFloat(b.quantity) || 0), 0
    );

    // Update ingredient's actual_quantity with total assigned
    const plannedQty = selectedIngredientForBatch.planned_quantity || 0;
    const { error: updateError } = await supabase
      .from('manufacturing_order_rows')
      .update({
        actual_quantity: safeNumber(totalAssigned),
        is_picked: totalAssigned >= plannedQty
      })
      .eq('id', moIngredientId);

    if (updateError) {
      console.error('Failed to update ingredient:', updateError);
    }

    // Update local state
    setIngredients(prev => prev.map(ing =>
      ing.id === moIngredientId
        ? {
          ...ing,
          actual_quantity: totalAssigned,
          is_picked: totalAssigned >= plannedQty,
          batches: validAssignments
        }
        : ing
    ));

    showToast('Batches assigned successfully', 'success');
    setBatchModalOpen(false);
    setSelectedIngredientForBatch(null);
    setBatchAssignments([]);
  };

  // ===== END BATCH TRACKING FUNCTIONS =====

  const handleAddOperation = async () => {
    const newId = crypto.randomUUID();
    const nextStep = operations.length > 0 ? Math.max(...operations.map(op => op.step_number || 0)) + 10 : 10;

    const newOp = {
      id: newId,
      manufacturing_order_id: orderId,
      operation_name: 'New Operation',
      type: 'Process',
      resource: '',
      operator_name: 'Unassigned',
      planned_time_seconds: safeTimeSeconds(0),
      actual_time_seconds: safeTimeSeconds(0),
      cost_per_hour: safeNumber(0),
      actual_cost: safeNumber(0),
      status: 'NOT_STARTED',
      step_number: nextStep,
    };

    console.log('[DEBUG] Adding new operation with type:', newOp.type);
    setOperations(prev => [...prev, newOp]);

    const { error } = await supabase
      .from('manufacturing_order_operations')
      .insert(newOp);

    if (error) {
      console.error('Failed to add operation:', error);
      setOperations(prev => prev.filter(o => o.id !== newId));
      showToast('Failed to add operation', 'error');
    } else {
      console.log('[DEBUG] Operation added successfully');
      showToast('Operation added', 'success');
    }
  };

  const handleUpdateOperation = async (opId: string, updates: any) => {
    // Sanitize numeric fields to prevent overflow
    const numericFields = ['cost_per_hour', 'cost_per_unit', 'fixed_cost', 'calculated_cost', 'planned_time_seconds', 'actual_time_seconds'];
    const safeUpdates = { ...updates };
    for (const field of numericFields) {
      if (field in safeUpdates && typeof safeUpdates[field] === 'number') {
        safeUpdates[field] = safeNumber(safeUpdates[field]);
      }
    }

    // Get the updated operation to recalculate cost
    const currentOp = operations.find(op => op.id === opId);
    if (currentOp) {
      const mergedOp = { ...currentOp, ...safeUpdates };
      // Recalculate cost based on type when cost parameters or time changes
      if ('cost_per_hour' in updates || 'cost_per_unit' in updates || 'fixed_cost' in updates || 'type' in updates || 'planned_time_seconds' in updates || 'actual_time_seconds' in updates) {
        // Use actual time if operation is completed, otherwise use planned time
        const isCompleted = mergedOp.status?.toLowerCase() === 'done' || mergedOp.status?.toLowerCase() === 'completed';
        safeUpdates.calculated_cost = calculateOperationCostByType(mergedOp, order.plannedQuantity || 1, isCompleted);
      }
    }

    setOperations(prev => prev.map(op =>
      op.id === opId ? { ...op, ...safeUpdates } : op
    ));

    const { error } = await supabase
      .from('manufacturing_order_operations')
      .update(safeUpdates)
      .eq('id', opId);

    if (error) {
      console.error('Failed to update operation:', JSON.stringify(error, null, 2));
      showToast('Failed to save changes', 'error');
    } else {
      // Recalculate total cost after updating operation parameters
      await recalculateTotalCost();
    }
  };

  // Cycle operation status: not_started → in_progress → completed
  const cycleOperationStatus = async (opId: string, currentStatus: string) => {
    // Normalize status
    const normalizedStatus = (currentStatus || 'not_started').toLowerCase().replace(/ /g, '_');

    const statusCycle: Record<string, string> = {
      'not_started': 'in_progress',
      'in_progress': 'completed',
      'completed': 'not_started',
      'done': 'not_started',
      'work_in_progress': 'completed',
      'paused': 'in_progress',
      'blocked': 'not_started'
    };

    const nextStatus = statusCycle[normalizedStatus] || 'in_progress';

    const updates: any = { status: nextStatus };

    const operation = operations.find(op => op.id === opId);

    // If completing, auto-fill actual time and calculate cost using type-based formula
    if (nextStatus === 'completed' || nextStatus === 'done') {
      if (operation) {
        // Auto-fill actual_time_seconds from planned if not already set
        if (!operation.actual_time_seconds && operation.planned_time_seconds) {
          updates.actual_time_seconds = safeTimeSeconds(operation.planned_time_seconds);
        }

        // Calculate cost using type-based formula
        const opWithUpdates = { ...operation, ...updates };
        updates.calculated_cost = calculateOperationCostByType(opWithUpdates, order.plannedQuantity || 1, true);
      }
    }

    // Optimistic update
    setOperations(prev => prev.map(op =>
      op.id === opId ? { ...op, ...updates } : op
    ));

    const { error } = await supabase
      .from('manufacturing_order_operations')
      .update(updates)
      .eq('id', opId);

    if (error) {
      console.error('Failed to update operation status:', JSON.stringify(error, null, 2));
      showToast('Failed to update status', 'error');
    } else {
      // Recalculate total cost after status change
      await recalculateTotalCost();
    }
  };

  // Handle operation status change from dropdown (new handler for OperationStatusDropdown)
  const handleOperationStatusChange = async (opId: string, newStatus: string) => {
    console.log('[DEBUG] Changing operation status:', { opId, newStatus });

    const updates: any = { status: newStatus };

    const operation = operations.find(op => op.id === opId);

    // If completing (done), auto-fill actual time from planned time if not already set
    // and calculate cost using the type-based formula
    if (newStatus === 'done') {
      if (operation) {
        // Auto-fill actual_time_seconds from planned if not already set
        if (!operation.actual_time_seconds && operation.planned_time_seconds) {
          updates.actual_time_seconds = safeTimeSeconds(operation.planned_time_seconds);
          console.log('[DEBUG] Auto-filling actual time from planned:', updates.actual_time_seconds);
        }

        // Calculate cost using type-based formula (use actual time when completing)
        const opWithUpdates = { ...operation, ...updates };
        updates.calculated_cost = calculateOperationCostByType(opWithUpdates, order.plannedQuantity || 1, true);
        console.log('[DEBUG] Calculated cost by type:', {
          type: operation.type || 'Process',
          calculated_cost: updates.calculated_cost
        });
      }
    }

    console.log('[DEBUG] Update payload:', updates);

    // Optimistic update
    setOperations(prev => prev.map(op =>
      op.id === opId ? { ...op, ...updates } : op
    ));

    const { error } = await supabase
      .from('manufacturing_order_operations')
      .update(updates)
      .eq('id', opId);

    if (error) {
      console.error('Failed to update operation status:', JSON.stringify(error, null, 2));
      showToast('Failed to update status', 'error');
    } else {
      console.log('[DEBUG] Status updated successfully');
      // Recalculate total cost after status change
      await recalculateTotalCost();
    }
  };

  // Recalculate and save total cost to database (with overflow protection)
  const recalculateTotalCost = async () => {
    const moQuantity = order.plannedQuantity || 1;

    // Calculate ingredients cost using proper fallback chain
    const ingredientsCost = ingredients.reduce((sum, ing) => {
      const qty = ing.actual_quantity || ing.planned_quantity || 0;
      const unitCost = getIngredientUnitCost(ing);
      return sum + (qty * unitCost);
    }, 0);

    // Calculate operations cost using type-based formulas
    const operationsCost = operations.reduce((sum, op) => {
      // Use actual time for completed operations, otherwise planned
      const useActual = op.status?.toLowerCase() === 'done';
      return sum + calculateOperationCostByType(op, moQuantity, useActual);
    }, 0);

    // Use safeNumber to prevent NUMERIC overflow
    const safeIngredientsCost = safeNumber(ingredientsCost);
    const safeOperationsCost = safeNumber(operationsCost);
    const totalCost = safeNumber(ingredientsCost + operationsCost);

    console.log('[DEBUG] Recalculated costs:', {
      ingredientsCost: safeIngredientsCost,
      operationsCost: safeOperationsCost,
      totalCost
    });

    // Update MO total cost
    const { error: moError } = await supabase
      .from('manufacturing_orders')
      .update({ total_cost: totalCost })
      .eq('id', orderId);

    if (moError) {
      console.error('Failed to update MO total cost:', JSON.stringify(moError, null, 2));
    }

    // Update each ingredient's total_cost with proper cost fallback
    for (const ing of ingredients) {
      if (ing.id && !ing.id.startsWith('temp-')) {
        const qty = ing.actual_quantity || ing.planned_quantity || 0;
        const unitCost = getIngredientUnitCost(ing);
        const ingCost = safeNumber(qty * unitCost);
        await supabase
          .from('manufacturing_order_rows')
          .update({ total_cost: ingCost })
          .eq('id', ing.id);
      }
    }

    // Update each operation's calculated_cost using type-based formula
    for (const op of operations) {
      if (op.id && !op.id.startsWith('temp-')) {
        const useActual = op.status?.toLowerCase() === 'done';
        const opCost = calculateOperationCostByType(op, moQuantity, useActual);
        await supabase
          .from('manufacturing_order_operations')
          .update({ calculated_cost: opCost })
          .eq('id', op.id);
      }
    }

    // Update local state
    setCalculatedCosts({
      ingredientsCost: safeIngredientsCost,
      operationsCost: safeOperationsCost,
      totalCost,
    });
  };

  const handleDeleteOperation = (opId: string) => {
    setShowDeleteConfirm({ id: opId, type: 'operation' });
  };

  const confirmDelete = async () => {
    if (!showDeleteConfirm) return;
    const { id, type } = showDeleteConfirm;

    if (type === 'ingredient') {
      const previousIngredients = [...ingredients];
      setIngredients(prev => prev.filter(ing => ing.id !== id));
      const { error } = await supabase
        .from('manufacturing_order_rows')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Failed to delete ingredient:', error);
        setIngredients(previousIngredients);
        showToast('Failed to delete ingredient', 'error');
      }
    } else {
      const previousOps = [...operations];
      setOperations(prev => prev.filter(op => op.id !== id));
      const { error } = await supabase
        .from('manufacturing_order_operations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Failed to delete operation:', error);
        setOperations(previousOps);
        showToast('Failed to delete operation', 'error');
      }
    }
    setShowDeleteConfirm(null);
  };

  // Auto-fill actual quantities for ingredients when MO is marked as Done
  // This copies planned_quantity to actual_quantity for any ingredients that haven't been manually edited
  const autoFillIngredientActuals = async () => {
    const ingredientsToUpdate = ingredients.filter(ing =>
      !ing.actual_quantity || ing.actual_quantity === 0
    );

    if (ingredientsToUpdate.length === 0) return;

    // Update each ingredient's actual_quantity to match planned_quantity
    const updatePromises = ingredientsToUpdate.map(async (ing) => {
      const actualQty = safeNumber(ing.planned_quantity || 0);
      const stockInfo = ingredientStockLevels[ing.variant_id] || { inStock: 0, expected: 0, committed: 0, averageCost: 0 };
      const cost = safeNumber(actualQty * stockInfo.averageCost);

      const { error } = await supabase
        .from('manufacturing_order_rows')
        .update({
          actual_quantity: actualQty,
          updated_at: new Date().toISOString()
        })
        .eq('id', ing.id);

      return { id: ing.id, actualQty, cost, error };
    });

    const results = await Promise.all(updatePromises);
    const failed = results.filter(r => r.error);

    if (failed.length > 0) {
      console.error('Failed to update some ingredient actuals:', failed);
    }

    // Update local state with new actual quantities
    setIngredients(prev => prev.map(ing => {
      const result = results.find(r => r.id === ing.id);
      if (result && !result.error) {
        return { ...ing, actual_quantity: result.actualQty, calculated_cost: result.cost };
      }
      return ing;
    }));
  };

  const handleStatusChange = async (newStatus: ManufacturingOrderDetails['productionStatus']) => {
    const updates: any = {
      status: newStatus.toUpperCase(),
      updated_at: new Date().toISOString()
    };

    const normalizedStatus = newStatus.toLowerCase();
    const currentStatus = order.productionStatus?.toLowerCase();

    // If changing to "Done", set done_date and completed_at
    if (normalizedStatus === 'done') {
      updates.done_date = new Date().toISOString();
      updates.completed_at = new Date().toISOString();

      // Also set actual_quantity to planned_quantity if not set
      if (!order.completedQuantity) {
        updates.actual_quantity = order.plannedQuantity;
      }

      // Auto-fill actual quantities for ingredients (planned -> actual)
      await autoFillIngredientActuals();
    }

    // If changing to "Work in progress", set started_at if not already set
    if ((normalizedStatus === 'work in progress' || normalizedStatus === 'work_in_progress')
      && !(order as any).started_at) {
      updates.started_at = new Date().toISOString();
    }

    // If reverting from Done, clear done_date
    if (currentStatus === 'done' && normalizedStatus !== 'done') {
      updates.done_date = null;
      updates.completed_at = null;
    }

    // Optimistic update
    setOrder({
      ...order,
      productionStatus: newStatus,
      completedQuantity: updates.actual_quantity || order.completedQuantity,
      done_date: updates.done_date,
    } as any);

    const { error } = await supabase
      .from('manufacturing_orders')
      .update(updates)
      .eq('id', orderId);

    if (error) {
      console.error('Failed to update status:', error);
      showToast('Failed to update status', 'error');
    } else {
      showToast('Status updated successfully', 'success');
    }
  };

  const handleQuantityChange = (type: 'planned' | 'actual', value: string) => {
    const numValue = parseFloat(value) || 0;
    setOrder(prev => ({
      ...prev,
      [type === 'planned' ? 'plannedQuantity' : 'completedQuantity']: numValue
    }));
  };

  const handleDeadlineChange = (value: string) => {
    setOrder(prev => ({
      ...prev,
      productionDeadline: value
    }));
  };



  const handleOrderNoChange = (value: string) => {
    setOrder(prev => ({ ...prev, orderNo: value }));
  };

  // Katana-style availability function
  // Statuses: In stock, Expected, Not available, Not applicable (Buy-only), Processed (MO done)
  const getAvailability = (variantId: string, planned: number, isPicked?: boolean, ingredient?: any) => {
    const stockInfo = ingredientStockLevels[variantId] || { inStock: 0, expected: 0, committed: 0, averageCost: 0 };
    const inStock = stockInfo.inStock;
    const expected = stockInfo.expected;
    const moIsDone = order.productionStatus?.toLowerCase() === 'done';
    const itemType = ingredient?.variant?.item?.type || 'material';
    const isPurchasableOnly = itemType === 'material' && ingredient?.variant?.item?.is_purchasable && !ingredient?.variant?.item?.is_producible;

    // If MO is done, show "Processed"
    if (moIsDone) {
      return { label: 'Processed', className: 'border-[#8aaf6e]/50 text-[#8aaf6e] bg-[#8aaf6e]/20', inStock };
    }

    // If ingredient is picked, show "Picked"
    if (isPicked) {
      return { label: 'Picked', className: 'border-[#8aaf6e]/50 text-[#8aaf6e] bg-[#8aaf6e]/20', inStock };
    }

    // If planned is 0, show dash
    if (planned === 0) {
      return { label: '-', className: 'text-gray-400', inStock };
    }

    // If in stock covers planned, show "In stock"
    if (inStock >= planned) {
      return { label: 'In stock', className: 'border-[#8aaf6e]/50 text-[#8aaf6e] bg-[#8aaf6e]/20', inStock };
    }

    // If not in stock but expected qty > 0 (from open POs/MOs), show "Expected"
    if (inStock < planned && expected > 0) {
      return { label: 'Expected', className: 'border-[#a5d6ff]/50 text-[#a5d6ff] bg-[#a5d6ff]/20', inStock };
    }

    // Partial stock available
    if (inStock > 0 && inStock < planned) {
      return { label: `Partial (${inStock.toFixed(2)})`, className: 'border-[#bb8b5d]/50 text-[#bb8b5d] bg-[#bb8b5d]/20', inStock };
    }

    // Default: Not available
    return { label: 'Not available', className: 'border-[#ff7b6f]/50 text-[#ff7b6f] bg-[#ff7b6f]/10 font-bold', inStock };
  };

  // Toggle ingredient picked status
  const handleTogglePicked = async (ingredientId: string, currentlyPicked: boolean) => {
    const newPicked = !currentlyPicked;

    // Find the ingredient
    const ingredient = ingredients.find(i => i.id === ingredientId);
    if (!ingredient) return;

    const updates: any = { is_picked: newPicked };

    // If picking, set actual_qty to planned_qty
    if (newPicked) {
      updates.actual_quantity = ingredient.planned_quantity || 0;
    } else {
      updates.actual_quantity = 0;
    }

    // Optimistic update
    setIngredients(prev => prev.map(ing =>
      ing.id === ingredientId ? { ...ing, ...updates } : ing
    ));

    const { error } = await supabase
      .from('manufacturing_order_rows')
      .update(updates)
      .eq('id', ingredientId);

    if (error) {
      console.error('Failed to toggle picked status:', error);
      showToast('Failed to update picked status', 'error');
      // Revert on error
      setIngredients(prev => prev.map(ing =>
        ing.id === ingredientId ? { ...ing, is_picked: currentlyPicked } : ing
      ));
    } else {
      showToast(newPicked ? 'Ingredient marked as picked' : 'Ingredient unpicked', 'success');
    }
  };

  // Determine if ingredient should show Buy or Make based on item type
  const getIngredientAction = (ingredient: any): 'Buy' | 'Make' => {
    const itemType = ingredient.variant?.item?.type || 'material';
    return itemType === 'product' ? 'Make' : 'Buy';
  };

  // Handle Buy button - open Buy Modal
  const handleBuyIngredient = async (ingredient: any) => {
    const stockInfo = ingredientStockLevels[ingredient.variant_id] || { inStock: 0, expected: 0, committed: 0, averageCost: 0 };
    const inStock = stockInfo.inStock;
    const shortageQty = Math.max(0, (ingredient.planned_quantity || 0) - inStock);

    // Generate PO number and expected arrival
    const nextPONumber = `PO-${Date.now().toString().slice(-4)}`;
    const expectedArrival = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Load supplier info from the item's default supplier
    let supplierName = 'No supplier';
    let supplierId: string | null = null;
    let conversionRate = 1;
    let purchaseUom = ingredient.variant?.item?.uom || 'pcs';

    if (ingredient.variant?.item?.id) {
      // Get item with supplier info
      const { data: itemData } = await supabase
        .from('items')
        .select(`
          default_supplier_id,
          uom,
          supplier:suppliers (
            id,
            name
          )
        `)
        .eq('id', ingredient.variant.item.id)
        .single();

      if (itemData?.supplier) {
        supplierName = (itemData.supplier as any).name || 'No supplier';
        supplierId = (itemData.supplier as any).id || null;
      }

      // Get variant for purchase UOM info
      const { data: variantData } = await supabase
        .from('variants')
        .select('purchase_uom, purchase_uom_conversion_rate')
        .eq('id', ingredient.variant_id)
        .single();

      if (variantData) {
        conversionRate = variantData.purchase_uom_conversion_rate || 1;
        purchaseUom = variantData.purchase_uom || itemData?.uom || 'pcs';
      }
    }

    // Get first location as default
    const { data: locationData } = await supabase
      .from('locations')
      .select('id, name')
      .limit(1)
      .single();

    setBuyIngredient(ingredient);
    setBuyModalData({
      quantity: shortageQty,
      purchaseUnitQty: shortageQty / conversionRate,
      poNumber: nextPONumber,
      expectedArrival,
      supplierName,
      supplierId,
      addMissingItems: false,
      conversionRate,
      purchaseUom,
      locationName: locationData?.name || 'MMH Kelowna',
      locationId: locationData?.id || null,
    });
    setShowBuyModal(true);
  };

  // Create Purchase Order from Buy Modal
  const handleCreatePO = async (action: 'open' | 'close') => {
    if (!buyIngredient) return;

    try {
      // Create PO in database with link back to this MO
      const { data: po, error: poError } = await supabase
        .from('purchase_orders')
        .insert({
          order_no: buyModalData.poNumber,
          supplier_id: buyModalData.supplierId,
          location_id: buyModalData.locationId,
          status: 'OPEN',
          expected_arrival_date: buyModalData.expectedArrival,
          currency: 'CAD',
          source_mo_id: orderId,  // Link back to this MO for traceability
        })
        .select()
        .single();

      if (poError) {
        console.error('Failed to create PO:', poError);
        showToast('Failed to create purchase order', 'error');
        return;
      }

      if (po) {
        // Get the variant's price from inventory or default to 0
        const { data: invData } = await supabase
          .from('inventory')
          .select('average_cost')
          .eq('variant_id', buyIngredient.variant_id)
          .single();

        const pricePerUnit = safeNumber(invData?.average_cost || buyIngredient.cost_per_unit || 0);

        // Add line item
        const { error: rowError } = await supabase
          .from('purchase_order_rows')
          .insert({
            purchase_order_id: po.id,
            variant_id: buyIngredient.variant_id,
            quantity: safeNumber(buyModalData.quantity),
            price_per_unit: pricePerUnit,
            quantity_received: 0,
          });

        if (rowError) {
          console.error('Failed to add PO row:', rowError);
          showToast('PO created but failed to add item', 'warning');
        } else {
          showToast(`Purchase order ${buyModalData.poNumber} created successfully`, 'success');
        }

        setShowBuyModal(false);
        setBuyIngredient(null);

        if (action === 'open') {
          router.push(`/buy/${po.id}`);
        }
      }
    } catch (err) {
      console.error('Error creating PO:', err);
      showToast('Failed to create purchase order', 'error');
    }
  };

  // Handle Make button - navigate to create child MO
  const handleMakeIngredient = (ingredient: any) => {
    const stockInfo = ingredientStockLevels[ingredient.variant_id] || { inStock: 0, expected: 0, committed: 0, averageCost: 0 };
    const inStock = stockInfo.inStock;
    const shortageQty = Math.max(0, (ingredient.planned_quantity || 0) - inStock);
    // Navigate to Make module with pre-filled data
    router.push(`/make?variant_id=${ingredient.variant_id}&quantity=${shortageQty}&parent_mo_id=${orderId}`);
    showToast(`Creating manufacturing order for ${shortageQty} units`, 'info');
  };

  // Parse operators from database - handles both operators[] array and operator_name string
  const parseOperatorsFromOp = (op: any): string[] => {
    // First try operators array (new format)
    if (op.operators && Array.isArray(op.operators)) {
      return op.operators;
    }
    // Fall back to operator_name string (legacy format)
    if (!op.operator_name) return [];
    if (op.operator_name === 'Unassigned') return [];
    return op.operator_name.split(',').map((s: string) => s.trim()).filter(Boolean);
  };

  // Parse operators from string (comma-separated) or array (for backwards compatibility)
  const parseOperators = (operatorData: string | string[] | null): string[] => {
    if (!operatorData) return [];
    if (Array.isArray(operatorData)) return operatorData;
    if (typeof operatorData === 'string') {
      // Handle comma-separated string or single name
      if (operatorData === 'Unassigned') return [];
      return operatorData.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  };

  // Handle operator change - save to both operators[] array and operator_name string
  const handleOperatorChange = async (opId: string, selectedOperators: string[]) => {
    // Update both fields for backwards compatibility
    const updates = {
      operators: selectedOperators,
      operator_name: selectedOperators.length === 0 ? null : selectedOperators[0],
    };

    // Optimistic update
    setOperations(prev => prev.map(op =>
      op.id === opId ? { ...op, ...updates } : op
    ));

    const { error } = await supabase
      .from('manufacturing_order_operations')
      .update(updates)
      .eq('id', opId);

    if (error) {
      console.error('Failed to update operators:', error);
      showToast('Failed to save operators', 'error');
    }
  };

  // Serialize operators to string (legacy support)
  const serializeOperators = (operators: string[]): string => {
    if (operators.length === 0) return 'Unassigned';
    return operators.join(', ');
  };

  // Toggle operator in selection (legacy - kept for compatibility)
  const toggleOperator = (opId: string, operatorName: string, currentOperators: string[]) => {
    const newOperators = currentOperators.includes(operatorName)
      ? currentOperators.filter(o => o !== operatorName)
      : [...currentOperators, operatorName];
    handleOperatorChange(opId, newOperators);
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'done':
      case 'completed':
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4 text-[#8aaf6e]" />;
      case 'in_progress':
      case 'work_in_progress':
      case 'WORK_IN_PROGRESS':
        return <Circle className="w-4 h-4 text-[#bb8b5d] fill-[#bb8b5d]" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatTime = (seconds: number): string => {
    if (!seconds || seconds === 0) return '0s';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
    return parts.join(' ');
  };

  // Load Inventory Intel for an ingredient (matches items page)
  const loadInventoryIntel = async (ing: any) => {
    const variantId = ing.variant_id;
    if (!variantId) return;

    setSelectedIngredientForIntel({
      variantId,
      itemId: ing.variant?.item?.id,
      sku: ing.variant?.sku || ing.sku || '',
      name: ing.variant?.item?.name || 'Unknown Item',
      uom: ing.uom || 'pcs'
    });
    setShowInventoryIntel(true);
    setLoadingInventoryIntel(true);
    setInventoryIntelData(null);
    setIntelTab('movements');
    setExpectedData([]);
    setCommittedData([]);
    setIngredientCanBuy(false);
    setIngredientCanMake(false);

    try {
      // 0. Fetch item details: type, usability flags
      if (ing.variant?.item?.id) {
        const { data: itemData } = await supabase
          .from('items')
          .select('type, is_purchasable, is_producible')
          .eq('id', ing.variant.item.id)
          .single();

        if (itemData) {
          const itemType = itemData.type as 'Product' | 'Material';
          setIngredientCanBuy(itemData.is_purchasable ?? (itemType === 'Material'));
          setIngredientCanMake(itemData.is_producible ?? (itemType === 'Product'));
        }
      }

      // 1. Get inventory summary
      const { data: inventoryRecord } = await supabase
        .from('inventory')
        .select('quantity_in_stock, quantity_committed, quantity_expected, reorder_point, average_cost')
        .eq('variant_id', variantId)
        .maybeSingle();

      const inStock = inventoryRecord?.quantity_in_stock || 0;
      const expected = inventoryRecord?.quantity_expected || 0;
      const committed = inventoryRecord?.quantity_committed || 0;
      const safetyStock = inventoryRecord?.reorder_point || 0;
      const avgCost = inventoryRecord?.average_cost || 0;

      // 2. Load stock movements
      const { data: stockMovements } = await supabase
        .from('stock_movements')
        .select('*')
        .eq('variant_id', variantId)
        .order('movement_date', { ascending: false })
        .limit(50);

      let movements: any[] = [];
      if (stockMovements && stockMovements.length > 0) {
        movements = stockMovements.map((m: any) => ({
          id: m.id,
          date: m.movement_date,
          type: m.caused_by_reference || m.caused_by_type || 'Unknown',
          change: Number(m.quantity_change),
          price: Number(m.cost_per_unit) || avgCost,
          balance: Number(m.balance_after),
          value: Number(m.value_after),
          avgCost: Number(m.avg_cost_after),
          isAlert: Number(m.balance_after) < 0,
        }));
      } else {
        // Fall back to calculated movements
        movements = await fetchStockMovements(variantId, inStock, avgCost);
      }

      // 3. Load Expected data from purchase_order_rows
      const { data: poRows } = await supabase
        .from('purchase_order_rows')
        .select(`
          id, quantity, quantity_received,
          purchase_order:purchase_orders!inner(order_no, expected_arrival_date, status)
        `)
        .eq('variant_id', variantId)
        .neq('purchase_order.status', 'RECEIVED')
        .neq('purchase_order.status', 'CANCELLED');

      if (poRows && poRows.length > 0) {
        setExpectedData(poRows.map((row: any) => ({
          id: row.id,
          poNumber: row.purchase_order?.order_no || 'Unknown',
          expectedDate: row.purchase_order?.expected_arrival_date || '',
          quantity: Number(row.quantity) || 0,
          received: Number(row.quantity_received) || 0,
          remaining: (Number(row.quantity) || 0) - (Number(row.quantity_received) || 0),
        })));
      }

      // 4. Load Committed data from manufacturing_order_rows
      const { data: moRows } = await supabase
        .from('manufacturing_order_rows')
        .select(`
          id, planned_quantity,
          manufacturing_order:manufacturing_orders!inner(order_no, status, variant:variants(item:items(name)))
        `)
        .eq('variant_id', variantId)
        .neq('manufacturing_order.status', 'DONE')
        .neq('manufacturing_order.status', 'CANCELLED');

      if (moRows && moRows.length > 0) {
        setCommittedData(moRows.map((row: any) => ({
          id: row.id,
          moNumber: row.manufacturing_order?.order_no || 'Unknown',
          productName: row.manufacturing_order?.variant?.item?.name || 'Unknown Product',
          quantity: Number(row.planned_quantity) || 0,
          status: row.manufacturing_order?.status || 'Unknown',
        })));
      }

      setInventoryIntelData({
        inStock,
        expected,
        committed,
        safetyStock,
        calculatedStock: inStock - committed + expected,
        averageCost: avgCost,
        uom: ing.uom || 'pcs',
        movements
      });
    } catch (err) {
      console.error('Error loading inventory intel:', err);
    }

    setLoadingInventoryIntel(false);
  };

  const handleAvailabilityClick = async (ing: any) => {
    await loadInventoryIntel(ing);
  };

  return (
    <div className="min-h-full bg-background font-sans text-[13px] text-foreground pb-20 flex flex-col">

      {/* --- Header (Sticky) --- */}
      <header className="bg-background sticky top-0 z-30 border-b border-border shrink-0">
        <div className="w-full max-w-[1920px] mx-auto px-4 py-3 flex justify-between items-center">

          {/* Left Area: Back Button + Breadcrumb/Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-secondary/50 text-muted-foreground transition-colors"
            >
              <ArrowLeft size={20} />
            </button>

            {isNew ? (
              <div className="flex items-center gap-2 w-[400px]">
                <SearchableSelect
                  value={null}
                  options={productOptions}
                  onChange={handleProductSelect}
                  placeholder="Select a product to create order..."
                  searchPlaceholder="Search products..."
                />
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-gray-500/10 text-gray-500 border border-gray-500/20 whitespace-nowrap">
                  Draft
                </span>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5">
                  <Link href="/make" className="hover:text-foreground transition-colors">
                    Manufacturing orders
                  </Link>
                  <span className="text-border">/</span>
                  <span className="">{order.productSku || '...'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-medium text-foreground tracking-tight">
                    {order.orderNo}: {order.productName}
                  </h1>
                </div>
              </div>
            )}
          </div>

          {/* Right Area: Actions Toolbar */}
          <div className="flex items-center gap-4">
            <StatusDropdown
              value={order.productionStatus}
              onChange={(status) => handleStatusChange(status as any)}
              options={moStatusOptions}
            />

            <span className="text-xs text-muted-foreground">All changes saved</span>

            <button className="p-2 hover:bg-secondary/50 rounded-md transition-all text-muted-foreground" title="Print">
              <Printer size={18} />
            </button>

            <button className="p-1.5 hover:bg-secondary/50 rounded transition-all" title="More options">
              <MoreVertical size={18} className="text-muted-foreground" />
            </button>

            <Link
              href="/make"
              className="p-2 hover:bg-secondary/50 rounded-md transition-all text-muted-foreground hover:text-foreground"
              title="Close"
            >
              <X size={20} />
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1920px] mx-auto p-4 space-y-6">

        {/* --- Info Card --- */}
        <div className="bg-background rounded-lg border border-border p-4">
          <div className="grid grid-cols-3 border-b border-border">

            <div className="p-3 border-r border-border">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Manufacturing order #</label>
              <InlineEdit
                value={order.orderNo}
                onChange={handleOrderNoChange}
              />
            </div>
            <div className="p-3 border-r border-border">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Production deadline</label>
              <DatePicker
                value={order.productionDeadline}
                onChange={(date) => handleDeadlineChange(date || '')}
                placeholder="Select date"
              />
            </div>
            <div className="p-3">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Created date</label>
              <Input
                type="date"
                value={new Date(order.creationDate).toISOString().split('T')[0]}
                className="bg-transparent border-0 text-foreground h-8 px-0"
                readOnly
              />
            </div>
          </div>

          <div className={cn(
            "grid border-b border-border",
            order.productionStatus === 'done' ? "grid-cols-3" : "grid-cols-1"
          )}>
            <div className={cn("p-3", order.productionStatus === 'done' ? "col-span-2 border-r border-border" : "col-span-1")}>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">Product</label>
              <div className="flex items-center gap-2">
                <SearchableSelect
                  value={order.variant_id || ''}
                  options={products}
                  onChange={async (variantId) => {
                    console.log('[DEBUG] Product selected, variant_id:', variantId);
                    const selectedProduct = products.find(p => p.id === variantId);
                    if (!selectedProduct) return;

                    setOrder(prev => ({
                      ...prev,
                      variant_id: variantId,
                      productName: selectedProduct.name,
                      productSku: selectedProduct.sku || ''
                    }));

                    await handleUpdate({ variant_id: variantId });
                    await loadProductDataForMO(variantId, ingredients.length > 0 || operations.length > 0);
                  }}
                  onNavigate={(productId) => router.push(`/items/${productId}`)}
                  onCreate={handleCreateProduct}
                  placeholder={productsLoading ? "Loading products..." : "Select a product..."}
                  searchPlaceholder="Search or create product..."
                  showExternalLink={true}
                  allowCreate={true}
                  createLabel="Create product"
                />
              </div>
            </div>

            {order.productionStatus === 'done' && (
              <div className="p-3 col-span-1">
                <label className="text-xs font-medium text-muted-foreground block mb-1">Done date</label>
                <div className="text-foreground text-sm pt-1.5">
                  {formatDoneDate((order as any).done_date) || 'Not recorded'}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Batch #:</span>
              <span className="text-foreground">
                {targetBatch || <span className="text-muted-foreground">Not assigned yet</span>}
              </span>
            </div>
          </div>

          {/* Row 4: Quantities and Cost */}
          <div className="grid grid-cols-3">
            <div className="p-3 border-r border-border">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Planned quantity</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={order.plannedQuantity || 0}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    setOrder(prev => ({ ...prev, plannedQuantity: value }));
                  }}
                  onFocus={(e) => e.target.select()}
                  onBlur={async (e) => {
                    const newQuantity = parseFloat(e.target.value) || 0;
                    const oldQuantity = order.plannedQuantity || 1;

                    // Skip if no change
                    if (newQuantity === oldQuantity) return;

                    await handleUpdate({
                      planned_quantity: newQuantity,
                      updated_at: new Date().toISOString()
                    });

                    // Recalculate ingredient planned quantities based on BOM ratios
                    if (order.variant_id) {
                      const bom = await loadBOMForProduct(order.variant_id);

                      if (bom.length > 0) {
                        // Update each ingredient's planned_quantity and total_cost
                        for (const recipe of bom) {
                          const ingredient = ingredients.find(
                            ing => ing.variant_id === recipe.ingredient_variant_id
                          );

                          if (ingredient) {
                            const newIngQty = (recipe.quantity || 0) * newQuantity;
                            const newIngCost = newIngQty * getIngredientUnitCost(ingredient);
                            await supabase
                              .from('manufacturing_order_rows')
                              .update({
                                planned_quantity: safeNumber(newIngQty),
                                total_cost: safeNumber(newIngCost)
                              })
                              .eq('id', ingredient.id);
                          }
                        }

                        // Reload ingredients to show updated quantities
                        await loadIngredientsData();
                      } else {
                        // If no BOM, scale existing ingredients proportionally
                        const ratio = oldQuantity > 0 ? newQuantity / oldQuantity : 1;
                        for (const ing of ingredients) {
                          if (ing.id && !ing.id.startsWith('temp-')) {
                            const newIngQty = (ing.planned_quantity || 0) * ratio;
                            const newIngCost = newIngQty * getIngredientUnitCost(ing);
                            await supabase
                              .from('manufacturing_order_rows')
                              .update({
                                planned_quantity: safeNumber(newIngQty),
                                total_cost: safeNumber(newIngCost)
                              })
                              .eq('id', ing.id);
                          }
                        }
                        await loadIngredientsData();
                      }
                    }

                    // Recalculate and save total cost
                    await recalculateTotalCost();
                  }}
                  className="bg-transparent border border-transparent hover:border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-2 py-0.5 text-foreground text-lg font-medium w-24 outline-none transition-all cursor-text [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="0"
                />
                <span className="text-muted-foreground">{order.uom}</span>
              </div>
            </div>
            <div className="p-3 border-r border-border">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Actual quantity</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={order.completedQuantity || 0}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    setOrder(prev => ({ ...prev, completedQuantity: value }));
                  }}
                  onFocus={(e) => e.target.select()}
                  onBlur={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    handleUpdate({ actual_quantity: value });
                  }}
                  className="bg-transparent border border-transparent hover:border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-2 py-0.5 text-foreground text-lg font-medium w-24 outline-none transition-all cursor-text [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="..."
                />
                <span className="text-muted-foreground">{order.uom}</span>
              </div>
            </div>
            <div className="p-3">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Total Cost</label>
              <div className="text-foreground text-lg">
                {calculatedCosts.totalCost.toFixed(5)} CAD
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Materials: {calculatedCosts.ingredientsCost.toFixed(2)} + Labor: {calculatedCosts.operationsCost.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* --- Ingredients Section --- */}
        <div className="space-y-4">
          <div className="bg-background rounded-lg border border-border overflow-visible relative">

            {/* Unified Header Inside Card */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-medium text-foreground">Ingredients</h2>
                <span className="bg-secondary/50 text-muted-foreground px-2 py-0.5 rounded text-[11px] font-medium border border-border/30">
                  {ingredients.length} items
                </span>
              </div>
              <div className="flex items-center gap-3">
                {order.variant_id && (
                  <button
                    onClick={async () => {
                      // Load BOM only (for ingredients section)
                      const bom = await loadBOMForProduct(order.variant_id!);
                      if (bom.length > 0) {
                        if (ingredients.length === 0) {
                          await populateIngredientsFromBOM(bom);
                        } else {
                          setConfirmDialog({
                            open: true,
                            title: 'Replace ingredients?',
                            description: `Are you sure you want to replace ${ingredients.length} existing ingredients with the product BOM?`,
                            onConfirm: () => populateIngredientsFromBOM(bom),
                            actionLabel: 'Replace'
                          });
                        }
                      } else {
                        showToast('No BOM found for this product', 'warning');
                      }
                    }}
                    className="text-primary hover:text-primary/80 text-xs flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw size={12} />
                    Load from BOM
                  </button>
                )}
                {order.variant_id && (
                  <Link
                    href={`/items/${order.variant_id}?tab=product-recipe`}
                    target="_blank"
                    className="text-primary text-xs hover:underline flex items-center gap-1"
                  >
                    Open product BOM <ExternalLink size={12} />
                  </Link>
                )}
              </div>
            </div>

            <div className="overflow-visible">
              <table className="w-full text-left border-collapse table-fixed">
                <colgroup>
                  <col className="w-[4%]" />
                  <col className="w-[30%]" />
                  <col className="w-[18%]" />
                  <col className="w-[16%]" />
                  <col className="w-[14%]" />
                  <col className="w-[14%]" />
                  <col className="w-[4%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-border bg-secondary/10 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                    <th className="px-3 py-3 text-left border-r border-border/50"></th>
                    <th className="px-3 py-3 border-r border-border/50 text-left">Item</th>
                    <th className="px-3 py-3 border-r border-border/50 text-left">Notes</th>
                    <th className="px-3 py-3 border-r border-border/50 text-right">PLANNED/ACTUAL QTY <span className="text-muted-foreground/50">ⓘ</span></th>
                    <th className="px-3 py-3 border-r border-border/50 text-left">COST</th>
                    <th className="px-3 py-3 border-r border-border/50 text-left">AVAILABILITY</th>
                    <th className="px-3 py-3 text-left"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {/* Total Row - Positioned above items as per Image 1 */}
                  <tr className="bg-[#1a1a18] border-b border-border/50 font-medium text-[11px] text-muted-foreground">
                    <td className="px-3 py-1.5 border-r border-border/50" colSpan={3}></td>
                    <td className="px-3 py-1.5 text-right border-r border-border/50 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-muted-foreground font-normal">Total:</span>
                        <div className="flex items-center gap-1 font-mono text-[11px]">
                          <span className="text-white font-bold">{ingredientTotals.plannedQty}</span>
                          <span className="text-muted-foreground/30">/</span>
                          <span className={cn(
                            "transition-colors",
                            ingredientTotals.actualQty === 0 ? "text-muted-foreground/40" : (ingredientTotals.actualQty === ingredientTotals.plannedQty ? "text-white" : "text-muted-foreground/80")
                          )}>
                            {ingredientTotals.actualQty}
                          </span>
                          <span className="text-muted-foreground/60 text-[10px] ml-0.5">pcs</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-1.5 text-right border-r border-border/50 text-foreground font-mono text-[11px]">
                      {ingredientTotals.cost.toFixed(5)} CAD
                    </td>
                    <td className="px-3 py-1.5 text-right border-r border-border/50 text-foreground">
                      {/* Availability empty for total row */}
                    </td>
                    <td className="px-3 py-1.5"></td>
                  </tr>

                  {ingredients.map((ing, idx) => (
                    <React.Fragment key={ing.id}>
                      <tr className="hover:bg-secondary/20 transition-colors group">
                        <td className="px-3 py-1 text-muted-foreground text-xs border-r border-border/50 font-medium">
                          <div className="flex items-center gap-1">
                            {/* Expand/collapse for batch-tracked items */}
                            {ing.is_batch_tracked ? (
                              <button
                                onClick={() => {
                                  const newExpanded = new Set(expandedIngredients);
                                  if (newExpanded.has(ing.id)) {
                                    newExpanded.delete(ing.id);
                                  } else {
                                    newExpanded.add(ing.id);
                                  }
                                  setExpandedIngredients(newExpanded);
                                }}
                                className="text-muted-foreground hover:text-foreground transition-colors mr-1"
                              >
                                {expandedIngredients.has(ing.id) ? '▼' : '▶'}
                              </button>
                            ) : (
                              <GripVertical size={12} className="text-muted-foreground/50 cursor-grab" />
                            )}
                            {idx + 1}.
                          </div>
                        </td>
                        <td className="px-3 py-1 border-r border-border/50">
                          <SearchableSelect
                            value={ing.variant_id || null}
                            options={availableVariants.map(v => ({
                              id: v.id,
                              name: v.sku ? `${v.sku} - ${v.item?.name || 'Unknown'}` : v.item?.name || 'Unknown',
                              sku: v.sku
                            }))}
                            onChange={(variantId) => {
                              if (ing.id.startsWith('temp-')) {
                                handleSaveIngredient(ing.id, variantId);
                              } else {
                                handleUpdateIngredient(ing.id, {
                                  variant_id: variantId,
                                });
                              }
                            }}
                            placeholder="Select item..."
                            searchPlaceholder="Search or create product..."
                          />
                        </td>
                        <td className="px-3 py-1 border-r border-border/50">
                          <Input
                            className="h-7 text-xs bg-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus:bg-background rounded-sm shadow-none w-full text-muted-foreground italic"
                            value={ing.notes || ''}
                            onChange={(e) => handleUpdateIngredient(ing.id, { notes: e.target.value })}
                          />
                        </td>
                        <td className="px-3 py-1 border-r border-border/50 font-mono text-xs whitespace-nowrap">
                          <QuantityPickerPopup
                            planned={ing.planned_quantity || 0}
                            actual={ing.actual_quantity || 0}
                            uom={ing.unit_of_measure || 'pcs'}
                            onChange={(val) => handleUpdateIngredient(ing.id, { planned_quantity: val })}
                            onActualChange={(val) => handleUpdateIngredient(ing.id, { actual_quantity: val })}
                          />
                        </td>
                        <td className="px-3 py-1 text-right text-muted-foreground border-r border-border/50 font-mono text-xs">
                          {(getIngredientUnitCost(ing) * (ing.actual_quantity || ing.planned_quantity || 0)).toFixed(5)} CAD
                        </td>
                        <td className="px-3 py-1 border-r border-border/50">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer hover:opacity-80 min-w-[70px] justify-center transition-all border shadow-sm",
                                getAvailability(ing.variant_id, ing.planned_quantity, ing.is_picked, ing).className
                              )}
                              onClick={() => handleAvailabilityClick(ing)}
                              onDoubleClick={() => handleTogglePicked(ing.id, ing.is_picked || false)}
                              title="Click for details, double-click to toggle picked status"
                            >
                              {getAvailability(ing.variant_id, ing.planned_quantity, ing.is_picked, ing).label}
                            </div>
                            <div className="w-px h-5 bg-border/50"></div>
                            {getIngredientAction(ing) === 'Make' ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-[10px] text-[#8aaf6e] hover:text-[#8aaf6e] hover:bg-[#8aaf6e]/10"
                                onClick={() => handleMakeIngredient(ing)}
                              >
                                <Hammer size={10} className="mr-1" />
                                Make
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-[11px] font-medium text-[#d97757] hover:text-[#d97757] hover:bg-[#d97757]/10 flex items-center gap-1.5"
                                onClick={() => handleBuyIngredient(ing)}
                              >
                                <ShoppingCart size={12} className="opacity-80" />
                                <span className="underline-offset-2 group-hover:underline">Buy</span>
                              </Button>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-1 text-center">
                          <button
                            onClick={() => handleDeleteIngredient(ing.id)}
                            className="text-[#ff7b6f] opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#ff7b6f]/10 rounded"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                      {/* Batch sub-rows when expanded */}
                      {expandedIngredients.has(ing.id) && ing.batches && ing.batches.length > 0 && ing.batches.map((batch: any) => (
                        <tr key={batch.id} className="bg-[#262624]/50 border-b border-border/30">
                          <td className="px-3 py-2 border-r border-border/50"></td>
                          <td className="px-3 py-2 pl-8 text-sm border-r border-border/50" colSpan={3}>
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-[#bebcb3] bg-[#3a3a38] px-2 py-0.5 rounded text-xs">{batch.batch_number}</span>
                              <span className="text-muted-foreground text-xs">Exp. {batch.expiration_date ? new Date(batch.expiration_date).toLocaleDateString() : 'N/A'}</span>
                              <span className="text-muted-foreground">|</span>
                              <span className="text-foreground text-xs">{batch.quantity} {ing.unit_of_measure || 'pcs'}</span>
                            </div>
                          </td>
                          <td className="px-3 py-2 border-r border-border/50"></td>
                          <td className="px-3 py-2 border-r border-border/50"></td>
                          <td className="px-3 py-2"></td>
                        </tr>
                      ))}
                      {/* Edit batches button row - shown when expanded and has batches */}
                      {expandedIngredients.has(ing.id) && ing.batches && ing.batches.length > 0 && (
                        <tr className="bg-[#262624]/30 border-b border-border/30">
                          <td className="px-3 py-2 border-r border-border/50"></td>
                          <td className="px-3 py-2 pl-8 border-r border-border/50" colSpan={5}>
                            <button
                              onClick={() => openBatchModal(ing)}
                              className="text-primary hover:text-primary/80 text-xs font-medium flex items-center gap-1"
                            >
                              <span className="text-[10px]">✏️</span> Edit batches
                            </button>
                          </td>
                          <td className="px-3 py-2"></td>
                        </tr>
                      )}
                      {/* Show empty state for batch-tracked items with no batches */}
                      {expandedIngredients.has(ing.id) && ing.is_batch_tracked && (!ing.batches || ing.batches.length === 0) && (
                        <tr className="bg-[#262624]/50 border-b border-border/30">
                          <td className="px-3 py-2 border-r border-border/50"></td>
                          <td className="px-3 py-3 pl-8 text-sm text-muted-foreground italic border-r border-border/50" colSpan={5}>
                            No batches assigned yet.
                          </td>
                          <td className="px-3 py-2">
                            <button
                              onClick={() => openBatchModal(ing)}
                              className="text-primary hover:text-primary/80 text-xs font-medium"
                            >
                              + Assign batches
                            </button>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  {ingredients.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-muted-foreground">
                        No ingredients added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={7} className="p-2 border-t border-border">
                      <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-primary hover:bg-secondary/50 h-8 px-2 text-xs font-medium flex items-center gap-1 transition-colors"
                        onClick={handleAddIngredient}
                      >
                        <Plus size={14} /> Add row
                      </Button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div >

        {/* --- Operations Section --- */}
        < div className="space-y-4" >
          <div className="bg-background rounded-lg border border-border overflow-visible relative">

            {/* Unified Header Inside Card */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-border text-foreground">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-medium">Operations</h2>
                <span className="bg-secondary/50 text-muted-foreground px-2 py-0.5 rounded text-[11px] font-medium border border-border/30">
                  {operations.length} operations
                </span>
              </div>
              <div className="flex items-center gap-3">
                {order.variant_id && (
                  <button
                    onClick={async () => {
                      // Load operations only (for operations section)
                      const productOps = await loadProductOperationsTemplate(order.variant_id!);
                      if (productOps.length > 0) {
                        if (operations.length === 0) {
                          await populateOperationsFromProduct(productOps);
                        } else {
                          setConfirmDialog({
                            open: true,
                            title: 'Replace operations?',
                            description: `Are you sure you want to replace ${operations.length} existing operations with the product operations template?`,
                            onConfirm: () => populateOperationsFromProduct(productOps),
                            actionLabel: 'Replace'
                          });
                        }
                      } else {
                        showToast('No operations found for this product', 'warning');
                      }
                    }}
                    className="text-primary hover:text-primary/80 text-xs flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw size={12} />
                    Load from Product
                  </button>
                )}
                {order.variant_id && (
                  <Link
                    href={`/items/${order.variant_id}?tab=production-operations`}
                    target="_blank"
                    className="text-primary text-xs hover:underline flex items-center gap-1"
                  >
                    Open product operations <ExternalLink size={12} />
                  </Link>
                )}
              </div>
            </div>

            <div className="overflow-x-auto overflow-y-visible">

              <table className="w-full text-left border-collapse min-w-[1400px]">
                <thead>
                  <tr className="border-b border-border bg-secondary/10 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                    {/* Drag Handle */}
                    <th className="p-3 w-10 border-r border-border/50"></th>

                    {/* Step */}
                    <th className="p-3 w-16 border-r border-border/50 text-left">
                      Step
                    </th>

                    {/* Operation Name */}
                    <th className="p-3 w-48 border-r border-border/50">
                      Operation
                    </th>

                    {/* Type */}
                    <th className="p-3 w-28 border-r border-border/50">
                      Type
                    </th>

                    {/* Resource */}
                    <th className="p-3 w-40 border-r border-border/50">
                      Resource
                    </th>

                    {/* Cost Para. (Rate) */}
                    <th className="p-3 w-24 border-r border-border/50 text-left">
                      Cost para.
                    </th>

                    {/* Operator - MO specific */}
                    <th className="p-3 w-44 border-r border-border/50">
                      Operator
                    </th>

                    {/* Planned/Actual Time - merged column */}
                    <th className="p-3 w-32 border-r border-border/50 text-left">
                      Planned/actual <span className="text-muted-foreground/50">ⓘ</span>
                    </th>

                    {/* Cost */}
                    <th className="p-3 w-28 border-r border-border/50 text-left">
                      Cost
                    </th>

                    {/* Status - MO specific */}
                    <th className="p-3 w-32 border-r border-border/50 text-left">
                      Status
                    </th>

                    {/* Delete */}
                    <th className="p-3 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {/* Total Row */}
                  <tr className="bg-secondary/20 border-b border-border font-medium">
                    <td className="p-3 border-r border-border/50" colSpan={6}></td>
                    <td className="p-3 text-right border-r border-border/50 text-muted-foreground whitespace-nowrap w-16">
                      Total:
                    </td>
                    <td className="p-3 text-right border-r border-border/50 text-foreground whitespace-nowrap">
                      <span className="text-foreground">{formatTimeDisplay(operationTotals.plannedTime)}</span>
                      <span className="text-muted-foreground"> / </span>
                      <span className="text-muted-foreground">{formatTimeDisplay(operationTotals.actualTime)}</span>
                    </td>
                    <td className="p-3 text-right border-r border-border/50 text-foreground">
                      {operationTotals.cost.toFixed(2)} CAD
                    </td>
                    <td className="p-3 border-r border-border/50"></td>
                    <td className="p-3"></td>
                  </tr>

                  {operations.map((op, index) => (
                    <tr
                      key={op.id}
                      className="hover:bg-secondary/20 transition-colors group"
                    >
                      {/* Drag Handle */}
                      <td className="p-3 cursor-grab border-r border-border/50">
                        <GripVertical className="w-4 h-4 text-muted-foreground/50 hover:text-foreground" />
                      </td>

                      {/* Step Number */}
                      <td className="p-3 border-r border-border/50 text-center text-sm text-muted-foreground">
                        {index + 1}
                      </td>

                      {/* Operation Name - Searchable dropdown */}
                      <td className="p-1 border-r border-border/50">
                        <div className="relative">
                          <button
                            onClick={(e) => openDropdownAtButton(e, setActiveOperationPicker, activeOperationPicker, op.id)}
                            className="w-full h-7 text-xs px-3 bg-transparent border border-border/50 rounded-md focus:ring-0 shadow-none flex items-center justify-start text-left"
                          >
                            <span className="truncate">{op.operation_name || 'Select operation...'}</span>
                          </button>
                          {activeOperationPicker === op.id && (
                            <>
                              <div className="fixed inset-0 z-[9998]" onClick={() => setActiveOperationPicker(null)} />
                              <div
                                className="fixed bg-[#1f1f1d] border border-gray-600 rounded-lg shadow-2xl z-[9999] w-[300px] flex flex-col"
                                style={dropdownStyle}
                              >
                                {/* Header */}
                                <div className="px-3 py-2 text-xs text-gray-400 border-b border-gray-700">
                                  Select operation
                                </div>
                                {/* Search Input */}
                                <div className="p-3 border-b border-gray-700">
                                  <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2a28] rounded border border-gray-600 focus-within:border-gray-500">
                                    <Search className="w-4 h-4 text-gray-500" />
                                    <input
                                      type="text"
                                      value={operationSearchQuery}
                                      onChange={(e) => setOperationSearchQuery(e.target.value)}
                                      placeholder="Search operations..."
                                      className="bg-transparent text-white text-sm outline-none flex-1 placeholder-gray-500"
                                      autoFocus
                                    />
                                  </div>
                                </div>
                                {/* Options List */}
                                <div className="flex-1 overflow-y-auto py-1">
                                  {operationOptions
                                    .filter(opName => opName.toLowerCase().includes(operationSearchQuery.toLowerCase()))
                                    .map(opName => (
                                      <button
                                        key={opName}
                                        type="button"
                                        onClick={() => {
                                          handleUpdateOperation(op.id, { operation_name: opName });
                                          setActiveOperationPicker(null);
                                          setOperationSearchQuery('');
                                        }}
                                        className={`w-full px-4 py-1.5 text-left flex items-center gap-2 hover:bg-gray-700/50 transition ${opName === op.operation_name ? 'bg-gray-700/30' : ''}`}
                                      >
                                        <span className="text-white text-sm">{opName}</span>
                                      </button>
                                    ))
                                  }
                                  {operationOptions.filter(opName => opName.toLowerCase().includes(operationSearchQuery.toLowerCase())).length === 0 && !operationSearchQuery.trim() && (
                                    <div className="px-4 py-3 text-gray-500 text-sm">
                                      No operations found
                                    </div>
                                  )}
                                </div>
                                {/* Create new operation option */}
                                {operationSearchQuery.trim() && operationOptions.filter(opName => opName.toLowerCase().includes(operationSearchQuery.toLowerCase())).length === 0 && (
                                  <div className="border-t border-gray-700">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newOpName = operationSearchQuery.trim().toUpperCase();
                                        setOperationOptions(prev => [...prev, newOpName]);
                                        handleUpdateOperation(op.id, { operation_name: newOpName });
                                        setActiveOperationPicker(null);
                                        setOperationSearchQuery('');
                                      }}
                                      className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-gray-700/50 transition"
                                    >
                                      <Plus className="w-4 h-4 text-[#d97757]" />
                                      <span className="text-[#d97757] text-sm">
                                        Create "{operationSearchQuery.trim().toUpperCase()}"
                                      </span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Type Dropdown */}
                      <td className="p-1 border-r border-border/50">
                        <Select
                          value={op.type || 'Process'}
                          onValueChange={(val) => handleUpdateOperation(op.id, { type: val })}
                        >
                          <SelectTrigger className="h-7 text-xs bg-transparent !border !border-border/50 focus:ring-0 shadow-none focus-visible:ring-0 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border">
                            <SelectItem value="Process">Process</SelectItem>
                            <SelectItem value="Setup">Setup</SelectItem>
                            <SelectItem value="Per unit">Per unit</SelectItem>
                            <SelectItem value="Fixed cost">Fixed cost</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>

                      {/* Resource - Searchable dropdown */}
                      <td className="p-1 border-r border-border/50">
                        <div className="relative">
                          <button
                            onClick={(e) => openDropdownAtButton(e, setActiveResourcePicker, activeResourcePicker, op.id)}
                            className="w-full h-7 text-xs px-3 bg-transparent border border-border/50 rounded-md focus:ring-0 shadow-none flex items-center justify-start text-left"
                          >
                            <span className="truncate">{op.resource || 'Select resource...'}</span>
                          </button>
                          {activeResourcePicker === op.id && (
                            <>
                              <div className="fixed inset-0 z-[9998]" onClick={() => setActiveResourcePicker(null)} />
                              <div
                                className="fixed bg-[#1f1f1d] border border-gray-600 rounded-lg shadow-2xl z-[9999] w-[280px] flex flex-col"
                                style={dropdownStyle}
                              >
                                {/* Header */}
                                <div className="px-3 py-2 text-xs text-gray-400 border-b border-gray-700">
                                  Select resource
                                </div>
                                {/* Search Input */}
                                <div className="p-3 border-b border-gray-700">
                                  <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2a28] rounded border border-gray-600 focus-within:border-gray-500">
                                    <Search className="w-4 h-4 text-gray-500" />
                                    <input
                                      type="text"
                                      value={resourceSearchQuery}
                                      onChange={(e) => setResourceSearchQuery(e.target.value)}
                                      placeholder="Search resources..."
                                      className="bg-transparent text-white text-sm outline-none flex-1 placeholder-gray-500"
                                      autoFocus
                                    />
                                  </div>
                                </div>
                                {/* Options List */}
                                <div className="flex-1 overflow-y-auto py-1">
                                  {resourceOptions
                                    .filter(resName => resName.toLowerCase().includes(resourceSearchQuery.toLowerCase()))
                                    .map(resName => (
                                      <button
                                        key={resName}
                                        type="button"
                                        onClick={() => {
                                          handleUpdateOperation(op.id, { resource: resName });
                                          setActiveResourcePicker(null);
                                          setResourceSearchQuery('');
                                        }}
                                        className={`w-full px-4 py-1.5 text-left flex items-center gap-2 hover:bg-gray-700/50 transition ${resName === op.resource ? 'bg-gray-700/30' : ''}`}
                                      >
                                        <span className="text-white text-sm">{resName}</span>
                                      </button>
                                    ))
                                  }
                                  {resourceOptions.filter(resName => resName.toLowerCase().includes(resourceSearchQuery.toLowerCase())).length === 0 && !resourceSearchQuery.trim() && (
                                    <div className="px-4 py-3 text-gray-500 text-sm">
                                      No resources found
                                    </div>
                                  )}
                                </div>
                                {/* Create new resource option */}
                                {resourceSearchQuery.trim() && resourceOptions.filter(resName => resName.toLowerCase().includes(resourceSearchQuery.toLowerCase())).length === 0 && (
                                  <div className="border-t border-gray-700">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newResName = resourceSearchQuery.trim().toUpperCase();
                                        setResourceOptions(prev => [...prev, newResName]);
                                        handleUpdateOperation(op.id, { resource: newResName });
                                        setActiveResourcePicker(null);
                                        setResourceSearchQuery('');
                                      }}
                                      className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-gray-700/50 transition"
                                    >
                                      <Plus className="w-4 h-4 text-[#d97757]" />
                                      <span className="text-[#d97757] text-sm">
                                        Create "{resourceSearchQuery.trim().toUpperCase()}"
                                      </span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Cost Para (Rate) - Different input based on operation type */}
                      <td className="p-3 border-r border-border/50">
                        {(op.type === 'Process' || op.type === 'Setup' || !op.type) && (
                          <div className="flex items-center justify-end gap-1">
                            <Input
                              type="number"
                              value={op.cost_per_hour || 0}
                              onChange={(e) => handleUpdateOperation(op.id, { cost_per_hour: parseFloat(e.target.value) || 0 })}
                              onFocus={(e) => e.target.select()}
                              className="bg-transparent border-none text-foreground text-right p-0 h-auto w-16 focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">CAD/h</span>
                          </div>
                        )}
                        {op.type === 'Per unit' && (
                          <div className="flex items-center justify-end gap-1">
                            <Input
                              type="number"
                              value={op.cost_per_unit || 0}
                              onChange={(e) => handleUpdateOperation(op.id, { cost_per_unit: parseFloat(e.target.value) || 0 })}
                              onFocus={(e) => e.target.select()}
                              className="bg-transparent border-none text-foreground text-right p-0 h-auto w-16 focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">CAD/unit</span>
                          </div>
                        )}
                        {op.type === 'Fixed cost' && (
                          <div className="flex items-center justify-end gap-1">
                            <Input
                              type="number"
                              value={op.fixed_cost || 0}
                              onChange={(e) => handleUpdateOperation(op.id, { fixed_cost: parseFloat(e.target.value) || 0 })}
                              onFocus={(e) => e.target.select()}
                              className="bg-transparent border-none text-foreground text-right p-0 h-auto w-16 focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">CAD</span>
                          </div>
                        )}
                      </td>

                      {/* Operator Multi-Select */}
                      <td className="p-1 border-r border-border/50">
                        <OperatorMultiSelect
                          operationId={op.id}
                          selectedOperators={parseOperatorsFromOp(op)}
                          onUpdate={(operators) => handleOperatorChange(op.id, operators)}
                        />
                      </td>

                      {/* Time - Planned / Actual */}
                      <td className="p-3 border-r border-border/50">
                        <TimePickerPopup
                          plannedSeconds={op.planned_time_seconds || 0}
                          actualSeconds={op.actual_time_seconds || 0}
                          onPlannedChange={(newSeconds) => handleUpdateOperation(op.id, {
                            planned_time_seconds: newSeconds
                          })}
                          onActualChange={(newSeconds) => handleUpdateOperation(op.id, {
                            actual_time_seconds: newSeconds
                          })}
                        />
                      </td>

                      {/* Cost - Using type-based calculation */}
                      <td className="p-3 text-right border-r border-border/50 text-sm text-muted-foreground">
                        {calculateOperationCostByType(op, order.plannedQuantity || 1, op.status?.toLowerCase() === 'done').toFixed(2)} <span className="text-[10px]">CAD</span>
                      </td>

                      {/* Status - Dropdown matching header style */}
                      <td className="p-1 text-center border-r border-border/50">
                        <OperationStatusDropdown
                          status={op.status || 'Not started'}
                          onStatusChange={(newStatus) => handleOperationStatusChange(op.id, newStatus)}
                        />
                      </td>

                      {/* Delete */}
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleDeleteOperation(op.id)}
                          className="text-[#ff7b6f] opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#ff7b6f]/10 rounded"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {operations.length === 0 && (
                    <tr>
                      <td colSpan={11} className="p-8 text-center text-muted-foreground">
                        No operations added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={11} className="p-2 border-t border-border">
                      <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-primary hover:bg-secondary/50 h-8 px-2 text-xs font-medium flex items-center gap-1 transition-colors"
                        onClick={handleAddOperation}
                      >
                        <Plus size={14} /> Add row
                      </Button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div >

        {/* --- Additional Info Section --- */}
        <div className="bg-background rounded-lg border border-border">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Additional info</span>
            <Info size={12} className="text-muted-foreground" />
          </div>

          {/* Toolbar */}
          <div className="px-4 py-2 border-b border-border flex items-center gap-1">
            <button
              className="p-1.5 hover:bg-secondary/50 rounded text-muted-foreground hover:text-foreground transition-colors"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              className="p-1.5 hover:bg-secondary/50 rounded text-muted-foreground hover:text-foreground transition-colors"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              className="p-1.5 hover:bg-secondary/50 rounded text-muted-foreground hover:text-foreground transition-colors"
              title="Underline"
            >
              <Underline className="w-4 h-4" />
            </button>
            <button
              className="p-1.5 hover:bg-secondary/50 rounded text-muted-foreground hover:text-foreground transition-colors"
              title="Link"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
            <button
              className="p-1.5 hover:bg-secondary/50 rounded text-muted-foreground hover:text-foreground transition-colors"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              className="p-1.5 hover:bg-secondary/50 rounded text-muted-foreground hover:text-foreground transition-colors"
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
          </div>

          {/* Editor Area */}
          <div className="p-4">
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              onBlur={handleSaveAdditionalInfo}
              placeholder="Type comment here..."
              className="w-full bg-transparent text-foreground placeholder-muted-foreground outline-none resize-none min-h-[100px] text-sm"
            />
          </div>
        </div>

      </main >

      {/* Inventory Intel Modal - Matches items page design */}
      {showInventoryIntel && selectedIngredientForIntel && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowInventoryIntel(false)}
          />

          {/* Modal Container */}
          <div className="relative bg-background rounded-lg shadow-2xl w-[1000px] max-w-[95vw] max-h-[85vh] overflow-hidden border border-border">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#d97757]/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#d97757]" />
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground">Inventory Intel</div>
                  <div className="text-lg font-semibold text-foreground">
                    {selectedIngredientForIntel.name || 'Unknown Item'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Location</span>
                  <div className="relative">
                    <select className="bg-background border border-border rounded-md pl-3 pr-8 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none appearance-none cursor-pointer min-w-[130px] hover:border-primary/30 transition-colors">
                      <option>MMH Kelowna</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInventoryIntel(false)}
                  className="p-2 hover:bg-secondary rounded-lg transition"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Stock Summary Card */}
            <div className="p-4">
              <div className="bg-secondary/30 rounded-lg border border-border">
                <div className="grid grid-cols-6">
                  {/* In Stock */}
                  <button
                    type="button"
                    onClick={() => setIntelTab('movements')}
                    className={`p-4 text-left transition-all hover:bg-secondary/50 border-r border-border ${intelTab === 'movements' ? 'bg-[#d97757]/5 border-b-2 border-b-[#d97757]' : ''
                      }`}
                  >
                    <div className={`text-xs font-medium mb-2 ${intelTab === 'movements' ? 'text-[#d97757]' : 'text-muted-foreground'}`}>
                      In stock
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {inventoryIntelData?.inStock?.toFixed(2) || '0'}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{inventoryIntelData?.uom || 'pcs'}</div>
                  </button>

                  {/* Expected */}
                  <button
                    type="button"
                    onClick={() => setIntelTab('expected')}
                    className={`p-4 text-left transition-all hover:bg-secondary/50 border-r border-border ${intelTab === 'expected' ? 'bg-[#d97757]/5 border-b-2 border-b-[#d97757]' : ''
                      }`}
                  >
                    <div className={`text-xs font-medium mb-2 ${intelTab === 'expected' ? 'text-[#d97757]' : 'text-muted-foreground'}`}>
                      Expected
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {inventoryIntelData?.expected || 0}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{inventoryIntelData?.uom || 'pcs'}</div>
                  </button>

                  {/* Committed */}
                  <button
                    type="button"
                    onClick={() => setIntelTab('committed')}
                    className={`p-4 text-left transition-all hover:bg-secondary/50 border-r border-border ${intelTab === 'committed' ? 'bg-[#d97757]/5 border-b-2 border-b-[#d97757]' : ''
                      }`}
                  >
                    <div className={`text-xs font-medium mb-2 ${intelTab === 'committed' ? 'text-[#d97757]' : 'text-muted-foreground'}`}>
                      Committed
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {inventoryIntelData?.committed || 0}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{inventoryIntelData?.uom || 'pcs'}</div>
                  </button>

                  {/* Safety Stock */}
                  <div className="p-4 border-r border-border">
                    <div className="text-xs font-medium text-muted-foreground mb-2">Safety stock</div>
                    <div className="text-2xl font-bold text-foreground">
                      {inventoryIntelData?.safetyStock || 0}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{inventoryIntelData?.uom || 'pcs'}</div>
                  </div>

                  {/* Calculated Stock */}
                  <div className="p-4 border-r border-border">
                    <div className="text-xs font-medium text-muted-foreground mb-2">Calculated stock</div>
                    <div className="text-2xl font-bold text-[#8aaf6e]">
                      {inventoryIntelData?.calculatedStock?.toFixed(2) || '0'}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{inventoryIntelData?.uom || 'pcs'}</div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 flex flex-col justify-center gap-2">
                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-secondary border border-border rounded-md text-sm text-foreground hover:bg-secondary/80 transition shadow-sm font-medium">
                      <ExternalLink size={14} />
                      Export
                    </button>
                    {ingredientCanBuy && (
                      <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#d97757] text-white rounded-md text-sm hover:bg-[#c86a4d] transition shadow-md font-bold">
                        <ShoppingCart size={14} />
                        Buy
                      </button>
                    )}
                    {ingredientCanMake && (
                      <button
                        onClick={() => {
                          const suggestedQty = (inventoryIntelData?.calculatedStock ?? 0) < 0
                            ? Math.abs(inventoryIntelData?.calculatedStock ?? 0)
                            : 1;
                          router.push(`/make/new?variant_id=${selectedIngredientForIntel?.variantId}&quantity=${suggestedQty}`);
                        }}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#d97757] text-white rounded-md text-sm hover:bg-[#c86a4d] transition shadow-md font-bold"
                      >
                        <Factory size={14} />
                        Make
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Content - Table Section */}
            <div className="px-4 pb-4">
              <div className="bg-background rounded-lg border border-border overflow-hidden">
                <div className="overflow-auto max-h-[400px]">
                  {/* Movements Table */}
                  {intelTab === 'movements' && (
                    <table className="w-full text-sm">
                      <thead className="bg-secondary/30 sticky top-0 z-10">
                        <tr className="border-b border-border">
                          <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider border-r border-border">
                            Movement date
                          </th>
                          <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider border-r border-border">
                            Caused by
                          </th>
                          <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider border-r border-border">
                            Qty change
                          </th>
                          <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider border-r border-border">
                            Cost/unit
                          </th>
                          <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider border-r border-border">
                            Balance
                          </th>
                          <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider border-r border-border">
                            Value
                          </th>
                          <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                            Avg cost
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {loadingInventoryIntel ? (
                          <tr>
                            <td colSpan={7} className="text-center py-12 text-muted-foreground">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-border border-t-[#d97757] rounded-full animate-spin" />
                                Loading...
                              </div>
                            </td>
                          </tr>
                        ) : !inventoryIntelData?.movements || inventoryIntelData.movements.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="text-center py-12 text-muted-foreground">
                              No stock movements found
                            </td>
                          </tr>
                        ) : (
                          inventoryIntelData.movements.map((mov, idx) => {
                            const typeMatch = mov.type.match(/^(MO|PO|SO|ST|SA|ADJ)-?(\d+)/i);
                            const linkType = typeMatch?.[1]?.toUpperCase();
                            const linkHref = linkType === 'MO' ? `/make?order=${typeMatch?.[2]}` :
                              linkType === 'PO' ? `/buy?order=${typeMatch?.[2]}` :
                                linkType === 'SO' ? `/sell?order=${typeMatch?.[2]}` :
                                  linkType === 'ST' ? `/stock/transfers/${typeMatch?.[2]}` :
                                    linkType === 'SA' || linkType === 'ADJ' ? `/stock/adjustments/${typeMatch?.[2]}` :
                                      null;

                            return (
                              <tr key={mov.id || idx} className="hover:bg-secondary/20 transition-colors">
                                <td className="px-4 py-3 text-foreground border-r border-border">
                                  {mov.date ? new Date(mov.date).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                  }) : '-'}
                                </td>
                                <td className="px-4 py-3 border-r border-border">
                                  {linkHref ? (
                                    <a href={linkHref} className="text-[#d97757] hover:text-[#ff7b6f] hover:underline font-medium">{mov.type}</a>
                                  ) : (
                                    <span className="text-[#d97757] font-medium">{mov.type}</span>
                                  )}
                                </td>
                                <td className={`px-4 py-3 text-right font-medium border-r border-border ${mov.change < 0 ? 'text-[#ff7b6f]' : 'text-[#8aaf6e]'}`}>
                                  {mov.change > 0 ? '+' : ''}{mov.change}
                                </td>
                                <td className="px-4 py-3 text-right text-foreground border-r border-border">{mov.price.toFixed(2)} CAD</td>
                                <td className={`px-4 py-3 text-right font-medium border-r border-border ${mov.balance < 0 ? 'bg-[#ff7b6f]/10 text-[#ff7b6f]' : 'text-foreground'}`}>
                                  {mov.balance.toFixed(2)}
                                </td>
                                <td className={`px-4 py-3 text-right border-r border-border ${mov.value < 0 ? 'bg-[#ff7b6f]/10 text-[#ff7b6f]' : 'text-foreground'}`}>
                                  {mov.value.toFixed(2)} CAD
                                </td>
                                <td className="px-4 py-3 text-right text-foreground">{mov.avgCost.toFixed(2)} CAD</td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  )}

                  {/* Expected Table (Purchase Orders) */}
                  {intelTab === 'expected' && (
                    <table className="w-full text-sm">
                      <thead className="bg-secondary/30 sticky top-0 z-10">
                        <tr className="border-b border-border">
                          <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider border-r border-border">
                            PO Number
                          </th>
                          <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider border-r border-border">
                            Expected Date
                          </th>
                          <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider border-r border-border">
                            Ordered
                          </th>
                          <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider border-r border-border">
                            Received
                          </th>
                          <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                            Remaining
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {loadingInventoryIntel ? (
                          <tr>
                            <td colSpan={5} className="text-center py-12 text-muted-foreground">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-border border-t-[#d97757] rounded-full animate-spin" />
                                Loading...
                              </div>
                            </td>
                          </tr>
                        ) : expectedData.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center py-12 text-muted-foreground">
                              No pending purchase orders found
                            </td>
                          </tr>
                        ) : (
                          expectedData.map((po) => (
                            <tr key={po.id} className="hover:bg-secondary/20 transition-colors">
                              <td className="px-4 py-3 border-r border-border">
                                <a href={`/purchasing/${po.id}`} className="text-[#d97757] hover:text-[#ff7b6f] hover:underline font-medium">{po.poNumber}</a>
                              </td>
                              <td className="px-4 py-3 text-foreground border-r border-border">
                                {po.expectedDate ? new Date(po.expectedDate).toLocaleDateString() : '-'}
                              </td>
                              <td className="px-4 py-3 text-right text-foreground border-r border-border">
                                {po.quantity} {inventoryIntelData?.uom || 'pcs'}
                              </td>
                              <td className="px-4 py-3 text-right text-foreground border-r border-border">
                                {po.received} {inventoryIntelData?.uom || 'pcs'}
                              </td>
                              <td className="px-4 py-3 text-right text-[#8aaf6e] font-medium">
                                +{po.remaining} {inventoryIntelData?.uom || 'pcs'}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}

                  {/* Committed Table (Manufacturing Orders) */}
                  {intelTab === 'committed' && (
                    <table className="w-full text-sm">
                      <thead className="bg-secondary/30 sticky top-0 z-10">
                        <tr className="border-b border-border">
                          <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider border-r border-border">
                            MO Number
                          </th>
                          <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider border-r border-border">
                            Product
                          </th>
                          <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider border-r border-border">
                            Status
                          </th>
                          <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                            Qty Required
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {loadingInventoryIntel ? (
                          <tr>
                            <td colSpan={4} className="text-center py-12 text-muted-foreground">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-border border-t-[#d97757] rounded-full animate-spin" />
                                Loading...
                              </div>
                            </td>
                          </tr>
                        ) : committedData.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="text-center py-12 text-muted-foreground">
                              No pending manufacturing orders found
                            </td>
                          </tr>
                        ) : (
                          committedData.map((mo) => (
                            <tr key={mo.id} className="hover:bg-secondary/20 transition-colors">
                              <td className="px-4 py-3 border-r border-border">
                                <a href={`/make/${mo.id}`} className="text-[#d97757] hover:text-[#ff7b6f] hover:underline font-medium">{mo.moNumber}</a>
                              </td>
                              <td className="px-4 py-3 text-foreground border-r border-border">{mo.productName}</td>
                              <td className="px-4 py-3 border-r border-border">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${mo.status === 'IN_PROGRESS' || mo.status === 'work_in_progress' ? 'bg-[#d97757]/10 text-[#d97757]' :
                                  mo.status === 'NOT_STARTED' || mo.status === 'not_started' ? 'bg-secondary text-muted-foreground' :
                                    'bg-secondary text-muted-foreground'
                                  }`}>
                                  {mo.status.replace(/_/g, ' ')}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right text-[#ff7b6f] font-medium">
                                -{mo.quantity} {inventoryIntelData?.uom || 'pcs'}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buy Modal - Create Purchase Order */}
      {showBuyModal && buyIngredient && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[10000]">
          <div className="bg-[#1a1a18] border border-[#3a3a38] rounded-lg p-6 w-[520px] text-[#faf9f5] shadow-2xl">
            <h2 className="text-xl font-semibold mb-6">New purchase order</h2>

            {/* Product & Calculated Stock Row */}
            <div className="flex justify-between mb-5">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Product</div>
                <div className="font-medium text-[#faf9f5]">
                  {buyIngredient.variant?.item?.name || 'Unknown Item'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1">Calculated stock</div>
                <div className="text-[#faf9f5]">
                  {(ingredientStockLevels[buyIngredient.variant_id]?.inStock || 0).toFixed(3)} {buyIngredient.variant?.item?.uom || 'pcs'}
                </div>
              </div>
            </div>

            {/* Quantity Row */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">Quantity</div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={buyModalData.quantity || 0}
                    onChange={(e) => {
                      const qty = parseFloat(e.target.value) || 0;
                      setBuyModalData(prev => ({
                        ...prev,
                        quantity: qty,
                        purchaseUnitQty: qty / prev.conversionRate,
                      }));
                    }}
                    onFocus={(e) => e.target.select()}
                    className="bg-[#1e1e1e] border border-[#3a3a38] rounded px-3 py-2 w-28 text-[#faf9f5] focus:outline-none focus:ring-1 focus:ring-[#3a3a38] focus:border-[#d97757]"
                  />
                  <span className="text-muted-foreground">{buyIngredient.variant?.item?.uom || 'pcs'}</span>
                </div>
              </div>
              <span className="text-muted-foreground/30 text-lg mt-5">=</span>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">Purchase unit quantity</div>
                <div className="flex items-center gap-2">
                  <span className="text-[#faf9f5] font-medium">
                    {buyModalData.purchaseUnitQty.toFixed(5)}
                  </span>
                  <span className="text-muted-foreground">{buyModalData.purchaseUom}</span>
                </div>
              </div>
            </div>

            {/* Supplier */}
            <div className="mb-5">
              <div className="text-xs text-muted-foreground mb-1">Supplier</div>
              <div className="font-medium text-[#faf9f5] py-2 border-b border-[#3a3a38]">
                {buyModalData.supplierName}
              </div>
            </div>

            {/* Add missing items checkbox */}
            <label className="flex items-center gap-3 mb-5 cursor-pointer">
              <input
                type="checkbox"
                checked={buyModalData.addMissingItems}
                onChange={(e) => setBuyModalData(prev => ({ ...prev, addMissingItems: e.target.checked }))}
                className="w-4 h-4 rounded border-[#3a3a38] bg-[#1e1e1e] text-[#d97757] focus:ring-[#d97757]"
              />
              <span className="text-sm text-muted-foreground">
                Add other missing items from the same supplier to the purchase order.
              </span>
            </label>

            {/* PO # and Expected Arrival */}
            <div className="flex gap-6 mb-5">
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">Purchase order #</div>
                <input
                  type="text"
                  value={buyModalData.poNumber}
                  onChange={(e) => setBuyModalData(prev => ({ ...prev, poNumber: e.target.value }))}
                  className="bg-[#1e1e1e] border border-[#3a3a38] rounded px-3 py-2 w-full text-[#faf9f5] focus:outline-none focus:ring-1 focus:ring-[#3a3a38] focus:border-[#d97757]"
                />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">Expected arrival</div>
                <input
                  type="date"
                  value={buyModalData.expectedArrival}
                  onChange={(e) => setBuyModalData(prev => ({ ...prev, expectedArrival: e.target.value }))}
                  className="bg-[#1e1e1e] border border-[#3a3a38] rounded px-3 py-2 w-full text-[#faf9f5] focus:outline-none focus:ring-1 focus:ring-[#3a3a38] focus:border-[#d97757] [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Ship to */}
            <div className="mb-8">
              <div className="text-xs text-muted-foreground mb-1">Ship to</div>
              <div className="font-medium text-[#faf9f5] py-2 border-b border-[#3a3a38]">
                {buyModalData.locationName}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowBuyModal(false);
                  setBuyIngredient(null);
                }}
                className="px-4 py-2 text-muted-foreground hover:text-[#faf9f5] hover:bg-secondary/20 rounded font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCreatePO('open')}
                className="px-4 py-2 border border-[#3a3a38] text-[#faf9f5] rounded font-medium hover:bg-secondary/20 transition"
              >
                Create and open order
              </button>
              <button
                onClick={() => handleCreatePO('close')}
                className="px-4 py-2 bg-[#d97757] text-white rounded font-medium hover:bg-[#c66a4d] transition"
              >
                Create and close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch Tracking Modal */}
      {batchModalOpen && selectedIngredientForBatch && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1a1a18] border border-[#3a3a38] text-[#faf9f5] rounded-lg w-[800px] max-h-[80vh] overflow-hidden shadow-xl">

            {/* Header */}
            <div className="px-6 py-4 border-b border-[#3a3a38] flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-[#faf9f5]">
                  Batch tracking info
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Assign batch numbers to the used ingredients
                </p>
              </div>

              {/* Status indicator */}
              {(() => {
                const totalAssigned = batchAssignments.reduce(
                  (sum, b) => sum + (parseFloat(b.quantity) || 0), 0
                );
                const required = selectedIngredientForBatch.planned_quantity || 0;
                const isComplete = totalAssigned >= required;

                return (
                  <span className={`text-sm font-medium ${isComplete ? 'text-green-500' : 'text-[#d97757]'
                    }`}>
                    {isComplete
                      ? 'All quantities assigned'
                      : `${totalAssigned.toFixed(2)} / ${required} assigned`
                    }
                  </span>
                );
              })()}
            </div>

            {/* Content */}
            <div className="px-6 py-4 overflow-auto max-h-[50vh]">
              {isLoadingBatches ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-6 h-6 border-2 border-[#3a3a38] border-t-[#d97757] rounded-full animate-spin" />
                  <span className="ml-2 text-muted-foreground">Loading batches...</span>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-[#3a3a38]">
                      <th className="pb-3 font-medium w-[140px]">Item</th>
                      <th className="pb-3 font-medium w-[100px]">Qty to assign</th>
                      <th className="pb-3 font-medium w-[160px]">Batch #</th>
                      <th className="pb-3 font-medium w-[120px]">Batch barcode</th>
                      <th className="pb-3 font-medium w-[100px]">Qty to track</th>
                      <th className="pb-3 font-medium w-[100px]">Expiration</th>
                      <th className="pb-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {batchAssignments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-muted-foreground">
                          No batches assigned. Click &quot;Add batch&quot; to assign.
                        </td>
                      </tr>
                    ) : (
                      batchAssignments.map((batch, index) => (
                        <tr key={batch.id} className="border-b border-[#3a3a38]/50">
                          {/* Item name - only show on first row */}
                          <td className="py-3 text-[#faf9f5]">
                            {index === 0 ? (
                              <span className="font-medium text-xs">
                                {selectedIngredientForBatch.item_name ||
                                  selectedIngredientForBatch.variant?.name ||
                                  selectedIngredientForBatch.variant?.item?.name ||
                                  'Unknown item'}
                              </span>
                            ) : null}
                          </td>

                          {/* Quantity to assign - only show on first row */}
                          <td className="py-3 text-muted-foreground">
                            {index === 0 ? (
                              <span className="text-xs">
                                {selectedIngredientForBatch.planned_quantity || 0} {selectedIngredientForBatch.unit_of_measure || 'pcs'}
                              </span>
                            ) : null}
                          </td>

                          {/* Batch # - dropdown or input */}
                          <td className="py-3">
                            {availableBatches.length > 0 ? (
                              <select
                                value={batch.batch_number}
                                onChange={(e) => updateBatchAssignment(index, 'batch_number', e.target.value)}
                                className="bg-[#1e1e1e] border border-[#3a3a38] rounded px-2 py-1.5 text-sm w-full text-[#faf9f5] focus:border-[#d97757] focus:ring-1 focus:ring-[#d97757] outline-none"
                              >
                                <option value="">Select batch...</option>
                                {availableBatches.map(b => (
                                  <option key={b.id} value={b.batch_number} className="bg-[#1e1e1e]">
                                    {b.batch_number} ({b.quantity_available} avail)
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="text"
                                value={batch.batch_number}
                                onChange={(e) => updateBatchAssignment(index, 'batch_number', e.target.value)}
                                placeholder="Enter batch #"
                                className="bg-[#1e1e1e] border border-[#3a3a38] rounded px-2 py-1.5 text-sm w-full text-[#faf9f5] focus:border-[#d97757] focus:ring-1 focus:ring-[#d97757] outline-none"
                              />
                            )}
                          </td>

                          {/* Batch barcode */}
                          <td className="py-3 text-muted-foreground text-xs">
                            {batch.batch_barcode || '-'}
                          </td>

                          {/* Quantity to track */}
                          <td className="py-3">
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={batch.quantity || 0}
                                onChange={(e) => updateBatchAssignment(index, 'quantity', parseFloat(e.target.value) || 0)}
                                onFocus={(e) => e.target.select()}
                                className="bg-[#1e1e1e] border border-[#3a3a38] rounded px-2 py-1.5 text-sm w-20 text-[#faf9f5] focus:border-[#d97757] focus:ring-1 focus:ring-[#d97757] outline-none"
                                min="0"
                                step="0.01"
                              />
                              <span className="text-muted-foreground text-xs">
                                {selectedIngredientForBatch.unit_of_measure || 'pcs'}
                              </span>
                            </div>
                          </td>

                          {/* Expiration */}
                          <td className="py-3 text-muted-foreground text-xs">
                            {batch.expiration_date
                              ? new Date(batch.expiration_date).toLocaleDateString()
                              : '-'
                            }
                          </td>

                          {/* Delete */}
                          <td className="py-3">
                            <button
                              onClick={() => removeBatchAssignment(index)}
                              className="text-muted-foreground hover:text-[#ff7b6f] p-1 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* Add batch button */}
              <button
                onClick={addBatchAssignment}
                className="mt-4 text-sm text-[#d97757] hover:text-[#c66a4d] font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add batch
              </button>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#3a3a38] flex justify-end gap-3 bg-[#161614]">
              <button
                onClick={() => {
                  setBatchModalOpen(false);
                  setSelectedIngredientForBatch(null);
                  setBatchAssignments([]);
                }}
                className="px-4 py-2 text-muted-foreground hover:bg-secondary/20 rounded font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveBatchAssignments}
                className="px-4 py-2 bg-[#d97757] text-white hover:bg-[#c66a4d] rounded font-medium transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* === DELETE CONFIRMATION DIALOG === */}
      <Dialog open={!!showDeleteConfirm} onOpenChange={(open) => !open && setShowDeleteConfirm(null)}>
        <DialogContent className="max-w-sm bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5]">
          <DialogHeader>
            <DialogTitle className="text-base font-medium flex items-center gap-2 text-[#faf9f5]">
              <Trash2 size={16} className="text-[#ff7b6f]" />
              Delete {showDeleteConfirm?.type === 'operation' ? 'Operation' : 'Ingredient'}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground pt-3">
              Are you sure you want to delete this {showDeleteConfirm?.type}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(null)}
              className="bg-transparent border-[#3a3a38] text-[#faf9f5] hover:bg-[#2a2a28] hover:text-[#faf9f5]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-[#ff4d4d] hover:bg-[#ff3333] text-white border-none"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DeleteConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog(prev => ({ ...prev, open }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        description={confirmDialog.description}
        actionLabel={confirmDialog.actionLabel}
      />
    </div>
  );
}
