'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useSound from "use-sound";

export default function FloatingButton({ icon, label, onClick, className, tooltipSide = 'bottom', delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopped, setIsPopped] = useState(false);
  const [playPop] = useSound('/assets/pop.mp3', { volume: 0.5 })

  const handleClick = (e) => {
    if (isPopped) return;
    playPop()
    setIsPopped(true);
    setIsHovered(false)

    // Beri jeda 300ms agar animasi pecah terlihat sebelum pindah rute/aksi
    setTimeout(() => {
      if (onClick) onClick(e);
    }, 300);

    // Tiup ulang balon setelah 1.5 detik (Berguna jika aksi tidak berpindah halaman seperti download PDF)
    setTimeout(() => {
      setIsPopped(false);
    }, 1500);
  };

  // Array untuk 8 partikel ledakan
  const particles = Array.from({ length: 8 });

  return (
    <motion.div
      animate={{ y: isPopped ? 0 : [0, -20, 0], x: isPopped ? 0 : [0, -10, 0] }}
      transition={{ duration: 4, repeat: isPopped ? 0 : Infinity, ease: "easeInOut", delay: delay }}
      className={`absolute z-50 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14">
        <AnimatePresence>
          {!isPopped && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.15, ease: "easeOut" } }}
              whileHover={{ scale: 1.15, rotate: tooltipSide === 'bottom' ? 8 : -8 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClick}
              className="absolute inset-0 group flex items-center justify-center rounded-full bg-[#3b82f6] shadow-[inset_-2px_-4px_6px_rgba(0,0,0,0.2),0px_8px_16px_rgba(59,130,246,0.5)] cursor-pointer text-white transition-colors hover:bg-blue-400 z-10"
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
          )}
        </AnimatePresence>

        {/* Pop Particles */}
        {isPopped && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {particles.map((_, i) => {
              const angle = (i / particles.length) * 360;
              const radius = 50; // Jarak pancaran partikel
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{
                    x: Math.cos((angle * Math.PI) / 180) * radius,
                    y: Math.sin((angle * Math.PI) / 180) * radius,
                    scale: 0,
                    opacity: 0
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-400"
                />
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isHovered && !isPopped && (
          <motion.div
            initial={{ opacity: 0, y: tooltipSide === 'bottom' ? -10 : 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: tooltipSide === 'bottom' ? -10 : 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-neutral-700 bg-[#120F17] px-3 py-1.5 mt-4 text-xs font-semibold text-white shadow-xl ${tooltipSide === 'bottom' ? 'top-[calc(100%+65px)]' : 'bottom-[calc(100%+25px)]'
              }`}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
