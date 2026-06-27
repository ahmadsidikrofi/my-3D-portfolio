'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/constants";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import SpotlightMemeFinder from "@/components/SpotlightMemeFinder";
import TheVergeMenu from "@/components/TheVergeMenu";

const GithubIcon = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const CARD_CLASS =
    "!h-auto max-h-[75vh] overflow-y-auto hide-scroll !p-0 !rounded-2xl !shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] border-4 !border-solid border-black dark:border-white bg-white dark:bg-[#131313]";

const ProjectsPage = () => {
    // Default false to prevent hydration mismatch (server assumes desktop)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 639px)').matches);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="h-screen overflow-hidden bg-[#f4f4f4] dark:bg-[#0a0a0a] text-neutral-900 dark:text-white">
            <TheVergeMenu />
            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scroll::-webkit-scrollbar {
                    display: none;
                }
                .hide-scroll {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
            <ScrollStack className="hide-scroll" itemStackDistance={25} blurAmount={2}>
                {/* ── Card 1 : Hero ── */}
                <ScrollStackItem itemClassName={`${CARD_CLASS} overflow-hidden !shadow-none !border-0`}>
                    <div className="relative px-6 py-0 md:px-16 bg-[#f4f4f4] dark:bg-[#0a0a0a]">
                        <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#3B82F6] dark:text-[#00FF99] mb-4">
                            Showcase / Work
                        </p>

                        <h1 className="text-5xl sm:text-7xl lg:text-[8rem] font-black uppercase leading-[0.9] tracking-tighter">
                            My{" "}
                            <span className="text-[#3B82F6] dark:text-[#00FF99] relative inline-block">
                                Projects
                                <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#3B82F6] dark:bg-[#00FF99]" />
                            </span>
                        </h1>

                        <p className="mt-8 max-w-3xl text-sm sm:text-lg font-normal text-neutral-600 dark:text-neutral-400 leading-relaxed border-l-4 border-[#3B82F6] dark:border-[#00FF99] pl-4">
                            I've embarked on numerous projects throughout the years, but
                            these are the ones I hold closest to my heart. Many of them are
                            open-source, so feel free to explore the codebase and contribute
                            your ideas.
                        </p>

                        {/* Decorative squares */}
                        <div className="absolute top-4 right-4 sm:right-12 w-20 h-20 sm:w-28 sm:h-28 border-4 border-[#3B82F6]/20 dark:border-[#00FF99]/20 pointer-events-none" />
                        <div className="absolute top-12 right-12 sm:right-20 w-20 h-20 sm:w-28 sm:h-28 border-4 border-black/10 dark:border-white/10 pointer-events-none" />
                    </div>
                </ScrollStackItem>

                {/* ── Cards 2–7 : Projects ── */}
                {projects.map((project) => (
                    <ScrollStackItem key={project.name} itemClassName={CARD_CLASS}>
                        <div className="flex flex-col md:flex-row w-full h-full">
                            {/* Left — Theme colour strip + icon */}
                            <div
                                className={`w-full md:w-2/5 flex items-center justify-center p-6 md:p-16 border-b-4 md:border-b-0 md:border-r-4 border-black dark:border-white shrink-0 ${project.theme}`}
                            >
                                <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 border-4 border-black bg-white dark:bg-neutral-900 rounded-xl flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                    <img
                                        src={project.iconUrl}
                                        alt={project.name}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>
                            </div>

                            {/* Right — Content */}
                            <div className="w-full md:w-3/5 p-6 md:p-12 flex flex-col justify-between gap-4 md:gap-6">
                                <div>
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-3 md:mb-4">
                                        {project.name}
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-lg leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Action Links */}
                                <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-4 md:pt-6 border-t-2 border-dashed border-black/20 dark:border-white/20">
                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-3 md:px-6 md:py-3 bg-[#3B82F6] dark:bg-[#00FF99] text-white dark:text-black font-bold font-mono text-xs uppercase tracking-wider border-2 border-black dark:border-transparent hover:scale-105 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                                    >
                                        Live Demo
                                        <ExternalLink size={16} strokeWidth={2.5} />
                                    </Link>

                                    <Link
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-3 md:px-6 md:py-3 bg-transparent text-black dark:text-white font-bold font-mono text-xs uppercase tracking-wider border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
                                    >
                                        Source
                                        <GithubIcon size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ScrollStackItem>
                ))}

                {/* ── Easter Egg : Spotlight Meme Finder ── */}
                {!isMobile && (
                    <ScrollStackItem itemClassName={`${CARD_CLASS} !shadow-[12px_12px_0px_0px_rgba(59,130,246,1)] dark:!shadow-[12px_12px_0px_0px_rgba(0,255,153,1)]`}>
                        <SpotlightMemeFinder />
                    </ScrollStackItem>
                )}

                {/* ── Card : CTA ── */}
                <ScrollStackItem
                    itemClassName={`${CARD_CLASS} !shadow-[12px_12px_0px_0px_rgba(59,130,246,1)] dark:!shadow-[12px_12px_0px_0px_rgba(0,255,153,1)]`}
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 p-10 md:p-16">
                        <div>
                            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#3B82F6] dark:text-[#00FF99] mb-3">
                                Ready to collaborate?
                            </p>
                            <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">
                                Let's Discuss
                                <br />
                                Your Next Project.
                            </h3>
                        </div>
                        <Link href="/contact">
                            <button className="flex items-center gap-3 px-8 py-4 bg-[#3B82F6] dark:bg-[#00FF99] text-white dark:text-black font-black uppercase tracking-wider text-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 transition-all cursor-pointer">
                                Contact Me
                                <ArrowRight size={20} strokeWidth={3} />
                            </button>
                        </Link>
                    </div>
                </ScrollStackItem>
            </ScrollStack>
        </div>
    );
};

export default ProjectsPage;