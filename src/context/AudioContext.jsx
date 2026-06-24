'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

const tracks = [
  { title: 'Medieval Cobblestone Village', src: '/assets/medieval_cobblestone_village.mp3' },
  { title: 'The Voice in My Heart', src: '/assets/the_voice_in_my_heart.mp3' },
  { title: 'Chill', src: '/assets/sakura.mp3' },
  { title: 'Interstellar', src: '/assets/interstellar.mp3' },
  { title: 'Stranger Things (Main Theme)', src: '/assets/stranger_things.mp3' },
  { title: 'Study LoFi', src: '/assets/study_lofi.mp3' },
  { title: 'Montagem Pegadora', src: '/assets/montagem_pegadora.mp3' },
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
      audioRef.current.play().catch(console.error)
    }
  }, [currentTrackIndex, isPlaying]);

  // Autoplay on mount, with a fallback to start playback on first user interaction if blocked
  useEffect(() => {
    let cleanupInteraction = null;

    const attemptAutoplay = async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Autoplay was blocked by the browser. Audio will play upon first interaction.", error);

        const startOnInteraction = async () => {
          try {
            if (audioRef.current) {
              await audioRef.current.play();
              setIsPlaying(true);
            }
            removeListeners();
          } catch (err) {
            console.error("Playback on interaction failed:", err);
          }
        };

        const removeListeners = () => {
          window.removeEventListener('click', startOnInteraction);
          window.removeEventListener('keydown', startOnInteraction);
          window.removeEventListener('touchstart', startOnInteraction);
        };

        window.addEventListener('click', startOnInteraction);
        window.addEventListener('keydown', startOnInteraction);
        window.addEventListener('touchstart', startOnInteraction);

        cleanupInteraction = removeListeners;
      }
    };

    attemptAutoplay();

    return () => {
      if (cleanupInteraction) {
        cleanupInteraction();
      }
    };
  }, []);

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
