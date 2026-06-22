'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const EducationPinnedScroll = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Card 1 (S2) animations
  const y1 = useTransform(scrollYProgress, [0.0, 0.3, 0.8, 1], ["100vh", "0vh", "0vh", "-50vh"]);
  const rotate1 = useTransform(scrollYProgress, [0.0, 0.3, 0.8, 1], [-15, 0, 0, 10]);
  const scale1 = useTransform(scrollYProgress, [0.0, 0.3, 0.8, 1], [0.8, 1, 1, 0.5]);

  // Card 2 (S1) animations
  const y2 = useTransform(scrollYProgress, [0.15, 0.45, 0.8, 1], ["150vh", "0vh", "0vh", "-50vh"]);
  const rotate2 = useTransform(scrollYProgress, [0.15, 0.45, 0.8, 1], [15, 0, 0, -10]);
  const scale2 = useTransform(scrollYProgress, [0.15, 0.45, 0.8, 1], [0.8, 1, 1, 0.5]);

  return (
    <div ref={containerRef} className="w-full relative h-[300vh] border-b-4 border-black dark:border-white" style={{ contentVisibility: 'auto', containIntrinsicSize: '400vh' }}>
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#f4f4f4] flex items-center justify-center" style={{ contain: 'strict' }}>
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          {/* Pola titik-titik Acid Mint */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#00FF99_2px,_transparent_2px)] bg-[length:40px_40px] transform-gpu will-change-transform"
            style={{ animation: 'pan 4s linear infinite' }}
          />

          {/* Efek kedalaman (Depth Masking) agar titik di tengah terang, di pinggir memudar */}
          <div className="absolute inset-0 mask-image-[radial-gradient(ellipse_at_center,black_20%,transparent_80%)] Webkit-mask-image-[radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
        </div>

        {/* Huge Title Text */}
        <motion.h2
          initial={{
            scale: 0,
            opacity: 0,
          }}
          whileInView={{
            scale: 1,
            opacity: 1,
          }}
          viewport={{
            amount: 0.3,
          }}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 100,
          }}
          className="absolute text-[15vw] font-black uppercase text-black select-none tracking-tighter leading-none whitespace-nowrap z-0 pointer-events-none"
        >
          EDUCATION
        </motion.h2>
        {/* Stacked Cards Container */}
        <div className="absolute inset-0 pointer-events-none z-10">

          <div className="absolute top-[15%] left-[5%] md:left-[15%] w-full max-w-[450px] z-20">
            <motion.div
              style={{ y: y1, rotate: rotate1, scale: scale1, }}
              className="pointer-events-auto w-[90%] md:w-full border-4 border-black shadow-[12px_12px_0_0_#000] p-6 sm:p-8 bg-[#00FF99] text-black flex flex-col justify-between mx-auto md:mx-0"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-wider bg-black text-[#00FF99] px-2.5 py-1 inline-block border-2 border-black font-bold mb-4">
                  Postgraduate
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase leading-none tracking-tight">
                  M.Kom. Information Systems
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider font-bold text-black/60 mt-2 mb-4">
                  Telkom University • 2026
                </p>
                <div className="border-2 border-black bg-black text-[#00FF99] font-mono text-xs uppercase tracking-wider px-3 py-1.5 font-bold mb-4 inline-block shadow-[3px_3px_0_0_#00FF99]">
                  GPA: 3.71 — Highest GPA Award in Major
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-black/85">
                  Engineered and researched a Control Delay Layer (CDL) for Remote Patient Monitoring systems. Designed as an objective supplement to existing data ingestion methods, establishing highly stable real-time data processing.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-[40%] right-[5%] md:right-[15%] w-full max-w-[450px] z-10">
            <motion.div
              style={{ y: y2, rotate: rotate2, scale: scale2 }}
              className="pointer-events-auto w-[90%] md:w-full border-4 border-black shadow-[12px_12px_0_0_#000] p-6 sm:p-8 bg-white text-black flex flex-col justify-between mx-auto md:mx-0"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-wider bg-black text-white px-2.5 py-1 inline-block border-2 border-black font-bold mb-4">
                  Graduated
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase leading-none tracking-tight">
                  S1 Information Systems
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider font-bold text-black/60 mt-2 mb-4">
                  Telkom University • 2024
                </p>
                <div className="border-2 border-black bg-black text-white font-mono text-xs uppercase tracking-wider px-3 py-1.5 font-bold mb-4 inline-block shadow-[3px_3px_0_0_#fff]">
                  GPA: 3.83
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-black/85">
                  Backend of Heart Rate Detection System with Early Warning for Patients with Heart Disease.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EducationPinnedScroll;
