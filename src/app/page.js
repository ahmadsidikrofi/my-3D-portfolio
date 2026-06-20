'use client'

import FloatingButton from "@/components/FloatingButton";
import HomeInfo from "@/components/HomeInfo";
import Loader from "@/components/Loader";
import Bird from "@/models/bird";
import { Island } from "@/models/island";
import { Plane } from "@/models/plane";
import Sky from "@/models/sky";
import { Canvas } from "@react-three/fiber";
import { Contact, House, Projector, User } from "lucide-react";
import { Suspense, useState } from "react";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const items = [
    { icon: <House size={18} color="white" />, label: 'Home', onClick: () => router.push('/'), className: 'top-28 left-6 sm:left-52', tooltipSide: 'bottom' },
    { icon: <User size={18} color="white" />, label: 'About', onClick: () => router.push('/about'), className: 'top-12 right-6 sm:right-52', tooltipSide: 'bottom' },
    { icon: <Projector size={18} color="white" />, label: 'Projects', onClick: () => router.push('/projects'), className: 'bottom-24 left-6 sm:left-52', tooltipSide: 'top' },
    { icon: <Contact size={18} color="white" />, label: 'Contact', onClick: () => router.push('/contact'), className: 'bottom-8 right-6 sm:right-52', tooltipSide: 'top' },
  ]

  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(1)

  const adjustIslandForScreenSize = () => {
    let screenScale = null
    let screenPosition = [0, -6.5, -43]
    let rotation = [0.1, 4.7, 0]

    if (typeof window === 'undefined') {
      return [[1, 1, 1], [0, 0, 0], [0.1, 4.7, 0]]
    }

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9]
    } else {
      screenScale = [1, 1, 1]
    }

    return [screenScale, screenPosition, rotation]
  }

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition

    if (typeof window === 'undefined') {
      return [[1, 1, 1], [0, 0, 0], [0.1, 4.7, 0]]
    }

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5]
      screenPosition = [0, 1.5, 0]
    } else {
      screenScale = [3, 3, 3]
      screenPosition = [0, -4, -4]
    }

    return [screenScale, screenPosition]
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize()
  const [planeScale, planePosition] = adjustPlaneForScreenSize()

  return (
    <section className="w-full h-screen overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none z-50">
        {items.map((item, index) => (
          <div key={item.label} className="pointer-events-auto">
            <FloatingButton
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
              className={item.className}
              tooltipSide={item.tooltipSide}
              delay={index * 0.4}
            />
          </div>
        ))}
      </div>
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[7, 2, 1]} intensity={[2]} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groudColor="#000000" intensity={1} />

          <Island
            isRotating={isRotating}
            scale={islandScale}
            position={islandPosition}
            rotation={islandRotation}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />

          <Sky
            isRotating={isRotating}
          />

          <Bird />

          <Plane
            scale={planeScale}
            position={planePosition}
            isRotating={isRotating}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  );
}
