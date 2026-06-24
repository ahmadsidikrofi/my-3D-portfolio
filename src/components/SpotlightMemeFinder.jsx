'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GhostCursor from './GhostCursor'
import toast from 'react-hot-toast'

const SpotlightMemeFinder = () => {
    const containerRef = useRef(null)
    const targetRef = useRef(null)
    const [found, setFound] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [hasMouseEntered, setHasMouseEntered] = useState(false)
    const [isNearTarget, setIsNearTarget] = useState(false)

    const handleMouseMove = useCallback((e) => {
        if (showModal) return
        if (!hasMouseEntered) setHasMouseEntered(true)

        if (targetRef.current) {
            const targetRect = targetRef.current.getBoundingClientRect()

            // Calculate target center
            const targetCenterX = targetRect.left + targetRect.width / 2
            const targetCenterY = targetRect.top + targetRect.height / 2

            // Distance calculation using absolute viewport coordinates
            const dx = e.clientX - targetCenterX
            const dy = e.clientY - targetCenterY
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Reveal target if distance is less than 80px
            setIsNearTarget(distance < 80)
        }
    }, [showModal, hasMouseEntered])

    const handleMouseLeave = useCallback(() => {
        if (!showModal) {
            setIsNearTarget(false)
        }
    }, [showModal])

    const handleTargetClick = () => {
        setFound(true)
        setShowModal(true)
    }

    const handleFalseClick = () => {
        toast.error('Wrong answer buddy!', {
            position: 'top-center',
            style: {
                border: '2px solid black',
                borderRadius: '0',
                fontWeight: 'bold',
            }
        });
    }

    const handleHellYeah = () => {
        window.open('https://www.youtube.com/watch?v=l-uIJ0i_p0A', '_blank')
        setShowModal(false)
        setTimeout(() => {
            setFound(false)
            setIsNearTarget(false)
        }, 1000)
    }

    const handleNope = () => {
        setShowModal(false)
        setFound(false)
        setIsNearTarget(false)
    }

    return (
        <div className="w-full relative">
            {/* The dark arena */}
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-[400px] bg-[#0a0a0a] overflow-hidden select-none"
                style={{ cursor: showModal ? 'default' : 'none' }}
            >
                {/* Hidden text — barely visible without the neon trail */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 pointer-events-none px-8">
                    <p className="text-neutral-900 font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tighter text-center leading-tight">
                        Wow you made it here
                    </p>
                    <p className="text-neutral-900 font-mono text-xs sm:text-sm uppercase tracking-[2px] text-center">
                        Find me and you&apos;ll get a surprise
                    </p>
                </div>

                {/* Decorative scattered dots — also barely visible */}
                <div className="absolute inset-0 z-20">
                    <button onClick={handleFalseClick} className="cursor-none absolute top-8 left-12 text-neutral-900 font-black text-3xl select-none leading-none drop-shadow-[0_0_8px_rgba(0,255,153,0.6)]">
                        ?
                    </button>
                    <button onClick={handleFalseClick} className="cursor-not-allowed absolute top-24 right-32 text-neutral-900 font-black text-3xl select-none leading-none drop-shadow-[0_0_8px_rgba(0,255,153,0.6)]">
                        ?
                    </button>
                    <button onClick={handleFalseClick} className="cursor-none  absolute bottom-20 left-1/3 text-neutral-900 font-black text-3xl select-none leading-none drop-shadow-[0_0_8px_rgba(0,255,153,0.6)]">
                        ?
                    </button>
                    <button onClick={handleFalseClick} className="cursor-not-allowed absolute top-1/2 right-1/4 text-neutral-900 font-black text-3xl select-none leading-none drop-shadow-[0_0_8px_rgba(0,255,153,0.6)]">
                        ?
                    </button>
                </div>

                {/* The hidden target — acid-mint ? icon */}
                {!found && (
                    <button
                        ref={targetRef}
                        onClick={handleTargetClick}
                        className="absolute bottom-12 right-24 z-30 w-10 h-10 flex items-center justify-center cursor-none transition-opacity duration-500"
                        style={{
                            opacity: isNearTarget ? 1 : 0,
                            pointerEvents: isNearTarget ? 'auto' : 'none'
                        }}
                        aria-label="Hidden easter egg target"
                    >
                        <span className="text-[#00FF99] font-black text-3xl select-none leading-none drop-shadow-[0_0_8px_rgba(0,255,153,0.6)]">
                            ?
                        </span>
                    </button>
                )}

                {/* Neon Smoke Trail Cursor effect */}
                {!showModal && hasMouseEntered && (
                    <GhostCursor
                        className="absolute inset-0 pointer-events-none"
                        color="#00FF99"
                        bloomStrength={0.6}
                        brightness={1.5}
                        trailLength={60}
                        zIndex={10}
                    />
                )}

                {/* Entry hint — shows briefly */}
                {!hasMouseEntered && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                            className="text-[#00FF99]/40 font-mono text-xs uppercase tracking-[3px]"
                        >
                            [ Hover to activate neon trail ]
                        </motion.p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 30 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            className="relative bg-[#131313] border-4 border-[#00FF99] p-8 sm:p-12 max-w-md w-full shadow-[8px_8px_0px_0px_#00FF99]"
                        >
                            {/* Modal top accent bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-[#00FF99]" />

                            <div className="flex flex-col items-center text-center gap-6">
                                {/* Surprise icon */}
                                <div className="w-16 h-16 bg-[#00FF99] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000]">
                                    <span className="text-black text-3xl font-black">!</span>
                                </div>

                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-[2px] text-[#00FF99] mb-3">
                                        Easter Egg Found
                                    </p>
                                    <h3 className="text-white text-2xl sm:text-3xl font-black uppercase tracking-tighter">
                                        You sure ready
                                        <br />
                                        to get this?
                                    </h3>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 w-full">
                                    <button
                                        onClick={handleHellYeah}
                                        className="flex-1 px-6 py-4 bg-[#00FF99] text-black font-black font-mono text-sm uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_0px_#000] transition-all cursor-pointer"
                                    >
                                        HELL YEAH
                                    </button>
                                    <button
                                        onClick={handleNope}
                                        className="flex-1 px-6 py-4 bg-[#131313] text-white font-black font-mono text-sm uppercase tracking-wider border-4 border-white shadow-[4px_4px_0px_0px_#fff] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_0px_#fff] transition-all cursor-pointer"
                                    >
                                        NOPE
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SpotlightMemeFinder
