'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

const tracks = [
  { title: 'Chill', src: '/assets/sakura.mp3' },
  { title: 'Medieval Cobblestone Village', src: '/assets/medieval_cobblestone_village.mp3' },
  { title: 'Interstellar', src: '/assets/interstellar.mp3' }
];

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(console.error);
    }
  }, [currentTrackIndex, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const skipBack = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentTrackIndex,
        volume,
        setVolume,
        togglePlay,
        skipForward,
        skipBack,
        tracks
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex].src}
        onEnded={skipForward}
      />
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);
