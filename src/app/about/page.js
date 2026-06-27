'use client'

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component"
import { motion } from "framer-motion"
import { useRef } from "react"
import { experiences } from "@/constants"
import "react-vertical-timeline-component/style.min.css"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import RotatingText from "@/components/RotatingText"
import InteractiveProfilePic from "@/components/InteractiveProfilePic"
import VisitorPhotobooth from "@/components/VisitorPhotobooth"
import PixelBlast from "@/components/PixelBlast"
import EducationPinnedScroll from "@/components/EducationPinnedScroll"
import CertificationsPinnedScroll from "@/components/CertificationsPinnedScroll"
import TheVergeMenu from "@/components/TheVergeMenu"
import SkillsSection from "@/components/SkillsSection"
import { ReactLenis } from 'lenis/react'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
}

const AboutPage = () => {
    return (
        <ReactLenis root>
            <TheVergeMenu />
            <section className="w-full min-h-screen bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-white max-w-[100vw] overflow-clip">

                {/* Hero Section */}
                <div className="relative w-full px-6 sm:px-12 lg:px-20 pt-16 pb-12 border-b-4 border-black dark:border-white">
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#3B82F6] mb-4"
                    >
                        About / Profile
                    </motion.p>

                    <div className="flex max-sm:flex-col gap-6 justify-start items-center">
                        <InteractiveProfilePic />
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="text-5xl sm:text-5xl lg:text-[4rem] font-black uppercase leading-[0.9] tracking-tighter"
                        >
                            Hello,
                            <br />
                            I'm <span className="sm:hidden text-[#3B82F6]">Rofi</span>
                            <span className="max-sm:hidden text-[#3B82F6] relative inline-block">
                                <RotatingText
                                    texts={['Rofi', 'Software Dev', 'Full-Stack Dev', 'Backend Dev']}
                                    mainClassName="px-2 sm:px-2 md:px-3 bg-[#3B82F6] text-[#F4F4F4] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded"
                                    staggerFrom="last"
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-120%" }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                    transition={{ type: "spring", damping: 60, stiffness: 600 }}
                                    rotationInterval={2000}
                                    splitBy="characters"
                                    auto
                                    loop
                                />
                                {/* <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#3B82F6]" /> */}
                            </span>{" "}
                        </motion.h1>
                    </div>


                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-8 max-w-2xl text-base sm:text-lg font-normal text-neutral-600 dark:text-neutral-400 leading-relaxed border-l-4 border-[#3B82F6] pl-4"
                    >
                        Software Engineer specializing in building reliable web-based systems, real-time applications, and AI integrations.
                    </motion.p>

                    {/* Decorative grid lines */}
                    <div className="absolute top-0 right-6 sm:right-12 lg:right-20 w-32 h-32 border-4 border-[#3B82F6]/20 pointer-events-none" />
                    <div className="absolute top-8 right-14 sm:right-20 lg:right-28 w-32 h-32 border-4 border-black/10 dark:border-white/10 pointer-events-none" />
                </div>

                {/* Skills Section */}
                <SkillsSection />

                {/* Experience Section */}
                <div className="w-full px-6 sm:px-12 lg:px-20 py-16 bg-[#f4f4f4] border-b-4 border-black dark:border-white text-neutral-900 relative overflow-hidden">
                    {/* <div className="max-sm:hidden absolute inset-0 w-full h-full z-0 pointer-events-auto">
                        <PixelBlast
                            variant="square"
                            pixelSize={4}
                            color="#000000"
                            patternScale={2}
                            patternDensity={0.1}
                            pixelSizeJitter={0.1}
                            enableRipples
                            rippleSpeed={0.1}
                            rippleThickness={0.1}
                            rippleIntensityScale={0.1}
                            liquid={false}
                            liquidStrength={0.1}
                            liquidRadius={0.1}
                            liquidWobbleSpeed={5}
                            speed={0.5}
                            edgeFade={0.25}
                            transparent={true}
                        />
                    </div> */}

                    <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_#000_2px,_transparent_2px)] dark:bg-[radial-gradient(circle_at_center,_#fff_2px,_transparent_2px)] bg-[length:32px_32px]" />


                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                        className="relative z-10 pointer-events-none"
                    >
                        <motion.p
                            variants={fadeUp}
                            className="text-xs font-mono uppercase tracking-[0.3em] text-[#3B82F6] mb-2"
                        >
                            Career
                        </motion.p>
                        <motion.h2
                            variants={fadeUp}
                            custom={1}
                            className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-neutral-900"
                        >
                            Work Experience.
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            custom={2}
                            className="max-w-xl text-neutral-600 text-sm sm:text-base mb-12"
                        >
                            I've collaborated with diverse teams and companies, constantly leveling up my skills. Here's the rundown:
                        </motion.p>
                    </motion.div>

                    <div className="mt-4 relative z-30 pointer-events-none">
                        <VerticalTimeline lineColor="#3B82F6">
                            {experiences.map((experience, index) => (
                                <VerticalTimelineElement
                                    key={experience.company_name}
                                    date={experience.date}
                                    dateClassName="!text-neutral-600 !font-mono !text-xs !uppercase !tracking-widest z-30"
                                    iconStyle={{
                                        background: experience.iconBg,
                                        boxShadow: '0 0 0 4px #3B82F6',
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
                                        background: '#ffffff',
                                        border: '4px solid',
                                        borderColor: 'currentColor',
                                        boxShadow: '6px 6px 0px 0px rgba(59,130,246,1)',
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
                                        className="pointer-events-auto"
                                    >
                                        <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-neutral-900">
                                            {experience.title}
                                        </h3>
                                        <p className="text-[#3B82F6] font-mono text-sm font-bold mt-1" style={{ margin: '4px 0 0 0' }}>
                                            {experience.company_name}
                                        </p>

                                        <ul className="mt-4 space-y-2">
                                            {experience.points.map((point, i) => (
                                                <li
                                                    key={`experience-point-${i}`}
                                                    className="text-neutral-700 text-sm leading-relaxed pl-4 border-l-2 border-[#3B82F6]/40"
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


                {/* Academic Foundation Section */}
                <EducationPinnedScroll />

                {/* Certifications Section */}
                <CertificationsPinnedScroll />


                {/* Visitor Photobooth Section */}
                <VisitorPhotobooth />

                {/* CTA Section */}
                <div className="w-full px-6 sm:px-12 lg:px-20 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-4 border-black dark:border-white p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]"
                    >
                        <div>
                            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#3B82F6] mb-2">
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
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 px-8 py-4 bg-[#3B82F6] text-black font-black uppercase tracking-wider text-sm border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_#000] hover:translate-y-1 hover:translate-x-1 transition-all cursor-pointer"
                            >
                                Get in Touch
                                <ArrowRight size={20} strokeWidth={3} className="" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </ReactLenis>
    )
}

export default AboutPage