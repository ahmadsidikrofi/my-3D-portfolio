'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SliderModern from './shadcn-space/radix/slider/slider-04';
import { useAudioContext } from '@/context/AudioContext';

const DreamyAudioPlayer = () => {
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

  const handleVolumeChange = (newVolumeArr) => {
    setVolume(newVolumeArr[0] / 100);
  };

  return (
    <motion.div
      className={`fixed bottom-8 left-8 z-50 flex items-center overflow-hidden h-16 bg-white/30 backdrop-blur-md border border-white/50 rounded-full shadow-[0_8px_32px_rgba(0,150,255,0.15)] ${isMobile ? 'cursor-pointer' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={isMobile ? handleClick : undefined}
      whileHover={{ y: -4, scale: 1.02 }}
      animate={{ width: isExpanded ? 'auto' : '64px' }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Vinyl Disc (Bagian Kiri) */}
      <div className={`w-12 h-12 ml-2 flex-shrink-0 rounded-full overflow-hidden border-2 border-white/40 shadow-sm ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
        <img src="/assets/images/vinyl.png" alt="Vinyl" className="w-full h-full object-cover" />
      </div>

      {/* Expandable Content (Judul & Kontrol Utama) */}
      <motion.div
        animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
        transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
        className="whitespace-nowrap flex items-center h-full px-2 sm:px-4"
      >
        {/* Track Info & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-center border-l border-white/30 max-sm:pl-3 max-sm:pr-6  h-full">

          {/* Track Info */}
          <div className="flex flex-col justify-center w-full">
            <span className="text-xs sm:text-sm font-bold text-blue-900/90 max-w-[120px] truncate select-none leading-tight">
              {tracks[currentTrackIndex].title}
            </span>
            <span className="hidden sm:block text-[10px] uppercase font-mono tracking-wider text-blue-800/60 select-none mt-[2px]">
              {isPlaying ? 'Now Playing' : 'Paused'}
            </span>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-center gap-3 mt-1 sm:mt-0 sm:ml-4 sm:border-l sm:border-white/30 sm:pl-4">
            <button
              onClick={(e) => { e.stopPropagation(); skipBack(); }}
              className="text-blue-800/80 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <SkipBack size={14} fill="currentColor" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="text-blue-800/80 hover:text-blue-600 transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <Pause size={16} fill="currentColor" />
              ) : (
                <Play size={16} fill="currentColor" />
              )}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); skipForward(); }}
              className="text-blue-800/80 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <SkipForward size={14} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Volume Control - Hidden on Mobile */}
        <div
          className="hidden sm:flex items-center h-full border-l border-white/30 pl-4 ml-4 relative"
          onMouseEnter={() => setIsVolumeVisible(true)}
          onMouseLeave={() => setIsVolumeVisible(false)}
        >
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-blue-800/80 hover:bg-white/50 hover:text-blue-600 transition-colors">
            <Volume2 size={16} />
          </button>

          <motion.div
            animate={{ width: isVolumeVisible ? '140px' : 0, opacity: isVolumeVisible ? 1 : 0 }}
            className="overflow-hidden flex items-center h-full ml-2"
          >
            {/* Scale down the bulky slider slightly so it fits inside the 64px tall container nicely */}
            <div className="w-[140px] origin-left scale-75 flex items-center justify-center">
              <SliderModern
                value={[volume * 100]}
                onChange={handleVolumeChange}
                min={0} max={100} step={1}
                label=""
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DreamyAudioPlayer;
