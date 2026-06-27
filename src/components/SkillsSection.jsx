'use client';

import { useRef } from "react";
import { motion } from "framer-motion";
import { skills } from "@/constants";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
};

const SkillCard = ({ skill, index }) => {
    const cardRef = useRef(null);
    const contentRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        const content = contentRef.current;
        if (!card || !content) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateX = -y / 4;
        const rotateY = x / 4;

        content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.1)`;
    };

    const handleMouseLeave = () => {
        const content = contentRef.current;
        if (!content) return;
        content.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    };

    return (
        <motion.div
            custom={index}
            variants={fadeUp}
            className="z-10 hover:z-50"
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative flex flex-col items-center justify-center w-full aspect-square border-4 border-black dark:border-white bg-neutral-50 dark:bg-neutral-900 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,255,153,1)] hover:bg-[#a0c2f9] grayscale hover:grayscale-0 transition-colors duration-300"
                style={{ perspective: 1000 }}
            >
                <div
                    ref={contentRef}
                    className="flex flex-col items-center justify-center pointer-events-none"
                    style={{
                        transformStyle: "preserve-3d",
                        transition: "transform 0.15s ease-out"
                    }}
                >
                    <img
                        src={skill.imageUrl}
                        alt={skill.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-md"
                        style={{ transform: "translateZ(10px)" }}
                    />
                    <span
                        className="mt-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-center leading-tight group-hover:text-black"
                        style={{ transform: "translateZ(10px)" }}
                    >
                        {skill.name}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default function SkillsSection() {
    return (
        <div className="w-full px-6 sm:px-12 lg:px-20 py-16 border-b-4 border-black dark:border-white">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                <motion.p
                    variants={fadeUp}
                    className="text-xs font-mono uppercase tracking-[0.3em] text-[#3B82F6] mb-2"
                >
                    Toolkit
                </motion.p>
                <motion.h2
                    variants={fadeUp}
                    custom={1}
                    className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-12"
                >
                    My Skills
                </motion.h2>

                <motion.div
                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {skills.map((skill, i) => (
                        <SkillCard key={skill.name} skill={skill} index={i} />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}
