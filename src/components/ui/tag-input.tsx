import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface TagInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onTagsChange?: (tags: string[]) => void
}

export function TagInput({ value, onChange, onTagsChange, className, ...props }: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("")
  const [tags, setTags] = React.useState<string[]>([])

  // Parse value prop into tags array
  const parseValue = (val: string | undefined | null): string[] => {
    if (!val) return []
    return val.split(',').map(t => t.trim()).filter(Boolean)
  }

  // Sync internal tags state when value prop changes from parent
  React.useEffect(() => {
    setTags(parseValue(value))
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault()
      const addedTags = inputValue.split(',').map(t => t.trim()).filter(Boolean)
      const newTags = [...tags, ...addedTags]
      onTagsChange?.(newTags)
      setInputValue("")
      const syntheticEvent = {
        target: { value: newTags.join(', ') }
      } as React.ChangeEvent<HTMLInputElement>
      onChange?.(syntheticEvent)
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      const newTags = tags.slice(0, -1)
      onTagsChange?.(newTags)
      const syntheticEvent = {
        target: { value: newTags.join(', ') }
      } as React.ChangeEvent<HTMLInputElement>
      onChange?.(syntheticEvent)
    }
  }

  const handleBlur = () => {
    if (inputValue.trim()) {
      const addedTags = inputValue.split(',').map(t => t.trim()).filter(Boolean)
      const newTags = [...tags, ...addedTags]
      onTagsChange?.(newTags)
      setInputValue("")
      const syntheticEvent = {
        target: { value: newTags.join(', ') }
      } as React.ChangeEvent<HTMLInputElement>
      onChange?.(syntheticEvent)
    }
  }

  const removeTag = (index: number) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    onTagsChange?.(newTags)
    const syntheticEvent = {
      target: { value: newTags.join(', ') }
    } as React.ChangeEvent<HTMLInputElement>
    onChange?.(syntheticEvent)
  }

  return (
    <div className={cn("flex flex-wrap gap-1.5 p-1.5 min-h-[36px] border border-[#3a3a38] rounded-md bg-[#1a1a18] focus-within:border-[#d97757] focus-within:ring-1 focus-within:ring-[#d97757] transition-all", className)}>
      {tags.map((tag, i) => (
        <span key={i} className="flex items-center gap-1.5 text-[12px] font-medium bg-[#30302e] text-[#faf9f5] pl-2.5 pr-1.5 py-0.5 rounded transition-colors group/tag">
          {tag}
          <button
            type="button"
            onClick={() => removeTag(i)}
            className="text-[#bebcb3] hover:text-[#faf9f5] flex items-center justify-center rounded-sm hover:bg-white/10 p-0.5"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        </span>
      ))}
      <input
        {...props}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="flex-1 bg-transparent outline-none text-sm min-w-[60px] h-6 text-[#faf9f5] placeholder:text-[#bebcb3]/50"
      />
    </div>
  )
}








