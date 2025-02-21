"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext<{
  value: string | undefined
  onValueChange: (value: string) => void
}>({ value: undefined, onValueChange: () => {} })

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: string; onValueChange?: (value: string) => void }
>(({ className, value, onValueChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(value)

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)
    },
    [onValueChange],
  )

  React.useEffect(() => {
    setInternalValue(value)
  }, [value])

  return (
    <RadioGroupContext.Provider value={{ value: internalValue, onValueChange: handleValueChange }}>
      <div ref={ref} className={cn("space-y-1", className)} {...props} />
    </RadioGroupContext.Provider>
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & { value: string }
>(({ className, value, ...props }, ref) => {
  const { value: groupValue, onValueChange } = React.useContext(RadioGroupContext)
  const isChecked = value === groupValue

  const handleChange = () => {
    onValueChange(value)
  }

  return (
    <label className={cn("flex cursor-pointer items-center gap-3 rounded-lg p-3", className)}>
      <input ref={ref} type="radio" className="sr-only" checked={isChecked} onChange={handleChange} {...props} />
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full border border-primary",
          isChecked ? "bg-primary" : "bg-background",
        )}
      >
        {isChecked && <Check className="h-3 w-3 text-primary-foreground" />}
      </div>
      <span className={cn("text-sm font-medium", isChecked ? "text-primary" : "text-muted-foreground")}>
        {props.children}
      </span>
    </label>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, checked, ...props }, ref) => (
    <label className={cn("flex cursor-pointer items-center gap-3 rounded-lg p-3", className)}>
      <input ref={ref} type="checkbox" className="sr-only" checked={checked} {...props} />
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded border border-primary",
          checked ? "bg-primary" : "bg-background",
        )}
      >
        {checked && <Check className="h-3 w-3 text-primary-foreground" />}
      </div>
      <span className={cn("text-sm font-medium", checked ? "text-primary" : "text-muted-foreground")}>
        {props.children}
      </span>
    </label>
  ),
)
Checkbox.displayName = "Checkbox"

export { Checkbox, RadioGroup, RadioGroupItem }

