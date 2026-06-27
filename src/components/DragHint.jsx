'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, HandGrab } from 'lucide-react';

function HandGrabber() {
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    // Ganti ikon Hand menjadi HandGrab setiap 800ms
    const interval = setInterval(() => {
      setIsGrabbing((prev) => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-neutral-800 drop-shadow-lg">
      {isGrabbing ? <HandGrab size={36} strokeWidth={2.5} /> : <Hand size={36} strokeWidth={2.5} />}
    </div>
  );
}

export default function DragHint({ isRotating }) {
  const [showHint, setShowHint] = useState(false);
  const idleTimerRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      setShowHint(false);
      clearTimeout(idleTimerRef.current);

      // Jika user sedang aktif melakukan drag/rotasi, matikan timer
      if (isRotating) return;

      // Munculkan hint jika diam selama 3 detik
      idleTimerRef.current = setTimeout(() => {
        setShowHint(true);
      }, 3000);
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Jalankan pertama kali saat komponen di-mount
    resetTimer();

    // Dengarkan semua interaksi user
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      clearTimeout(idleTimerRef.current);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [isRotating]);

  return (
    <AnimatePresence>
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-[25%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-40"
        >
          {/* Animasi tangan yang bergerak ke kiri dan ke kanan */}
          <motion.div
            animate={{ x: [-15, 15, -15] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <HandGrabber />
          </motion.div>

          <span className="text-xs sm:text-sm font-black font-mono tracking-widest text-neutral-800 uppercase drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm border border-white/40">
            Click & Drag to Explore
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
