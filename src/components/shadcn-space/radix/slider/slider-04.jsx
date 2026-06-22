"use client";

import { useState } from "react";
import NumberFlow from "@number-flow/react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

function SliderModern({ value, onChange, min = 0, max = 100, step = 0.1, label = "Volume" }) {
  return (
    <div className="w-full flex flex-col gap-1 max-w-sm mx-auto">
      <div className="flex items-center justify-between text-sm text-foreground">
        <p className="font-semibold tracking-tight">
          {label}
        </p>
      </div>

      <Slider
        className={cn(
          "w-full h-10",
          "**:data-[slot=slider-track]:h-8 **:data-[slot=slider-track]:rounded-xl **:data-[slot=slider-track]:border **:data-[slot=slider-track]:border-border **:data-[slot=slider-track]:bg-muted **:data-[slot=slider-track]:shadow-[0_1px_2px_0px_rgba(0,0,0,0.1)] **:data-[slot=slider-track]:ring-1 **:data-[slot=slider-track]:ring-background **:data-[slot=slider-track]:ring-inset",
          "**:data-[slot=slider-range]:h-full **:data-[slot=slider-range]:ml-0.5 **:data-[slot=slider-range]:mr-0.5 **:data-[slot=slider-range]:overflow-hidden **:data-[slot=slider-range]:rounded-lg **:data-[slot=slider-range]:border **:data-[slot=slider-range]:border-border **:data-[slot=slider-range]:bg-foreground **:data-[slot=slider-range]:shadow-xs",
          "**:data-[slot=slider-thumb]:h-5 **:data-[slot=slider-thumb]:w-[3px] **:data-[slot=slider-thumb]:rounded-xl **:data-[slot=slider-thumb]:border-0 **:data-[slot=slider-thumb]:bg-muted **:data-[slot=slider-thumb]:shadow-none **:data-[slot=slider-thumb]:cursor-ew-resize **:data-[slot=slider-thumb]:transform-[translateX(-8px)] **:data-[slot=slider-thumb]:ring-0"
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

