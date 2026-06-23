'use client';

import { usePathname } from 'next/navigation';
import DreamyAudioPlayer from './DreamyAudioPlayer';
import BrutalistAudioPlayer from './BrutalistAudioPlayer';

export default function GlobalPlayer() {
  const pathname = usePathname();

  if (pathname === '/') {
    return <DreamyAudioPlayer />;
  }

  // Fallback to Brutalist for /about, /contact, /projects, etc.
  return <BrutalistAudioPlayer />;
}
