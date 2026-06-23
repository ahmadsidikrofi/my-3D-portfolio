'use client';

import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import SliderModern from './shadcn-space/radix/slider/slider-04';
import { useAudioContext } from '@/context/AudioContext';

const DreamyAudioPlayer = () => {
  const { isPlaying, currentTrackIndex, volume, setVolume, togglePlay, skipForward, skipBack, tracks } = useAudioContext();

  // Expandable State
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  const handleVolumeChange = (newVolumeArr) => {
    setVolume(newVolumeArr[0] / 100);
  };

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50 flex items-center overflow-hidden h-16 bg-white/30 backdrop-blur-md border border-white/50 rounded-full shadow-[0_8px_32px_rgba(0,150,255,0.15)]"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => { setIsExpanded(false); setIsVolumeVisible(false); }}
      whileHover={{ y: -4, scale: 1.02 }}
      animate={{ width: isExpanded ? 'auto' : '64px' }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >



      {/* Dynamic Album Orb (Bagian Kiri) */}
      <div className={`w-12 h-12 ml-2 rounded-full bg-gradient-to-tr from-[#3B82F6] to-white/20 flex items-center justify-center shadow-inner flex-shrink-0 ${isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''}`}>
        <div className="w-2 h-2 bg-white/80 rounded-full shadow-sm" />
      </div>

      {/* Expandable Content (Judul & Kontrol Utama) */}
      <motion.div
        animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
        transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
        className="whitespace-nowrap flex items-center gap-4 px-4 h-full"
      >
        {/* Track Info */}
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold text-blue-900/90 max-w-[120px] truncate select-none leading-tight">
            {tracks[currentTrackIndex].title}
          </span>
          <span className="text-[10px] uppercase font-mono tracking-wider text-blue-800/60 select-none">
            {isPlaying ? 'Now Playing' : 'Paused'}
          </span>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-1 border-l border-white/30 pl-4">
          <button
            onClick={skipBack}
            className="w-8 h-8 flex items-center justify-center rounded-full text-blue-800/80 hover:bg-white/50 hover:text-blue-600 transition-colors"
          >
            <SkipBack size={16} fill="currentColor" />
          </button>
          <button
            onClick={togglePlay}
            className="w-8 h-8 flex items-center justify-center rounded-full text-blue-800/80 hover:bg-white/50 hover:text-blue-600 transition-colors"
          >
            {isPlaying ? (
              <Pause size={16} fill="currentColor" />
            ) : (
              <Play size={16} fill="currentColor" />
            )}
          </button>
          <button
            onClick={skipForward}
            className="w-8 h-8 flex items-center justify-center rounded-full text-blue-800/80 hover:bg-white/50 hover:text-blue-600 transition-colors"
          >
            <SkipForward size={16} fill="currentColor" />
          </button>
        </div>

        {/* Volume Control */}
        <div
          className="flex items-center h-full border-l border-white/30 pl-4 relative"
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
