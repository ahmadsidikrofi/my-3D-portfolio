'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * ScrollDownHint — khusus untuk ScrollStack (Lenis container mode)
 *
 * State machine:
 *  'hero'   → hint tampil. Saat user scroll, hint sembunyi sejenak lalu muncul lagi.
 *             Ketika scroll > dismissAfterPx, transisi ke 'passed'.
 *  'passed' → hint sembunyi. Muncul kembali setelah idle selama idleMs.
 *             Setiap aktivitas user → reset idle timer (sembunyikan dulu, lalu muncul lagi).
 */
const ScrollDownHint = ({ dismissAfterPx = 100, idleMs = 2000 }) => {
    const [visible, setVisible] = useState(true)
    const stateRef = useRef('hero') // 'hero' | 'passed'
    const timerRef = useRef(null)

    useEffect(() => {
        // ── Helpers ──
        const clearTimer = () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = null
            }
        }

        // ── Find the Lenis scroll wrapper (parent of .scroll-stack-inner) ──
        const findScroller = () => {
            const inner = document.querySelector('.scroll-stack-inner')
            return inner?.parentElement ?? null
        }

        let scrollEl = null
        // listeners to detach on cleanup
        const activityEvents = ['wheel', 'touchmove', 'mousemove', 'keydown']

        // ── Handler: user interacted after hero is passed ──
        const onActivity = () => {
            if (stateRef.current !== 'passed') return
            setVisible(false)
            clearTimer()
            timerRef.current = setTimeout(() => setVisible(true), idleMs)
        }

        // ── Handler: scroll event on the Lenis container div ──
        const onScroll = () => {
            if (!scrollEl) return
            const top = scrollEl.scrollTop

            if (stateRef.current === 'hero') {
                if (top > dismissAfterPx) {
                    // ── Transition: hero → passed ──
                    stateRef.current = 'passed'
                    setVisible(false)
                    clearTimer()

                    // Start idle countdown — hint appears after 2 s of inactivity
                    timerRef.current = setTimeout(() => setVisible(true), idleMs)

                    // Attach activity listeners (wheel/touch/mouse/key + scroll)
                    activityEvents.forEach(ev =>
                        window.addEventListener(ev, onActivity, { passive: true })
                    )
                    scrollEl.addEventListener('scroll', onActivity, { passive: true })
                } else {
                    // ── Still in hero: hide while scrolling, re-show when user stops ──
                    setVisible(false)
                    clearTimer()
                    timerRef.current = setTimeout(() => {
                        if (stateRef.current === 'hero') setVisible(true)
                    }, 700)
                }
            }
        }

        // ── Attach to scroller (with retry if not mounted yet) ──
        const attach = (el) => {
            scrollEl = el
            scrollEl.addEventListener('scroll', onScroll, { passive: true })
        }

        const el = findScroller()
        let retryInterval = null

        if (el) {
            attach(el)
        } else {
            let attempts = 0
            retryInterval = setInterval(() => {
                attempts++
                const found = findScroller()
                if (found) {
                    clearInterval(retryInterval)
                    retryInterval = null
                    attach(found)
                }
                if (attempts > 25) { // ~3.75 s max
                    clearInterval(retryInterval)
                    retryInterval = null
                }
            }, 150)
        }

        // ── Cleanup ──
        return () => {
            clearTimer()
            if (retryInterval) clearInterval(retryInterval)
            scrollEl?.removeEventListener('scroll', onScroll)
            scrollEl?.removeEventListener('scroll', onActivity)
            activityEvents.forEach(ev =>
                window.removeEventListener(ev, onActivity)
            )
        }
    }, [dismissAfterPx, idleMs])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="scroll-hint"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-1 pointer-events-none select-none"
                    aria-hidden="true"
                >
                    {/* Neo-Brutalist pill */}
                    <div className="flex items-center gap-2 px-5 py-2 bg-white dark:bg-[#131313] border-4 border-black dark:border-white font-mono font-black text-[11px] sm:text-xs uppercase tracking-[2px] text-black dark:text-white shadow-[4px_4px_0_0_#3B82F6] dark:shadow-[4px_4px_0_0_#00FF99] whitespace-nowrap">
                        Scroll Down
                    </div>

                    {/* Staggered bouncing chevrons */}
                    <div className="flex flex-col items-center mt-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ y: [0, 5, 0], opacity: [0.35, 1, 0.35] }}
                                transition={{
                                    duration: 1.1,
                                    repeat: Infinity,
                                    delay: i * 0.18,
                                    ease: 'easeInOut',
                                }}
                            >
                                <ChevronDown
                                    size={i === 1 ? 24 : 18}
                                    strokeWidth={3}
                                    className="text-[#3B82F6] dark:text-[#00FF99] -mt-2"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ScrollDownHint
