'use client'

import Link from "next/link"
import Button01 from "./shadcn-space/radix/button/button-01"
import { motion } from "framer-motion"

const InfoBox = ({ text, link, btnText }) => (
    <div className="group relative bg-[#3b82f6] text-white p-6 sm:pt-4 sm:pb-8 group-hover:pb-4 group-hover:sm:pb-6 rounded-[28px] max-w-sm mx-auto shadow-[4px_4px_0px_0px_#1d4ed8] border-2 border-blue-500 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1">
        <p className="font-medium text-base sm:text-lg text-center leading-snug font-sans tracking-wide">{text}</p>
        <div className="absolute z-10 w-full flex justify-center mt-32 group-hover:mt-28 transition-all duration-300">
            <Button01
                text={btnText}
                link={link}
                className="!bg-white !text-[#3b82f6] shadow-sm hover:!scale-105 hover:!bg-gray-50"
            />
        </div>
    </div>
)

const renderContent = {
    1: (
        <div className="relative bg-[#3b82f6] text-white p-5 sm:p-6 rounded-[28px] max-w-sm mx-auto shadow-[4px_4px_0px_0px_#1d4ed8] border-2 border-blue-500 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1">
            <h1 className="text-lg sm:text-xl leading-snug text-center font-sans tracking-wide">
                Hi, I am <span className="font-extrabold text-white">Rofi</span> 👋
                <br />
                <span className="text-blue-100 text-sm sm:text-base font-medium">A Software Engineer from Indonesia.</span>
            </h1>
        </div>
    ),
    2: (
        <InfoBox
            text="Led multiple projects to success over the years. Curious about the impact?"
            link="/projects"
            btnText="Visit my portfolio"
        />
    ),
    3: (
        <InfoBox
            text="Transforming concepts into meaningful digital solutions."
            link="/about"
            btnText="See my work"
        />
    ),
    4: (
        <InfoBox
            text="Looking for a dev to build your next project? Let's connect!"
            link="/contact"
            btnText="Contact me"
        />
    )
}

const HomeInfo = ({ currentStage }) => {
    const content = renderContent[currentStage];
    if (!content) return null;

    return (
        <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
                mass: 0.8
            }}
            className="w-full flex justify-center items-center"
        >
            {content}
        </motion.div>
    )
}

export default HomeInfo