'use client';

import * as React from "react"
import { Check, Plus, Search, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option {
  label: string
  value: string
}

interface CreatableComboboxProps {
  options: Option[]
  value?: string
  onChange: (value: string) => void
  onCreate?: (value: string) => Promise<void>
  placeholder?: string
  emptyText?: string
  className?: string
  hideIcon?: boolean
}

export function CreatableCombobox({
  options = [],
  value,
  onChange,
  onCreate,
  placeholder = "Select...",
  emptyText = "No results found",
  className,
  hideIcon = false
}: CreatableComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [dropdownPosition, setDropdownPosition] = React.useState<{ top: number, left: number } | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Handle opening with position calculation
  const handleOpen = () => {
    if (!open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left
      })
      setOpen(true)
    } else {
      setOpen(false)
      setDropdownPosition(null)
    }
  }

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
        setDropdownPosition(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search input when opened
  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  // Filter options based on search
  const filteredOptions = options.filter(opt =>
    opt.label?.toLowerCase().includes(search.toLowerCase()) ||
    opt.value?.toLowerCase().includes(search.toLowerCase())
  )

  // Check if exact match exists
  const exactMatch = options.find(opt => opt.label?.toLowerCase() === search?.toLowerCase())

  // Get selected option
  const selectedOption = options.find(opt => opt.value === value)

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue)
    setOpen(false)
    setSearch('')
    setDropdownPosition(null)
  }

  const handleCreate = async () => {
    if (onCreate && search.trim()) {
      await onCreate(search.trim())
      onChange(search.trim())
      setOpen(false)
      setSearch('')
      setDropdownPosition(null)
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        className={cn(
          "w-full text-left flex items-center justify-between bg-transparent text-sm group",
          "hover:text-foreground transition-colors",
          className
        )}
      >
        <span className={cn(
          "truncate",
          value ? "text-foreground" : "text-muted-foreground"
        )}>
          {value ? (selectedOption?.label || value) : placeholder}
        </span>
        {!hideIcon && (
          <ChevronDown className="w-3 h-3 text-[#7a7974] group-hover:text-foreground transition-colors shrink-0 ml-1" />
        )}
      </button>

      {/* Dropdown Popup - Fixed positioning to escape overflow:hidden containers */}
      {open && dropdownPosition && (
        <div
          className={cn(
            "fixed z-[9999] bg-[#1f1f1d] border border-[#3a3a38] rounded-lg shadow-2xl w-[320px] max-h-[350px] flex flex-col overflow-hidden"
          )}
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
        >
          {/* Search Input */}
          <div className="p-1.5 border-b border-[#3a3a38]/50">
            <div className="flex items-center gap-2 px-2 py-1 bg-[#2a2a28] rounded border border-[#3a3a38] focus-within:border-[#5a5a58] transition-colors">
              <Search className="w-3 h-3 text-[#7a7974]" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeholder}
                className="bg-transparent text-white text-xs outline-none flex-1 placeholder-[#5a5a58]"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden py-1 px-1 scrollbar-hide max-h-[300px]">
            {filteredOptions.length === 0 && !(onCreate && search.trim() && !exactMatch) ? (
              <div className="px-4 py-3 text-[#5a5a58] text-sm">
                {emptyText}
              </div>
            ) : (
              filteredOptions.map((option, idx) => (
                <button
                  key={`${option.value}-${idx}`}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full px-3 py-1.5 text-left flex items-center gap-2 rounded-md transition-colors mb-0.5 last:mb-0",
                    option.value === value ? "bg-[#2a2a28] text-white" : "hover:bg-[#2a2a28]/60 text-[#bebebe] hover:text-white"
                  )}
                >
                  {/* Option content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] truncate">
                      {option.label}
                    </div>
                  </div>
                  {/* Checkmark for selected option */}
                  {option.value === value && (
                    <Check className="w-3.5 h-3.5 text-white flex-shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>

          {/* Create Option - AT BOTTOM, only when no exact match */}
          {onCreate && search.trim() && !exactMatch && (
            <div className="border-t border-[#3a3a38]">
              <button
                type="button"
                onClick={handleCreate}
                className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-[#2a2a28]/60 transition"
              >
                <Plus className="w-4 h-4 text-[#d97757]" />
                <span className="text-[#d97757] text-sm">
                  Create "{search.trim()}"
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
