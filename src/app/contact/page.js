'use client'

import InputFloatingLabel from "@/components/shadcn-space/radix/input/input-09"
import { AnimatedCheckmarkCircle } from "@/components/shadcn-space/radix/input/input-19"
import { Suspense, useEffect, useRef, useState } from "react"
import { Send } from "lucide-react"
import emailjs from "@emailjs/browser"
import { Canvas } from "@react-three/fiber"
import { Fox } from "@/models/fox"
import Loader from "@/components/Loader"
import toast, { Toaster } from "react-hot-toast"

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
            toast.error("Oops! Please tell me your name first. 🥺")
            return
        }
        if (form.name.trim().length < 5) {
            toast.error("Hmm, that name seems a bit too short! Minimum 5 characters please. 🦊")
            return
        }

        if (!form.email.trim()) {
            toast.error("Wait, how can I reply to you without an email address? 📬")
            return
        }
        if (form.email.trim().length < 5 || !form.email.includes('@')) {
            toast.error("That email doesn't look quite right. Make sure it has '@' and is at least 5 characters! ✉️")
            return
        }

        if (!form.message.trim()) {
            toast.error("Don't leave the message empty! Tell me what's on your mind. 💭")
            return
        }
        if (form.message.trim().length < 50) {
            const currentLength = form.message.trim().length
            toast.error(`Can you elaborate a bit more? You need ${50 - currentLength} more characters! 📝`)
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
            toast.success("Yay! Your message has been sent successfully. I'll get back to you soon! 🎉🚀")
            setTimeout(() => {
                setForm({ name: '', email: '', message: '' })
                setCurrentAnimation('idle')
            }, 3000)
        }).catch((err) => {
            setIsLoading(false)
            setCurrentAnimation('idle')
            toast.error("Oh no! Something went wrong while sending the message. Please try again. 😢")
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
        <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full px-4 sm:px-8 py-8 overflow-hidden">
            <Toaster position="top-center" reverseOrder={false} />

            {/* Decorative background blobs */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-300/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-6 z-10">
                <p className="text-sm font-semibold text-blue-500 uppercase tracking-widest mb-2">Let's Connect</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                    Say Hello! 👋
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm sm:text-base max-w-md mx-auto">
                    Have a project in mind or just want to say hi? Drop me a message and I'll get back to you!
                </p>
            </div>

            {/* Main content: Form + Fox side by side */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 w-full max-w-4xl z-10">

                {/* Form Card */}
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-[#120F17] p-6 sm:p-8 rounded-[28px] w-full border-2 shadow-[-4px_-4px_0px_0px_#3b82f6] border-[#3b82f6] transition-all duration-300 hover:shadow-[0px_0px_0px_0px_#3b82f6] hover:-translate-y-1">
                        <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-5 text-center">Send a Message</p>

                        <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                            <InputFloatingLabel
                                label='Type your name here'
                                placeholder='John Doe'
                                value={form.name}
                                type='text'
                                name='name'
                                wrapperClassName="flex-1"
                                className="h-12 rounded-xl dark:border-neutral-800 focus-visible:border-[#3b82f6] focus-visible:ring-0 shadow-sm transition-colors bg-white dark:bg-[#120F17]"
                                progress={nameProgress}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            <InputFloatingLabel
                                label='Your email goes here'
                                placeholder='hello@email.com'
                                value={form.email}
                                type='text'
                                name='email'
                                wrapperClassName="flex-1"
                                className="h-12 rounded-xl dark:border-neutral-800 focus-visible:border-[#3b82f6] focus-visible:ring-0 shadow-sm transition-colors bg-white dark:bg-[#120F17]"
                                progress={emailProgress}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />

                            <div className="relative w-full group">
                                <textarea
                                    value={form.message}
                                    name='message'
                                    placeholder="What's on your mind? Tell me everything..."
                                    className="w-full min-h-[90px] p-4 pr-10 rounded-xl dark:border-neutral-800 bg-white dark:bg-[#120F17] focus:border-[#3b82f6] focus:outline-none focus:ring-0 shadow-sm transition-colors resize-y text-sm placeholder:text-muted-foreground"
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <div className="absolute right-3 top-4 flex items-center justify-center z-10 pointer-events-none">
                                    <AnimatedCheckmarkCircle progress={messageProgress} />
                                </div>
                            </div>

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
                                className="relative w-full flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-[#3b82f6] text-white font-bold text-base shadow-[0px_4px_0px_0px_#1d4ed8] active:shadow-[0px_0px_0px_0px_#1d4ed8] active:translate-y-[4px] transition-all cursor-pointer overflow-hidden border-2 border-[#1d4ed8]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {isLoading ? 'Sending...' : 'Send Message'}
                                    <Send size={18} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`} />
                                </span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Fox 3D Canvas */}
                <div className="w-full max-w-sm lg:max-w-md sm:h-[320px] relative overflow-hidden">
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
                            <div className="animate-speed-line h-[2px] w-48 bg-linear-to-r from-transparent via-blue-400 to-white" style={{ '--speed-line-duration': '0.4s', marginLeft: '-15%' }} />
                            <div className="animate-speed-line h-[3px] w-64 bg-linear-to-r from-transparent via-cyan-400 to-white" style={{ '--speed-line-duration': '0.3s', marginLeft: '10%' }} />
                            <div className="animate-speed-line h-[2px] w-56 bg-linear-to-r from-transparent via-indigo-400 to-white" style={{ '--speed-line-duration': '0.45s', marginLeft: '-5%' }} />
                            <div className="animate-speed-line h-[2.5px] w-72 bg-linear-to-r from-transparent via-blue-500 to-white" style={{ '--speed-line-duration': '0.35s', marginLeft: '20%' }} />
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
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactPage

