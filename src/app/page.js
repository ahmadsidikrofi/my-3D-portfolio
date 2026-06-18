'use client'

import Loader from "@/components/Loader";
import Bird from "@/models/bird";
import { Island } from "@/models/island";
import { Plane } from "@/models/plane";
import Sky from "@/models/sky";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

export default function Home() {
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
            planeScale={planeScale}
            planePosition={planePosition}
            isRotating={isRotating}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  );
}
