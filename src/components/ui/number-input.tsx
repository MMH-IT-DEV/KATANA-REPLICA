import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  suffix?: string
  className?: string
}

export function NumberInput({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  suffix,
  className,
  ...props
}: NumberInputProps) {
  const handleIncrement = () => {
    if (max !== undefined && value + step > max) return
    onChange(Number((value + step).toFixed(2))) // Fix precision issues
  }

  const handleDecrement = () => {
    if (min !== undefined && value - step < min) return
    onChange(Number((value - step).toFixed(2)))
  }

  return (
    <div className="flex items-center justify-end gap-1 relative group/input">
      <Input
        type="number"
        className={cn(
          "h-7 text-right bg-transparent border-0 p-1 pr-5 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none hover:bg-secondary/10 rounded-sm font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          className
        )}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                handleIncrement();
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                handleDecrement();
            }
        }}
        {...props}
      />
      <div className="absolute right-6 top-0 bottom-0 flex flex-col opacity-0 group-hover/input:opacity-100 transition-opacity border-l border-transparent group-hover/input:border-border/50">
        <button 
            type="button"
            className="h-3.5 px-0.5 text-[6px] hover:bg-secondary/50 text-muted-foreground leading-none flex items-center justify-center" 
            onClick={handleIncrement}
            tabIndex={-1}
        >
            ▲
        </button>
        <button 
            type="button"
            className="h-3.5 px-0.5 text-[6px] hover:bg-secondary/50 text-muted-foreground leading-none flex items-center justify-center" 
            onClick={handleDecrement}
            tabIndex={-1}
        >
            ▼
        </button>
      </div>
      {suffix && (
        <span className="text-[10px] whitespace-nowrap text-muted-foreground select-none">{suffix}</span>
      )}
    </div>
  )
}

















