'use client';

import React, { useState, useEffect } from 'react';
import StaggeredMenu from './StaggeredMenu';
import { useRouter } from 'next/navigation';

const TheVergeMenu = () => {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  // Fullscreen toggle logic
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Sound toggle logic
  const toggleSound = () => {
    setIsSoundOn((prev) => !prev);
    // This state can be hooked to a global context if you have global audio
  };

  const menuItems = [
    { label: 'Home', ariaLabel: 'Back to homebase', link: '/' },
    { label: 'Projects', ariaLabel: 'View our projects', link: '/projects' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
    { label: 'Resume', ariaLabel: 'Download Resume', link: '/unduh-resume' },
    {
      label: isFullscreen ? 'Exit Fullscreen' : 'Fullscreen',
      ariaLabel: 'Toggle Fullscreen',
      onClick: (e) => { e.preventDefault(); toggleFullscreen(); }
    },
    // {
    //   label: isSoundOn ? 'Sound: ON' : 'Sound: OFF',
    //   ariaLabel: 'Toggle Sound',
    //   onClick: (e) => { e.preventDefault(); toggleSound(); }
    // }
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com/rofi.js' },
    { label: 'GitHub', link: 'https://github.com/ahmadsidikrofi' },
    { label: 'LinkedIn', link: 'https://linkedin.com/in/ahmad-sidik-rofiudin' }
  ];

  return (
    <div className="fixed top-0 left-0 z-[100] w-full h-0 pointer-events-none">
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#3B82F6"
        openMenuButtonColor="#000"
        changeMenuColorOnOpen={true}
        colors={['#3B82F6', '#FF0055', '#00FF99']}
        logoUrl=""
        accentColor="#00FF99"
        isFixed={true}
      />
    </div>
  );
};

export default TheVergeMenu;
