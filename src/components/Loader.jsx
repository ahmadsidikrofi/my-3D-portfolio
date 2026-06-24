import React, { useEffect, useState } from 'react';
import { Html, useProgress } from "@react-three/drei";
import { motion } from "framer-motion";

const Loader = () => {
    const { progress } = useProgress();
    const [loadingText, setLoadingText] = useState("Initializing System...");

    useEffect(() => {
        if (progress < 20) setLoadingText("Waking up server...");
        else if (progress < 40) setLoadingText("Downloading geometries...");
        else if (progress < 60) setLoadingText("Applying 3D textures...");
        else if (progress < 80) setLoadingText("Rendering lighting...");
        else if (progress < 100) setLoadingText("Polishing pixels...");
        else setLoadingText("Ready for liftoff 🚀");
    }, [progress]);

    return (
        <Html center zIndexRange={[100, 0]}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center justify-center w-[320px]"
            >
                {/* Premium Neo-Brutalist + Glassmorphic Card */}
                <div className="relative w-full overflow-hidden bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-2xl border-4 border-black dark:border-white p-6 rounded-3xl shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff]">

                    {/* Header */}
                    <div className="flex items-end justify-between mb-5">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#3B82F6] dark:text-[#00FF99] mb-1">
                                Boot Sequence
                            </span>
                            <span className="text-xl font-black uppercase tracking-tighter text-black dark:text-white leading-none">
                                Building 3D
                            </span>
                        </div>
                        <div className="text-right flex items-baseline">
                            <motion.span
                                className="text-4xl font-black font-mono text-[#3B82F6] dark:text-[#00FF99] leading-none"
                            >
                                {progress.toFixed(0)}
                            </motion.span>
                            <span className="text-xl font-bold text-black/50 dark:text-white/50 ml-1">%</span>
                        </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="relative h-5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden border-2 border-black dark:border-white shadow-inner">
                        {/* Animated Fill */}
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-[#3B82F6] dark:bg-[#00FF99] border-r-2 border-black dark:border-white"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "circOut", duration: 0.4 }}
                        />
                        {/* Candy stripes overlay for texture (Neo-brutalist vibe) */}
                        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,#000_8px,#000_16px)] dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,#fff_8px,#fff_16px)]" />
                    </div>

                    {/* Footer Status */}
                    <div className="mt-5 flex items-center gap-3">
                        {/* Blinking indicator */}
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </div>
                        <motion.span
                            key={loadingText}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 truncate"
                        >
                            {loadingText}
                        </motion.span>
                    </div>

                    {/* Ambient Glows behind the card */}
                    <div className="absolute -z-10 -top-12 -right-12 w-32 h-32 bg-[#3B82F6]/30 dark:bg-[#00FF99]/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -z-10 -bottom-12 -left-12 w-32 h-32 bg-[#A855F7]/30 dark:bg-[#3B82F6]/20 rounded-full blur-3xl pointer-events-none" />
                </div>
            </motion.div>
        </Html>
    )
}

export default Loader;