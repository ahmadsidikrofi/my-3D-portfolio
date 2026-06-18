'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function FloatingButton({ icon, label, onClick, className, tooltipSide = 'bottom', delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay }}
      className={`absolute z-50 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        whileHover={{ scale: 1.15, rotate: tooltipSide === 'bottom' ? 8 : -8 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#3b82f6] shadow-[inset_-2px_-4px_6px_rgba(0,0,0,0.2),0px_8px_16px_rgba(59,130,246,0.5)] cursor-pointer text-white transition-colors hover:bg-blue-400 z-10"
        aria-label={label}
      >
        {/* Konten Icon */}
        <span className="relative z-10">{icon}</span>

        {/* Simpul balon (Balloon Knot) */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#3b82f6] group-hover:bg-blue-400 transition-colors rounded-[2px] rotate-45 -z-10" />

        {/* Tali Balon / Wavy String */}
        <svg 
          width="16" 
          height="50" 
          viewBox="0 0 16 50" 
          className="absolute top-full left-1/2 -translate-x-1/2 -z-20 mt-1 pointer-events-none"
        >
          <motion.path 
            animate={{ 
              d: [
                "M8,0 C16,15 0,30 8,40 C16,45 0,50 8,50",
                "M8,0 C0,15 16,30 8,40 C0,45 16,50 8,50",
                "M8,0 C16,15 0,30 8,40 C16,45 0,50 8,50"
              ] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay }}
            fill="none" 
            stroke="rgba(255,255,255,0.6)" 
            strokeWidth="1.5"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: tooltipSide === 'bottom' ? -10 : 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: tooltipSide === 'bottom' ? -10 : 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-neutral-700 bg-[#120F17] px-3 py-1.5 text-xs font-semibold text-white shadow-xl ${
              tooltipSide === 'bottom' ? 'top-[calc(100%+55px)]' : 'bottom-[calc(100%+15px)]'
            }`}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
