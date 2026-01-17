'use client';

import * as React from "react"
import { Check, Plus, Search } from "lucide-react"
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
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
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
  }

  const handleCreate = async () => {
    if (onCreate && search.trim()) {
      await onCreate(search.trim())
      onChange(search.trim())
      setOpen(false)
      setSearch('')
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full text-left flex items-center h-9 px-3 rounded-md border border-input bg-transparent text-sm",
          "hover:bg-accent hover:text-accent-foreground",
          className
        )}
      >
        {value ? (
          <span className="text-foreground">{selectedOption?.label || value}</span>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </button>

      {/* Dropdown Popup */}
      {open && (
        <div className="fixed z-[9999] bg-[#1f1f1d] border border-gray-600 rounded-lg shadow-2xl w-[400px] max-h-[400px] flex flex-col" style={{ top: containerRef.current ? containerRef.current.getBoundingClientRect().bottom + 8 : 0, left: containerRef.current ? containerRef.current.getBoundingClientRect().left : 0 }}>
          {/* Search Input */}
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2a28] rounded border border-gray-600 focus-within:border-[#3a3a38]">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeholder}
                className="bg-transparent text-white text-sm outline-none flex-1 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="flex-1 overflow-y-auto py-1 max-h-[300px]">
            {filteredOptions.length === 0 && !(onCreate && search.trim() && !exactMatch) ? (
              <div className="px-4 py-3 text-gray-500 text-sm">
                {emptyText}
              </div>
            ) : (
              filteredOptions.map((option, idx) => (
                <button
                  key={`${option.value}-${idx}`}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full px-4 py-2 text-left flex items-center gap-2",
                    "hover:bg-gray-700/50 transition",
                    option.value === value ? 'bg-gray-700/30' : ''
                  )}
                >
                  {/* Option content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm truncate">
                      {option.label}
                    </div>
                  </div>
                  {/* Checkmark for selected option */}
                  {option.value === value && (
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>

          {/* Create Option - AT BOTTOM, only when no exact match */}
          {onCreate && search.trim() && !exactMatch && (
            <div className="border-t border-gray-700">
              <button
                type="button"
                onClick={handleCreate}
                className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-gray-700/50 transition"
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
