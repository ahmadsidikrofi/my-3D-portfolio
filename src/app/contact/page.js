'use client'

import InputFloatingLabel from "@/components/shadcn-space/radix/input/input-09"
import { AnimatedCheckmarkCircle } from "@/components/shadcn-space/radix/input/input-19"
import { Suspense, useEffect, useRef, useState } from "react"
import { Send } from "lucide-react"
import emailjs from "@emailjs/browser"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Fox } from "@/models/fox"
import Loader from "@/components/Loader"
import toast, { Toaster } from "react-hot-toast"
import TheVergeMenu from "@/components/TheVergeMenu"

const toastStyle = {
    style: {
        background: '#131313',
        color: '#ffffff',
        border: '1px solid #3B82F6',
        borderRadius: '20px',
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '1.1px',
    },
    iconTheme: {
        primary: '#3B82F6',
        secondary: '#131313',
    },
}

const toastErrorStyle = {
    position: 'top-center',
    style: {
        border: '2px solid black',
        borderRadius: '0',
        fontWeight: 'bold',
    }
}

const ContactPage = () => {
    const formRef = useRef()
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [isHovered, setIsHovered] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [currentAnimation, setCurrentAnimation] = useState('idle')

    // Responsive fox config
    const [foxConfig, setFoxConfig] = useState({
        scale: [0.5, 0.5, 0.5],
        position: [0.5, 0.35, 0],
        fov: 75,
    })

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth
            if (w < 640) {
                // Mobile
                setFoxConfig({
                    scale: [0.5, 0.5, 0.5],
                    position: [0.5, 0.35, 0],
                    fov: 75,
                })
            } else if (w < 1024) {
                // Tablet
                setFoxConfig({
                    scale: [0.6, 0.6, 0.6],
                    position: [0.4, 0.25, 0],
                    fov: 65,
                })
            } else {
                // Desktop
                setFoxConfig({
                    scale: [0.7, 0.7, 0.7],
                    position: [0.3, 0.15, 0],
                    fov: 55,
                })
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validation checks
        if (!form.name.trim()) {
            toast.error("Oops! Please tell me your name first 🥺", toastErrorStyle)
            return
        }
        if (form.name.trim().length < 5) {
            toast.error("Hmm...your name is too short, try with more characters 🥺", toastErrorStyle)
            return
        }

        if (!form.email.trim()) {
            toast.error("Wait, how can I reply to you without an email? 🥺", toastErrorStyle)
            return
        }
        if (form.email.trim().length < 5 || !form.email.includes('@')) {
            toast.error("That email doesn't look quite right. Make sure it has '@' and at least 5 characters", toastErrorStyle)
            return
        }

        if (!form.message.trim()) {
            toast.error("Don't leave the message empty! Tell me what's on your mind 💭", toastErrorStyle)
            return
        }
        if (form.message.trim().length < 50) {
            const currentLength = form.message.trim().length
            toast.error(`Can tou elaborate a bit more? We need atleast ${50 - currentLength} more characters 📝`, toastErrorStyle)
            return

        }

        setIsLoading(true)
        setCurrentAnimation('hit')

        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            {
                from_name: form.name,
                to_name: "Rofi",
                from_email: form.email,
                to_email: 'rofidragon71@gmail.com',
                message: form.message
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        ).then(() => {
            setIsLoading(false)
            toast.success("Yay! Your message has been sent successfully. I'll get back to you soon 🎊", toastStyle)
            setTimeout(() => {
                setForm({ name: '', email: '', message: '' })
                setCurrentAnimation('idle')
            }, 3000)
        }).catch((err) => {
            setIsLoading(false)
            setCurrentAnimation('idle')
            toast.error("Oh no... Something went wrong while sending the message. Please try again 😢", toastErrorStyle)
            console.log(err);
        })
    }

    const handleChange = ({ target: { name, value } }) => {
        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleFocus = () => {
        setCurrentAnimation('walk')
    }

    const handleBlur = () => {
        setCurrentAnimation('idle')
    }

    // Calculate validation progress for checkmarks:
    // Name: min 5 characters
    const nameProgress = form.name ? Math.min(form.name.length / 5, 1.0) : 0.0

    // Email: min 5 characters and contains "@"
    const emailProgress = (() => {
        if (!form.email) return 0.0
        const hasAt = form.email.includes('@')
        const lengthProgress = Math.min(form.email.length / 5, 1.0)
        // Combine length progress (up to 50%) and "@" check (up to 50%)
        return (lengthProgress * 0.5) + (hasAt ? 0.5 : 0.0)
    })()

    // Message: min 50 characters
    const messageProgress = form.message ? Math.min(form.message.length / 50, 1.0) : 0.0

    return (
        <section className="relative flex flex-col min-h-[calc(100vh-80px)] w-full bg-[#f4f4f4] overflow-hidden">
            <TheVergeMenu />
            <Toaster position="top-center" reverseOrder={false} />

            {/* Header Section */}
            <div className="relative w-full px-6 sm:px-12 lg:px-20 pt-16 pb-5 border-b-4 border-black">
                {/* Eyebrow kicker */}
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#3B82F6] mb-4">
                    Contact / Reach Out
                </p>

                <h1 className="text-4xl sm:text-5xl lg:text-[5rem] font-black uppercase leading-[0.95] tracking-tighter">
                    Drop Me
                    <br />
                    A {" "}
                    <span className="text-[#3B82F6] dark:text-[#00FF99] relative inline-block">
                        Line
                        <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#3B82F6] dark:bg-[#00FF99]" />
                    </span>
                </h1>

                <p className="mt-6 max-w-xl text-sm sm:text-base font-normal text-accent-foreground leading-relaxed border-l-4 border-[#3B82F6] pl-4">
                    Have a project in mind or just want to say hi? Fill in the form and the fox will deliver your message.
                </p>

                {/* Decorative corner marks */}
                <div className="absolute top-0 right-6 sm:right-12 lg:right-20 w-24 h-24 border border-[#3B82F6]/20 -[20px] pointer-events-none" />
                <div className="absolute top-6 right-12 sm:right-20 lg:right-28 w-24 h-24 border border-[#5200ff]/20 -[20px] pointer-events-none" />
            </div>

            {/* Main content: Form + Fox */}
            <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12 w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 py-12 lg:py-16 flex-1">

                {/* Form Card — Verge-style pill card */}
                <div className="w-full lg:w-1/2 max-w-lg border-4 border-black bg-white dark:bg-neutral-900 flex items-center justify-center shadow-[-6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="bg-white p-8 sm:p-10  w-full border border-white/20 relative">
                        {/* Card header */}
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-mono text-xs uppercase tracking-[1.8px] text-[#3B82F6]">
                                Send a Message
                            </h2>
                            <div className="h-2 w-2 -full bg-[#3B82F6] animate-pulse" />
                        </div>

                        <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                            {/* Name Input */}
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-[1.5px] text-accent-foreground">
                                    Your Name
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        placeholder="TYPE YOUR NAME HERE"
                                        className="w-full h-12 px-4 pr-10 bg-[#F4F4F4] border-4 border-black text-dark dark:text-white text-sm font-mono placeholder:text-accent-foreground/50 placeholder:uppercase placeholder:tracking-wider focus:outline-none focus:border-[#3B82F6] transition-colors duration-150"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <AnimatedCheckmarkCircle progress={nameProgress} />
                                    </div>
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-[1.5px] text-accent-foreground">
                                    Your Email
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        placeholder="HELLO@EMAIL.COM"
                                        className="w-full h-12 px-4 pr-10 bg-[#F4F4F4] border-4 border-black text-dark dark:text-white text-sm font-mono placeholder:text-accent-foreground/50 placeholder:uppercase placeholder:tracking-wider focus:outline-none focus:border-[#3B82F6] transition-colors duration-150"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <AnimatedCheckmarkCircle progress={emailProgress} />
                                    </div>
                                </div>
                            </div>

                            {/* Message Textarea */}
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-[1.5px] text-accent-foreground">
                                    Message
                                </label>
                                <div className="relative group">
                                    <textarea
                                        value={form.message}
                                        name="message"
                                        placeholder="TELL ME EVERYTHING..."
                                        className="w-full min-h-[120px] p-4 pr-10 bg-[#F4F4F4] border-4 border-black text-dark dark:text-white text-sm font-mono placeholder:text-accent-foreground/50 placeholder:uppercase placeholder:tracking-wider focus:outline-none focus:border-[#3B82F6] transition-colors duration-150 resize-y"
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                    <div className="absolute right-3 top-4 pointer-events-none">
                                        <AnimatedCheckmarkCircle progress={messageProgress} />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button — Jelly Mint Pill */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onMouseEnter={() => {
                                    setIsHovered(true)
                                    if (!isLoading) setCurrentAnimation('hit')
                                }}
                                onMouseLeave={() => {
                                    setIsHovered(false)
                                    if (!isLoading) setCurrentAnimation('idle')
                                }}
                                className="w-full flex items-center justify-center bg-[#3B82F6] dark:bg-[#00FF99] border-4 border-black text-white dark:text-black shadow-[-6px_6px_0_0_#000] p-4 font-black uppercase text-lg text-center hover:translate-y-1 hover:-translate-x-1 hover:shadow-[-2px_2px_0_0_#000] transition-all cursor-pointer"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {isLoading ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                                    <Send size={16} strokeWidth={2.5} className={`transition-transform duration-300 rotate-45 ${isHovered ? 'translate-x-2' : ''}`} />
                                </span>
                            </button>
                        </form>

                        {/* Bottom-left decorative timestamp */}
                        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-accent-foreground">
                                Secure transmission
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[1.1px] text-[#3B82F6]">
                                Online
                            </span>
                        </div>
                    </div>
                </div>

                {/* Fox 3D Canvas */}
                <div className="w-full lg:w-1/2 max-w-lg h-[300px] sm:h-[380px] lg:h-[480px] relative overflow-hidden border-4 border-black bg-white dark:bg-neutral-900 flex items-center justify-center shadow-[-6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 transition-all">
                    <style>{`
                      @keyframes speedLines {
                        0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
                        30% { opacity: 0.8; }
                        70% { opacity: 0.8; }
                        100% { transform: translateX(150%) skewX(-15deg); opacity: 0; }
                      }
                      @keyframes shake {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        20% { transform: translate(-3px, 2px) rotate(-0.5deg); }
                        40% { transform: translate(3px, -1px) rotate(0.5deg); }
                        60% { transform: translate(-2px, -2px) rotate(-0.5deg); }
                        80% { transform: translate(2px, 1px) rotate(0.5deg); }
                      }
                      .animate-speed-line {
                        animation: speedLines var(--speed-line-duration, 0.5s) linear infinite;
                      }
                      .shake-canvas {
                        animation: shake 0.12s linear infinite;
                      }
                    `}</style>

                    {currentAnimation === 'hit' && (
                        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-around py-8 overflow-hidden">
                            <div className="animate-speed-line h-[2px] w-48 bg-linear-to-r from-transparent via-[#3B82F6] to-white" style={{ '--speed-line-duration': '0.4s', marginLeft: '-15%' }} />
                            <div className="animate-speed-line h-[3px] w-64 bg-linear-to-r from-transparent via-[#5200ff] to-white" style={{ '--speed-line-duration': '0.3s', marginLeft: '10%' }} />
                            <div className="animate-speed-line h-[2px] w-56 bg-linear-to-r from-transparent via-[#3B82F6] to-white" style={{ '--speed-line-duration': '0.45s', marginLeft: '-5%' }} />
                            <div className="animate-speed-line h-[2.5px] w-72 bg-linear-to-r from-transparent via-[#5200ff] to-white" style={{ '--speed-line-duration': '0.35s', marginLeft: '20%' }} />
                        </div>
                    )}

                    <div className={`w-full h-full ${currentAnimation === 'hit' ? 'shake-canvas' : ''}`}>
                        <Canvas
                            camera={{
                                position: [0, 0, 6],
                                fov: foxConfig.fov,
                                near: 0.1,
                                far: 1000
                            }}
                        >
                            <directionalLight intensity={2.5} position={[0, 0, 1]} />
                            <ambientLight intensity={0.4} />
                            <spotLight
                                position={[10, 10, 10]}
                                angle={0.15}
                                penumbra={1}
                                intensity={2}
                            />
                            <Suspense fallback={<Loader />}>
                                <Fox
                                    currentAnimation={currentAnimation}
                                    position={foxConfig.position}
                                    rotation={[12.629, -0.6, 0]}
                                    scale={foxConfig.scale}
                                />
                                {/* <OrbitControls 
                                    enableZoom={false} 
                                    enablePan={false} 
                                    autoRotate={false}
                                /> */}
                            </Suspense>
                        </Canvas>
                    </div>

                    {/* Fox label */}
                    <div className="absolute bottom-4 left-4 z-30">
                        <span className="font-mono text-[10px] uppercase tracking-[1.5px] text-accent-foreground">
                            Your interactive 3D companion
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactPage
