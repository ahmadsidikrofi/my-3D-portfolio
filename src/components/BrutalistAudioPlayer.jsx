import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SkipBack, Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useAudioContext } from '@/context/AudioContext';

export default function BrutalistAudioPlayer() {
  const { isPlaying, currentTrackIndex, volume, setVolume, togglePlay, skipForward, skipBack, tracks } = useAudioContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 639px)').matches);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => { if (!isMobile) setIsExpanded(true); };
  const handleMouseLeave = () => { if (!isMobile) { setIsExpanded(false); setIsVolumeVisible(false); } };
  const handleClick = () => { if (isMobile) setIsExpanded(!isExpanded); };

  return (
    <>
      <motion.div
        className={cn(
          "fixed bottom-8 left-8 z-50 flex items-center h-16 bg-white dark:bg-[#0a0a0a] border-4 border-black dark:border-white rounded-none shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff] overflow-hidden font-mono text-black dark:text-white",
          isMobile ? "cursor-pointer" : ""
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={isMobile ? handleClick : undefined}
        whileHover={{ y: -4 }}
        initial={{ width: '64px' }}
        animate={{ width: isExpanded ? 'auto' : '64px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Brutalist Album Orb / Vinyl (Kiri) */}
        <div className="w-16 h-full flex-shrink-0 bg-black dark:bg-white flex items-center justify-center border-r-4 border-black dark:border-white">
          <div className={cn(
            "w-10 h-10 rounded-full border-2 border-white dark:border-black overflow-hidden bg-zinc-800",
            isPlaying && "animate-[spin_4s_linear_infinite]"
          )}>
            <img src="/assets/images/vinyl.png" alt="Vinyl" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Content Expanded Area (Kanan) */}
        <motion.div
          animate={{ opacity: isExpanded ? 1 : 0 }}
          className="flex items-center h-full sm:px-2 whitespace-nowrap overflow-hidden"
        >
          {/* Track Info & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-center pl-3 pr-4 sm:pr-0 sm:pl-4 h-full">
            
            {/* Track Info */}
            <div className="flex flex-col justify-center w-full">
              <span className="text-xs sm:text-sm font-black tracking-wider uppercase truncate max-w-[120px] sm:max-w-[180px] leading-tight">
                {tracks[currentTrackIndex].title}
              </span>
              <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest mt-[2px] opacity-70">
                {isPlaying ? 'PLAYING' : 'PAUSED'}
              </span>
            </div>

            {/* Audio Controls */}
            <div className="flex items-center justify-center gap-3 mt-1 sm:mt-0 sm:ml-4 sm:border-l-4 sm:border-black sm:dark:border-white sm:pl-4">
              <button onClick={(e) => { e.stopPropagation(); skipBack(); }} className="p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors focus:outline-none">
                <SkipBack className="w-4 h-4" strokeWidth={3} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors focus:outline-none">
                {isPlaying ? <Pause className="w-4 h-4" strokeWidth={3} /> : <Play className="w-4 h-4" strokeWidth={3} />}
              </button>
              <button onClick={(e) => { e.stopPropagation(); skipForward(); }} className="p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors focus:outline-none">
                <SkipForward className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Hidden Volume Trigger & Slider - Desktop Only */}
          <div
            className="hidden sm:flex items-center border-l-4 border-black dark:border-white pl-4 pr-2 ml-4 h-full"
            onMouseEnter={() => setIsVolumeVisible(true)}
          >
            <Volume2 className="w-5 h-5 cursor-pointer hover:opacity-70" strokeWidth={2.5} />
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isVolumeVisible ? '80px' : '0px', opacity: isVolumeVisible ? 1 : 0 }}
              className="overflow-hidden ml-3 flex items-center h-full"
            >
              <div className="w-[70px] flex items-center">
                <Slider
                  className={cn(
                    "h-6",
                    "**:data-[slot=slider-track]:h-3 **:data-[slot=slider-track]:rounded-none **:data-[slot=slider-track]:border-2 **:data-[slot=slider-track]:border-black dark:**:data-[slot=slider-track]:border-white **:data-[slot=slider-track]:bg-white dark:**:data-[slot=slider-track]:bg-[#131313]",
                    "**:data-[slot=slider-range]:h-full **:data-[slot=slider-range]:bg-black dark:**:data-[slot=slider-range]:bg-white **:data-[slot=slider-range]:rounded-none",
                    "**:data-[slot=slider-thumb]:h-5 **:data-[slot=slider-thumb]:w-3 **:data-[slot=slider-thumb]:rounded-none **:data-[slot=slider-thumb]:border-2 **:data-[slot=slider-thumb]:border-black dark:**:data-[slot=slider-thumb]:border-white **:data-[slot=slider-thumb]:bg-white **:data-[slot=slider-thumb]:cursor-ew-resize **:data-[slot=slider-thumb]:ring-0"
                  )}
                  value={[volume]}
                  onValueChange={(val) => setVolume(val[0])}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
