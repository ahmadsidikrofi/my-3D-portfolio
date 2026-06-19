'use client'

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { experiences, skills } from "@/constants"
import "react-vertical-timeline-component/style.min.css"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
}

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
                className="group relative flex flex-col items-center justify-center w-full aspect-square border-4 border-black dark:border-white bg-neutral-50 dark:bg-neutral-900 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,255,153,1)] hover:bg-[#00FF99] grayscale hover:grayscale-0 transition-colors duration-300"
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

const AboutPage = () => {
    return (
        <section className="w-full min-h-screen bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-white overflow-hidden">

            {/* Hero Section */}
            <div className="relative w-full px-6 sm:px-12 lg:px-20 pt-16 pb-12 border-b-4 border-black dark:border-white">
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#00FF99] mb-4"
                >
                    About / Profile
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl sm:text-7xl lg:text-[8rem] font-black uppercase leading-[0.9] tracking-tighter"
                >
                    Hello,
                    <br />
                    I'm{" "}
                    <span className="text-[#00FF99] relative inline-block">
                        Rofi
                        <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#00FF99]" />
                    </span>{" "}
                    <motion.span
                        animate={{
                            rotate: [0, 14, -8, 14, -4, 10, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 0.8,
                        }}
                        style={{
                            display: "inline-block",
                            transformOrigin: "70% 70%",
                        }}
                    >
                        👋
                    </motion.span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-8 max-w-2xl text-base sm:text-lg font-normal text-neutral-600 dark:text-neutral-400 leading-relaxed border-l-4 border-[#00FF99] pl-4"
                >
                    Software Engineer specializing in building reliable web-based systems, real-time applications, and AI integrations.
                </motion.p>

                {/* Decorative grid lines */}
                <div className="absolute top-0 right-6 sm:right-12 lg:right-20 w-32 h-32 border-4 border-[#00FF99]/20 pointer-events-none" />
                <div className="absolute top-8 right-14 sm:right-20 lg:right-28 w-32 h-32 border-4 border-black/10 dark:border-white/10 pointer-events-none" />
            </div>

            {/* Skills Section */}
            <div className="w-full px-6 sm:px-12 lg:px-20 py-16 border-b-4 border-black dark:border-white">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                >
                    <motion.p
                        variants={fadeUp}
                        className="text-xs font-mono uppercase tracking-[0.3em] text-[#00FF99] mb-2"
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
                        viewport={{ once: false, amount: 0.1 }}
                    >
                        {skills.map((skill, i) => (
                            <SkillCard key={skill.name} skill={skill} index={i} />
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Experience Section */}
            <div className="w-full px-6 sm:px-12 lg:px-20 py-16 border-b-4 border-black dark:border-white">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                >
                    <motion.p
                        variants={fadeUp}
                        className="text-xs font-mono uppercase tracking-[0.3em] text-[#00FF99] mb-2"
                    >
                        Career
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        custom={1}
                        className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4"
                    >
                        Work Experience.
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        custom={2}
                        className="max-w-xl text-neutral-500 dark:text-neutral-400 text-sm sm:text-base mb-12"
                    >
                        I've collaborated with diverse teams and companies, constantly leveling up my skills. Here's the rundown:
                    </motion.p>
                </motion.div>

                <div className="mt-4">
                    <VerticalTimeline lineColor="#00FF99">
                        {experiences.map((experience, index) => (
                            <VerticalTimelineElement
                                key={experience.company_name}
                                date={experience.date}
                                dateClassName="!text-neutral-500 dark:!text-neutral-400 !font-mono !text-xs !uppercase !tracking-widest"
                                iconStyle={{
                                    background: experience.iconBg,
                                    boxShadow: '0 0 0 4px #00FF99',
                                }}
                                icon={
                                    <div className="flex justify-center items-center w-full h-full">
                                        <img
                                            src={experience.icon}
                                            alt={experience.company_name}
                                            className="w-[60%] h-[60%] object-contain"
                                        />
                                    </div>
                                }
                                contentStyle={{
                                    background: 'transparent',
                                    border: '4px solid',
                                    borderColor: 'currentColor',
                                    boxShadow: '6px 6px 0px 0px rgba(0,255,153,0.4)',
                                    borderRadius: '0px',
                                    padding: '24px',
                                }}
                                contentArrowStyle={{
                                    borderRight: '8px solid currentColor',
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false }}
                                    whileHover={{
                                        x: 4,
                                        transition: { duration: 0.15 },
                                    }}
                                >
                                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
                                        {experience.title}
                                    </h3>
                                    <p className="text-[#00FF99] font-mono text-sm font-bold mt-1" style={{ margin: '4px 0 0 0' }}>
                                        {experience.company_name}
                                    </p>

                                    <ul className="mt-4 space-y-2">
                                        {experience.points.map((point, i) => (
                                            <li
                                                key={`experience-point-${i}`}
                                                className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed pl-4 border-l-2 border-[#00FF99]/40"
                                            >
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </VerticalTimelineElement>
                        ))}
                    </VerticalTimeline>
                </div>
            </div>

            {/* CTA Section */}
            <div className="w-full px-6 sm:px-12 lg:px-20 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-4 border-black dark:border-white p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(0,255,153,1)]"
                >
                    <div>
                        <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#00FF99] mb-2">
                            What's next?
                        </p>
                        <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">
                            Let's Build
                            <br />
                            Something Together.
                        </h3>
                    </div>
                    <Link href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05, x: 4 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-8 py-4 bg-[#00FF99] text-black font-black uppercase tracking-wider text-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow cursor-pointer"
                        >
                            Get in Touch
                            <ArrowRight size={20} strokeWidth={3} />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default AboutPage