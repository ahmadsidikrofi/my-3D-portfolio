'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

// ── Constants ──
const GROW_DURATION = 4000   // ms to fully reveal
const SHRINK_DURATION = 300  // ms to fade back
const MAX_MASK = 100         // % radius for full coverage

const InteractiveProfilePic = () => {
    const [isHovering, setIsHovering] = useState(false)
    const [hasExploded, setHasExploded] = useState(false)

    const containerRef = useRef(null)
    const revealRef = useRef(null)

    // Cursor tracking (refs to avoid re-renders on every mousemove)
    const mousePos = useRef({ x: 100, y: 100 })

    // Animation state (refs for RAF-driven loop)
    const maskSizeRef = useRef(0)
    const rafId = useRef(null)
    const growStart = useRef(null)
    const shrinkStart = useRef(null)
    const shrinkFrom = useRef(0)
    const phase = useRef('idle') // idle | growing | shrinking | revealed

    // ── Mask updater (runs every frame, no React re-render) ──
    const applyMask = useCallback(() => {
        if (!revealRef.current) return
        const { x, y } = mousePos.current
        const s = maskSizeRef.current
        const mask = `radial-gradient(circle at ${x}px ${y}px, black ${s}%, transparent ${s + 15}%)`
        revealRef.current.style.WebkitMaskImage = mask
        revealRef.current.style.maskImage = mask
    }, [])

    // ── Confetti burst ──
    const fireConfetti = useCallback(() => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const ox = (rect.left + rect.width / 2) / window.innerWidth
        const oy = (rect.top + rect.height / 2) / window.innerHeight

        confetti({
            particleCount: 120,
            spread: 80,
            origin: { x: ox, y: oy },
            colors: ['#3B82F6', '#00FF99', '#FFD700', '#FF6B6B', '#A855F7', '#FFF'],
            startVelocity: 35,
            gravity: 0.8,
            ticks: 100,
            scalar: 1.1,
        })
        setTimeout(() => {
            confetti({
                particleCount: 60,
                spread: 120,
                origin: { x: ox, y: oy },
                colors: ['#3B82F6', '#00FF99', '#FFD700'],
                startVelocity: 20,
                gravity: 1,
                ticks: 80,
                scalar: 0.8,
                shapes: ['circle'],
            })
        }, 200)

        maskSizeRef.current = MAX_MASK
        applyMask()
        setHasExploded(true)
        phase.current = 'revealed'
    }, [applyMask])

    // ── Single RAF loop that handles both grow & shrink ──
    const tick = useCallback((ts) => {
        if (phase.current === 'growing') {
            if (!growStart.current) growStart.current = ts
            const progress = Math.min((ts - growStart.current) / GROW_DURATION, 1)
            maskSizeRef.current = progress * MAX_MASK
            applyMask()

            if (progress >= 1) {
                fireConfetti()
                return // stop loop
            }
        } else if (phase.current === 'shrinking') {
            if (!shrinkStart.current) shrinkStart.current = ts
            const progress = Math.min((ts - shrinkStart.current) / SHRINK_DURATION, 1)
            maskSizeRef.current = shrinkFrom.current * (1 - progress)
            applyMask()

            if (progress >= 1) {
                maskSizeRef.current = 0
                applyMask()
                phase.current = 'idle'
                return // stop loop
            }
        } else {
            return // no active animation
        }

        rafId.current = requestAnimationFrame(tick)
    }, [applyMask, fireConfetti])

    // ── Start growing (handles resuming from partial shrink) ──
    const startGrowing = useCallback(() => {
        if (rafId.current) cancelAnimationFrame(rafId.current)
        const currentProgress = maskSizeRef.current / MAX_MASK
        growStart.current = null // will be set on first tick
        phase.current = 'growing'

        rafId.current = requestAnimationFrame((ts) => {
            // Offset start time so animation resumes from current maskSize
            growStart.current = ts - currentProgress * GROW_DURATION
            tick(ts)
        })
    }, [tick])

    // ── Start shrinking from wherever we are ──
    const startShrinking = useCallback(() => {
        if (rafId.current) cancelAnimationFrame(rafId.current)
        shrinkStart.current = null
        shrinkFrom.current = maskSizeRef.current
        phase.current = 'shrinking'
        rafId.current = requestAnimationFrame(tick)
    }, [tick])

    // ── Event handlers ──
    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mousePos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }
        // Live-update mask position while growing or revealed
        if (phase.current === 'growing' || phase.current === 'revealed') {
            applyMask()
        }
    }, [applyMask])

    const handleMouseEnter = useCallback((e) => {
        setIsHovering(true)
        if (hasExploded) return

        const rect = e.currentTarget.getBoundingClientRect()
        mousePos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }
        startGrowing()
    }, [hasExploded, startGrowing])

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false)
        if (hasExploded) return

        if (phase.current === 'growing') {
            startShrinking()
        }
    }, [hasExploded, startShrinking])

    const handleTouchStart = useCallback((e) => {
        setIsHovering(true)
        if (hasExploded) return

        const touch = e.touches[0]
        if (touch && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            mousePos.current = {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top,
            }
        }
        startGrowing()
    }, [hasExploded, startGrowing])

    const handleTouchEnd = useCallback(() => {
        setIsHovering(false)
        if (hasExploded) return
        if (phase.current === 'growing') {
            startShrinking()
        }
    }, [hasExploded, startShrinking])

    return (
        <div className="relative shrink-0 select-none mt-8 sm:mt-0">
            {/* Floating tooltip indicating interactivity */}
            {!isHovering && !hasExploded && (
                <motion.div
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black text-white text-[10px] font-mono font-bold uppercase tracking-widest border-2 border-black shadow-[4px_4px_0_0_#3B82F6] whitespace-nowrap pointer-events-none z-10"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: [0, -6, 0] }}
                    transition={{ opacity: { duration: 0.3 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                >
                    Hover Me for 3s
                    <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black" />
                </motion.div>
            )}

            {/* Main photo container */}
            <div
                ref={containerRef}
                className="relative w-[200px] h-[200px] overflow-hidden rounded border-4 border-black shadow-[8px_8px_0_0_#000] cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Layer 1 — Grayscale base (always visible) */}
                <img
                    src="/profile_pic.jpg"
                    alt="Profile"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover object-bottom grayscale"
                />

                {/* Layer 2 — Full-colour reveal (masked) */}
                <div
                    ref={revealRef}
                    className="absolute inset-0 w-full h-full"
                    style={{
                        WebkitMaskImage: 'radial-gradient(circle at 100px 100px, black 0%, transparent 15%)',
                        maskImage: 'radial-gradient(circle at 100px 100px, black 0%, transparent 15%)',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                    }}
                >
                    <img
                        src="/profile_pic.jpg"
                        alt=""
                        draggable={false}
                        className="w-full h-full object-cover object-bottom"
                    />
                </div>
            </div>

            {/* Pulsing ring hint while hovering (before explosion) */}
            {isHovering && !hasExploded && (
                <motion.div
                    className="absolute inset-0 rounded border-4 border-[#3B82F6] pointer-events-none"
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: [0, 0.6, 0], scale: [1, 1.08, 1.15] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
            )}

            {/* Badge after explosion */}
            {hasExploded && (
                <motion.span
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#3B82F6] text-white text-[10px] font-mono font-bold uppercase tracking-widest border-2 border-black shadow-[3px_3px_0_0_#000] whitespace-nowrap"
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                >
                    ✨ Caught in 4K
                </motion.span>
            )}
        </div>
    )
}

export default InteractiveProfilePic