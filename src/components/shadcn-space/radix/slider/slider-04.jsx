"use client";

import { useState } from "react";
import NumberFlow from "@number-flow/react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

function SliderModern({ label, value, onChange, min = 0, max = 100, step = 0.1, unit = "", format = { minimumFractionDigits: 1, maximumFractionDigits: 1 } }) {
  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center justify-between">
        <p className="font-mono text-sm uppercase tracking-wider text-foreground">
          {label}
        </p>
        <div className="text-sm font-bold font-mono text-[#3B82F6] dark:text-[#00FF99]">
          <NumberFlow
            value={value[0]}
            format={format} />
          {unit && <span className="ml-0.5">{unit}</span>}
        </div>
      </div>
      <Slider
        className={cn(
          "h-6",
          "**:data-[slot=slider-track]:h-4 **:data-[slot=slider-track]:rounded-none **:data-[slot=slider-track]:border-2 **:data-[slot=slider-track]:border-black dark:**:data-[slot=slider-track]:border-white **:data-[slot=slider-track]:bg-white dark:**:data-[slot=slider-track]:bg-[#131313]",
          "**:data-[slot=slider-range]:h-full **:data-[slot=slider-range]:bg-[#3B82F6] dark:**:data-[slot=slider-range]:bg-[#00FF99]",
          "**:data-[slot=slider-thumb]:h-6 **:data-[slot=slider-thumb]:w-4 **:data-[slot=slider-thumb]:rounded-none **:data-[slot=slider-thumb]:border-2 **:data-[slot=slider-thumb]:border-black dark:**:data-[slot=slider-thumb]:border-white **:data-[slot=slider-thumb]:bg-white **:data-[slot=slider-thumb]:cursor-ew-resize **:data-[slot=slider-thumb]:ring-0"
        )}
        value={value}
        onValueChange={onChange}
        min={min}
        max={max}
        step={step}
        aria-label={label} />
    </div>
  );
}

export default SliderModern;
