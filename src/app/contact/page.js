'use client'

import InputFloatingLabel from "@/components/shadcn-space/radix/input/input-09"
import { AnimatedCheckmarkCircle } from "@/components/shadcn-space/radix/input/input-19"
import { Suspense, useRef, useState } from "react"
import { Send } from "lucide-react"
import emailjs from "@emailjs/browser"
import { Canvas } from "@react-three/fiber"
import { Fox } from "@/models/fox"
import Loader from "@/components/Loader"

const ContactPage = () => {
    const formRef = useRef()
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [isHovered, setIsHovered] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

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
            setForm({ name: '', email: '', message: '' })
        }).catch((err) => {
            setIsLoading(false)
            console.log(err);
        })
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,

        })
    }

    const handleFocus = () => {

    }

    const handleBlur = () => {

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
        <section className="relative flex lg:flex-row flex-col items-center justify-center sm:p-16 px-8 min-h-[calc(100vh-80px)] w-full">
            <div className="w-full max-w-xl">
                <div className="bg-white dark:bg-[#120F17] p-8 sm:p-10 rounded-[32px] w-full border-2 shadow-[-6px_-6px_1px_0px_#3b82f6] border-[#3b82f6] transition-all duration-300 hover:shadow-[0px_0px_0px_0px_#3b82f6] hover:-translate-y-1">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 font-sans tracking-wide text-neutral-900 dark:text-white">
                            Get in Touch
                        </h1>
                        <p className="text-neutral-500 dark:text-neutral-400 font-medium text-base sm:text-sm">
                            Have a project in mind or just want to say hi? I'd love to hear from you!
                        </p>
                    </div>

                    <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
                        <InputFloatingLabel
                            label='Type your name here'
                            placeholder='John Doe'
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            type='text'
                            wrapperClassName="flex-1"
                            className="h-14 rounded-lg dark:border-neutral-800 focus-visible:border-[#3b82f6] focus-visible:ring-0 shadow-sm transition-colors bg-white dark:bg-[#120F17]"
                            progress={nameProgress}
                        />
                        <InputFloatingLabel
                            label='Your email goes here'
                            placeholder='hello@example.com'
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            type='email'
                            wrapperClassName="flex-1"
                            className="h-14 rounded-lg dark:border-neutral-800 focus-visible:border-[#3b82f6] focus-visible:ring-0 shadow-sm transition-colors bg-white dark:bg-[#120F17]"
                            progress={emailProgress}
                        />

                        <div className="relative w-full group">
                            <textarea
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                placeholder="What's on your mind? Tell me everything..."
                                className="w-full min-h-[100px] p-5 pr-10 rounded-lg dark:border-neutral-800 bg-white dark:bg-[#120F17] focus:border-[#3b82f6] focus:outline-none focus:ring-0 shadow-sm transition-colors resize-y text-sm sm:text-base placeholder:text-muted-foreground"
                            />
                            <div className="absolute right-3 top-5 flex items-center justify-center z-10 pointer-events-none">
                                <AnimatedCheckmarkCircle progress={messageProgress} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="relative w-full sm:w-auto self-center sm:self-end flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-[#3b82f6] text-white font-bold text-lg shadow-[0px_6px_0px_0px_#1d4ed8] active:shadow-[0px_0px_0px_0px_#1d4ed8] active:translate-y-[6px] transition-all cursor-pointer overflow-hidden border-2 border-[#1d4ed8]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isLoading ? 'Sending...' : 'Send Message'}
                                <Send size={20} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`} />
                            </span>
                        </button>
                    </form>
                </div>
            </div>

            <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
                <Canvas
                    camera={{
                        position: [0, 0, 5],
                        fov: 35,
                        near: 0.1,
                        far: 1000
                    }}
                >
                    <directionalLight intensity={2.5} position={[0, 0, 1]} />
                    <ambientLight intensity={0.4} />
                    <pointLight intensity={1.5} position={[0, 0, 1]} />
                    <Suspense fallback={<Loader />}>
                        <Fox
                            position={[0.5, 0.35, 0]}
                            rotation={[12.6, -0.7, 0]}
                            scale={[0.5, 0.5, 0.5]}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    )
}

export default ContactPage