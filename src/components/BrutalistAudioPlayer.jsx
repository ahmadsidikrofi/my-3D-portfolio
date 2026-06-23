import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SkipBack, Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useAudioContext } from '@/context/AudioContext';

export default function BrutalistAudioPlayer() {
  const { isPlaying, currentTrackIndex, volume, setVolume, togglePlay, skipForward, skipBack, tracks } = useAudioContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);



  return (
    <>
      <motion.div
        className="fixed bottom-8 left-8 z-50 flex items-center h-14 bg-white dark:bg-[#0a0a0a] border-4 border-black dark:border-white rounded-none shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff] overflow-hidden font-mono text-black dark:text-white"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => { setIsExpanded(false); setIsVolumeVisible(false); }}
        whileHover={{ y: -4 }}
        initial={{ width: '60px' }}
        animate={{ width: isExpanded ? 'auto' : '60px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Brutalist Album Orb / Vinyl (Kiri) */}
        <div className="w-12 h-full flex-shrink-0 bg-black dark:bg-white flex items-center justify-center border-r-4 border-black dark:border-white">
          <div className={cn(
            "w-8 h-8 rounded-full border-2 border-white dark:border-black flex items-center justify-center bg-zinc-800",
            isPlaying && "animate-[spin_6s_linear_infinite]"
          )}>
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>

        {/* Content Expanded Area (Kanan) */}
        <motion.div
          animate={{ opacity: isExpanded ? 1 : 0 }}
          className="flex items-center gap-4 px-4 whitespace-nowrap h-full"
        >
          {/* Track Info */}
          <span className="text-xs font-black tracking-wider uppercase truncate max-w-[120px] sm:max-w-[200px]">
            NOW PLAYING: {tracks[currentTrackIndex].title}
          </span>

          {/* Controls Grid */}
          <div className="flex items-center gap-1 border-l-4 border-black dark:border-white pl-4 h-full">
            <button onClick={skipBack} className="p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors focus:outline-none">
              <SkipBack className="w-4 h-4" strokeWidth={3} />
            </button>
            <button onClick={togglePlay} className="p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors focus:outline-none">
              {isPlaying ? <Pause className="w-4 h-4" strokeWidth={3} /> : <Play className="w-4 h-4" strokeWidth={3} />}
            </button>
            <button onClick={skipForward} className="p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors focus:outline-none">
              <SkipForward className="w-4 h-4" strokeWidth={3} />
            </button>
          </div>

          {/* Hidden Volume Trigger & Slider */}
          <div
            className="flex items-center border-l-4 border-black dark:border-white pl-4 pr-2 h-full"
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
