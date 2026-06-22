'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CertificationsPinnedScroll = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Card 1 (IBM)
  const x1 = useTransform(scrollYProgress, [0.0, 0.2, 0.7, 0.8], ["120vw", "0vw", "0vw", "0vw"]);
  const y1 = useTransform(scrollYProgress, [0.0, 0.2, 0.7, 0.8], ["0vh", "0vh", "0vh", "-150vh"]);
  const rot1 = useTransform(scrollYProgress, [0.0, 0.2], [40, 0]);

  // Card 2 (HackerRank)
  const x2 = useTransform(scrollYProgress, [0.1, 0.3, 0.75, 0.85], ["120vw", "0vw", "0vw", "0vw"]);
  const y2 = useTransform(scrollYProgress, [0.1, 0.3, 0.75, 0.85], ["0vh", "0vh", "0vh", "-150vh"]);
  const rot2 = useTransform(scrollYProgress, [0.1, 0.3], [40, 0]);

  // Card 3 (BNSP)
  const x3 = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 0.9], ["120vw", "0vw", "0vw", "0vw"]);
  const y3 = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 0.9], ["0vh", "0vh", "0vh", "-150vh"]);
  const rot3 = useTransform(scrollYProgress, [0.2, 0.4], [40, 0]);

  // Card 4 (Udemy)
  const x4 = useTransform(scrollYProgress, [0.3, 0.5, 0.85, 0.95], ["120vw", "0vw", "0vw", "0vw"]);
  const y4 = useTransform(scrollYProgress, [0.3, 0.5, 0.85, 0.95], ["0vh", "0vh", "0vh", "-150vh"]);
  const rot4 = useTransform(scrollYProgress, [0.3, 0.5], [40, 0]);

  return (
    <div ref={containerRef} className="w-full relative h-[200vh] border-b-4 border-black dark:border-white" style={{ contentVisibility: 'auto', containIntrinsicSize: '450vh' }}>
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#111] flex items-center justify-center" style={{ contain: 'strict' }}>

        {/* Background Scanner */}
        {/* <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px)] bg-[length:40px_100%] pointer-events-none"></div> */}
        {/* Huge Title Text */}
        <h2 className="absolute text-[15vw] font-black uppercase text-white/5 select-none tracking-tighter leading-none whitespace-nowrap z-0 pointer-events-none transform-gpu">
          CERTIFIED
        </h2>

        {/* NEW SCATTERED CARDS CONTAINER */}
        <div className="absolute inset-0 pointer-events-none z-10">

          {/* Card 1 (IBM) - Top Left */}
          <div className="absolute top-[10%] left-[5%] md:left-[10%] w-full max-w-[450px] z-40">
            <motion.div
              style={{ x: x1, y: y1, rotate: rot1 }}
              className="pointer-events-auto w-[90%] md:w-full h-[160px] border-4 border-black shadow-[10px_10px_0_0_#000] flex bg-[#0f62fe] mx-auto md:mx-0 will-change-transform"
            >
              <div className="w-[20%] bg-white border-r-4 border-black flex items-center justify-center overflow-hidden">
                <span className="font-black text-black/80 tracking-widest text-lg rotate-90 whitespace-nowrap">
                  | ||| || | ||
                </span>
              </div>
              <div className="w-[80%] flex flex-col justify-center p-6 text-white">
                <h3 className="text-2xl sm:text-3xl font-black uppercase leading-none tracking-tight mb-4">
                  IBM CERTIFIED
                </h3>
                <div>
                  <span className="bg-white text-[#0f62fe] font-mono text-xs uppercase tracking-wider px-3 py-1.5 font-bold border-2 border-black shadow-[3px_3px_0_0_#fff]">
                    x3 CREDENTIALS
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card 2 (HackerRank) - Mid Right */}
          <div className="absolute top-[30%] right-[5%] md:right-[10%] w-full max-w-[450px] z-30">
            <motion.div
              style={{ x: x2, y: y2, rotate: rot2 }}
              className="pointer-events-auto w-[90%] md:w-full h-[160px] border-4 border-black shadow-[10px_10px_0_0_#000] flex bg-[#00EA64] mx-auto md:mx-0 will-change-transform"
            >
              <div className="w-[20%] bg-white border-r-4 border-black flex items-center justify-center overflow-hidden">
                <span className="font-black text-black/80 tracking-widest text-lg rotate-90 whitespace-nowrap">
                  || ||| | || |
                </span>
              </div>
              <div className="w-[80%] flex flex-col justify-center p-6 text-black">
                <h3 className="text-2xl sm:text-3xl font-black uppercase leading-none tracking-tight mb-4">
                  HACKERRANK VERIFIED
                </h3>
                <div>
                  <span className="bg-black text-[#00EA64] font-mono text-xs uppercase tracking-wider px-3 py-1.5 font-bold border-2 border-black shadow-[3px_3px_0_0_#000]">
                    x2 ASSESSMENTS
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card 3 (BNSP) - Mid Left */}
          <div className="absolute top-[50%] left-[5%] md:left-[15%] w-full max-w-[450px] z-20">
            <motion.div
              style={{ x: x3, y: y3, rotate: rot3 }}
              className="pointer-events-auto w-[90%] md:w-full h-[160px] border-4 border-black shadow-[10px_10px_0_0_#000] flex bg-[#FF3366] mx-auto md:mx-0 will-change-transform"
            >
              <div className="w-[20%] bg-white border-r-4 border-black flex items-center justify-center overflow-hidden">
                <span className="font-black text-black/80 tracking-widest text-lg rotate-90 whitespace-nowrap">
                  || | ||| || |
                </span>
              </div>
              <div className="w-[80%] flex flex-col justify-center p-6 text-black">
                <h3 className="text-2xl sm:text-3xl font-black uppercase leading-none tracking-tight text-white mb-2">
                  BNSP CERTIFICATION
                </h3>
                <span className="font-mono text-xs sm:text-sm font-bold text-white/90">
                  National Professional Certification
                </span>
              </div>
            </motion.div>
          </div>

          {/* Card 4 (Udemy) - Bottom Right */}
          <div className="absolute top-[70%] right-[5%] md:right-[15%] w-full max-w-[450px] z-10">
            <motion.div
              style={{ x: x4, y: y4, rotate: rot4 }}
              className="pointer-events-auto w-[90%] md:w-full h-[160px] border-4 border-black shadow-[10px_10px_0_0_#000] flex bg-[#A435F0] mx-auto md:mx-0 will-change-transform"
            >
              <div className="w-[20%] bg-white border-r-4 border-black flex items-center justify-center overflow-hidden">
                <span className="font-black text-black/80 tracking-widest text-lg rotate-90 whitespace-nowrap">
                  || ||| | || |
                </span>
              </div>
              <div className="w-[80%] flex flex-col justify-center p-6 text-white">
                <h3 className="text-2xl sm:text-3xl font-black uppercase leading-none tracking-tight mb-2">
                  UDEMY
                </h3>
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-white/70">
                  Multiple Courses Completed
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CertificationsPinnedScroll;
