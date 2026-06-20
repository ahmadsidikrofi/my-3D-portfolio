'use client'

import { useState } from 'react'
import ReflectiveCard from './ReflectiveCard'
import SliderModern from './shadcn-space/radix/slider/slider-04'
import html2canvas from 'html2canvas'

const VisitorPhotobooth = () => {
    const [userName, setUserName] = useState("")
    const [userRole, setUserRole] = useState("")
    const [blurStrength, setBlurStrength] = useState([0])
    const [metalness, setMetalness] = useState([0.85])
    const [roughness, setRoughness] = useState([0.4])
    const [displacementStrength, setDisplacementStrength] = useState([0])
    const [noiseScale, setNoiseScale] = useState([1])
    const [glassDistortion, setGlassDistortion] = useState([13])
    const [specularConstant, setSpecularConstant] = useState([3.3])
    const [grayscale, setGrayscale] = useState([0.15])

    const handleDownload = async () => {
        const cardElement = document.getElementById('visitor-badge-container')
        if (!cardElement) return

        try {
            const canvas = await html2canvas(cardElement, {
                useCORS: true,
                backgroundColor: null,
                scale: 2 // High resolution
            })
            const url = canvas.toDataURL("image/png")
            const link = document.createElement('a')
            link.download = 'visitor-badge.png'
            link.href = url
            link.click()
        } catch (error) {
            console.error("Failed to download badge", error)
        }
    }

    return (
        <div className="w-full relative py-24 px-6 sm:px-12 lg:px-20 border-b-4 border-black dark:border-white bg-[#f4f4f4] dark:bg-[#0a0a0a] overflow-hidden">
            {/* Polka-dot/Grid background */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_#000_2px,_transparent_2px)] dark:bg-[radial-gradient(circle_at_center,_#fff_2px,_transparent_2px)] bg-[length:32px_32px]" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase bg-[#3B82F6] dark:bg-[#00FF99] text-white dark:text-black inline-block px-4 py-2 border-4 border-black shadow-[6px_6px_0_0_#000] tracking-tighter">
                        You've made it this far
                    </h2>
                    <p className="mt-6 max-w-2xl text-neutral-600 dark:text-neutral-400 font-mono text-sm sm:text-base border-l-4 border-black dark:border-white pl-4 bg-white/80 dark:bg-black/80 p-4">
                        Feel free to play around with...
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Column - Card Display */}
                    <div className="flex flex-col items-center justify-center">
                        <div id="visitor-badge-container" className="p-4 bg-transparent rounded-[24px]">
                            <ReflectiveCard
                                name={userName}
                                role={userRole}
                                blurStrength={blurStrength[0]}
                                metalness={metalness[0]}
                                roughness={roughness[0]}
                                displacementStrength={displacementStrength[0]}
                                noiseScale={noiseScale[0]}
                                glassDistortion={glassDistortion[0]}
                                specularConstant={specularConstant[0]}
                                grayscale={grayscale[0]}
                            />
                        </div>

                        <button
                            onClick={handleDownload}
                            className="w-full max-w-[320px] bg-[#3B82F6] dark:bg-[#00FF99] border-4 border-black text-white dark:text-black shadow-[6px_6px_0_0_#000] p-4 font-black uppercase text-xl mt-8 hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_0_#000] transition-all cursor-pointer"
                        >
                            Download Badge
                        </button>
                    </div>

                    {/* Right Column - Controls Panel */}
                    <div className="flex flex-col gap-8 bg-white dark:bg-[#131313] p-8 sm:p-10 border-4 border-black dark:border-white shadow-[12px_12px_0_0_#000] dark:shadow-[12px_12px_0_0_#00FF99]">

                        {/* Identity Controls */}
                        <div className="space-y-6">
                            <h3 className="font-black uppercase tracking-widest text-xl border-b-4 border-black dark:border-white pb-2 inline-block">Identity</h3>

                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-sm uppercase tracking-wider font-bold">Your Name</label>
                                    <input
                                        type="text"
                                        maxLength={20}
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder="TYPE YOUR NAME"
                                        className="w-full bg-[#f4f4f4] dark:bg-[#0a0a0a] border-4 border-black dark:border-white p-3 font-mono text-base uppercase focus:outline-none focus:ring-4 focus:ring-[#3B82F6] dark:focus:ring-[#00FF99] transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-mono text-sm uppercase tracking-wider font-bold">Your Role/Hobby</label>
                                    <input
                                        type="text"
                                        maxLength={30}
                                        value={userRole}
                                        onChange={(e) => setUserRole(e.target.value)}
                                        placeholder="ROLE / HOBBY"
                                        className="w-full bg-[#f4f4f4] dark:bg-[#0a0a0a] border-4 border-black dark:border-white p-3 font-mono text-base uppercase focus:outline-none focus:ring-4 focus:ring-[#3B82F6] dark:focus:ring-[#00FF99] transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Material Controls */}
                        <div className="space-y-6 mt-4">
                            <h3 className="font-black uppercase tracking-widest text-xl border-b-4 border-black dark:border-white pb-2 inline-block">Material Config</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                                <SliderModern label="Blur Strength" value={blurStrength} onChange={setBlurStrength} min={0} max={20} step={1} unit="px" format={{ maximumFractionDigits: 0 }} />
                                <SliderModern label="Metalness" value={metalness} onChange={setMetalness} min={0} max={1} step={0.05} />
                                <SliderModern label="Roughness" value={roughness} onChange={setRoughness} min={0} max={1} step={0.05} />
                                <SliderModern label="Grayscale" value={grayscale} onChange={setGrayscale} min={0} max={1} step={0.05} />
                            </div>
                        </div>

                        {/* Advanced Controls */}
                        <div className="space-y-6 mt-4">
                            <h3 className="font-black uppercase tracking-widest text-xl border-b-4 border-black dark:border-white pb-2 inline-block">Warp & Glass</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                                <SliderModern label="Warp Strength" value={displacementStrength} onChange={setDisplacementStrength} min={0} max={50} step={1} format={{ maximumFractionDigits: 0 }} />
                                <SliderModern label="Warp Scale" value={noiseScale} onChange={setNoiseScale} min={0.1} max={5} step={0.1} />
                                <SliderModern label="Glass Distort" value={glassDistortion} onChange={setGlassDistortion} min={0} max={30} step={1} format={{ maximumFractionDigits: 0 }} />
                                <SliderModern label="Shininess" value={specularConstant} onChange={setSpecularConstant} min={0} max={10} step={0.1} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default VisitorPhotobooth
