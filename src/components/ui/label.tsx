"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  required?: boolean
  hideOption?: boolean
}

function Label({ className, required=true, hideOption=false, children, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-1 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}

      {!hideOption && required && <span className="text-red-500">*</span>}
      {!hideOption && !required && <span className="text-muted-foreground">(Optional)</span>}
    </LabelPrimitive.Root>
  )
}

export { Label }
