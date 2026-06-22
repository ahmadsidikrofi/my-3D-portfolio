'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px)] bg-[length:40px_100%] pointer-events-none"></div>
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
          className="absolute text-[10vw] font-black uppercase text-[#3B82F6] select-none tracking-tighter leading-none whitespace-nowrap z-0 pointer-events-none transform-gpu"
        >
          CERTIFICATES
        </motion.h2>

        {/* NEW SCATTERED CARDS CONTAINER */}
        <div className="absolute inset-0 pointer-events-none z-10">

          {/* Card 1 (IBM) - Top Left */}
          <div className="absolute top-[10%] left-[5%] md:left-[10%] w-full max-w-[450px] z-40">
            <motion.div
              style={{ x: x1, y: y1, rotate: rot1 }}
              className="pointer-events-auto w-[90%] md:w-full min-h-[160px] h-auto border-4 border-black shadow-[10px_10px_0_0_#000] flex bg-[#0f62fe] mx-auto md:mx-0 will-change-transform"
            >
              <div className="w-[20%] bg-white border-r-4 border-black flex items-center justify-center overflow-hidden">
                <span className="font-black text-black/80 tracking-widest text-lg rotate-90 whitespace-nowrap">
                  | ||| || | ||
                </span>
              </div>
              <div className="w-[80%] flex flex-col justify-center px-6 py-6 sm:py-8 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase leading-none tracking-tight">
                    IBM CERTIFIED
                  </h3>
                  <span className="bg-white text-[#0f62fe] font-mono text-xs uppercase tracking-wider px-3 py-1.5 font-bold border-2 border-black shadow-[3px_3px_0_0_#fff] w-fit">
                    x2 CREDENTIALS
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <a href="https://drive.google.com/file/d/1HJ9t2z25iEXVWAaFW7MVvkxaaXPCYaTT/view" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b-2 border-white/20 pb-2 mb-2 hover:bg-white hover:text-[#0f62fe] p-1 transition-colors cursor-pointer">
                    <span className="font-bold text-sm sm:text-base uppercase">Use Generative AI for Software Development</span>
                    <ArrowRight size={20} strokeWidth={3} className="opacity-50 group-hover:opacity-100 font-black mr-2 group-hover:translate-x-2" />
                  </a>
                  <a href="https://drive.google.com/file/d/1R_Ii6uQPgs40ghs_ULepKvMqjebWYWaH/view" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b-2 border-white/20 pb-2 mb-2 hover:bg-white hover:text-[#0f62fe] p-1 transition-colors cursor-pointer">
                    <span className="font-bold text-sm sm:text-base uppercase">IBM Granite Models for Software Development</span>
                    <ArrowRight size={20} strokeWidth={3} className="opacity-50 group-hover:opacity-100 font-black mr-2 group-hover:translate-x-2" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card 2 (HackerRank) - Mid Right */}
          <div className="absolute top-[25%] right-[5%] md:right-[10%] w-full max-w-[450px] z-30">
            <motion.div
              style={{ x: x2, y: y2, rotate: rot2 }}
              className="pointer-events-auto w-[90%] md:w-full min-h-[160px] h-auto border-4 border-black shadow-[10px_10px_0_0_#000] flex bg-[#00EA64] mx-auto md:mx-0 will-change-transform"
            >
              <div className="w-[20%] bg-white border-r-4 border-black flex items-center justify-center overflow-hidden">
                <span className="font-black text-black/80 tracking-widest text-lg rotate-90 whitespace-nowrap">
                  || ||| | || |
                </span>
              </div>
              <div className="w-[80%] flex flex-col justify-center px-4 py-6 sm:py-8 text-black">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase leading-none tracking-tight">
                    HACKERRANK VERIFIED
                  </h3>
                  <span className="bg-black text-[#00EA64] font-mono text-xs uppercase tracking-wider px-3 py-1.5 font-bold border-2 border-black shadow-[3px_3px_0_0_#000] w-fit">
                    x3 ASSESSMENTS
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <a href="https://www.hackerrank.com/certificates/b0e30360c7fd" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b-2 border-black/20 pb-2 mb-2 hover:bg-black hover:text-[#00EA64] p-1 transition-colors cursor-pointer">
                    <span className="font-bold text-sm sm:text-base uppercase">Software Engineer Certificate</span>
                    <ArrowRight size={20} strokeWidth={3} className="opacity-50 group-hover:opacity-100 font-black mr-2 group-hover:translate-x-2" />

                  </a>
                  <a href="https://www.hackerrank.com/certificates/9a0003f25dcf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b-2 border-black/20 pb-2 mb-2 hover:bg-black hover:text-[#00EA64] p-1 transition-colors cursor-pointer">
                    <span className="font-bold text-sm sm:text-base uppercase">SQL (Advanced) Certificate</span>
                    <ArrowRight size={20} strokeWidth={3} className="opacity-50 group-hover:opacity-100 font-black mr-2 group-hover:translate-x-2" />

                  </a>
                  <a href="https://www.hackerrank.com/certificates/3a7d0090b6ee" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b-2 border-black/20 pb-2 mb-2 hover:bg-black hover:text-[#00EA64] p-1 transition-colors cursor-pointer">
                    <span className="font-bold text-sm sm:text-base uppercase">Frontend Developer (React) Certificate</span>
                    <ArrowRight size={20} strokeWidth={3} className="opacity-50 group-hover:opacity-100 font-black mr-2 group-hover:translate-x-2" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card 3 (BNSP) - Mid Left */}
          <div className="absolute top-[50%] left-[5%] md:left-[15%] w-full max-w-[450px] z-20">
            <motion.div
              style={{ x: x3, y: y3, rotate: rot3 }}
              className="pointer-events-auto w-[90%] md:w-full min-h-[160px] h-auto border-4 border-black shadow-[10px_10px_0_0_#000] flex bg-[#FF3366] mx-auto md:mx-0 will-change-transform"
            >
              <div className="w-[20%] bg-white border-r-4 border-black flex items-center justify-center overflow-hidden">
                <span className="font-black text-black/80 tracking-widest text-lg rotate-90 whitespace-nowrap">
                  || | ||| || |
                </span>
              </div>
              <div className="w-[80%] flex flex-col justify-center px-6 py-6 sm:py-8 text-white">
                <h3 className="text-2xl sm:text-3xl font-black uppercase leading-none tracking-tight mb-4">
                  BNSP CERTIFICATION
                </h3>
                <div className="flex flex-col gap-1">
                  <a href="https://drive.google.com/file/d/1NgQWkHQ4DUZ5eNI2qmrLdS0KidYlKtnB/view" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b-2 border-white/20 pb-2 mb-2 hover:bg-white hover:text-[#FF3366] p-1 transition-colors cursor-pointer">
                    <div>
                      <span className="font-bold text-sm sm:text-base uppercase block">Web Developer</span>
                      <span className="font-mono text-xs opacity-80">National Professional Certification</span>
                    </div>
                    <ArrowRight size={20} strokeWidth={3} className="opacity-50 group-hover:opacity-100 font-black mr-2 group-hover:translate-x-2" />

                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card 4 (Udemy) - Bottom Right */}
          <div className="absolute top-[70%] right-[5%] md:right-[15%] w-full max-w-[450px] z-10">
            <motion.div
              style={{ x: x4, y: y4, rotate: rot4 }}
              className="pointer-events-auto w-[90%] md:w-full min-h-[160px] h-auto border-4 border-black shadow-[10px_10px_0_0_#000] flex bg-[#A435F0] mx-auto md:mx-0 will-change-transform"
            >
              <div className="w-[20%] bg-white border-r-4 border-black flex items-center justify-center overflow-hidden">
                <span className="font-black text-black/80 tracking-widest text-lg rotate-90 whitespace-nowrap">
                  || ||| | || |
                </span>
              </div>
              <div className="w-[80%] flex flex-col justify-center px-6 py-6 sm:py-8 text-white">
                <h3 className="text-2xl sm:text-3xl font-black uppercase leading-none tracking-tight mb-4">
                  UDEMY
                </h3>
                <div className="flex flex-col gap-1">
                  <a href="https://www.udemy.com/certificate/UC-ecc7593c-b3b8-4ba5-be3d-57ff470519f7/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b-2 border-white/20 pb-2 mb-2 hover:bg-white hover:text-[#A435F0] p-1 transition-colors cursor-pointer">
                    <div>
                      <span className="font-bold text-sm sm:text-base uppercase block">Mastering NextJS 14 & OpenAI</span>
                      <span className="font-mono text-xs opacity-80">Course Completion</span>
                    </div>
                    <ArrowRight size={20} strokeWidth={3} className="opacity-50 group-hover:opacity-100 font-black mr-2 group-hover:translate-x-2" />

                  </a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CertificationsPinnedScroll;
